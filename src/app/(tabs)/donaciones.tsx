import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card, EmptyState } from '@/components/ui';
import { MOCK_DONATIONS } from '@/features/donations/mock';
import { formatDateTime, formatKg } from '@/lib/format';
import { colors, spacing, typography } from '@/theme';

/**
 * Pantalla 06 · Listado con filtros y búsqueda.
 * HU-07 · RF-11, RF-12 · Sprint 1 (T-12).
 */
export default function DonationsListScreen() {
  return (
    <View style={styles.screen}>
      <FlatList
        data={MOCK_DONATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Donaciones publicadas</Text>
            <Text style={styles.subtitle}>{MOCK_DONATIONS.length} resultados de demostración</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="Sin donaciones por ahora"
            description="Cuando un donante publique alimentos aparecerán aquí."
          />
        }
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subtitle={`${item.donorName} · ${item.location.address}`}
            footer={
              <Button
                label="Ver detalle"
                size="sm"
                variant="secondary"
                onPress={() => router.push(`/donacion/${item.id}`)}
              />
            }
          >
            <View style={styles.row}>
              <Badge label={formatKg(item.quantityKg)} tone="brand" />
              <Badge label={`Vence ${formatDateTime(item.expiresAt)}`} tone="warning" />
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  header: { gap: 2, marginBottom: spacing.md },
  title: { ...typography.h1, color: colors.textPrimary },
  subtitle: { ...typography.caption, color: colors.textMuted },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.xs },
});
