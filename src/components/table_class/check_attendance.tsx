"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data } from "@/lib/mockupData/student";
import { AttendanceStatus, Student } from "@/lib/type/student";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { Fragment, useState } from "react";

type AttendanceCheckingListProps = {
  students?: Student[];
};

export function AttendanceCheckingList({
  students = data,
}: AttendanceCheckingListProps) {
  const [attendanceByStudentId, setAttendanceByStudentId] = useState<
    Record<string, AttendanceStatus | null>
  >(() =>
    students.reduce(
      (acc, student) => {
        acc[student.id] = null;
        return acc;
      },
      {} as Record<string, AttendanceStatus | null>,
    ),
  );
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const updateAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendanceByStudentId((prev) => ({
      ...prev,
      [studentId]: status,
    }));
    if (status === AttendanceStatus.PRESENT) {
      setExpandedRowId((prev) => (prev === studentId ? null : prev));
    }
  };

  const clearAttendance = (studentId: string) => {
    setAttendanceByStudentId((prev) => ({
      ...prev,
      [studentId]: null,
    }));
    setExpandedRowId((prev) => (prev === studentId ? null : prev));
  };

  const toggleExpanded = (studentId: string) => {
    setExpandedRowId((prev) => (prev === studentId ? null : studentId));
  };

  const renderStatus = (studentId: string) => {
    const rawStatus = attendanceByStudentId[studentId];
    if (rawStatus === null) {
      return <span className="text-gray-400">{AttendanceStatus.PENDING}</span>;
    }

    const status = rawStatus;
    if (status === AttendanceStatus.PRESENT) {
      return <span className="text-black">{AttendanceStatus.PRESENT}</span>;
    }

    const isExpanded = expandedRowId === studentId;
    return (
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => toggleExpanded(studentId)}
          aria-label={isExpanded ? "Collapse details" : "Expand details"}
          className="inline-flex h-6 w-6 items-center justify-center rounded-sm text-black transition hover:bg-gray-100"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>
    );
  };

  return (
    <Table>
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead className="text-center">No.</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead className="flex justify-between items-center w-37.5">
            <span>P</span>
            <span>PM</span>
            <span>L</span>
          </TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {students.map((student, index) => {
          const status = attendanceByStudentId[student.id];
          const isExpanded = expandedRowId === student.id;
          const hasDetails =
            status === AttendanceStatus.PENDING || status === AttendanceStatus.LATE;

          return (
            <Fragment key={student.id}>
              <TableRow>
                <TableCell className="font-medium text-center">
                  {String(index + 1).padStart(3, "0")}
                </TableCell>

                <TableCell>{student.id}</TableCell>

                <TableCell>
                  <Image
                    src={student.profile}
                    alt={student.name}
                    width={50}
                    height={50}
                    className="rounded-xl object-cover w-12 h-12"
                  />
                </TableCell>

                <TableCell>{student.name}</TableCell>

                <TableCell>{student.gender}</TableCell>

                <TableCell className="w-37.5">
                  <div className="flex justify-between items-center ">
                    <input
                      type="radio"
                      name={student.id}
                      checked={
                        attendanceByStudentId[student.id] ===
                        AttendanceStatus.PRESENT
                      }
                      onChange={() =>
                        updateAttendance(student.id, AttendanceStatus.PRESENT)
                      }
                      onDoubleClick={() => clearAttendance(student.id)}
                    />
                    <input
                      type="radio"
                      name={student.id}
                      checked={
                        attendanceByStudentId[student.id] ===
                        AttendanceStatus.PENDING
                      }
                      onChange={() =>
                        updateAttendance(student.id, AttendanceStatus.PENDING)
                      }
                      onDoubleClick={() => clearAttendance(student.id)}
                    />

                    <input
                      type="radio"
                      name={student.id}
                      checked={
                        attendanceByStudentId[student.id] === AttendanceStatus.LATE
                      }
                      onChange={() =>
                        updateAttendance(student.id, AttendanceStatus.LATE)
                      }
                      onDoubleClick={() => clearAttendance(student.id)}
                    />
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  {renderStatus(student.id)}
                </TableCell>
              </TableRow>
              {isExpanded && hasDetails && (
                <TableRow>
                  <TableCell colSpan={7} className="bg-white px-8 py-4">
                    <div className="space-y-2 text-right text-sm">
                      {status === AttendanceStatus.PENDING && (
                        <p>
                          <span className="text-red-500">Permission:</span>{" "}
                          <span className="text-[#1f1f1f]">Feeling unwell</span>
                        </p>
                      )}
                      {status === AttendanceStatus.LATE && (
                        <p>
                          <span className="text-amber-500">Late:</span>{" "}
                          <span className="text-[#1f1f1f]">Traffic Jam</span>
                        </p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}
