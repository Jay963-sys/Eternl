"use client";
import { useState } from "react";

export default function CreatePinModal({
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
  const [pin, setPin] = useState("");

  if (!open) return null;

  const clear = () => setPin("");

  const canNext = pin.length >= 4 && pin.length <= 12;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative mx-4 w-full max-w-[720px] rounded-3xl bg-neutral-900/95 ring-1 ring-white/10 shadow-2xl overflow-hidden">
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

          <h3 className="text-lg font-semibold text-white">Create PIN Code</h3>

          <button
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded-lg bg-white/5 text-white/80 hover:bg-white/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 pb-6 text-center">
          <p className="mt-2 text-white/70">
            Set a PIN code to access Eternl. It&apos;ll be required every time
            you open Eternl.
          </p>

          <p className="mt-6 text-white/80">Enter your PIN Code.</p>

          {/* PIN input with gradient border wrapper */}
          <div className="mx-auto mt-3 max-w-[420px]">
            <div className="rounded-full p-[2px] bg-gradient-to-r from-rose-400 to-pink-500">
              <input
                aria-label="PIN"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
                value={pin}
                onChange={(e) =>
                  setPin(e.target.value.replace(/\D/g, "").slice(0, 12))
                }
                className="w-full h-12 rounded-full bg-neutral-900/95 px-4 text-white placeholder:text-white/40 outline-none focus:outline-none"
                placeholder=""
              />
            </div>
            <p className="mt-2 text-xs text-white/50">4–12 digits</p>
          </div>

          {/* Footer actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onNext}
              className="h-11 rounded-full bg-white/10 px-6 text-white hover:bg-white/15"
            >
              Skip
            </button>
            <button
              onClick={clear}
              className="h-11 rounded-full bg-white/10 px-6 text-white hover:bg-white/15"
            >
              Reset
            </button>
            <button
              onClick={onNext}
              disabled={!canNext}
              className="h-11 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 px-6 text-white font-semibold ring-1 ring-black/40 shadow-[inset_0_-2px_0_rgba(0,0,0,0.35)] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
