import { useReducer, useEffect, useCallback, useState } from 'react';
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
} from '../types';
import { getVerbsForLevels, verbsByLevel, verbTypeInfo, negativeInfo, getRandomSentence, getRandomImperfectSentence } from '../data/verbs';
import { getAllRules, createPracticeQuestions, type GradationRule } from '../data/consonantGradation';

const STORAGE_KEY = 'finnish-verb-arena-v4';

const PERSONS: Person[] = ['minä', 'sinä', 'hän', 'me', 'te', 'he'];

type GameAction =
  | { type: 'START_SESSION'; mode: GameMode; levels: VerbLevel[] }
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

  useEffect(() => {
    savePlayerState(state.player);
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

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'LOAD_STATE', state: getInitialPlayerState() });
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
  };
}
