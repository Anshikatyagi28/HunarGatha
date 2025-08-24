import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '@/store/cartSlice';
import { selectCartItems, selectCartTotal, selectCartItemCount } from '@/store/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const getTotal = useSelector(selectCartTotal);
  const getItemCount = useSelector(selectCartItemCount);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F3EC] pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-[#2C2A4A] mb-4">Your cart is empty</h1>
            <p className="text-[#3A3A3A] text-lg mb-8">
              Discover amazing handcrafted products from skilled artisans
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-[#D6A400] text-[#2C2A4A] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#B8900A] transition-colors"
            >
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2C2A4A] mb-2">
              Shopping Cart ({getItemCount()} items)
            </h1>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-[#B66E41] hover:text-[#8B5633] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
          
          <button
            onClick={() => dispatch(clearCart())}
            className="text-[#7B2D26] hover:text-[#5A1F1A] transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#2C2A4A] mb-1">
                      {item.name}
                    </h3>
                    <p className="text-[#B66E41] mb-1">{item.district}</p>
                    <p className="text-[#3A3A3A] text-sm">by {item.artisan}</p>
                    <p className="text-[#3A3A3A] text-sm italic mt-2">
                      "{item.story}"
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 bg-[#F8F3EC] rounded-full px-4 py-2">
                      <button
                        onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: item.quantity - 1 }))}
                        className="p-1 hover:bg-white rounded-full transition-colors"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: item.quantity + 1 }))}
                        className="p-1 hover:bg-white rounded-full transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#2C2A4A]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price.toLocaleString()} each
                      </p>
                    </div>
                    
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="p-2 hover:bg-[#F8F3EC] rounded-full transition-colors text-[#7B2D26]"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-[#2C2A4A] mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#3A3A3A]">Subtotal</span>
                  <span className="font-semibold">₹{getTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A3A3A]">Shipping</span>
                  <span className="font-semibold text-[#4E6E58]">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A3A3A]">Tax</span>
                  <span className="font-semibold">₹{Math.round(getTotal() * 0.18).toLocaleString()}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-xl font-bold text-[#2C2A4A]">
                  <span>Total</span>
                  <span>₹{Math.round(getTotal() * 1.18).toLocaleString()}</span>
                </div>
              </div>
              
              <motion.button
                onClick={handleCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#D6A400] text-[#2C2A4A] py-4 rounded-full font-bold text-lg hover:bg-[#B8900A] transition-colors mb-4"
              >
                Proceed to Checkout
              </motion.button>
              
              <div className="text-center text-sm text-[#3A3A3A]">
                <p className="mb-2">🔒 Secure checkout</p>
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