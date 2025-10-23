"use client";

import React, { useState } from "react";
import SecondaryModal from "./SecondaryModal";
import SeedRestore from "./SeedRestore";

type Item = {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  openSecondary?: boolean;
};

const items: Item[] = [
  {
    key: "new",
    title: "New Wallet",
    desc: "Generate a brand new wallet",
    icon: <span>👜</span>,
    openSecondary: true,
  },
  {
    key: "hw",
    title: "Connect Hardware",
    desc: "Use your Ledger, Trezor or Keystone device with Eternl",
    icon: <span>🔗</span>,
    openSecondary: true,
  },
  {
    key: "seed",
    title: "Enter a Seed-phrase",
    desc: "Use your 24, 15 or 12 word seed-phrase",
    icon: <span>🔑</span>,
    openSecondary: true,
  },
  {
    key: "multisig",
    title: "Multi‑Sig Wallet",
    desc: "Create or join a multi-signature wallet",
    icon: <span>❌</span>,
    openSecondary: true,
  },
  {
    key: "more",
    title: "More",
    desc: "Show additional wallet import options",
    icon: <span> ▪▪▪</span>,
  },
];

const moreItems: Item[] = [
  {
    key: "import-backup",
    title: "Import Backup",
    desc: "Restore from Eternl JSON backup files",
    icon: <span>📁</span>,
  },
  {
    key: "cli-signing-keys",
    title: "CLI Signing Keys",
    desc: "Import CLI generated (skey) signing keys",
    icon: <span>🖥️</span>,
  },
  {
    key: "account-pubkey",
    title: "Account Public Key (read-only)",
    desc: "Input exported account public key",
    icon: <span>🔐</span>,
  },
  {
    key: "address-readonly",
    title: "Address (read-only)",
    desc: "Create from a bech32 address",
    icon: <span>🏷️</span>,
  },
  {
    key: "qr-import",
    title: "QR Code Import",
    desc: "Scan the QR Code from another Eternl app",
    icon: <span>📷</span>,
  },
];

export default function SelectWalletTypeModal({
  open = true,
  onClose,
  onSelect,
  onBack,
}: {
  open?: boolean;
  onClose?: () => void;
  // onSelect now optionally accepts a payload (e.g. mnemonic words) as second arg
  onSelect?: (key: string, payload?: any) => void;
  onBack?: () => void;
}) {
  const [view, setView] = useState<"main" | "more">("main");
  const [activeSecondaryKey, setActiveSecondaryKey] = useState<string | null>(
    null
  );

  if (!open) return null;

  function handleItemClick(it: Item) {
    if (it.key === "more") {
      setView("more");
      return;
    }

    if (it.openSecondary) {
      setActiveSecondaryKey(it.key);
      return;
    }

    onSelect?.(it.key);
  }

  function renderItem(it: Item) {
    return (
      <button
        key={it.key}
        onClick={() => handleItemClick(it)}
        className="w-full text-left rounded-2xl bg-white/5 hover:bg-white/8 px-5 py-4 ring-1 ring-white/10 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-xl">
            {it.icon}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-white">{it.title}</div>
            <div className="text-sm text-white/60">{it.desc}</div>
          </div>
          <div className="text-white/40">›</div>
        </div>
      </button>
    );
  }

  function closeSecondary() {
    setActiveSecondaryKey(null);
    setView("main"); // ensure we return to Select Wallet Type list, not the home page
  }

  // confirm from secondary flows; payload is optional (SeedRestore will pass words)
  function confirmFromSecondary(key: string, payload?: any) {
    setActiveSecondaryKey(null);
    setView("main");
    onSelect?.(key, payload);
  }

  function handleBackToMain() {
    setView("main");
  }

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-start justify-center pt-10 sm:pt-16">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Dialog */}
        <div className="relative mx-4 w-full max-w-[860px] rounded-3xl bg-neutral-900/95 ring-1 ring-white/10 shadow-2xl overflow-hidden">
          <div className="absolute left-6 right-6 top-0 h-[4px] bg-gradient-to-r from-pink-400 via-orange-300 to-fuchsia-500 rounded-full" />

          <div className="px-6 sm:px-8 pt-8 pb-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {view === "more" && (
                  <button
                    onClick={handleBackToMain}
                    aria-label="Back"
                    className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center ring-1 ring-white/10 text-white/90 mr-1"
                  >
                    ‹
                  </button>
                )}

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {view === "main"
                      ? "Select wallet type"
                      : "Advanced wallet creation"}
                  </h3>
                  <p className="mt-2 text-white/70">
                    {view === "main"
                      ? "If you're a new user, create a new wallet. Connect your Ledger or import a JSON backup."
                      : "Advanced wallet creation. Go back for common options."}
                  </p>
                </div>
              </div>

              <div className="shrink-0 mt-1">
                <span className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 h-10 ring-1 ring-white/10 text-white">
                  <span className="h-5 w-5 rounded-full overflow-hidden">
                    <img
                      src="/brand/cardano.svg"
                      alt="Cardano"
                      className="h-full w-full"
                    />
                  </span>
                  <span className="text-sm">Cardano mainnet</span>
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {view === "main"
                ? items.map(renderItem)
                : moreItems.map(renderItem)}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary modal: Reusable overlay shown above the main modal */}
      <SecondaryModal
        open={!!activeSecondaryKey}
        onClose={closeSecondary}
        title={
          activeSecondaryKey === "new"
            ? "Create New Wallet"
            : activeSecondaryKey === "hw"
            ? "Connect Hardware Wallet"
            : activeSecondaryKey === "seed"
            ? "Enter Seed-Phrase"
            : activeSecondaryKey === "multisig"
            ? "Multi‑Sig Wallet"
            : "Details"
        }
        subtitle={
          activeSecondaryKey === "hw"
            ? "Please connect your Ledger/Trezor and follow the prompts."
            : activeSecondaryKey === "seed"
            ? "Enter your saved seed phrase"
            : undefined
        }
      >
        {activeSecondaryKey === "new" && (
          <div>
            <p className="text-white/70">
              Create a wallet by choosing a name and passphrase. This is a
              placeholder UI.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => confirmFromSecondary("new")}
                className="rounded-md bg-emerald-500 px-4 py-2 text-white"
              >
                Create wallet
              </button>
              <button
                onClick={closeSecondary}
                className="rounded-md bg-white/5 px-4 py-2 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {activeSecondaryKey === "hw" && (
          <div>
            <p className="text-white/70">
              Select your hardware device and follow the connection steps.
            </p>
            <div className="mt-4 grid gap-2">
              <button
                onClick={() => confirmFromSecondary("hw")}
                className="rounded-md bg-amber-500 px-4 py-2 text-white"
              >
                Connect Ledger (placeholder)
              </button>
              <button
                onClick={closeSecondary}
                className="rounded-md bg-white/5 px-4 py-2 text-white"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {activeSecondaryKey === "seed" && (
          <SeedRestore
            onCancel={closeSecondary}
            onConfirm={(words) => {
              // propagate mnemonic words as optional payload to parent
              confirmFromSecondary("seed", { words });
            }}
          />
        )}

        {activeSecondaryKey === "multisig" && (
          <div>
            <p className="text-white/70">
              Start or join a multi-sig wallet. Fill out keys/peers as required.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => confirmFromSecondary("multisig")}
                className="rounded-md bg-emerald-500 px-4 py-2 text-white"
              >
                Continue
              </button>
              <button
                onClick={closeSecondary}
                className="rounded-md bg-white/5 px-4 py-2 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </SecondaryModal>
    </>
  );
}
