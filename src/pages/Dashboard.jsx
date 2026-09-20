import React from 'react';
import { 
  Play, 
  BookOpen, 
  Activity, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Volume2, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_VOCABULARY } from '../data/vocabulary';
import VocabularyGrid from '../components/VocabularyGrid';

export default function Dashboard() {
  const { setActivePage, history, speakText, startPractice } = useApp();

  // Compute live dynamic stats
  const totalTranslations = history.length;
  const avgConfidence = totalTranslations > 0
    ? Math.round((history.reduce((acc, curr) => acc + curr.confidence, 0) / totalTranslations) * 100)
    : 89;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive ISL Communication Prototype</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Good to see you.
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Practice and test supported ISL gestures with optical confidence tracking and instant speech vocalization.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActivePage('live')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm inline-flex items-center gap-2 shadow-sm shadow-blue-600/20 transition-all active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Open Live Translation</span>
            </button>
            <button
              onClick={() => setActivePage('vocabulary')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-sm inline-flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Vocabulary</span>
            </button>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-50/70 to-transparent pointer-events-none hidden md:block"></div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
            Supported Signs
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">8</span>
            <span className="text-xs font-semibold text-emerald-600">ISL Core</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
            Translations
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{totalTranslations}</span>
            <span className="text-xs font-semibold text-slate-500">recorded</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
            Avg. Confidence
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{avgConfidence}%</span>
            <span className="text-xs font-semibold text-emerald-600">&gt; 70% threshold</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
            Session Status
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xl sm:text-2xl font-bold text-slate-900">Active</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Card: Start a Translation Session (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Primary Workspace
              </span>
              <span className="text-xs font-medium text-slate-400">Ready for capture</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Start a Translation Session
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed">
              Launch the live optical camera feed to test ISL gestures. Receive instantaneous visual confirmation, confidence scoring, alternative matches for ambiguous hand poses, and browser audio speech output.
            </p>

            {/* Feature checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Webcam with auto-fallback</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>70% Confidence Threshold</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Web Speech API Synthesis</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Zero Cloud Dependencies</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActivePage('live')}
              className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm inline-flex items-center gap-2 transition-colors shadow-sm"
            >
              <span>Open Live Translation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 font-mono">
              Latency ~1.1s
            </span>
          </div>
        </div>

        {/* Recent Activity Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <h3 className="font-semibold text-slate-900 text-sm">Recent Translations</h3>
              </div>
              <button
                onClick={() => setActivePage('history')}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                View all
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {history.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <div>
                      <span className="font-bold text-slate-900 block">{item.label}</span>
                      <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {Math.round(item.confidence * 100)}%
                    </span>
                    <button
                      onClick={() => speakText(item.label)}
                      className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors"
                      title="Speak"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Storage: Local State</span>
            <span className="text-emerald-600 font-semibold">100% Private</span>
          </div>
        </div>
      </div>

      {/* Secondary Card: Supported Vocabulary */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">Supported Vocabulary</h3>
            <p className="text-xs text-slate-500">
              The 8 core signs currently supported in the prototype
            </p>
          </div>
          <button
            onClick={() => setActivePage('vocabulary')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
          >
            <span>Full Vocabulary Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <VocabularyGrid compact={true} />
      </div>
    </div>
  );
}
