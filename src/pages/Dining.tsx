import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Wine, Coffee, Users, Clock } from 'lucide-react';

interface DiningOutlet {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  is_active: boolean;
  sort_order: number;
  dining_images?: Array<{ image_url: string }>;
}

const Dining: React.FC = () => {
  const [outlets, setOutlets] = useState<DiningOutlet[]>([]);
  const [loading, setLoading] = useState(true);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const specialties = [
    { icon: Utensils, title: 'Chef\'s Tasting Menu', description: 'Seven-course culinary journey' },
    { icon: Wine, title: 'Wine Pairing', description: 'Curated selection from our sommelier' },
    { icon: Coffee, title: 'Artisan Coffee', description: 'Freshly roasted specialty blends' },
    { icon: Users, title: 'Private Dining', description: 'Exclusive spaces for special occasions' }
  ];

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('dining_outlets').select('*, dining_images(*)').eq('is_active', true).order('sort_order');
      if (error) console.error(error);
      setOutlets(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 opacity-60 bg-black"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280)'
          }}
        ></div>
        <motion.div 
          className="relative z-10 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Dining Experience</h1>
          <p className="text-xl text-gray-200">Culinary excellence in every bite</p>
        </motion.div>
      </section>

      {/* Restaurants Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Dining Outlets</h2>
            <p className="text-xl text-gray-600">From casual dining to fine cuisine, we have something for every palate</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">Loading dining options…</div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {outlets.map((outlet, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                >
                  <Link to={`/dining/${outlet.slug}`} className="block h-80 overflow-hidden">
                    {outlet.dining_images?.[0]?.image_url && (
                      <img 
                        src={outlet.dining_images[0].image_url}
                        alt={outlet.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </Link>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{outlet.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm h-16 line-clamp-3">{outlet.short_description}</p>
                    <Link 
                      to={`/dining/${outlet.slug}`}
                      className="inline-block bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors"
                    >
                      View Menu & Reserve
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Culinary Specialties</h2>
            <p className="text-xl text-gray-600">Signature experiences that define our dining excellence</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {specialties.map((specialty, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                variants={fadeInUp}
              >
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <specialty.icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{specialty.title}</h3>
                <p className="text-gray-600">{specialty.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Room Service Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">24/7 Room Service</h2>
            <p className="text-xl text-gray-600 mb-8">
              Enjoy our culinary offerings from the comfort of your room, available around the clock
            </p>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Service Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center"><Clock className="h-5 w-5 mr-2 text-amber-600" /> Breakfast Menu</h4>
                  <p className="text-gray-600">6:00 AM - 11:00 AM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center"><Clock className="h-5 w-5 mr-2 text-amber-600" /> All-Day Dining</h4>
                  <p className="text-gray-600">11:00 AM - 11:00 PM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center"><Clock className="h-5 w-5 mr-2 text-amber-600" /> Late Night Menu</h4>
                  <p className="text-gray-600">11:00 PM - 6:00 AM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center"><Clock className="h-5 w-5 mr-2 text-amber-600" /> Beverages & Snacks</h4>
                  <p className="text-gray-600">24/7 Available</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Dining;