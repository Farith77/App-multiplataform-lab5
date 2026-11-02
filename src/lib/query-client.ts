import { QueryClient } from '@tanstack/react-query';

/**
 * Cliente único de TanStack Query.
 * - `staleTime` 60 s: el mapa y los listados se refrescan al volver a la pantalla.
 * - `retry` 1: falla rápido cuando no hay red; la cola offline (RF-31) toma el relevo.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
