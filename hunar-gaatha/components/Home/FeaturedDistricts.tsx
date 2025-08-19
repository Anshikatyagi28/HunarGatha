'use client';
import Link from 'next/link';

const districts = [
  {
    id: 1,
    name: "Kannauj",
    craft: "Itar & Perfumes",
    icon: "🧴",
    image: "https://readdy.ai/api/search-image?query=Beautiful%20collection%20of%20traditional%20itar%20bottles%20and%20perfume%20vessels%20from%20Kannauj%2C%20golden%20and%20amber%20colored%20glass%20bottles%20with%20ornate%20designs%2C%20aromatic%20flowers%20and%20herbs%2C%20warm%20lighting%2C%20elegant%20display%20showcasing%20heritage%20perfumery&width=400&height=300&seq=kannauj-district&orientation=landscape",
    description: "Ancient perfumery capital of India",
    featured: true,
    color: "from-amber-400 to-orange-500"
  },
  {
    id: 2,
    name: "Kanpur",
    craft: "Leather Goods",
    icon: "👞",
    image: "https://readdy.ai/api/search-image?query=Premium%20leather%20products%20from%20Kanpur%20including%20bags%2C%20shoes%20and%20accessories%2C%20rich%20brown%20leather%20textures%2C%20traditional%20craftsmanship%20tools%2C%20warm%20studio%20lighting%2C%20organized%20display%20of%20quality%20leather%20goods&width=400&height=300&seq=kanpur-district&orientation=landscape",
    description: "India's leather craftsmanship hub",
    featured: true,
    color: "from-amber-600 to-red-600"
  },
  {
    id: 3,
    name: "Lucknow",
    craft: "Chikankari",
    icon: "👗",
    image: "https://readdy.ai/api/search-image?query=Exquisite%20Chikankari%20embroidered%20garments%20from%20Lucknow%2C%20white%20and%20pastel%20colored%20fabrics%20with%20intricate%20threadwork%2C%20delicate%20patterns%2C%20soft%20natural%20lighting%2C%20traditional%20Indian%20embroidery%20showcase&width=400&height=300&seq=lucknow-district&orientation=landscape",
    description: "Home of delicate embroidery art",
    featured: true,
    color: "from-blue-400 to-indigo-500"
  },
  {
    id: 4,
    name: "Varanasi",
    craft: "Banarasi Silk",
    icon: "🧵",
    image: "https://readdy.ai/api/search-image?query=Luxurious%20Banarasi%20silk%20sarees%20and%20fabrics%20from%20Varanasi%2C%20rich%20golden%20and%20colorful%20threads%2C%20intricate%20weaving%20patterns%2C%20traditional%20looms%2C%20warm%20golden%20lighting%2C%20heritage%20textile%20craftsmanship&width=400&height=300&seq=varanasi-district&orientation=landscape",
    description: "Sacred city of silk weaving",
    featured: false,
    color: "from-yellow-400 to-amber-500"
  },
  {
    id: 5,
    name: "Moradabad",
    craft: "Brassware",
    icon: "🏺",
    image: "https://readdy.ai/api/search-image?query=Traditional%20brass%20handicrafts%20from%20Moradabad%2C%20ornate%20brass%20vessels%2C%20decorative%20items%20and%20utensils%2C%20golden%20metallic%20finish%2C%20artisan%20workshop%20setting%2C%20warm%20lighting%20showcasing%20metal%20craftsmanship&width=400&height=300&seq=moradabad-district&orientation=landscape",
    description: "Brass City of India",
    featured: false,
    color: "from-yellow-500 to-orange-600"
  },
  {
    id: 6,
    name: "Firozabad",
    craft: "Glassware",
    icon: "💎",
    image: "https://readdy.ai/api/search-image?query=Beautiful%20glass%20bangles%20and%20decorative%20items%20from%20Firozabad%2C%20colorful%20glass%20work%2C%20traditional%20glass%20blowing%2C%20sparkling%20glass%20products%2C%20bright%20workshop%20lighting%2C%20crystal%20clear%20glass%20craftsmanship&width=400&height=300&seq=firozabad-district&orientation=landscape",
    description: "City of glass and bangles",
    featured: false,
    color: "from-cyan-400 to-blue-500"
  }
];

export default function FeaturedDistricts() {
  return (
    <section className="py-16 bg-[#F8F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2C2A4A] mb-4">
            Explore by Districts
          </h2>
          <p className="text-lg text-[#3A3A3A] max-w-2xl mx-auto">
            Discover authentic crafts from India's One District One Product initiative, 
            where each region showcases its unique traditional expertise.
          </p>
        </div>

        {/* Featured Districts */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {districts.filter(district => district.featured).map((district) => (
            <Link
              key={district.id}
              href={`/districts/${district.name.toLowerCase()}`}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="relative h-64">
                  <img
                    src={district.image}
                    alt={district.craft}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${district.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  
                  {/* District Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-[#2C2A4A] text-sm font-semibold rounded-full">
                      <span className="mr-2 text-lg">{district.icon}</span>
                      ODOP
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#2C2A4A] mb-2">
                    {district.name}
                  </h3>
                  <p className="text-[#B66E41] font-semibold text-lg mb-2">
                    {district.craft}
                  </p>
                  <p className="text-[#3A3A3A] mb-4">
                    {district.description}
                  </p>
                  
                  <div className="flex items-center text-[#B66E41] group-hover:text-[#A55A37] font-medium">
                    Explore Collection
                    <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All Districts Scroll */}
        <div className="overflow-x-auto">
          <div className="flex space-x-6 pb-4">
            {districts.map((district) => (
              <Link
                key={district.id}
                href={`/districts/${district.name.toLowerCase()}`}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="w-64 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="relative h-40">
                    <img
                      src={district.image}
                      alt={district.craft}
                      className="w-full h-full object-cover object-top rounded-t-xl"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${district.color} opacity-20 rounded-t-xl`}></div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{district.icon}</span>
                      <div>
                        <h4 className="font-bold text-[#2C2A4A]">{district.name}</h4>
                        <p className="text-sm text-[#B66E41]">{district.craft}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            href="/districts"
            className="inline-flex items-center px-8 py-3 bg-[#2C2A4A] text-white font-semibold rounded-lg hover:bg-[#1E1A35] transition-colors cursor-pointer whitespace-nowrap"
          >
            View All Districts
            <i className="ri-map-2-line ml-2 w-4 h-4 flex items-center justify-center"></i>
          </Link>
        </div>
      </div>
    </section>
  );
} 