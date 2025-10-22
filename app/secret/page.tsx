"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type Word = { index: number; value: string };

const empty = Array.from({ length: 24 }, (_, i) => ({
  index: i + 1,
  value: "",
}));

export default function Page() {
  const [words, setWords] = useState<Word[]>(empty);

  const setWord = (i: number, v: string) => {
    setWords((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], value: v.trim().toLowerCase() };
      return next;
    });
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>, i: number) => {
    const text = e.clipboardData.getData("text");
    const parts = text
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 24 - i);
    if (parts.length > 1) {
      e.preventDefault();
      setWords((prev) => {
        const next = [...prev];
        parts.forEach((p, k) => {
          const idx = i + k;
          next[idx] = { ...next[idx], value: p.toLowerCase() };
        });
        return next;
      });
    }
  };

  const allFilled = words.every((w) => w.value.length >= 2);

  return (
    <main className="min-h-dvh bg-black text-white flex items-center justify-center">
      <section className="w-full max-w-[780px] px-6 py-10 flex flex-col items-center">
        {/* 🔷 Animated image */}
        <motion.div
          className="h-20 w-20 rounded-2xl bg-white/5 grid place-items-center shadow"
          //   animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          style={{}}
        >
          <img
            src="/brand/duck.svg"
            alt="Lock"
            className="h-32 w-32 object-contain"
          />
        </motion.div>

        {/* Heading */}
        <h1 className="mt-8 text-2xl sm:text-3xl font-extrabold tracking-tight">
          Enter Secret Words
        </h1>
        <p className="mt-3 text-center text-white/70 max-w-[60ch]">
          You can restore access to your wallet by entering the 24 secret words
          that were written down when creating the wallet.
        </p>

        {/* Inputs */}
        <div
          className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-4"
          aria-label="Recovery phrase inputs"
        >
          {words.map((w, i) => (
            <label key={w.index} className="relative">
              {/* Number label (remove duplicate numbers in placeholder) */}
              <span className="pointer-events-none absolute -top-2 left-3 translate-y-0 rounded-full bg-black px-2 text-xs text-white/50">
                {w.index}.
              </span>
              <input
                inputMode="text"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={w.value}
                onChange={(e) => setWord(i, e.target.value)}
                onPaste={(e) => onPaste(e, i)}
                className="w-44 h-12 rounded-2xl bg-white/5 text-white placeholder:text-white/40 outline-none ring-0 focus:bg-white/10 px-4"
                placeholder="" // remove index from placeholder to avoid duplicates
              />
            </label>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-10 w-full max-w-[720px] flex justify-between gap-4">
          <button className="flex-1 h-11 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors">
            Cancel
          </button>
          <button
            className={`flex-1 h-11 rounded-xl text-black font-semibold transition-all backdrop-blur
              ${
                allFilled
                  ? "bg-sky-400 hover:bg-sky-300 shadow-md"
                  : "bg-sky-400/30 cursor-not-allowed opacity-50"
              }`}
            disabled={!allFilled}
          >
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}
