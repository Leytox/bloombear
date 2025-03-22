import { Product } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialFavorites = {
  items: [],
};

export const useFavoriteStore = create<{
  favorites: { items: Product[] };
  addFavorite: (item: Product) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}>()(
  persist(
    (set, get) => ({
      favorites: initialFavorites,

      addFavorite: (item: Product) => {
        set((state: { favorites: { items: Product[] } }) => ({
          favorites: {
            items: [...state.favorites.items, item],
          },
        }));
      },
      removeFavorite: (id: number) => {
        set((state: { favorites: { items: Product[] } }) => ({
          favorites: {
            items: state.favorites.items.filter((item) => item.id !== id),
          },
        }));
      },

      isFavorite: (id: number) =>
        get().favorites.items.some((item: Product) => item.id === id),
    }),
    {
      name: "favorites",
    },
  ),
);
