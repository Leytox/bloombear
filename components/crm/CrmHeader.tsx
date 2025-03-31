"use client";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../ThemeSwitcher";
import Link from "next/link";
import { Button } from "../ui/button";
import { SquareArrowLeftIcon } from "lucide-react";

export default function CrmHeader() {
  const pathname = usePathname();
  return (
    <header className="flex h-16 items-center border-b px-4 justify-between">
      <div className="flex shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            {!pathname.startsWith("/dashboard") && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {pathname.charAt(1).toUpperCase() + pathname.substring(2)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Link href="/logout">
          <Button variant={"ghost"} size={"icon"}>
            <SquareArrowLeftIcon />
          </Button>
        </Link>
      </div>
    </header>
  );
}
