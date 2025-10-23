import React, { useState } from "react";
import SelectWalletTypeModal from "./SelectWalletTypeModal";

export default function ParentExample() {
  const [open, setOpen] = useState(true);
  const [lastChoice, setLastChoice] = useState<string | null>(null);

  function handleSelect(key: string) {
    setLastChoice(key);
    setOpen(false);
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 rounded bg-sky-600 text-white"
      >
        Open modal
      </button>
      <SelectWalletTypeModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={handleSelect}
        // onBack={() => console.log("went back inside modal")}
      />

      {lastChoice ? (
        <div className="mt-4 text-sm">User chose: {lastChoice}</div>
      ) : null}
    </div>
  );
}
