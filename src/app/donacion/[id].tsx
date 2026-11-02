import { useLocalSearchParams, router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card, Screen, SectionHeader } from '@/components/ui';
import { MOCK_DONATIONS } from '@/features/donations/mock';
import { formatDateTime, formatKg, formatPortions } from '@/lib/format';
import { colors, spacing, typography } from '@/theme';

/**
 * Pantalla 08 · Detalle de la donación.
 * HU-08, HU-09 · RF-15, RF-16 · Sprint 2 (T-18).
 */
export default function DonationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const donation = MOCK_DONATIONS.find((item) => item.id === id) ?? MOCK_DONATIONS[0];

  if (!donation) {
    return (
      <Screen>
        <SectionHeader title="Donación no encontrada" />
      </Screen>
    );
  }

  return (
    <Screen>
      <SectionHeader eyebrow="Pantalla 08" title={donation.title} subtitle={donation.donorName} />

      <View style={styles.tags}>
        <Badge label={formatKg(donation.quantityKg)} tone="brand" />
        <Badge label={formatPortions(donation.portions)} />
        <Badge label={`Vence ${formatDateTime(donation.expiresAt)}`} tone="warning" />
      </View>

      <View style={styles.cards}>
        <Card title="Descripción" subtitle={donation.description} />
        <Card title="Punto de recojo" subtitle={donation.location.address} />
        <Card
          title="Ventana de recojo"
          subtitle={`${formatDateTime(donation.pickupWindow.from)} → ${formatDateTime(
            donation.pickupWindow.to,
          )}`}
        />
      </View>

      <View style={styles.actions}>
        <Button
          label="Reservar donación"
          onPress={() => router.push('/(tabs)/reservas')}
          fullWidth
        />
        <Button label="Volver al listado" variant="ghost" onPress={() => router.back()} fullWidth />
      </View>

      <Text style={styles.note}>
        La reserva real, el control de concurrencia y el código QR/PIN se implementan en el Sprint 2
        (T-17, T-18).
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.md },
  cards: { gap: spacing.sm, marginTop: spacing.lg },
  actions: { gap: spacing.sm, marginTop: spacing.xl },
  note: { ...typography.caption, color: colors.textMuted, marginTop: spacing.lg },
});
