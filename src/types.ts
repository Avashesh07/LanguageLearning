// Finnish Verb Arena - Simplified Types

export type GameMode = 'menu' | 'recall' | 'active-recall';

export interface Verb {
  infinitive: string;
  type: number;
  translation: string;
  synonyms?: string[];
}

// Track each verb's progress in current session
export interface VerbSessionState {
  infinitive: string;
  correctCount: number; // Need 2 to eliminate
  eliminated: boolean;
}

// Session state for a single playthrough
export interface SessionState {
  mode: GameMode;
  verbs: VerbSessionState[];
  currentVerbIndex: number;
  startTime: number | null;
  endTime: number | null;
  wrongCount: number;
  isComplete: boolean;
}

// Best time record
export interface TimeRecord {
  mode: GameMode;
  timeMs: number;
  date: string;
  accuracy: number;
  verbCount: number;
}

// Player's persistent state
export interface PlayerState {
  recallCompleted: boolean; // True when Recall finished with 100% accuracy
  bestTimes: TimeRecord[];
}

// Full game state
export interface GameState {
  mode: GameMode;
  player: PlayerState;
  session: SessionState | null;
  currentVerb: Verb | null;
  feedback: FeedbackData | null;
}

export interface FeedbackData {
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
}
