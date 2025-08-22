
"use client";

import { useEffect, useState } from "react";
import HeroSection from '@/components/Home/HeroSection';
import RegionsGrid from '@/components/Home/RegionsGrid';
import CraftTypes from '@/components/Home/CraftTypes';
// import FeaturedSection from '@/components/Home/FeaturedSection';
import CTASection from '@/components/Home/CTASection';
import CustomerReviews from '@/components/Home/CustomerReviews';
import WhyHunarGaatha from '@/components/Home/WhyHunarGaatha';
import BestsellingCrafts from '@/components/Home/BestsellingCrafts';
import FeaturedDistricts from '@/components/Home/FeaturedDistricts';
import MeetTheMakers from '@/components/Home/MeetTheMakers';
import FeaturedSection from '@/components/Home/FeaturedSection';
import NewsletterModal from '@/components/Home/NewsletterModal';


export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal after 3 seconds
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000);

    // Cleanup on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {showModal && <NewsletterModal onClose={() => setShowModal(false)} />}


      <HeroSection />
      <FeaturedDistricts/>
      <BestsellingCrafts/>
      <CraftTypes />
      {/* <RegionsGrid /> */}
      <MeetTheMakers/>
      {/* <FeaturedSection /> */}
      {/* <FeaturedSection/> */}
      <WhyHunarGaatha/>
      <CustomerReviews/>
      <CTASection />
    </main>
  );
}
