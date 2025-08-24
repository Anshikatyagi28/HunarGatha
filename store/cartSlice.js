import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  items: [],
  isOpen: false,
  loading: false,
  error: null,
};

// Load cart from localStorage on initialization
const loadCartFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedCart = localStorage.getItem('hunarGaatha-cart');
      return savedCart ? JSON.parse(savedCart) : { items: [] };
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return { items: [] };
    }
  }
  return { items: [] };
};

// Save cart to localStorage
const saveCartToStorage = (items) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('hunarGaatha-cart', JSON.stringify({ items }));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState,
    ...loadCartFromStorage(),
  },
  reducers: {
    addItem: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        toast.success(`Updated ${product.name} quantity`);
      } else {
        state.items.push({ ...product, quantity });
        toast.success(`${product.name} added to cart`);
      }
      
      saveCartToStorage(state.items);
    },
    
    removeItem: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);
      state.items = state.items.filter(item => item.id !== productId);
      
      if (item) {
        toast.success(`${item.name} removed from cart`);
      }
      
      saveCartToStorage(state.items);
    },
    
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        const item = state.items.find(item => item.id === productId);
        state.items = state.items.filter(item => item.id !== productId);
        if (item) {
          toast.success(`${item.name} removed from cart`);
        }
      } else {
        const item = state.items.find(item => item.id === productId);
        if (item) {
          item.quantity = quantity;
        }
      }
      
      saveCartToStorage(state.items);
    },
    
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
      toast.success('Cart cleared');
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    openCart: (state) => {
      state.isOpen = true;
    },
    
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartIsOpen = (state) => state.cart.isOpen;
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
