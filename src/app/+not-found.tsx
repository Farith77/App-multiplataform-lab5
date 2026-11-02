import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { Button, Screen } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';

export default function NotFoundScreen() {
  return (
    <Screen style={styles.container}>
      <Text style={styles.code}>404</Text>
      <Text style={styles.title}>Esta pantalla no existe</Text>
      <Text style={styles.text}>
        Puede que el enlace esté mal escrito o que la ruta se haya movido.
      </Text>
      <Button label="Volver al inicio" onPress={() => router.replace('/')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  code: { ...typography.display, color: colors.brand500 },
  title: { ...typography.h2, color: colors.textPrimary },
  text: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
