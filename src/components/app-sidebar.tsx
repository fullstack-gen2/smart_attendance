"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  CalendarDays,
  Settings,
  Users,
  CirclePlus,
  History,
} from "lucide-react";

const defaultUser = {
  name: "Admin",
  email: "admin@istad.co",
  avatar: "/avatars/shadcn.jpg",
};

const navItems = [
  {
    title: "Classes",
    url: "/classes",
    icon: <LayoutDashboard />,
  },
  {
    title: "Schedule",
    url: "/schedule",
    icon: <CalendarDays />,
  },
  {
    title: "Students",
    url: "/students",
    icon: <Users />,
  },
  {
    title: "Create Class",
    url: "/classes/create",
    icon: <CirclePlus />,
  },
  {
    title: "History",
    url: "/classes/history",
    icon: <History />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
  },
];

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const items = navItems.map((item) => ({
    ...item,
    active: pathname === item.url || pathname.startsWith(item.url + "/"),
  }));

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5"
            >
              <NavMain items={items} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent />

      <SidebarFooter>
        <NavUser user={defaultUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
