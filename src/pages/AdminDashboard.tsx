import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Scaffolded admin area. Use links below to manage content.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/rooms" className="p-4 border rounded hover:shadow">Rooms</Link>
        <Link to="/admin/amenities" className="p-4 border rounded hover:shadow">Amenities</Link>
        <Link to="/admin/dining" className="p-4 border rounded hover:shadow">Dining</Link>
        <Link to="/admin/venues" className="p-4 border rounded hover:shadow">Venues</Link>
        <Link to="/admin/gallery" className="p-4 border rounded hover:shadow">Gallery</Link>
        <Link to="/admin/testimonials" className="p-4 border rounded hover:shadow">Testimonials</Link>
        <Link to="/admin/messages" className="p-4 border rounded hover:shadow">Messages</Link>
        <Link to="/admin/settings" className="p-4 border rounded hover:shadow">Settings</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
