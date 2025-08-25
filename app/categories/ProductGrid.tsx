'use client';

import { useEffect, useState, FC, useMemo } from 'react';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// =================================================================
// TYPE DEFINITIONS
// =================================================================

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  isNew?: boolean;
  inStock: boolean;
  category: string;
  tags: string[];
  size?: string;
  rating: number;
  reviews: number;
  artisan: string;
  district: string;
}

// Define the props for the ProductGrid component
interface ProductGridProps {
  products: Product[]; // The full product data is now passed as a prop
  sortBy: 'price-low' | 'price-high' | 'newest' | 'popular' | null;
  filterBy: 'gifting' | 'eco' | 'festive' | 'available' | null;
  gridCols: number;
  category: string;
}

// =================================================================
// MAIN COMPONENT
// =================================================================

const ProductGrid: React.FC<ProductGridProps> = ({ products, sortBy, filterBy, gridCols, category }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  // The state for fetching data (`loading`, `error`, `products`) has been removed from this component.
  // This component now purely receives data via props from a parent component.
  // This is a key architectural decision for better data flow and separation of concerns.

  useEffect(() => {
    // You can hydrate the wishlist from localStorage here if needed
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    // Persist the wishlist to localStorage whenever it changes
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Memoize the filtering and sorting logic for performance
  const sortedAndFilteredProducts = useMemo(() => {
    // Apply filtering to the products
    const filtered = products.filter((product) => {
      // Filter by category
      const isCategoryMatch = !category || product.category === category;

      // Filter by tag/stock based on `filterBy`
      let isFilterMatch = true;
      if (filterBy) {
        switch (filterBy) {
          case 'gifting':
            isFilterMatch = product.tags?.includes('Best for Gifting');
            break;
          case 'eco':
            isFilterMatch = product.tags?.includes('Eco-friendly');
            break;
          case 'festive':
            isFilterMatch = product.tags?.includes('Festive Pick');
            break;
          case 'available':
            isFilterMatch = product.inStock;
            break;
          default:
            isFilterMatch = true;
        }
      }

      return isCategoryMatch && isFilterMatch;
    });

    // Apply sorting to the filtered products
    return [...filtered].sort((a, b) => {
      if (!sortBy) return 0;
      
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          // Sort with 'isNew' items first, falling back to id for stability
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || a.id.localeCompare(b.id);
        case 'popular':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });
  }, [products, category, filterBy, sortBy]);


  if (sortedAndFilteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  // Dynamic Tailwind CSS classes for grid columns
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  const currentGridClass = gridClasses[gridCols as keyof typeof gridClasses] || gridClasses[3];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-600">
          Showing {sortedAndFilteredProducts.length} products
        </p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {/* The view toggle buttons should be handled by the parent component */}
          </div>
        </div>
      </div>

      <div className={`grid ${currentGridClass} gap-8`}>
        {sortedAndFilteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 group overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-1">
                {product.discount && product.discount > 0 && (
                  <span className="bg-[#7B2D26] text-white text-xs px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-[#4E6E58] text-white text-xs px-2 py-1 rounded">
                    NEW
                  </span>
                )}
                <span className="bg-[#D6A400] text-white text-xs px-2 py-1 rounded flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm12.73-1.41A8 8 0 104.34 4.34a8 8 0 0011.32 11.32zM9 11V9h2v2H9zm0 4v-2h2v2H9zm4-4h2V9h-2v2zm0 4h2v-2h-2v2z" />
                  </svg>
                  Origin Verified
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-5 h-5 ${wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`}
                />
              </button>

              {/* Out of Stock Overlay */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center z-20">
                  <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <Link href={`/products/${product.id}`} className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg group-hover:text-[#B66E41] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                {product.size && (
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                    {product.size}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xl font-bold text-[#B66E41]">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Artisan Info */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">Made by</p>
                <p className="font-medium text-gray-900">{product.artisan}</p>
                <p className="text-xs text-[#B66E41]">{product.district}, Uttar Pradesh</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  disabled={!product.inStock}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    product.inStock
                      ? 'bg-[#B66E41] text-white hover:bg-[#A55A35]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <Link
                  href={`/products/${product.id}`}
                  className="px-4 py-2 border border-[#B66E41] text-[#B66E41] rounded-lg hover:bg-[#B66E41] hover:text-white transition-colors whitespace-nowrap"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;