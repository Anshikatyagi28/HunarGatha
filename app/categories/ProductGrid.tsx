'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductGrid({ category, sortBy, filterBy }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Apply filters
  const filteredProducts = products
    .filter((product) => product.category === category)
    .filter((product) => {
      switch (filterBy) {
        case 'gifting':
          return product.tags?.includes('Best for Gifting');
        case 'eco':
          return product.tags?.includes('Eco-friendly');
        case 'festive':
          return product.tags?.includes('Festive Pick');
        case 'available':
          return product.inStock;
        default:
          return true;
      }
    });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.isNew ? 1 : -1;
      case 'popular':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });


  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-600">
          Showing {sortedProducts.length} products
        </p>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <i className="ri-grid-line w-4 h-4 flex items-center justify-center"></i>
            <span>Grid View</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-1">
                {product.discount > 0 && (
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
                  <i className="ri-shield-check-line w-3 h-3 flex items-center justify-center mr-1"></i>
                  Origin Verified
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <i className={`${wishlist.includes(product.id) ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-600'} w-5 h-5 flex items-center justify-center`}></i>
              </button>

              {/* Out of Stock Overlay */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                  <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg group-hover:text-[#B66E41] transition-colors">
                  {product.name}
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {product.size}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xl font-bold text-[#B66E41]">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} w-4 h-4 flex items-center justify-center text-yellow-400`}
                    ></i>
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
                {product.tags.map((tag:any) => (
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
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${product.inStock
                      ? 'bg-[#B66E41] text-white hover:bg-[#A55A35]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <Link
                  href={`/products/${product.id}`}
                  className="px-4 py-2 border border-[#B66E41] text-[#B66E41] rounded-lg hover:bg-[#B66E41] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <i className="ri-search-line w-8 h-8 flex items-center justify-center text-gray-400"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
} 