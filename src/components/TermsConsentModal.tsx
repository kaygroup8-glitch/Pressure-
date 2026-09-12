import React, { useState } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { PressureLogo } from './PressureLogo';
import { saveTermsConsent } from '../utils/consentStorage';

interface TermsConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsentAccepted: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const TermsConsentModal: React.FC<TermsConsentModalProps> = ({
  isOpen,
  onClose,
  onConsentAccepted,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (!agreed) return;
    saveTermsConsent();
    onConsentAccepted();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
    >
      <div className="w-full max-w-md bg-white rounded-[32px] border border-neutral-200/90 shadow-2xl p-6 sm:p-8 flex flex-col relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          id="consent-close-btn"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"
          aria-label="Close consent dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logo and Icon Header */}
        <div className="flex items-center gap-3 mb-6">
          <PressureLogo size="sm" />
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 text-[11px] font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-neutral-700" />
            <span>Important notice</span>
          </div>
        </div>

        {/* Title and Copy */}
        <h2
          id="consent-title"
          className="text-2xl font-extrabold text-[#141414] tracking-tight mb-2"
        >
          Before you continue
        </h2>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-6">
          PRESSURE uses AI to analyze screenshots and messages for potential pressure signals. The results are informational and may not always be accurate.
        </p>

        {/* Checkbox Agreement */}
        <div className="bg-[#F6F5F2] rounded-2xl p-4 border border-neutral-200/80 mb-6">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              id="consent-checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#FF5500] border-neutral-300 focus:ring-[#FF5500] cursor-pointer shrink-0 accent-[#FF5500]"
            />
            <span className="text-xs text-neutral-700 leading-snug">
              I agree to the{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenTerms();
                }}
                className="font-bold underline text-[#141414] hover:text-[#FF5500] transition-colors"
              >
                Terms and Conditions
              </button>{' '}
              and acknowledge the{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPrivacy();
                }}
                className="font-bold underline text-[#141414] hover:text-[#FF5500] transition-colors"
              >
                Privacy Policy
              </button>
              .
            </span>
          </label>
        </div>

        {/* Action Button */}
        <button
          type="button"
          id="consent-continue-btn"
          onClick={handleContinue}
          disabled={!agreed}
          className="w-full py-3.5 px-6 rounded-full bg-[#141414] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm disabled:opacity-35 disabled:cursor-not-allowed hover:bg-neutral-800"
        >
          <span>Continue to PRESSURE</span>
        </button>
      </div>
    </div>
  );
};
