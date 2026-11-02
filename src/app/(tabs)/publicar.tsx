import { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import { Button, Screen, SectionHeader, TextField } from '@/components/ui';
import { createDonation } from '@/features/donations';
import { getCurrentProfile } from '@/features/auth';
import { isConfigured } from '@/lib/env';
import type { FoodCategory } from '@/lib/types';
import { spacing } from '@/theme';

const CATEGORIES: { label: string; value: FoodCategory }[] = [
  { label: 'Frutas y verduras', value: 'frutas_verduras' },
  { label: 'Panadería', value: 'panaderia' },
  { label: 'Lácteos', value: 'lacteos' },
  { label: 'Comida preparada', value: 'cocidos' },
  { label: 'Enlatados', value: 'enlatados' },
  { label: 'Bebidas', value: 'bebidas' },
  { label: 'Otros', value: 'otros' },
];

export default function PublishScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FoodCategory>('otros');
  const [quantity, setQuantity] = useState('');
  const [portions, setPortions] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [pickupFrom, setPickupFrom] = useState('');
  const [pickupTo, setPickupTo] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [photos, setPhotos] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [saving, setSaving] = useState(false);

  async function useCurrentLocation() {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission.granted)
      return Alert.alert(
        'Permiso de ubicación',
        'Puedes escribir las coordenadas manualmente o habilitar el permiso en ajustes.',
      );
    try {
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLatitude(String(current.coords.latitude));
      setLongitude(String(current.coords.longitude));
    } catch {
      Alert.alert(
        'Ubicación no disponible',
        'Verifica que el GPS esté activado y vuelve a intentarlo.',
      );
    }
  }

  async function choosePhotos(fromCamera: boolean) {
    if (fromCamera) {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted)
        return Alert.alert(
          'Permiso de cámara',
          'Habilita el acceso a la cámara para tomar una foto.',
        );
    }
    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.75,
          base64: true,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          selectionLimit: 3,
          quality: 0.75,
          base64: true,
        });
    if (!result.canceled) setPhotos((current) => [...current, ...result.assets].slice(0, 3));
  }

  async function submit() {
    const profile = await getCurrentProfile();
    if (!profile)
      return Alert.alert('Inicia sesión', 'Crea una cuenta o inicia sesión antes de publicar.');
    if (profile.role !== 'donante')
      return Alert.alert(
        'Rol de donante requerido',
        'Completa el onboarding como donante para publicar alimentos.',
      );
    const kg = Number(quantity),
      count = Number(portions);
    const expiry = new Date(expiresAt),
      from = new Date(pickupFrom),
      to = new Date(pickupTo);
    if (
      title.trim().length < 3 ||
      !description.trim() ||
      !address.trim() ||
      !Number.isFinite(kg) ||
      kg <= 0 ||
      !Number.isFinite(count) ||
      count < 0 ||
      !expiresAt ||
      !pickupFrom ||
      !pickupTo
    )
      return Alert.alert('Revisa los datos', 'Completa todos los campos con valores válidos.');
    if ([expiry, from, to].some((date) => Number.isNaN(date.getTime())))
      return Alert.alert(
        'Fecha inválida',
        'Usa el formato AAAA-MM-DDTHH:mm, por ejemplo 2026-11-02T18:00.',
      );
    if (from > to || to > expiry)
      return Alert.alert('Horario inválido', 'El recojo debe finalizar antes de la caducidad.');
    const lat = Number(latitude);
    const lng = Number(longitude);
    if (
      !Number.isFinite(lat) ||
      lat < -90 ||
      lat > 90 ||
      !Number.isFinite(lng) ||
      lng < -180 ||
      lng > 180
    )
      return Alert.alert(
        'Ubicación requerida',
        'Usa tu ubicación actual o indica latitud y longitud válidas.',
      );
    if (expiry.getTime() <= Date.now())
      return Alert.alert('Caducidad vencida', 'La fecha de caducidad debe estar en el futuro.');
    if (isConfigured && photos.some((photo) => !photo.base64))
      return Alert.alert(
        'Foto no disponible',
        'Vuelve a seleccionar las imágenes para poder subirlas.',
      );
    try {
      setSaving(true);
      await createDonation({
        donorId: profile.id,
        donorName: profile.organizationName || profile.fullName,
        title: title.trim(),
        description: description.trim(),
        category,
        quantityKg: kg,
        portions: count,
        expiresAt: expiry.toISOString(),
        pickupWindow: { from: from.toISOString(), to: to.toISOString() },
        location: { latitude: lat, longitude: lng, address: address.trim() },
        photos: photos.map((photo) => ({
          uri: photo.uri,
          base64: photo.base64,
          mimeType: photo.mimeType,
        })),
      });
      Alert.alert(
        'Donación guardada',
        isConfigured
          ? 'La publicación y sus fotos se guardaron en Supabase.'
          : 'La publicación se guardó en este dispositivo como demostración.',
      );
      setTitle('');
      setDescription('');
      setQuantity('');
      setPortions('');
      setExpiresAt('');
      setPickupFrom('');
      setPickupTo('');
      setAddress('');
      setLatitude('');
      setLongitude('');
      setPhotos([]);
    } catch {
      Alert.alert(
        'Error',
        'No se pudo guardar la donación. Revisa tu conexión e inténtalo de nuevo.',
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow="Pantalla 07 · Sprint 1"
        title="Publicar donación"
        subtitle={
          isConfigured
            ? 'Publica alimentos para que comedores y voluntarios puedan encontrarlos.'
            : 'Modo local de demostración.'
        }
      />
      <View style={styles.form}>
        <TextField
          label="Título"
          placeholder="Ej. Pan artesanal del día"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />
        <TextField
          label="Descripción"
          placeholder="Describe el estado y presentación de los alimentos"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={styles.choices}>
          <Button label="Elegir fotos" variant="secondary" onPress={() => choosePhotos(false)} />
          <Button label="Tomar foto" variant="secondary" onPress={() => choosePhotos(true)} />
        </View>
        <View style={styles.photos}>
          {photos.map((photo, index) => (
            <Image
              key={`${photo.uri}-${index}`}
              source={{ uri: photo.uri }}
              style={styles.photo}
              accessibilityLabel={`Foto ${index + 1} de la donación`}
            />
          ))}
        </View>
        <View style={styles.choices}>
          {CATEGORIES.map((item) => (
            <Button
              key={item.value}
              label={item.label}
              size="sm"
              variant={category === item.value ? 'primary' : 'secondary'}
              onPress={() => setCategory(item.value)}
            />
          ))}
        </View>
        <TextField
          label="Cantidad (kg)"
          placeholder="5"
          keyboardType="decimal-pad"
          value={quantity}
          onChangeText={setQuantity}
        />
        <TextField
          label="Porciones estimadas"
          placeholder="30"
          keyboardType="number-pad"
          value={portions}
          onChangeText={setPortions}
        />
        <TextField
          label="Caducidad"
          placeholder="AAAA-MM-DDTHH:mm"
          value={expiresAt}
          onChangeText={setExpiresAt}
        />
        <TextField
          label="Inicio del recojo"
          placeholder="AAAA-MM-DDTHH:mm"
          value={pickupFrom}
          onChangeText={setPickupFrom}
        />
        <TextField
          label="Fin del recojo"
          placeholder="AAAA-MM-DDTHH:mm"
          value={pickupTo}
          onChangeText={setPickupTo}
        />
        <TextField
          label="Dirección de recojo"
          placeholder="Calle, número, distrito"
          value={address}
          onChangeText={setAddress}
        />
        <Button
          label="Usar mi ubicación"
          variant="secondary"
          onPress={useCurrentLocation}
          fullWidth
        />
        <TextField
          label="Latitud"
          placeholder="Ej. -16.4090"
          keyboardType="numbers-and-punctuation"
          value={latitude}
          onChangeText={setLatitude}
        />
        <TextField
          label="Longitud"
          placeholder="Ej. -71.5375"
          keyboardType="numbers-and-punctuation"
          value={longitude}
          onChangeText={setLongitude}
        />
        <Button
          label={saving ? 'Guardando…' : 'Guardar publicación'}
          onPress={submit}
          fullWidth
          disabled={saving}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.md, marginTop: spacing.lg },
  choices: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  photos: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  photo: { width: 84, height: 84, borderRadius: 10 },
});
