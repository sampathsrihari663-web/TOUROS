import React from 'react';
import { 
  Search, 
  X, 
  ArrowUpDown, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Flame,
  Cloud
} from 'lucide-react';

export const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  sortBy,
  setSortBy,
  taskCounts
}) => {
  const filterOptions = [
    { id: 'all', label: 'All Tasks', count: taskCounts.all },
    { id: 'pending', label: 'Pending', count: taskCounts.pending, icon: Clock },
    { id: 'completed', label: 'Completed', count: taskCounts.completed, icon: CheckCircle2 },
    { id: 'overdue', label: 'Overdue', count: taskCounts.overdue, icon: AlertTriangle, isAlert: taskCounts.overdue > 0 },
    { id: 'high', label: 'High Priority', count: taskCounts.high, icon: Flame, isHigh: true },
    { id: 'medium', label: 'Medium Priority', count: taskCounts.medium },
    { id: 'low', label: 'Low Priority', count: taskCounts.low },
  ];

  const sortOptions = [
    { id: 'newest', label: 'Newest Created' },
    { id: 'oldest', label: 'Oldest Created' },
    { id: 'deadline-asc', label: 'Deadline (Soonest)' },
    { id: 'deadline-desc', label: 'Deadline (Furthest)' },
    { id: 'priority-high', label: 'Priority (High to Low)' },
    { id: 'title-asc', label: 'Title (A-Z)' },
  ];

  const hasActiveFilters = searchQuery.trim() !== '' || selectedFilter !== 'all' || sortBy !== 'newest';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-cloud-card p-4 sm:p-5 space-y-4">
      {/* Top Row: Search and Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search tasks through the clouds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-cloud-200/90 bg-cloud-50/70 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-cloud-200 transition-colors"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <ArrowUpDown size={14} className="text-sky-500" />
            <span className="hidden sm:inline">Sort:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2 rounded-2xl border border-cloud-200/90 bg-cloud-50/80 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer transition-all shadow-xs"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-slate-500 hover:text-rose-600 px-2.5 py-2 rounded-2xl hover:bg-rose-50 transition-colors flex items-center gap-1"
              title="Reset all filters"
            >
              <X size={13} />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 hidden lg:inline">
          Filter:
        </span>
        {filterOptions.map((filter) => {
          const isSelected = selectedFilter === filter.id;
          const Icon = filter.icon;

          return (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/25 scale-[1.02]'
                  : filter.isAlert
                  ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                  : 'bg-white/80 text-slate-600 hover:bg-cloud-100/90 border border-cloud-200/80 shadow-xs'
              }`}
            >
              {Icon && <Icon size={13} className={isSelected ? 'text-white' : ''} />}
              <span>{filter.label}</span>
              {typeof filter.count === 'number' && (
                <span
                  className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/25 text-white'
                      : filter.isAlert
                      ? 'bg-rose-200 text-rose-900'
                      : 'bg-cloud-100 text-slate-600'
                  }`}
                >
                  {filter.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
