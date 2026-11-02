import type { Donation } from '@/lib/types';

/**
 * Datos de demostración SOLO para el andamiaje de Sprint 0.
 * Se eliminan cuando el listado consuma la API real (T-10 / T-12).
 */
export const MOCK_DONATIONS: Donation[] = [
  {
    id: 'don-001',
    donorId: 'usr-001',
    donorName: 'Panadería El Trigal',
    title: 'Pan artesanal del día',
    description: 'Bolsas de pan francés y ciabatta horneados esta mañana.',
    category: 'panaderia',
    quantityKg: 6,
    portions: 40,
    expiresAt: '2026-11-02T23:00:00-05:00',
    pickupWindow: { from: '2026-11-02T19:00:00-05:00', to: '2026-11-02T21:00:00-05:00' },
    location: {
      latitude: -16.409,
      longitude: -71.5375,
      address: 'Av. Independencia 455, Arequipa',
    },
    status: 'disponible',
    createdAt: '2026-11-01T15:30:00-05:00',
  },
  {
    id: 'don-002',
    donorId: 'usr-002',
    donorName: 'Mercado San Camilo',
    title: 'Frutas y verduras de segunda',
    description: 'Cajas de tomate, zanahoria y plátano en buen estado.',
    category: 'frutas_verduras',
    quantityKg: 12,
    portions: 60,
    expiresAt: '2026-11-03T12:00:00-05:00',
    pickupWindow: { from: '2026-11-03T06:00:00-05:00', to: '2026-11-03T09:00:00-05:00' },
    location: {
      latitude: -16.3989,
      longitude: -71.5369,
      address: 'Calle San Camilo 200, Arequipa',
    },
    status: 'reservada',
    createdAt: '2026-11-01T17:10:00-05:00',
  },
  {
    id: 'don-003',
    donorId: 'usr-003',
    donorName: 'Restaurante La Plaza',
    title: 'Menú del día no servido',
    description: 'Porciones refrigeradas de arroz con pollo y ensalada.',
    category: 'cocidos',
    quantityKg: 4.5,
    portions: 25,
    expiresAt: '2026-11-02T22:00:00-05:00',
    pickupWindow: { from: '2026-11-02T20:00:00-05:00', to: '2026-11-02T21:30:00-05:00' },
    location: {
      latitude: -16.4121,
      longitude: -71.5302,
      address: 'Calle Mercaderes 118, Arequipa',
    },
    status: 'disponible',
    createdAt: '2026-11-01T18:05:00-05:00',
  },
];
