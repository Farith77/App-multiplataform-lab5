import { StyleSheet, Text, View } from 'react-native';

import { PlaceholderScreen } from '@/components/dev/PlaceholderScreen';
import { colors, spacing, typography } from '@/theme';

/**
 * Pantalla 07 · Publicar donación.
 * HU-05 · RF-06 a RF-10 · Sprint 1 (T-11).
 */
export default function PublishScreen() {
  return (
    <PlaceholderScreen
      screenId="07"
      title="Publicar donación"
      description="Fotos, categoría, cantidad, caducidad y punto de recojo."
      hus={['HU-05']}
      rfs={['RF-06', 'RF-07', 'RF-08']}
      sprint="Sprint 1 · T-11"
    >
      <View style={styles.mock}>
        <Text style={styles.label}>Qué se donará</Text>
        <View style={styles.field}>
          <Text style={styles.placeholder}>Ej. Pan artesanal del día</Text>
        </View>
        <Text style={styles.label}>Cantidad aproximada</Text>
        <View style={styles.field}>
          <Text style={styles.placeholder}>kg y porciones estimadas</Text>
        </View>
        <Text style={styles.label}>Fecha límite de consumo</Text>
        <View style={styles.field}>
          <Text style={styles.placeholder}>dd/mm/aaaa · hh:mm</Text>
        </View>
      </View>
    </PlaceholderScreen>
  );
}

const styles = StyleSheet.create({
  mock: { gap: spacing.sm, marginTop: spacing.xl },
  label: { ...typography.label, color: colors.textSecondary },
  field: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  placeholder: { ...typography.body, color: colors.textMuted },
});
