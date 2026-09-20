import { SUPPORTED_VOCABULARY, CONFIDENCE_THRESHOLD } from '../data/vocabulary';

/**
 * Simulated ISL Gesture Recognition Engine.
 * 
 * Architecture Note:
 * This service implements a standardized async interface for gesture inference.
 * In a production deployment, this function can be swapped with a real ONNX runtime,
 * TensorFlow.js model, or MediaPipe landmark classification pipeline without altering
 * any UI components.
 */

// Realistic high-confidence distributions
const HIGH_CONFIDENCE_PROFILES = {
  "HELLO": {
    confidence: 0.94,
    alternatives: [
      { label: "HELLO", confidence: 0.94 },
      { label: "THANK YOU", confidence: 0.04 },
      { label: "HELP", confidence: 0.02 },
    ],
  },
  "THANK YOU": {
    confidence: 0.91,
    alternatives: [
      { label: "THANK YOU", confidence: 0.91 },
      { label: "HELLO", confidence: 0.06 },
      { label: "GOOD MORNING", confidence: 0.03 },
    ],
  },
  "HELP": {
    confidence: 0.87,
    alternatives: [
      { label: "HELP", confidence: 0.87 },
      { label: "WATER", confidence: 0.08 },
      { label: "NO", confidence: 0.05 },
    ],
  },
  "YES": {
    confidence: 0.93,
    alternatives: [
      { label: "YES", confidence: 0.93 },
      { label: "NO", confidence: 0.05 },
      { label: "FOOD", confidence: 0.02 },
    ],
  },
  "NO": {
    confidence: 0.89,
    alternatives: [
      { label: "NO", confidence: 0.89 },
      { label: "YES", confidence: 0.07 },
      { label: "HELP", confidence: 0.04 },
    ],
  },
  "WATER": {
    confidence: 0.92,
    alternatives: [
      { label: "WATER", confidence: 0.92 },
      { label: "FOOD", confidence: 0.05 },
      { label: "HELLO", confidence: 0.03 },
    ],
  },
  "FOOD": {
    confidence: 0.88,
    alternatives: [
      { label: "FOOD", confidence: 0.88 },
      { label: "WATER", confidence: 0.08 },
      { label: "THANK YOU", confidence: 0.04 },
    ],
  },
  "GOOD MORNING": {
    confidence: 0.90,
    alternatives: [
      { label: "GOOD MORNING", confidence: 0.90 },
      { label: "HELLO", confidence: 0.06 },
      { label: "THANK YOU", confidence: 0.04 },
    ],
  },
};

// Realistic ambiguous/uncertain distributions for testing the confidence-aware flow (< 70%)
const UNCERTAIN_PROFILES = [
  {
    label: "HELLO",
    confidence: 0.61,
    alternatives: [
      { label: "HELLO", confidence: 0.61 },
      { label: "THANK YOU", confidence: 0.24 },
      { label: "HELP", confidence: 0.15 },
    ],
    reason: "Partial occlusion or boundary lighting detected on dominant hand.",
  },
  {
    label: "WATER",
    confidence: 0.58,
    alternatives: [
      { label: "WATER", confidence: 0.58 },
      { label: "FOOD", confidence: 0.28 },
      { label: "HELLO", confidence: 0.14 },
    ],
    reason: "Hand position between mouth and chin created feature overlap.",
  },
  {
    label: "HELP",
    confidence: 0.63,
    alternatives: [
      { label: "HELP", confidence: 0.63 },
      { label: "YES", confidence: 0.21 },
      { label: "NO", confidence: 0.16 },
    ],
    reason: "Non-dominant supporting hand not fully detected in camera frame.",
  },
];

/**
 * Perform simulated inference on a video frame / user capture.
 * 
 * @param {Object} options
 * @param {string} [options.targetSign] - Explicit sign to simulate (for demo buttons)
 * @param {boolean} [options.forceAmbiguous] - Force an intentionally low-confidence scenario
 * @param {number} [options.delayMs] - Delay duration in milliseconds (default 1200ms)
 * @returns {Promise<Object>} Recognition result object
 */
export async function processSignFrame(options = {}) {
  const {
    targetSign = null,
    forceAmbiguous = false,
    delayMs = 1200,
  } = options;

  // Add realistic jitter to processing time (±150ms)
  const actualDelay = Math.max(700, delayMs + (Math.random() * 300 - 150));

  await new Promise((resolve) => setTimeout(resolve, actualDelay));

  if (forceAmbiguous) {
    const randomIndex = Math.floor(Math.random() * UNCERTAIN_PROFILES.length);
    const uncertainMatch = UNCERTAIN_PROFILES[randomIndex];
    return {
      ...uncertainMatch,
      isConfident: uncertainMatch.confidence >= CONFIDENCE_THRESHOLD,
      threshold: CONFIDENCE_THRESHOLD,
      latencyMs: Math.round(actualDelay),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      modelSource: "Simulated ISL CNN-LSTM v1.2",
    };
  }

  let selectedLabel = targetSign;
  if (!selectedLabel) {
    const allLabels = SUPPORTED_VOCABULARY.map(v => v.label);
    selectedLabel = allLabels[Math.floor(Math.random() * allLabels.length)];
  }

  const profile = HIGH_CONFIDENCE_PROFILES[selectedLabel] || {
    confidence: 0.90,
    alternatives: [
      { label: selectedLabel, confidence: 0.90 },
      { label: "HELLO", confidence: 0.06 },
      { label: "YES", confidence: 0.04 },
    ],
  };

  // Add minute variance to confidence (±2%)
  const variance = (Math.random() * 0.04 - 0.02);
  const adjustedConfidence = Math.min(0.98, Math.max(0.75, Number((profile.confidence + variance).toFixed(2))));
  
  const alternatives = [
    { label: selectedLabel, confidence: adjustedConfidence },
    ...profile.alternatives.slice(1).map(alt => ({
      ...alt,
      confidence: Number((alt.confidence * ((1 - adjustedConfidence) / (1 - profile.confidence))).toFixed(2)),
    })),
  ];

  return {
    label: selectedLabel,
    confidence: adjustedConfidence,
    alternatives,
    isConfident: adjustedConfidence >= CONFIDENCE_THRESHOLD,
    threshold: CONFIDENCE_THRESHOLD,
    latencyMs: Math.round(actualDelay),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    modelSource: "Simulated ISL CNN-LSTM v1.2",
  };
}
