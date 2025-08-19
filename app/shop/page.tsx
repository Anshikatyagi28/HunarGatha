
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock product data
const products = [
  {
    slug: 'banarasi-silk-scarf',
    name: 'Banarasi Silk Scarf',
    price: 2199,
    originalPrice: 2999,
    region: 'Uttar Pradesh',
    craft: 'Banarasi Weaving',
    artisan: 'Meera Devi',
    image: 'https://readdy.ai/api/search-image?query=Luxurious%20Banarasi%20silk%20scarf%20with%20golden%20zari%20work%20intricate%20floral%20patterns%20displayed%20elegantly%2C%20traditional%20Indian%20textile%2C%20premium%20craftsmanship%2C%20heritage%20weaving&width=400&height=400&seq=prod-001&orientation=squarish',
    description: 'Handwoven silk scarf with traditional motifs',
    giTag: true,
    rating: 4.8,
    reviews: 142
  },
  {
    slug: 'blue-pottery-vase',
    name: 'Blue Pottery Vase',
    price: 1499,
    originalPrice: null,
    region: 'Rajasthan',
    craft: 'Blue Pottery',
    artisan: 'Ravi Kumar',
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20blue%20pottery%20vase%20with%20traditional%20Rajasthani%20patterns%20white%20and%20blue%20ceramic%20art%20piece%2C%20handcrafted%20pottery%2C%20cultural%20heritage%2C%20elegant%20design&width=400&height=400&seq=prod-002&orientation=squarish',
    description: 'Hand-painted ceramic vase with floral designs',
    giTag: true,
    rating: 4.6,
    reviews: 89
  },
  {
    slug: 'kantha-embroidery-dupatta',
    name: 'Kantha Embroidery Dupatta',
    price: 899,
    originalPrice: 1299,
    region: 'West Bengal',
    craft: 'Kantha Embroidery',
    artisan: 'Sunita Ghosh',
    image: 'https://readdy.ai/api/search-image?query=Bengali%20Kantha%20embroidered%20dupatta%20with%20colorful%20thread%20work%20traditional%20running%20stitch%20patterns%2C%20handcrafted%20textile%2C%20cultural%20heritage%2C%20beautiful%20fabric%20art&width=400&height=400&seq=prod-003&orientation=squarish',
    description: 'Traditional running stitch embroidery on cotton',
    giTag: false,
    rating: 4.7,
    reviews: 67
  },
  {
    slug: 'dhokra-figurine',
    name: 'Dhokra Metal Figurine',
    price: 1799,
    originalPrice: null,
    region: 'West Bengal',
    craft: 'Dhokra Art',
    artisan: 'Amit Das',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Dhokra%20metal%20art%20figurine%20tribal%20dancer%20bronze%20casting%20ancient%20technique%2C%20handcrafted%20metal%20sculpture%2C%20cultural%20heritage%20artifact&width=400&height=400&seq=prod-004&orientation=squarish',
    description: 'Ancient lost-wax casting technique sculpture',
    giTag: true,
    rating: 4.9,
    reviews: 34
  },
  {
    slug: 'ajrakh-block-print-saree',
    name: 'Ajrakh Block Print Saree',
    price: 3499,
    originalPrice: 4499,
    region: 'Gujarat',
    craft: 'Ajrakh Printing',
    artisan: 'Hassan Sheikh',
    image: 'https://readdy.ai/api/search-image?query=Gorgeous%20Ajrakh%20block%20printed%20saree%20with%20indigo%20blue%20red%20geometric%20patterns%20traditional%20Gujarat%20textile%2C%20handcrafted%20fabric%2C%20natural%20dyes%2C%20cultural%20heritage&width=400&height=400&seq=prod-005&orientation=squarish',
    description: 'Natural dyes and traditional block printing',
    giTag: true,
    rating: 4.8,
    reviews: 156
  },
  {
    slug: 'chikankari-kurta',
    name: 'Chikankari Embroidered Kurta',
    price: 1899,
    originalPrice: 2499,
    region: 'Uttar Pradesh',
    craft: 'Chikankari',
    artisan: 'Fatima Khan',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20white%20Chikankari%20embroidered%20kurta%20with%20delicate%20threadwork%20floral%20patterns%2C%20traditional%20Lucknow%20craft%2C%20premium%20cotton%20fabric%2C%20heritage%20fashion&width=400&height=400&seq=prod-006&orientation=squarish',
    description: 'Delicate shadow work embroidery on cotton',
    giTag: true,
    rating: 4.5,
    reviews: 203
  },
  {
    slug: 'madhubani-painting',
    name: 'Madhubani Wall Painting',
    price: 2499,
    originalPrice: null,
    region: 'Bihar',
    craft: 'Madhubani Painting',
    artisan: 'Sita Devi',
    image: 'https://readdy.ai/api/search-image?query=Vibrant%20Madhubani%20painting%20with%20traditional%20motifs%20colorful%20folk%20art%20from%20Bihar%2C%20intricate%20patterns%2C%20cultural%20themes%2C%20handpainted%20artwork%20on%20canvas&width=400&height=400&seq=prod-007&orientation=squarish',
    description: 'Traditional folk art with natural pigments',
    giTag: false,
    rating: 4.7,
    reviews: 45
  },
  {
    slug: 'kashmiri-pashmina-shawl',
    name: 'Kashmiri Pashmina Shawl',
    price: 8999,
    originalPrice: 12999,
    region: 'Kashmir',
    craft: 'Pashmina Weaving',
    artisan: 'Abdul Rahman',
    image: 'https://readdy.ai/api/search-image?query=Luxurious%20Kashmiri%20Pashmina%20shawl%20soft%20wool%20fabric%20with%20traditional%20paisley%20patterns%2C%20premium%20quality%2C%20mountain%20craft%20heritage%2C%20elegant%20textile&width=400&height=400&seq=prod-008&orientation=squarish',
    description: 'Pure pashmina wool with intricate patterns',
    giTag: true,
    rating: 5.0,
    reviews: 78
  },
  {
    slug: 'warli-art-coasters',
    name: 'Warli Art Coaster Set',
    price: 599,
    originalPrice: 799,
    region: 'Maharashtra',
    craft: 'Warli Painting',
    artisan: 'Bhavana Tribal',
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20Warli%20art%20coasters%20set%20with%20tribal%20paintings%20geometric%20patterns%20white%20on%20brown%20background%2C%20traditional%20folk%20art%2C%20functional%20handicraft&width=400&height=400&seq=prod-009&orientation=squarish',
    description: 'Set of 6 coasters with tribal art',
    giTag: false,
    rating: 4.4,
    reviews: 123
  }
];

const regions = ['All', 'Uttar Pradesh', 'Rajasthan', 'West Bengal', 'Gujarat', 'Bihar', 'Kashmir', 'Maharashtra'];
const craftTypes = ['All', 'Banarasi Weaving', 'Blue Pottery', 'Kantha Embroidery', 'Dhokra Art', 'Ajrakh Printing', 'Chikankari', 'Madhubani Painting', 'Pashmina Weaving', 'Warli Painting'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Customer Rating'];

export default function ShopPage() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCraft, setSelectedCraft] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [showGIOnly, setShowGIOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Featured');
  const [viewMode, setViewMode] = useState('grid');

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const matchesRegion = selectedRegion === 'All' || product.region === selectedRegion;
    const matchesCraft = selectedCraft === 'All' || product.craft === selectedCraft;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesGI = !showGIOnly || product.giTag;
    
    return matchesRegion && matchesCraft && matchesPrice && matchesGI;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      case 'Customer Rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-amber-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-white mb-4">
              Craft Collection
            </h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Discover authentic handcrafted products directly from master artisans across India
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-80 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24"
          >
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Filters</h2>
            
            {/* Region Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-amber-800 mb-3">Region</h3>
              <div className="space-y-2">
                {regions.map(region => (
                  <label key={region} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="region"
                      value={region}
                      checked={selectedRegion === region}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-amber-300"
                    />
                    <span className="ml-3 text-amber-700">{region}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Craft Type Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-amber-800 mb-3">Craft Type</h3>
              <div className="space-y-2">
                {craftTypes.slice(0, 6).map(craft => (
                  <label key={craft} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="craft"
                      value={craft}
                      checked={selectedCraft === craft}
                      onChange={(e) => setSelectedCraft(e.target.value)}
                      className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-amber-300"
                    />
                    <span className="ml-3 text-amber-700 text-sm">{craft}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold text-amber-800 mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-amber-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            {/* GI Tag Filter */}
            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showGIOnly}
                  onChange={(e) => setShowGIOnly(e.target.checked)}
                  className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                />
                <span className="ml-3 text-amber-700">GI Tagged Only</span>
              </label>
              <p className="text-xs text-amber-600 mt-1">Geographical Indication certified products</p>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedRegion('All');
                setSelectedCraft('All');
                setPriceRange([0, 15000]);
                setShowGIOnly(false);
              }}
              className="w-full bg-amber-100 text-amber-800 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              Clear All Filters
            </button>
          </motion.div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Header with Sort and View Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-amber-900">
                    {sortedProducts.length} Products Found
                  </h2>
                  <p className="text-amber-600 text-sm">
                    {selectedRegion !== 'All' && `in ${selectedRegion}`}
                    {selectedCraft !== 'All' && ` • ${selectedCraft}`}
                    {showGIOnly && ' • GI Tagged'}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-700 bg-white pr-8"
                  >
                    {sortOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  
                  <div className="flex border border-amber-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`w-10 h-10 flex items-center justify-center ${
                        viewMode === 'grid' ? 'bg-amber-600 text-white' : 'bg-white text-amber-600'
                      } cursor-pointer`}
                    >
                      <i className="ri-grid-line"></i>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`w-10 h-10 flex items-center justify-center ${
                        viewMode === 'list' ? 'bg-amber-600 text-white' : 'bg-white text-amber-600'
                      } cursor-pointer`}
                    >
                      <i className="ri-list-unordered"></i>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`grid ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'grid-cols-1 gap-4'
              }`}
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <Link href={`/product/${product.slug}`}>
                    <div className={`${viewMode === 'list' ? 'w-48 h-48' : 'h-64'} overflow-hidden`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-amber-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        {product.giTag && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            GI
                          </span>
                        )}
                      </div>
                      
                      <p className="text-amber-600 text-sm mb-2">
                        By {product.artisan} • {product.region}
                      </p>
                      
                      <p className="text-amber-700 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex text-amber-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-sm`}></i>
                          ))}
                        </div>
                        <span className="text-xs text-amber-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xl font-bold text-amber-900">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-amber-600 line-through ml-2">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center text-amber-600 group-hover:text-amber-500 transition-colors">
                          <span className="text-sm font-medium">View</span>
                          <i className="ri-arrow-right-line ml-1 group-hover:translate-x-1 transition-transform"></i>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* No Products Found */}
            {sortedProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 flex items-center justify-center bg-amber-100 rounded-full mx-auto mb-6">
                  <i className="ri-search-line text-3xl text-amber-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-amber-900 mb-4">No Products Found</h3>
                <p className="text-amber-600 mb-6">Try adjusting your filters to see more results</p>
                <button
                  onClick={() => {
                    setSelectedRegion('All');
                    setSelectedCraft('All');
                    setPriceRange([0, 15000]);
                    setShowGIOnly(false);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
