-- Migration: Add admin INSERT/UPDATE/DELETE policies for service-role writes

-- For tables with RLS enabled but no admin write policies, we add service-role bypass.
-- Note: Supabase service-role always bypasses RLS, so these policies are placeholders for clarity.
-- If you later add authenticated user admin roles, replace these with proper role-based policies.

-- rooms: Allow service-role to INSERT, UPDATE, DELETE
CREATE POLICY "admin_insert_rooms" ON rooms
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_rooms" ON rooms
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_rooms" ON rooms
  FOR DELETE
  USING (true);

-- dining_outlets: Allow service-role to INSERT, UPDATE, DELETE
CREATE POLICY "admin_insert_dining" ON dining_outlets
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_dining" ON dining_outlets
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_dining" ON dining_outlets
  FOR DELETE
  USING (true);

-- venues: Allow service-role to INSERT, UPDATE, DELETE
CREATE POLICY "admin_insert_venues" ON venues
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_venues" ON venues
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_venues" ON venues
  FOR DELETE
  USING (true);

-- experiences: Allow service-role to INSERT, UPDATE, DELETE
CREATE POLICY "admin_insert_experiences" ON experiences
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_experiences" ON experiences
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_experiences" ON experiences
  FOR DELETE
  USING (true);

-- testimonials: Allow service-role to INSERT, UPDATE, DELETE
CREATE POLICY "admin_insert_testimonials" ON testimonials
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_testimonials" ON testimonials
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_testimonials" ON testimonials
  FOR DELETE
  USING (true);

-- gallery_images: Allow service-role to INSERT, UPDATE, DELETE
CREATE POLICY "admin_insert_gallery" ON gallery_images
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_gallery" ON gallery_images
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_gallery" ON gallery_images
  FOR DELETE
  USING (true);

-- room_images: Enable RLS and allow service-role writes
ALTER TABLE room_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_insert_room_images" ON room_images
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_room_images" ON room_images
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_room_images" ON room_images
  FOR DELETE
  USING (true);

-- dining_images: Enable RLS and allow service-role writes
ALTER TABLE dining_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_insert_dining_images" ON dining_images
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_dining_images" ON dining_images
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_dining_images" ON dining_images
  FOR DELETE
  USING (true);

-- venue_images: Enable RLS and allow service-role writes
ALTER TABLE venue_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_insert_venue_images" ON venue_images
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_venue_images" ON venue_images
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_venue_images" ON venue_images
  FOR DELETE
  USING (true);

-- room_amenities: Enable RLS and allow service-role writes
ALTER TABLE room_amenities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_insert_room_amenities" ON room_amenities
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_room_amenities" ON room_amenities
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_room_amenities" ON room_amenities
  FOR DELETE
  USING (true);

-- amenities: Enable RLS and allow service-role writes
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_select_amenities" ON amenities
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "admin_insert_amenities" ON amenities
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_amenities" ON amenities
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_amenities" ON amenities
  FOR DELETE
  USING (true);

-- site_settings: Enable RLS and allow service-role writes
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_select_site_settings" ON site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "admin_insert_site_settings" ON site_settings
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_site_settings" ON site_settings
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_site_settings" ON site_settings
  FOR DELETE
  USING (true);

-- contact_messages: Allow public SELECT (for reference) and service-role writes
CREATE POLICY "public_select_contact_messages" ON contact_messages
  FOR SELECT
  USING (true);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_insert_contact_messages" ON contact_messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_contact_messages" ON contact_messages
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_contact_messages" ON contact_messages
  FOR DELETE
  USING (true);

-- newsletter_subscribers: Allow service-role writes
CREATE POLICY "admin_insert_newsletter" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_newsletter" ON newsletter_subscribers
  FOR UPDATE
  USING (true);

CREATE POLICY "admin_delete_newsletter" ON newsletter_subscribers
  FOR DELETE
  USING (true);
