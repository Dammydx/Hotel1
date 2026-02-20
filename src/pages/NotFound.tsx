import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center p-6">
        <h1 className="text-4xl font-serif mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-block bg-amber-600 text-white px-4 py-2 rounded">Return Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
