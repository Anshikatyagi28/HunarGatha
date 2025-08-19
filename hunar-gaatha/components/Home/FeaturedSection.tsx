'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const featuredProduct = {
  name: "Banarasi Silk Scarf",
  price: 2199,
  originalPrice: 2999,
  region: "Varanasi",
  artisan: "Meera Devi",
  image: "https://readdy.ai/api/search-image?query=Exquisite%20Banarasi%20silk%20scarf%20with%20golden%20zari%20work%20intricate%20patterns%20displayed%20elegantly%20on%20silk%20fabric%2C%20luxury%20textile%2C%20traditional%20craftsmanship%2C%20heritage%20weaving&width=600&height=400&seq=fea-prod-001&orientation=landscape",
  rating: 4.8,
  reviews: 142
};

const featuredStory = {
  title: "Weaving Legacy: Meera Devi's Journey",
  excerpt: "From the ancient lanes of Varanasi to global recognition, discover how Meera Devi transformed her family's weaving tradition into a thriving craft legacy.",
  readTime: "8 min read",
  image: "https://readdy.ai/api/search-image?query=Portrait%20of%20skilled%20Indian%20woman%20artisan%20Meera%20Devi%20working%20on%20traditional%20handloom%20weaving%20Banarasi%20silk%2C%20warm%20lighting%2C%20cultural%20heritage%2C%20master%20craftswoman%2C%20inspiring%20story&width=500&height=600&seq=fea-story-001&orientation=portrait",
  tag: "Artisan Story"
};

export default function FeaturedSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
            Featured This Week
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Discover our handpicked craft and the inspiring story behind it. 
            Each piece connects you to a master artisan and their timeless tradition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Featured Product */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center mb-4">
                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured Product
                </span>
                <span className="ml-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  GI Tagged
                </span>
              </div>
              
              <div className="mb-6">
                <img 
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-64 object-cover object-top rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-amber-900 mb-2">
                  {featuredProduct.name}
                </h3>
                <p className="text-amber-700 mb-2">
                  By <span className="font-medium">{featuredProduct.artisan}</span> • {featuredProduct.region}
                </p>
                <div className="flex items-center mb-3">
                  <div className="flex text-amber-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`ri-star-${i < Math.floor(featuredProduct.rating) ? 'fill' : 'line'} text-sm`}></i>
                    ))}
                  </div>
                  <span className="text-sm text-amber-600">
                    {featuredProduct.rating} ({featuredProduct.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center mb-6">
                  <span className="text-3xl font-bold text-amber-900">₹{featuredProduct.price}</span>
                  <span className="text-lg text-amber-600 line-through ml-3">₹{featuredProduct.originalPrice}</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium ml-3">
                    {Math.round(((featuredProduct.originalPrice - featuredProduct.price) / featuredProduct.originalPrice) * 100)}% OFF
                  </span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link 
                  href={`/product/banarasi-silk-scarf`}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 text-center whitespace-nowrap cursor-pointer"
                >
                  View Product
                </Link>
                <button className="w-12 h-12 flex items-center justify-center border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white rounded-full transition-colors cursor-pointer">
                  <i className="ri-heart-line text-xl"></i>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Featured Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <Link href="/stories/meera-devi-journey" className="block group cursor-pointer">
              <div className="relative">
                <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl mb-6">
                  <img 
                    src={featuredStory.image}
                    alt={featuredStory.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {featuredStory.tag}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-3xl font-['Playfair_Display'] font-bold text-amber-900 mb-4 group-hover:text-amber-700 transition-colors">
                    {featuredStory.title}
                  </h3>
                  <p className="text-amber-700 text-lg leading-relaxed mb-4 line-clamp-3">
                    {featuredStory.excerpt}
                  </p>
                  <div className="flex items-center text-amber-600">
                    <i className="ri-time-line mr-2"></i>
                    <span className="mr-6">{featuredStory.readTime}</span>
                    <span className="font-medium group-hover:text-amber-500 transition-colors">Read Story</span>
                    <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}