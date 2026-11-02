import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, Screen } from '@/components/ui';
import { colors, radius, spacing, typography } from '@/theme';

export default function WelcomeScreen() {
  return (
    <Screen scroll={false} style={styles.container}>
      <View style={styles.brand}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>RS</Text>
        </View>
        <Text style={styles.eyebrow}>Proyección social</Text>
        <Text style={styles.title}>RedSolidaria</Text>
        <Text style={styles.subtitle}>
          Conectamos alimentos que sobran con comedores que los necesitan. Publica, reserva y
          coordina el recojo en minutos.
        </Text>
      </View>

      <View style={styles.stats}>
        <Card title="3 roles" subtitle="Donante, beneficiario y voluntario" />
        <Card title="Trazable" subtitle="Código QR/PIN en cada entrega" />
      </View>

      <View style={styles.actions}>
        <Button label="Iniciar sesión" onPress={() => router.push('/(auth)/login')} fullWidth />
        <Button
          label="Crear cuenta"
          variant="secondary"
          onPress={() => router.push('/(auth)/register')}
          fullWidth
        />
        <Button
          label="Explorar sin cuenta"
          variant="ghost"
          onPress={() => router.push('/(tabs)/mapa')}
          fullWidth
        />
      </View>

      <Text style={styles.footer}>RedSolidaria · Sprint 0 · Expo + React Native + TypeScript</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between', paddingBottom: spacing['2xl'] },
  brand: { gap: spacing.sm, marginTop: spacing.xl },
  logo: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    backgroundColor: colors.brand500,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logoText: { color: colors.white, fontSize: 24, fontWeight: '700' },
  eyebrow: {
    ...typography.label,
    color: colors.brand600,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: { ...typography.display, color: colors.textPrimary },
  subtitle: { ...typography.body, color: colors.textSecondary, maxWidth: 420 },
  stats: { gap: spacing.sm, marginVertical: spacing.xl },
  actions: { gap: spacing.sm },
  footer: { ...typography.caption, color: colors.textMuted, textAlign: 'center' },
});
