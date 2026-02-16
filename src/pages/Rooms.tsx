import React from 'react';
import { motion } from 'framer-motion';
import { Users, Maximize, Wifi, Coffee, Car, Bath } from 'lucide-react';

const Rooms = () => {
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

  // Since no mock data is requested, these would normally come from Supabase
  const roomTypes = [
    {
      id: 1,
      name: 'Standard Room',
      description: 'Comfortable accommodations with modern amenities',
      price: 199,
      capacity: 2,
      size: 35,
      amenities: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar'],
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      name: 'Deluxe Suite',
      description: 'Spacious suite with separate living area and premium furnishings',
      price: 349,
      capacity: 4,
      size: 55,
      amenities: ['Free WiFi', 'Kitchenette', 'Balcony', 'Room Service'],
      image: 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      name: 'Presidential Suite',
      description: 'The ultimate luxury experience with panoramic city views',
      price: 599,
      capacity: 6,
      size: 85,
      amenities: ['Butler Service', 'Private Terrace', 'Jacuzzi', 'Concierge'],
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800'
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
            backgroundImage: 'url(https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280)'
          }}
        ></div>
        <motion.div 
          className="relative z-10 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Rooms & Suites</h1>
          <p className="text-xl text-gray-200">Luxury accommodations designed for your comfort</p>
        </motion.div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Stay</h2>
            <p className="text-xl text-gray-600">Each room is thoughtfully designed with your comfort in mind</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {roomTypes.map((room) => (
              <motion.div 
                key={room.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                variants={fadeInUp}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full font-semibold">
                    ${room.price}/night
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4">{room.description}</p>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {room.capacity} guests
                    </div>
                    <div className="flex items-center">
                      <Maximize className="h-4 w-4 mr-1" />
                      {room.size} m²
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Amenities:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Room Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Standard Amenities</h2>
            <p className="text-xl text-gray-600">Every room includes these premium features</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: Wifi, label: 'Free WiFi' },
              { icon: Coffee, label: 'Coffee Maker' },
              { icon: Car, label: 'Parking' },
              { icon: Bath, label: 'Luxury Bath' },
              { icon: Users, label: 'Concierge' },
              { icon: Maximize, label: 'Room Service' }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="h-8 w-8 text-amber-600" />
                </div>
                <p className="text-gray-700 font-medium">{feature.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;