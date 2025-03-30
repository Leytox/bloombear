import { auth } from "@/auth";
import Image from "next/image";

export default async function ProfilePage() {
  throw new Error("asdf");
  const session = await auth();

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {session?.user?.name}!</p>
      <div className="relative size-18 rounded-full overflow-hidden">
        <Image
          className="object-cover"
          src={session?.user?.image || ""}
          alt="User Image"
          fill
        />
      </div>
    </div>
  );
}
