import { StyleSheet, Text, View } from 'react-native';

import { Badge, Screen, SectionHeader } from '@/components/ui';
import { colors, radius, spacing, typography } from '@/theme';

type Props = {
  title: string;
  description: string;
  screenId?: string;
  hus?: string[];
  rfs?: string[];
  sprint?: string;
  children?: React.ReactNode;
};

/**
 * Andamiaje de Sprint 0: marca cada ruta con la historia de usuario y el
 * requerimiento funcional que implementará, para que el equipo sepa qué falta.
 * Se reemplaza por la pantalla real en el sprint correspondiente.
 */
export function PlaceholderScreen({
  title,
  description,
  screenId,
  hus = [],
  rfs = [],
  sprint,
  children,
}: Props) {
  return (
    <Screen>
      <SectionHeader
        eyebrow={screenId ? `Pantalla ${screenId}` : undefined}
        title={title}
        subtitle={description}
      />

      <View style={styles.tags}>
        {sprint ? <Badge label={sprint} tone="brand" /> : null}
        {hus.map((hu) => (
          <Badge key={hu} label={hu} tone="info" />
        ))}
        {rfs.map((rf) => (
          <Badge key={rf} label={rf} tone="neutral" />
        ))}
      </View>

      {children}

      <View style={styles.note}>
        <Text style={styles.noteTitle}>Pendiente de implementación</Text>
        <Text style={styles.noteText}>
          La navegación, el tema y los componentes base ya están conectados. Esta pantalla se
          completa en el sprint indicado arriba.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.md },
  note: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderStyle: 'dashed',
    backgroundColor: colors.surface,
    gap: spacing.xs,
  },
  noteTitle: { ...typography.bodyStrong, color: colors.textPrimary },
  noteText: { ...typography.caption, color: colors.textMuted },
});
