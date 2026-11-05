import React from 'react';
import { 
  Check, 
  Calendar, 
  Edit3, 
  Trash2, 
  Flame, 
  AlertCircle, 
  Clock, 
  RotateCcw,
  Cloud,
  Tag
} from 'lucide-react';

export const TaskCard = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete
}) => {
  const { _id, title, description, priority, deadline, completed } = task;

  // Deadline formatting & Overdue calculation
  let deadlineInfo = null;
  let isOverdue = false;

  if (deadline) {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const isToday = deadlineDate.toDateString() === now.toDateString();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (!completed && diffTime < 0 && !isToday) {
      isOverdue = true;
      const overdueDays = Math.abs(diffDays);
      deadlineInfo = {
        label: overdueDays <= 1 ? 'Overdue by 1 day' : `Overdue by ${overdueDays} days`,
        style: 'bg-rose-50 text-rose-700 border-rose-200 font-bold',
        isAlert: true
      };
    } else if (isToday) {
      deadlineInfo = {
        label: 'Due Today',
        style: 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
        isAlert: false
      };
    } else if (diffDays === 1) {
      deadlineInfo = {
        label: 'Due Tomorrow',
        style: 'bg-sky-50 text-sky-800 border-sky-200 font-semibold',
        isAlert: false
      };
    } else {
      const formatted = deadlineDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: deadlineDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
      deadlineInfo = {
        label: `Due ${formatted}`,
        style: 'bg-cloud-100 text-slate-600 border-cloud-200',
        isAlert: false
      };
    }
  }

  // Priority Styles in Cloud Theme
  const priorityStyles = {
    High: {
      badge: 'bg-rose-50 text-rose-700 border-rose-200/90',
      icon: Flame,
      indicator: 'bg-rose-500'
    },
    Medium: {
      badge: 'bg-amber-50 text-amber-800 border-amber-200/90',
      icon: Clock,
      indicator: 'bg-amber-500'
    },
    Low: {
      badge: 'bg-sky-50 text-sky-700 border-sky-200/90',
      icon: Tag,
      indicator: 'bg-sky-400'
    }
  };

  const currentPriority = priorityStyles[priority] || priorityStyles.Medium;
  const PriorityIcon = currentPriority.icon;

  return (
    <div
      className={`group relative rounded-3xl bg-white/80 backdrop-blur-xl border transition-all duration-300 p-5 sm:p-6 shadow-cloud-card hover:shadow-cloud-card-hover hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
        completed
          ? 'border-emerald-200/70 bg-white/60 opacity-85'
          : isOverdue
          ? 'border-rose-300 bg-rose-50/20'
          : 'border-white hover:border-sky-300'
      }`}
    >
      {/* Cloud-like top accent glow */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 transition-colors duration-300 ${
          completed ? 'bg-emerald-400' : currentPriority.indicator
        }`}
      />

      {/* Card Header & Content */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          {/* Completion Checkbox Button with smooth cloud animation */}
          <button
            type="button"
            onClick={() => onToggleStatus(_id, !completed)}
            className={`mt-0.5 shrink-0 w-6 h-6 rounded-xl border flex items-center justify-center transition-all duration-200 ${
              completed
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 text-white shadow-sm scale-105'
                : 'border-cloud-300 hover:border-sky-500 bg-white hover:bg-sky-50 shadow-xs'
            }`}
            title={completed ? 'Mark as Pending' : 'Mark as Complete'}
          >
            {completed && <Check size={14} className="stroke-[3]" />}
          </button>

          {/* Title and Description */}
          <div className="flex-1 min-w-0">
            <h4
              className={`text-base font-bold text-slate-900 leading-snug tracking-tight break-words transition-all ${
                completed ? 'line-through text-slate-400 font-normal' : ''
              }`}
            >
              {title}
            </h4>

            {description && (
              <p
                className={`mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 break-words ${
                  completed ? 'text-slate-400' : ''
                }`}
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Badges: Priority, Deadline, Status */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {/* Priority Badge */}
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${currentPriority.badge}`}
          >
            <PriorityIcon size={12} />
            <span>{priority} Priority</span>
          </span>

          {/* Deadline Badge */}
          {deadlineInfo && (
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border shadow-xs ${deadlineInfo.style}`}
            >
              {deadlineInfo.isAlert ? (
                <AlertCircle size={12} className="text-rose-600 animate-pulse" />
              ) : (
                <Calendar size={12} className="text-sky-600" />
              )}
              <span>{deadlineInfo.label}</span>
            </span>
          )}

          {/* Status Badge */}
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
              completed
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-cloud-150 text-slate-600 border border-cloud-200'
            }`}
          >
            {completed ? 'Cleared ☁️' : 'In Flight'}
          </span>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="mt-5 pt-3.5 border-t border-cloud-100 flex items-center justify-between gap-2">
        {/* Toggle Status text button */}
        <button
          type="button"
          onClick={() => onToggleStatus(_id, !completed)}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors ${
            completed
              ? 'text-slate-600 hover:text-slate-900 hover:bg-cloud-100'
              : 'text-sky-600 hover:text-sky-800 hover:bg-sky-50'
          }`}
        >
          {completed ? (
            <>
              <RotateCcw size={13} />
              <span>Mark Pending</span>
            </>
          ) : (
            <>
              <Check size={13} className="stroke-[2.5]" />
              <span>Mark Done</span>
            </>
          )}
        </button>

        {/* Edit and Delete Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="p-2 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded-xl transition-colors"
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit3 size={15} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
