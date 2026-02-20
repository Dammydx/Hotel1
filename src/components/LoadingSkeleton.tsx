import React from 'react';

const LoadingSkeleton: React.FC<{ count?: number; type?: 'card' | 'text' | 'image' }> = ({ 
  count = 1, 
  type = 'card' 
}) => {
  const skeletons = Array.from({ length: count });

  if (type === 'text') {
    return (
      <div className="space-y-2">
        {skeletons.map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (type === 'image') {
    return (
      <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
    );
  }

  // default: card
  return (
    <div className="space-y-4">
      {skeletons.map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
          <div className="h-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
