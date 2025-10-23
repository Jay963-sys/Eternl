"use client";

/* Navbar with gradient underline */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5">
      <div className="w-full">
        <nav className="h-12 flex items-center px-3 sm:px-4">
          {/* Left: brand text + version + logo */}
          <div className="flex items-center gap-2">
            <div className="leading-tight">
              <div className="text-white font-semibold -mb-0.5">Eternl</div>
              <div className="text-[10px] text-white/50">v2.0.18.4</div>
            </div>
            <img
              src="/brand/eternl.svg"
              alt="Logo"
              className="h-8 w-8 rounded-sm"
            />
          </div>

          {/* Spacer to push everything left */}
          <div className="flex-1" />
        </nav>
      </div>

      {/* 1px gradient underline */}
      <div className="h-px w-full bg-linear-to-r from-cyan-400 via-indigo-500 to-fuchsia-500" />
    </header>
  );
}
