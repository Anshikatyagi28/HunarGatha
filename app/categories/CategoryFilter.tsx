'use client';

import { useState, useEffect, FC } from 'react';
import { motion } from 'framer-motion';

// Define the shape of the component's props
interface FilterState {
  priceRange: [number, number];
  selectedSizes: string[];
  selectedDistricts: string[];
}

interface CategoryFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

const sizes: string[] = ['Small', 'Medium', 'Large', 'XL', 'Set of 2', 'Set of 4'];
const districts: string[] = ['Kannauj', 'Lucknow', 'Azamgarh', 'Varanasi', 'Agra', 'Moradabad'];

const CategoryFilter: FC<CategoryFilterProps> = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  // Use a single useEffect to debounce the filter change
  // This prevents the parent component from re-rendering on every single input change
  useEffect(() => {
    // Pass the current filter state to the parent component after a delay
    const debounceTimeout = setTimeout(() => {
      onFilterChange({
        priceRange,
        selectedSizes,
        selectedDistricts,
      });
    }, 300); // 300ms debounce delay

    // Cleanup function to clear the timeout
    return () => clearTimeout(debounceTimeout);
  }, [priceRange, selectedSizes, selectedDistricts, onFilterChange]);

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleDistrictToggle = (district: string) => {
    setSelectedDistricts(prev => 
      prev.includes(district) 
        ? prev.filter(d => d !== district)
        : [...prev, district]
    );
  };

  const handleClearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedSizes([]);
    setSelectedDistricts([]);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([isNaN(value) ? 0 : value, priceRange[1]]);
  };
  
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([priceRange[0], isNaN(value) ? 10000 : value]);
  };

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold mb-6">Filters</h3>
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="flex items-center space-x-4">
          <label htmlFor="min-price" className="sr-only">Minimum Price</label>
          <input
            id="min-price"
            type="number"
            placeholder="Min"
            className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={priceRange[0]}
            onChange={handleMinPriceChange}
          />
          <span className="text-gray-500">to</span>
          <label htmlFor="max-price" className="sr-only">Maximum Price</label>
          <input
            id="max-price"
            type="number"
            placeholder="Max"
            className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Size</h4>
        <div className="space-y-2">
          {sizes.map(size => (
            <label key={size} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeToggle(size)}
                className="rounded border-gray-300 text-[#B66E41] focus:ring-[#B66E41] transition-colors"
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
            <label key={district} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDistricts.includes(district)}
                onChange={() => handleDistrictToggle(district)}
                className="rounded border-gray-300 text-[#B66E41] focus:ring-[#B66E41] transition-colors"
              />
              <span className="ml-2 text-sm text-gray-700">{district}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={handleClearFilters}
        className="w-full py-2 text-sm text-[#B66E41] border border-[#B66E41] rounded-md hover:bg-[#B66E41] hover:text-white transition-colors"
      >
        Clear All Filters
      </button>
    </motion.div>
  );
};

export default CategoryFilter;