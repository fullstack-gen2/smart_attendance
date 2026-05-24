import { columns } from "@/components/classdetail/column";
import { DataTable } from "@/components/classdetail/data-table";
import AlertDialogDemo from "@/components/popup/popup_session";
import { AttendanceList } from "@/lib/mockupdatafordatatable";
import { classInfo } from "@/lib/mockupData/data";
import { data as students } from "@/lib/mockupData/student";
import { notFound } from "next/navigation";

async function getData(): Promise<AttendanceList[]> {
  return students.map((student, index) => ({
    order: index + 1,
    id: student.id,
    name: student.name,
    gender: student.gender,
    profile: student.profile,
    phoneNumber: student.phone,
    dateOfBirth: student.dateOfBirth,
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

  const [firstTime = "8:00 AM", secondTime = "10:00 AM"] =
    currentClass.time.split(" - ");
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
            <p>Class Code: {currentClass.code}</p>
          </div>
        </div>
        <p className="mt-3 text-l text-[#1f1f1f]">
          ProgramType: {currentClass.programType}
        </p>
        <h2 className="mt-2 text-3xl leading-tight text-[#1f1f1f]">
          តារាងវត្តមានសិស្ស-Student Attendance List
        </h2>
      </section>
      <div className="mx-auto w-full max-w-6xl px-2 text-gray-500">
        <DataTable columns={columns} data={data} showToolbarIcons={false} />
        <div className="mt-6 flex justify-center">
          <AlertDialogDemo
            btnName="Start Session"
            title="Start Session Now"
            firstTime={firstTime}
            secondTime={secondTime}
            classcode={classcode}
          />
        </div>
      </div>
    </main>
  );
}
