import { router } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { Button, Card, Screen, SectionHeader, TextField } from '@/components/ui';
import { setRole } from '@/features/auth';
import type { UserRole } from '@/lib/types';
import { colors, spacing, typography } from '@/theme';

const ROLES: { id: UserRole; title: string; description: string; icon: string }[] = [
  {
    id: 'donante',
    title: 'Donante',
    description: 'Restaurante, mercado o persona que dona alimentos aptos.',
    icon: '🏪',
  },
  {
    id: 'beneficiario',
    title: 'Organización beneficiaria',
    description: 'Comedor popular u olla común que reserva y recibe donaciones.',
    icon: '🍲',
  },
  {
    id: 'voluntario',
    title: 'Voluntario',
    description: 'Traslada la donación desde el punto de recojo hasta el comedor.',
    icon: '🛵',
  },
];

/**
 * Pantalla 03 · Selección de rol.
 * HU-03 · RF-03: datos de la organización para beneficiarios.
 * Sprint 1 · T-08.
 */
export default function OnboardingScreen() {
  const [selected, setSelected] = useState<UserRole | null>(null);
  const [organization, setOrganization] = useState('');
  const [address, setAddress] = useState('');
  async function submit() {
    if (!selected) return Alert.alert('Elige un rol', 'Selecciona cómo participarás en la red.');
    if (selected === 'beneficiario' && (!organization.trim() || !address.trim()))
      return Alert.alert(
        'Datos de organización',
        'Indica el nombre y la dirección del comedor u organización.',
      );
    try {
      await setRole(selected, organization, address);
      router.replace('/(tabs)/mapa');
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
        eyebrow="Pantalla 03"
        title="¿Cómo participas?"
        subtitle="Elige tu rol principal. Podrás cambiarlo desde tu perfil."
      />

      <View style={styles.list}>
        {ROLES.map((role) => (
          <View key={role.id}>
            <Card
              title={`${selected === role.id ? '✓ ' : ''}${role.icon}  ${role.title}`}
              subtitle={role.description}
              onPress={() => setSelected(role.id)}
            />
          </View>
        ))}
      </View>

      {selected === 'beneficiario' ? (
        <View style={styles.orgForm}>
          <TextField
            label="Nombre de la organización"
            value={organization}
            onChangeText={setOrganization}
            placeholder="Comedor u olla común"
          />
          <TextField
            label="Dirección"
            value={address}
            onChangeText={setAddress}
            placeholder="Dirección de la organización"
          />
        </View>
      ) : null}
      <Button label="Continuar" onPress={submit} fullWidth />
      <Text style={styles.note}>
        Si representas a un comedor, te pediremos el nombre y la dirección de la organización.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.sm, marginVertical: spacing.xl },
  orgForm: { gap: spacing.md, marginBottom: spacing.lg },
  note: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
