"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  ScanLine,
  MapPin,
  Loader2,
  LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/authSlice";
import type { AppDispatch } from "@/store/store";

// Dynamic import — scanner uses browser APIs, must be client-only
const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((m) => m.Scanner),
  { ssr: false, loading: () => <ScannerPlaceholder /> }
);

function ScannerPlaceholder() {
  return (
    <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-gray-900">
      <Loader2 className="h-8 w-8 animate-spin text-white/40" />
    </div>
  );
}

type Status = "idle" | "scanning" | "loading" | "success" | "error";

export default function ScanPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, userId, fullName, role } = useSelector(
    (s: RootState) => s.auth
  );

  const [status, setStatus] = useState<Status>("scanning");
  const [message, setMessage] = useState("");
  const [paused, setPaused] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const lastToken = useRef<string>("");

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated || role !== "STUDENT") {
      router.replace("/login");
    }
  }, [isAuthenticated, role, router]);

  // Get geolocation on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => setLocation(null) // GPS optional — backend allows null
      );
    }
  }, []);

  const handleScan = async (detectedCodes: { rawValue: string }[]) => {
    const token = detectedCodes[0]?.rawValue;
    if (!token || token === lastToken.current || status === "loading") return;

    lastToken.current = token;
    setPaused(true);
    setStatus("loading");
    setMessage("");

    try {
      const deviceId = localStorage.getItem("attendance_device_id") ?? "";

      const body: Record<string, unknown> = {
        studentId: userId,
        qrToken: token,
        deviceId,
      };
      if (location) {
        body.latitude = location.lat;
        body.longitude = location.lng;
      }

      // Use proxy route — same origin, no CORS preflight
      const res = await fetch("/api/proxy/attendances/dynamic-qr-check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Attendance recorded successfully!");
      } else {
        setStatus("error");
        setMessage(data.message || "Check-in failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  };

  const handleReset = () => {
    lastToken.current = "";
    setStatus("scanning");
    setMessage("");
    setPaused(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-950">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="text-xs text-gray-400">Signed in as</p>
          <p className="text-sm font-semibold text-white">
            {fullName ?? "Student"}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="gap-1.5 text-gray-400 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>

      {/* Title */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-2">
          <ScanLine className="h-5 w-5 text-[#4F6FE8]" />
          <h1 className="text-lg font-bold text-white">Scan QR Code</h1>
        </div>
        <p className="mt-0.5 text-xs text-gray-400">
          Point your camera at the classroom QR code to check in
        </p>
      </div>

      {/* Scanner area */}
      <div className="flex-1 px-5">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gray-900">
          {/* Live scanner — hidden once we have a result */}
          {(status === "scanning" || status === "loading") && (
            <Scanner
              onScan={handleScan}
              paused={paused}
              formats={["qr_code"]}
              sound={false}
              styles={{ container: { borderRadius: "1.5rem" } }}
              components={{ finder: false }}
            />
          )}

          {/* Corner brackets overlay */}
          {status === "scanning" && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-52 w-52">
                {/* TL */}
                <span className="absolute left-0 top-0 h-8 w-8 rounded-tl-lg border-l-4 border-t-4 border-[#4F6FE8]" />
                {/* TR */}
                <span className="absolute right-0 top-0 h-8 w-8 rounded-tr-lg border-r-4 border-t-4 border-[#4F6FE8]" />
                {/* BL */}
                <span className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-lg border-b-4 border-l-4 border-[#4F6FE8]" />
                {/* BR */}
                <span className="absolute bottom-0 right-0 h-8 w-8 rounded-br-lg border-b-4 border-r-4 border-[#4F6FE8]" />
              </div>
            </div>
          )}

          {/* Loading spinner overlay */}
          {status === "loading" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm">
              <Loader2 className="h-12 w-12 animate-spin text-[#4F6FE8]" />
              <p className="mt-3 text-sm text-white">Submitting attendance…</p>
            </div>
          )}

          {/* Success / Error result */}
          {(status === "success" || status === "error") && (
            <div
              className={`flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-3xl px-6 ${
                status === "success"
                  ? "bg-gradient-to-br from-emerald-900 to-emerald-700"
                  : "bg-gradient-to-br from-red-900 to-red-700"
              }`}
            >
              {status === "success" ? (
                <CheckCircle className="h-20 w-20 text-emerald-300" />
              ) : (
                <XCircle className="h-20 w-20 text-red-300" />
              )}
              <div className="text-center">
                <p className="text-lg font-bold text-white">
                  {status === "success" ? "Checked In!" : "Check-in Failed"}
                </p>
                <p className="mt-1 text-sm text-white/70">{message}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom panel */}
      <div className="px-5 py-6 space-y-3">
        {/* GPS indicator */}
        <div className="flex items-center justify-center gap-1.5">
          <MapPin
            className={`h-3.5 w-3.5 ${
              location ? "text-emerald-400" : "text-gray-600"
            }`}
          />
          <span className="text-xs text-gray-500">
            {location
              ? `GPS: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
              : "GPS not available"}
          </span>
        </div>

        {/* Action button */}
        {status === "scanning" && (
          <p className="text-center text-xs text-gray-500">
            Scanning automatically when a QR code is detected…
          </p>
        )}

        {(status === "success" || status === "error") && (
          <Button
            onClick={handleReset}
            className="w-full gap-2 rounded-xl bg-[#273C97] py-3 text-base font-semibold text-white hover:bg-blue-800"
          >
            <ScanLine className="h-5 w-5" />
            Scan Again
          </Button>
        )}
      </div>
    </div>
  );
}
