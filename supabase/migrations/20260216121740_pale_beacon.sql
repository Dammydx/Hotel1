/*
  # Hotel Website Database Schema

  1. New Tables
    - `rooms` - Hotel room types and information
      - `id` (uuid, primary key)
      - `name` (text) - Room type name
      - `description` (text) - Room description
      - `price_per_night` (decimal) - Base price
      - `capacity` (integer) - Maximum occupancy
      - `size_sqm` (integer) - Room size in square meters
      - `amenities` (text[]) - Array of amenities
      - `image_urls` (text[]) - Array of image URLs
      - `is_available` (boolean) - Availability status
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `amenities` - Hotel amenities and services
      - `id` (uuid, primary key)
      - `name` (text) - Amenity name
      - `description` (text) - Description
      - `category` (text) - Category (spa, fitness, dining, etc.)
      - `icon` (text) - Lucide icon name
      - `image_url` (text) - Feature image
      - `is_featured` (boolean) - Show on homepage
      - `created_at` (timestamp)

    - `gallery` - Photo gallery
      - `id` (uuid, primary key)
      - `title` (text) - Image title
      - `description` (text) - Image description
      - `image_url` (text) - Image URL
      - `category` (text) - Category (rooms, dining, spa, exterior, etc.)
      - `is_featured` (boolean) - Show on homepage
      - `sort_order` (integer) - Display order
      - `created_at` (timestamp)

    - `bookings` - Guest reservations
      - `id` (uuid, primary key)
      - `guest_name` (text) - Guest full name
      - `guest_email` (text) - Contact email
      - `guest_phone` (text) - Contact phone
      - `room_id` (uuid, foreign key) - Reference to rooms
      - `check_in` (date) - Check-in date
      - `check_out` (date) - Check-out date
      - `guests` (integer) - Number of guests
      - `total_amount` (decimal) - Total booking amount
      - `status` (text) - pending, confirmed, cancelled, completed
      - `special_requests` (text) - Guest requests
      - `created_at` (timestamp)

    - `events` - Meetings and events
      - `id` (uuid, primary key)
      - `title` (text) - Event title
      - `description` (text) - Event description
      - `event_type` (text) - meeting, wedding, conference, etc.
      - `capacity` (integer) - Maximum attendees
      - `price_per_person` (decimal) - Cost per person
      - `amenities` (text[]) - Available amenities
      - `image_urls` (text[]) - Event space images
      - `is_available` (boolean) - Availability
      - `created_at` (timestamp)

    - `testimonials` - Guest reviews
      - `id` (uuid, primary key)
      - `guest_name` (text) - Guest name
      - `rating` (integer) - 1-5 star rating
      - `review` (text) - Review text
      - `stay_date` (date) - Date of stay
      - `is_approved` (boolean) - Admin approval
      - `is_featured` (boolean) - Show on homepage
      - `created_at` (timestamp)

    - `admin_users` - Admin panel access
      - `id` (uuid, primary key, foreign key to auth.users)
      - `email` (text) - Admin email
      - `role` (text) - super_admin, admin, editor
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for display data
    - Admin-only write access
    - Booking creation for authenticated users
*/

-- Create tables
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price_per_night decimal(10,2) NOT NULL,
  capacity integer NOT NULL DEFAULT 2,
  size_sqm integer,
  amenities text[] DEFAULT '{}',
  image_urls text[] DEFAULT '{}',
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  icon text DEFAULT 'star',
  image_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text,
  room_id uuid REFERENCES rooms(id),
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_type text NOT NULL,
  capacity integer NOT NULL,
  price_per_person decimal(10,2),
  amenities text[] DEFAULT '{}',
  image_urls text[] DEFAULT '{}',
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text NOT NULL,
  stay_date date,
  is_approved boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  role text DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Public read access for display content
CREATE POLICY "Public can read rooms" ON rooms FOR SELECT TO public USING (is_available = true);
CREATE POLICY "Public can read amenities" ON amenities FOR SELECT TO public USING (true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT TO public USING (true);
CREATE POLICY "Public can read events" ON events FOR SELECT TO public USING (is_available = true);
CREATE POLICY "Public can read approved testimonials" ON testimonials FOR SELECT TO public USING (is_approved = true);

-- Booking policies
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can read own bookings" ON bookings FOR SELECT TO authenticated USING (auth.jwt() ->> 'email' = guest_email);

-- Admin policies
CREATE POLICY "Admins can manage all data" ON rooms FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can manage amenities" ON amenities FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can manage gallery" ON gallery FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can manage bookings" ON bookings FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can manage events" ON events FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rooms_available ON rooms(is_available);
CREATE INDEX IF NOT EXISTS idx_amenities_category ON amenities(category);
CREATE INDEX IF NOT EXISTS idx_amenities_featured ON amenities(is_featured);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(is_featured);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);