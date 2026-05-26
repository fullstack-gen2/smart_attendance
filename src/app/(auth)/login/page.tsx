"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Already logged in — go straight to app
      router.replace("/classes"); // Next.js basePath ("/attendance") is prepended automatically
    } else if (status === "unauthenticated") {
      // Not logged in — redirect immediately to IAM OAuth2 form
      signIn("istad-iam", { callbackUrl: "/attendance/classes" });
    }
    // status === "loading" → wait
  }, [status, router]);

  // Show a minimal loading screen while the redirect happens
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
      <Image
        src="https://res.cloudinary.com/dsmqsivcj/image/upload/v1779733974/lwg6puq41ne1bpp9jywj.png"
        alt="Smart Attendance"
        width={72}
        height={72}
        unoptimized
      />
      <Loader2 className="h-6 w-6 animate-spin text-[#273C97]" />
      <p className="text-sm text-gray-400">Redirecting to ISTAD login…</p>
    </div>
  );
}
