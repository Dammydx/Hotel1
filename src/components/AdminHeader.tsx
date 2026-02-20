import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
}

const AdminHeader: React.FC<Props> = ({ title, subtitle }) => {
  const nav = useNavigate();
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <button onClick={() => nav(-1)} className="inline-flex items-center gap-2 mb-2 text-sm text-gray-600 hover:text-amber-600">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

export default AdminHeader;
