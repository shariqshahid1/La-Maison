'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import SectionTitle from '@/components/ui/SectionTitle';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      router.push('/login');
      return;
    }

    if (!deliveryAddress || !phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        user: user?._id,
        items: items.map((item) => ({
          menuItem: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: getTotal(),
        deliveryAddress,
        phone,
        notes,
      };

      const res = await api.post('/api/orders', orderData);
      
      toast.success('Order placed successfully!');
      clearCart();
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FiShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center space-x-2"
              >
                <FiArrowLeft />
                <span>Browse Menu</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Your Cart" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-900 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-24 h-24 object-cover rounded-lg"
                />

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-400 text-sm line-clamp-1">{item.description}</p>
                  <p className="text-emerald-500 font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FiMinus className="w-4 h-4 text-white" />
                  </motion.button>
                  <span className="text-white font-semibold w-8 text-center">
                    {item.quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FiPlus className="w-4 h-4 text-white" />
                  </motion.button>
                </div>

                {/* Remove */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeItem(item._id)}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <FiTrash2 className="w-5 h-5 text-red-500" />
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="text-emerald-500">FREE</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span className="text-emerald-500">${getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {!showCheckout ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded-lg transition-colors"
                >
                  Proceed to Checkout
                </motion.button>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Delivery Address *"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Order Notes (optional)"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 resize-none"
                    rows={3}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </motion.button>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="w-full text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <Link href="/menu">
                <button className="w-full mt-4 text-gray-400 hover:text-emerald-500 text-sm transition-colors flex items-center justify-center space-x-2">
                  <FiArrowLeft />
                  <span>Continue Shopping</span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
