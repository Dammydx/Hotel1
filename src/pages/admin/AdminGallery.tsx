import React, { useEffect, useState } from 'react';
import supabase, { supabaseServiceRole } from '../../lib/supabase';
import { uploadToStorage } from '../../lib/storage';
import AdminHeader from '../../components/AdminHeader';

interface GalleryItem {
  id: string;
  image_url: string;
  title: string;
  is_active: boolean;
  sort_order: number;
}

interface GalleryError extends Error {
  message: string;
}

const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('rooms');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!supabaseServiceRole) throw new Error('Service role client not configured.');
        const { data, error } = await supabaseServiceRole.from('gallery_images').select('*').order('sort_order');
        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error('Failed to fetch gallery images with service role:', err);
        const { data, error } = await supabase.from('gallery_images').select('*').order('sort_order');
        if (error) console.warn(error);
        setItems(data || []);
      }
    };
    fetch();
  }, []);

  const ensureService = () => {
    if (!supabaseServiceRole) throw new Error('Service role client not configured. Set VITE_SUPABASE_SERVICE_ROLE_KEY in .env');
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try { ensureService(); } catch (err) {
      const error = err as GalleryError;
      alert(error.message);
      return;
    }
    if (!file) { alert('Select an image'); return; }
    setUploading(true);
    try {
      const path = `gallery/${Date.now()}_${file.name}`;
      const { publicURL } = await uploadToStorage('gallery', path, file);
      await supabaseServiceRole!.from('gallery_images').insert([{ title, category, image_url: publicURL, is_active: true }]);
      const { data } = await supabase.from('gallery_images').select('*').order('sort_order');
      setItems(data || []);
      setShowUpload(false); setTitle(''); setFile(null);
    } catch (err) {
      console.error(err); alert('Upload failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally { setUploading(false); }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <AdminHeader title="Gallery" subtitle="Manage gallery images and categories." />
      <div className="flex items-center justify-between mb-4">
        <div />
        <button onClick={() => setShowUpload(true)} className="bg-amber-600 text-white px-3 py-2 rounded">Upload Image</button>
      </div>

      {showUpload && (
        <form onSubmit={handleUpload} className="mb-6 p-4 border rounded bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input required value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full border p-2 rounded">
                <option value="rooms">Rooms</option>
                <option value="dining">Dining</option>
                <option value="amenities">Amenities</option>
                <option value="events">Events</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-1">Image</label>
              <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0] || null)} className="w-full" />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button disabled={uploading} type="submit" className="bg-amber-600 text-white px-3 py-2 rounded">{uploading ? 'Uploading...' : 'Upload'}</button>
            <button type="button" onClick={()=>setShowUpload(false)} className="border px-3 py-2 rounded">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(i => (
          <div key={i.id} className="rounded overflow-hidden border relative">
            <img src={i.image_url} alt={i.title} className="w-full h-40 object-cover" />
            <div className="p-2 text-sm">{i.title}</div>
            <div className="absolute top-2 right-2 flex gap-2">
              <button onClick={async () => {
                if (!confirm('Delete this image?')) return;
                try {
                  if (!supabaseServiceRole) throw new Error('Service role not configured');
                  await supabaseServiceRole.from('gallery_images').delete().eq('id', i.id);
                  const { data } = await supabase.from('gallery_images').select('*').order('sort_order');
                  setItems(data || []);
                } catch (err) {
                  const error = err as GalleryError;
                  console.error(err);
                  alert('Delete failed: ' + (error.message || err));
                }
              }} className="bg-white/80 text-red-600 px-2 py-1 rounded text-xs">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
