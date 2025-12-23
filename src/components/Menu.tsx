import type { GameMode, PlayerState } from '../types';

interface MenuProps {
  player: PlayerState;
  onStartSession: (mode: GameMode) => void;
  onExportTimes: () => void;
  onResetProgress: () => void;
  formatTime: (ms: number) => string;
  verbCount: number;
}

export function Menu({
  player,
  onStartSession,
  onExportTimes,
  onResetProgress,
  formatTime,
  verbCount,
}: MenuProps) {
  const recallBestTime = player.bestTimes.find((t) => t.mode === 'recall');
  const activeRecallBestTime = player.bestTimes.find((t) => t.mode === 'active-recall');
  const isActiveRecallUnlocked = player.recallCompleted;

  return (
    <div className="menu">
      <h1 className="menu-title">Finnish Verb Arena</h1>
      <p className="menu-subtitle">Eliminate all {verbCount} verbs to complete</p>

      <div className="rules-box">
        <h3>How it works</h3>
        <ul>
          <li>Get each verb correct <strong>2 times</strong> to eliminate it</li>
          <li>Wrong answers don't eliminate — keep trying</li>
          <li>Complete all verbs as fast as you can</li>
          <li>Beat your best time!</li>
        </ul>
      </div>

      <div className="menu-modes">
        <button
          className="mode-button"
          onClick={() => onStartSession('recall')}
        >
          <div className="mode-info">
            <span className="mode-name">Recall</span>
            <span className="mode-desc">Finnish → English</span>
          </div>
          <div className="mode-best">
            {recallBestTime ? (
              <>
                <span className="best-label">Best</span>
                <span className="best-time">{formatTime(recallBestTime.timeMs)}</span>
              </>
            ) : (
              <span className="best-label">Not completed</span>
            )}
          </div>
        </button>

        <button
          className={`mode-button ${isActiveRecallUnlocked ? '' : 'locked'}`}
          onClick={() => isActiveRecallUnlocked && onStartSession('active-recall')}
          disabled={!isActiveRecallUnlocked}
        >
          <div className="mode-info">
            <span className="mode-name">Active Recall</span>
            <span className="mode-desc">English → Finnish</span>
          </div>
          <div className="mode-best">
            {!isActiveRecallUnlocked ? (
              <span className="locked-text">Complete Recall with 0 mistakes</span>
            ) : activeRecallBestTime ? (
              <>
                <span className="best-label">Best</span>
                <span className="best-time">{formatTime(activeRecallBestTime.timeMs)}</span>
              </>
            ) : (
              <span className="best-label">Not completed</span>
            )}
          </div>
        </button>
      </div>

      <div className="menu-footer">
        {player.bestTimes.length > 0 && (
          <button onClick={onExportTimes}>Export Times (CSV)</button>
        )}
        <button onClick={onResetProgress} className="danger">
          Reset Progress
        </button>
      </div>
    </div>
  );
}
