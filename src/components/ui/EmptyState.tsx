import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type Props = {
  title: string;
  description: string;
  icon?: string;
  action?: React.ReactNode;
};

/** Estado vacío reutilizable: listados sin resultados, reservas pendientes, etc. */
export function EmptyState({ title, description, icon = '🍽️', action }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.icon} accessibilityElementsHidden importantForAccessibility="no">
        {icon}
      </Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  icon: { fontSize: 40 },
  title: { ...typography.h3, color: colors.textPrimary, textAlign: 'center' },
  description: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 340,
  },
  action: { marginTop: spacing.md },
});
