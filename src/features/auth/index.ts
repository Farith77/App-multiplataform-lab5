import { STORAGE_KEYS, storage } from '@/lib/storage';
import { supabase } from '@/lib/supabase';
import type { Profile, UserRole } from '@/lib/types';

const DEMO_USERS_KEY = 'redsolidaria.demo-users';
type DemoUser = Profile & { email: string };
type ProfileRow = {
  id: string;
  full_name: string;
  phone: string | null;
  role: UserRole | null;
  organization_name: string | null;
  organization_status: string;
  address: string | null;
  avatar_path: string | null;
  created_at: string;
};

export type RegistrationInput = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

function toProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone ?? undefined,
    role: row.role ?? 'beneficiario',
    organizationName: row.organization_name ?? undefined,
    address: row.address ?? undefined,
    avatarUrl: row.avatar_path ?? undefined,
    verified: row.organization_status === 'verificada',
    needsOnboarding: row.role === null,
    createdAt: row.created_at,
  };
}

async function remoteProfile(userId: string): Promise<Profile> {
  if (!supabase) throw new Error('Supabase no está configurado.');
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'id,full_name,phone,role,organization_name,organization_status,address,avatar_path,created_at',
    )
    .eq('id', userId)
    .single();
  if (error) throw error;
  return toProfile(data as ProfileRow);
}

export async function getCurrentProfile(): Promise<Profile | null> {
  if (supabase) {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    return remoteProfile(data.user.id);
  }
  return storage.get<Profile>(STORAGE_KEYS.session);
}

export async function register(input: RegistrationInput): Promise<Profile> {
  const email = input.email.trim().toLowerCase();
  if (supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: input.password,
      options: { data: { full_name: input.fullName.trim(), phone: input.phone.trim() } },
    });
    if (error) throw error;
    if (!data.session || !data.user) {
      throw new Error(
        'La cuenta fue creada. Confirma el correo y luego inicia sesión para continuar.',
      );
    }
    return remoteProfile(data.user.id);
  }

  const users = (await storage.get<DemoUser[]>(DEMO_USERS_KEY)) ?? [];
  if (users.some((user) => user.email === email)) throw new Error('Ese correo ya está registrado.');
  const profile: Profile = {
    id: `demo-${Date.now()}`,
    fullName: input.fullName.trim(),
    phone: input.phone.trim(),
    role: 'beneficiario',
    verified: false,
    createdAt: new Date().toISOString(),
  };
  await storage.set(DEMO_USERS_KEY, [...users, { ...profile, email }]);
  await storage.set(STORAGE_KEYS.session, profile);
  return profile;
}

export async function signIn(emailValue: string, password: string): Promise<Profile> {
  const email = emailValue.trim().toLowerCase();
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return remoteProfile(data.user.id);
  }
  const users = (await storage.get<DemoUser[]>(DEMO_USERS_KEY)) ?? [];
  const user = users.find((item) => item.email === email);
  if (!user || !password) throw new Error('No hay una cuenta local con ese correo.');
  const { email: _email, ...profile } = user;
  await storage.set(STORAGE_KEYS.session, profile);
  return profile;
}

export async function setRole(
  role: UserRole,
  organizationName: string,
  address: string,
): Promise<Profile> {
  if (supabase) {
    const { data, error: userError } = await supabase.auth.getUser();
    if (userError || !data.user) throw new Error('Inicia sesión para completar tu perfil.');
    const { error } = await supabase
      .from('profiles')
      .update({
        role,
        organization_name: organizationName.trim() || null,
        address: address.trim() || null,
      })
      .eq('id', data.user.id);
    if (error) throw error;
    const updated = await remoteProfile(data.user.id);
    return { ...updated, needsOnboarding: false };
  }
  const profile = await storage.get<Profile>(STORAGE_KEYS.session);
  if (!profile) throw new Error('Inicia sesión para completar tu perfil.');
  const updated: Profile = {
    ...profile,
    role,
    organizationName: organizationName.trim() || undefined,
    address: address.trim() || undefined,
    verified: role !== 'beneficiario',
  };
  await storage.set(STORAGE_KEYS.session, updated);
  const users = (await storage.get<DemoUser[]>(DEMO_USERS_KEY)) ?? [];
  await storage.set(
    DEMO_USERS_KEY,
    users.map((user) => (user.id === updated.id ? { ...user, ...updated } : user)),
  );
  return updated;
}

export async function updateProfile(
  patch: Pick<Profile, 'fullName' | 'phone' | 'organizationName' | 'address'>,
): Promise<Profile> {
  if (supabase) {
    const { data, error: userError } = await supabase.auth.getUser();
    if (userError || !data.user) throw new Error('Inicia sesión para editar tu perfil.');
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: patch.fullName,
        phone: patch.phone ?? null,
        organization_name: patch.organizationName ?? null,
        address: patch.address ?? null,
      })
      .eq('id', data.user.id);
    if (error) throw error;
    return remoteProfile(data.user.id);
  }
  const profile = await storage.get<Profile>(STORAGE_KEYS.session);
  if (!profile) throw new Error('Inicia sesión para editar tu perfil.');
  const updated = { ...profile, ...patch };
  await storage.set(STORAGE_KEYS.session, updated);
  const users = (await storage.get<DemoUser[]>(DEMO_USERS_KEY)) ?? [];
  await storage.set(
    DEMO_USERS_KEY,
    users.map((user) => (user.id === updated.id ? { ...user, ...updated } : user)),
  );
  return updated;
}

export async function signOut(): Promise<void> {
  if (supabase) {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
  await storage.remove(STORAGE_KEYS.session);
}
