'use client';

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectIsInCart } from "@/store/cartSlice";
import { doc, getDoc, DocumentData, DocumentSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Define a type for the product data structure
interface Product {
  id: string;
  name: string;
  description: string;
  image?: string;
  price: number;
  artist?: string;
  slug: string;
  region?: string;
  craft?: string;
  rating?: number;
  reviews?: number;
  giTag?: boolean;
}

export default function ProductDetail() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : (Array.isArray(params?.slug) ? params.slug[0] : null);
  const dispatch = useDispatch();
  const isInCart = useSelector((state) => selectIsInCart(state, slug || ''));

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", slug);
        const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ ...docSnap.data() as Product, id: docSnap.id, slug: docSnap.id });
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({ 
        product: { 
          ...product, 
          id: product.slug 
        }, 
        quantity 
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8 text-center text-gray-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        <p className="ml-3">Loading product... ⏳</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <p className="text-xl text-red-500 mb-4">❌ {error || "Product not found."}</p>
        <Link href="/shop" className="text-blue-600 hover:underline">
          <ArrowLeft className="inline-block w-4 h-4 mr-1" /> Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Link
        href="/shop"
        className="inline-flex items-center text-blue-600 mb-6 hover:underline transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex"
      >
        <div className="md:w-1/2">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">{product.name}</h1>
            {product.giTag && (
              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                GI Tagged
              </span>
            )}
          </div>
          
          <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
          
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400 mr-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < (product.rating || 0) ? 'text-amber-500' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            {product.rating && (
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews || 0} reviews)
              </span>
            )}
          </div>

          <div className="space-y-3 mb-6">
            <p className="text-2xl font-bold text-green-700">
              ₹{product.price?.toLocaleString()}
            </p>
            {product.artist && (
              <p className="text-sm text-gray-500">
                <span className="font-medium">Artist:</span> {product.artist}
              </p>
            )}
            {product.region && (
              <p className="text-sm text-gray-500">
                <span className="font-medium">Region:</span> {product.region}
              </p>
            )}
            {product.craft && (
              <p className="text-sm text-gray-500">
                <span className="font-medium">Craft:</span> {product.craft}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity:</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-3 mt-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all ${
                isInCart
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg'
              }`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {isInCart ? 'Added to Cart ✓' : 'Add to Cart'}
            </motion.button>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/checkout/${product.slug}`}
                className="inline-block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition"
              >
                Buy Now 🛒
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}