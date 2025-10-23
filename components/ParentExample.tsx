import React, { useState } from "react";
import SelectWalletTypeModal from "./SelectWalletTypeModal";

export default function ParentExample() {
  const [open, setOpen] = useState(true);
  const [lastChoice, setLastChoice] = useState<string | null>(null);

  function handleSelect(key: string) {
    // keys can be: "new", "hw", "seed", "multisig", "import-backup", ...
    setLastChoice(key);
    setOpen(false);

    // Example: route or open a dedicated UI for each key
    // if (key === "import-backup") router.push("/import/backup")
    // else if (key === "hw") openHardwareFlow()
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
        onBack={() => console.log("went back inside modal")}
      />

      {lastChoice ? (
        <div className="mt-4 text-sm">User chose: {lastChoice}</div>
      ) : null}
    </div>
  );
}
