'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const founders = [
  {
    name: "Arjun Sharma",
    role: "Co-Founder & CEO",
    image: "https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20Indian%20entrepreneur%20Arjun%20Sharma%2C%20confident%20business%20leader%2C%20modern%20office%20setting%2C%20cultural%20heritage%20advocate%2C%20inspiring%20personality&width=400&height=500&seq=founder-001&orientation=portrait",
    background: "Former tech executive with 15 years in e-commerce, he brings a modern vision to an ancient craft, ensuring sustainability and global reach."
  },
  {
    name: "Priya Nair",
    role: "Co-Founder & Creative Director",
    image: "https://readdy.ai/api/search-image?query=Portrait%20of%20creative%20director%20Priya%20Nair%2C%20artistic%20Indian%20woman%2C%20cultural%20preservation%20expert%2C%20warm%20and%20inspiring%20personality%2C%20professional%20headshot&width=400&height=500&seq=founder-002&orientation=portrait",
    background: "An acclaimed art historian, she has spent years documenting and living with artisans, becoming the heart and soul of Hunargatha's curation."
  }
];

const values = [
  {
    icon: "ri-hand-heart-line",
    title: "Artisan First",
    description: "We partner directly with artisans, ensuring fair wages, creative freedom, and the preservation of their cultural heritage."
  },
  {
    icon: "ri-sparkling-2-line",
    title: "Authentic Craftsmanship",
    description: "Every piece tells a story of tradition, skill, and passion. We celebrate the genuine artistry in every single creation."
  },
  {
    icon: "ri-seedling-line",
    title: "Conscious Commerce",
    description: "From sustainable sourcing to eco-friendly packaging, we are committed to ethical and responsible practices at every step."
  },
  {
    icon: "ri-global-line",
    title: "Connecting Cultures",
    description: "Our mission is to build a global bridge, bringing the beauty of India's traditional crafts to homes around the world."
  }
];

export default function AboutPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Add the CDN link for remixicon */}
      <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />

      {/* Hero Section with Story */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {isClient && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
                Our Story: Hunargatha
              </h1>
              <p className="text-xl md:text-2xl text-amber-700 max-w-4xl mx-auto leading-relaxed">
                Hunar Gatha, which means 'The Story of Artistry', was born from a simple belief: that every handmade creation is a piece of living history. Our journey began with a passion for preserving India's rich craft heritage, one beautiful story at a time.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {isClient && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://readdy.ai/api/search-image?query=Indian%20master%20artisan%20working%20on%20traditional%20craft%20with%20focused%20concentration%2C%20hands%20creating%20beautiful%20pottery%2C%20cultural%20heritage%2C%20skilled%20craftsmanship%2C%20warm%20natural%20lighting&width=600&height=700&seq=about-mission-001&orientation=portrait"
                  alt="Artisan at work"
                  className="w-full rounded-3xl shadow-2xl"
                  onError={(e) => { e.target.src = 'https://placehold.co/600x700/FFF7ED/D97706?text=Artisan+at+work' }}
                />
              </motion.div>
            )}

            {isClient && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
                  Our Purpose
                </h2>
                <p className="text-xl text-amber-700 leading-relaxed mb-6">
                  Our purpose is to bridge the gap between India's master artisans and a global community that values authentic craftsmanship. We believe in the power of a fair marketplace to preserve traditions and empower creators.
                </p>
                <p className="text-lg text-amber-600 leading-relaxed mb-8">
                  We don't just sell products; we are a platform for stories. Each item you find here carries the legacy of its maker—a story of family, skill, and cultural identity.
                </p>
                <div className="flex items-center text-amber-700">
                  <span className="font-medium text-lg">Discover artisan stories</span>
                  <Link href="/stories" className="ml-2 w-8 h-8 flex items-center justify-center text-amber-600 hover:text-amber-500 transition-colors cursor-pointer">
                    <i className="ri-arrow-right-line text-xl"></i>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isClient && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                These principles guide every decision we make, from selecting our partners to connecting with our customers.
              </p>
            </motion.div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-amber-100 rounded-full mx-auto mb-6">
                  <i className={`${value.icon} text-2xl text-amber-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isClient && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
                Meet the Storytellers
              </h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Our mission is led by two passionate founders who believe in the power of preserving culture through commerce.
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mb-6">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-64 h-80 object-cover rounded-3xl shadow-xl mx-auto"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x500/FFF7ED/D97706?text=' + encodeURIComponent(founder.name) }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">
                  {founder.name}
                </h3>
                <p className="text-amber-600 font-medium mb-4">
                  {founder.role}
                </p>
                <p className="text-amber-700 leading-relaxed max-w-md mx-auto">
                  {founder.background}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {isClient && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
                Join Our Story
              </h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto mb-12">
                Every purchase you make helps sustain an artisan's livelihood and preserves a centuries-old tradition. Thank you for being a part of our journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/shop" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer">
                  Explore Handcrafted Goods
                </Link>
                <Link href="/stories" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer">
                  Read Artisan Stories
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
