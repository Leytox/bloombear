import { Role } from "@prisma/client";

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: Role;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
  }

  interface Session {
    user: User & {
      id: string;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
} 