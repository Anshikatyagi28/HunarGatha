'use client';

import Link from 'next/link';
import { useState } from 'react';
import ProductModal from './ProductModal'; // Import your modal component

// Your products data...
const bestsellingProducts = [
  {
    id: 1,
    name: "Royal Mogra Itar",
    artisan: "Ustad Ahmed Khan",
    location: "Kannauj",
    price: 2450,
    originalPrice: 3200,
    image: "https://readdy.ai/api/search-image?query=Elegant%20royal%20mogra%20itar%20perfume%20bottle%2C%20golden%20glass%20with%20ornate%20decorations%2C%20white%20jasmine%20flowers%2C%20luxury%20perfume%20packaging%2C%20warm%20golden%20lighting%2C%20premium%20traditional%20Indian%20fragrance%20presentation&width=400&height=400&seq=mogra-itar&orientation=squarish",
    rating: 4.9,
    reviews: 127,
    badge: "Bestseller",
    isWishlisted: false,
    inStock: true
  },
  {
    id: 2,
    name: "Chikankari Kurta Set",
    artisan: "Fatima Begum",
    location: "Lucknow",
    price: 3800,
    originalPrice: 4500,
    image: "https://readdy.ai/api/search-image?query=Beautiful%20white%20Chikankari%20embroidered%20kurta%20set%20with%20intricate%20threadwork%2C%20delicate%20patterns%2C%20traditional%20Indian%20embroidery%2C%20soft%20fabric%20texture%2C%20elegant%20presentation%2C%20heritage%20craftsmanship%20showcase&width=400&height=400&seq=chikankari-kurta&orientation=squarish",
    rating: 4.8,
    reviews: 89,
    badge: "Heritage",
    isWishlisted: true,
    inStock: true
  },
  {
    id: 3,
    name: "Premium Leather Portfolio",
    artisan: "Rajesh Kumar",
    location: "Kanpur",
    price: 4200,
    originalPrice: 5000,
    image: "https://readdy.ai/api/search-image?query=Premium%20brown%20leather%20portfolio%20bag%20with%20fine%20craftsmanship%2C%20rich%20leather%20texture%2C%20professional%20design%2C%20traditional%20leather%20working%20tools%20in%20background%2C%20warm%20lighting%2C%20luxury%20leather%20goods%20presentation&width=400&height=400&seq=leather-portfolio&orientation=squarish",
    rating: 4.7,
    reviews: 156,
    badge: "Premium",
    isWishlisted: false,
    inStock: true
  },
  {
    id: 4,
    name: "Banarasi Silk Dupatta",
    artisan: "Shyam Lal",
    location: "Varanasi",
    price: 5600,
    originalPrice: 6800,
    image: "https://readdy.ai/api/search-image?query=Luxurious%20Banarasi%20silk%20dupatta%20with%20golden%20threads%2C%20intricate%20weaving%20patterns%2C%20rich%20burgundy%20and%20gold%20colors%2C%20traditional%20silk%20textile%2C%20heritage%20weaving%20craftsmanship%2C%20elegant%20fabric%20display&width=400&height=400&seq=banarasi-dupatta&orientation=squarish",
    rating: 4.9,
    reviews: 203,
    badge: "Luxury",
    isWishlisted: false,
    inStock: true
  },
  {
    id: 5,
    name: "Brass Decorative Vase",
    artisan: "Mohammad Iqbal",
    location: "Moradabad",
    price: 1800,
    originalPrice: 2400,
    image: "https://readdy.ai/api/search-image?query=Ornate%20brass%20decorative%20vase%20with%20intricate%20engravings%2C%20golden%20metallic%20finish%2C%20traditional%20Indian%20brassware%2C%20artisan%20workshop%20background%2C%20warm%20lighting%20showcasing%20metal%20craftsmanship%20details&width=400&height=400&seq=brass-vase&orientation=squarish",
    rating: 4.6,
    reviews: 94,
    badge: "Handcrafted",
    isWishlisted: true,
    inStock: true
  },
  {
    id: 6,
    name: "Glass Bangle Set",
    artisan: "Sunita Devi",
    location: "Firozabad",
    price: 850,
    originalPrice: 1200,
    image: "https://readdy.ai/api/search-image?query=Colorful%20glass%20bangles%20set%20from%20Firozabad%2C%20sparkling%20rainbow%20colors%2C%20traditional%20glasswork%2C%20beautiful%20light%20reflections%2C%20glass%20craftsmanship%20workshop%2C%20bright%20colorful%20presentation%20of%20Indian%20glass%20jewelry&width=400&height=400&seq=glass-bangles&orientation=squarish",
    rating: 4.5,
    reviews: 78,
    badge: "Colorful",
    isWishlisted: false,
    inStock: true
  },
  {
    id: 7,
    name: "Handwoven Cotton Saree",
    artisan: "Kamala Devi",
    location: "Chanderi",
    price: 3200,
    originalPrice: 4000,
    image: "https://readdy.ai/api/search-image?query=Beautiful%20handwoven%20cotton%20saree%20with%20traditional%20patterns%2C%20soft%20cotton%20fabric%2C%20earthy%20colors%20with%20golden%20borders%2C%20traditional%20Indian%20handloom%20textile%2C%20heritage%20weaving%20craftsmanship%2C%20elegant%20fabric%20draping&width=400&height=400&seq=handwoven-saree&orientation=squarish",
    rating: 4.8,
    reviews: 112,
    badge: "Handloom",
    isWishlisted: false,
    inStock: true
  },
  {
    id: 8,
    name: "Wooden Jewelry Box",
    artisan: "Prakash Singh",
    location: "Saharanpur",
    price: 2100,
    originalPrice: 2800,
    image: "https://readdy.ai/api/search-image?query=Intricately%20carved%20wooden%20jewelry%20box%20with%20traditional%20patterns%2C%20rich%20wood%20finish%2C%20brass%20fittings%2C%20fine%20woodworking%20craftsmanship%2C%20warm%20studio%20lighting%2C%20heritage%20wooden%20handicraft%20presentation&width=400&height=400&seq=wooden-jewelry-box&orientation=squarish",
    rating: 4.7,
    reviews: 67,
    badge: "Carved",
    isWishlisted: true,
    inStock: true
  }
];

export default function BestsellingCrafts() {
  const [wishlist, setWishlist] = useState([2, 5, 8]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Bestseller': return 'bg-[#D6A400] text-white';
      case 'Heritage': return 'bg-[#4E6E58] text-white';
      case 'Premium': return 'bg-[#7B2D26] text-white';
      case 'Luxury': return 'bg-[#2C2A4A] text-white';
      case 'Handcrafted': return 'bg-[#a96615] text-white';
      case 'Colorful': return 'bg-gradient-to-r from-pink-400 to-purple-400 text-white';
      case 'Handloom': return 'bg-[#4E6E58] text-white';
      case 'Carved': return 'bg-[#7B2D26] text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2C2A4A] mb-4">
            Bestselling Crafts
          </h2>
          <p className="text-lg text-[#3A3A3A] max-w-2xl mx-auto">
            Discover the most loved handmade treasures, carefully crafted by master artisans 
            and cherished by customers across India.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellingProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => openModal(product)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getBadgeColor(product.badge)}`}>
                    {product.badge}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                >
                  <i className={`${wishlist.includes(product.id) ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-600'} w-4 h-4 flex items-center justify-center`}></i>
                </button>

                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white px-4 py-2 rounded-lg font-semibold text-gray-800">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(product);
                    }}
                    className="px-6 py-2 bg-white text-[#2C2A4A] font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-[#2C2A4A] hover:text-[#a96615] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#3A3A3A] mt-1">
                    <i className="ri-user-line mr-1"></i>
                    {product.artisan}
                  </p>
                  <p className="text-sm text-[#a96615]">
                    <i className="ri-map-pin-line mr-1"></i>
                    {product.location}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'ri-star-fill text-[#D6A400]' : 'ri-star-line text-gray-300'}`}
                    ></i>
                  ))}
                  <span className="ml-2 text-sm text-[#3A3A3A]">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-[#2C2A4A]">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-[#4E6E58]">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!product.inStock}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                    product.inStock
                      ? 'bg-[#a96615] text-white hover:bg-[#ca7d1f]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Notify When Available'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-[#a96615] text-white font-semibold rounded-lg hover:bg-[#ca7d1f] transition-colors"
          >
            View All Products
            <i className="ri-arrow-right-line ml-2"></i>
          </Link>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
