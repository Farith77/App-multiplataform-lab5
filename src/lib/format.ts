/** Utilidades de formato compartidas (fechas, pesos, distancias). */

const dateFormatter = new Intl.DateTimeFormat('es-PE', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

export function formatKg(kg: number): string {
  const value = Number.isInteger(kg) ? kg.toString() : kg.toFixed(1);
  return `${value} kg`;
}

export function formatPortions(portions: number): string {
  return `${portions} ${portions === 1 ? 'porción' : 'porciones'}`;
}

export function formatDateTime(iso: string | Date): string {
  const date = typeof iso === 'string' ? new Date(iso) : iso;
  if (Number.isNaN(date.getTime())) return '—';
  return dateFormatter.format(date);
}

/** Horas restantes hasta una fecha; negativo si ya caducó. */
export function hoursUntil(iso: string, now: Date = new Date()): number {
  const target = new Date(iso).getTime();
  if (Number.isNaN(target)) return 0;
  return Math.round((target - now.getTime()) / 3_600_000);
}

export function formatDistance(meters: number): string {
  return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(1)} km`;
}

export function initials(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}
