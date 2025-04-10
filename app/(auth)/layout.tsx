import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "BloomBear Authorization",
  description: "Shop CRM Authorization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
