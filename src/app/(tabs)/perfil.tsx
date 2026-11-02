import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card, Screen } from '@/components/ui';
import { initials } from '@/lib/format';
import { colors, radius, spacing, typography } from '@/theme';

/**
 * Pantalla 11 · Perfil del usuario.
 * HU-04 · RF-05 · Sprint 1 (T-09).
 */
export default function ProfileScreen() {
  return (
    <Screen>
      <View style={styles.identity}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials('Ana Quispe')}</Text>
        </View>
        <View style={styles.identityText}>
          <Text style={styles.name}>Ana Quispe</Text>
          <Text style={styles.role}>Comedor Popular Virgen de Chapi</Text>
          <Badge label="Organización verificada" tone="success" />
        </View>
      </View>

      <View style={styles.actions}>
        <Card title="Datos de contacto" subtitle="ana.quispe@correo.com · 958 112 334" />
        <Card title="Dirección de recojo" subtitle="Calle Los Andes 220, Arequipa" />
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
          onPress={() => router.replace('/')}
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
