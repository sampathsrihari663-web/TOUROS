import React from 'react';
import { 
  Zap, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  Flame, 
  Cloud, 
  Sparkles, 
  ShieldCheck, 
  Compass,
  Layers,
  Clock,
  TrendingUp,
  Wind
} from 'lucide-react';
import taurosOfficial from '../assets/tauros-official.png';
import taurosAnimated from '../assets/tauros-animated.gif';
import ChibiTaurosFace from './ChibiTaurosFace';
import soundService from '../services/soundService';

export const HomePage = ({
  stats,
  tasks,
  onGoToTasks,
  onOpenAddTask,
  onOpenStampede,
  onToggleTaskStatus
}) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const pendingTasks = tasks.filter(t => !t.completed).slice(0, 3);

  const handleTaskToggle = (taskId, currentCompleted) => {
    onToggleTaskStatus(taskId, !currentCompleted);
  };

  return (
    <div className="space-y-8 sm:space-y-10 animate-fade-in pb-12">
      
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-sky-50/70 to-cloud-150/80 backdrop-blur-2xl border border-white/80 p-6 sm:p-10 shadow-cloud-card transition-all duration-300">
        
        {/* Ambient Cloud Blobs */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-sky-300/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-cloud-400/20 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            {/* Live Cloud Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-800 text-xs font-bold tracking-tight">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span>TOUROS AIRBORNE PRODUCTIVITY</span>
              <span className="text-sky-400">•</span>
              <span className="text-sky-700 font-semibold">CLOUD MERN ENGINE</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Airborne Focus. <br />
              <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 bg-clip-text text-transparent">
                Wild Momentum.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl leading-relaxed">
              Glide through your goals with Pokémon Tauros-inspired stamina, real-time MongoDB Atlas cloud synchronization, dynamic chibi mood tracking, and deep-work Pomodoro sprints.
            </p>

            {/* Hero Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onGoToTasks}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-md hover:shadow-cloud-card-hover active:scale-[0.98] transition-all duration-200"
              >
                <Layers size={17} />
                <span>Enter Task Stream</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 duration-200" />
              </button>

              <button
                onClick={onOpenStampede}
                className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm text-slate-900 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 border border-amber-300/60 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200"
              >
                <Zap size={16} className="text-slate-950 fill-slate-950 transition-transform group-hover:scale-110" />
                <span>Launch Stampede Focus</span>
              </button>

              <button
                onClick={onOpenAddTask}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl font-bold text-sm text-slate-700 bg-white/80 hover:bg-white border border-cloud-200/90 shadow-xs hover:shadow-sm active:scale-[0.98] transition-all duration-200"
              >
                <Plus size={17} className="text-sky-600" />
                <span>Quick Add</span>
              </button>
            </div>
          </div>

          {/* Right Visual Column — Floating Animated Tauros & Live Cloud Meter */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-sm p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
              
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Wind size={14} className="text-sky-500" />
                  <span>Cloud Altitude</span>
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  {completionRate}% Soaring
                </span>
              </div>

              {/* Dynamic Chibi Tauros Mood Face */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-cloud-100/60 border border-sky-100 flex items-center gap-4 mb-4">
                <ChibiTaurosFace completionRate={completionRate} size="lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {completionRate === 100
                      ? 'Crown State: Sky Legend'
                      : completionRate >= 85
                      ? 'Hyped State: Supersonic Rush'
                      : completionRate >= 50
                      ? 'Happy State: Stratosphere Glide'
                      : completionRate >= 25
                      ? 'Focused State: Building Headwind'
                      : 'Sleepy State: Peaceful Meadow'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                    {completionRate === 100
                      ? 'All cloud objectives cleared! You rule the skies.'
                      : `${stats.pending} pending objectives remaining in flight.`}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/80 mb-4">
                <div 
                  className="bg-gradient-to-r from-sky-400 via-sky-500 to-amber-400 h-full rounded-full transition-all duration-700 ease-out shadow-xs"
                  style={{ width: `${completionRate}%` }}
                />
              </div>

              {/* Stats Ticker */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100">
                <div className="p-2 rounded-xl bg-slate-50">
                  <span className="block text-base font-black text-slate-800">{stats.total}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50">
                  <span className="block text-base font-black text-emerald-600">{stats.completed}</span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Cleared</span>
                </div>
                <div className="p-2 rounded-xl bg-amber-50">
                  <span className="block text-base font-black text-amber-600">{stats.pending}</span>
                  <span className="text-[10px] font-bold text-amber-500 uppercase">In Flight</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Feature Highlights (3 Sleek Cards) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Stampede Pomodoro */}
        <div 
          onClick={onOpenStampede}
          className="group p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white hover:border-amber-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md mb-4 group-hover:scale-105 transition-transform">
            <Zap size={22} className="fill-current" />
          </div>
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center justify-between">
            <span>Tauros Stampede Focus</span>
            <span className="text-xs text-amber-600 group-hover:translate-x-1 transition-transform">➔</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
            Gamified Pomodoro deep work sprints. Choose 25m, 15m, or 5m intervals with live target objective tracking and procedural audio fanfares.
          </p>
        </div>

        {/* Card 2: Chibi Mood Engine */}
        <div 
          onClick={onGoToTasks}
          className="group p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center font-black shadow-md mb-4 group-hover:scale-105 transition-transform">
            <Cloud size={22} className="fill-current" />
          </div>
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center justify-between">
            <span>Dynamic Mood Altitude</span>
            <span className="text-xs text-sky-600 group-hover:translate-x-1 transition-transform">➔</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
            Five interactive mood states dynamically morph based on your percentage of tasks conquered, providing satisfying visual reinforcement.
          </p>
        </div>

        {/* Card 3: Cloud Database */}
        <div 
          onClick={onGoToTasks}
          className="group p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-black shadow-md mb-4 group-hover:scale-105 transition-transform">
            <Compass size={22} />
          </div>
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center justify-between">
            <span>MongoDB Atlas Sync</span>
            <span className="text-xs text-emerald-600 group-hover:translate-x-1 transition-transform">➔</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
            Zero-latency cloud persistence with Netlify serverless functions. Inspect live task documents anytime in MongoDB Compass.
          </p>
        </div>
      </section>

      {/* 3. Pending Flight Stream Preview (Top Priority Objectives) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-2xl border border-white shadow-cloud-card text-left">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingUp size={18} className="text-sky-600" />
              <span>Current Airborne Objectives</span>
            </h2>
            <p className="text-xs text-slate-500">Quickly conquer your next priorities right from Home.</p>
          </div>

          <button
            onClick={onGoToTasks}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-3.5 py-2 rounded-2xl transition-colors"
          >
            <span>View All Stream</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {pendingTasks.length > 0 ? (
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div 
                key={task._id}
                className="flex items-center justify-between p-4 rounded-2xl bg-cloud-50/70 hover:bg-white border border-cloud-200/80 hover:border-sky-300 shadow-xs hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <button
                    onClick={() => handleTaskToggle(task._id, task.completed)}
                    className="w-5 h-5 rounded-lg border-2 border-slate-300 hover:border-sky-500 flex items-center justify-center transition-colors shrink-0"
                    title="Mark Completed"
                  >
                    {task.completed && <CheckCircle2 size={16} className="text-sky-500" />}
                  </button>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{task.title}</p>
                    {task.description && (
                      <p className="text-xs text-slate-500 truncate max-w-md">{task.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 ml-4">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    task.priority === 'High'
                      ? 'bg-rose-100 text-rose-700 border border-rose-200'
                      : task.priority === 'Medium'
                      ? 'bg-amber-100 text-amber-700 border border-amber-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm font-bold text-slate-700">✨ Clear Skies! No pending objectives.</p>
            <p className="text-xs text-slate-400 mt-1">Add a new task or take a well-deserved rest.</p>
            <button
              onClick={onOpenAddTask}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Plus size={14} />
              <span>Create an Objective</span>
            </button>
          </div>
        )}
      </section>

    </div>
  );
};

export default HomePage;
