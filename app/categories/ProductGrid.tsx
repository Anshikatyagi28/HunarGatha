'use client';

import { useState } from 'react';
import Link from 'next/link';

const productData = {
  pottery: [
    {
      id: 1,
      name: 'Traditional Clay Diya Set',
      image: 'https://readdy.ai/api/search-image?query=traditional%20Indian%20clay%20diyas%20oil%20lamps%20handcrafted%20pottery%20warm%20golden%20lighting%20festival%20decorative%20simple%20earthy%20background%20artisanal%20ceramic%20work%20beautiful%20craftsmanship%20cultural%20heritage&width=400&height=400&seq=diya1&orientation=squarish',
      price: 299,
      originalPrice: 399,
      discount: 25,
      size: 'Set of 12',
      artisan: 'Ramesh Kumar',
      district: 'Azamgarh',
      rating: 4.8,
      reviews: 156,
      tags: ['Festive Pick', 'Eco-friendly'],
      inStock: true,
      isNew: false
    },
    {
      id: 2,
      name: 'Black Pottery Vase',
      image: 'https://readdy.ai/api/search-image?query=elegant%20black%20pottery%20vase%20traditional%20Indian%20ceramic%20craft%20smooth%20matte%20finish%20decorative%20vessel%20artisanal%20handmade%20beautiful%20simple%20neutral%20background%20cultural%20heritage%20artistic%20design&width=400&height=400&seq=pottery1&orientation=squarish',
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      size: 'Large',
      artisan: 'Meera Devi',
      district: 'Azamgarh',
      rating: 4.9,
      reviews: 89,
      tags: ['Best for Gifting', 'Master Artisan'],
      inStock: true,
      isNew: true
    },
    {
      id: 3,
      name: 'Kulhad Tea Cup Set',
      image: 'https://readdy.ai/api/search-image?query=traditional%20Indian%20kulhad%20clay%20tea%20cups%20rustic%20earthenware%20pottery%20handcrafted%20ceramic%20vessels%20authentic%20village%20craft%20simple%20earthy%20background%20cultural%20heritage%20artisanal%20work&width=400&height=400&seq=kulhad1&orientation=squarish',
      price: 450,
      originalPrice: 550,
      discount: 18,
      size: 'Set of 6',
      artisan: 'Suresh Pal',
      district: 'Varanasi',
      rating: 4.7,
      reviews: 203,
      tags: ['Eco-friendly', 'Traditional'],
      inStock: true,
      isNew: false
    },
    {
      id: 4,
      name: 'Decorative Water Pot',
      image: 'https://readdy.ai/api/search-image?query=traditional%20Indian%20clay%20water%20pot%20decorative%20pottery%20vessel%20handcrafted%20ceramic%20artisanal%20work%20beautiful%20cultural%20design%20earthenware%20simple%20neutral%20background%20heritage%20craft&width=400&height=400&seq=waterpot1&orientation=squarish',
      price: 899,
      originalPrice: 1199,
      discount: 25,
      size: 'Medium',
      artisan: 'Kamla Devi',
      district: 'Azamgarh',
      rating: 4.6,
      reviews: 124,
      tags: ['Best for Gifting', 'Eco-friendly'],
      inStock: false,
      isNew: false
    }
  ],
  handloom: [
    {
      id: 5,
      name: 'Chikankari Kurta',
      image: 'https://readdy.ai/api/search-image?query=elegant%20white%20chikankari%20embroidery%20kurta%20traditional%20Lucknow%20handloom%20work%20delicate%20threadwork%20beautiful%20Indian%20ethnic%20wear%20cultural%20heritage%20artisanal%20craftsmanship%20simple%20background&width=400&height=400&seq=chikan1&orientation=squarish',
      price: 2499,
      originalPrice: 3299,
      discount: 24,
      size: 'Large',
      artisan: 'Fatima Begum',
      district: 'Lucknow',
      rating: 4.9,
      reviews: 312,
      tags: ['Best for Gifting', 'Traditional'],
      inStock: true,
      isNew: true
    },
    {
      id: 6,
      name: 'Banarasi Silk Dupatta',
      image: 'https://readdy.ai/api/search-image?query=luxurious%20Banarasi%20silk%20dupatta%20golden%20zari%20work%20traditional%20Indian%20handloom%20textile%20beautiful%20intricate%20patterns%20cultural%20heritage%20Varanasi%20weaving%20artisanal%20craftsmanship%20elegant%20background&width=400&height=400&seq=banarasi1&orientation=squarish',
      price: 3999,
      originalPrice: 5499,
      discount: 27,
      size: 'One Size',
      artisan: 'Shyam Lal',
      district: 'Varanasi',
      rating: 4.8,
      reviews: 187,
      tags: ['Festive Pick', 'Master Artisan'],
      inStock: true,
      isNew: false
    }
  ],
  handicraft: [
    {
      id: 7,
      name: 'Brass Decorative Plate',
      image: 'https://readdy.ai/api/search-image?query=ornate%20brass%20decorative%20plate%20traditional%20Indian%20metalwork%20intricate%20engravings%20cultural%20patterns%20handcrafted%20artisanal%20heritage%20Moradabad%20brassware%20beautiful%20golden%20shine%20simple%20background&width=400&height=400&seq=brass1&orientation=squarish',
      price: 1899,
      originalPrice: 2399,
      discount: 21,
      size: 'Medium',
      artisan: 'Mohammad Iqbal',
      district: 'Moradabad',
      rating: 4.7,
      reviews: 145,
      tags: ['Best for Gifting', 'Traditional'],
      inStock: true,
      isNew: false
    },
    {
      id: 8,
      name: 'Marble Inlay Box',
      image: 'https://readdy.ai/api/search-image?query=exquisite%20white%20marble%20jewelry%20box%20intricate%20inlay%20work%20precious%20stone%20patterns%20Agra%20handicraft%20traditional%20Indian%20artisanal%20craftsmanship%20cultural%20heritage%20beautiful%20ornate%20design%20simple%20background&width=400&height=400&seq=marble1&orientation=squarish',
      price: 4299,
      originalPrice: 5799,
      discount: 26,
      size: 'Small',
      artisan: 'Taj Ahmed',
      district: 'Agra',
      rating: 4.9,
      reviews: 98,
      tags: ['Best for Gifting', 'Master Artisan'],
      inStock: true,
      isNew: true
    }
  ],
  fragrances: [
    {
      id: 9,
      name: 'Rose Itar Set',
      image: 'https://readdy.ai/api/search-image?query=elegant%20traditional%20Indian%20itar%20perfume%20bottles%20rose%20attar%20natural%20fragrance%20oil%20Kannauj%20handcrafted%20glass%20vessels%20beautiful%20cultural%20heritage%20artisanal%20work%20simple%20background&width=400&height=400&seq=itar1&orientation=squarish',
      price: 1599,
      originalPrice: 1999,
      discount: 20,
      size: 'Set of 3',
      artisan: 'Ustad Ahmed Khan',
      district: 'Kannauj',
      rating: 4.8,
      reviews: 234,
      tags: ['Best for Gifting', 'Natural'],
      inStock: true,
      isNew: false
    },
    {
      id: 10,
      name: 'Sandalwood Attar',
      image: 'https://readdy.ai/api/search-image?query=premium%20sandalwood%20attar%20bottle%20traditional%20Indian%20perfume%20oil%20natural%20fragrance%20Kannauj%20heritage%20craft%20beautiful%20glass%20vessel%20artisanal%20work%20cultural%20tradition%20simple%20background&width=400&height=400&seq=sandalwood1&orientation=squarish',
      price: 2799,
      originalPrice: 3499,
      discount: 20,
      size: '12ml',
      artisan: 'Nasir Ahmad',
      district: 'Kannauj',
      rating: 4.9,
      reviews: 167,
      tags: ['Premium', 'Natural'],
      inStock: true,
      isNew: true
    }
  ],
  food: [
    {
      id: 11,
      name: 'Organic Jaggery Block',
      image: 'https://readdy.ai/api/search-image?query=organic%20jaggery%20blocks%20traditional%20Indian%20sweetener%20natural%20brown%20sugar%20handmade%20rural%20craft%20healthy%20food%20product%20artisanal%20heritage%20simple%20clean%20background&width=400&height=400&seq=jaggery1&orientation=squarish',
      price: 199,
      originalPrice: 249,
      discount: 20,
      size: '500g',
      artisan: 'Ravi Sharma',
      district: 'Saharanpur',
      rating: 4.6,
      reviews: 189,
      tags: ['Organic', 'Eco-friendly'],
      inStock: true,
      isNew: false
    },
    {
      id: 12,
      name: 'Handmade Pickle Set',
      image: 'https://readdy.ai/api/search-image?query=traditional%20Indian%20pickle%20jars%20homemade%20preserves%20organic%20vegetables%20authentic%20rural%20craft%20glass%20containers%20handcrafted%20food%20heritage%20artisanal%20work%20simple%20background&width=400&height=400&seq=pickle1&orientation=squarish',
      price: 899,
      originalPrice: 1199,
      discount: 25,
      size: 'Set of 4',
      artisan: 'Sunita Devi',
      district: 'Allahabad',
      rating: 4.7,
      reviews: 156,
      tags: ['Organic', 'Traditional'],
      inStock: true,
      isNew: false
    }
  ]
};

export default function ProductGrid({ category, sortBy, filterBy }) {
  const [wishlist, setWishlist] = useState([]);
  
  const products = productData[category] || [];

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(product => {
    switch (filterBy) {
      case 'gifting':
        return product.tags.includes('Best for Gifting');
      case 'eco':
        return product.tags.includes('Eco-friendly');
      case 'festive':
        return product.tags.includes('Festive Pick');
      case 'available':
        return product.inStock;
      default:
        return true;
    }
  });

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
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    product.inStock
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