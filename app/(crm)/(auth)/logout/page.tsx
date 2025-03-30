import { signOutAll } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { ArrowRightSquareIcon } from "lucide-react";

export default function SignOutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center">
      <div className="container">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl">Are you sure you want to sign out?</h1>
          <form action={signOutAll}>
            <Button type="submit" size={"lg"} variant={"destructive"}>
              Sign out <ArrowRightSquareIcon />
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
