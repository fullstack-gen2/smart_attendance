import {
  reportColumns,
  ReportAttendanceRow,
} from "@/components/classdetail/report-column";
import { DataTable } from "@/components/classdetail/data-table";
import { dailyReportAttendance } from "@/lib/mockupData/attendance";
import { data as students } from "@/lib/mockupData/student";
import Link from "next/link";

async function getData(): Promise<ReportAttendanceRow[]> {
  const isMarked = (value: string | undefined) => value && value !== "-";

  return students.map((student, index) => {
    const pm = dailyReportAttendance[index]?.pm ?? "-";
    const l = dailyReportAttendance[index]?.l ?? "-";

    return {
      order: index + 1,
      id: student.id,
      name: student.name,
      gender: student.gender,
      profile: student.profile,
      p: dailyReportAttendance[index]?.p ?? "-",
      pm,
      l,
      status: "active",
      permissionReason: isMarked(pm) ? "Feeling unwell" : undefined,
      lateReason: isMarked(l) ? "Traffic Jam" : undefined,
    };
  });
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
          <div className="pt-6 text-right text-l leading-tight text-[#1f1f1f]">
            <p>Date: 24/ April/ 2026</p>
            <p>Student(T/F): 11/03</p>
          </div>
        </div>
        <p className="mt-3 text-l text-[#1f1f1f]">Class: Bachelor</p>
        <h2 className="mt-2 text-3xl leading-tight text-[#1f1f1f]">
          Student Report List
        </h2>
      </section>
      <div className="mx-auto w-full max-w-6xl px-2 text-black">
        <DataTable
          columns={reportColumns}
          data={data}
          showStudentActions
          showAddStudentButton={false}
          studentSummaryText="Active student : 09/11"
        />
      </div>
    </main>
  );
}
