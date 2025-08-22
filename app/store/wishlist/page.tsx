'use client';

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

export default function WishlistPage() {
  // Mock wishlist data (later this will come from Firestore)
  const wishlistItems = [
    {
      id: "1",
      name: "Flower Pot - 6 inch",
      price: 100,
      discountPrice: 60,
      image: "https://images.unsplash.com/photo-1617196039897-4ec52ffb62b7?w=400",
      artisan: "Ramesh Kumar",
      district: "Azamgarh"
    },
    {
      id: "2",
      name: "Doremon Piggy Bank",
      price: 200,
      discountPrice: 65,
      image: "https://images.unsplash.com/photo-1609250291999-6abf9c5a0e6f?w=400",
      artisan: "Meena Devi",
      district: "Amroha"
    },
    {
      id: "3",
      name: "Kulhad Tea Cup - 100ml",
      price: 3,
      discountPrice: 1.5,
      image: "https://images.unsplash.com/photo-1612197496815-b67ca2b8b9c8?w=400",
      artisan: "Sita Ram",
      district: "Kannauj"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#2C2A4A] mb-8">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-100">
                  <Trash2 className="w-5 h-5 text-[#7B2D26]" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#2C2A4A]">{item.name}</h2>
                <p className="text-sm text-gray-600">
                  by {item.artisan} – {item.district}
                </p>

                {/* Price */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-lg font-bold text-[#B66E41]">
                    ₹{item.discountPrice}
                  </span>
                  <span className="text-sm line-through text-gray-500">
                    ₹{item.price}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#D6A400] text-white py-2 rounded-lg hover:bg-yellow-600 transition">
                    <ShoppingCart className="w-5 h-5" />
                    Move to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
