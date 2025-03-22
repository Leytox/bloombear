"use server";

import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";

export async function getCategories(): Promise<Category[]> {
  return prisma.category.findMany();
}

export async function getCategory(id: number): Promise<Category | null> {
  return prisma.category.findUnique({ where: { id } });
}
