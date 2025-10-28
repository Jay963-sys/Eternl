import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import ReffererProvider from "./ReffererProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "500",
});
const satoshi = localFont({
  src: "../public/fonts/satoshi/Satoshi-Variable.woff",
  variable: "--font-satoshi",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "500",
});

const inter = Inter({
  display: "swap",
  variable: "--inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Eternl | Secure & Easy-to-Use Cardano Light Wallet",
  description:
    "Eternl is a fast, secure Cardano light wallet for managing ADA and native tokens. Access your crypto anytime, stake ADA, and explore the Cardano ecosystem with ease.",
  icons: "/brand/eternlll.ico",
  keywords: "eternl wallet, eternl, etrnl wallet, etrnl, eternal wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${satoshi.variable} ${inter.variable} antialiased`}
      >
        <ReffererProvider>

        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          theme="colored"
          />
        <Navbar />
        {children}
        </ReffererProvider>
      </body>
    </html>
  );
}
