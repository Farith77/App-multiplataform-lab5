import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

  return (
    <Screen>
      <SectionHeader
        eyebrow="Pantalla 02"
        title="Iniciar sesión"
        subtitle="Ingresa con tu correo para continuar."
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
        <Button label="Ingresar" onPress={() => router.replace('/(tabs)/mapa')} fullWidth />
        <Button
          label="¿Olvidaste tu contraseña?"
          variant="ghost"
          onPress={() => router.push('/(auth)/register')}
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
