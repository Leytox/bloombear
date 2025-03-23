import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, CheckCircle2Icon } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[calc(100vh-68px)]">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto size-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2Icon className="size-10 text-primary" />
        </div>

        <h1 className="text-3xl font-bold mb-3">Payment successful!</h1>

        <p className="text-muted-foreground mb-8">
          Thank you for your order! We will contact you shortly to confirm
          shipping details.
        </p>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/catalog">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Return to catalog
            </Link>
          </Button>

          <p className="text-sm text-muted-foreground">
            If you have any questions, please contact us by phone
            <br />
            <a
              href="tel:+494951234567"
              className="text-primary hover:underline"
            >
              +49 (495) 123-45-67
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
