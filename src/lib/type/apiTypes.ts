export interface ApiResponse<T> {
  success: boolean;
  message: string;
  payload: T;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ClassroomResponse {
  id: number;
  className: string;
  classCode: string;
  programTypeName: string;
  generation: number;
  year: number;
  semester: number;
  shift: string;
  academicYear: number;
  startDate: string;
  endDate: string;
  description: string;
  status: boolean;
}

export interface ScheduleResponse {
  id: number;
  className: string;
  subjectName: string;
  teacherName: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  slot: number;
  status: boolean;
}

export interface StudentResponse {
  id: number;
  studentNo: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
  profileImage: string;
  className: string;
  status: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  fullName: string;
  userId: number;
  deviceBound: boolean | null; // null for non-student accounts
}

export interface DashboardSummary {
  totalStudents: number;
  totalLecturers: number;
  totalClasses: number;
  totalAttendance: number;
}
