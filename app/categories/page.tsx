'use client';

import { useEffect, useMemo, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ProductGrid from './ProductGrid';
import { Filter, Grid2x2, Grid3x3, X } from 'lucide-react';
import { CiGrid41 } from 'react-icons/ci';
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { RiSearchLine } from 'react-icons/ri';

const categories = [
  { id: 'pottery', name: 'Pottery', icon: 'ri-ancient-gate-line', description: 'Traditional clay crafts from master potters', count: 156 },
  { id: 'handloom', name: 'Handloom', icon: 'ri-shirt-line', description: 'Woven textiles and fabrics', count: 234 },
  { id: 'handicraft', name: 'Handicraft', icon: 'ri-hammer-line', description: 'Artisanal decorative items', count: 189 },
  { id: 'fragrances', name: 'Fragrances (Itar)', icon: 'ri-flask-line', description: 'Natural perfumes and essential oils', count: 87 },
  { id: 'food', name: 'Food & Organics', icon: 'ri-plant-line', description: 'Traditional foods and organic products', count: 123 }
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('pottery');
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // default grid = 3; we'll hydrate from localStorage on mount
  const [gridCols, setGridCols] = useState(3);

  // grid options (icons provided as components)
  const gridOptions = [
    { cols: 2, Icon: Grid2x2, label: '2 Columns' },
    { cols: 3, Icon: Grid3x3, label: '3 Columns' },
    { cols: 4, Icon: CiGrid41, label: '4 Columns' },
  ];

  // hydrate gridCols from localStorage (client-only)
  useEffect(() => {
    try {
      const saved = parseInt(localStorage.getItem('gridCols'), 10);
      if (!isNaN(saved)) setGridCols(saved);
    } catch (err) {
      // ignore (private window / blocked storage)
    }
  }, []);

  // persist gridCols to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('gridCols', String(gridCols));
    } catch (err) {
      // ignore storage errors
    }
  }, [gridCols]);

  const handleGridChange = (cols) => setGridCols(cols);

  // keyboard nav on focused button
  const handleKeyDown = (e, currentIndex) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (currentIndex + dir + gridOptions.length) % gridOptions.length;
      setGridCols(gridOptions[nextIndex].cols);
    }
  };

  const selectedCategoryData = useMemo(
    () => categories.find(cat => cat.id === selectedCategory) || categories[0],
    [selectedCategory]
  );

  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryFilterChange = (newFilters) => {
    // stub — implement as needed
    console.log('New filters:', newFilters);
  };

  const products = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: `Product ${i + 1}`,
  price: (Math.random() * 100 + 20).toFixed(2),
  image: `https://via.placeholder.com/300x200?text=Product+${i + 1}`,
}));


  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <div className="bg-gradient-to-tl from-[#da9432] via-[#b17e18] to-[#855309] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Explore by Craft Type
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Discover authentic Indian crafts organized by traditional art forms.
            </p>
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <RiSearchLine className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a craft, product, or artisan..."
                  className="w-full pl-10 pr-4 py-3 rounded-full text-gray-900 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-[#B66E41] transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      <main className="flex ">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out shadow-lg 
            ${isSidebarOpen ? 'w-72 p-4' : 'w-0 p-0 overflow-hidden'}`}
        >
          <div className="flex justify-between items-center pb-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Categories & Filters</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="py-4 space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex w-full items-center space-x-3 px-4 py-2  text-left transition-all 
                  ${selectedCategory === category.id
                    ? 'bg-[#B66E41] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                aria-current={selectedCategory === category.id ? 'true' : 'false'}
              >
                <i className={`${category.icon} w-5 h-5`} />
                <span className="flex-1">{category.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-300 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          <div className="py-4">
            <h3 className="text-lg font-semibold mb-2">Refine Results</h3>
            <CategoryFilter onFilterChange={handleCategoryFilterChange} />
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          <div className="bg-white py-4 px-6 flex items-center justify-between border-b">
            <div className="flex items-center space-x-4">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="px-4 py-2 bg-[#B66E41] text-white  shadow-md hover:bg-[#8D5832] flex items-center"
                  aria-label="Open categories sidebar"
                >
                  <BsLayoutSidebarInsetReverse className="inline-block h-4 w-4 mr-2" />
                  Categories
                </button>
              )}

              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 border  text-sm"
                aria-label="Filter products"
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
                className="px-3 py-2 border  text-sm"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Grid Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>

              {gridOptions.map(({ cols, Icon, label }, index) => {
                const active = gridCols === cols;
                return (
                  <button
                    key={cols}
                    onClick={() => handleGridChange(cols)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-pressed={active}
                    title={label}
                    className={`p-2 border rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#B66E41] 
                      ${active ? 'bg-gray-200 border-gray-400' : 'hover:bg-gray-100 border-gray-300'}`}
                    aria-label={`Show ${label}`}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            <div className="bg-gradient-to-r from-[#B66E41] to-[#D4A06B] text-white p-8 rounded-xl shadow-lg mb-6">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 tracking-tight">
                  {selectedCategoryData.name}: Shop Authentic Crafts
                </h1>
                <p className="text-lg text-gray-100">{selectedCategoryData.description}</p>
              </div>
            </div>

            <ProductGrid
              category={selectedCategory}
              sortBy={sortBy}
              filterBy={filterBy}
              gridCols={gridCols}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
