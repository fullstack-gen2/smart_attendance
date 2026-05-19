import { HistoryCard } from "@/components/card/historyCard";
import { DropdownMenuCheckboxes } from "@/components/ui/drop-box";

export default function AdminDashboard() {
  return (
    <div className="px-5 py-8">
      <div className="mx-auto w-full">
        <div className="mb-8 flex items-start justify-between gap-4">
          <h1 className="pr-5 text-3xl font-bold text-black">
            Class Info-History
          </h1>
          <DropdownMenuCheckboxes />
        </div>
        {/* Session Badge */}
        <div className="mb-10 inline-flex rounded-full border border-gray-300 bg-white px-6 py-3 text-lg shadow-sm">
          Session: 8:00 AM -12:00 AM
        </div>

        {/* Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <HistoryCard
              key={index}
              title="Full Stack"
              status="Completed"
              session="8:00 AM - 12:00 PM"
              studentMF="17/07"
              Attendance="15/17"
              date="Jan 28, 2026"
              href={`/class/00${index + 1}`}
            />
          ))}
        </div>

        {/* Session Badge */}
        <div className="mt-10 mb-10 inline-flex rounded-full border border-gray-300 bg-white px-6 py-3 text-lg shadow-sm">
          Session: 1:30 PM -5:30 PM
        </div>

        {/* Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <HistoryCard
              key={index}
              title="Full Stack"
              status="Completed"
              session="1:30 PM - 5:30 PM"
              studentMF="17/07"
              Attendance="15/17"
              date="Jan 28, 2026"
              href={`/class/00${index + 1}`}
            />
          ))}
        </div>
        {/* Session Badge */}
        <div className="mt-10 mb-10 inline-flex rounded-full border border-gray-300 bg-white px-6 py-3 text-lg shadow-sm">
          Session: 6:00 PM -8:30 PM
        </div>

        {/* Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <HistoryCard
              key={index}
              title="Full Stack"
              status="Completed"
              session="6:00 PM - 8:30 PM"
              studentMF="17/07"
              Attendance="15/17"
              date="Jan 28, 2026"
              href={`/class/00${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
