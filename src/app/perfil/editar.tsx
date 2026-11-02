import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Button, Screen, SectionHeader, TextField } from '@/components/ui';
import { updateProfile } from '@/features/auth';
import { STORAGE_KEYS, storage } from '@/lib/storage';
import type { Profile } from '@/lib/types';
import { spacing } from '@/theme';

export default function EditProfileScreen() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [address, setAddress] = useState('');
  useEffect(() => {
    void storage.get<Profile>(STORAGE_KEYS.session).then((profile) => {
      if (profile) {
        setFullName(profile.fullName);
        setPhone(profile.phone ?? '');
        setOrganizationName(profile.organizationName ?? '');
        setAddress(profile.address ?? '');
      }
    });
  }, []);
  async function save() {
    if (!fullName.trim() || !phone.trim())
      return Alert.alert('Datos obligatorios', 'Ingresa tu nombre y teléfono.');
    try {
      await updateProfile({
        fullName: fullName.trim(),
        phone: phone.trim(),
        organizationName: organizationName.trim() || undefined,
        address: address.trim() || undefined,
      });
      router.back();
    } catch (error) {
      Alert.alert(
        'No se pudo guardar',
        error instanceof Error ? error.message : 'Intenta de nuevo.',
      );
    }
  }
  return (
    <Screen>
      <SectionHeader
        eyebrow="Pantalla 12 · Sprint 1"
        title="Editar perfil"
        subtitle="Mantén tus datos de contacto actualizados."
      />
      <View style={styles.form}>
        <TextField label="Nombre completo" value={fullName} onChangeText={setFullName} />
        <TextField
          label="Teléfono"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextField
          label="Nombre de la organización"
          placeholder="Solo para organizaciones"
          value={organizationName}
          onChangeText={setOrganizationName}
        />
        <TextField
          label="Dirección"
          placeholder="Calle, número, distrito"
          value={address}
          onChangeText={setAddress}
        />
        <Button label="Guardar cambios" onPress={save} fullWidth />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({ form: { gap: spacing.md, marginTop: spacing.xl } });
