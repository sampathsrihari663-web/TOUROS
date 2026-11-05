import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Flame, 
  CheckCircle2, 
  Trophy, 
  Volume2, 
  VolumeX,
  Target,
  Sparkles
} from 'lucide-react';
import taurosAnimated from '../assets/tauros-animated.gif';
import soundService from '../services/soundService';

export const StampedeModal = ({ 
  isOpen, 
  onClose, 
  tasks = [], 
  onCompleteTask 
}) => {
  // Timer Presets in minutes
  const PRESETS = [
    { label: '25m Stampede', minutes: 25 },
    { label: '15m Charge', minutes: 15 },
    { label: '5m Sprint', minutes: 5 }
  ];

  const [selectedDuration, setSelectedDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [soundOn, setSoundOn] = useState(!soundService.isMuted());

  const timerRef = useRef(null);

  // Available pending tasks to pick as target
  const pendingTasks = tasks.filter(t => !t.completed);

  // Auto-select first pending task on open if none selected
  useEffect(() => {
    if (isOpen && pendingTasks.length > 0 && !selectedTaskId) {
      setSelectedTaskId(pendingTasks[0]._id);
    }
  }, [isOpen, pendingTasks, selectedTaskId]);

  // Reset timer whenever duration changes
  const handleSelectPreset = (minutes) => {
    setSelectedDuration(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
    setIsCompleted(false);
  };

  // Timer Tick Engine
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setIsCompleted(true);
            soundService.playVictoryFanfare();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Start / Pause toggle
  const toggleStart = () => {
    if (!isRunning) {
      soundService.playStampedeStart();
    }
    setIsRunning(!isRunning);
  };

  // Reset
  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft(selectedDuration * 60);
  };

  // Mark selected task complete directly from modal
  const handleCompleteActiveTask = () => {
    if (selectedTaskId && onCompleteTask) {
      onCompleteTask(selectedTaskId, true);
      soundService.playVictoryFanfare();
      setIsCompleted(true);
      setIsRunning(false);
    }
  };

  // Toggle Sound in modal
  const handleToggleSound = () => {
    const newState = soundService.toggleSound();
    setSoundOn(newState);
  };

  if (!isOpen) return null;

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Circular progress calculation with smooth SVG geometry
  const totalSeconds = selectedDuration * 60;
  const progressFraction = (totalSeconds - timeLeft) / totalSeconds;
  const radius = 54;
  const circumference = 2 * Math.PI * radius; // ~339.29
  const strokeDashoffset = circumference - (circumference * progressFraction);

  const currentTask = tasks.find(t => t._id === selectedTaskId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 240fps Smooth Backdrop with Deep Aurora */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-2xl transition-opacity duration-300 ease-out animate-in fade-in"
        onClick={onClose}
      />

      {/* Futuristic Glassmorphic Stampede Arena Card */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900/95 via-sky-950/90 to-slate-950/95 border border-sky-400/30 rounded-3xl p-6 sm:p-8 text-white shadow-[0_0_50px_-10px_rgba(14,165,233,0.3)] overflow-hidden z-10 transition-all duration-300 transform-gpu">
        
        {/* Animated Radial Energy Glows */}
        <div className={`absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl transition-all duration-1000 pointer-events-none ${
          isRunning ? 'bg-sky-400/30 scale-125' : 'bg-sky-500/15'
        }`} />
        <div className={`absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl transition-all duration-1000 pointer-events-none ${
          isRunning ? 'bg-amber-400/25 scale-125' : 'bg-amber-600/10'
        }`} />

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-2xl shadow-lg shadow-amber-500/20 text-slate-950 font-black">
              <Zap size={20} className="fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                Tauros Stampede
                <span className="text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  Sprint
                </span>
              </h2>
              <p className="text-xs text-slate-400">Deep focus sprint with Pokémon momentum.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all active:scale-95"
              title={soundOn ? 'Mute Sound' : 'Unmute Sound'}
            >
              {soundOn ? <Volume2 size={17} className="text-sky-300" /> : <VolumeX size={17} className="text-slate-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-all active:scale-95"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="py-5 flex flex-col items-center relative z-10">
          
          {/* Target Objective Selector */}
          <div className="w-full mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Target size={13} className="text-sky-400" />
                <span>Target Objective</span>
              </label>
              {currentTask && (
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  currentTask.priority === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-slate-700 text-slate-300'
                }`}>
                  {currentTask.priority}
                </span>
              )}
            </div>

            {pendingTasks.length > 0 ? (
              <select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                className="w-full bg-slate-800/90 border border-sky-500/30 hover:border-sky-400 text-white rounded-2xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400/40 cursor-pointer shadow-inner transition-colors"
              >
                {pendingTasks.map((task) => (
                  <option key={task._id} value={task._id} className="bg-slate-900 text-white">
                    {task.priority === 'High' ? '🔥 ' : '• '}{task.title}
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-center text-xs text-slate-400">
                All cloud tasks cleared! Running a free focus sprint.
              </div>
            )}
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 mb-4">
            {PRESETS.map((p) => (
              <button
                key={p.minutes}
                onClick={() => handleSelectPreset(p.minutes)}
                disabled={isRunning}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all duration-200 active:scale-95 ${
                  selectedDuration === p.minutes
                    ? 'bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 shadow-lg shadow-sky-400/25 scale-105'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 disabled:opacity-40'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Ultra-Smooth Circular Progress Ring */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2 select-none">
            
            {/* SVG Track with Glowing Gradient Stroke */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 130 130">
              <defs>
                <linearGradient id="stampedeNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="60%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Track Circle */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="7"
              />

              {/* Glowing Outer Shadow Track when running */}
              {isRunning && (
                <circle
                  cx="65"
                  cy="65"
                  r={radius}
                  fill="none"
                  stroke="url(#stampedeNeon)"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  filter="url(#neonGlow)"
                  opacity="0.6"
                />
              )}

              {/* Main Progress Stroke with Smooth Easing */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                fill="none"
                stroke="url(#stampedeNeon)"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </svg>

            {/* Center Content: Animated Tauros Sprite & Glow Countdown */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              
              {/* Galloping Tauros Sprite with Aura */}
              <div className="relative mb-1">
                <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 ${
                  isRunning ? 'bg-amber-400/40 scale-150' : 'bg-transparent'
                }`} />
                <img
                  src={taurosAnimated}
                  alt="Tauros Galloping"
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-contain relative z-10 transition-transform duration-300 ${
                    isRunning ? 'scale-110 drop-shadow-[0_10px_20px_rgba(245,158,11,0.5)] animate-bounce' : 'opacity-90'
                  }`}
                />
              </div>

              {/* Digital Countdown Timer */}
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]">
                {formattedTime}
              </span>

              {/* Status Badge */}
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-widest uppercase text-sky-300 mt-1">
                {isCompleted ? (
                  <span className="text-emerald-400">✨ VICTORY CONQUERED</span>
                ) : isRunning ? (
                  <>
                    <span className="animate-ping text-amber-400">⚡</span>
                    <span className="text-amber-300">CHARGING FORWARD</span>
                  </>
                ) : (
                  'READY TO CHARGE'
                )}
              </span>
            </div>
          </div>

          {/* Celebration Victory Banner */}
          {isCompleted && (
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-emerald-500/20 border border-emerald-400/40 text-center animate-in zoom-in duration-300 w-full">
              <div className="flex items-center justify-center gap-2 text-emerald-300 font-black text-sm mb-1">
                <Trophy size={18} className="text-amber-400 fill-amber-400" />
                <span>STAMPEDE OBJECTIVE CRUSHED!</span>
              </div>
              <p className="text-xs text-slate-300">
                You maintained unbroken momentum through your deep work block!
              </p>
            </div>
          )}

          {/* Controls Bar */}
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={toggleStart}
              className={`flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-black text-sm shadow-xl transition-all duration-200 active:scale-95 ${
                isRunning
                  ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-amber-400/30'
                  : 'bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:from-sky-300 hover:to-sky-500 text-white shadow-sky-500/40'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause size={18} className="fill-current" />
                  <span>Pause Charge</span>
                </>
              ) : (
                <>
                  <Play size={18} className="fill-current" />
                  <span>Start Stampede</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all active:scale-95 border border-white/10"
              title="Reset Timer"
            >
              <RotateCcw size={18} />
            </button>

            {/* Quick Complete Task Button */}
            {currentTask && !currentTask.completed && (
              <button
                onClick={handleCompleteActiveTask}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500/25 hover:bg-emerald-500/35 text-emerald-300 border border-emerald-400/50 text-xs font-black transition-all active:scale-95 shadow-md shadow-emerald-500/20"
                title="Mark this target task as completed"
              >
                <CheckCircle2 size={16} />
                <span>Mark Conquered</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampedeModal;
