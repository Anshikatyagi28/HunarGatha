'use client';
import { useState, useEffect } from 'react';

const features = [
  {
    id: 1,
    icon: "ri-shield-check-line",
    title: "Authenticity, Verified",
    description: "Each piece comes with a certificate of origin and a unique artisan story.",
    image: "https://readdy.ai/api/search-image?query=Traditional%20Indian%20craft%20authenticity%20certificate%20with%20official%20seals%2C%20verification%20stamps%2C%20heritage%20craftsmanship%20documentation%2C%20warm%20lighting%2C%20trust%20and%20quality%20assurance%20visual&width=400&height=300&seq=authenticity&orientation=landscape",
    color: "from-[#4E6E58] to-[#2C2A4A]",
  },
  {
    id: 2,
    icon: "ri-map-2-line",
    title: "Direct From Origin",
    description: "We source directly from master craftspeople in their native regions.",
    image: "https://readdy.ai/api/search-image?query=Map%20of%20India%20showing%20craft%20regions%20and%20traditional%20trade%20routes%2C%20colorful%20state%20divisions%2C%20cultural%20heritage%20locations%2C%20geographical%20authenticity%20visualization%2C%20warm%20educational%20tone&width=400&height=300&seq=origin-map&orientation=landscape",
    color: "from-[#B66E41] to-[#7B2D26]",
  },
  {
    id: 3,
    icon: "ri-award-line",
    title: "Uncompromising Quality",
    description: "Every product is handpicked to meet the highest traditional standards.",
    image: "https://readdy.ai/api/search-image?query=Premium%20quality%20control%20for%20Indian%20handicrafts%2C%20inspection%20process%2C%20quality%20badges%20and%20awards%2C%20traditional%20craft%20excellence%20evaluation%2C%20professional%20assessment%20environment&width=400&height=300&seq=quality-control&orientation=landscape",
    color: "from-[#D6A400] to-[#B66E41]",
  },
  {
    id: 4,
    icon: "ri-heart-line",
    title: "Empowering Artisans",
    description: "Our fair trade practices ensure artisans receive rightful compensation.",
    image: "https://readdy.ai/api/search-image?query=Happy%20Indian%20artisans%20receiving%20fair%20payment%20for%20their%20crafts%2C%20community%20support%2C%20traditional%20craftspeople%20empowerment%2C%20positive%20social%20impact%2C%20warm%20community%20atmosphere&width=400&height=300&seq=artisan-support&orientation=landscape",
    color: "from-[#7B2D26] to-[#4E6E58]",
  },
  {
    id: 5,
    icon: "ri-leaf-line",
    title: "Sustainably Made",
    description: "We champion eco-friendly practices that preserve both the environment and traditions.",
    image: "https://readdy.ai/api/search-image?query=Eco-friendly%20traditional%20craft%20materials%2C%20natural%20dyes%2C%20organic%20cotton%2C%20sustainable%20production%20methods%2C%20green%20craftsmanship%2C%20environmental%20consciousness%20in%20Indian%20handicrafts&width=400&height=300&seq=eco-friendly&orientation=landscape",
    color: "from-[#4E6E58] to-[#2C2A4A]",
  },
  {
    id: 6,
    icon: "ri-global-line",
    title: "Preserving Heritage",
    description: "We help keep centuries-old traditions alive for future generations.",
    image: "https://readdy.ai/api/search-image?query=Traditional%20Indian%20cultural%20heritage%20preservation%2C%20ancient%20craft%20techniques%20being%20passed%20down%2C%20intergenerational%20knowledge%20transfer%2C%20cultural%20continuity%2C%20heritage%20conservation%20showcase&width=400&height=300&seq=cultural-preservation&orientation=landscape",
    color: "from-[#2C2A4A] to-[#B66E41]",
  },
];

const stats = [
  {
    number: "500+",
    target: 500,
    label: "Master Artisans",
    icon: "ri-user-star-line",
  },
  {
    number: "50+",
    target: 50,
    label: "ODOP Districts",
    icon: "ri-map-pin-line",
  },
  {
    number: "10,000+",
    target: 10000,
    label: "Authentic Products",
    icon: "ri-shopping-bag-line",
  },
  {
    number: "98%",
    target: 98,
    label: "Customer Satisfaction",
    icon: "ri-thumb-up-line",
  },
];

const AnimatedCounter = ({ target, label, icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const currentCount = Math.min(Math.floor((progress / duration) * target), target);

      setCount(currentCount);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [target]);

  const displayValue = `${count}${label.includes('Satisfaction') ? '%' : '+'}`;

  return (
    <div className="text-center">
      <div className="flex items-center justify-center mx-auto mb-3">
        <div className="w-16 h-16 bg-[#B66E41] rounded-full flex items-center justify-center">
          <i className={`${icon} text-white text-3xl`}></i>
        </div>
      </div>
      <div className="text-4xl font-bold text-[#2C2A4A] mb-1">
        {displayValue}
      </div>
      <div className="text-[#3A3A3A] font-medium text-lg">
        {label}
      </div>
    </div>
  );
};


export default function WhyHunarGaatha() {
  return (
    <section className="py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#B66E41] text-sm font-semibold tracking-wider uppercase mb-2">
            Our Promise
          </p>
          <h2 className="text-4xl font-bold text-[#2C2A4A] mb-4">
            Why Choose HunarGaatha?
          </h2>
          <p className="text-lg text-[#3A3A3A] max-w-3xl mx-auto">
            We are more than just a marketplace. We're a bridge connecting you to India's rich heritage through authentic crafts and the stories of the master artisans who create them.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group cursor-help relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Background Image and Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
              </div>

              <div className="relative p-8 z-10">
                {/* Icon */}
                <div className="mb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-4 transition-transform duration-500 transform group-hover:scale-110`}
                  >
                    <i className={`${feature.icon} text-white text-3xl`}></i>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-[#2C2A4A] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#3A3A3A] leading-relaxed">
                  {feature.description}
                </p>
                {/* Decorative Element */}
                <div className="absolute top-6 right-6 opacity-20">
                  <div className="w-8 h-8 border-2 border-current rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-[#EFEAE2] w-full p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#2C2A4A] mb-2">
              Trusted by Thousands of Craft Lovers
            </h3>
            <p className="text-[#3A3A3A] text-lg">
              Join our growing community and support traditional artistry.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedCounter
                key={index}
                target={stat.target}
                label={stat.label}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-[#2C2A4A] mb-4">
              Ready to Discover Your Next Treasure?
            </h3>
            <p className="text-lg text-[#3A3A3A] mb-8">
              Explore our curated collection of authentic, handcrafted products. Every purchase supports a traditional artisan and helps preserve a cultural legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-[#B66E41] text-white font-semibold rounded-full hover:bg-[#A55A37] transition-colors shadow-lg hover:shadow-xl">
                Start Shopping
              </button>
              <button className="px-10 py-4 bg-transparent border-2 border-[#B66E41] text-[#B66E41] font-semibold rounded-full hover:bg-[#B66E41] hover:text-white transition-all shadow-lg hover:shadow-xl">
                Our Artisan Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}