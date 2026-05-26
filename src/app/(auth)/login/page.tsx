"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setCredentials } from "@/store/features/authSlice";
import type { AppDispatch } from "@/store/store";
import type { ApiResponse, LoginResponse } from "@/lib/type/apiTypes";
import Image from "next/image";

/** Get or create a stable device fingerprint stored in localStorage. */
function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "";
  const key = "attendance_device_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(key, id);
  }
  return id;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Generate / load deviceId on mount (client-only)
  useEffect(() => {
    setDeviceId(getOrCreateDeviceId());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // basePath is /attendance — must be included in client-side fetch.
      const res = await fetch(`/attendance/api/proxy/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, deviceId }),
      });

      const data: ApiResponse<LoginResponse> = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Login failed. Check your credentials.");
        return;
      }

      const { token, role, fullName, userId, deviceBound } = data.payload;
      dispatch(setCredentials({ token, role, fullName, userId, deviceBound }));

      // Route based on role
      if (role === "STUDENT") {
        // deviceBound === false  → just registered on this login
        // deviceBound === true   → already registered before
        router.push(deviceBound === false ? "/student/device-bound" : "/student/scan");
      } else {
        router.push("/classes");
      }
    } catch {
      setError("Network error. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image
            src="https://res.cloudinary.com/dsmqsivcj/image/upload/v1779733974/lwg6puq41ne1bpp9jywj.png"
            alt="Smart Attendance"
            width={80}
            height={80}
            className="mx-auto mb-4"
            unoptimized
          />
          <h1 className="text-3xl font-bold text-[#273C97]">Sign in</h1>
          <p className="mt-2 text-sm text-gray-500">
            Smart Attendance · ISTAD
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-8 shadow-md"
        >
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@istad.co"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#273C97] py-2.5 font-medium text-white hover:bg-blue-800"
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
