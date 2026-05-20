"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export type ReportAttendanceRow = {
  order: number;
  id: string;
  profile: string;
  name: string;
  gender: string;
  p: number | string;
  pm: number | string;
  l: number | string;
  status: string;
  nameTone?: "normal" | "warning" | "danger";
};

export const reportColumns: ColumnDef<ReportAttendanceRow>[] = [
  {
    accessorKey: "order",
    header: "No.",
    cell: ({ row }) => row.original.order,
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "profile",
    header: "Profile",
    cell: ({ row }) => (
      <Image
        width={50}
        height={50}
        src={row.original.profile}
        alt={`${row.original.name} profile`}
        className="h-12 w-12 rounded-xl object-cover"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const tone = row.original.nameTone ?? "normal";
      const toneClass =
        tone === "warning"
          ? "text-amber-500"
          : tone === "danger"
            ? "text-red-500"
            : "text-black";
      return <span className={toneClass}>{row.original.name}</span>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "p",
    header: () => <div className="w-6 text-center">P</div>,
    cell: ({ row }) => <div className="w-6 text-center">{row.original.p}</div>,
  },
  {
    accessorKey: "pm",
    header: () => <div className="w-6 text-center">PM</div>,
    cell: ({ row }) => <div className="w-6 text-center">{row.original.pm}</div>,
  },
  {
    accessorKey: "l",
    header: () => <div className="w-6 text-center">L</div>,
    cell: ({ row }) => <div className="w-6 text-center">{row.original.l}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: () => (
      <div className="flex justify-center">
        <ChevronDown className="h-4 w-4 text-black" />
      </div>
    ),
  },
];
