import {
  reportColumns,
  ReportAttendanceRow,
} from "@/components/classdetail/report-column";
import { DataTable } from "@/components/classdetail/data-table";
import Link from "next/link";

async function getData(): Promise<ReportAttendanceRow[]> {
  const weeklyStats = [
    { p: 3, pm: 0, l: 0 },
    { p: 1, pm: 2, l: 0 },
    { p: 3, pm: 0, l: 0 },
    { p: 3, pm: 0, l: 0 },
    { p: 2, pm: 1, l: 0 },
    { p: 0, pm: 2, l: 1 },
    { p: 3, pm: 0, l: 0 },
    { p: 3, pm: 1, l: 0 },
    { p: 2, pm: 0, l: 1 },
    { p: 3, pm: 0, l: 0 },
    { p: 2, pm: 1, l: 0 },
  ];

  return Array.from({ length: 11 }).map((_, index) => ({
    order: index + 1,
    id: `728ed52f-${index + 1}`,
    name: `Student ${index + 1}`,
    gender: index % 2 === 0 ? "Male" : "Female",
    profile:
      "https://i.pinimg.com/1200x/36/9d/8c/369d8c1a01f21c357fd77dd6538eaea5.jpg",
    p: weeklyStats[index].p,
    pm: weeklyStats[index].pm,
    l: weeklyStats[index].l,
    status: "active",
  }));
}

export default async function StartPage() {
  const data = await getData();

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
          Student Report List-April-Week 1
        </h2>
      </section>
      <div className="mx-auto w-full max-w-6xl px-2 text-black">
        <DataTable
          columns={reportColumns}
          data={data}
          showStudentActions
          showAddStudentButton={false}
          studentSummaryText="Total Date : 3 days"
        />
          <div className="mt-2 text-sm leading-relaxed">
          <p>P stand for Present</p>
          <p>PM stand for Permission</p>
          <p>L stand for Late</p>
        </div>
      </div>
    </main>
  );
}
