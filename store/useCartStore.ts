import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/generated/prisma";
import { Cart } from "@/types";

interface CartState {
  cart: Cart;
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  isItemInCart: (productId: number) => boolean;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearItems: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const initialCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: initialCart,
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        const { cart } = get();
        const existingItemIndex = cart.items.findIndex(
          (item) => item.productId === product.id
        );

        const newItems = [...cart.items];

        if (existingItemIndex >= 0) {
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity,
          };
        } else {
          newItems.push({
            productId: product.id,
            quantity,
            product,
          });
        }

        const newCart = {
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          ),
        };

        set({ cart: newCart });
      },

      isItemInCart: (productId: number) =>
        get().cart.items.some((item) => item.productId === productId),

      removeItem: (productId: number) => {
        const { cart } = get();
        const newItems = cart.items.filter(
          (item) => item.productId !== productId
        );

        const newCart = {
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          ),
        };

        set({ cart: newCart });
      },

      updateQuantity: (productId: number, quantity: number) => {
        const { cart, removeItem } = get();

        if (quantity <= 0) {
          removeItem(productId);
          return;
        }

        const newItems = cart.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );

        const newCart = {
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          ),
        };

        set({ cart: newCart });
      },

      clearItems: () => {
        set({ cart: initialCart });
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "cart-storage",
    }
  )
);
