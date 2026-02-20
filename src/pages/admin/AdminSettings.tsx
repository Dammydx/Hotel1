import React, { useEffect, useState } from 'react';
import supabase, { supabaseServiceRole } from '../../lib/supabase';
import AdminHeader from '../../components/AdminHeader';

interface SiteSettings {
  id?: string;
  hotel_name: string;
  logo_url: string;
  hero_image_url: string;
  address: string;
  phone: string;
  email: string;
  map_embed_url: string;
  instagram_url: string;
  facebook_url: string;
  admin_password?: string;
  created_at?: string;
}

interface SettingsError extends Error {
  message: string;
}

const AdminSettings: React.FC = () => {
  const [form, setForm] = useState<SiteSettings>({
    hotel_name: '',
    logo_url: '',
    hero_image_url: '',
    address: '',
    phone: '',
    email: '',
    map_embed_url: '',
    instagram_url: '',
    facebook_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
      
      if (error && error.code !== 'PGRST116') {
        console.error(error);
      }
      
      const defaultSettings = {
        hotel_name: 'Cozy Vile Hotel',
        logo_url: '',
        hero_image_url: '',
        address: '',
        phone: '',
        email: '',
        map_embed_url: '',
        instagram_url: '',
        facebook_url: '',
        admin_password: '',
        created_at: new Date().toISOString(),
      };

      const mergedSettings = data ? { ...data } : defaultSettings;
      // ensure no explicit null id is present (prevents DB insert failing when id:null)
      if (mergedSettings && 'id' in mergedSettings && !mergedSettings.id) {
        delete (mergedSettings as Record<string, unknown>).id;
      }
      setForm({ ...mergedSettings });
      setLoading(false);
    };
    fetch();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus('saving');
    setMessage(null);

    try {
      if (!supabaseServiceRole) {
        throw new Error('Service role client not configured');
      }

      if (form.id) {
        // Update existing
        const { error } = await supabaseServiceRole.from('site_settings').update(form).eq('id', form.id);
        if (error) throw error;
      } else {
        // Create new — remove any id property to allow DEFAULT gen_random_uuid()
        const payload = { ...form } as Record<string, unknown>;
        if (!payload.id) delete payload.id;
        const { error } = await supabaseServiceRole.from('site_settings').insert([payload]);
        if (error) throw error;
      }

      setStatus('success');
      setMessage('Settings saved successfully!');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      const error = err as SettingsError;
      setStatus('error');
      setMessage(error.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      setMessage('Both fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setSaving(true);
    setStatus('saving');

    try {
      if (!supabaseServiceRole) {
        throw new Error('Service role client not configured');
      }

      const updatedForm: SiteSettings = { ...form, admin_password: newPassword };

      if (form.id) {
        const { error } = await supabaseServiceRole.from('site_settings').update({ admin_password: newPassword }).eq('id', form.id);
        if (error) throw error;
      } else {
        if (!updatedForm.id) delete updatedForm.id;
        const { error } = await supabaseServiceRole.from('site_settings').insert([updatedForm]);
        if (error) throw error;
      }

      setForm(updatedForm);
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
      setStatus('success');
      setMessage('Password updated successfully!');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      const error = err as SettingsError;
      setStatus('error');
      setMessage(error.message || 'Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <AdminHeader title="Site Settings" subtitle="Update hotel details, contact info, and site assets." />

      <form onSubmit={handleSave} className="bg-white p-6 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Hotel Name</label>
            <input
              type="text"
              name="hotel_name"
              value={form?.hotel_name || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={form?.phone || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form?.email || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={form?.address || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Logo URL</label>
            <input
              type="url"
              name="logo_url"
              value={form?.logo_url || ''}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Hero Image URL</label>
            <input
              type="url"
              name="hero_image_url"
              value={form?.hero_image_url || ''}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Map Embed URL</label>
            <input
              type="url"
              name="map_embed_url"
              value={form?.map_embed_url || ''}
              onChange={handleChange}
              placeholder="https://maps.google.com/maps?q=..."
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Instagram URL</label>
            <input
              type="url"
              name="instagram_url"
              value={form?.instagram_url || ''}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Facebook URL</label>
            <input
              type="url"
              name="facebook_url"
              value={form?.facebook_url || ''}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          <button
            type="button"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="border border-amber-600 text-amber-600 px-4 py-2 rounded hover:bg-amber-50"
          >
            Change Admin Password
          </button>
        </div>

        {message && (
          <div className={`mt-4 p-3 rounded ${status === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
      </form>

      {showPasswordForm && (
        <form onSubmit={handlePasswordChange} className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Change Admin Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 disabled:opacity-50"
            >
              {saving ? 'Updating...' : 'Update Password'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowPasswordForm(false);
                setNewPassword('');
                setConfirmPassword('');
                setMessage(null);
              }}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminSettings;
