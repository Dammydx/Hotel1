import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase';
import Carousel from '../components/Carousel';
import LightboxModal from '../components/LightboxModal';

interface DiningImage {
  id: string;
  image_url: string;
}

interface DiningOutletDetail {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  opening_hours: string;
  is_active: boolean;
  sort_order: number;
  dining_images?: DiningImage[];
}

const DiningDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [outlet, setOutlet] = useState<DiningOutletDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('dining_outlets').select('*, dining_images(*)').eq('slug', slug).single();
      if (error) console.error(error);
      setOutlet(data || null);
      setLoading(false);
    };
    if (slug) fetch();
  }, [slug]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!outlet) return <div className="p-6">Dining outlet not found</div>;

  const images = (outlet.dining_images || []).map((di: DiningImage) => ({ url: di.image_url, alt: outlet.name }));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button className="text-sm text-amber-600 mb-4" onClick={() => navigate(-1)}>← Back</button>
      <h1 className="text-3xl font-serif mb-4">{outlet.name}</h1>

      {images.length > 0 && <div className="mb-6"><Carousel images={images} /></div>}

      <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: outlet.full_description || outlet.short_description || '' }} />

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Opening Hours</h3>
        <div className="text-gray-600">{outlet.opening_hours || 'See outlet for hours'}</div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setLightboxOpen(true)} className="bg-amber-600 text-white px-4 py-2 rounded">View Images</button>
        <button onClick={() => navigate('/contact', { state: { subject: `Reservation: ${outlet.name}` } })} className="border px-4 py-2 rounded">Reserve a Table</button>
      </div>

      {lightboxOpen && <LightboxModal images={images} onClose={() => setLightboxOpen(false)} />}
    </div>
  );
};

export default DiningDetail;
