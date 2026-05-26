"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-8 text-center">

        {/* Logo */}
        <div>
          <Image
            src="https://res.cloudinary.com/dsmqsivcj/image/upload/v1779733974/lwg6puq41ne1bpp9jywj.png"
            alt="Smart Attendance"
            width={90}
            height={90}
            className="mx-auto mb-4"
            unoptimized
          />
          <h1 className="text-3xl font-bold text-[#273C97]">Smart Attendance</h1>
          <p className="mt-1 text-sm text-gray-500">ISTAD · Powered by IAM</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white px-8 py-10 shadow-md space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-800">Sign in to continue</h2>
            <p className="text-sm text-gray-400">
              You will be redirected to the ISTAD identity portal
            </p>
          </div>

          <Button
            onClick={() => signIn("istad-iam", { callbackUrl: "/classes" })}
            className="w-full gap-3 bg-[#273C97] py-3 text-base font-semibold text-white hover:bg-blue-800"
          >
            <Image
              src="https://res.cloudinary.com/dsmqsivcj/image/upload/v1779342444/erdgqkwvh2mfuprw2yfk.svg"
              alt=""
              width={20}
              height={20}
              unoptimized
            />
            Sign in with ISTAD
          </Button>
        </div>
      </div>
    </div>
  );
}
