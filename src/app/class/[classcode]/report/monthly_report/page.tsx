import {
  reportColumns,
  ReportAttendanceRow,
} from "@/components/classdetail/report-column";
import { DataTable } from "@/components/classdetail/data-table";
import { classInfo } from "@/lib/mockupData/data";
import { monthlyReportAttendance } from "@/lib/mockupData/attendance";
import { data as students } from "@/lib/mockupData/student";
import { notFound } from "next/navigation";

async function getData(): Promise<ReportAttendanceRow[]> {
  return students.map((student, index) => {
    const p = monthlyReportAttendance[index]?.p ?? 0;
    return {
      order: index + 1,
      id: student.id,
      name: student.name,
      gender: student.gender,
      profile: student.profile,
      p,
      pm: monthlyReportAttendance[index]?.pm ?? 0,
      l: monthlyReportAttendance[index]?.l ?? 0,
      status: "active",
      isAlertRow: p < 15,
    };
  });
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
          </div>
          <div className="pt-6 text-right text-l leading-tight text-[#1f1f1f]"></div>
        </div>
        <p className="mt-3 text-l text-[#1f1f1f]">
          ProgramType: {currentClass.programType}
        </p>
        <h2 className="mt-2 text-3xl leading-tight text-[#1f1f1f]">
          Student Report List-April
        </h2>
      </section>
      <div className="mx-auto w-full max-w-6xl px-2 text-black">
        <DataTable
          columns={reportColumns}
          data={data}
          showStudentActions
          showAddStudentButton={false}
          studentSummaryText="Date : 17 days"
          noteContent={
            <div>
              <p className="font-medium text-black">
                Note:
                <span className="ml-2 font-normal text-red-500">
                  Student with red name is already reach warning
                </span>
              </p>
              <p className="pl-10 text-amber-500">
                Student with yellow name is almost reach warning
              </p>
            </div>
          }
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
