-- RedSolidaria · Esquema inicial de Sprint 1
-- Aplicar en Supabase SQL Editor. Auth crea auth.users; el trigger mantiene profiles.
create extension if not exists pgcrypto;

create type public.user_role as enum ('donante', 'beneficiario', 'voluntario', 'admin');
create type public.organization_status as enum ('pendiente', 'verificada', 'rechazada');
create type public.donation_status as enum ('disponible', 'reservada', 'en_recojo', 'entregada', 'cancelada', 'vencida');
create type public.food_category as enum ('frutas_verduras', 'panaderia', 'lacteos', 'cocidos', 'enlatados', 'bebidas', 'otros');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role public.user_role,
  organization_name text,
  organization_status public.organization_status not null default 'pendiente',
  address text,
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_id uuid not null references public.profiles(id),
  title text not null check (char_length(title) between 3 and 100),
  description text not null default '',
  category public.food_category not null,
  quantity_kg numeric(8,2) not null check (quantity_kg > 0),
  portions integer not null default 0 check (portions >= 0),
  expires_at timestamptz not null,
  pickup_from timestamptz not null,
  pickup_to timestamptz not null,
  address text not null,
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  status public.donation_status not null default 'disponible',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (pickup_from <= pickup_to),
  check (pickup_to <= expires_at)
);

create index donations_available_expiry_idx on public.donations (status, expires_at);
create index donations_category_idx on public.donations (category);
create index donations_donor_idx on public.donations (donor_id, created_at desc);

create table public.donation_media (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references public.donations(id) on delete cascade,
  storage_path text not null,
  position smallint not null check (position between 1 and 3),
  created_at timestamptz not null default now(),
  unique (donation_id, position)
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''), new.raw_user_meta_data ->> 'phone');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.protect_profile_privileges()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.role = 'admin' and (old.role is distinct from 'admin') then
    raise exception 'El rol administrador solo puede asignarlo un administrador existente';
  end if;
  if new.organization_status is distinct from old.organization_status
     and coalesce(public.current_role(), 'beneficiario'::public.user_role) <> 'admin' then
    raise exception 'Solo administración puede verificar organizaciones';
  end if;
  return new;
end;
$$;

create trigger protect_profile_privileges
  before update on public.profiles
  for each row execute function public.protect_profile_privileges();

create or replace function public.current_role()
returns public.user_role language sql stable security definer set search_path = '' as $$
  select role from public.profiles where id = (select auth.uid())
$$;

alter table public.profiles enable row level security;
alter table public.donations enable row level security;
alter table public.donation_media enable row level security;

create policy "users read own profile" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
create policy "users insert own profile" on public.profiles
  for insert to authenticated with check (
    id = (select auth.uid()) and role is null and organization_status = 'pendiente'
  );
create policy "users update own profile" on public.profiles
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy "available donations readable" on public.donations
  for select to anon, authenticated using (status = 'disponible' or donor_id = (select auth.uid()));
create policy "donors create donations" on public.donations
  for insert to authenticated with check (donor_id = (select auth.uid()) and public.current_role() = 'donante');
create policy "donors update own donations" on public.donations
  for update to authenticated using (donor_id = (select auth.uid())) with check (donor_id = (select auth.uid()));
create policy "donors delete own available donations" on public.donations
  for delete to authenticated using (donor_id = (select auth.uid()) and status = 'disponible');

create policy "media follows donation visibility" on public.donation_media
  for select to anon, authenticated using (
    exists (select 1 from public.donations d where d.id = donation_id and (d.status = 'disponible' or d.donor_id = (select auth.uid())))
  );
create policy "donors manage own media" on public.donation_media
  for all to authenticated using (
    exists (select 1 from public.donations d where d.id = donation_id and d.donor_id = (select auth.uid()))
  ) with check (
    exists (select 1 from public.donations d where d.id = donation_id and d.donor_id = (select auth.uid()))
  );

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('donation-media', 'donation-media', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "read donation images" on storage.objects for select to authenticated
  using (bucket_id = 'donation-media');
create policy "upload own donation images" on storage.objects for insert to authenticated
  with check (bucket_id = 'donation-media' and (storage.foldername(name))[1] = (select auth.uid())::text);
