import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Eye, 
  Volume2, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  HeartHandshake,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function About() {
  const { setActivePage } = useApp();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Intro */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Focused Vocabulary • Confidence Aware</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Built for focused ISL communication
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          SignBridge demonstrates communication assistance using a defined Indian Sign Language (ISL) vocabulary. Predictions include clear confidence information so uncertain or ambiguous gestures are transparently communicated to both the signer and the recipient.
        </p>

        <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800 leading-relaxed">
            <strong>Scope & Transparency:</strong> SignBridge intentionally targets a defined 8-sign core vocabulary for high fidelity. We do not claim universal Indian Sign Language translation, as natural sign languages encompass complex dialectal variations, grammatical facial expressions, and spatial syntax that require rigorous ongoing research.
          </div>
        </div>
      </div>

      {/* Technical Pipeline Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            End-to-End Assistive Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            How optical capture transforms into synthesized spoken language
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Optical Feed</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Browser webcam capture at 30 FPS. Standardized 16:9 viewport with real-time positioning frame guides.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Landmark Vector</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Extraction of 21 3D hand coordinates, palm orientation angles, and inter-finger distance ratios.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Confidence Gate</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Evaluation against 70% certainty threshold. Scores below 70% automatically trigger human confirmation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Audio Vocalization</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Native browser Web Speech API vocalizes confirmed words aloud for hearing conversational partners.
            </p>
          </div>
        </div>
      </div>

      {/* Core Responsible AI Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            Human-in-the-Loop
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            When classification ambiguity occurs, the UI presents ranked alternatives rather than making an erroneous blind guess, ensuring signer intent is never misrepresented.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            100% Client Privacy
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Video frames never leave the user's browser or device. All gesture analysis, speech synthesis, and session history remain strictly local with zero cloud telemetry.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            Modular ML Architecture
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The recognition service is isolated into a clean async adapter. It can be directly connected to an on-device TensorFlow.js or ONNX model without touching UI code.
          </p>
        </div>
      </div>

      {/* CTA Bottom Strip */}
      <div className="p-6 bg-slate-900 rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Ready to test the prototype?</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Launch the live optical testbench and simulate gestures with confidence metrics.
          </p>
        </div>
        <button
          onClick={() => setActivePage('live')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors shadow-sm"
        >
          <span>Launch Live Translation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
