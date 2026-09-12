export const CURRENT_TERMS_VERSION = '1.0';
const CONSENT_STORAGE_KEY = 'pressure_terms_consent';

export interface TermsConsent {
  termsAccepted: boolean;
  termsAcceptedAt: string;
  termsVersion: string;
}

export function getTermsConsent(): TermsConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const data: TermsConsent = JSON.parse(raw);
    if (data && data.termsAccepted && data.termsVersion === CURRENT_TERMS_VERSION) {
      return data;
    }
    return null;
  } catch (err) {
    console.warn('Failed to read terms consent from localStorage:', err);
    return null;
  }
}

export function saveTermsConsent(): TermsConsent {
  const consent: TermsConsent = {
    termsAccepted: true,
    termsAcceptedAt: new Date().toISOString(),
    termsVersion: CURRENT_TERMS_VERSION,
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch (err) {
    console.warn('Failed to persist terms consent:', err);
  }
  return consent;
}
