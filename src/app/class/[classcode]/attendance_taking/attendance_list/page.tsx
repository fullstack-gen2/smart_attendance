import {
  reportColumns,
  ReportAttendanceRow,
} from "@/components/classdetail/report-column";
import { DataTable } from "@/components/classdetail/data-table";
import PopupAmendment from "@/components/popup/popup_amendment";
import { classInfo } from "@/lib/mockupData/data";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(): Promise<ReportAttendanceRow[]> {
  const dailyMarks = [
    { p: "✓", pm: "-", l: "-" },
    { p: "-", pm: "✓", l: "-" },
    { p: "✓", pm: "-", l: "-" },
    { p: "✓", pm: "-", l: "-" },
    { p: "✓", pm: "-", l: "-" },
    { p: "✓", pm: "-", l: "-" },
    { p: "✓", pm: "-", l: "-" },
    { p: "✓", pm: "-", l: "-" },
    { p: "✓", pm: "-", l: "-" },
    { p: "-", pm: "-", l: "✓" },
    { p: "✓", pm: "-", l: "-" },
  ];

  return Array.from({ length: 11 }).map((_, index) => ({
    order: index + 1,
    id: `728ed52f-${index + 1}`,
    name: `Student ${index + 1}`,
    gender: index % 2 === 0 ? "Male" : "Female",
    profile:
      "https://i.pinimg.com/1200x/36/9d/8c/369d8c1a01f21c357fd77dd6538eaea5.jpg",
    p: dailyMarks[index].p,
    pm: dailyMarks[index].pm,
    l: dailyMarks[index].l,
    status: "active",
    permissionReason: "Feeling unwell",
    lateReason: "Traffic Jam",
  }));
}

export default async function StartPage({
  params,
}: {
  params: Promise<{ classcode: string }>;
}) {
  const { classcode } = await params;
  const classCode = Number(classcode);
  const currentClass =
    classInfo.find((item) => item.code === classCode) ??
    classInfo.find((item) => item.code % 100 === classCode);

  if (!currentClass) {
    notFound();
  }

  const data = await getData();

  return (
    <main className="min-h-screen bg-white px-2 py-6 sm:px-3 lg:px-4">
      <section className="mx-auto mb-2 w-full max-w-6xl bg-[#ffffff] px-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="mt-4 mb-4 text-3xl font-semibold tracking-tight text-rose-950 sm:text-4xl">
              {currentClass.name}
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
            <p>Time: {currentClass.time}</p>
            <p>
              Student(T/F): {currentClass.total_student}/
              {currentClass.female_student}
            </p>
          </div>
        </div>
        <p className="mt-3 text-l text-[#1f1f1f]">
          ProgramType: {currentClass.programType}
        </p>
        <h2 className="mt-2 text-3xl leading-tight text-[#1f1f1f]">
          Student Daily Attendance
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
      <section className="mx-auto flex w-full max-w-6xl items-center justify-end gap-4 py-5">
        <PopupAmendment
          btnName="Amendment"
          redirectTo={`/class/${classcode}/attendance_taking/attendance_list/attendance_amandment`}
        />
      </section>
    </main>
  );
}
