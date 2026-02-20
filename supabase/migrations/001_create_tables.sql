-- Migration: Create core tables for Cozy Vile Hotel

-- site_settings (single-row)
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_name text,
  logo_url text,
  hero_image_url text,
  address text,
  phone text,
  email text,
  map_embed_url text,
  instagram_url text,
  facebook_url text,
  admin_password text,
  created_at timestamptz DEFAULT now()
);

-- rooms
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  type text,
  short_description text,
  full_description text,
  price_from numeric,
  size text,
  guests integer,
  beds integer,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS room_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  image_url text,
  alt text,
  sort_order integer DEFAULT 0
);

-- amenities and join table
CREATE TABLE IF NOT EXISTS amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  icon_name text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS room_amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  amenity_id uuid REFERENCES amenities(id) ON DELETE CASCADE
);

-- homepage content
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  image_url text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text,
  quote text,
  rating integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- dining
CREATE TABLE IF NOT EXISTS dining_outlets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  slug text UNIQUE,
  short_description text,
  full_description text,
  opening_hours text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS dining_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dining_id uuid REFERENCES dining_outlets(id) ON DELETE CASCADE,
  image_url text,
  sort_order integer DEFAULT 0
);

-- venues
CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  slug text UNIQUE,
  capacity integer,
  short_description text,
  full_description text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS venue_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid REFERENCES venues(id) ON DELETE CASCADE,
  image_url text,
  sort_order integer DEFAULT 0
);

-- gallery
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text,
  title text,
  image_url text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- forms
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text,
  last_name text,
  email text,
  phone text,
  subject text,
  category text,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);
