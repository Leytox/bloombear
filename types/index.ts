import { Product } from "@prisma/client";

export type CartItem = {
  productId: number;
  quantity: number;
  product: Product;
};

export type Cart = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

export type SortOption = "popular" | "price_asc" | "price_desc" | "new";

export type FilterState = {
  categoryIds: number[];
  occasionIds: number[];
  priceRange: [number, number];
  sortBy: SortOption;
};
