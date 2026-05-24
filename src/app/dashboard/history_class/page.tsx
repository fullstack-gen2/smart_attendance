import { HistoryCard } from "@/components/card/historyCard";
import { DropdownMenuCheckboxes } from "@/components/ui/drop-box";
import { classInfo } from "@/lib/mockupData/data";

export default function AdminDashboard() {
  const completeClasses = classInfo.filter(
    (item) => item.status === "Complete",
  );

  const groupedClasses = completeClasses.reduce<
    Record<string, typeof completeClasses>
  >((acc, item) => {
    if (!acc[item.shift]) {
      acc[item.shift] = [];
    }
    acc[item.shift].push(item);
    return acc;
  }, {});

  const getSessionTime = (classes: typeof completeClasses) => {
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
          <h1 className="pr-5 text-3xl font-bold text-black">
            Class Info-History
          </h1>
          <DropdownMenuCheckboxes />
        </div>
        {Object.entries(groupedClasses).map(([shift, classes]) => (
          <section key={shift} className="mb-10 last:mb-0">
            <div className="mb-6 inline-flex rounded-full border border-gray-300 bg-white px-6 py-3 text-lg shadow-sm">
              Session: {getSessionTime(classes)}
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,320px))] justify-items-start gap-6">
              {classes.map((item, index) => (
                <HistoryCard
                  key={item.code}
                  title={item.name}
                  status="Completed"
                  session={item.time}
                  studentMF={`${item.total_student}/${item.female_student}`}
                  Attendance={`${Math.max(0, item.total_student - ((index % 4) + 1))}/${item.total_student}`}
                  date={`Jan ${String(20 + (index % 10)).padStart(2, "0")}, 2026`}
                  href={`/class/${item.code}/history_list`}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
