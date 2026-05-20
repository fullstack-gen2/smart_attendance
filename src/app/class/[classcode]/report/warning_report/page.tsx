"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter, UserRoundSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function StartPage() {
  const params = useParams<{ classcode?: string | string[] }>();
  const classcode = Array.isArray(params.classcode)
    ? params.classcode[0]
    : params.classcode;
  const warningStudentId = "728ed52f-6";

  return (
    <main className="min-h-screen bg-white px-2 py-6 sm:px-3 lg:px-4">
      <section className="mx-auto mb-2 w-full max-w-6xl bg-[#ffffff] px-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="mt-4 mb-4 text-3xl font-semibold tracking-tight text-rose-950 sm:text-4xl">
              Bachelor
            </h1>
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-full border border-white-200 bg-white px-4 py-2 text-sm font-medium text-rose-900 transition hover:-translate-y-0.5 hover:bg-rose-50"
            >
              <span aria-hidden="true" className="mr-2 text-base">
                ←
              </span>
              Class List
            </Link>
          </div>
          <div className="pt-6 text-right text-l leading-tight text-[#1f1f1f]"></div>
        </div>
        <p className="mt-3 text-l text-[#1f1f1f]">Class: Bachelor</p>
        <h2 className="mt-2 text-3xl leading-tight text-[#1f1f1f]">
          Student Report List-April-Warning Student
        </h2>
      </section>
      <div className="mx-auto w-full max-w-6xl px-2 text-black">
        <div className="flex items-center justify-between gap-3 pb-4">
          <Input placeholder="Search name..." className="max-w-sm" />
          <div className="flex items-center gap-4">
            <Link
              href={classcode ? `/class/${classcode}/class_list` : "/class"}
              aria-label="Student list options"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 transition hover:bg-gray-50"
            >
              <UserRoundSearch className="h-5 w-5" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Filter"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 transition hover:bg-gray-50"
                >
                  <ListFilter className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 p-1">
                <DropdownMenuItem
                  asChild
                  className="justify-center text-sm text-gray-500 hover:text-black focus:text-black"
                >
                  <Link
                    href={classcode ? `/class/${classcode}/report` : "/class"}
                  >
                    Day Report
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="justify-center text-sm text-gray-500 hover:text-black focus:text-black"
                >
                  <Link
                    href={
                      classcode
                        ? `/class/${classcode}/report/weekly_report`
                        : "/class"
                    }
                  >
                    Weekly Report
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="justify-center text-sm text-gray-500 hover:text-black focus:text-black"
                >
                  <Link
                    href={
                      classcode
                        ? `/class/${classcode}/report/monthly_report`
                        : "/class"
                    }
                  >
                    Monthly Report
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="justify-center text-sm text-gray-500 hover:text-black focus:text-black"
                >
                  <Link
                    href={
                      classcode
                        ? `/class/${classcode}/report/warning_report`
                        : "/class"
                    }
                  >
                    Student Warning
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <p className="text-sm text-[#1f1f1f]">Total Date : 17 days</p>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead className="text-center">P</TableHead>
                <TableHead className="text-center">PM</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-red-500">6</TableCell>
                <TableCell className="text-red-500">
                  {warningStudentId}
                </TableCell>
                <TableCell>
                  <Image
                    width={50}
                    height={50}
                    src="https://i.pinimg.com/1200x/36/9d/8c/369d8c1a01f21c357fd77dd6538eaea5.jpg"
                    alt="Student 6 profile"
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                </TableCell>
                <TableCell className="text-red-500">Student 6</TableCell>
                <TableCell>Female</TableCell>
                <TableCell className="text-center">17</TableCell>
                <TableCell className="text-center">0</TableCell>
                <TableCell className="text-center">0</TableCell>
                <TableCell className="text-red-500">Warning</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-sm text-red-500">
          Note: 1 student with ID {warningStudentId} got a warning in April
        </p>
        <div className="mt-2 text-sm leading-relaxed">
          <p>P stand for Present</p>
          <p>PM stand for Permission</p>
          <p>L stand for Late</p>
        </div>
      </div>
    </main>
  );
}
