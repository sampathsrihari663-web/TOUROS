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

  // Circular progress calculation
  const totalSeconds = selectedDuration * 60;
  const progressPercent = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const strokeDashoffset = 283 - (283 * progressPercent) / 100;

  const currentTask = tasks.find(t => t._id === selectedTaskId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Sky Deep Work Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 border border-sky-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden z-10">
        
        {/* Animated Background Aura */}
        <div className={`absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
          isRunning ? 'bg-sky-500/30 animate-pulse' : 'bg-sky-600/15'
        }`} />
        <div className={`absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
          isRunning ? 'bg-amber-500/25 animate-pulse' : 'bg-sky-700/10'
        }`} />

        {/* Header Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl shadow-md text-slate-950 font-black">
              <Zap size={20} className="fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                Tauros Stampede Mode
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Focus Sprint
                </span>
              </h2>
              <p className="text-xs text-slate-400">Deep work sprint powered by bull momentum.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title={soundOn ? 'Mute Sound' : 'Unmute Sound'}
            >
              {soundOn ? <Volume2 size={18} className="text-sky-300" /> : <VolumeX size={18} className="text-slate-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="py-6 flex flex-col items-center relative z-10">
          
          {/* Target Objective Selector */}
          <div className="w-full mb-6">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Target size={13} className="text-sky-400" />
              <span>Target Objective</span>
            </label>
            {pendingTasks.length > 0 ? (
              <select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                className="w-full bg-slate-800/80 border border-sky-500/30 text-white rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-sky-400 cursor-pointer shadow-inner"
              >
                {pendingTasks.map((task) => (
                  <option key={task._id} value={task._id} className="bg-slate-900 text-white">
                    {task.priority === 'High' ? '🔥 ' : ''}{task.title}
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-3 bg-white/5 rounded-2xl text-center text-xs text-slate-400">
                All objectives completed! You can still run a free focus stampede.
              </div>
            )}
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 mb-6">
            {PRESETS.map((p) => (
              <button
                key={p.minutes}
                onClick={() => handleSelectPreset(p.minutes)}
                disabled={isRunning}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedDuration === p.minutes
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 scale-105'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 disabled:opacity-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Central Circular Progress Ring */}
          <div className="relative w-56 h-56 flex items-center justify-center my-2">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="6"
              />
              {/* Progress Stroke */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="url(#stampedeGradient)"
                strokeWidth="6"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="stampedeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content: Tauros Sprite & Live Clock */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="relative">
                <img
                  src={taurosAnimated}
                  alt="Tauros Charging"
                  className={`w-16 h-16 object-contain transition-transform duration-500 ${
                    isRunning ? 'scale-110 animate-bounce' : 'opacity-90'
                  }`}
                />
                {isRunning && (
                  <span className="absolute -bottom-1 -right-1 text-xs animate-ping">⚡</span>
                )}
              </div>

              <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono mt-1 drop-shadow-md">
                {formattedTime}
              </span>

              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-0.5">
                {isCompleted ? 'VICTORY!' : isRunning ? 'CHARGING...' : 'READY'}
              </span>
            </div>
          </div>

          {/* Celebration Banner when completed */}
          {isCompleted && (
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border border-emerald-400/40 text-center animate-in zoom-in duration-300 w-full">
              <div className="flex items-center justify-center gap-2 text-emerald-300 font-black text-sm mb-1">
                <Trophy size={18} className="text-amber-400 fill-amber-400" />
                <span>STAMPEDE CONQUERED!</span>
              </div>
              <p className="text-xs text-slate-300">
                You charged through your focus block with wild airborne stamina!
              </p>
            </div>
          )}

          {/* Controls Bar */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={toggleStart}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-lg transition-all active:scale-95 ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                  : 'bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white shadow-sky-500/30'
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
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title="Reset Timer"
            >
              <RotateCcw size={18} />
            </button>

            {/* Quick Complete Task Button */}
            {currentTask && !currentTask.completed && (
              <button
                onClick={handleCompleteActiveTask}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-xs font-bold transition-all active:scale-95"
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
