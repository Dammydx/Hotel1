import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import supabase from '../lib/supabase';
import Carousel from '../components/Carousel';
import LightboxModal from '../components/LightboxModal';

interface RoomImage {
  id: string;
  image_url: string;
  alt: string;
}

interface Amenity {
  id: string;
  name: string;
  title?: string;
  icon: string;
  description: string;
}

interface RoomAmenityJoin {
  id: string;
  room_id: string;
  amenity_id: string;
  amenities: Amenity;
}

interface Room {
  id: string;
  name: string;
  slug: string;
  price_per_night: number;
  price_from: number;
  short_description: string;
  full_description: string;
  max_guests: number;
  guests: number;
  beds: number;
  room_size: string;
  size: string;
  room_type: string;
  type: string;
  is_active: boolean;
  sort_order: number;
  room_images: RoomImage[];
  room_amenities: RoomAmenityJoin[];
}

const RoomDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('rooms').select('*, room_images(*), room_amenities(amenities(*))').eq('slug', slug).single();
      if (error) console.error(error);
      setRoom(data || null);

      // Fetch amenities if room exists
      if (data && data.room_amenities) {
        setAmenities(data.room_amenities.map((ra: RoomAmenityJoin) => ra.amenities));
      }
      setLoading(false);
    };
    if (slug) fetch();
  }, [slug]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!room) return <div className="p-6">Room not found</div>;

  const images = (room.room_images || []).map((ri: RoomImage) => ({ url: ri.image_url, alt: ri.alt }));

  const policies = [
    { title: 'Check-in / Check-out', description: 'Check-in from 3:00 PM / Check-out until 12:00 PM' },
    { title: 'Cancellation', description: 'Free cancellation up to 48 hours before arrival' },
    { title: 'Smoking Policy', description: 'Non-smoking rooms available upon request' },
    { title: 'Pets', description: 'Contact us for pet policies and arrangements' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero with back button */}
      <section className="max-w-7xl mx-auto p-6">
        <button 
          className="text-sm text-amber-600 mb-4 hover:text-amber-700 transition" 
          onClick={() => navigate(-1)}
        >
          ← Back to Rooms
        </button>
        <motion.h1 
          className="text-4xl md:text-5xl font-serif mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {room.name}
        </motion.h1>
      </section>

      {/* Image Carousel */}
      {images.length > 0 && (
        <section className="max-w-7xl mx-auto p-6">
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Carousel images={images} />
          </motion.div>
        </section>
      )}

      {/* Room Details */}
      <section className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <motion.div 
            className="lg:col-span-2"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">About This Room</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {room.full_description || room.short_description}
              </p>
            </div>

            {/* Room Specs */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Room Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-2">Guests</div>
                  <div className="text-2xl font-semibold text-amber-600">{room.guests || '-'}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-2">Beds</div>
                  <div className="text-2xl font-semibold text-amber-600">{room.beds || '-'}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-2">Size</div>
                  <div className="text-2xl font-semibold text-amber-600">{room.size || '-'}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-2">Type</div>
                  <div className="text-2xl font-semibold text-amber-600 capitalize">{room.type || '-'}</div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Room Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900">{amenity.title}</div>
                        {amenity.description && (
                          <div className="text-sm text-gray-600">{amenity.description}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Policies */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Hotel Policies</h3>
              <div className="space-y-3">
                {policies.map((policy, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-1">{policy.title}</div>
                    <div className="text-sm text-gray-600">{policy.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar - Booking Card */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-gray-600 text-sm mb-1">From</div>
                <div className="text-3xl font-serif text-amber-600">
                  ₦{room.price_from?.toLocaleString() || '-'}
                </div>
                <div className="text-xs text-gray-500 mt-1">Per night</div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setLightboxOpen(true)}
                  className="w-full border border-amber-600 text-amber-600 font-semibold py-3 px-4 rounded-lg hover:bg-amber-50 transition"
                >
                  View Gallery
                </button>
                <button 
                  onClick={() => navigate('/contact', { state: { subject: `Reservation: ${room.name}`, category: 'Reservations' } })}
                  className="w-full bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-amber-700 transition"
                >
                  Contact to Reserve
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-500 space-y-2">
                  <div>✓ Free Cancellation</div>
                  <div>✓ Reserve Now, Pay Later</div>
                  <div>✓ Best Price Guarantee</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && <LightboxModal images={images} onClose={() => setLightboxOpen(false)} />}
    </div>
  );
};

export default RoomDetail;
