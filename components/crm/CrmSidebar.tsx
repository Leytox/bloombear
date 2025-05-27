import {
  BookImageIcon,
  ChartAreaIcon,
  ChartColumnStackedIcon,
  LayoutDashboardIcon,
  MessageCircleIcon,
  ScanBarcodeIcon,
  ShoppingBasketIcon,
  UserPlusIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { Role } from "@/generated/prisma";

// Main
const mainItems = [
  {
    title: "Orders",
    url: "/orders",
    icon: ScanBarcodeIcon,
  },
  {
    title: "Comments",
    url: "/comments",
    icon: MessageCircleIcon,
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
  {
    title: "Register employee",
    url: "/registration",
    icon: UserPlusIcon,
  },
];

const analyticsItems = [
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
          <div className="relative size-18 rounded-full overflow-hidden">
            <Image
              className="object-cover"
              src={session?.user?.image || ""}
              alt="User Image"
              fill
            />
          </div>
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
        {session?.user?.role !== Role.STAFF && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {analyticsItems.map((item) => (
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
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarHeader className="text-center text-muted-foreground">
          If anything goes wrong, contact support
        </SidebarHeader>
      </SidebarFooter>
    </Sidebar>
  );
}
