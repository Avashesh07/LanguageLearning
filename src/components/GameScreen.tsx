import { useState, useEffect, useRef, useCallback } from 'react';
import type { GameState } from '../types';
import { getAllRules } from '../data/consonantGradation';
import { getTavoiteById } from '../data/tavoiteVocabulary';
import { CASES, CASE_GROUPS } from '../data/finnishCases';
import { PARTITIVE_RULES } from '../data/partitiveData';
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
  const { session, currentVerb, feedback, mode, currentPerson, currentPolarity, currentSentence, currentGradationQuestion, gradationSession, vocabularySession, currentVocabularyWord, casesSession, currentCaseSentence, verbTypeSession, partitiveSession, currentPartitiveWord, lyricsSession, currentLyricsItem } = state;

  useEffect(() => {
    const startTime = session?.startTime || gradationSession?.startTime || vocabularySession?.startTime || casesSession?.startTime || verbTypeSession?.startTime || partitiveSession?.startTime || lyricsSession?.startTime;
    const isComplete = session?.isComplete || gradationSession?.isComplete || vocabularySession?.isComplete || casesSession?.isComplete || verbTypeSession?.isComplete || partitiveSession?.isComplete || lyricsSession?.isComplete;
    
    if (!startTime || isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [session?.startTime, session?.isComplete, gradationSession?.startTime, gradationSession?.isComplete, vocabularySession?.startTime, vocabularySession?.isComplete, casesSession?.startTime, casesSession?.isComplete, verbTypeSession?.startTime, verbTypeSession?.isComplete, partitiveSession?.startTime, partitiveSession?.isComplete, lyricsSession?.startTime, lyricsSession?.isComplete]);

  useEffect(() => {
    if (!feedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [feedback, currentVerb, currentVocabularyWord, currentCaseSentence, currentLyricsItem]);

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

  // Handle consonant gradation mode separately
  const isGradationMode = mode === 'consonant-gradation';
  
  if (isGradationMode) {
    if (!gradationSession) return null;
    
    const allRules = getAllRules();
    const currentRule = allRules[gradationSession.currentRuleIndex];
    const stage = gradationSession.currentStage;
    const ruleProgress = gradationSession.currentRuleIndex + 1;
    const totalRules = allRules.length;
    
    return (
      <div className="game-screen">
        <div className="game-header">
          <button className="quit-btn" onClick={onQuit}>
            <CloseIcon size={14} /> Quit
          </button>
          <div className="timer">{formatTime(elapsedTime)}</div>
          <div className="progress-stats">
            <span className="eliminated">Rule {ruleProgress}</span>
            <span className="separator">/</span>
            <span className="total">{totalRules}</span>
          </div>
        </div>

        <div className="game-stats-bar">
          <div className="stat-item">
            <span className="stat-label">Stage</span>
            <span className="stat-value">
              {stage === 'rule-confirm' ? 'Learn Rule' : 
               stage === 'noun-practice' ? 'Noun Practice' : 
               stage === 'verb-guide' ? 'Verb Guide' : 
               'Verb Practice'}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mistakes</span>
            <span className="stat-value mistakes">{gradationSession.wrongCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Rule</span>
            <span className="stat-value">{currentRule?.rule}</span>
          </div>
        </div>

        <div className="prompt-area">
          {stage === 'rule-confirm' && currentRule ? (
            <div className="gradation-prompt-box">
              <div className="gradation-rule-display">
                <div className="rule-title">Learn This Rule:</div>
                <div className="rule-formula">{currentRule.rule}</div>
                <div className="rule-description">{currentRule.description}</div>
                <div className="rule-examples-preview">
                  <div className="example-preview">
                    <strong>Noun example:</strong> {currentRule.examples.noun[0]?.context}
                  </div>
                  <div className="example-preview">
                    <strong>Verb example:</strong> {currentRule.examples.verb[0]?.context}
                  </div>
                </div>
                <button
                  className="rule-confirm-btn"
                  onClick={() => onSubmit('continue')}
                >
                  I Understand - Start Noun Practice
                </button>
              </div>
            </div>
          ) : stage === 'verb-guide' && currentRule ? (
            <div className="gradation-prompt-box">
              <div className="gradation-rule-display">
                <div className="rule-title">Verb Conjugation Guide</div>
                <div className="rule-formula">{currentRule.rule}</div>
                <div className="rule-description">{currentRule.verbGuide || currentRule.description}</div>
                <div className="rule-examples-preview">
                  <div className="example-preview">
                    <strong>Example:</strong> {currentRule.examples.verb[0]?.context}
                  </div>
                  {currentRule.examples.verb.length > 1 && (
                    <div className="example-preview">
                      <strong>Another:</strong> {currentRule.examples.verb[1]?.context}
                    </div>
                  )}
                </div>
                <button
                  className="rule-confirm-btn"
                  onClick={() => onSubmit('continue')}
                >
                  I Understand - Start Verb Practice
                </button>
              </div>
            </div>
          ) : currentGradationQuestion ? (
            <div className="gradation-prompt-box">
              <div className="gradation-stage-header">
                <span className="stage-badge">{stage === 'noun-practice' ? 'NOUN' : 'VERB'}</span>
                <span className="rule-display">{currentRule?.rule}</span>
              </div>
              
              <div className="base-word-display">
                <span className="base-word-label">Word:</span>
                <span className="base-word">{currentGradationQuestion.strongForm}</span>
              </div>
              
              {currentGradationQuestion.caseInfo && (
                <div className="case-info-hint">
                  {currentGradationQuestion.caseInfo}
                </div>
              )}
              
              <div className="gradation-fill-question">
                <div className="fill-blank-display">
                  {currentGradationQuestion.blankForm?.replace(/_{10,}/g, '<BLANK>').split('<BLANK>').map((part, i, arr) => (
                    <span key={i}>
                      <span className="fill-text">{part}</span>
                      {i < arr.length - 1 && <span className="fill-blank">___________</span>}
                    </span>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="input-wrapper">
                  <input
                    ref={inputRef}
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Write the full word..."
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
            </div>
          ) : null}
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
                {feedback.exampleSentence && feedback.exampleTranslation && (
                  <div className="feedback-section" style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div className="feedback-section-title" style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>📝 Example in context:</div>
                    <div className="feedback-section-content" style={{ fontSize: '1rem', marginBottom: '0.5rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>
                      {feedback.exampleSentence}
                    </div>
                    <div className="feedback-section-content" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {feedback.exampleTranslation}
                    </div>
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
              <div className="eliminated-notice"><CheckIcon size={14} color="#f0c674" /> Next question!</div>
            )}
          </div>
        )}
      </div>
    );
  }

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

  // Handle cases mode (Fill in the Blank)
  const isCasesMode = mode === 'cases-fill-blank';
  
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

  // Handle partitive mode
  if (mode === 'partitive') {
    if (!partitiveSession || !currentPartitiveWord) return null;
    
    const activeCount = partitiveSession.words.filter(w => !w.eliminated).length;
    const eliminatedCount = partitiveSession.words.length - activeCount;
    const currentWordState = partitiveSession.words[partitiveSession.currentWordIndex];
    const hasWrongAnswer = currentWordState.wrongCount > 0;
    
    const ruleInfo = PARTITIVE_RULES.find(r => r.id === currentPartitiveWord.rule);
    
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
            <span className="stat-label">Rule</span>
            <span className="stat-value">{ruleInfo?.name || currentPartitiveWord.rule}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mistakes</span>
            <span className="stat-value mistakes">{partitiveSession.wrongCount}</span>
          </div>
        </div>

        <div className="prompt-area">
          <div className="partitive-prompt-box">
            <div className="partitive-word-header">
              <span className="partitive-nominative">{currentPartitiveWord.nominative}</span>
              <span className="partitive-translation">({currentPartitiveWord.translation})</span>
            </div>
            
            <div className="partitive-question">
              <span className="partitive-label">Partitiivi?</span>
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
              placeholder="Write the partitive form..."
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
                      const isUsed = selectedWords.filter(w => w === word).length >= 
                        currentLyricsItem.shuffledWords!.filter(w => w === word).length - 
                        (currentLyricsItem.shuffledWords!.filter(w => w === word).length - 
                          selectedWords.filter(w => w === word).length);
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
  const isVerbTypeMode = mode === 'verb-type-present' || mode === 'verb-type-imperfect';
  
  if (isVerbTypeMode) {
    if (!verbTypeSession) return null;
    
    const currentVerb = verbTypeSession.verbs[verbTypeSession.currentVerbIndex];
    if (!currentVerb) return null;
    
    const currentForm = currentVerb.forms[currentVerb.currentFormIndex];
    const completedForms = currentVerb.forms.filter(f => f.isCorrect === true).length;
    const totalForms = currentVerb.forms.length;
    const completedVerbs = verbTypeSession.verbs.filter(v => v.completed).length;
    const totalVerbs = verbTypeSession.verbs.length;
    
    const tenseLabel = mode === 'verb-type-present' ? 'Preesens' : 'Imperfekti';
    
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

  // Regular verb modes
  if (!session || !currentVerb) return null;

  const activeCount = session.verbs.filter((v) => !v.eliminated).length;
  const eliminatedCount = session.verbs.length - activeCount;
  const currentVerbState = session.verbs[session.currentVerbIndex];
  const hasWrongAnswer = currentVerbState.wrongCount > 0;

  // Determine prompt based on mode
  let promptText = '';
  let promptLabel = '';
  let placeholderText = '';
  const isConjugation = mode === 'conjugation';
  const isImperfect = mode === 'imperfect';

  if (mode === 'recall') {
    promptText = currentVerb.infinitive;
    promptLabel = 'Finnish';
    placeholderText = 'English translation...';
  } else if (mode === 'active-recall') {
    promptText = currentVerb.translation;
    promptLabel = 'English';
    placeholderText = 'Finnish verb...';
  } else if (isConjugation) {
    promptText = currentVerb.infinitive;
    placeholderText = currentPolarity === 'negative' ? 'en/et/ei... + stem' : 'Conjugated form...';
  } else if (isImperfect) {
    promptText = currentVerb.infinitive;
    placeholderText = 'Past tense form...';
  }

  // Build sentence display with blank for conjugation
  const renderSentenceWithBlank = () => {
    if (!currentSentence) return null;
    const parts = currentSentence.split('{verb}');
    return (
      <div className="sentence-fill">
        <span className="sentence-part">{parts[0]}</span>
        <span className="sentence-blank">___________</span>
        <span className="sentence-part">{parts[1]}</span>
      </div>
    );
  };

  return (
    <div className="game-screen">
      <div className="game-header">
        <button className="quit-btn" onClick={onQuit}>
          ✕ Quit
        </button>
        <div className="timer">{formatTime(elapsedTime)}</div>
        <div className="progress-stats">
          <span className="eliminated">{eliminatedCount}</span>
          <span className="separator">/</span>
          <span className="total">{session.verbs.length}</span>
        </div>
      </div>

      <div className="game-stats-bar">
        <div className="stat-item">
          <span className="stat-label">Remaining</span>
          <span className="stat-value">{activeCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Mistakes</span>
          <span className="stat-value mistakes">{session.wrongCount}</span>
        </div>
        {(mode === 'conjugation' || mode === 'imperfect') && (
          <div className="stat-item">
            <span className="stat-label">Type</span>
            <span className="stat-value">{currentVerb.type}</span>
          </div>
        )}
      </div>

      <div className="prompt-area">
        {(isConjugation || isImperfect) ? (
          <div className="conjugation-prompt-box">
            {/* Verb header with polarity (only show for conjugation, not imperfect) */}
            <div className="conj-header-simple">
              <span className="conj-infinitive-small">{currentVerb.infinitive}</span>
              {isConjugation && (
                <span className={`conj-polarity-mark ${currentPolarity}`}>
                  {currentPolarity === 'positive' ? '+' : '−'}
                </span>
              )}
            </div>

            {/* Sentence with blank - main focus */}
            <div className="conj-sentence-main">
              {renderSentenceWithBlank()}
            </div>
            
            {hasWrongAnswer && (
              <div className="retry-indicator">
                Try again
              </div>
            )}
          </div>
        ) : (
          <div className="prompt-box">
            <div className="prompt-label">{promptLabel}</div>
            <div className="prompt-verb">{promptText}</div>
            
            {hasWrongAnswer && (
              <div className="retry-indicator">
                Try again
              </div>
            )}
          </div>
        )}
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
              
              {/* Learning section */}
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
              
              {feedback.fullConjugation && (
                <div className="feedback-section">
                  <div className="feedback-section-title">Full Conjugation</div>
                  <div className="conjugation-table">
                    {Object.entries(feedback.fullConjugation).map(([person, form]) => (
                      <div key={person} className={`conj-row ${person === currentPerson ? 'highlight' : ''}`}>
                        <span className="conj-person">{person}</span>
                        <span className="conj-form">{form}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {feedback.similarVerbs && feedback.similarVerbs.length > 0 && (
                <div className="feedback-section">
                  <div className="feedback-section-title">Similar Verbs (same type)</div>
                  <div className="similar-verbs">
                    {feedback.similarVerbs.join(', ')}
                  </div>
                </div>
              )}

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
