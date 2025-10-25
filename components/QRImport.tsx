"use client";
import { useState, useRef } from "react";

type QRImportProps = {
  onCancel: () => void;
  onConfirm: (data: { backup: unknown }) => void;
};

export default function QRImport({ onCancel, onConfirm }: QRImportProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  async function startScan() {
    try {
      setScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setTimeout(() => {
        setScanning(false);
        // onConfirm({ qrData: "mock_wallet_data" });
      }, 4000);
    } catch (e: unknown) {
      setError("Camera access denied or not available.");
    }
  }

  return (
    <div className="text-white">
      <p className="text-white/70">Scan the QR code from another Eternl app.</p>

      <div className="mt-4 flex flex-col items-center gap-3">
        <video
          ref={videoRef}
          className="w-64 h-64 rounded-2xl bg-black/30 border border-white/10"
        />
        {error && <p className="text-sm text-rose-400">{error}</p>}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="h-11 px-6 rounded-full bg-white/10 hover:bg-white/15 text-white"
        >
          Cancel
        </button>
        <button
          disabled={scanning}
          onClick={startScan}
          className="h-11 px-6 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 text-white font-semibold disabled:opacity-50"
        >
          {scanning ? "Scanning..." : "Start Scan"}
        </button>
      </div>
    </div>
  );
}
