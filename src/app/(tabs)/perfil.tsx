import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import { Badge, Button, Card, Screen } from '@/components/ui';
import { initials } from '@/lib/format';
import { getCurrentProfile, signOut } from '@/features/auth';
import type { Profile } from '@/lib/types';
import { colors, radius, spacing, typography } from '@/theme';

/**
 * Pantalla 11 · Perfil del usuario.
 * HU-04 · RF-05 · Sprint 1 (T-09).
 */
export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    void getCurrentProfile().then(setProfile);
  }, []);
  const name = profile?.fullName ?? 'Invitado';
  return (
    <Screen>
      <View style={styles.identity}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials(name)}</Text>
        </View>
        <View style={styles.identityText}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>
            {profile?.organizationName ?? profile?.role ?? 'Inicia sesión para ver tu perfil'}
          </Text>
          {profile?.role === 'beneficiario' ? (
            <Badge
              label={
                profile.verified
                  ? 'Organización verificada'
                  : 'Organización pendiente de verificación'
              }
              tone={profile.verified ? 'success' : 'warning'}
            />
          ) : null}
        </View>
      </View>

      <View style={styles.actions}>
        <Card title="Datos de contacto" subtitle={profile?.phone ?? 'Sin teléfono registrado'} />
        <Card
          title="Dirección de recojo"
          subtitle={profile?.address ?? 'Sin dirección registrada'}
        />
        <Card title="Notificaciones" subtitle="Recordatorios de recojo y caducidad activos" />
      </View>

      <View style={styles.buttons}>
        <Button
          label="Editar perfil"
          variant="secondary"
          onPress={() => router.push('/perfil/editar')}
          fullWidth
        />
        <Button
          label="Cerrar sesión"
          variant="ghost"
          onPress={() => {
            void signOut().then(() => router.replace('/'));
          }}
          fullWidth
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  identity: { flexDirection: 'row', gap: spacing.md, alignItems: 'center', marginTop: spacing.md },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.brand500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.white, fontSize: 22, fontWeight: '700' },
  identityText: { flex: 1, gap: 2 },
  name: { ...typography.h2, color: colors.textPrimary },
  role: { ...typography.caption, color: colors.textMuted, marginBottom: spacing.xs },
  actions: { gap: spacing.sm, marginTop: spacing.xl },
  buttons: { gap: spacing.sm, marginTop: spacing.xl },
});
