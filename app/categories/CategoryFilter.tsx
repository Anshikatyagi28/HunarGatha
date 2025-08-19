'use client';

import { useState } from 'react';

export default function CategoryFilter({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  const sizes = ['Small', 'Medium', 'Large', 'XL', 'Set of 2', 'Set of 4'];
  const districts = ['Kannauj', 'Lucknow', 'Azamgarh', 'Varanasi', 'Agra', 'Moradabad'];

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleDistrictToggle = (district) => {
    setSelectedDistricts(prev => 
      prev.includes(district) 
        ? prev.filter(d => d !== district)
        : [...prev, district]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Filters</h3>
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            placeholder="Min"
            className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            placeholder="Max"
            className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
          />
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Size</h4>
        <div className="space-y-2">
          {sizes.map(size => (
            <label key={size} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeToggle(size)}
                className="rounded border-gray-300 text-[#B66E41] focus:ring-[#B66E41]"
              />
              <span className="ml-2 text-sm text-gray-700">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* District Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Origin District</h4>
        <div className="space-y-2">
          {districts.map(district => (
            <label key={district} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedDistricts.includes(district)}
                onChange={() => handleDistrictToggle(district)}
                className="rounded border-gray-300 text-[#B66E41] focus:ring-[#B66E41]"
              />
              <span className="ml-2 text-sm text-gray-700">{district}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          setPriceRange([0, 10000]);
          setSelectedSizes([]);
          setSelectedDistricts([]);
        }}
        className="w-full py-2 text-sm text-[#B66E41] border border-[#B66E41] rounded-md hover:bg-[#B66E41] hover:text-white transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
} 