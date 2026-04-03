'use client';

import { motion } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface MenuItemProps {
  item: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  };
  index: number;
}

export default function MenuCard({ item, index }: MenuItemProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      _id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
    });
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-4 right-4 bg-amber-500 text-black px-3 py-1 rounded-full font-semibold text-sm">
          ${item.price.toFixed(2)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 uppercase tracking-wider">{item.category}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <FiShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
