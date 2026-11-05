import React from 'react';
import { 
  Home,
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Flame, 
  Layers, 
  Database,
  X,
  Zap, 
  Cloud, 
  SlidersHorizontal,
  Wind
} from 'lucide-react';
import Logo from './Logo';
import taurosAnimated from '../assets/tauros-animated.gif';
import taurosOfficial from '../assets/tauros-official.png';

export const Sidebar = ({
  activeFilter,
  setActiveFilter,
  stats,
  isOpen,
  onClose,
  onOpenStampede,
  dbStatus = 'connected'
}) => {
  const navItems = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: Layers,
      count: stats.total,
      color: 'text-sky-600'
    },
    {
      id: 'pending',
      label: 'Pending Tasks',
      icon: Clock,
      count: stats.pending,
      color: 'text-amber-500'
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: CheckCircle2,
      count: stats.completed,
      color: 'text-emerald-500'
    },
    {
      id: 'overdue',
      label: 'Overdue',
      icon: AlertTriangle,
      count: stats.overdue,
      badgeColor: stats.overdue > 0 ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600',
      color: 'text-rose-500'
    },
    {
      id: 'high',
      label: 'High Priority',
      icon: Flame,
      count: stats.highPriority,
      color: 'text-rose-500'
    }
  ];

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white/85 backdrop-blur-2xl border-r border-cloud-200/90 z-50 flex flex-col justify-between p-6 transition-all duration-300 ease-out shadow-lg lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header & Logo */}
          <div className="flex items-center justify-between pb-5 border-b border-cloud-200/60">
            <Logo />
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-cloud-100 rounded-xl transition-colors"
              aria-label="Close Sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Navigation */}
          <div className="mt-5 space-y-4">
            
            {/* 1. Primary Hub Links */}
            <div className="space-y-1.5">
              {/* Home Link */}
              <button
                onClick={() => {
                  setActiveFilter('home');
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95 ${
                  activeFilter === 'home'
                    ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md font-semibold translate-x-1'
                    : 'text-slate-700 hover:bg-cloud-100/90 hover:text-sky-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-xl transition-colors ${
                    activeFilter === 'home' ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-700'
                  }`}>
                    <Home size={16} />
                  </div>
                  <span>Home Overview</span>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  activeFilter === 'home' ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-800'
                }`}>
                  HQ
                </span>
              </button>

              {/* Stampede Focus Shortcut */}
              <button
                onClick={() => {
                  if (onOpenStampede) onOpenStampede();
                  if (window.innerWidth < 1024) onClose();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-xs bg-amber-400/15 hover:bg-amber-400/25 text-amber-900 border border-amber-300/60 shadow-xs transition-all duration-200 active:scale-95"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-xl bg-amber-400 text-slate-950 font-black">
                    <Zap size={13} className="fill-current" />
                  </div>
                  <span className="font-extrabold">Stampede Sprint</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                  Focus
                </span>
              </button>
            </div>

            {/* 2. Task Stream Header & Filters */}
            <div>
              <div className="px-3 mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Cloud size={13} className="text-sky-400" />
                  <span>Task Stream</span>
                </span>
                <SlidersHorizontal size={13} className="text-slate-400" />
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeFilter === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveFilter(item.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-medium text-sm transition-all duration-200 active:scale-95 ${
                        isActive
                          ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md font-semibold translate-x-1'
                          : 'text-slate-600 hover:bg-cloud-100/80 hover:text-sky-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-xl transition-colors ${
                          isActive ? 'bg-white/20 text-white' : 'bg-cloud-100 text-slate-600'
                        }`}>
                          <Icon size={16} className={isActive ? 'text-white' : item.color} />
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold transition-colors ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : item.badgeColor || 'bg-cloud-150 text-slate-600'
                        }`}
                      >
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Actual Animated Tauros Sky Momentum Card */}
          <div className="mt-5 p-4 rounded-3xl bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 text-white relative overflow-hidden shadow-cloud-card border border-white/40">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-4 -top-4 w-20 h-20 bg-cloud-300/30 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between mb-2 z-10 relative">
              <div className="flex items-center gap-1.5 text-cloud-100 text-xs font-bold uppercase tracking-wider">
                <Wind size={14} className="text-cloud-200 animate-pulse" />
                <span>Cloud Altitude</span>
              </div>
              <span className="text-xs font-black bg-white/20 px-2 py-0.5 rounded-full text-white backdrop-blur-xs">
                {completionRate}%
              </span>
            </div>

            <div className="flex items-center gap-3 my-2 z-10 relative">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/20 backdrop-blur-md p-1 border border-white/30 flex items-center justify-center shadow-xs">
                <img
                  src={taurosAnimated}
                  alt="Actual Tauros battle animation"
                  className="w-12 h-12 object-contain animate-cloud-bob drop-shadow-md"
                />
              </div>
              <p className="text-xs text-white/95 font-medium leading-relaxed">
                {completionRate === 100
                  ? '☁️ Sky Conqueror! All tasks soared above the clouds!'
                  : completionRate >= 60
                  ? '⚡ Gliding smoothly through the stratosphere!'
                  : stats.total === 0
                  ? '🌱 Clear skies ahead. Add your first task!'
                  : '🌪️ Build tail wind! Tackle high priorities.'}
              </p>
            </div>

            <div className="w-full bg-black/20 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/30 z-10 relative mt-3">
              <div
                className="bg-gradient-to-r from-cloud-200 to-white h-full rounded-full transition-all duration-700 ease-out shadow-xs"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer / Database Status */}
        <div className="pt-4 border-t border-cloud-200/60">
          <div className="p-3 bg-white/70 backdrop-blur-md rounded-2xl border border-cloud-200/80 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Database size={11} className="text-emerald-600" />
                  MongoDB Atlas
                </span>
                <span className="text-[10px] text-slate-500">
                  cloud: <strong className="text-emerald-700 font-semibold">touros</strong> / tasks
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg border border-emerald-200">
              Live
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
