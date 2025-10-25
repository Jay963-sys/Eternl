"use client";
import { useState } from "react";

type AddressReadOnlyProps = {
  onCancel: () => void;
  onConfirm: (data: { backup: unknown }) => void;
};

export default function AddressReadOnly({
  onCancel,
  onConfirm,
}: AddressReadOnlyProps) {
  const [address, setAddress] = useState("");
  const isValid = address.startsWith("addr");

  return (
    <div className="text-white">
      <p className="text-white/70">
        Enter your Cardano address (read-only wallet).
      </p>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value.trim())}
        placeholder="addr1q..."
        className="w-full mt-4 rounded-xl bg-white/5 px-4 py-3 text-white/90 outline-none"
      />
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="h-11 px-6 rounded-full bg-white/10 hover:bg-white/15 text-white"
        >
          Cancel
        </button>
        <button
          disabled={!isValid}
          //   onClick={() => onConfirm({ address })}
          className="h-11 px-6 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 text-white font-semibold disabled:opacity-50"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
