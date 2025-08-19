
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../../components/section/Navbar';
import Footer from '../../../components/section/Footer';

const regions = {
  rajasthan: {
    name: "Rajasthan",
    tagline: "The Land of Kings and Crafts",
    heroImage: "https://readdy.ai/api/search-image?query=Magnificent%20Rajasthan%20palace%20with%20traditional%20blue%20pottery%20and%20block%20printed%20textiles%20in%20foreground%2C%20desert%20landscape%2C%20royal%20architecture%2C%20vibrant%20crafts%20heritage%2C%20golden%20hour%20lighting&width=1400&height=700&seq=raj-hero-001&orientation=landscape",
    description: "Rajasthan, the land of maharajas and majestic forts, is equally renowned for its vibrant craft traditions. From the intricate blue pottery of Jaipur to the bold block prints of Bagru, every craft tells a story of royal patronage and artistic excellence that has been passed down through generations.",
    history: "The craft traditions of Rajasthan flourished under royal patronage, with each princely state developing its distinctive style. The desert state's artisans learned to create beauty from scarcity, using local materials like camel bone, desert sand, and native plants to create masterpieces that adorned palaces and homes alike.",
    culturalHighlights: [
      {
        title: "Royal Heritage",
        description: "Crafts that once adorned the palaces of maharajas"
      },
      {
        title: "Desert Innovation",
        description: "Sustainable techniques adapted to arid landscapes"
      },
      {
        title: "Vibrant Colors",
        description: "Bold hues inspired by desert sunsets and royal traditions"
      }
    ],
    crafts: [
      {
        name: "Blue Pottery",
        description: "Distinctive glazed pottery with cobalt blue patterns",
        image: "https://readdy.ai/api/search-image?query=Beautiful%20Rajasthani%20blue%20pottery%20bowls%20plates%20with%20intricate%20cobalt%20blue%20floral%20patterns%2C%20traditional%20ceramic%20craft%2C%20artistic%20glazed%20finish%2C%20heritage%20pottery&width=400&height=300&seq=raj-blue-001&orientation=landscape",
        artisans: ["Kripal Singh Shekhawat", "Sunita Devi"],
        history: "Introduced by Mongol artisans, perfected in Jaipur"
      },
      {
        name: "Block Printing",
        description: "Hand-carved wooden blocks creating intricate textile patterns",
        image: "https://readdy.ai/api/search-image?query=Traditional%20Rajasthani%20block%20printing%20workshop%20with%20artisan%20using%20wooden%20blocks%20on%20fabric%2C%20natural%20dyes%2C%20intricate%20patterns%2C%20heritage%20textile%20craft&width=400&height=300&seq=raj-block-001&orientation=landscape",
        artisans: ["Mohammed Yusuf", "Raman Chhipa"],
        history: "Ancient technique dating back over 1000 years"
      },
      {
        name: "Miniature Painting",
        description: "Detailed paintings depicting royal courts and mythology",
        image: "https://readdy.ai/api/search-image?query=Exquisite%20Rajasthani%20miniature%20painting%20being%20created%20by%20master%20artist%2C%20detailed%20brushwork%2C%20royal%20court%20scenes%2C%20traditional%20Indian%20art%2C%20fine%20artistic%20details&width=400&height=300&seq=raj-mini-001&orientation=landscape",
        artisans: ["Shanti Lal", "Nandlal Sharma"],
        history: "Flourished under Mughal and Rajput patronage"
      }
    ],
    featuredProducts: [
      {
        name: "Blue Pottery Serving Set",
        price: 3499,
        image: "https://readdy.ai/api/search-image?query=Elegant%20blue%20pottery%20serving%20set%20with%20traditional%20cobalt%20patterns%2C%20ceramic%20bowls%20and%20plates%2C%20luxury%20dining%20collection&width=300&height=300&seq=raj-prod-001&orientation=squarish"
      },
      {
        name: "Block Print Cotton Dupatta",
        price: 1299,
        image: "https://readdy.ai/api/search-image?query=Beautiful%20cotton%20dupatta%20with%20traditional%20Rajasthani%20block%20print%20patterns%2C%20vibrant%20colors%2C%20handwoven%20textile%20art&width=300&height=300&seq=raj-prod-002&orientation=squarish"
      },
      {
        name: "Miniature Painting - Royal Court",
        price: 8999,
        image: "https://readdy.ai/api/search-image?query=Framed%20Rajasthani%20miniature%20painting%20showing%20royal%20court%20scene%2C%20detailed%20artwork%2C%20traditional%20Indian%20painting%20style&width=300&height=300&seq=raj-prod-003&orientation=squarish"
      }
    ],
    stats: {
      artisans: 25000,
      crafts: 12,
      cities: 8
    }
  },
  gujarat: {
    name: "Gujarat",
    tagline: "Colors of Commerce and Craft",
    heroImage: "https://readdy.ai/api/search-image?query=Gujarat%20Ajrakh%20block%20printing%20workshop%20with%20artisan%20working%20on%20indigo%20dyed%20fabric%2C%20traditional%20wooden%20blocks%2C%20desert%20craft%20heritage%2C%20authentic%20cultural%20setting&width=1400&height=700&seq=guj-hero-001&orientation=landscape",
    description: "Gujarat, the entrepreneurial heart of India, has nurtured craft traditions that blend commercial acumen with artistic excellence. From the geometric precision of Ajrakh prints to the mirror work embroidery of Kutch, Gujarat's crafts reflect the state's spirit of innovation and trade.",
    history: "As a major trading hub along ancient silk routes, Gujarat's crafts developed to serve both local needs and international markets. The state's artisans became master traders, spreading their techniques across continents while continuously innovating their traditional crafts.",
    culturalHighlights: [
      {
        title: "Trade Heritage",
        description: "Crafts shaped by centuries of international commerce"
      },
      {
        title: "Geometric Patterns",
        description: "Mathematical precision in traditional designs"
      },
      {
        title: "Natural Dyes",
        description: "Sustainable coloring techniques using local plants"
      }
    ],
    crafts: [
      {
        name: "Ajrakh Printing",
        description: "Complex geometric patterns using natural indigo dyes",
        image: "https://readdy.ai/api/search-image?query=Traditional%20Ajrakh%20block%20printing%20process%20with%20intricate%20geometric%20patterns%20on%20indigo%20fabric%2C%20natural%20dyes%2C%20master%20craftsman%20at%20work&width=400&height=300&seq=guj-ajrakh-001&orientation=landscape",
        artisans: ["Sufiyan Khatri", "Abdul Jabbar"],
        history: "Ancient technique with roots in Indus Valley civilization"
      },
      {
        name: "Bandhani",
        description: "Tie-dye technique creating beautiful dotted patterns",
        image: "https://readdy.ai/api/search-image?query=Colorful%20Bandhani%20tie-dye%20textiles%20being%20prepared%20by%20skilled%20artisan%2C%20vibrant%20patterns%2C%20traditional%20Gujarat%20craft%20technique&width=400&height=300&seq=guj-bandh-001&orientation=landscape",
        artisans: ["Champa Ben", "Kiran Vanzara"],
        history: "5000-year-old technique mentioned in ancient texts"
      },
      {
        name: "Kutch Embroidery",
        description: "Mirror work and intricate stitching from the Rann of Kutch",
        image: "https://readdy.ai/api/search-image?query=Beautiful%20Kutch%20embroidery%20with%20mirror%20work%20being%20created%20by%20village%20woman%2C%20colorful%20threads%2C%20traditional%20needlework%2C%20cultural%20heritage&width=400&height=300&seq=guj-kutch-001&orientation=landscape",
        artisans: ["Meera Vankar", "Shital Dhanani"],
        history: "Desert community craft reflecting nomadic lifestyles"
      }
    ],
    featuredProducts: [
      {
        name: "Ajrakh Print Stole",
        price: 2199,
        image: "https://readdy.ai/api/search-image?query=Elegant%20Ajrakh%20printed%20stole%20with%20traditional%20geometric%20patterns%2C%20indigo%20blue%20fabric%2C%20luxury%20accessory&width=300&height=300&seq=guj-prod-001&orientation=squarish"
      },
      {
        name: "Bandhani Silk Saree",
        price: 4999,
        image: "https://readdy.ai/api/search-image?query=Beautiful%20Bandhani%20silk%20saree%20with%20colorful%20tie-dye%20patterns%2C%20traditional%20Indian%20garment%2C%20vibrant%20textile%20art&width=300&height=300&seq=guj-prod-002&orientation=squarish"
      },
      {
        name: "Kutch Mirror Work Bag",
        price: 1799,
        image: "https://readdy.ai/api/search-image?query=Handcrafted%20bag%20with%20Kutch%20mirror%20work%20embroidery%2C%20colorful%20stitching%2C%20traditional%20Gujarat%20accessory&width=300&height=300&seq=guj-prod-003&orientation=squarish"
      }
    ],
    stats: {
      artisans: 18000,
      crafts: 8,
      cities: 6
    }
  }
};

export default function RegionDetail({ regionName }: { regionName: string }) {
  const region = regions[regionName as keyof typeof regions];

  if (!region) {
    return <div>Region not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative h-96 lg:h-[500px]"
        style={{
          backgroundImage: `url('${region.heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-amber-900/70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-['Playfair_Display'] font-bold mb-4">
                {region.name}
              </h1>
              <p className="text-2xl text-amber-100">
                {region.tagline}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Region Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <h2 className="text-4xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
                Craft Heritage
              </h2>
              <p className="text-xl text-amber-700 leading-relaxed mb-6">
                {region.description}
              </p>
              <p className="text-lg text-amber-600 leading-relaxed">
                {region.history}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-amber-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-amber-900 mb-6">
                Quick Facts
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-1">
                    {region.stats.artisans.toLocaleString()}+
                  </div>
                  <div className="text-amber-700">Active Artisans</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-1">
                    {region.stats.crafts}
                  </div>
                  <div className="text-amber-700">Craft Traditions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-1">
                    {region.stats.cities}
                  </div>
                  <div className="text-amber-700">Major Craft Cities</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cultural Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {region.culturalHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-amber-900 mb-3">
                  {highlight.title}
                </h3>
                <p className="text-amber-700">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Crafts */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
              Signature Crafts
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Discover the unique craft traditions that have made {region.name} famous 
              across India and around the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {region.crafts.map((craft, index) => (
              <motion.div
                key={craft.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48">
                  <img 
                    src={craft.image}
                    alt={craft.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-amber-900 mb-3">
                    {craft.name}
                  </h3>
                  <p className="text-amber-700 mb-4 leading-relaxed">
                    {craft.description}
                  </p>
                  <p className="text-sm text-amber-600 mb-4">
                    {craft.history}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {craft.artisans.map((artisan, idx) => (
                      <span key={idx} className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                        {artisan}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
              Shop {region.name} Crafts
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Bring home authentic pieces that carry the essence of {region.name}'s 
              rich craft heritage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {region.featuredProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
              >
                <Link href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="h-64">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-amber-600">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Link 
              href="/shop"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Explore All Products
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
