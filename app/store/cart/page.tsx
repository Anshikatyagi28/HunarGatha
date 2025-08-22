'use client'; // This directive makes the component a Client Component in Next.js

import React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link"; // Import Link from next/link
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import useCartStore from "@/stores/cartStore";

const CartPage = () => {
  const router = useRouter(); // Use the useRouter hook for navigation
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  } = useCartStore();

  const handleCheckout = () => {
    router.push("/checkout"); // Use router.push() instead of navigate()
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-[#2C2A4A] mb-3">
            Your cart is empty
          </h1>
          <p className="text-[#3A3A3A] text-lg mb-8">
            Discover unique handcrafted products from skilled artisans.
          </p>
          <Link
            href="/products" // Use href prop instead of to
            className="inline-flex items-center justify-center bg-[#D6A400] text-[#2C2A4A] px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#B8900A] transition-colors shadow-md"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2C2A4A]">
              Shopping Cart ({getItemCount()} items)
            </h1>
            <Link
              href="/products" // Use href prop instead of to
              className="mt-2 inline-flex items-center text-[#B66E41] hover:text-[#8B5633] transition-colors text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="text-sm px-4 py-2 rounded-full border border-[#7B2D26] text-[#7B2D26] hover:bg-[#7B2D26] hover:text-white transition-colors"
          >
            Clear Cart
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl border"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#2C2A4A]">
                    {item.name}
                  </h3>
                  <p className="text-[#B66E41] text-sm">{item.district}</p>
                  <p className="text-[#3A3A3A] text-sm">by {item.artisan}</p>
                  {item.story && (
                    <p className="text-[#3A3A3A] text-xs italic mt-1">
                      "{item.story}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* Quantity */}
                  <div className="flex items-center gap-2 bg-[#F8F3EC] rounded-full px-3 py-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-1 hover:bg-white rounded-full transition-colors"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 hover:bg-white rounded-full transition-colors"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#2C2A4A]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹{item.price.toLocaleString()} each
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-[#F8F3EC] rounded-full transition-colors text-[#7B2D26]"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#2C2A4A] mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold">
                    ₹{getTotal().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-semibold text-[#4E6E58]">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Tax (18%)</span>
                  <span className="font-semibold">
                    ₹{Math.round(getTotal() * 0.18).toLocaleString()}
                  </span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-base font-bold text-[#2C2A4A]">
                  <span>Total</span>
                  <span>
                    ₹{Math.round(getTotal() * 1.18).toLocaleString()}
                  </span>
                </div>
              </div>

              <motion.button
                onClick={handleCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#D6A400] text-[#2C2A4A] py-3 rounded-full font-bold text-base hover:bg-[#B8900A] transition-colors shadow-md mb-3"
              >
                Proceed to Checkout
              </motion.button>

              <div className="text-center text-xs text-gray-600">
                <p className="mb-1">🔒 Secure checkout</p>
                <p>Free shipping on all orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;