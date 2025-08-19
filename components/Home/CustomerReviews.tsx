import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { IoShieldCheckmarkSharp, IoStarOutline } from "react-icons/io5";



import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const reviewsData = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review: "The Chikankari kurta exceeded my expectations! I wore it to my sister’s Haldi and everyone asked where I got it!",
    product: "Chikankari Kurta Set",
    image: "https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=150",
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Gupta",
    location: "Delhi",
    rating: 5,
    review: "The Kannauj itar reminded me of summers at my nani’s house. What a nostalgic fragrance!",
    product: "Royal Kannauj Itar Set",
    image: "https://images.pexels.com/photos/8112185/pexels-photo-8112185.jpeg?auto=compress&cs=tinysrgb&w=150",
    verified: true
  },
  {
    id: 3,
    name: "Anjali Mehta",
    location: "Bangalore",
    rating: 4,
    review: "The Blue Pottery set is stunning and sparked so many compliments during my dinner party.",
    product: "Blue Pottery Dinner Set",
    image: "https://images.pexels.com/photos/8815238/pexels-photo-8815238.jpeg?auto=compress&cs=tinysrgb&w=150",
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Gupta",
    location: "Delhi",
    rating: 5,
    review: "The Kannauj itar reminded me of summers at my nani’s house. What a nostalgic fragrance!",
    product: "Royal Kannauj Itar Set",
    image: "https://images.pexels.com/photos/8112185/pexels-photo-8112185.jpeg?auto=compress&cs=tinysrgb&w=150",
    verified: true
  },
  {
    id: 3,
    name: "Anjali Mehta",
    location: "Bangalore",
    rating: 4,
    review: "The Blue Pottery set is stunning and sparked so many compliments during my dinner party.",
    product: "Blue Pottery Dinner Set",
    image: "https://images.pexels.com/photos/8815238/pexels-photo-8815238.jpeg?auto=compress&cs=tinysrgb&w=150",
    verified: true
  }
];



const StarRating = ({ count }) => (
  <div className="flex items-center space-x-1 mb-4">
    {[...Array(count)].map((_, i) => (
      <IoStarOutline key={i} className="h-5 w-5 text-[#D6A400] fill-current" />
    ))}
  </div>
);

const CustomerReviews = () => {
  return (
    <section className="py-20 bg-[#F8F3EC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#2C2A4A] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-[#3A3A3A] max-w-2xl mx-auto">
            Hear directly from those who’ve experienced the magic of HunarGaatha's handmade treasures.
          </p>
        </motion.div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          speed={4000} // slow continuous speed
          autoplay={{
            delay: 0, // no pause between slides
            disableOnInteraction: false,
          }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {reviewsData.map((review, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col justify-between hover:shadow-xl"
              >
                <StarRating count={review.rating} />
                <p className="text-[#3A3A3A] italic leading-relaxed mb-6">
                  "{review.review}"
                </p>

                <div className="bg-[#F8F3EC] rounded-lg p-3 mb-4">
                  <p className="text-xs text-[#3A3A3A] mb-1">Product Purchased</p>
                  <p className="text-sm font-medium text-[#2C2A4A]">
                    {review.product}
                  </p>
                </div>

                <div className="flex items-center space-x-3 mt-auto">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-[#2C2A4A]">
                        {review.name}
                      </h4>
                      {review.verified && (
                        <IoShieldCheckmarkSharp className="h-4 w-4 text-[#4E6E58]" />
                      )}
                    </div>
                    <p className="text-sm text-[#3A3A3A]">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


       {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 mt-16 text-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              { value: '4.8', label: 'Average Rating', color: '#D6A400' },
              { value: '98%', label: 'Customer Satisfaction', color: '#4E6E58' },
              { value: '2.5k+', label: 'Verified Reviews', color: '#B66E41' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</div>
                <p className="text-[#3A3A3A]">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      
      {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#a87333] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#b8884d] transition-colors duration-200"
          >
            Read All Reviews
          </motion.button>
        </motion.div>


    </section>
  );
};

export default CustomerReviews;