import React from 'react';
import { 
  Menu, 
  Plus, 
  Calendar, 
  Cloud, 
  Zap, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { TaurosChibiIcon } from './Logo';

export const Header = ({ 
  onOpenSidebar, 
  onOpenAddTaskModal, 
  onOpenStampedeModal,
  isSoundMuted,
  onToggleSound
}) => {
  // Format current date nicely
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 bg-white/75 backdrop-blur-xl border-b border-cloud-200/80 py-3.5 px-4 sm:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Welcome */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 text-slate-700 hover:text-sky-900 hover:bg-cloud-100 rounded-2xl transition-colors"
            aria-label="Open Navigation"
          >
            <Menu size={22} />
          </button>

          <div className="lg:hidden">
            <TaurosChibiIcon size={38} />
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Touros
                <Cloud size={20} className="text-sky-400 fill-sky-200 animate-cloud-pulse" />
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Gliding through your goals with airy clarity and wild power.
            </p>
          </div>
        </div>

        {/* Right: Sound Toggle, Stampede Mode, Date & Add Task CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Audio FX Toggle Button */}
          <button
            onClick={onToggleSound}
            className={`p-2.5 rounded-2xl border transition-all active:scale-95 ${
              isSoundMuted
                ? 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600'
                : 'bg-white/90 border-sky-200/90 text-sky-600 hover:bg-sky-50 shadow-xs'
            }`}
            title={isSoundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            aria-label="Toggle Sound"
          >
            {isSoundMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>

          {/* Stampede Mode Trigger Button */}
          <button
            onClick={onOpenStampedeModal}
            className="group relative inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-slate-900 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 border border-amber-300/60 shadow-sm hover:shadow-md active:scale-95 transition-all"
            title="Open Focus Sprint / Pomodoro Mode"
          >
            <Zap size={15} className="text-slate-950 fill-slate-950 transition-transform group-hover:scale-110" />
            <span className="font-extrabold tracking-tight">Stampede</span>
            <span className="hidden md:inline-block text-[10px] font-black uppercase tracking-wider bg-slate-950/15 px-1.5 py-0.5 rounded-md">
              Focus
            </span>
          </button>

          {/* Current Date Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-white/85 border border-cloud-200/90 rounded-2xl text-xs font-semibold text-slate-700 shadow-xs">
            <Calendar size={13} className="text-sky-600" />
            <span>{formattedDate}</span>
          </div>

          {/* Add Task Primary Button */}
          <button
            onClick={onOpenAddTaskModal}
            className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-md hover:shadow-cloud-card-hover active:scale-[0.98] transition-all duration-200"
          >
            <Plus size={18} className="text-white stroke-[2.5] transition-transform group-hover:rotate-90 duration-200" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
