import type { SessionState, PlayerState, GameMode } from '../types';

interface ResultsScreenProps {
  session: SessionState;
  player: PlayerState;
  mode: GameMode;
  onReturnToMenu: () => void;
  onPlayAgain: () => void;
  formatTime: (ms: number) => string;
}

export function ResultsScreen({
  session,
  player,
  mode,
  onReturnToMenu,
  onPlayAgain,
  formatTime,
}: ResultsScreenProps) {
  const timeMs = session.endTime! - session.startTime!;
  const isPerfect = session.wrongCount === 0;
  const bestTime = player.bestTimes.find((t) => t.mode === mode);
  const isNewRecord = bestTime && bestTime.timeMs === timeMs;
  
  const totalAttempts = session.verbs.reduce((sum, v) => sum + v.correctCount, 0) + session.wrongCount;
  const accuracy = Math.round(((totalAttempts - session.wrongCount) / totalAttempts) * 100);

  const unlockedActiveRecall = mode === 'recall' && isPerfect && !player.recallCompleted;

  return (
    <div className="results-screen">
      <h1 className="results-title">
        {isPerfect ? 'PERFECT!' : 'COMPLETED'}
      </h1>

      {isNewRecord && (
        <div className="new-record">★ NEW RECORD ★</div>
      )}

      <div className="results-stats">
        <div className="result-item main-time">
          <span className="result-label">Time</span>
          <span className="result-value">{formatTime(timeMs)}</span>
        </div>

        <div className="result-item">
          <span className="result-label">Accuracy</span>
          <span className={`result-value ${isPerfect ? 'perfect' : ''}`}>
            {accuracy}%
          </span>
        </div>

        <div className="result-item">
          <span className="result-label">Mistakes</span>
          <span className={`result-value ${session.wrongCount === 0 ? 'perfect' : 'mistakes'}`}>
            {session.wrongCount}
          </span>
        </div>

        <div className="result-item">
          <span className="result-label">Verbs</span>
          <span className="result-value">{session.verbs.length}</span>
        </div>

        {bestTime && !isNewRecord && (
          <div className="result-item">
            <span className="result-label">Best Time</span>
            <span className="result-value best">{formatTime(bestTime.timeMs)}</span>
          </div>
        )}
      </div>

      {unlockedActiveRecall && (
        <div className="unlock-notice">
          <h3>🎉 Active Recall Unlocked!</h3>
          <p>You can now practice English → Finnish</p>
        </div>
      )}

      {!isPerfect && mode === 'recall' && (
        <div className="hint-notice">
          Complete with 0 mistakes to unlock Active Recall
        </div>
      )}

      <div className="results-actions">
        <button onClick={onPlayAgain} className="primary">
          Play Again
        </button>
        <button onClick={onReturnToMenu}>
          Menu
        </button>
      </div>
    </div>
  );
}

