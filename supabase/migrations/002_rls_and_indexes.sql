-- Migration: Add indexes and example minimal RLS policies

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_rooms_slug ON rooms(slug);
CREATE INDEX IF NOT EXISTS idx_dining_slug ON dining_outlets(slug);
CREATE INDEX IF NOT EXISTS idx_venues_slug ON venues(slug);

-- Example: Allow public SELECT on content tables only when is_active = true
-- Note: Run these as a DB admin and adjust roles per your Supabase setup.
-- Enable row level security
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE dining_outlets ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Allow public role to select active records
CREATE POLICY "public_select_active_rooms" ON rooms
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "public_select_active_dining" ON dining_outlets
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "public_select_active_venues" ON venues
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "public_select_active_experiences" ON experiences
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "public_select_active_testimonials" ON testimonials
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "public_select_active_gallery" ON gallery_images
  FOR SELECT
  USING (is_active = true);

-- Allow inserts for newsletter and contact messages
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert_newsletter" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert_contact" ON contact_messages
  FOR INSERT
  WITH CHECK (true);
