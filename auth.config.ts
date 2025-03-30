import { NextAuthConfig } from "next-auth";
export default {
  providers: [],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
} satisfies NextAuthConfig;
