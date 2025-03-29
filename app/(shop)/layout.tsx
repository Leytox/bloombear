import type { Metadata } from "next";
import { Onest, Raleway } from "next/font/google";
import "../globals.css";
import React from "react";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import GoTop from "@/components/GoTop";
import { Analytics } from "@vercel/analytics/react";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "BloomBear",
  description: "Best flowers for your loved ones",
  keywords: ["flowers", "delivery", "gifts"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${onest.variable} ${raleway.variable} antialiased`}>
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
            <GoTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
