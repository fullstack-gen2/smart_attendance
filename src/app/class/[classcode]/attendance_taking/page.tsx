import { AttendanceCheckingList } from "@/components/table_class/check_attendance";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function AttendanceTaking() {
  return (
    <main className="min-h-screen bg-white px-2 py-6 sm:px-3 lg:px-4">
      <section className="mx-auto mb-4 w-full max-w-6xl bg-[#ffffff] px-2">
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
      <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-4 pb-4">
        <Input placeholder="Search Student" className="max-w-sm" />
        <p className="text-sm text-[#1f1f1f]">Active student: 02/05</p>
      </div>
      <section className="mx-auto w-full max-w-6xl border rounded-lg overflow-hidden">
        <AttendanceCheckingList />
      </section>
      <section className="mx-auto flex w-full max-w-6xl items-center justify-end gap-4 py-5">
        <p className="text-sm text-[#1f1f1f]">Start: 8:00 am</p>
        <p className="text-sm text-[#1f1f1f]">End: 8:05 am</p>
        <Link
          href={`/class/001/attendance_taking/attendance_list`}
          className="inline-flex items-center rounded-full border border-white-200 bg-white px-4 py-2 text-sm font-medium text-rose-900 transition hover:-translate-y-0.5 hover:bg-rose-50"
        >
          Done
        </Link>
      </section>
    </main>
  );
}
