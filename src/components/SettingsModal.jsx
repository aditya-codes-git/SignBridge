import React from 'react';
import { X, Volume2, Sliders, Shield, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SettingsModal() {
  const { 
    isSettingsOpen, 
    setIsSettingsOpen, 
    speechSettings, 
    setSpeechSettings, 
    speakText,
    showToast,
    clearSession,
    clearHistory
  } = useApp();

  if (!isSettingsOpen) return null;

  const handleSpeechTest = () => {
    speakText("SignBridge audio synthesis is calibrated and operational.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Assistant Settings</h3>
              <p className="text-[11px] text-slate-500">Audio playback & model parameters</p>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-sm">
          {/* Speech Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <span>Speech Speed Rate</span>
              <span className="font-mono text-blue-600">{speechSettings.rate}x</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.4"
              step="0.05"
              value={speechSettings.rate}
              onChange={(e) => setSpeechSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Slow (0.6x)</span>
              <span>Normal (1.0x)</span>
              <span>Fast (1.4x)</span>
            </div>
          </div>

          {/* Speech Pitch */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <span>Voice Pitch</span>
              <span className="font-mono text-blue-600">{speechSettings.pitch}x</span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.3"
              step="0.05"
              value={speechSettings.pitch}
              onChange={(e) => setSpeechSettings(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Deeper</span>
              <span>Default</span>
              <span>Higher</span>
            </div>
          </div>

          {/* Test button */}
          <button
            onClick={handleSpeechTest}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-blue-600" />
            <span>Test Voice Output</span>
          </button>

          {/* Confidence Model Config */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Acceptance Threshold</span>
              <span className="font-mono font-bold text-emerald-600">70% Minimum</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Any gesture predicted below 70% automatically triggers human-in-the-loop selection.
            </p>
          </div>

          {/* Reset Session Data */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Reset Local State</span>
            <button
              onClick={() => {
                clearSession();
                clearHistory();
                setIsSettingsOpen(false);
                showToast('All local session and history data reset', 'info');
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium"
            >
              Clear All Data
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
