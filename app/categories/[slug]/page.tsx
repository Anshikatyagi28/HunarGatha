'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  description: string;
  artisan: string;
  region: string;
  rating: number;
  reviews: number;
  giTag?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

const categories: Category[] = [
  { id: 'pottery', name: 'Pottery', icon: '🏺', description: 'Traditional clay crafts from master potters', count: 156 },
  { id: 'handloom', name: 'Handloom', icon: '🧵', description: 'Woven textiles and fabrics', count: 234 },
  { id: 'handicraft', name: 'Handicraft', icon: '🔨', description: 'Artisanal decorative items', count: 189 },
  { id: 'fragrances', name: 'Fragrances (Itar)', icon: '🌸', description: 'Natural perfumes and essential oils', count: 87 },
  { id: 'food', name: 'Food & Organics', icon: '🌿', description: 'Traditional foods and organic products', count: 123 }
];

// Mock products data - in real app, this would come from your database
const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'banarasi-silk-scarf',
    name: 'Banarasi Silk Scarf',
    price: 2199,
    image: 'https://readdy.ai/api/search-image?query=Luxurious%20Banarasi%20silk%20scarf%20with%20golden%20zari%20work%20intricate%20floral%20patterns%2C%20traditional%20Indian%20textile%2C%20premium%20craftsmanship%2C%20heritage%20weaving&width=400&height=400&seq=prod-001&orientation=squarish',
    category: 'handloom',
    description: 'Handwoven silk scarf with traditional motifs',
    artisan: 'Meera Devi',
    region: 'Uttar Pradesh',
    rating: 4.8,
    reviews: 142,
    giTag: true
  },
  {
    id: '2',
    slug: 'blue-pottery-vase',
    name: 'Blue Pottery Vase',
    price: 1499,
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20blue%20pottery%20vase%20with%20traditional%20Rajasthani%20patterns%20white%20and%20blue%20ceramic%20art%20piece%2C%20handcrafted%20pottery%2C%20cultural%20heritage%2C%20elegant%20design&width=400&height=400&seq=prod-002&orientation=squarish',
    category: 'pottery',
    description: 'Hand-painted ceramic vase with floral designs',
    artisan: 'Ravi Kumar',
    region: 'Rajasthan',
    rating: 4.6,
    reviews: 89,
    giTag: true
  },
  {
    id: '3',
    slug: 'chikankari-kurta',
    name: 'Chikankari Embroidered Kurta',
    price: 1899,
    image: 'https://readdy.ai/api/search-image?query=Elegant%20white%20Chikankari%20embroidered%20kurta%20with%20delicate%20threadwork%20floral%20patterns%2C%20traditional%20Lucknow%20craft%2C%20premium%20cotton%20fabric%2C%20heritage%20fashion&width=400&height=400&seq=prod-006&orientation=squarish',
    category: 'handloom',
    description: 'Delicate shadow work embroidery on cotton',
    artisan: 'Fatima Khan',
    region: 'Uttar Pradesh',
    rating: 4.5,
    reviews: 203,
    giTag: true
  }
];

export default function CategoryPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : (Array.isArray(params?.slug) ? params.slug[0] : null);
  const dispatch = useDispatch();

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundCategory = categories.find(cat => cat.id === slug);
      if (foundCategory) {
        setCategory(foundCategory);
        // Filter products by category
        const categoryProducts = mockProducts.filter(product => product.category === slug);
        setProducts(categoryProducts);
      }
      setLoading(false);
    }
  }, [slug]);

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ 
      product: { 
        ...product, 
        id: product.slug 
      }, 
      quantity: 1 
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category not found</h1>
          <Link href="/categories" className="text-amber-600 hover:underline">
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/categories"
              className="inline-flex items-center text-white hover:text-amber-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Categories
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-8"
          >
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {category.name} Crafts
            </h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              {category.description}
            </p>
            <p className="text-amber-200 mt-2">
              {products.length} products available
            </p>
          </motion.div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <Link href={`/product/${product.slug}`}>
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-bold text-amber-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
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
                        <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-amber-500' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-amber-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-amber-900">₹{product.price}</span>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 shadow-md transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 flex items-center justify-center bg-amber-100 rounded-full mx-auto mb-6">
              <span className="text-4xl">{category.icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-4">No Products Found</h3>
            <p className="text-amber-600 mb-6">
              No products available in {category.name} category at the moment.
            </p>
            <Link
              href="/categories"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Browse Other Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
