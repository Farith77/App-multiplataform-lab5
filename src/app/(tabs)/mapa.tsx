import { router } from 'expo-router';
import { Alert, Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import MapView, { Marker, type Region } from 'react-native-maps';
import * as Location from 'expo-location';

import { Badge, Button, Card, Screen, SectionHeader } from '@/components/ui';
import { listDonations } from '@/features/donations';
import type { Donation, FoodCategory } from '@/lib/types';
import { formatKg } from '@/lib/format';
import { colors, radius, spacing, typography } from '@/theme';

/**
 * Pantalla 05 · Mapa de donaciones cercanas.
 * HU-06, HU-07 · RF-13, RF-14 · Sprint 1 (T-13).
 * Mapa nativo para iOS/Android; web conserva la apertura externa en OpenStreetMap.
 */
export default function MapScreen() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [category, setCategory] = useState<FoodCategory | 'todas'>('todas');
  const visibleDonations = donations.filter(
    (donation) => category === 'todas' || donation.category === category,
  );
  const [region, setRegion] = useState<Region>({
    latitude: -16.409,
    longitude: -71.5375,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  });
  useEffect(() => {
    void listDonations().then(setDonations);
  }, []);

  async function centerOnUser() {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission.granted)
      return Alert.alert(
        'Ubicación desactivada',
        'Puedes explorar donaciones y abrir cada punto en OpenStreetMap.',
      );
    setShowUserLocation(true);
    try {
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setRegion({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
    } catch {
      Alert.alert(
        'Ubicación no disponible',
        'Verifica que el GPS esté activado y vuelve a intentarlo.',
      );
    }
  }
  return (
    <Screen scroll={false} padded={false}>
      <View style={styles.header}>
        <SectionHeader
          eyebrow="Cerca de ti"
          title="Donaciones disponibles"
          subtitle={`${visibleDonations.length} donaciones en el área visible`}
        />
        <View style={styles.chips}>
          <Button
            label="Todas"
            size="sm"
            variant={category === 'todas' ? 'primary' : 'secondary'}
            onPress={() => setCategory('todas')}
          />
          <Button
            label="Frutas y verduras"
            size="sm"
            variant={category === 'frutas_verduras' ? 'primary' : 'secondary'}
            onPress={() => setCategory('frutas_verduras')}
          />
          <Button
            label="Panadería"
            size="sm"
            variant={category === 'panaderia' ? 'primary' : 'secondary'}
            onPress={() => setCategory('panaderia')}
          />
          <Button
            label="Cocidos"
            size="sm"
            variant={category === 'cocidos' ? 'primary' : 'secondary'}
            onPress={() => setCategory('cocidos')}
          />
        </View>
        <Button
          label="Centrar en mi ubicación"
          size="sm"
          variant="secondary"
          onPress={centerOnUser}
        />
      </View>

      {Platform.OS === 'web' ? (
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapIcon}>🗺️</Text>
          <Text style={styles.mapTitle}>Explora los puntos de recojo</Text>
          <Text style={styles.mapText}>En web puedes abrir cada ubicación en OpenStreetMap.</Text>
          <Button
            label="Ver listado"
            variant="secondary"
            size="sm"
            onPress={() => router.push('/(tabs)/donaciones')}
          />
        </View>
      ) : (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          showsUserLocation={showUserLocation}
        >
          {visibleDonations.map((donation) => (
            <Marker
              key={donation.id}
              coordinate={{
                latitude: donation.location.latitude,
                longitude: donation.location.longitude,
              }}
              title={donation.title}
              description={`${donation.donorName} · ${formatKg(donation.quantityKg)}`}
              onCalloutPress={() => router.push(`/donacion/${donation.id}`)}
            />
          ))}
        </MapView>
      )}

      <View style={styles.list}>
        {visibleDonations.slice(0, 2).map((donation) => (
          <Card
            key={donation.id}
            title={donation.title}
            subtitle={`${donation.donorName} · ${formatKg(donation.quantityKg)}`}
            footer={
              <View style={styles.actions}>
                <Button
                  label="Ver detalle"
                  size="sm"
                  variant="secondary"
                  onPress={() => router.push(`/donacion/${donation.id}`)}
                />
                <Button
                  label="Abrir mapa"
                  size="sm"
                  variant="ghost"
                  onPress={() => {
                    const { latitude, longitude } = donation.location;
                    void Linking.openURL(
                      `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`,
                    );
                  }}
                />
              </View>
            }
          >
            <Badge
              label={donation.status === 'disponible' ? 'Disponible' : 'Reservada'}
              tone={donation.status === 'disponible' ? 'success' : 'info'}
            />
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  mapPlaceholder: {
    margin: spacing.lg,
    height: 220,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  map: { height: 250, margin: spacing.lg, borderRadius: radius.lg },
  mapIcon: { fontSize: 32 },
  mapTitle: { ...typography.h3, color: colors.textPrimary },
  mapText: { ...typography.caption, color: colors.textMuted },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing['2xl'], gap: spacing.sm },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
});
