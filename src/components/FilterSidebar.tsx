import React from 'react';

interface FilterState {
  type?: string;
  guests?: number | '';
  priceMax?: number | '';
}

interface Props {
  types: string[];
  onFilterChange: (filters: FilterState) => void;
}

const FilterSidebar: React.FC<Props> = ({ types, onFilterChange }) => {
  const [type, setType] = React.useState('');
  const [guests, setGuests] = React.useState<number | ''>('');
  const [priceMax, setPriceMax] = React.useState<number | ''>('');

  const apply = () => {
    onFilterChange({ type, guests, priceMax });
  };

  const reset = () => {
    setType(''); setGuests(''); setPriceMax(''); onFilterChange({});
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold mb-3">Filters</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded px-2 py-1">
            <option value="">Any</option>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Guests</label>
          <input type="number" min={1} value={guests === '' ? '' : guests} onChange={(e) => setGuests(e.target.value ? Number(e.target.value) : '')} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm mb-1">Max Price (₦)</label>
          <input type="number" min={0} value={priceMax === '' ? '' : priceMax} onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : '')} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={apply} className="bg-amber-600 text-white px-3 py-1 rounded">Apply</button>
          <button onClick={reset} className="border px-3 py-1 rounded">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
