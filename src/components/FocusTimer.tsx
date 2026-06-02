import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Flame, Coffee, Sparkles, FastForward } from 'lucide-react';
import { Language } from '../types';

interface FocusTimerProps {
  language: Language;
}

export default function FocusTimer({ language }: FocusTimerProps) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [isDemoMode, setIsDemoMode] = useState(false); // fast-forward mode for easy testing!

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalTime = mode === 'focus' ? (isDemoMode ? 10 : 25 * 60) : (isDemoMode ? 3 : 5 * 60);
  const timeRemaining = minutes * 60 + seconds;
  const progress = totalTime > 0 ? (totalTime - timeRemaining) / totalTime : 0;

  // Sound generator using Web Audio API (to avoid external file loading issues)
  const playCompletionSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // First beep
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gain1.gain.setValueAtTime(0, audioCtx.currentTime);
      gain1.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.05);
      gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.4);

      // Second beep (slightly staggered)
      setTimeout(() => {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
        gain2.gain.setValueAtTime(0, audioCtx.currentTime);
        gain2.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start();
        osc2.stop(audioCtx.currentTime + 0.5);
      }, 250);
    } catch (e) {
      console.warn("Audio Context is blocked or not supported on this browser context:", e);
    }
  };

  useEffect(() => {
    if (isActive) {
      const tickRate = isDemoMode ? 100 : 1000; // 10x speed in demo mode for quick previewing!
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            // Timer Finished
            playCompletionSound();
            setIsActive(false);
            if (mode === 'focus') {
              setMode('break');
              setMinutes(isDemoMode ? 0 : 5);
              setSeconds(isDemoMode ? 3 : 0);
            } else {
              setMode('focus');
              setMinutes(isDemoMode ? 0 : 25);
              setSeconds(isDemoMode ? 10 : 0);
            }
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        }
      }, tickRate);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, minutes, seconds, mode, isDemoMode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') {
      setMinutes(isDemoMode ? 0 : 25);
      setSeconds(isDemoMode ? 10 : 0);
    } else {
      setMinutes(isDemoMode ? 0 : 5);
      setSeconds(isDemoMode ? 3 : 0);
    }
  };

  const switchMode = (newMode: 'focus' | 'break') => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === 'focus') {
      setMinutes(isDemoMode ? 0 : 25);
      setSeconds(isDemoMode ? 10 : 0);
    } else {
      setMinutes(isDemoMode ? 0 : 5);
      setSeconds(isDemoMode ? 3 : 0);
    }
  };

  const toggleDemoMode = () => {
    setIsActive(false);
    const futureDemo = !isDemoMode;
    setIsDemoMode(futureDemo);
    if (mode === 'focus') {
      setMinutes(futureDemo ? 0 : 25);
      setSeconds(futureDemo ? 10 : 0);
    } else {
      setMinutes(futureDemo ? 0 : 5);
      setSeconds(futureDemo ? 3 : 0);
    }
  };

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Slogans based on status
  const currentSlogan = () => {
    if (mode === 'focus') {
      if (isActive) {
        return language === 'uz' 
          ? 'Telefonni uzoqroq qo‘y va diqqatni qarat!' 
          : 'Put your phone away and focus!';
      }
      return language === 'uz' 
        ? 'Diqqat taymerini boshla, dangasalikni ur!' 
        : 'Start focus timer, crush the laziness!';
    } else {
      if (isActive) {
        return language === 'uz' 
          ? 'Hordiq go‘zal, lekin yana qaytishni unutma!' 
          : 'Enjoy the break, but prepare to return!';
      }
      return language === 'uz' 
        ? 'Dam olish vaqti! Bir oz toza havo ol.' 
        : 'Break time! Blow off some steam.';
    }
  };

  return (
    <div id="focus-timer-card" className="bg-white dark:bg-[#0D1220] rounded-[32px] p-6 border border-slate-100/90 dark:border-slate-800/80 shadow-xs transition-colors duration-300 hover:shadow-sm flex flex-col items-center justify-between min-h-[300px]">
      
      {/* Header Tabs */}
      <div className="flex bg-slate-50 dark:bg-[#111827] p-1.5 rounded-full w-full max-w-[240px] mb-4 border border-slate-100/50 dark:border-slate-800/80">
        <button
          id="focus-mode-btn"
          onClick={() => switchMode('focus')}
          className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mode === 'focus'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          {language === 'uz' ? 'Diqqat' : 'Focus'}
        </button>
        <button
          id="break-mode-btn"
          onClick={() => switchMode('break')}
          className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mode === 'break'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" />
          {language === 'uz' ? 'Hordiq' : 'Break'}
        </button>
      </div>

      {/* Main Circular Timer */}
      <div className="relative w-40 h-40 flex items-center justify-center my-2">
        {/* Background SVG Circle */}
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            className="stroke-slate-100 dark:stroke-slate-800/60"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            className={mode === 'focus' ? "stroke-orange-500" : "stroke-amber-500"}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 70}
            animate={{
              strokeDashoffset: 2 * Math.PI * 70 * (1 - progress)
            }}
            transition={{ duration: isDemoMode ? 0.1 : 0.9, eases: "easeInOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Outer pulsing ring while active */}
        {isActive && (
          <motion.div
            className={`absolute inset-1 rounded-full border-2 ${
              mode === 'focus' ? 'border-orange-200 dark:border-orange-900/40' : 'border-amber-200 dark:border-amber-900/40'
            }`}
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          />
        )}

        {/* Timer Digits */}
        <div className="text-center z-10 flex flex-col items-center">
          <motion.span 
            key={formattedTime}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold font-mono text-slate-800 dark:text-slate-100 tracking-tight"
          >
            {formattedTime}
          </motion.span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'}`} />
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {isActive 
                ? (language === 'uz' ? 'YURMOQDA' : 'RUNNING') 
                : (language === 'uz' ? 'PAUZA' : 'PAUSED')}
            </span>
          </div>
        </div>
      </div>

      {/* Slogan */}
      <p className="text-center text-xs font-medium text-slate-505 dark:text-slate-400 max-w-[210px] min-h-[32px] mt-2 italic">
        {currentSlogan()}
      </p>

      {/* Control Actions Row */}
      <div className="flex items-center gap-4 mt-3 w-full justify-center">
        {/* Reset Button */}
        <button
          id="timer-reset-btn"
          onClick={resetTimer}
          className="p-2.5 rounded-full bg-slate-50 dark:bg-[#111827] text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1C2434] hover:text-slate-800 dark:hover:text-slate-200 transition-colors border border-slate-100 dark:border-slate-800/80 cursor-pointer"
          title={language === 'uz' ? 'Qayta o‘rnatish' : 'Reset Timer'}
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Play / Pause Toggle */}
        <button
          id="timer-toggle-btn"
          onClick={toggleTimer}
          className={`p-4 rounded-full text-white shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
            mode === 'focus'
              ? 'bg-gradient-to-tr from-orange-600 to-amber-500 hover:from-orange-500'
              : 'bg-gradient-to-tr from-amber-600 to-yellow-500 hover:from-amber-500'
          }`}
        >
          {isActive ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
        </button>

        {/* Demo Fast-Forward Accelerator */}
        <button
          id="timer-demo-btn"
          onClick={toggleDemoMode}
          className={`p-2.5 rounded-full border transition-all cursor-pointer ${
            isDemoMode
              ? 'bg-orange-50 dark:bg-orange-950/20 stroke-orange-500 border-orange-200 dark:border-orange-900/60 text-orange-600 dark:text-orange-400 shadow-sm'
              : 'bg-slate-50 dark:bg-[#111827] border-slate-100 dark:border-slate-800/85 text-slate-405 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C2434]'
          }`}
          title={language === 'uz' ? 'Tezlashtirilgan rejim (Demo)' : 'Fast Demonstrator Mode'}
        >
          <div className="flex items-center gap-0.5">
            <FastForward className="w-4 h-4" />
            <span className="text-[9px] font-bold">DX</span>
          </div>
        </button>
      </div>
    </div>
  );
}
