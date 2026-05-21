export type DailyAttendanceStat = {
  p: string;
  pm: string;
  l: string;
};

export type AttendanceStat = {
  p: number;
  pm: number;
  l: number;
};

export const dailyReportAttendance: DailyAttendanceStat[] = [
  { p: "✓", pm: "-", l: "-" },
  { p: "-", pm: "✓", l: "-" },
  { p: "✓", pm: "-", l: "-" },
  { p: "✓", pm: "-", l: "-" },
  { p: "✓", pm: "-", l: "-" },
  { p: "✓", pm: "-", l: "-" },
  { p: "✓", pm: "-", l: "-" },
  { p: "✓", pm: "-", l: "-" },
  { p: "✓", pm: "-", l: "-" },
  { p: "-", pm: "-", l: "✓" },
  { p: "✓", pm: "-", l: "-" },
];

export const weeklyReportAttendance: AttendanceStat[] = [
  { p: 3, pm: 0, l: 0 },
  { p: 1, pm: 2, l: 0 },
  { p: 3, pm: 0, l: 0 },
  { p: 3, pm: 0, l: 0 },
  { p: 2, pm: 1, l: 0 },
  { p: 0, pm: 2, l: 1 },
  { p: 3, pm: 0, l: 0 },
  { p: 3, pm: 1, l: 0 },
  { p: 2, pm: 0, l: 1 },
  { p: 3, pm: 0, l: 0 },
  { p: 2, pm: 1, l: 0 },
];

export const monthlyReportAttendance: AttendanceStat[] = [
  { p: 27, pm: 2, l: 1 },
  { p: 25, pm: 4, l: 1 },
  { p: 28, pm: 1, l: 1 },
  { p: 29, pm: 1, l: 0 },
  { p: 26, pm: 3, l: 1 },
  { p: 8, pm: 21, l: 1 },
  { p: 27, pm: 2, l: 1 },
  { p: 26, pm: 3, l: 1 },
  { p: 24, pm: 4, l: 2 },
  { p: 28, pm: 1, l: 1 },
  { p: 10, pm: 19, l: 1 },
];
