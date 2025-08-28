'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import logo from '@/public/gaatha-logo.png';
import { IconType } from 'react-icons';
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
  FaChevronDown,
  FaUserPlus
} from 'react-icons/fa';
import {
  GiPerfumeBottle,
  GiLeatherBoot,
  GiRolledCloth,
  GiPorcelainVase,
  GiShop,
} from 'react-icons/gi';
import { FiMap } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '@/store/cartSlice';
import { selectWishlistItems } from '@/store/wishlistSlice';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';

// Define types for a navigation item
interface NavItem {
  name: string;
  href: string;
  icon: IconType;
  dropdown?: NavItem[];
}

// Nav items with icon references
const navItems: NavItem[] = [
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
      { name: 'Be our Part', href: '/about/beapart', icon: FaUserPlus },
      { name: 'Contact Us', href: '/contact', icon: FaPhone },
    ],
  },
];

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Use Redux store for cart and wishlist counts
  const cartItemCount = useSelector(selectCartItemCount);
  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      unsubscribeAuth();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsUserDropdownOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsSearchOpen(false);
    setIsUserDropdownOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-0 h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="HunarGaatha Logo"
              loading="lazy"
              className="rounded-full"
              width={40}
              height={40}
            />
            <span className="font-['Pacifico'] text-2xl text-[#B66E41] hidden sm:block">
              HunarGaatha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center "
            onMouseLeave={() => setActiveDropdown(null)}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 px-2 py-2 lg:text-xs md:text-sm sm:text-md font-medium text-[#3A3A3A] hover:text-[#B66E41] hover:bg-[#F8F3EC] transition-colors relative"
                  >
                    <span className="text-lg">
                      <Icon />
                    </span>
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <FaChevronDown
                        className={`text-xs ml-1 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                    <span className="absolute bottom-0 left-[45%] w-0 h-0.5 bg-[#B66E41] transition-all duration-300 transform -translate-x-1/2 group-hover:w-[85%]"></span>
                  </Link>
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 min-w-[15rem] bg-white shadow-xl rounded-md border border-gray-100 py-2 z-50 overflow-hidden"
                        ref={dropdownRef}
                      >
                        {item.dropdown.map((dropdownItem) => {
                          const DropIcon = dropdownItem.icon;
                          return (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="group relative flex items-center space-x-3 px-4 py-3 text-sm text-[#3A3A3A] hover:bg-[#F8F3EC] hover:text-[#B66E41] transition-colors"
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
          <div className="flex items-center sm:space-x-4">
            {/* Desktop Search */}
            <div className="relative hidden md:block ">
              <input
                type="text"
                placeholder="Search crafts, artisans..."
                className=" pl-10 pr-4 py-2 w-20 md:w-60 lg:w-40 xl:w-48 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#B66E41] focus:border-transparent text-sm transition-all"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={toggleMobileSearch}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#3A3A3A] hover:text-[#B66E41] transition-colors"
              aria-label="Toggle mobile search"
            >
              <FaSearch className="text-xl" />
            </button>

            {/* Wishlist */}
            <Link
              href="/store/wishlist"
              className="relative flex items-center justify-center text-[#3A3A3A] hover:text-[#B66E41] transition-colors"
              aria-label="Wishlist"
            >
              <FaHeart className="text-xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D6A400] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              href="/store/cart"
              className="relative flex items-center justify-center text-[#3A3A3A] hover:text-[#B66E41] transition-colors"
              aria-label="Shopping Cart"
            >
              <FaShoppingCart className="text-xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D6A400] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={userRef}>
              {user ? (
                <>
                  <button
                    onClick={toggleUserDropdown}
                    className=" flex items-center space-x-2 text-[#3A3A3A] hover:text-[#B66E41] transition-colors"
                    aria-label="User Profile"
                  >
                    <FaUserCircle className=" text-xl" />
                    <span className="hidden  sm:block text-sm font-medium">
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
                        className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md border border-gray-100 py-2 z-50"
                      >
                        <Link
                          href="/account/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-[#3A3A3A] hover:bg-[#F8F3EC] hover:text-[#B66E41] transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <FaUserCircle /> <span>My Profile</span>
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-[#3A3A3A] hover:bg-[#F8F3EC] hover:text-[#B66E41] transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <FaBoxOpen /> <span>My Orders</span>
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
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
                  className="w-10 h-10 flex items-center justify-center text-[#3A3A3A] hover:text-[#B66E41] transition-colors"
                  aria-label="Login"
                >
                  <FaUserCircle className="text-xl" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#3A3A3A] hover:text-[#B66E41] transition-colors"
              aria-label="Toggle mobile menu"
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
              transition={{ duration: 0.3 }}
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
              transition={{ duration: 0.3 }}
              className="lg:hidden py-4 border-t border-gray-100 overflow-hidden"
            >
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <button
                      onClick={() =>
                        item.dropdown
                          ? setActiveDropdown(activeDropdown === item.name ? null : item.name)
                          : setIsMenuOpen(false)
                      }
                      className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-[#3A3A3A] hover:text-[#B66E41] hover:bg-[#F8F3EC] transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">
                          <item.icon />
                        </span>
                        <span>{item.name}</span>
                      </div>
                      {item.dropdown && (
                        <FaChevronDown
                          className={`text-sm transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {item.dropdown && activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-[#F8F3EC] mt-2 rounded-lg"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="flex items-center space-x-3 px-6 py-2 text-sm text-[#3A3A3A] hover:text-[#B66E41] transition-colors"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              <span className="text-lg">
                                <dropdownItem.icon />
                              </span>
                              <span>{dropdownItem.name}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;