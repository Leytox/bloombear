"use server";

import { prisma } from "@/lib/prisma";
import { Category, Occasion, Prisma, Product } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { deleteImage } from "./cloudinary";
export type ProductWithOccasions = Product & {
  category: Category | null;
  occasions: Occasion[];
};

export type ProductFilterParams = {
  categoryIds?: number[];
  occasionIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "popular" | "price_asc" | "price_desc" | "new";
  searchQuery?: string;
};

export async function getFilteredProducts(
  filters: ProductFilterParams = {}
): Promise<Product[] | null> {
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

export async function getProducts(): Promise<Product[] | null> {
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
  categoryId: number
): Promise<Product[] | null> {
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

export async function searchProducts(query: string): Promise<Product[] | null> {
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

export async function createProduct({
  name,
  description = "",
  price,
  discount = 0,
  image = "",
  inStock = true,
  categoryId,
  occasionIds = [],
}: {
  name: string;
  description?: string;
  price: number;
  discount?: number;
  image?: string;
  inStock?: boolean;
  categoryId: number;
  occasionIds?: number[];
}): Promise<Product | null> {
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        discount,
        image,
        inStock,
        categoryId,
        rating: 0,
      },
    });

    if (occasionIds.length > 0) {
      await prisma.productOnOccasion.createMany({
        data: occasionIds.map((occasionId) => ({
          productId: product.id,
          occasionId,
        })),
      });
    }

    revalidatePath("/products");
    revalidatePath("/catalog");
    revalidatePath(`/product/${product.id}`);
    revalidatePath("/");
    return product;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw new Error("Failed to create product");
  }
}

export async function getProductDetails(
  id: number
): Promise<ProductWithOccasions | null> {
  try {
    const product = await prisma.product.findUnique({
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

    if (!product) return null;

    return {
      ...product,
      occasions: product.occasions.map((po) => po.occasion),
    };
  } catch (error) {
    console.error("Failed to get product details:", error);
    return null;
  }
}

export async function updateProduct({
  id,
  name,
  description,
  price,
  discount = 0,
  image,
  inStock,
  categoryId,
  rating,
  occasionIds = [],
}: {
  id: number;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  image?: string;
  inStock?: boolean;
  categoryId: number;
  rating: number;
  occasionIds?: number[];
}): Promise<Product | null> {
  try {
    await prisma.productOnOccasion.deleteMany({
      where: { productId: id },
    });

    const oldProduct = await prisma.product.findUnique({ where: { id } });
    if (oldProduct?.image) await deleteImage(oldProduct.image);

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        discount,
        image,
        inStock,
        categoryId,
        rating,
      },
    });

    if (occasionIds.length > 0) {
      await prisma.productOnOccasion.createMany({
        data: occasionIds.map((occasionId) => ({
          productId: id,
          occasionId,
        })),
      });
    }

    revalidatePath("/products");
    revalidatePath("/catalog");
    revalidatePath(`/product/${id}`);
    revalidatePath("/");

    return product;
  } catch (error) {
    console.error("Failed to update product:", error);
    throw new Error("Failed to update product");
  }
}
