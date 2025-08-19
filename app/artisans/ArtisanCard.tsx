'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ArtisanCard({ artisan }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  // const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Master Artisan':
        return 'bg-[#D6A400] text-white';
      case 'Origin Verified':
        return 'bg-[#4E6E58] text-white';
      case 'Trainer':
        return 'bg-[#7B2D26] text-white';
      case 'Heritage Keeper':
        return 'bg-[#B66E41] text-white';
      case 'Eco Artisan':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'Master Artisan':
        return 'ri-award-line';
      case 'Origin Verified':
        return 'ri-shield-check-line';
      case 'Trainer':
        return 'ri-graduation-cap-line';
      case 'Heritage Keeper':
        return 'ri-ancient-gate-line';
      case 'Eco Artisan':
        return 'ri-leaf-line';
      default:
        return 'ri-medal-line';
    }
  };

  const playVoiceClip = () => {
    // setIsAudioPlaying(true);
    // Simulate audio playing
    // setTimeout(() => setIsAudioPlaying(false), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-[#B66E41]/10 to-[#2C2A4A]/10 p-6 flex items-center justify-center">
          <img
            src={artisan.photo}
            alt={artisan.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        
        {/* Video Play Button */}
        <button
          onClick={() => setIsVideoOpen(true)}
          className="absolute top-4 right-4 w-10 h-10 bg-[#B66E41] rounded-full flex items-center justify-center text-white hover:bg-[#A55A35] transition-colors"
        >
          <i className="ri-play-fill w-5 h-5 flex items-center justify-center"></i>
        </button>
        
        {/* Voice Clip Button */}
        {/* <button
          onClick={playVoiceClip}
          className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors ${
            isAudioPlaying ? 'bg-red-500 animate-pulse' : 'bg-[#4E6E58] hover:bg-[#3D5145]'
          }`}
        >
          <i className={`${isAudioPlaying ? 'ri-stop-fill' : 'ri-mic-fill'} w-5 h-5 flex items-center justify-center`}></i>
        </button> */}
      </div>

      <div className="p-6">
        {/* Basic Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{artisan.name}</h3>
          <p className="text-[#B66E41] font-medium">{artisan.district}, Uttar Pradesh</p>
          <p className="text-gray-600 text-sm">{artisan.craft} • {artisan.experience} experience</p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1 justify-center mb-4">
          {artisan.badges.map((badge) => (
            <span
              key={badge}
              className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${getBadgeColor(badge)}`}
            >
              <i className={`${getBadgeIcon(badge)} w-3 h-3 flex items-center justify-center mr-1`}></i>
              {badge}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="text-lg font-bold text-[#B66E41]">{artisan.products}</p>
            <p className="text-xs text-gray-600">Products</p>
          </div>
          <div>
            <p className="text-lg font-bold text-[#B66E41]">{artisan.rating}</p>
            <p className="text-xs text-gray-600">Rating</p>
          </div>
          <div>
            <p className="text-lg font-bold text-[#B66E41]">{artisan.totalSales}</p>
            <p className="text-xs text-gray-600">Sales</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm line-clamp-3">{artisan.bio}</p>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-900 mb-2">Specializes in:</p>
          <div className="flex flex-wrap gap-1">
            {artisan.specialties.map((specialty) => (
              <span
                key={specialty}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Link
              href={`/artisans/${artisan.id}`}
              className="flex-1 py-2 bg-[#B66E41] text-white rounded-lg text-center font-medium hover:bg-[#A55A35] transition-colors whitespace-nowrap cursor-pointer"
            >
              View Profile
            </Link>
            <Link
              href={`/products?artisan=${artisan.id}`}
              className="flex-1 py-2 border border-[#B66E41] text-[#B66E41] rounded-lg text-center font-medium hover:bg-[#B66E41] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              See Products
            </Link>
          </div>
          
          {/* Contact Toggle */}
          <button
            onClick={() => setShowContact(!showContact)}
            className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <i className="ri-contacts-line w-4 h-4 flex items-center justify-center"></i>
            <span>{showContact ? 'Hide Contact' : 'Show Contact'}</span>
          </button>
          
          {/* Contact Info */}
          {showContact && (
            <div className="bg-gray-50 p-3 rounded-lg space-y-2">
              {artisan.contact.whatsapp && (
                <a
                  href={`https://wa.me/${artisan.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm"
                >
                  <i className="ri-whatsapp-line w-4 h-4 flex items-center justify-center"></i>
                  <span>WhatsApp</span>
                </a>
              )}
              {artisan.contact.email && (
                <a
                  href={`mailto:${artisan.contact.email}`}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <i className="ri-mail-line w-4 h-4 flex items-center justify-center"></i>
                  <span>Email</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">{artisan.name} at Work</h3>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
              >
                <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <i className="ri-video-line w-12 h-12 flex items-center justify-center text-gray-400 mx-auto mb-2"></i>
                  <p className="text-gray-600">Video: {artisan.name} crafting {artisan.craft}</p>
                  <p className="text-sm text-gray-500 mt-2">Watch the artisan create beautiful {artisan.craft}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 