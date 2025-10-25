"use client";
import { useState } from "react";

type ImportBackupProps = {
  onCancel: () => void;
  onConfirm: (data: { backup: unknown }) => void;
};

export default function ImportBackup({
  onCancel,
  onConfirm,
}: ImportBackupProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.name.endsWith(".json")) {
      setError("Please select a valid Eternl JSON backup file.");
      return;
    }
    setFile(f);
    setError(null);
  }

  async function handleImport() {
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data.walletName || !data.accounts)
        throw new Error("Invalid backup file");
      onConfirm({ backup: data });
    } catch (e: unknown) {
      setError("Failed to parse backup: " + (e instanceof Error ? e.message : String(e)));
    }
  }

  return (
    <div className="text-white">
      <p className="text-white/70">
        Select an Eternl backup file (.json) from your computer to restore your
        wallet.
      </p>

      <div className="mt-4 flex flex-col items-center justify-center border border-white/10 rounded-2xl bg-white/5 p-6 text-center">
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="text-sm text-white/80"
        />
        {file && (
          <p className="mt-2 text-sm text-white/60">Selected: {file.name}</p>
        )}
        {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="h-11 px-6 rounded-full bg-white/10 hover:bg-white/15 text-white"
        >
          Cancel
        </button>
        <button
          disabled={!file}
          onClick={handleImport}
          className="h-11 px-6 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 text-white font-semibold shadow-[inset_0_-2px_0_rgba(0,0,0,0.35)] disabled:opacity-50"
        >
          Import
        </button>
      </div>
    </div>
  );
}
