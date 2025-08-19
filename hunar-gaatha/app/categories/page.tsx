'use client';

import { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ProductGrid from './ProductGrid';

const categories = [
  {
    id: 'pottery',
    name: 'Pottery',
    icon: 'ri-ancient-gate-line',
    description: 'Traditional clay crafts from master potters',
    count: 156
  },
  {
    id: 'handloom',
    name: 'Handloom',
    icon: 'ri-shirt-line',
    description: 'Woven textiles and fabrics',
    count: 234
  },
  {
    id: 'handicraft',
    name: 'Handicraft',
    icon: 'ri-hammer-line',
    description: 'Artisanal decorative items',
    count: 189
  },
  {
    id: 'fragrances',
    name: 'Fragrances (Itar)',
    icon: 'ri-flask-line',
    description: 'Natural perfumes and essential oils',
    count: 87
  },
  {
    id: 'food',
    name: 'Food & Organics',
    icon: 'ri-plant-line',
    description: 'Traditional foods and organic products',
    count: 123
  }
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('pottery');
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');

  return (
    <div className="min-h-screen bg-[#F8F3EC]">
      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-[#2C2A4A] text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Explore by Craft Type
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Discover authentic Indian crafts organized by traditional art forms. 
                Each piece tells a story of heritage and skilled craftsmanship.
              </p>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center space-x-8 py-6 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-[#B66E41] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className={`${category.icon} w-5 h-5 flex items-center justify-center`}></i>
                  <span className="font-medium">{category.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Category Header */}
        <div className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {categories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  {categories.find(cat => cat.id === selectedCategory)?.description}
                </p>
              </div>
              
              {/* Filters and Sort */}
              <div className="flex items-center space-x-4">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B66E41] pr-8"
                >
                  <option value="all">All Items</option>
                  <option value="gifting">Best for Gifting</option>
                  <option value="eco">Eco-friendly</option>
                  <option value="festive">Festive Pick</option>
                  <option value="available">In Stock</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B66E41] pr-8"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">New Arrivals</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid category={selectedCategory} sortBy={sortBy} filterBy={filterBy} />
      </main>

    </div>
  );
} 