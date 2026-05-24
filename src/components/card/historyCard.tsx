import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface HistoryCardProps {
  title: string;
  status?: string;
  session: string;
  studentMF: string;
  Attendance: string;
  date: string;
  href?: string;
}

export function HistoryCard({
  title,
  status = "Completed",
  session,
  studentMF,
  Attendance,
  date,
  href,
}: HistoryCardProps) {
  const cardContent = (
    <Card className="flex h-[320px] w-[320px] flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white p-0">
      <div className="flex items-center justify-between bg-gray-500 px-4 py-3 text-white">
        <h2 className="text-3xl font-bold leading-none">{title}</h2>
        <Badge className="bg-transparent p-0 text-sm font-medium text-white hover:bg-transparent">
          {status}
        </Badge>
      </div>
      <CardContent className="flex flex-1 flex-col px-4 py-3 text-[18px]">
        <div className="space-y-2">
        <div className="flex">
          <span className="w-[128px] font-medium text-black">Session:</span>
          <span className="whitespace-nowrap text-black">{session}</span>
        </div>

        <div className="flex">
          <span className="w-[128px] font-medium text-black">
            Students (T/F):
          </span>
          <span className="text-black">{studentMF}</span>
        </div>

        <div className="flex">
          <span className="w-[128px] font-medium text-black">Attendance:</span>
          <span className="text-black">{Attendance}</span>
        </div>

        <div className="flex">
          <span className="w-[128px] font-medium text-black">Date:</span>
          <span className="text-black">{date}</span>
        </div>
        </div>

        <div className="mt-auto border-t border-gray-300 pt-3"></div>

        <div className="flex justify-end pt-2">
          <span className="text-sm text-blue-600 underline">View Detail</span>
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
