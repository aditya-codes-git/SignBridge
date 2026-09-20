import React from 'react';
import { 
  X, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Volume2, 
  Hand,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function VocabularyModal({ sign, onClose }) {
  const { startPractice, speakText } = useApp();

  if (!sign) return null;

  const handlePracticeClick = () => {
    startPractice(sign.label);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Hand className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                {sign.category}
              </span>
              <h3 className="font-bold text-slate-900 text-lg leading-tight">
                {sign.label}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-sm">
          {/* Gesture Shape & Movement */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              ISL Gesture Description
            </span>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-xs sm:text-sm">
              {sign.description}
            </p>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl border border-slate-200/80 bg-white">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                Confidence Threshold
              </span>
              <span className="text-sm font-bold text-slate-800">
                {Math.round(sign.confidenceThreshold * 100)}% Minimal
              </span>
            </div>

            <div className="p-3 rounded-xl border border-slate-200/80 bg-white">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                Typical Precision
              </span>
              <span className="text-sm font-bold text-emerald-600">
                {Math.round(sign.typicalConfidence * 100)}% High
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 space-y-0.5">
              <strong className="font-semibold block">Try this sign</strong>
              <span>Position your hand in camera view, execute the movement smoothly, and trigger recognition.</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={() => speakText(sign.label)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-white text-slate-700 font-medium text-xs inline-flex items-center gap-1.5 transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Hear Sign</span>
          </button>

          <button
            onClick={handlePracticeClick}
            className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Practice in Live View</span>
          </button>
        </div>
      </div>
    </div>
  );
}
