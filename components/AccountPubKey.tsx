"use client";
import { useState } from "react";

type AccountPubKeyProps = {
  onCancel: () => void;
  onConfirm: (data: { backup: unknown }) => void;
};

export default function AccountPubKey({
  onCancel,
  onConfirm,
}: AccountPubKeyProps) {
  const [pubkey, setPubkey] = useState("");
  const isValid = pubkey.startsWith("acct_xpub") || pubkey.length > 40;

  return (
    <div className="text-white">
      <p className="text-white/70">
        Enter your exported account public key (read-only access).
      </p>
      <input
        value={pubkey}
        onChange={(e) => setPubkey(e.target.value.trim())}
        placeholder="Enter account public key..."
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
          //   onClick={() => onConfirm({ pubkey })}
          className="h-11 px-6 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 text-white font-semibold disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
