import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  CameraOff, 
  Play, 
  Square, 
  Scan, 
  AlertCircle, 
  RefreshCw,
  Video,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CameraPanel({ onCapture, isAnalyzing }) {
  const { showToast } = useApp();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraState, setCameraState] = useState('idle'); // 'idle' | 'starting' | 'active' | 'denied' | 'unsupported'
  const [errorMessage, setErrorMessage] = useState('');

  // Start webcam
  const startCamera = async () => {
    setCameraState('starting');
    setErrorMessage('');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraState('unsupported');
      setErrorMessage('Camera access is not supported by your current browser environment.');
      showToast('MediaDevices API not available in this context.', 'warning');
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraState('active');
      showToast('Webcam connected successfully.', 'success');
    } catch (err) {
      console.warn('Camera initialization error:', err);
      setCameraState('denied');
      setErrorMessage(
        err.name === 'NotAllowedError'
          ? 'Camera permission was denied. You can continue using simulated camera frames.'
          : err.name === 'NotFoundError'
          ? 'No video input device detected on this system.'
          : 'Unable to initialize webcam stream. Fallback simulator active.'
      );
      showToast('Camera stream unavailable. Fallback simulator activated.', 'info');
    }
  };

  // Stop webcam
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraState('idle');
    showToast('Camera stopped.', 'info');
  };

  // Mount/Unmount cleanup
  useEffect(() => {
    // Attempt auto-start on mount
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Capture handler
  const handleCapture = () => {
    if (isAnalyzing) return;
    onCapture();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm leading-tight">Camera Input</h3>
            <p className="text-[11px] text-slate-500">Live optical ISL gesture capture</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          {cameraState === 'active' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Camera Ready
            </span>
          ) : cameraState === 'starting' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
              <RefreshCw className="w-3 h-3 animate-spin text-blue-600" />
              Initializing...
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Standby / Simulated
            </span>
          )}
        </div>
      </div>

      {/* Video Container (16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center">
        {/* Real Video Stream */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-300 ${
            cameraState === 'active' ? 'opacity-100' : 'opacity-0 absolute'
          }`}
        />

        {/* Fallback View if camera is not active */}
        {cameraState !== 'active' && (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-radial from-slate-900 to-slate-950 text-slate-300">
            {/* Hand Silhouette / Guide Graphic */}
            <div className="relative mb-4 flex items-center justify-center">
              <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-blue-500/40 bg-blue-950/30 flex items-center justify-center">
                <svg className="w-14 h-14 text-blue-400 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                  <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                  <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              </div>
            </div>

            <h4 className="font-semibold text-white text-sm sm:text-base">
              {cameraState === 'starting' ? 'Connecting to Camera...' : 'Camera Simulator Active'}
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mt-1 mb-3">
              {errorMessage || 'Webcam permission can be granted via browser settings, or use simulated optical capture directly.'}
            </p>

            {cameraState === 'denied' && (
              <button
                onClick={startCamera}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Camera Access
              </button>
            )}
          </div>
        )}

        {/* Subtle Guide Frame Overlay */}
        <div className="absolute inset-4 pointer-events-none flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-6 h-6 border-t-2 border-l-2 border-blue-400/80 rounded-tl-sm"></div>
            <div className="w-6 h-6 border-t-2 border-r-2 border-blue-400/80 rounded-tr-sm"></div>
          </div>

          {/* Center Target Box */}
          <div className="mx-auto w-48 sm:w-64 h-36 sm:h-48 border border-dashed border-white/40 rounded-xl flex items-center justify-center relative bg-black/5">
            {/* Guide Text */}
            <div className="absolute -top-3 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] sm:text-xs font-medium px-2.5 py-0.5 rounded-full border border-slate-700 shadow-sm flex items-center gap-1">
              <Scan className="w-3 h-3 text-blue-400" />
              <span>Position your hand inside the frame</span>
            </div>

            {/* Scanning animation bar if analyzing */}
            {isAnalyzing && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-scan-line"></div>
            )}
          </div>

          <div className="flex justify-between items-end">
            <div className="w-6 h-6 border-b-2 border-l-2 border-blue-400/80 rounded-bl-sm"></div>
            <div className="w-6 h-6 border-b-2 border-r-2 border-blue-400/80 rounded-br-sm"></div>
          </div>
        </div>

        {/* Live FPS / Resolution Badge */}
        <div className="absolute bottom-2.5 right-3 bg-slate-900/80 backdrop-blur-xs text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded border border-slate-700/60 pointer-events-none">
          {cameraState === 'active' ? 'HD 720p • 30 FPS' : 'MOCK FEED • 30 FPS'}
        </div>
      </div>

      {/* Bottom Camera Controls */}
      <div className="p-4 bg-white flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {cameraState === 'active' ? (
            <button
              onClick={stopCamera}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 inline-flex items-center gap-1.5 transition-colors"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop Camera</span>
            </button>
          ) : (
            <button
              onClick={startCamera}
              disabled={cameraState === 'starting'}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Camera</span>
            </button>
          )}

          <div className="text-[11px] text-slate-500 hidden sm:flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Keep hand steady within 40-70cm range</span>
          </div>
        </div>

        {/* Primary Action Button: Capture Sign */}
        <button
          onClick={handleCapture}
          disabled={isAnalyzing}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2 transition-all shadow-sm ${
            isAnalyzing
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/25 active:scale-[0.98]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Scan className="w-4 h-4" />
              <span>Capture Sign</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
