import { useState, useEffect, useRef, useCallback } from 'react';
import type { GameState } from '../types';
import { getAllRules } from '../data/consonantGradation';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const { session, currentVerb, feedback, mode, currentPerson, currentPolarity, currentSentence, currentGradationQuestion, gradationSession } = state;

  useEffect(() => {
    const startTime = session?.startTime || gradationSession?.startTime;
    const isComplete = session?.isComplete || gradationSession?.isComplete;
    
    if (!startTime || isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [session?.startTime, session?.isComplete, gradationSession?.startTime, gradationSession?.isComplete]);

  useEffect(() => {
    if (!feedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [feedback, currentVerb]);

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
            ✕ Quit
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
              <div className="eliminated-notice">✓ Next question!</div>
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
            <div className="eliminated-notice">✓ Eliminated!</div>
          )}
        </div>
      )}
    </div>
  );
}
