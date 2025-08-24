import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Heart, Eye, Star, MapPin, ShieldCheck } from 'lucide-react';
import { bestsellingProducts } from '../data/products';
import { featuredDistricts } from '../data/districts';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import { addItem as addToWishlist, removeItem as removeFromWishlist } from '@/store/wishlistSlice';
import { selectIsInWishlist } from '@/store/wishlistSlice';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useDispatch();
  


  const filteredProducts = useMemo(() => {
    let filtered = bestsellingProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.artisan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.district.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDistrict = !selectedDistrict || product.district === selectedDistrict;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesDistrict && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [searchTerm, selectedDistrict, priceRange, sortBy]);



  const ProductCard = ({ product, isListView = false }) => {
    const isInWishlist = useSelector((state) => selectIsInWishlist(state, product.id));
    
    const handleWishlistToggle = () => {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id));
      } else {
        dispatch(addToWishlist(product));
      }
    };
    
    return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300 ${
        isListView ? 'flex' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${isListView ? 'w-48 h-48' : 'h-64'}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {product.verified && (
          <div className="absolute top-4 left-4 bg-[#4E6E58] text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <ShieldCheck className="h-3 w-3" />
            <span>Verified</span>
          </div>
        )}

        <div className="absolute top-4 right-4 bg-[#7B2D26] text-white px-2 py-1 rounded-full text-xs font-bold">
          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
        </div>

        <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-[#2C2A4A] p-3 rounded-full shadow-lg hover:bg-[#F8F3EC] transition-colors"
          >
            <Eye className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className={`p-3 rounded-full shadow-lg transition-colors ${
              isInWishlist(product.id)
                ? 'bg-[#7B2D26] text-white'
                : 'bg-white text-[#7B2D26] hover:bg-[#F8F3EC]'
            }`}
          >
            <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
      </div>

      <div className={`p-6 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex items-center space-x-2 text-[#B66E41] mb-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-medium">{product.district}</span>
        </div>

        <h3 className="text-xl font-bold text-[#2C2A4A] mb-2 group-hover:text-[#B66E41] transition-colors">
          {product.name}
        </h3>

        <p className="text-[#3A3A3A] text-sm mb-2">
          by <span className="font-medium text-[#D6A400]">{product.artisan}</span>
        </p>

        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-[#D6A400] fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-[#3A3A3A]">({product.reviews})</span>
        </div>

        <p className="text-[#3A3A3A] text-sm leading-relaxed mb-4 italic">
          "{product.story}"
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#2C2A4A]">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => dispatch(addItem({ product, quantity: 1 }))}
          className="w-full bg-[#D6A400] text-[#2C2A4A] py-3 rounded-full font-semibold hover:bg-[#B8900A] transition-colors duration-200"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2C2A4A] mb-4">
            Discover Authentic Crafts
          </h1>
          <p className="text-lg text-[#3A3A3A] max-w-3xl">
            Explore our curated collection of handmade treasures from skilled artisans across India.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, artisans, districts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B66E41] focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B66E41] focus:border-transparent"
              >
                <option value="">All Districts</option>
                {featuredDistricts.map(district => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B66E41] focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-[#D6A400] text-[#2C2A4A]' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-[#D6A400] text-[#2C2A4A]' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-[#3A3A3A]">
            Showing {filteredProducts.length} of {bestsellingProducts.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isListView={viewMode === 'list'} 
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#2C2A4A] mb-2">No products found</h3>
            <p className="text-[#3A3A3A] mb-6">
              Try adjusting your search criteria or browse all products
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDistrict('');
                setPriceRange([0, 15000]);
              }}
              className="bg-[#D6A400] text-[#2C2A4A] px-6 py-3 rounded-full font-semibold hover:bg-[#B8900A] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;