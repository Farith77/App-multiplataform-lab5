import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { signIn } from '@/features/auth';
import { isConfigured } from '@/lib/env';
import { Button, Screen, SectionHeader, TextField } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';

/**
 * Pantalla 02 · Inicio de sesión.
 * HU-02 · RF-01: autenticación por correo y contraseña.
 * Sprint 1 · la validación real y la sesión llegan con T-07.
 */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function submit() {
    try {
      const profile = await signIn(email, password);
      router.replace(profile.needsOnboarding ? '/(auth)/onboarding' : '/(tabs)/mapa');
    } catch (error) {
      Alert.alert(
        'No se pudo iniciar sesión',
        error instanceof Error ? error.message : 'Intenta de nuevo.',
      );
    }
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow="Pantalla 02"
        title="Iniciar sesión"
        subtitle={
          isConfigured
            ? 'Ingresa con tu cuenta de RedSolidaria.'
            : 'Modo demostración local: se valida que el correo esté registrado.'
        }
      />

      <View style={styles.form}>
        <TextField
          label="Correo electrónico"
          placeholder="nombre@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          label="Contraseña"
          placeholder="••••••••"
          secureTextEntry
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
          hint="Mínimo 8 caracteres."
        />
        <Button label="Ingresar" onPress={submit} fullWidth />
        <Button
          label="¿Olvidaste tu contraseña?"
          variant="ghost"
          onPress={() =>
            Alert.alert(
              'Recuperación de contraseña',
              'La recuperación por correo se habilitará al conectar Supabase.',
            )
          }
        />
      </View>

      <Text style={styles.legal}>
        Al continuar aceptas los términos de uso y la política de tratamiento de datos.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.md, marginTop: spacing.xl },
  legal: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
