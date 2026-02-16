import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'rooms', name: 'Rooms & Suites' },
    { id: 'dining', name: 'Dining' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'events', name: 'Events' },
    { id: 'exterior', name: 'Hotel Exterior' }
  ];

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'rooms',
      title: 'Deluxe Suite',
      description: 'Spacious suite with modern amenities'
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'dining',
      title: 'Fine Dining Restaurant',
      description: 'Elegant dining experience'
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'amenities',
      title: 'Swimming Pool',
      description: 'Heated outdoor pool with city views'
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'exterior',
      title: 'Hotel Exterior',
      description: 'Modern architecture and design'
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'events',
      title: 'Grand Ballroom',
      description: 'Perfect for weddings and events'
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'rooms',
      title: 'Presidential Suite',
      description: 'Ultimate luxury accommodation'
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'dining',
      title: 'Café Cozy',
      description: 'Casual dining atmosphere'
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'amenities',
      title: 'Spa & Wellness',
      description: 'Relaxation and rejuvenation'
    },
    {
      id: 9,
      src: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'rooms',
      title: 'Standard Room',
      description: 'Comfortable and modern'
    },
    {
      id: 10,
      src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'dining',
      title: 'Sky Lounge',
      description: 'Rooftop bar with panoramic views'
    },
    {
      id: 11,
      src: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'events',
      title: 'Garden Pavilion',
      description: 'Outdoor event space'
    },
    {
      id: 12,
      src: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'events',
      title: 'Executive Boardroom',
      description: 'Professional meeting space'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-gray-200">Discover the beauty of Cozy Vile</p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            key={selectedCategory} // Re-animate when category changes
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(index)}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-lg">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={filteredImages[selectedImage].src} 
                alt={filteredImages[selectedImage].title}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                </>
              )}

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-semibold">{filteredImages[selectedImage].title}</h3>
                <p className="text-gray-300">{filteredImages[selectedImage].description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {selectedImage + 1} of {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;