"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  EllipsisVerticalIcon,
  CircleUserRoundIcon,
  BellIcon,
  LogOutIcon,
  LogInIcon,
  Loader2,
} from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session, status } = useSession();

  const loading = status === "loading";
  const loggedIn = status === "authenticated";

  const displayName = session?.user?.name ?? "Guest";
  const displayEmail = session?.user?.email ?? "";
  const displayRole = session?.user?.role ?? "";
  const avatar = session?.user?.image ?? "";

  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              ) : (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={displayName} />
                  <AvatarFallback className="rounded-lg bg-[#273C97] text-white text-xs">
                    {loggedIn ? initials : "?"}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {loading ? "Loading…" : displayName}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {displayRole || displayEmail}
                </span>
              </div>
              <EllipsisVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={displayName} />
                  <AvatarFallback className="rounded-lg bg-[#273C97] text-white text-xs">
                    {loggedIn ? initials : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {displayEmail}
                  </span>
                  {displayRole && (
                    <span className="truncate text-xs font-medium text-[#273C97]">
                      {displayRole}
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleUserRoundIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {loggedIn ? (
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-red-600"
              >
                <LogOutIcon />
                Sign out
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => signIn("istad-iam")}>
                <LogInIcon />
                Sign in
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
