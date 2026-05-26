"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { loadFromStorage } from "@/store/features/authSlice";
import type { AppDispatch } from "@/store/store";
import { SessionProvider } from "next-auth/react";

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
