import { ClassCard } from "@/components/card/classCard";
import { DropdownMenuCheckboxes } from "@/components/ui/drop-box";
import { classInfo } from "@/lib/mockupData/data";

export default function AdminDashboard() {
  const activeClasses = classInfo.filter((item) => item.status === "Active");

  const groupedClasses = activeClasses.reduce<Record<string, typeof activeClasses>>(
    (acc, item) => {
      if (!acc[item.shift]) {
        acc[item.shift] = [];
      }
      acc[item.shift].push(item);
      return acc;
    },
    {},
  );

  const getSessionTime = (classes: typeof classInfo) => {
    if (classes.length === 0) return "";
    if (classes.length === 1) return classes[0].time;

    const firstTime = classes[0].time.split(" - ")[0];
    const lastTime = classes[classes.length - 1].time.split(" - ")[1];
    return `${firstTime} - ${lastTime}`;
  };

  return (
    <div className="px-5 py-8">
      <div className="mx-auto w-full">
        <div className="mb-8 flex items-start justify-between gap-4">
          <h1 className="pr-5 text-3xl font-bold text-black">Class Info</h1>
          <DropdownMenuCheckboxes />
        </div>
        {Object.entries(groupedClasses).map(([shift, classes]) => (
          <section key={shift} className="mb-10 last:mb-0">
            <div className="mb-6 inline-flex rounded-full border border-gray-300 bg-white px-6 py-3 text-lg shadow-sm">
              Session: {getSessionTime(classes)}
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,320px))] justify-items-start gap-6">
              {classes.map((item) => (
                <ClassCard
                  key={item.code}
                  title={item.name}
                  status={item.status}
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
