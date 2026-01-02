import type { SessionState, PlayerState, GameMode, VerbLevel, ConsonantGradationSessionState, VocabularySessionState, CasesSessionState, VerbTypeSessionState, PartitiveSessionState, LyricsSessionState } from '../types';
import { StarIcon, TrophyIcon, MapPinIcon, TargetIcon } from './Icons';

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
  casesSession?: CasesSessionState;
  verbTypeSession?: VerbTypeSessionState;
  partitiveSession?: PartitiveSessionState;
  lyricsSession?: LyricsSessionState;
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
  'vocabulary-memorise': 'Opettele',
  'cases-fill-blank': 'Cases Fill in the Blank',
  'verb-type-present': 'Present Tense Conjugation',
  'verb-type-imperfect': 'Past Tense Conjugation',
  'partitive': 'Partitive Case Practice',
  'lyrics': 'Song Lyrics Learning',
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
  casesSession,
  verbTypeSession,
  partitiveSession,
  lyricsSession,
}: ResultsScreenProps) {
  // Handle different modes
  const isGradationMode = mode === 'consonant-gradation';
  const isVocabularyMode = mode === 'vocabulary-recall' || mode === 'vocabulary-active-recall';
  const isMemoriseMode = mode === 'vocabulary-memorise';
  const isCasesMode = mode === 'cases-fill-blank';
  const isVerbTypeMode = mode === 'verb-type-present' || mode === 'verb-type-imperfect';
  const isPartitiveMode = mode === 'partitive';
  const isLyricsMode = mode === 'lyrics';
  
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
  } else if ((isVocabularyMode || isMemoriseMode) && vocabularySession) {
    timeMs = vocabularySession.endTime! - vocabularySession.startTime!;
    isPerfect = vocabularySession.wrongCount === 0;
    wrongCount = vocabularySession.wrongCount;
    totalQuestions = vocabularySession.words.length;
    const totalAttempts = vocabularySession.words.reduce((sum, w) => sum + w.correctCount, 0) + vocabularySession.wrongCount;
    accuracy = totalAttempts > 0 ? Math.round(((totalAttempts - vocabularySession.wrongCount) / totalAttempts) * 100) : 100;
  } else if (isCasesMode && casesSession) {
    timeMs = casesSession.endTime! - casesSession.startTime!;
    isPerfect = casesSession.wrongCount === 0;
    wrongCount = casesSession.wrongCount;
    totalQuestions = casesSession.sentences.length;
    const totalAttempts = casesSession.sentences.reduce((sum, s) => sum + s.correctCount, 0) + casesSession.wrongCount;
    accuracy = totalAttempts > 0 ? Math.round(((totalAttempts - casesSession.wrongCount) / totalAttempts) * 100) : 100;
  } else if (isVerbTypeMode && verbTypeSession) {
    timeMs = verbTypeSession.endTime! - verbTypeSession.startTime!;
    isPerfect = verbTypeSession.totalWrongCount === 0;
    wrongCount = verbTypeSession.totalWrongCount;
    totalQuestions = verbTypeSession.verbs.length;
    const totalForms = verbTypeSession.verbs.reduce((sum, v) => sum + v.forms.length, 0);
    const totalCorrect = totalForms - wrongCount;
    accuracy = totalForms > 0 ? Math.round((totalCorrect / totalForms) * 100) : 100;
  } else if (isPartitiveMode && partitiveSession) {
    timeMs = partitiveSession.endTime! - partitiveSession.startTime!;
    isPerfect = partitiveSession.wrongCount === 0;
    wrongCount = partitiveSession.wrongCount;
    totalQuestions = partitiveSession.words.length;
    const totalAttempts = partitiveSession.words.reduce((sum, w) => sum + w.correctCount, 0) + partitiveSession.wrongCount;
    accuracy = totalAttempts > 0 ? Math.round(((totalAttempts - partitiveSession.wrongCount) / totalAttempts) * 100) : 100;
  } else if (isLyricsMode && lyricsSession) {
    timeMs = lyricsSession.endTime! - lyricsSession.startTime!;
    isPerfect = lyricsSession.wrongCount === 0;
    wrongCount = lyricsSession.wrongCount;
    const isWordMode = lyricsSession.subMode === 'word-match' || lyricsSession.subMode === 'word-recall';
    totalQuestions = isWordMode ? lyricsSession.words.length : lyricsSession.lines.length;
    const items = isWordMode ? lyricsSession.words : lyricsSession.lines;
    const totalAttempts = items.reduce((sum, item) => sum + item.correctCount, 0) + lyricsSession.wrongCount;
    accuracy = totalAttempts > 0 ? Math.round(((totalAttempts - lyricsSession.wrongCount) / totalAttempts) * 100) : 100;
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
    (t) => t.mode === mode && (isGradationMode || isVocabularyMode || isCasesMode || [...t.levels].sort().join('+') === levelKey)
  );
  const isNewRecord = bestTime && bestTime.timeMs === timeMs;

  // Check what was unlocked (only for verb arena modes)
  const checkUnlock = () => {
    if (isVocabularyMode || isCasesMode) return { unlocked: false, next: '', desc: '' };
    
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

      <div className={`results-mode ${isVocabularyMode || isMemoriseMode ? 'vocabulary' : ''} ${isCasesMode ? 'cases' : ''} ${isVerbTypeMode ? 'verb-type' : ''} ${isPartitiveMode ? 'partitive' : ''} ${isLyricsMode ? 'lyrics' : ''}`}>
        {isCasesMode && <MapPinIcon size={20} />}
        {isVerbTypeMode && <TargetIcon size={20} />}
        {isPartitiveMode && <TargetIcon size={20} />}
        {isLyricsMode && '🎵'}
        {MODE_NAMES[mode]}
      </div>

      {isVerbTypeMode && verbTypeSession && (
        <div className="results-verb-types">
          {verbTypeSession.selectedTypes.map((type) => (
            <span key={type} className="type-badge">Type {type}</span>
          ))}
        </div>
      )}

      {isPartitiveMode && partitiveSession && (
        <div className="results-partitive-rules">
          {partitiveSession.selectedRules.map((rule) => (
            <span key={rule} className="rule-badge">{rule}</span>
          ))}
        </div>
      )}

      {isLyricsMode && lyricsSession && (
        <div className="results-lyrics-info">
          <span className="song-badge">🎵 {lyricsSession.songTitle}</span>
          <span className="mode-badge">{lyricsSession.subMode}</span>
        </div>
      )}

      {!isGradationMode && !isVocabularyMode && !isCasesMode && !isVerbTypeMode && !isPartitiveMode && !isLyricsMode && (
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

      {isCasesMode && casesSession && (
        <div className="results-categories">
          {casesSession.selectedCategories.map((cat) => (
            <span key={cat} className="category-badge">{cat}</span>
          ))}
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
            {isGradationMode ? 'Questions' : isVocabularyMode ? 'Words' : isCasesMode ? 'Sentences' : isVerbTypeMode ? 'Verbs' : isPartitiveMode ? 'Words' : isLyricsMode ? (lyricsSession?.subMode === 'word-match' || lyricsSession?.subMode === 'word-recall' ? 'Words' : 'Lines') : 'Verbs'}
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

      {!isPerfect && !isVocabularyMode && !isCasesMode && (
        <div className="hint-notice">
          Complete with 0 mistakes to unlock the next mode
        </div>
      )}

      {isPerfect && isCasesMode && (
        <div className="hint-notice success">
          <TrophyIcon size={16} color="#4caf50" /> Perfect! You've mastered these cases!
        </div>
      )}


      {/* Memorise mode chunk info */}
      <div className="results-actions">
        <button onClick={onPlayAgain} className="primary">
          {isMemoriseMode ? 'Aloita alusta' : 'Play Again'}
        </button>
        <button onClick={onReturnToMenu}>
          {isMemoriseMode ? 'Valikko' : 'Menu'}
        </button>
      </div>
    </div>
  );
}
