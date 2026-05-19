import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { data } from "@/lib/mockupData/student"
import Image from "next/image"


export function AttendanceCheckingList() {
  return (
    <Table>
      <TableCaption>Student attendance list</TableCaption>

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
        {data.map((student, index) => (
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
                className="rounded-full object-cover w-12 h-12"
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