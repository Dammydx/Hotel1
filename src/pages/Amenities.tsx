import { motion } from 'framer-motion';
import { Waves, Dumbbell, Utensils, Coffee, Briefcase, Car, Shield, Clock, MapPin } from 'lucide-react';
import AmenitiesList from './AmenitiesList';

const Amenities = () => {
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

  const amenities = [
    {
      category: 'Wellness & Recreation',
      items: [
        { icon: Waves, name: 'Swimming Pool', description: 'Heated outdoor pool with city views' },
        { icon: Dumbbell, name: 'Fitness Center', description: '24/7 access with modern equipment' },
        { name: 'Spa & Wellness', description: 'Full-service spa with massage therapies' },
        { name: 'Sauna', description: 'Traditional Finnish sauna experience' }
      ]
    },
    {
      category: 'Dining & Entertainment',
      items: [
        { icon: Utensils, name: 'Fine Dining Restaurant', description: 'Gourmet cuisine by award-winning chefs' },
        { icon: Coffee, name: 'Lobby Café', description: 'Premium coffee and light refreshments' },
        { name: 'Rooftop Bar', description: 'Panoramic city views with craft cocktails' },
        { name: 'Room Service', description: '24/7 in-room dining service' }
      ]
    },
    {
      category: 'Business & Events',
      items: [
        { icon: Briefcase, name: 'Business Center', description: 'Fully equipped workspace and meeting rooms' },
        { name: 'Conference Facilities', description: 'State-of-the-art event spaces' },
        { name: 'High-Speed WiFi', description: 'Complimentary internet throughout hotel' },
        { name: 'Executive Lounge', description: 'Exclusive space for business travelers' }
      ]
    },
    {
      category: 'Services & Convenience',
      items: [
        { icon: Car, name: 'Valet Parking', description: 'Complimentary parking service' },
        { icon: Shield, name: '24/7 Security', description: 'Professional security staff on-site' },
        { icon: Clock, name: 'Concierge Service', description: 'Personal assistance and local recommendations' },
        { icon: MapPin, name: 'Transportation', description: 'Airport shuttle and local transport' }
      ]
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
            backgroundImage: 'url(https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280)'
          }}
        ></div>
        <motion.div 
          className="relative z-10 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Hotel Amenities</h1>
          <p className="text-xl text-gray-200">Luxury facilities and services at your fingertips</p>
        </motion.div>
      </section>

      {/* Amenities Page content (fetched) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Amenities</h2>
            <p className="text-gray-600">Comfort and convenience during your stay</p>
          </div>
          <AmenitiesList />
        </div>
      </section>

      {/* Featured Amenities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Facilities</h2>
            <p className="text-xl text-gray-600">Everything you need for a perfect stay</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                title: 'Swimming Pool',
                description: 'Take a refreshing dip in our heated outdoor pool with stunning city views',
                image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
              },
              {
                title: 'Spa & Wellness',
                description: 'Rejuvenate your body and mind with our full-service spa treatments',
                image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800'
              },
              {
                title: 'Fine Dining',
                description: 'Experience culinary excellence at our award-winning restaurant',
                image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="relative h-80 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                variants={fadeInUp}
              >
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-200">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Amenities by Category */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {amenities.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex}
              className="mb-16 last:mb-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{category.category}</h3>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={stagger}
              >
                {category.items.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    variants={fadeInUp}
                  >
                    {item.icon && (
                      <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <item.icon className="h-6 w-6 text-amber-600" />
                      </div>
                    )}
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hours & Information */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Facility Hours</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pool & Spa</h3>
                <p className="text-gray-600">Daily: 6:00 AM - 10:00 PM</p>
                <p className="text-gray-600">Spa: 8:00 AM - 8:00 PM</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fitness Center</h3>
                <p className="text-gray-600">24/7 Access for Guests</p>
                <p className="text-gray-600">Personal Trainer Available</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Center</h3>
                <p className="text-gray-600">Daily: 24/7</p>
                <p className="text-gray-600">Meeting Rooms by Appointment</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Concierge</h3>
                <p className="text-gray-600">Daily: 7:00 AM - 11:00 PM</p>
                <p className="text-gray-600">Emergency: 24/7</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Amenities;