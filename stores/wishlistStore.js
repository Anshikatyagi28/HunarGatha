import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);
        
        if (!existingItem) {
          set({
            items: [...items, product]
          });
          toast.success(`${product.name} added to wishlist`);
        } else {
          toast.info(`${product.name} is already in wishlist`);
        }
      },
      
      removeItem: (productId) => {
        const { items } = get();
        const item = items.find(item => item.id === productId);
        set({
          items: items.filter(item => item.id !== productId)
        });
        if (item) {
          toast.success(`${item.name} removed from wishlist`);
        }
      },
      
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      },
      
      clearWishlist: () => {
        set({ items: [] });
        toast.success('Wishlist cleared');
      }
    }),
    {
      name: 'hunarGaatha-wishlist'
    }
  )
);

export default useWishlistStore;