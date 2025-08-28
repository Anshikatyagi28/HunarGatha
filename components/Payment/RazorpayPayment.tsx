'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { createRazorpayOrder, openRazorpayCheckout, PaymentItem, calculateTotalAmount } from '@/lib/payment';
import toast from 'react-hot-toast';

interface RazorpayPaymentProps {
  items: PaymentItem[];
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentFailure: (error: any) => void;
  onClose: () => void;
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({
  items,
  onPaymentSuccess,
  onPaymentFailure,
  onClose
}) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'processing' | 'success' | 'failed'>('details');

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!currentUser) {
      toast.error('Please login to continue with payment');
      return;
    }

    setLoading(true);
    setPaymentStep('processing');

    try {
      // Create Razorpay order
      const orderData = {
        amount: total,
        currency: 'INR',
        receipt: `order_${Date.now()}_${currentUser.uid}`,
        notes: {
          customer_id: currentUser.uid,
          customer_email: currentUser.email || '',
          customer_name: currentUser.displayName || '',
          items: JSON.stringify(items)
        }
      };

      const order = await createRazorpayOrder(orderData);

      // Open Razorpay payment window
      const paymentData = await openRazorpayCheckout(order, {
        name: currentUser.displayName || 'Customer',
        email: currentUser.email || '',
        contact: ''
      });

      // Payment successful
      setPaymentStep('success');
      toast.success('Payment successful!');
      
      // Call success callback
      onPaymentSuccess({
        ...paymentData,
        orderId: order.id,
        amount: total,
        items,
        customer: {
          id: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName
        }
      });

    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentStep('failed');
      
      if (error.message === 'Payment cancelled by user') {
        toast.error('Payment was cancelled');
      } else {
        toast.error('Payment failed. Please try again.');
      }
      
      onPaymentFailure(error);
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentDetails = () => (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (18%):</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-[#B66E41] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#A05A2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Pay ₹{total} with Razorpay
          </>
        )}
      </button>

      {/* Security Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Secure Payment</p>
            <p>Your payment information is encrypted and secure. We never store your card details.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B66E41] mx-auto mb-4"></div>
      <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
      <p className="text-gray-600">Please wait while we process your payment...</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center py-8">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h3>
      <p className="text-gray-600 mb-4">Your order has been placed successfully.</p>
      <button
        onClick={onClose}
        className="bg-[#B66E41] text-white px-6 py-2 rounded-lg hover:bg-[#A05A2E] transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );

  const renderFailed = () => (
    <div className="text-center py-8">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-red-800 mb-2">Payment Failed</h3>
      <p className="text-gray-600 mb-4">Something went wrong with your payment. Please try again.</p>
      <div className="space-x-3">
        <button
          onClick={() => setPaymentStep('details')}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={onClose}
          className="bg-[#B66E41] text-white px-6 py-2 rounded-lg hover:bg-[#A05A2E] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-xl shadow-xl max-w-md mx-auto"
    >
      {/* Header */}
      <div className="bg-[#B66E41] text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Secure Payment</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
        <p className="text-sm opacity-90 mt-1">Powered by Razorpay</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {paymentStep === 'details' && renderPaymentDetails()}
        {paymentStep === 'processing' && renderProcessing()}
        {paymentStep === 'success' && renderSuccess()}
        {paymentStep === 'failed' && renderFailed()}
      </div>
    </motion.div>
  );
};

export default RazorpayPayment;
