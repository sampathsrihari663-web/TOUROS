import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Plus, 
  RotateCcw, 
  AlertCircle, 
  Loader2, 
  Cloud,
  Wind
} from 'lucide-react';
import taskService from './services/taskService';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import FilterBar from './components/FilterBar';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';
import CloudBackground from './components/CloudBackground';
import StampedeModal from './components/StampedeModal';
import HomePage from './components/HomePage';
import soundService from './services/soundService';

export function App() {
  // Task State
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search State (default to 'home' landing overview)
  const [activeFilter, setActiveFilter] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStampedeOpen, setIsStampedeOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(soundService.isMuted());

  // Delete Confirmation State
  const [deletingTask, setDeletingTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mobile Sidebar Drawer State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  // Fetch tasks from MongoDB backend
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskService.getAllTasks();
      if (response && response.data) {
        setTasks(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError(err.message || 'Unable to connect to TOUROS server. Ensure MongoDB and backend are running.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Compute Statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;

    const now = new Date();
    const overdue = tasks.filter((t) => {
      if (t.completed || !t.deadline) return false;
      const d = new Date(t.deadline);
      const isToday = d.toDateString() === now.toDateString();
      return d < now && !isToday;
    }).length;

    const highPriority = tasks.filter((t) => t.priority === 'High' && !t.completed).length;

    return { total, completed, pending, overdue, highPriority };
  }, [tasks]);

  // Count per filter category
  const taskCounts = useMemo(() => {
    const now = new Date();
    return {
      all: tasks.length,
      pending: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
      overdue: tasks.filter((t) => {
        if (t.completed || !t.deadline) return false;
        const d = new Date(t.deadline);
        const isToday = d.toDateString() === now.toDateString();
        return d < now && !isToday;
      }).length,
      high: tasks.filter((t) => t.priority === 'High').length,
      medium: tasks.filter((t) => t.priority === 'Medium').length,
      low: tasks.filter((t) => t.priority === 'Low').length,
    };
  }, [tasks]);

  // Filter & Search & Sort Tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Filter by category
    if (activeFilter === 'completed') {
      result = result.filter((t) => t.completed);
    } else if (activeFilter === 'pending') {
      result = result.filter((t) => !t.completed);
    } else if (activeFilter === 'overdue') {
      const now = new Date();
      result = result.filter((t) => {
        if (t.completed || !t.deadline) return false;
        const d = new Date(t.deadline);
        const isToday = d.toDateString() === now.toDateString();
        return d < now && !isToday;
      });
    } else if (activeFilter === 'high') {
      result = result.filter((t) => t.priority === 'High');
    } else if (activeFilter === 'medium') {
      result = result.filter((t) => t.priority === 'Medium');
    } else if (activeFilter === 'low') {
      result = result.filter((t) => t.priority === 'Low');
    }

    // Filter by search query (title or description)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'deadline-asc') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (sortBy === 'deadline-desc') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(b.deadline) - new Date(a.deadline);
      }
      if (sortBy === 'priority-high') {
        const priorityWeight = { High: 3, Medium: 2, Low: 1 };
        return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [tasks, activeFilter, searchQuery, sortBy]);

  // Audio Toggle
  const handleToggleSound = () => {
    const newSoundState = soundService.toggleSound();
    setIsSoundMuted(!newSoundState);
  };

  // Handler: Open Add Task Modal
  const handleOpenAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Handler: Open Edit Task Modal
  const handleOpenEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Handler: Save Task (Create or Update)
  const handleSaveTask = async (taskData) => {
    setIsSubmitting(true);
    try {
      if (editingTask && editingTask._id) {
        // Update
        const response = await taskService.updateTask(editingTask._id, taskData);
        if (response && response.data) {
          setTasks((prev) =>
            prev.map((t) => (t._id === editingTask._id ? response.data : t))
          );
          soundService.playPop();
          showToast('success', `Objective "${response.data.title}" updated in cloud!`);
        }
      } else {
        // Create
        const response = await taskService.createTask(taskData);
        if (response && response.data) {
          setTasks((prev) => [response.data, ...prev]);
          soundService.playPop();
          showToast('success', `Objective "${response.data.title}" launched to stream!`);
        }
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error('Failed to save task:', err);
      showToast('error', err.message || 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler: Toggle Task Status
  const handleToggleStatus = async (taskId, newStatus) => {
    try {
      const response = await taskService.updateTaskStatus(taskId, newStatus);
      if (response && response.data) {
        setTasks((prev) => {
          const updated = prev.map((t) => (t._id === taskId ? response.data : t));
          // Check if all tasks are now completed
          if (newStatus && updated.length > 0 && updated.every((t) => t.completed)) {
            soundService.playVictoryFanfare();
          } else if (newStatus) {
            soundService.playSuccessChime();
          }
          return updated;
        });

        showToast(
          'info',
          response.data.completed
            ? '☁️ Task completed! Soared above the clouds.'
            : 'Task marked as pending.'
        );
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
      showToast('error', err.message || 'Failed to update task status');
    }
  };

  // Handler: Prompt Delete Task Modal
  const handlePromptDelete = (task) => {
    setDeletingTask(task);
  };

  // Handler: Confirm Delete Task
  const handleConfirmDelete = async () => {
    if (!deletingTask) return;
    setIsDeleting(true);
    try {
      await taskService.deleteTask(deletingTask._id);
      setTasks((prev) => prev.filter((t) => t._id !== deletingTask._id));
      soundService.playPop();
      showToast('info', `Objective "${deletingTask.title}" cleared from cloud.`);
      setDeletingTask(null);
    } catch (err) {
      console.error('Failed to delete task:', err);
      showToast('error', err.message || 'Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex text-slate-900 selection:bg-sky-400 selection:text-white">
      {/* Animated Clouds Backdrop ("clouds iykyk") */}
      <CloudBackground />

      {/* Sidebar Navigation */}
      <Sidebar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        stats={stats}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenStampede={() => setIsStampedeOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Header */}
        <Header
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenAddTaskModal={handleOpenAddTask}
          onOpenStampedeModal={() => setIsStampedeOpen(true)}
          isSoundMuted={isSoundMuted}
          onToggleSound={handleToggleSound}
        />

        {/* Dashboard Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6 sm:space-y-8">
          {/* Server / DB Error Alert */}
          {error && (
            <div className="p-4 rounded-3xl bg-rose-50/90 backdrop-blur-xl border border-rose-200 text-rose-800 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="text-rose-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Cloud Connection Issue</p>
                  <p className="text-xs text-rose-600">{error}</p>
                </div>
              </div>
              <button
                onClick={fetchTasks}
                className="px-4 py-2 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <RotateCcw size={14} />
                <span>Reconnect</span>
              </button>
            </div>
          )}

          {/* Conditional View: Home Overview vs Task Stream */}
          {activeFilter === 'home' ? (
            <HomePage
              stats={stats}
              tasks={tasks}
              onGoToTasks={() => setActiveFilter('all')}
              onOpenAddTask={handleOpenAddTask}
              onOpenStampede={() => setIsStampedeOpen(true)}
              onToggleTaskStatus={handleToggleStatus}
            />
          ) : (
            <>
              {/* Key Metrics Counters & Completion Progress Bar */}
              <StatsCards
                stats={stats}
                onSelectFilter={(filterId) => setActiveFilter(filterId)}
              />

              {/* Search & Filter Controls */}
              <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFilter={activeFilter}
                setSelectedFilter={setActiveFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                taskCounts={taskCounts}
              />

              {/* Task Cards Section Header */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>Cloud Stream Roster</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200/80 shadow-xs">
                      {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    {activeFilter === 'all'
                      ? 'All airborne objectives in flight'
                      : `Filtered by ${activeFilter}`}
                  </p>
                </div>

                {/* Quick Add Button on right */}
                <button
                  onClick={handleOpenAddTask}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 bg-white/80 hover:bg-white px-3.5 py-2 rounded-2xl border border-cloud-200/90 shadow-xs transition-all active:scale-[0.98]"
                >
                  <Plus size={14} className="stroke-[2.5]" />
                  <span>New Task</span>
                </button>
              </div>

              {/* Task Cards Grid or Loading/Empty State */}
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-3">
                  <Loader2 size={36} className="text-sky-500 animate-spin" />
                  <p className="text-xs font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1">
                    <span>Connecting to cloud stream...</span>
                    <Cloud size={14} className="text-sky-400" />
                  </p>
                </div>
              ) : filteredTasks.length === 0 ? (
                <EmptyState
                  filterType={activeFilter}
                  searchQuery={searchQuery}
                  onResetFilters={() => {
                    setActiveFilter('all');
                    setSearchQuery('');
                  }}
                  onAddTask={handleOpenAddTask}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onToggleStatus={handleToggleStatus}
                      onEdit={handleOpenEditTask}
                      onDelete={handlePromptDelete}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Create / Edit Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSaveTask}
        initialData={editingTask}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingTask)}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleConfirmDelete}
        taskTitle={deletingTask?.title}
        isDeleting={isDeleting}
      />

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Tauros Stampede Focus Pomodoro Modal */}
      <StampedeModal
        isOpen={isStampedeOpen}
        onClose={() => setIsStampedeOpen(false)}
        tasks={tasks}
        onCompleteTask={handleToggleStatus}
      />
    </div>
  );
}

export default App;
