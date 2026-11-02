import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  right?: React.ReactNode;
};

/** Encabezado de sección con jerarquía tipográfica consistente. */
export function SectionHeader({ title, subtitle, eyebrow, right }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.texts}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  texts: { flex: 1, gap: 2 },
  eyebrow: {
    ...typography.label,
    color: colors.brand600,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: { ...typography.h1, color: colors.textPrimary },
  subtitle: { ...typography.body, color: colors.textMuted },
});
