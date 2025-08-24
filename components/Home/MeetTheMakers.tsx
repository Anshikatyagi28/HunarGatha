'use client';

import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';

const makers = [{ id: 1, name: "Ustad Ahmed Khan", craft: "Master Perfumer", location: "Kannauj, Uttar Pradesh", experience: "35 years", image: "https://readdy.ai/api/search-image?query=Elderly%20Indian%20artisan%20master%20perfumer%20in%20his%20traditional%20workshop%2C%20wearing%20white%20kurta%2C%20surrounded%20by%20itar%20bottles%20and%20aromatic%20materials%2C%20warm%20golden%20lighting%2C%20wise%20expression%2C%20heritage%20craftsmanship%20portrait&width=300&height=300&seq=ahmed-khan&orientation=squarish", story: "Fifth-generation itar maker preserving ancient fragrance secrets", speciality: "Traditional Mogra & Rose Itar", verified: true, followers: 1247, products: 23 }, { id: 2, name: "Fatima Begum", craft: "Chikankari Expert", location: "Lucknow, Uttar Pradesh", experience: "28 years", image: "https://readdy.ai/api/search-image?query=Elegant%20Indian%20woman%20artisan%20doing%20Chikankari%20embroidery%2C%20wearing%20colorful%20dupatta%2C%20focused%20on%20intricate%20needlework%2C%20traditional%20embroidery%20tools%2C%20soft%20natural%20lighting%2C%20skilled%20craftsperson%20portrait&width=300&height=300&seq=fatima-begum&orientation=squarish", story: "Teaching traditional embroidery to young women in her community", speciality: "Shadow Work & Murri", verified: true, followers: 892, products: 18 }, { id: 3, name: "Rajesh Kumar", craft: "Leather Craftsman", location: "Kanpur, Uttar Pradesh", experience: "22 years", image: "https://readdy.ai/api/search-image?query=Skilled%20Indian%20leather%20craftsman%20in%20his%20workshop%2C%20working%20with%20quality%20leather%2C%20traditional%20tools%2C%20organized%20workspace%20with%20leather%20goods%2C%20warm%20studio%20lighting%2C%20focused%20artisan%20portrait&width=300&height=300&seq=rajesh-kumar&orientation=squarish", story: "Creating sustainable leather goods with eco-friendly techniques", speciality: "Premium Bags & Accessories", verified: true, followers: 1089, products: 31 }, { id: 4, name: "Shyam Lal Weaver", craft: "Silk Weaving Master", location: "Varanasi, Uttar Pradesh", experience: "40 years", image: "https://readdy.ai/api/search-image?query=Traditional%20Indian%20silk%20weaver%20at%20his%20loom%2C%20creating%20Banarasi%20silk%20fabric%2C%20golden%20threads%2C%20intricate%20weaving%20patterns%2C%20focused%20concentration%2C%20heritage%20textile%20craftsmanship%20portrait&width=300&height=300&seq=shyam-lal&orientation=squarish", story: "Keeping alive the ancient art of Banarasi silk weaving", speciality: "Banarasi Silk Sarees", verified: true, followers: 1534, products: 27 },
  //  { id: 5, name: "Mohammad Iqbal", craft: "Brass Artisan", location: "Moradabad, Uttar Pradesh", experience: "30 years", image: "https://readdy.ai/api/search-image?query=Master%20brass%20artisan%20crafting%20ornate%20metalware%2C%20traditional%20hammer%20and%20tools%2C%20golden%20brass%20items%2C%20workshop%20setting%20with%20finished%20products%2C%20warm%20lighting%2C%20skilled%20metalworker%20portrait&width=300&height=300&seq=mohammad-iqbal&orientation=squarish", story: "Fourth-generation brass worker creating contemporary designs", speciality: "Decorative Brassware", verified: true, followers: 756, products: 42 }, { id: 6, name: "Sunita Devi", craft: "Glass Bangle Maker", location: "Firozabad, Uttar Pradesh", experience: "18 years", image: "https://readdy.ai/api/search-image?query=Indian%20woman%20artisan%20creating%20colorful%20glass%20bangles%2C%20bright%20workshop%20with%20glass%20materials%2C%20traditional%20glass-making%20tools%2C%20cheerful%20expression%2C%20colorful%20glass%20work%20environment%20portrait&width=300&height=300&seq=sunita-devi&orientation=squarish", story: "Bringing colors to life through traditional glass craftsmanship", speciality: "Colorful Glass Bangles", verified: true, followers: 634, products: 35 }
  ];

export default function MeetTheMakers() {
  return (
    <section className="py-16 bg-[#F8F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2C2A4A] mb-4">Meet the Makers</h2>
          <p className="text-lg text-[#3A3A3A] max-w-2xl mx-auto">
            Get to know the talented artisans behind every handcrafted piece. Each maker brings
            generations of skill, passion, and authentic stories to their craft.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {makers.map((maker) => (
            <div
              key={maker.id}
              className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image + Experience */}
              <div className="relative inline-block mb-6">
                <img
                  src={maker.image}
                  alt={maker.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                />
                {/* Verified Badge */}
                {maker.verified && (
                  <div className="absolute top-0 right-0">
                    <div className="flex items-center bg-[#4E6E58] text-white p-2 py-2 rounded-full text-sm font-semibold">
                      <i className="ri-shield-check-fill w-3 h-3 flex items-center justify-center "></i>
                      {/* Verified */}
                    </div>
                  </div>
                )}
              </div>
              {/* Location Badge */}
              <div className="absolute top-4 left-4">
                <div className="flex items-center bg-white/90 backdrop-blur-sm text-[#2C2A4A] px-3 py-1 rounded-full text-sm font-medium">
                  <i className="ri-map-pin-line w-3 h-3 flex items-center justify-center mr-1"></i>
                  {maker.location.split(',')[0]}
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-gray-800 mb-1">{maker.name}</h3>
              <p className="text-orange-600 font-semibold mb-2">{maker.craft}</p>





              {/* Story */}
              <blockquote className="text-sm text-gray-700 italic leading-relaxed mb-4">
                "{maker.story}"
              </blockquote>

              {/* Speciality */}
              <div className="flex items-center justify-center text-sm text-[#2C2A4A] font-semibold mb-3">
                <Star className="w-4 h-4 text-yellow-600 mr-1" />
                Speciality: {maker.speciality}
              </div>

              {/* Stats */}
              {/* <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <i className="ri-heart-line"></i>
                  <span>{maker.followers.toLocaleString()} followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="ri-shopping-bag-line"></i>
                  <span>{maker.products} products</span>
                </div>
              </div> */}

              {/* Buttons */}
              <Link
                href={`/artisans/${maker.id}`}
                className="bg-white text-orange-600 px-4 py-2 rounded-full font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm inline-block"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/artisans"
            className="inline-flex items-center px-8 py-3 bg-[#a87333] text-white font-semibold rounded-lg hover:bg-[#b8884d] transition-colors cursor-pointer whitespace-nowrap"
          >
            Meet All Artisans
          </Link>
        </div>
      </div>
    </section>
  );
}
