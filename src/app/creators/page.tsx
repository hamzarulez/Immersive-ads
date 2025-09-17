"use client";

export default function CreatorsPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-700 to-blue-600 text-white">
      {/* Fake dashboard background (blurred) */}
      <div className="absolute inset-0 bg-[url('/creator-mock.png')] bg-cover bg-center blur-sm opacity-40" />

      {/* Overlay content */}
      <div className="relative z-10 max-w-md rounded-2xl bg-black/70 p-8 text-center shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Creator Dashboard (Locked)</h1>
        <p className="mb-6 text-gray-300">
          Your creator dashboard, start monetizing your
          games with immersive ads.
        </p>
      </div>
    </div>
  );
}
