import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Envoltorio tipado de AsyncStorage.
 * Base de la caché offline (RF-31) y de la cola de sincronización (RF-32).
 */
export const storage = {
  async get<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  async clear(): Promise<void> {
    await AsyncStorage.clear();
  },
} as const;

export const STORAGE_KEYS = {
  session: 'redsolidaria.session',
  onboarding: 'redsolidaria.onboarding',
  pendingActions: 'redsolidaria.pending-actions',
  cachedDonations: 'redsolidaria.cache.donations',
} as const;
