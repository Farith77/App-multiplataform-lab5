/**
 * Sistema de diseño · RedSolidaria
 * Tokens base (colores, espaciado, tipografía, radios y sombras).
 * Cualquier valor visual nuevo debe declararse aquí, no dentro de las pantallas.
 */

export const colors = {
  // Marca
  brand50: '#E9F7F0',
  brand100: '#C9EDDB',
  brand300: '#7FD3AC',
  brand500: '#0F7B4F',
  brand600: '#0B6240',
  brand700: '#084B32',

  // Acento (alertas de caducidad, impacto)
  accent50: '#FFF7E6',
  accent500: '#F59E0B',
  accent600: '#D97706',

  // Semánticos
  success: '#15803D',
  warning: '#B45309',
  danger: '#B91C1C',
  info: '#1D4ED8',

  // Neutros
  white: '#FFFFFF',
  background: '#F6F8FB',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5F9',
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',
  textInverse: '#FFFFFF',
  overlay: 'rgba(15, 23, 42, 0.45)',

  // Estados de donación (RF-15 a RF-20)
  status: {
    disponible: '#0F7B4F',
    reservada: '#1D4ED8',
    enRecojo: '#B45309',
    entregada: '#15803D',
    cancelada: '#B91C1C',
    vencida: '#64748B',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 32, lineHeight: 38, fontWeight: '700' },
  h1: { fontSize: 24, lineHeight: 30, fontWeight: '700' },
  h2: { fontSize: 20, lineHeight: 26, fontWeight: '700' },
  h3: { fontSize: 17, lineHeight: 22, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  bodyStrong: { fontSize: 15, lineHeight: 22, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  label: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
} as const;

export const shadows = {
  sm: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
} as const;

/** Tamaño mínimo de área táctil recomendado (RNF-09 · accesibilidad). */
export const TOUCH_TARGET = 48;

/** Puntos de corte usados para adaptar el layout a tablet y web. */
export const breakpoints = { tablet: 768, desktop: 1024 } as const;
