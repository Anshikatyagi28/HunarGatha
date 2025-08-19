'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Indian%20craft%20fair%20marketplace%20with%20colorful%20textiles%20pottery%20handicrafts%20displayed%20in%20traditional%20stalls%2C%20vibrant%20atmosphere%2C%20cultural%20celebration%2C%20artisan%20community%20gathering&width=1920&height=800&seq=cta-bg-001&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/50 to-amber-800/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Shop CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <div className="w-20 h-20 flex items-center justify-center bg-amber-600 rounded-full mx-auto mb-6">
              <i className="ri-shopping-bag-line text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Shop Authentic Crafts</h3>
            <p className="text-amber-100 mb-6 leading-relaxed">
              Discover handpicked products directly from master artisans. Each purchase supports traditional craft communities.
            </p>
            <Link 
              href="/shop"
              className="inline-block bg-white text-amber-900 hover:bg-amber-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              Explore Collection
            </Link>
          </motion.div>

          {/* Stories CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <div className="w-20 h-20 flex items-center justify-center bg-amber-600 rounded-full mx-auto mb-6">
              <i className="ri-book-open-line text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Read Inspiring Stories</h3>
            <p className="text-amber-100 mb-6 leading-relaxed">
              Journey through the lives of artisans who preserve centuries-old traditions with passion and dedication.
            </p>
            <Link 
              href="/stories"
              className="inline-block bg-white text-amber-900 hover:bg-amber-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              Read Stories
            </Link>
          </motion.div>

          {/* Subscribe CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <div className="w-20 h-20 flex items-center justify-center bg-amber-600 rounded-full mx-auto mb-6">
              <i className="ri-mail-line text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Stay Connected</h3>
            <p className="text-amber-100 mb-6 leading-relaxed">
              Get weekly craft stories, new product launches, and exclusive access to artisan collections.
            </p>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-full text-amber-900 placeholder-amber-600 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer">
                Subscribe Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full hidden lg:block"
      ></motion.div>
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full hidden lg:block"
      ></motion.div>
    </section>
  );
}