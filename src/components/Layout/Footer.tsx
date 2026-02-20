// import React from 'react';
import { Hotel, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Hotel className="h-8 w-8 text-amber-600" />
              <span className="font-bold text-xl">Cozy Vile</span>
            </div>
            <p className="text-gray-400 mb-4">
              Experience luxury and comfort at Cozy Vile, where every stay is a memorable journey.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-amber-600 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-amber-600 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-amber-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/rooms" className="text-gray-400 hover:text-amber-600 transition-colors">Rooms & Suites</a></li>
              <li><a href="/amenities" className="text-gray-400 hover:text-amber-600 transition-colors">Amenities</a></li>
              <li><a href="/dining" className="text-gray-400 hover:text-amber-600 transition-colors">Dining</a></li>
              <li><a href="/events" className="text-gray-400 hover:text-amber-600 transition-colors">Events</a></li>
              <li><a href="/gallery" className="text-gray-400 hover:text-amber-600 transition-colors">Gallery</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">24/7 Room Service</span></li>
              <li><span className="text-gray-400">Spa & Wellness</span></li>
              <li><span className="text-gray-400">Business Center</span></li>
              <li><span className="text-gray-400">Valet Parking</span></li>
              <li><span className="text-gray-400">Concierge Service</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-amber-600" />
                <span className="text-gray-400">123 Luxury Street, City Center</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-600" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-600" />
                <span className="text-gray-400">info@cozyvile.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center space-y-2">
          <p className="text-gray-400">
            © 2026 Cozy Vile Hotel. All rights reserved.
          </p>

          {/* Admin Login Link */}
          <Link
            to="/adminlogin"
            className="text-xs text-gray-500 hover:text-amber-600 transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
