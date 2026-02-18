import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import supabase from '../lib/supabase';

interface SiteSettings {
  map_embed_url?: string;
  address?: string;
  phone?: string;
  email?: string;
}

const Contact: React.FC = () => {
  const location = useLocation();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'General',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('site_settings').select('*').limit(1).single();
      setSettings(data || {});
    };
    fetch();

    // Prefill subject from location state (from detail pages)
    if (location.state?.subject) {
      setForm(prev => ({ ...prev, subject: location.state.subject }));
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    // Validation
    if (!form.first_name || !form.email || !form.message) {
      setStatus('error');
      setError('Please fill in all required fields');
      return;
    }

    const { error } = await supabase.from('contact_messages').insert([form]);
    if (error) {
      setStatus('error');
      setError(error.message || 'Failed to send message');
      return;
    }

    setStatus('success');
    setForm({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      subject: '',
      category: 'General',
      message: ''
    });

    setTimeout(() => setStatus('idle'), 5000);
  };

  const contactInfoCards = [
    {
      icon: MapPin,
      title: 'Address',
      value: settings?.address || 'Not available'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: settings?.phone || 'Not available'
    },
    {
      icon: Mail,
      title: 'Email',
      value: settings?.email || 'Not available'
    },
    {
      icon: Clock,
      title: 'Front Desk',
      value: '24/7 Available'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 opacity-60 bg-black"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280)'
          }}
        ></div>
        <motion.div 
          className="relative z-10 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200">We're here to help make your stay perfect</p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {contactInfoCards.map((card, idx) => (
              <motion.div key={idx} className="p-4 rounded-lg bg-gray-50 text-center" variants={fadeInUp}>
                <card.icon className="h-8 w-8 mx-auto text-amber-600 mb-2" />
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{card.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="rounded-lg overflow-hidden shadow"
            >
              {settings?.map_embed_url ? (
                <iframe
                  src={settings.map_embed_url}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hotel Location Map"
                ></iframe>
              ) : (
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600">Map not available</span>
                </div>
              )}
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Send us a Message</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full border boundary-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full border boundary-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full border boundary-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full border boundary-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full border boundary-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border boundary-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition"
                  >
                    <option>Reservations</option>
                    <option>Events</option>
                    <option>Dining</option>
                    <option>General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Please tell us how we can assist you..."
                    rows={5}
                    className="w-full border boundary-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition resize-none"
                    required
                  ></textarea>
                </div>

                {status === 'success' && (
                  <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                    {error || 'An error occurred. Please try again.'}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-amber-600 text-white font-semibold py-3 rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;