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
} from '../types';
import { getVerbsForLevels, verbsByLevel, verbTypeInfo, negativeInfo, getRandomSentence, getRandomImperfectSentence } from '../data/verbs';
import { getAllRules, createPracticeQuestions, type GradationRule } from '../data/consonantGradation';
import { saveToCSV, loadFromCSV } from '../utils/csvDatabase';
import { getWordsForTavoites, getAllTavoites, getWordCountForTavoites } from '../data/tavoiteVocabulary';

const STORAGE_KEY = 'finnish-verb-arena-v4';

const PERSONS: Person[] = ['minä', 'sinä', 'hän', 'me', 'te', 'he'];

type GameAction =
  | { type: 'START_SESSION'; mode: GameMode; levels: VerbLevel[] }
  | { type: 'START_VOCABULARY_SESSION'; mode: 'vocabulary-recall' | 'vocabulary-active-recall'; tavoites: number[] }
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
    selectedTavoites: tavoites,
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
      };
    }

    case 'SUBMIT_ANSWER': {
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
              ...state.player,
              tavoiteProgress: newTavoiteProgress,
            };
          }
        }
        
        const correctAnswer = getVocabularyExpectedAnswer(state.mode, currentWordState);
        const feedback: FeedbackData = {
          isCorrect,
          userAnswer: action.answer,
          correctAnswer,
        };
        
        return {
          ...state,
          player: newPlayer,
          vocabularySession: newVocabSession,
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
  const [selectedLevels, setSelectedLevels] = useState<VerbLevel[]>(['A1']);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialLoad = useRef(true);

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

  const startSession = useCallback((mode: GameMode, levels: VerbLevel[]) => {
    dispatch({ type: 'START_SESSION', mode, levels });
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

  const getVerbCountForLevels = useCallback((levels: VerbLevel[]) => {
    return getVerbsForLevels(levels).length;
  }, []);

  const isActiveRecallUnlocked = useCallback((levels: VerbLevel[]) => {
    return levels.every((level) => {
      const progress = state.player.levelProgress.find((lp) => lp.level === level);
      return progress?.recallCompleted;
    });
  }, [state.player.levelProgress]);

  const isConjugationUnlocked = useCallback((levels: VerbLevel[]) => {
    // Conjugation unlocked after completing Active Recall
    return levels.every((level) => {
      const progress = state.player.levelProgress.find((lp) => lp.level === level);
      return progress?.activeRecallCompleted;
    });
  }, [state.player.levelProgress]);

  const isImperfectUnlocked = useCallback((levels: VerbLevel[]) => {
    // Imperfect unlocked after completing Conjugation
    return levels.every((level) => {
      const progress = state.player.levelProgress.find((lp) => lp.level === level);
      return progress?.conjugationCompleted;
    });
  }, [state.player.levelProgress]);

  // Vocabulary (Kurssin Arvostelu) related
  const [selectedTavoites, setSelectedTavoites] = useState<number[]>([1]);
  
  const startVocabularySession = useCallback((mode: 'vocabulary-recall' | 'vocabulary-active-recall', tavoites: number[]) => {
    dispatch({ type: 'START_VOCABULARY_SESSION', mode, tavoites });
  }, []);
  
  const getTavoiteWordCount = useCallback((tavoites: number[]) => {
    return getWordCountForTavoites(tavoites);
  }, []);

  return {
    state,
    selectedLevels,
    setSelectedLevels,
    startSession,
    submitAnswer,
    nextVerb,
    clearFeedback,
    returnToMenu,
    exportTimes,
    resetProgress,
    getVerbCountForLevels,
    isActiveRecallUnlocked,
    isConjugationUnlocked,
    isImperfectUnlocked,
    currentSessionLevels,
    verbsByLevel,
    isLoading,
    // Vocabulary exports
    selectedTavoites,
    setSelectedTavoites,
    startVocabularySession,
    getTavoiteWordCount,
    allTavoites: getAllTavoites(),
  };
}
