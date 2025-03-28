import {
  MenuIcon,
  FlowerIcon,
  PercentIcon,
  CreditCardIcon,
  PackageIcon,
  PhoneIcon,
  InfoIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./ui/sheet";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import Search from "./Search";
import Image from "next/image";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full h-full px-4">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-1 font-semibold font-raleway text-foreground text-2xl tracking-tight">
            <div className="relative size-8">
              <Image className="object-fit" fill src="/logo.svg" alt="logo" />
            </div>{" "}
            BloomBear
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Explore our products and promotions.
          </SheetDescription>
        </SheetHeader>
        <div className="relative">
          <Search />
        </div>
        <nav className="mb-8 w-full overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <SheetClose asChild>
              <Link href="/catalog" className="block">
                <Card className="transition-all hover:shadow-md hover:scale-105 h-full">
                  <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                    <FlowerIcon className="mb-2 text-primary" />
                    <span className="text-center font-medium">Catalog</span>
                  </CardContent>
                </Card>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/promotions" className="block">
                <Card className="transition-all hover:shadow-md hover:scale-105 h-full">
                  <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                    <PercentIcon className="mb-2 text-primary" />
                    <span className="text-center font-medium">Promotions</span>
                  </CardContent>
                </Card>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/payment" className="block">
                <Card className="transition-all hover:shadow-md hover:scale-105 h-full">
                  <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                    <CreditCardIcon className="mb-2 text-primary" />
                    <span className="text-center font-medium">Payment</span>
                  </CardContent>
                </Card>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/delivery" className="block">
                <Card className="transition-all hover:shadow-md hover:scale-105 h-full">
                  <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                    <PackageIcon className="mb-2 text-primary" />
                    <span className="text-center font-medium">Delivery</span>
                  </CardContent>
                </Card>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/contacts" className="block">
                <Card className="transition-all hover:shadow-md hover:scale-105 h-full">
                  <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                    <PhoneIcon className="mb-2 text-primary" />
                    <span className="text-center font-medium">Contacts</span>
                  </CardContent>
                </Card>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/about" className="block">
                <Card className="transition-all hover:shadow-md hover:scale-105 h-full">
                  <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                    <InfoIcon className="mb-2 text-primary" />
                    <span className="text-center font-medium">About Us</span>
                  </CardContent>
                </Card>
              </Link>
            </SheetClose>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
