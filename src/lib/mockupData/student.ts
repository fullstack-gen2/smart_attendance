import { AttendanceStatus, Student } from "../type/student";

export const data: Student[] = [
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
