"use client";
import { AttendanceCheckingList } from "@/components/table_class/check_attendance";
import { Input } from "@/components/ui/input";
import { classInfo } from "@/lib/mockupData/data";
import { data as students } from "@/lib/mockupData/student";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const getStartTimeFromSchedule = (schedule?: string) => {
  if (!schedule) return null;
  const [start] = schedule.split("-");
  return start?.trim() ?? null;
};

const addMinutesTo12HourTime = (timeString: string, minutesToAdd: number) => {
  const match = timeString.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (Number.isNaN(hours) || Number.isNaN(minutes) || hours < 1 || hours > 12) {
    return null;
  }

  let hours24 = hours % 12;
  if (period === "PM") {
    hours24 += 12;
  }

  const totalMinutes = hours24 * 60 + minutes + minutesToAdd;
  const normalizedMinutes = ((totalMinutes % 1440) + 1440) % 1440;
  const nextHours24 = Math.floor(normalizedMinutes / 60);
  const nextMinutes = normalizedMinutes % 60;
  const nextPeriod = nextHours24 >= 12 ? "PM" : "AM";
  const hours12 = nextHours24 % 12 || 12;

  return `${hours12}:${String(nextMinutes).padStart(2, "0")} ${nextPeriod}`;
};

export default function AttendanceTaking() {
  const { classcode } = useParams<{ classcode: string }>();
  const [activeStudentCount, setActiveStudentCount] = useState(0);
  const classCode = Number(classcode);
  const currentClass =
    classInfo.find((item) => item.code === classCode) ??
    classInfo.find((item) => item.code % 100 === classCode);
  const totalStudentCount = students.length;
  const activeDisplay = String(activeStudentCount).padStart(2, "0");
  const totalDisplay = String(totalStudentCount).padStart(2, "0");
  const scheduleStartTime = getStartTimeFromSchedule(currentClass?.time);
  const attendanceStartTime = scheduleStartTime ?? "-";
  const attendanceEndTime = scheduleStartTime
    ? addMinutesTo12HourTime(scheduleStartTime, 5) ?? "-"
    : "-";

  return (
    <main className="min-h-screen bg-white px-2 py-6 sm:px-3 lg:px-4">
      <section className="mx-auto mb-4 w-full max-w-6xl bg-[#ffffff] px-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="mt-4 mb-4 text-3xl font-semibold tracking-tight text-rose-950 sm:text-4xl">
              {currentClass?.name ?? "Class"}
            </h1>
          </div>
          <div className="pt-6 text-right text-l leading-tight text-[#1f1f1f]">
            <p>Time: {currentClass?.time ?? "-"}</p>
            <p>
              Student(T/F): {currentClass?.total_student ?? 0}/
              {currentClass?.female_student ?? 0}
            </p>
            <p>Class Code: {currentClass?.code ?? classcode}</p>
          </div>
        </div>
        <p className="mt-3 text-l text-[#1f1f1f]">
          ProgramType: {currentClass?.programType ?? "-"}
        </p>
        <h2 className="mt-2 text-3xl leading-tight text-[#1f1f1f]">
          តារាងវត្តមានសិស្ស-Student Attendance List
        </h2>
      </section>
      <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-4 pb-4">
        <Input placeholder="Search Student" className="max-w-sm" />
        <p className="text-sm text-[#1f1f1f]">
          Active student: {activeDisplay}/{totalDisplay}
        </p>
      </div>
      <section className="mx-auto w-full max-w-6xl overflow-hidden rounded-lg border">
        <AttendanceCheckingList
          students={students}
          onActiveStudentCountChange={setActiveStudentCount}
        />
      </section>
      <section className="mx-auto flex w-full max-w-6xl items-center justify-end gap-4 py-5">
        <p className="text-sm text-[#1f1f1f]">Start: {attendanceStartTime}</p>
        <p className="text-sm text-[#1f1f1f]">End: {attendanceEndTime}</p>
        <Link
          href={`/class/${classcode}/attendance_taking/attendance_list`}
          className="inline-flex items-center rounded-full border border-white-200 bg-white px-4 py-2 text-sm font-medium text-rose-900 transition hover:-translate-y-0.5 hover:bg-rose-50"
        >
          Done
        </Link>
      </section>
    </main>
  );
}
