import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  Plus, 
  Cloud, 
  Compass,
  Layers,
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  Shield,
  Heart,
  Wind,
  CheckCircle2,
  Activity
} from 'lucide-react';
import Logo from './Logo';
import taurosOfficial from '../assets/tauros-official.png';
import taurosAnimated from '../assets/tauros-animated.gif';
import ChibiTaurosFace from './ChibiTaurosFace';
import soundService from '../services/soundService';

export const HomePage = ({
  onGoToTasks,
  onOpenStampede,
  onOpenAddTask,
  isSoundMuted,
  onToggleSound
}) => {
  // Interactive Mood Preview State on Hero Page
  const [interactiveMood, setInteractiveMood] = useState(50);

  const handleTestMood = (percent) => {
    setInteractiveMood(percent);
    if (percent === 100) {
      soundService.playVictoryFanfare();
    } else {
      soundService.playSuccessChime();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between animate-fade-in text-center selection:bg-sky-400 selection:text-white pb-16">
      
      {/* 1. Top Navbar: ONLY TOUROS Logo in top-left corner + sleek action buttons */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-5 px-4 sm:px-8 z-30">
        {/* Top-Left Corner Logo */}
        <div 
          className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-95" 
          onClick={onGoToTasks} 
          title="TOUROS - Airborne Productivity"
        >
          <Logo />
        </div>

        {/* Top-Right Corner Actions */}
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
            <Zap size={14} className="fill-current text-slate-950" />
            <span>Stampede Focus</span>
          </button>

          <button
            onClick={onGoToTasks}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-md hover:shadow-cloud-card-hover active:scale-95 transition-all"
          >
            <span>Enter Task Stream</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 duration-200" />
          </button>
        </div>
      </header>

      {/* 2. Main Hero Presentation Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-6 sm:pt-12 space-y-16 sm:space-y-24 z-10">
        
        {/* Hero Split Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          
          {/* Left Column: Headlines & Call-to-Actions */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Live Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-sky-200/90 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="text-xs font-black tracking-wider uppercase text-sky-900">
                AIRBORNE PRODUCTIVITY ENGINE
              </span>
              <span className="text-sky-300">•</span>
              <span className="text-xs font-bold text-sky-600">POKÉMON TAUROS EDITION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05]">
              Airborne Focus. <br />
              <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 bg-clip-text text-transparent">
                Wild Momentum.
              </span>
            </h1>

            {/* Clear Description of What TOUROS is Meant For */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              <strong className="text-slate-900 font-bold">TOUROS</strong> is an airborne cloud productivity engine inspired by the untamed power of Pokémon Tauros. Built to help developers, students, and creators conquer daily goals through dynamic mood progression, deep-work Pomodoro stampedes, and real-time cloud synchronization.
            </p>

            {/* Launch Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
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
                className="inline-flex items-center gap-1.5 px-5 py-4 rounded-2xl font-bold text-sm text-slate-700 bg-white/85 hover:bg-white border border-cloud-200/90 shadow-xs active:scale-95 transition-all duration-200"
              >
                <Plus size={17} className="text-sky-600" />
                <span>Quick Add</span>
              </button>
            </div>

            {/* Quick Metrics Ticker */}
            <div className="pt-3 flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>MongoDB Atlas Cloud</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={15} className="text-amber-500 fill-amber-500" />
                <span>240 FPS Hardware Smooth</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Volume2 size={15} className="text-sky-500" />
                <span>Procedural Audio FX</span>
              </span>
            </div>
          </div>

          {/* Right Column: Holographic Airborne Tauros Floating Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md p-7 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white shadow-2xl hover:shadow-[0_20px_50px_rgba(56,189,248,0.25)] transition-all duration-500 group">
              
              {/* Floating Ambient Aura */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-sky-300/30 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-amber-300/25 blur-3xl pointer-events-none" />

              {/* Card Header Badge */}
              <div className="flex items-center justify-between mb-4 z-10 relative">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-sky-100 text-sky-700">
                    <Wind size={15} />
                  </span>
                  <span className="text-xs font-black tracking-wide text-slate-800 uppercase">
                    Airborne Mascot
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Pokédex #128
                </span>
              </div>

              {/* Tauros Animated Visual with Clouds */}
              <div className="relative my-4 flex items-center justify-center h-44 rounded-2xl bg-gradient-to-b from-sky-100/60 via-cloud-100/40 to-white/90 border border-sky-100 p-4 overflow-hidden">
                <img
                  src={taurosAnimated}
                  alt="Pokémon Tauros Galloping in the clouds"
                  className="w-28 h-28 object-contain drop-shadow-xl animate-cloud-bob relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
                {/* Floating Clouds Background Elements */}
                <div className="absolute top-3 left-4 text-sky-200/60 animate-drift-cloud-1 pointer-events-none">
                  <Cloud size={32} className="fill-current" />
                </div>
                <div className="absolute bottom-2 right-4 text-sky-200/50 animate-drift-cloud-3 pointer-events-none">
                  <Cloud size={24} className="fill-current" />
                </div>
              </div>

              {/* Interactive Mood Face Preview */}
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 z-10 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Interactive Mood Engine
                  </span>
                  <span className="text-xs font-black text-sky-600">
                    {interactiveMood}% Altitude
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <ChibiTaurosFace completionRate={interactiveMood} size="md" />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-xs font-black text-slate-800">
                      {interactiveMood === 100
                        ? 'Crown: Sky Legend 👑'
                        : interactiveMood >= 85
                        ? 'Hyped: Jetstream Rush 🔥'
                        : interactiveMood >= 50
                        ? 'Happy: Stratosphere 🌤️'
                        : interactiveMood >= 25
                        ? 'Focused: Headwind ⚡'
                        : 'Sleepy: Peaceful Meadow 💤'}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Tap a mood below to test procedural chimes:
                    </p>
                  </div>
                </div>

                {/* Mood Clicker Chips */}
                <div className="flex items-center justify-between gap-1 pt-1">
                  {[
                    { label: '0%', val: 0, emoji: '💤' },
                    { label: '25%', val: 25, emoji: '⚡' },
                    { label: '50%', val: 50, emoji: '🌤️' },
                    { label: '85%', val: 85, emoji: '🔥' },
                    { label: '100%', val: 100, emoji: '👑' },
                  ].map((m) => (
                    <button
                      key={m.val}
                      onClick={() => handleTestMood(m.val)}
                      className={`px-2 py-1 rounded-xl text-[10px] font-black transition-all active:scale-95 flex items-center gap-1 ${
                        interactiveMood === m.val
                          ? 'bg-sky-500 text-white shadow-xs scale-105'
                          : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                      }`}
                    >
                      <span>{m.emoji}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. "WHY TAUROS?" — The Story, Lore & Design Inspiration */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl text-left border border-sky-500/20">
          
          {/* Subtle Ambient Energy Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-black tracking-wide uppercase">
              <Flame size={14} className="fill-current text-amber-400" />
              <span>The Inspiration</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Why Was Pokémon Tauros Chosen As The Soul Of This App?
            </h2>

            {/* Philosophy Text */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              In classic Pokémon lore, <strong className="text-white font-bold">Tauros</strong> (the Wild Bull Pokémon) is celebrated for one iconic trait: <span className="text-amber-300 font-semibold">unyielding, unstoppable charging momentum</span>. Once a Tauros whips its three tails and locks onto a target, hesitation disappears and nothing can halt its charge.
            </p>

            {/* 3 Lore Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              
              {/* Pillar 1: The Wild Charge */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-black">
                  <Zap size={18} className="fill-current" />
                </div>
                <h3 className="text-base font-black text-white">1. Crushing Procrastination</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The hardest part of any task is starting. We translated Tauros's wild charge into the <strong>Stampede Pomodoro engine</strong>—giving you high-voltage 25-minute sprints to blast past intimidation.
                </p>
              </div>

              {/* Pillar 2: The Airborne Cloud Balance */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-sky-400/20 text-sky-300 flex items-center justify-center font-black">
                  <Cloud size={18} />
                </div>
                <h3 className="text-base font-black text-white">2. Balancing Force with Calm</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A charging bull across rocky ground burns out quickly. By taking Tauros <strong>into the clouds ("Airborne Productivity")</strong>, raw power is balanced with serene headspace and distraction-free clarity.
                </p>
              </div>

              {/* Pillar 3: The 3 Tails Metaphor */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-black">
                  <Compass size={18} />
                </div>
                <h3 className="text-base font-black text-white">3. The Three Tails Metaphor</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tauros’s three whipping tails represent the 3 core pillars of human productivity: <strong>Clear Objectives</strong>, <strong>Unbroken Focus</strong>, and <strong>Reliable Cloud Synchronization</strong>.
                </p>
              </div>

            </div>

            {/* Bottom Quote Banner */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-400 italic">
                "Productivity shouldn't feel like clerical chores. It should feel like a triumphant airborne charge."
              </p>

              <button
                onClick={onGoToTasks}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs text-slate-900 bg-amber-400 hover:bg-amber-300 transition-all active:scale-95"
              >
                <span>Experience The Flow</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </section>

        {/* 4. The 3 Technical Powerhouses */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          
          <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white hover:border-amber-300 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black mb-4">
              <Zap size={20} className="fill-current" />
            </div>
            <h3 className="text-base font-black text-slate-900">Stampede Focus Sprints</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">
              Target-linked Pomodoro deep-work timer with smooth SVG countdown rings and rewarding fanfare triggers upon conquering goals.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-black mb-4">
              <Cloud size={20} />
            </div>
            <h3 className="text-base font-black text-slate-900">Dynamic Mood Altitude</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">
              Chibi Tauros visually evolves from a sleepy meadow snooze into a triumphant crowned legend as you complete your tasks.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black mb-4">
              <Compass size={20} />
            </div>
            <h3 className="text-base font-black text-slate-900">MongoDB Atlas Cloud Engine</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">
              Full-stack MERN with Netlify serverless functions and MongoDB Atlas persistence. Real-time access across any browser.
            </p>
          </div>

        </section>

      </main>

      {/* 5. Minimalist Clean Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-4 text-xs text-slate-400 z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-cloud-200/60 mt-12">
        <p className="font-medium">
          TOUROS © {new Date().getFullYear()} • Airborne Cloud Productivity
        </p>
        <p className="text-[11px] text-slate-400">
          Powered by MongoDB Atlas, Express, React & Netlify Serverless Functions
        </p>
      </footer>

    </div>
  );
};

export default HomePage;
