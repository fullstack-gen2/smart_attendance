"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AmendmentPopupProps = {
  btnName: string;
  title?: string;
  question?: string;
  placeholder?: string;
  onConfirm?: (reason: string) => void;
  redirectTo?: string;
};

const PopupAmendment = ({
  btnName,
  title = "Amendment",
  question = "Are you sure you want to request amendment to edit student attendance?",
  placeholder = "Reason",
  onConfirm,
  redirectTo,
}: AmendmentPopupProps) => {
  const [reason, setReason] = useState("");
  const router = useRouter();

  const handleConfirm = () => {
    onConfirm?.(reason);
    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{btnName}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            {question}
          </AlertDialogDescription>
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder={placeholder}
            className="mt-2 h-24 w-full resize-none rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Amendment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PopupAmendment;
