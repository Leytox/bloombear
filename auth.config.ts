import { NextAuthConfig } from "next-auth";
import { Role } from "@/generated/prisma";

export default {
  providers: [],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
  session: { strategy: "jwt" },
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
} satisfies NextAuthConfig;
