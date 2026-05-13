import { ClassCard } from "@/components/ui/class-card";

export default function AdminDashboard() {
  return (
    <div className="px-5 py-8">
      <div className="mx-auto w-full">
        {/* Title */}
        <h1 className="mb-8 w-full pr-5 text-3xl font-bold text-black">
          Class Info
        </h1>
        {/* Session Badge */}
        <div className="mb-10 inline-flex rounded-full border border-gray-300 bg-white px-6 py-3 text-lg shadow-sm">
          Session: 8:00 AM -12:00 AM
        </div>

        {/* Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <ClassCard
              key={index}
              title="Full Stack"
              classNameValue="Data Analyze"
              shift="Morning"
              time="8:00AM - 12:00AM"
              students="11/5"
              code={`00${index + 1}`}
              href={`/dashboard/class/00${index + 1}`}
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
            <ClassCard
              key={index}
              title="Full Stack"
              classNameValue="Data Analyze"
              shift="Morning"
              time="8:00AM - 12:00AM"
              students="11/5"
              code={`00${index + 1}`}
              href={`/dashboard/class/00${index + 1}`}
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
            <ClassCard
              key={index}
              title="Full Stack"
              classNameValue="Data Analyze"
              shift="Morning"
              time="8:00AM - 12:00AM"
              students="11/5"
              code={`00${index + 1}`}
              href={`/dashboard/class/00${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
