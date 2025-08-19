'use client';

const crafts = ['All Crafts', 'Moonj Basketry', 'Itar & Perfumes', 'Chikankari Embroidery', 'Black Pottery', 'Banarasi Silk Weaving', 'Brassware'];
const districts = ['All Districts', 'Amethi', 'Kannauj', 'Lucknow', 'Azamgarh', 'Varanasi', 'Moradabad'];
const badges = ['All Badges', 'Master Artisan', 'Origin Verified', 'Trainer', 'Heritage Keeper', 'Eco Artisan'];

export default function ArtisanFilter({
  selectedCraft,
  selectedDistrict,
  selectedBadge,
  sortBy,
  onCraftChange,
  onDistrictChange,
  onBadgeChange,
  onSortChange
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Filter Artisans</h3>
      
      {/* Craft Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">By Craft</h4>
        <select
          value={selectedCraft}
          onChange={(e) => onCraftChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B66E41] pr-8"
        >
          {crafts.map(craft => (
            <option key={craft} value={craft}>{craft}</option>
          ))}
        </select>
      </div>

      {/* District Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">By District</h4>
        <select
          value={selectedDistrict}
          onChange={(e) => onDistrictChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B66E41] pr-8"
        >
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      {/* Badge Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">By Badge</h4>
        <select
          value={selectedBadge}
          onChange={(e) => onBadgeChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B66E41] pr-8"
        >
          {badges.map(badge => (
            <option key={badge} value={badge}>{badge}</option>
          ))}
        </select>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B66E41] pr-8"
        >
          <option value="featured">Featured</option>
          <option value="name">Name (A-Z)</option>
          <option value="experience">Experience</option>
          <option value="rating">Rating</option>
          <option value="products">Products</option>
        </select>
      </div>

      {/* Clear All */}
      <button
        onClick={() => {
          onCraftChange('All Crafts');
          onDistrictChange('All Districts');
          onBadgeChange('All Badges');
          onSortChange('featured');
        }}
        className="w-full py-2 text-sm text-[#B66E41] border border-[#B66E41] rounded-md hover:bg-[#B66E41] hover:text-white transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
} 