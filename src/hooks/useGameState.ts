import { useReducer, useEffect, useCallback } from 'react';
import type {
  GameState,
  PlayerState,
  SessionState,
  VerbSessionState,
  FeedbackData,
  GameMode,
  TimeRecord,
} from '../types';
import { verbs } from '../data/verbs';

const STORAGE_KEY = 'finnish-verb-arena-save';
const CORRECT_TO_ELIMINATE = 2; // Need 2 correct answers to eliminate a verb

// Action types
type GameAction =
  | { type: 'START_SESSION'; mode: GameMode }
  | { type: 'SUBMIT_ANSWER'; answer: string }
  | { type: 'NEXT_VERB' }
  | { type: 'CLEAR_FEEDBACK' }
  | { type: 'RETURN_TO_MENU' }
  | { type: 'LOAD_STATE'; state: PlayerState };

function getInitialPlayerState(): PlayerState {
  return {
    recallCompleted: false,
    bestTimes: [],
  };
}

function loadPlayerState(): PlayerState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    console.warn('Failed to load save data');
  }
  return getInitialPlayerState();
}

function savePlayerState(state: PlayerState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    console.warn('Failed to save data');
  }
}

function createSession(mode: GameMode): SessionState {
  // Shuffle verbs for the session
  const shuffledVerbs = [...verbs]
    .sort(() => Math.random() - 0.5)
    .map((v) => ({
      infinitive: v.infinitive,
      correctCount: 0,
      eliminated: false,
    }));

  return {
    mode,
    verbs: shuffledVerbs,
    currentVerbIndex: 0,
    startTime: null,
    endTime: null,
    wrongCount: 0,
    isComplete: false,
  };
}

function getNextActiveVerbIndex(session: SessionState, startFrom: number): number {
  const { verbs } = session;
  
  // Look for next non-eliminated verb
  for (let i = 0; i < verbs.length; i++) {
    const idx = (startFrom + i) % verbs.length;
    if (!verbs[idx].eliminated) {
      return idx;
    }
  }
  
  return -1; // All eliminated
}

function getActiveVerbCount(session: SessionState): number {
  return session.verbs.filter((v) => !v.eliminated).length;
}

function getInitialState(): GameState {
  return {
    mode: 'menu',
    player: loadPlayerState(),
    session: null,
    currentVerb: null,
    feedback: null,
  };
}

function checkAnswer(mode: GameMode, verb: typeof verbs[0], answer: string): boolean {
  const normalizedAnswer = answer.trim().toLowerCase();
  
  if (mode === 'recall') {
    // Finnish → English
    const validAnswers = [verb.translation, ...(verb.synonyms || [])];
    return validAnswers.some((a) => a.toLowerCase() === normalizedAnswer);
  } else {
    // English → Finnish (Active Recall)
    return verb.infinitive.toLowerCase() === normalizedAnswer;
  }
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function downloadCSV(records: TimeRecord[]): void {
  const headers = ['Mode', 'Time (seconds)', 'Time (formatted)', 'Accuracy %', 'Verb Count', 'Date'];
  const rows = records.map((r) => [
    r.mode,
    Math.round(r.timeMs / 1000),
    formatTime(r.timeMs),
    r.accuracy,
    r.verbCount,
    r.date,
  ]);
  
  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'finnish-verb-arena-times.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_SESSION': {
      const session = createSession(action.mode);
      const firstVerbIndex = getNextActiveVerbIndex(session, 0);
      const currentVerb = verbs.find(
        (v) => v.infinitive === session.verbs[firstVerbIndex].infinitive
      )!;

      return {
        ...state,
        mode: action.mode,
        session: {
          ...session,
          currentVerbIndex: firstVerbIndex,
          startTime: Date.now(),
        },
        currentVerb,
        feedback: null,
      };
    }

    case 'SUBMIT_ANSWER': {
      if (!state.session || !state.currentVerb) return state;

      const isCorrect = checkAnswer(state.mode, state.currentVerb, action.answer);
      const currentVerbState = state.session.verbs[state.session.currentVerbIndex];

      // Update verb state
      const newVerbState: VerbSessionState = {
        ...currentVerbState,
        correctCount: isCorrect ? currentVerbState.correctCount + 1 : currentVerbState.correctCount,
        eliminated: isCorrect && currentVerbState.correctCount + 1 >= CORRECT_TO_ELIMINATE,
      };

      const newVerbs = [...state.session.verbs];
      newVerbs[state.session.currentVerbIndex] = newVerbState;

      const newSession: SessionState = {
        ...state.session,
        verbs: newVerbs,
        wrongCount: state.session.wrongCount + (isCorrect ? 0 : 1),
      };

      // Check if all verbs eliminated
      const activeCount = getActiveVerbCount(newSession);
      const isComplete = activeCount === 0;

      if (isComplete) {
        newSession.isComplete = true;
        newSession.endTime = Date.now();
      }

      const feedback: FeedbackData = {
        isCorrect,
        userAnswer: action.answer,
        correctAnswer:
          state.mode === 'recall'
            ? state.currentVerb.translation
            : state.currentVerb.infinitive,
      };

      return {
        ...state,
        session: newSession,
        feedback,
      };
    }

    case 'NEXT_VERB': {
      if (!state.session) return state;

      // Find next active verb
      const nextIndex = getNextActiveVerbIndex(
        state.session,
        state.session.currentVerbIndex + 1
      );

      if (nextIndex === -1 || state.session.isComplete) {
        // Session complete - calculate results
        const timeMs = state.session.endTime! - state.session.startTime!;
        const totalAttempts = state.session.verbs.reduce(
          (sum, v) => sum + v.correctCount,
          0
        ) + state.session.wrongCount;
        const accuracy = Math.round(
          ((totalAttempts - state.session.wrongCount) / totalAttempts) * 100
        );

        const isPerfect = state.session.wrongCount === 0;

        // Create time record
        const record: TimeRecord = {
          mode: state.mode,
          timeMs,
          date: new Date().toISOString().split('T')[0],
          accuracy,
          verbCount: verbs.length,
        };

        // Update best times
        const newBestTimes = [...state.player.bestTimes];
        const existingIdx = newBestTimes.findIndex(
          (r) => r.mode === state.mode
        );
        
        if (existingIdx === -1 || newBestTimes[existingIdx].timeMs > timeMs) {
          if (existingIdx === -1) {
            newBestTimes.push(record);
          } else {
            newBestTimes[existingIdx] = record;
          }
        }

        // Update player state
        const newPlayer: PlayerState = {
          ...state.player,
          bestTimes: newBestTimes,
          recallCompleted: state.player.recallCompleted || (state.mode === 'recall' && isPerfect),
        };

        return {
          ...state,
          player: newPlayer,
          feedback: null,
        };
      }

      const nextVerb = verbs.find(
        (v) => v.infinitive === state.session!.verbs[nextIndex].infinitive
      )!;

      return {
        ...state,
        session: {
          ...state.session,
          currentVerbIndex: nextIndex,
        },
        currentVerb: nextVerb,
        feedback: null,
      };
    }

    case 'CLEAR_FEEDBACK': {
      return {
        ...state,
        feedback: null,
      };
    }

    case 'RETURN_TO_MENU': {
      return {
        ...state,
        mode: 'menu',
        session: null,
        currentVerb: null,
        feedback: null,
      };
    }

    case 'LOAD_STATE': {
      return {
        ...state,
        player: action.state,
      };
    }

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, undefined, getInitialState);

  // Save player state on changes
  useEffect(() => {
    savePlayerState(state.player);
  }, [state.player]);

  const startSession = useCallback((mode: GameMode) => {
    dispatch({ type: 'START_SESSION', mode });
  }, []);

  const submitAnswer = useCallback((answer: string) => {
    dispatch({ type: 'SUBMIT_ANSWER', answer });
  }, []);

  const nextVerb = useCallback(() => {
    dispatch({ type: 'NEXT_VERB' });
  }, []);

  const clearFeedback = useCallback(() => {
    dispatch({ type: 'CLEAR_FEEDBACK' });
  }, []);

  const returnToMenu = useCallback(() => {
    dispatch({ type: 'RETURN_TO_MENU' });
  }, []);

  const exportTimes = useCallback(() => {
    downloadCSV(state.player.bestTimes);
  }, [state.player.bestTimes]);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'LOAD_STATE', state: getInitialPlayerState() });
  }, []);

  return {
    state,
    startSession,
    submitAnswer,
    nextVerb,
    clearFeedback,
    returnToMenu,
    exportTimes,
    resetProgress,
    formatTime,
    verbCount: verbs.length,
  };
}
