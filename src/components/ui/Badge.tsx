import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

export type BadgeTone = 'neutral' | 'brand' | 'warning' | 'danger' | 'info' | 'success';

type Props = {
  label: string;
  tone?: BadgeTone;
};

/** Etiqueta compacta para estados de donación, roles y caducidad. */
export function Badge({ label, tone = 'neutral' }: Props) {
  return (
    <View style={[styles.badge, tones[tone].container]}>
      <Text style={[styles.text, tones[tone].text]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  text: { ...typography.label },
});

const tones: Record<BadgeTone, { container: object; text: object }> = {
  neutral: {
    container: { backgroundColor: colors.surfaceMuted },
    text: { color: colors.textSecondary },
  },
  brand: { container: { backgroundColor: colors.brand50 }, text: { color: colors.brand700 } },
  success: { container: { backgroundColor: '#DCFCE7' }, text: { color: colors.success } },
  warning: { container: { backgroundColor: colors.accent50 }, text: { color: colors.warning } },
  danger: { container: { backgroundColor: '#FEE2E2' }, text: { color: colors.danger } },
  info: { container: { backgroundColor: '#DBEAFE' }, text: { color: colors.info } },
};
