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
  const cardContent = (
    <Card className="flex h-[320px] w-[320px] flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white p-0">
      <div
        className={`flex items-center justify-between px-4 py-3 text-white ${headerClassName}`}
      >
        <h2 className="text-3xl font-bold leading-none">{title}</h2>

        <Badge className="bg-transparent p-0 text-sm font-medium text-white hover:bg-transparent">
          {status}
        </Badge>
      </div>
      <CardContent className="flex flex-1 flex-col px-4 py-3 text-[18px]">
        <div className="space-y-2">
        <div className="flex">
          <span className="w-[128px] font-medium text-black">Class:</span>
          <span className="text-black">{classNameValue}</span>
        </div>

        <div className="flex">
          <span className="w-[128px] font-medium text-black">Shift:</span>
          <span className="text-black">{shift}</span>
        </div>

        <div className="flex">
          <span className="w-[128px] font-medium text-black">Time:</span>
          <span className="whitespace-nowrap text-black">{time}</span>
        </div>

        <div className="flex">
          <span className="w-[128px] font-medium text-black">Student (T/F):</span>
          <span className="text-black">{students}</span>
        </div>
        </div>

        <div className="mt-auto border-t border-gray-300 pt-3"></div>
        <div className="flex justify-end pt-2">
          <span className="text-sm text-black">code: {code}</span>
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
