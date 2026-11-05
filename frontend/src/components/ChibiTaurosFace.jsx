import React from 'react';
import taurosSigh from '../assets/chibi/tauros-sigh.png';
import taurosNormal from '../assets/chibi/tauros-normal.png';
import taurosDetermined from '../assets/chibi/tauros-determined.png';
import taurosInspired from '../assets/chibi/tauros-inspired.png';
import taurosHappy from '../assets/chibi/tauros-happy.png';
import taurosJoyous from '../assets/chibi/tauros-joyous.png';
import taurosShuffle from '../assets/chibi/tauros-shuffle-uicon.png';

/**
 * getTaurosMood
 * Computes official mood metadata and sprite mapping based on progress percentage.
 */
export const getTaurosMood = (completionPercentage, totalTasks = 1) => {
  if (totalTasks === 0) {
    return {
      mood: 'resting',
      label: 'Peaceful Meadow',
      emoji: '🌿',
      sprite: taurosNormal,
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'The herd is resting peacefully in the meadow. Add a task to wake up Tauros!',
      bgGradient: 'from-emerald-50 via-cloud-100 to-white',
    };
  }
  if (completionPercentage === 0) {
    return {
      mood: 'sleepy',
      label: 'Snoozing (0%)',
      emoji: '💤',
      sprite: taurosSigh,
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description: 'Tauros is taking a cloud nap. Complete an objective to wake him up!',
      bgGradient: 'from-indigo-50/70 via-sky-50 to-white',
    };
  }
  if (completionPercentage < 40) {
    return {
      mood: 'determined',
      label: 'Determined Charge',
      emoji: '⚡',
      sprite: taurosDetermined,
      badgeClass: 'bg-sky-50 text-sky-800 border-sky-300 font-semibold',
      description: 'Horns sharpened! Official chibi Tauros is focused and charging ahead.',
      bgGradient: 'from-sky-50 via-cloud-100 to-white',
    };
  }
  if (completionPercentage < 70) {
    return {
      mood: 'cruising',
      label: 'Cruising Inspired',
      emoji: '🌤️',
      sprite: taurosInspired,
      badgeClass: 'bg-teal-50 text-teal-800 border-teal-300 font-semibold',
      description: 'Cruising smoothly through the clouds! Halfway to total herd victory.',
      bgGradient: 'from-teal-50 via-sky-50 to-white',
    };
  }
  if (completionPercentage < 100) {
    return {
      mood: 'hyped',
      label: 'Super Hyped!',
      emoji: '🔥',
      sprite: taurosHappy,
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-300 animate-pulse font-bold',
      description: 'Full speed ahead! Unstoppable wild bull stampede to the finish!',
      bgGradient: 'from-amber-50 via-rose-50 to-white',
    };
  }
  return {
    mood: 'champion',
    label: 'Crowned Champion',
    emoji: '👑',
    sprite: taurosJoyous,
    badgeClass: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 border-amber-300 font-black shadow-xs',
    description: '100% Cleared! Tauros has soared above all clouds as Champion!',
    bgGradient: 'from-amber-100/70 via-sky-50 to-white',
  };
};

/**
 * ChibiTaurosFace
 * Renders the authentic, official Pokémon Chibi Tauros sprite with dynamic mood accessories.
 */
export const ChibiTaurosFace = ({
  mood = 'sleepy',
  size = 68,
  className = '',
  interactive = true,
}) => {
  // Sprite selection by mood
  let spriteSrc = taurosSigh;
  if (mood === 'determined') spriteSrc = taurosDetermined;
  else if (mood === 'cruising' || mood === 'inspired') spriteSrc = taurosInspired;
  else if (mood === 'hyped' || mood === 'happy') spriteSrc = taurosHappy;
  else if (mood === 'champion' || mood === 'joyous') spriteSrc = taurosJoyous;
  else if (mood === 'resting' || mood === 'normal') spriteSrc = taurosNormal;
  else if (mood === 'shuffle') spriteSrc = taurosShuffle;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      title={`Official Chibi Tauros: ${mood.toUpperCase()}`}
    >
      {/* Soft atmospheric halo */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-400/20 via-transparent to-cloud-200/30 blur-sm pointer-events-none" />

      {/* Official Chibi Tauros Sprite (Crisp Pixel-Perfect) */}
      <img
        src={spriteSrc}
        alt={`Official Chibi Tauros - ${mood}`}
        className={`w-11/12 h-11/12 object-contain filter drop-shadow-md transition-transform duration-300 ${
          interactive ? 'group-hover:scale-110 group-active:scale-95' : ''
        }`}
        style={{
          imageRendering: 'pixelated', // Keeps official Pokémon Mystery Dungeon / Shuffle pixels sharp!
        }}
        loading="eager"
      />

      {/* Dynamic Animated Accessories based on Mood */}
      {/* 1. Sleepy Mood: Floating Zzz */}
      {(mood === 'sleepy' || mood === 'resting') && (
        <div className="absolute -top-1 -right-1 flex flex-col items-end pointer-events-none animate-pulse">
          <span className="text-[11px] font-black text-indigo-500 leading-none drop-shadow-xs">Z</span>
          <span className="text-[9px] font-black text-sky-400 leading-none -mt-0.5">z</span>
          <span className="text-[7px] font-black text-sky-300 leading-none -mt-0.5">z</span>
        </div>
      )}

      {/* 2. Determined Mood: Blue Power Spark */}
      {mood === 'determined' && (
        <div className="absolute -top-1.5 -left-1 text-sky-500 animate-bounce pointer-events-none">
          <span className="text-xs">⚡</span>
        </div>
      )}

      {/* 3. Hyped Mood: Fire / Sparkle */}
      {mood === 'hyped' && (
        <div className="absolute -top-1.5 -right-1 text-amber-500 animate-pulse pointer-events-none">
          <span className="text-xs">🔥</span>
        </div>
      )}

      {/* 4. Champion Mood: Golden Royal Crown */}
      {mood === 'champion' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 filter drop-shadow-md animate-bounce pointer-events-none">
          <span className="text-base leading-none">👑</span>
        </div>
      )}
    </div>
  );
};

export default ChibiTaurosFace;
