import React from 'react';
import { Plus, SearchX, CheckCircle, Flame, Sparkles, Cloud } from 'lucide-react';
import taurosAnimated from '../assets/tauros-animated.gif';
import taurosOfficial from '../assets/tauros-official.png';

export const EmptyState = ({
  filterType = 'all',
  searchQuery = '',
  onResetFilters,
  onAddTask
}) => {
  const getContextualContent = () => {
    if (searchQuery.trim() !== '') {
      return {
        title: 'No tasks found in the mist',
        description: `We couldn't spot any tasks matching "${searchQuery}". Try different keywords or clear your search.`,
        actionText: 'Clear Search',
        action: onResetFilters,
        icon: SearchX,
        color: 'text-sky-600',
        bg: 'bg-sky-100'
      };
    }

    switch (filterType) {
      case 'completed':
        return {
          title: 'No completed tasks yet',
          description: 'Ready to clear your first objective? Soar through your pending tasks!',
          actionText: 'View Pending Tasks',
          action: () => onResetFilters && onResetFilters('pending'),
          icon: CheckCircle,
          color: 'text-emerald-600',
          bg: 'bg-emerald-100'
        };
      case 'overdue':
        return {
          title: 'Crystal clear skies! Zero overdue tasks',
          description: 'Every deadline is fully on track. The cloud herd is gliding with perfect momentum!',
          actionText: 'View All Tasks',
          action: () => onResetFilters && onResetFilters('all'),
          icon: Sparkles,
          color: 'text-sky-600',
          bg: 'bg-sky-100'
        };
      case 'high':
        return {
          title: 'No stormy high-priority tasks',
          description: 'Smooth atmospheric conditions right now. Enjoy the peaceful cruise or set a new priority.',
          actionText: 'Create High-Priority Task',
          action: onAddTask,
          icon: Flame,
          color: 'text-rose-500',
          bg: 'bg-rose-100'
        };
      default:
        return {
          title: 'Your cloud stream is calm and clear',
          description: 'Capture your thoughts and organize your work with the unstoppable energy of Tauros.',
          actionText: 'Create Your First Task',
          action: onAddTask,
          useActualMascot: true
        };
    }
  };

  const content = getContextualContent();
  const Icon = content.icon;

  return (
    <div className="rounded-3xl border border-dashed border-cloud-300 bg-white/70 backdrop-blur-xl p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-6 shadow-cloud-card">
      {content.useActualMascot ? (
        <div className="relative mb-5">
          {/* Cloud cushion */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-b from-white via-cloud-100 to-cloud-200 border border-white shadow-cloud-card flex items-center justify-center p-2.5 animate-cloud-bob">
            <img
              src={taurosAnimated}
              alt="Official Animated Tauros"
              className="w-16 h-16 object-contain drop-shadow-md"
            />
          </div>
          <div className="absolute -top-2 -right-2 bg-sky-500 text-white rounded-full p-1.5 shadow-xs">
            <Cloud size={14} />
          </div>
        </div>
      ) : (
        <div className={`w-16 h-16 rounded-2xl ${content.bg} ${content.color} flex items-center justify-center mb-4 shadow-xs`}>
          <Icon size={30} />
        </div>
      )}

      <h3 className="text-lg font-black text-slate-900 mb-1 tracking-tight">
        {content.title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
        {content.description}
      </p>

      {content.action && (
        <button
          onClick={content.action}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white shadow-md hover:shadow-cloud-card-hover transition-all active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>{content.actionText}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
