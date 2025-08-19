'use client';

import { useState } from 'react';
import Link from 'next/link';
import DistrictMap from './DistrictMap';
import DistrictInfo from './DistrictInfo';
import {districtsData} from '@/data/districtsData'

export default function DistrictsPage() {
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [hoveredDistrict, setHoveredDistrict] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2 animate-fade-in-up">
                        🎨 The Artisan Map of Uttar Pradesh
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-100">
                        Journey through the heart of India's craft heritage. Click on a district to unveil its unique crafts, master artisans, and cultural stories.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Map Section */}
                    <div className="lg:col-span-2 relative">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-yellow-400/30 transition-all duration-500 hover:shadow-3xl">
                            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                                Uttar Pradesh Craft Map
                            </h2>
                            <DistrictMap
                                districts={districtsData}
                                selectedDistrict={selectedDistrict}
                                hoveredDistrict={hoveredDistrict}
                                onDistrictClick={setSelectedDistrict}
                                onDistrictHover={setHoveredDistrict}
                            />
                            {/* Map Legend */}
                            <div className="mt-8 flex flex-wrap gap-4 justify-center">
                                <span className="flex items-center text-sm font-medium text-gray-700">
                                    <span className="w-4 h-4 bg-[#B66E41] rounded-full mr-2 shadow-inner"></span>
                                    Handicraft
                                </span>
                                <span className="flex items-center text-sm font-medium text-gray-700">
                                    <span className="w-4 h-4 bg-[#4E6E58] rounded-full mr-2 shadow-inner"></span>
                                    Handloom
                                </span>
                                <span className="flex items-center text-sm font-medium text-gray-700">
                                    <span className="w-4 h-4 bg-[#D6A400] rounded-full mr-2 shadow-inner"></span>
                                    Manufacturing
                                </span>
                                <span className="flex items-center text-sm font-medium text-gray-700">
                                    <span className="w-4 h-4 bg-[#7B2D26] rounded-full mr-2 animate-pulse-slow"></span>
                                    Selected
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* District Information */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-10">
                            {selectedDistrict ? (
                                <DistrictInfo district={selectedDistrict} />
                            ) : (
                                <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border-4 border-gray-100 transition-all duration-500">
                                    <div className="mb-6 animate-bounce-slow">
                                        <i className="ri-map-2-line text-6xl text-yellow-500"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-blue-900 mb-3">
                                        Select a District to Learn More
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Click on any of the vibrant dots on the map or a card below to discover its unique heritage.
                                    </p>
                                    <div className="space-y-2 text-left text-sm text-gray-500">
                                        <p>✨ Find <strong className="text-blue-900">8 unique districts</strong></p>
                                        <p>🏺 Discover <strong className="text-blue-900">traditional crafts</strong> and their history</p>
                                        <p>🧑‍🎨 Meet <strong className="text-blue-900">master artisans</strong> and their works</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Districts Grid */}
                <div className="mt-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
                            All Districts & Their Crafts
                        </h2>
                        <p className="text-lg text-gray-600">
                            A quick overview of all the regions and their specialities.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {districtsData.map((district) => (
                            <div
                                key={district.id}
                                onClick={() => setSelectedDistrict(district)}
                                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer p-6 transform hover:scale-105 ${
                                    selectedDistrict?.id === district.id ? 'ring-4 ring-yellow-400' : ''
                                }`}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <i className="ri-palette-line text-2xl text-yellow-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-blue-900">{district.name}</h3>
                                        <p className="text-sm text-gray-500">{district.region}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm">
                                        <strong className="text-yellow-700">Crafts:</strong> {district.crafts.join(', ')}
                                    </p>
                                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                                        district.industryType.includes('Handicraft') ? 'bg-[#B66E41]/20 text-[#B66E41]' :
                                        district.industryType.includes('Handloom') ? 'bg-[#4E6E58]/20 text-[#4E6E58]' :
                                        'bg-[#D6A400]/20 text-[#D6A400]'
                                    }`}>
                                        {district.industryType}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Craft Tour CTA */}
                <div className="mt-20 bg-gradient-to-br from-blue-900 to-yellow-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl transform hover:scale-105 transition-transform duration-500">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                        Experience the Art, Not Just the Product
                    </h2>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Step into the workshops of master artisans. Our virtual tours offer a glimpse into the passion and skill behind every masterpiece.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/craft-tours"
                            className="px-8 py-4 bg-white text-blue-900 font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg transform hover:-translate-y-1"
                        >
                            <i className="ri-play-circle-fill mr-2"></i> Start Virtual Tour
                        </Link>
                        <Link
                            href="/artisans"
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-900 transition-all transform hover:-translate-y-1"
                        >
                            <i className="ri-team-line mr-2"></i> Meet All Artisans
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}