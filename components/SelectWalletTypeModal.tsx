"use client";

type Item = {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    key: "new",
    title: "New Wallet",
    desc: "Generate a brand new wallet",
    icon: <span className="i">👜</span>,
  },
  {
    key: "hw",
    title: "Connect Hardware",
    desc: "Use your Ledger, Trezor or Keystone device with Eternl",
    icon: <span className="i">🔗</span>,
  },
  {
    key: "seed",
    title: "Enter a Seed-phrase",
    desc: "Use your 24, 15 or 12 word seed-phrase",
    icon: <span className="i">🔑</span>,
  },
  {
    key: "multisig",
    title: "Multi‑Sig Wallet",
    desc: "Create or join a multi-signature wallet",
    icon: <span className="i">❌</span>,
  },
  {
    key: "more",
    title: "More",
    desc: "Show additional wallet import options",
    icon: <span className="i">▪️▪️</span>,
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
  onSelect?: (key: string) => void;
  onBack?: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-10 sm:pt-16">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative mx-4 w-full max-w-[860px] rounded-3xl bg-neutral-900/95 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        {/* Top accent bars */}
        <div className="absolute left-6 right-6 top-0 h-[4px] bg-gradient-to-r from-pink-400 via-orange-300 to-fuchsia-500 rounded-full" />

        <div className="px-6 sm:px-8 pt-8 pb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Select wallet type
              </h3>
              <p className="mt-2 text-white/70">
                If you&apos;re a new user, create a new wallet. Connect your
                Ledger or import a JSON backup.
              </p>
            </div>

            {/* Network chip */}
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

          {/* List */}
          <div className="mt-6 space-y-4">
            {items.map((it) => (
              <button
                key={it.key}
                onClick={() => onSelect?.(it.key)}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
