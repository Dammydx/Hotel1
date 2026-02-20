import { supabaseServiceRole } from './supabase';

/**
 * Upload a file to Supabase Storage using the service role client.
 * Note: Do NOT expose service role keys in a public build. Use only in trusted server-side contexts.
 */
export async function uploadToStorage(bucket: string, path: string, file: File | Blob) {
  if (!supabaseServiceRole) throw new Error('Service role client not configured. To upload files from the admin UI you must configure a server-side service role or set VITE_SUPABASE_SERVICE_ROLE_KEY for local dev (DO NOT expose this key in a public build). See README for deploy instructions.');
  const { data, error } = await supabaseServiceRole.storage.from(bucket).upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  // get public URL
  const { data: { publicUrl } } = supabaseServiceRole.storage.from(bucket).getPublicUrl(path);
  return { data, publicURL: publicUrl };
}

export async function deleteFromStorage(bucket: string, publicUrl: string) {
  if (!supabaseServiceRole) throw new Error('Service role client not configured. To delete files please ensure the service role client is configured server-side.');
  // Public URL format: https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) throw new Error('Invalid public URL');
  const path = decodeURIComponent(publicUrl.substring(idx + marker.length));
  const { error } = await supabaseServiceRole.storage.from(bucket).remove([path]);
  if (error) throw error;
  return true;
}

export default {
  uploadToStorage,
  deleteFromStorage,
};
