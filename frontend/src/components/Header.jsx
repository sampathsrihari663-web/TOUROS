import React from 'react';
import { Menu, Plus, Calendar, Cloud } from 'lucide-react';
import { Logo, TaurosChibiIcon } from './Logo';

export const Header = ({ onOpenSidebar, onOpenAddTaskModal }) => {
  // Format current date nicely
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-cloud-200/80 py-4 px-4 sm:px-8 shadow-xs">
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
            <TaurosChibiIcon size={40} />
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

        {/* Right: Date & Add Task CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Current Date Badge */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-white/85 border border-cloud-200/90 rounded-2xl text-xs font-semibold text-slate-700 shadow-xs">
            <Calendar size={14} className="text-sky-600" />
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
