/**
 * Variables de entorno públicas de Expo.
 * Se exponen en el bundle: nunca colocar aquí secretos de servidor.
 * Se leen de forma estática (requisito de `expo/no-dynamic-env-var`).
 * Ver `.env.example` para los valores esperados en desarrollo.
 */

const appEnv = process.env.EXPO_PUBLIC_APP_ENV;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const legacySupabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const env = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: supabasePublishableKey ?? legacySupabaseAnonKey ?? '',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:54321/functions/v1',
  appEnv: (appEnv === 'staging' || appEnv === 'production' ? appEnv : 'development') as
    'development' | 'staging' | 'production',
} as const;

export const isConfigured = env.supabaseUrl.length > 0 && env.supabaseAnonKey.length > 0;
