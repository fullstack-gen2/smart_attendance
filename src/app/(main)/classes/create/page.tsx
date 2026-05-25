import CreatingClassForm from "@/components/form/create_classes";

export default function CreateClassPage() {
  return (
    <main className="mx-auto max-w-2xl rounded-2xl border bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold text-[#273C97]">Create New Class</h1>
      <CreatingClassForm />
    </main>
  );
}
