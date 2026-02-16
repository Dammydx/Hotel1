import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, MapPin, Mic, Camera, Coffee, Award, Heart } from 'lucide-react';

const Events = () => {
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

  const eventSpaces = [
    {
      name: 'Grand Ballroom',
      capacity: 300,
      size: '500 m²',
      description: 'Elegant ballroom perfect for weddings, galas, and large corporate events',
      image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Crystal Chandeliers', 'Dance Floor', 'Stage Area', 'Premium Audio/Visual']
    },
    {
      name: 'Executive Boardroom',
      capacity: 20,
      size: '80 m²',
      description: 'Professional meeting space with state-of-the-art technology',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Video Conferencing', 'Smart Board', 'High-Speed WiFi', 'Catering Service']
    },
    {
      name: 'Garden Pavilion',
      capacity: 150,
      size: '200 m²',
      description: 'Outdoor venue with beautiful garden views for intimate celebrations',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Garden Setting', 'Weather Protection', 'Ambient Lighting', 'Cocktail Area']
    }
  ];

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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Spaces</h2>
            <p className="text-xl text-gray-600">Versatile venues designed to accommodate any occasion</p>
          </motion.div>

          <motion.div 
            className="space-y-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {eventSpaces.map((space, index) => (
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
                      src={space.image} 
                      alt={space.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{space.name}</h3>
                  <p className="text-lg text-gray-600 mb-6">{space.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-700">
                      <Users className="h-5 w-5 mr-2 text-amber-600" />
                      <span>Up to {space.capacity} guests</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-2 text-amber-600" />
                      <span>{space.size}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {space.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                    Request Quote
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                Schedule Consultation
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Download Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;