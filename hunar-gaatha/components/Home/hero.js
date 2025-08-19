'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative  min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Indian%20artisan%20woman%20weaving%20colorful%20traditional%20textiles%20on%20handloom%20in%20rustic%20workshop%2C%20warm%20golden%20lighting%2C%20vibrant%20threads%2C%20peaceful%20countryside%20setting%2C%20traditional%20craft%20heritage%2C%20beautiful%20cultural%20scene&width=1920&height=1080&seq=hero-bg-001&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-amber-800/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-['Playfair_Display'] font-bold text-white mb-6 leading-tight"
            >
              Crafting Culture,
              <br />
              <span className="text-amber-200">One Tale</span>
              <br />
              at a Time
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-amber-100 mb-8 max-w-lg leading-relaxed"
            >
              Discover authentic Indian crafts and the inspiring stories behind them. 
              Connect directly with master artisans preserving centuries-old traditions.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                href="/shop" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-center whitespace-nowrap cursor-pointer"
              >
                Explore Crafts
              </Link>
              <Link 
                href="/stories" 
                className="border-2 border-white text-white hover:bg-white hover:text-amber-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 text-center whitespace-nowrap cursor-pointer"
              >
                Read Stories
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:flex justify-end hidden"
          >
            <div className="relative">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-72 h-96 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://readdy.ai/api/search-image?query=Beautiful%20Indian%20handicraft%20collection%20display%20with%20colorful%20textiles%20pottery%20and%20traditional%20items%20arranged%20artistically%2C%20warm%20studio%20lighting%2C%20cultural%20heritage%20showcase%2C%20elegant%20presentation&width=400&height=600&seq=hero-craft-001&orientation=portrait"
                  alt="Indian Crafts"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute -bottom-10 -left-10 w-48 h-64 rounded-2xl overflow-hidden shadow-xl"
              >
                <img 
                  src="https://readdy.ai/api/search-image?query=Indian%20artisan%20hands%20working%20on%20traditional%20craft%20with%20intricate%20patterns%2C%20close%20up%20view%2C%20skilled%20craftsmanship%2C%20cultural%20heritage%2C%20warm%20natural%20lighting&width=300&height=400&seq=hero-hands-001&orientation=portrait"
                  alt="Artisan at Work"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-6 flex items-center justify-center text-white cursor-pointer"
        >
          <i className="ri-arrow-down-line text-2xl"></i>
        </motion.div>
      </motion.div>
    </section>
  );
}