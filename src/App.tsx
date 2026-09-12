import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { UploadCard } from './components/UploadCard';
import { AnalyzingView } from './components/AnalyzingView';
import { ResultView } from './components/ResultView';
import { HistoryView } from './components/HistoryView';
import { BottomNav } from './components/BottomNav';
import { LandingPage } from './components/LandingPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { TermsConsentModal } from './components/TermsConsentModal';
import { ViewState, AnalysisResult, HistoryItem, PageMode } from './types';
import { loadHistory, saveToHistory, clearHistory, deleteHistoryItem } from './utils/historyStorage';
import { getTermsConsent } from './utils/consentStorage';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function App() {
  // Page mode: landing, dashboard, privacy, or terms
  const [pageMode, setPageMode] = useState<PageMode>('landing');
  const [previousPage, setPreviousPage] = useState<PageMode>('landing');
  const [isConsentModalOpen, setIsConsentModalOpen] = useState<boolean>(false);
  const [returnToConsent, setReturnToConsent] = useState<boolean>(false);

  // Dashboard view state: home, analyzing, result, or history
  const [viewState, setViewState] = useState<ViewState>('home');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => loadHistory());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const globalFileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize initial URL and browser navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      if (path === '/privacy') {
        setPageMode('privacy');
      } else if (path === '/terms') {
        setPageMode('terms');
      } else if (path === '/app' || path === '/dashboard') {
        const consent = getTermsConsent();
        if (consent) {
          setPageMode('dashboard');
        } else {
          setPageMode('landing');
          setIsConsentModalOpen(true);
        }
      } else {
        setPageMode('landing');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Sync latest history from storage on mount
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const navigateTo = (mode: PageMode, updateUrl = true) => {
    setPreviousPage(pageMode);
    setPageMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (updateUrl) {
      const path =
        mode === 'landing' ? '/' : mode === 'dashboard' ? '/app' : `/${mode}`;
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
      }
    }
  };

  const handleStartAnalysis = () => {
    const consent = getTermsConsent();
    if (consent) {
      navigateTo('dashboard');
    } else {
      setIsConsentModalOpen(true);
    }
  };

  const handleConsentAccepted = () => {
    setIsConsentModalOpen(false);
    navigateTo('dashboard');
  };

  const handleOpenPrivacyFromConsent = () => {
    setReturnToConsent(true);
    setIsConsentModalOpen(false);
    navigateTo('privacy');
  };

  const handleOpenTermsFromConsent = () => {
    setReturnToConsent(true);
    setIsConsentModalOpen(false);
    navigateTo('terms');
  };

  const handleBackFromLegal = () => {
    if (returnToConsent) {
      setReturnToConsent(false);
      navigateTo('landing');
      setIsConsentModalOpen(true);
    } else {
      navigateTo(previousPage === 'dashboard' ? 'dashboard' : 'landing');
    }
  };

  const handleImageSelected = async (base64: string, mimeType: string, hint?: string) => {
    setImagePreview(base64);
    setErrorMessage(null);
    setViewState('analyzing');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64,
          mimeType,
          textHint: hint,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed with status ${response.status}`);
      }

      const data: AnalysisResult = await response.json();

      // Persist to local storage
      saveToHistory(data, base64)
        .then((updated) => setHistory(updated))
        .catch((err) => console.error('Failed to save check to history:', err));

      // Transition to result view
      setTimeout(() => {
        setAnalysisResult(data);
        setViewState('result');
      }, 1500);
    } catch (err: unknown) {
      console.error('Analysis request error:', err);
      const msg = err instanceof Error ? err.message : 'Unable to complete analysis';
      setErrorMessage(msg);
      setViewState('home');
    }
  };

  const handleReset = () => {
    setImagePreview('');
    setAnalysisResult(null);
    setErrorMessage(null);
    setViewState('home');
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setAnalysisResult(item.result);
    setImagePreview(item.thumbnail || '');
    setErrorMessage(null);
    setViewState('result');
  };

  const handleClearAllHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleDeleteSingleHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteHistoryItem(id);
    setHistory(updated);
  };

  const triggerGlobalUpload = () => {
    if (viewState === 'home') {
      const uploadBtn = document.getElementById('upload-action-btn');
      uploadBtn?.click();
    } else {
      globalFileInputRef.current?.click();
    }
  };

  const handleGlobalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        handleImageSelected(base64, file.type, file.name);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // 1. PRIVACY POLICY PAGE
  if (pageMode === 'privacy') {
    return <PrivacyPolicy onBack={handleBackFromLegal} />;
  }

  // 2. TERMS AND CONDITIONS PAGE
  if (pageMode === 'terms') {
    return <TermsAndConditions onBack={handleBackFromLegal} />;
  }

  // 3. LANDING PAGE
  if (pageMode === 'landing') {
    return (
      <>
        <LandingPage
          onStartAnalysis={handleStartAnalysis}
          onOpenPrivacy={() => navigateTo('privacy')}
          onOpenTerms={() => navigateTo('terms')}
        />

        {/* Required First-Use Consent Modal */}
        <TermsConsentModal
          isOpen={isConsentModalOpen}
          onClose={() => setIsConsentModalOpen(false)}
          onConsentAccepted={handleConsentAccepted}
          onOpenPrivacy={handleOpenPrivacyFromConsent}
          onOpenTerms={handleOpenTermsFromConsent}
        />
      </>
    );
  }

  // 4. MAIN APP DASHBOARD
  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#141414] flex flex-col justify-between selection:bg-[#FF5500] selection:text-white">
      {/* Hidden Global File Input for BottomNav action */}
      <input
        type="file"
        ref={globalFileInputRef}
        onChange={handleGlobalFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        id="global-hidden-file-input"
      />

      {/* Main Container */}
      <div className="w-full flex-1 flex flex-col">
        <Navbar
          currentView={viewState}
          onReset={handleReset}
          onNavigateLanding={() => navigateTo('landing')}
        />

        <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-2 pb-24">
          {errorMessage && (
            <div 
              id="analysis-error-banner"
              className="w-full mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={handleReset}
                className="px-2.5 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-900 font-semibold text-[11px] flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {viewState === 'home' && (
            <UploadCard onImageSelected={handleImageSelected} />
          )}

          {viewState === 'analyzing' && (
            <AnalyzingView
              imagePreview={imagePreview}
              onCancel={handleReset}
            />
          )}

          {viewState === 'result' && analysisResult && (
            <ResultView
              result={analysisResult}
              imagePreview={imagePreview}
              onReset={handleReset}
            />
          )}

          {viewState === 'history' && (
            <HistoryView
              history={history}
              onSelectHistoryItem={handleSelectHistoryItem}
              onClearHistory={handleClearAllHistory}
              onDeleteItem={handleDeleteSingleHistoryItem}
              onNewCheck={handleReset}
            />
          )}
        </main>
      </div>

      {/* Mobile-first Minimal Floating Dock */}
      <BottomNav
        currentView={viewState}
        onNavigateHome={handleReset}
        onTriggerAnalyze={triggerGlobalUpload}
        onNavigateHistory={() => setViewState('history')}
      />

      {/* Required Consent Modal fallback if accessed directly without consent */}
      <TermsConsentModal
        isOpen={isConsentModalOpen}
        onClose={() => {
          setIsConsentModalOpen(false);
          navigateTo('landing');
        }}
        onConsentAccepted={handleConsentAccepted}
        onOpenPrivacy={handleOpenPrivacyFromConsent}
        onOpenTerms={handleOpenTermsFromConsent}
      />
    </div>
  );
}
