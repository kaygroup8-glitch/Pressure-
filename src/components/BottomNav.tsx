import React from 'react';
import { Home, Clock } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onNavigateHome: () => void;
  onTriggerAnalyze: () => void;
  onNavigateHistory: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigateHome,
  onTriggerAnalyze,
  onNavigateHistory,
}) => {
  return (
    <nav 
      aria-label="App navigation"
      className="fixed bottom-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
    >
      <div className="pointer-events-auto bg-[#141414]/95 backdrop-blur-md text-white rounded-full p-1.5 border border-neutral-800 shadow-xl flex items-center gap-1">
        {/* Home Item */}
        <button
          type="button"
          id="nav-home-btn"
          onClick={onNavigateHome}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
            currentView === 'home'
              ? 'bg-neutral-800 text-white shadow-2xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        {/* Check Action Item (Visually Prominent) */}
        <button
          type="button"
          id="nav-analyze-btn"
          onClick={onTriggerAnalyze}
          className={`flex items-center px-5 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
            currentView === 'analyzing'
              ? 'bg-[#FF5500] text-white shadow-xs scale-105'
              : 'bg-[#FF5500] text-white hover:bg-[#E64D00]'
          }`}
        >
          <span>Check</span>
        </button>

        {/* History Item */}
        <button
          type="button"
          id="nav-history-btn"
          onClick={onNavigateHistory}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
            currentView === 'history'
              ? 'bg-neutral-800 text-white shadow-2xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>History</span>
        </button>
      </div>
    </nav>
  );
};
