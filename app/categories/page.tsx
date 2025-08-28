'use client';

import { useEffect, useMemo, useState, FC, ChangeEvent, KeyboardEvent } from 'react';
import CategoryFilter from './CategoryFilter'; // Assumed to be a separate component
import ProductGrid from './ProductGrid'; // Assumed to be a separate component
import { Grid2x2, Grid3x3, X } from 'lucide-react';
import { CiGrid41 } from 'react-icons/ci';
import { RxDropdownMenu } from 'react-icons/rx';
import { RiSearchLine } from 'react-icons/ri';
import Head from 'next/head';
import Link from 'next/link';

// =================================================================
// TYPE DEFINITIONS AND DATA
// =================================================================

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

interface GridOption {
  cols: number;
  Icon: FC<any>;
  label: string;
}

// Defining a type for the dynamic filter state from CategoryFilter
interface FilterState {
  priceRange: [number, number];
  selectedSizes: string[];
  selectedDistricts: string[];
}

// Define the props for ProductGrid
interface ProductGridProps {
  products: { id: string; name: string; price: number; image: string; category: string; }[];
  sortBy: 'price-low' | 'price-high' | 'newest' | 'popular' | null;
  filterBy: 'gifting' | 'eco' | 'festive' | 'available' | null;
  gridCols: number;
  category: string;
}
const categories: Category[] = [
  { id: 'pottery', name: 'Pottery', icon: 'ri-ancient-gate-line', description: 'Traditional clay crafts from master potters', count: 156 },
  { id: 'handloom', name: 'Handloom', icon: 'ri-shirt-line', description: 'Woven textiles and fabrics', count: 234 },
  { id: 'handicraft', name: 'Handicraft', icon: 'ri-hammer-line', description: 'Artisanal decorative items', count: 189 },
  { id: 'fragrances', name: 'Fragrances (Itar)', icon: 'ri-flask-line', description: 'Natural perfumes and essential oils', count: 87 },
  { id: 'food', name: 'Food & Organics', icon: 'ri-plant-line', description: 'Traditional foods and organic products', count: 123 }
];

const gridOptions: GridOption[] = [
  { cols: 2, Icon: Grid2x2, label: '2 Columns' },
  { cols: 3, Icon: Grid3x3, label: '3 Columns' },
  { cols: 4, Icon: CiGrid41, label: '4 Columns' },
];

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: String(i),
  name: `Product ${i + 1}`,
  price: parseFloat((Math.random() * 100 + 20).toFixed(2)),
  image: `https://via.placeholder.com/300x200?text=Product+${i + 1}`,
  category: i % 2 === 0 ? 'pottery' : 'handloom',
  inStock: i % 3 !== 0, // Example: some products are out of stock
  tags: i % 2 === 0 ? ['eco', 'gifting'] : ['festive'],
  rating: Math.round(Math.random() * 50) / 10, // 0.0 to 5.0
  reviews: Math.floor(Math.random() * 100),
  artisan: `Artisan ${i + 1}`,
  district: i % 2 === 0 ? 'District A' : 'District B',
}));

// =================================================================
// MAIN COMPONENT
// =================================================================

const CategoriesPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('pottery');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest' | 'popular' | null>(null);
  const [filterBy, setFilterBy] = useState<'gifting' | 'eco' | 'festive' | 'available' | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [gridCols, setGridCols] = useState<number>(3);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilters, setCategoryFilters] = useState<FilterState | null>(null);

  // Use a single useEffect for hydration from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gridCols');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (gridOptions.some(option => option.cols === parsed)) {
          setGridCols(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to read from localStorage:', err);
    }
  }, []);

  // Use a single useEffect for persistence to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gridCols', String(gridCols));
    } catch (err) {
      console.error('Failed to write to localStorage:', err);
    }
  }, [gridCols]);

  const handleGridChange = (cols: number) => {
    setGridCols(cols);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (currentIndex + dir + gridOptions.length) % gridOptions.length;
      setGridCols(gridOptions[nextIndex].cols);
    }
  };

  // Memoize selected category data for performance
  const selectedCategoryData = useMemo(
    () => categories.find(cat => cat.id === selectedCategory) || categories[0],
    [selectedCategory]
  );

  // Memoize the filtering logic to prevent unnecessary re-computation
  const filteredProducts = useMemo(() => {
    let currentProducts = mockProducts.filter(p => p.category === selectedCategory);
    
    // Apply search filter
    if (searchQuery) {
      currentProducts = currentProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply main filters (filterBy, sortBy)
    // Example logic for sortBy (replace with your actual sorting)
    if (sortBy === 'price-low') {
      currentProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      currentProducts.sort((a, b) => b.price - a.price);
    }

    // Apply filters from the CategoryFilter component
    if (categoryFilters) {
      // You would implement the logic to filter by price range, sizes, and districts here
      // Example:
      // currentProducts = currentProducts.filter(p => p.price >= categoryFilters.priceRange[0] && p.price <= categoryFilters.priceRange[1]);
    }

    return currentProducts;
  }, [mockProducts, selectedCategory, searchQuery, sortBy, categoryFilters]);

  return (
    <>
      <Head>
        <title>{selectedCategoryData.name} Crafts | HunarGaatha</title>
        <meta name="description" content={`Discover authentic ${selectedCategoryData.name} crafts from India. Shop handmade pottery, textiles, and more.`} />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-800">
        <div className="bg-gradient-to-tl from-[#da9432] via-[#b17e18] to-[#855309] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Explore by Craft Type</h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Discover authentic Indian crafts organized by traditional art forms.
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <RiSearchLine className="w-5 h-5" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a craft, product, or artisan..."
                  className="w-full pl-10 pr-4 py-3 rounded-full text-gray-900 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-[#B66E41] transition-all duration-300"
                  aria-label="Search for products"
                />
              </div>
            </div>
          </div>
        </div>

        <main className="flex">
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
                <X className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </button>
            </div>

            <div className="py-4 space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className={`flex w-full items-center space-x-3 px-4 py-2 text-left transition-all rounded-lg
                    ${selectedCategory === category.id
                      ? 'bg-[#B66E41] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  aria-current={selectedCategory === category.id ? 'page' : 'false'}
                >
                  <i className={`${category.icon} w-5 h-5`} aria-hidden="true" />
                  <span className="flex-1">{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>

            <div className="py-4">
              <h3 className="text-lg font-semibold mb-2">Refine Results</h3>
              <CategoryFilter onFilterChange={setCategoryFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white py-4 px-6 flex flex-col sm:flex-row items-center justify-between border-b">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                {!isSidebarOpen && (
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="px-4 py-2 bg-[#B66E41] text-white shadow-md hover:bg-[#8D5832] flex items-center rounded-md"
                    aria-label="Open categories sidebar"
                  >
                    <RxDropdownMenu className="inline-block h-4 w-4 mr-2" aria-hidden="true" />
                    Categories
                  </button>
                )}
                
                <select
                  value={filterBy ?? ''}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    const value = e.target.value as 'gifting' | 'eco' | 'festive' | 'available' | '';
                    setFilterBy(value === '' ? null : value);
                  }}
                  className="px-3 py-2 border rounded-md text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B66E41]"
                  aria-label="Filter products"
                >
                  <option value="">All Items</option>
                  <option value="gifting">Best for Gifting</option>
                  <option value="eco">Eco-friendly</option>
                  <option value="festive">Festive Pick</option>
                  <option value="available">In Stock</option>
                </select>

                <select
                  value={sortBy ?? ''}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    const value = e.target.value as 'price-low' | 'price-high' | 'newest' | 'popular' | '';
                    setSortBy(value === '' ? null : value);
                  }}
                  className="px-3 py-2 border rounded-md text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B66E41]"
                  aria-label="Sort products"
                >
                  <option value="">Featured</option>
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
                      className={`p-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#B66E41] 
                        ${active ? 'bg-gray-200 border-gray-400' : 'hover:bg-gray-100 border-gray-300'}`}
                      aria-label={`Show ${label}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6">
              <div className="bg-gradient-to-r from-[#B66E41] to-[#D4A06B] text-white p-8 rounded-xl shadow-lg mb-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-4xl font-bold mb-2 tracking-tight">
                    {selectedCategoryData.name}: Shop Authentic Crafts
                  </h2>
                  <p className="text-lg text-gray-100">{selectedCategoryData.description}</p>
                </div>
              </div>
              <ProductGrid
                products={filteredProducts}
                sortBy={sortBy}
                filterBy={filterBy}
                gridCols={gridCols}
                category={selectedCategory}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoriesPage;