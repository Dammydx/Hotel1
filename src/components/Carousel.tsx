import React from 'react';

interface Props {
  images: { url: string; alt?: string }[];
}

const Carousel: React.FC<Props> = ({ images }) => {
  const [index, setIndex] = React.useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative">
      <img src={images[index].url} alt={images[index].alt || ''} className="w-full h-96 object-cover rounded" />
      <button onClick={() => setIndex((i) => Math.max(i - 1, 0))} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded">◀</button>
      <button onClick={() => setIndex((i) => Math.min(i + 1, images.length - 1))} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded">▶</button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
