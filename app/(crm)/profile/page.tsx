import { auth } from "@/auth";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div>
      <div className="relative size-18 rounded-full overflow-hidden">
        <Image
          className="object-cover"
          src={session?.user?.image || ""}
          alt="User Image"
          fill
        />
      </div>
      <p>Welcome, {session?.user?.name}!</p>
    </div>
  );
}
