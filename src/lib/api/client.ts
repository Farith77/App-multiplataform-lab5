import { env } from '@/lib/env';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  /** Token de sesión de Supabase; se envía como Bearer. */
  token?: string;
  timeoutMs?: number;
};

/**
 * Cliente HTTP mínimo sobre `fetch`. Centraliza base URL, JSON y errores
 * para que las features no repitan esta lógica (RNF-03 · mantenibilidad).
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, token, timeoutMs = 15_000, headers, ...rest } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${env.apiBaseUrl}${path}`, {
      ...rest,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    const text = await response.text();
    const payload = text.length > 0 ? (JSON.parse(text) as unknown) : undefined;

    if (!response.ok) {
      const message =
        typeof payload === 'object' && payload !== null && 'message' in payload
          ? String((payload as { message: unknown }).message)
          : `Error ${response.status}`;
      throw new ApiError(message, response.status);
    }

    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('La solicitud tardó demasiado. Verifica tu conexión.', 0, 'TIMEOUT');
    }
    throw new ApiError('No se pudo conectar con el servidor.', 0, 'NETWORK');
  } finally {
    clearTimeout(timeout);
  }
}
