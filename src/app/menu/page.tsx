'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import SectionTitle from '@/components/ui/SectionTitle';
import MenuCard from '@/components/ui/MenuCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import api from '@/utils/api';

const categories = [
  'All',
  'Pizza',
  'Burgers',
  'BBQ',
  'Drinks',
  'Desserts',
  'Appetizers',
  'Pasta',
  'Salads',
];

// Sample menu data for demo (replace with API call in production)
const sampleMenuItems = [
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
    name: 'Pepperoni Pizza',
    description: 'Loaded with pepperoni and melted mozzarella cheese',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=400&fit=crop',
    category: 'Pizza',
  },
  {
    _id: '3',
    name: 'Wagyu Burger',
    description: 'Premium wagyu beef patty with artisan cheese and truffle aioli',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop',
    category: 'Burgers',
  },
  {
    _id: '4',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheddar, lettuce, tomato, and special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=400&fit=crop',
    category: 'Burgers',
  },
  {
    _id: '5',
    name: 'BBQ Ribs Platter',
    description: 'Slow-cooked ribs with house-made BBQ sauce and coleslaw',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop',
    category: 'BBQ',
  },
  {
    _id: '6',
    name: 'Grilled Chicken BBQ',
    description: 'Marinated chicken breast with smoky BBQ glaze',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=400&fit=crop',
    category: 'BBQ',
  },
  {
    _id: '7',
    name: 'Fresh Lemonade',
    description: 'Refreshing homemade lemonade with mint',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f66?w=500&h=400&fit=crop',
    category: 'Drinks',
  },
  {
    _id: '8',
    name: 'Mango Smoothie',
    description: 'Tropical mango blended with yogurt and honey',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500&h=400&fit=crop',
    category: 'Drinks',
  },
  {
    _id: '9',
    name: 'Tiramisu',
    description: 'Traditional Italian dessert with espresso-soaked ladyfingers',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=400&fit=crop',
    category: 'Desserts',
  },
  {
    _id: '10',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=400&fit=crop',
    category: 'Desserts',
  },
  {
    _id: '11',
    name: 'Bruschetta',
    description: 'Toasted bread topped with tomatoes, garlic, basil, and olive oil',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&h=400&fit=crop',
    category: 'Appetizers',
  },
  {
    _id: '12',
    name: 'Fettuccine Alfredo',
    description: 'Creamy pasta with parmesan sauce and grilled chicken',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&h=400&fit=crop',
    category: 'Pasta',
  },
  {
    _id: '13',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop',
    category: 'Salads',
  },
  {
    _id: '14',
    name: 'Spaghetti Bolognese',
    description: 'Classic Italian pasta with rich meat sauce',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=500&h=400&fit=crop',
    category: 'Pasta',
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState(sampleMenuItems);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Filter items by category
  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Our Menu"
          subtitle="Explore our diverse selection of dishes, from classic Italian favorites to modern creations"
        />

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-amber-500'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredItems.map((item, index) => (
              <MenuCard key={item._id} item={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl">
              No items found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
