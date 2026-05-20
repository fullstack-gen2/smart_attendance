export enum AttendanceStatus{
  PRESENT = "present",
  LATE    = "late",
  PENDING = "pending"
}

export type Student = {
  id: string
  profile: string
  name: string
  gender: string
  status: AttendanceStatus
}