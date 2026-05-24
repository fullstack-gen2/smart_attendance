import {
  reportColumns,
  ReportAttendanceRow,
} from "@/components/classdetail/report-column";
import { DataTable } from "@/components/classdetail/data-table";
import PopupAmendment from "@/components/popup/popup_amendment";
import { classInfo } from "@/lib/mockupData/data";
import { data as students } from "@/lib/mockupData/student";
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

  return students.map((student, index) => ({
    order: index + 1,
    id: student.id,
    name: student.name,
    gender: student.gender,
    profile: student.profile,
    p: dailyMarks[index]?.p ?? "-",
    pm: dailyMarks[index]?.pm ?? "-",
    l: dailyMarks[index]?.l ?? "-",
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
          តារាងវត្តមានសិស្សប្រចាំថ្ងៃ-Student Daily Attendance
        </h2>
      </section>
      <div className="mx-auto w-full max-w-6xl px-2 text-black">
        <DataTable
          columns={reportColumns}
          data={data}
          showStudentActions
          showToolbarIcons={false}
          showAddStudentButton={false}
          studentSummaryText="Active student : 09/11"
          showAttendanceTotals
          noteContent={
            <>
              <p className="font-medium text-black">
                Note:
                <span className="ml-2 font-normal text-black">
                  Student with black name is present
                </span>
              </p>
              <p className="pl-10 text-gray-500">
                Student with gray name is not present yet
              </p>
            </>
          }
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
