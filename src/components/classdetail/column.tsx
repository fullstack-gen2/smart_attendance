"use client";

import { AttendanceList } from "@/lib/mockupdatafordatatable";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<AttendanceList>[] = [
  {
    accessorKey: "order",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "profile",
    header: "Profile",
    cell: ({ row }) => {
      const profileUrl = row.original.profile;

      if (!profileUrl) {
        return <span>No image</span>;
      }

      return (
        <Image
          width={50}
          height={50}
          src={profileUrl}
          alt={`${row.original.name} profile`}
          className="h-10 w-10 rounded-xl object-cover"
        />
      );
    },
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
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of birth",
  },
];
