import React, { useEffect, useState } from 'react';
import supabase, { supabaseServiceRole } from '../../lib/supabase';

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

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (error) console.error(error);
      setItems(data || []);
    };
    fetch();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Testimonials</h2>
        <button className="bg-amber-600 text-white px-3 py-2 rounded">Add Testimonial</button>
      </div>
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
