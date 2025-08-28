
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
// import data from '@/data/products.json'
import ProductModal from '@/components/Home/ProductModal';

const regions = [
  'All',
  'Uttar Pradesh',
  'Rajasthan',
  'West Bengal',
  'Gujarat',
  'Bihar',
  'Kashmir',
  'Maharashtra'
];
const craftTypes = [
  'All',
  'Banarasi Weaving',
  'Blue Pottery',
  'Kantha Embroidery',
  'Dhokra Art',
  'Ajrakh Printing',
  'Chikankari',
  'Madhubani Painting',
  'Pashmina Weaving',
  'Warli Painting'
];
const sortOptions = [
  'Featured',
  'Price: Low to High',
  'Price: High to Low',
  'Customer Rating'
];

export default function ShopPage() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCraft, setSelectedCraft] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [showGIOnly, setShowGIOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Featured');
  const [viewMode, setViewMode] = useState<'2' | '3' | '4' | 'list'>('2');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  // Load products from JSON file
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        console.log(data);
      });
  }, []);

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Apply filters
  const filteredProducts = products.filter((product) => {
    const matchesRegion =
      selectedRegion === 'All' || product.region === selectedRegion;
    const matchesCraft =
      selectedCraft === 'All' || product.craft === selectedCraft;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesGI = !showGIOnly || product.giTag;

    return matchesRegion && matchesCraft && matchesPrice && matchesGI;
  });

  // Apply sorting
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
      <section
        className="relative bg-cover bg-center bg-no-repeat py-16"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1679868095924-f7f354ad2862?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFuZGNyYWZ0fGVufDB8fDB8fHww')",
        }}
      >
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-amber-600/70"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-white mb-4 drop-shadow-lg">
              Craft Collection
            </h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto drop-shadow-md">
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
                setPriceRange([0, 100000]);
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
                      onClick={() => setViewMode('2')}
                      className={`px-3 py-2 text-sm font-medium ${viewMode === '2' ? 'bg-amber-600 text-white' : 'bg-white text-amber-600'}`}
                    >
                      2
                    </button>
                    <button
                      onClick={() => setViewMode('3')}
                      className={`px-3 py-2 text-sm font-medium ${viewMode === '3' ? 'bg-amber-600 text-white' : 'bg-white text-amber-600'}`}
                    >
                      3
                    </button>
                    <button
                      onClick={() => setViewMode('4')}
                      className={`px-3 py-2 text-sm font-medium ${viewMode === '4' ? 'bg-amber-600 text-white' : 'bg-white text-amber-600'}`}
                    >
                      4
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-2 text-sm font-medium ${viewMode === 'list' ? 'bg-amber-600 text-white' : 'bg-white text-amber-600'}`}
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
              className={`grid gap-6 ${viewMode === '2'
                ? 'grid-cols-1 sm:grid-cols-2'
                : viewMode === '3'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : viewMode === '4'
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    : 'grid-cols-1' // list view
                }`}
            >

              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={` py-2 overflow-hidden group cursor-pointer hover:shadow-2xl px-4 transition-all duration-300 
    ${viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'}
  `}
                  onClick={() => openModal(product)}
                >
                  <div className="flex flex-row ">
                      <div
                        className={`overflow-hidden rounded-xl ${viewMode === 'list' ? 'w-48 h-48 mr-4 ' : 'h-64 w-full mb-4'
                          }`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                        />
                      </div>

                      <div className={`flex-1 ${viewMode === 'list' ? 'flex flex-col justify-center' : ''}`}>
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
                              <i
                                key={i}
                                className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-sm`}
                              ></i>
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
                              <span className="text-sm text-amber-600 line-through ml-2">
                                ₹{product.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="bg-amber-100 px-2 rounded-full flex items-center text-amber-600 group-hover:text-amber-500 transition-colors">
                            <span className="text-sm font-medium">View</span>
                            <i className="ri-arrow-right-line ml-1 group-hover:translate-x-1 transition-transform"></i>
                          </div>
                        </div>
                      </div>
                  </div>
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
      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
