import React, { useEffect, useState } from 'react';
import supabase from '../../lib/supabase';

interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const AdminAmenities: React.FC = () => {
  const [items, setItems] = useState<Amenity[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('amenities').select('*').order('sort_order');
      if (error) console.error(error);
      setItems(data || []);
    };
    fetch();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Amenities</h2>
        <button className="bg-amber-600 text-white px-3 py-2 rounded">Create Amenity</button>
      </div>
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
