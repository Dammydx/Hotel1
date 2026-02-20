import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition z-40"
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </button>
  ) : null;
};

export default ScrollToTopButton;
