import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const items = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/rooms', label: 'Rooms' },
  { to: '/admin/amenities', label: 'Amenities' },
  { to: '/admin/dining', label: 'Dining' },
  { to: '/admin/venues', label: 'Venues' },
  { to: '/admin/gallery', label: 'Gallery' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/messages', label: 'Messages' },
  { to: '/admin/settings', label: 'Settings' },
];

const AdminLayout: React.FC = () => {
  const loc = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 bg-white border rounded p-4 h-fit">
          <h3 className="font-semibold text-lg mb-4">Admin</h3>
          <nav className="space-y-2">
            {items.map((it) => {
              const active = loc.pathname === it.to;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={[
                    'relative block px-3 py-2 rounded-xl text-sm font-medium transition',
                    active
                      ? 'text-white bg-amber-600 shadow-[0_8px_30px_-12px_rgba(187,108,62,0.45)]'
                      : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50',
                  ].join(' ')}
                >
                  {it.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="md:col-span-3">
          <div className="bg-white border rounded p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
