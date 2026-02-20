import React, { useEffect, useState } from 'react';
import supabase, { supabaseServiceRole } from '../../lib/supabase';
import AdminHeader from '../../components/AdminHeader';

interface ContactMessage {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
  created_at: string;
}

interface DeleteError extends Error {
  message: string;
}

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!supabaseServiceRole) throw new Error('Service role client not configured. Admin reads require service role.');
        const { data, error } = await supabaseServiceRole.from('contact_messages').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setMessages(data || []);
      } catch (err) {
        console.error('Failed to fetch contact messages:', err);
        // fallback: try anon client for public data (may be restricted by RLS)
        const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
        if (error) console.warn('Anon fetch failed or returned limited data:', error);
        setMessages(data || []);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <AdminHeader title="Contact Messages" subtitle="View and manage incoming contact form messages." />
      <div className="space-y-3">
        {messages.map(m => (
          <div key={m.id} className="p-3 border rounded relative">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{m.first_name} {m.last_name}</div>
                <div className="text-sm text-gray-600">{m.email} · {m.phone}</div>
                <div className="text-sm mt-2">{m.message}</div>
              </div>
              <div className="text-sm text-gray-500">{new Date(m.created_at).toLocaleString()}</div>
            </div>
            <div className="absolute top-2 right-2">
              <button onClick={async () => {
                if (!confirm('Delete this message?')) return;
                try {
                  if (!supabaseServiceRole) throw new Error('Service role not configured');
                  await supabaseServiceRole.from('contact_messages').delete().eq('id', m.id);
                  const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
                  setMessages(data || []);
                } catch (err) {
                  const error = err as DeleteError;
                  console.error(err);
                  alert('Delete failed: ' + (error.message || err));
                }
              }} className="bg-white/80 text-red-600 px-2 py-1 rounded text-xs">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
