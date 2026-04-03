'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const footerLinks = {
  quickLinks: [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About Us' },
    { href: '/reservation', label: 'Reservations' },
    { href: '/contact', label: 'Contact' },
  ],
  hours: [
    { day: 'Monday - Friday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 11:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 9:00 PM' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-bold text-amber-500">La</span>
              <span className="text-3xl font-bold text-white">Cucina</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Experience the finest Italian cuisine with authentic flavors and modern presentation.
            </p>
            <div className="flex space-x-4">
              {[FiInstagram, FiFacebook, FiTwitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-amber-500 hover:bg-gray-700 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Gourmet Street, Food City, FC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-amber-500 transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href="mailto:info@lacucina.com" className="text-gray-400 hover:text-amber-500 transition-colors">
                  info@lacucina.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Opening Hours</h3>
            <ul className="space-y-3">
              {footerLinks.hours.map((item, index) => (
                <li key={index} className="text-gray-400">
                  <p className="font-medium text-white">{item.day}</p>
                  <p>{item.hours}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} La Cucina. All rights reserved. Crafted with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
