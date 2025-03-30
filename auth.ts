import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "./lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { getUserByLogin } from "./lib/user";

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

        if (!user) throw new CredentialsSignin();
        if (!user.password) throw new Error("User has no password");
        const passwordsMatch = bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        return {
          id: user.id,
          name: user.firstName,
          image: user.image,
        };
      },
    }),
  ],
});
