import type { SessionState, PlayerState, GameMode, VerbLevel, ConsonantGradationSessionState, VocabularySessionState } from '../types';
import { StarIcon, TrophyIcon } from './Icons';

interface ResultsScreenProps {
  session: SessionState | null;
  player: PlayerState;
  mode: GameMode;
  levels: VerbLevel[];
  onReturnToMenu: () => void;
  onPlayAgain: () => void;
  formatTime: (ms: number) => string;
  gradationSession?: ConsonantGradationSessionState;
  vocabularySession?: VocabularySessionState;
}

const MODE_NAMES: Record<GameMode, string> = {
  'menu': '',
  'recall': 'Recall',
  'active-recall': 'Active Recall',
  'conjugation': 'Conjugation',
  'imperfect': 'Imperfect Tense',
  'consonant-gradation': 'Consonant Gradation',
  'vocabulary-recall': 'Vocabulary Recall',
  'vocabulary-active-recall': 'Vocabulary Active Recall',
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
  vocabularySession,
}: ResultsScreenProps) {
  // Handle different modes
  const isGradationMode = mode === 'consonant-gradation';
  const isVocabularyMode = mode === 'vocabulary-recall' || mode === 'vocabulary-active-recall';
  
  let timeMs: number;
  let isPerfect: boolean;
  let wrongCount: number;
  let totalQuestions: number;
  let accuracy: number;
  
  if (isGradationMode && gradationSession) {
    timeMs = gradationSession.endTime! - gradationSession.startTime!;
    isPerfect = gradationSession.wrongCount === 0;
    wrongCount = gradationSession.wrongCount;
    totalQuestions = gradationSession.currentQuestionIndex || 1; // Fallback if not tracked
    accuracy = totalQuestions > 0 ? Math.round(((totalQuestions - wrongCount) / totalQuestions) * 100) : 100;
  } else if (isVocabularyMode && vocabularySession) {
    timeMs = vocabularySession.endTime! - vocabularySession.startTime!;
    isPerfect = vocabularySession.wrongCount === 0;
    wrongCount = vocabularySession.wrongCount;
    totalQuestions = vocabularySession.words.length;
    const totalAttempts = vocabularySession.words.reduce((sum, w) => sum + w.correctCount, 0) + vocabularySession.wrongCount;
    accuracy = totalAttempts > 0 ? Math.round(((totalAttempts - vocabularySession.wrongCount) / totalAttempts) * 100) : 100;
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
    (t) => t.mode === mode && (isGradationMode || isVocabularyMode || [...t.levels].sort().join('+') === levelKey)
  );
  const isNewRecord = bestTime && bestTime.timeMs === timeMs;

  // Check what was unlocked (only for verb arena modes)
  const checkUnlock = () => {
    if (isVocabularyMode) return { unlocked: false, next: '', desc: '' };
    
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

      <div className={`results-mode ${isVocabularyMode ? 'vocabulary' : ''}`}>
        {MODE_NAMES[mode]}
      </div>

      {!isGradationMode && !isVocabularyMode && (
        <div className="results-levels">
          {levels.map((level) => (
            <span key={level} className="level-badge">{level}</span>
          ))}
        </div>
      )}

      {isVocabularyMode && vocabularySession && (
        <div className="results-tavoites">
          <span className="tavoite-badge">
            {vocabularySession.selectedTavoites.length} Tavoite{vocabularySession.selectedTavoites.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {isNewRecord && (
        <div className="new-record"><StarIcon size={20} color="#4caf50" /> NEW RECORD <StarIcon size={20} color="#4caf50" /></div>
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
          <span className="result-label">
            {isGradationMode ? 'Questions' : isVocabularyMode ? 'Words' : 'Verbs'}
          </span>
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
          <h3><TrophyIcon size={20} color="#4caf50" /> {unlock.next} Unlocked!</h3>
          <p>{unlock.desc} for {levels.join(' + ')}</p>
        </div>
      )}

      {!isPerfect && !isVocabularyMode && (
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
