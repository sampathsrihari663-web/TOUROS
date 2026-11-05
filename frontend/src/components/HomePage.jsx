import React from 'react';
import { 
  Zap, 
  ArrowRight, 
  Plus, 
  Cloud, 
  Compass,
  Layers,
  Volume2,
  VolumeX
} from 'lucide-react';
import Logo from './Logo';
import taurosAnimated from '../assets/tauros-animated.gif';

export const HomePage = ({
  onGoToTasks,
  onOpenStampede,
  onOpenAddTask,
  isSoundMuted,
  onToggleSound
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-between animate-fade-in text-center selection:bg-sky-400 selection:text-white">
      
      {/* Top Navbar with TOUROS Logo in corner */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-5 px-4 sm:px-8 z-20">
        {/* Left Corner Logo */}
        <div className="cursor-pointer transition-transform hover:scale-[1.02]" onClick={onGoToTasks} title="TOUROS - Airborne Productivity">
          <Logo />
        </div>

        {/* Right Corner Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleSound}
            className={`p-2.5 rounded-2xl border transition-all active:scale-95 ${
              isSoundMuted
                ? 'bg-slate-100/80 border-slate-200 text-slate-400 hover:text-slate-600'
                : 'bg-white/90 border-sky-200 text-sky-600 hover:bg-sky-50 shadow-xs'
            }`}
            title={isSoundMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label="Toggle Sound"
          >
            {isSoundMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>

          <button
            onClick={onOpenStampede}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl font-bold text-xs text-slate-900 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 border border-amber-300 shadow-xs active:scale-95 transition-all"
            title="Open Focus Sprint"
          >
            <Zap size={14} className="fill-current" />
            <span>Stampede Focus</span>
          </button>

          <button
            onClick={onGoToTasks}
            className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-md hover:shadow-cloud-card-hover active:scale-95 transition-all"
          >
            <span>Enter Task Stream</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 duration-200" />
          </button>
        </div>
      </header>

      {/* Hero Center Body */}
      <main className="flex-1 flex flex-col justify-center items-center py-6 sm:py-12 px-4 max-w-4xl mx-auto w-full z-10">
        
        {/* 1. Subtle Airborne Cloud Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-xl border border-sky-200/80 shadow-xs mb-6 sm:mb-8">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
          </span>
          <span className="text-xs font-black tracking-wider uppercase text-sky-900">
            AIRBORNE PRODUCTIVITY ENGINE
          </span>
          <span className="text-sky-300">•</span>
          <span className="text-xs font-bold text-sky-600">POKÉMON TAUROS EDITION</span>
        </div>

        {/* 2. Hero Mascot Floating Artwork */}
        <div className="relative mb-6 sm:mb-8 group">
          <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-2xl transform scale-110 pointer-events-none" />
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 p-4 shadow-cloud-card flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <img
              src={taurosAnimated}
              alt="TOUROS Mascot"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-md animate-cloud-bob"
            />
          </div>
        </div>

        {/* 3. Main Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.08]">
          TOUROS
        </h1>

        <p className="mt-2 text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 bg-clip-text text-transparent tracking-tight">
          Airborne Focus. Wild Momentum.
        </p>

        {/* 4. What TOUROS is Meant For (Purpose & Vision) */}
        <div className="mt-6 max-w-2xl mx-auto space-y-4">
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            <strong className="text-slate-900 font-bold">TOUROS</strong> is an airborne cloud productivity engine inspired by the untamed power of Pokémon Tauros. Built to help developers, students, and high-velocity creators conquer daily goals through dynamic mood altitude, deep-work Pomodoro stampedes, and real-time cloud synchronization.
          </p>
        </div>

        {/* 5. What Makes TOUROS Unique (3 Clean Pillars) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full text-left">
          <div className="p-4 rounded-2xl bg-white/75 backdrop-blur-md border border-cloud-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-2 font-black">
              <Cloud size={18} />
            </div>
            <h2 className="text-sm font-black text-slate-900">Airborne Clarity</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Distraction-free cloud task streaming designed for airy clarity and zero friction.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/75 backdrop-blur-md border border-cloud-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 font-black">
              <Zap size={18} className="fill-current" />
            </div>
            <h2 className="text-sm font-black text-slate-900">Stampede Focus</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Gamified Pomodoro sprints that lock you into deep work to crush intimidating tasks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/75 backdrop-blur-md border border-cloud-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 font-black">
              <Compass size={18} />
            </div>
            <h2 className="text-sm font-black text-slate-900">Live Cloud Sync</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Instant persistence powered by MongoDB Atlas. Never lose a thought across devices.
            </p>
          </div>
        </div>

        {/* 6. Primary Call-to-Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onGoToTasks}
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-md hover:shadow-cloud-card-hover active:scale-95 transition-all duration-200"
          >
            <Layers size={18} />
            <span>Launch Task Stream</span>
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1 duration-200" />
          </button>

          <button
            onClick={onOpenStampede}
            className="group inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-sm text-slate-900 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 border border-amber-300/60 shadow-sm hover:shadow-md active:scale-95 transition-all duration-200"
          >
            <Zap size={17} className="text-slate-950 fill-slate-950 transition-transform group-hover:scale-110" />
            <span>Start Stampede Focus</span>
          </button>

          <button
            onClick={onOpenAddTask}
            className="inline-flex items-center gap-1.5 px-5 py-4 rounded-2xl font-bold text-sm text-slate-700 bg-white/80 hover:bg-white border border-cloud-200/90 shadow-xs active:scale-95 transition-all duration-200"
          >
            <Plus size={17} className="text-sky-600" />
            <span>New Task</span>
          </button>
        </div>

      </main>

      {/* Subtle Footer */}
      <footer className="py-6 text-xs text-slate-400 z-10">
        <span>TOUROS © {new Date().getFullYear()} • Powered by MongoDB Atlas & Netlify</span>
      </footer>

    </div>
  );
};

export default HomePage;
