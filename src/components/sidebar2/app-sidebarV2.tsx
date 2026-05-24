"use client";

import * as React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, BookOpenIcon } from "lucide-react";

import { NavMain } from "@/components/sidebar2/nav-main";

import { NavUser } from "@/components/sidebar2/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import logo from "../../../public/project-logo.png";

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
          title: "Student Attendance List",
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
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ classcode?: string | string[] }>();
  const classcode = Array.isArray(params.classcode)
    ? params.classcode[0]
    : params.classcode;
  const classBasePath = classcode ? `/class/${classcode}` : "/class";
  const isAttendanceTakingRoot = /\/attendance_taking\/?$/.test(pathname);
  const isAttendanceListRoute = /\/attendance_taking\/attendance_list\/?$/.test(
    pathname,
  );
  const isAttendanceAmandmentRoute =
    /\/attendance_taking\/attendance_list\/attendance_amandment\/?$/.test(
      pathname,
    );
  const shouldDisableBackButton =
    isAttendanceTakingRoot || isAttendanceAmandmentRoute;

  const navMain = data.navMain.map((section) => ({
    ...section,
    items: section.items?.map((item) => {
      if (item.title === "Student Attendance List") {
        return {
          ...item,
          url: classcode ? `/class/${classcode}` : "/attendance/class",
        };
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
        <div className="p-3">
          <Image
            src={logo}
            alt="iCheck Logo"
            width={100}
            height={100}
            priority
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-3 pt-2 group-data-[collapsible=icon]:hidden">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Back"
              onClick={() => {
                if (shouldDisableBackButton) return;
                if (isAttendanceListRoute) {
                  router.push("/dashboard");
                  return;
                }
                router.back();
              }}
              disabled={shouldDisableBackButton}
              className="text-base text-[#363A3F]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
