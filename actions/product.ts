"use server";

import prisma from "@/lib/prisma";
import { Prisma, Product } from "@prisma/client";

export type ProductFilterParams = {
  categoryIds?: number[];
  occasionIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "popular" | "price_asc" | "price_desc" | "new";
  searchQuery?: string;
};

export async function getFilteredProducts(
  filters: ProductFilterParams = {},
): Promise<Product[]> {
  const {
    categoryIds = [],
    occasionIds = [],
    minPrice,
    maxPrice,
    sortBy = "popular",
    searchQuery,
  } = filters;

  // Build the where clause
  const where: Prisma.ProductWhereInput = {};

  // Add price range filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  // Add category filter
  if (categoryIds.length > 0) where.categoryId = { in: categoryIds };

  // Add search query filter
  if (searchQuery) where.name = { contains: searchQuery, mode: "insensitive" };

  // Add occasion filter (this requires a more complex query)
  if (occasionIds.length > 0) {
    const occasionFilter = {
      occasions: {
        some: {
          occasionId: { in: occasionIds },
        },
      },
    };
    // Merge with existing where clause
    where.AND = where.AND
      ? [...(where.AND as Prisma.ProductWhereInput[]), occasionFilter]
      : [occasionFilter];
  }

  // Determine ordering
  let orderBy = {};
  switch (sortBy) {
    case "price_asc":
      orderBy = { price: "asc" };
      break;
    case "price_desc":
      orderBy = { price: "desc" };
      break;
    case "new":
      orderBy = { createdAt: "desc" };
      break;
    case "popular":
    default:
      orderBy = { rating: "desc" };
      break;
  }

  // Execute the query
  return prisma.product.findMany({
    where,
    orderBy,
    include: {
      occasions: {
        include: {
          occasion: true,
        },
      },
      category: true,
    },
  });
}

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    include: {
      occasions: true,
      category: true,
    },
  });
}

export async function getProduct(id: number): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      occasions: {
        include: {
          occasion: true,
        },
      },
    },
  });
}

export async function getSimilarProducts(
  categoryId: number,
): Promise<Product[]> {
  return prisma.product.findMany({
    where: {
      categoryId,
    },
    include: {
      occasions: true,
      category: true,
    },
    take: 4,
  });
}

export async function searchProducts(query: string): Promise<Product[]> {
  return prisma.product.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
    include: {
      occasions: true,
      category: true,
    },
  });
}

export async function getMinMaxPrices(): Promise<{ min: number; max: number }> {
  const products = await prisma.product.findMany({
    select: {
      price: true,
    },
    orderBy: {
      price: "asc",
    },
  });

  if (products.length === 0) return { min: 0, max: 0 };

  return {
    min: products[0].price,
    max: products[products.length - 1].price,
  };
}
