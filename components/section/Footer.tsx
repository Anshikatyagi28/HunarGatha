'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/gaatha-logo.png'
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Districts', href: '/districts' },
        { name: 'Categories', href: '/categories' },
        { name: 'Artisans', href: '/artisans' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Categories',
      links: [
        { name: 'Textiles & Clothing', href: '/categories/textiles' },
        { name: 'Home Décor', href: '/categories/decor' },
        { name: 'Jewelry & Accessories', href: '/categories/jewelry' },
        { name: 'Art & Paintings', href: '/categories/art' },
        { name: 'Pottery & Ceramics', href: '/categories/pottery' },
        { name: 'Metalwork', href: '/categories/metalwork' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns & Refunds', href: '/returns' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Track Your Order', href: '/track' },
        { name: 'FAQs', href: '/faqs' },
      ]
    },
    {
      title: 'About',
      links: [
        { name: 'Our Story', href: '/our-story' },
        { name: 'Artisan Partners', href: '/partners' },
        { name: 'Quality Promise', href: '/quality' },
        { name: 'Sustainability', href: '/sustainability' },
        { name: 'Press & Media', href: '/press' },
        { name: 'Careers', href: '/careers' },
      ]
    }
  ];

  return (
    <footer className="bg-green-900 text-amber-50">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              {/* Logo Image from /public */}
              <Image
                src={logo}
                alt="Hunar Gaatha Logo"
                width={48}
                height={48}
                className="rounded-full"
                loading='lazy'
              />
              <div className="text-3xl font-['Pacifico'] text-amber-100">
                Hunar <span className="text-amber-400">Gaatha</span>
              </div>
            </div>

            <p className="text-amber-200 leading-relaxed mb-6">
              Connecting authentic Indian crafts with the world. Every purchase supports
              traditional artisans and preserves cultural heritage for future generations.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400" />
                <span className="text-amber-200">hello@hunargaatha.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <span className="text-amber-200">+91 12345 67890</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span className="text-amber-200">Lucknow, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-lg font-bold mb-4 text-amber-100">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-amber-200 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-green-800 rounded-2xl p-8 mb-12">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2 text-amber-100">Stay Connected</h3>
              <p className="text-amber-200">
                Get updates on new artisan products and exclusive offers
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-green-700 border border-green-600 text-amber-50 placeholder-amber-300 focus:border-amber-400 focus:outline-none"
              />
              <button className="bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-700 transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-amber-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <div className="text-amber-300 text-sm">
                © 2025 Hunar Gaatha. All rights reserved.
              </div>
              <div className="flex items-center space-x-2 text-amber-200">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>for Indian artisans</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-amber-200 hover:text-white transition-colors duration-200 transform hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors duration-200 transform hover:scale-110">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors duration-200 transform hover:scale-110">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors duration-200 transform hover:scale-110">
                <Youtube className="w-6 h-6" />
              </a>
            </div>

            <div className="flex flex-col items-center space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-amber-200 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-amber-200 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
