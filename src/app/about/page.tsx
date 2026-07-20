'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { FiAward, FiHeart, FiUsers, FiClock } from 'react-icons/fi';

const chefs = [
  {
    name: 'Marco Rossi',
    role: 'Head Chef',
    image: 'https://images.unsplash.com/photo-1583394293214-28ez09ce430a?w=400&h=500&fit=crop',
    bio: 'With over 20 years of experience, Chef Marco brings authentic Italian flavors to every dish.',
  },
  {
    name: 'Sofia Bianchi',
    role: 'Pastry Chef',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=500&fit=crop',
    bio: 'Sofia creates magical desserts that combine traditional recipes with modern presentation.',
  },
  {
    name: 'Luca Romano',
    role: 'Sous Chef',
    image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&h=500&fit=crop',
    bio: 'Luca specializes in fusion cuisine, bringing creative twists to classic Italian dishes.',
  },
];

const stats = [
  { icon: FiAward, value: '15+', label: 'Years of Excellence' },
  { icon: FiHeart, value: '50+', label: 'Signature Dishes' },
  { icon: FiUsers, value: '10k+', label: 'Happy Customers' },
  { icon: FiClock, value: '30min', label: 'Average Delivery' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our <span className="text-amber-500">Story</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            A journey of passion, flavor, and culinary excellence
          </p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Restaurant Interior"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The Beginning
              </h2>
              <div className="w-20 h-1 bg-amber-500 rounded-full mb-6" />
              <p className="text-gray-400 text-lg mb-4">
                La Cucina was born from a simple dream: to bring the authentic taste of Italy to the world. Founded in 2010 by the Rossi family, our restaurant has become a beacon for food lovers seeking genuine Italian cuisine.
              </p>
              <p className="text-gray-400 text-lg mb-4">
                Every ingredient we use is carefully selected, from the imported Italian flour to the locally sourced organic vegetables. We believe that great food starts with great ingredients.
              </p>
              <p className="text-gray-400 text-lg">
                Our kitchen is a place where tradition meets innovation, where recipes passed down through generations are prepared with love and served with pride.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Our Achievements"
            subtitle="Numbers that reflect our dedication to excellence"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-800/50 p-8 rounded-xl text-center hover:bg-gray-800 transition-all"
              >
                <stat.icon className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Meet Our Chefs"
            subtitle="The talented artists behind every delicious dish"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chefs.map((chef, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative overflow-hidden h-80">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${chef.name}&size=400&background=f59e0b&color=000`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">
                      {chef.name}
                    </h3>
                    <p className="text-amber-500 font-medium">{chef.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400">{chef.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Our Values"
            subtitle="The principles that guide everything we do"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description: 'We never compromise on the quality of our ingredients. Every dish is made with the finest ingredients, sourced locally and imported from Italy.',
              },
              {
                title: 'Authentic Recipes',
                description: 'Our recipes have been passed down through generations, preserving the true flavors of Italian cuisine while adding modern creativity.',
              },
              {
                title: 'Exceptional Service',
                description: 'We believe dining is an experience. Our team is dedicated to providing warm, attentive service that makes every visit special.',
              },
              {
                title: 'Sustainability',
                description: 'We are committed to sustainable practices, from sourcing organic ingredients to minimizing waste and using eco-friendly packaging.',
              },
              {
                title: 'Community',
                description: 'La Cucina is more than a restaurant – it is a gathering place where friends and family come together to share good food and create memories.',
              },
              {
                title: 'Innovation',
                description: 'While honoring tradition, we continuously evolve our menu with creative dishes that surprise and delight our guests.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800 transition-all border border-gray-700 hover:border-amber-500"
              >
                <h3 className="text-xl font-bold text-white mb-3 hover:text-amber-500 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>
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
            Come Experience La Cucina
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Book your table today and discover why thousands of food lovers choose us for authentic Italian dining.
          </p>
          <motion.a
            href="/reservation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Reserve Your Table
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
