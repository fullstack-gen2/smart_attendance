import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#273C97]/10">
        <FileQuestion className="h-10 w-10 text-[#273C97]" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-[#273C97]">404</h1>
        <h2 className="text-xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="text-sm text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <Link href="/classes">
        <Button className="bg-[#273C97] text-white hover:bg-blue-800">
          Go to Classes
        </Button>
      </Link>
    </div>
  );
}
