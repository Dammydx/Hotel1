import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/rooms', label: 'Rooms & Suites' },
    { path: '/amenities', label: 'Amenities' },
    { path: '/dining', label: 'Dining' },
    { path: '/events', label: 'Meetings & Events' },
    { path: '/gallery', label: 'Gallery' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  // placeholder logo (swap later)
  const LOGO_URL =
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=80&h=80&q=80';

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* ✅ THIS IS THE FIX: cover any white strip with blur + tint */}
      <div
        className={[
          'absolute inset-x-0 top-0 h-16',
          'backdrop-blur-xl',
          scrolled ? 'bg-black/40' : 'bg-black/25',
          'pointer-events-none',
        ].join(' ')}
      />
      {/* subtle bottom border line (optional but premium) */}
      <div className="absolute inset-x-0 top-16 h-px bg-white/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <span className="relative h-10 w-10 overflow-hidden rounded-xl ring-1 ring-white/15 bg-white/10">
              <img
                src={LOGO_URL}
                alt="Cozy Vile logo"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </span>
            <span className="font-bold text-lg sm:text-xl text-white drop-shadow">
              Cozy Ville
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative flex items-center gap-1.5 px-2 py-2 rounded-2xl bg-black/70 backdrop-blur-md shadow-lg ring-1 ring-white/10">
              {navItems.map((item) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={[
                      'relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D2AC7C]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40',
                      active ? 'text-white' : 'text-white/70 hover:text-white',
                    ].join(' ')}
                  >
                    {active && (
                      <>
                        <span className="pointer-events-none absolute -top-1 left-1/2 h-[3px] w-10 -translate-x-1/2 rounded-full bg-[#D2AC7C] shadow-[0_0_18px_6px_rgba(210,172,124,0.35)]" />
                        <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(60%_60%_at_50%_20%,rgba(210,172,124,0.28)_0%,rgba(0,0,0,0)_70%)]" />
                        <span className="pointer-events-none absolute inset-0 rounded-xl bg-white/5" />
                      </>
                    )}

                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <Link
              to="/contact"
              className="ml-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200
                         bg-[#BB6C3E] text-white hover:brightness-110
                         shadow-[0_10px_30px_-12px_rgba(187,108,62,0.65)]
                         ring-1 ring-white/10"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-xl p-2
                         bg-black/70 text-white backdrop-blur-md ring-1 ring-white/10
                         hover:bg-black/80 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-3 overflow-hidden rounded-2xl
                         bg-black/80 backdrop-blur-md ring-1 ring-white/10 shadow-lg"
            >
              <div className="px-2 py-2">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={[
                        'relative block px-4 py-3 rounded-xl text-sm font-medium transition',
                        active
                          ? 'text-white bg-white/10'
                          : 'text-white/70 hover:text-white hover:bg-white/5',
                      ].join(' ')}
                    >
                      {active && (
                        <span className="pointer-events-none absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#D2AC7C] shadow-[0_0_14px_4px_rgba(210,172,124,0.35)]" />
                      )}
                      <span className="pl-4">{item.label}</span>
                    </Link>
                  );
                })}

                <Link
                  to="/contact"
                  className="mt-2 block text-center rounded-xl px-4 py-3 text-sm font-semibold
                             bg-[#BB6C3E] text-white hover:brightness-110 transition"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;