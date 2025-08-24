'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import logo from '@/public/gaatha-logo.png'
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
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '@/store/cartSlice';
import {  selectWishlistItems } from '@/store/wishlistSlice';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, onSnapshot } from '@/lib/firebase';

// Nav items with icon references
const navItems = [
  {
    name: 'Home',
    href: '/',
    icon: FaHome,
  },
  {
    name: 'Shop',
    href: '/store/shop',
    icon: GiShop,
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
    name: 'About',
    href: '/about',
    icon: FaInfoCircle,
    dropdown: [
      { name: 'Who we are', href: '/about', icon: FaUsers },
      { name: 'Our Values', href: '/about/values', icon: FaAward },
      { name: 'What We do', href: '/about/whatwedo', icon: FaBriefcase },
      { name: 'Contact Us', href: '/contact', icon: FaPhone },
    ],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Firebase state management
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const dropdownRef = useRef(null);
  const userRef = useRef(null);
  
  // Use Redux store for cart data
  const cartItemCount = useSelector(selectCartItemCount);
  const wishlistItems = useSelector(selectWishlistItems);

  useEffect(() => {
    // This effect is now only for Firebase user state, not the cart logic.
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsUserDropdownOpen(false);
      console.log('User logged out successfully.');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleUserClick = (event) => {
    event.stopPropagation();
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <header className="sticky h-20 top-0 z-50 bg-white/80 shadow-sm border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className=" ml-[-10px] flex items-center">
            <Image src={logo} alt="HunarGaatha Logo" loading='lazy' className=' rounded-full '
             width={40} height={40} />
            <span className="font-['Pacifico'] text-2xl text-[#B66E41]">HunarGaatha</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden ml-10 lg:flex items-center space-x-2" onMouseLeave={() => setActiveDropdown(null)}>
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
                    className="group flex items-center space-x-2 px-2 py-2 border-r-400 text-sm font-medium text-[#3A3A3A] hover:text-[#B66E41] hover:bg-[#F8F3EC] transition-colors relative"
                  >
                    <span className="text-lg">
                      <Icon />
                    </span>
                    <span>{item.name}</span>
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#B66E41] transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
                  </Link>
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl border border-gray-100 py-2 z-50"
                        ref={dropdownRef}
                      >
                        {item.dropdown.map((dropdownItem, index) => {
                          const DropIcon = dropdownItem.icon;
                          return (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              className="group relative flex items-center space-x-3 px-4 py-3 text-sm text-[#3A3A3A] hover:bg-[#F8F3EC] hover:text-[#B66E41] transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-lg">
                                <DropIcon />
                              </span>
                              <span>{dropdownItem.name}</span>
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B66E41] transition-all duration-300 group-hover:w-[90%]"></span>
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
              href="/store/wishlist"
              className="relative w-10 h-10 flex items-center justify-center text-[#3A3A3A] hover:text-[#B66E41] cursor-pointer"
            >
              <FaHeart className="text-xl" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D6A400] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              href="/store/cart"
              className="relative w-10 h-10 flex items-center justify-center text-[#3A3A3A] hover:text-[#B66E41] cursor-pointer"
            >
              <FaShoppingCart className="text-xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D6A400] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={userRef}>
              {user ? (
                <>
                  <button
                    onClick={handleUserClick}
                    className="flex items-center space-x-2 text-[#3A3A3A] hover:text-[#B66E41] cursor-pointer"
                  >
                    <FaUserCircle className="text-xl" />
                    <span className="hidden sm:block text-sm font-medium">
                      {user.displayName || 'Profile'}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white shadow-xl border border-gray-100 py-2 z-50"
                      >
                        <Link href="/account/profile" className="flex items-center space-x-2 px-4 py-2 text-sm text-[#3A3A3A] hover:bg-[#F8F3EC] hover:text-[#B66E41]">
                          <FaUserCircle /> <span>My Profile</span>
                        </Link>
                        <Link href="/orders" className="flex items-center space-x-2 px-4 py-2 text-sm text-[#3A3A3A] hover:bg-[#F8F3EC] hover:text-[#B66E41]">
                          <FaBoxOpen /> <span>My Orders</span>
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <button
                          onClick={handleLogout}
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
                  href="/account/login"
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
                      className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-[#3A3A3A] hover:text-[#B66E41] hover:bg-[#F8F3EC] transition-colors"
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