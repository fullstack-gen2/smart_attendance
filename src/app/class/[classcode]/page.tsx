import { columns, statusColumns } from "@/components/classdetail/column";
import { DataTable } from "@/components/classdetail/data-table";
import AlertDialogDemo from "@/components/popup/popup_session";
import { AttendanceList } from "@/lib/mockupdatafordatatable";
import { data as students } from "@/lib/mockupData/student";
async function getData(showStatus: boolean): Promise<AttendanceList[]> {
  return students.map((student, index) => ({
    order: index + 1,
    id: student.id,
    name: student.name,
    gender: student.gender,
    profile: student.profile,
    phoneNumber: student.phone,
    dateOfBirth: student.dateOfBirth,
    status: showStatus ? "pending" : undefined,
  }));
}

export default async function StartPage({
  params,
}: {
  params: Promise<{ classcode: string }>;
}) {
  const { classcode } = await params;
  const showStatus = classcode === "101";
  const data = await getData(showStatus);

  return (
    <main className="min-h-screen bg-white px-2  sm:px-3 lg:px-4">
      <section className="mx-auto mb-2 w-full max-w-6xl bg-[#ffffff] px-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="mb-3 text-3xl font-semibold tracking-tight text-black ">
              Full-Stack
            </h1>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <h2 className=" text-2xl leading-tight text-[#1f1f1f]">
              បញ្ជីរាយវត្តមានសិស្ស-Student Attendance List-Today
            </h2>
          </div>
          <AlertDialogDemo
              btnName="Start Session"
              title="Start Session Now"
              firstTime="8:00"
              secondTime="12:00"/>
        </div>
      </section>
      <div className="mx-auto w-full max-w-6xl px-2 text-gray-500">
        <DataTable
          columns={showStatus ? statusColumns : columns}
          data={data}
          studentProfileBasePath={`/class/${classcode}/student`}
        />
      </div>
    </main>
  );
}
