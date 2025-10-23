"use client";

import { useState } from "react";

export default function HardwareConnect({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: (device: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const devices = ["Ledger", "Trezor", "Keystone"];

  return (
    <div>
      <p className="text-white/70 mb-4">
        Select your hardware device and follow instructions.
      </p>

      <div className="grid gap-2">
        {devices.map((dev) => (
          <button
            key={dev}
            onClick={() => setSelected(dev)}
            className={`rounded-md px-4 py-2 text-left transition ${
              selected === dev
                ? "bg-pink-500 text-black"
                : "bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            {dev}
          </button>
        ))}
      </div>

      {selected && (
        <button
          onClick={() => onConfirm(selected)}
          className="mt-4 w-full rounded-md bg-emerald-500 py-2 font-semibold text-white"
        >
          Connect {selected}
        </button>
      )}

      <button
        onClick={onCancel}
        className="w-full rounded-md bg-white/10 py-2 text-white mt-2"
      >
        Cancel
      </button>
    </div>
  );
}
