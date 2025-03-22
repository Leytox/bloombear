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
