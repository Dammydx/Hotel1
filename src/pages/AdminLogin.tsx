import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultPass = import.meta.env.VITE_DEFAULT_ADMIN_PASSWORD || 'CozyVile@123';
    // For now, simple client-side check against env fallback. Admin password should be validated against Supabase later.
    if (password === defaultPass) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button className="w-full bg-amber-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
