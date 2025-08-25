'use client';

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Head from "next/head";
import { doc, getDoc, DocumentData, DocumentSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Define a type for the product data structure
interface Product {
  name: string;
  description: string;
  image?: string;
  price: number;
  artist?: string;
  slug: string;
}

export default function ProductDetail() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : (Array.isArray(params?.slug) ? params.slug[0] : null);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
          setProduct({ ...docSnap.data() as Product, slug: docSnap.id });
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8 text-center text-gray-500">
        <p>Loading product... ⏳</p>
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
    <>
      <Head>
        <title>{product.name} | Shop</title>
        <meta name="description" content={product.description} />
      </Head>

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
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
            <p className="text-xl font-bold text-green-700 mb-4">
              Price: ₹{product.price}
            </p>
            {product.artist && (
              <p className="text-sm text-gray-500 mb-6">Artist: {product.artist}</p>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-auto">
              <Link
                href={`/checkout/${product.slug}`}
                className="inline-block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition"
              >
                Buy Now 🛒
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}