import React from 'react';
import { Menu, Settings, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Topbar({ setMobileOpen }) {
  const { activePage, setIsSettingsOpen } = useApp();

  const getPageInfo = () => {
    switch (activePage) {
      case 'dashboard':
        return {
          title: 'Dashboard',
          subtitle: 'Overview of your Indian Sign Language communication sessions and statistics.',
        };
      case 'live':
        return {
          title: 'Live Translation',
          subtitle: 'Translate supported Indian Sign Language gestures into text and speech.',
        };
      case 'vocabulary':
        return {
          title: 'Vocabulary Library',
          subtitle: 'Explore the 8 supported ISL signs, handshape descriptions, and gestures.',
        };
      case 'history':
        return {
          title: 'Translation History',
          subtitle: 'Review logged gestures, confidence levels, and vocal playback records.',
        };
      case 'about':
        return {
          title: 'About & Responsible AI',
          subtitle: 'System architecture, confidence thresholds, and ethical assistive design.',
        };
      default:
        return {
          title: 'SignBridge',
          subtitle: 'ISL Communication Assistant',
        };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Dynamic page titles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-xs text-slate-500 hidden sm:block mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right: Status badges & actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Demo Mode Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span className="font-semibold">Demo Mode</span>
          </div>

          {/* Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200"
            title="Audio & Recognition Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* User Placeholder */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold text-xs tracking-wide shadow-xs ring-2 ring-slate-100">
              DE
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-slate-900 leading-tight">Demo Evaluator</div>
              <div className="text-[10px] text-slate-500 leading-tight">Hackathon Jury</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
