import type { SessionState, PlayerState, GameMode, VerbLevel, ConsonantGradationSessionState } from '../types';

interface ResultsScreenProps {
  session: SessionState | null;
  player: PlayerState;
  mode: GameMode;
  levels: VerbLevel[];
  onReturnToMenu: () => void;
  onPlayAgain: () => void;
  formatTime: (ms: number) => string;
  gradationSession?: ConsonantGradationSessionState;
}

const MODE_NAMES: Record<GameMode, string> = {
  'menu': '',
  'recall': 'Recall',
  'active-recall': 'Active Recall',
  'conjugation': 'Conjugation',
  'imperfect': 'Imperfect Tense',
  'consonant-gradation': 'Consonant Gradation',
};

export function ResultsScreen({
  session,
  player,
  mode,
  levels,
  onReturnToMenu,
  onPlayAgain,
  formatTime,
  gradationSession,
}: ResultsScreenProps) {
  // Handle consonant gradation mode
  const isGradationMode = mode === 'consonant-gradation';
  
  let timeMs: number;
  let isPerfect: boolean;
  let wrongCount: number;
  let totalQuestions: number;
  let accuracy: number;
  
  if (isGradationMode && gradationSession) {
    timeMs = gradationSession.endTime! - gradationSession.startTime!;
    isPerfect = gradationSession.wrongCount === 0;
    wrongCount = gradationSession.wrongCount;
    totalQuestions = gradationSession.questions.length;
    accuracy = Math.round(((totalQuestions - wrongCount) / totalQuestions) * 100);
  } else if (session) {
    timeMs = session.endTime! - session.startTime!;
    isPerfect = session.wrongCount === 0;
    wrongCount = session.wrongCount;
    const totalAttempts = session.verbs.reduce((sum, v) => sum + v.correctCount, 0) + session.wrongCount;
    accuracy = Math.round(((totalAttempts - session.wrongCount) / totalAttempts) * 100);
    totalQuestions = session.verbs.length;
  } else {
    return null;
  }
  
  const levelKey = [...levels].sort().join('+');
  const bestTime = player.bestTimes.find(
    (t) => t.mode === mode && (isGradationMode || [...t.levels].sort().join('+') === levelKey)
  );
  const isNewRecord = bestTime && bestTime.timeMs === timeMs;

  // Check what was unlocked
  const checkUnlock = () => {
    if (mode === 'recall' && isPerfect) {
      return { unlocked: true, next: 'Active Recall', desc: 'English → Finnish' };
    }
    if (mode === 'active-recall' && isPerfect) {
      return { unlocked: true, next: 'Conjugation', desc: 'Conjugate all verb forms' };
    }
    if (mode === 'conjugation' && isPerfect) {
      return { unlocked: true, next: 'Imperfect Tense', desc: 'Past tense conjugation practice' };
    }
    return { unlocked: false, next: '', desc: '' };
  };

  const unlock = checkUnlock();

  return (
    <div className="results-screen">
      <h1 className="results-title">
        {isPerfect ? 'PERFECT!' : 'COMPLETED'}
      </h1>

      <div className="results-mode">{MODE_NAMES[mode]}</div>

      {!isGradationMode && (
        <div className="results-levels">
          {levels.map((level) => (
            <span key={level} className="level-badge">{level}</span>
          ))}
        </div>
      )}

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
          <span className={`result-value ${wrongCount === 0 ? 'perfect' : 'mistakes'}`}>
            {wrongCount}
          </span>
        </div>

        <div className="result-item">
          <span className="result-label">{isGradationMode ? 'Questions' : 'Verbs'}</span>
          <span className="result-value">{totalQuestions}</span>
        </div>

        {bestTime && !isNewRecord && (
          <div className="result-item">
            <span className="result-label">Best Time</span>
            <span className="result-value best">{formatTime(bestTime.timeMs)}</span>
          </div>
        )}
      </div>

      {unlock.unlocked && (
        <div className="unlock-notice">
          <h3>🎉 {unlock.next} Unlocked!</h3>
          <p>{unlock.desc} for {levels.join(' + ')}</p>
        </div>
      )}

      {!isPerfect && (
        <div className="hint-notice">
          Complete with 0 mistakes to unlock the next mode
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
