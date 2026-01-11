import { useState, useEffect, useRef, useCallback } from 'react';
import type { GameState } from '../types';
import { getTavoiteById } from '../data/tavoiteVocabulary';
import { CASES, CASE_GROUPS } from '../data/finnishCases';
import { PARTITIVE_RULES } from '../data/partitiveData';
import { PLURAL_RULES } from '../data/pluralData';
import { GENITIVE_RULES } from '../data/genitiveData';
import { PIKKUSANA_CATEGORIES } from '../data/pikkusanat';
import { QUESTION_CATEGORIES } from '../data/questionWords';
import { CloseIcon, CheckIcon, MapPinIcon, GlobeIcon, EyeIcon } from './Icons';

interface GameScreenProps {
  state: GameState;
  onSubmit: (answer: string) => void;
  onNextVerb: () => void;
  onClearFeedback: () => void;
  onQuit: () => void;
  formatTime: (ms: number) => string;
}

export function GameScreen({
  state,
  onSubmit,
  onNextVerb,
  onClearFeedback,
  onQuit,
  formatTime,
}: GameScreenProps) {
  const [answer, setAnswer] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { feedback, mode, vocabularySession, currentVocabularyWord, casesSession, currentCaseSentence, verbTypeSession, partitiveSession, currentPartitiveWord, pluralSession, currentPluralWord, genitiveSession, currentGenitiveWord, pikkusanatSession, currentPikkusana, lyricsSession, currentLyricsItem, questionWordSession, currentQuestionWord, currentScenario, currentAnswerScenario } = state;

  useEffect(() => {
    const startTime = vocabularySession?.startTime || casesSession?.startTime || verbTypeSession?.startTime || partitiveSession?.startTime || pluralSession?.startTime || genitiveSession?.startTime || pikkusanatSession?.startTime || lyricsSession?.startTime || questionWordSession?.startTime;
    const isComplete = vocabularySession?.isComplete || casesSession?.isComplete || verbTypeSession?.isComplete || partitiveSession?.isComplete || pluralSession?.isComplete || genitiveSession?.isComplete || pikkusanatSession?.isComplete || lyricsSession?.isComplete || questionWordSession?.isComplete;
    
    if (!startTime || isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [vocabularySession?.startTime, vocabularySession?.isComplete, casesSession?.startTime, casesSession?.isComplete, verbTypeSession?.startTime, verbTypeSession?.isComplete, partitiveSession?.startTime, partitiveSession?.isComplete, pluralSession?.startTime, pluralSession?.isComplete, genitiveSession?.startTime, genitiveSession?.isComplete, pikkusanatSession?.startTime, pikkusanatSession?.isComplete, lyricsSession?.startTime, lyricsSession?.isComplete, questionWordSession?.startTime, questionWordSession?.isComplete]);

  useEffect(() => {
    if (!feedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [feedback, currentVocabularyWord, currentCaseSentence, currentLyricsItem]);

  useEffect(() => {
    if (feedback && feedback.isCorrect) {
      // Auto-advance only for correct answers
      const timeout = setTimeout(() => {
        onClearFeedback();
        setAnswer('');
        setSelectedWords([]);
        onNextVerb();
      }, 400);
      return () => clearTimeout(timeout);
    }
    // Wrong answers require manual click - no auto-close
  }, [feedback, onClearFeedback, onNextVerb]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (answer.trim() && !feedback) {
        onSubmit(answer);
      }
    },
    [answer, feedback, onSubmit]
  );

  const handleContinue = useCallback(() => {
    if (feedback && !feedback.isCorrect) {
      onClearFeedback();
      setAnswer('');
      setShowTranslation(false);
      setSelectedWords([]);
      onNextVerb();
    }
  }, [feedback, onClearFeedback, onNextVerb]);

  // Handle vocabulary modes (including memorise)
  const isVocabularyMode = mode === 'vocabulary-recall' || mode === 'vocabulary-active-recall' || mode === 'vocabulary-memorise';
  const isMemoriseMode = mode === 'vocabulary-memorise';
  
  if (isVocabularyMode) {
    if (!vocabularySession || !currentVocabularyWord) return null;
    
    const activeCount = vocabularySession.words.filter((w) => !w.eliminated).length;
    const eliminatedCount = vocabularySession.words.length - activeCount;
    const currentWordState = vocabularySession.words[vocabularySession.currentWordIndex];
    const hasWrongAnswer = currentWordState.wrongCount > 0;
    
    // For memorise mode, get progress info
    const memoriseRequired = currentWordState.requiredCorrect || 1;
    const memoriseConsecutive = currentWordState.consecutiveCorrect || 0;
    const memoriseDirection = currentWordState.currentDirection || 'finnish-to-english';
    
    // Get tavoite info for display
    const tavoiteNames = vocabularySession.selectedTavoites
      .map(id => getTavoiteById(id)?.name || `Tavoite ${id}`)
      .slice(0, 2)
      .join(', ');
    const moreCount = vocabularySession.selectedTavoites.length > 2 
      ? ` +${vocabularySession.selectedTavoites.length - 2}` 
      : '';
    
    const isRecall = mode === 'vocabulary-recall';
    // For memorise mode, direction can change based on required correct count
    const isMemoriseRecall = isMemoriseMode && memoriseDirection === 'finnish-to-english';
    const showFinnish = isRecall || isMemoriseRecall;
    const promptText = showFinnish ? currentVocabularyWord.finnish : currentVocabularyWord.english;
    
    // Dynamic labels based on direction
    let promptLabel: string;
    let placeholderText: string;
    if (isMemoriseMode) {
      if (memoriseDirection === 'finnish-to-english') {
        promptLabel = 'Suomeksi';
        placeholderText = 'Kirjoita englanniksi...';
      } else {
        promptLabel = 'Englanniksi';
        placeholderText = 'Kirjoita suomeksi...';
      }
    } else if (isRecall) {
      promptLabel = 'Finnish';
      placeholderText = 'English translation...';
    } else {
      promptLabel = 'English';
      placeholderText = 'Finnish word...';
    }
    
    return (
      <div className={`game-screen vocabulary-mode ${isMemoriseMode ? 'memorise-game' : ''}`}>
        <div className="game-header">
          <button className="quit-btn" onClick={onQuit}>
            <CloseIcon size={14} /> Lopeta
          </button>
          <div className="timer">{formatTime(elapsedTime)}</div>
          <div className="progress-stats">
            <span className="eliminated">{eliminatedCount}</span>
            <span className="separator">/</span>
            <span className="total">{vocabularySession.words.length}</span>
          </div>
        </div>

        <div className="game-stats-bar">
          <div className="stat-item">
            <span className="stat-label">{isMemoriseMode ? 'Jäljellä' : 'Remaining'}</span>
            <span className="stat-value">{activeCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">{isMemoriseMode ? 'Virheet' : 'Mistakes'}</span>
            <span className="stat-value mistakes">{vocabularySession.wrongCount}</span>
          </div>
          {!isMemoriseMode && (
            <div className="stat-item tavoite-info">
              <span className="stat-label">Tavoites</span>
              <span className="stat-value small">{tavoiteNames}{moreCount}</span>
            </div>
          )}
        </div>

        <div className="prompt-area">
          <div className={`prompt-box vocabulary ${isMemoriseMode ? 'memorise-mode' : ''}`}>
            <div className="prompt-label">{promptLabel}</div>
            <div className="prompt-verb">{promptText}</div>
            
            {isMemoriseMode && (
              <div className="memorise-progress">
                <div className="memorise-progress-dots">
                  {Array.from({ length: memoriseRequired }).map((_, i) => (
                    <span 
                      key={i} 
                      className={`memorise-dot ${i < memoriseConsecutive ? 'filled' : ''}`}
                    />
                  ))}
                </div>
                <span className="memorise-progress-text">
                  {memoriseConsecutive}/{memoriseRequired} oikein
                </span>
              </div>
            )}
            
            {hasWrongAnswer && !isMemoriseMode && (
              <div className="retry-indicator">
                Try again
              </div>
            )}
          </div>
        </div>

        <div className="input-area">
          <form onSubmit={handleSubmit} className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={placeholderText}
              disabled={!!feedback}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              type="submit"
              className="submit-btn"
              disabled={!answer.trim() || !!feedback}
            >
              Enter
            </button>
          </form>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'} ${!feedback.isCorrect ? 'detailed' : ''}`}>
            <div className="feedback-title">
              {feedback.isCorrect ? 'CORRECT!' : 'WRONG'}
            </div>
            
            {!feedback.isCorrect && (
              <div className="feedback-learning">
                <div className="feedback-your-answer">
                  You typed: <span>{feedback.userAnswer}</span>
                </div>
                <div className="feedback-correct-answer">
                  Correct: <span>{feedback.correctAnswer}</span>
                </div>
                
                <div className="feedback-section">
                  <div className="feedback-section-title">Word Pair</div>
                  <div className="vocabulary-pair">
                    <span className="finnish">{currentVocabularyWord.finnish}</span>
                    <span className="arrow">→</span>
                    <span className="english">{currentVocabularyWord.english}</span>
                  </div>
                </div>

                <button className="feedback-continue-btn" onClick={handleContinue}>
                  Continue
                </button>
              </div>
            )}
            
            {feedback.isCorrect && (
              <div className="eliminated-notice"><CheckIcon size={14} color="#f0c674" /> Eliminated!</div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Handle cases mode (Fill in the Blank - singular and plural)
  const isCasesMode = mode === 'cases-fill-blank' || mode === 'cases-fill-blank-plural';
  
  if (isCasesMode) {
    if (!casesSession || !currentCaseSentence) return null;
    
    const activeCount = casesSession.sentences.filter((s) => !s.eliminated).length;
    const eliminatedCount = casesSession.sentences.length - activeCount;
    const currentSentenceState = casesSession.sentences[casesSession.currentSentenceIndex];
    const hasWrongAnswer = currentSentenceState.wrongCount > 0;
    
    const caseInfo = CASES[currentCaseSentence.caseUsed];
    const categoryInfo = CASE_GROUPS.find(g => g.cases.includes(currentCaseSentence.caseUsed));
    
    // Build sentence display with blank
    const renderSentenceWithBlank = () => {
      const parts = currentCaseSentence.sentenceWithBlank.split('___');
      return (
        <div className="case-sentence-fill">
          <span className="case-sentence-part">{parts[0]}</span>
          <span className="case-sentence-blank">___________</span>
          <span className="case-sentence-part">{parts[1] || ''}</span>
        </div>
      );
    };
    
    return (
      <div className="game-screen cases-mode">
        <div className="game-header">
          <button className="quit-btn" onClick={onQuit}>
            <CloseIcon size={14} /> Quit
          </button>
          <div className="timer">{formatTime(elapsedTime)}</div>
          <div className="progress-stats">
            <span className="eliminated">{eliminatedCount}</span>
            <span className="separator">/</span>
            <span className="total">{casesSession.sentences.length}</span>
          </div>
        </div>

        <div className="game-stats-bar cases-stats">
          <div className="stat-item">
            <span className="stat-label">Remaining</span>
            <span className="stat-value">{activeCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mistakes</span>
            <span className="stat-value mistakes">{casesSession.wrongCount}</span>
          </div>
          <div className="stat-item case-category-indicator">
            <span className="stat-label">Case</span>
            <span className="stat-value" style={{ color: categoryInfo?.color }}>
              {categoryInfo?.id === 'location' ? <GlobeIcon size={14} /> : <MapPinIcon size={14} />}
              {caseInfo?.name || currentCaseSentence.caseUsed}
            </span>
          </div>
          {mode === 'cases-fill-blank-plural' && (
            <div className="stat-item plural-indicator">
              <span className="stat-label">Form</span>
              <span className="stat-value plural">Monikko</span>
            </div>
          )}
        </div>

        <div className="prompt-area">
          <div className="cases-prompt-box">
            {/* English translation - hidden by default */}
            <div className={`case-english-context ${showTranslation ? 'visible' : 'hidden'}`}>
              <span className="english-label">English:</span>
              <span className="english-text">{showTranslation ? currentCaseSentence.english : '• • • • •'}</span>
            </div>
            
            <button
              className="reveal-translation-btn"
              onMouseDown={() => setShowTranslation(true)}
              onMouseUp={() => setShowTranslation(false)}
              onMouseLeave={() => setShowTranslation(false)}
              onTouchStart={() => setShowTranslation(true)}
              onTouchEnd={() => setShowTranslation(false)}
            >
              <EyeIcon size={16} /> Hold to see translation
            </button>
            
            {/* Finnish sentence with blank */}
            <div className="case-finnish-sentence">
              {renderSentenceWithBlank()}
            </div>
            
            {/* Base word hint */}
            <div className="case-base-word-hint">
              <span className="hint-label">Word to use:</span>
              <span className="hint-word">{currentCaseSentence.baseWord}</span>
            </div>
            
            {hasWrongAnswer && (
              <div className="retry-indicator">
                Try again
              </div>
            )}
          </div>
        </div>

        <div className="input-area">
          <form onSubmit={handleSubmit} className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type the word in correct case..."
              disabled={!!feedback}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              type="submit"
              className="submit-btn"
              disabled={!answer.trim() || !!feedback}
            >
              Enter
            </button>
          </form>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'} ${!feedback.isCorrect ? 'detailed' : ''}`}>
            <div className="feedback-title">
              {feedback.isCorrect ? 'CORRECT!' : 'WRONG'}
            </div>
            
            {!feedback.isCorrect && (
              <div className="feedback-learning">
                <div className="feedback-your-answer">
                  You answered: <span>{feedback.userAnswer}</span>
                </div>
                <div className="feedback-correct-answer">
                  Correct: <span>{feedback.correctAnswer}</span>
                </div>
                
                {/* Case explanation */}
                <div className="feedback-section case-feedback">
                  <div className="feedback-section-title">Case Information</div>
                  <div className="case-info-card">
                    <div className="case-info-header">
                      <span className="case-name-big">{caseInfo.name}</span>
                      <span className="case-finnish-name">({caseInfo.finnishName})</span>
                    </div>
                    <div className="case-info-details">
                      <div className="case-detail">
                        <span className="detail-label">Ending:</span>
                        <span className="detail-value ending">{caseInfo.ending}</span>
                      </div>
                      <div className="case-detail">
                        <span className="detail-label">Meaning:</span>
                        <span className="detail-value">{caseInfo.meaning}</span>
                      </div>
                      <div className="case-detail">
                        <span className="detail-label">Question:</span>
                        <span className="detail-value question">{caseInfo.question}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Show the rule */}
                {feedback.rule && (
                  <div className="feedback-section">
                    <div className="feedback-section-title">Rule</div>
                    <div className="feedback-section-content">{feedback.rule}</div>
                  </div>
                )}
                
                {/* Show examples */}
                <div className="feedback-section">
                  <div className="feedback-section-title">Examples</div>
                  <div className="case-examples">
                    {caseInfo.examples.map((ex, i) => (
                      <span key={i} className="case-example">{ex}</span>
                    ))}
                  </div>
                </div>

                <button className="feedback-continue-btn" onClick={handleContinue}>
                  Continue
                </button>
              </div>
            )}
            
            {feedback.isCorrect && (
              <div className="eliminated-notice"><CheckIcon size={14} color="#f0c674" /> Eliminated!</div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Handle partitive mode (singular and plural)
  if (mode === 'partitive' || mode === 'partitive-plural') {
    if (!partitiveSession || !currentPartitiveWord) return null;
    
    const activeCount = partitiveSession.words.filter(w => !w.eliminated).length;
    const eliminatedCount = partitiveSession.words.length - activeCount;
    const currentWordState = partitiveSession.words[partitiveSession.currentWordIndex];
    const hasWrongAnswer = currentWordState.wrongCount > 0;
    const isPlural = mode === 'partitive-plural';
    
    const ruleInfo = PARTITIVE_RULES.find(r => r.id === currentPartitiveWord.rule);
    
    // Display word based on mode
    const displayWord = isPlural ? currentPartitiveWord.nominativePlural : currentPartitiveWord.nominative;
    const questionLabel = isPlural ? 'Partitiivi monikko?' : 'Partitiivi?';
    
    return (
      <div className="game-screen partitive-mode">
        <div className="game-header">
          <button className="quit-btn" onClick={onQuit}>
            <CloseIcon size={14} /> Quit
          </button>
          <div className="timer">{formatTime(elapsedTime)}</div>
          <div className="progress-stats">
            <span className="eliminated">{eliminatedCount}</span>
            <span className="separator">/</span>
            <span className="total">{partitiveSession.words.length}</span>
          </div>
        </div>

        <div className="game-stats-bar partitive-stats">
          <div className="stat-item">
            <span className="stat-label">{isPlural ? 'Mode' : 'Rule'}</span>
            <span className="stat-value">{isPlural ? 'Plural' : (ruleInfo?.name || currentPartitiveWord.rule)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mistakes</span>
            <span className="stat-value mistakes">{partitiveSession.wrongCount}</span>
          </div>
        </div>

        <div className="prompt-area">
          <div className="partitive-prompt-box">
            <div className="partitive-word-header">
              <span className="partitive-nominative">{displayWord}</span>
              <span className="partitive-translation">({currentPartitiveWord.translation})</span>
            </div>
            
            <div className="partitive-question">
              <span className="partitive-label">{questionLabel}</span>
            </div>
            
            {hasWrongAnswer && currentPartitiveWord.hint && (
              <div className="partitive-hint">
                <span className="hint-label">Hint:</span>
                <span className="hint-text">{currentPartitiveWord.hint}</span>
              </div>
            )}
          </div>
        </div>

        <div className="input-area">
          <form onSubmit={handleSubmit} className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={isPlural ? "Write the plural partitive form..." : "Write the partitive form..."}
              disabled={!!feedback}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              type="submit"
              className="submit-btn"
              disabled={!answer.trim() || !!feedback}
            >
              Enter
            </button>
          </form>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'} ${!feedback.isCorrect ? 'detailed' : ''}`}>
            <div className="feedback-title">
              {feedback.isCorrect ? 'CORRECT!' : 'WRONG'}
            </div>
            
            {!feedback.isCorrect && (
              <>
                <div className="feedback-answers">
                  <div className="your-answer">
                    <span className="label">Your answer:</span>
                    <span className="answer wrong">{feedback.userAnswer}</span>
                  </div>
                  <div className="correct-answer">
                    <span className="label">Correct:</span>
                    <span className="answer">{feedback.correctAnswer}</span>
                  </div>
                </div>
                
                {feedback.verbTypeInfo && (
                  <div className="feedback-rule-info">
                    <span className="rule-name">{feedback.verbTypeInfo}</span>
                    {feedback.rule && <span className="rule-text">{feedback.rule}</span>}
                  </div>
                )}
              </>
            )}
            
            <button className="continue-btn" onClick={handleContinue}>
              {feedback.isCorrect ? 'Continue' : 'Try Again'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Handle plural mode
  if (mode === 'plural') {
    if (!pluralSession || !currentPluralWord) return null;
    
    const activeCount = pluralSession.words.filter(w => !w.eliminated).length;
    const eliminatedCount = pluralSession.words.length - activeCount;
    const currentWordState = pluralSession.words[pluralSession.currentWordIndex];
    const hasWrongAnswer = currentWordState.wrongCount > 0;
    
    const ruleInfo = PLURAL_RULES.find(r => r.id === currentPluralWord.rule);
    
    return (
      <div className="game-screen plural-mode">
        <div className="game-header">
          <button className="quit-btn" onClick={onQuit}>
            <CloseIcon size={14} /> Quit
          </button>
          <div className="timer">{formatTime(elapsedTime)}</div>
          <div className="progress-stats">
            <span className="eliminated">{eliminatedCount}</span>
            <span className="separator">/</span>
            <span className="total">{pluralSession.words.length}</span>
          </div>
        </div>

        <div className="game-stats-bar plural-stats">
          <div className="stat-item">
            <span className="stat-label">Rule</span>
            <span className="stat-value">{ruleInfo?.name || currentPluralWord.rule}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mistakes</span>
            <span className="stat-value mistakes">{pluralSession.wrongCount}</span>
          </div>
        </div>

        <div className="prompt-area">
          <div className="partitive-prompt-box">
            <div className="partitive-word-header">
              <span className="partitive-nominative">{currentPluralWord.nominative}</span>
              <span className="partitive-translation">({currentPluralWord.translation})</span>
            </div>
            
            <div className="partitive-question">
              <span className="partitive-label">Monikko? (Plural)</span>
            </div>
            
            {hasWrongAnswer && currentPluralWord.hint && (
              <div className="partitive-hint">
                <span className="hint-label">Hint:</span>
                <span className="hint-text">{currentPluralWord.hint}</span>
              </div>
            )}
          </div>
        </div>

        <div className="input-area">
          <form onSubmit={handleSubmit} className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write the plural form..."
              disabled={!!feedback}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              type="submit"
              className="submit-btn"
              disabled={!answer.trim() || !!feedback}
            >
              Enter
            </button>
          </form>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'} ${!feedback.isCorrect ? 'detailed' : ''}`}>
            <div className="feedback-title">
              {feedback.isCorrect ? 'CORRECT!' : 'WRONG'}
            </div>
            
            {!feedback.isCorrect && (
              <>
                <div className="feedback-answers">
                  <div className="your-answer">
                    <span className="label">Your answer:</span>
                    <span className="answer wrong">{feedback.userAnswer}</span>
                  </div>
                  <div className="correct-answer">
                    <span className="label">Correct:</span>
                    <span className="answer">{feedback.correctAnswer}</span>
                  </div>
                </div>
                
                {feedback.verbTypeInfo && (
                  <div className="feedback-rule-info">
                    <span className="rule-name">{feedback.verbTypeInfo}</span>
                    {feedback.rule && <span className="rule-text">{feedback.rule}</span>}
                  </div>
                )}
              </>
            )}
            
            <button className="continue-btn" onClick={handleContinue}>
              {feedback.isCorrect ? 'Continue' : 'Try Again'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Handle genitive mode (singular and plural)
  if (mode === 'genitive' || mode === 'genitive-plural') {
    if (!genitiveSession || !currentGenitiveWord) return null;
    
    const activeCount = genitiveSession.words.filter(w => !w.eliminated).length;
    const eliminatedCount = genitiveSession.words.length - activeCount;
    const currentWordState = genitiveSession.words[genitiveSession.currentWordIndex];
    const hasWrongAnswer = currentWordState.wrongCount > 0;
    const isPlural = mode === 'genitive-plural';
    
    const ruleInfo = GENITIVE_RULES.find(r => r.id === currentGenitiveWord.rule);
    
    // Display word based on mode
    const displayWord = isPlural ? currentGenitiveWord.nominativePlural : currentGenitiveWord.nominative;
    const questionLabel = isPlural ? 'Genetiivi monikko?' : 'Genetiivi?';
    
    return (
      <div className="game-screen genitive-mode">
        <div className="game-header">
          <button className="quit-btn" onClick={onQuit}>
            <CloseIcon size={14} /> Quit
          </button>
          <div className="timer">{formatTime(elapsedTime)}</div>
          <div className="progress-stats">
            <span className="eliminated">{eliminatedCount}</span>
            <span className="separator">/</span>
            <span className="total">{genitiveSession.words.length}</span>
          </div>
        </div>

        <div className="game-stats-bar genitive-stats">
          <div className="stat-item">
            <span className="stat-label">{isPlural ? 'Mode' : 'Rule'}</span>
            <span className="stat-value">{isPlural ? 'Plural' : (ruleInfo?.name || currentGenitiveWord.rule)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mistakes</span>
            <span className="stat-value mistakes">{genitiveSession.wrongCount}</span>
          </div>
        </div>

        <div className="prompt-area">
          <div className="partitive-prompt-box">
            <div className="partitive-word-header">
              <span className="partitive-nominative">{displayWord}</span>
              <span className="partitive-translation">({currentGenitiveWord.translation})</span>
            </div>
            
            <div className="partitive-question">
              <span className="partitive-label">{questionLabel}</span>
            </div>
            
            {hasWrongAnswer && currentGenitiveWord.hint && (
              <div className="partitive-hint">
                <span className="hint-label">Hint:</span>
                <span className="hint-text">{currentGenitiveWord.hint}</span>
              </div>
            )}
          </div>
        </div>

        <div className="input-area">
          <form onSubmit={handleSubmit} className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={isPlural ? "Write the plural genitive form..." : "Write the genitive form..."}
              disabled={!!feedback}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              type="submit"
              className="submit-btn"
              disabled={!answer.trim() || !!feedback}
            >
              Enter
            </button>
          </form>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'} ${!feedback.isCorrect ? 'detailed' : ''}`}>
            <div className="feedback-title">
              {feedback.isCorrect ? 'CORRECT!' : 'WRONG'}
            </div>
            
            {!feedback.isCorrect && (
              <>
                <div className="feedback-answers">
                  <div className="your-answer">
                    <span className="label">Your answer:</span>
                    <span className="answer wrong">{feedback.userAnswer}</span>
                  </div>
                  <div className="correct-answer">
                    <span className="label">Correct:</span>
                    <span className="answer">{feedback.correctAnswer}</span>
                  </div>
                </div>
                
                {feedback.verbTypeInfo && (
                  <div className="feedback-rule-info">
                    <span className="rule-name">{feedback.verbTypeInfo}</span>
                    {feedback.rule && <span className="rule-text">{feedback.rule}</span>}
                  </div>
                )}
              </>
            )}
            
            <button className="continue-btn" onClick={handleContinue}>
              {feedback.isCorrect ? 'Continue' : 'Try Again'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Handle pikkusanat mode
  if (mode === 'pikkusanat') {
    if (!pikkusanatSession || !currentPikkusana) return null;
    
    const activeCount = pikkusanatSession.words.filter(w => !w.eliminated).length;
    const eliminatedCount = pikkusanatSession.words.length - activeCount;
    const currentWordState = pikkusanatSession.words[pikkusanatSession.currentWordIndex];
    const hasWrongAnswer = currentWordState.wrongCount > 0;
    
    const categoryInfo = PIKKUSANA_CATEGORIES.find(c => c.id === currentPikkusana.category);
    
    return (
      <div className="game-screen pikkusanat-mode">
        <div className="game-header">
          <button className="quit-btn" onClick={onQuit}>
            <CloseIcon size={14} /> Quit
          </button>
          <div className="timer">{formatTime(elapsedTime)}</div>
          <div className="progress-stats">
            <span className="eliminated">{eliminatedCount}</span>
            <span className="separator">/</span>
            <span className="total">{pikkusanatSession.words.length}</span>
          </div>
        </div>

        <div className="game-stats-bar pikkusanat-stats">
          <div className="stat-item">
            <span className="stat-label">Category</span>
            <span className="stat-value">{categoryInfo?.name || currentPikkusana.category}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mistakes</span>
            <span className="stat-value mistakes">{pikkusanatSession.wrongCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Remaining</span>
            <span className="stat-value">{activeCount}</span>
          </div>
        </div>

        <div className="prompt-area">
          <div className="partitive-prompt-box">
            <div className="partitive-word-header">
              <span className="partitive-nominative">{currentPikkusana.english}</span>
            </div>
            
            <div className="partitive-question">
              <span className="partitive-label">Mikä on suomeksi? (What is it in Finnish?)</span>
            </div>
            
            {hasWrongAnswer && currentPikkusana.example && (
              <div className="partitive-hint">
                <span className="hint-label">Example:</span>
                <span className="hint-text">{currentPikkusana.example}</span>
                {currentPikkusana.exampleTranslation && (
                  <span className="hint-translation">({currentPikkusana.exampleTranslation})</span>
                )}
              </div>
            )}
            
            {hasWrongAnswer && currentPikkusana.notes && (
              <div className="partitive-hint">
                <span className="hint-label">Note:</span>
                <span className="hint-text">{currentPikkusana.notes}</span>
              </div>
            )}
          </div>
        </div>

        <div className="input-area">
          <form onSubmit={handleSubmit} className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write the Finnish word..."
              disabled={!!feedback}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              type="submit"
              className="submit-btn"
              disabled={!answer.trim() || !!feedback}
            >
              Enter
            </button>
          </form>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
            {feedback.isCorrect ? (
              <div className="feedback-correct">
                <span className="feedback-icon">✓</span>
                <span className="feedback-text">Oikein! (Correct!)</span>
              </div>
            ) : (
              <>
                <div className="feedback-incorrect">
                  <span className="feedback-icon">✗</span>
                  <span className="feedback-text">Väärin (Wrong)</span>
                </div>
                
                <div className="feedback-answers">
                  <div className="your-answer">
                    <span className="label">Your answer:</span>
                    <span className="answer wrong">{feedback.userAnswer}</span>
                  </div>
                  <div className="correct-answer">
                    <span className="label">Correct:</span>
                    <span className="answer">{feedback.correctAnswer}</span>
                  </div>
                </div>
                
                {feedback.verbTypeInfo && (
                  <div className="feedback-rule-info">
                    <span className="rule-name">{feedback.verbTypeInfo}</span>
                    {feedback.rule && <span className="rule-text">{feedback.rule}</span>}
                  </div>
                )}
              </>
            )}
            
            <button className="continue-btn" onClick={handleContinue}>
              {feedback.isCorrect ? 'Continue' : 'Try Again'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Handle question words mode
  if (mode === 'question-words') {
    if (!questionWordSession) return null;
    
    const subMode = questionWordSession.subMode;
    const handleOptionClick = (option: string) => {
      onSubmit(option);
    };
    
    // Calculate progress based on mode
    let activeCount = 0;
    let totalCount = 0;
    let hasWrongAnswer = false;
    
    if (subMode === 'scenario' && questionWordSession.scenarios) {
      activeCount = questionWordSession.scenarios.filter(s => !s.eliminated).length;
      totalCount = questionWordSession.scenarios.length;
      const currentIdx = questionWordSession.currentScenarioIndex || 0;
      hasWrongAnswer = questionWordSession.scenarios[currentIdx]?.wrongCount > 0;
    } else if (subMode === 'answer-match' && questionWordSession.answerScenarios) {
      activeCount = questionWordSession.answerScenarios.filter(a => !a.eliminated).length;
      totalCount = questionWordSession.answerScenarios.length;
      const currentIdx = questionWordSession.currentAnswerIndex || 0;
      hasWrongAnswer = questionWordSession.answerScenarios[currentIdx]?.wrongCount > 0;
    } else if (questionWordSession.words.length > 0) {
      activeCount = questionWordSession.words.filter(w => !w.eliminated).length;
      totalCount = questionWordSession.words.length;
      hasWrongAnswer = questionWordSession.words[questionWordSession.currentWordIndex]?.wrongCount > 0;
    }
    
    const eliminatedCount = totalCount - activeCount;
    
    // Get current category info
    let categoryInfo = null;
    if (currentScenario) {
      categoryInfo = QUESTION_CATEGORIES.find(c => c.id === currentScenario.category);
    } else if (currentAnswerScenario) {
      categoryInfo = QUESTION_CATEGORIES.find(c => c.id === currentAnswerScenario.category);
    } else if (currentQuestionWord) {
      categoryInfo = QUESTION_CATEGORIES.find(c => c.id === currentQuestionWord.category);
    }
    
    // ===== SCENARIO MODE =====
    if (subMode === 'scenario' && currentScenario) {
      return (
        <div className="game-screen question-words-mode scenario-mode">
          <div className="game-header">
            <button className="quit-btn" onClick={onQuit}>
              <CloseIcon size={14} /> Quit
            </button>
            <div className="timer">{formatTime(elapsedTime)}</div>
            <div className="progress-stats">
              <span className="eliminated">{eliminatedCount}</span>
              <span className="separator">/</span>
              <span className="total">{totalCount}</span>
            </div>
          </div>

          <div className="qw-game-stats">
            <div className="qw-stat-pill mode-pill scenario">Situation Match</div>
            <div className="qw-stat-pill mistakes-pill">
              <span className="pill-value">{questionWordSession.wrongCount}</span>
              <span className="pill-label">mistakes</span>
            </div>
            <div className="qw-stat-pill remaining-pill">
              <span className="pill-value">{activeCount}</span>
              <span className="pill-label">left</span>
            </div>
          </div>

          <div className="prompt-area">
            <div className="scenario-prompt-box">
              <div className="scenario-situation">{currentScenario.situation}</div>
              <div className="scenario-context">{currentScenario.context}</div>
              <div className="scenario-question">
                <span className="scenario-ask">What question would you ask?</span>
              </div>
              
              {hasWrongAnswer && currentScenario.hint && (
                <div className="scenario-hint">
                  <span className="hint-label">Hint:</span>
                  <span className="hint-text">{currentScenario.hint}</span>
                </div>
              )}
            </div>
          </div>

          <div className="multiple-choice-area">
            <div className="option-grid scenario-options">
              {currentScenario.options.map((option, idx) => (
                <button
                  key={idx}
                  className="option-btn finnish-option"
                  onClick={() => handleOptionClick(option)}
                  disabled={!!feedback}
                >
                  {option}?
                </button>
              ))}
            </div>
          </div>

          {feedback && (
            <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="feedback-icon">
                {feedback.isCorrect ? <CheckIcon size={24} /> : '✕'}
              </div>
              <div className="feedback-content">
                <span className="feedback-title">
                  {feedback.isCorrect ? 'Oikein!' : 'Väärin'}
                </span>
                {!feedback.isCorrect && (
                  <>
                    <div className="feedback-answer">
                      <span className="user-answer">You picked: {feedback.userAnswer}</span>
                      <span className="correct-answer">Correct: <strong>{feedback.correctAnswer}?</strong></span>
                    </div>
                    {feedback.rule && (
                      <div className="feedback-hint">
                        <span className="hint-text">{feedback.rule}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              <button className="continue-btn" onClick={handleContinue}>
                {feedback.isCorrect ? 'Next' : 'Try Again'}
              </button>
            </div>
          )}
        </div>
      );
    }
    
    // ===== ANSWER-MATCH MODE =====
    if (subMode === 'answer-match' && currentAnswerScenario) {
      return (
        <div className="game-screen question-words-mode answer-mode">
          <div className="game-header">
            <button className="quit-btn" onClick={onQuit}>
              <CloseIcon size={14} /> Quit
            </button>
            <div className="timer">{formatTime(elapsedTime)}</div>
            <div className="progress-stats">
              <span className="eliminated">{eliminatedCount}</span>
              <span className="separator">/</span>
              <span className="total">{totalCount}</span>
            </div>
          </div>

          <div className="qw-game-stats">
            <div className="qw-stat-pill mode-pill detective">Answer Detective</div>
            <div className="qw-stat-pill mistakes-pill">
              <span className="pill-value">{questionWordSession.wrongCount}</span>
              <span className="pill-label">mistakes</span>
            </div>
            <div className="qw-stat-pill remaining-pill">
              <span className="pill-value">{activeCount}</span>
              <span className="pill-label">left</span>
            </div>
          </div>

          <div className="prompt-area">
            <div className="answer-prompt-box">
              <div className="answer-label">Someone answered:</div>
              <div className="answer-finnish">"{currentAnswerScenario.answer}"</div>
              <div className="answer-question">
                <span className="answer-ask">What question were they answering?</span>
              </div>
            </div>
          </div>

          <div className="multiple-choice-area">
            <div className="option-grid answer-options">
              {currentAnswerScenario.options.map((option, idx) => (
                <button
                  key={idx}
                  className="option-btn finnish-option"
                  onClick={() => handleOptionClick(option)}
                  disabled={!!feedback}
                >
                  {option}?
                </button>
              ))}
            </div>
          </div>

          {feedback && (
            <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="feedback-icon">
                {feedback.isCorrect ? <CheckIcon size={24} /> : '✕'}
              </div>
              <div className="feedback-content">
                <span className="feedback-title">
                  {feedback.isCorrect ? 'Oikein!' : 'Väärin'}
                </span>
                {!feedback.isCorrect && (
                  <>
                    <div className="feedback-answer">
                      <span className="user-answer">You picked: {feedback.userAnswer}</span>
                      <span className="correct-answer">Correct: <strong>{feedback.correctAnswer}?</strong></span>
                    </div>
                    <div className="feedback-explanation">
                      <span className="explanation-text">
                        "{currentAnswerScenario.answer}" = {currentAnswerScenario.answerMeaning}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <button className="continue-btn" onClick={handleContinue}>
                {feedback.isCorrect ? 'Next' : 'Try Again'}
              </button>
            </div>
          )}
        </div>
      );
    }
    
    // ===== RECOGNIZE & RECALL MODES (Original) =====
    if (!currentQuestionWord) return null;
    
    const isRecognizeMode = subMode === 'recognize';
    
    return (
      <div className="game-screen question-words-mode">
        <div className="game-header">
          <button className="quit-btn" onClick={onQuit}>
            <CloseIcon size={14} /> Quit
          </button>
          <div className="timer">{formatTime(elapsedTime)}</div>
          <div className="progress-stats">
            <span className="eliminated">{eliminatedCount}</span>
            <span className="separator">/</span>
            <span className="total">{totalCount}</span>
          </div>
        </div>

        <div className="qw-game-stats">
          <div className="qw-stat-pill mode-pill" style={{ '--pill-color': categoryInfo?.color } as React.CSSProperties}>
            {isRecognizeMode ? 'Recognition' : 'Active Recall'}
          </div>
          <div className="qw-stat-pill cat-pill" style={{ '--pill-color': categoryInfo?.color } as React.CSSProperties}>
            {categoryInfo?.name || currentQuestionWord.category}
          </div>
          <div className="qw-stat-pill mistakes-pill">
            <span className="pill-value">{questionWordSession.wrongCount}</span>
            <span className="pill-label">mistakes</span>
          </div>
          <div className="qw-stat-pill remaining-pill">
            <span className="pill-value">{activeCount}</span>
            <span className="pill-label">left</span>
          </div>
        </div>

        <div className="prompt-area">
          <div className="question-word-prompt-box">
            {isRecognizeMode ? (
              <>
                <div className="question-word-header">
                  <span className="question-word-finnish">{currentQuestionWord.finnish}</span>
                </div>
                <div className="question-word-question">
                  <span className="question-label">What does this mean?</span>
                </div>
              </>
            ) : (
              <>
                <div className="question-word-header">
                  <span className="question-word-english">{currentQuestionWord.english}</span>
                </div>
                <div className="question-word-question">
                  <span className="question-label">Mikä on suomeksi? (What is it in Finnish?)</span>
                </div>
              </>
            )}
            
            {hasWrongAnswer && (
              <div className="question-word-hint">
                <span className="hint-label">Usage:</span>
                <span className="hint-text">{currentQuestionWord.usage}</span>
              </div>
            )}
          </div>
        </div>

        {isRecognizeMode && currentQuestionWord.options ? (
          <div className="multiple-choice-area">
            <div className="option-grid question-options">
              {currentQuestionWord.options.map((option, idx) => (
                <button
                  key={idx}
                  className="option-btn"
                  onClick={() => handleOptionClick(option)}
                  disabled={!!feedback}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="input-area">
            <form onSubmit={handleSubmit} className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type the Finnish question word..."
                disabled={!!feedback}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="submit"
                className="submit-btn"
                disabled={!answer.trim() || !!feedback}
              >
                Enter
              </button>
            </form>
          </div>
        )}

        {feedback && (
          <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-icon">
              {feedback.isCorrect ? <CheckIcon size={24} /> : '✕'}
            </div>
            <div className="feedback-content">
              <span className="feedback-title">
                {feedback.isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
              {!feedback.isCorrect && (
                <>
                  <div className="feedback-answer">
                    <span className="user-answer">You: {feedback.userAnswer}</span>
                    <span className="correct-answer">Correct: {feedback.correctAnswer}</span>
                  </div>
                  <div className="feedback-learning">
                    <div className="feedback-usage">
                      <span className="usage-label">Usage:</span>
                      <span className="usage-text">{currentQuestionWord.usage}</span>
                    </div>
                    <div className="feedback-example">
                      <span className="example-finnish">{currentQuestionWord.example}</span>
                      <span className="example-english">{currentQuestionWord.exampleTranslation}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <button className="continue-btn" onClick={handleContinue}>
              {feedback.isCorrect ? 'Continue' : 'Try Again'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Handle lyrics learning mode
  if (mode === 'lyrics') {
    if (!lyricsSession || !currentLyricsItem) return null;
    
    const subMode = lyricsSession.subMode;
    const isWordMode = subMode === 'word-match' || subMode === 'word-recall';
    
    const activeCount = isWordMode 
      ? lyricsSession.words.filter(w => !w.eliminated).length 
      : lyricsSession.lines.filter(l => !l.eliminated).length;
    const totalCount = isWordMode ? lyricsSession.words.length : lyricsSession.lines.length;
    const eliminatedCount = totalCount - activeCount;
    
    const getModeTitle = () => {
      switch (subMode) {
        case 'word-match': return '🎯 Word Match';
        case 'word-recall': return '✍️ Word Recall';
        case 'line-translate': return '📖 Line Translation';
        case 'fill-blank': return '🔤 Fill in the Blank';
        case 'word-order': return '🔀 Word Order';
        default: return 'Lyrics Learning';
      }
    };
    
    const handleWordOrderSelect = (word: string) => {
      const newSelected = [...selectedWords, word];
      setSelectedWords(newSelected);
      
      // Check if all words are selected
      if (currentLyricsItem.shuffledWords && newSelected.length === currentLyricsItem.shuffledWords.length) {
        onSubmit(newSelected.join(','));
        setSelectedWords([]);
      }
    };
    
    const handleWordOrderReset = () => {
      setSelectedWords([]);
    };
    
    const handleOptionClick = (option: string) => {
      onSubmit(option);
    };
    
    // For line-based modes, show line number (sequential); for word modes, show eliminated/total
    const currentLineNum = lyricsSession.currentLineIndex + 1;
    
    return (
      <div className="game-screen lyrics-mode">
        <div className="game-header">
          <button className="quit-btn" onClick={onQuit}>
            <CloseIcon size={14} /> Quit
          </button>
          <div className="timer">{formatTime(elapsedTime)}</div>
          <div className="progress-stats">
            {isWordMode ? (
              <>
                <span className="eliminated">{eliminatedCount}</span>
                <span className="separator">/</span>
                <span className="total">{totalCount}</span>
              </>
            ) : (
              <>
                <span className="current-line">Line {currentLineNum}</span>
                <span className="separator">of</span>
                <span className="total">{totalCount}</span>
              </>
            )}
          </div>
        </div>

        <div className="game-stats-bar lyrics-stats">
          <div className="stat-item">
            <span className="stat-label">Song</span>
            <span className="stat-value">{lyricsSession.songTitle}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mode</span>
            <span className="stat-value">{getModeTitle()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mistakes</span>
            <span className="stat-value mistakes">{lyricsSession.wrongCount}</span>
          </div>
        </div>

        <div className="prompt-area">
          <div className="lyrics-prompt-box">
            {/* Word Match Mode */}
            {subMode === 'word-match' && currentLyricsItem.finnish && (
              <>
                <div className="lyrics-word-prompt">
                  <span className="lyrics-finnish-word">{currentLyricsItem.finnish}</span>
                  {currentLyricsItem.grammarNote && (
                    <span className="lyrics-grammar-note">({currentLyricsItem.grammarNote})</span>
                  )}
                </div>
                <div className="lyrics-question">What does this word mean?</div>
                <div className="lyrics-options">
                  {currentLyricsItem.options?.map((option, idx) => (
                    <button
                      key={idx}
                      className="lyrics-option-btn"
                      onClick={() => handleOptionClick(option)}
                      disabled={!!feedback}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
            
            {/* Word Recall Mode */}
            {subMode === 'word-recall' && currentLyricsItem.english && (
              <>
                <div className="lyrics-word-prompt">
                  <span className="lyrics-english-word">{currentLyricsItem.english}</span>
                </div>
                <div className="lyrics-question">Write the Finnish word:</div>
                {currentLyricsItem.baseForm && (
                  <div className="lyrics-hint">
                    Base form: {currentLyricsItem.baseForm}
                  </div>
                )}
              </>
            )}
            
            {/* Line Translation Mode */}
            {subMode === 'line-translate' && currentLyricsItem.finnishLine && (
              <>
                <div className="lyrics-line-prompt">
                  <span className="lyrics-finnish-line">{currentLyricsItem.finnishLine}</span>
                </div>
                <div className="lyrics-question">Select the correct translation:</div>
                <div className="lyrics-options line-options">
                  {currentLyricsItem.options?.map((option, idx) => (
                    <button
                      key={idx}
                      className="lyrics-option-btn line-option"
                      onClick={() => handleOptionClick(option)}
                      disabled={!!feedback}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
            
            {/* Fill in the Blank Mode */}
            {subMode === 'fill-blank' && currentLyricsItem.sentenceWithBlank && (
              <>
                <div className="lyrics-fill-prompt">
                  <span className="lyrics-sentence-blank">{currentLyricsItem.sentenceWithBlank}</span>
                </div>
                <div className="lyrics-translation-hint">
                  <EyeIcon size={14} /> {currentLyricsItem.englishLine}
                </div>
                <div className="lyrics-question">Fill in the missing word:</div>
              </>
            )}
            
            {/* Word Order Mode */}
            {subMode === 'word-order' && currentLyricsItem.shuffledWords && (
              <>
                <div className="lyrics-order-prompt">
                  <div className="lyrics-translation-hint">
                    <GlobeIcon size={14} /> {currentLyricsItem.englishLine}
                  </div>
                  <div className="lyrics-question">Arrange the words in correct order:</div>
                  
                  {/* Selected words display */}
                  <div className="lyrics-selected-words">
                    {selectedWords.length > 0 ? (
                      selectedWords.map((word, idx) => (
                        <span key={idx} className="selected-word">{word}</span>
                      ))
                    ) : (
                      <span className="selected-placeholder">Click words below...</span>
                    )}
                  </div>
                  
                  {/* Available words */}
                  <div className="lyrics-word-options">
                    {currentLyricsItem.shuffledWords.map((word, idx) => {
                      const usedCount = selectedWords.filter(w => w === word).length;
                      const availableCount = currentLyricsItem.shuffledWords!.slice(0, idx + 1).filter(w => w === word).length;
                      const shouldHide = usedCount >= availableCount;
                      
                      return (
                        <button
                          key={idx}
                          className={`lyrics-word-btn ${shouldHide ? 'used' : ''}`}
                          onClick={() => handleWordOrderSelect(word)}
                          disabled={!!feedback || shouldHide}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>
                  
                  {selectedWords.length > 0 && (
                    <button 
                      className="lyrics-reset-btn"
                      onClick={handleWordOrderReset}
                      disabled={!!feedback}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Input area for text-based modes */}
        {(subMode === 'word-recall' || subMode === 'fill-blank') && (
          <div className="input-area">
            <form onSubmit={handleSubmit} className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={subMode === 'word-recall' ? 'Type the Finnish word...' : 'Type the missing word...'}
                disabled={!!feedback}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="submit"
                className="submit-btn"
                disabled={!answer.trim() || !!feedback}
              >
                Enter
              </button>
            </form>
          </div>
        )}

        {feedback && (
          <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'} ${!feedback.isCorrect ? 'detailed' : ''}`}>
            <div className="feedback-title">
              {feedback.isCorrect ? 'CORRECT!' : 'WRONG'}
            </div>
            
            {!feedback.isCorrect && (
              <>
                <div className="feedback-answers">
                  <div className="your-answer">
                    <span className="label">Your answer:</span>
                    <span className="answer wrong">{feedback.userAnswer}</span>
                  </div>
                  <div className="correct-answer">
                    <span className="label">Correct:</span>
                    <span className="answer">{feedback.correctAnswer}</span>
                  </div>
                </div>
                
                {feedback.exampleSentence && (
                  <div className="feedback-context">
                    <span className="context-line">{feedback.exampleSentence}</span>
                    <span className="context-translation">{feedback.exampleTranslation}</span>
                  </div>
                )}
              </>
            )}
            
            <button className="continue-btn" onClick={handleContinue}>
              {feedback.isCorrect ? 'Continue' : 'Try Again'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Handle verb type arena modes
  const isVerbTypeMode = mode === 'verb-type-present' || mode === 'verb-type-negative' || 
                         mode === 'verb-type-imperfect' || mode === 'verb-type-imperfect-negative' ||
                         mode === 'verb-type-imperative' || mode === 'verb-type-imperative-negative' ||
                         mode === 'verb-type-conditional' || mode === 'verb-type-conditional-negative' ||
                         mode === 'verb-type-conditional-perfect' || mode === 'verb-type-conditional-perfect-negative';
  
  if (isVerbTypeMode) {
    if (!verbTypeSession) return null;
    
    const currentVerb = verbTypeSession.verbs[verbTypeSession.currentVerbIndex];
    if (!currentVerb) return null;
    
    const currentForm = currentVerb.forms[currentVerb.currentFormIndex];
    const completedForms = currentVerb.forms.filter(f => f.isCorrect === true).length;
    const totalForms = currentVerb.forms.length;
    const completedVerbs = verbTypeSession.verbs.filter(v => v.completed).length;
    const totalVerbs = verbTypeSession.verbs.length;
    
    const tenseLabels: Record<string, string> = {
      'verb-type-present': 'Preesens',
      'verb-type-negative': 'Kieltomuoto',
      'verb-type-imperfect': 'Imperfekti',
      'verb-type-imperfect-negative': 'Imperfektin Kielto',
      'verb-type-imperative': 'Imperatiivi',
      'verb-type-imperative-negative': 'Imperatiivin Kielto',
      'verb-type-conditional': 'Konditionaali',
      'verb-type-conditional-negative': 'Kond. Kielto',
      'verb-type-conditional-perfect': 'Kond. Perfekti',
      'verb-type-conditional-perfect-negative': 'Kond. Perf. Kielto',
    };
    const tenseLabel = tenseLabels[mode] || 'Unknown';
    
    return (
      <div className="game-screen verb-type-mode">
        <div className="game-header">
          <button className="quit-btn" onClick={onQuit}>
            <CloseIcon size={14} /> Quit
          </button>
          <div className="timer">{formatTime(elapsedTime)}</div>
          <div className="progress-stats">
            <span className="eliminated">{completedVerbs}</span>
            <span className="separator">/</span>
            <span className="total">{totalVerbs}</span>
          </div>
        </div>

        <div className="game-stats-bar verb-type-stats">
          <div className="stat-item">
            <span className="stat-label">Tense</span>
            <span className="stat-value">{tenseLabel}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Type</span>
            <span className="stat-value">{currentVerb.verbType}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mistakes</span>
            <span className="stat-value mistakes">{verbTypeSession.totalWrongCount}</span>
          </div>
        </div>

        <div className="prompt-area">
          <div className="verb-type-prompt-box">
            {/* Verb header */}
            <div className="verb-type-header">
              <span className="verb-infinitive">{currentVerb.infinitive}</span>
              <span className="verb-translation">({currentVerb.translation})</span>
            </div>
            
            {/* Form progress */}
            <div className="verb-form-progress">
              {currentVerb.forms.map((form, idx) => (
                <div 
                  key={form.person}
                  className={`form-progress-item ${form.isCorrect === true ? 'correct' : form.isCorrect === false ? 'wrong' : ''} ${idx === currentVerb.currentFormIndex ? 'current' : ''}`}
                >
                  <span className="form-person">{form.person}</span>
                  {form.isCorrect === true && <CheckIcon size={12} color="#4caf50" />}
                </div>
              ))}
            </div>
            
            {/* Current form to conjugate */}
            {currentForm && (
              <div className="verb-form-prompt">
                <span className="form-person-large">{currentForm.person}</span>
                <span className="form-arrow">→</span>
                <span className="form-blank">?</span>
              </div>
            )}
            
            {/* Progress indicator */}
            <div className="verb-form-counter">
              {completedForms}/{totalForms} forms completed
            </div>
          </div>
        </div>

        <div className="input-area">
          <form onSubmit={handleSubmit} className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={`Conjugate for ${currentForm?.person || ''}...`}
              disabled={!!feedback}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              type="submit"
              className="submit-btn"
              disabled={!answer.trim() || !!feedback}
            >
              Enter
            </button>
          </form>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'} ${!feedback.isCorrect ? 'detailed' : ''}`}>
            <div className="feedback-title">
              {feedback.isCorrect ? 'CORRECT!' : 'WRONG'}
            </div>
            
            {!feedback.isCorrect && (
              <div className="feedback-learning">
                <div className="feedback-your-answer">
                  You typed: <span>{feedback.userAnswer}</span>
                </div>
                <div className="feedback-correct-answer">
                  Correct: <span>{feedback.correctAnswer}</span>
                </div>
                
                {feedback.verbTypeInfo && (
                  <div className="feedback-section">
                    <div className="feedback-section-title">Verb Type</div>
                    <div className="feedback-section-content">{feedback.verbTypeInfo}</div>
                  </div>
                )}
                
                {feedback.rule && (
                  <div className="feedback-section">
                    <div className="feedback-section-title">Rule</div>
                    <div className="feedback-section-content">{feedback.rule}</div>
                  </div>
                )}

                <button className="feedback-continue-btn" onClick={handleContinue}>
                  Continue
                </button>
              </div>
            )}
            
            {feedback.isCorrect && (
              <div className="eliminated-notice"><CheckIcon size={14} color="#f0c674" /> Next form!</div>
            )}
          </div>
        )}
      </div>
    );
  }

  // All valid modes should have been handled above
  return null;
}
