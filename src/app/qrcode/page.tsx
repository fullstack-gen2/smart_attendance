"use client";

import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";

export default function MyQR() {
  const qrUrl = "https://yourapp.com/checkin?token=abc123";
  return (
    <>
      <div>
        <Link href={"/dashboard"}>
          <button className="px-2 py-1 rounded-2xl">Back Dashboard</button>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <QRCodeCanvas
          value={qrUrl}
          size={590}
          level="H"
          includeMargin={true}
          imageSettings={{
            src: "/smart_attendance_logo.png",
            x: undefined,
            y: undefined,
            height: 50,
            width: 50,
            excavate: true,
          }}
        />
      </div>
    </>
  );
}
