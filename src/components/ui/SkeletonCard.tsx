'use client';

import { motion } from 'framer-motion';

export default function SkeletonCard() {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="h-56 bg-gray-800"
      />
      <div className="p-6 space-y-4">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-6 bg-gray-800 rounded w-3/4"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          className="h-4 bg-gray-800 rounded w-full"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          className="h-4 bg-gray-800 rounded w-1/2"
        />
        <div className="flex justify-between items-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            className="h-4 bg-gray-800 rounded w-1/4"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
            className="h-10 bg-gray-800 rounded w-1/3"
          />
        </div>
      </div>
    </div>
  );
}
