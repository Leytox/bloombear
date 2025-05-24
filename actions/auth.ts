"use server";
import { Role } from "@/generated/prisma";
import { signIn, signOut } from "@/auth";
import { createUser } from "@/lib/user";

export async function signUp(
  login: string,
  firstName: string,
  lastName: string,
  role: Role,
  password: string
) {
  try {
    await createUser(login, firstName, lastName, role, password);
    return { success: true };
  } catch (error) {
    throw error;
  }
}

export async function signInCredentials(login: string, password: string) {
  await signIn("credentials", {
    login,
    password,
    redirect: false,
  });
  return { success: true };
}

export async function signOutAll() {
  return await signOut({ redirectTo: "/login", redirect: true });
}
