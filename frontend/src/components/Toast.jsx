import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const { type = 'success', message } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const config = {
    success: {
      bg: 'bg-white/95 border-emerald-200 text-slate-800 shadow-cloud-card',
      icon: CheckCircle2,
      iconColor: 'text-emerald-500'
    },
    error: {
      bg: 'bg-white/95 border-rose-200 text-slate-800 shadow-cloud-card',
      icon: AlertCircle,
      iconColor: 'text-rose-500'
    },
    info: {
      bg: 'bg-white/95 border-sky-200 text-slate-800 shadow-cloud-card',
      icon: Info,
      iconColor: 'text-sky-500'
    }
  };

  const current = config[type] || config.info;
  const Icon = current.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-sm">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl ${current.bg}`}>
        <Icon size={20} className={`shrink-0 ${current.iconColor}`} />
        <span className="text-xs sm:text-sm font-bold tracking-wide flex-1 break-words">
          {message}
        </span>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
