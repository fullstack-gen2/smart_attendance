import { columns } from "@/components/classdetail/column";
import { DataTable } from "@/components/classdetail/data-table";
import AlertDialogDemo from "@/components/popup/popup_session";
import { AttendanceList } from "@/lib/mockupdatafordatatable";
import { data as students } from "@/lib/mockupData/student";
import Link from "next/link";
import { IoQrCodeOutline } from "react-icons/io5";
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

export default async function StartPage() {
  const data = await getData();

  return (
    <main className="min-h-screen bg-white px-2  sm:px-3 lg:px-4">
      <section className="mx-auto mb-2 w-full max-w-6xl bg-[#ffffff] px-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight text-black ">
              Bachelor
            </h1>
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-full border border-white-200 bg-white px-4 py-1 text-sm font-medium text-rose-900 transition hover:-translate-y-0.5 hover:shadow"
            >
              <span aria-hidden="true" className="mr-2 text-base">
                ←
              </span>
              Class List
            </Link>
          </div>
          <div className="border px-3 pr-4 p-2 rounded-2xl bg-gray-100 text-right text-sm text-l leading-tight text-[#1f1f1f]">
            <p>Time: 8:00-12:00 AM</p>
            <p>Student(T/F): 11/03</p>
            <p>Class Code:A001</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="mt-3 text-l text-[#1f1f1f]">Class: Full-Stack</p>
            <h2 className="mt-2 text-2xl leading-tight text-[#1f1f1f]">
              ការបញ្ជីវត្តមានសិស្ស-Student Attendance List-April
            </h2>
          </div>
          <Link href={"/qrcode"} >
            <IoQrCodeOutline size={50}/>
          </Link>
        </div>
      </section>
      <div className="mx-auto w-full max-w-6xl px-2 text-gray-500">
        <DataTable columns={columns} data={data} />
        <div className="mt-6 flex justify-center">
          
            <AlertDialogDemo
              btnName="Start Session"
              title="Start Session Now"
              firstTime="8:00"
              secondTime="12:00"/>
        </div>
      </div>
    </main>
  );
}
