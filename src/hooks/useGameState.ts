import { useReducer, useEffect, useCallback, useState, useRef } from 'react';
import type {
  GameState,
  PlayerState,
  SessionState,
  VerbSessionState,
  FeedbackData,
  GameMode,
  TimeRecord,
  VerbLevel,
  Person,
  Polarity,
  ConsonantGradationQuestion,
  ConsonantGradationSessionState,
  VocabularySessionState,
  VocabularyWordState,
  CasesSessionState,
  CaseSentenceState,
  CaseCategory,
  SM2CycleProgress,
  VerbTypeSessionState,
  VerbTypeFormState,
  VerbTypeVerbState,
  PartitiveRule,
  PartitiveSessionState,
  PartitiveWordState,
  LyricsSubMode,
  LyricsSessionState,
  LyricsWordState,
  LyricsLineState,
  CurrentLyricsItem,
} from '../types';
import { SONGS, getSongById, getSongWords, getUniqueSongLines, type Song, type SongWord, type SongLine } from '../data/songs';
import { verbs, verbTypeInfo, negativeInfo, getRandomSentence, getRandomImperfectSentence, persons, getVerbsForLevels } from '../data/verbs';
import { getAllRules, createPracticeQuestions, type GradationRule } from '../data/consonantGradation';
import { saveToCSV, loadFromCSV } from '../utils/csvDatabase';
import { getWordsForTavoites, getAllTavoites, getWordCountForTavoites } from '../data/tavoiteVocabulary';
import { getAllSM2Chapters, getSM2WordCountForChapters, getWordsForSM2Cycles, getSM2WordCountForCycles, getAllSM2Cycles, getSM2CyclesForChapter } from '../data/suomenMestari2';
import { getSentencesByCategory, CASES, CASE_GROUPS, getCaseEndingExplanation, type CaseSentence } from '../data/finnishCases';
import { PARTITIVE_RULES, getWordsForRules, getRuleInfo } from '../data/partitiveData';

const STORAGE_KEY = 'finnish-verb-arena-v4';

const PERSONS: Person[] = ['minä', 'sinä', 'hän', 'me', 'te', 'he'];

type GameAction =
  | { type: 'START_SESSION'; mode: GameMode; levels: VerbLevel[] }
  | { type: 'START_VERB_TYPE_SESSION'; tense: 'present' | 'imperfect'; types: number[] }
  | { type: 'START_VOCABULARY_SESSION'; mode: 'vocabulary-recall' | 'vocabulary-active-recall'; tavoites: number[]; source: 'kurssin-arvostelu' }
  | { type: 'START_SM2_SESSION'; mode: 'vocabulary-recall' | 'vocabulary-active-recall'; cycleIds: string[] }
  | { type: 'START_SM2_MEMORISE_SESSION'; cycleIds: string[] }
  | { type: 'START_CASES_SESSION'; categories: CaseCategory[] }
  | { type: 'START_PARTITIVE_SESSION'; rules: PartitiveRule[] }
  | { type: 'START_LYRICS_SESSION'; songId: string; subMode: LyricsSubMode }
  | { type: 'SUBMIT_ANSWER'; answer: string }
  | { type: 'NEXT_VERB' }
  | { type: 'CLEAR_FEEDBACK' }
  | { type: 'RETURN_TO_MENU' }
  | { type: 'LOAD_STATE'; state: PlayerState };

function getInitialPlayerState(): PlayerState {
  return {
    levelProgress: [
      { level: 'A1', recallCompleted: true, activeRecallCompleted: true, conjugationCompleted: false },
      { level: 'A2', recallCompleted: true, activeRecallCompleted: true, conjugationCompleted: false },
      { level: 'B1', recallCompleted: false, activeRecallCompleted: false, conjugationCompleted: false },
    ],
    bestTimes: [],
    tavoiteProgress: [],
    sm2Progress: [],
    sm2CycleProgress: [],
  };
}

function loadPlayerState(): PlayerState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.levelProgress) && Array.isArray(parsed.bestTimes)) {
        // Ensure conjugationCompleted exists
        parsed.levelProgress = parsed.levelProgress.map((lp: any) => ({
          ...lp,
          conjugationCompleted: lp.conjugationCompleted ?? false,
        }));
        return parsed;
      }
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

function createSession(mode: GameMode, levels: VerbLevel[]): SessionState {
  const verbsForSession = getVerbsForLevels(levels);
  
  const shuffledVerbs = [...verbsForSession]
    .sort(() => Math.random() - 0.5)
    .map((v) => ({
      infinitive: v.infinitive,
      correctCount: 0,
      wrongCount: 0,
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
  
  for (let i = 0; i < verbs.length; i++) {
    const idx = (startFrom + i) % verbs.length;
    if (!verbs[idx].eliminated) {
      return idx;
    }
  }
  
  return -1;
}

function getActiveVerbCount(session: SessionState): number {
  return session.verbs.filter((v) => !v.eliminated).length;
}

function getRandomPerson(): Person {
  return PERSONS[Math.floor(Math.random() * PERSONS.length)];
}

function getRandomPolarity(): Polarity {
  return Math.random() > 0.5 ? 'positive' : 'negative';
}

function getInitialState(): GameState {
  return {
    mode: 'menu',
    player: loadPlayerState(),
    session: null,
    currentVerb: null,
    feedback: null,
    currentPerson: undefined,
    currentPolarity: undefined,
    currentSentence: undefined,
    currentGradationQuestion: undefined,
    gradationSession: undefined,
    questions: [],
    vocabularySession: undefined,
    currentVocabularyWord: undefined,
    casesSession: undefined,
    currentCaseSentence: undefined,
    verbTypeSession: undefined,
  };
}

// Vocabulary Session Helpers
function createVocabularySession(mode: 'vocabulary-recall' | 'vocabulary-active-recall', tavoites: number[]): VocabularySessionState {
  const words = getWordsForTavoites(tavoites);
  
  const shuffledWords: VocabularyWordState[] = [...words]
    .sort(() => Math.random() - 0.5)
    .map((w) => ({
      finnish: w.finnish,
      english: w.english,
      synonyms: w.synonyms,
      finnishSynonyms: w.finnishSynonyms,
      correctCount: 0,
      wrongCount: 0,
      eliminated: false,
    }));

  return {
    mode,
    source: 'kurssin-arvostelu',
    selectedTavoites: tavoites,
    words: shuffledWords,
    currentWordIndex: 0,
    startTime: Date.now(),
    endTime: null,
    wrongCount: 0,
    isComplete: false,
  };
}

// SM2 Vocabulary Session Helper - now uses cycles instead of chapters
function createSM2VocabularySession(mode: 'vocabulary-recall' | 'vocabulary-active-recall', cycleIds: string[]): VocabularySessionState {
  const words = getWordsForSM2Cycles(cycleIds);
  
  const shuffledWords: VocabularyWordState[] = [...words]
    .sort(() => Math.random() - 0.5)
    .map((w) => ({
      finnish: w.finnish,
      english: w.english,
      synonyms: w.synonyms,
      finnishSynonyms: w.finnishSynonyms,
      correctCount: 0,
      wrongCount: 0,
      eliminated: false,
    }));

  return {
    mode,
    source: 'suomen-mestari-2',
    selectedTavoites: [], // Not used for SM2
    selectedCycles: cycleIds,
    words: shuffledWords,
    currentWordIndex: 0,
    startTime: Date.now(),
    endTime: null,
    wrongCount: 0,
    isComplete: false,
  };
}

// SM2 Memorise Session Helper - requires 3 correct answers after a mistake
// Uses cycles (e.g., "1a", "1b") instead of dynamic chunks
function createSM2MemoriseSession(cycleIds: string[]): VocabularySessionState {
  const words = getWordsForSM2Cycles(cycleIds);
  
  const shuffledWords: VocabularyWordState[] = [...words]
    .sort(() => Math.random() - 0.5)
    .map((w) => ({
      finnish: w.finnish,
      english: w.english,
      synonyms: w.synonyms,
      finnishSynonyms: w.finnishSynonyms,
      correctCount: 0,
      wrongCount: 0,
      eliminated: false,
      requiredCorrect: 1, // Start with needing 1 correct
      consecutiveCorrect: 0,
      currentDirection: 'finnish-to-english' as const,
    }));

  return {
    mode: 'vocabulary-memorise',
    source: 'suomen-mestari-2',
    selectedTavoites: [],
    selectedCycles: cycleIds,
    words: shuffledWords,
    currentWordIndex: 0,
    startTime: Date.now(),
    endTime: null,
    wrongCount: 0,
    isComplete: false,
  };
}

function getNextActiveWordIndex(session: VocabularySessionState, startFrom: number): number {
  const { words } = session;
  
  for (let i = 0; i < words.length; i++) {
    const idx = (startFrom + i) % words.length;
    if (!words[idx].eliminated) {
      return idx;
    }
  }
  
  return -1;
}

function getActiveWordCount(session: VocabularySessionState): number {
  return session.words.filter((w) => !w.eliminated).length;
}

// Generate common variations of an English answer
function generateEnglishVariations(english: string): string[] {
  const variations: string[] = [english.toLowerCase()];
  const lower = english.toLowerCase();
  
  // Handle "to X" verbs - accept "X" without "to"
  if (lower.startsWith('to ')) {
    variations.push(lower.slice(3));
  }
  
  // Handle "he/she X" - accept "he X", "she X", and just "X"
  if (lower.includes('he/she ')) {
    variations.push(lower.replace('he/she ', 'he '));
    variations.push(lower.replace('he/she ', 'she '));
    variations.push(lower.replace('he/she ', ''));
  }
  
  // Handle "(singular)" and "(plural)" annotations - accept without them
  if (lower.includes(' (singular)')) {
    variations.push(lower.replace(' (singular)', ''));
  }
  if (lower.includes(' (plural)')) {
    variations.push(lower.replace(' (plural)', ''));
  }
  if (lower.includes('(instrument/call)')) {
    variations.push(lower.replace(' (instrument/call)', ''));
    variations.push(lower.replace('(instrument/call)', 'instrument'));
    variations.push(lower.replace('(instrument/call)', 'call'));
  }
  
  // Handle "X/Y" alternatives - accept either X or Y
  if (lower.includes('/') && !lower.includes('he/she')) {
    const parts = lower.split('/');
    if (parts.length === 2) {
      variations.push(parts[0].trim());
      variations.push(parts[1].trim());
    }
  }
  
  // Handle "X (time)" style annotations
  const parenMatch = lower.match(/^(.+?)\s*\(.+\)$/);
  if (parenMatch) {
    variations.push(parenMatch[1].trim());
  }
  
  return variations;
}

// Generate contextual example sentences for vocabulary words
function generateExampleSentence(finnish: string, english: string, mode: 'vocabulary-recall' | 'vocabulary-active-recall'): { sentence: string; translation: string } {
  const englishLower = english.toLowerCase();
  const isVerb = englishLower.startsWith('to ') || ['want', 'need', 'go', 'come', 'do', 'make', 'take', 'give', 'see', 'know', 'say', 'think', 'get', 'have', 'be', 'can', 'will', 'book', 'rent', 'arrive', 'check', 'pick', 'drop', 'hear', 'plan', 'suit', 'write'].some(v => englishLower.includes(v));
  
  // Contexts: badminton, office work, friends hanging out
  const badmintonSentences = isVerb ? [
    { fi: `Me pelaamme sulkapalloa ${finnish}`, en: `We ${english} badminton` },
    { fi: `Kaverini ja minä ${finnish} sulkapalloa viikonloppuna`, en: `My friend and I ${english} badminton on weekends` },
    { fi: `Tänään ${finnish} sulkapalloa`, en: `Today I ${english} badminton` },
    { fi: `Sulkapallohallissa ${finnish}`, en: `At the badminton hall, we ${english}` },
    { fi: `Haluan ${finnish} sulkapalloa`, en: `I want to ${english} badminton` },
  ] : [
    { fi: `Sulkapallossa ${finnish} tärkeää`, en: `In badminton, ${english} is important` },
    { fi: `Minulla on ${finnish} sulkapalloa varten`, en: `I have ${english} for badminton` },
    { fi: `Tarvitsen ${finnish} pelaamiseen`, en: `I need ${english} to play` },
    { fi: `${finnish} auttaa pelaamisessa`, en: `${english} helps with playing` },
  ];
  
  const officeSentences = isVerb ? [
    { fi: `Toimistossa ${finnish}`, en: `At the office, we ${english}` },
    { fi: `Työkaverini ja minä ${finnish}`, en: `My colleague and I ${english}` },
    { fi: `Töissä ${finnish}`, en: `At work, I ${english}` },
    { fi: `Kokouksessa ${finnish}`, en: `In the meeting, we ${english}` },
    { fi: `Projektissa ${finnish}`, en: `In the project, we ${english}` },
  ] : [
    { fi: `Toimistossa ${finnish}`, en: `At the office, ${english}` },
    { fi: `Tarvitsen ${finnish} työhön`, en: `I need ${english} for work` },
    { fi: `Minulla on ${finnish}`, en: `I have ${english}` },
    { fi: `Käytän ${finnish}`, en: `I use ${english}` },
  ];
  
  const friendsSentences = isVerb ? [
    { fi: `Kaverien kanssa ${finnish}`, en: `With friends, we ${english}` },
    { fi: `Me ${finnish} yhdessä`, en: `We ${english} together` },
    { fi: `Illalla ${finnish}`, en: `In the evening, we ${english}` },
    { fi: `Kahvilla ${finnish}`, en: `At the café, we ${english}` },
    { fi: `Kaverini ${finnish}`, en: `My friend ${english}` },
  ] : [
    { fi: `Kaverien kanssa ${finnish}`, en: `With friends, ${english}` },
    { fi: `Minulla on ${finnish}`, en: `I have ${english}` },
    { fi: `Tarvitsen ${finnish}`, en: `I need ${english}` },
    { fi: `${finnish} on mukavaa`, en: `${english} is nice` },
  ];
  
  const allContexts = [
    { name: 'badminton', sentences: badmintonSentences },
    { name: 'office', sentences: officeSentences },
    { name: 'friends', sentences: friendsSentences },
  ];
  
  // Pick a random context and sentence
  const context = allContexts[Math.floor(Math.random() * allContexts.length)];
  const template = context.sentences[Math.floor(Math.random() * context.sentences.length)];
  
  if (mode === 'vocabulary-recall') {
    // For Finnish→English, show Finnish sentence with English translation
    return {
      sentence: template.fi.replace(finnish, `[${finnish}]`),
      translation: template.en.replace(english, `[${english}]`)
    };
  } else {
    // For English→Finnish, show English sentence with Finnish translation
    return {
      sentence: template.en.replace(english, `[${english}]`),
      translation: template.fi.replace(finnish, `[${finnish}]`)
    };
  }
}

function checkVocabularyAnswer(mode: 'vocabulary-recall' | 'vocabulary-active-recall', word: VocabularyWordState, answer: string): boolean {
  const normalizedAnswer = answer.trim().toLowerCase();
  
  if (mode === 'vocabulary-recall') {
    // Finnish to English: check if answer matches English or synonyms
    const validAnswers = generateEnglishVariations(word.english);
    
    // Add explicit synonyms if defined
    if (word.synonyms) {
      word.synonyms.forEach(syn => {
        validAnswers.push(...generateEnglishVariations(syn));
      });
    }
    
    return validAnswers.some(valid => valid === normalizedAnswer);
  } else {
    // English to Finnish: check if answer matches Finnish or Finnish synonyms
    const validAnswers = [word.finnish.toLowerCase()];
    
    if (word.finnishSynonyms) {
      word.finnishSynonyms.forEach(syn => {
        validAnswers.push(syn.toLowerCase());
      });
    }
    
    return validAnswers.some(valid => valid === normalizedAnswer);
  }
}

function getVocabularyExpectedAnswer(mode: 'vocabulary-recall' | 'vocabulary-active-recall', word: VocabularyWordState): string {
  if (mode === 'vocabulary-recall') {
    return word.english;
  } else {
    return word.finnish;
  }
}

// Cases Session Helpers
function createCasesSession(categories: CaseCategory[]): CasesSessionState {
  // Get sentences based on selected categories
  let sentences: CaseSentence[] = [];
  
  for (const category of categories) {
    sentences = [...sentences, ...getSentencesByCategory(category)];
  }
  
  // Remove duplicates by id
  const uniqueSentences = Array.from(new Map(sentences.map(s => [s.id, s])).values());
  
  // Shuffle and convert to state format
  const shuffledSentences: CaseSentenceState[] = [...uniqueSentences]
    .sort(() => Math.random() - 0.5)
    .map((s) => ({
      id: s.id,
      finnish: s.finnish,
      english: s.english,
      caseUsed: s.caseUsed,
      wordInCase: s.wordInCase,
      baseWord: s.baseWord,
      category: s.category,
      sentenceWithBlank: s.sentenceWithBlank,
      hint: s.hint,
      correctCount: 0,
      wrongCount: 0,
      eliminated: false,
    }));

  return {
    mode: 'cases-fill-blank',
    selectedCategories: categories,
    sentences: shuffledSentences,
    currentSentenceIndex: 0,
    startTime: Date.now(),
    endTime: null,
    wrongCount: 0,
    isComplete: false,
  };
}

function getNextActiveSentenceIndex(session: CasesSessionState, startFrom: number): number {
  const { sentences } = session;
  
  for (let i = 0; i < sentences.length; i++) {
    const idx = (startFrom + i) % sentences.length;
    if (!sentences[idx].eliminated) {
      return idx;
    }
  }
  
  return -1;
}

function getActiveSentenceCount(session: CasesSessionState): number {
  return session.sentences.filter((s) => !s.eliminated).length;
}

function checkCasesAnswer(sentence: CaseSentenceState, answer: string): boolean {
  const normalizedAnswer = answer.trim().toLowerCase();
  // User needs to fill in the correct word in the case form
  return normalizedAnswer === sentence.wordInCase.toLowerCase();
}

function getCasesExpectedAnswer(sentence: CaseSentenceState): string {
  return sentence.wordInCase;
}

function getCaseFeedbackInfo(sentence: CaseSentenceState): { caseInfo: string; rule: string; examples: string[] } {
  const caseInfo = CASES[sentence.caseUsed];
  return {
    caseInfo: `${caseInfo.finnishName} (${caseInfo.name}) - ${caseInfo.meaning}`,
    rule: getCaseEndingExplanation(sentence.caseUsed),
    examples: caseInfo.examples,
  };
}

function checkAnswer(mode: GameMode, verb: ReturnType<typeof getVerbsForLevels>[0], answer: string, person?: Person, polarity?: Polarity): boolean {
  const normalizedAnswer = answer.trim().toLowerCase();
  
  if (mode === 'recall') {
    const validAnswers = [verb.translation, ...(verb.synonyms || [])];
    return validAnswers.some((a) => a.toLowerCase() === normalizedAnswer);
  } else if (mode === 'active-recall') {
    return verb.infinitive.toLowerCase() === normalizedAnswer;
  } else if (mode === 'conjugation' && verb.forms && person && polarity) {
    const expected = polarity === 'positive' 
      ? verb.forms.present[person] 
      : verb.forms.negative[person];
    return expected.toLowerCase() === normalizedAnswer;
  } else if (mode === 'imperfect' && verb.forms && person) {
    // Imperfect mode only uses positive forms
    const expected = verb.forms.imperfect?.[person];
    return expected?.toLowerCase() === normalizedAnswer;
  }
  return false;
}

function getExpectedAnswer(mode: GameMode, verb: ReturnType<typeof getVerbsForLevels>[0], person?: Person, polarity?: Polarity): string {
  if (mode === 'recall') {
    return verb.translation;
  } else if (mode === 'active-recall') {
    return verb.infinitive;
  } else if (mode === 'conjugation' && verb.forms && person && polarity) {
    return polarity === 'positive' 
      ? verb.forms.present[person] 
      : verb.forms.negative[person];
  } else if (mode === 'imperfect' && verb.forms && person) {
    // Imperfect mode only uses positive forms
    return verb.forms.imperfect?.[person] || '';
  }
  return '';
}

function getSimilarVerbs(verbType: number, currentVerb: string, allVerbs: ReturnType<typeof getVerbsForLevels>): string[] {
  return allVerbs
    .filter(v => v.type === verbType && v.infinitive !== currentVerb)
    .slice(0, 4)
    .map(v => v.infinitive);
}

export function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function downloadCSV(records: TimeRecord[]): void {
  const headers = ['Mode', 'Levels', 'Time (seconds)', 'Time (formatted)', 'Accuracy %', 'Verb Count', 'Date'];
  const rows = records.map((r) => [
    r.mode,
    r.levels.join('+'),
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

let currentSessionLevels: VerbLevel[] = [];

// Verb Type Arena Helpers
function createVerbTypeSession(tense: 'present' | 'imperfect', types: number[]): VerbTypeSessionState {
  const verbsForTypes = verbs.filter(v => types.includes(v.type) && v.forms);
  const shuffledVerbs = [...verbsForTypes].sort(() => Math.random() - 0.5);
  
  const verbStates: VerbTypeVerbState[] = shuffledVerbs.map(verb => {
    const formsKey = tense === 'present' ? 'present' : 'imperfect';
    const verbForms = verb.forms?.[formsKey];
    
    if (!verbForms) {
      return {
        infinitive: verb.infinitive,
        translation: verb.translation,
        verbType: verb.type,
        forms: [],
        currentFormIndex: 0,
        completed: true, // Skip verbs without forms
        wrongCount: 0,
      };
    }
    
    const formStates: VerbTypeFormState[] = persons.map(person => ({
      person,
      correctForm: verbForms[person],
      userAnswer: null,
      isCorrect: null,
    }));
    
    return {
      infinitive: verb.infinitive,
      translation: verb.translation,
      verbType: verb.type,
      forms: formStates,
      currentFormIndex: 0,
      completed: false,
      wrongCount: 0,
    };
  }).filter(v => v.forms.length > 0); // Filter out verbs without forms
  
  return {
    mode: tense === 'present' ? 'verb-type-present' : 'verb-type-imperfect',
    selectedTypes: types,
    verbs: verbStates,
    currentVerbIndex: 0,
    startTime: Date.now(),
    endTime: null,
    totalWrongCount: 0,
    isComplete: false,
  };
}

function getVerbsByTypes(types: number[]): typeof verbs {
  return verbs.filter(v => types.includes(v.type));
}

// Consonant Gradation Helpers
function createGradationSession(): ConsonantGradationSessionState {
  return {
    currentRuleIndex: 0,
    currentStage: 'rule-confirm',
    currentQuestionIndex: 0,
    startTime: Date.now(),
    endTime: null,
    wrongCount: 0,
    isComplete: false,
  };
}

function getCurrentRule(state: GameState): GradationRule | null {
  if (!state.gradationSession) return null;
  const allRules = getAllRules();
  return allRules[state.gradationSession.currentRuleIndex] || null;
}

function getCurrentPracticeQuestions(state: GameState): ConsonantGradationQuestion[] {
  const rule = getCurrentRule(state);
  if (!rule || !state.gradationSession) return [];
  
  const allQuestions = createPracticeQuestions(rule);
  const stage = state.gradationSession.currentStage;
  
  if (stage === 'noun-practice') {
    return allQuestions.filter(q => q.category === 'noun');
  } else if (stage === 'verb-practice') {
    return allQuestions.filter(q => q.category === 'verb');
  }
  
  return [];
}

function getCurrentQuestion(state: GameState): ConsonantGradationQuestion | null {
  const questions = getCurrentPracticeQuestions(state);
  if (!state.gradationSession || questions.length === 0) return null;
  return questions[state.gradationSession.currentQuestionIndex] || null;
}

function checkGradationAnswer(question: ConsonantGradationQuestion, answer: string): boolean {
  const normalizedAnswer = answer.trim().toLowerCase();
  
  if (question.type === 'true-false') {
    const userBool = normalizedAnswer === 'true' || normalizedAnswer === 't' || normalizedAnswer === 'yes' || normalizedAnswer === 'y';
    return userBool === question.correctAnswer;
  } else if (question.type === 'fill-blank') {
    const expected = (question.expectedAnswer || '').toLowerCase();
    return normalizedAnswer === expected;
  }
  
  return false;
}

function getGradationExpectedAnswer(question: ConsonantGradationQuestion): string {
  if (question.type === 'true-false') {
    return question.correctAnswer ? 'True' : 'False';
  } else if (question.type === 'fill-blank') {
    return question.expectedAnswer || '';
  }
  return '';
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_SESSION': {
      currentSessionLevels = action.levels;
      
      // Handle consonant gradation mode separately
      if (action.mode === 'consonant-gradation') {
        const gradationSession = createGradationSession();
        return {
          ...state,
          mode: action.mode,
          session: null,
          currentVerb: null,
          feedback: null,
          currentPerson: undefined,
          currentPolarity: undefined,
          currentSentence: undefined,
          currentGradationQuestion: undefined, // Will be set based on stage
          gradationSession,
        };
      }
      
      // Regular verb modes
      const session = createSession(action.mode, action.levels);
      const verbsForSession = getVerbsForLevels(action.levels);
      const firstVerbIndex = getNextActiveVerbIndex(session, 0);
      const currentVerb = verbsForSession.find(
        (v) => v.infinitive === session.verbs[firstVerbIndex].infinitive
      )!;

      // For conjugation mode, set random person and polarity
      // For imperfect mode, set random person but always positive polarity
      const isConjugation = action.mode === 'conjugation';
      const isImperfect = action.mode === 'imperfect';
      const person = (isConjugation || isImperfect) ? getRandomPerson() : undefined;
      const polarity = isConjugation ? getRandomPolarity() : isImperfect ? 'positive' : undefined;
      const sentence = isConjugation && person && polarity 
        ? getRandomSentence(person, polarity)
        : isImperfect && person
        ? getRandomImperfectSentence(person, 'positive')
        : undefined;

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
        currentPerson: person,
        currentPolarity: polarity,
        currentSentence: sentence,
        currentGradationQuestion: undefined,
        gradationSession: undefined,
        vocabularySession: undefined,
        currentVocabularyWord: undefined,
      };
    }

    case 'START_VERB_TYPE_SESSION': {
      const verbTypeSession = createVerbTypeSession(action.tense, action.types);
      
      return {
        ...state,
        mode: verbTypeSession.mode,
        session: null,
        currentVerb: null,
        feedback: null,
        currentPerson: undefined,
        currentPolarity: undefined,
        currentSentence: undefined,
        currentGradationQuestion: undefined,
        gradationSession: undefined,
        vocabularySession: undefined,
        currentVocabularyWord: undefined,
        casesSession: undefined,
        currentCaseSentence: undefined,
        verbTypeSession,
      };
    }

    case 'START_VOCABULARY_SESSION': {
      const vocabularySession = createVocabularySession(action.mode, action.tavoites);
      const firstWordIndex = getNextActiveWordIndex(vocabularySession, 0);
      const firstWord = vocabularySession.words[firstWordIndex];
      
      return {
        ...state,
        mode: action.mode,
        session: null,
        currentVerb: null,
        feedback: null,
        currentPerson: undefined,
        currentPolarity: undefined,
        currentSentence: undefined,
        currentGradationQuestion: undefined,
        gradationSession: undefined,
        vocabularySession: {
          ...vocabularySession,
          currentWordIndex: firstWordIndex,
        },
        currentVocabularyWord: firstWord ? {
          finnish: firstWord.finnish,
          english: firstWord.english,
        } : undefined,
        casesSession: undefined,
        currentCaseSentence: undefined,
      };
    }

    case 'START_SM2_SESSION': {
      const vocabularySession = createSM2VocabularySession(action.mode, action.cycleIds);
      const firstWordIndex = getNextActiveWordIndex(vocabularySession, 0);
      const firstWord = vocabularySession.words[firstWordIndex];
      
      return {
        ...state,
        mode: action.mode,
        session: null,
        currentVerb: null,
        feedback: null,
        currentPerson: undefined,
        currentPolarity: undefined,
        currentSentence: undefined,
        currentGradationQuestion: undefined,
        gradationSession: undefined,
        vocabularySession: {
          ...vocabularySession,
          currentWordIndex: firstWordIndex,
        },
        currentVocabularyWord: firstWord ? {
          finnish: firstWord.finnish,
          english: firstWord.english,
        } : undefined,
        casesSession: undefined,
        currentCaseSentence: undefined,
      };
    }

    case 'START_SM2_MEMORISE_SESSION': {
      const vocabularySession = createSM2MemoriseSession(action.cycleIds);
      const firstWordIndex = 0; // Start from the first word
      const firstWord = vocabularySession.words[firstWordIndex];
      
      return {
        ...state,
        mode: 'vocabulary-memorise',
        session: null,
        currentVerb: null,
        feedback: null,
        currentPerson: undefined,
        currentPolarity: undefined,
        currentSentence: undefined,
        currentGradationQuestion: undefined,
        gradationSession: undefined,
        vocabularySession: {
          ...vocabularySession,
          currentWordIndex: firstWordIndex,
        },
        currentVocabularyWord: firstWord ? {
          finnish: firstWord.finnish,
          english: firstWord.english,
        } : undefined,
        casesSession: undefined,
        currentCaseSentence: undefined,
      };
    }

    case 'START_CASES_SESSION': {
      const casesSession = createCasesSession(action.categories);
      const firstSentenceIndex = getNextActiveSentenceIndex(casesSession, 0);
      const firstSentence = casesSession.sentences[firstSentenceIndex];
      
      return {
        ...state,
        mode: 'cases-fill-blank',
        session: null,
        currentVerb: null,
        feedback: null,
        currentPerson: undefined,
        currentPolarity: undefined,
        currentSentence: undefined,
        currentGradationQuestion: undefined,
        gradationSession: undefined,
        vocabularySession: undefined,
        currentVocabularyWord: undefined,
        casesSession: {
          ...casesSession,
          currentSentenceIndex: firstSentenceIndex,
        },
        currentCaseSentence: firstSentence ? {
          id: firstSentence.id,
          finnish: firstSentence.finnish,
          english: firstSentence.english,
          caseUsed: firstSentence.caseUsed,
          wordInCase: firstSentence.wordInCase,
          baseWord: firstSentence.baseWord,
          sentenceWithBlank: firstSentence.sentenceWithBlank,
          hint: firstSentence.hint,
        } : undefined,
      };
    }

    case 'START_PARTITIVE_SESSION': {
      const wordsForRules = getWordsForRules(action.rules);
      const shuffledWords = [...wordsForRules].sort(() => Math.random() - 0.5);
      
      const partitiveSession: PartitiveSessionState = {
        mode: 'partitive',
        selectedRules: action.rules,
        words: shuffledWords.map(w => ({
          nominative: w.nominative,
          partitive: w.partitive,
          translation: w.translation,
          rule: w.rule,
          hint: w.hint,
          correctCount: 0,
          wrongCount: 0,
          eliminated: false,
        })),
        currentWordIndex: 0,
        startTime: Date.now(),
        endTime: null,
        wrongCount: 0,
        isComplete: false,
      };
      
      const firstWord = shuffledWords[0];
      
      return {
        ...state,
        mode: 'partitive',
        session: null,
        currentVerb: null,
        feedback: null,
        currentPerson: undefined,
        currentPolarity: undefined,
        currentSentence: undefined,
        currentGradationQuestion: undefined,
        gradationSession: undefined,
        vocabularySession: undefined,
        currentVocabularyWord: undefined,
        casesSession: undefined,
        currentCaseSentence: undefined,
        verbTypeSession: undefined,
        partitiveSession,
        currentPartitiveWord: firstWord ? {
          nominative: firstWord.nominative,
          partitive: firstWord.partitive,
          translation: firstWord.translation,
          rule: firstWord.rule,
          hint: firstWord.hint,
        } : undefined,
      };
    }

    case 'START_LYRICS_SESSION': {
      const song = getSongById(action.songId);
      if (!song) return state;
      
      const words = getSongWords(song);
      const lines = getUniqueSongLines(song);
      const subMode = action.subMode;
      
      // Create lyrics session based on sub-mode
      const lyricsSession: LyricsSessionState = {
        mode: 'lyrics',
        subMode,
        songId: song.id,
        songTitle: song.title,
        words: words.map(w => ({
          finnish: w.finnish,
          english: w.english,
          grammarNote: w.grammarNote,
          baseForm: w.baseForm,
          correctCount: 0,
          wrongCount: 0,
          eliminated: false,
          consecutiveCorrect: 0,
        })).sort(() => Math.random() - 0.5), // Shuffle words for word-based modes
        currentWordIndex: 0,
        // Keep lines in sequential order for line-based modes (learn song in order)
        lines: lines.map((line, idx) => ({
          index: idx,
          finnish: line.finnish,
          english: line.english,
          correctCount: 0,
          wrongCount: 0,
          eliminated: false,
        })), // No shuffle - follow song sequence
        currentLineIndex: 0,
        startTime: Date.now(),
        endTime: null,
        wrongCount: 0,
        isComplete: false,
      };
      
      // Set up current item based on sub-mode
      let currentLyricsItem: CurrentLyricsItem | undefined;
      
      if (subMode === 'word-match' || subMode === 'word-recall') {
        const firstWord = lyricsSession.words[0];
        if (firstWord) {
          // Generate multiple choice options for word-match
          const otherWords = lyricsSession.words.filter(w => w.finnish !== firstWord.finnish);
          const wrongOptions = otherWords
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => w.english);
          const allOptions = [firstWord.english, ...wrongOptions].sort(() => Math.random() - 0.5);
          
          currentLyricsItem = {
            finnish: firstWord.finnish,
            english: firstWord.english,
            grammarNote: firstWord.grammarNote,
            baseForm: firstWord.baseForm,
            options: subMode === 'word-match' ? allOptions : undefined,
          };
        }
      } else if (subMode === 'line-translate') {
        const firstLine = lyricsSession.lines[0];
        if (firstLine) {
          // Generate multiple choice options
          const otherLines = lyricsSession.lines.filter(l => l.finnish !== firstLine.finnish);
          const wrongOptions = otherLines
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(l => l.english);
          const allOptions = [firstLine.english, ...wrongOptions].sort(() => Math.random() - 0.5);
          
          currentLyricsItem = {
            finnishLine: firstLine.finnish,
            englishLine: firstLine.english,
            options: allOptions,
          };
        }
      } else if (subMode === 'fill-blank') {
        const firstLine = lyricsSession.lines[0];
        if (firstLine) {
          // Find the original line to get words
          const originalLine = lines.find(l => l.finnish === firstLine.finnish);
          if (originalLine && originalLine.words.length > 0) {
            // Pick a random word to blank out
            const blankIdx = Math.floor(Math.random() * originalLine.words.length);
            const blankWord = originalLine.words[blankIdx];
            const sentenceWithBlank = firstLine.finnish.replace(
              new RegExp(`\\b${blankWord.finnish}\\b`, 'i'),
              '_____'
            );
            
            lyricsSession.currentBlankWord = blankWord.finnish;
            lyricsSession.currentSentenceWithBlank = sentenceWithBlank;
            
            currentLyricsItem = {
              finnishLine: firstLine.finnish,
              englishLine: firstLine.english,
              sentenceWithBlank,
              missingWord: blankWord.finnish,
            };
          }
        }
      } else if (subMode === 'word-order') {
        const firstLine = lyricsSession.lines[0];
        if (firstLine) {
          const wordsInOrder = firstLine.finnish.split(/\s+/);
          const shuffled = [...wordsInOrder].sort(() => Math.random() - 0.5);
          
          lyricsSession.shuffledWords = shuffled;
          
          currentLyricsItem = {
            finnishLine: firstLine.finnish,
            englishLine: firstLine.english,
            correctOrder: wordsInOrder,
            shuffledWords: shuffled,
          };
        }
      }
      
      return {
        ...state,
        mode: 'lyrics',
        session: null,
        currentVerb: null,
        feedback: null,
        currentPerson: undefined,
        currentPolarity: undefined,
        currentSentence: undefined,
        currentGradationQuestion: undefined,
        gradationSession: undefined,
        vocabularySession: undefined,
        currentVocabularyWord: undefined,
        casesSession: undefined,
        currentCaseSentence: undefined,
        verbTypeSession: undefined,
        partitiveSession: undefined,
        currentPartitiveWord: undefined,
        lyricsSession,
        currentLyricsItem,
      };
    }

    case 'SUBMIT_ANSWER': {
      // Handle verb type arena modes
      if (state.mode === 'verb-type-present' || state.mode === 'verb-type-imperfect') {
        if (!state.verbTypeSession) return state;
        
        const session = state.verbTypeSession;
        const currentVerb = session.verbs[session.currentVerbIndex];
        const currentForm = currentVerb.forms[currentVerb.currentFormIndex];
        
        const normalizedAnswer = action.answer.trim().toLowerCase();
        const isCorrect = normalizedAnswer === currentForm.correctForm.toLowerCase();
        
        // Update the form state
        const newForms = [...currentVerb.forms];
        newForms[currentVerb.currentFormIndex] = {
          ...currentForm,
          userAnswer: action.answer,
          isCorrect,
        };
        
        const newWrongCount = currentVerb.wrongCount + (isCorrect ? 0 : 1);
        const nextFormIndex = currentVerb.currentFormIndex + 1;
        const verbCompleted = nextFormIndex >= currentVerb.forms.length;
        
        const newVerbState: VerbTypeVerbState = {
          ...currentVerb,
          forms: newForms,
          currentFormIndex: isCorrect ? nextFormIndex : currentVerb.currentFormIndex,
          completed: verbCompleted && isCorrect,
          wrongCount: newWrongCount,
        };
        
        const newVerbs = [...session.verbs];
        newVerbs[session.currentVerbIndex] = newVerbState;
        
        const totalWrongCount = session.totalWrongCount + (isCorrect ? 0 : 1);
        
        // Check if all verbs are completed
        const allCompleted = verbCompleted && isCorrect && 
          newVerbs.every((v, i) => i <= session.currentVerbIndex ? v.completed : true) &&
          session.currentVerbIndex === newVerbs.length - 1;
        
        const newSession: VerbTypeSessionState = {
          ...session,
          verbs: newVerbs,
          totalWrongCount,
          isComplete: allCompleted,
          endTime: allCompleted ? Date.now() : null,
        };
        
        // Build feedback
        const typeInfo = verbTypeInfo[currentVerb.verbType];
        const feedback: FeedbackData = {
          isCorrect,
          userAnswer: action.answer,
          correctAnswer: currentForm.correctForm,
          verbType: !isCorrect ? currentVerb.verbType : undefined,
          verbTypeInfo: !isCorrect ? typeInfo?.name : undefined,
          rule: !isCorrect ? typeInfo?.rule : undefined,
        };
        
        return {
          ...state,
          verbTypeSession: newSession,
          feedback,
        };
      }
      
      // Handle consonant gradation mode
      if (state.mode === 'consonant-gradation') {
        if (!state.gradationSession) return state;
        
        const session = state.gradationSession;
        const currentRule = getCurrentRule(state);
        if (!currentRule) return state;
        
        // Handle rule confirmation stage
        if (session.currentStage === 'rule-confirm') {
          // Any answer confirms understanding (just move forward)
          const newSession: ConsonantGradationSessionState = {
            ...session,
            currentStage: 'noun-practice',
            currentQuestionIndex: 0,
          };
          
          const nounQuestions = createPracticeQuestions(currentRule).filter(q => q.category === 'noun');
          const firstQuestion = nounQuestions[0] || undefined;
          
          return {
            ...state,
            gradationSession: newSession,
            currentGradationQuestion: firstQuestion,
            feedback: null,
          };
        }
        
        // Handle verb guide stage
        if (session.currentStage === 'verb-guide') {
          // Any answer moves to verb practice
          const verbQuestions = createPracticeQuestions(currentRule).filter(q => q.category === 'verb');
          
          if (verbQuestions.length === 0) {
            // No verb examples - skip to next rule
            const allRules = getAllRules();
            const nextRuleIndex = session.currentRuleIndex + 1;
            
            if (nextRuleIndex >= allRules.length) {
              return {
                ...state,
                gradationSession: {
                  ...session,
                  isComplete: true,
                  endTime: Date.now(),
                },
                feedback: null,
              };
            }
            
            return {
              ...state,
              gradationSession: {
                ...session,
                currentRuleIndex: nextRuleIndex,
                currentStage: 'rule-confirm',
                currentQuestionIndex: 0,
              },
              currentGradationQuestion: undefined,
              feedback: null,
            };
          }
          
          const firstVerbQuestion = verbQuestions[0];
          
          const newSession: ConsonantGradationSessionState = {
            ...session,
            currentStage: 'verb-practice',
            currentQuestionIndex: 0,
          };
          
          return {
            ...state,
            gradationSession: newSession,
            currentGradationQuestion: firstVerbQuestion,
            feedback: null,
          };
        }
        
        // Handle practice stages (noun/verb)
        const currentQuestion = getCurrentQuestion(state);
        if (!currentQuestion) return state;
        
        const isCorrect = checkGradationAnswer(currentQuestion, action.answer);
        const newWrongCount = session.wrongCount + (isCorrect ? 0 : 1);
        
        const correctAnswer = getGradationExpectedAnswer(currentQuestion);
        const feedback: FeedbackData = {
          isCorrect,
          userAnswer: action.answer,
          correctAnswer,
          rule: currentRule.rule,
        };
        
        return {
          ...state,
          gradationSession: {
            ...session,
            wrongCount: newWrongCount,
          },
          feedback,
        };
      }
      
      // Handle vocabulary modes
      if (state.mode === 'vocabulary-recall' || state.mode === 'vocabulary-active-recall') {
        if (!state.vocabularySession || !state.currentVocabularyWord) return state;
        
        const vocabSession = state.vocabularySession;
        const currentWordState = vocabSession.words[vocabSession.currentWordIndex];
        
        const isCorrect = checkVocabularyAnswer(state.mode, currentWordState, action.answer);
        const newWrongForWord = currentWordState.wrongCount + (isCorrect ? 0 : 1);
        const shouldEliminate = isCorrect;
        
        const newWordState: VocabularyWordState = {
          ...currentWordState,
          correctCount: isCorrect ? currentWordState.correctCount + 1 : currentWordState.correctCount,
          wrongCount: newWrongForWord,
          eliminated: shouldEliminate,
        };
        
        const newWords = [...vocabSession.words];
        newWords[vocabSession.currentWordIndex] = newWordState;
        
        const newWrongCount = vocabSession.wrongCount + (isCorrect ? 0 : 1);
        const newVocabSession: VocabularySessionState = {
          ...vocabSession,
          words: newWords,
          wrongCount: newWrongCount,
        };
        
        const activeCount = getActiveWordCount(newVocabSession);
        const isComplete = activeCount === 0;
        
        let newPlayer = state.player;
        
        if (isComplete) {
          newVocabSession.isComplete = true;
          newVocabSession.endTime = Date.now();
          
          // For Active Recall mode with 0 mistakes, save Tavoite progress
          if (state.mode === 'vocabulary-active-recall' && newVocabSession.wrongCount === 0) {
            const timeMs = newVocabSession.endTime - (newVocabSession.startTime || newVocabSession.endTime);
            const currentDate = new Date().toISOString().split('T')[0];
            
            // Update progress for each selected Tavoite
            const existingProgress = state.player.tavoiteProgress || [];
            const newTavoiteProgress = [...existingProgress];
            
            for (const tavoiteId of newVocabSession.selectedTavoites) {
              const existingIdx = newTavoiteProgress.findIndex(tp => tp.tavoiteId === tavoiteId);
              
              if (existingIdx >= 0) {
                // Update existing - only update time if better
                const existing = newTavoiteProgress[existingIdx];
                if (!existing.bestTimeMs || timeMs < existing.bestTimeMs) {
                  newTavoiteProgress[existingIdx] = {
                    ...existing,
                    activeRecallCompleted: true,
                    bestTimeMs: timeMs,
                    bestDate: currentDate,
                  };
                } else if (!existing.activeRecallCompleted) {
                  newTavoiteProgress[existingIdx] = {
                    ...existing,
                    activeRecallCompleted: true,
                  };
                }
              } else {
                // Add new progress
                newTavoiteProgress.push({
                  tavoiteId,
                  activeRecallCompleted: true,
                  bestTimeMs: timeMs,
                  bestDate: currentDate,
                });
              }
            }
            
            newPlayer = {
              ...newPlayer,
              tavoiteProgress: newTavoiteProgress,
            };
          }
          
          // For SM2 modes, save cycle progress
          if (newVocabSession.source === 'suomen-mestari-2' && newVocabSession.selectedCycles && newVocabSession.wrongCount === 0) {
            const timeMs = newVocabSession.endTime - (newVocabSession.startTime || newVocabSession.endTime);
            const currentDate = new Date().toISOString().split('T')[0];
            
            const existingCycleProgress = state.player.sm2CycleProgress || [];
            const newCycleProgress = [...existingCycleProgress];
            
            for (const cycleId of newVocabSession.selectedCycles) {
              const existingIdx = newCycleProgress.findIndex(cp => cp.cycleId === cycleId);
              
              // Extract chapter ID from cycle ID (e.g., "1a" -> 1)
              const chapterId = parseInt(cycleId.match(/^\d+/)?.[0] || '0');
              
              if (existingIdx >= 0) {
                // Update existing
                const existing = newCycleProgress[existingIdx];
                const updates: Partial<SM2CycleProgress> = {};
                
                if (state.mode === 'vocabulary-recall') {
                  updates.recallCompleted = true;
                } else if (state.mode === 'vocabulary-active-recall') {
                  updates.activeRecallCompleted = true;
                }
                
                if (!existing.bestTimeMs || timeMs < existing.bestTimeMs) {
                  updates.bestTimeMs = timeMs;
                  updates.bestDate = currentDate;
                }
                
                newCycleProgress[existingIdx] = { ...existing, ...updates };
              } else {
                // Add new cycle progress
                const newProgress: SM2CycleProgress = {
                  cycleId,
                  chapterId,
                  memoriseCompleted: false,
                  recallCompleted: state.mode === 'vocabulary-recall',
                  activeRecallCompleted: state.mode === 'vocabulary-active-recall',
                  bestTimeMs: timeMs,
                  bestDate: currentDate,
                };
                newCycleProgress.push(newProgress);
              }
            }
            
            newPlayer = {
              ...newPlayer,
              sm2CycleProgress: newCycleProgress,
            };
          }
          
        }
        
        const correctAnswer = getVocabularyExpectedAnswer(state.mode, currentWordState);
        
        // Generate example sentence for wrong answers
        let exampleSentence: string | undefined;
        let exampleTranslation: string | undefined;
        if (!isCorrect) {
          const example = generateExampleSentence(currentWordState.finnish, currentWordState.english, state.mode);
          exampleSentence = example.sentence;
          exampleTranslation = example.translation;
        }
        
        const feedback: FeedbackData = {
          isCorrect,
          userAnswer: action.answer,
          correctAnswer,
          exampleSentence,
          exampleTranslation,
        };
        
        return {
          ...state,
          player: newPlayer,
          vocabularySession: newVocabSession,
          feedback,
        };
      }
      
      // Handle memorise mode - requires multiple correct answers after mistakes
      // When wrong: need 3 correct - first 2 are Finnish→English, 3rd is English→Finnish
      if (state.mode === 'vocabulary-memorise') {
        if (!state.vocabularySession || !state.currentVocabularyWord) return state;
        
        const vocabSession = state.vocabularySession;
        const currentWordState = vocabSession.words[vocabSession.currentWordIndex];
        
        const currentRequired = currentWordState.requiredCorrect || 1;
        const currentConsecutive = currentWordState.consecutiveCorrect || 0;
        const currentDirection = currentWordState.currentDirection || 'finnish-to-english';
        
        // Check answer based on current direction
        const checkMode = currentDirection === 'finnish-to-english' ? 'vocabulary-recall' : 'vocabulary-active-recall';
        const isCorrect = checkVocabularyAnswer(checkMode, currentWordState, action.answer);
        
        let newRequiredCorrect = currentRequired;
        let newConsecutiveCorrect = currentConsecutive;
        let newDirection: 'finnish-to-english' | 'english-to-finnish' = currentDirection;
        let shouldEliminate = false;
        
        if (isCorrect) {
          newConsecutiveCorrect = currentConsecutive + 1;
          // Check if we've met the required correct answers
          if (newConsecutiveCorrect >= currentRequired) {
            shouldEliminate = true;
          } else if (currentRequired === 3) {
            // For 3 required: first 2 are Finnish→English, 3rd is English→Finnish
            if (newConsecutiveCorrect === 2) {
              newDirection = 'english-to-finnish';
            }
          }
        } else {
          // Wrong answer: reset consecutive, increase required to 3, start with Finnish→English
          newConsecutiveCorrect = 0;
          newRequiredCorrect = 3;
          newDirection = 'finnish-to-english';
        }
        
        const newWordState: VocabularyWordState = {
          ...currentWordState,
          correctCount: isCorrect ? currentWordState.correctCount + 1 : currentWordState.correctCount,
          wrongCount: currentWordState.wrongCount + (isCorrect ? 0 : 1),
          eliminated: shouldEliminate,
          requiredCorrect: newRequiredCorrect,
          consecutiveCorrect: newConsecutiveCorrect,
          currentDirection: newDirection,
        };
        
        const newWords = [...vocabSession.words];
        newWords[vocabSession.currentWordIndex] = newWordState;
        
        const newWrongCount = vocabSession.wrongCount + (isCorrect ? 0 : 1);
        const newVocabSession: VocabularySessionState = {
          ...vocabSession,
          words: newWords,
          wrongCount: newWrongCount,
        };
        
        const activeCount = getActiveWordCount(newVocabSession);
        const isComplete = activeCount === 0;
        
        let newPlayer = state.player;
        
        if (isComplete) {
          newVocabSession.isComplete = true;
          newVocabSession.endTime = Date.now();
          
          // Save cycle progress for SM2 memorise mode
          if (newVocabSession.source === 'suomen-mestari-2' && newVocabSession.selectedCycles) {
            const timeMs = newVocabSession.endTime - (newVocabSession.startTime || newVocabSession.endTime);
            const currentDate = new Date().toISOString().split('T')[0];
            
            const existingCycleProgress = state.player.sm2CycleProgress || [];
            const newCycleProgress = [...existingCycleProgress];
            
            for (const cycleId of newVocabSession.selectedCycles) {
              const existingIdx = newCycleProgress.findIndex(cp => cp.cycleId === cycleId);
              
              // Extract chapter ID from cycle ID (e.g., "1a" -> 1)
              const chapterId = parseInt(cycleId.match(/^\d+/)?.[0] || '0');
              
              if (existingIdx >= 0) {
                // Update existing - only update time if better
                const existing = newCycleProgress[existingIdx];
                if (!existing.bestTimeMs || timeMs < existing.bestTimeMs) {
                  newCycleProgress[existingIdx] = {
                    ...existing,
                    memoriseCompleted: true,
                    bestTimeMs: timeMs,
                    bestDate: currentDate,
                  };
                } else if (!existing.memoriseCompleted) {
                  newCycleProgress[existingIdx] = {
                    ...existing,
                    memoriseCompleted: true,
                  };
                }
              } else {
                // Add new cycle progress
                newCycleProgress.push({
                  cycleId,
                  chapterId,
                  memoriseCompleted: true,
                  recallCompleted: false,
                  activeRecallCompleted: false,
                  bestTimeMs: timeMs,
                  bestDate: currentDate,
                });
              }
            }
            
            newPlayer = {
              ...newPlayer,
              sm2CycleProgress: newCycleProgress,
            };
          }
        }
        
        // Get the expected answer based on current direction
        const correctAnswer = currentDirection === 'finnish-to-english' 
          ? currentWordState.english 
          : currentWordState.finnish;
        
        // Show progress in feedback with direction info
        let progressInfo: string;
        if (shouldEliminate) {
          progressInfo = '✓ Opittu!';
        } else if (isCorrect) {
          const nextDirection = newDirection === 'english-to-finnish' ? '(seuraava: suomeksi)' : '';
          progressInfo = `${newConsecutiveCorrect}/${newRequiredCorrect} oikein ${nextDirection}`;
        } else {
          progressInfo = `Tarvitset ${newRequiredCorrect}x oikein peräkkäin`;
        }
        
        const feedback: FeedbackData = {
          isCorrect,
          userAnswer: action.answer,
          correctAnswer,
          rule: progressInfo, // Using rule field for progress info
        };
        
        return {
          ...state,
          player: newPlayer,
          vocabularySession: newVocabSession,
          feedback,
        };
      }
      
      // Handle cases mode
      if (state.mode === 'cases-fill-blank') {
        if (!state.casesSession || !state.currentCaseSentence) return state;
        
        const casesSession = state.casesSession;
        const currentSentenceState = casesSession.sentences[casesSession.currentSentenceIndex];
        
        const isCorrect = checkCasesAnswer(currentSentenceState, action.answer);
        const newWrongForSentence = currentSentenceState.wrongCount + (isCorrect ? 0 : 1);
        const shouldEliminate = isCorrect;
        
        const newSentenceState: CaseSentenceState = {
          ...currentSentenceState,
          correctCount: isCorrect ? currentSentenceState.correctCount + 1 : currentSentenceState.correctCount,
          wrongCount: newWrongForSentence,
          eliminated: shouldEliminate,
        };
        
        const newSentences = [...casesSession.sentences];
        newSentences[casesSession.currentSentenceIndex] = newSentenceState;
        
        const newWrongCount = casesSession.wrongCount + (isCorrect ? 0 : 1);
        const newCasesSession: CasesSessionState = {
          ...casesSession,
          sentences: newSentences,
          wrongCount: newWrongCount,
        };
        
        const activeCount = getActiveSentenceCount(newCasesSession);
        const isComplete = activeCount === 0;
        
        let newPlayer = state.player;
        
        if (isComplete) {
          newCasesSession.isComplete = true;
          newCasesSession.endTime = Date.now();
          
          // Save progress if completed with 0 mistakes
          if (newCasesSession.wrongCount === 0) {
            const timeMs = newCasesSession.endTime - (newCasesSession.startTime || newCasesSession.endTime);
            const currentDate = new Date().toISOString().split('T')[0];
            
            const existingProgress = state.player.casesProgress || [];
            const newCasesProgress = [...existingProgress];
            
            for (const category of newCasesSession.selectedCategories) {
              const existingIdx = newCasesProgress.findIndex(cp => cp.category === category);
              
              if (existingIdx >= 0) {
                const existing = newCasesProgress[existingIdx];
                const updates: any = { fillBlankCompleted: true };
                
                if (!existing.bestTimeMs || timeMs < existing.bestTimeMs) {
                  updates.bestTimeMs = timeMs;
                  updates.bestDate = currentDate;
                }
                
                newCasesProgress[existingIdx] = { ...existing, ...updates };
              } else {
                newCasesProgress.push({
                  category,
                  fillBlankCompleted: true,
                  bestTimeMs: timeMs,
                  bestDate: currentDate,
                });
              }
            }
            
            newPlayer = {
              ...state.player,
              casesProgress: newCasesProgress,
            };
          }
        }
        
        // Build feedback with case-specific learning info
        const correctAnswer = getCasesExpectedAnswer(currentSentenceState);
        const caseInfo = getCaseFeedbackInfo(currentSentenceState);
        
        const feedback: FeedbackData = {
          isCorrect,
          userAnswer: action.answer,
          correctAnswer,
          rule: !isCorrect ? caseInfo.rule : undefined,
          verbTypeInfo: !isCorrect ? caseInfo.caseInfo : undefined,
        };
        
        return {
          ...state,
          player: newPlayer,
          casesSession: newCasesSession,
          feedback,
        };
      }
      
      // Handle partitive mode
      if (state.mode === 'partitive') {
        if (!state.partitiveSession || !state.currentPartitiveWord) return state;
        
        const partitiveSession = state.partitiveSession;
        const currentWordState = partitiveSession.words[partitiveSession.currentWordIndex];
        
        const normalizedAnswer = action.answer.trim().toLowerCase();
        const isCorrect = normalizedAnswer === currentWordState.partitive.toLowerCase();
        
        const shouldEliminate = isCorrect;
        
        const newWordState: PartitiveWordState = {
          ...currentWordState,
          correctCount: isCorrect ? currentWordState.correctCount + 1 : currentWordState.correctCount,
          wrongCount: currentWordState.wrongCount + (isCorrect ? 0 : 1),
          eliminated: shouldEliminate,
        };
        
        const newWords = [...partitiveSession.words];
        newWords[partitiveSession.currentWordIndex] = newWordState;
        
        const newWrongCount = partitiveSession.wrongCount + (isCorrect ? 0 : 1);
        const activeCount = newWords.filter(w => !w.eliminated).length;
        const isComplete = activeCount === 0;
        
        const newPartitiveSession: PartitiveSessionState = {
          ...partitiveSession,
          words: newWords,
          wrongCount: newWrongCount,
          isComplete,
          endTime: isComplete ? Date.now() : null,
        };
        
        // Build feedback with rule info
        const ruleInfo = getRuleInfo(currentWordState.rule);
        
        const feedback: FeedbackData = {
          isCorrect,
          userAnswer: action.answer,
          correctAnswer: currentWordState.partitive,
          rule: !isCorrect ? ruleInfo?.formation : undefined,
          verbTypeInfo: !isCorrect ? ruleInfo?.name : undefined,
        };
        
        return {
          ...state,
          partitiveSession: newPartitiveSession,
          feedback,
        };
      }
      
      // Handle lyrics mode
      if (state.mode === 'lyrics') {
        if (!state.lyricsSession || !state.currentLyricsItem) return state;
        
        const lyricsSession = state.lyricsSession;
        const subMode = lyricsSession.subMode;
        let isCorrect = false;
        let expectedAnswer = '';
        const normalizedAnswer = action.answer.trim().toLowerCase();
        
        if (subMode === 'word-match') {
          // User selects from multiple choice
          expectedAnswer = state.currentLyricsItem.english || '';
          isCorrect = normalizedAnswer === expectedAnswer.toLowerCase();
        } else if (subMode === 'word-recall') {
          // User types Finnish word from English
          expectedAnswer = state.currentLyricsItem.finnish || '';
          isCorrect = normalizedAnswer === expectedAnswer.toLowerCase();
        } else if (subMode === 'line-translate') {
          // User selects correct English translation
          expectedAnswer = state.currentLyricsItem.englishLine || '';
          isCorrect = normalizedAnswer === expectedAnswer.toLowerCase();
        } else if (subMode === 'fill-blank') {
          // User fills in missing word
          expectedAnswer = state.currentLyricsItem.missingWord || '';
          isCorrect = normalizedAnswer === expectedAnswer.toLowerCase();
        } else if (subMode === 'word-order') {
          // User arranges words - answer is comma-separated words
          expectedAnswer = state.currentLyricsItem.finnishLine || '';
          const userWords = action.answer.split(',').map(w => w.trim()).join(' ');
          isCorrect = userWords.toLowerCase() === expectedAnswer.toLowerCase();
        }
        
        // Update word or line state based on mode
        let newWords = [...lyricsSession.words];
        let newLines = [...lyricsSession.lines];
        let shouldEliminate = false;
        
        if (subMode === 'word-match' || subMode === 'word-recall') {
          const currentWordState = lyricsSession.words[lyricsSession.currentWordIndex];
          const newConsecutive = isCorrect ? currentWordState.consecutiveCorrect + 1 : 0;
          shouldEliminate = isCorrect && newConsecutive >= 2; // Need 2 correct to eliminate
          
          newWords[lyricsSession.currentWordIndex] = {
            ...currentWordState,
            correctCount: isCorrect ? currentWordState.correctCount + 1 : currentWordState.correctCount,
            wrongCount: isCorrect ? currentWordState.wrongCount : currentWordState.wrongCount + 1,
            eliminated: shouldEliminate,
            consecutiveCorrect: newConsecutive,
          };
        } else {
          // Line-based modes
          const currentLineState = lyricsSession.lines[lyricsSession.currentLineIndex];
          shouldEliminate = isCorrect;
          
          newLines[lyricsSession.currentLineIndex] = {
            ...currentLineState,
            correctCount: isCorrect ? currentLineState.correctCount + 1 : currentLineState.correctCount,
            wrongCount: isCorrect ? currentLineState.wrongCount : currentLineState.wrongCount + 1,
            eliminated: shouldEliminate,
          };
        }
        
        const newWrongCount = lyricsSession.wrongCount + (isCorrect ? 0 : 1);
        const activeWordCount = newWords.filter(w => !w.eliminated).length;
        
        // For line-based modes, check if we've reached the last line and answered correctly
        const isWordMode = subMode === 'word-match' || subMode === 'word-recall';
        const isLastLine = lyricsSession.currentLineIndex === lyricsSession.lines.length - 1;
        
        const isComplete = isWordMode 
          ? activeWordCount === 0 
          : (isLastLine && isCorrect); // Complete when last line is answered correctly
        
        const newLyricsSession: LyricsSessionState = {
          ...lyricsSession,
          words: newWords,
          lines: newLines,
          wrongCount: newWrongCount,
          isComplete,
          endTime: isComplete ? Date.now() : null,
        };
        
        const feedback: FeedbackData = {
          isCorrect,
          userAnswer: action.answer,
          correctAnswer: expectedAnswer,
          exampleSentence: state.currentLyricsItem.finnishLine,
          exampleTranslation: state.currentLyricsItem.englishLine,
        };
        
        return {
          ...state,
          lyricsSession: newLyricsSession,
          feedback,
        };
      }
      
      // Regular verb modes
      if (!state.session || !state.currentVerb) return state;

      const verbsForSession = getVerbsForLevels(currentSessionLevels);
      const isCorrect = checkAnswer(state.mode, state.currentVerb, action.answer, state.currentPerson, state.currentPolarity);
      const currentVerbState = state.session.verbs[state.session.currentVerbIndex];

      const newWrongForVerb = currentVerbState.wrongCount + (isCorrect ? 0 : 1);
      const shouldEliminate = isCorrect;
      
      const newVerbState: VerbSessionState = {
        ...currentVerbState,
        correctCount: isCorrect ? currentVerbState.correctCount + 1 : currentVerbState.correctCount,
        wrongCount: newWrongForVerb,
        eliminated: shouldEliminate,
      };

      const newVerbs = [...state.session.verbs];
      newVerbs[state.session.currentVerbIndex] = newVerbState;

      const newWrongCount = state.session.wrongCount + (isCorrect ? 0 : 1);
      const newSession: SessionState = {
        ...state.session,
        verbs: newVerbs,
        wrongCount: newWrongCount,
      };

      const activeCount = getActiveVerbCount(newSession);
      const isComplete = activeCount === 0;

      let newPlayer = state.player;

      if (isComplete) {
        newSession.isComplete = true;
        newSession.endTime = Date.now();
        
        const timeMs = newSession.endTime - state.session.startTime!;
        const totalAttempts = newVerbs.reduce((sum, v) => sum + v.correctCount, 0) + newWrongCount;
        const accuracy = Math.round(((totalAttempts - newWrongCount) / totalAttempts) * 100);
        const isPerfect = newWrongCount === 0;

        const record: TimeRecord = {
          mode: state.mode,
          levels: currentSessionLevels,
          timeMs,
          date: new Date().toISOString().split('T')[0],
          accuracy,
          verbCount: newVerbs.length,
        };

        const newBestTimes = [...state.player.bestTimes];
        const levelKey = currentSessionLevels.sort().join('+');
        const existingIdx = newBestTimes.findIndex(
          (r) => r.mode === state.mode && r.levels.sort().join('+') === levelKey
        );
        
        if (existingIdx === -1 || newBestTimes[existingIdx].timeMs > timeMs) {
          if (existingIdx === -1) {
            newBestTimes.push(record);
          } else {
            newBestTimes[existingIdx] = record;
          }
        }

        const newLevelProgress = state.player.levelProgress.map((lp) => {
          if (currentSessionLevels.includes(lp.level) && isPerfect) {
            if (state.mode === 'recall') {
              return { ...lp, recallCompleted: true };
            } else if (state.mode === 'active-recall') {
              return { ...lp, activeRecallCompleted: true };
            } else if (state.mode === 'conjugation') {
              return { ...lp, conjugationCompleted: true };
            } else if (state.mode === 'imperfect') {
              return { ...lp, imperfectCompleted: true };
            }
          }
          return lp;
        });

        newPlayer = {
          ...state.player,
          bestTimes: newBestTimes,
          levelProgress: newLevelProgress,
        };
      }

      // Build detailed feedback
      const correctAnswer = getExpectedAnswer(state.mode, state.currentVerb, state.currentPerson, state.currentPolarity);
      const typeInfo = verbTypeInfo[state.currentVerb.type];
      
      const feedback: FeedbackData = {
        isCorrect,
        userAnswer: action.answer,
        correctAnswer,
        // Extended feedback for wrong answers
        verbType: !isCorrect ? state.currentVerb.type : undefined,
        verbTypeInfo: !isCorrect ? typeInfo?.name : undefined,
        rule: !isCorrect ? (state.currentPolarity === 'negative' ? negativeInfo.rule : typeInfo?.rule) : undefined,
        similarVerbs: !isCorrect ? getSimilarVerbs(state.currentVerb.type, state.currentVerb.infinitive, verbsForSession) : undefined,
        fullConjugation: !isCorrect && (state.mode === 'conjugation' || state.mode === 'imperfect') && state.currentVerb.forms 
          ? (state.mode === 'conjugation' 
              ? (state.currentPolarity === 'positive' ? state.currentVerb.forms.present : state.currentVerb.forms.negative)
              : state.currentVerb.forms.imperfect) // Imperfect mode only shows positive forms
          : undefined,
      };

      return {
        ...state,
        session: newSession,
        player: newPlayer,
        feedback,
      };
    }

    case 'NEXT_VERB': {
      // Handle verb type arena modes
      if (state.mode === 'verb-type-present' || state.mode === 'verb-type-imperfect') {
        if (!state.verbTypeSession) return state;
        
        const session = state.verbTypeSession;
        const currentVerb = session.verbs[session.currentVerbIndex];
        
        // If current verb is completed, move to next verb
        if (currentVerb.completed) {
          const nextVerbIndex = session.currentVerbIndex + 1;
          
          if (nextVerbIndex >= session.verbs.length || session.isComplete) {
            return {
              ...state,
              feedback: null,
            };
          }
          
          return {
            ...state,
            verbTypeSession: {
              ...session,
              currentVerbIndex: nextVerbIndex,
            },
            feedback: null,
          };
        }
        
        // Stay on current verb (still has forms to complete)
        return {
          ...state,
          feedback: null,
        };
      }
      
      // Handle consonant gradation mode
      if (state.mode === 'consonant-gradation') {
        if (!state.gradationSession) return state;
        
        const session = state.gradationSession;
        const currentRule = getCurrentRule(state);
        if (!currentRule) return state;
        
        // Move to next question in current stage
        const currentQuestions = getCurrentPracticeQuestions(state);
        const nextQuestionIndex = session.currentQuestionIndex + 1;
        
        // Check if we've finished current stage
        if (nextQuestionIndex >= currentQuestions.length) {
          // Move to next stage
          if (session.currentStage === 'noun-practice') {
            // Check if there are verb examples for this rule
            const verbQuestions = createPracticeQuestions(currentRule).filter(q => q.category === 'verb');
            if (verbQuestions.length === 0) {
              // No verb examples - skip to next rule
              const allRules = getAllRules();
              const nextRuleIndex = session.currentRuleIndex + 1;
              
              if (nextRuleIndex >= allRules.length) {
                // All rules completed
                return {
                  ...state,
                  gradationSession: {
                    ...session,
                    isComplete: true,
                    endTime: Date.now(),
                  },
                  feedback: null,
                };
              }
              
              // Start next rule
              return {
                ...state,
                gradationSession: {
                  ...session,
                  currentRuleIndex: nextRuleIndex,
                  currentStage: 'rule-confirm',
                  currentQuestionIndex: 0,
                },
                currentGradationQuestion: undefined,
                feedback: null,
              };
            }
            
            // Move to verb guide (show explanation before verb practice)
            return {
              ...state,
              gradationSession: {
                ...session,
                currentStage: 'verb-guide',
                currentQuestionIndex: 0,
              },
              currentGradationQuestion: undefined,
              feedback: null,
            };
          } else if (session.currentStage === 'verb-practice') {
            // Move to next rule
            const allRules = getAllRules();
            const nextRuleIndex = session.currentRuleIndex + 1;
            
            if (nextRuleIndex >= allRules.length) {
              // All rules completed
              return {
                ...state,
                gradationSession: {
                  ...session,
                  isComplete: true,
                  endTime: Date.now(),
                },
                feedback: null,
              };
            }
            
            // Start next rule (begin with rule confirmation)
            return {
              ...state,
              gradationSession: {
                ...session,
                currentRuleIndex: nextRuleIndex,
                currentStage: 'rule-confirm',
                currentQuestionIndex: 0,
              },
              currentGradationQuestion: undefined,
              feedback: null,
            };
          }
        }
        
        // Move to next question in current stage
        const nextQuestion = currentQuestions[nextQuestionIndex];
        
        return {
          ...state,
          gradationSession: {
            ...session,
            currentQuestionIndex: nextQuestionIndex,
          },
          currentGradationQuestion: nextQuestion,
          feedback: null,
        };
      }
      
      // Handle vocabulary modes
      if (state.mode === 'vocabulary-recall' || state.mode === 'vocabulary-active-recall') {
        if (!state.vocabularySession) return state;
        
        const nextIndex = getNextActiveWordIndex(
          state.vocabularySession,
          state.vocabularySession.currentWordIndex + 1
        );
        
        if (nextIndex === -1 || state.vocabularySession.isComplete) {
          return {
            ...state,
            feedback: null,
          };
        }
        
        const nextWord = state.vocabularySession.words[nextIndex];
        
        return {
          ...state,
          vocabularySession: {
            ...state.vocabularySession,
            currentWordIndex: nextIndex,
          },
          currentVocabularyWord: {
            finnish: nextWord.finnish,
            english: nextWord.english,
          },
          feedback: null,
        };
      }
      
      // Handle memorise mode - may stay on same word or move to next
      if (state.mode === 'vocabulary-memorise') {
        if (!state.vocabularySession) return state;
        
        const currentWord = state.vocabularySession.words[state.vocabularySession.currentWordIndex];
        
        // If current word is eliminated, move to next
        if (currentWord.eliminated) {
          const nextIndex = getNextActiveWordIndex(
            state.vocabularySession,
            state.vocabularySession.currentWordIndex + 1
          );
          
          if (nextIndex === -1 || state.vocabularySession.isComplete) {
            return {
              ...state,
              feedback: null,
            };
          }
          
          const nextWord = state.vocabularySession.words[nextIndex];
          
          return {
            ...state,
            vocabularySession: {
              ...state.vocabularySession,
              currentWordIndex: nextIndex,
            },
            currentVocabularyWord: {
              finnish: nextWord.finnish,
              english: nextWord.english,
            },
            feedback: null,
          };
        }
        
        // Stay on current word (need more correct answers)
        return {
          ...state,
          feedback: null,
        };
      }
      
      // Handle cases mode
      if (state.mode === 'cases-fill-blank') {
        if (!state.casesSession) return state;
        
        const nextIndex = getNextActiveSentenceIndex(
          state.casesSession,
          state.casesSession.currentSentenceIndex + 1
        );
        
        if (nextIndex === -1 || state.casesSession.isComplete) {
          return {
            ...state,
            feedback: null,
          };
        }
        
        const nextSentence = state.casesSession.sentences[nextIndex];
        
        return {
          ...state,
          casesSession: {
            ...state.casesSession,
            currentSentenceIndex: nextIndex,
          },
          currentCaseSentence: {
            id: nextSentence.id,
            finnish: nextSentence.finnish,
            english: nextSentence.english,
            caseUsed: nextSentence.caseUsed,
            wordInCase: nextSentence.wordInCase,
            baseWord: nextSentence.baseWord,
            sentenceWithBlank: nextSentence.sentenceWithBlank,
            hint: nextSentence.hint,
          },
          feedback: null,
        };
      }
      
      // Handle partitive mode
      if (state.mode === 'partitive') {
        if (!state.partitiveSession) return state;
        
        const session = state.partitiveSession;
        const activeWords = session.words.filter(w => !w.eliminated);
        
        if (activeWords.length === 0 || session.isComplete) {
          return {
            ...state,
            feedback: null,
          };
        }
        
        // Find next active word
        let nextIndex = session.currentWordIndex + 1;
        while (nextIndex < session.words.length && session.words[nextIndex].eliminated) {
          nextIndex++;
        }
        
        // Wrap around if needed
        if (nextIndex >= session.words.length) {
          nextIndex = 0;
          while (nextIndex < session.words.length && session.words[nextIndex].eliminated) {
            nextIndex++;
          }
        }
        
        const nextWord = session.words[nextIndex];
        
        return {
          ...state,
          partitiveSession: {
            ...session,
            currentWordIndex: nextIndex,
          },
          currentPartitiveWord: {
            nominative: nextWord.nominative,
            partitive: nextWord.partitive,
            translation: nextWord.translation,
            rule: nextWord.rule,
            hint: nextWord.hint,
          },
          feedback: null,
        };
      }
      
      // Handle lyrics mode
      if (state.mode === 'lyrics') {
        if (!state.lyricsSession) return state;
        
        const session = state.lyricsSession;
        const subMode = session.subMode;
        const isWordMode = subMode === 'word-match' || subMode === 'word-recall';
        
        if (isWordMode) {
          const activeWords = session.words.filter(w => !w.eliminated);
          
          if (activeWords.length === 0 || session.isComplete) {
            return { ...state, feedback: null };
          }
          
          // Find next active word
          let nextIndex = session.currentWordIndex + 1;
          while (nextIndex < session.words.length && session.words[nextIndex].eliminated) {
            nextIndex++;
          }
          if (nextIndex >= session.words.length) {
            nextIndex = 0;
            while (nextIndex < session.words.length && session.words[nextIndex].eliminated) {
              nextIndex++;
            }
          }
          
          const nextWord = session.words[nextIndex];
          
          // Generate new options for word-match
          let options: string[] | undefined;
          if (subMode === 'word-match') {
            const otherWords = session.words.filter(w => w.finnish !== nextWord.finnish && !w.eliminated);
            const wrongOptions = otherWords
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map(w => w.english);
            options = [nextWord.english, ...wrongOptions].sort(() => Math.random() - 0.5);
          }
          
          return {
            ...state,
            lyricsSession: { ...session, currentWordIndex: nextIndex },
            currentLyricsItem: {
              finnish: nextWord.finnish,
              english: nextWord.english,
              grammarNote: nextWord.grammarNote,
              baseForm: nextWord.baseForm,
              options,
            },
            feedback: null,
          };
        } else {
          // Line-based modes - follow song sequence
          if (session.isComplete) {
            return { ...state, feedback: null };
          }
          
          // Simply go to the next line in sequence
          const nextIndex = session.currentLineIndex + 1;
          
          // Check if we've reached the end of the song
          if (nextIndex >= session.lines.length) {
            return { ...state, feedback: null };
          }
          
          const nextLine = session.lines[nextIndex];
          let currentLyricsItem: CurrentLyricsItem = {
            finnishLine: nextLine.finnish,
            englishLine: nextLine.english,
          };
          
          if (subMode === 'line-translate') {
            // Get wrong options from other lines in the song
            const otherLines = session.lines.filter(l => l.finnish !== nextLine.finnish);
            const wrongOptions = otherLines
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map(l => l.english);
            currentLyricsItem.options = [nextLine.english, ...wrongOptions].sort(() => Math.random() - 0.5);
          } else if (subMode === 'fill-blank') {
            // Need to get original words - for now just use simple word split
            const wordsInLine = nextLine.finnish.split(/\s+/);
            if (wordsInLine.length > 0) {
              const blankIdx = Math.floor(Math.random() * wordsInLine.length);
              const blankWord = wordsInLine[blankIdx];
              const sentenceWithBlank = nextLine.finnish.replace(
                new RegExp(`\\b${blankWord}\\b`, 'i'),
                '_____'
              );
              currentLyricsItem.sentenceWithBlank = sentenceWithBlank;
              currentLyricsItem.missingWord = blankWord;
            }
          } else if (subMode === 'word-order') {
            const wordsInOrder = nextLine.finnish.split(/\s+/);
            const shuffled = [...wordsInOrder].sort(() => Math.random() - 0.5);
            currentLyricsItem.correctOrder = wordsInOrder;
            currentLyricsItem.shuffledWords = shuffled;
          }
          
          return {
            ...state,
            lyricsSession: { ...session, currentLineIndex: nextIndex },
            currentLyricsItem,
            feedback: null,
          };
        }
      }
      
      // Regular verb modes
      if (!state.session) return state;

      const nextIndex = getNextActiveVerbIndex(
        state.session,
        state.session.currentVerbIndex + 1
      );

      if (nextIndex === -1 || state.session.isComplete) {
        return {
          ...state,
          feedback: null,
        };
      }

      const verbsForSession = getVerbsForLevels(currentSessionLevels);
      const nextVerb = verbsForSession.find(
        (v) => v.infinitive === state.session!.verbs[nextIndex].infinitive
      )!;

      // For conjugation and imperfect, randomize person and polarity for next verb
      const isConjugation = state.mode === 'conjugation';
      const isImperfect = state.mode === 'imperfect';
      const person = (isConjugation || isImperfect) ? getRandomPerson() : state.currentPerson;
      const polarity = (isConjugation || isImperfect) ? getRandomPolarity() : state.currentPolarity;
      const sentence = isConjugation && person && polarity 
        ? getRandomSentence(person, polarity)
        : isImperfect && person && polarity
        ? getRandomImperfectSentence(person, polarity)
        : undefined;

      return {
        ...state,
        session: {
          ...state.session,
          currentVerbIndex: nextIndex,
        },
        currentVerb: nextVerb,
        feedback: null,
        currentPerson: person,
        currentPolarity: polarity,
        currentSentence: sentence,
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
        currentPerson: undefined,
        currentPolarity: undefined,
        currentSentence: undefined,
        currentGradationQuestion: undefined,
        gradationSession: undefined,
        vocabularySession: undefined,
        currentVocabularyWord: undefined,
        casesSession: undefined,
        currentCaseSentence: undefined,
        verbTypeSession: undefined,
        partitiveSession: undefined,
        currentPartitiveWord: undefined,
        lyricsSession: undefined,
        currentLyricsItem: undefined,
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
  const [isLoading, setIsLoading] = useState(true);
  const isInitialLoad = useRef(true);
  
  // Verb Type Arena state
  const [selectedVerbTypes, setSelectedVerbTypes] = useState<number[]>([1]);

  // Load state from CSV on initial mount
  useEffect(() => {
    async function loadState() {
      try {
        const saved = await loadFromCSV();
        if (saved) {
          // Ensure all fields exist
          saved.levelProgress = saved.levelProgress.map((lp) => ({
            ...lp,
            conjugationCompleted: lp.conjugationCompleted ?? false,
            imperfectCompleted: lp.imperfectCompleted ?? false,
          }));
          dispatch({ type: 'LOAD_STATE', state: saved });
        }
      } catch (error) {
        console.warn('Failed to load from CSV:', error);
      } finally {
        setIsLoading(false);
        isInitialLoad.current = false;
      }
    }
    loadState();
  }, []);

  // Save state to CSV whenever player state changes (but not on initial load)
  useEffect(() => {
    if (isInitialLoad.current) return;
    
    // Save to localStorage immediately (sync backup)
    savePlayerState(state.player);
    
    // Save to CSV file (async)
    saveToCSV(state.player).catch((error) => {
      console.warn('Failed to save to CSV:', error);
    });
  }, [state.player]);

  // Verb Type Arena functions
  const startVerbTypeSession = useCallback((tense: 'present' | 'imperfect', types: number[]) => {
    dispatch({ type: 'START_VERB_TYPE_SESSION', tense, types });
  }, []);
  
  const getVerbCountByTypes = useCallback((types: number[]) => {
    return getVerbsByTypes(types).filter(v => v.forms).length;
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

  const resetProgress = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    const initialState = getInitialPlayerState();
    dispatch({ type: 'LOAD_STATE', state: initialState });
    // Also reset the CSV file
    try {
      await saveToCSV(initialState);
    } catch (error) {
      console.warn('Failed to reset CSV:', error);
    }
  }, []);

  // Vocabulary (Kurssin Arvostelu) related
  const [selectedTavoites, setSelectedTavoites] = useState<number[]>([1]);
  
  const startVocabularySession = useCallback((mode: 'vocabulary-recall' | 'vocabulary-active-recall', tavoites: number[]) => {
    dispatch({ type: 'START_VOCABULARY_SESSION', mode, tavoites, source: 'kurssin-arvostelu' });
  }, []);
  
  const getTavoiteWordCount = useCallback((tavoites: number[]) => {
    return getWordCountForTavoites(tavoites);
  }, []);

  // Suomen Mestari 2 related
  const [selectedSM2Chapters, setSelectedSM2Chapters] = useState<number[]>([1]);
  
  const startSM2Session = useCallback((mode: 'vocabulary-recall' | 'vocabulary-active-recall', cycleIds: string[]) => {
    dispatch({ type: 'START_SM2_SESSION', mode, cycleIds });
  }, []);
  
  const startSM2MemoriseSession = useCallback((cycleIds: string[]) => {
    dispatch({ type: 'START_SM2_MEMORISE_SESSION', cycleIds });
  }, []);
  
  const getSM2WordCount = useCallback((chapters: number[]) => {
    return getSM2WordCountForChapters(chapters);
  }, []);
  
  const getSM2CycleWordCount = useCallback((cycleIds: string[]) => {
    return getSM2WordCountForCycles(cycleIds);
  }, []);

  // Cases Arena related - default to 'static' (where? - inessive + adessive) as a good starting point
  const [selectedCaseCategories, setSelectedCaseCategories] = useState<CaseCategory[]>(['static']);
  
  const startCasesSession = useCallback((categories: CaseCategory[]) => {
    dispatch({ type: 'START_CASES_SESSION', categories });
  }, []);
  
  const getCasesSentenceCount = useCallback((categories: CaseCategory[]) => {
    let count = 0;
    const seenIds = new Set<string>();
    for (const category of categories) {
      const sentences = getSentencesByCategory(category);
      for (const s of sentences) {
        if (!seenIds.has(s.id)) {
          seenIds.add(s.id);
          count++;
        }
      }
    }
    return count;
  }, []);
  
  // Partitive session actions
  const [selectedPartitiveRules, setSelectedPartitiveRules] = useState<PartitiveRule[]>(['single-vowel']);
  
  const startPartitiveSession = useCallback((rules: PartitiveRule[]) => {
    dispatch({ type: 'START_PARTITIVE_SESSION', rules });
  }, []);
  
  const getPartitiveWordCount = useCallback((rules: PartitiveRule[]) => {
    return getWordsForRules(rules).length;
  }, []);
  
  // Lyrics Learning related
  const [selectedSongId, setSelectedSongId] = useState<string>(SONGS[0]?.id || '');
  const [selectedLyricsMode, setSelectedLyricsMode] = useState<LyricsSubMode>('word-match');
  
  const startLyricsSession = useCallback((songId: string, subMode: LyricsSubMode) => {
    dispatch({ type: 'START_LYRICS_SESSION', songId, subMode });
  }, []);
  
  const getSongInfo = useCallback((songId: string) => {
    const song = getSongById(songId);
    if (!song) return null;
    return {
      title: song.title,
      artist: song.artist,
      wordCount: getSongWords(song).length,
      lineCount: getUniqueSongLines(song).length,
      difficulty: song.difficulty,
    };
  }, []);

  return {
    state,
    submitAnswer,
    nextVerb,
    clearFeedback,
    returnToMenu,
    exportTimes,
    resetProgress,
    isLoading,
    // Verb Type Arena exports
    selectedVerbTypes,
    setSelectedVerbTypes,
    startVerbTypeSession,
    getVerbCountByTypes,
    // Vocabulary exports (Kurssin Arvostelu)
    selectedTavoites,
    setSelectedTavoites,
    startVocabularySession,
    getTavoiteWordCount,
    allTavoites: getAllTavoites(),
    // Suomen Mestari 2 exports
    selectedSM2Chapters,
    setSelectedSM2Chapters,
    startSM2Session,
    startSM2MemoriseSession,
    getSM2WordCount,
    getSM2CycleWordCount,
    allSM2Chapters: getAllSM2Chapters(),
    allSM2Cycles: getAllSM2Cycles(),
    getSM2CyclesForChapter,
    // Cases exports
    selectedCaseCategories,
    setSelectedCaseCategories,
    startCasesSession,
    getCasesSentenceCount,
    caseGroups: CASE_GROUPS,
    // Partitive exports
    selectedPartitiveRules,
    setSelectedPartitiveRules,
    startPartitiveSession,
    getPartitiveWordCount,
    partitiveRules: PARTITIVE_RULES,
    // Lyrics Learning exports
    selectedSongId,
    setSelectedSongId,
    selectedLyricsMode,
    setSelectedLyricsMode,
    startLyricsSession,
    getSongInfo,
    allSongs: SONGS,
  };
}
