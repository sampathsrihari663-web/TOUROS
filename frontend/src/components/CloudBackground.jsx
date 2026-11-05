import React from 'react';

export const CloudBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Sky atmospheric gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E2F2FE] via-[#F4F9FF] to-[#E9F3FD]" />

      {/* Modern Atmospheric Tech Dot Matrix Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-15" />

      {/* Ambient Celestial Altitude Orbit Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-sky-400/15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-sky-300/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[1300px] rounded-full border border-sky-200/10 pointer-events-none" />

      {/* Sun & Sky Ambient Aurora Glow Orbs */}
      <div className="absolute -top-40 -left-20 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-sky-400/25 via-sky-300/15 to-amber-200/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-sky-300/30 via-cloud-300/15 to-amber-100/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[800px] h-[500px] rounded-full bg-gradient-to-t from-sky-300/20 to-transparent blur-3xl pointer-events-none" />

      {/* Wind Swirl Streak 1 */}
      <div className="absolute top-[22%] left-[-10%] w-[120%] h-32 opacity-25 pointer-events-none">
        <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M0 60 C300 20, 600 100, 900 40 C1050 10, 1150 70, 1200 50"
            stroke="url(#windGrad1)"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <defs>
            <linearGradient id="windGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wind Swirl Streak 2 */}
      <div className="absolute top-[68%] left-[-10%] w-[120%] h-32 opacity-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M0 80 C250 120, 550 30, 850 90 C1000 110, 1100 60, 1200 70"
            stroke="url(#windGrad2)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <defs>
            <linearGradient id="windGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Drifting Cloud Layer 1 - High altitude, slow whisper */}
      <div className="absolute top-[8%] -left-[200px] w-[380px] opacity-50 animate-drift-cloud-1">
        <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm filter blur-[0.4px]">
          <path
            d="M50 85 C30 85 10 70 20 45 C28 25 55 25 65 35 C75 15 110 10 130 25 C150 5 195 10 205 35 C225 25 255 35 255 55 C275 60 275 85 250 85 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Drifting Cloud Layer 2 - Mid altitude, gentle drift */}
      <div className="absolute top-[42%] -left-[240px] w-[460px] opacity-45 animate-drift-cloud-2">
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm filter blur-[0.8px]">
          <path
            d="M60 100 C35 100 15 80 25 55 C35 30 65 30 78 42 C92 20 135 15 158 32 C182 10 235 15 248 44 C272 32 308 44 308 68 C332 75 330 100 300 100 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Drifting Cloud Layer 3 - Lower breeze */}
      <div className="absolute top-[75%] -left-[220px] w-[420px] opacity-40 animate-drift-cloud-3">
        <svg viewBox="0 0 340 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm filter blur-[1.2px]">
          <path
            d="M55 90 C32 90 12 72 22 50 C32 28 60 28 72 38 C85 18 122 12 144 28 C166 8 215 12 226 38 C248 28 280 38 280 60 C302 66 300 90 272 90 Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default CloudBackground;
