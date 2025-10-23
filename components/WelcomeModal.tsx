"use client";

import { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose?: () => void;
  onNext?: () => void;
  illustration?: ReactNode;
};

export default function WelcomeModal({
  open,
  onClose,
  onNext,
  illustration,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative mx-4 w-full max-w-[720px] rounded-3xl bg-neutral-900/95 shadow-2xl ring-1 ring-white/10 overflow-hidden"
      >
        {/* Top gradient line */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-pink-400 via-orange-300 to-fuchsia-500" />

        {/* Content */}
        <div className="px-8 sm:px-12 pt-10 pb-8 text-center">
          {/* Heading with gradient emphasis on 'Eternl!' */}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="bg-linear-to-r from-amber-300 via-orange-300 to-pink-400 bg-clip-text text-transparent inline-block">
              Welcome to Eternl!
            </span>
          </h2>

          <p className="mt-2 text-white/70">a multi‑platform Cardano wallet</p>

          {/* Illustration slot */}
          <div className="mt-10 flex justify-center">
            <div className="max-w-[460px]">{illustration}</div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <button
              className="group inline-flex items-center justify-center rounded-full px-6 sm:px-7 h-12
                         bg-linear-to-b from-rose-400 to-pink-500 text-black font-semibold
                         shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.35)] ring-1 ring-black/40
                         hover:from-rose-300 hover:to-pink-400 transition-colors"
              onClick={onNext}
            >
              Start setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
