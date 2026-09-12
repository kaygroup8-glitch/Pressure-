import React from 'react';
import { ArrowUpRight, ShieldCheck, Clock, EyeOff, ShieldAlert, ArrowDown } from 'lucide-react';
import { PressureLogo } from './PressureLogo';
import heroEditorialImage from '../assets/images/editorial_phone_pause_1789245004716.jpg';

interface LandingPageProps {
  onStartAnalysis: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAnalysis,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F5F2] text-[#141414] selection:bg-[#FF5500] selection:text-white flex flex-col">
      {/* Navigation Bar */}
      <header className="w-full sticky top-0 z-30 bg-[#F6F5F2]/90 backdrop-blur-md border-b border-neutral-200/60">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PressureLogo size="sm" />
            <span className="text-base font-extrabold tracking-tight text-[#141414]">
              PRESSURE
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={scrollToHowItWorks}
              className="text-xs font-semibold text-neutral-600 hover:text-black transition-colors hidden sm:inline-block"
            >
              How it works
            </button>

            <button
              type="button"
              id="landing-nav-cta-btn"
              onClick={onStartAnalysis}
              className="px-5 py-2.5 rounded-full bg-[#141414] text-white text-xs font-bold hover:bg-neutral-800 active:scale-95 transition-all shadow-xs"
            >
              Analyze a message
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="w-full flex-1 flex flex-col items-center">
        {/* HERO SECTION */}
        <section className="w-full max-w-5xl mx-auto px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 flex flex-col">
          <div className="flex flex-col max-w-2xl">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[11px] font-extrabold tracking-widest text-neutral-500 uppercase">
                PAUSE BEFORE YOU RESPOND
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#141414] tracking-tight leading-[1.08] mb-6">
              See the pressure
              <br />
              behind the message.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed mb-8 max-w-xl">
              Messages can push us to act before we have time to think. PRESSURE helps you spot those signals before you respond.
            </p>

            {/* Actions */}
            <div className="flex items-center gap-5 flex-wrap">
              <button
                type="button"
                id="hero-primary-cta-btn"
                onClick={onStartAnalysis}
                className="px-7 py-3.5 rounded-full bg-[#FF5500] hover:bg-[#E64D00] text-white font-extrabold text-sm sm:text-base active:scale-95 transition-all shadow-sm"
              >
                Analyze a message
              </button>

              <button
                type="button"
                id="hero-how-it-works-link"
                onClick={scrollToHowItWorks}
                className="inline-flex items-center gap-1 text-sm font-bold text-neutral-700 hover:text-black transition-colors py-2"
              >
                <span>How it works</span>
                <ArrowDown className="w-4 h-4 text-neutral-400" />
              </button>
            </div>
          </div>

          {/* Editorial Visual Composition */}
          <div className="mt-12 sm:mt-16 w-full rounded-[32px] overflow-hidden bg-white border border-neutral-200/90 shadow-sm relative aspect-16/10 max-h-[460px]">
            <img
              src={heroEditorialImage}
              alt="Person thoughtfully reviewing a message on phone"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
              <span className="text-xs font-semibold tracking-wide backdrop-blur-md bg-black/40 px-3.5 py-1.5 rounded-full border border-white/20">
                A moment of pause changes everything
              </span>
            </div>
          </div>
        </section>

        {/* THREE STEP EXPLANATION */}
        <section
          id="how-it-works"
          className="w-full max-w-5xl mx-auto px-6 py-16 sm:py-24 border-t border-neutral-200/80"
        >
          <div className="mb-12">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-2">
              HOW IT WORKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141414] tracking-tight">
              Three clear steps to clarity.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Step 01 */}
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-[#FF5500] tracking-wider mb-3">
                01
              </span>
              <h3 className="text-base font-extrabold text-[#141414] tracking-tight uppercase mb-2">
                UPLOAD
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                Share a screenshot of the message.
              </p>
            </div>

            {/* Step 02 */}
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-[#FF5500] tracking-wider mb-3">
                02
              </span>
              <h3 className="text-base font-extrabold text-[#141414] tracking-tight uppercase mb-2">
                UNDERSTAND
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                PRESSURE looks for language and context that may be pushing you to act too quickly.
              </p>
            </div>

            {/* Step 03 */}
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-[#FF5500] tracking-wider mb-3">
                03
              </span>
              <h3 className="text-base font-extrabold text-[#141414] tracking-tight uppercase mb-2">
                PAUSE
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                Get one clear question to consider before you respond.
              </p>
            </div>
          </div>
        </section>

        {/* PRODUCT PHILOSOPHY */}
        <section
          id="philosophy"
          className="w-full max-w-5xl mx-auto px-6 py-16 sm:py-24 border-t border-neutral-200/80"
        >
          <div className="max-w-2xl">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-2">
              OUR PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141414] tracking-tight leading-snug mb-4">
              Not every dangerous message looks like a scam.
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              PRESSURE focuses on the signals inside a message that can influence your decisions, from urgency and fear to secrecy and emotional pressure.
            </p>
          </div>
        </section>

        {/* PRODUCT PREVIEW */}
        <section className="w-full max-w-5xl mx-auto px-6 py-16 sm:py-24 border-t border-neutral-200/80">
          <div className="mb-10 max-w-xl">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-2">
              REALISTIC PREVIEW
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141414] tracking-tight">
              Spotting signals worth noticing.
            </h2>
          </div>

          {/* Preview Container */}
          <div className="w-full max-w-2xl mx-auto rounded-[32px] p-6 sm:p-8 bg-white border border-neutral-200/90 shadow-2xs flex flex-col gap-6">
            {/* Incoming Message Excerpt */}
            <div className="p-4 rounded-2xl bg-[#F6F5F2] border border-neutral-200/70">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block mb-1">
                Sample Message Received
              </span>
              <p className="text-xs sm:text-sm text-neutral-800 font-medium italic leading-relaxed">
                "URGENT: Your account was flagged for suspicious activity. Transfer your balance to the reserve vault within 15 minutes to prevent permanent suspension. Keep this private."
              </p>
            </div>

            {/* Analysis Result Preview */}
            <div className="flex flex-col gap-5 pt-2">
              {/* Pressure Level Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/20 text-xs font-extrabold tracking-wide">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>HIGH PRESSURE</span>
                </span>
                <span className="text-xs font-bold text-neutral-500">
                  88 SCORE
                </span>
              </div>

              {/* Detected Tactics */}
              <div className="flex flex-col gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#141414] uppercase">
                      Urgency
                    </h4>
                    <p className="text-xs text-neutral-600 font-normal mt-0.5">
                      Pushes you to act before you have time to verify.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 flex items-start gap-3">
                  <EyeOff className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#141414] uppercase">
                      Secrecy
                    </h4>
                    <p className="text-xs text-neutral-600 font-normal mt-0.5">
                      Discourages you from checking with someone else.
                    </p>
                  </div>
                </div>
              </div>

              {/* Centerpiece Pause Question */}
              <div className="p-5 rounded-2xl bg-[#141414] text-white flex flex-col gap-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF5500]">
                  PAUSE BEFORE YOU RESPOND
                </span>
                <p className="text-sm sm:text-base font-bold leading-snug">
                  "Can I verify this request independently?"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL LANDING CTA */}
        <section className="w-full max-w-5xl mx-auto px-6 py-20 sm:py-28 border-t border-neutral-200/80 flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#141414] tracking-tight leading-tight mb-6">
            Before you respond,
            <br />
            take a second look.
          </h2>

          <button
            type="button"
            id="landing-bottom-cta-btn"
            onClick={onStartAnalysis}
            className="px-8 py-4 rounded-full bg-[#FF5500] hover:bg-[#E64D00] text-white font-extrabold text-base active:scale-95 transition-all shadow-sm"
          >
            Analyze a message
          </button>
        </section>
      </main>

      {/* MINIMAL FOOTER */}
      <footer className="w-full border-t border-neutral-200/80 bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <PressureLogo size="sm" />
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-[#141414]">
                PRESSURE
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                Pause before you respond.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-neutral-600">
            <a
              href="mailto:web3update3y@gmail.com"
              id="footer-contact-link"
              className="hover:text-black transition-colors"
            >
              Contact
            </a>
            <button
              type="button"
              id="footer-privacy-link"
              onClick={onOpenPrivacy}
              className="hover:text-black transition-colors"
            >
              Privacy
            </button>
            <button
              type="button"
              id="footer-terms-link"
              onClick={onOpenTerms}
              className="hover:text-black transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
