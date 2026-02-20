import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate a small delay for better UX
    setTimeout(() => {
      const defaultPass = import.meta.env.VITE_DEFAULT_ADMIN_PASSWORD || 'CozyVile@123';
      if (password === defaultPass) {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else {
        setError('Invalid password. Please try again.');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <Lock className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white text-center">Admin Portal</h1>
            <p className="text-amber-100 text-center text-sm mt-2">CozyVile Management</p>
          </div>

          {/* Form Section */}
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition duration-200"
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !password}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Footer Text */}
            <p className="text-center text-xs text-gray-500 mt-6">
              Unauthorized access is prohibited
            </p>
          </div>
        </div>

        {/* Bottom Message */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Secure Admin Dashboard
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
