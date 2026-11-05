import React from 'react';

export const CloudBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Sky atmospheric gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E0F2FE] via-[#F4F9FF] to-[#EBF3FC]" />

      {/* Sun / Sky ambient glows */}
      <div className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-sky-300/30 to-amber-200/25 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-sky-200/35 via-cloud-300/20 to-transparent blur-3xl" />
      <div className="absolute -bottom-20 left-1/4 w-[700px] h-[400px] rounded-full bg-gradient-to-t from-sky-200/30 to-transparent blur-3xl" />

      {/* Drifting Cloud Layer 1 - High altitude, slow whisper */}
      <div className="absolute top-[8%] -left-[200px] w-[380px] opacity-45 animate-drift-cloud-1">
        <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm filter blur-[0.6px]">
          <path
            d="M50 85 C30 85 10 70 20 45 C28 25 55 25 65 35 C75 15 110 10 130 25 C150 5 195 10 205 35 C225 25 255 35 255 55 C275 60 275 85 250 85 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Drifting Cloud Layer 2 - Mid altitude, gentle drift */}
      <div className="absolute top-[42%] -left-[240px] w-[460px] opacity-40 animate-drift-cloud-2">
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm filter blur-[1px]">
          <path
            d="M60 100 C35 100 15 80 25 55 C35 30 65 30 78 42 C92 20 135 15 158 32 C182 10 235 15 248 44 C272 32 308 44 308 68 C332 75 330 100 300 100 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Drifting Cloud Layer 3 - Lower breeze */}
      <div className="absolute top-[75%] -left-[220px] w-[420px] opacity-35 animate-drift-cloud-3">
        <svg viewBox="0 0 340 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm filter blur-[1.5px]">
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

