import type { ApiResponse, PageResponse, StudentResponse } from "@/lib/type/apiTypes";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import Image from "next/image";

const API_URL = process.env.API_URL || "https://attendance.icheck.today/api/v1/attendance";

async function getStudents(): Promise<StudentResponse[]> {
  try {
    const res = await fetch(`${API_URL}/users/students?page=0&size=200`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json: ApiResponse<PageResponse<StudentResponse>> = await res.json();
    return json.payload?.content ?? [];
  } catch {
    return [];
  }
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "border-emerald-200 bg-emerald-50 text-emerald-700",
  INACTIVE: "border-red-200 bg-red-50 text-red-700",
  SUSPENDED: "border-amber-200 bg-amber-50 text-amber-700",
};

function Avatar({ src, name }: { src?: string | null; name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={36}
        height={36}
        className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
      />
    );
  }
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#273C97] text-xs font-semibold text-white ring-2 ring-white">
      {initials}
    </div>
  );
}

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <div className="px-5 py-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#273C97]">
          <Users className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#273C97]">Students</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {students.length} student{students.length !== 1 ? "s" : ""} total
          </p>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <Users className="mx-auto mb-4 h-12 w-12 opacity-30" />
          <p className="text-lg">No students found</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-[#273C97] text-white">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">#</th>
                <th className="px-5 py-4 text-left font-semibold">Student</th>
                <th className="px-5 py-4 text-left font-semibold">Student No.</th>
                <th className="px-5 py-4 text-left font-semibold">Class</th>
                <th className="px-5 py-4 text-left font-semibold">Gender</th>
                <th className="px-5 py-4 text-left font-semibold">Email</th>
                <th className="px-5 py-4 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr
                  key={s.id}
                  className={`border-t border-gray-100 transition-colors hover:bg-blue-50/30 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                  }`}
                >
                  <td className="px-5 py-3 text-xs text-gray-400">{i + 1}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={s.profileImage} name={s.name} />
                      <span className="font-medium text-gray-900">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">
                    {s.studentNo || "—"}
                  </td>
                  <td className="px-5 py-3 text-gray-600">{s.className || "—"}</td>
                  <td className="px-5 py-3 text-gray-600">
                    {s.gender?.toLowerCase() === "m"
                      ? "Male"
                      : s.gender?.toLowerCase() === "f"
                      ? "Female"
                      : s.gender || "—"}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{s.email}</td>
                  <td className="px-5 py-3">
                    <Badge
                      variant="outline"
                      className={STATUS_COLORS[s.status] ?? "text-gray-500"}
                    >
                      {s.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
