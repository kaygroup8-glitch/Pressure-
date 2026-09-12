export type PressureLevel = 'low' | 'medium' | 'high';

export interface PressureTactic {
  name: string;
  explanation: string;
}

export interface AnalysisResult {
  pressureLevel: PressureLevel;
  score: number;
  summary: string;
  request: string;
  tactics: PressureTactic[];
  riskContext: string;
  recommendedAction: string;
  pauseQuestion: string;
  _note?: string;
}

export type ViewState = 'home' | 'analyzing' | 'result' | 'history';

export type PageMode = 'landing' | 'dashboard' | 'privacy' | 'terms';

export interface HistoryItem {
  id: string;
  timestamp: number;
  result: AnalysisResult;
  thumbnail?: string;
}

export interface DemoExample {
  id: string;
  title: string;
  previewLabel: string;
  senderName: string;
  senderDetail?: string;
  timeString: string;
  messageText: string;
  expectedLevel: PressureLevel;
  tag: string;
}
