import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PressureLogo } from './PressureLogo';

interface AnalyzingViewProps {
  imagePreview: string;
  onCancel: () => void;
}

const STAGES = [
  'Reading the message',
  'Understanding the request',
  'Checking pressure signals',
  'Looking for urgency',
  'Looking for emotional pressure',
  'Preparing your pause',
];

export const AnalyzingView: React.FC<AnalyzingViewProps> = ({ imagePreview, onCancel }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center pt-2 pb-8 px-4">
      {/* Top status bar */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Scanning message
          </span>
        </div>
        <button
          onClick={onCancel}
          id="cancel-analysis-btn"
          className="p-1.5 rounded-full hover:bg-neutral-200/70 text-neutral-400 hover:text-neutral-700 transition-colors"
          title="Cancel and choose another image"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Screenshot Frame Card */}
      <div 
        id="analyzing-screenshot-frame"
        className="w-full relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200/90 shadow-md flex flex-col items-center justify-center min-h-[340px] max-h-[460px]"
      >
        {/* Screenshot Image */}
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Uploaded message for pressure analysis"
            className="w-full h-full object-contain max-h-[440px] select-none p-2"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center text-neutral-400 text-sm">
            Message screenshot
          </div>
        )}

        {/* Calm Scanning Overlay line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF5500] to-transparent shadow-[0_0_12px_#FF5500] animate-[scan_2.8s_ease-in-out_infinite]" />
        </div>

        {/* Subtle corner reticles */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/60 pointer-events-none" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/60 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/60 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/60 pointer-events-none" />
      </div>

      {/* Stage Indicator with Animated Pressure Logo */}
      <div className="mt-7 text-center flex flex-col items-center">
        {/* Unique Animated Pressure Logo in loading state */}
        <div className="mb-4">
          <PressureLogo size="lg" animated={true} className="shadow-sm" />
        </div>

        {/* Rotating short calm stages */}
        <div className="h-8 flex items-center justify-center">
          <h2
            key={currentStageIndex}
            className="text-xl sm:text-2xl font-bold text-[#141414] tracking-tight transition-opacity duration-500 ease-in-out"
          >
            {STAGES[currentStageIndex]}
          </h2>
        </div>

        <p className="text-xs text-neutral-500 font-medium mt-1">
          Examining language, urgency, and request signals
        </p>

        {/* Subtle step indicators */}
        <div className="flex items-center gap-1.5 mt-5">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentStageIndex
                  ? 'w-6 bg-[#FF5500]'
                  : i < currentStageIndex
                  ? 'w-2 bg-neutral-800'
                  : 'w-2 bg-neutral-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
