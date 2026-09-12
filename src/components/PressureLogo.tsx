import React from 'react';

interface PressureLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export const PressureLogo: React.FC<PressureLogoProps> = ({
  size = 'md',
  animated = false,
  className = '',
}) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${dimensions} ${className}`}
      aria-label="PRESSURE Logo - Safety, Pause, Clarity"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${animated ? 'animate-[pulse_3s_ease-in-out_infinite]' : ''}`}
      >
        <defs>
          {/* Subtle shield depth gradient */}
          <linearGradient id="pressureShieldGrad" x1="32" y1="10" x2="32" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E1E22" />
            <stop offset="100%" stopColor="#0F0F12" />
          </linearGradient>

          {/* Signature safety orange gradient for the response pillar */}
          <linearGradient id="pressureOrangeGrad" x1="34" y1="20" x2="41" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF681F" />
            <stop offset="100%" stopColor="#E64500" />
          </linearGradient>

          {/* Clarity white pillar gradient */}
          <linearGradient id="pressureWhiteGrad" x1="23" y1="20" x2="30" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#D4D4D8" />
          </linearGradient>

          {/* Clarity beacon radial glow */}
          <radialGradient id="clarityBeaconGlow" cx="32" cy="31" r="14" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF5500" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Squircle Framing */}
        <rect width="64" height="64" rx="18" fill="#141414" />
        <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="17.25" stroke="#27272A" strokeWidth="1.5" />

        {/* The Shield of Safety (Protective Crest) */}
        <path
          d="M 32 10 C 44.5 10 50.5 16.5 50.5 28 C 50.5 42 38.5 50 32 53.5 C 25.5 50 13.5 42 13.5 28 C 13.5 16.5 19.5 10 32 10 Z"
          fill="url(#pressureShieldGrad)"
          stroke="#38383E"
          strokeWidth="1.5"
          className={animated ? 'animate-[shieldBreathe_3s_ease-in-out_infinite_alternate]' : ''}
        />

        {/* The Clarity Aperture Ring (Geometric clarity & perspective) */}
        <circle
          cx="32"
          cy="31"
          r="14.5"
          stroke="#404048"
          strokeWidth="1.2"
          strokeDasharray="2 3.5"
          className={animated ? 'animate-[spin_24s_linear_infinite] origin-center' : ''}
        />

        {/* Central Clarity Beacon Glow */}
        <circle cx="32" cy="31" r="13" fill="url(#clarityBeaconGlow)" />

        {/* THE PAUSE PILLARS: Dual Monoliths representing Stimulus & Conscious Response */}
        {/* Left Pillar: Incoming Stimulus Paused & Held Safely (Crisp White/Silver) */}
        <rect
          x="23"
          y="20.5"
          width="6"
          height="21"
          rx="3"
          fill="url(#pressureWhiteGrad)"
        />

        {/* Right Pillar: Informed Action in Signature Orange (#FF5500) */}
        <rect
          x="35"
          y="20.5"
          width="6"
          height="21"
          rx="3"
          fill="url(#pressureOrangeGrad)"
          className={animated ? 'drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]' : ''}
        />

        {/* The Clarity Spark: Balanced Focal Point between the Pillars */}
        <circle cx="32" cy="31" r="2.2" fill="#FFFFFF" />
        <circle cx="32" cy="31" r="1.2" fill="#FF5500" />

        {/* Top Clarity Crown Pip */}
        <circle cx="32" cy="15.5" r="1.5" fill="#A1A1AA" />
      </svg>
    </div>
  );
};
