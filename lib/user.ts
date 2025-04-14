import bcrypt from "bcrypt";
import prisma from "./prisma";
import { Role } from "@prisma/client";

export async function createUser(
  login: string,
  firstName: string,
  lastName: string,
  role: Role,
  password: string,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        login,
      },
    });
    if (user) throw new Error("User already exists");
    password = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        login,
        firstName,
        lastName,
        role,
        password,
        image: "/default-avatar.jpg",
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getUserByLogin(login: string) {
  try {
    return await prisma.user.findUnique({
      where: { login },
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}
