import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/provider/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Attendance · ISTAD",
  description: "Smart attendance management system by ISTAD",
  icons: {
    icon: "https://res.cloudinary.com/dsmqsivcj/image/upload/v1779342444/erdgqkwvh2mfuprw2yfk.svg",
    shortcut: "https://res.cloudinary.com/dsmqsivcj/image/upload/v1779342444/erdgqkwvh2mfuprw2yfk.svg",
    apple: "https://res.cloudinary.com/dsmqsivcj/image/upload/v1779733974/lwg6puq41ne1bpp9jywj.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <TooltipProvider>{children}</TooltipProvider> */}
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
