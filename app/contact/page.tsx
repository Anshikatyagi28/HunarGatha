'use client';

import { useState, FC, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser'; // Use the modern browser package
import toast, { Toaster } from 'react-hot-toast';
import Head from 'next/head'; // Added for SEO

// Define the shape of the form data for type safety
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Define the shape of a contact method for better clarity
interface ContactMethod {
  icon: string;
  title: string;
  details: string;
  description: string;
}

// Define the shape of a social link
interface SocialLink {
  icon: string;
  name: string;
  link: string;
  color: string;
}

const contactMethods: ContactMethod[] = [
  {
    icon: "ri-mail-line",
    title: "Email Us",
    details: "support@hunargaatha.com",
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
    details: "Jaipur, Rajasthan, India",
    description: "Connecting with artisans nationwide"
  }
];

const socialLinks: SocialLink[] = [
  { icon: "ri-facebook-fill", name: "Facebook", link: "https://facebook.com", color: "bg-blue-600 hover:bg-blue-700" },
  { icon: "ri-instagram-line", name: "Instagram", link: "https://instagram.com", color: "bg-pink-600 hover:bg-pink-700" },
  { icon: "ri-twitter-x-line", name: "Twitter", link: "https://twitter.com", color: "bg-gray-900 hover:bg-gray-800" },
  { icon: "ri-linkedin-fill", name: "LinkedIn", link: "https://linkedin.com", color: "bg-blue-700 hover:bg-blue-800" }
];

const ContactPage: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Added input validation state
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid.';
    if (!formData.subject) newErrors.subject = 'Please select a subject.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear the error for the field being edited
    setErrors({
      ...errors,
      [e.target.name]: undefined
    });
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please correct the form errors.');
      return;
    }

    setLoading(true);

    try {
      // Renamed for clarity and security
      const SERVICE_ID = 'service_ab9c1u3';
      const TEMPLATE_ID_CONTACT = 'template_kmqm3uv';
      const TEMPLATE_ID_AUTOREPLY = 'template_26n36kr';
      const PUBLIC_KEY = 'PXATVammMWf7NJpkr';

      // Send the user's message
      const contactResponse = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID_CONTACT,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      console.log('Contact email sent successfully:', contactResponse);

      // Send the auto-reply
      const autoReplyResponse = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID_AUTOREPLY,
        {
          to_name: formData.name,
          to_email: formData.email,
          year: new Date().getFullYear()
        },
        PUBLIC_KEY
      );

      console.log('Auto-reply email sent successfully:', autoReplyResponse);

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | HunarGaatha</title>
        <meta name="description" content="Contact HunarGaatha for order inquiries, product questions, and partnerships. We'd love to hear from you." />
      </Head>
      <div className="min-h-screen bg-white font-sans">
        <Toaster position="top-right" reverseOrder={false} />
        {/* We should load fonts from the Next.js Font component for better performance, but for this example, the CSS link is fine */}
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />

        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-amber-0 to-orange-50 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-4xl font-['Playfair_Display'] font-bold text-gray-900 mb-6"
          >
            Get In Touch
          </motion.h1>
          <p className="text-md text-amber-700 max-w-3xl mx-auto">
            Have questions about your order, our products, or want to partner with us? We'd love to hear from you.
          </p>
        </section>

        {/* Contact Methods (Commented out in original, but included here for completeness) */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-white shadow-lg hover:shadow-xl rounded-lg"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-amber-100 rounded-full">
                  <i className={`${method.icon} text-2xl text-amber-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{method.title}</h3>
                <p className="text-lg font-semibold text-amber-700">{method.details}</p>
                <p className="text-amber-600">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Form & Info */}
        <section className="py-20 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Additional Info */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-6">Why Get In Touch?</h2>
                  <ul className="space-y-3 text-amber-700">
                    <li>✔ Order Inquiries</li>
                    <li>✔ Product Details</li>
                    <li>✔ Wholesale & Partnership</li>
                    <li>✔ Media & Press</li>
                  </ul>
                </div>

                <div className="bg-white p-6 shadow-lg rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Office Hours</h3>
                  <p>Mon–Fri: 9 AM – 6 PM</p>
                  <p>Sat: 10 AM – 4 PM</p>
                  <p>Sun: Closed</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Our Journey</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a key={social.name} href={social.link} target="_blank" rel="noopener noreferrer"
                        className={`w-10 h-10 flex rounded-full items-center justify-center text-white transition-colors ${social.color}`}>
                        <i className={`${social.icon} text-md`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="bg-white p-8 shadow-xl rounded-lg">
                <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-6">Send us a Message</h2>
                <form onSubmit={sendEmail} className="space-y-6">
                  <div>
                    <input type="text" name="name" placeholder="Your Name" required value={formData.name}
                      onChange={handleChange}
                      className={`w-full rounded p-3 border ${errors.name ? 'border-red-500' : 'border-amber-400'} focus:ring-2 focus:ring-amber-500`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <input type="email" name="email" placeholder="Your Email" required value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded p-3 border ${errors.email ? 'border-red-500' : 'border-amber-400'} focus:ring-2 focus:ring-amber-500`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <select name="subject" required value={formData.subject}
                      onChange={handleChange}
                      className={`w-full rounded p-3 border ${errors.subject ? 'border-red-500' : 'border-amber-400'} focus:ring-2 focus:ring-amber-500 text-gray-700`}
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="artisan">Artisan Partnership</option>
                      <option value="wholesale">Wholesale Orders</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <textarea name="message" rows={6} maxLength={500} placeholder="Tell us how we can help you..."
                      required value={formData.message} onChange={handleChange}
                      className={`w-full rounded p-3 border ${errors.message ? 'border-red-500' : 'border-amber-400'} focus:ring-2 focus:ring-amber-500 resize-none`}
                    />
                    <div className="text-right text-sm text-amber-600">{formData.message.length}/500 characters</div>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full rounded bg-amber-600 hover:bg-amber-700 text-white py-3 font-semibold transition disabled:opacity-50">
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;