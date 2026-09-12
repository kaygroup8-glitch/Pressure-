import React, { useState } from 'react';
import {
  Clock,
  EyeOff,
  AlertTriangle,
  ShieldAlert,
  HeartCrack,
  Coins,
  UserX,
  Fingerprint,
  AlertOctagon,
  CheckCircle,
  Eye,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  FileDown,
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { formatSummaryForClipboard, exportAnalysisToPDF } from '../utils/pdfExport';

interface ResultViewProps {
  result: AnalysisResult;
  imagePreview: string;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, imagePreview, onReset }) => {
  const [hasPaused, setHasPaused] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const handleCopy = async () => {
    try {
      const summaryText = formatSummaryForClipboard(result);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summaryText);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = summaryText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleDownloadPDF = () => {
    try {
      setIsExportingPDF(true);
      exportAnalysisToPDF(result);
      setTimeout(() => setIsExportingPDF(false), 800);
    } catch (err) {
      console.error('Failed to export PDF:', err);
      setIsExportingPDF(false);
    }
  };

  // Pick appropriate icon based on tactic name
  const getTacticIcon = (tacticName: string) => {
    const lower = tacticName.toLowerCase();
    if (lower.includes('urgenc') || lower.includes('time') || lower.includes('speed')) {
      return <Clock className="w-4 h-4 text-[#FF5500]" />;
    }
    if (lower.includes('secret') || lower.includes('hide') || lower.includes('private')) {
      return <EyeOff className="w-4 h-4 text-[#FF5500]" />;
    }
    if (lower.includes('fear') || lower.includes('threat') || lower.includes('penalty')) {
      return <AlertOctagon className="w-4 h-4 text-[#FF5500]" />;
    }
    if (lower.includes('authorit') || lower.includes('official') || lower.includes('police')) {
      return <ShieldAlert className="w-4 h-4 text-[#FF5500]" />;
    }
    if (lower.includes('guilt') || lower.includes('emotion') || lower.includes('love')) {
      return <HeartCrack className="w-4 h-4 text-[#FF5500]" />;
    }
    if (lower.includes('financ') || lower.includes('money') || lower.includes('wire') || lower.includes('pay')) {
      return <Coins className="w-4 h-4 text-[#FF5500]" />;
    }
    if (lower.includes('isolat') || lower.includes('social') || lower.includes('peer')) {
      return <UserX className="w-4 h-4 text-[#FF5500]" />;
    }
    if (lower.includes('impersonat') || lower.includes('spoof') || lower.includes('fake')) {
      return <Fingerprint className="w-4 h-4 text-[#FF5500]" />;
    }
    return <AlertTriangle className="w-4 h-4 text-[#FF5500]" />;
  };

  const isLow = result.pressureLevel === 'low';
  const isMedium = result.pressureLevel === 'medium';
  const isHigh = result.pressureLevel === 'high';

  // Circular gauge calculations
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.score / 100) * circumference;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6 pt-2 pb-16 px-4">
      {/* Top Level Pill & Action Controls */}
      <div className="w-full flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            Analysis Completed
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Copy Button */}
          <button
            type="button"
            id="quick-copy-summary-btn"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all shadow-2xs ${
              copied
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white border-neutral-200/80 text-neutral-700 hover:text-black hover:border-neutral-300'
            }`}
            title="Copy summary to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-500" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Quick PDF Export */}
          <button
            type="button"
            id="quick-export-pdf-btn"
            onClick={handleDownloadPDF}
            disabled={isExportingPDF}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 text-xs font-semibold text-neutral-700 hover:text-black hover:border-neutral-300 transition-colors shadow-2xs disabled:opacity-50"
            title="Save analysis report as PDF"
          >
            <FileDown className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>{isExportingPDF ? 'Saving...' : 'PDF'}</span>
          </button>

          {/* Original Screenshot Toggle */}
          {imagePreview && (
            <button
              type="button"
              id="toggle-source-preview-btn"
              onClick={() => setShowImagePreview(!showImagePreview)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 text-xs font-semibold text-neutral-700 hover:text-black hover:border-neutral-300 transition-colors shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5 text-neutral-500" />
              <span>{showImagePreview ? 'Hide' : 'Original'}</span>
              {showImagePreview ? (
                <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Expandable Image Preview */}
      {showImagePreview && imagePreview && (
        <div 
          id="source-image-preview-card"
          className="w-full p-3 rounded-3xl bg-neutral-900 border border-neutral-200/80 shadow-md flex flex-col items-center animate-in fade-in duration-200"
        >
          <div className="w-full flex items-center justify-between text-neutral-400 text-xs px-2 py-1 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Original Screenshot</span>
            <span className="text-[11px]">Tap toggle above to collapse</span>
          </div>
          <div className="max-h-[380px] overflow-auto rounded-2xl w-full flex items-center justify-center bg-black/40 p-1">
            <img
              src={imagePreview}
              alt="Analyzed message source"
              className="max-h-[360px] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Primary Score & Pressure Level Card */}
      <div 
        id="pressure-score-card"
        className="w-full rounded-3xl p-7 sm:p-8 bg-[#141414] text-white shadow-sm flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Subtle background glow circle */}
        <div
          className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none ${
            isHigh ? 'bg-[#FF5500]' : isMedium ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
        />

        <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2">
          PRESSURE LEVEL
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
          {isHigh ? (
            <span className="text-[#FF5500]">HIGH</span>
          ) : isMedium ? (
            <span className="text-amber-400">MEDIUM</span>
          ) : (
            <span className="text-emerald-400">LOW PRESSURE</span>
          )}
        </h2>

        {/* Circular Score Treatment */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-5">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background track */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              className="text-neutral-800"
              fill="transparent"
            />
            {/* Value stroke */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke={isHigh ? '#FF5500' : isMedium ? '#F59E0B' : '#10B981'}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tracking-tight text-white leading-none">
              {result.score}
            </span>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mt-1">
              PRESSURE
            </span>
          </div>
        </div>

        {/* Summary sentence */}
        <p className="text-sm text-neutral-300 max-w-md font-medium leading-relaxed mb-3">
          {result.summary}
        </p>

        {/* Small disclaimer */}
        <span className="text-[11px] text-neutral-500 font-normal">
          Based on language and context in the message.
        </span>
      </div>

      {/* TACTICS DETECTED SECTION */}
      <div id="tactics-detected-section" className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold tracking-wider uppercase text-neutral-500">
            Tactics Detected
          </span>
          <span className="text-[11px] font-medium text-neutral-400">
            {result.tactics.length > 0 ? `${result.tactics.length} signal${result.tactics.length > 1 ? 's' : ''}` : 'None found'}
          </span>
        </div>

        {result.tactics && result.tactics.length > 0 ? (
          <div className="grid grid-cols-1 gap-2.5">
            {result.tactics.map((tactic, idx) => (
              <div
                key={idx}
                id={`tactic-card-${idx}`}
                className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100/80 flex items-center justify-center shrink-0 mt-0.5">
                  {getTacticIcon(tactic.name)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold uppercase tracking-wide text-[#141414]">
                    {tactic.name}
                  </span>
                  <span className="text-xs text-neutral-600 font-medium leading-relaxed mt-0.5">
                    "{tactic.explanation}"
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 text-left flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 block">
                No Coercive Tactics Identified
              </span>
              <span className="text-xs text-neutral-500 block mt-0.5">
                We didn't find strong signs of coercive or manipulative pressure in this message.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* WHAT THEY'RE ASKING YOU TO DO */}
      <div id="sender-request-card" className="w-full rounded-3xl p-6 bg-white border border-neutral-200/90 shadow-2xs flex flex-col gap-2">
        <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-400">
          What they're asking you to do
        </span>
        <p className="text-base sm:text-lg font-bold text-[#141414] leading-snug">
          "{result.request}"
        </p>
      </div>

      {/* WHY THIS DESERVES A SECOND LOOK */}
      <div id="risk-context-card" className="w-full rounded-3xl p-6 bg-white border border-neutral-200/90 shadow-2xs flex flex-col gap-2">
        <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-400">
          Why this deserves a second look
        </span>
        <p className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed">
          {result.riskContext}
        </p>
      </div>

      {/* BEFORE YOU ACT */}
      <div id="recommended-action-card" className="w-full rounded-3xl p-6 bg-white border border-neutral-200/90 shadow-2xs flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF5500]" />
          <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500">
            Before you act
          </span>
        </div>
        <p className="text-sm sm:text-base font-bold text-[#141414] leading-snug">
          {result.recommendedAction}
        </p>
      </div>

      {/* PAUSE BEFORE YOU RESPOND - Visual and Emotional Centerpiece */}
      <div 
        id="pause-centerpiece-card"
        className="w-full rounded-3xl p-7 sm:p-9 bg-[#141414] text-white shadow-md flex flex-col items-center text-center relative overflow-hidden"
      >
        <span className="text-[11px] font-extrabold tracking-widest text-[#FF5500] uppercase mb-4">
          PAUSE BEFORE YOU RESPOND
        </span>

        {/* The large focal question */}
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight max-w-lg mb-4">
          "{result.pauseQuestion}"
        </h3>

        <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-sm leading-relaxed mb-6">
          Take a moment. Pressure works best when you don't.
        </p>

        {/* Tactile "I'll pause" button or confirmation */}
        {!hasPaused ? (
          <button
            type="button"
            id="pause-confirm-btn"
            onClick={() => setHasPaused(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF5500] hover:bg-[#E64D00] text-white font-extrabold text-base flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
          >
            <span>I'll pause</span>
          </button>
        ) : (
          <div 
            id="pause-acknowledged-state"
            className="w-full p-4 rounded-2xl bg-neutral-800/90 border border-neutral-700 text-center flex flex-col items-center gap-1.5 animate-in fade-in duration-300"
          >
            <div className="flex items-center gap-2 text-[#FF5500] font-bold text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Good. Taking a moment is the point.</span>
            </div>
            <span className="text-xs text-neutral-400">
              You're in control of your response time.
            </span>
          </div>
        )}
      </div>

      {/* Bottom Action Controls */}
      <div className="w-full flex flex-col gap-3 mt-2">
        {/* Share & Export Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          <button
            type="button"
            id="share-copy-summary-btn"
            onClick={handleCopy}
            className={`w-full py-3.5 px-5 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-2xs ${
              copied
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white border-neutral-200/90 hover:border-neutral-300 text-neutral-800'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-neutral-500" />
                <span>Copy summary</span>
              </>
            )}
          </button>

          <button
            type="button"
            id="export-pdf-report-btn"
            onClick={handleDownloadPDF}
            disabled={isExportingPDF}
            className="w-full py-3.5 px-5 rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-300 text-neutral-800 font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-2xs disabled:opacity-50"
          >
            <FileDown className="w-4 h-4 text-[#FF5500]" />
            <span>{isExportingPDF ? 'Generating PDF...' : 'Save as PDF'}</span>
          </button>
        </div>

        <button
          type="button"
          id="analyze-another-btn"
          onClick={onReset}
          className="w-full py-4 px-6 rounded-2xl bg-[#141414] hover:bg-neutral-800 text-white font-bold text-base flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-sm"
        >
          <RotateCcw className="w-4 h-4 text-neutral-400" />
          <span>Check another message</span>
        </button>
      </div>
    </div>
  );
};
