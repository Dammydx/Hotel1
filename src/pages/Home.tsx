import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Wifi, Car, Coffee, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabase';

interface RoomImage {
  image_url: string;
}

interface Room {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  room_images?: RoomImage[];
  price_from?: number;
}

interface Experience {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url?: string;
}

interface Testimonial {
  id: string;
  guest_name: string;
  quote: string;
  rating: number;
}

const Home: React.FC = () => {
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

  const features = [
    { icon: Wifi, title: 'Free WiFi', description: 'High-speed internet throughout the hotel' },
    { icon: Car, title: 'Valet Parking', description: 'Complimentary parking service' },
    { icon: Coffee, title: '24/7 Room Service', description: 'Dining at your convenience' },
    { icon: Dumbbell, title: 'Fitness Center', description: 'Modern equipment and facilities' }
  ];

  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data: rooms } = await supabase.from('rooms').select('id,name,slug,short_description,price_from,room_images(*)').eq('is_active', true).eq('is_featured', true).order('sort_order');
      setFeaturedRooms(rooms || []);
      const { data: ex } = await supabase.from('experiences').select('*').eq('is_active', true).order('sort_order');
      setExperiences(ex || []);
      const { data: t } = await supabase.from('testimonials').select('*').eq('is_active', true).order('created_at');
      setTestimonials(t || []);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280)'
          }}
        ></div>
        
        <motion.div 
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            variants={fadeInUp}
          >
            Welcome to <span className="text-amber-400">Cozy Vile</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-200"
            variants={fadeInUp}
          >
            Where luxury meets comfort in the heart of the city
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <Link 
              to="/rooms"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
            >
              Book Your Stay <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/gallery"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Explore Gallery
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Cozy Vile?</h2>
            <p className="text-xl text-gray-600">Experience unparalleled service and luxury amenities</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                variants={fadeInUp}
              >
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Featured Rooms</h2>
            <p className="text-gray-600">Hand-picked rooms for an exceptional stay</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRooms.map(r => (
              <div key={r.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img src={r.room_images?.[0]?.image_url} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{r.name}</h3>
                  <p className="text-gray-600 text-sm">{r.short_description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <Link to={`/rooms/${r.slug}`} className="text-amber-600">View Details</Link>
                    <div className="font-semibold">From ₦{r.price_from}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.map((ex) => (
              <div key={ex.id} className="rounded overflow-hidden shadow">
                <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${ex.image_url})` }} />
                <div className="p-4">
                  <h4 className="font-semibold">{ex.title}</h4>
                  <p className="text-gray-600 text-sm">{ex.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">What Guests Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="p-4 bg-white rounded shadow">
                <div className="text-gray-700">“{t.quote}”</div>
                <div className="mt-3 text-sm text-gray-500">— {t.guest_name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Experience Luxury Redefined</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Cozy Vile, we believe that every guest deserves an extraordinary experience. 
                Our commitment to excellence, attention to detail, and personalized service 
                creates unforgettable moments that will last a lifetime.
              </p>
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-amber-500 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">4.9/5 Guest Rating</span>
              </div>
              <Link 
                to="/about"
                className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold"
              >
                Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800)'
                }}
              ></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready for Your Perfect Stay?</h2>
            <p className="text-xl text-amber-100 mb-8">
              Book now and discover why Cozy Vile is the preferred choice for discerning travelers.
            </p>
            <Link 
              to="/contact"
              className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center"
            >
              Contact Us Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;