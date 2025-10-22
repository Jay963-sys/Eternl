"use client";

import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center">
      {/* Top gradient line */}
      <div className="w-full h-0.5 bg-linear-to-r from-pink-500 via-orange-400 to-purple-500" />

      {/* Hero section */}
      <section className="flex flex-col items-center text-center mt-24 px-4">
        {/* Main heading */}
        <h1 className="mt-10 text-4xl sm:text-5xl font-extrabold">
          <span className="text-white">A modern wallet.</span>
          <br />
          <span className="bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            For everyone.
          </span>
        </h1>

        <p className="mt-6 text-lg text-white/80 max-w-[40ch]">
          Friendly for beginners. <br />
          Powerful for pro users.
        </p>

        <button className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-6 py-3 transition">
          Open app
        </button>

        {/* Download cards */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          {/* Mobile Dapps Card */}
          <div className="bg-[#161616] rounded-2xl shadow-md p-6 w-72 text-left">
            <h2 className="text-white font-semibold text-sm">
              Mobile Dapps{" "}
              <span className="text-gray-400 font-normal">(Dapp browser)</span>
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Your wallet on the go, now with DApp support.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="https://play.google.com/store"
                target="_blank"
                className="flex items-center justify-center gap-2 bg-[#222] rounded-xl h-10 text-sm font-medium hover:bg-[#2a2a2a] transition"
              >
                <Image
                  src="/brand/play.svg"
                  alt="Google Play"
                  width={20}
                  height={20}
                />
                Google Play
              </Link>
              <Link
                href="https://www.apple.com/app-store/"
                target="_blank"
                className="flex items-center justify-center gap-2 bg-[#222] rounded-xl h-10 text-sm font-medium hover:bg-[#2a2a2a] transition"
              >
                <Image
                  src="/brand/apple.svg"
                  alt="Apple Store"
                  width={20}
                  height={20}
                />
                Apple Store
              </Link>
            </div>
          </div>

          {/* Browser Extension Card */}
          <div className="bg-[#161616] rounded-2xl shadow-md p-6 w-72 text-left">
            <h2 className="text-white font-semibold text-sm">
              Browser Extension{" "}
              <span className="text-gray-400 font-normal">
                (Dapp connector & browser)
              </span>
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              For Chrome, Edge, Brave and Opera.
            </p>

            <Link
              href="https://chrome.google.com/webstore"
              target="_blank"
              className="mt-4 flex items-center justify-center gap-2 bg-[#222] rounded-xl h-10 text-sm font-medium hover:bg-[#2a2a2a] transition"
            >
              <Image
                src="/brand/chrome.svg"
                alt="Chrome Web Store"
                width={20}
                height={20}
              />
              Chrome Web Store
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl mt-24 mb-10 text-sm text-white/70 px-4">
        <div className="flex flex-col sm:flex-row justify-between gap-6 bg-[#161616] rounded-2xl p-6">
          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="hover:text-white">
                  Wiki
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Imprint
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Social</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="hover:text-white">
                  X.com
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Telegram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          © Ton Wallet {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
