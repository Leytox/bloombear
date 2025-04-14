"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Occasion } from "@prisma/client";

export async function createOccasion({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: string;
}): Promise<Occasion | null> {
  try {
    const occasion = await prisma.occasion.create({
      data: {
        name,
        description,
        image,
      },
    });

    revalidatePath("/occasions");
    revalidatePath("/catalog");

    return occasion;
  } catch (error) {
    console.error("Failed to create occasion:", error);
    throw new Error("Failed to create occasion");
  }
}

export async function updateOccasion({
  id,
  name,
  description,
  image,
}: {
  id: number;
  name: string;
  description: string;
  image: string;
}): Promise<Occasion | null> {
  try {
    const occasion = await prisma.occasion.update({
      where: { id },
      data: {
        name,
        description,
        image,
      },
    });

    revalidatePath("/occasions");
    revalidatePath("/catalog");

    return occasion;
  } catch (error) {
    console.error("Failed to update occasion:", error);
    throw new Error("Failed to update occasion");
  }
}

export async function getOccasions(): Promise<Occasion[] | null> {
  return prisma.occasion.findMany();
}

export async function getOccasion(id: number): Promise<Occasion | null> {
  return prisma.occasion.findUnique({ where: { id } });
}
