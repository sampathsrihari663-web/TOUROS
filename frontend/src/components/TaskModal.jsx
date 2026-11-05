import React, { useState, useEffect } from 'react';
import { 
  X, 
  Flame, 
  Clock, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  Cloud
} from 'lucide-react';
import taurosShuffle from '../assets/chibi/tauros-shuffle-uicon.png';

export const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting = false
}) => {
  const isEditing = Boolean(initialData && initialData._id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPriority(initialData.priority || 'Medium');
      if (initialData.deadline) {
        const d = new Date(initialData.deadline);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        setDeadline(`${yyyy}-${mm}-${dd}`);
      } else {
        setDeadline('');
      }
      setCompleted(Boolean(initialData.completed));
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDeadline('');
      setCompleted(false);
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Task title is required';
    } else if (title.trim().length > 150) {
      errs.title = 'Title must be under 150 characters';
    }
    if (description.length > 1000) {
      errs.description = 'Description must be under 1000 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      priority,
      deadline: deadline ? new Date(deadline).toISOString() : null,
      completed
    };

    onSubmit(payload);
  };

  // Quick deadline helpers
  const setQuickDeadline = (daysFromNow) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setDeadline(`${yyyy}-${mm}-${dd}`);
  };

  const priorityOptions = [
    { value: 'Low', label: 'Low', desc: 'Breeze pace', icon: Tag, color: 'text-sky-600', activeBg: 'bg-sky-50 border-sky-400 text-sky-950 ring-2 ring-sky-300/30' },
    { value: 'Medium', label: 'Medium', desc: 'Steady wind', icon: Clock, color: 'text-amber-500', activeBg: 'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-300/30' },
    { value: 'High', label: 'High', desc: 'Storm surge', icon: Flame, color: 'text-rose-600', activeBg: 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-300/30' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-cloud-100 via-white to-sky-50 border-b border-cloud-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white shadow-cloud-card border border-white p-1 flex items-center justify-center shrink-0">
              <img
                src={taurosShuffle}
                alt="Official Chibi Tauros"
                className="w-full h-full object-contain drop-shadow-xs"
              />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>{isEditing ? 'Edit Objective' : 'New Cloud Objective'}</span>
                <Cloud size={16} className="text-sky-400" />
              </h3>
              <p className="text-xs text-slate-500">
                {isEditing ? 'Update task details and flight schedule' : 'Dispatch a new task to your cloud stream'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-cloud-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Task Title <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {title.length}/150
              </span>
            </div>
            <input
              type="text"
              placeholder="e.g. Master horn combos or calibrate aerial sensors"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: null });
              }}
              className={`w-full px-4 py-2.5 rounded-2xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                errors.title
                  ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-400/20'
                  : 'border-cloud-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-400/20'
              }`}
              autoFocus
            />
            {errors.title && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle size={12} /> {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Description
              </label>
              <span className="text-[11px] text-slate-400">Optional</span>
            </div>
            <textarea
              rows={3}
              placeholder="Add key notes, flight guidelines, or tactical details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-cloud-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-400/20 resize-none transition-all"
            />
          </div>

          {/* Priority Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Priority Velocity
            </label>
            <div className="grid grid-cols-3 gap-3">
              {priorityOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = priority === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setPriority(opt.value)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? opt.activeBg
                        : 'border-cloud-200 hover:border-cloud-300 bg-cloud-50/60 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">{opt.label}</span>
                      <Icon size={14} className={opt.color} />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deadline Picker */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Deadline
              </label>
              {deadline && (
                <button
                  type="button"
                  onClick={() => setDeadline('')}
                  className="text-[11px] font-semibold text-rose-600 hover:underline"
                >
                  Clear Date
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-cloud-300 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-400/20 transition-all"
              />
            </div>

            {/* Quick date shortcuts */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Quick:</span>
              <button
                type="button"
                onClick={() => setQuickDeadline(0)}
                className="text-xs px-3 py-1 rounded-full bg-cloud-150 hover:bg-cloud-200 text-slate-700 font-semibold transition-colors"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setQuickDeadline(1)}
                className="text-xs px-3 py-1 rounded-full bg-cloud-150 hover:bg-cloud-200 text-slate-700 font-semibold transition-colors"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => setQuickDeadline(7)}
                className="text-xs px-3 py-1 rounded-full bg-cloud-150 hover:bg-cloud-200 text-slate-700 font-semibold transition-colors"
              >
                In 1 Week
              </button>
            </div>
          </div>

          {/* Status Toggle (when editing) */}
          {isEditing && (
            <div className="pt-2 border-t border-cloud-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Flight Status
                </span>
                <span className="text-[11px] text-slate-500">
                  Mark task as completed or pending
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCompleted(!completed)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  completed
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-cloud-150 text-slate-700 border border-cloud-300'
                }`}
              >
                <CheckCircle2 size={14} />
                <span>{completed ? 'Completed ☁️' : 'Pending'}</span>
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-cloud-200/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-2xl border border-cloud-300 hover:bg-cloud-100 text-sm font-semibold text-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:from-sky-400 hover:to-sky-600 text-white text-sm font-bold shadow-md hover:shadow-cloud-card-hover active:scale-[0.98] transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Dispatching...</span>
                </>
              ) : (
                <span>{isEditing ? 'Save Changes' : 'Create Task'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
