import React, { useState } from 'react';
import supabase from '../../lib/supabase';

const NewsletterBar: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage(null);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email');
      return;
    }

    const { error } = await supabase.from('newsletter_subscribers').insert({ email }).select();
    if (error) {
      if (error.code === '23505') {
        setStatus('success');
        setMessage('You are already subscribed');
      } else {
        setStatus('error');
        setMessage(error.message || 'Failed to subscribe');
      }
      return;
    }

    setStatus('success');
    setMessage('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl font-semibold mb-2">Stay in the Know</h3>
        <p className="text-gray-600 mb-6">Sign up for exclusive offers and the latest news from Cozy Vile.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto min-w-[240px] px-4 py-2 border rounded"
          />
          <button disabled={status === 'loading'} className="bg-amber-600 text-white px-4 py-2 rounded">{status === 'loading' ? 'Subscribing...' : 'Subscribe'}</button>
        </form>
        {message && <div className={`mt-4 ${status === 'error' ? 'text-red-500' : 'text-green-600'}`}>{message}</div>}
      </div>
    </div>
  );
};

export default NewsletterBar;
