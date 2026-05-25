"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { GrMenu } from "react-icons/gr";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuCheckboxes() {
  const router = useRouter()
  const pathname = usePathname()
  const isHistoryPage = pathname === "/dashboard/history_class"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-3">
          <GrMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-40 p-1">
        <DropdownMenuGroup>
          <DropdownMenuCheckboxItem
            checked={!isHistoryPage}
            onSelect={() => router.push("/dashboard")}
          >
            Active Class
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={isHistoryPage}
            onSelect={() => router.push("/dashboard/history_class")}
          >
            History
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
