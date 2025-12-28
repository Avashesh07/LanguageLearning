import { useState, useEffect, useRef, useCallback } from 'react';
import type { GameState } from '../types';
import { getAllRules } from '../data/consonantGradation';
import { getTavoiteById } from '../data/tavoiteVocabulary';
import { CASES, CASE_GROUPS } from '../data/finnishCases';
import { getArticleById } from '../data/yleArticles';
import { CloseIcon, CheckIcon, MapPinIcon, GlobeIcon, EyeIcon } from './Icons';

interface GameScreenProps {
  state: GameState;
  onSubmit: (answer: string) => void;
  onNextVerb: () => void;
  onClearFeedback: () => void;
  onQuit: () => void;
  formatTime: (ms: number) => string;
  onSubmitReadingAnswer?: (questionIndex: number, answerIndex: number) => void;
  onToggleReadingVocabulary?: () => void;
  onFinishReading?: () => void;
}

export function GameScreen({
  state,
  onSubmit,
  onNextVerb,
  onClearFeedback,
  onQuit,
  formatTime,
  onSubmitReadingAnswer,
  onToggleReadingVocabulary,
  onFinishReading,
}: GameScreenProps) {
  const [answer, setAnswer] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { session, currentVerb, feedback, mode, currentPerson, currentPolarity, currentSentence, currentGradationQuestion, gradationSession, vocabularySession, currentVocabularyWord, casesSession, currentCaseSentence, readingSession } = state;

  // Get current article for reading mode
  const currentArticle = readingSession ? getArticleById(readingSession.articleId) : undefined;

  useEffect(() => {
    const startTime = session?.startTime || gradationSession?.startTime || vocabularySession?.startTime || casesSession?.startTime || readingSession?.startTime;
    const isComplete = session?.isComplete || gradationSession?.isComplete || vocabularySession?.isComplete || casesSession?.isComplete || readingSession?.isComplete;
    
    if (!startTime || isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [session?.startTime, session?.isComplete, gradationSession?.startTime, gradationSession?.isComplete, vocabularySession?.startTime, vocabularySession?.isComplete, casesSession?.startTime, casesSession?.isComplete, readingSession?.startTime, readingSession?.isComplete]);

  useEffect(() => {
    if (!feedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [feedback, currentVerb, currentVocabularyWord, currentCaseSentence]);

  useEffect(() => {
    if (feedback && feedback.isCorrect) {
      // Auto-advance only for correct answers
      const timeout = setTimeout(() => {
        onClearFeedback();
        setAnswer('');
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

  // Handle reading mode
  const isReadingMode = mode === 'reading';
  
  if (isReadingMode) {
    if (!readingSession || !currentArticle) return null;
    
    const answeredCount = readingSession.questions.filter(q => q.answered).length;
    const totalQuestions = currentArticle.questions.length;
    const correctCount = readingSession.questions.filter(q => q.isCorrect).length;
    
    return (
      <div className="game-screen reading-screen">
        <div className="game-header reading-header">
          <button className="quit-btn" onClick={onQuit}>
            ✕
          </button>
          <div className="reading-progress-bar">
            <div 
              className="reading-progress-fill" 
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
          <div className="reading-score">
            {correctCount}/{answeredCount}
          </div>
        </div>

        <div className="reading-content">
          {/* Article Card */}
          <div className={`reading-article-card ${currentArticle.articleSource === 'yle-news' ? 'yle-news-article' : ''}`}>
            <div className="reading-article-badges">
              <span className="reading-level-badge">{currentArticle.level}</span>
              <span className="reading-topic-badge">{currentArticle.topic}</span>
              {currentArticle.articleSource === 'yle-news' && (
                <span className="reading-yle-badge">YLE</span>
              )}
            </div>
            
            <h1 className="reading-article-title">{currentArticle.title}</h1>
            
            <div className="reading-article-body">
              {currentArticle.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Vocabulary Helper - Collapsible */}
            <div className="reading-vocab-helper">
              <button
                className={`reading-vocab-toggle ${readingSession.showingVocabulary ? 'expanded' : ''}`}
                onClick={onToggleReadingVocabulary}
              >
                <span className="vocab-toggle-icon">{readingSession.showingVocabulary ? '▼' : '▶'}</span>
                <span>Sanasto ({currentArticle.vocabulary.length})</span>
              </button>
              {readingSession.showingVocabulary && (
                <div className="reading-vocab-grid">
                  {currentArticle.vocabulary.map((item, idx) => (
                    <div key={idx} className="reading-vocab-item">
                      <span className="rv-finnish">{item.finnish}</span>
                      <span className="rv-english">{item.english}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Questions Section */}
          <div className="reading-questions-section">
            <h2 className="reading-questions-title">Vastaa kysymyksiin</h2>
            
            {currentArticle.questions.map((question, qIdx) => {
              const questionState = readingSession.questions[qIdx];
              const isAnswered = questionState.answered;
              const isCorrect = questionState.isCorrect;
              
              return (
                <div 
                  key={question.id} 
                  className={`reading-question ${isAnswered ? (isCorrect ? 'answered-correct' : 'answered-wrong') : ''}`}
                >
                  <div className="rq-header">
                    <span className="rq-number">{qIdx + 1}</span>
                    <span className="rq-text">{question.question}</span>
                    {isAnswered && (
                      <span className={`rq-status ${isCorrect ? 'correct' : 'wrong'}`}>
                        {isCorrect ? '✓' : '✗'}
                      </span>
                    )}
                  </div>
                  
                  <div className="rq-options">
                    {question.options.map((option, oIdx) => {
                      const isSelected = questionState.selectedAnswer === oIdx;
                      const isCorrectAnswer = question.correctAnswer === oIdx;
                      const showCorrect = isAnswered && isCorrectAnswer;
                      const showWrong = isAnswered && isSelected && !isCorrect;
                      
                      return (
                        <button
                          key={oIdx}
                          className={`rq-option ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''}`}
                          onClick={() => !isAnswered && onSubmitReadingAnswer?.(qIdx, oIdx)}
                          disabled={isAnswered}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Complete Button */}
          {answeredCount === totalQuestions && (
            <div className="reading-complete-section">
              <div className="reading-final-score">
                <span className="rfs-label">Tulos:</span>
                <span className="rfs-value">{correctCount}/{totalQuestions}</span>
                <span className="rfs-percent">({Math.round((correctCount / totalQuestions) * 100)}%)</span>
              </div>
              <button className="reading-finish-btn" onClick={onFinishReading}>
                Valmis →
              </button>
            </div>
          )}
        </div>
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
