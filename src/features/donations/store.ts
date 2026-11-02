import { decode } from 'base64-arraybuffer';

import { STORAGE_KEYS, storage } from '@/lib/storage';
import { supabase } from '@/lib/supabase';
import type { Donation } from '@/lib/types';

import { MOCK_DONATIONS } from './mock';

type PhotoInput = { uri: string; base64?: string | null; mimeType?: string | null };
type DonationInput = Omit<Donation, 'id' | 'createdAt' | 'status'> & { photos?: PhotoInput[] };
type DonationRow = {
  id: string;
  donor_id: string;
  donor_name: string;
  title: string;
  description: string;
  category: Donation['category'];
  quantity_kg: number;
  portions: number;
  expires_at: string;
  pickup_from: string;
  pickup_to: string;
  address: string;
  latitude: number;
  longitude: number;
  status: Donation['status'];
  created_at: string;
  donation_media?: { storage_path: string; position: number }[];
};

function toDonation(row: DonationRow): Donation {
  return {
    id: row.id,
    donorId: row.donor_id,
    donorName: row.donor_name,
    title: row.title,
    description: row.description,
    category: row.category,
    quantityKg: Number(row.quantity_kg),
    portions: row.portions,
    expiresAt: row.expires_at,
    pickupWindow: { from: row.pickup_from, to: row.pickup_to },
    location: { address: row.address, latitude: row.latitude, longitude: row.longitude },
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function listDonations(): Promise<Donation[]> {
  const client = supabase;
  if (client) {
    const { data, error } = await client
      .from('donations')
      .select(
        'id,donor_id,donor_name,title,description,category,quantity_kg,portions,expires_at,pickup_from,pickup_to,address,latitude,longitude,status,created_at,donation_media(storage_path,position)',
      )
      .eq('status', 'disponible')
      .gt('expires_at', new Date().toISOString())
      .order('expires_at', { ascending: true });
    if (error) throw error;
    return Promise.all(
      (data as DonationRow[]).map(async (row) => {
        const donation = toDonation(row);
        const photo = row.donation_media?.[0];
        if (!photo) return donation;
        const { data: signed, error: photoError } = await client.storage
          .from('donation-media')
          .createSignedUrl(photo.storage_path, 3600);
        return photoError ? donation : { ...donation, photoUrl: signed.signedUrl };
      }),
    );
  }
  const donations = (await storage.get<Donation[]>(STORAGE_KEYS.cachedDonations)) ?? MOCK_DONATIONS;
  const now = Date.now();
  return donations.filter(
    (item) => item.status === 'disponible' && new Date(item.expiresAt).getTime() > now,
  );
}

export async function createDonation(input: DonationInput): Promise<Donation> {
  const client = supabase;
  if (client) {
    const { data, error } = await client
      .from('donations')
      .insert({
        donor_id: input.donorId,
        title: input.title,
        description: input.description ?? '',
        category: input.category,
        quantity_kg: input.quantityKg,
        portions: input.portions,
        expires_at: input.expiresAt,
        pickup_from: input.pickupWindow.from,
        pickup_to: input.pickupWindow.to,
        address: input.location.address,
        latitude: input.location.latitude,
        longitude: input.location.longitude,
      })
      .select(
        'id,donor_id,donor_name,title,description,category,quantity_kg,portions,expires_at,pickup_from,pickup_to,address,latitude,longitude,status,created_at',
      )
      .single();
    if (error) throw error;
    const donation = toDonation(data as DonationRow);
    const mediaRows: { donation_id: string; storage_path: string; position: number }[] = [];
    for (const [index, photo] of (input.photos ?? []).entries()) {
      if (!photo.base64) continue;
      const mimeType = photo.mimeType === 'image/png' ? 'image/png' : 'image/jpeg';
      const extension = mimeType === 'image/png' ? 'png' : 'jpg';
      const storagePath = `${input.donorId}/${donation.id}/${index + 1}.${extension}`;
      const { error: uploadError } = await client.storage
        .from('donation-media')
        .upload(storagePath, decode(photo.base64), { contentType: mimeType, upsert: false });
      if (uploadError) throw uploadError;
      mediaRows.push({ donation_id: donation.id, storage_path: storagePath, position: index + 1 });
    }
    if (mediaRows.length) {
      const { error: mediaError } = await client.from('donation_media').insert(mediaRows);
      if (mediaError) throw mediaError;
      const firstMedia = mediaRows[0];
      if (!firstMedia) return donation;
      const { data: signed } = await client.storage
        .from('donation-media')
        .createSignedUrl(firstMedia.storage_path, 3600);
      if (signed) donation.photoUrl = signed.signedUrl;
    }
    return donation;
  }
  const donations = (await storage.get<Donation[]>(STORAGE_KEYS.cachedDonations)) ?? MOCK_DONATIONS;
  const donation: Donation = {
    ...input,
    id: `demo-don-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'disponible',
    photoUrl: input.photos?.[0]?.uri,
  };
  await storage.set(STORAGE_KEYS.cachedDonations, [donation, ...donations]);
  return donation;
}

export async function updateDonation(id: string, patch: Partial<Donation>): Promise<void> {
  const client = supabase;
  if (client) {
    const values: Record<string, unknown> = {};
    if (patch.title !== undefined) values.title = patch.title;
    if (patch.description !== undefined) values.description = patch.description;
    if (patch.category !== undefined) values.category = patch.category;
    if (patch.quantityKg !== undefined) values.quantity_kg = patch.quantityKg;
    if (patch.portions !== undefined) values.portions = patch.portions;
    if (patch.expiresAt !== undefined) values.expires_at = patch.expiresAt;
    if (patch.pickupWindow?.from !== undefined) values.pickup_from = patch.pickupWindow.from;
    if (patch.pickupWindow?.to !== undefined) values.pickup_to = patch.pickupWindow.to;
    if (patch.location?.address !== undefined) values.address = patch.location.address;
    if (patch.location?.latitude !== undefined) values.latitude = patch.location.latitude;
    if (patch.location?.longitude !== undefined) values.longitude = patch.location.longitude;
    if (patch.status !== undefined) values.status = patch.status;
    const { error } = await client.from('donations').update(values).eq('id', id);
    if (error) throw error;
    return;
  }
  const donations = (await storage.get<Donation[]>(STORAGE_KEYS.cachedDonations)) ?? MOCK_DONATIONS;
  await storage.set(
    STORAGE_KEYS.cachedDonations,
    donations.map((item) => (item.id === id ? { ...item, ...patch } : item)),
  );
}
