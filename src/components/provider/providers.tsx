"use client";

import dynamic from "next/dynamic";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { loadFromStorage } from "@/store/features/authSlice";
import type { AppDispatch } from "@/store/store";

// Lazy-load SessionProvider with ssr:false so next-auth never runs during
// server-side rendering / static page generation (avoids "Invalid URL" when
// NEXTAUTH_URL env var is not present at build time).
const SessionProvider = dynamic(
  () => import("next-auth/react").then((mod) => {
    const SP = ({ children }: { children: React.ReactNode }) => (
      <mod.SessionProvider basePath="/attendance/api/auth">
        {children}
      </mod.SessionProvider>
    );
    SP.displayName = "SessionProvider";
    return SP;
  }),
  { ssr: false }
);

function StoreInitializer() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <StoreInitializer />
        <TooltipProvider>{children}</TooltipProvider>
      </Provider>
    </SessionProvider>
  );
}
