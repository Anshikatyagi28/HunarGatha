"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeIn = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const ACTIVITIES = [
  { title: "Artisan Training", description: "Skill up artisans in traditional crafts via workshops & tools." },
  { title: "Fair Market Access", description: "Connect craftspeople with buyers through our platform & events." },
  { title: "Cultural Preservation", description: "Document crafts, stories & traditions for future generations." },
  { title: "Sustainable Practices", description: "Promote eco-friendly materials and processes." },
];

export default function WhatWeDo() {
  return (
    <section className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2 variants={fadeIn} initial="hidden" whileInView="show" className="text-4xl font-playfair font-bold text-terra-700 mb-4">
          What We Do
        </motion.h2>
        <motion.p variants={fadeIn} initial="hidden" whileInView="show" transition={{ delay: 0.2 }} className="text-lg text-gray-700 mb-12 leading-relaxed">
          At Hunar Gaatha, we empower artisans, preserve heritage, and bring culture to your doorstep. Here's how we make a difference:
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {ACTIVITIES.map((act, i) => (
            <motion.div
              key={act.title}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              transition={{ delay: i * 0.2 + 0.3 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-terra-900 mb-2">{act.title}</h3>
              <p className="text-gray-600">{act.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeIn} initial="hidden" whileInView="show" transition={{ delay: 0.8 }} className="mt-16 flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/2">
            <Image src="/images/artisan-at-work.jpg" alt="Artisan at work" width={600} height={400} className="object-cover w-full h-full" />
          </div>
          <div className="md:w-1/2 p-6">
            <h3 className="text-2xl font-playfair font-bold text-terra-800 mb-3">Supporting Artisans, Crafting Legacies</h3>
            <p className="text-gray-700">
              Through training, fair trade, and digital outreach, we help artisans from Uttar Pradesh build sustainable livelihoods and keep centuries-old crafts alive.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
