import React, { useEffect, useState } from 'react';
import supabase, { supabaseServiceRole } from '../../lib/supabase';
import AdminHeader from '../../components/AdminHeader';

interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const AdminAmenities: React.FC = () => {
  const [items, setItems] = useState<Amenity[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<{ title: string; description: string; icon_name: string }>({ title: '', description: '', icon_name: '' });

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!supabaseServiceRole) throw new Error('Service role client not configured');
        const { data, error } = await supabaseServiceRole.from('amenities').select('*').order('sort_order');
        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error('Failed to fetch amenities with service role:', err);
        const { data, error } = await supabase.from('amenities').select('*').order('sort_order');
        if (error) console.warn(error);
        setItems(data || []);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <AdminHeader title="Amenities" subtitle="Manage hotel amenities; add descriptions and icons." />
      <div className="flex items-center justify-between mb-4">
        <div />
        <button onClick={() => setShowCreate(true)} className="bg-amber-600 text-white px-3 py-2 rounded">Create Amenity</button>
      </div>
      {showCreate && (
        <form onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (!supabaseServiceRole) throw new Error('Service role client not configured');
            setCreating(true);
            const payload = { title: form.title, description: form.description, icon_name: form.icon_name, is_active: true } as Record<string, unknown>;
            if (!payload.id) delete payload.id;
            const { error } = await supabaseServiceRole.from('amenities').insert([payload]);
            if (error) throw error;
            const { data } = await supabase.from('amenities').select('*').order('sort_order');
            setItems(data || []);
            setShowCreate(false);
            setForm({ title: '', description: '', icon_name: '' });
          } catch (err) {
            console.error(err);
            alert('Create failed: ' + (err instanceof Error ? err.message : String(err)));
          } finally { setCreating(false); }
        }} className="mb-6 p-4 border rounded bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input required value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Icon name</label>
              <input value={form.icon_name} onChange={(e)=>setForm({...form, icon_name: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} className="w-full border p-2 rounded" />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button disabled={creating} type="submit" className="bg-amber-600 text-white px-3 py-2 rounded">{creating ? 'Creating...' : 'Create'}</button>
            <button type="button" onClick={()=>setShowCreate(false)} className="border px-3 py-2 rounded">Cancel</button>
          </div>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(a => (
          <div key={a.id} className="p-4 border rounded">
            <div className="font-medium mb-1">{a.name}</div>
            <div className="text-sm text-gray-600 mb-3">{a.description}</div>
            <div className="flex gap-2">
              <button className="border px-3 py-1 rounded">Edit</button>
              <button className="border px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAmenities;
