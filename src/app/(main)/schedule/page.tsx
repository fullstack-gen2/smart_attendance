import type {
  ApiResponse,
  PageResponse,
  ScheduleResponse,
} from "@/lib/type/apiTypes";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, User } from "lucide-react";

const API_URL = process.env.API_URL || "https://attendance.icheck.today/api/v1/attendance";

const DAYS_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const DAY_LABELS: Record<string, string> = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
};

const SLOT_COLORS = [
  "border-l-[#273C97] bg-blue-50",
  "border-l-emerald-500 bg-emerald-50",
  "border-l-violet-500 bg-violet-50",
  "border-l-amber-500 bg-amber-50",
  "border-l-rose-500 bg-rose-50",
];

function fmt(time: string) {
  const [h, m] = time.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

async function getSchedules(): Promise<ScheduleResponse[]> {
  try {
    const res = await fetch(`${API_URL}/schedules?page=0&size=200`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json: ApiResponse<PageResponse<ScheduleResponse>> = await res.json();
    return json.payload?.content ?? [];
  } catch {
    return [];
  }
}

export default async function SchedulePage() {
  const schedules = await getSchedules();

  const byDay = DAYS_ORDER.reduce<Record<string, ScheduleResponse[]>>(
    (acc, day) => {
      acc[day] = schedules
        .filter((s) => s.dayOfWeek === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
      return acc;
    },
    {}
  );

  const activeDays = DAYS_ORDER.filter((d) => byDay[d].length > 0);

  return (
    <div className="px-5 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#273C97]">Schedule</h1>
          <p className="mt-1 text-sm text-gray-500">
            {schedules.length} session{schedules.length !== 1 ? "s" : ""} across{" "}
            {activeDays.length} day{activeDays.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
          <Clock className="h-4 w-4 text-[#273C97]" />
          <span className="text-sm font-medium text-gray-700">
            Weekly Timetable
          </span>
        </div>
      </div>

      {schedules.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <BookOpen className="mx-auto mb-4 h-12 w-12 opacity-30" />
          <p className="text-lg">No schedules found</p>
        </div>
      ) : (
        <div className="space-y-8">
          {activeDays.map((day) => (
            <section key={day}>
              {/* Day header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="rounded-full bg-[#273C97] px-5 py-1.5 text-sm font-semibold text-white">
                  {DAY_LABELS[day]}
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Schedule cards */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {byDay[day].map((s, i) => (
                  <div
                    key={s.id}
                    className={`rounded-xl border border-l-4 bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
                      SLOT_COLORS[i % SLOT_COLORS.length]
                    }`}
                  >
                    {/* Subject */}
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 leading-tight">
                        {s.subjectName}
                      </h3>
                      <Badge
                        variant="outline"
                        className={
                          s.status
                            ? "shrink-0 border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "shrink-0 border-gray-200 bg-gray-50 text-gray-500"
                        }
                      >
                        {s.status ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    {/* Class name */}
                    <p className="mb-3 text-sm text-gray-600 leading-tight">
                      {s.className}
                    </p>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {fmt(s.startTime)} – {fmt(s.endTime)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {s.teacherName}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        Slot {s.slot}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
