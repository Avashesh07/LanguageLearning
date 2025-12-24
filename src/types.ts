// Finnish Verb Arena - Types

export type GameMode = 'menu' | 'recall' | 'active-recall' | 'conjugation' | 'consonant-gradation' | 'imperfect' | 'vocabulary-recall' | 'vocabulary-active-recall';

export type VerbLevel = 'A1' | 'A2' | 'B1';

export type Person = 'minä' | 'sinä' | 'hän' | 'me' | 'te' | 'he';

export type Polarity = 'positive' | 'negative';

export interface VerbForms {
  present: Record<Person, string>;
  negative: Record<Person, string>;
  imperfect?: Record<Person, string>; // Past tense forms
  imperfectNegative?: Record<Person, string>; // Negative past tense forms
}

export interface Verb {
  infinitive: string;
  type: number;
  translation: string;
  synonyms?: string[];
  level: VerbLevel;
  forms?: VerbForms;
}

// Track each verb's progress in current session
export interface VerbSessionState {
  infinitive: string;
  correctCount: number;
  wrongCount: number;
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
  levels: VerbLevel[];
  timeMs: number;
  date: string;
  accuracy: number;
  verbCount: number;
}

// Track completion per level
export interface LevelProgress {
  level: VerbLevel;
  recallCompleted: boolean;
  activeRecallCompleted: boolean;
  conjugationCompleted: boolean;
  imperfectCompleted?: boolean;
}

// Track completion per Tavoite (vocabulary)
export interface TavoiteProgress {
  tavoiteId: number;
  activeRecallCompleted: boolean; // Completed with 0 mistakes
  bestTimeMs?: number;
  bestDate?: string;
}

// Player's persistent state
export interface PlayerState {
  levelProgress: LevelProgress[];
  bestTimes: TimeRecord[];
  imperfectCompleted?: boolean; // Track imperfect mode completion
  tavoiteProgress?: TavoiteProgress[]; // Track Tavoite completions
}

// Full game state
export interface GameState {
  mode: GameMode;
  player: PlayerState;
  session: SessionState | null;
  currentVerb: Verb | null;
  feedback: FeedbackData | null;
  // Conjugation specific
  currentPerson?: Person;
  currentPolarity?: Polarity;
  currentSentence?: string; // Fill-in-the-blank sentence
  // Consonant gradation specific
  currentGradationQuestion?: ConsonantGradationQuestion;
  gradationSession?: ConsonantGradationSessionState;
  questions: ConsonantGradationQuestion[];
  // Vocabulary (Kurssin Arvostelu) specific
  vocabularySession?: VocabularySessionState;
  currentVocabularyWord?: CurrentVocabularyWord;
}

export interface FeedbackData {
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  // Extended feedback for learning
  verbType?: number;
  verbTypeInfo?: string;
  rule?: string;
  similarVerbs?: string[];
  fullConjugation?: Record<Person, string>;
}

// Consonant Gradation Types
export type ConsonantGradationQuestionType = 'true-false' | 'fill-blank';

export interface ConsonantGradationQuestion {
  id: string;
  type: ConsonantGradationQuestionType;
  strongForm: string;
  weakForm: string;
  context: string; // e.g., "pankki → pankissa"
  rule: string; // e.g., "kk → k"
  category: 'noun' | 'verb';
  // For true/false questions
  statement?: string;
  correctAnswer?: boolean;
  // For fill-in-the-blank
  blankForm?: string; // The form with blank
  expectedAnswer?: string;
  // Learning info
  caseInfo?: string; // e.g., "inessive case (-ssa/-ssä)"
  person?: string; // e.g., "minä"
}

export type GradationStage = 'rule-confirm' | 'noun-practice' | 'verb-guide' | 'verb-practice';

export interface ConsonantGradationSessionState {
  currentRuleIndex: number;
  currentStage: GradationStage;
  currentQuestionIndex: number; // For noun/verb practice within a rule
  startTime: number | null;
  endTime: number | null;
  wrongCount: number;
  isComplete: boolean;
}

// Kurssin Arvostelu (Course Vocabulary) Types
export interface VocabularyWordState {
  finnish: string;
  english: string;
  synonyms?: string[]; // Alternative accepted English answers
  finnishSynonyms?: string[]; // Alternative accepted Finnish answers
  correctCount: number;
  wrongCount: number;
  eliminated: boolean;
}

export interface VocabularySessionState {
  mode: 'vocabulary-recall' | 'vocabulary-active-recall';
  selectedTavoites: number[];
  words: VocabularyWordState[];
  currentWordIndex: number;
  startTime: number | null;
  endTime: number | null;
  wrongCount: number;
  isComplete: boolean;
}

export interface CurrentVocabularyWord {
  finnish: string;
  english: string;
}
