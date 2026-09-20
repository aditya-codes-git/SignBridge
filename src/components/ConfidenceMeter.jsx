import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ConfidenceMeter({ confidence, isConfident, size = "md" }) {
  const percentage = Math.round(confidence * 100);
  const strokeWidth = 8;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence * circumference);

  const strokeColor = isConfident ? '#10b981' : '#f59e0b'; // emerald-500 vs amber-500
  const badgeBg = isConfident ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200';

  return (
    <div className="flex items-center gap-4">
      {/* Circular Gauge */}
      <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold text-slate-900 tracking-tight leading-none">
            {percentage}%
          </span>
          <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 mt-0.5">
            Score
          </span>
        </div>
      </div>

      {/* Label and confidence description */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md border ${badgeBg}`}>
            {isConfident ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>High confidence</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Uncertain prediction</span>
              </>
            )}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-snug">
          {isConfident 
            ? 'Score exceeds the 70% threshold. Safe for direct vocalization.'
            : 'Below standard reliability threshold. Human confirmation recommended.'
          }
        </p>
      </div>
    </div>
  );
}
