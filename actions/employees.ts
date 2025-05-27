"use server";
import { prisma } from "@/lib/prisma";
import { Role, User } from "@/generated/prisma";
import bcrypt from "bcrypt";
import { auth } from "@/middleware";

export async function getEmployees(): Promise<User[] | null> {
  const session = await auth();
  return await prisma.user.findMany({
    where: {
      id: { not: session?.user?.id },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function fireEmployee(id: string): Promise<User | null> {
  return await prisma.user.update({
    where: { id },
    data: { isFired: true },
  });
}

export async function unFireEmployee(id: string): Promise<User | null> {
  return await prisma.user.update({
    where: { id },
    data: { isFired: false },
  });
}

export async function changeRole(id: string, role: Role): Promise<User | null> {
  return await prisma.user.update({
    where: { id },
    data: { role },
  });
}

export async function changePassword(
  id: string,
  password: string
): Promise<User | null> {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });
}

export async function changeImage(
  id: string,
  image: string
): Promise<User | null> {
  return await prisma.user.update({
    where: { id },
    data: { image },
  });
}
