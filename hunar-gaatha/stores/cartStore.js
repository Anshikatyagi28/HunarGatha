import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
          toast.success(`Updated ${product.name} quantity`);
        } else {
          set({
            items: [...items, { ...product, quantity }]
          });
          toast.success(`${product.name} added to cart`);
        }
      },
      
      removeItem: (productId) => {
        const { items } = get();
        const item = items.find(item => item.id === productId);
        set({
          items: items.filter(item => item.id !== productId)
        });
        if (item) {
          toast.success(`${item.name} removed from cart`);
        }
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },
      
      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },
      
      openCart: () => {
        set({ isOpen: true });
      },
      
      closeCart: () => {
        set({ isOpen: false });
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'hunargatha-cart',
      partialize: (state) => ({ items: state.items })
    }
  )
);

export default useCartStore;