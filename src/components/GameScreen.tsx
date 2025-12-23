import { useState, useEffect, useRef, useCallback } from 'react';
import type { GameState } from '../types';

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
  const { session, currentVerb, feedback, mode } = state;

  // Timer
  useEffect(() => {
    if (!session?.startTime || session.isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - session.startTime!);
    }, 100);

    return () => clearInterval(interval);
  }, [session?.startTime, session?.isComplete]);

  // Focus input
  useEffect(() => {
    if (!feedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [feedback, currentVerb]);

  // Handle feedback timeout
  useEffect(() => {
    if (feedback) {
      const displayTime = feedback.isCorrect ? 400 : 2000;
      const timeout = setTimeout(() => {
        onClearFeedback();
        setAnswer('');
        onNextVerb();
      }, displayTime);
      return () => clearTimeout(timeout);
    }
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

  if (!session || !currentVerb) return null;

  const activeCount = session.verbs.filter((v) => !v.eliminated).length;
  const eliminatedCount = session.verbs.length - activeCount;
  const currentVerbState = session.verbs[session.currentVerbIndex];
  const progressToEliminate = currentVerbState.correctCount;

  // What to show as prompt
  const promptText = mode === 'recall' ? currentVerb.infinitive : currentVerb.translation;
  const placeholderText = mode === 'recall' ? 'English translation...' : 'Finnish verb...';

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
      </div>

      <div className="prompt-area">
        <div className="prompt-box">
          <div className="prompt-label">
            {mode === 'recall' ? 'Finnish' : 'English'}
          </div>
          <div className="prompt-verb">{promptText}</div>
          <div className="elimination-progress">
            <span className={progressToEliminate >= 1 ? 'filled' : ''}>●</span>
            <span className={progressToEliminate >= 2 ? 'filled' : ''}>●</span>
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
        <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="feedback-title">
            {feedback.isCorrect ? 'CORRECT!' : 'WRONG'}
          </div>
          {!feedback.isCorrect && (
            <>
              <div className="feedback-your-answer">
                You typed: <span>{feedback.userAnswer}</span>
              </div>
              <div className="feedback-correct-answer">
                Correct: <span>{feedback.correctAnswer}</span>
              </div>
            </>
          )}
          {feedback.isCorrect && currentVerbState.correctCount + 1 >= 2 && (
            <div className="eliminated-notice">Eliminated!</div>
          )}
        </div>
      )}
    </div>
  );
}
