import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, Star, Utensils, Wine, Coffee, Users } from 'lucide-react';

const Dining = () => {
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

  const restaurants = [
    {
      name: 'The Grand Dining Room',
      type: 'Fine Dining',
      description: 'Experience culinary excellence with our award-winning chef\'s contemporary cuisine',
      image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800',
      hours: 'Daily: 6:00 PM - 11:00 PM',
      cuisine: 'Contemporary International',
      rating: 5
    },
    {
      name: 'Café Cozy',
      type: 'Casual Dining',
      description: 'All-day dining with fresh, locally sourced ingredients and comfort classics',
      image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800',
      hours: 'Daily: 6:00 AM - 10:00 PM',
      cuisine: 'International & Local',
      rating: 4
    },
    {
      name: 'Sky Lounge',
      type: 'Bar & Lounge',
      description: 'Rooftop bar with panoramic city views and craft cocktails',
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
      hours: 'Daily: 5:00 PM - 2:00 AM',
      cuisine: 'Cocktails & Light Bites',
      rating: 5
    }
  ];

  const specialties = [
    { icon: Utensils, title: 'Chef\'s Tasting Menu', description: 'Seven-course culinary journey' },
    { icon: Wine, title: 'Wine Pairing', description: 'Curated selection from our sommelier' },
    { icon: Coffee, title: 'Artisan Coffee', description: 'Freshly roasted specialty blends' },
    { icon: Users, title: 'Private Dining', description: 'Exclusive spaces for special occasions' }
  ];

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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Restaurants</h2>
            <p className="text-xl text-gray-600">From casual dining to fine cuisine, we have something for every palate</p>
          </motion.div>

          <motion.div 
            className="space-y-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {restaurants.map((restaurant, index) => (
              <motion.div 
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                variants={fadeInUp}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                    {restaurant.type}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{restaurant.name}</h3>
                  <p className="text-lg text-gray-600 mb-6">{restaurant.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-5 w-5 mr-3 text-amber-600" />
                      {restaurant.hours}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Utensils className="h-5 w-5 mr-3 text-amber-600" />
                      {restaurant.cuisine}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <div className="flex mr-3">
                        {[...Array(restaurant.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-amber-500 fill-current" />
                        ))}
                      </div>
                      <span>Michelin Recommended</span>
                    </div>
                  </div>

                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                    Make Reservation
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
                  <h4 className="font-semibold text-gray-900 mb-2">Breakfast Menu</h4>
                  <p className="text-gray-600">6:00 AM - 11:00 AM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">All-Day Dining</h4>
                  <p className="text-gray-600">11:00 AM - 11:00 PM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Late Night Menu</h4>
                  <p className="text-gray-600">11:00 PM - 6:00 AM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Beverages & Snacks</h4>
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