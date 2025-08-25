"use client"

import React, { useEffect } from 'react';
import {
  X,
  Star,
  Heart,
  ShoppingCart,
  MapPin,
  Shield,
  Award,
  Package,
  Truck,
  RotateCcw,
  CreditCard
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem as addToCart, selectCartItems, selectIsInCart } from '@/store/cartSlice';
import { addItem as addToWishlist, removeItem as removeFromWishlist, selectWishlistItems, selectIsInWishlist } from '@/store/wishlistSlice';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  price: string | number;
  originalPrice: string | number;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  badge: string;
  description?: string;
  artisan?: {
    name: string;
    image: string;
    experience: string;
    story: string;
  };
  features?: string[];
  specifications?: { [key: string]: string };
  gallery?: string[];
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);

  // Helper functions
  const isInCart = (productId: number) => cartItems.some((item: any) => item.id === productId);
  const isInWishlist = (productId: number) => wishlistItems.some((item: any) => item.id === productId);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  // Render stars
  const renderStars = (rating: number) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star key={star} className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
      ))}
    </div>
  );

  // Enhanced product data with defaults
  const enhanced = {
    ...product,
    description: product.description || "This exquisite handcrafted piece represents the finest traditions of Indian artisanship.",
    artisan: product.artisan || {
      name: "Master Craftsperson",
      image: "https://images.pexels.com/photos/8108197/pexels-photo-8108197.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      experience: "20+ years",
      story: "A dedicated artisan preserving traditional craft techniques for over two decades."
    },
    features: product.features || [
      "100% Handcrafted",
      "Authentic Traditional Design",
      "Premium Quality Materials",
      "Eco-Friendly Process",
      "Cultural Heritage Certified"
    ],
    specifications: product.specifications || {
      Material: "Premium Quality",
      Origin: product.location,
      "Craft Type": "Traditional Handwork",
      "Care Instructions": "Handle with care",
      Authenticity: "Verified"
    },
    gallery: product.gallery || Array(4).fill(product.image)
  };

  // Calculate discount
  const parsePrice = (value: string | number) => {
    const str = value?.toString() || '0';
    return parseInt(str.replace(/[₹,]/g, ''), 10);
  };
  
  const discountPercent = Math.round(
    ((parsePrice(enhanced.originalPrice) - parsePrice(enhanced.price)) /
      parsePrice(enhanced.originalPrice)) *
      100
  );

  // Format price for display
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[₹,]/g, '')) : price;
    return `₹${numPrice.toLocaleString()}`;
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      if (isInCart(product.id)) {
        toast(`${product.name} is already in cart`);
      } else {
        dispatch(addToCart({ product, quantity: 1 }));
        toast.success(`${product.name} added to cart`);
      }
    }
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        dispatch(removeFromWishlist(product.id));
        toast.success(`${product.name} removed from wishlist`);
      } else {
        dispatch(addToWishlist(product));
        toast.success(`${product.name} added to wishlist`);
      }
    }
  };


  return (
    <div className="fixed overflow-auto inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-full overflow-y-auto">
          {/* Left - Images */}
          <div className="lg:w-1/2 p-8 overflow-y-auto">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative overflow-y-auto rounded-2xl bg-gray-100 aspect-square">
                <img
                  src={enhanced.image}
                  alt={enhanced.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">{enhanced.badge}</span>
                <button 
                  onClick={handleWishlistToggle}
                  className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(enhanced.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </button>
              </div>

              {/* Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {enhanced.gallery.map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-y-auto bg-gray-100 cursor-pointer hover:opacity-75 transition-opacity">
                    <img src={img} alt={`${enhanced.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Details */}
          <div className="lg:w-1/2 p-8 overflow-y-auto space-y-6">
            {/* Location & Title */}
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">{enhanced.location}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{enhanced.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-4">
              {renderStars(enhanced.rating)}
              <span className="text-sm text-gray-600">{enhanced.rating} ({enhanced.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-gray-800">{formatPrice(enhanced.price)}</span>
              <span className="text-xl text-gray-500 line-through">{formatPrice(enhanced.originalPrice)}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">Save {discountPercent}%</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">{enhanced.description}</p>

            {/* Features */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 gap-2">
                {enhanced.features.map((f, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Specifications</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                {Object.entries(enhanced.specifications).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">{k}:</span>
                    <span className="text-sm text-gray-800">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Artisan Info */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Meet the Artisan</h3>
              <div className="flex items-start space-x-4">
                <img src={enhanced.artisan.image} alt={enhanced.artisan.name} className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{enhanced.artisan.name}</h4>
                  <p className="text-sm text-orange-600 font-medium mb-2">{enhanced.artisan.experience} Experience</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{enhanced.artisan.story}</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <span className="text-xs font-medium text-blue-800">Authenticity Verified</span>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <span className="text-xs font-medium text-green-800">Quality Assured</span>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-xl">
                <Package className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <span className="text-xs font-medium text-purple-800">Secure Packaging</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{isInCart(enhanced.id) ? 'Already in Cart' : 'Add to Cart'}</span>
              </button>
              <button 
                onClick={handleWishlistToggle}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isInWishlist(enhanced.id) 
                    ? 'bg-red-50 border-2 border-red-500 text-red-600 hover:bg-red-100' 
                    : 'bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(enhanced.id) ? 'fill-current' : ''}`} />
                <span>{isInWishlist(enhanced.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Delivery & Payment */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3"><Truck className="w-5 h-5 text-green-600" /><span className="text-sm text-gray-700">Free delivery on orders above ₹999</span></div>
              <div className="flex items-center space-x-3"><RotateCcw className="w-5 h-5 text-blue-600" /><span className="text-sm text-gray-700">7-day easy returns</span></div>
              <div className="flex items-center space-x-3"><CreditCard className="w-5 h-5 text-purple-600" /><span className="text-sm text-gray-700">COD & UPI payments accepted</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
