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
import { MouseEvent, useState } from "react";
import { z } from "zod";

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
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const reasonSchema = z
    .string()
    .trim()
    .min(1, "You must enter a reason for amendment.");

  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    const result = reasonSchema.safeParse(reason);

    if (!result.success) {
      event.preventDefault();
      setErrorMessage(result.error.issues[0]?.message ?? "Invalid reason.");
      return;
    }

    setErrorMessage("");
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
            onChange={(event) => {
              setReason(event.target.value);
              if (errorMessage) {
                setErrorMessage("");
              }
            }}
            placeholder={placeholder}
            className="mt-2 h-24 w-full resize-none rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
          />
          {errorMessage && (
            <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
          )}
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
