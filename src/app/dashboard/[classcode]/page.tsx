import { columns } from "@/components/classdetail/column";
import { DataTable } from "@/components/classdetail/data-table";
import AlertDialogDemo from "@/components/popup/popup_session";
import { AttendanceList } from "@/lib/mockupdatafordatatable";
import Link from "next/link";

async function getData(): Promise<AttendanceList[]> {
  // Fetch data from your API here.
  return Array.from({ length: 11 }).map((_, index) => ({
    order: index + 1,
    id: `728ed52f-${index + 1}`,
    name: `Student ${index + 1}`,
    amount: 100 + index * 10,
    gender: index % 2 === 0 ? "Male" : "Female",
    status: "pending" as const,
    profile: `https://i.pinimg.com/1200x/36/9d/8c/369d8c1a01f21c357fd77dd6538eaea5.jpg`,
  }));
}

export default async function StartPage() {
  const data = await getData();

  return (
    <main className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-10">
      <section className="mx-auto mb-2 w-full max-w-6xl  bg-[#ffffff] px-5 ">
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
            <p>Time: 8:00-12:00 AM</p>
            <p>Student(T/F): 11/03</p>
            <p>Class Code:A001</p>
          </div>
        </div>
        <p className="mt-3 text-l text-[#1f1f1f]">Class: Full-Stack</p>
        <h2 className="mt-2 text-3xl leading-tight text-[#1f1f1f]">
          ការបញ្ជីវត្តមានសិស្ស-Student Attendance List-April
        </h2>
      </section>
      <div className="mx-auto w-full max-w-6xl text-gray-500">
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
