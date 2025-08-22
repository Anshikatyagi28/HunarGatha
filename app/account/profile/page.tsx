'use client';

import { motion } from "framer-motion";
import { User, Heart, Package, Settings, LogOut } from "lucide-react";

export default function UserProfilePage() {
  const user = {
    name: "Meera Sharma",
    email: "meera@hunargaatha.com",
    avatar: "https://i.pravatar.cc/150?img=47"
  };

  const profileOptions = [
    {
      title: "My Orders",
      icon: <Package className="w-6 h-6 text-[#B66E41]" />,
      description: "Track and manage your orders"
    },
    {
      title: "Wishlist",
      icon: <Heart className="w-6 h-6 text-[#D6A400]" />,
      description: "Your saved crafts & favorites"
    },
    {
      title: "Profile Settings",
      icon: <Settings className="w-6 h-6 text-[#4E6E58]" />,
      description: "Update your details & preferences"
    },
    {
      title: "Logout",
      icon: <LogOut className="w-6 h-6 text-[#7B2D26]" />,
      description: "Sign out of HunarGatha"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center gap-6 mb-12"
      >
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-28 h-28 rounded-full shadow-lg border-4 border-[#F8F3EC]"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#2C2A4A]">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-[#B66E41] mt-2 font-medium">
            Verified HunarGatha Member
          </p>
        </div>
      </motion.div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {profileOptions.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4 hover:shadow-xl transition"
          >
            <div className="p-3 rounded-full bg-[#F8F3EC] flex items-center justify-center">
              {option.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#2C2A4A]">
                {option.title}
              </h2>
              <p className="text-gray-600 text-sm">{option.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
