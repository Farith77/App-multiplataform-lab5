import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button, Screen, SectionHeader, TextField } from '@/components/ui';
import { spacing } from '@/theme';

/**
 * Pantalla 01 · Registro.
 * HU-01 · RF-01, RF-02: creación de cuenta y selección de rol.
 * Sprint 1 · T-07.
 */
export default function RegisterScreen() {
  return (
    <Screen>
      <SectionHeader
        eyebrow="Pantalla 01"
        title="Crear cuenta"
        subtitle="Datos básicos para unirte a la red."
      />

      <View style={styles.form}>
        <TextField
          label="Nombre completo"
          placeholder="Nombres y apellidos"
          autoCapitalize="words"
        />
        <TextField
          label="Correo electrónico"
          placeholder="nombre@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextField label="Teléfono" placeholder="9XX XXX XXX" keyboardType="phone-pad" />
        <TextField
          label="Contraseña"
          placeholder="••••••••"
          secureTextEntry
          hint="Mínimo 8 caracteres."
        />
        <TextField label="Confirmar contraseña" placeholder="••••••••" secureTextEntry />
        <Button label="Continuar" onPress={() => router.push('/(auth)/onboarding')} fullWidth />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.md, marginTop: spacing.xl },
});
