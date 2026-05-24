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
import { ArrowUpDown, ListFilter } from "lucide-react";
import { LuUserSearch } from "react-icons/lu";
import Image from "next/image";
import { monthlyReportAttendance } from "@/lib/mockupData/attendance";
import { classInfo } from "@/lib/mockupData/data";
import { data as students } from "@/lib/mockupData/student";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function StartPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"order" | "name">("order");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const params = useParams<{ classcode?: string | string[] }>();
  const classcode = Array.isArray(params.classcode)
    ? params.classcode[0]
    : params.classcode;
  const classCode = Number(classcode);
  const currentClass =
    classInfo.find((item) => item.code === classCode) ??
    classInfo.find((item) => item.code % 100 === classCode);
  const classBaseHref = classcode ? `/class/${classcode}` : "/class";

  const reportLinks = [
    { href: `${classBaseHref}/report`, label: "Day Report" },
    { href: `${classBaseHref}/report/weekly_report`, label: "Weekly Report" },
    { href: `${classBaseHref}/report/monthly_report`, label: "Monthly Report" },
    { href: `${classBaseHref}/report/warning_report`, label: "Warning Report" },
  ];
  const warningStudents = students
    .map((student, index) => ({
      order: index + 1,
      student,
      stat: monthlyReportAttendance[index],
    }))
    .filter((item) => (item.stat?.p ?? 0) < 15);

  const displayedWarningStudents = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const filtered = warningStudents.filter(({ student }) =>
      student.name.toLowerCase().includes(keyword),
    );

    return filtered.sort((a, b) => {
      if (sortBy === "order") {
        return sortDirection === "asc" ? a.order - b.order : b.order - a.order;
      }
      const nameCompare = a.student.name.localeCompare(b.student.name);
      return sortDirection === "asc" ? nameCompare : -nameCompare;
    });
  }, [warningStudents, search, sortBy, sortDirection]);

  const toggleSort = (field: "order" | "name") => {
    if (sortBy === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortBy(field);
    setSortDirection("asc");
  };

  return (
    <main className="min-h-screen bg-white px-2 py-6 sm:px-3 lg:px-4">
      <section className="mx-auto mb-2 w-full max-w-6xl bg-[#ffffff] px-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="mt-4 mb-4 text-3xl font-semibold tracking-tight text-rose-950 sm:text-4xl">
              {currentClass?.name ?? "Class"}
            </h1>
          </div>
        </div>
        <p className="mt-3 text-l text-[#1f1f1f]">
          ProgramType: {currentClass?.programType ?? "-"}
        </p>
        <h2 className="mt-2 text-3xl leading-tight text-[#1f1f1f]">
          Student Report List-April-Warning Student
        </h2>
      </section>
      <div className="mx-auto w-full max-w-6xl px-2 text-black">
        <div className="flex items-center justify-between gap-3 pb-4">
          <Input
            placeholder="Search name..."
            className="max-w-sm"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="flex items-center gap-4">
            <Link
              href={classcode ? `/class/${classcode}/class_list` : "/class"}
              aria-label="Class List"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 transition hover:bg-gray-50"
            >
              <LuUserSearch className="h-5 w-5" />
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
                {reportLinks.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className="justify-center text-sm text-gray-500 hover:text-black focus:text-black"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
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
                <TableHead>
                  <button
                    type="button"
                    onClick={() => toggleSort("order")}
                    className="inline-flex items-center"
                  >
                    No.
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>
                  <button
                    type="button"
                    onClick={() => toggleSort("name")}
                    className="inline-flex items-center"
                  >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>Gender</TableHead>
                <TableHead className="text-center">P</TableHead>
                <TableHead className="text-center">PM</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedWarningStudents.map(({ order, student, stat }) => (
                <TableRow key={student.id}>
                  <TableCell className="text-[#ff0000]">{order}</TableCell>
                  <TableCell className="text-[#ff0000]">{student.id}</TableCell>
                  <TableCell>
                    <Image
                      width={50}
                      height={50}
                      src={student.profile}
                      alt={`${student.name} profile`}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                  </TableCell>
                  <TableCell className="text-[#ff0000]">{student.name}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell className="text-center">{stat?.p ?? 0}</TableCell>
                  <TableCell className="text-center">{stat?.pm ?? 0}</TableCell>
                  <TableCell className="text-center">{stat?.l ?? 0}</TableCell>
                  <TableCell className="text-[#ff0000]">Warning</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-sm text-red-500">
          Note: {displayedWarningStudents.length} student(s) got a warning in
          April
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
