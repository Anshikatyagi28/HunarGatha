import React from 'react';
import { motion } from 'framer-motion';
import { IoShieldCheckmarkSharp, IoStarOutline } from "react-icons/io5";

const CustomerReviews = () => {

     const customerReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review: "The Chikankari kurta exceeded my expectations! The embroidery is exquisite and you can feel the love in every stitch.",
    product: "Chikankari Kurta Set",
    image: "https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=150",
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Gupta",
    location: "Delhi",
    rating: 5,
    review: "Authentic Kannauj itar that transported me to my grandmother's village. The packaging and story card made it even more special.",
    product: "Royal Kannauj Itar Set",
    image: "https://images.pexels.com/photos/8112185/pexels-photo-8112185.jpeg?auto=compress&cs=tinysrgb&w=150",
    verified: true
  },
  {
    id: 3,
    name: "Anjali Mehta",
    location: "Bangalore",
    rating: 4,
    review: "Beautiful blue pottery set! Perfect for hosting dinner parties. The artisan's story card was a lovely touch.",
    product: "Blue Pottery Dinner Set",
    image: "https://images.pexels.com/photos/8815238/pexels-photo-8815238.jpeg?auto=compress&cs=tinysrgb&w=150",
    verified: true
  }
];

    
  return (
    <section className="py-16 bg-[#F8F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#2C2A4A] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-[#3A3A3A] max-w-3xl mx-auto">
            Real stories from real customers who have experienced the magic of authentic 
            Indian craftsmanship through HunarGatha.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customerReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <IoStarOutline
                    key={i}
                    className="h-5 w-5 text-[#D6A400] fill-current"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#3A3A3A] leading-relaxed mb-6 italic">
                "{review.review}"
              </p>

              {/* Product Info */}
              <div className="bg-[#F8F3EC] rounded-lg p-3 mb-4">
                <p className="text-xs text-[#3A3A3A] mb-1">Product Purchased</p>
                <p className="text-sm font-medium text-[#2C2A4A]">{review.product}</p>
              </div>

              {/* Customer Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-[#2C2A4A]">{review.name}</h4>
                    {review.verified && (
                      <IoShieldCheckmarkSharp className="h-4 w-4 text-[#4E6E58]" />
                    )}
                  </div>
                  <p className="text-sm text-[#3A3A3A]">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 mt-12 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold text-[#D6A400] mb-2">4.8</div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <IoStarOutline
                    key={i}
                    className={`h-6 w-6 ${
                      i < 4 ? 'text-[#D6A400] fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[#3A3A3A]">Average Rating</p>
            </div>
            
            <div>
              <div className="text-5xl font-bold text-[#4E6E58] mb-2">98%</div>
              <p className="text-[#3A3A3A]">Customer Satisfaction</p>
            </div>
            
            <div>
              <div className="text-5xl font-bold text-[#B66E41] mb-2">2.5k+</div>
              <p className="text-[#3A3A3A]">Verified Reviews</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#2C2A4A] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1a1832] transition-colors duration-200"
          >
            Read All Reviews
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;