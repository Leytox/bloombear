import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";

const Footer = () => {
  return (
    <footer className="bg-muted pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Company Info */}
          <div className="flex flex-col gap-2 items-center text-center col-span-2 xs:col-span-2 sm:col-span-2 md:col-span-1 mb-4 md:mb-0">
            <div className="relative size-16 hidden max-sm:block">
              <Image className="object-fit" fill src="/logo.svg" alt="logo" />
            </div>
            <div className="flex gap-2 items-center">
              <div className="relative size-10 max-sm:hidden">
                <Image className="object-fit" fill src="/logo.svg" alt="logo" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-muted-foreground">
                BloomBear
              </h3>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
              Delivery of fresh flowers and bouquets in Berlin and the region
            </p>
            <div className="flex gap-3 md:gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                aria-label="Facebook"
              >
                <SiFacebook />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                aria-label="Instagram"
              >
                <SiInstagram />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                aria-label="X (Twitter)"
              >
                <SiX />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center text-center mb-2 md:mb-0">
            <h3 className="font-semibold mb-2 md:mb-4 text-sm md:text-base">
              Information
            </h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/payment"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Payment
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col items-center text-center mb-2 md:mb-0">
            <h3 className="font-semibold mb-2 md:mb-4 text-sm md:text-base">
              Categories
            </h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <li>
                <Link
                  href="/catalog/roses"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Roses
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/lilies"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Lilies
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/orchids"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Orchids
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/plants"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Plants
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Centered on mobile */}
          <div className="mb-2 w-full flex flex-col items-center justify-center md:mb-0 text-center md:text-left col-span-2 sm:col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-2 md:mb-4 text-sm md:text-base">
              Contact Us
            </h3>
            <ul className="space-y-3 md:space-y-2 text-xs md:text-sm">
              <li className="text-muted-foreground">
                <a href="tel:+49991234567">📞 +49 (999) 123-45-67</a>
              </li>
              <li className="text-muted-foreground">
                <a href="https://goo.gl/maps/1234567890">
                  📍 Berlin, Germany, 123 Main Street
                </a>
              </li>
              <li className="text-muted-foreground">
                <a href="mailto:info@bloombear.de">✉️ info@bloombear.de</a>
              </li>
              <li className="text-muted-foreground">
                🕒 Monday-Friday <time>8:00 to 22:00</time>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-4 md:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-muted-foreground text-center sm:text-left text-xs sm:text-sm">
              © {new Date().getFullYear()} BloomBear. All rights reserved.
            </p>
            {/* Privacy and Terms links - always in a row */}
            <div className="flex flex-row gap-4 text-center sm:text-left text-xs sm:text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
