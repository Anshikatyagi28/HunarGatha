'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  Lock,
} from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '@/store/cartSlice';
import { createRazorpayOrder, openRazorpayCheckout } from "@/lib/payment";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type TextChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

interface InputWithIconProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: InputChangeEvent) => void;
  icon?: React.ReactNode;
  type?: string;
}

// Assuming these are defined elsewhere
const InputWithIcon = ({ label, name, value, onChange, icon, type = "text" }: InputWithIconProps) => (
  <div>
    <label className="block text-sm font-medium text-[#2C2A4A] mb-2">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-3">{icon}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B66E41]"
      />
    </div>
  </div>
);

interface InputSimpleProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: InputChangeEvent) => void;
  type?: string;
  placeholder?: string;
  className?: string;
}

const InputSimple = ({ label, name, value, onChange, type = "text", placeholder = "", className = "" }: InputSimpleProps) => (
  <div className={className}>
    <label className="block text-sm font-medium text-[#2C2A4A] mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B66E41]"
    />
  </div>
);

interface SummaryRowProps {
  label: string;
  value: number | string;
  bold?: boolean;
  highlight?: boolean;
}

const SummaryRow = ({ label, value, bold = false, highlight = false }: SummaryRowProps) => (
  <div className={`flex justify-between ${bold ? "text-xl font-bold text-[#2C2A4A]" : ""}`}>
    <span className="text-[#3A3A3A]">{label}</span>
    <span className={`${highlight ? "text-[#4E6E58] font-semibold" : "font-semibold"}`}>
      {typeof value === "number" ? `₹${value.toLocaleString()}` : value}
    </span>
  </div>
);

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "razorpay",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: InputChangeEvent | TextChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    const paymentInfo = {
      name: formData.fullName,
      email: formData.email,
      contact: formData.phone,
    } as any;

    try {
      if (formData.paymentMethod === "razorpay") {
        const order = await createRazorpayOrder({ amount: total, currency: "INR" });
        const result: any = await openRazorpayCheckout(order, paymentInfo);
        // Verify signature on server
        const verifyRes = await fetch('/api/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result)
        });
        if (!verifyRes.ok) throw new Error('Signature verification failed');
        const { valid } = await verifyRes.json();
        if (!valid) throw new Error('Invalid payment');
        console.log("✅ Razorpay Payment Verified:", result);
        dispatch(clearCart());
        alert("✅ Order placed successfully!");
      } else {
        // Handle COD or other methods
        await new Promise((res) => setTimeout(res, 2000));
        alert("✅ Order placed successfully!");
      }
    } catch (err) {
      console.error("Payment failed:", err);
      setError("Payment failed. Please try again.");
      alert("❌ Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-20">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#2C2A4A] mb-8">Checkout</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePayment();
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left: Shipping + Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#2C2A4A] mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6" />
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputWithIcon label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} icon={<User className="h-5 w-5 text-gray-400" />} />
                <InputWithIcon label="Email" name="email" type="email" value={formData.email} onChange={handleChange} icon={<Mail className="h-5 w-5 text-gray-400" />} />
                <InputWithIcon label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} icon={<Phone className="h-5 w-5 text-gray-400" />} />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2C2A4A] mb-2">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B66E41]"
                  />
                </div>
                <InputSimple label="City" name="city" value={formData.city} onChange={handleChange} />
                <InputSimple label="State" name="state" value={formData.state} onChange={handleChange} />
                <InputSimple label="PIN Code" name="pincode" value={formData.pincode} onChange={handleChange} />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#2C2A4A] mb-6 flex items-center gap-2">
                <CreditCard className="h-6 w-6" />
                Payment Method
              </h2>
              <div className="space-y-4 mb-6">
                {["razorpay", "cod"].map((method) => (
                  <label key={method} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleChange}
                      className="text-[#B66E41]"
                    />
                    <span className="capitalize">{method === "cod" ? "Cash on Delivery" : "Razorpay"}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#2C2A4A] mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <hr className="border-gray-200 mb-4" />
              <div className="space-y-2 mb-6">
                <SummaryRow label="Subtotal" value={subtotal} />
                <SummaryRow label="Shipping" value="Free" highlight />
                <SummaryRow label="Tax (18%)" value={tax} />
                <hr />
                <SummaryRow label="Total" value={total} bold />
              </div>

              {error && <p className="text-red-500 text-center mb-4">{error}</p>}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#D6A400] text-[#2C2A4A] py-4 rounded-full font-bold text-lg hover:bg-[#B8900A] disabled:opacity-50"
              >
                <Lock className="h-5 w-5 inline-block mr-2" />
                {loading ? "Processing..." : "Place Order"}
              </motion.button>

              <p className="text-center text-xs text-gray-500 mt-4">
                🔒 Your payment information is secure
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}