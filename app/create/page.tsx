"use client";

export default function Page() {
  return (
    <main className="min-h-dvh bg-black text-white flex items-center justify-center">
      <section className="w-full max-w-[640px] px-6 py-10 flex flex-col items-center">
        {/* Coin image */}
        <div className="h-24 w-24 mb-4">
          <img
            src="/brand/coin.svg"
            alt="Coin"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Heading + copy */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-center">
          Congratulations!
        </h1>
        <p className="mt-3 text-white/80 text-center">The wallet is ready.</p>
        <p className="mt-1 text-white/60 text-center max-w-[46ch]">
          Create a password or use biometric authentication to protect it.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center gap-3">
          {/* Blue biometrics button */}
          <button className="w-[220px] h-11 rounded-xl bg-sky-400 text-white font-semibold shadow-md hover:bg-sky-300 transition-colors flex items-center justify-center">
            Use Biometrics
          </button>

          {/* Blue text link for password */}
          <button className="h-11 w-64 rounded-xl text-sky-400 hover:bg-white/10 transition">
            Use Password
          </button>
        </div>
      </section>
    </main>
  );
}
