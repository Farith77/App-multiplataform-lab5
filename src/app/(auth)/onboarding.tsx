import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, Screen, SectionHeader } from '@/components/ui';
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
  return (
    <Screen>
      <SectionHeader
        eyebrow="Pantalla 03"
        title="¿Cómo participas?"
        subtitle="Elige tu rol principal. Podrás cambiarlo desde tu perfil."
      />

      <View style={styles.list}>
        {ROLES.map((role) => (
          <Card key={role.id} title={`${role.icon}  ${role.title}`} subtitle={role.description} />
        ))}
      </View>

      <Button label="Continuar" onPress={() => router.replace('/(tabs)/mapa')} fullWidth />
      <Text style={styles.note}>
        Si representas a un comedor, te pediremos el nombre y la dirección de la organización.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.sm, marginVertical: spacing.xl },
  note: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
