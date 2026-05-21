import { ClassCard } from "@/components/card/classCard";
import { DropdownMenuCheckboxes } from "@/components/ui/drop-box";
import { classInfo } from "@/lib/mockupData/data";
import { time } from "console";

export default function AdminDashboard() {
  const groupedClasses = classInfo.reduce<Record<string, typeof classInfo>>(
    (acc, item) => {
      if (!acc[item.shift]) {
        acc[item.shift] = [];
      }
      acc[item.shift].push(item);
      return acc;
    },
    {},
  );

  return (
    <div className="px-5 py-8">
      <div className="mx-auto w-full">
        <div className="mb-8 flex items-start justify-between gap-4">
          <h1 className="pr-5 text-3xl font-bold text-black">Class Info</h1>
          <DropdownMenuCheckboxes />
        </div>
        {Object.entries(groupedClasses).map(([time, classes]) => (
          <section key={time} className="mb-10 last:mb-0">
            <div className="mb-6 inline-flex rounded-full border border-gray-300 bg-white px-6 py-3 text-lg shadow-sm">
              Session: {time}
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
              {classes.map((item) => (
                <ClassCard
                  key={item.code}
                  title={item.name}
                  status={item.status ? "Active" : "Inactive"}
                  classNameValue={item.room}
                  shift={item.shift}
                  time={item.time}
                  students={`${item.total_student}/0`}
                  code={String(item.code)}
                  href={`/class/${item.code}`}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
