"use client";

import { FileUp, Key, Share, MapPin, QrCode } from "lucide-react";
import React from "react";

type WalletOption = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
};

const walletOptions: WalletOption[] = [
  {
    icon: FileUp,
    title: "Import Backup",
    description: "Restore from Eternl JSON backup files",
    color: "#ff4b8b",
  },
  {
    icon: Key,
    title: "CLI Signing Keys",
    description: "Import CLI generated (skey) signing keys",
    color: "#ff9f40",
  },
  {
    icon: Share,
    title: "Account Public Key (read-only)",
    description: "Input exported account public key",
    color: "#ffa500",
  },
  {
    icon: MapPin,
    title: "Address (read-only)",
    description: "Create from a bech32 address",
    color: "#ffb74d",
  },
  {
    icon: QrCode,
    title: "QR Code Import",
    description: "Scan the QR Code from another Eternl app",
    color: "#b0b0b0",
  },
];

const WalletPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white">
      <div className="relative bg-[#141414] rounded-2xl p-10 w-full max-w-3xl shadow-2xl border border-neutral-800">
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-pink-500 to-orange-500 rounded-t-2xl" />

        {/* Title */}
        <h2 className="text-xl font-semibold mt-4">Select wallet type</h2>
        <p className="text-gray-400 mt-2 mb-8">
          Advanced wallet creation. Go back for common options.
        </p>

        {/* Cardano network button */}
        <div className="flex justify-end mb-8">
          <button className="flex items-center gap-2 bg-[#1b1b1b] border border-neutral-700 rounded-full px-4 py-2 text-[15px] hover:bg-[#222] transition">
            <img
              src="https://cryptologos.cc/logos/cardano-ada-logo.png?v=029"
              alt="Cardano"
              className="w-6 h-6"
            />
            Cardano Mainnet
          </button>
        </div>

        {/* Wallet options */}
        <div className="grid gap-4">
          {walletOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-[#1b1b1b] rounded-xl border border-neutral-800 hover:bg-[#222] transition-all"
            >
              {/* Colored icon (no bg) */}
              <option.icon size={26} style={{ color: option.color }} />

              <div>
                <h3 className="font-medium">{option.title}</h3>
                <p className="text-gray-400 text-sm">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
