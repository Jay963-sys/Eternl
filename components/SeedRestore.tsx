"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";

export default function SeedRestore({
  wordCounts = [24, 15, 12],
  onCancel,
  onConfirm,
}: {
  wordCounts?: number[]; // options to show in the seed-type screen (default: [24,15,12])
  onCancel?: () => void;
  onConfirm?: (words: string[]) => void;
}) {
  const [step, setStep] = useState<"type" | "mnemonic">("type");
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (step === "mnemonic" && selectedCount) {
      const w = new Array(selectedCount).fill("");
      setWords(w);
      // focus first input after short timeout so DOM is ready
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, selectedCount]);

  const columns = useMemo(() => {
    // visually we want 3 columns (like the screenshots)
    return 3;
  }, []);

  function selectType(count: number) {
    setSelectedCount(count);
  }

  function goNextFromType() {
    if (!selectedCount) return;
    setStep("mnemonic");
  }

  function goBackToType() {
    setStep("type");
    // clear current words
    setWords([]);
    setSelectedCount(null);
  }

  function updateWord(index: number, val: string) {
    setWords((prev) => {
      const copy = prev.slice();
      copy[index] = val.trim();
      return copy;
    });
  }

  function resetAll() {
    setWords((prev) => prev.map(() => ""));
    // focus first input if present
    setTimeout(() => firstInputRef.current?.focus(), 50);
  }

  function handleConfirm() {
    if (!selectedCount) return;
    const allFilled = words.every((w) => w && w.length > 0);
    if (!allFilled) {
      // simple client-side hint; in production show a visible error
      firstInputRef.current?.focus();
      return;
    }
    onConfirm?.(words);
  }

  // layout helpers
  function renderTypeOption(count: number) {
    const desc =
      count === 24
        ? "A Shelley wallet created by, say, Eternl or Daedalus."
        : count === 15
        ? "Like a Yoroi Shelley wallet."
        : "A 12-word Shelley wallet.";
    const active = selectedCount === count;
    return (
      <button
        key={count}
        onClick={() => selectType(count)}
        className={`w-full text-left rounded-2xl px-5 py-4 ring-1 transition-colors ${
          active
            ? "bg-white/6 ring-pink-400/40"
            : "bg-white/3 hover:bg-white/5 ring-white/10"
        }`}
      >
        <div className="font-semibold text-white">{count}-word phrase</div>
        <div className="text-sm text-white/60 mt-1">{desc}</div>
      </button>
    );
  }

  function renderMnemonicGrid() {
    if (!selectedCount) return null;
    // create columns x rows layout
    const perColumn = Math.ceil(selectedCount / columns);
    const cols: number[][] = [];
    for (let c = 0; c < columns; c++) {
      cols[c] = [];
      for (let r = 0; r < perColumn; r++) {
        const idx = c * perColumn + r;
        if (idx < selectedCount) cols[c].push(idx);
      }
    }

    return (
      <div>
        <div className="grid grid-cols-3 gap-x-6 gap-y-3">
          {cols.map((col, cIndex) => (
            <div key={cIndex} className="space-y-3">
              {col.map((idx, i) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-full bg-white/3 px-3 py-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 text-sm">
                    {idx + 1}
                  </div>

                  {/* input container: left vertical divider + input */}
                  <div className="flex-1 relative">
                    <input
                      ref={idx === 0 ? firstInputRef : undefined}
                      value={words[idx] ?? ""}
                      onChange={(e) => updateWord(idx, e.target.value)}
                      placeholder=""
                      className="w-full rounded-full bg-transparent px-4 py-3 text-white placeholder:text-white/30 outline-none ring-1 ring-white/10 focus:ring-pink-400/40 transition-all"
                    />
                    {/* vertical divider visual (optional) */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-[1px] bg-white/6" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            onClick={resetAll}
            className="rounded-full bg-white/5 px-6 py-2 text-white"
          >
            Reset
          </button>
          <button
            onClick={handleConfirm}
            className={`rounded-full px-6 py-2 text-white ${
              words.length === 0 || words.some((w) => !w)
                ? "bg-white/8 opacity-60 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-400 via-orange-300 to-fuchsia-500"
            }`}
            disabled={words.length === 0 || words.some((w) => !w)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {step === "type" && (
        <div>
          <h4 className="text-lg font-semibold text-white">Seed phrase type</h4>
          <p className="mt-2 text-white/70">
            What kind of wallet would you like to restore?
          </p>

          <div className="mt-6 space-y-3">
            {wordCounts.map((wc) => renderTypeOption(wc))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => onCancel?.()}
              className="rounded-full bg-white/5 px-6 py-2 text-white mr-4"
            >
              Cancel
            </button>
            <button
              onClick={goNextFromType}
              disabled={!selectedCount}
              className={`rounded-full px-6 py-2 text-white ${
                selectedCount
                  ? "bg-gradient-to-r from-pink-400 via-orange-300 to-fuchsia-500"
                  : "bg-white/8 opacity-60 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === "mnemonic" && (
        <div>
          <div className="flex items-center justify-between">
            <button
              onClick={goBackToType}
              className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center ring-1 ring-white/10 text-white/90"
              aria-label="Back"
            >
              ‹
            </button>

            <div className="text-center w-full -ml-10">
              <h4 className="text-lg font-semibold text-white">
                Mnemonic phrase
              </h4>
              <p className="mt-2 text-white/70">Enter your saved seed phrase</p>
            </div>

            {/* placeholder to keep header balanced */}
            <div style={{ width: 40 }} />
          </div>

          <div className="mt-6">{renderMnemonicGrid()}</div>
        </div>
      )}
    </div>
  );
}
