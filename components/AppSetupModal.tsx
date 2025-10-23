"use client";
import { useState } from "react";

export default function AppSetupModal({
  open = true,
  onClose,
  onBack,
  onNext,
}: {
  open?: boolean;
  onClose?: () => void;
  onBack?: () => void;
  onNext?: () => void;
}) {
  const [mode, setMode] = useState<"simple" | "pro">("simple");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative mx-4 w-full max-w-[820px] rounded-3xl bg-neutral-900/95 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        {/* Top gradient line */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-pink-400 via-orange-300 to-fuchsia-500" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 pt-6">
          <button
            onClick={onBack}
            className="h-9 w-9 grid place-items-center rounded-lg bg-white/5 text-white/80 hover:bg-white/10"
            aria-label="Back"
          >
            ←
          </button>

          <h3 className="text-lg font-semibold text-white">App setup</h3>

          <button
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded-lg bg-white/5 text-white/80 hover:bg-white/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 pb-6">
          <p className="mt-2 text-white/70">
            Update your settings to your personal preferences, or just stick
            with the defaults.
          </p>

          {/* Language select (pill with right flag) */}
          <div className="mt-6">
            <div className="relative">
              <select
                className="w-full appearance-none rounded-2xl bg-white/5 text-white h-12 pl-4 pr-14 outline-none ring-0 focus:bg-black/70"
                defaultValue="en-US"
              >
                <option value="en-US">English</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="text-white/70 text-sm">United States</span>
                <span className="h-5 w-5 rounded-full overflow-hidden">
                  {/* replace with your flag image */}
                  <img src="/brand/us.svg" alt="US" className="h-full w-full" />
                </span>
              </div>
            </div>
          </div>

          {/* Currency select */}
          <div className="mt-3">
            <div className="relative">
              <select
                className="w-full appearance-none rounded-2xl bg-white/5 text-white h-12 pl-4 pr-10 outline-none ring-0 focus:bg-black/70"
                defaultValue="USD"
              >
                <option value="USD">$ (USD)</option>
                <option value="EUR">€ (EUR)</option>
                <option value="GBP">£ (GBP)</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/70">
                ⌄
              </span>
            </div>
          </div>

          {/* Segmented control */}
          <div className="mt-5 flex justify-center">
            <div className="inline-flex rounded-full bg-white/5 p-1 ring-1 ring-white/10">
              <button
                onClick={() => setMode("simple")}
                className={`h-9 px-4 rounded-full text-sm transition-colors ${
                  mode === "simple"
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Simple Mode
              </button>
              <button
                onClick={() => setMode("pro")}
                className={`h-9 px-4 rounded-full text-sm transition-colors ${
                  mode === "pro"
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Pro Mode
              </button>
            </div>
          </div>

          {/* Network chip */}
          <div className="mt-6 flex items-center gap-3"></div>

          {/* Footer */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onNext}
              className="h-11 w-28 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 text-white font-semibold ring-1 ring-black/40 shadow-[inset_0_-2px_0_rgba(0,0,0,0.35)]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
