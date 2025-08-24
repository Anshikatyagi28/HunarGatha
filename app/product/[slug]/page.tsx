'use client';

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Head from "next/head";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProductDetail() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading product...</div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl text-gray-500">❌ Product not found</p>
        <Link href="/shop" className="text-blue-600 underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | Shop</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="max-w-3xl mx-auto p-8">
        <Link
          href="/shop"
          className="inline-flex items-center text-blue-600 mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-700 mb-4 leading-relaxed">{product.description}</p>
            <p className="text-lg font-semibold text-green-700 mb-2">
              Price: ₹{product.price}
            </p>
            {product.artist && (
              <p className="text-sm text-gray-500 mb-4">Artist: {product.artist}</p>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/checkout/${product.slug}`}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
              >
                Buy Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}