"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import InfoPage from "../app/home/page";

const RESTRICT_AFTER_MINUTES = 15;

const ReffererProvider = ({ children }: { children: React.ReactNode }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let firstVisit = localStorage.getItem("firstVisit");
    let cameFromSearchEngine = localStorage.getItem("cameFromSearchEngine");

    if (!firstVisit) {
      firstVisit = Date.now().toString();
      localStorage.setItem("firstVisit", firstVisit);
      console.log("[ReffererProvider] First visit set:", firstVisit);

      const referrer = document.referrer;
      if (/google|bing|yahoo|duckduckgo|baidu|yandex/i.test(referrer)) {
        localStorage.setItem("cameFromSearchEngine", "true");
        cameFromSearchEngine = "true";
        console.log("[ReffererProvider] Came from search engine, flag set.");
      } else {
        localStorage.setItem("cameFromSearchEngine", "false");
        cameFromSearchEngine = "false";
        console.log(
          "[ReffererProvider] Did not come from search engine, flag set."
        );
      }
    } else {
      console.log("[ReffererProvider] First visit found:", firstVisit);
      console.log(
        "[ReffererProvider] Came from search engine flag:",
        cameFromSearchEngine
      );
    }

    const now = Date.now();
    const elapsed = now - parseInt(firstVisit, 10);
    console.log(
      "[ReffererProvider] Now:",
      now,
      "Elapsed (ms):",
      elapsed,
      "Threshold (ms):",
      RESTRICT_AFTER_MINUTES * 60 * 1000
    );

    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get("symbiosis");
    if (param) {
      sessionStorage.setItem("symbiosis", param);
      console.log(
        "[ReffererProvider] symbiosis param set in sessionStorage:",
        param
      );
    }

    const hasSymbiosis = sessionStorage.getItem("symbiosis");
    console.log("[ReffererProvider] symbiosis session data:", hasSymbiosis);

    if (hasSymbiosis) {
      console.log("[ReffererProvider] Session param present, allowing access.");
      setIsLoading(false);
      return;
    }

    const timeLimitExceeded = elapsed > RESTRICT_AFTER_MINUTES * 60 * 1000;

    if (cameFromSearchEngine === "true") {
      console.log("[ReffererProvider] Logic path: Came from search engine.");
      if (timeLimitExceeded) {
        console.log("[ReffererProvider] Time limit exceeded.");
        if (pathname === "/") {
          console.log(
            "[ReffererProvider] On main page after time limit, setting error."
          );
          setIsError(true);
        } else {
          console.log(
            "[ReffererProvider] Not on main page after time limit, allowing access."
          );
          setIsError(false);
        }
      } else {
        console.log("[ReffererProvider] Within time limit, allowing access.");
        setIsError(false);
      }
    } else {
      console.log(
        "[ReffererProvider] Logic path: Did not come from search engine."
      );
      setIsError(true);
    }

    setIsLoading(false);
    console.log("[ReffererProvider] Loading complete.");
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
