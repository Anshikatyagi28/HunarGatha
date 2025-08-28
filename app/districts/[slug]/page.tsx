'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, MapPin, Users, Award, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import { districtsData } from '@/data/districtsData';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  description: string;
  artisan: string;
  region: string;
  rating: number;
  reviews: number;
  giTag?: boolean;
}

interface District {
  id: string;
  name: string;
  region: string;
  crafts: string[];
  industryType: string[];
  description?: string;
  artisans?: number;
}

export default function DistrictPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : (Array.isArray(params?.slug) ? params.slug[0] : null);
  const dispatch = useDispatch();

  const [district, setDistrict] = useState<District | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundDistrict = districtsData.find(dist => dist.id === slug);
      if (foundDistrict) {
        setDistrict(foundDistrict);
      }
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!district) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">District not found</h1>
          <Link href="/districts" className="text-blue-600 hover:underline">
            Back to Districts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-900 to-yellow-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/districts"
              className="inline-flex items-center text-white hover:text-blue-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Districts
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {district.name} District
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover the rich heritage and traditional crafts of {district.name}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-2xl p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-blue-900 mb-6">
                About {district.name}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {district.name} is renowned for its rich cultural heritage and traditional craftsmanship.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Traditional Crafts</h3>
                  <div className="space-y-2">
                    {district.crafts.map((craft, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                        {craft}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Industry Types</h3>
                  <div className="space-y-2">
                    {district.industryType.map((type, index) => (
                      <span
                        key={index}
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mr-2 mb-2 ${
                          type.includes('Handicraft') ? 'bg-[#B66E41]/20 text-[#B66E41]' :
                          type.includes('Handloom') ? 'bg-[#4E6E58]/20 text-[#4E6E58]' :
                          'bg-[#D6A400]/20 text-[#D6A400]'
                        }`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-10">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-3xl shadow-2xl p-8 text-center border-4 border-yellow-400/30"
              >
                <div className="mb-6">
                  <i className="ri-map-2-line text-6xl text-yellow-500"></i>
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  {district.name} Heritage
                </h3>
                <p className="text-gray-600 mb-6">
                  Explore the unique cultural heritage and traditional craftsmanship.
                </p>
                
                <div className="mt-8 space-y-3">
                  <Link
                    href="/artisans"
                    className="block w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <i className="ri-team-line mr-2"></i> Meet Artisans
                  </Link>
                  <Link
                    href="/craft-tours"
                    className="block w-full px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-700 hover:text-white transition-all"
                  >
                    <i className="ri-play-circle-fill mr-2"></i> Virtual Tour
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
