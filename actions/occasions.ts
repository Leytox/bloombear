"use server";

import prisma from "@/lib/prisma";
import { Occasion } from "@prisma/client";

export async function getOccasions(): Promise<Occasion[]> {
  return prisma.occasion.findMany();
}
