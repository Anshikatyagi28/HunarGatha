"use client";

import { SiSnapcraft } from "react-icons/si";
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { X } from "lucide-react"; // Use a more modern icon for closing

// Firebase
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Toast Utils
import toast from "react-hot-toast"; // Using a consistent toast library


interface NewsletterModalProps {
  onClose: () => void;
}




const NewsletterModal: React.FC<NewsletterModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading

  // Effect to manage modal visibility and prevent repeat shows
  useEffect(() => {
    // Check if the user has subscribed before or seen the modal
    const hasSubscribed = localStorage.getItem("newsletterSubscribed");
    const hasSeen = sessionStorage.getItem("newsletterSeen");

    // If already subscribed or seen in this session, don't show the modal
    if (hasSubscribed || hasSeen) {
      return;
    }

    // Delay the modal open to avoid blocking content immediately
    const timer = setTimeout(() => {
      setIsOpen(true);
      // Use sessionStorage for per-session tracking to show on next visit
      sessionStorage.setItem("newsletterSeen", "true");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !email) return;

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "newsletter"), {
        email,
        createdAt: serverTimestamp(),
      });

      toast.success("Thanks for subscribing! 🎉");
      setIsOpen(false);
      setEmail("");
      // Set localStorage flag to prevent showing the modal ever again for this user
      localStorage.setItem("newsletterSubscribed", "true");
    } catch (error) {
      console.error("Error saving email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  // Use a portal to render the modal outside the main DOM tree for better stacking context
  // This is a common pattern but not strictly necessary for this simple component.
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[1000] p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="newsletter-modal-title"
      aria-describedby="newsletter-modal-description"
    >
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center animate-fadeInUp">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close newsletter modal"
        >
          <X size={20} />
        </button>

        <h2 id="newsletter-modal-title" className="text-2xl font-bold mb-4 font-serif">
          GAATHA NEWSLETTER
        </h2>

        <div className="flex justify-center items-center mb-4">
          <span role="img" aria-label="Heart emoji" className="text-red-500 text-lg mx-1">
            ❤️
          </span>
          <span className="text-gray-500 mx-2">
            <SiSnapcraft size={32} aria-hidden="true" />
          </span>
          <span role="img" aria-label="Heart emoji" className="text-red-500 text-lg mx-1">
            ❤️
          </span>
        </div>

        <p className="italic mb-2 text-gray-600">Hearts speak</p>
        <p className="italic mb-2 text-gray-600">a language that distance</p>
        <p className="italic mb-6 text-gray-600">cannot silence.</p>

        <p id="newsletter-modal-description" className="mb-4 text-sm text-gray-500">
          We're a bit shy—you won't see us too often in your inbox. Just once a
          week, with valuable insights and stories worth reading.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email to subscribe."
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-amber-700 transition"
            required
            aria-label="Email address for subscription"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="bg-amber-700 text-white rounded-lg px-4 py-2 w-full hover:bg-amber-800 transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "SUBSCRIBING..." : "SUBSCRIBE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterModal;