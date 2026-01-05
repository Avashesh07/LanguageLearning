// Finnish Verb Arena - Types

export type GameMode = 'menu' | 'vocabulary-recall' | 'vocabulary-active-recall' | 'vocabulary-memorise' | 'cases-fill-blank' | 'cases-fill-blank-plural' | 'verb-type-present' | 'verb-type-negative' | 'verb-type-imperfect' | 'verb-type-imperfect-negative' | 'partitive' | 'partitive-plural' | 'plural' | 'genitive' | 'genitive-plural' | 'stem' | 'lyrics';

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
  type: number; // Verb type 1-6
  translation: string;
  synonyms?: string[];
  forms?: VerbForms;
}

// Best time record
export interface TimeRecord {
  mode: GameMode;
  timeMs: number;
  date: string;
  accuracy: number;
  verbCount: number;
  verbTypes?: number[]; // For verb type sessions
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
  bestTimes: TimeRecord[];
  tavoiteProgress?: TavoiteProgress[]; // Track Tavoite completions
  casesProgress?: CasesProgress[]; // Track cases game progress
  sm2Progress?: SM2ChapterProgress[]; // Track Suomen Mestari 2 chapter completions
  sm2CycleProgress?: SM2CycleProgress[]; // Track Suomen Mestari 2 cycle completions (for memorise mode)
  lyricsProgress?: SongProgress[]; // Track song lyrics learning progress
}

// Full game state
export interface GameState {
  mode: GameMode;
  player: PlayerState;
  feedback: FeedbackData | null;
  // Vocabulary specific
  vocabularySession?: VocabularySessionState;
  currentVocabularyWord?: CurrentVocabularyWord;
  // Finnish Cases specific
  casesSession?: CasesSessionState;
  currentCaseSentence?: CurrentCaseSentence;
  // Verb Type Arena specific
  verbTypeSession?: VerbTypeSessionState;
  // Partitive Case specific
  partitiveSession?: PartitiveSessionState;
  currentPartitiveWord?: CurrentPartitiveWord;
  // Plural specific
  pluralSession?: PluralSessionState;
  currentPluralWord?: CurrentPluralWord;
  // Genitive specific
  genitiveSession?: GenitiveSessionState;
  currentGenitiveWord?: CurrentGenitiveWord;
  // Stem (Vartalo) specific
  stemSession?: StemSessionState;
  currentStemWord?: CurrentStemWord;
  // Lyrics Learning specific
  lyricsSession?: LyricsSessionState;
  currentLyricsItem?: CurrentLyricsItem;
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
  isPlural?: boolean;
  correctCount: number;
  wrongCount: number;
  eliminated: boolean;
}

export interface CasesSessionState {
  mode: 'cases-fill-blank' | 'cases-fill-blank-plural';
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
  isPlural?: boolean;
}

export interface CasesProgress {
  category: CaseCategory;
  fillBlankCompleted: boolean;
  fillBlankPluralCompleted?: boolean; // Track plural mode completion
  bestTimeMs?: number;
  bestDate?: string;
  bestTimeMsPlural?: number;
  bestDatePlural?: string;
}

// Verb Type Arena Types - Practice all forms of each verb
export interface VerbTypeFormState {
  person: Person;
  correctForm: string;
  userAnswer: string | null;
  isCorrect: boolean | null;
}

export interface VerbTypeVerbState {
  infinitive: string;
  translation: string;
  verbType: number;
  forms: VerbTypeFormState[];
  currentFormIndex: number;
  completed: boolean;
  wrongCount: number;
}

export interface VerbTypeSessionState {
  mode: 'verb-type-present' | 'verb-type-negative' | 'verb-type-imperfect' | 'verb-type-imperfect-negative';
  selectedTypes: number[];
  verbs: VerbTypeVerbState[];
  currentVerbIndex: number;
  startTime: number | null;
  endTime: number | null;
  totalWrongCount: number;
  isComplete: boolean;
}

// Partitive Case Types
export type PartitiveRule = 
  | 'single-vowel'
  | 'two-vowels'
  | 'new-i'
  | 'old-i'
  | 'e-ending'
  | 'consonant'
  | 'nen-ending';

export interface PartitiveWordState {
  nominative: string;
  partitive: string;
  nominativePlural?: string;
  partitivePlural?: string;
  translation: string;
  rule: PartitiveRule;
  hint?: string;
  hintPlural?: string;
  correctCount: number;
  wrongCount: number;
  eliminated: boolean;
}

export interface PartitiveSessionState {
  mode: 'partitive' | 'partitive-plural';
  selectedRules: PartitiveRule[];
  words: PartitiveWordState[];
  currentWordIndex: number;
  startTime: number | null;
  endTime: number | null;
  wrongCount: number;
  isComplete: boolean;
}

export interface CurrentPartitiveWord {
  nominative: string;
  partitive: string;
  nominativePlural?: string;
  partitivePlural?: string;
  translation: string;
  rule: PartitiveRule;
  hint?: string;
  hintPlural?: string;
}

// Plural Types (same rules as partitive/genitive)
export type PluralRule = 
  | 'single-vowel'
  | 'two-vowels'
  | 'new-i'
  | 'old-i'
  | 'e-ending'
  | 'consonant'
  | 'nen-ending';

export interface PluralWordState {
  nominative: string;
  nominativePlural: string;
  translation: string;
  rule: PluralRule;
  hint?: string;
  correctCount: number;
  wrongCount: number;
  eliminated: boolean;
}

export interface PluralSessionState {
  mode: 'plural';
  selectedRules: PluralRule[];
  words: PluralWordState[];
  currentWordIndex: number;
  startTime: number | null;
  endTime: number | null;
  wrongCount: number;
  isComplete: boolean;
}

export interface CurrentPluralWord {
  nominative: string;
  nominativePlural: string;
  translation: string;
  rule: PluralRule;
  hint?: string;
}

// Genitive Types
export type GenitiveRule = 
  | 'single-vowel'
  | 'two-vowels'
  | 'new-i'
  | 'old-i'
  | 'e-ending'
  | 'consonant'
  | 'nen-ending';

export interface GenitiveWordState {
  nominative: string;
  genitiveSingular: string;
  nominativePlural: string;
  genitivePlural: string;
  translation: string;
  rule: GenitiveRule;
  hint?: string;
  correctCount: number;
  wrongCount: number;
  eliminated: boolean;
}

export interface GenitiveSessionState {
  mode: 'genitive' | 'genitive-plural';
  selectedRules: GenitiveRule[];
  words: GenitiveWordState[];
  currentWordIndex: number;
  startTime: number | null;
  endTime: number | null;
  wrongCount: number;
  isComplete: boolean;
}

export interface CurrentGenitiveWord {
  nominative: string;
  genitiveSingular: string;
  nominativePlural: string;
  genitivePlural: string;
  translation: string;
  rule: GenitiveRule;
  hint?: string;
}

// Stem (Vartalo) Types
export type StemRule = 
  | 'no-change'
  | 'consonant-gradation'
  | 'old-i-to-e'
  | 'e-doubling'
  | 'nen-to-se'
  | 's-to-kse'
  | 's-to-de'
  | 'n-to-me'
  | 'consonant-stem'
  | 'special';

export interface StemWordState {
  nominative: string;
  stem: string;
  translation: string;
  rule: StemRule;
  hint?: string;
  genitive?: string;
  correctCount: number;
  wrongCount: number;
  eliminated: boolean;
}

export interface StemSessionState {
  mode: 'stem';
  selectedRules: StemRule[];
  words: StemWordState[];
  currentWordIndex: number;
  startTime: number | null;
  endTime: number | null;
  wrongCount: number;
  isComplete: boolean;
}

export interface CurrentStemWord {
  nominative: string;
  stem: string;
  translation: string;
  rule: StemRule;
  hint?: string;
  genitive?: string;
}

// Lyrics Learning Types
export type LyricsSubMode = 
  | 'word-match'        // Choose correct English for Finnish word
  | 'word-recall'       // Type Finnish word from English
  | 'line-translate'    // Match Finnish line to English
  | 'fill-blank'        // Fill in missing word in a line
  | 'word-order';       // Arrange words in correct order

export interface LyricsWordState {
  finnish: string;
  english: string;
  grammarNote?: string;
  baseForm?: string;
  correctCount: number;
  wrongCount: number;
  eliminated: boolean;
  consecutiveCorrect: number;
}

export interface LyricsLineState {
  index: number;
  finnish: string;
  english: string;
  correctCount: number;
  wrongCount: number;
  eliminated: boolean;
}

export interface LyricsSessionState {
  mode: 'lyrics';
  subMode: LyricsSubMode;
  songId: string;
  songTitle: string;
  // For word modes
  words: LyricsWordState[];
  currentWordIndex: number;
  // For line modes
  lines: LyricsLineState[];
  currentLineIndex: number;
  // For fill-blank mode
  currentBlankWord?: string;
  currentSentenceWithBlank?: string;
  // For word-order mode
  shuffledWords?: string[];
  // General
  startTime: number | null;
  endTime: number | null;
  wrongCount: number;
  isComplete: boolean;
}

export interface CurrentLyricsItem {
  // For word modes
  finnish?: string;
  english?: string;
  grammarNote?: string;
  baseForm?: string;
  // For line modes
  finnishLine?: string;
  englishLine?: string;
  // For fill-blank
  sentenceWithBlank?: string;
  missingWord?: string;
  // For word-order
  correctOrder?: string[];
  shuffledWords?: string[];
  // For multiple choice
  options?: string[];
}

export interface SongProgress {
  songId: string;
  wordsLearned: number;
  linesLearned: number;
  lastPlayed: string;
}
