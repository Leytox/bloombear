"use server";
import { Role } from "@prisma/client";
import { signIn, signOut } from "@/auth";
import { createUser } from "@/lib/user";

export async function signUp(
  login: string,
  firstName: string,
  lastName: string,
  role: Role,
  password: string,
) {
  try {
    await createUser(login, firstName, lastName, role, password);
    return { success: true };
  } catch (error) {
    throw error;
  }
}

export async function signInCredentials(login: string, password: string) {
  try {
    await signIn("credentials", {
      login,
      password,
      redirectTo: "/login",
      redirect: true,
    });
    return { success: true };
  } catch (error) {
    throw error;
  }
}

export async function signOutAll() {
  return await signOut({ redirectTo: "/login", redirect: true });
}
