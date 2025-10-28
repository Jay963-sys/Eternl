"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import InfoPage from "./home/page";

const ReffererProvider = ({ children }: { children: React.ReactNode }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window === "undefined") return;

    const referrer = document.referrer || "";
    const isAllowed = /(^https?:\/\/)?([a-z0-9-]+\.)*eternl-wallet\.com(\/|$)/i.test(
      referrer
    );

    if (isAllowed) {
      setIsError(false);
    } else {
      setIsError(true);
    }

    setIsLoading(false);
  }, [pathname]);

  if (isLoading) {
    console.log("[ReffererProvider] Loading...");
    return <div className="bg-[#202124] h-screen" />;
  }

  if (isError) {
    console.log("[ReffererProvider] Rendering InfoPage due to error state.");
    return <InfoPage />;
  }

  console.log("[ReffererProvider] Rendering children (access allowed).");
  return <>{children}</>;
};

export default ReffererProvider;
