"use server";

import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function createCategory({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: string;
}): Promise<Category | null> {
  const slug = slugify(name, { lower: true });

  try {
    const category = await prisma.category.create({
      data: {
        name,
        description,
        image,
        slug,
      },
    });

    revalidatePath("/categories");
    revalidatePath("/catalog");

    return category;
  } catch (error) {
    console.error("Failed to create category:", error);
    throw new Error("Failed to create category");
  }
}

export async function updateCategory({
  id,
  name,
  description,
  image,
}: {
  id: number;
  name: string;
  description: string;
  image: string;
}): Promise<Category | null> {
  const slug = slugify(name, { lower: true });

  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        image,
        slug,
      },
    });

    revalidatePath("/categories");
    revalidatePath("/catalog");

    return category;
  } catch (error) {
    console.error("Failed to update category:", error);
    throw new Error("Failed to update category");
  }
}

export async function deleteCategory(id: number): Promise<{ success: boolean }> {
  try {
    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/categories");
    revalidatePath("/catalog");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    throw new Error("Failed to delete category");
  }
}
export async function getCategories(): Promise<Category[] | null> {
  return prisma.category.findMany();
}

export async function getCategory(id: number): Promise<Category | null> {
  return prisma.category.findUnique({ where: { id } });
}
