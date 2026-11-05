import React, { useState } from 'react';
import taurosShuffle from '../assets/chibi/tauros-shuffle-uicon.png';
import taurosAnimated from '../assets/tauros-animated.gif';

export const TaurosChibiIcon = ({ 
  size = 46, 
  className = "" 
}) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className={`relative rounded-2xl bg-gradient-to-b from-white via-cloud-100 to-cloud-200 border border-white/95 shadow-cloud-card flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-cloud-card-hover group cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Official Pokémon Chibi Tauros (Click or hover to animate!)"
    >
      {/* Cloud ambient halo */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 via-transparent to-cloud-300/30 rounded-2xl pointer-events-none" />

      {/* Official Pokémon Shuffle Chibi Tauros / Animated battle sprite on hover */}
      <img
        src={hovered ? taurosAnimated : taurosShuffle}
        alt="Official Chibi Tauros Pokémon"
        className="w-10/12 h-10/12 object-contain select-none drop-shadow-md transition-transform duration-300 group-hover:scale-115 animate-cloud-float-subtle"
        loading="eager"
      />

      {/* Cloud puff glint */}
      <div className="absolute top-1 left-1 w-2.5 h-1.5 bg-white/80 rounded-full blur-[0.5px] pointer-events-none" />
    </div>
  );
};

export const Logo = ({ collapsed = false, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <TaurosChibiIcon size={46} className="shrink-0" />
      {!collapsed && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-sky-900 via-sky-700 to-cloud-600 bg-clip-text text-transparent leading-none drop-shadow-xs">
              TOUROS
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full border border-sky-200/80 shadow-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping inline-block" />
              Chibi
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase mt-1 flex items-center gap-1">
            <span>Airborne Productivity</span>
            <span className="text-sky-400 text-xs">☁️</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
