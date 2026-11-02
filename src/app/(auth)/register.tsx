import { router } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import { useState } from 'react';

import { Button, Screen, SectionHeader, TextField } from '@/components/ui';
import { spacing } from '@/theme';
import { register } from '@/features/auth';
import { isConfigured } from '@/lib/env';

/**
 * Pantalla 01 · Registro.
 * HU-01 · RF-01, RF-02: creación de cuenta y selección de rol.
 * Sprint 1 · T-07.
 */
export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit() {
    if (!fullName.trim() || !email.trim() || !phone.trim())
      return Alert.alert('Completa tus datos', 'Nombre, correo y teléfono son obligatorios.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return Alert.alert('Correo inválido', 'Revisa el formato del correo electrónico.');
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password))
      return Alert.alert('Contraseña débil', 'Usa al menos 8 caracteres, una letra y un número.');
    if (password !== confirm)
      return Alert.alert('Las contraseñas no coinciden', 'Vuelve a escribir la confirmación.');
    setBusy(true);
    try {
      await register({ fullName, email, phone, password });
      router.push('/(auth)/onboarding');
    } catch (error) {
      Alert.alert(
        'No se pudo crear la cuenta',
        error instanceof Error ? error.message : 'Intenta de nuevo.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <Screen>
      <SectionHeader
        eyebrow="Pantalla 01"
        title="Crear cuenta"
        subtitle={
          isConfigured
            ? 'Crea tu cuenta para unirte a la red.'
            : 'Crea tu perfil local de demostración.'
        }
      />

      <View style={styles.form}>
        <TextField
          label="Nombre completo"
          placeholder="Nombres y apellidos"
          autoCapitalize="words"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextField
          label="Correo electrónico"
          placeholder="nombre@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          label="Teléfono"
          placeholder="9XX XXX XXX"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextField
          label="Contraseña"
          placeholder="••••••••"
          secureTextEntry
          hint="Mínimo 8 caracteres, una letra y un número."
          value={password}
          onChangeText={setPassword}
        />
        <TextField
          label="Confirmar contraseña"
          placeholder="••••••••"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />
        <Button
          label={busy ? 'Creando cuenta…' : 'Continuar'}
          onPress={submit}
          fullWidth
          disabled={busy}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.md, marginTop: spacing.xl },
});
