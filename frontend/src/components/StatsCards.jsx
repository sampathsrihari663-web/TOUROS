import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Layers, 
  TrendingUp,
  Cloud,
  Sun,
  Wind,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import ChibiTaurosFace, { getTaurosMood } from './ChibiTaurosFace';
import taurosOfficial from '../assets/tauros-official.png';

export const StatsCards = ({ stats, onSelectFilter }) => {
  const { total, completed, pending, overdue } = stats;

  const actualPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Optional manual preview state for user testing/fun
  const [previewMood, setPreviewMood] = useState(null);

  const activePercentage = previewMood !== null ? previewMood.pct : actualPercentage;
  const currentMood = previewMood ? previewMood.moodObj : getTaurosMood(actualPercentage, total);

  const cards = [
    {
      id: 'all',
      title: 'Total Tasks',
      value: total,
      description: 'Active tasks in your stream',
      icon: Layers,
      colorScheme: {
        bg: 'from-sky-700 via-sky-800 to-slate-900',
        text: 'text-white',
        subtext: 'text-sky-200',
        badge: 'bg-white/20 text-white border-white/30 backdrop-blur-xs',
        iconBg: 'bg-white/15 text-white',
        borderColor: 'border-sky-600/50'
      }
    },
    {
      id: 'completed',
      title: 'Completed',
      value: completed,
      description: `${actualPercentage}% cleared and archived`,
      icon: CheckCircle2,
      colorScheme: {
        bg: 'from-emerald-600 via-teal-700 to-emerald-800',
        text: 'text-white',
        subtext: 'text-emerald-100',
        badge: 'bg-white/20 text-white border-white/30 backdrop-blur-xs',
        iconBg: 'bg-white/15 text-white',
        borderColor: 'border-emerald-600/50'
      }
    },
    {
      id: 'pending',
      title: 'Pending',
      value: pending,
      description: 'Tasks in flight',
      icon: Clock,
      colorScheme: {
        bg: 'from-white/90 via-sky-50/70 to-white',
        text: 'text-slate-900',
        subtext: 'text-slate-500',
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        iconBg: 'bg-amber-500/10 text-amber-600',
        borderColor: 'border-cloud-200/90'
      }
    },
    {
      id: 'overdue',
      title: 'Overdue',
      value: overdue,
      description: overdue > 0 ? 'Urgent attention required' : 'Clear skies, zero delays',
      icon: AlertTriangle,
      colorScheme: overdue > 0
        ? {
            bg: 'from-rose-500/15 via-white to-rose-50/50',
            text: 'text-rose-950',
            subtext: 'text-rose-600',
            badge: 'bg-rose-500 text-white border-rose-600 animate-pulse',
            iconBg: 'bg-rose-500/15 text-rose-600',
            borderColor: 'border-rose-300'
          }
        : {
            bg: 'from-white/90 via-cloud-50/80 to-white',
            text: 'text-slate-900',
            subtext: 'text-slate-500',
            badge: 'bg-cloud-150 text-slate-600 border-cloud-200',
            iconBg: 'bg-cloud-150 text-slate-600',
            borderColor: 'border-cloud-200/90'
          }
    }
  ];

  // Quick Mood Presets for live testing
  const moodPresets = [
    { label: '0% Sleepy', emoji: '💤', pct: 0 },
    { label: '25% Focused', emoji: '⚡', pct: 25 },
    { label: '50% Happy', emoji: '🌤️', pct: 50 },
    { label: '85% Hyped', emoji: '🔥', pct: 85 },
    { label: '100% Crown', emoji: '👑', pct: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => onSelectFilter && onSelectFilter(card.id)}
              className={`group text-left p-5 rounded-3xl bg-gradient-to-br ${card.colorScheme.bg} border ${card.colorScheme.borderColor} shadow-cloud-card hover:shadow-cloud-card-hover transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden backdrop-blur-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${card.colorScheme.subtext}`}>
                  {card.title}
                </span>
                <div className={`p-2 rounded-2xl ${card.colorScheme.iconBg} transition-transform group-hover:scale-110 duration-300`}>
                  <Icon size={18} />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className={`text-3xl sm:text-4xl font-black tracking-tight ${card.colorScheme.text}`}>
                  {card.value}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${card.colorScheme.badge}`}>
                  View &rarr;
                </span>
              </div>

              <p className={`mt-2 text-xs font-medium ${card.colorScheme.subtext} truncate`}>
                {card.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Overall Task Completion Progress Bar Card with Expressive Chibi Tauros Mood Face */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-cloud-card relative overflow-hidden">
        {/* Soft floating cloud puffs behind */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-sky-200/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-10 w-48 h-48 bg-cloud-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar with Mood Presets Quick Selector */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-cloud-100 relative z-10 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
            <Sparkles size={14} className="text-amber-500" />
            <span>Chibi Tauros Mood Stream:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {moodPresets.map((preset) => {
              const isSelected = previewMood && previewMood.pct === preset.pct;
              return (
                <button
                  key={preset.pct}
                  onClick={() =>
                    setPreviewMood({
                      pct: preset.pct,
                      moodObj: getTaurosMood(preset.pct, 1),
                    })
                  }
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs scale-105'
                      : 'bg-cloud-100 hover:bg-cloud-200 text-slate-600'
                  }`}
                  title={`Preview mood at ${preset.pct}% progress`}
                >
                  <span>{preset.emoji}</span>
                  <span className="hidden sm:inline">{preset.label}</span>
                </button>
              );
            })}

            {previewMood !== null && (
              <button
                onClick={() => setPreviewMood(null)}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors flex items-center gap-1"
                title="Reset to real task progress"
              >
                <RotateCcw size={11} />
                <span>Sync Real ({actualPercentage}%)</span>
              </button>
            )}
          </div>
        </div>

        {/* Chibi Avatar + Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Chibi Tauros Mood Face Avatar with floating cloud cushion */}
            <div
              className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${currentMood.bgGradient} border border-white shadow-cloud-card flex items-center justify-center p-1 transition-all duration-300 animate-cloud-float-subtle`}
            >
              <ChibiTaurosFace mood={currentMood.mood} size={64} />

              {/* Little mood indicator badge */}
              <div
                className="absolute -bottom-1 -right-1 bg-white border border-cloud-200 rounded-full w-6 h-6 flex items-center justify-center shadow-xs"
                title={`Mood: ${currentMood.label}`}
              >
                <span className="text-xs leading-none">{currentMood.emoji}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Cloud Altitude & Momentum
                </h3>

                {/* Dynamic Mood Badge */}
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs flex items-center gap-1 transition-colors ${currentMood.badgeClass}`}
                >
                  <span>{currentMood.emoji}</span>
                  <span>{currentMood.label}</span>
                </span>
              </div>

              {/* Dynamic Mood Description */}
              <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                {currentMood.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
                {activePercentage}%
              </span>
              <span className="text-[11px] font-semibold text-slate-400 block -mt-1">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Cloud Flow Progress Track */}
        <div className="w-full bg-cloud-100 rounded-full h-3.5 p-0.5 overflow-hidden border border-cloud-200/60 mt-4 relative z-10">
          <div
            className="bg-gradient-to-r from-sky-400 via-sky-500 to-teal-400 h-full rounded-full transition-all duration-700 ease-out shadow-xs"
            style={{ width: `${activePercentage}%` }}
          />
        </div>

        {/* Micro breakdown tags */}
        <div className="mt-3 pt-3 border-t border-cloud-100/90 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 relative z-10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Completed: <strong className="text-slate-900">{completed}</strong>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              Pending: <strong className="text-slate-900">{pending}</strong>
            </span>
            {overdue > 0 && (
              <span className="flex items-center gap-1.5 font-medium text-rose-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-pulse" />
                Overdue: <strong>{overdue}</strong>
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <span>Powered by official Tauros cloud engine</span>
            <Wind size={12} className="text-sky-400" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
