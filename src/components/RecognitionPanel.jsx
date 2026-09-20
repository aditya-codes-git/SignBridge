import React from 'react';
import { 
  Scan, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  AlertTriangle, 
  Check, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import ConfidenceMeter from './ConfidenceMeter';
import { useApp } from '../context/AppContext';

export default function RecognitionPanel({ 
  result, 
  isAnalyzing, 
  onReset, 
  onSelectAlternative, 
  confirmedSign 
}) {
  const { speakText, isSpeaking } = useApp();

  const activeLabel = confirmedSign ? confirmedSign.label : (result ? result.label : null);
  const activeConfidence = confirmedSign ? confirmedSign.confidence : (result ? result.confidence : null);
  const isHighConfidence = result ? result.isConfident : false;
  const isConfirmed = Boolean(confirmedSign);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Scan className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Recognition</h3>
        </div>
        {result && !isAnalyzing && (
          <span className="text-[11px] font-mono text-slate-400">
            {result.latencyMs ? `${result.latencyMs}ms latency` : 'Real-time'}
          </span>
        )}
      </div>

      {/* Content States */}
      <div className="flex-1 flex flex-col justify-center">
        {/* State 1: Analyzing Gesture (Loading Animation) */}
        {isAnalyzing && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 animate-pulse">
                <Scan className="w-8 h-8" />
              </div>
              <div className="absolute -inset-1 rounded-2xl border border-blue-400/40 animate-ping opacity-75"></div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-base">Analyzing gesture...</h4>
              <p className="text-xs text-slate-500 mt-1">
                Extracting 21 hand landmarks and evaluating ISL gesture vector
              </p>
            </div>
            {/* Skeletal pulse bars */}
            <div className="w-48 space-y-2 pt-2">
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-2/3 animate-[pulse_1s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        )}

        {/* State 2: Initial Ready State (Before Capture) */}
        {!isAnalyzing && !result && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400">
              <Scan className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-base">Ready to recognize</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                Perform a supported ISL gesture in front of the camera and click 
                <span className="font-semibold text-slate-700"> “Capture Sign”</span>.
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Optical detector armed
              </span>
            </div>
          </div>
        )}

        {/* State 3: High Confidence Result (>= 70%) or User Confirmed */}
        {!isAnalyzing && result && (isHighConfidence || isConfirmed) && (
          <div className="space-y-5">
            {/* Top recognized card */}
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Recognized Sign
                </span>
                {isConfirmed && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    <Check className="w-3 h-3" />
                    User Confirmed
                  </span>
                )}
              </div>

              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeLabel}
              </div>

              {/* Confidence Gauge */}
              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                  Confidence
                </span>
                <ConfidenceMeter 
                  confidence={activeConfidence} 
                  isConfident={true} 
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={() => speakText(activeLabel)}
                disabled={isSpeaking}
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isSpeaking ? 'Speaking...' : 'Speak'}</span>
              </button>

              <button
                onClick={onReset}
                className="py-2.5 px-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-sm inline-flex items-center justify-center gap-1.5 transition-colors"
                title="Capture another sign"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}

        {/* State 4: Low Confidence / Uncertain Flow (< 70% and NOT yet confirmed) */}
        {!isAnalyzing && result && !isHighConfidence && !isConfirmed && (
          <div className="space-y-4">
            {/* Amber Alert Card */}
            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <h4 className="font-semibold text-sm">Uncertain prediction</h4>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                The optical score ({Math.round(result.confidence * 100)}%) is below the 70% reliability threshold. Please select the intended sign:
              </p>
            </div>

            {/* Possible Matches List */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
                Possible matches
              </div>

              {result.alternatives && result.alternatives.map((alt, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectAlternative(alt)}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-700 font-bold text-xs flex items-center justify-center transition-colors">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-900 group-hover:text-blue-900 text-sm">
                      {alt.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-600 group-hover:text-blue-700">
                      {Math.round(alt.confidence * 100)}%
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Responsible Human-in-the-Loop AI
              </span>
              <button
                onClick={onReset}
                className="text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Retake
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
