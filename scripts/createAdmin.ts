import { Role } from "@prisma/client";
import { createUser } from "@/lib/user";

async function createAdmin() {
  await createUser("admin", "admin", "admin", Role.ADMIN, "adminpass");
}

createAdmin()
  .then(() => {
    console.log("Admin created");
  })
  .catch((error) => {
    console.error(error);
  });