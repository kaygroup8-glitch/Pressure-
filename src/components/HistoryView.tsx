import React from 'react';
import { HistoryItem } from '../types';
import { Trash2, ArrowUpRight, Clock, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

interface HistoryViewProps {
  history: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
  onDeleteItem: (id: string, e: React.MouseEvent) => void;
  onNewCheck: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectHistoryItem,
  onClearHistory,
  onDeleteItem,
  onNewCheck,
}) => {
  const formatTime = (ts: number) => {
    const d = new Date(ts);
    const now = new Date();
    const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();

    const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (isToday) {
      return `Today, ${timeStr}`;
    }
    return `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${timeStr}`;
  };

  const getLevelBadge = (level: 'low' | 'medium' | 'high') => {
    if (level === 'high') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/20">
          <ShieldAlert className="w-3 h-3" />
          <span>High Pressure</span>
        </span>
      );
    }
    if (level === 'medium') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <AlertTriangle className="w-3 h-3" />
          <span>Medium Pressure</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <ShieldCheck className="w-3 h-3" />
        <span>Low Pressure</span>
      </span>
    );
  };

  return (
    <div className="w-full flex flex-col pt-2 pb-8">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-5 px-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141414] tracking-tight">
            History
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-0.5">
            Locally saved message checks
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            id="clear-all-history-btn"
            onClick={onClearHistory}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-500 hover:text-red-600 hover:bg-red-50 border border-neutral-200/80 transition-colors"
            title="Clear all saved history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Empty State */}
      {history.length === 0 ? (
        <div 
          id="history-empty-card"
          className="w-full rounded-3xl p-10 bg-white border border-neutral-200/80 shadow-xs flex flex-col items-center text-center my-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#141414] mb-1">
            No checks yet
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mb-6 leading-relaxed">
            Messages you check will be stored in your browser so you can quickly review past findings anytime.
          </p>
          <button
            type="button"
            id="history-empty-check-btn"
            onClick={onNewCheck}
            className="px-6 py-3 rounded-full bg-[#141414] text-white hover:bg-neutral-800 text-xs sm:text-sm font-bold active:scale-95 transition-all shadow-xs"
          >
            Check a message
          </button>
        </div>
      ) : (
        /* History Items List */
        <div className="flex flex-col gap-3" id="history-items-list">
          {history.map((item) => (
            <div
              key={item.id}
              id={`history-item-${item.id}`}
              onClick={() => onSelectHistoryItem(item)}
              className="group cursor-pointer w-full rounded-3xl p-5 bg-white border border-neutral-200/90 hover:border-neutral-400 shadow-2xs hover:shadow-xs transition-all flex flex-col gap-3 relative select-none active:scale-[0.99]"
            >
              {/* Top row: Timestamp & Badges */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {getLevelBadge(item.result.pressureLevel)}
                  <span className="text-xs font-extrabold text-[#141414] bg-neutral-100 px-2 py-0.5 rounded-full">
                    {item.result.score} SCORE
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-neutral-400 font-medium">
                    {formatTime(item.timestamp)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => onDeleteItem(item.id, e)}
                    className="p-1.5 rounded-full text-neutral-300 hover:text-red-600 hover:bg-neutral-100 transition-colors opacity-80 group-hover:opacity-100"
                    title="Delete this check"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Middle row: Content preview & Thumbnail */}
              <div className="flex items-start gap-4">
                {item.thumbnail && (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-neutral-900 shrink-0 border border-neutral-200">
                    <img
                      src={item.thumbnail}
                      alt="Message preview thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                    Request
                  </span>
                  <p className="text-sm sm:text-base font-bold text-[#141414] leading-snug line-clamp-2">
                    "{item.result.request}"
                  </p>
                  <p className="text-xs text-neutral-500 font-medium mt-1 line-clamp-1">
                    {item.result.summary}
                  </p>
                </div>
              </div>

              {/* Bottom row: Tactics chip & Open prompt */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                <span className="text-[11px] text-neutral-500 font-medium">
                  {item.result.tactics.length === 0
                    ? 'No coercive tactics found'
                    : `${item.result.tactics.length} tactic${item.result.tactics.length > 1 ? 's' : ''} detected`}
                </span>

                <span className="text-xs font-bold text-neutral-700 group-hover:text-[#FF5500] flex items-center gap-1 transition-colors">
                  <span>View findings</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
