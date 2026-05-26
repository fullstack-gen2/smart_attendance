import { columns } from "@/components/classdetail/column";
import { DataTable } from "@/components/classdetail/data-table";
import AlertDialogDemo from "@/components/popup/popup_session";
import type { AttendanceList } from "@/lib/mockupdatafordatatable";
import type {
  ApiResponse,
  ClassroomResponse,
  PageResponse,
  StudentResponse,
} from "@/lib/type/apiTypes";
import Link from "next/link";

const API_URL = process.env.API_URL || "https://attendance.icheck.today/api/v1/attendance";

async function getClassroom(id: string): Promise<ClassroomResponse | null> {
  try {
    const res = await fetch(`${API_URL}/classrooms/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json: ApiResponse<ClassroomResponse> = await res.json();
    return json.payload ?? null;
  } catch {
    return null;
  }
}

async function getStudents(classroomId: string): Promise<AttendanceList[]> {
  try {
    const res = await fetch(
      `${API_URL}/classrooms/${classroomId}/students?page=0&size=200`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const json: ApiResponse<PageResponse<StudentResponse>> = await res.json();
    return (json.payload?.content ?? []).map((s, i) => ({
      order: i + 1,
      id: s.studentNo || String(s.id),
      name: s.name,
      gender: s.gender,
      profile: s.profileImage || "",
      phoneNumber: s.phone || "",
      dateOfBirth: "",
    }));
  } catch {
    return [];
  }
}

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [classroom, students] = await Promise.all([
    getClassroom(id),
    getStudents(id),
  ]);

  return (
    <main className="min-h-screen bg-white px-2 py-6 sm:px-3 lg:px-4">
      <section className="mx-auto mb-2 w-full max-w-6xl bg-white px-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="mt-4 mb-4 text-3xl font-semibold tracking-tight text-[#273C97] sm:text-4xl">
              {classroom?.programTypeName ?? "Class"}
            </h1>
            <Link
              href="/classes"
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#273C97] transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              <span aria-hidden="true" className="mr-2">←</span>
              Class List
            </Link>
          </div>
          {classroom && (
            <div className="pt-6 text-right text-sm leading-tight text-[#1f1f1f]">
              <p className="font-semibold text-[#273C97]">{classroom.className}</p>
              <p>Code: {classroom.classCode}</p>
              <p>Shift: {classroom.shift}</p>
              <p>
                {classroom.startDate} ~ {classroom.endDate}
              </p>
              <p>Students: {students.length}</p>
            </div>
          )}
        </div>
        {classroom && (
          <>
            <p className="mt-3 text-base text-[#1f1f1f]">
              {classroom.programTypeName} · Generation {classroom.generation}
              {classroom.year != null ? ` · Year ${classroom.year}` : ""}
              {classroom.semester != null ? ` · Semester ${classroom.semester}` : ""}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#1f1f1f]">
              {classroom.className} — Student List
            </h2>
          </>
        )}
      </section>

      <div className="mx-auto w-full max-w-6xl px-2 text-gray-500">
        {students.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <p className="text-lg">No students enrolled yet.</p>
          </div>
        ) : (
          <DataTable columns={columns} data={students} />
        )}
        <div className="mt-6 flex justify-center">
          <AlertDialogDemo
            btnName="Start Session"
            title="Start Session Now"
            firstTime="8:00"
            secondTime="12:00"
          />
        </div>
      </div>
    </main>
  );
}
