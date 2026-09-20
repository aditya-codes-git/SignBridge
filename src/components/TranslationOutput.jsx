import React from 'react';
import { Volume2, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TranslationOutput({ activeSign, confidence, isConfirmed }) {
  const { speakText, isSpeaking, showToast } = useApp();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!activeSign) return;
    navigator.clipboard.writeText(activeSign).then(
      () => {
        setCopied(true);
        showToast(`Copied "${activeSign}" to clipboard!`, 'success');
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        showToast('Unable to copy to clipboard', 'warning');
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Translated Message</h3>
        </div>
        {activeSign && (
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
            Synthesized
          </span>
        )}
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col justify-center min-h-[140px]">
        {activeSign ? (
          <div className="space-y-4 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Text Output
              </span>
              <div className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                {activeSign}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-medium text-slate-600">
                Confidence: <strong className="text-slate-900">{Math.round(confidence * 100)}%</strong>
              </span>
              {isConfirmed && (
                <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  Verified by user
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-300">
              <MessageSquare className="w-6 h-6 stroke-[1.5]" />
            </div>
            <p className="text-xs text-slate-400">
              No translation generated yet. Capture an ISL sign to produce text.
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
        <button
          onClick={() => activeSign && speakText(activeSign)}
          disabled={!activeSign || isSpeaking}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-35 disabled:cursor-not-allowed shadow-xs"
        >
          <Volume2 className="w-4 h-4" />
          <span>{isSpeaking ? 'Speaking...' : 'Speak'}</span>
        </button>

        <button
          onClick={handleCopy}
          disabled={!activeSign}
          className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
