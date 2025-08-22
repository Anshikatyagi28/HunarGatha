'use client';

import { useState } from 'react';
import Link from 'next/link';
import ArtisanCard from './ArtisanCard';
import ArtisanFilter from './ArtisanFilter';

const artisans = [
  {
    id: 1,
    name: 'Meena Devi',
    photo: 'https://readdy.ai/api/search-image?query=Indian%20female%20artisan%20woman%20craftsperson%20traditional%20dress%20working%20with%20moonj%20grass%20basketry%20weaving%20skilled%20hands%20cultural%20heritage%20authentic%20rural%20background%20handcraft%20maker&width=300&height=300&seq=meena1&orientation=squarish',
    district: 'Amethi',
    craft: 'Moonj Basketry',
    experience: '7 years',
    bio: "I've woven over 1,200 baskets in the past 7 years. My grandmother taught me this ancient art when I was just 12 years old. Each basket carries our family's tradition and the stories of our village.",
    specialties: ['Traditional Baskets', 'Storage Containers', 'Decorative Items'],
    badges: ['Master Artisan', 'Origin Verified', 'Trainer'],
    products: 45,
    rating: 4.9,
    reviews: 234,
    totalSales: 1250,
    contact: {
      whatsapp: '+91-9876543210',
      email: 'meena.moonj@gmail.com'
    },
    videoUrl: 'https://example.com/meena-video',
    voiceClip: 'https://example.com/meena-voice'
  },
  {
    id: 2,
    name: 'Ustad Ahmed Khan',
    photo: 'https://readdy.ai/api/search-image?query=Indian%20male%20master%20perfumer%20artisan%20traditional%20kurta%20working%20with%20itar%20perfume%20oils%20Kannauj%20heritage%20craft%20cultural%20background%20skilled%20craftsman%20authentic%20traditional%20setting&width=300&height=300&seq=ahmed1&orientation=squarish',
    district: 'Kannauj',
    craft: 'Itar & Perfumes',
    experience: '25 years',
    bio: "For over two decades, I've been creating natural attars using traditional distillation methods passed down through generations. Each fragrance tells the story of our ancient perfumery heritage.",
    specialties: ['Rose Attar', 'Sandalwood Oil', 'Jasmine Essence'],
    badges: ['Master Artisan', 'Origin Verified'],
    products: 89,
    rating: 4.8,
    reviews: 456,
    totalSales: 2890,
    contact: {
      whatsapp: '+91-9876543211',
      email: 'ustad.ahmed@kannaujitar.com'
    },
    videoUrl: 'https://example.com/ahmed-video',
    voiceClip: 'https://example.com/ahmed-voice'
  },
  {
    id: 3,
    name: 'Fatima Begum',
    photo: 'https://readdy.ai/api/search-image?query=Indian%20Muslim%20woman%20artisan%20chikankari%20embroidery%20traditional%20dress%20working%20with%20white%20fabric%20delicate%20threadwork%20Lucknow%20heritage%20cultural%20background%20skilled%20craftswoman%20authentic&width=300&height=300&seq=fatima1&orientation=squarish',
    district: 'Lucknow',
    craft: 'Chikankari Embroidery',
    experience: '15 years',
    bio: "Chikankari is not just embroidery for me, it's poetry written in thread. I learned this art from my mother-in-law and have been creating intricate designs that celebrate our Lucknow heritage.",
    specialties: ['Shadow Work', 'Phanda Stitch', 'Murri Work'],
    badges: ['Master Artisan', 'Origin Verified', 'Trainer'],
    products: 67,
    rating: 4.9,
    reviews: 312,
    totalSales: 1876,
    contact: {
      whatsapp: '+91-9876543212',
      email: 'fatima.chikan@gmail.com'
    },
    videoUrl: 'https://example.com/fatima-video',
    voiceClip: 'https://example.com/fatima-voice'
  },
  {
    id: 4,
    name: 'Ramesh Kumar',
    photo: 'https://readdy.ai/api/search-image?query=Indian%20male%20potter%20artisan%20traditional%20dress%20working%20with%20clay%20pottery%20wheel%20rural%20background%20skilled%20hands%20cultural%20heritage%20authentic%20craftsman%20black%20pottery%20Azamgarh&width=300&height=300&seq=ramesh1&orientation=squarish',
    district: 'Azamgarh',
    craft: 'Black Pottery',
    experience: '12 years',
    bio: "Every piece of clay speaks to me. I specialize in traditional black pottery, a craft that requires patience and deep understanding of the earth. My work connects people to our ancient traditions.",
    specialties: ['Black Pottery Vases', 'Traditional Diyas', 'Decorative Items'],
    badges: ['Origin Verified', 'Eco Artisan'],
    products: 78,
    rating: 4.7,
    reviews: 189,
    totalSales: 987,
    contact: {
      whatsapp: '+91-9876543213'
    },
    videoUrl: 'https://example.com/ramesh-video',
    voiceClip: 'https://example.com/ramesh-voice'
  },
  {
    id: 5,
    name: 'Shyam Lal Weaver',
    photo: 'https://readdy.ai/api/search-image?query=Indian%20male%20weaver%20artisan%20traditional%20handloom%20silk%20weaving%20Banarasi%20textile%20work%20cultural%20heritage%20Varanasi%20authentic%20craftsman%20skilled%20hands%20traditional%20background&width=300&height=300&seq=shyam1&orientation=squarish',
    district: 'Varanasi',
    craft: 'Banarasi Silk Weaving',
    experience: '30 years',
    bio: "Three decades of weaving dreams into silk. My family has been weaving Banarasi silk for four generations. Each saree takes weeks to complete and carries the soul of Varanasi in its threads.",
    specialties: ['Wedding Sarees', 'Silk Dupattas', 'Brocade Work'],
    badges: ['Master Artisan', 'Origin Verified', 'Heritage Keeper'],
    products: 34,
    rating: 4.9,
    reviews: 278,
    totalSales: 3456,
    contact: {
      whatsapp: '+91-9876543214',
      email: 'shyam.weaver@banarasi.com'
    },
    videoUrl: 'https://example.com/shyam-video',
    voiceClip: 'https://example.com/shyam-voice'
  },
  {
    id: 6,
    name: 'Mohammad Iqbal',
    photo: 'https://readdy.ai/api/search-image?query=Indian%20Muslim%20male%20brass%20artisan%20traditional%20dress%20working%20with%20metal%20brassware%20engraving%20Moradabad%20heritage%20craft%20cultural%20background%20skilled%20craftsman%20authentic%20traditional%20setting&width=300&height=300&seq=iqbal1&orientation=squarish',
    district: 'Moradabad',
    craft: 'Brassware',
    experience: '20 years',
    bio: "Brass is my canvas and hammer is my brush. For twenty years, I've been creating intricate brassware that reflects the rich heritage of Moradabad. Each piece is a labor of love and tradition.",
    specialties: ['Decorative Plates', 'Brass Sculptures', 'Traditional Utensils'],
    badges: ['Master Artisan', 'Origin Verified'],
    products: 92,
    rating: 4.8,
    reviews: 203,
    totalSales: 1654,
    contact: {
      whatsapp: '+91-9876543215'
    },
    videoUrl: 'https://example.com/iqbal-video',
    voiceClip: 'https://example.com/iqbal-voice'
  }
];

const crafts = ['All Crafts', 'Moonj Basketry', 'Itar & Perfumes', 'Chikankari Embroidery', 'Black Pottery', 'Banarasi Silk Weaving', 'Brassware'];
const districts = ['All Districts', 'Amethi', 'Kannauj', 'Lucknow', 'Azamgarh', 'Varanasi', 'Moradabad'];
const badges = ['All Badges', 'Master Artisan', 'Origin Verified', 'Trainer', 'Heritage Keeper', 'Eco Artisan'];

export default function ArtisansPage() {
  const [selectedCraft, setSelectedCraft] = useState('All Crafts');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedBadge, setSelectedBadge] = useState('All Badges');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredArtisans = artisans.filter(artisan => {
    const matchesCraft = selectedCraft === 'All Crafts' || artisan.craft === selectedCraft;
    const matchesDistrict = selectedDistrict === 'All Districts' || artisan.district === selectedDistrict;
    const matchesBadge = selectedBadge === 'All Badges' || artisan.badges.includes(selectedBadge);
    const matchesSearch = artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artisan.craft.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artisan.district.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCraft && matchesDistrict && matchesBadge && matchesSearch;
  });

  const sortedArtisans = [...filteredArtisans].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'experience':
        return parseInt(b.experience) - parseInt(a.experience);
      case 'rating':
        return b.rating - a.rating;
      case 'products':
        return b.products - a.products;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-[#F8F3EC]">


      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-[#bf7933] text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Meet the Makers
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Discover the faces behind India's finest crafts. Each artisan brings generations of skill, 
                passion, and cultural heritage to create authentic masterpieces.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <input
                  type="text"
                  placeholder="Search artisans by name, craft, or district..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:bg-white/20"
                />
                <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5 flex items-center justify-center"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={selectedCraft}
                onChange={(e) => setSelectedCraft(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B66E41] pr-8"
              >
                {crafts.map(craft => (
                  <option key={craft} value={craft}>{craft}</option>
                ))}
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B66E41] pr-8"
              >
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>

              <select
                value={selectedBadge}
                onChange={(e) => setSelectedBadge(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B66E41] pr-8"
              >
                {badges.map(badge => (
                  <option key={badge} value={badge}>{badge}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B66E41] pr-8"
              >
                <option value="featured">Featured</option>
                <option value="name">Name (A-Z)</option>
                <option value="experience">Experience</option>
                <option value="rating">Rating</option>
                <option value="products">Products</option>
              </select>

              <div className="ml-auto flex items-center space-x-2 text-sm text-gray-600">
                <span>Showing {sortedArtisans.length} artisan{sortedArtisans.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Artisan Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {sortedArtisans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedArtisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-user-search-line w-8 h-8 flex items-center justify-center text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No artisans found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setSelectedCraft('All Crafts');
                  setSelectedDistrict('All Districts');
                  setSelectedBadge('All Badges');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2 bg-[#B66E41] text-white rounded-lg hover:bg-[#A55A35] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-[#a35321] py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Are You an Artisan?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join HunarGaatha and share your craft with the world. Connect with customers who value authentic, handmade products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/collaborate"
                className="px-8 py-3 bg-white text-[#B66E41] rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                Join as Artisan
              </Link>
              <Link
                href="/ngo-portal"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#B66E41] transition-colors whitespace-nowrap cursor-pointer"
              >
                NGO Partnership
              </Link>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
} 