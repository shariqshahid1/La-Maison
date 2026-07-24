'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiUsers, FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';
import SectionTitle from '@/components/ui/SectionTitle';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function ReservationPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  });
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to make a reservation');
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      const _res = await api.post('/api/reservations', {
        ...formData,
        user: user?._id,
      });

      toast.success('Reservation booked successfully! We will confirm shortly.');
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        specialRequests: '',
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || 'Failed to book reservation');
    } finally {
      setLoading(false);
    }
  };

  // Get today's date for min attribute - use useState to prevent hydration mismatch
  const [today] = useState(() => new Date().toISOString().split('T')[0]);

  return (
    <div className="min-h-screen py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="Book a Table"
          subtitle="Reserve your spot and enjoy an unforgettable dining experience"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-800"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Phone & Guests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                    placeholder="+1 (123) 456-7890"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Guests
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white appearance-none"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={today}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Time
                </label>
                <div className="relative">
                  <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white appearance-none"
                    required
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Special Requests
              </label>
              <div className="relative">
                <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white resize-none"
                  rows={4}
                  placeholder="Any dietary requirements, allergies, or special requests..."
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Book My Table'}
            </motion.button>
          </form>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: FiClock,
              title: 'Opening Hours',
              info: 'Mon-Fri: 11AM-10PM\nSat-Sun: 10AM-11PM',
            },
            {
              icon: FiPhone,
              title: 'Call Us',
              info: '+1 (123) 456-7890',
            },
            {
              icon: FiMail,
              title: 'Email',
              info: 'reservations@lamaison.com',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 p-6 rounded-xl text-center"
            >
              <item.icon className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm whitespace-pre-line">{item.info}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
