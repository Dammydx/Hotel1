export interface Room {
  id: string;
  name: string;
  description: string;
  price_per_night: number;
  capacity: number;
  size_sqm?: number;
  amenities: string[];
  image_urls: string[];
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  image_url?: string;
  is_featured: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Booking {
  id: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  room_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  special_requests?: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_type: string;
  capacity: number;
  price_per_person?: number;
  amenities: string[];
  image_urls: string[];
  is_available: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  guest_name: string;
  rating: number;
  review: string;
  stay_date?: string;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor';
  created_at: string;
}