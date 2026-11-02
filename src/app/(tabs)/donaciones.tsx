import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';

import { Badge, Button, Card, EmptyState } from '@/components/ui';
import { listDonations } from '@/features/donations';
import type { Donation } from '@/lib/types';
import { formatDateTime, formatKg } from '@/lib/format';
import { colors, spacing, typography } from '@/theme';

/**
 * Pantalla 06 · Listado con filtros y búsqueda.
 * HU-07 · RF-11, RF-12 · Sprint 1 (T-12).
 */
export default function DonationsListScreen() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  useEffect(() => {
    void listDonations().then(setDonations);
  }, []);
  const filtered = useMemo(
    () =>
      donations.filter(
        (item) =>
          item.status === 'disponible' &&
          (!search ||
            `${item.title} ${item.description ?? ''} ${item.donorName}`
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())) &&
          (category === 'Todas' || item.category === category),
      ),
    [donations, search, category],
  );
  return (
    <View style={styles.screen}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Donaciones publicadas</Text>
            <Text style={styles.subtitle}>
              {filtered.length} donaciones disponibles · datos locales
            </Text>
            <TextInput
              accessibilityLabel="Buscar donaciones"
              placeholder="Buscar alimentos o donantes"
              value={search}
              onChangeText={setSearch}
              style={styles.search}
            />
            <View style={styles.filters}>
              {['Todas', 'panaderia', 'frutas_verduras', 'cocidos'].map((item) => (
                <Button
                  key={item}
                  label={item === 'Todas' ? item : item.replace('_', ' ')}
                  size="sm"
                  variant={category === item ? 'primary' : 'secondary'}
                  onPress={() => setCategory(item)}
                />
              ))}
            </View>
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
  search: {
    minHeight: 48,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.sm },
});
