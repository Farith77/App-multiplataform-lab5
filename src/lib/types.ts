/** Tipos de dominio compartidos entre features. Espejo de `docs/requerimientos/06-modelo-de-datos.md`. */

export type UserRole = 'donante' | 'beneficiario' | 'voluntario' | 'admin';

export type FoodCategory =
  'frutas_verduras' | 'panaderia' | 'lacteos' | 'cocidos' | 'enlatados' | 'bebidas' | 'otros';

export type DonationStatus =
  'disponible' | 'reservada' | 'en_recojo' | 'entregada' | 'cancelada' | 'vencida';

export type ReservationStatus = 'pendiente' | 'aceptada' | 'rechazada' | 'completada' | 'cancelada';

export type GeoPoint = { latitude: number; longitude: number };

export type Profile = {
  id: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  organizationName?: string;
  verified: boolean;
  createdAt: string;
};

export type Donation = {
  id: string;
  donorId: string;
  donorName: string;
  title: string;
  description?: string;
  category: FoodCategory;
  quantityKg: number;
  portions: number;
  expiresAt: string;
  pickupWindow: { from: string; to: string };
  location: GeoPoint & { address: string };
  photoUrl?: string;
  status: DonationStatus;
  createdAt: string;
};

export type Reservation = {
  id: string;
  donationId: string;
  beneficiaryId: string;
  volunteerId?: string;
  status: ReservationStatus;
  deliveryCode: string;
  scheduledAt?: string;
  completedAt?: string;
  createdAt: string;
};

export type ImpactSummary = {
  rescuedKg: number;
  portions: number;
  co2AvoidedKg: number;
  deliveries: number;
  period: { from: string; to: string };
};
