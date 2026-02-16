import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Car, Plane } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Luxury Street', 'City Center, State 12345']
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@cozyvile.com', 'reservations@cozyvile.com']
    },
    {
      icon: Clock,
      title: 'Front Desk Hours',
      details: ['24/7 Available', 'Concierge: 7AM - 11PM']
    }
  ];

  const directions = [
    {
      icon: Car,
      title: 'By Car',
      description: 'Free valet parking available. Take Highway 101 to Downtown Exit.'
    },
    {
      icon: Plane,
      title: 'From Airport',
      description: 'Complimentary shuttle service available. 25-minute drive from airport.'
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

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="event">Event Planning</option>
                      <option value="dining">Dining Reservation</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Please share your message or inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  Send Message <Send className="ml-2 h-5 w-5" />
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-8 mb-12">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-4"
                    variants={fadeInUp}
                  >
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <info.icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Directions</h3>
              <div className="space-y-6">
                {directions.map((direction, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-4"
                    variants={fadeInUp}
                  >
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <direction.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{direction.title}</h4>
                      <p className="text-gray-600">{direction.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">Located in the heart of the city</p>
          </motion.div>

          <motion.div 
            className="bg-gray-300 h-96 rounded-lg flex items-center justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-center text-gray-600">
              <MapPin className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg">Interactive Map</p>
              <p className="text-sm">Map integration would be implemented here</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold text-white mb-4">24/7 Emergency Contact</h3>
            <p className="text-amber-100 mb-4">
              For urgent matters or after-hours assistance, please call our emergency line
            </p>
            <a 
              href="tel:+15551234567" 
              className="text-2xl font-bold text-white hover:text-amber-200 transition-colors"
            >
              +1 (555) 123-4567
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;