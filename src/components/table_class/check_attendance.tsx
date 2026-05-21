import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { data } from "@/lib/mockupData/student"
import { Student } from "@/lib/type/student"
import Image from "next/image"


type AttendanceCheckingListProps = {
  students?: Student[]
}

export function AttendanceCheckingList({ students = data }: AttendanceCheckingListProps) {
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
        {students.map((student, index) => (
          <TableRow key={student.id}>
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
                    checked={student.status === "present"}
                    readOnly
                  />
                  <input
                    type="radio"
                    name={student.id}
                    readOnly
                  />

                  <input
                    type="radio"
                    name={student.id}
                    readOnly
                  />
              </div>
            </TableCell>

            <TableCell className="text-center">
              <span className={` ${student.status === "pending"?"text-gray-400":"text-black"}`}>
                {student.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
