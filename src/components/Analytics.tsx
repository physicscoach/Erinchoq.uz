import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Award, Calendar, Lightbulb } from 'lucide-react';
import { Language } from '../types';

interface AnalyticsProps {
  language: Language;
  tasksCompletedCount: number;
}

type Period = 'daily' | 'weekly' | 'monthly';

export default function Analytics({ language, tasksCompletedCount }: AnalyticsProps) {
  const [period, setPeriod] = useState<Period>('weekly');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Structured dataset for the beautiful curve charts
  const datasets = {
    daily: {
      labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
      values: [0, 1, 1, 3, 4, 4, Math.max(4, tasksCompletedCount)],
      accentColor: '#3b82f6', // Blue
      gradientId: 'blueGradient',
      yAxisLabel: language === 'uz' ? 'Vazifalar' : 'Tasks',
      tooltipSuffix: language === 'uz' ? ' ta vazifa bajarildi' : ' tasks done'
    },
    weekly: {
      labels: [
        language === 'uz' ? 'Dus' : 'Mon',
        language === 'uz' ? 'Sesh' : 'Tue',
        language === 'uz' ? 'Chor' : 'Wed',
        language === 'uz' ? 'Pay' : 'Thu',
        language === 'uz' ? 'Jum' : 'Fri',
        language === 'uz' ? 'Shan' : 'Sat',
        language === 'uz' ? 'Yak' : 'Sun'
      ],
      values: [2, 4, 3, 5, 4, 7, Math.max(6, tasksCompletedCount)],
      accentColor: '#10b981', // Green (Yashil) - explicit rule for weekly
      gradientId: 'greenGradient',
      yAxisLabel: language === 'uz' ? 'Ball' : 'Score',
      tooltipSuffix: language === 'uz' ? ' ta vazifa' : ' tasks'
    },
    monthly: {
      labels: [
        language === 'uz' ? '1-Hafta' : 'Week 1', 
        language === 'uz' ? '2-Hafta' : 'Week 2', 
        language === 'uz' ? '3-Hafta' : 'Week 3', 
        language === 'uz' ? '4-Hafta' : 'Week 4'
      ],
      values: [12, 18, 15, Math.max(22, 16 + tasksCompletedCount)],
      accentColor: '#a855f7', // Purple/Pink
      gradientId: 'purpleGradient',
      yAxisLabel: language === 'uz' ? 'Harakat' : 'Activity',
      tooltipSuffix: language === 'uz' ? ' ta yutuq' : ' completions'
    }
  };

  const currentData = datasets[period];
  const maxVal = Math.max(...currentData.values, 5); // Avoid division by zero, scale to at least 5

  // Grid SVG sizing
  const width = 540;
  const height = 220;
  const paddingX = 45;
  const paddingY = 30;

  // Map values to coordinates
  const points = currentData.labels.map((label, index) => {
    const x = paddingX + (index * (width - 2 * paddingX)) / (currentData.labels.length - 1);
    const value = currentData.values[index];
    const y = height - paddingY - (value / maxVal) * (height - 2 * paddingY);
    return { x, y, value, label };
  });

  // Calculate Cubic Bezier Curve logic (Figma style)
  const getBezierPath = (pts: typeof points) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const cpX1 = (pts[i].x + pts[i + 1].x) / 2;
      const cpY1 = pts[i].y;
      const cpX2 = (pts[i].x + pts[i + 1].x) / 2;
      const cpY2 = pts[i + 1].y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pts[i + 1].x} ${pts[i + 1].y}`;
    }
    return path;
  };

  const curvePath = getBezierPath(points);
  
  // Fill path is curve path closed at the bottom for beautiful gradients
  const areaPath = points.length > 0 
    ? `${curvePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : '';

  // Sum of completions for the period
  const totalCompletions = currentData.values.reduce((a, b) => a + b, 0);

  return (
    <div id="analytics-card" className="bg-white dark:bg-[#0D1220] rounded-[32px] p-6 border border-slate-100/90 dark:border-slate-800/80 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between h-full">
      
      {/* CARD HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            {language === 'uz' ? 'Mahsuldorlik Tahlili' : 'Productivity Analytics'}
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-550 mt-0.5">
            {language === 'uz' ? 'Faollik ko‘rsatkichingiz va yuksalish egri chizig‘i' : 'Your engagement rates and growth curve'}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-50 dark:bg-[#111827] p-1 rounded-full text-xs font-bold border border-slate-100 dark:border-slate-800/85 self-start sm:self-center">
          <button
            id="period-daily-btn"
            onClick={() => { setPeriod('daily'); setHoveredIndex(null); }}
            className={`py-1.5 px-3 rounded-full transition-all cursor-pointer ${
              period === 'daily'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {language === 'uz' ? 'Kunlik' : 'Daily'}
          </button>
          <button
            id="period-weekly-btn"
            onClick={() => { setPeriod('weekly'); setHoveredIndex(null); }}
            className={`py-1.5 px-3 rounded-full transition-all cursor-pointer ${
              period === 'weekly'
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {language === 'uz' ? 'Haftalik' : 'Weekly'}
          </button>
          <button
            id="period-monthly-btn"
            onClick={() => { setPeriod('monthly'); setHoveredIndex(null); }}
            className={`py-1.5 px-3 rounded-full transition-all cursor-pointer ${
              period === 'monthly'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {language === 'uz' ? 'Oylik' : 'Monthly'}
          </button>
        </div>
      </div>

      {/* QUICK HIGHLIGHT */}
      <div className="flex items-center gap-4 bg-slate-50/70 dark:bg-[#111827]/40 p-3.5 rounded-2xl border border-slate-100/50 dark:border-slate-850/60 mb-4 text-xs">
        <Award className={`w-8 h-8 ${period === 'weekly' ? 'text-green-500' : 'text-blue-500'}`} />
        <div>
          <p className="font-semibold text-slate-700 dark:text-slate-200">
            {language === 'uz' 
              ? `Jami faollik: ${totalCompletions} ball` 
              : `Total Activity Score: ${totalCompletions}`}
          </p>
          <p className="text-slate-400 dark:text-slate-500">
            {language === 'uz' 
              ? 'Har bir kiritilgan qadam va harakat sizni dangasalikdan uzoqlashtiradi.'
              : 'Every small completed step drags you further from the laziness zone.'}
          </p>
        </div>
      </div>

      {/* DETAILED SVG PLOT */}
      <div className="relative w-full flex-1 min-h-[190px] bg-slate-50/30 dark:bg-[#111827]/15 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden flex items-center justify-center p-2">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full select-none"
        >
          <defs>
            {/* Blue Gradient Area */}
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
            {/* Green Gradient Area */}
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            {/* Purple Gradient Area */}
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const hLineY = paddingY + ratio * (height - 2 * paddingY);
            return (
              <line
                key={i}
                x1={paddingX}
                y1={hLineY}
                x2={width - paddingX}
                y2={hLineY}
                stroke="currentColor"
                className="text-slate-200/50 dark:text-slate-800/85"
                strokeWidth="1.5"
                strokeDasharray="4"
              />
            );
          })}

          {/* Curve Area Fill */}
          <motion.path
            d={areaPath}
            fill={`url(#${currentData.gradientId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Curve Line */}
          <motion.path
            d={curvePath}
            fill="none"
            stroke={currentData.accentColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Interactive Highlight Bar (Dashed crosshair on hover) */}
          {hoveredIndex !== null && points[hoveredIndex] && (
            <g>
              <line
                x1={points[hoveredIndex].x}
                y1={paddingY}
                x2={points[hoveredIndex].x}
                y2={height - paddingY}
                stroke="currentColor"
                className="text-slate-300 dark:text-slate-700"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <line
                x1={paddingX}
                y1={points[hoveredIndex].y}
                x2={width - paddingX}
                y2={points[hoveredIndex].y}
                stroke="currentColor"
                className="text-slate-300 dark:text-slate-700"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </g>
          )}

          {/* Data Points (Dots) */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g key={i}>
                {/* Large outer hover glow ring */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 11 : 0}
                  fill={currentData.accentColor}
                  fillOpacity="0.2"
                  className="transition-all duration-200"
                />

                {/* Main point dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4.5}
                  fill="#ffffff"
                  stroke={currentData.accentColor}
                  strokeWidth="3"
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                {/* Transparent pointer capture area for ease of hover */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="16"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            );
          })}

          {/* X-axis labels */}
          {points.map((pt, i) => (
            <text
              key={i}
              x={pt.x}
              y={height - 10}
              className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-sans tracking-tight"
              textAnchor="middle"
              fill="currentColor"
            >
              {pt.label}
            </text>
          ))}

          {/* Y-axis labels at the bounds */}
          <text
            x={paddingX - 10}
            y={paddingY + 4}
            className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-tight"
            textAnchor="end"
            fill="currentColor"
          >
            {maxVal}
          </text>
          <text
            x={paddingX - 10}
            y={height - paddingY + 4}
            className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-tight"
            textAnchor="end"
            fill="currentColor"
          >
            0
          </text>
        </svg>

        {/* Floating Tooltip Div */}
        <AnimatePresence>
          {hoveredIndex !== null && points[hoveredIndex] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute pointer-events-none bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xs text-white p-2 px-3 rounded-xl shadow-lg border border-slate-700/50 dark:border-slate-800/80 flex flex-col items-center gap-0.5 text-center min-w-[100px]"
              style={{
                left: `${(points[hoveredIndex].x / width) * 100}%`,
                top: `${(points[hoveredIndex].y / height) * 100 - 35}%`,
                transform: 'translateX(-50%)'
              }}
            >
              <span className="text-[10px] font-semibold text-slate-305 uppercase tracking-wider">{points[hoveredIndex].label}</span>
              <span className="text-xs font-extrabold flex items-center gap-1">
                {points[hoveredIndex].value}
                <span className="text-[9px] font-normal text-slate-300">{currentData.tooltipSuffix}</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TRIVIA REMINDER */}
      <div className="mt-4 flex items-start gap-2.5 bg-yellow-50/50 dark:bg-yellow-950/10 p-3 rounded-2xl border border-yellow-101 dark:border-yellow-900/30 text-[11px] text-amber-805 dark:text-amber-400">
        <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
        <p>
          {language === 'uz'
            ? 'Ushbu tahlillar o‘z vaqtida bajarilgan barcha yuklamalar bo‘yicha hisoblanadi. Kundalik rejani 100% tugatib, egri chiziqni maksimalga ko‘taring!'
            : 'These analytics mirror your actual output levels. Maintain consistent habits to drive your growth curve upwards.'}
        </p>
      </div>
    </div>
  );
}
