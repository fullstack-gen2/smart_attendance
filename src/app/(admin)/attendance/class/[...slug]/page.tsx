import { redirect } from "next/navigation";

export default async function AttendanceClassAliasPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  redirect(`/class/${slug.join("/")}`);
}
