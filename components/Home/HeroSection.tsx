'use client';

import { useState, useEffect, SetStateAction } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const heroSlides = [
  {
    id: 1,
    image: 'https://readdy.ai/api/search-image?query=Traditional%20artisan%20creating%20exquisite%20itar%20perfumes%20in%20Kannauj%2C%20golden%20bottles%20and%20flowers%2C%20warm%20lighting%2C%20authentic%20Indian%20craftsmanship%2C%20peaceful%20workshop%20setting%20with%20traditional%20tools%20and%20aromatic%20herbs%2C%20elegant%20composition%20showcasing%20heritage%20perfume%20making&width=1200&height=600&seq=kannauj-itar&orientation=landscape',
    title: "Kannauj's Golden Itar",
    subtitle: 'Where fragrances tell ancient stories',
    district: 'Kannauj',
    artisan: 'Rafiq Ahmed',
    description:
      'Authentic handcrafted itar perfumes made using centuries-old distillation methods from the fragrance capital of India.'
  },
  {
    id: 2,
    image: 'https://readdy.ai/api/search-image?query=Skilled%20artisan%20embroidering%20intricate%20Chikankari%20patterns%20on%20white%20fabric%20in%20Lucknow%2C%20delicate%20needlework%2C%20soft%20natural%20lighting%2C%20traditional%20Indian%20embroidery%20workshop%2C%20elegant%20white%20threads%20and%20patterns%2C%20heritage%20craftsmanship%20showcase&width=1200&height=600&seq=lucknow-chikankari&orientation=landscape',
    title: "Lucknow's Delicate Chikankari",
    subtitle: 'Threads of elegance, woven with love',
    district: 'Lucknow',
    artisan: 'Shabnam Begum',
    description:
      'Every stitch tells a story — delicate embroidery passed down through generations in the heart of Lucknow.'
  },
  {
    id: 3,
    image: 'https://readdy.ai/api/search-image?query=Master%20craftsman%20creating%20premium%20leather%20goods%20in%20Kanpur%20workshop%2C%20rich%20brown%20leather%2C%20traditional%20tools%2C%20warm%20amber%20lighting%2C%20authentic%20Indian%20leather%20craftsmanship%2C%20organized%20workspace%20with%20quality%20materials%20and%20finished%20products&width=1200&height=600&seq=kanpur-leather&orientation=landscape',
    title: "Kanpur's Finest Leather",
    subtitle: 'Crafted with generations of expertise',
    district: 'Kanpur',
    artisan: 'Vijay Sharma',
    description:
      'Premium leather goods hand-tooled by Kanpur’s master craftsmen, blending tradition with timeless style.'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 5) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: SetStateAction<number>) => setCurrentSlide(index);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      
         {/* popimage */}

                 <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:flex justify-end  "
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

      <AnimatePresence mode="wait">
        
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-top"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>
          {/* brown type effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/50 via-amber-800/60 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <motion.div
                  key={`meta-${currentSlide}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-3 text-[#D6A400] mb-4"
                >
                  <FaMapMarkerAlt className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {heroSlides[currentSlide].district} Heritage
                  </span>
                  <FaStar className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">
                    Artisan: {heroSlides[currentSlide].artisan}
                  </span>
                </motion.div>

                <motion.h1
                  key={`title-${currentSlide}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>

                <motion.p
                  key={`subtitle-${currentSlide}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-2xl text-[#D6A400] mb-4 font-medium"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>

                <motion.p
                  key={`desc-${currentSlide}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-gray-200 mb-8 max-w-2xl"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>


                {/* Buttons stay static, no re-animation */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/shop"
                    className="bg-amber-900/50 border-white border-[1px] hover:bg-amber-400/50 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-center whitespace-nowrap cursor-pointer"
                  >
                    Explore Crafts
                  </Link>
                  <Link
                    href="/artisans"
                    className="inline-flex items-center justify-center px-8 py-2 border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-[#B66E41] transition-colors"
                  >
                    Read Stories
                  </Link>
                </div>
              </div>
            </div>
          </div>

          
        </motion.div>
      </AnimatePresence>

      

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[#D6A400] scale-125' : 'bg-white/50'
              }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)
        }
        className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors z-20"
      >
        <FaArrowLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors z-20"
      >
        <FaArrowRight className="w-5 h-5" />
      </button>
    </section>
  );
}
