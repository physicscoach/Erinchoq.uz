import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  RefreshCw, 
  Flame, 
  Zap, 
  Calendar as CalIcon, 
  TrendingUp, 
  Heart, 
  Layers, 
  Compass,
  Smile,
  LogOut,
  Info,
  Bell,
  Home,
  CheckSquare,
  BarChart,
  Grid
} from 'lucide-react';

import { Task, TaskStatus, TaskCategory, Language, Quote } from './types';
import { getRandomQuote } from './utils/quotes';
import TaskTracker from './components/TaskTracker';
import FocusTimer from './components/FocusTimer';
import Analytics from './components/Analytics';
import MiniCalendar from './components/MiniCalendar';
import LazyMeter from './components/LazyMeter';

const INITIAL_TASKS: Task[] = [
  {
    id: 't-1',
    title: 'Erinchoqlikni yengish bo‘yicha 10 bet kitob mutolaa qilish',
    status: 'done',
    category: 'study',
    date: '2026-05-25',
    createdAt: Date.now() - 4 * 3600 * 1000
  },
  {
    id: 't-2',
    title: 'Erinchoq.uz premium foydalanuvchi interfeysini shakllantirish',
    status: 'in_progress',
    category: 'work',
    date: '2026-05-25',
    createdAt: Date.now() - 2 * 3600 * 1000
  },
  {
    id: 't-3',
    title: 'Kunlik 15 daqiqalik yugurish yoki jismoniy mashqlar',
    status: 'not_started',
    category: 'health',
    date: '2026-05-25',
    createdAt: Date.now() - 3600000
  },
  {
    id: 't-4',
    title: 'Ertangi kun uchun rejalarni sarhisob qilib olish',
    status: 'not_started',
    category: 'personal',
    date: '2026-05-25',
    createdAt: Date.now()
  }
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('2026-05-25'); // Anchored around prompt timestamp
  const [language, setLanguage] = useState<Language>('uz');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('erinchoq_theme') as 'light' | 'dark') || 'light';
    } catch {
      return 'light';
    }
  });
  const [quote, setQuote] = useState<Quote | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tasks' | 'analytics'>('dashboard');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('erinchoq_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn("Unable to save theme preference:", e);
    }
  }, [theme]);

  // Initialize data on mounted
  useEffect(() => {
    // Check local storage for existing tasks
    try {
      const stored = localStorage.getItem('erinchoq_tasks');
      if (stored) {
        setTasks(JSON.parse(stored));
      } else {
        setTasks(INITIAL_TASKS);
        localStorage.setItem('erinchoq_tasks', JSON.stringify(INITIAL_TASKS));
      }
    } catch (e) {
      console.warn("localStorage standard key-value access is blocked:", e);
      setTasks(INITIAL_TASKS);
    }

    // Set first quote
    setQuote(getRandomQuote());
  }, []);

  // Save changes to localStorage helper
  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    try {
      localStorage.setItem('erinchoq_tasks', JSON.stringify(updatedTasks));
    } catch (e) {
      console.warn("Unable to save tasks to local storage:", e);
    }
  };

  const handleAddTask = (title: string, category: TaskCategory) => {
    const newTask: Task = {
      id: `t-${Date.now()}`,
      title,
      status: 'not_started',
      category,
      date: selectedDate, // Bind task to currently selected calendar day
      createdAt: Date.now()
    };
    const updated = [newTask, ...tasks];
    saveTasks(updated);
  };

  const handleUpdateStatus = (id: string, status: TaskStatus) => {
    const updated = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status };
      }
      return task;
    });
    saveTasks(updated);
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((task) => task.id !== id);
    saveTasks(updated);
  };

  const refreshQuote = () => {
    setQuote(getRandomQuote());
  };

  // Filter tasks for the selected date to show in the daily tracker list
  const dailyTasks = tasks.filter((task) => task.date === selectedDate);
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter((t) => t.status === 'done').length;
  const pendingCount = dailyTasks.filter((t) => t.status !== 'done').length;

  // Efficiency calculation (linked back up dynamically with Lazy index)
  // If no tasks, default efficiency rate is 60%
  const totalDaily = dailyTasks.length;
  const completedDaily = dailyTasks.filter((t) => t.status === 'done').length;
  const inProgressDaily = dailyTasks.filter((t) => t.status === 'in_progress').length;
  const activeDailyPoints = completedDaily * 1 + inProgressDaily * 0.4;
  const dailyEfficiencyRatio = totalDaily > 0 ? (activeDailyPoints / totalDaily) : 0.6;
  const efficiencyPercentage = Math.round(dailyEfficiencyRatio * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070A13] text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-500/10 selection:text-blue-600 flex flex-col lg:flex-row transition-colors duration-300">
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0D1220] flex flex-col p-6 lg:min-h-screen transition-all duration-300">
        {/* Brand Header / Distinct Logo */}
        <div className="relative group flex items-center gap-3.5 mb-10 p-3.5 rounded-[24px] bg-gradient-to-br from-slate-50/80 to-blue-50/30 dark:from-[#131b31]/40 dark:to-indigo-950/20 border border-slate-200/40 dark:border-slate-800/50 shadow-2xs hover:border-blue-400/40 dark:hover:border-indigo-500/30 transition-all duration-500 ease-out select-none">
          {/* Subtle back glowing ambiance */}
          <div className="absolute -left-4 -top-4 w-12 h-12 bg-blue-500/10 dark:bg-indigo-500/15 blur-xl pointer-events-none rounded-full" />
          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-pink-500/10 dark:bg-pink-500/15 blur-xl pointer-events-none rounded-full" />
          
          {/* Standout Logo Emblem */}
          <div className="relative flex-shrink-0">
            {/* Pulsing Back Rings */}
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-500 via-pink-500 to-amber-500 opacity-75 blur-xs group-hover:opacity-100 group-hover:blur-sm transition-all duration-500 animate-pulse" />
            
            {/* Spinning/pulsating dotted orbital track */}
            <div className="absolute -inset-2 border border-dashed border-sky-400/30 rounded-2xl animate-spin-slow pointer-events-none group-hover:border-sky-400/60 transition-all" />

            {/* Core Emblem */}
            <div className="relative w-11 h-11 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transform group-hover:rotate-6 transition-transform duration-500">
              <Zap className="w-5.5 h-5.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
              {/* Overlay mini sparkling indicator */}
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-pink-500 flex items-center justify-center border-2 border-slate-950">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tighter bg-gradient-to-r from-slate-900 via-blue-705 to-indigo-900 dark:from-white dark:via-blue-300 dark:to-indigo-200 bg-clip-text text-transparent transition-transform duration-300">
                Erinchoq
              </span>
              <span className="inline-flex items-center gap-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-pink-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                UZ
              </span>
            </div>
            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5 leading-none transition-colors duration-300 group-hover:text-pink-500">
              {language === 'uz' ? 'Yalqovlikka Barham Ber' : 'Defeat Laziness'}
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <nav className="flex flex-row lg:flex-col gap-1.5 mb-6 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            id="nav-dashboard-tab"
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all duration-200 flex-1 lg:flex-none whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-slate-50 dark:bg-slate-800/60 text-blue-600 dark:text-blue-400 shadow-3xs'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Grid className="w-4.5 h-4.5" />
            <span>{language === 'uz' ? 'Dashboard' : 'Dashboard'}</span>
          </button>

          <button
            id="nav-tasks-tab"
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all duration-200 flex-1 lg:flex-none whitespace-nowrap ${
              activeTab === 'tasks'
                ? 'bg-slate-50 dark:bg-slate-800/60 text-blue-600 dark:text-blue-400 shadow-3xs'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <CheckSquare className="w-4.5 h-4.5" />
            <span>{language === 'uz' ? 'Vazifalar' : 'Tasks'}</span>
            <span className="ml-auto bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              {totalTasksCount}
            </span>
          </button>

          <button
            id="nav-analytics-tab"
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all duration-200 flex-1 lg:flex-none whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-slate-50 dark:bg-slate-800/60 text-blue-600 dark:text-blue-400 shadow-3xs'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <BarChart className="w-4.5 h-4.5" />
            <span>{language === 'uz' ? 'Tahlil' : 'Analytics'}</span>
            <span className="ml-auto bg-green-50 dark:bg-green-950/60 text-green-700 dark:text-green-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              {completedTasksCount}
            </span>
          </button>
        </nav>

        {/* Embedded Mini-Calendar inside Side navigation (Artistic flair feature layout) */}
        <div className="mt-auto hidden lg:block">
          <MiniCalendar
            language={language}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            tasks={tasks}
          />
        </div>
      </aside>

      {/* CORE MAIN AREA */}
      <main className="flex-1 min-h-screen bg-[#F8FAFC] dark:bg-[#070A13] flex flex-col transition-colors duration-300">
        
        {/* APP HEADER */}
        <header className="bg-white dark:bg-[#0D1220] border-b border-slate-200/50 dark:border-slate-800/80 px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-40 transition-colors duration-300">
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5 flex items-center gap-2">
              <span>{language === 'uz' ? 'Salom, Umar! 👋' : 'Hello, Umar! 👋'}</span>
            </h1>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
              {language === 'uz' 
                ? `Bugun sizda ${pendingCount} ta muhim vazifa kutmoqda.` 
                : `You have ${pendingCount} important tasks waiting today.`
              }
            </p>
          </div>

          {/* Quick Config Actions Bar */}
          <div className="flex items-center justify-between sm:justify-end gap-3.5 mt-2 sm:mt-0">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2.5 rounded-xl border border-slate-200/65 dark:border-slate-800/80 bg-white dark:bg-[#121A2C] hover:bg-slate-50 dark:hover:bg-[#162035] transition-colors text-amber-500 dark:text-yellow-405 shadow-3xs cursor-pointer flex items-center justify-center min-w-[38px] min-h-[38px]"
              title={language === 'uz' ? 'Mavzuni o‘zgartirish' : 'Switch Theme'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'light' ? (
                  <motion.div
                    key="light-icon"
                    initial={{ rotate: -180, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728L12 12m0 0a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="dark-icon"
                    initial={{ rotate: 180, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -180, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <svg className="w-4 h-4 fill-yellow-400 stroke-yellow-400" viewBox="0 0 24 24">
                      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Language Selection Toggle */}
            <div className="flex bg-slate-100 dark:bg-[#121A2C] p-0.5 rounded-full border border-slate-200/60 dark:border-slate-800/80">
              <button
                id="lang-uz-btn"
                onClick={() => setLanguage('uz')}
                className={`px-3 py-1 text-[11px] font-black rounded-full transition-all uppercase tracking-wider ${
                  language === 'uz'
                    ? 'bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 shadow-xs'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                UZB
              </button>
              <button
                id="lang-en-btn"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-[11px] font-black rounded-full transition-all uppercase tracking-wider ${
                  language === 'en'
                    ? 'bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 shadow-xs'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                ENG
              </button>
            </div>

            {/* Notification Bell Icon */}
            <div className="relative">
              <button 
                id="notification-bell-btn"
                onClick={() => setShowNotification(!showNotification)}
                className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#121A2C] hover:bg-slate-50 dark:hover:bg-[#162035] transition-colors relative"
              >
                <Bell className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#EC4899] rounded-full" />
              </button>
              
              <AnimatePresence>
                {showNotification && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2.5 w-64 bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-xl text-xs text-slate-600 dark:text-slate-300 z-50"
                  >
                    <p className="font-bold text-slate-800 dark:text-slate-203 mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      {language === 'uz' ? 'Eslatmalar' : 'Reminders'}
                    </p>
                    <p className="leading-relaxed">
                      {language === 'uz' 
                        ? 'Har bir kutilayotgan vazifa sizni biroz kuchliroq qiladi. Dangasalikni bugun yengib tashlang!' 
                        : 'Every completed target sharpens your productivity. Crush laziness today!'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Creative Avatar profile gradient container */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center font-extrabold text-white text-xs shadow-xs" title="Hakimovich Umar">
                HU
              </div>
            </div>
          </div>
        </header>

        {/* MOBILE EXTRA CALENDAR PANEL (Only visible on absolute mobile/tablet) */}
        <div className="block lg:hidden px-6 pt-4">
          <MiniCalendar
            language={language}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            tasks={tasks}
          />
        </div>

        {/* SYSTEM BODY GRID LAYOUT */}
        <div className="flex-1 p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT ROW: DAILY TASKS (col-span-12 or col-span-7 depending on tab focus) */}
            <section className={`col-span-12 ${activeTab === 'dashboard' || activeTab === 'tasks' ? 'lg:col-span-7' : 'hidden'} h-full`}>
              <TaskTracker
                tasks={dailyTasks}
                onAddTask={handleAddTask}
                onUpdateStatus={handleUpdateStatus}
                onDeleteTask={handleDeleteTask}
                language={language}
              />
            </section>

            {/* RIGHT ROW: DETAILED FOCUS STATS, ANALYTICS & MOTIVATION QUOTES (col-span-12 or col-span-5) */}
            <section className={`col-span-12 ${activeTab === 'dashboard' || activeTab === 'analytics' ? 'lg:col-span-5' : 'hidden'} flex flex-col gap-6`}>
              
              {/* Quick Stats side widgets layout */}
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Focus Time Indicator Card */}
                  <div className="bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-600/30 dark:via-indigo-650/30 dark:to-violet-700/30 rounded-[24px] p-5 text-white dark:text-blue-200 shadow-lg shadow-blue-500/15 dark:shadow-none border border-transparent dark:border-blue-900/30 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 dark:bg-white/5 rounded-full" />
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-bold tracking-widest text-blue-100 dark:text-blue-300 uppercase">
                        {language === 'uz' ? 'Diqqat Taymer' : 'Focus Session'}
                      </span>
                      <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-white dark:text-blue-100 tracking-tight mb-0.5">25 {language === 'uz' ? 'daqiqa' : 'Mins'}</h4>
                      <p className="text-[10px] text-blue-100/90 dark:text-blue-300/80 font-medium leading-tight">
                        {language === 'uz' ? 'Maftunkor tinchlik va konsentratsiya' : 'Peak mental state and concentration'}
                      </p>
                    </div>
                  </div>

                  {/* Efficiency Stats Card */}
                  <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-slate-200/60 dark:border-slate-800/80 p-5 shadow-xs flex flex-col justify-between min-h-[140px] transition-colors duration-300">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                        {language === 'uz' ? 'Samaradorlik' : 'Efficiency'}
                      </span>
                      <TrendingUp className="w-4.5 h-4.5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-0.5">
                        {efficiencyPercentage}%
                      </h4>
                      {/* Interactive scorebar bar underneath */}
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="bg-emerald-500 dark:bg-emerald-400 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${efficiencyPercentage}%` }} 
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-550 mt-2 font-medium">
                        {language === 'uz' ? 'Mahsuldorlik ko‘rsatkichingiz' : 'Real-time efficiency status'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Graphical growth curve analytics */}
              {(activeTab === 'dashboard' || activeTab === 'analytics') && (
                <Analytics 
                  language={language} 
                  tasksCompletedCount={completedTasksCount}
                />
              )}

              {/* Lazy Index Meter display */}
              {activeTab === 'dashboard' && (
                <LazyMeter
                  tasks={dailyTasks}
                  language={language}
                />
              )}

              {/* Focus timer (Pomodoro tool) */}
              {activeTab === 'dashboard' && (
                <FocusTimer language={language} />
              )}

              {/* Pink Creative Quote section */}
              {quote && (
                <div className="bg-[#EC4899]/5 dark:bg-[#EC4899]/10 border border-pink-100/80 dark:border-pink-900/30 rounded-[24px] p-5 flex flex-col gap-3 relative overflow-hidden shadow-2xs transition-colors duration-300">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/20 text-[#EC4899] dark:text-pink-400 text-[9px] font-extrabold uppercase tracking-wider">
                      {language === 'uz' ? 'Kun Maslahati' : 'Daily Antidote'}
                    </span>
                    <span className="text-[9px] text-pink-400 dark:text-pink-500 font-bold italic">
                      — {quote.type === 'funny' ? (language === 'uz' ? 'Hazil ogohlantirish' : 'Playful Alert') : (language === 'uz' ? 'Motivatsiya' : 'Inspiration')}
                    </span>
                    
                    <button 
                      id="refresh-quote-btn"
                      onClick={refreshQuote} 
                      className="ml-auto text-[#EC4899] dark:text-pink-400 hover:bg-pink-150/50 dark:hover:bg-pink-900/30 p-1.5 rounded-lg transition-all" 
                      title={language === 'uz' ? 'Maslahatni o‘zgartirish' : 'Refresh Tip'}
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
                    </button>
                  </div>
                  <p className="text-[11px] font-bold text-pink-700 dark:text-pink-300 leading-relaxed italic">
                    “{language === 'uz' ? quote.textUz : quote.textEn}”
                  </p>
                  <span className="text-[10px] text-pink-400 dark:text-pink-500 font-extrabold self-end">
                    — {language === 'uz' ? quote.authorUz : quote.authorEn}
                  </span>
                </div>
              )}

            </section>

          </div>
        </div>

        {/* COMPREHENSIVE FOOTER */}
        <footer className="bg-white dark:bg-[#0D1220] border-t border-slate-200/50 dark:border-slate-800/80 py-6 px-6 text-center text-xs text-slate-400 transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-bold text-slate-500 dark:text-slate-400">
              © 2026 <strong className="text-slate-700 dark:text-slate-200">Erinchoq.uz</strong>. {language === 'uz' ? 'Barcha huquqlar himoyalangan.' : 'All rights reserved.'}
            </p>
            <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-slate-400 dark:text-slate-500 select-none">
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">REACT 19</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">VITE</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">TAILWIND 4</span>
            </div>
          </div>
        </footer>

      </main>

    </div>
  );
}
