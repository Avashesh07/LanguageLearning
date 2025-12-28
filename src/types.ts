// Finnish Verb Arena - Types

export type GameMode = 'menu' | 'recall' | 'active-recall' | 'conjugation' | 'consonant-gradation' | 'imperfect' | 'vocabulary-recall' | 'vocabulary-active-recall' | 'vocabulary-memorise' | 'cases-fill-blank' | 'reading';

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

// Track completion per SM2 Chapter
export interface SM2ChapterProgress {
  chapterId: number;
  recallCompleted: boolean;
  activeRecallCompleted: boolean;
  bestTimeMs?: number;
  bestDate?: string;
}

// Track completion per SM2 Cycle (for all modes)
export interface SM2CycleProgress {
  cycleId: string; // e.g., "1a", "1b"
  chapterId: number;
  memoriseCompleted: boolean;
  recallCompleted: boolean;
  activeRecallCompleted: boolean;
  bestTimeMs?: number;
  bestDate?: string;
}

// Vocabulary source type
export type VocabularySource = 'kurssin-arvostelu' | 'suomen-mestari-2';

// Player's persistent state
export interface PlayerState {
  levelProgress: LevelProgress[];
  bestTimes: TimeRecord[];
  imperfectCompleted?: boolean; // Track imperfect mode completion
  tavoiteProgress?: TavoiteProgress[]; // Track Tavoite completions
  casesProgress?: CasesProgress[]; // Track cases game progress
  sm2Progress?: SM2ChapterProgress[]; // Track Suomen Mestari 2 chapter completions
  sm2CycleProgress?: SM2CycleProgress[]; // Track Suomen Mestari 2 cycle completions (for memorise mode)
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
  // Finnish Cases specific
  casesSession?: CasesSessionState;
  currentCaseSentence?: CurrentCaseSentence;
  // Reading specific
  readingSession?: ReadingSessionState;
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
  // Example sentence with translation for vocabulary
  exampleSentence?: string;
  exampleTranslation?: string;
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
  // For memorise mode - tracks consecutive correct answers needed
  requiredCorrect?: number; // How many more correct answers needed (starts at 1, increases to 3 on wrong)
  consecutiveCorrect?: number; // How many consecutive correct so far
  // For memorise mode - tracks answer direction
  // When requiredCorrect is 3: first 2 = 'finnish-to-english', 3rd = 'english-to-finnish'
  currentDirection?: 'finnish-to-english' | 'english-to-finnish';
}

export interface VocabularySessionState {
  mode: 'vocabulary-recall' | 'vocabulary-active-recall' | 'vocabulary-memorise';
  source: VocabularySource;
  selectedTavoites: number[]; // For Kurssin Arvostelu
  selectedChapters?: number[]; // For Suomen Mestari 2 (recall/active recall modes)
  selectedCycles?: string[]; // For Suomen Mestari 2 memorise mode (e.g., ["1a", "1b"])
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

// Finnish Cases Game Types
export type CaseType = 'inessive' | 'elative' | 'illative' | 'adessive' | 'ablative' | 'allative';
// Broad categories
// 'location' = all inside cases, 'surface' = all surface cases, 'pronoun' = pronoun forms
// Movement-based categories  
// 'static' = where (inessive + adessive), 'from' = from where (elative + ablative), 'to' = to where (illative + allative)
// Individual cases
// Each case can be practiced separately
export type CaseCategory = 
  | 'location' | 'surface' | 'pronoun'  // broad
  | 'static' | 'from' | 'to'            // by movement
  | 'inessive' | 'elative' | 'illative' | 'adessive' | 'ablative' | 'allative';  // individual

export interface CaseSentenceState {
  id: string;
  finnish: string;
  english: string;
  caseUsed: CaseType;
  wordInCase: string;
  baseWord: string;
  category: CaseCategory;
  sentenceWithBlank: string;
  hint?: string;
  correctCount: number;
  wrongCount: number;
  eliminated: boolean;
}

export interface CasesSessionState {
  mode: 'cases-fill-blank';
  selectedCategories: CaseCategory[];
  sentences: CaseSentenceState[];
  currentSentenceIndex: number;
  startTime: number | null;
  endTime: number | null;
  wrongCount: number;
  isComplete: boolean;
}

export interface CurrentCaseSentence {
  id: string;
  finnish: string;
  english: string;
  caseUsed: CaseType;
  wordInCase: string;
  baseWord: string;
  sentenceWithBlank: string;
  hint?: string;
}

export interface CasesProgress {
  category: CaseCategory;
  fillBlankCompleted: boolean;
  bestTimeMs?: number;
  bestDate?: string;
}

// Reading comprehension types
export interface ReadingQuestionState {
  questionId: string;
  answered: boolean;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
}

export interface ReadingSessionState {
  mode: 'reading';
  articleId: string;
  questions: ReadingQuestionState[];
  currentQuestionIndex: number;
  showingVocabulary: boolean;
  showingTranslation: boolean;
  startTime: number | null;
  endTime: number | null;
  wrongCount: number;
  isComplete: boolean;
}
