import type { PlayerState, GameMode, VocabularySessionState, CasesSessionState, VerbTypeSessionState, PartitiveSessionState, PluralSessionState, GenitiveSessionState, StemSessionState, LyricsSessionState } from '../types';
import { StarIcon, TrophyIcon, MapPinIcon, TargetIcon } from './Icons';

interface ResultsScreenProps {
  player: PlayerState;
  mode: GameMode;
  onReturnToMenu: () => void;
  onPlayAgain: () => void;
  formatTime: (ms: number) => string;
  vocabularySession?: VocabularySessionState;
  casesSession?: CasesSessionState;
  verbTypeSession?: VerbTypeSessionState;
  partitiveSession?: PartitiveSessionState;
  pluralSession?: PluralSessionState;
  genitiveSession?: GenitiveSessionState;
  stemSession?: StemSessionState;
  lyricsSession?: LyricsSessionState;
}

const MODE_NAMES: Record<GameMode, string> = {
  'menu': '',
  'vocabulary-recall': 'Vocabulary Recall',
  'vocabulary-active-recall': 'Vocabulary Active Recall',
  'vocabulary-memorise': 'Opettele',
  'cases-fill-blank': 'Cases Fill in the Blank',
  'cases-fill-blank-plural': 'Plural Cases (Monikko)',
  'verb-type-present': 'Present Tense Conjugation',
  'verb-type-negative': 'Present Negative Conjugation',
  'verb-type-imperfect': 'Past Tense Conjugation',
  'verb-type-imperfect-negative': 'Past Negative Conjugation',
  'partitive': 'Partitive Case Practice',
  'partitive-plural': 'Partitive Plural Practice',
  'plural': 'Nominative Plural Practice',
  'genitive': 'Genitive Case Practice',
  'genitive-plural': 'Genitive Plural Practice',
  'stem': 'Word Stem Practice',
  'lyrics': 'Song Lyrics Learning',
};

export function ResultsScreen({
  player,
  mode,
  onReturnToMenu,
  onPlayAgain,
  formatTime,
  vocabularySession,
  casesSession,
  verbTypeSession,
  partitiveSession,
  pluralSession,
  genitiveSession,
  stemSession,
  lyricsSession,
}: ResultsScreenProps) {
  // Handle different modes
  const isVocabularyMode = mode === 'vocabulary-recall' || mode === 'vocabulary-active-recall';
  const isMemoriseMode = mode === 'vocabulary-memorise';
  const isCasesMode = mode === 'cases-fill-blank' || mode === 'cases-fill-blank-plural';
  const isVerbTypeMode = mode === 'verb-type-present' || mode === 'verb-type-negative' || 
                         mode === 'verb-type-imperfect' || mode === 'verb-type-imperfect-negative';
  const isPartitiveMode = mode === 'partitive' || mode === 'partitive-plural';
  const isPluralMode = mode === 'plural';
  const isGenitiveMode = mode === 'genitive' || mode === 'genitive-plural';
  const isStemMode = mode === 'stem';
  const isLyricsMode = mode === 'lyrics';
  
  let timeMs: number;
  let isPerfect: boolean;
  let wrongCount: number;
  let totalQuestions: number;
  let accuracy: number;
  
  if ((isVocabularyMode || isMemoriseMode) && vocabularySession) {
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
  } else if (isPluralMode && pluralSession) {
    timeMs = pluralSession.endTime! - pluralSession.startTime!;
    isPerfect = pluralSession.wrongCount === 0;
    wrongCount = pluralSession.wrongCount;
    totalQuestions = pluralSession.words.length;
    const totalAttempts = pluralSession.words.reduce((sum, w) => sum + w.correctCount, 0) + pluralSession.wrongCount;
    accuracy = totalAttempts > 0 ? Math.round(((totalAttempts - pluralSession.wrongCount) / totalAttempts) * 100) : 100;
  } else if (isGenitiveMode && genitiveSession) {
    timeMs = genitiveSession.endTime! - genitiveSession.startTime!;
    isPerfect = genitiveSession.wrongCount === 0;
    wrongCount = genitiveSession.wrongCount;
    totalQuestions = genitiveSession.words.length;
    const totalAttempts = genitiveSession.words.reduce((sum, w) => sum + w.correctCount, 0) + genitiveSession.wrongCount;
    accuracy = totalAttempts > 0 ? Math.round(((totalAttempts - genitiveSession.wrongCount) / totalAttempts) * 100) : 100;
  } else if (isStemMode && stemSession) {
    timeMs = stemSession.endTime! - stemSession.startTime!;
    isPerfect = stemSession.wrongCount === 0;
    wrongCount = stemSession.wrongCount;
    totalQuestions = stemSession.words.length;
    const totalAttempts = stemSession.words.reduce((sum, w) => sum + w.correctCount, 0) + stemSession.wrongCount;
    accuracy = totalAttempts > 0 ? Math.round(((totalAttempts - stemSession.wrongCount) / totalAttempts) * 100) : 100;
  } else if (isLyricsMode && lyricsSession) {
    timeMs = lyricsSession.endTime! - lyricsSession.startTime!;
    isPerfect = lyricsSession.wrongCount === 0;
    wrongCount = lyricsSession.wrongCount;
    const isWordMode = lyricsSession.subMode === 'word-match' || lyricsSession.subMode === 'word-recall';
    totalQuestions = isWordMode ? lyricsSession.words.length : lyricsSession.lines.length;
    const items = isWordMode ? lyricsSession.words : lyricsSession.lines;
    const totalAttempts = items.reduce((sum, item) => sum + item.correctCount, 0) + lyricsSession.wrongCount;
    accuracy = totalAttempts > 0 ? Math.round(((totalAttempts - lyricsSession.wrongCount) / totalAttempts) * 100) : 100;
  } else {
    return null;
  }
  
  const bestTime = player.bestTimes.find((t) => t.mode === mode);
  const isNewRecord = bestTime && bestTime.timeMs === timeMs;

  return (
    <div className="results-screen">
      <h1 className="results-title">
        {isPerfect ? 'PERFECT!' : 'COMPLETED'}
      </h1>

      <div className={`results-mode ${isVocabularyMode || isMemoriseMode ? 'vocabulary' : ''} ${isCasesMode ? 'cases' : ''} ${isVerbTypeMode ? 'verb-type' : ''} ${isPartitiveMode ? 'partitive' : ''} ${isPluralMode ? 'plural' : ''} ${isGenitiveMode ? 'genitive' : ''} ${isStemMode ? 'stem' : ''} ${isLyricsMode ? 'lyrics' : ''}`}>
        {isCasesMode && <MapPinIcon size={20} />}
        {isVerbTypeMode && <TargetIcon size={20} />}
        {isPartitiveMode && <TargetIcon size={20} />}
        {isPluralMode && <TargetIcon size={20} />}
        {isGenitiveMode && <TargetIcon size={20} />}
        {isStemMode && <TargetIcon size={20} />}
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

      {isPluralMode && pluralSession && (
        <div className="results-partitive-rules">
          {pluralSession.selectedRules.map((rule) => (
            <span key={rule} className="rule-badge">{rule}</span>
          ))}
        </div>
      )}

      {isGenitiveMode && genitiveSession && (
        <div className="results-partitive-rules">
          {genitiveSession.selectedRules.map((rule) => (
            <span key={rule} className="rule-badge">{rule}</span>
          ))}
        </div>
      )}

      {isStemMode && stemSession && (
        <div className="results-partitive-rules">
          {stemSession.selectedRules.map((rule) => (
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
            {isVocabularyMode ? 'Words' : isCasesMode ? 'Sentences' : isVerbTypeMode ? 'Verbs' : isPartitiveMode ? 'Words' : isPluralMode ? 'Words' : isGenitiveMode ? 'Words' : isStemMode ? 'Words' : isLyricsMode ? (lyricsSession?.subMode === 'word-match' || lyricsSession?.subMode === 'word-recall' ? 'Words' : 'Lines') : 'Verbs'}
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
