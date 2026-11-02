import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button, Screen, SectionHeader, TextField } from '@/components/ui';
import { spacing } from '@/theme';

/**
 * Pantalla 12 · Editar perfil.
 * HU-04 · RF-05 · Sprint 1 (T-09).
 */
export default function EditProfileScreen() {
  return (
    <Screen>
      <SectionHeader
        eyebrow="Pantalla 12"
        title="Editar perfil"
        subtitle="Mantén tus datos de contacto actualizados."
      />

      <View style={styles.form}>
        <TextField label="Nombre completo" placeholder="Nombres y apellidos" />
        <TextField label="Correo electrónico" keyboardType="email-address" autoCapitalize="none" />
        <TextField label="Teléfono" keyboardType="phone-pad" />
        <TextField label="Nombre de la organización" placeholder="Solo para beneficiarios" />
        <TextField label="Dirección" placeholder="Calle, número, distrito" />
        <Button label="Guardar cambios" onPress={() => router.back()} fullWidth />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.md, marginTop: spacing.xl },
});
