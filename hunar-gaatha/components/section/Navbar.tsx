'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import icons from react-icons
import {
  FaHome,
  FaMapMarkerAlt,
  FaTshirt,
  FaBoxOpen,
  FaUserAlt,
  FaInfoCircle,
  FaUsers,
  FaAward,
  FaBriefcase,
  FaHandshake,
  FaPhone,
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
  FaTimes,
  FaBars,
  FaHeart,
  FaBell,
  FaChevronDown,
} from 'react-icons/fa';
import {
  GiPerfumeBottle,
  GiLeatherBoot,
  GiRolledCloth,
  GiPorcelainVase,
  GiShop
} from 'react-icons/gi';
import { FiMap } from 'react-icons/fi';

import useCartStore from '@/stores/cartStore';
import useWishlistStore from '@/stores/wishlistStore';

// Mock auth hook for demonstration. Replace with your actual authentication logic.
const useAuth = () => ({
  currentUser: { displayName: 'John Doe', photoURL: '/images/profile-pic.jpg' },
  // A real-world app would get a user object from a service like Firebase or your backend.
  // currentUser: null, // Uncomment this line to see the 'Login' button
  logout: () => console.log('Logout user'),
});

// Nav items with icon references
const navItems = [
  {
    name: 'Home',
    href: '/',
    icon: FaHome,
  },
  {
    name: 'Districts',
    href: '/districts',
    icon: FaMapMarkerAlt,
    dropdown: [
      { name: 'Kannauj - Itar', href: '/districts/kannauj', icon: GiPerfumeBottle },
      { name: 'Kanpur - Leather', href: '/districts/kanpur', icon: GiLeatherBoot },
      { name: 'Lucknow - Chikankari', href: '/districts/lucknow', icon: FaTshirt },
      { name: 'Varanasi - Silk', href: '/districts/varanasi', icon: GiRolledCloth },
      { name: 'View All Districts', href: '/districts', icon: FiMap },
    ],
  },
  {
    name: 'Categories',
    href: '/categories',
    icon: FaBoxOpen,
    dropdown: [
      { name: 'Perfumes & Itar', href: '/categories/perfumes', icon: GiPerfumeBottle },
      { name: 'Textiles & Clothing', href: '/categories/textiles', icon: FaTshirt },
      { name: 'Leather Goods', href: '/categories/leather', icon: GiLeatherBoot },
      { name: 'Home Decor', href: '/categories/decor', icon: GiPorcelainVase },
      { name: 'All Categories', href: '/categories', icon: FaBoxOpen },
    ],
  },
  {
    name: 'Artisans',
    href: '/artisans',
    icon: FaUserAlt,
  },
  {
    name: 'Shop',
    href: '/shop',
    icon: GiShop,
  },
  {
    name: 'About',
    href: '/about',
    icon: FaInfoCircle,
    dropdown: [
      { name: 'Who we are', href: '/about', icon: FaUsers },
      { name: 'Our Values', href: '/about/values', icon: FaAward },
      { name: 'What We do', href: '/about/what-we-do', icon: FaBriefcase },
      { name: 'Be a Part', href: '/about/be-a-part', icon: FaHandshake },
      { name: 'Contact Us', href: '/contact', icon: FaPhone },
    ],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const cartRef = useRef(null);
  const userRef = useRef(null);

  const { currentUser, logout } = useAuth();
  const { getItemCount, items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close all dropdowns if click is outside their respective refs
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCartClick = (event) => {
    event.stopPropagation();
    setIsCartOpen(!isCartOpen);
    setIsUserDropdownOpen(false); // Close other dropdowns
  };

  const handleUserClick = (event) => {
    event.stopPropagation();
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsCartOpen(false); // Close other dropdowns
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-['Pacifico'] text-2xl text-[#B66E41]">HunarGatha</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2" onMouseLeave={() => setActiveDropdown(null)}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-[#3A3A3A] hover:text-[#B66E41] hover:bg-[#F8F3EC] transition-colors"
                  >
                    <span className="text-lg">
                      <Icon />
                    </span>
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                        ref={dropdownRef}
                      >
                        {item.dropdown.map((dropdownItem, index) => {
                          const DropIcon = dropdownItem.icon;
                          return (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              className="flex items-center space-x-3 px-4 py-3 text-sm text-[#3A3A3A] hover:bg-[#F8F3EC] hover:text-[#B66E41] transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-lg">
                                <DropIcon />
                              </span>
                              <span>{dropdownItem.name}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Search, Cart, Profile Icons */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search crafts, artisans..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#B66E41] focus:border-transparent text-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsMenuOpen(false);
              }}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#3A3A3A] hover:text-[#B66E41] cursor-pointer"
            >
              <FaSearch className="text-xl" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative w-10 h-10 flex items-center justify-center text-[#3A3A3A] hover:text-[#B66E41] cursor-pointer"
            >
              <FaHeart className="text-xl" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D6A400] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Dropdown */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={handleCartClick}
                className="relative w-10 h-10 flex items-center justify-center text-[#3A3A3A] hover:text-[#B66E41] cursor-pointer"
              >
                <FaShoppingCart className="text-xl" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D6A400] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b">
                      <h3 className="font-semibold text-lg">Your Cart</h3>
                    </div>
                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map((item, index) => (
                          <div key={index} className="flex items-center px-4 py-3 hover:bg-gray-50">
                            {/* Example of displaying item image */}
                            {/* <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg mr-3" /> */}
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.quantity} x ₹{item.price}</p>
                            </div>
                          </div>
                        ))}
                        <div className="px-4 py-2 border-t">
                          <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>₹{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
                          </div>
                          <Link href="/checkout" className="mt-3 block w-full text-center bg-[#B66E41] text-white py-2 rounded-lg hover:bg-[#8B5633]">
                            Proceed to Checkout
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="px-4 py-3 text-center text-gray-500">
                        Your cart is empty.
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={userRef}>
              {currentUser ? (
                <>
                  <button
                    onClick={handleUserClick}
                    className="flex items-center space-x-2 text-[#3A3A3A] hover:text-[#B66E41] cursor-pointer"
                  >
                    <FaUserCircle className="text-xl" />
                    <span className="hidden sm:block text-sm font-medium">
                      {currentUser.displayName || 'Profile'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                      >
                        <Link href="/profile" className="flex items-center space-x-2 px-4 py-2 text-sm text-[#3A3A3A] hover:bg-[#F8F3EC] hover:text-[#B66E41]">
                          <FaUserCircle /> <span>My Profile</span>
                        </Link>
                        <Link href="/orders" className="flex items-center space-x-2 px-4 py-2 text-sm text-[#3A3A3A] hover:bg-[#F8F3EC] hover:text-[#B66E41]">
                          <FaBoxOpen /> <span>My Orders</span>
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <button
                          onClick={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                        >
                          <FaTimes /> <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href="/login"
                  className="w-10 h-10 flex items-center justify-center text-[#3A3A3A] hover:text-[#B66E41] cursor-pointer"
                >
                  <FaUserCircle className="text-xl" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsSearchOpen(false);
                setIsCartOpen(false);
                setIsUserDropdownOpen(false);
              }}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#3A3A3A] hover:text-[#B66E41] cursor-pointer"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-3 border-t border-gray-100 overflow-hidden"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search crafts, artisans..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#B66E41] focus:border-transparent text-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-gray-100 overflow-hidden"
            >
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-[#3A3A3A] hover:text-[#B66E41] hover:bg-[#F8F3EC] rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-2xl">
                        <Icon />
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}