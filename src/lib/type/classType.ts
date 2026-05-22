export type classData = {
    code: number;
    name: string;
    room: string;
    shift: string;
    status: boolean;
    programType: "Scholarship" | "Associate" | "Bachelor";
    time: string;
    total_student: number;
    female_student: number;
}

export type Student = {
  id: string;
  profile: string;
  name: string;
  gender: string;
  status: boolean | "late";
};
