'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className=" relative bottom-0 bg-green-900 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-3xl font-['Pacifico'] text-amber-100">Hunar Gaatha</span>
            </Link>
            <p className="text-amber-200 mb-4 max-w-md">
              Celebrating India's rich craft heritage through authentic products and storytelling. 
              Connecting artisans with the world, one craft at a time.
            </p>
            <div className="flex space-x-4">
              <button className="w-8 h-8 flex items-center justify-center text-amber-200 hover:text-white transition-colors cursor-pointer">
                <i className="ri-facebook-fill text-xl"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-amber-200 hover:text-white transition-colors cursor-pointer">
                <i className="ri-instagram-line text-xl"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-amber-200 hover:text-white transition-colors cursor-pointer">
                <i className="ri-twitter-x-line text-xl"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-amber-200 hover:text-white transition-colors cursor-pointer">
                <i className="ri-youtube-line text-xl"></i>
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-amber-100">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/shop" className="block text-amber-200 hover:text-white transition-colors">Shop</Link>
              <Link href="/crafts" className="block text-amber-200 hover:text-white transition-colors">Crafts</Link>
              <Link href="/stories" className="block text-amber-200 hover:text-white transition-colors">Stories</Link>
              <Link href="/artisans" className="block text-amber-200 hover:text-white transition-colors">Artisans</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-amber-100">Support</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-amber-200 hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="block text-amber-200 hover:text-white transition-colors">Contact</Link>
              <Link href="/shipping" className="block text-amber-200 hover:text-white transition-colors">Shipping</Link>
              <Link href="/returns" className="block text-amber-200 hover:text-white transition-colors">Returns</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-amber-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-amber-200 text-sm">
            © 2024 Hunar Gaatha. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-amber-200 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-amber-200 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}