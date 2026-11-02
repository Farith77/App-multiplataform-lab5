import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card, Screen, SectionHeader } from '@/components/ui';
import { MOCK_DONATIONS } from '@/features/donations/mock';
import { formatKg } from '@/lib/format';
import { colors, radius, spacing, typography } from '@/theme';

/**
 * Pantalla 05 · Mapa de donaciones cercanas.
 * HU-06, HU-07 · RF-13, RF-14 · Sprint 1 (T-13).
 * Sprint 0: se valida el layout y la navegación; el mapa real llega con react-native-maps.
 */
export default function MapScreen() {
  return (
    <Screen scroll={false} padded={false}>
      <View style={styles.header}>
        <SectionHeader
          eyebrow="Cerca de ti"
          title="Donaciones disponibles"
          subtitle="Arequipa · radio de 5 km"
        />
        <View style={styles.chips}>
          <Badge label="Todas" tone="brand" />
          <Badge label="Frutas y verduras" />
          <Badge label="Panadería" />
          <Badge label="Cocidos" />
        </View>
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapIcon}>🗺️</Text>
        <Text style={styles.mapTitle}>Mapa interactivo</Text>
        <Text style={styles.mapText}>react-native-maps · T-13 · Sprint 1</Text>
        <Button
          label="Ver listado"
          variant="secondary"
          size="sm"
          onPress={() => router.push('/(tabs)/donaciones')}
        />
      </View>

      <View style={styles.list}>
        {MOCK_DONATIONS.slice(0, 2).map((donation) => (
          <Card
            key={donation.id}
            title={donation.title}
            subtitle={`${donation.donorName} · ${formatKg(donation.quantityKg)}`}
            footer={
              <Button
                label="Ver detalle"
                size="sm"
                variant="secondary"
                onPress={() => router.push(`/donacion/${donation.id}`)}
              />
            }
          >
            <Badge
              label={donation.status === 'disponible' ? 'Disponible' : 'Reservada'}
              tone={donation.status === 'disponible' ? 'success' : 'info'}
            />
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  mapPlaceholder: {
    margin: spacing.lg,
    height: 220,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  mapIcon: { fontSize: 32 },
  mapTitle: { ...typography.h3, color: colors.textPrimary },
  mapText: { ...typography.caption, color: colors.textMuted },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing['2xl'], gap: spacing.sm },
});
