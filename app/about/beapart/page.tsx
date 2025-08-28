'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GiChainedHeart, GiHandSaw } from 'react-icons/gi';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const STEPS = [
  {
    icon: <GiChainedHeart className="text-[#B66E41] text-5xl" />,
    title: 'Connect with Artisans',
    description: 'Join a community that uplifts culture through craft and story.',
  },
  {
    icon: <GiHandSaw className="text-[#4E6E58] text-5xl" />,
    title: 'Collaborate & Create',
    description: 'Work with artisans to bring heritage crafts to life for modern homes.',
  },
];

export default function BeAPart() {
  return (
    <section className="bg-[#F8F3EC] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-[#2C2A4A] mb-4">
            Be a Part of the Story
          </h2>
          <p className="text-lg text-[#3A3A3A] max-w-3xl mx-auto leading-relaxed">
            Become a collaborator in preserving traditions and supporting artisans in creating meaningful futures.
          </p>
        </motion.div>

        {/* Engagement Steps */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-2xl font-semibold text-[#2C2A4A] mb-3">{step.title}</h3>
              <p className="text-[#4E6E58]">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
        >
          <div className="md:w-1/2 relative h-72 md:h-auto">
            <Image
              src="/images/artisan-team.jpg"
              alt="Artisan team collaborating"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h3 className="text-3xl font-playfair font-bold text-[#B66E41] mb-4">
              Ready to Join Us?
            </h3>
            <p className="text-[#3A3A3A] leading-relaxed mb-6">
              Whether you're an artisan, a craft enthusiast, or a cultural storyteller—your place is here with us.
            </p>
            <a
              href="/be-a-part/signup"
              className="inline-block bg-[#D6A400] text-[#2C2A4A] font-semibold px-6 py-3 rounded-lg hover:bg-[#b59300] transition-colors"
            >
              Join the Community
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
