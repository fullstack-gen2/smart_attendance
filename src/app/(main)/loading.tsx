import { Loader2 } from "lucide-react";

export default function MainLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#273C97]" />
    </div>
  );
}
