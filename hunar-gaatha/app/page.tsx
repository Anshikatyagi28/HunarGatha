
'use client';

import HeroSection from '@/components/Home/HeroSection';
import RegionsGrid from '@/components/Home/RegionsGrid';
import CraftTypes from '@/components/Home/CraftTypes';
// import FeaturedSection from '@/components/Home/FeaturedSection';
import CTASection from '@/components/Home/CTASection';
import CustomerReviews from '@/components/Home/CustomerReviews';
import WhyHunarGatha from '@/components/Home/WhyHunarGatha';
import BestsellingCrafts from '@/components/Home/BestsellingCrafts';
import FeaturedDistricts from '@/components/Home/FeaturedDistricts';
import MeetTheMakers from '@/components/Home/MeetTheMakers';
import FeaturedSection from '@/components/Home/FeaturedSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedDistricts/>
      <BestsellingCrafts/>
      <CraftTypes />
      <RegionsGrid />
      <MeetTheMakers/>
      {/* <FeaturedSection /> */}
      <FeaturedSection/>
      <WhyHunarGatha/>
      <CustomerReviews/>
      <CTASection />
    </main>
  );
}
