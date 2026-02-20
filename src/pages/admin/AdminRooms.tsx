import React, { useEffect, useState } from 'react';
import supabase, { supabaseServiceRole } from '../../lib/supabase';
import { uploadToStorage, deleteFromStorage } from '../../lib/storage';
import AdminHeader from '../../components/AdminHeader';

interface RoomForm {
  name: string;
  slug: string;
  type: string;
  short_description: string;
  full_description: string;
  price_from: number;
  size: string;
  guests: number;
  beds: number;
  is_featured: boolean;
  is_active: boolean;
}

interface RoomListItem {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  price_from: number;
}

interface StorageError extends Error {
  message: string;
}

const AdminRooms: React.FC = () => {
  const [rooms, setRooms] = useState<RoomListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<RoomForm>({
    name: '',
    slug: '',
    type: 'room',
    short_description: '',
    full_description: '',
    price_from: 0,
    size: '',
    guests: 1,
    beds: 1,
    is_featured: false,
    is_active: true
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const ensureServiceRole = () => {
    if (!supabaseServiceRole) throw new Error('Service role client not configured. Set VITE_SUPABASE_SERVICE_ROLE_KEY in .env');
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        if (!supabaseServiceRole) throw new Error('Service role client not configured.');
        const { data, error } = await supabaseServiceRole.from('rooms').select('id,name,slug,is_active,price_from').order('sort_order');
        if (error) throw error;
        setRooms((data || []) as RoomListItem[]);
      } catch (err) {
        console.error('Failed to fetch rooms with service role:', err);
        const { data, error } = await supabase.from('rooms').select('id,name,slug,is_active,price_from').order('sort_order');
        if (error) console.warn(error);
        setRooms((data || []) as RoomListItem[]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      ensureServiceRole();
    } catch (err) {
      const error = err as StorageError;
      alert(error.message);
      return;
    }
    setCreating(true);
    try {
      // insert room via service role
      const { data: roomData, error: roomError } = await supabaseServiceRole!.from('rooms').insert([form]).select().single();
      if (roomError) throw roomError;
      const roomId = roomData.id;

      // upload images
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const path = `${roomId}/${Date.now()}_${file.name}`;
          const { publicURL } = await uploadToStorage('rooms', path, file);
          // insert room_image record via service role
          await supabaseServiceRole!.from('room_images').insert([{ room_id: roomId, image_url: publicURL, alt: file.name, sort_order: i }]);
        }
      }

      // refresh list
      const { data } = await supabase.from('rooms').select('id,name,slug,is_active,price_from').order('sort_order');
      setRooms((data || []) as RoomListItem[]);
      setShowCreate(false);
      setForm({
        name: '',
        slug: '',
        type: 'room',
        short_description: '',
        full_description: '',
        price_from: 0,
        size: '',
        guests: 1,
        beds: 1,
        is_featured: false,
        is_active: true
      });
      setFiles(null);
    } catch (err) {
      const error = err as StorageError;
      console.error(err);
      const msg = (error && error.message) ? error.message : String(err);
      alert('Failed to create room: ' + msg + '\n\nHint: this usually means Supabase row-level security rejected the insert. Ensure a service role or server-side admin endpoint is used for admin writes, and that VITE_SUPABASE_SERVICE_ROLE_KEY (for local dev) or a server-side SUPABASE_SERVICE_ROLE_KEY (on your host) is configured.');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this room? This will remove related images.')) return;
    try {
      if (!supabaseServiceRole) throw new Error('Service role not configured');
      // fetch related room images to remove from storage
      const { data: imgs, error: imgErr } = await supabase.from('room_images').select('id,image_url').eq('room_id', id);
      if (imgErr) console.error(imgErr);
      if (imgs && imgs.length) {
        for (const img of imgs) {
          try { await deleteFromStorage('rooms', img.image_url); } catch (e) { console.warn('Failed to delete storage object', e); }
        }
      }
      // delete room (room_images have ON DELETE CASCADE)
      await supabaseServiceRole.from('rooms').delete().eq('id', id);
      const { data } = await supabase.from('rooms').select('id,name,slug,is_active,price_from').order('sort_order');
      setRooms((data || []) as RoomListItem[]);
    } catch (err) {
      const error = err as StorageError;
      console.error(err);
      const msg = (error && error.message) ? error.message : String(err);
      alert('Delete failed: ' + msg + '\n\nHint: ensure your deployment has a server-side service role configured for admin actions.');
    }
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<RoomForm | null>(null);
  const [editFiles, setEditFiles] = useState<FileList | null>(null);

  const startEdit = async (roomId: string) => {
    const { data } = await supabase.from('rooms').select('*').eq('id', roomId).single();
    setEditingId(roomId);
    setEditForm(data);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !editForm) return;
    try {
      if (!supabaseServiceRole) throw new Error('Service role not configured');
      await supabaseServiceRole.from('rooms').update(editForm).eq('id', editingId);
      if (editFiles && editFiles.length > 0) {
        for (let i = 0; i < editFiles.length; i++) {
          const file = editFiles[i];
          const path = `${editingId}/${Date.now()}_${file.name}`;
          const { publicURL } = await uploadToStorage('rooms', path, file);
          await supabaseServiceRole.from('room_images').insert([{ room_id: editingId, image_url: publicURL, alt: file.name, sort_order: i }]);
        }
      }
      const { data } = await supabase.from('rooms').select('id,name,slug,is_active,price_from').order('sort_order');
      setRooms((data || []) as RoomListItem[]);
      setEditingId(null);
      setEditForm(null);
      setEditFiles(null);
    } catch (err) {
      const error = err as StorageError;
      console.error(err);
      const msg = (error && error.message) ? error.message : String(err);
      alert('Update failed: ' + msg + '\n\nHint: row-level security may be blocking this update. Configure a server-side admin endpoint or supply a service role for administrative writes.');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <AdminHeader title="Rooms" subtitle="Manage rooms and room images. Use the Create button to add a new room." />
      <div className="flex items-center justify-between mb-4">
        <div />
        <button onClick={() => setShowCreate(true)} className="bg-amber-600 text-white px-3 py-2 rounded">Create Room</button>
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
              <label className="block text-sm font-medium mb-1">Type</label>
              <select value={form.type} onChange={(e)=>setForm({...form, type: e.target.value})} className="w-full border p-2 rounded">
                <option value="room">Room</option>
                <option value="suite">Suite</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price from</label>
              <input type="number" value={form.price_from} onChange={(e)=>setForm({...form, price_from: Number(e.target.value)})} className="w-full border p-2 rounded" />
              <p className="text-xs text-gray-400 mt-1">Base price for this room (numbers only)</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Size</label>
              <input value={form.size} onChange={(e)=>setForm({...form, size: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Guests</label>
              <input type="number" value={form.guests} onChange={(e)=>setForm({...form, guests: Number(e.target.value)})} className="w-full border p-2 rounded" />
              <p className="text-xs text-gray-400 mt-1">Maximum number of guests</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Beds</label>
              <input type="number" value={form.beds} onChange={(e)=>setForm({...form, beds: Number(e.target.value)})} className="w-full border p-2 rounded" />
              <p className="text-xs text-gray-400 mt-1">Number of beds in this room</p>
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
          <h3 className="font-semibold mb-3">Edit Room</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input required value={editForm.name || ''} onChange={(e)=>setEditForm({...editForm, name: e.target.value, slug: (editForm.slug || '').toString()})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input value={editForm.slug || ''} onChange={(e)=>setEditForm({...editForm, slug: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select value={editForm.type || 'room'} onChange={(e)=>setEditForm({...editForm, type: e.target.value})} className="w-full border p-2 rounded">
                <option value="room">Room</option>
                <option value="suite">Suite</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price from</label>
              <input type="number" value={editForm.price_from || 0} onChange={(e)=>setEditForm({...editForm, price_from: Number(e.target.value)})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Size</label>
              <input value={editForm.size || ''} onChange={(e)=>setEditForm({...editForm, size: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Guests</label>
              <input type="number" value={editForm.guests || 1} onChange={(e)=>setEditForm({...editForm, guests: Number(e.target.value)})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Beds</label>
              <input type="number" value={editForm.beds || 1} onChange={(e)=>setEditForm({...editForm, beds: Number(e.target.value)})} className="w-full border p-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Short description</label>
              <input value={editForm.short_description || ''} onChange={(e)=>setEditForm({...editForm, short_description: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Full description</label>
              <textarea value={editForm.full_description || ''} onChange={(e)=>setEditForm({...editForm, full_description: e.target.value})} className="w-full border p-2 rounded" />
            </div>
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
      {loading ? <div>Loading…</div> : (
        <div className="space-y-3">
          {rooms.map(r => (
            <div key={r.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-sm text-gray-500">{r.slug} · ₦{r.price_from}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(r.id)} className="border px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(r.id)} className="border px-3 py-1 rounded text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
