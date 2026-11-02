import { Button, EmptyState, Screen, SectionHeader } from '@/components/ui';

/**
 * Pantalla 09 · Reservas y seguimiento.
 * HU-09, HU-10 · RF-15 a RF-20 · Sprint 2 (T-18).
 */
export default function ReservationsScreen() {
  return (
    <Screen>
      <SectionHeader
        eyebrow="Pantalla 09"
        title="Mis reservas"
        subtitle="Sigue el estado de cada donación reservada."
      />
      <EmptyState
        title="Todavía no tienes reservas"
        description="Cuando reserves una donación podrás ver aquí el estado, el voluntario asignado y el código de entrega."
        icon="📦"
        action={<Button label="Explorar donaciones" variant="secondary" onPress={() => {}} />}
      />
    </Screen>
  );
}
