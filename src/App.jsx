import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ToastContainer from './components/Toast';
import SettingsModal from './components/SettingsModal';
import Dashboard from './pages/Dashboard';
import LiveTranslation from './pages/LiveTranslation';
import Vocabulary from './pages/Vocabulary';
import History from './pages/History';
import About from './pages/About';
import { useApp } from './context/AppContext';

export default function App() {
  const { activePage } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'live':
        return <LiveTranslation />;
      case 'vocabulary':
        return <Vocabulary />;
      case 'history':
        return <History />;
      case 'about':
        return <About />;
      default:
        return <LiveTranslation />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Persistent Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        {/* Sticky Topbar */}
        <Topbar setMobileOpen={setMobileOpen} />

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {renderCurrentPage()}
        </main>

        {/* Global Floating Toasts */}
        <ToastContainer />

        {/* Settings Modal */}
        <SettingsModal />

        {/* Footer */}
        <footer className="border-t border-slate-200/70 bg-white py-4 px-6 text-center text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <span>SignBridge • Indian Sign Language Assistive Communication Prototype</span>
            <span className="text-[11px] text-slate-400">100% Client-Side • Privacy Preserving • Hackathon Edition</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
