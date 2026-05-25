"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { CheckCircle, Smartphone, ScanLine } from "lucide-react";

export default function DeviceBoundPage() {
  const router = useRouter();
  const { isAuthenticated, fullName, role } = useSelector(
    (s: RootState) => s.auth
  );
  const [deviceId, setDeviceId] = useState<string>("");

  useEffect(() => {
    // Guard: only students should land here
    if (!isAuthenticated || role !== "STUDENT") {
      router.replace("/login");
      return;
    }
    const id = localStorage.getItem("attendance_device_id") ?? "";
    setDeviceId(id);
  }, [isAuthenticated, role, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#273C97] to-blue-500 px-4">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header banner */}
        <div className="flex flex-col items-center gap-3 bg-gradient-to-br from-[#273C97] to-blue-500 px-6 py-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Smartphone className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Device Registered</h1>
          <p className="text-center text-sm text-blue-100">
            This device has been linked to your student account
          </p>
        </div>

        {/* Body */}
        <div className="space-y-6 px-6 py-8">
          {/* Success row */}
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-4">
            <CheckCircle className="h-6 w-6 shrink-0 text-emerald-500" />
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                Welcome, {fullName ?? "Student"}!
              </p>
              <p className="text-xs text-emerald-600">
                Account successfully verified
              </p>
            </div>
          </div>

          {/* Device ID */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Device ID
            </p>
            <p className="break-all rounded-xl bg-gray-50 px-4 py-3 font-mono text-xs text-gray-600 select-all">
              {deviceId || "—"}
            </p>
          </div>

          <p className="text-center text-xs text-gray-400">
            This device is now bound to your account. Only this device can
            submit your attendance.
          </p>

          {/* CTA */}
          <Button
            onClick={() => router.push("/student/scan")}
            className="w-full gap-2 rounded-xl bg-[#273C97] py-3 text-base font-semibold text-white hover:bg-blue-800"
          >
            <ScanLine className="h-5 w-5" />
            Start Scanning
          </Button>
        </div>
      </div>
    </div>
  );
}
