'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiUsers, FiCalendar, FiShoppingBag, FiPlus, FiTrash2, FiEdit, FiX } from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import api from '@/utils/api';

// Sample data for demo
const sampleOrders = [
  {
    _id: '1',
    user: { name: 'John Doe', email: 'john@example.com' },
    items: [{ name: 'Margherita Pizza', quantity: 2, price: 14.99 }],
    totalAmount: 29.98,
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    user: { name: 'Jane Smith', email: 'jane@example.com' },
    items: [{ name: 'Wagyu Burger', quantity: 1, price: 18.99 }],
    totalAmount: 18.99,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
];

const sampleReservations = [
  {
    _id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1234567890',
    date: new Date().toISOString(),
    time: '7:00 PM',
    guests: 4,
    status: 'pending',
  },
];

const sampleMenuItems = [
  {
    _id: '1',
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza',
    price: 14.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop',
    isAvailable: true,
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(sampleOrders);
  const [reservations, setReservations] = useState(sampleReservations);
  const [menuItems, setMenuItems] = useState(sampleMenuItems);
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Pizza',
    image: '',
  });

  useEffect(() => {
    // Check admin access
    if (!isAuthenticated || !isAdmin) {
      toast.error('Access denied. Admin only.');
      router.push('/');
      return;
    }
    setLoading(false);
  }, [isAuthenticated, isAdmin, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiMenu },
    { id: 'orders', label: 'Orders', icon: FiShoppingBag },
    { id: 'reservations', label: 'Reservations', icon: FiCalendar },
    { id: 'menu', label: 'Menu', icon: FiMenu },
  ];

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await api.patch(`/api/orders?id=${orderId}`, { status });
      setOrders(orders.map((order) => 
        order._id === orderId ? { ...order, status } : order
      ));
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const updateReservationStatus = async (reservationId: string, status: string) => {
    try {
      await api.patch(`/api/reservations?id=${reservationId}`, { status });
      setReservations(reservations.map((res) => 
        res._id === reservationId ? { ...res, status } : res
      ));
      toast.success('Reservation status updated');
    } catch (error) {
      toast.error('Failed to update reservation');
    }
  };

  const deleteMenuItem = async (itemId: string) => {
    try {
      await api.delete(`/api/menu?id=${itemId}`);
      setMenuItems(menuItems.filter((item) => item._id !== itemId));
      toast.success('Menu item deleted');
    } catch (error) {
      toast.error('Failed to delete menu item');
    }
  };

  const addMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/menu', {
        ...newMenuItem,
        price: parseFloat(newMenuItem.price),
      });
      setMenuItems([...menuItems, res.data.menuItem]);
      setShowAddMenuModal(false);
      setNewMenuItem({ name: '', description: '', price: '', category: 'Pizza', image: '' });
      toast.success('Menu item added');
    } catch (error) {
      toast.error('Failed to add menu item');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'confirmed':
        return 'bg-green-500/20 text-green-500';
      case 'preparing':
        return 'bg-blue-500/20 text-blue-500';
      case 'delivered':
        return 'bg-purple-500/20 text-purple-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage your restaurant operations</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Overview Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-gray-900 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <FiShoppingBag className="w-8 h-8 text-emerald-500" />
                  <span className="text-3xl font-bold text-white">{orders.length}</span>
                </div>
                <p className="text-gray-400">Total Orders</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <FiCalendar className="w-8 h-8 text-emerald-500" />
                  <span className="text-3xl font-bold text-white">{reservations.length}</span>
                </div>
                <p className="text-gray-400">Reservations</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <FiMenu className="w-8 h-8 text-emerald-500" />
                  <span className="text-3xl font-bold text-white">{menuItems.length}</span>
                </div>
                <p className="text-gray-400">Menu Items</p>
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {orders.map((order) => (
                <div key={order._id} className="bg-gray-900 p-6 rounded-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-white font-semibold">{order.user?.name}</h3>
                      <p className="text-gray-400 text-sm">{order.user?.email}</p>
                      <p className="text-gray-500 text-sm mt-2">
                        {order.items.map((item) => `${item.name} x${item.quantity}`).join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-emerald-500 font-bold">${order.totalAmount.toFixed(2)}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id!, e.target.value)}
                        className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Reservations Tab */}
          {activeTab === 'reservations' && (
            <motion.div
              key="reservations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {reservations.map((reservation) => (
                <div key={reservation._id} className="bg-gray-900 p-6 rounded-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-white font-semibold">{reservation.name}</h3>
                      <p className="text-gray-400 text-sm">{reservation.email}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(reservation.date).toLocaleDateString()} at {reservation.time} - {reservation.guests} guests
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                        {reservation.status}
                      </span>
                      <select
                        value={reservation.status}
                        onChange={(e) => updateReservationStatus(reservation._id!, e.target.value)}
                        className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Menu Tab */}
          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Menu Items</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddMenuModal(true)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                >
                  <FiPlus />
                  <span>Add Item</span>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <div key={item._id} className="bg-gray-900 rounded-xl overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h4 className="text-white font-semibold">{item.name}</h4>
                      <p className="text-gray-400 text-sm">{item.category}</p>
                      <p className="text-emerald-500 font-bold mt-2">${item.price.toFixed(2)}</p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => deleteMenuItem(item._id!)}
                          className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-500 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                          <FiTrash2 />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Menu Item Modal */}
        <AnimatePresence>
          {showAddMenuModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setShowAddMenuModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 rounded-xl p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Add Menu Item</h3>
                  <button onClick={() => setShowAddMenuModal(false)}>
                    <FiX className="w-6 h-6 text-gray-400 hover:text-white" />
                  </button>
                </div>
                <form onSubmit={addMenuItem} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={newMenuItem.name}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={newMenuItem.description}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 resize-none"
                    rows={3}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newMenuItem.price}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    step="0.01"
                    required
                  />
                  <select
                    value={newMenuItem.category}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    {['Pizza', 'Burgers', 'BBQ', 'Drinks', 'Desserts', 'Appetizers', 'Pasta', 'Salads'].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newMenuItem.image}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, image: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded-lg transition-colors"
                  >
                    Add Item
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
