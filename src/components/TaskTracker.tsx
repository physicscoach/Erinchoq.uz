import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Check, 
  Loader2, 
  Circle, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  User, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Task, TaskStatus, TaskCategory, Language } from '../types';

interface TaskTrackerProps {
  tasks: Task[];
  onAddTask: (title: string, category: TaskCategory) => void;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onDeleteTask: (id: string) => void;
  language: Language;
}

export default function TaskTracker({ 
  tasks, 
  onAddTask, 
  onUpdateStatus, 
  onDeleteTask, 
  language 
}: TaskTrackerProps) {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TaskCategory>('work');
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask(newTitle.trim(), newCategory);
    setNewTitle('');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getCategoryIcon = (category: TaskCategory) => {
    switch (category) {
      case 'work':
        return <Briefcase className="w-4 h-4" />;
      case 'study':
        return <GraduationCap className="w-4 h-4" />;
      case 'health':
        return <Heart className="w-4 h-4" />;
      case 'personal':
        return <User className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: TaskCategory) => {
    if (language === 'uz') {
      switch (category) {
        case 'work': return 'Ish';
        case 'study': return 'O‘qish';
        case 'health': return 'Sog‘liq';
        case 'personal': return 'Shaxsiy';
      }
    } else {
      switch (category) {
        case 'work': return 'Work';
        case 'study': return 'Study';
        case 'health': return 'Health';
        case 'personal': return 'Personal';
      }
    }
  };

  return (
    <div id="task-tracker-card" className="bg-white dark:bg-[#0D1220] rounded-[32px] p-6 border border-slate-100/90 dark:border-slate-800/80 shadow-xs flex flex-col h-full min-h-[480px] transition-colors duration-300">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            {language === 'uz' ? 'Kunlik Vazifalar' : 'Daily Tasks'}
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {language === 'uz' ? 'Erinchoqlikni bugun yengib o‘ting!' : 'Conquer laziness step by step today!'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex bg-slate-50 dark:bg-[#111827] p-1 rounded-full text-xs font-semibold self-start sm:self-center border border-slate-100 dark:border-slate-800/80">
          <button
            id="filter-all-btn"
            onClick={() => setFilter('all')}
            className={`py-1.5 px-3 rounded-full transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-sm font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
            }`}
          >
            {language === 'uz' ? 'Hammasi' : 'All'} ({tasks.length})
          </button>
          <button
            id="filter-not-started-btn"
            onClick={() => setFilter('not_started')}
            className={`py-1.5 px-3 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
              filter === 'not_started'
                ? 'bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-400 shadow-sm font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            {language === 'uz' ? 'Kutilmoqda' : 'Pending'}
          </button>
          <button
            id="filter-in-progress-btn"
            onClick={() => setFilter('in_progress')}
            className={`py-1.5 px-3 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
              filter === 'in_progress'
                ? 'bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 shadow-sm font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            {language === 'uz' ? 'Bajarilmoqda' : 'Doing'}
          </button>
          <button
            id="filter-done-btn"
            onClick={() => setFilter('done')}
            className={`py-1.5 px-3 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
              filter === 'done'
                ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 shadow-sm font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {language === 'uz' ? 'Bajarildi' : 'Done'}
          </button>
        </div>
      </div>

      {/* Input / Add Task Form */}
      <form onSubmit={handleSubmit} className="mb-5 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Title Input */}
          <input
            id="task-title-input"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder={language === 'uz' ? 'Yangi vazifani yozing (masalan, Kitob o‘qish)...' : 'Write a new task (e.g., Read 5 pages)...'}
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50 dark:bg-[#121A2C]"
          />

          {/* Category Selector */}
          <div className="flex gap-2">
            <select
              id="task-category-select"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as TaskCategory)}
              className="px-3 py-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-[#121A2C] min-w-[110px]"
            >
              <option value="work">{language === 'uz' ? '💻 Ish' : '💻 Work'}</option>
              <option value="study">{language === 'uz' ? '📚 O‘qish' : '📚 Study'}</option>
              <option value="health">{language === 'uz' ? '🍏 Sog‘liq' : '🍏 Health'}</option>
              <option value="personal">{language === 'uz' ? '👤 Shaxsiy' : '👤 Personal'}</option>
            </select>

            <button
              id="add-task-btn"
              type="submit"
              className="p-3 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white hover:bg-slate-800 dark:hover:bg-blue-500 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-5 h-5 font-bold" />
              <span className="hidden sm:inline text-xs font-semibold">{language === 'uz' ? 'Qo‘shish' : 'Add'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto max-h-[350px] pr-1 space-y-3 scrollbar-none">
        <AnimatePresence initial={false}>
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-slate-100 dark:border-slate-800/80 rounded-2xl bg-slate-50/50 dark:bg-[#111827]/40"
            >
              <AlertCircle className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {language === 'uz' ? 'Vazifalar topilmadi!' : 'No tasks here!'}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {language === 'uz' ? 'Dangasalikni chetga surib, birinchi vazifani qo‘shing.' : 'Push laziness aside and write your first target.'}
              </p>
            </motion.div>
          ) : (
            filteredTasks.map((task) => {
              // Custom borders and background themes based on status matching color guidelines
              const getStatusStyles = (t: Task) => {
                if (t.status === 'done') {
                  return 'border-emerald-100 dark:border-emerald-950/40 bg-emerald-50/55 dark:bg-emerald-950/15 text-slate-500 dark:text-slate-400 line-through decoration-slate-300 dark:decoration-slate-700';
                }
                if (t.status === 'in_progress') {
                  return 'border-orange-100 dark:border-orange-950/40 bg-orange-50/55 dark:bg-orange-950/15 text-slate-800 dark:text-slate-200 shadow-xs';
                }
                // Under not_started status
                if (t.category === 'personal' || t.category === 'health') {
                  return 'border-pink-100 dark:border-pink-950/40 bg-pink-50/55 dark:bg-pink-950/15 text-slate-800 dark:text-slate-200';
                }
                return 'border-slate-100 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 opacity-80';
              };

              return (
                <motion.div
                  key={task.id}
                  layoutId={task.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors ${getStatusStyles(
                    task
                  )}`}
                >
                  {/* Task Left Section (Info) */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {/* Status circle/checkbox click-cycle triggers Done or Not-Started */}
                    <button
                      id={`cycle-status-${task.id}`}
                      onClick={() => onUpdateStatus(task.id, task.status === 'done' ? 'not_started' : 'done')}
                      className={`flex-shrink-0 transition-transform active:scale-90 cursor-pointer ${
                        task.status === 'done' ? 'text-green-500 dark:text-green-450' : 'text-slate-300 dark:text-slate-605 hover:text-slate-500'
                      }`}
                    >
                      {task.status === 'done' ? (
                        <CheckCircle2 className="w-5.5 h-5.5 fill-green-50 dark:fill-green-950/25" />
                      ) : (
                        <Circle className="w-5.5 h-5.5" />
                      )}
                    </button>

                    {/* Task details */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold truncate leading-tight mb-1">
                        {task.title}
                      </p>
                      
                      {/* Meta pills */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-bold">
                          {getCategoryIcon(task.category)}
                          {getCategoryLabel(task.category)}
                        </span>
                        
                        {/* Status specific badge */}
                        {task.status === 'done' && (
                          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-tight">
                            {language === 'uz' ? 'Bajarildi' : 'Done'}
                          </span>
                        )}
                        {task.status === 'in_progress' && (
                          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 text-[10px] font-extrabold rounded-full uppercase tracking-tight flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                            {language === 'uz' ? 'Ishlamoqda' : 'Working'}
                          </span>
                        )}
                        {task.status === 'not_started' && (
                          task.category === 'personal' || task.category === 'health' ? (
                            <span className="px-3 py-1 bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-400 text-[10px] font-bold rounded-full uppercase tracking-tight">
                              {language === 'uz' ? 'Eslatma' : 'Reminder'}
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-tight">
                              {language === 'uz' ? 'Kutilmoqda' : 'Waiting'}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Task Right Section (Action buttons) */}
                  <div className="flex items-center justify-between md:justify-end gap-2 border-t md:border-t-0 border-slate-100/80 dark:border-slate-850/80 pt-2.5 md:pt-0">
                    {/* Status quick switcher row */}
                    <div className="flex items-center gap-1.5 bg-slate-100/50 dark:bg-[#111827] p-1 rounded-xl">
                      {/* None (Pink/Blue) Status */}
                      <button
                        id={`status-pending-${task.id}`}
                        onClick={() => onUpdateStatus(task.id, 'not_started')}
                        className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-tight transition-all cursor-pointer ${
                          task.status === 'not_started'
                            ? 'bg-pink-500 text-white shadow-xs'
                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-650 dark:hover:text-slate-300'
                        }`}
                        title={language === 'uz' ? 'Kutilayotgan holatga o‘tkazish' : 'Move to Pending'}
                      >
                        {language === 'uz' ? 'Kutilmoqda' : 'None'}
                      </button>

                      {/* In Progress (Orange) Status */}
                      <button
                        id={`status-doing-${task.id}`}
                        onClick={() => onUpdateStatus(task.id, 'in_progress')}
                        className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-tight transition-all flex items-center gap-0.5 cursor-pointer ${
                          task.status === 'in_progress'
                            ? 'bg-orange-500 text-white shadow-xs'
                            : 'text-slate-400 dark:text-slate-505 hover:text-slate-650 dark:hover:text-slate-300'
                        }`}
                        title={language === 'uz' ? 'Ishni boshlash' : 'Set to Active'}
                      >
                        {task.status === 'in_progress' && <Loader2 className="w-2.5 h-2.5 animate-spin" />}
                        {language === 'uz' ? 'Bajarish' : 'Doing'}
                      </button>

                      {/* Done (Green) Status */}
                      <button
                        id={`status-done-${task.id}`}
                        onClick={() => onUpdateStatus(task.id, 'done')}
                        className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-tight transition-all cursor-pointer ${
                          task.status === 'done'
                            ? 'bg-green-500 text-white shadow-xs'
                            : 'text-slate-400 dark:text-slate-505 hover:text-slate-660 dark:hover:text-slate-300'
                        }`}
                        title={language === 'uz' ? 'Bajarilgan deb belgilash' : 'Mark Completed'}
                      >
                        {language === 'uz' ? 'Tugatish' : 'Done'}
                      </button>
                    </div>

                    {/* Trash Button */}
                    <button
                      id={`delete-task-${task.id}`}
                      onClick={() => onDeleteTask(task.id)}
                      className="p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-405 hover:bg-red-50 dark:hover:bg-red-950/25 transition-colors cursor-pointer"
                      title={language === 'uz' ? 'Vazifani o‘chirish' : 'Delete Task'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Task Summary Metrics */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
        <span>
          {language === 'uz' 
            ? `Bajarildi: ${tasks.filter(t => t.status === 'done').length} / ${tasks.length}`
            : `Completed: ${tasks.filter(t => t.status === 'done').length} of ${tasks.length}`
          }
        </span>
        {tasks.length > 0 && (
          <span className="font-semibold text-slate-500 dark:text-slate-305">
            {Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 105) > 100 ? 100 : Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100)}% {language === 'uz' ? 'mahsuldorlik' : 'efficacy'}
          </span>
        )}
      </div>
    </div>
  );
}
