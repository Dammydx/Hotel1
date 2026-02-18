import React, { useEffect } from 'react';

interface Props {
  images: { url: string; alt?: string }[];
  startIndex?: number;
  onClose: () => void;
}

const LightboxModal: React.FC<Props> = ({ images, startIndex = 0, onClose }) => {
  const [index, setIndex] = React.useState(startIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, images.length - 1));
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <img src={images[index].url} alt={images[index].alt || ''} className="w-full h-[70vh] object-contain" />
        <button onClick={() => setIndex((i) => Math.max(i - 1, 0))} className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded">◀</button>
        <button onClick={() => setIndex((i) => Math.min(i + 1, images.length - 1))} className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded">▶</button>
        <button onClick={onClose} className="absolute right-2 top-2 text-white bg-black/40 p-2 rounded">✕</button>
      </div>
    </div>
  );
};

export default LightboxModal;
