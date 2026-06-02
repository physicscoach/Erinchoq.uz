import { motion } from 'motion/react';
import { ShieldCheck, Dumbbell, Zap, Coffee, RefreshCw } from 'lucide-react';
import { Language, Task } from '../types';

interface LazyMeterProps {
  tasks: Task[];
  language: Language;
}

export default function LazyMeter({ tasks, language }: LazyMeterProps) {
  // Compute Lazy Quotient percentage
  // If no tasks, lazy quotient is 50% (neutral)
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'done').length;
  const doing = tasks.filter((t) => t.status === 'in_progress').length;

  const activePoints = completed * 1 + doing * 0.4;
  const maxPoints = total > 0 ? total : 1;
  const activeRate = total > 0 ? activePoints / maxPoints : 0.4; // Default 40% if no tasks
  const lazyIndex = Math.min(100, Math.max(0, Math.round((1 - activeRate) * 100)));

  // Status tiers based on lazyIndex
  const getIndexTier = (idx: number) => {
    if (idx <= 20) {
      return {
        labelUz: 'Qahramon! 🚀',
        labelEn: 'Super Hero! 🚀',
        color: 'from-green-500 to-emerald-600',
        bg: 'bg-green-50/50 dark:bg-green-950/15 text-green-800 dark:text-green-350 border-green-200 dark:border-green-900/30',
        descUz: 'Siz erinchoqlikni mutloq mag‘lub etdingiz! Faolligingiz hayratlanarli darajada yuqori.',
        descEn: 'You absolute champion! Laziness is completely vanquished. Your activity level is brilliant.',
        icon: <ShieldCheck className="w-10 h-10 text-green-500 dark:text-green-400" />
      };
    } else if (idx <= 50) {
      return {
        labelUz: 'Mehnatsevar 🐝',
        labelEn: 'Busy Bee 🐝',
        color: 'from-blue-500 to-[#10b981]',
        bg: 'bg-blue-50/50 dark:bg-blue-950/15 text-blue-800 dark:text-blue-305 border-blue-200 dark:border-blue-900/30',
        descUz: 'Faolligingiz yaxshi, xuddi kichik mehnatsevar ari kabi harakat qilyapsiz. Yaxshi yo‘ldasiz!',
        descEn: 'On the right track! You are moving with solid consistency. Keep keeping on!',
        icon: <Zap className="w-10 h-10 text-blue-500 dark:text-blue-400" />
      };
    } else if (idx <= 80) {
      return {
        labelUz: 'Biroz erinchasiz 🥱',
        labelEn: 'Slightly Coined 🥱',
        color: 'from-orange-500 to-amber-500',
        bg: 'bg-orange-50/50 dark:bg-orange-950/15 text-orange-850 dark:text-orange-400 border-orange-200 dark:border-orange-900/20',
        descUz: 'Sizda biroz dangasalik buluti bor. Antidotingiz: yana bitta vazifani bajaring!',
        descEn: 'A light fog of laziness is slowing you down. Your antidote: finish just one more task!',
        icon: <Dumbbell className="w-10 h-10 text-orange-500 dark:text-orange-400" />
      };
    } else {
      return {
        labelUz: 'Yalqovlik Cho‘qqisi 🫠',
        labelEn: 'Absolute Sloth 🫠',
        color: 'from-pink-500 to-rose-600',
        bg: 'bg-pink-50/50 dark:bg-pink-950/15 text-pink-850 dark:text-pink-400 border-pink-200 dark:border-pink-905/20',
        descUz: 'Siz hozircha butunlay erinchoqlik asirisiz. Uxlashni bas qiling, turib biror narsa bajaring!',
        descEn: 'You are currently captured by complete laziness. Quit daydreaming and start working!',
        icon: <Coffee className="w-10 h-10 text-pink-500 dark:text-pink-400" />
      };
    }
  };

  const currentTier = getIndexTier(lazyIndex);

  return (
    <div id="lazy-meter-card" className="bg-white dark:bg-[#0D1220] rounded-[32px] p-6 border border-slate-100/95 dark:border-slate-800/80 shadow-xs transition-colors duration-300 hover:shadow-sm flex flex-col items-center justify-between h-full min-h-[300px]">
      
      {/* HEADER TITLE */}
      <div className="w-full text-center">
        <h3 className="text-sm font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          {language === 'uz' ? 'Erinchoqlik Indeksi' : 'Laziness Index'}
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-550 mt-0.5">
          {language === 'uz' ? 'Vazifalaringiz asosida aniqlangan dangasalik darajasi' : 'Real-time laziness levels based on tasks'}
        </p>
      </div>

      {/* METRIC DISPLAY RING */}
      <div className="relative py-4 flex flex-col items-center">
        {/* Semi circular or circular progress bar using SVG */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="60"
              className="stroke-slate-100 dark:stroke-slate-800/60"
              strokeWidth="9"
              fill="transparent"
            />
            <motion.circle
              cx="72"
              cy="72"
              r="60"
              className={`stroke-gradient`}
              style={{ stroke: `url(#gId-${lazyIndex})` }}
              strokeWidth="9"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 60}
              animate={{
                strokeDashoffset: 2 * Math.PI * 60 * (1 - lazyIndex / 100)
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id={`gId-${lazyIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
                {lazyIndex > 50 ? (
                  <>
                    <stop offset="0%" stopColor="#ec4899" /> {/* Pink */}
                    <stop offset="100%" stopColor="#f43f5e" /> {/* Rose */}
                  </>
                ) : lazyIndex > 20 ? (
                  <>
                    <stop offset="0%" stopColor="#3b82f6" /> {/* Blue */}
                    <stop offset="100%" stopColor="#06b6d4" /> {/* Cyan */}
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#10b981" /> {/* Green */}
                    <stop offset="100%" stopColor="#059669" /> {/* Emerald */}
                  </>
                )}
              </linearGradient>
            </defs>
          </svg>

          {/* Large text in center */}
          <div className="absolute text-center flex flex-col items-center justify-center">
            <span className="text-3xl font-black font-sans tracking-tighter text-slate-800 dark:text-slate-100">
              {total === 0 ? '50%' : `${lazyIndex}%`}
            </span>
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mt-0.5">
              {language === 'uz' ? 'Erinchoq' : 'LAZY'}
            </span>
          </div>
        </div>
      </div>

      {/* FEEDBACK TIERS INFO BLOCK */}
      <div className={`w-full p-4 rounded-2xl border text-center flex flex-col items-center justify-center ${currentTier.bg}`}>
        <div className="mb-2">
          {currentTier.icon}
        </div>
        <p className="text-sm font-black tracking-tight mb-1">
          {language === 'uz' ? currentTier.labelUz : currentTier.labelEn}
        </p>
        <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-200">
          {language === 'uz' ? currentTier.descUz : currentTier.descEn}
        </p>
      </div>
      
    </div>
  );
}
