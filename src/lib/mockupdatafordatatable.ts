export type AttendanceList = {
  order: number;
  id: string;
  name: string;
  gender: string;
  amount: number;
  status: "pending" | "Active" | "pm";
  profile: string;
};