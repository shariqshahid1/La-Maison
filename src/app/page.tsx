'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiStar, FiClock, FiUsers } from 'react-icons/fi';
import SectionTitle from '@/components/ui/SectionTitle';
import MenuCard from '@/components/ui/MenuCard';
import api from '@/utils/api';

// Sample featured dishes data
const featuredDishes = [
  {
    _id: '1',
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop',
    category: 'Pizza',
  },
  {
    _id: '2',
    name: 'Wagyu Burger',
    description: 'Premium wagyu beef patty with artisan cheese and truffle aioli',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop',
    category: 'Burgers',
  },
  {
    _id: '3',
    name: 'BBQ Ribs Platter',
    description: 'Slow-cooked ribs with house-made BBQ sauce and coleslaw',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop',
    category: 'BBQ',
  },
  {
    _id: '4',
    name: 'Tiramisu',
    description: 'Traditional Italian dessert with espresso-soaked ladyfingers',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=400&fit=crop',
    category: 'Desserts',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    text: 'Absolutely amazing food! The ambiance and service were top-notch. Will definitely come back!',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Michael Chen',
    rating: 5,
    text: 'Best Italian restaurant in town. The pasta is homemade and you can taste the difference.',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Emma Williams',
    rating: 5,
    text: 'Perfect for date night! Great wine selection and the desserts are to die for.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background */}
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-emerald-500 text-lg md:text-xl font-medium mb-4 tracking-wider uppercase"
          >
            Welcome to La Maison
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Delicious Food,
            <br />
            <span className="text-emerald-500">Delivered Fresh</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Experience authentic Italian cuisine made with the finest ingredients and traditional recipes passed down through generations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-8 py-4 rounded-lg text-lg transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <span>Order Now</span>
                <FiArrowRight />
              </motion.button>
            </Link>
            <Link href="/reservation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white hover:border-emerald-500 hover:text-emerald-500 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <span>Book a Table</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Featured Dishes"
            subtitle="Discover our most popular menu items, crafted with love and the finest ingredients"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDishes.map((dish, index) => (
              <MenuCard key={dish._id} item={dish} index={index} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black font-semibold px-8 py-3 rounded-lg transition-all"
              >
                View Full Menu
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                  alt="Restaurant Interior"
                  className="rounded-2xl shadow-2xl"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute -bottom-6 -right-6 bg-emerald-500 text-black p-6 rounded-xl shadow-xl"
                >
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-sm font-medium">Years Experience</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-emerald-500 rounded-full mb-6" />
              <p className="text-gray-400 text-lg mb-6">
                Founded in 2010, La Maison has been serving authentic Italian cuisine with a modern twist. Our chefs use only the freshest ingredients, sourced locally and imported directly from Italy.
              </p>
              <p className="text-gray-400 text-lg mb-8">
                Every dish tells a story of tradition, passion, and culinary excellence. We believe in creating not just meals, but memorable experiences.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: FiClock, label: 'Fast Delivery', value: '30 min' },
                  { icon: FiStar, label: 'Quality', value: '4.9/5' },
                  { icon: FiUsers, label: 'Happy Customers', value: '10k+' },
                ].map(({ icon: Icon, label, value }, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <Icon className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <p className="text-white font-bold">{value}</p>
                    <p className="text-gray-500 text-sm">{label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="What Our Customers Say"
            subtitle="Real reviews from real food lovers"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <div className="flex text-emerald-500">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <FiStar key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-black/80" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience Amazing Food?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Book your table now or order online for delivery. Fresh, hot, and delicious - guaranteed!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
              >
                Reserve a Table
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white hover:border-emerald-500 hover:text-emerald-500 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
