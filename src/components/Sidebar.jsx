import React from 'react';
import { 
  LayoutDashboard, 
  Video, 
  BookOpen, 
  History, 
  Info, 
  Play, 
  Sparkles,
  Layers,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { activePage, setActivePage } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live Translation', icon: Video, badge: 'Live' },
    { id: 'vocabulary', label: 'Vocabulary', icon: BookOpen, count: 8 },
    { id: 'history', label: 'History', icon: History },
    { id: 'about', label: 'About & Principles', icon: Info },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between
        transition-transform duration-200 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-semibold text-slate-900 text-lg tracking-tight leading-tight">SignBridge</h1>
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-tight">ISL Communication Assistant</p>
            </div>
          </div>
          {setMobileOpen && (
            <button 
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* CTA Button */}
        <div className="px-4 pt-4">
          <button
            onClick={() => handleNavClick('live')}
            className={`w-full py-2.5 px-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
              activePage === 'live' 
                ? 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-700' 
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Translation</span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Workspace
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Status & Info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Local Prototype
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">
                Demo Mode
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              100% browser-based. Zero server calls or data leaks.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>SignBridge v1.0</span>
            <span>ISL Core 8 Signs</span>
          </div>
        </div>
      </aside>
    </>
  );
}
