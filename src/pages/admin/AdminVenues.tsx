import React, { useEffect, useState } from 'react';
import supabase, { supabaseServiceRole } from '../../lib/supabase';
import { uploadToStorage } from '../../lib/storage';
import AdminHeader from '../../components/AdminHeader';

interface Venue {
  id: string;
  name: string;
  slug: string;
  capacity: number;
  short_description: string;
  full_description: string;
  is_active: boolean;
  sort_order: number;
}

interface VenueForm {
  name: string;
  slug: string;
  capacity: number;
  short_description: string;
  full_description: string;
  is_active: boolean;
}

interface VenueError extends Error {
  message: string;
}

const AdminVenues: React.FC = () => {
  const [items, setItems] = useState<Venue[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<VenueForm>({ name: '', slug: '', capacity: 0, short_description: '', full_description: '', is_active: true });
  const [files, setFiles] = useState<FileList | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<VenueForm | null>(null);
  const [editFiles, setEditFiles] = useState<FileList | null>(null);

  const ensureService = () => { if (!supabaseServiceRole) throw new Error('Service role client not configured.'); };

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!supabaseServiceRole) throw new Error('Service role client not configured');
        const { data, error } = await supabaseServiceRole.from('venues').select('*').order('sort_order');
        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error('Failed to fetch venues with service role:', err);
        const { data, error } = await supabase.from('venues').select('*').order('sort_order');
        if (error) console.warn(error);
        setItems(data || []);
      }
    };
    fetch();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try { ensureService(); } catch (err) {
      const error = err as VenueError;
      alert(error.message);
      return;
    }
    setCreating(true);
    try {
      const { data: venue } = await supabaseServiceRole!.from('venues').insert([form]).select().single();
      if (files && files.length > 0) {
        for (let i=0;i<files.length;i++){
          const file = files[i];
          const path = `venues/${venue.id}/${Date.now()}_${file.name}`;
          const { publicURL } = await uploadToStorage('venues', path, file);
          await supabaseServiceRole!.from('venue_images').insert([{ venue_id: venue.id, image_url: publicURL, sort_order: i }]);
        }
      }
      const { data } = await supabase.from('venues').select('*').order('sort_order');
      setItems(data || []);
      setShowCreate(false); setForm({ name: '', slug: '', capacity: 0, short_description: '', full_description: '', is_active: true }); setFiles(null);
    } catch (err) {
      const error = err as VenueError;
      console.error(err);
      alert('Failed to create venue: ' + (error.message || err));
    }
    finally { setCreating(false); }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !editForm) return;
    try {
      if (!supabaseServiceRole) throw new Error('Service role client not configured');
      await supabaseServiceRole.from('venues').update(editForm).eq('id', editingId);
      if (editFiles && editFiles.length > 0) {
        for (let i=0;i<editFiles.length;i++){
          const file = editFiles[i];
          const path = `venues/${editingId}/${Date.now()}_${file.name}`;
          const { publicURL } = await uploadToStorage('venues', path, file);
          await supabaseServiceRole.from('venue_images').insert([{ venue_id: editingId, image_url: publicURL, sort_order: i }]);
        }
      }
      const { data } = await supabase.from('venues').select('*').order('sort_order');
      setItems(data || []);
      setEditingId(null); setEditForm(null); setEditFiles(null);
    } catch (err) {
      const error = err as VenueError;
      console.error(err);
      alert('Update failed: ' + (error.message || err));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <AdminHeader title="Venues" subtitle="Manage event venues and images." />
      <div className="flex items-center justify-between mb-4">
        <div />
        <button onClick={()=>setShowCreate(true)} className="bg-amber-600 text-white px-3 py-2 rounded">Create Venue</button>
      </div>
      {showCreate && (
        <form onSubmit={handleCreate} className="mb-6 p-4 border rounded bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input required value={form.name} onChange={(e)=>setForm({...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,'-')})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input value={form.slug} onChange={(e)=>setForm({...form, slug: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Capacity</label>
              <input type="number" value={form.capacity} onChange={(e)=>setForm({...form, capacity: Number(e.target.value)})} className="w-full border p-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Short description</label>
              <input value={form.short_description} onChange={(e)=>setForm({...form, short_description: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Full description</label>
              <textarea value={form.full_description} onChange={(e)=>setForm({...form, full_description: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1">Images</label>
              <input type="file" multiple accept="image/*" onChange={(e)=>setFiles(e.target.files)} />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button disabled={creating} type="submit" className="bg-amber-600 text-white px-3 py-2 rounded">{creating ? 'Creating...' : 'Create'}</button>
            <button type="button" onClick={()=>setShowCreate(false)} className="border px-3 py-2 rounded">Cancel</button>
          </div>
        </form>
      )}

      {editingId && editForm && (
        <form onSubmit={handleUpdate} className="mb-6 p-4 border rounded bg-white">
          <h3 className="font-semibold mb-3">Edit Venue</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input required value={editForm.name || ''} onChange={(e)=>setEditForm({...editForm, name: e.target.value})} placeholder="Name" className="border p-2 rounded" />
            <input value={editForm.slug || ''} onChange={(e)=>setEditForm({...editForm, slug: e.target.value})} placeholder="Slug" className="border p-2 rounded" />
            <input type="number" value={editForm.capacity || 0} onChange={(e)=>setEditForm({...editForm, capacity: Number(e.target.value)})} placeholder="Capacity" className="border p-2 rounded" />
            <input value={editForm.short_description || ''} onChange={(e)=>setEditForm({...editForm, short_description: e.target.value})} placeholder="Short description" className="border p-2 rounded md:col-span-2" />
            <textarea value={editForm.full_description || ''} onChange={(e)=>setEditForm({...editForm, full_description: e.target.value})} placeholder="Full description" className="border p-2 rounded md:col-span-2" />
            <div className="md:col-span-2">
              <label className="block mb-1">Add Images</label>
              <input type="file" multiple accept="image/*" onChange={(e)=>setEditFiles(e.target.files)} />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button type="submit" className="bg-amber-600 text-white px-3 py-2 rounded">Save</button>
            <button type="button" onClick={()=>{setEditingId(null); setEditForm(null); setEditFiles(null);}} className="border px-3 py-2 rounded">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(v => (
          <div key={v.id} className="p-4 border rounded relative">
            <div className="font-medium mb-1">{v.name}</div>
            <div className="text-sm text-gray-600 mb-3">Capacity: {v.capacity}</div>
            <div className="flex gap-2">
              <button className="border px-3 py-1 rounded">Edit</button>
              <button onClick={async () => {
                if (!confirm('Delete this venue?')) return;
                try {
                  if (!supabaseServiceRole) throw new Error('Service role not configured');
                  await supabaseServiceRole.from('venues').delete().eq('id', v.id);
                  const { data } = await supabase.from('venues').select('*').order('sort_order');
                  setItems(data || []);
                } catch (err) {
                  const error = err as VenueError;
                  console.error(err);
                  alert('Delete failed: ' + (error.message || err));
                }
              }} className="border px-3 py-1 rounded text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVenues;
