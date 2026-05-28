import { StudentProfilePanel } from "@/components/classdetail/student-profile-panel";

export default async function StudentProfileModal({
  params,
}: {
  params: Promise<{ classcode: string; studentId: string }>;
}) {
  const { classcode, studentId } = await params;

  return (
    <StudentProfilePanel
      classcode={classcode}
      studentId={studentId}
      mode="modal"
    />
  );
}
