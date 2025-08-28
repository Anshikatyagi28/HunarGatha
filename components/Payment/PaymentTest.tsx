'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShoppingCart, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import RazorpayPayment from './RazorpayPayment';
import { PaymentItem } from '@/lib/payment';
import toast from 'react-hot-toast';

const PaymentTest: React.FC = () => {
  const { currentUser } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PaymentItem | null>(null);

  // Sample product for testing
  const testProduct: PaymentItem = {
    id: 'test-1',
    name: 'Test Product - Royal Mogra Itar',
    price: 2450,
    quantity: 1,
    image: 'https://readdy.ai/api/search-image?query=Elegant%20royal%20mogra%20itar%20perfume%20bottle&width=400&height=400'
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      toast.error('Please login to continue with purchase');
      return;
    }
    setSelectedProduct(testProduct);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentData: any) => {
    try {
      // Save order to database
      const orderData = {
        orderId: paymentData.orderId,
        razorpayPaymentId: paymentData.razorpay_payment_id,
        razorpayOrderId: paymentData.razorpay_order_id,
        customerId: currentUser?.uid,
        customerEmail: currentUser?.email,
        customerName: currentUser?.displayName,
        items: paymentData.items,
        amount: paymentData.amount,
        status: 'confirmed',
        paymentStatus: 'paid',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to Firestore
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        toast.success('Order placed successfully!');
        setShowPayment(false);
        setSelectedProduct(null);
      } else {
        throw new Error('Failed to save order');
      }
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error('Order placed but failed to save details. Please contact support.');
    }
  };

  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error);
    setShowPayment(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F3EC] to-[#E8D5C4] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2C2A4A] mb-4">
            Razorpay Payment Integration Test
          </h1>
          <p className="text-lg text-gray-600">
            Test the complete payment flow with Razorpay
          </p>
        </div>

        {/* Authentication Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          {currentUser ? (
            <div className="flex items-center gap-3 text-green-600">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Logged in as: {currentUser.email}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Not logged in - Please login to test payments</span>
            </div>
          )}
        </div>

        {/* Test Product */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Product</h2>
          <div className="flex items-center gap-6">
            <img 
              src={testProduct.image} 
              alt={testProduct.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{testProduct.name}</h3>
              <p className="text-gray-600">Test product for payment integration</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-bold text-[#B66E41]">₹{testProduct.price}</span>
                <span className="text-sm text-gray-500">+ 18% GST</span>
              </div>
            </div>
            <button
              onClick={handleBuyNow}
              disabled={!currentUser}
              className="bg-gradient-to-r from-[#B66E41] to-[#A05A2E] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#A05A2E] hover:to-[#8B4A1F] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Buy Now
            </button>
          </div>
        </div>

        {/* Payment Flow Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Flow Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
              <h3 className="font-semibold text-blue-800">Click Buy Now</h3>
              <p className="text-sm text-blue-600">Authenticated users only</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
              <h3 className="font-semibold text-green-800">Payment Modal</h3>
              <p className="text-sm text-green-600">Order summary & payment</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
              <h3 className="font-semibold text-purple-800">Razorpay Checkout</h3>
              <p className="text-sm text-purple-600">Secure payment processing</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">4</div>
              <h3 className="font-semibold text-orange-800">Order Confirmed</h3>
              <p className="text-sm text-orange-600">Saved to database</p>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPayment && selectedProduct && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <RazorpayPayment
              items={[selectedProduct]}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentFailure={handlePaymentFailure}
              onClose={() => {
                setShowPayment(false);
                setSelectedProduct(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTest;
