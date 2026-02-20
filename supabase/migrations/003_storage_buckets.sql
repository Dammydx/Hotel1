-- Migration: Create storage buckets for Cozy Vile Hotel
-- Note: These SQL commands may not work directly in Supabase SQL Editor.
-- Use Supabase Dashboard > Storage to create buckets manually, or use the JavaScript client.

-- Storage buckets (create via Dashboard)
-- - rooms (public)
-- - dining (public)
-- - venues (public)
-- - gallery (public)
-- - amenities (optional, public)

-- Example policies for storage (if you enable RLS on storage):
-- Allow public users to read from public buckets
-- Allow authenticated admin to upload to all buckets

-- Manual steps in Supabase Console:
-- 1. Storage > Create new bucket
-- 2. Name: "rooms" - Public
-- 3. Name: "dining" - Public
-- 4. Name: "venues" - Public
-- 5. Name: "gallery" - Public
-- 6. (Optional) Name: "amenities" - Public

Storage policies (run in SQL editor after buckets are created):
CREATE POLICY "public_read_rooms" ON storage.objects
  FOR SELECT USING (bucket_id = 'rooms');

CREATE POLICY "public_read_dining" ON storage.objects
  FOR SELECT USING (bucket_id = 'dining');

CREATE POLICY "public_read_venues" ON storage.objects
  FOR SELECT USING (bucket_id = 'venues');

CREATE POLICY "public_read_gallery" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');
