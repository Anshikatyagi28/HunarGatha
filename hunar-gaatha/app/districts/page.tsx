'use client';

import { useState } from 'react';
import Link from 'next/link';
import DistrictMap from './DistrictMap';
import DistrictInfo from './DistrictInfo';

const districtsData = [
  {
    id: 1,
    name: "Kannauj",
    region: "Central UP",
    crafts: ["Itar & Perfumes"],
    industryType: "Handicraft",
    artisan: {
      name: "Ustad Ahmed Khan",
      image: "https://readdy.ai/api/search-image?query=Elderly%20Indian%20master%20perfumer%20artisan%20in%20traditional%20white%20kurta%2C%20working%20with%20itar%20bottles%20in%20Kannauj%20workshop%2C%20warm%20golden%20lighting%2C%20heritage%20craftsmanship%20portrait%2C%20wise%20experienced%20craftsman&width=120&height=120&seq=ahmed-kannauj&orientation=squarish",
      specialty: "Traditional Mogra & Rose Itar"
    },
    products: [
      { name: "Royal Mogra Itar", price: "₹2,850", image: "https://readdy.ai/api/search-image?query=Premium%20mogra%20itar%20bottle%20with%20golden%20cap%2C%20traditional%20perfume%20vessel%2C%20elegant%20glass%20container%2C%20aromatic%20flowers%2C%20luxury%20fragrance%20showcase%2C%20warm%20amber%20lighting&width=200&height=200&seq=mogra-itar&orientation=squarish" },
      { name: "Attar Rose Collection", price: "₹3,200", image: "https://readdy.ai/api/search-image?query=Collection%20of%20rose%20attar%20bottles%2C%20traditional%20perfume%20set%2C%20elegant%20glass%20vessels%2C%20pink%20roses%2C%20heritage%20fragrance%20display%2C%20golden%20accents&width=200&height=200&seq=rose-attar&orientation=squarish" },
      { name: "Jasmine Essence", price: "₹2,400", image: "https://readdy.ai/api/search-image?query=Jasmine%20essence%20bottle%20with%20white%20flowers%2C%20traditional%20itar%20container%2C%20pure%20fragrance%2C%20elegant%20perfume%20vessel%2C%20natural%20aromatic%20showcase&width=200&height=200&seq=jasmine-itar&orientation=squarish" }
    ],
    description: "Known as the perfume capital of India, Kannauj has been creating exquisite itars for over 400 years.",
    festivals: ["Itar Mahotsav (March)"],
    coordinates: { x: 45, y: 35 }
  },
  {
    id: 2,
    name: "Lucknow",
    region: "Central UP", 
    crafts: ["Chikankari", "Zardozi"],
    industryType: "Handloom + Handicraft",
    artisan: {
      name: "Fatima Begum",
      image: "https://readdy.ai/api/search-image?query=Skilled%20Indian%20woman%20artisan%20doing%20Chikankari%20embroidery%2C%20wearing%20colorful%20dupatta%2C%20traditional%20needlework%2C%20focused%20craftswoman%2C%20heritage%20textile%20work%2C%20soft%20natural%20lighting&width=120&height=120&seq=fatima-lucknow&orientation=squarish",
      specialty: "Shadow Work & Murri"
    },
    products: [
      { name: "Chikan Kurta Set", price: "₹4,500", image: "https://readdy.ai/api/search-image?query=White%20Chikankari%20kurta%20with%20intricate%20embroidery%2C%20traditional%20Indian%20garment%2C%20delicate%20threadwork%20patterns%2C%20elegant%20clothing%20showcase%2C%20soft%20fabric%20texture&width=200&height=200&seq=chikan-kurta&orientation=squarish" },
      { name: "Zardozi Dupatta", price: "₹6,800", image: "https://readdy.ai/api/search-image?query=Golden%20Zardozi%20embroidered%20dupatta%2C%20rich%20metallic%20threadwork%2C%20luxurious%20Indian%20textile%2C%20traditional%20gold%20embroidery%2C%20elegant%20fabric%20showcase&width=200&height=200&seq=zardozi-dupatta&orientation=squarish" },
      { name: "Chikan Saree", price: "₹8,200", image: "https://readdy.ai/api/search-image?query=Beautiful%20Chikankari%20saree%20with%20white%20embroidery%2C%20traditional%20Indian%20clothing%2C%20elegant%20draping%2C%20delicate%20needlework%2C%20heritage%20textile%20showcase&width=200&height=200&seq=chikan-saree&orientation=squarish" }
    ],
    description: "The city of Nawabs is famous for its delicate Chikankari embroidery and opulent Zardozi work.",
    festivals: ["Lucknow Mahotsav (November-December)"],
    coordinates: { x: 42, y: 28 }
  },
  {
    id: 3,
    name: "Kanpur",
    region: "Central UP",
    crafts: ["Leather Goods"],
    industryType: "Manufacturing",
    artisan: {
      name: "Rajesh Kumar",
      image: "https://readdy.ai/api/search-image?query=Expert%20Indian%20leather%20craftsman%20in%20his%20workshop%2C%20working%20with%20premium%20leather%2C%20traditional%20tools%2C%20skilled%20artisan%2C%20quality%20craftsmanship%2C%20warm%20studio%20lighting&width=120&height=120&seq=rajesh-kanpur&orientation=squarish",
      specialty: "Premium Bags & Accessories"
    },
    products: [
      { name: "Executive Briefcase", price: "₹12,500", image: "https://readdy.ai/api/search-image?query=Premium%20leather%20briefcase%2C%20executive%20bag%2C%20professional%20leather%20goods%2C%20rich%20brown%20finish%2C%20quality%20craftsmanship%2C%20business%20accessories%20showcase&width=200&height=200&seq=leather-briefcase&orientation=squarish" },
      { name: "Leather Wallet Set", price: "₹3,800", image: "https://readdy.ai/api/search-image?query=Handcrafted%20leather%20wallet%20set%2C%20premium%20leather%20accessories%2C%20brown%20leather%20goods%2C%20traditional%20craftsmanship%2C%20elegant%20design%20showcase&width=200&height=200&seq=leather-wallet&orientation=squarish" },
      { name: "Travel Duffle", price: "₹8,900", image: "https://readdy.ai/api/search-image?query=Large%20leather%20travel%20duffle%20bag%2C%20premium%20luggage%2C%20quality%20leather%20goods%2C%20traditional%20craftsmanship%2C%20travel%20accessories%20showcase&width=200&height=200&seq=leather-duffle&orientation=squarish" }
    ],
    description: "India's leather capital, known for producing high-quality leather goods exported worldwide.",
    festivals: ["Leather Fair (February)"],
    coordinates: { x: 38, y: 32 }
  },
  {
    id: 4,
    name: "Varanasi",
    region: "Eastern UP",
    crafts: ["Banarasi Silk", "Brassware"],
    industryType: "Handloom + Handicraft",
    artisan: {
      name: "Shyam Lal Weaver",
      image: "https://readdy.ai/api/search-image?query=Traditional%20Indian%20silk%20weaver%20at%20his%20loom%2C%20creating%20Banarasi%20silk%2C%20golden%20threads%2C%20master%20craftsman%2C%20heritage%20textile%20work%2C%20focused%20concentration&width=120&height=120&seq=shyam-varanasi&orientation=squarish",
      specialty: "Banarasi Silk Sarees"
    },
    products: [
      { name: "Pure Silk Saree", price: "₹15,000", image: "https://readdy.ai/api/search-image?query=Luxurious%20Banarasi%20silk%20saree%20with%20golden%20patterns%2C%20traditional%20Indian%20clothing%2C%20rich%20fabric%2C%20intricate%20weaving%2C%20heritage%20textile%20showcase&width=200&height=200&seq=banarasi-saree&orientation=squarish" },
      { name: "Silk Dupatta", price: "₹4,200", image: "https://readdy.ai/api/search-image?query=Golden%20Banarasi%20silk%20dupatta%2C%20traditional%20Indian%20textile%2C%20metallic%20threadwork%2C%20elegant%20fabric%2C%20heritage%20weaving%20showcase&width=200&height=200&seq=silk-dupatta&orientation=squarish" },
      { name: "Brass Temple Bell", price: "₹1,800", image: "https://readdy.ai/api/search-image?query=Traditional%20brass%20temple%20bell%20from%20Varanasi%2C%20ornate%20metalwork%2C%20religious%20artifact%2C%20golden%20brass%20finish%2C%20spiritual%20craftsmanship&width=200&height=200&seq=brass-bell&orientation=squarish" }
    ],
    description: "The spiritual capital combines sacred silk weaving traditions with ancient brassware craftsmanship.",
    festivals: ["Ganga Aarti (Daily)", "Dev Deepawali (November)"],
    coordinates: { x: 52, y: 38 }
  },
  {
    id: 5,
    name: "Azamgarh",
    region: "Eastern UP",
    crafts: ["Black Pottery", "Reshmi Saari"],
    industryType: "Handicraft + Handloom",
    artisan: {
      name: "Ramesh Ji",
      image: "https://readdy.ai/api/search-image?query=Master%20Indian%20potter%20creating%20black%20pottery%2C%20traditional%20clay%20work%2C%20skilled%20artisan%20at%20pottery%20wheel%2C%20heritage%20ceramic%20craftsmanship%2C%20warm%20workshop%20lighting&width=120&height=120&seq=ramesh-azamgarh&orientation=squarish",
      specialty: "Traditional Black Pottery"
    },
    products: [
      { name: "Black Clay Diya", price: "₹150", image: "https://readdy.ai/api/search-image?query=Traditional%20black%20clay%20diya%20lamp%2C%20handcrafted%20pottery%2C%20festival%20lighting%2C%20cultural%20ceramic%20work%2C%20authentic%20Indian%20earthenware&width=200&height=200&seq=black-diya&orientation=squarish" },
      { name: "Kulhad Set", price: "₹400", image: "https://readdy.ai/api/search-image?query=Set%20of%20black%20pottery%20kulhads%2C%20traditional%20tea%20cups%2C%20handmade%20ceramic%20vessels%2C%20cultural%20drinkware%2C%20authentic%20Indian%20pottery&width=200&height=200&seq=kulhad-set&orientation=squarish" },
      { name: "Flower Pot", price: "₹800", image: "https://readdy.ai/api/search-image?query=Black%20pottery%20flower%20pot%2C%20decorative%20ceramic%20planter%2C%20traditional%20Indian%20pottery%2C%20handcrafted%20garden%20vessel%2C%20cultural%20home%20decor&width=200&height=200&seq=pottery-pot&orientation=squarish" }
    ],
    description: "Famous for unique black pottery and fine silk weaving, keeping ancient techniques alive.",
    festivals: ["Pottery Festival (January)"],
    coordinates: { x: 55, y: 32 }
  },
  {
    id: 6,
    name: "Moradabad",
    region: "Western UP",
    crafts: ["Brassware", "Metal Handicrafts"],
    industryType: "Handicraft + Manufacturing",
    artisan: {
      name: "Mohammad Iqbal",
      image: "https://readdy.ai/api/search-image?query=Master%20brass%20artisan%20crafting%20ornate%20metalware%2C%20traditional%20hammer%20and%20tools%2C%20golden%20brass%20work%2C%20skilled%20metalworker%2C%20heritage%20craftsmanship%20portrait&width=120&height=120&seq=iqbal-moradabad&orientation=squarish",
      specialty: "Decorative Brassware"
    },
    products: [
      { name: "Brass Vase Set", price: "₹2,500", image: "https://readdy.ai/api/search-image?query=Ornate%20brass%20vase%20set%2C%20decorative%20metalware%2C%20traditional%20Indian%20handicrafts%2C%20golden%20brass%20finish%2C%20elegant%20home%20decor%20showcase&width=200&height=200&seq=brass-vase&orientation=squarish" },
      { name: "Metal Tray", price: "₹1,800", image: "https://readdy.ai/api/search-image?query=Decorative%20brass%20serving%20tray%2C%20ornate%20metalwork%2C%20traditional%20Indian%20handicrafts%2C%20golden%20finish%2C%20cultural%20dining%20accessories&width=200&height=200&seq=brass-tray&orientation=squarish" },
      { name: "Candle Holders", price: "₹1,200", image: "https://readdy.ai/api/search-image?query=Brass%20candle%20holders%20set%2C%20decorative%20metalware%2C%20traditional%20lighting%2C%20ornate%20design%2C%20cultural%20home%20accessories&width=200&height=200&seq=candle-holders&orientation=squarish" }
    ],
    description: "Known as Brass City, Moradabad is the hub for metal handicrafts and export-quality brassware.",
    festivals: ["Handicrafts Fair (October)"],
    coordinates: { x: 35, y: 22 }
  },
  {
    id: 7,
    name: "Firozabad",
    region: "Western UP",
    crafts: ["Glassware", "Glass Bangles"],
    industryType: "Manufacturing + Handicraft",
    artisan: {
      name: "Sunita Devi",
      image: "https://readdy.ai/api/search-image?query=Indian%20woman%20artisan%20creating%20colorful%20glass%20bangles%2C%20bright%20workshop%20setting%2C%20traditional%20glass%20work%2C%20skilled%20craftswoman%2C%20cheerful%20expression&width=120&height=120&seq=sunita-firozabad&orientation=squarish",
      specialty: "Colorful Glass Bangles"
    },
    products: [
      { name: "Bangle Set", price: "₹800", image: "https://readdy.ai/api/search-image?query=Colorful%20glass%20bangles%20set%2C%20traditional%20Indian%20jewelry%2C%20sparkling%20glasswork%2C%20rainbow%20colors%2C%20cultural%20accessories%20showcase&width=200&height=200&seq=glass-bangles&orientation=squarish" },
      { name: "Glass Lamp", price: "₹1,500", image: "https://readdy.ai/api/search-image?query=Decorative%20glass%20lamp%2C%20colorful%20lighting%2C%20traditional%20glassware%2C%20handcrafted%20lighting%20fixture%2C%20beautiful%20home%20decor&width=200&height=200&seq=glass-lamp&orientation=squarish" },
      { name: "Decorative Vase", price: "₹1,200", image: "https://readdy.ai/api/search-image?query=Beautiful%20glass%20vase%20with%20colorful%20patterns%2C%20decorative%20glassware%2C%20traditional%20craftsmanship%2C%20elegant%20home%20accessories&width=200&height=200&seq=glass-vase&orientation=squarish" }
    ],
    description: "The Glass City of India, famous for producing beautiful glass bangles and decorative glassware.",
    festivals: ["Glass Festival (March)"],
    coordinates: { x: 40, y: 25 }
  },
  {
    id: 8,
    name: "Agra",
    region: "Western UP",
    crafts: ["Marble Inlay", "Leather Goods"],
    industryType: "Handicraft + Manufacturing",
    artisan: {
      name: "Taj Ahmed",
      image: "https://readdy.ai/api/search-image?query=Master%20artisan%20working%20on%20marble%20inlay%20art%2C%20traditional%20Taj%20Mahal%20style%20craftsmanship%2C%20intricate%20stone%20work%2C%20skilled%20craftsman%2C%20heritage%20art%20techniques&width=120&height=120&seq=taj-agra&orientation=squarish",
      specialty: "Pietra Dura Marble Work"
    },
    products: [
      { name: "Marble Jewelry Box", price: "₹4,500", image: "https://readdy.ai/api/search-image?query=Marble%20jewelry%20box%20with%20inlay%20work%2C%20Taj%20Mahal%20style%20craftsmanship%2C%20white%20marble%20with%20colorful%20stone%20patterns%2C%20elegant%20storage&width=200&height=200&seq=marble-box&orientation=squarish" },
      { name: "Decorative Plate", price: "₹2,800", image: "https://readdy.ai/api/search-image?query=Marble%20decorative%20plate%20with%20inlay%20patterns%2C%20traditional%20Agra%20craftsmanship%2C%20ornate%20stone%20work%2C%20cultural%20art%20piece&width=200&height=200&seq=marble-plate&orientation=squarish" },
      { name: "Mini Taj Replica", price: "₹6,500", image: "https://readdy.ai/api/search-image?query=Miniature%20Taj%20Mahal%20marble%20replica%2C%20white%20marble%20craftsmanship%2C%20detailed%20architecture%2C%20traditional%20souvenir%2C%20cultural%20artifact&width=200&height=200&seq=taj-replica&orientation=squarish" }
    ],
    description: "Home to the Taj Mahal, Agra specializes in exquisite marble inlay work and fine leather crafts.",
    festivals: ["Taj Mahotsav (February)"],
    coordinates: { x: 32, y: 28 }
  }
];

export default function DistrictsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8F3EC]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#2C2A4A] mb-4">
              Explore Crafts by Region
            </h1>
            <p className="text-lg text-[#3A3A3A] max-w-3xl mx-auto">
              Discover the rich heritage of Uttar Pradesh through its traditional crafts. 
              Click on any district to explore authentic artisans and their masterpieces.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#2C2A4A] mb-6 text-center">
                Uttar Pradesh Craft Map
              </h2>
              <DistrictMap 
                districts={districtsData}
                selectedDistrict={selectedDistrict}
                hoveredDistrict={hoveredDistrict}
                onDistrictClick={setSelectedDistrict}
                onDistrictHover={setHoveredDistrict}
              />
              
              {/* Map Legend */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#B66E41] rounded-full mr-2"></div>
                  <span className="text-sm text-[#3A3A3A]">Handicraft</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#4E6E58] rounded-full mr-2"></div>
                  <span className="text-sm text-[#3A3A3A]">Handloom</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#D6A400] rounded-full mr-2"></div>
                  <span className="text-sm text-[#3A3A3A]">Manufacturing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#7B2D26] rounded-full mr-2"></div>
                  <span className="text-sm text-[#3A3A3A]">Selected</span>
                </div>
              </div>
            </div>
          </div>

          {/* District Information */}
          <div className="lg:col-span-1">
            {selectedDistrict ? (
              <DistrictInfo district={selectedDistrict} />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-[#F8F3EC] rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-map-2-line text-[#B66E41] w-12 h-12 flex items-center justify-center"></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#2C2A4A] mb-2">
                    Select a District
                  </h3>
                  <p className="text-[#3A3A3A] mb-6">
                    Click on any district in the map to explore its unique crafts, artisans, and cultural heritage.
                  </p>
                  <div className="text-sm text-[#3A3A3A]">
                    <p className="mb-2">🎨 <strong>{districtsData.length} Districts</strong> to explore</p>
                    <p className="mb-2">🏺 <strong>Traditional Crafts</strong> with authentic stories</p>
                    <p>👥 <strong>Master Artisans</strong> and their specialties</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Districts Grid */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-[#2C2A4A] text-center mb-8">
            All Districts & Their Crafts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {districtsData.map((district) => (
              <div
                key={district.id}
                onClick={() => setSelectedDistrict(district)}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  selectedDistrict?.id === district.id ? 'ring-2 ring-[#B66E41]' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-[#B66E41] rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <i className="ri-map-pin-line text-white w-6 h-6 flex items-center justify-center"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2C2A4A]">{district.name}</h3>
                      <p className="text-sm text-[#3A3A3A]">{district.region}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-[#B66E41] font-semibold mb-1">ODOP Crafts:</p>
                    <p className="text-sm text-[#3A3A3A]">{district.crafts.join(', ')}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      district.industryType.includes('Handicraft') ? 'bg-[#B66E41]/10 text-[#B66E41]' :
                      district.industryType.includes('Handloom') ? 'bg-[#4E6E58]/10 text-[#4E6E58]' :
                      'bg-[#D6A400]/10 text-[#D6A400]'
                    }`}>
                      {district.industryType}
                    </span>
                    <i className="ri-arrow-right-line text-[#B66E41] w-4 h-4 flex items-center justify-center group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Craft Tour CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#2C2A4A] to-[#B66E41] rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Take a Virtual Craft Tour
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Experience the authentic crafting process through our immersive videos, 
            meet artisans in their workshops, and learn about centuries-old techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/craft-tours"
              className="px-8 py-3 bg-white text-[#2C2A4A] font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              Start Virtual Tour
            </Link>
            <Link
              href="/artisans"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#2C2A4A] transition-all cursor-pointer whitespace-nowrap"
            >
              Meet All Artisans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 