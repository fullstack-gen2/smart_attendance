"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/sidebar2/nav-main";

import { NavUser } from "@/components/sidebar2/nav-user";
import { TeamSwitcher } from "@/components/sidebar2/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Class",
      url: "#",
      icon: SquareTerminal,
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

  const navMain = data.navMain.map((section) => ({
    ...section,
    items: section.items?.map((item) =>
      item.title === "Students Attendance List"
        ? { ...item, url: classcode ? `/class/${classcode}` : "/class" }
        : item.title === "Class report"
          ? {
              ...item,
              url: classcode ? `/class/${classcode}/report` : "/class/report",
            }
          : item,
    ),
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
