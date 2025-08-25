'use client';

import { useState, FC, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

// Define the shape of a single category object
interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

// Define the component's props
interface CategoriesSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
}

const categories: Category[] = [
  { id: 'pottery', name: 'Pottery', icon: 'ri-ancient-gate-line', count: 156 },
  { id: 'handloom', name: 'Handloom', icon: 'ri-shirt-line', count: 234 },
  { id: 'handicraft', name: 'Handicraft', icon: 'ri-hammer-line', count: 189 },
  { id: 'fragrances', name: 'Fragrances (Itar)', icon: 'ri-flask-line', count: 87 },
  { id: 'food', name: 'Food & Organics', icon: 'ri-plant-line', count: 123 },
];

const CategoriesSidebar: FC<CategoriesSidebarProps> = ({ selectedCategory, setSelectedCategory }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 }); // Tailwind's `lg` breakpoint
  const [isOpen, setIsOpen] = useState(false); // Default to closed on all sizes, managed by effect

  // Use useEffect to manage the sidebar's open/close state based on screen size changes.
  // This is the correct way to handle side effects in React.
  useEffect(() => {
    setIsOpen(isDesktop);
  }, [isDesktop]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Close sidebar on mobile after selection
    if (!isDesktop) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Toggle Button for mobile view */}
      {!isDesktop && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-24 left-4 z-50 p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition"
          aria-label={isOpen ? 'Close categories sidebar' : 'Open categories sidebar'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Sidebar with animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: isDesktop ? 0 : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isDesktop ? 0 : '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed lg:relative top-0 left-0 w-64 h-full bg-white shadow-2xl lg:shadow-none z-40 p-4 overflow-y-auto lg:h-auto lg:p-0`}
          >
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="text-xl font-semibold">Categories</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </div>
            
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[#B66E41] text-white'
                        : 'hover:bg-gray-100 text-gray-800'
                    }`}
                    aria-current={selectedCategory === cat.id ? 'page' : 'false'}
                  >
                    <div className="flex items-center space-x-2">
                      <i className={`${cat.icon} text-lg`}></i>
                      <span>{cat.name}</span>
                    </div>
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      selectedCategory === cat.id
                        ? 'bg-white/30 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default CategoriesSidebar;