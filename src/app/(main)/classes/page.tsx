import DashboardClient from "@/components/dashboard/DashboardClient";
import type {
  ApiResponse,
  ClassroomResponse,
  DashboardSummary,
  PageResponse,
} from "@/lib/type/apiTypes";

const API_URL = process.env.API_URL || "http://localhost:8090";

async function getClassrooms(): Promise<ClassroomResponse[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/v1/classrooms?page=0&size=100`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const json: ApiResponse<PageResponse<ClassroomResponse>> =
      await res.json();
    return json.payload?.content ?? [];
  } catch {
    return [];
  }
}

async function getDashboardSummary(): Promise<DashboardSummary | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/dashboard/summary`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json: ApiResponse<DashboardSummary> = await res.json();
    return json.payload ?? null;
  } catch {
    return null;
  }
}

export default async function ClassesPage() {
  const [classrooms, summary] = await Promise.all([
    getClassrooms(),
    getDashboardSummary(),
  ]);

  return <DashboardClient classrooms={classrooms} summary={summary} />;
}
