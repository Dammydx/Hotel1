import React, { useEffect, useState } from 'react';
import supabase, { supabaseServiceRole } from '../../lib/supabase';
import AdminHeader from '../../components/AdminHeader';

interface Testimonial {
  id: string;
  guest_name: string;
  quote: string;
  rating: number;
  is_active: boolean;
  sort_order: number;
}

interface TestimonialError extends Error {
  message: string;
}

const AdminTestimonials: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<{ guest_name: string; quote: string; rating: number; is_active: boolean }>({ guest_name: '', quote: '', rating: 5, is_active: true });

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!supabaseServiceRole) throw new Error('Service role client not configured');
        const { data, error } = await supabaseServiceRole.from('testimonials').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error('Failed to fetch testimonials with service role:', err);
        const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
        if (error) console.warn(error);
        setItems(data || []);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <AdminHeader title="Testimonials" subtitle="Manage guest testimonials shown on the homepage." />
      <div className="flex items-center justify-between mb-4">
        <div />
        <button onClick={() => setShowCreate(true)} className="bg-amber-600 text-white px-3 py-2 rounded">Add Testimonial</button>
      </div>
      {showCreate && (
        <form onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (!supabaseServiceRole) throw new Error('Service role client not configured');
            setCreating(true);
            const payload = { guest_name: form.guest_name, quote: form.quote, rating: form.rating, is_active: form.is_active };
            const { error } = await supabaseServiceRole.from('testimonials').insert([payload]).select().single();
            if (error) throw error;
            const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
            setItems(data || []);
            setShowCreate(false);
            setForm({ guest_name: '', quote: '', rating: 5, is_active: true });
          } catch (err) {
            console.error(err);
            alert('Create failed: ' + (err instanceof Error ? err.message : String(err)));
          } finally { setCreating(false); }
        }} className="mb-6 p-4 border rounded bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Guest name</label>
              <input required value={form.guest_name} onChange={(e)=>setForm({...form, guest_name: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <input type="number" min={1} max={5} value={form.rating} onChange={(e)=>setForm({...form, rating: Number(e.target.value)})} className="w-full border p-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Quote</label>
              <textarea required value={form.quote} onChange={(e)=>setForm({...form, quote: e.target.value})} className="w-full border p-2 rounded" />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button disabled={creating} type="submit" className="bg-amber-600 text-white px-3 py-2 rounded">{creating ? 'Adding...' : 'Add'}</button>
            <button type="button" onClick={()=>setShowCreate(false)} className="border px-3 py-2 rounded">Cancel</button>
          </div>
        </form>
      )}
      <div className="space-y-3">
        {items.map(t => (
          <div key={t.id} className="p-3 border rounded relative">
            <div className="font-medium">{t.guest_name}</div>
            <div className="text-sm text-gray-600">{t.quote}</div>
            <div className="absolute top-2 right-2">
              <button onClick={async () => {
                if (!confirm('Delete this testimonial?')) return;
                try {
                  if (!supabaseServiceRole) throw new Error('Service role not configured');
                  await supabaseServiceRole.from('testimonials').delete().eq('id', t.id);
                  const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
                  setItems(data || []);
                } catch (err) {
                  const error = err as TestimonialError;
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

export default AdminTestimonials;
