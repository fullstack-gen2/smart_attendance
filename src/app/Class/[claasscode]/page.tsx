import { columns, Payment } from "../../classdetail/column";
import { DataTable } from "../../classdetail/data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return Array.from({ length: 11 }).map((_, index) => ({
    order: index + 1,
    id: `728ed52f-${index + 1}`,
    name: `Student ${index + 1}`,
    amount: 100 + index * 10,
    gender: index % 2 === 0 ? "Male" : "Female",
    status: "pending" as const,
    profile: `https://i.pinimg.com/1200x/36/9d/8c/369d8c1a01f21c357fd77dd6538eaea5.jpg`,
  }));
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 text-gray-500">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
