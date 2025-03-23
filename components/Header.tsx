import React from "react";
import Link from "next/link";
import {
  CreditCardIcon,
  FlowerIcon,
  PackageIcon,
  PercentIcon,
} from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import MobileMenu from "./MobileMenu";
import HeaderCartButton from "./HeaderCartButton";
import Search from "./Search";
import HeaderFavoriteButton from "./HeaderFavoriteButton";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-background border-b sticky top-0 z-50">
      {/* Main header */}
      <div className="container mx-auto py-4 max-sm:pl-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 max-md:mx-auto md:mx-0"
            >
              <h1 className="flex items-center gap-1 text-foreground text-4xl font-semibold tracking-tight max-md:text-2xl max-xl:text-3xl">
                <div className="relative size-10 max-sm:size-8">
                  <Image
                    className="object-fit"
                    fill
                    src="/logo.svg"
                    alt="logo"
                  />
                </div>
                BloomBear
              </h1>
            </Link>
          </div>
          <div className="mx-8 max-md:hidden w-full">
            <Search />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="max-lg:hidden">
              <ul className="flex items-center justify-center gap-6 max-xl:gap-4 font-onest text-md font-semibold text-sm max-xl:text-xs">
                <li title="Catalog">
                  <Link
                    href="/catalog"
                    className="flex gap-1 items-center text-muted-foreground hover:text-foreground duration-150"
                  >
                    <FlowerIcon size={20} />{" "}
                    <h3 className="font-bold">Catalog</h3>
                  </Link>
                </li>
                <li title="Promotions">
                  <Link
                    href="/promotions"
                    className="flex gap-1 items-center text-muted-foreground hover:text-foreground duration-150"
                  >
                    <PercentIcon size={20} />{" "}
                    <h3 className="font-bold">Promotions</h3>
                  </Link>
                </li>
                <li title="Payment Methods">
                  <Link
                    href="/payment"
                    className="flex gap-1 items-center text-muted-foreground hover:text-foreground duration-150"
                  >
                    <CreditCardIcon size={20} />{" "}
                    <h3 className="font-bold">Payment</h3>
                  </Link>
                </li>
                <li title="Delivery information">
                  <Link
                    href="/delivery"
                    className="flex gap-1 items-center text-muted-foreground hover:text-foreground duration-150"
                  >
                    <PackageIcon size={20} />{" "}
                    <h3 className="font-bold">Delivery</h3>
                  </Link>
                </li>
              </ul>
            </nav>
            <ThemeSwitcher />
            <HeaderFavoriteButton />
            <HeaderCartButton />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
