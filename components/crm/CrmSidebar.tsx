import {
  BookImageIcon,
  ChartAreaIcon,
  ChartColumnStackedIcon,
  LayoutDashboardIcon,
  ScanBarcodeIcon,
  ShoppingBasketIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";

// Main
const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartAreaIcon,
  },

  {
    title: "Orders",
    url: "/orders",
    icon: ScanBarcodeIcon,
  },
];

const databaseItems = [
  {
    title: "Categories",
    url: "/categories",
    icon: ChartColumnStackedIcon,
  },
  {
    title: "Occasions",
    url: "/occasions",
    icon: BookImageIcon,
  },
  {
    title: "Products",
    url: "/products",
    icon: ShoppingBasketIcon,
  },
];

export async function CrmSidebar() {
  const session = await auth();
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <h1 className="flex items-center gap-1 text-foreground text-4xl font-semibold tracking-tight">
            <div className="relative size-10">
              <Image className="object-fit" fill src="/logo.svg" alt="logo" />
            </div>
            BloomBear
          </h1>
        </div>
        <div className="flex flex-row gap-2 mt-4 items-center">
          <Link
            href="/profile"
            className="relative size-18 rounded-full overflow-hidden"
          >
            <Image
              className="object-cover"
              src={session?.user?.image || ""}
              alt="User Image"
              fill
            />
          </Link>
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium">{session?.user?.name}</p>
            <p className="text-xs text-muted-foreground font-medium">
              Welcome to the CRM
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Database Items</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {databaseItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
