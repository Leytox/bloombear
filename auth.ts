import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "./lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { getUserByLogin } from "./lib/user";
import { Role } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        login: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ login: z.string().min(1), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success)
          throw new Error("Incorrect data format");

        const { login, password } = parsedCredentials.data;
        const user = await getUserByLogin(login);

        if (!user) throw new Error("No user found");
        const passwordsMatch = bcrypt.compareSync(password, user.password);
        if (!passwordsMatch)
          throw new CredentialsSignin("Password is incorrect");

        return {
          id: user.id,
          name: user.firstName,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
});
