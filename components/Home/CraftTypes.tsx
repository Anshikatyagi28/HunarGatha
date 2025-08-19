'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const craftTypes = [
  {
    name: 'Textiles',
    description: 'Handwoven fabrics, embroidery, and traditional clothing',
    icon: 'ri-shirt-line',
    image: 'https://readdy.ai/api/search-image?query=Colorful%20Indian%20textile%20collection%20with%20handwoven%20fabrics%20silk%20scarves%20embroidered%20dupatta%20displayed%20elegantly%2C%20traditional%20patterns%2C%20vibrant%20colors%2C%20cultural%20heritage%20showcase&width=300&height=300&seq=tex-001&orientation=squarish',
    count: 45,
    color: 'from-rose-500 to-pink-600'
  },
  {
    name: 'Pottery',
    description: 'Clay vessels, decorative items, and ceramic art',
    icon: 'ri-cup-line',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Indian%20pottery%20collection%20blue%20pottery%20vases%20terracotta%20pots%20ceramic%20art%20pieces%20arranged%20beautifully%2C%20earthy%20colors%2C%20artisan%20craftsmanship%2C%20cultural%20heritage&width=300&height=300&seq=pot-001&orientation=squarish',
    count: 23,
    color: 'from-amber-500 to-orange-600'
  },
  {
    name: 'Metal Craft',
    description: 'Brass work, silver jewelry, and decorative items',
    icon: 'ri-medal-line',
    image: 'https://readdy.ai/api/search-image?query=Exquisite%20Indian%20metal%20crafts%20brass%20figurines%20silver%20jewelry%20dhokra%20art%20pieces%20displayed%20on%20silk%20cloth%2C%20golden%20lighting%2C%20traditional%20craftsmanship%2C%20heritage%20collection&width=300&height=300&seq=met-001&orientation=squarish',
    count: 18,
    color: 'from-yellow-500 to-amber-600'
  },
  {
    name: 'Wood Craft',
    description: 'Carved sculptures, furniture, and decorative pieces',
    icon: 'ri-building-2-line',
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20Indian%20wood%20crafts%20carved%20sculptures%20decorative%20items%20sandalwood%20artifacts%20displayed%20in%20traditional%20setting%2C%20intricate%20patterns%2C%20master%20craftsmanship%2C%20cultural%20heritage&width=300&height=300&seq=wod-001&orientation=squarish',
    count: 31,
    color: 'from-green-500 to-emerald-600'
  },
  {
    name: 'Paintings',
    description: 'Folk art, miniature paintings, and traditional artwork',
    icon: 'ri-palette-line',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Indian%20paintings%20Madhubani%20Warli%20folk%20art%20miniature%20paintings%20displayed%20in%20art%20gallery%2C%20vibrant%20colors%2C%20cultural%20themes%2C%20artistic%20heritage%20showcase&width=300&height=300&seq=pai-001&orientation=squarish',
    count: 27,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Jewelry',
    description: 'Traditional ornaments, precious stones, and accessories',
    icon: 'ri-gem-line',
    image: 'https://readdy.ai/api/search-image?query=Stunning%20Indian%20traditional%20jewelry%20collection%20kundan%20meenakari%20silver%20ornaments%20gemstone%20accessories%20displayed%20elegantly%2C%20golden%20backdrop%2C%20luxury%20craftsmanship%2C%20heritage%20designs&width=300&height=300&seq=jew-001&orientation=squarish',
    count: 39,
    color: 'from-purple-500 to-violet-600'
  }
];

export default function CraftTypes() {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
            Explore Craft Categories
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            From intricate textiles to stunning metalwork, discover the diverse range of 
            traditional crafts that showcase India's rich artistic heritage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {craftTypes.map((craft, index) => (
            <motion.div
              key={craft.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Link href={`/crafts?category=${craft.name.toLowerCase()}`}>
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={craft.image}
                      alt={craft.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${craft.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${craft.color} text-white mr-4`}>
                        <i className={`${craft.icon} text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors">
                          {craft.name}
                        </h3>
                        <span className="text-sm text-amber-600 font-medium">
                          {craft.count} Products
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-amber-700 mb-4 line-clamp-2">
                      {craft.description}
                    </p>
                    
                    <div className="flex items-center text-amber-600 group-hover:text-amber-500 transition-colors">
                      <span className="font-medium">View Collection</span>
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