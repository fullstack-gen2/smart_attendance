import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"

enum AttendanceStatus{
  PRESENT = "present",
  LATE    = "late",
  PENDING = "pending"
}

type Student = {
  id: string
  profile: string
  name: string
  gender: string
  status: AttendanceStatus
}

const data: Student[] = [
  {
    id: "INV001",
    profile:
      "https://i.pinimg.com/736x/25/60/e1/2560e1cbf27a9cfa78faccde40971482.jpg",
    name: "Chan Thorn",
    gender: "Male",
    status: AttendanceStatus.PENDING,
  },
  {
    id: "INV002",
    profile:
      "https://i.pinimg.com/1200x/90/74/a6/9074a68f86e0f006a9ec7183530e66c0.jpg",
    name: "Dara",
    gender: "Male",
    status: AttendanceStatus.PENDING,
  },
  {
    id: "INV003",
    profile:
      "https://i.pinimg.com/736x/5f/79/ea/5f79eae006365020a1cf50534a1b4314.jpg",
    name: "Sokha",
    gender: "Female",
    status: AttendanceStatus.PRESENT,
  },
  {
    id: "INV004",
    profile:
      "https://i.pinimg.com/1200x/75/42/fe/7542fec761bbb72957ccae0839476c4a.jpg",
    name: "Nita",
    gender: "Female",
    status: AttendanceStatus.LATE,
  },
  {
    id: "INV005",
    profile:
      "https://i.pinimg.com/1200x/75/42/fe/7542fec761bbb72957ccae0839476c4a.jpg",
    name: "Nita",
    gender: "Female",
    status: AttendanceStatus.PRESENT,
  },
]

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

            {/* Dynamic ID */}
            <TableCell>{student.id}</TableCell>

            {/* Dynamic Profile */}
            <TableCell>
              <Image
                src={student.profile}
                alt={student.name}
                width={50}
                height={50}
                className="rounded-full object-cover w-12 h-12"
              />
            </TableCell>

            {/* Dynamic Name */}
            <TableCell>{student.name}</TableCell>

            {/* Dynamic Gender */}
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