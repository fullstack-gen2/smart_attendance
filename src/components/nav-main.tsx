"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import logo from "../../public/project-logo.png"
import { usePathname } from "next/navigation"
export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}
) {
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
          <div className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
        <SidebarMenu className="border-l">
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`rounded-md transition-all ${
                    isActive
                      ? "bg-gray-200 hover:bg-gray-300"
                      : "hover:bg-muted"
                  }`}
                  asChild
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-2 w-full"
                  >
                    {item.icon}

                    <span
                      className={`font-medium transition-colors ${
                        isActive
                          ? "text-black"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
