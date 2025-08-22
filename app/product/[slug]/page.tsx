'use client';

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import products from "@/data/products.json"; // make sure products.json exists

export default function ProductDetail() {
  const { slug } = useParams();

  // find the product from json
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl text-gray-500">Product not found</p>
        <Link href="/shop" className="text-blue-600 underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Back Button */}
      <Link href="/shop" className="inline-flex items-center text-blue-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
      </Link>

      {/* Product Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold text-green-700 mb-2">
            Price: ₹{product.price}
          </p>
          <p className="text-sm text-gray-500 mb-4">Artist: {product.artist}</p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Buy Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
