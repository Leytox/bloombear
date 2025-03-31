import type { Metadata } from "next";
import "../globals.css";
import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CrmSidebar } from "@/components/crm/CrmSidebar";
import CrmHeader from "@/components/crm/CrmHeader";

export const metadata: Metadata = {
  title: "BloomBear CRM",
  description: "Shop CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <CrmSidebar />
      <SidebarInset>
        <CrmHeader />
        <main className="p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
