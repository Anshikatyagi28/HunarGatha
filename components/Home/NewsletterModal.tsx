"use client";

import { SiSnapcraft } from "react-icons/si";
import React, { useState, useEffect } from "react";

// Firebase
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Toast Utils
import { showSuccess, showError } from "@/utils/toast";

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const hasSeen = localStorage.getItem("newsletterShown");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("newsletterShown", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await addDoc(collection(db, "newsletter"), {
        email,
        createdAt: serverTimestamp(),
      });

      showSuccess("Thanks for subscribing! 🎉");
      setIsOpen(false);
      setEmail("");
    } catch (error) {
      console.error("Error saving email:", error);
      showError("Something went wrong. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">GAATHA NEWSLETTER</h2>

        <div className="flex justify-center mb-4">
          <span className="text-red-500 mr-2">❤️</span>
          <span className="border-t border-gray-500 mx-2">
            <SiSnapcraft size={32} />
          </span>
          <span className="text-red-500 ml-2">❤️</span>
        </div>

        <p className="italic mb-2">Hearts speak</p>
        <p className="italic mb-2">a language that distance</p>
        <p className="italic mb-6">cannot silence.</p>

        <p className="mb-4">
          We're a bit shy—you won't see us too often in your inbox. Just once a
          week, with valuable insights and stories worth reading.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email to subscribe."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
            required
          />
          <button
            type="submit"
            className="bg-amber-700 text-white rounded-lg px-4 py-2 w-full hover:bg-amber-800"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterModal;
