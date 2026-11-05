import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  CheckCircle2, 
  Trophy, 
  Volume2, 
  VolumeX,
  Target
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

  // Pristine SVG Geometry (Radius 50 -> Circumference ~314.16)
  const totalSeconds = selectedDuration * 60;
  const progressFraction = (totalSeconds - timeLeft) / totalSeconds;
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // 314.159
  const strokeDashoffset = circumference - (circumference * progressFraction);

  const currentTask = tasks.find(t => t._id === selectedTaskId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Clean Dark Backdrop with Smooth Fade */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Solid Dark Glassmorphic Card (Zero Safari Clipping Artifacts) */}
      <div className="relative w-full max-w-md bg-[#0D1829] border border-sky-500/30 rounded-3xl p-6 sm:p-7 text-white shadow-2xl z-10 transition-all duration-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl shadow-md text-slate-950 font-black">
              <Zap size={18} className="fill-current" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-white flex items-center gap-2">
                Tauros Stampede
                <span className="text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  Sprint
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">Deep focus sprint with Pokémon momentum.</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all active:scale-95"
              title={soundOn ? 'Mute Sound' : 'Unmute Sound'}
            >
              {soundOn ? <Volume2 size={16} className="text-sky-300" /> : <VolumeX size={16} className="text-slate-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-all active:scale-95"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="pt-4 pb-2 flex flex-col items-center">
          
          {/* Target Objective Selector */}
          <div className="w-full mb-4 text-left">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Target size={12} className="text-sky-400" />
                <span>Target Objective</span>
              </label>
              {currentTask && (
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  currentTask.priority === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-700 text-slate-300'
                }`}>
                  {currentTask.priority}
                </span>
              )}
            </div>

            {pendingTasks.length > 0 ? (
              <select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                className="w-full bg-[#132238] border border-sky-500/30 hover:border-sky-400 text-white rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-sky-400 cursor-pointer transition-colors"
              >
                {pendingTasks.map((task) => (
                  <option key={task._id} value={task._id} className="bg-slate-900 text-white">
                    {task.priority === 'High' ? '🔥 ' : '• '}{task.title}
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-center text-xs text-slate-400">
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                  selectedDuration === p.minutes
                    ? 'bg-sky-500 text-slate-950 font-black shadow-md shadow-sky-500/30'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 disabled:opacity-40'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Clean, Perfect Circular Progress Timer (Zero Glitch / Zero Clipping) */}
          <div className="relative w-56 h-56 flex items-center justify-center my-1 select-none">
            
            {/* Native SVG Stroke Geometry without heavy filters */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="stampedeCleanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>

              {/* Background Track Circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="6"
              />

              {/* Smooth Animated Progress Stroke */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="url(#stampedeCleanGradient)"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>

            {/* Inner Content: Tauros & Numbers */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              
              {/* Tauros Sprite */}
              <img
                src={taurosAnimated}
                alt="Tauros"
                className={`w-16 h-16 object-contain transition-transform duration-300 ${
                  isRunning ? 'scale-105' : 'opacity-90'
                }`}
              />

              {/* Countdown Digits */}
              <span className="text-4xl font-black text-white font-mono tracking-tight mt-0.5">
                {formattedTime}
              </span>

              {/* Status Tag */}
              <span className="text-[10px] font-black tracking-widest uppercase text-sky-300 mt-0.5">
                {isCompleted ? 'CONQUERED!' : isRunning ? '⚡ CHARGING' : 'READY'}
              </span>
            </div>
          </div>

          {/* Victory Banner */}
          {isCompleted && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-center w-full">
              <div className="flex items-center justify-center gap-1.5 text-emerald-300 font-black text-xs">
                <Trophy size={15} className="text-amber-400 fill-amber-400" />
                <span>OBJECTIVE CONQUERED!</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 mt-5">
            <button
              onClick={toggleStart}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs shadow-lg transition-all active:scale-95 ${
                isRunning
                  ? 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                  : 'bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-slate-950'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause size={16} className="fill-current" />
                  <span>Pause Charge</span>
                </>
              ) : (
                <>
                  <Play size={16} className="fill-current" />
                  <span>Start Stampede</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all active:scale-95"
              title="Reset Timer"
            >
              <RotateCcw size={16} />
            </button>

            {/* Quick Complete Task Button */}
            {currentTask && !currentTask.completed && (
              <button
                onClick={handleCompleteActiveTask}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-xs font-bold transition-all active:scale-95"
                title="Mark this target task as completed"
              >
                <CheckCircle2 size={15} />
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
