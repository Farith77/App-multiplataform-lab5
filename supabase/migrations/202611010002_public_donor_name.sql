-- Permite mostrar el nombre público del donante sin exponer su perfil completo.
alter table public.donations add column if not exists donor_name text;

update public.donations d
set donor_name = p.full_name
from public.profiles p
where p.id = d.donor_id and d.donor_name is null;

create or replace function public.set_donation_donor_name()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  select p.full_name into new.donor_name
  from public.profiles p
  where p.id = new.donor_id;
  if new.donor_name is null then
    raise exception 'No se encontró el perfil del donante';
  end if;
  return new;
end;
$$;

create trigger donations_set_donor_name
  before insert or update of donor_id on public.donations
  for each row execute function public.set_donation_donor_name();

alter table public.donations alter column donor_name set not null;

-- Restringe lectura de archivos a imágenes vinculadas a donaciones visibles.
drop policy if exists "read donation images" on storage.objects;
create policy "read visible donation images" on storage.objects
  for select to authenticated using (
    bucket_id = 'donation-media'
    and exists (
      select 1
      from public.donation_media dm
      join public.donations d on d.id = dm.donation_id
      where dm.storage_path = storage.objects.name
        and (d.status = 'disponible' or d.donor_id = (select auth.uid()))
    )
  );

drop policy if exists "upload own donation images" on storage.objects;
create policy "upload own donation images" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'donation-media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and public.current_role() = 'donante'
  );
