import React from 'react';
import { History, Trash2, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SessionHistory({ onSelectSessionItem }) {
  const { currentSession, clearSession, speakText } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <History className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Current Session</h3>
          </div>
        </div>

        {currentSession.length > 0 && (
          <button
            onClick={clearSession}
            className="text-xs font-medium text-slate-400 hover:text-rose-600 inline-flex items-center gap-1 transition-colors"
            title="Clear current session translations"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Session</span>
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto max-h-56 pr-1 space-y-2">
        {currentSession.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No gestures translated in this session yet.
          </div>
        ) : (
          currentSession.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-between transition-colors text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                <div>
                  <span className="font-bold text-slate-900 block leading-tight">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200/80 text-[11px]">
                  {Math.round(item.confidence * 100)}%
                </span>

                <button
                  onClick={() => speakText(item.label)}
                  className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors"
                  title={`Speak "${item.label}"`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
