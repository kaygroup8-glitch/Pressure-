import { AnalysisResult, HistoryItem } from '../types';

const STORAGE_KEY = 'pressure_analysis_history_v1';
const MAX_HISTORY_ITEMS = 25;

/**
 * Creates a lightweight thumbnail from a base64 image data URL to preserve localStorage quota.
 */
export async function createThumbnail(base64: string, maxWidth = 200): Promise<string> {
  if (!base64 || !base64.startsWith('data:image')) {
    return '';
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(base64.length < 50000 ? base64 : '');
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // Export as compact JPEG
      resolve(canvas.toDataURL('image/jpeg', 0.65));
    };
    img.onerror = () => {
      resolve('');
    };
    img.src = base64;
  });
}

export function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn('Failed to read analysis history from localStorage:', err);
    return [];
  }
}

export async function saveToHistory(
  result: AnalysisResult,
  imagePreview?: string
): Promise<HistoryItem[]> {
  try {
    const existing = loadHistory();
    let thumbnail = '';
    if (imagePreview) {
      thumbnail = await createThumbnail(imagePreview);
    }

    const newItem: HistoryItem = {
      id: `check_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      result,
      thumbnail: thumbnail || undefined,
    };

    // Prepend new item and enforce limit
    const updated = [newItem, ...existing.filter((item) => item.id !== newItem.id)].slice(
      0,
      MAX_HISTORY_ITEMS
    );

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (quotaError) {
      console.warn('LocalStorage quota exceeded. Trimming older entries...', quotaError);
      // Trim to half and retry
      const trimmed = updated.slice(0, 10);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      return trimmed;
    }

    return updated;
  } catch (err) {
    console.error('Error saving item to history:', err);
    return loadHistory();
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear history from localStorage:', err);
  }
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  try {
    const existing = loadHistory();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn('Failed to delete history item:', err);
    return loadHistory();
  }
}
