'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import Logo from '@/components/ui/Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/reservation', label: 'Reservation' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore((state) => state.getItemCount());
  const { isAuthenticated, isAdmin, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0f1a]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-emerald-500'
                    : 'text-gray-300 hover:text-emerald-500'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative p-2 text-gray-300 hover:text-emerald-500 transition-colors"
            >
              <FiShoppingCart className="w-6 h-6" />
              {mounted && itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            {mounted ? (
              isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-4">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 text-gray-300 hover:text-emerald-500 transition-colors"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:flex items-center space-x-2 text-gray-300 hover:text-emerald-500 transition-colors"
                >
                  <FiUser className="w-5 h-5" />
                  <span className="text-sm">Login</span>
                </Link>
              )
            ) : (
              <Link
                href="/login"
                className="hidden md:flex items-center space-x-2 text-gray-300 hover:text-emerald-500 transition-colors"
              >
                <FiUser className="w-5 h-5" />
                <span className="text-sm">Login</span>
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-emerald-500 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mounted && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0a0f1a]/95 backdrop-blur-md border-t border-gray-800"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-base font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-emerald-500'
                      : 'text-gray-300 hover:text-emerald-500'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-800 space-y-4">
                {mounted && isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block text-base font-medium text-emerald-500"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 text-gray-300 hover:text-emerald-500"
                    >
                      <FiLogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center space-x-2 text-gray-300 hover:text-emerald-500"
                  >
                    <FiUser className="w-5 h-5" />
                    <span>Login / Sign Up</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
