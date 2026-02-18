import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Award, Heart, Mic } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  capacity?: number;
  is_active: boolean;
  sort_order: number;
  venue_images?: Array<{ image_url: string }>;
}

const Events: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
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

  const eventTypes = [
    { icon: Heart, title: 'Weddings', description: 'Create magical moments on your special day' },
    { icon: Users, title: 'Corporate Events', description: 'Professional meetings and conferences' },
    { icon: Award, title: 'Celebrations', description: 'Birthdays, anniversaries, and milestones' },
    { icon: Mic, title: 'Presentations', description: 'Product launches and seminars' }
  ];

  const services = [
    'Event Planning & Coordination',
    'Custom Catering Menus',
    'Audio/Visual Equipment',
    'Floral Arrangements',
    'Photography Services',
    'Transportation Coordination',
    'Accommodation Packages',
    'Dedicated Event Manager'
  ];

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('venues').select('*, venue_images(*)').eq('is_active', true).order('sort_order');
      if (error) console.error(error);
      setVenues(data || []);
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
            backgroundImage: 'url(https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280)'
          }}
        ></div>
        <motion.div 
          className="relative z-10 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Meetings & Events</h1>
          <p className="text-xl text-gray-200">Exceptional venues for unforgettable occasions</p>
        </motion.div>
      </section>

      {/* Event Spaces Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Venues</h2>
            <p className="text-xl text-gray-600">Versatile spaces designed to accommodate any occasion</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">Loading venues…</div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {venues.map((venue, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                >
                  <Link to={`/events/${venue.slug}`} className="block h-80 overflow-hidden">
                    {venue.venue_images?.[0]?.image_url && (
                      <img 
                        src={venue.venue_images[0].image_url}
                        alt={venue.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </Link>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{venue.name}</h3>
                    <p className="text-gray-600 mb-4">{venue.short_description}</p>
                    <div className="flex items-center gap-2 text-gray-700 mb-4">
                      <Users className="h-5 w-5 text-amber-600" />
                      <span>Capacity: {venue.capacity} guests</span>
                    </div>
                    <Link 
                      to={`/events/${venue.slug}`}
                      className="inline-block bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Event Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Types</h2>
            <p className="text-xl text-gray-600">We specialize in creating memorable experiences</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {eventTypes.map((type, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                variants={fadeInUp}
              >
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <type.icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Services</h2>
            <p className="text-xl text-gray-600">Comprehensive support for your perfect event</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
                variants={fadeInUp}
              >
                <div className="w-3 h-3 bg-amber-600 rounded-full mr-4"></div>
                <span className="text-gray-700 font-medium">{service}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Plan Your Event?</h2>
            <p className="text-xl text-amber-100 mb-8">
              Our experienced event team is here to help you create an unforgettable experience
            </p>
            <Link 
              to="/contact"
              className="inline-block bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;