"use client";

import { useState } from "react";

export default function NewWallet({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: (walletData: { name: string; words: string[] }) => void;
}) {
  const [walletName, setWalletName] = useState("");
  const [mnemonic, setMnemonic] = useState<string[]>([]);

  const generateSeed = () => {
    // Example only — replace with your actual Cardano lib later
    const words = [
      "agent",
      "matrix",
      "open",
      "focus",
      "void",
      "mirror",
      "galaxy",
      "spirit",
      "ocean",
      "trust",
      "signal",
      "harvest",
    ];
    setMnemonic(words);
  };

  return (
    <div>
      <p className="text-white/70 mb-4">
        Choose a name and generate your new wallet seed phrase.
      </p>

      <div className="space-y-4">
        <input
          className="w-full rounded-md bg-white/10 px-4 py-2 text-white placeholder:text-white/40"
          placeholder="Wallet name"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
        />

        <button
          onClick={generateSeed}
          className="w-full rounded-md bg-gradient-to-r from-pink-500 to-orange-400 py-2 font-semibold text-black"
        >
          Generate seed phrase
        </button>

        {mnemonic.length > 0 && (
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
            {mnemonic.map((w, i) => (
              <div
                key={i}
                className="bg-white/5 text-white/80 px-3 py-2 rounded-md text-sm text-center"
              >
                {i + 1}. {w}
              </div>
            ))}
          </div>
        )}

        {mnemonic.length > 0 && (
          <button
            onClick={() => onConfirm({ name: walletName, words: mnemonic })}
            className="w-full rounded-md bg-emerald-500 py-2 font-semibold text-white mt-4"
          >
            Continue
          </button>
        )}

        <button
          onClick={onCancel}
          className="w-full rounded-md bg-white/10 py-2 text-white mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
