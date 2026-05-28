// components/ui/class-card.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ClassCardProps {
  title: string;
  status?: string;
  classNameValue: string;
  shift: string;
  time: string;
  students: string;
  code: string;
  href?: string;
  headerClassName?: string;
}

export function ClassCard({
  title,
  status = "Active",
  classNameValue,
  shift,
  time,
  students,
  code,
  href,
  headerClassName = "bg-[#273C97]",
}: ClassCardProps) {
  const shortTitle =
    title.length > 15 ? `${title.slice(0, 15)}...` : title;

  const cardContent = (
    <Card className="mx-auto w-full max-w-65.5 overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`flex items-center justify-between px-3 py-5 text-white ${headerClassName}`}
      >
          <h2
            className="truncate text-xl font-bold leading-tight"
            title={title}
          >
            {shortTitle}
          </h2>
     

        <Badge className="bg-transparent text-md">
          {status}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="space-y-1 px-6 py-3">
        <InfoRow label="Class:" value={classNameValue} />
        <InfoRow label="Shift:" value={shift} />
        <InfoRow label="Time:" value={time} />
        <InfoRow label="Student (Total / Female):" value={students} />

        {/* Footer */}
        <div className="mt-4 border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Class Code
            </span>

            <span className="rounded-md bg-gray-100 px-2 py-1 text-sm font-semibold tracking-wide text-gray-800">
              {code}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium text-gray-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-gray-900">
        {value}
      </span>
    </div>
  );
}