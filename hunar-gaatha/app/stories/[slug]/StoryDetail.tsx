
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../../components/section/Navbar';
import Footer from '../../../components/section/Footer';

const stories = {
  'meera-devi-journey': {
    title: "Weaving Legacy: Meera Devi's Journey",
    subtitle: "From Varanasi's ancient lanes to global recognition",
    bannerImage: "https://readdy.ai/api/search-image?query=Portrait%20of%20master%20weaver%20Meera%20Devi%20working%20on%20traditional%20Banarasi%20silk%20loom%20in%20golden%20sunlight%2C%20detailed%20craftsmanship%2C%20cultural%20heritage%2C%20inspiring%20artisan%20story%2C%20warm%20atmosphere&width=1200&height=600&seq=story-banner-001&orientation=landscape",
    author: "Hunar Gatha Editorial Team",
    publishDate: "March 15, 2024",
    readTime: "8 min read",
    tags: ["Banarasi Weaving", "Women Artisan", "Heritage Craft", "Varanasi"],
    content: `
      <p class="text-lg text-amber-700 leading-relaxed mb-6">In the narrow gullies of Varanasi, where the morning mist mingles with the sounds of temple bells, sits Meera Devi at her handloom. Her fingers dance across the silk threads with the precision of a master musician, creating patterns that have been passed down through five generations of her family.</p>

      <p class="text-amber-700 leading-relaxed mb-6">Born into a family of traditional weavers in 1965, Meera learned the art of Banarasi silk weaving from her mother-in-law when she was just sixteen. "The loom was my teacher," she recalls with a gentle smile. "Every thread taught me patience, every pattern showed me the beauty of our ancestors' wisdom."</p>

      <h3 class="text-2xl font-bold text-amber-900 mb-4 mt-8">The Art of Banarasi Weaving</h3>

      <p class="text-amber-700 leading-relaxed mb-6">Banarasi silk weaving is not just a craft; it's a meditation in motion. Each saree can take anywhere from 15 days to six months to complete, depending on the intricacy of the design. Meera specializes in the traditional brocade work, where gold and silver threads (zari) are woven into silk to create stunning patterns inspired by Mughal art.</p>

      <p class="text-amber-700 leading-relaxed mb-6">"When I sit at the loom, time stops," Meera explains. "The rhythm of the shuttle, the play of light on silk, the gradual emergence of the pattern – it's like watching a painting come to life, thread by thread."</p>

      <h3 class="text-2xl font-bold text-amber-900 mb-4 mt-8">Challenges and Resilience</h3>

      <p class="text-amber-700 leading-relaxed mb-6">The journey hasn't been easy. The rise of power looms and machine-made imitations threatened the livelihood of traditional weavers. Many craftspeople abandoned their looms for factory jobs. But Meera held on, driven by her belief that authentic craft has an irreplaceable soul.</p>

      <p class="text-amber-700 leading-relaxed mb-6">"There were times when we struggled to make ends meet," she admits. "But I knew that if we gave up, centuries of knowledge would die with us. My grandmother's hands had touched these threads, and I wanted my granddaughter's hands to do the same."</p>

      <h3 class="text-2xl font-bold text-amber-900 mb-4 mt-8">Global Recognition</h3>

      <p class="text-amber-700 leading-relaxed mb-6">Today, Meera's work is celebrated internationally. Her sarees have been showcased at fashion weeks in Paris and New York. She has trained over 200 young women in her village, creating a sustainable livelihood for families while preserving the ancient craft.</p>

      <p class="text-amber-700 leading-relaxed mb-6">"When I see young women learning at my loom, I see the future of our craft," she says with pride. "They bring new ideas while respecting old traditions. This is how art evolves – with respect for the past and hope for the future."</p>

      <h3 class="text-2xl font-bold text-amber-900 mb-4 mt-8">A Living Legacy</h3>

      <p class="text-amber-700 leading-relaxed mb-6">Meera's story is more than just about weaving silk; it's about weaving dreams, preserving culture, and empowering communities. Through platforms like Hunar Gatha, her work reaches craft lovers worldwide, ensuring that the ancient art of Banarasi weaving continues to thrive in the modern world.</p>

      <p class="text-amber-700 leading-relaxed mb-6">As she puts it beautifully: "Every thread tells a story, every pattern holds a prayer. When someone wears a Banarasi saree, they carry with them the dreams of generations of weavers. That's the magic we weave into every piece."</p>
    `,
    relatedProducts: [
      {
        name: "Banarasi Silk Scarf",
        price: 2199,
        image: "https://readdy.ai/api/search-image?query=Elegant%20Banarasi%20silk%20scarf%20with%20golden%20zari%20work%20patterns%20displayed%20on%20luxury%20fabric%2C%20traditional%20Indian%20craftsmanship%2C%20heritage%20textile&width=300&height=300&seq=rel-prod-001&orientation=squarish"
      },
      {
        name: "Pure Silk Dupatta",
        price: 3499,
        image: "https://readdy.ai/api/search-image?query=Beautiful%20handwoven%20silk%20dupatta%20with%20intricate%20brocade%20patterns%2C%20traditional%20Indian%20textile%20art%2C%20luxury%20craftsmanship&width=300&height=300&seq=rel-prod-002&orientation=squarish"
      }
    ]
  }
};

export default function StoryDetail({ storySlug }: { storySlug: string }) {
  const story = stories[storySlug as keyof typeof stories];

  if (!story) {
    return <div>Story not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Banner Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src={story.bannerImage}
          alt={story.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.map((tag, index) => (
                  <span key={index} className="bg-amber-600 px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl lg:text-6xl font-['Playfair_Display'] font-bold mb-4">
                {story.title}
              </h1>
              <p className="text-xl text-amber-100 mb-4">
                {story.subtitle}
              </p>
              <div className="flex items-center text-amber-200">
                <span>By {story.author}</span>
                <span className="mx-3">•</span>
                <span>{story.publishDate}</span>
                <span className="mx-3">•</span>
                <span>{story.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: story.content }}
              />
              
              {/* Share Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12 pt-8 border-t border-amber-200"
              >
                <h3 className="text-xl font-bold text-amber-900 mb-4">Share this story</h3>
                <div className="flex space-x-4">
                  <button className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                    <i className="ri-facebook-fill"></i>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors cursor-pointer">
                    <i className="ri-twitter-x-line"></i>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors cursor-pointer">
                    <i className="ri-instagram-line"></i>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors cursor-pointer">
                    <i className="ri-whatsapp-line"></i>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="sticky top-8"
              >
                {/* Related Products */}
                <div className="bg-amber-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Related Products</h3>
                  <div className="space-y-4">
                    {story.relatedProducts.map((product, index) => (
                      <Link key={index} href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`} className="block group cursor-pointer">
                        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-amber-900 group-hover:text-amber-700 transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-amber-600 font-semibold">₹{product.price}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-3">Get More Stories</h3>
                  <p className="text-amber-100 mb-4">Subscribe to receive inspiring artisan stories directly in your inbox.</p>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 rounded-lg text-amber-900 placeholder-amber-400 border-0 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                    <button className="w-full bg-white text-amber-600 px-4 py-2 rounded-lg font-semibold hover:bg-amber-50 transition-colors whitespace-nowrap cursor-pointer">
                      Subscribe
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
