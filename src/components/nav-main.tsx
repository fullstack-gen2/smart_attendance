"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const LOGO_URL =
  "https://res.cloudinary.com/dsmqsivcj/image/upload/v1779733974/lwg6puq41ne1bpp9jywj.png";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    active?: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <div className="flex items-center px-2 py-1">
          <Image src={LOGO_URL} alt="Logo" width={90} height={90} unoptimized />
        </div>
        <SidebarMenu className="mt-4 gap-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={item.active}
                className={
                  item.active
                    ? "bg-[#273C97] text-white hover:bg-[#1e2e7a] hover:text-white"
                    : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                }
              >
                <Link href={item.url} className="flex items-center gap-3 px-3 py-2">
                  <span className="shrink-0">{item.icon}</span>
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
