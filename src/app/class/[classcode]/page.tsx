import { redirect } from "next/navigation";

export default async function ClassRedirect({
  params,
}: {
  params: Promise<{ classcode: string }>;
}) {
  const { classcode } = await params;
  redirect(`/classes/${classcode}`);
}
