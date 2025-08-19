'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real e-commerce application, you would send this data to a backend API.
    // This is a placeholder to simulate a successful form submission.
    console.log("Form data submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: "ri-mail-line",
      title: "Email Us",
      details: "support@hunargatha.com", // Updated email for support
      description: "For order inquiries and product questions"
    },
    {
      icon: "ri-phone-line",
      title: "Call Us",
      details: "+91 98765 43210",
      description: "Monday to Friday, 9AM to 6PM IST"
    },
    {
      icon: "ri-map-pin-line",
      title: "Visit Us",
      details: "New Delhi, India",
      description: "Connecting with artisans nationwide"
    }
  ];

  const socialLinks = [
    {
      icon: "ri-facebook-fill",
      name: "Facebook",
      link: "#",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: "ri-instagram-line",
      name: "Instagram",
      link: "#",
      color: "bg-pink-600 hover:bg-pink-700"
    },
    {
      icon: "ri-twitter-x-line",
      name: "Twitter",
      link: "#",
      color: "bg-gray-900 hover:bg-gray-800"
    },
    {
      icon: "ri-linkedin-fill",
      name: "LinkedIn",
      link: "#",
      color: "bg-blue-700 hover:bg-blue-800"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Add the CDN link for remixicon */}
      <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Have questions about your order, our products, or want to partner with us?
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-amber-100 rounded-full mx-auto mb-6">
                  <i className={`${method.icon} text-2xl text-amber-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-lg font-semibold text-amber-700 mb-2">
                  {method.details}
                </p>
                <p className="text-amber-600">
                  {method.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h2 className="text-3xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
                  Send us a Message
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                      <i className="ri-check-line text-2xl text-green-600"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-green-600 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-amber-700">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} id="contact-form" className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-amber-900 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 pr-8"
                      >
                        <option value="">Select a subject</option>
                        <option value="order">Order Inquiry</option>
                        <option value="product">Product Question</option>
                        <option value="artisan">Artisan Partnership</option>
                        <option value="wholesale">Wholesale Orders</option>
                        <option value="press">Press & Media</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-amber-900 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        maxLength={500}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                      <div className="text-right text-sm text-amber-600 mt-1">
                        {formData.message.length}/500 characters
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={formData.message.length > 500}
                      className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Why Contact Us */}
              <div>
                <h2 className="text-3xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
                  Why Get In Touch?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 flex items-center justify-center text-amber-600 mt-1">
                      <i className="ri-check-line"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-1">Order Inquiries</h4>
                      <p className="text-amber-700">Questions about your purchase or delivery status</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 flex items-center justify-center text-amber-600 mt-1">
                      <i className="ri-check-line"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-1">Product Details</h4>
                      <p className="text-amber-700">Need more info on a specific product's craft or materials</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 flex items-center justify-center text-amber-600 mt-1">
                      <i className="ri-check-line"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-1">Wholesale & Partnership</h4>
                      <p className="text-amber-700">Opportunities for retailers, brands, and artisans</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 flex items-center justify-center text-amber-600 mt-1">
                      <i className="ri-check-line"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-1">Media & Press</h4>
                      <p className="text-amber-700">For stories, interviews, and collaboration</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-amber-900 mb-4">
                  Office Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Monday - Friday</span>
                    <span className="font-medium text-amber-900">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Saturday</span>
                    <span className="font-medium text-amber-900">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Sunday</span>
                    <span className="font-medium text-amber-900">Closed</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-amber-200">
                  <p className="text-sm text-amber-600">
                    * All times are in Indian Standard Time (IST)
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-4">
                  Follow Our Journey
                </h3>
                <p className="text-amber-700 mb-6">
                  Stay connected with our artisan stories and latest craft discoveries.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      aria-label={social.name}
                      target="_blank" // Added to open in a new tab
                      rel="noopener noreferrer" // Recommended for security with target="_blank"
                      className={`w-12 h-12 flex items-center justify-center text-white rounded-full transition-colors cursor-pointer ${social.color}`}
                    >
                      <i className={`${social.icon} text-xl`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
