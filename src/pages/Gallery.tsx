import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import LightboxModal from '../components/LightboxModal';

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  is_active: boolean;
  sort_order: number;
}

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('gallery_images').select('*').eq('is_active', true).order('sort_order');
      if (error) console.error(error);
      setItems(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const images = items.map(i => ({ url: i.image_url, alt: i.title }));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-serif mb-6">Gallery</h1>
      {loading ? <div>Loading…</div> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((it, idx) => (
            <div key={it.id} className="cursor-pointer" onClick={() => setOpenIdx(idx)}>
              <img src={it.image_url} alt={it.title} className="w-full h-48 object-cover rounded" />
            </div>
          ))}
        </div>
      )}

      {openIdx !== null && <LightboxModal images={images} startIndex={openIdx} onClose={() => setOpenIdx(null)} />}
    </div>
  );
};

export default Gallery;