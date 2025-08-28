'use client';
import { motion } from 'framer-motion';
import {  GiFlowerPot, GiEarthAmerica } from 'react-icons/gi';
import {HeartHandshake, HandHelping } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const VALUES = [
  {
    icon: <HandHelping className="text-[#B66E41] text-5xl" />,
    title: 'Empowerment',
    description: 'Supporting artisans with fair pay, training, and lasting economic growth.',
  },
  {
    icon: <GiFlowerPot className="text-[#D6A400] text-5xl" />,
    title: 'Heritage',
    description: 'Safeguarding traditional crafts and sharing the stories that shape our culture.',
  },
  {
    icon: <HeartHandshake  className="text-[#4E6E58] text-5xl" />,
    title: 'Partnership',
    description: 'Collaborating closely with artisans, communities, and craft lovers.',
  },
  {
    icon: <GiEarthAmerica className="text-[#7B2D26] text-5xl" />,
    title: 'Sustainability',
    description: 'Championing eco-friendly materials and earth-conscious practices.',
  },
];

export default function OurValues() {
  return (
    <section className="py-20 md:py-28 bg-[#F8F3EC]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-[#2C2A4A] mb-4">
            Our Values
          </h2>
          <p className="text-lg text-[#3A3A3A] max-w-xl mx-auto leading-relaxed">
            The guiding principles that honor our heritage, uplift our artisans, and craft the future with heart and purpose.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((val, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{val.icon}</div>
              <h3 className="text-xl font-semibold text-[#2C2A4A] mb-2">{val.title}</h3>
              <p className="text-[#4E6E58]">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
