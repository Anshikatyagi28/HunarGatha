'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const regions = [
  {
    name: 'Rajasthan',
    crafts: ['Blue Pottery', 'Block Printing', 'Miniature Painting'],
    image: 'https://readdy.ai/api/search-image?query=Rajasthan%20traditional%20blue%20pottery%20and%20block%20printed%20textiles%20displayed%20in%20royal%20palace%20courtyard%2C%20desert%20landscape%2C%20vibrant%20colors%2C%20cultural%20heritage%2C%20majestic%20architecture&width=400&height=300&seq=raj-001&orientation=landscape',
    craftCount: 12
  },
  {
    name: 'Gujarat',
    crafts: ['Ajrakh Printing', 'Bandhani', 'Kutch Embroidery'],
    image: 'https://readdy.ai/api/search-image?query=Gujarat%20Ajrakh%20block%20printing%20workshop%20with%20artisan%20working%20on%20traditional%20patterns%2C%20natural%20indigo%20dyes%2C%20wooden%20blocks%2C%20desert%20crafts%20heritage%2C%20authentic%20setting&width=400&height=300&seq=guj-001&orientation=landscape',
    craftCount: 8
  },
  {
    name: 'West Bengal',
    crafts: ['Kantha Embroidery', 'Terracotta', 'Handloom'],
    image: 'https://readdy.ai/api/search-image?query=Bengali%20woman%20creating%20beautiful%20Kantha%20embroidery%20on%20colorful%20fabric%2C%20traditional%20rural%20setting%2C%20handloom%20textiles%2C%20cultural%20heritage%2C%20artistic%20craftsmanship&width=400&height=300&seq=wb-001&orientation=landscape',
    craftCount: 15
  },
  {
    name: 'Uttar Pradesh',
    crafts: ['Banarasi Silk', 'Chikankari', 'Zardozi'],
    image: 'https://readdy.ai/api/search-image?query=Varanasi%20Banarasi%20silk%20weaving%20loom%20with%20golden%20threads%20creating%20intricate%20patterns%2C%20traditional%20workshop%2C%20master%20weaver%2C%20cultural%20heritage%2C%20artistic%20excellence&width=400&height=300&seq=up-001&orientation=landscape',
    craftCount: 18
  },
  {
    name: 'Odisha',
    crafts: ['Pattachitra', 'Silver Filigree', 'Sambalpuri'],
    image: 'https://readdy.ai/api/search-image?query=Odisha%20Pattachitra%20painting%20being%20created%20by%20skilled%20artist%20with%20traditional%20motifs%2C%20vibrant%20colors%2C%20cultural%20themes%2C%20heritage%20art%20form%2C%20temple%20setting&width=400&height=300&seq=od-001&orientation=landscape',
    craftCount: 10
  },
  {
    name: 'Kashmir',
    crafts: ['Pashmina', 'Papier Mache', 'Carpet Weaving'],
    image: 'https://readdy.ai/api/search-image?query=Kashmir%20valley%20artisan%20weaving%20beautiful%20Pashmina%20shawl%20on%20traditional%20loom%2C%20snow%20mountains%20background%2C%20peaceful%20setting%2C%20luxury%20craftsmanship%2C%20natural%20beauty&width=400&height=300&seq=kas-001&orientation=landscape',
    craftCount: 7
  }
];

export default function RegionsGrid() {
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
            Crafts Across India
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Journey through India's diverse regions and discover the unique craft traditions 
            that have flourished for centuries in each corner of our incredible country.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <Link href={`/regions/${region.name.toLowerCase()}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={region.image}
                      alt={`${region.name} crafts`}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-sm font-medium bg-amber-600 px-3 py-1 rounded-full">
                        {region.craftCount} Crafts
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-amber-900 mb-3 group-hover:text-amber-700 transition-colors">
                      {region.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {region.crafts.slice(0, 2).map((craft, idx) => (
                        <span key={idx} className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                          {craft}
                        </span>
                      ))}
                      {region.crafts.length > 2 && (
                        <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                          +{region.crafts.length - 2} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-amber-700 group-hover:text-amber-600 transition-colors">
                      <span className="font-medium">Explore Region</span>
                      <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}