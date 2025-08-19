'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const categories = [
  { id: 'pottery', name: 'Pottery', icon: 'ri-ancient-gate-line', count: 156 },
  { id: 'handloom', name: 'Handloom', icon: 'ri-shirt-line', count: 234 },
  { id: 'handicraft', name: 'Handicraft', icon: 'ri-hammer-line', count: 189 },
  { id: 'fragrances', name: 'Fragrances (Itar)', icon: 'ri-flask-line', count: 87 },
  { id: 'food', name: 'Food & Organics', icon: 'ri-plant-line', count: 123 },
];    

export default function CategoriesSidebar({ selectedCategory, setSelectedCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  return (                
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 left-4 z-50 p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>  

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (   
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-2xl z-40 p-4 overflow-y-auto"
          >
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <ul className="space-y-2"> 
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => { 
                      setSelectedCategory(cat.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left ${
                      selectedCategory === cat.id 
                        ? 'bg-[#B66E41] text-white'
                        : 'hover:bg-gray-100 text-gray-800'
                    }`}
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
}
