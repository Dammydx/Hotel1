import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import LightboxModal from '../components/LightboxModal';

interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string;
  image_url?: string;
}

const AmenitiesList: React.FC = () => {
  const [items, setItems] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [images, setImages] = useState<Array<{ url: string; alt: string }>>([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('amenities').select('*').order('sort_order');
      if (error) console.error(error);
      setItems(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const openGallery = (item: Amenity) => {
    // For now amenities may not have images; if they do, adjust accordingly
    if (item.image_url) {
      setImages([{ url: item.image_url, alt: item.name }]);
      setLightboxOpen(true);
    }
  };

  if (loading) return <div>Loading amenities…</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map(it => (
        <div key={it.id} className="flex gap-6 items-center">
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">{/* icon placeholder */}</div>
          <div>
            <div className="font-semibold text-lg">{it.name}</div>
            <div className="text-gray-600">{it.description}</div>
            {it.image_url && <button onClick={() => openGallery(it)} className="mt-2 text-amber-600">View Image</button>}
          </div>
        </div>
      ))}

      {lightboxOpen && <LightboxModal images={images} onClose={() => setLightboxOpen(false)} />}
    </div>
  );
};

export default AmenitiesList;
