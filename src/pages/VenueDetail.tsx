import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase';
import Carousel from '../components/Carousel';
import LightboxModal from '../components/LightboxModal';

interface VenueImage {
  id: string;
  image_url: string;
}

interface VenueDetail {
  id: string;
  name: string;
  slug: string;
  capacity: number;
  short_description: string;
  full_description: string;
  is_active: boolean;
  sort_order: number;
  venue_images?: VenueImage[];
}

const VenueDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<VenueDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('venues').select('*, venue_images(*)').eq('slug', slug).single();
      if (error) console.error(error);
      setVenue(data || null);
      setLoading(false);
    };
    if (slug) fetch();
  }, [slug]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!venue) return <div className="p-6">Venue not found</div>;

  const images = (venue.venue_images || []).map((vi: VenueImage) => ({ url: vi.image_url, alt: venue.name }));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button className="text-sm text-amber-600 mb-4" onClick={() => navigate(-1)}>← Back</button>
      <h1 className="text-3xl font-serif mb-4">{venue.name}</h1>

      {images.length > 0 && <div className="mb-6"><Carousel images={images} /></div>}

      <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: venue.full_description || venue.short_description || '' }} />

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Capacity</h3>
        <div className="text-gray-600">{venue.capacity}</div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setLightboxOpen(true)} className="bg-amber-600 text-white px-4 py-2 rounded">View Images</button>
        <button onClick={() => navigate('/contact', { state: { subject: `Request Quote: ${venue.name}` } })} className="border px-4 py-2 rounded">Request a Quote</button>
      </div>

      {lightboxOpen && <LightboxModal images={images} onClose={() => setLightboxOpen(false)} />}
    </div>
  );
};

export default VenueDetail;
