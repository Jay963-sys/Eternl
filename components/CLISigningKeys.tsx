"use client";
import { useState } from "react";

type CLISigningKeysProps = {
  onCancel: () => void;
  onConfirm: (data: { backup: unknown }) => void;
};

export default function CLISigningKeys({
  onCancel,
  onConfirm,
}: CLISigningKeysProps) {
  const [vkey, setVkey] = useState("");
  const [skey, setSkey] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isValid = vkey.trim().length > 0 && skey.trim().length > 0;

  function handleImport() {
    try {
      const parsedSkey = JSON.parse(skey);
      const parsedVkey = JSON.parse(vkey);
      if (!parsedSkey.cborHex || !parsedVkey.cborHex)
        throw new Error("Invalid key structure");
      //   onConfirm({ vkey: parsedVkey, skey: parsedSkey });
    } catch (e: unknown) {
      setError("Invalid key format: " + (e instanceof Error ? e.message : String(e)));
    }
  }

  return (
    <div className="text-white">
      <p className="text-white/70">
        Paste your CLI-generated signing and verification keys (JSON format).
      </p>

      <div className="mt-4 space-y-3">
        <textarea
          rows={5}
          value={vkey}
          onChange={(e) => setVkey(e.target.value)}
          placeholder="Paste verification key JSON..."
          className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white/90 outline-none"
        />
        <textarea
          rows={5}
          value={skey}
          onChange={(e) => setSkey(e.target.value)}
          placeholder="Paste signing key JSON..."
          className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white/90 outline-none"
        />
        {error && <p className="text-sm text-rose-400">{error}</p>}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="h-11 px-6 rounded-full bg-white/10 hover:bg-white/15 text-white"
        >
          Cancel
        </button>
        <button
          disabled={!isValid}
          onClick={handleImport}
          className="h-11 px-6 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 text-white font-semibold disabled:opacity-50"
        >
          Import Keys
        </button>
      </div>
    </div>
  );
}
