import React from "react";

export default function SecondaryModal({
  open,
  title,
  subtitle,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-12 sm:pt-20">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative mx-4 w-full max-w-lg rounded-2xl bg-neutral-900/95 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <div className="px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-lg font-semibold text-white">{title}</h4>
              {subtitle ? (
                <p className="mt-1 text-sm text-white/70">{subtitle}</p>
              ) : null}
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-4 h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 text-white/80"
            >
              ✕
            </button>
          </div>

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
