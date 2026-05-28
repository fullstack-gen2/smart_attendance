"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { BookOpenIcon } from "lucide-react";

import { NavMain } from "@/components/sidebar2/nav-main";

import { NavUser } from "@/components/sidebar2/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import logo from "../../../public/project-logo.png";
import Link from "next/link";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Class",
      url: "#",
      icon: BookOpenIcon,
      isActive: true,
      items: [
        {
          title: "Students Attendance List",
          url: "#",
        },
        {
          title: "Take Student Attendance",
          url: "#",
        },
        {
          title: "Class report",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const params = useParams<{ classcode?: string | string[] }>();
  const classcode = Array.isArray(params.classcode)
    ? params.classcode[0]
    : params.classcode;
  const classBasePath = classcode ? `/class/${classcode}` : "/class";

  const navMain = data.navMain.map((section) => ({
    ...section,
    items: section.items?.map((item) => {
      if (item.title === "Students Attendance List") {
        return { ...item, url: classBasePath };
      }

      if (item.title === "Take Student Attendance") {
        return { ...item, url: `${classBasePath}/attendance_taking` };
      }

      if (item.title === "Class report") {
        return { ...item, url: `${classBasePath}/report` };
      }

      return item;
    }),
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="px-2 py-1">
          <Link href={"/dashboard"}>
            <Image src={logo} alt="iCheck Logo" width={120} height={120} priority />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
