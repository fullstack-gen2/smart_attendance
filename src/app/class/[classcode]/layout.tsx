"use client";

import { Fragment } from "react";
import { AppSidebar } from "@/components/sidebar2/app-sidebarV2";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function getClassBreadcrumbTrail(pathname: string) {
  if (pathname.includes("/history_list")) {
    return ["Student Attendance List", "History Student Attendance List"];
  }
  if (pathname.includes("/attendance_taking/attendance_list/attendance_amandment")) {
    return [
      "Take Student Attendance",
      "Student Daily Attendance",
      "Student Attendance List Amendment",
    ];
  }
  if (pathname.includes("/attendance_taking/attendance_list")) {
    return ["Take Student Attendance", "Student Daily Attendance"];
  }
  if (pathname.includes("/attendance_taking")) {
    return ["Take Student Attendance"];
  }
  if (pathname.includes("/report/warning_report")) {
    return ["Class Report", "Warning Report"];
  }
  if (pathname.includes("/report/monthly_report")) {
    return ["Class Report", "Monthly Report"];
  }
  if (pathname.includes("/report/weekly_report")) {
    return ["Class Report", "Weekly Report"];
  }
  if (pathname.includes("/report")) {
    return ["Class Report", "Student Daily Report"];
  }
  if (pathname.includes("/class_list")) {
    return ["Student Attendance List"];
  }
  return ["Student Attendance List"];
}

export default function Page({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  const pathname = usePathname();
  const trail = getClassBreadcrumbTrail(pathname);

  return (
    <div className="min-h-screen">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="min-h-screen">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage>Class Information</BreadcrumbPage>
                  </BreadcrumbItem>
                  {trail.map((label, index) => (
                    <Fragment key={`${label}-${index}`}>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{label}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {modal ?? null}
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
