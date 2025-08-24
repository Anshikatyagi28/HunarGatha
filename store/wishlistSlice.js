import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Load wishlist from localStorage on initialization
const loadWishlistFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedWishlist = localStorage.getItem('hunarGaatha-wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : { items: [] };
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return { items: [] };
    }
  }
  return { items: [] };
};

// Save wishlist to localStorage
const saveWishlistToStorage = (items) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('hunarGaatha-wishlist', JSON.stringify({ items }));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    ...initialState,
    ...loadWishlistFromStorage(),
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (!existingItem) {
        state.items.push(product);
        toast.success(`${product.name} added to wishlist`);
      } else {
        toast.info(`${product.name} is already in wishlist`);
      }
      
      saveWishlistToStorage(state.items);
    },
    
    removeItem: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);
      state.items = state.items.filter(item => item.id !== productId);
      
      if (item) {
        toast.success(`${item.name} removed from wishlist`);
      }
      
      saveWishlistToStorage(state.items);
    },
    
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
      toast.success('Wishlist cleared');
    },
  },
});

export const {
  addItem,
  removeItem,
  clearWishlist,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsInWishlist = (state, productId) => 
  state.wishlist.items.some(item => item.id === productId);

export default wishlistSlice.reducer;
