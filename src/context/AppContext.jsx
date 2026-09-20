import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_RECENT_SESSION } from '../data/vocabulary';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activePage, setActivePage] = useState('live'); // default to live for immediate hackathon demo impact
  const [currentSession, setCurrentSession] = useState(INITIAL_RECENT_SESSION);
  const [history, setHistory] = useState(() => {
    return [
      ...INITIAL_RECENT_SESSION,
      {
        id: "hist-prev-1",
        label: "YES",
        confidence: 0.93,
        status: "high_confidence",
        timestamp: "25 mins ago",
        rawTimestamp: Date.now() - 1500000,
        verified: true,
      },
      {
        id: "hist-prev-2",
        label: "WATER",
        confidence: 0.65,
        status: "user_confirmed",
        timestamp: "42 mins ago",
        rawTimestamp: Date.now() - 2520000,
        verified: true,
      },
    ];
  });

  const [toasts, setToasts] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedPracticeSign, setSelectedPracticeSign] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [speechSettings, setSpeechSettings] = useState({
    rate: 0.95,
    pitch: 1.0,
    volume: 1.0,
  });

  // Helper to show toasts
  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Browser Web Speech API integration
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      showToast('Speech synthesis is not supported on this browser.', 'warning');
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Cancel any ongoing utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speechSettings.rate;
      utterance.pitch = speechSettings.pitch;
      utterance.volume = speechSettings.volume;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        console.warn('Speech synthesis issue:', e);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
      showToast(`Vocalized: "${text}"`, 'info', 2000);
    } catch (err) {
      console.error('Speech synthesis error:', err);
      setIsSpeaking(false);
    }
  };

  // Add recognized sign to current session and historical log
  const recordTranslation = (result, isConfirmedByUser = false) => {
    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      label: result.label,
      confidence: result.confidence,
      status: isConfirmedByUser ? 'user_confirmed' : (result.confidence >= 0.70 ? 'high_confidence' : 'uncertain'),
      timestamp: 'Just now',
      rawTimestamp: Date.now(),
      verified: isConfirmedByUser || result.confidence >= 0.70,
    };

    setCurrentSession((prev) => [newItem, ...prev]);
    setHistory((prev) => [newItem, ...prev]);
  };

  const clearSession = () => {
    setCurrentSession([]);
    showToast('Current session cleared.', 'info');
  };

  const clearHistory = () => {
    setHistory([]);
    showToast('History wiped successfully.', 'info');
  };

  const startPractice = (signLabel) => {
    setSelectedPracticeSign(signLabel);
    setActivePage('live');
    showToast(`Loaded ${signLabel} for practice`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        currentSession,
        history,
        recordTranslation,
        clearSession,
        clearHistory,
        toasts,
        showToast,
        removeToast,
        speakText,
        isSpeaking,
        selectedPracticeSign,
        setSelectedPracticeSign,
        startPractice,
        isSettingsOpen,
        setIsSettingsOpen,
        speechSettings,
        setSpeechSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
