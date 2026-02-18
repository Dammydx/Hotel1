import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import RoomCard from '../components/RoomCard';
import FilterSidebar from '../components/FilterSidebar';

interface RoomItem {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  price_from: number;
  type?: string;
  room_images?: Array<{ image_url: string }>;
}

interface FilterState {
  type?: string;
  guests?: number | '';
  priceMax?: number | '';
}

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async (filtersParam: FilterState = {}) => {
    setLoading(true);
    let query = supabase.from('rooms').select('*, room_images(*)', { count: 'exact' }).eq('is_active', true).order('sort_order');

    // apply simple filters
    if (filtersParam.type) query = query.eq('type', filtersParam.type);
    if (filtersParam.guests) query = query.gte('guests', typeof filtersParam.guests === 'number' ? filtersParam.guests : 0);
    if (filtersParam.priceMax) query = query.lte('price_from', typeof filtersParam.priceMax === 'number' ? filtersParam.priceMax : 0);

    const { data, error } = await query;
    if (error) {
      console.error(error);
      setRooms([]);
    } else {
      setRooms((data as RoomItem[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchRooms(); }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <FilterSidebar types={[...new Set(rooms.map(r => r.type || '').filter(Boolean))]} onFilterChange={(f) => { fetchRooms(f); }} />
      </aside>

      <div className="lg:col-span-3">
        <h1 className="text-3xl font-serif mb-6">Rooms & Suites</h1>
        {loading ? (
          <div>Loading…</div>
        ) : rooms.length === 0 ? (
          <div>No rooms found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((r) => (
              <RoomCard key={r.id} slug={r.slug} name={r.name} short_description={r.short_description} image={r.room_images?.[0]?.image_url} price_from={r.price_from} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;