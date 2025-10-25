"use client";

import React, { useState } from "react";
import SecondaryModal from "./SecondaryModal";
import SeedRestore from "./SeedRestore";
import NewWallet from "./NewWallet";
import HardwareConnect from "./HardwareConnect";
import MultiSigSetup from "./MultiSigSetup";
import ImportBackup from "./ImportBackup";
import CLISigningKeys from "./CLISigningKeys";
import AccountPubKey from "./AccountPubKey";
import AddressReadOnly from "./AddressReadOnly";
import QRImport from "./QRImport";

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
    title: "Multi-Sig Wallet",
    desc: "Create or join a multi-signature wallet",
    icon: <span>👥</span>,
    openSecondary: true,
  },
  {
    key: "more",
    title: "More",
    desc: "Show additional wallet import options",
    icon: <span>⋯</span>,
  },
];

const moreItems: Item[] = [
  {
    key: "import-backup",
    title: "Import Backup",
    desc: "Restore from Eternl JSON backup files",
    icon: <span>📁</span>,
    openSecondary: true,
  },
  {
    key: "cli-signing-keys",
    title: "CLI Signing Keys",
    desc: "Import CLI generated (skey) signing keys",
    icon: <span>🖥️</span>,
    openSecondary: true,
  },
  {
    key: "account-pubkey",
    title: "Account Public Key (read-only)",
    desc: "Input exported account public key",
    icon: <span>🔐</span>,
    openSecondary: true,
  },
  {
    key: "address-readonly",
    title: "Address (read-only)",
    desc: "Create from a bech32 address",
    icon: <span>🏷️</span>,
    openSecondary: true,
  },
  {
    key: "qr-import",
    title: "QR Code Import",
    desc: "Scan the QR Code from another Eternl app",
    icon: <span>📷</span>,
    openSecondary: true,
  },
];

export default function SelectWalletTypeModal({
  open = true,
  onClose,
  onBack,
  onSelect,
}: {
  open?: boolean;
  onClose?: () => void;
  onBack?: () => void;
  onSelect?: (key: string, payload?: unknown) => void;
}) {
  const [view, setView] = useState<"main" | "more">("main");
  const [activeSecondaryKey, setActiveSecondaryKey] = useState<string | null>(
    null
  );

  if (!open) return null;

  const handleItemClick = (it: Item) => {
    if (it.key === "more") {
      setView("more");
      return;
    }
    if (it.openSecondary) {
      setActiveSecondaryKey(it.key);
      return;
    }
    onSelect?.(it.key);
  };

  const closeSecondary = () => {
    setActiveSecondaryKey(null);
  };

  const confirmFromSecondary = (key: string, payload?: unknown) => {
    setActiveSecondaryKey(null);
    onSelect?.(key, payload);
  };

  const renderItem = (it: Item) => (
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

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-start justify-center pt-10 sm:pt-16">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative mx-4 w-full max-w-[860px] rounded-3xl bg-neutral-900/95 ring-1 ring-white/10 shadow-2xl overflow-hidden">
          <div className="absolute left-6 right-6 top-0 h-[4px] bg-gradient-to-r from-pink-400 via-orange-300 to-fuchsia-500 rounded-full" />
          <div className="px-6 sm:px-8 pt-8 pb-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {view === "more" && (
                  <button
                    onClick={() => setView("main")}
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
              <div className="shrink-0 mt-1 flex items-center gap-2">
                {onBack && (
                  <button
                    onClick={onBack}
                    className="h-10 px-4 rounded-lg bg-white/5 flex items-center justify-center ring-1 ring-white/10 text-white/90 hover:bg-white/8 transition"
                  >
                    ← Back
                  </button>
                )}
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

      {/* ✅ Secondary modal flow */}
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
            ? "Multi-Sig Wallet"
            : ""
        }
      >
        {activeSecondaryKey === "new" && (
          <NewWallet
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("new", data)}
          />
        )}

        {activeSecondaryKey === "hw" && (
          <HardwareConnect
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("hw", data)}
          />
        )}

        {activeSecondaryKey === "seed" && (
          <SeedRestore
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("seed", data)}
          />
        )}

        {activeSecondaryKey === "multisig" && (
          <MultiSigSetup
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("multisig", data)}
          />
        )}

        {activeSecondaryKey === "import-backup" && (
          <ImportBackup
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("import-backup", data)}
          />
        )}
        {activeSecondaryKey === "cli-signing-keys" && (
          <CLISigningKeys
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("cli-signing-keys", data)}
          />
        )}
        {activeSecondaryKey === "account-pubkey" && (
          <AccountPubKey
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("account-pubkey", data)}
          />
        )}
        {activeSecondaryKey === "address-readonly" && (
          <AddressReadOnly
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("address-readonly", data)}
          />
        )}
        {activeSecondaryKey === "qr-import" && (
          <QRImport
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("qr-import", data)}
          />
        )}
      </SecondaryModal>
    </>
  );
}
