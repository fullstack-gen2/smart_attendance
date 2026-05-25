"use client";

import { useState } from "react";
import { ClassCard } from "@/components/card/classCard";
import type { ClassroomResponse, DashboardSummary } from "@/lib/type/apiTypes";
import { LayoutGrid, LayoutList, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

interface DashboardClientProps {
  classrooms: ClassroomResponse[];
  summary: DashboardSummary | null;
}

const SHIFT_COLORS: Record<string, string> = {
  MORNING: "bg-[#273C97]",
  AFTERNOON: "bg-emerald-600",
  EVENING: "bg-violet-600",
  Morning: "bg-[#273C97]",
  Afternoon: "bg-emerald-600",
  Evening: "bg-violet-600",
};

function formatShift(shift: string | null | undefined): string {
  if (!shift) return "—";
  return shift.charAt(0).toUpperCase() + shift.slice(1).toLowerCase();
}

function formatStudentMeta(c: ClassroomResponse) {
  const parts: string[] = [];
  if (c.year != null) parts.push(`Year ${c.year}`);
  if (c.semester != null) parts.push(`Sem ${c.semester}`);
  if (parts.length === 0) return `Gen ${c.generation}`;
  return parts.join(" · ");
}

export default function DashboardClient({
  classrooms,
  summary,
}: DashboardClientProps) {
  const [view, setView] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [shiftFilter, setShiftFilter] = useState("All");

  const uniqueShifts = Array.from(new Set(classrooms.map((c) => c.shift)));
  const shifts = ["All", ...uniqueShifts];

  const filtered = classrooms.filter((c) => {
    const matchesSearch =
      c.className.toLowerCase().includes(search.toLowerCase()) ||
      c.classCode.toLowerCase().includes(search.toLowerCase());
    const matchesShift = shiftFilter === "All" || c.shift === shiftFilter;
    return matchesSearch && matchesShift;
  });

  const grouped = filtered.reduce<Record<string, ClassroomResponse[]>>(
    (acc, item) => {
      if (!acc[item.shift]) acc[item.shift] = [];
      acc[item.shift].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="px-5 py-8">
      {/* Stats cards */}
      {summary && (
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-[#273C97] to-blue-500 text-white shadow-md">
            <CardHeader className="pb-3">
              <CardDescription className="text-blue-100 text-sm font-medium">
                Total Classes
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-white tabular-nums">
                {summary.totalClasses}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md">
            <CardHeader className="pb-3">
              <CardDescription className="text-emerald-100 text-sm font-medium">
                Total Students
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-white tabular-nums">
                {summary.totalStudents}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-md">
            <CardHeader className="pb-3">
              <CardDescription className="text-violet-100 text-sm font-medium">
                Total Lecturers
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-white tabular-nums">
                {summary.totalLecturers}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md">
            <CardHeader className="pb-3">
              <CardDescription className="text-amber-100 text-sm font-medium">
                Total Attendance
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-white tabular-nums">
                {summary.totalAttendance}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      )}

      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="flex-1 text-3xl font-bold text-black">Class Info</h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {shifts.map((shift) => (
            <Button
              key={shift}
              variant={shiftFilter === shift ? "default" : "outline"}
              size="sm"
              onClick={() => setShiftFilter(shift)}
              className={
                shiftFilter === shift
                  ? `${SHIFT_COLORS[shift] ?? "bg-[#273C97]"} text-white`
                  : ""
              }
            >
              {shift === "All" ? "All" : formatShift(shift)}
            </Button>
          ))}
        </div>

        <div className="flex gap-1 rounded-lg border p-1">
          <Button
            variant={view === "card" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("card")}
            className={view === "card" ? "bg-[#273C97] text-white" : ""}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("list")}
            className={view === "list" ? "bg-[#273C97] text-white" : ""}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-gray-400">
          <p className="text-xl">No classes found</p>
          <p className="mt-1 text-sm">
            Try adjusting the search or filter criteria
          </p>
        </div>
      )}

      {/* Card view */}
      {view === "card" &&
        Object.entries(grouped).map(([shift, classes]) => (
          <section key={shift} className="mb-10 last:mb-0">
            <div className="mb-6 inline-flex rounded-full border border-gray-300 bg-white px-6 py-3 text-lg shadow-sm">
              {formatShift(shift)} Shift &mdash; {classes.length} class
              {classes.length !== 1 ? "es" : ""}
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
              {classes.map((c) => (
                <ClassCard
                  key={c.id}
                  title={c.className}
                  status={c.status ? "Active" : "Inactive"}
                  classNameValue={`${c.programTypeName} Gen${c.generation}`}
                  shift={formatShift(c.shift)}
                  time={`${c.startDate} ~ ${c.endDate}`}
                  students={formatStudentMeta(c)}
                  code={c.classCode}
                  href={`/classes/${c.id}`}
                  headerClassName={
                    c.status
                      ? (SHIFT_COLORS[c.shift] ?? "bg-[#273C97]")
                      : "bg-gray-400"
                  }
                />
              ))}
            </div>
          </section>
        ))}

      {/* List view */}
      {view === "list" && filtered.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-[#273C97] text-white">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">
                  Class Name
                </th>
                <th className="px-5 py-4 text-left font-semibold">Code</th>
                <th className="px-5 py-4 text-left font-semibold">Program</th>
                <th className="px-5 py-4 text-left font-semibold">Shift</th>
                <th className="px-5 py-4 text-left font-semibold">Period</th>
                <th className="px-5 py-4 text-left font-semibold">Status</th>
                <th className="px-5 py-4 text-left font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={c.id}
                  className={`border-t border-gray-100 transition-colors hover:bg-blue-50 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                  }`}
                >
                  <td className="px-5 py-3 font-semibold text-[#273C97]">
                    {c.className}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">
                    {c.classCode}
                  </td>
                  <td className="px-5 py-3 text-gray-700">
                    {c.programTypeName} · Gen{c.generation}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${
                        SHIFT_COLORS[c.shift] ?? "bg-[#273C97]"
                      }`}
                    >
                      {formatShift(c.shift)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500">
                    {c.startDate} → {c.endDate}
                  </td>
                  <td className="px-5 py-3">
                    <Badge
                      variant="outline"
                      className={
                        c.status
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-red-200 bg-red-50 text-red-700"
                      }
                    >
                      {c.status ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/classes/${c.id}`}>
                      <Button
                        size="sm"
                        className="bg-[#273C97] text-white hover:bg-blue-800"
                      >
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
