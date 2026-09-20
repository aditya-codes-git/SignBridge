import React, { useState, useEffect } from 'react';
import CameraPanel from '../components/CameraPanel';
import RecognitionPanel from '../components/RecognitionPanel';
import TranslationOutput from '../components/TranslationOutput';
import SessionHistory from '../components/SessionHistory';
import DemoControls from '../components/DemoControls';
import VocabularyGrid from '../components/VocabularyGrid';
import { processSignFrame } from '../services/recognitionEngine';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Info, Sparkles, BookOpen } from 'lucide-react';

export default function LiveTranslation() {
  const { 
    recordTranslation, 
    showToast, 
    speakText, 
    selectedPracticeSign, 
    setSelectedPracticeSign,
    setActivePage 
  } = useApp();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [confirmedSign, setConfirmedSign] = useState(null);
  const [targetSignQueue, setTargetSignQueue] = useState(null);

  // If navigated from practice button in Vocabulary
  useEffect(() => {
    if (selectedPracticeSign) {
      setTargetSignQueue(selectedPracticeSign);
      // Automatically clear practice flag so it doesn't stick forever
      setSelectedPracticeSign(null);
    }
  }, [selectedPracticeSign]);

  // Main capture function triggered by CameraPanel or DemoControls
  const handleCapture = async (explicitSign = null, forceAmbiguous = false) => {
    if (isAnalyzing) return;

    setIsAnalyzing(true);
    setConfirmedSign(null);

    const signToUse = explicitSign || targetSignQueue || null;
    // reset queue after using
    if (targetSignQueue) setTargetSignQueue(null);

    try {
      const result = await processSignFrame({
        targetSign: signToUse,
        forceAmbiguous: forceAmbiguous,
        delayMs: 1100,
      });

      setRecognitionResult(result);

      if (result.isConfident) {
        // High confidence: record immediately
        recordTranslation(result, false);
        showToast(`Recognized "${result.label}" (${Math.round(result.confidence * 100)}%)`, 'success');
      } else {
        // Low confidence: prompt user confirmation
        showToast(`Uncertain prediction (${Math.round(result.confidence * 100)}%). Select intended sign.`, 'warning');
      }
    } catch (err) {
      console.error('Recognition error:', err);
      showToast('Error executing gesture inference.', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // User confirmed an alternative in the low-confidence flow
  const handleSelectAlternative = (alt) => {
    const confirmed = {
      label: alt.label,
      confidence: alt.confidence,
    };
    setConfirmedSign(confirmed);

    // Record verified translation
    recordTranslation({
      label: alt.label,
      confidence: alt.confidence,
    }, true);

    showToast(`Confirmed "${alt.label}"`, 'success');
    // Read aloud to demonstrate seamless flow
    speakText(alt.label);
  };

  const handleReset = () => {
    setRecognitionResult(null);
    setConfirmedSign(null);
    setTargetSignQueue(null);
  };

  // Determine active displayed text
  const currentOutputSign = confirmedSign 
    ? confirmedSign.label 
    : (recognitionResult && recognitionResult.isConfident ? recognitionResult.label : null);

  const currentConfidence = confirmedSign 
    ? confirmedSign.confidence 
    : (recognitionResult ? recognitionResult.confidence : 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Notice: Practice mode if active */}
      {targetSignQueue && (
        <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>
              Practice mode loaded for <strong className="text-blue-950 font-bold">{targetSignQueue}</strong>. 
              Click <span className="font-semibold underline">“Capture Sign”</span> when ready.
            </span>
          </div>
          <button
            onClick={() => setTargetSignQueue(null)}
            className="text-xs text-blue-700 hover:text-blue-950 font-medium"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Main 3-Column / 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Main Camera Column (7 Cols on large screen) */}
        <div className="lg:col-span-7 space-y-6">
          <CameraPanel
            onCapture={() => handleCapture(null, false)}
            isAnalyzing={isAnalyzing}
          />

          {/* Quick Demo Controls under Camera */}
          <DemoControls
            onTriggerSign={(sign, isAmbiguous) => handleCapture(sign, isAmbiguous)}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {/* Right Column: Recognition & Output (5 Cols on large screen) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recognition Panel */}
          <RecognitionPanel
            result={recognitionResult}
            isAnalyzing={isAnalyzing}
            onReset={handleReset}
            onSelectAlternative={handleSelectAlternative}
            confirmedSign={confirmedSign}
          />

          {/* Dedicated Text Output Card */}
          <TranslationOutput
            activeSign={currentOutputSign}
            confidence={currentConfidence}
            isConfirmed={Boolean(confirmedSign)}
          />

          {/* Current Session Panel */}
          <SessionHistory />
        </div>
      </div>

      {/* Supported Vocabulary Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Supported ISL Vocabulary</h3>
            <p className="text-[11px] text-slate-500">
              8 core signs trained for reliable optical landmark verification
            </p>
          </div>
          <button
            onClick={() => setActivePage('vocabulary')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Vocabulary Guide</span>
          </button>
        </div>

        <VocabularyGrid compact={true} />
      </div>

      {/* About & Responsible AI Notice Card */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-slate-900 text-sm">
              Built for focused ISL communication
            </h4>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Focused Vocabulary • Confidence Aware
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
            SignBridge demonstrates communication assistance using a defined Indian Sign Language vocabulary. Predictions include confidence information so uncertain results are clearly communicated.
          </p>
        </div>

        <button
          onClick={() => setActivePage('about')}
          className="whitespace-nowrap px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-xs"
        >
          View Ethics & Architecture
        </button>
      </div>
    </div>
  );
}
