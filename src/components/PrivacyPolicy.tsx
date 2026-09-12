import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { PressureLogo } from './PressureLogo';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen bg-[#F6F5F2] text-[#141414] flex flex-col">
      {/* Top Header */}
      <header className="w-full max-w-3xl mx-auto px-6 pt-8 pb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          id="privacy-back-btn"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-xs font-bold text-neutral-700 hover:text-black hover:border-neutral-300 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <PressureLogo size="sm" />
          <span className="font-extrabold tracking-tight text-sm">PRESSURE</span>
        </div>
      </header>

      {/* Main Legal Content */}
      <main className="w-full max-w-3xl mx-auto px-6 pb-24 flex-1">
        <div className="bg-white border border-neutral-200/90 rounded-[28px] p-6 sm:p-12 shadow-2xs">
          <div className="mb-8 pb-6 border-b border-neutral-100">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold mb-3">
              <Shield className="w-3.5 h-3.5 text-neutral-700" />
              <span>Legal Document</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#141414] tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-neutral-500 mt-2 font-medium">
              Last updated: September 2026
            </p>
          </div>

          <div className="prose prose-neutral max-w-none text-sm sm:text-base leading-relaxed text-neutral-700 space-y-8 font-normal">
            <section>
              <h2 className="text-base sm:text-lg font-bold text-[#141414] mb-2">
                1. Overview
              </h2>
              <p>
                PRESSURE is a decision-support application built to assist individuals in recognizing psychological pressure, forced urgency, and manipulation tactics in communication. We believe privacy and user control are fundamental to personal security. This Privacy Policy describes what information we process, how that information is handled, and the choices available to you.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-[#141414] mb-2">
                2. Information We Process
              </h2>
              <p>
                When you use PRESSURE, we process only the information necessary to evaluate message pressure signals:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-neutral-600">
                <li>
                  <strong className="text-neutral-900">Uploaded Screenshots and Message Content:</strong> Image files (PNG, JPEG, WebP) and any optional text hints you submit for inspection.
                </li>
                <li>
                  <strong className="text-neutral-900">Analysis Findings:</strong> The resulting pressure scores, detected tactics, risk context, recommended actions, and pause questions generated during inspection.
                </li>
                <li>
                  <strong className="text-neutral-900">Consent Records:</strong> Confirmation that you agreed to our Terms and acknowledged this Privacy Policy, including timestamp and version number.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-[#141414] mb-2">
                3. How Screenshots Are Handled and AI Processing
              </h2>
              <p>
                To generate an evaluation, uploaded message images and text hints are transmitted securely over TLS-encrypted connections to our application server. The server proxies the image content to Google's Gemini multimodal AI model using the official developer API.
              </p>
              <p className="mt-2">
                The Gemini model analyzes the visual and textual patterns within the screenshot to identify pressure tactics such as artificial deadlines, secrecy demands, and authority claims. Once the analysis is generated and returned to your browser, our application server discards the image from active memory. We do not maintain a permanent server-side database of your uploaded screenshots or personal messages.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-[#141414] mb-2">
                4. Browser Storage and Local History
              </h2>
              <p>
                PRESSURE operates with an on-device local storage approach:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-neutral-600">
                <li>
                  Your recent analysis history is saved directly on your device using browser local storage (localStorage).
                </li>
                <li>
                  A low-resolution, downscaled preview thumbnail is saved locally alongside the result so you can revisit past checks.
                </li>
                <li>
                  This data never syncs to an external user account and remains isolated inside your browser.
                </li>
                <li>
                  We do not use tracking cookies, cross-site trackers, or third-party marketing beacons.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-[#141414] mb-2">
                5. Exportable PDF Reports
              </h2>
              <p>
                When you choose to export or save a PDF report, the document is assembled entirely on your client device using in-browser vector rendering. The generated PDF file is downloaded directly to your local file system and is not sent to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-[#141414] mb-2">
                6. User Control and Data Deletion
              </h2>
              <p>
                You have complete control over data stored in your browser:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-neutral-600">
                <li>
                  You can delete individual checks at any time from the History view by clicking the trash icon.
                </li>
                <li>
                  You can purge all saved evaluations permanently using the "Clear" button in the History view.
                </li>
                <li>
                  Clearing your browser cache or site data removes all stored history and reset preferences instantly.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-[#141414] mb-2">
                7. Security Limitations
              </h2>
              <p>
                We use modern encryption protocols (HTTPS with TLS) for all transmissions between your client and our API endpoints. However, because message screenshots can contain sensitive personal data, we advise you to avoid uploading screenshots that expose bank card numbers, passwords, government IDs, or sensitive medical records.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-[#141414] mb-2">
                8. Children's Privacy
              </h2>
              <p>
                PRESSURE is intended for general audiences and is not directed to children under 13 years of age. We do not knowingly solicit or collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-[#141414] mb-2">
                9. Changes to This Policy
              </h2>
              <p>
                We may periodically update this Privacy Policy to reflect technical enhancements or regulatory requirements. Any updates will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-[#141414] mb-2">
                10. Contact Us
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or how data is processed, please contact us at:
              </p>
              <p className="mt-1 font-mono text-xs text-neutral-800">
                <a href="mailto:web3update3y@gmail.com" className="hover:underline text-[#141414]">
                  web3update3y@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
