'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// ---- Data ----
const FOUNDERS = [
  {
    name: "Arjun Sharma",
    role: "Co-Founder & CEO",
    image: "https://placehold.co/400x500?text=Arjun+Sharma",
    background: "Former tech executive with 15 years in e-commerce..."
  },
  {
    name: "Mohit Chuhan",
    role: "Co-Founder & Creative Director",
    image: "https://placehold.co/400x500?text=Priya+Nair",
    background: "An acclaimed art historian who has spent years documenting artisans..."
  }
];

const VALUES = [
  {
    icon: "ri-hand-heart-line",
    title: "Artisan First",
    description: "We partner directly with artisans..."
  },
  {
    icon: "ri-sparkling-2-line",
    title: "Authentic Craftsmanship",
    description: "Every piece tells a story of tradition..."
  },
  {
    icon: "ri-seedling-line",
    title: "Conscious Commerce",
    description: "From sustainable sourcing to eco-friendly packaging..."
  },
  {
    icon: "ri-global-line",
    title: "Connecting Cultures",
    description: "Our mission is to build a global bridge..."
  }
];

// ---- Animation Variants ----
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

// ---- Components ----
function HeroSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-amber-50 to-orange-50 text-center">
      <motion.div variants={fadeUp} initial="hidden" animate="show">
        <h1 className="text-5xl lg:text-7xl font-playfair font-bold text-green-900 mb-6">
          Our Story: HunarGaatha
        </h1>
        <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-900 leading-relaxed">
          Hunar Gaatha, meaning 'The Story of Artistry', was born from the belief that every handmade creation is living history...
        </p>
      </motion.div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Image
            src="https://placehold.co/600x700?text=Artisan+at+Work"
            alt="Artisan at work"
            width={600}
            height={700}
            className="rounded shadow-2xl"
          />
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-amber-900 mb-6">
            Our Purpose
          </h2>
          <p className="text-lg text-gray-800 mb-4">
            Our purpose is to bridge the gap between India's master artisans and a global community...
          </p>
          <Link href="/stories" className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium">
            Discover artisan stories <i className="ri-arrow-right-line ml-2"></i>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="py-20 md:py-32 bg-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-amber-900 mb-6">Our Core Values</h2>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">These principles guide every decision we make...</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((val, i) => (
            <motion.div key={val.title} variants={fadeUp} initial="hidden" whileInView="show" transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl">
              <div className="w-16 h-16 flex items-center justify-center bg-amber-100 rounded-full mx-auto mb-6">
                <i className={`${val.icon} text-2xl text-amber-600`}></i>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">{val.title}</h3>
              <p className="text-gray-800">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoundersSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-amber-50 to-white">
  <div className="max-w-7xl mx-auto px-6">
    {/* Heading */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-amber-900 mb-4">
        Meet the Storytellers
      </h2>
      <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full" />
      <p className="text-lg lg:text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
        Led by two passionate founders who believe in preserving culture
        through creativity, craftsmanship, and connection.
      </p>
    </motion.div>

    {/* Founders */}
    <div className="grid lg:grid-cols-2 gap-16">
      {FOUNDERS.map((f, i) => (
        <motion.div
          key={f.name}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          transition={{ delay: i * 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative group mb-6">
            <Image
              src={f.image}
              alt={f.name}
              width={256}
              height={320}
              className="rounded-lg shadow-lg object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            {/* Decorative frame */}
            <span className="absolute inset-0 border-2 border-amber-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <h3 className="text-2xl font-bold text-amber-900">{f.name}</h3>
          <p className="text-amber-500 mb-4">{f.role}</p>
          <p className="text-gray-700 leading-relaxed mb-6">{f.background}</p>

          {/* Social Links */}
          <div className="flex gap-4">
            {f.socials?.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:text-amber-500 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

  );
}

function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-white text-center">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-amber-900 mb-6">Join Our Story</h2>
        <p className="text-xl text-amber-700 max-w-3xl mx-auto mb-12">Every purchase sustains an artisan's livelihood...</p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/shop" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg">
            Explore Handcrafted Goods
          </Link>
          <Link href="/stories" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg">
            Read Artisan Stories
          </Link>
        </div>
      </motion.div>
    </section>
  );
}


function AboutNext(){
   return (<div className="min-h-screen bg-background">
      
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About <span className="bg-gradient-heritage bg-clip-text text-transparent">Hunar Gatha</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Crafting Culture, One Tale at a Time
          </p>
        </div>

        <div className="space-y-12">
          {/* Mission */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                Hunar Gatha is a digital platform dedicated to preserving and promoting India's rich 
                tradition of handcrafted arts through the power of storytelling and e-commerce. We 
                believe that every craft has a story, every artisan has a journey, and every piece 
                created carries the soul of its maker.
              </p>
              <p>
                Our mission is to bridge the gap between traditional Indian craftsmanship and the 
                modern world, ensuring that these age-old skills not only survive but thrive in 
                the 21st century.
              </p>
            </div>
          </section>

          {/* Vision */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Vision</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                We envision a world where traditional crafts are celebrated, artisans are empowered, 
                and cultural heritage is preserved for future generations. Through technology and 
                storytelling, we aim to create a global marketplace that values authenticity, 
                craftsmanship, and cultural significance.
              </p>
            </div>
          </section>

          {/* What We Do */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Artisan Stories</h3>
                <p className="text-muted-foreground">
                  We document and share the inspiring journeys of master craftspeople, preserving 
                  their knowledge and experiences for posterity.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Authentic Products</h3>
                <p className="text-muted-foreground">
                  We curate and sell genuine handcrafted products, ensuring fair compensation 
                  for artisans and authenticity for customers.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Cultural Education</h3>
                <p className="text-muted-foreground">
                  We educate people about traditional crafts, their origins, techniques, and 
                  cultural significance in Indian heritage.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Global Reach</h3>
                <p className="text-muted-foreground">
                  We connect local artisans with global markets, ensuring that traditional 
                  Indian crafts reach appreciative audiences worldwide.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Values</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gradient-heritage rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold text-foreground">Authenticity</h3>
                  <p className="text-muted-foreground">Every product and story we feature is genuine and verified.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gradient-heritage rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold text-foreground">Fair Trade</h3>
                  <p className="text-muted-foreground">We ensure artisans receive fair compensation for their work.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gradient-heritage rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold text-foreground">Cultural Preservation</h3>
                  <p className="text-muted-foreground">We are committed to preserving traditional crafts for future generations.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gradient-heritage rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold text-foreground">Quality</h3>
                  <p className="text-muted-foreground">We maintain the highest standards in both products and storytelling.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-warm p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Journey</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Be part of preserving India's rich craft heritage. Explore our collection, 
              read artisan stories, and support traditional craftsmanship.
            </p>
          </section>
        </div>
      </div>

     
    </div>);
}


// ---- Main Page ----
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <link href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css" rel="stylesheet" />
      <HeroSection />
      {/* TODO: need to work */}
      {/* <AboutNext/> */}
      <MissionSection />
      <ValuesSection />
      <FoundersSection />
      <CTASection />
    </div>
  );
}
