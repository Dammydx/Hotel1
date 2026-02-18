import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  id?: string;
  slug: string;
  name: string;
  short_description?: string;
  image?: string;
  price_from?: number;
}

const RoomCard: React.FC<Props> = ({ slug, name, short_description, image, price_from }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="h-52 bg-gray-200">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{short_description}</p>
        <div className="flex items-center justify-between">
          <Link to={`/rooms/${slug}`} className="text-amber-600 font-medium">View Details</Link>
          {price_from !== undefined && <div className="text-gray-800 font-semibold">From ₦{price_from}</div>}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
