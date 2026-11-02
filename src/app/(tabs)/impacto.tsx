import { StyleSheet, Text, View } from 'react-native';

import { Card, Screen, SectionHeader } from '@/components/ui';
import { formatKg, formatPortions } from '@/lib/format';
import { colors, radius, spacing, typography } from '@/theme';

const METRICS = [
  { label: 'Alimentos rescatados', value: formatKg(128.5) },
  { label: 'Porciones entregadas', value: formatPortions(430) },
  { label: 'CO₂ evitado', value: formatKg(74.2) },
  { label: 'Entregas completadas', value: '37' },
];

/**
 * Pantalla 10 · Panel de impacto social.
 * HU-17 · RF-24, RF-25 · Sprint 2 (T-21).
 */
export default function ImpactScreen() {
  return (
    <Screen>
      <SectionHeader
        eyebrow="Pantalla 10"
        title="Impacto social"
        subtitle="Datos acumulados por la red en el periodo actual."
      />

      <View style={styles.grid}>
        {METRICS.map((metric) => (
          <Card key={metric.label} style={styles.metric}>
            <Text style={styles.value}>{metric.value}</Text>
            <Text style={styles.label}>{metric.label}</Text>
          </Card>
        ))}
      </View>

      <View style={styles.chart}>
        <Text style={styles.chartTitle}>Evolución semanal</Text>
        <Text style={styles.chartText}>Gráfico de líneas · T-21 · Sprint 2</Text>
      </View>

      <Text style={styles.note}>
        Los valores mostrados son de demostración y se reemplazarán por la consulta real a Supabase
        cuando el panel se conecte en el Sprint 2.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  metric: { flexBasis: '47%', flexGrow: 1 },
  value: { ...typography.h1, color: colors.brand600 },
  label: { ...typography.caption, color: colors.textMuted },
  chart: {
    marginTop: spacing.lg,
    height: 160,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  chartTitle: { ...typography.h3, color: colors.textPrimary },
  chartText: { ...typography.caption, color: colors.textMuted },
  note: { ...typography.caption, color: colors.textMuted, marginTop: spacing.lg },
});
