import React from 'react';
import { RotateCcw } from 'lucide-react';
import { ViewState } from '../types';
import { PressureLogo } from './PressureLogo';

interface NavbarProps {
  currentView: ViewState;
  onReset: () => void;
  onNavigateLanding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onReset, onNavigateLanding }) => {
  return (
    <header className="w-full pt-4 pb-3 px-5 sm:px-8 max-w-2xl mx-auto flex items-center justify-between">
      <div 
        onClick={onNavigateLanding || onReset}
        className="cursor-pointer group flex items-center gap-3 select-none"
        id="navbar-brand-logo"
        title="Go to overview"
      >
        <PressureLogo size="sm" className="transition-transform group-hover:scale-105 active:scale-95 shadow-xs" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-[17px] font-extrabold tracking-tight text-[#141414]">
              PRESSURE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
          </div>
          <span className="text-[11px] font-medium text-neutral-500 tracking-tight">
            Pause before you respond.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onNavigateLanding && currentView === 'home' && (
          <button
            type="button"
            onClick={onNavigateLanding}
            id="navbar-overview-btn"
            className="text-xs font-semibold text-neutral-500 hover:text-black px-3 py-1.5 rounded-full transition-colors"
          >
            Overview
          </button>
        )}

        {currentView !== 'home' && (
          <button
            onClick={onReset}
            id="navbar-new-analysis-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 text-xs font-semibold text-neutral-700 hover:text-black hover:border-neutral-300 transition-colors active:scale-95 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
            <span>New check</span>
          </button>
        )}
      </div>
    </header>
  );
};
