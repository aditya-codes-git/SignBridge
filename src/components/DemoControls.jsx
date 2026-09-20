import React from 'react';
import { Sparkles, AlertCircle, Wand2, ShieldAlert } from 'lucide-react';
import { SUPPORTED_VOCABULARY } from '../data/vocabulary';

export default function DemoControls({ onTriggerSign, isAnalyzing }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">Try Supported Signs</h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Test simulated ISL classification and confidence scoring with one tap
          </p>
        </div>

        {/* Ambiguous Gesture Trigger for judges */}
        <button
          onClick={() => onTriggerSign(null, true)}
          disabled={isAnalyzing}
          className="self-start sm:self-auto px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
          title="Simulate low confidence prediction (<70%) to test human confirmation flow"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>Simulate Ambiguous Sign (&lt;70%)</span>
        </button>
      </div>

      {/* Chips Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {SUPPORTED_VOCABULARY.map((item) => (
          <button
            key={item.id}
            onClick={() => onTriggerSign(item.label, false)}
            disabled={isAnalyzing}
            className="p-2.5 rounded-xl border border-slate-200/90 hover:border-blue-500 hover:bg-blue-50/40 text-left transition-all group disabled:opacity-50 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-[10px] font-semibold text-slate-400 group-hover:text-blue-600">
                {item.category}
              </span>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1 rounded">
                ~{Math.round(item.typicalConfidence * 100)}%
              </span>
            </div>
            <span className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-blue-600 tracking-tight">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
