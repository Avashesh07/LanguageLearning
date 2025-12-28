import { useState, useEffect } from 'react';
import './App.css';
import { useGameState, formatTime } from './hooks/useGameState';
import { Menu } from './components/Menu';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';

function App() {
  const [lastActiveTab, setLastActiveTab] = useState<'verbs' | 'vocabulary' | 'cases' | 'reading'>('verbs');
  const {
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
    // Vocabulary (Kurssin Arvostelu)
    selectedTavoites,
    setSelectedTavoites,
    startVocabularySession,
    getTavoiteWordCount,
    allTavoites,
    // Suomen Mestari 2
    selectedSM2Chapters,
    setSelectedSM2Chapters,
    startSM2Session,
    startSM2MemoriseSession,
    getSM2WordCount,
    getSM2CycleWordCount,
    allSM2Chapters,
    allSM2Cycles,
    getSM2CyclesForChapter,
    // Cases
    selectedCaseCategories,
    setSelectedCaseCategories,
    startCasesSession,
    getCasesSentenceCount,
    caseGroups,
    // Reading
    startReadingSession,
    submitReadingAnswer,
    toggleReadingVocabulary,
    finishReading,
  } = useGameState();

  const isSessionComplete = state.session?.isComplete;
  const isGradationComplete = state.gradationSession?.isComplete;
  const isVocabularyComplete = state.vocabularySession?.isComplete;
  const isCasesComplete = state.casesSession?.isComplete;
  const isReadingComplete = state.readingSession?.isComplete;
  const isComplete = isSessionComplete || isGradationComplete || isVocabularyComplete || isCasesComplete || isReadingComplete;

  // Track which tab should be active based on current mode
  useEffect(() => {
    if (state.mode === 'vocabulary-recall' || state.mode === 'vocabulary-active-recall' || state.mode === 'vocabulary-memorise') {
      setLastActiveTab('vocabulary');
    } else if (state.mode === 'cases-fill-blank') {
      setLastActiveTab('cases');
    } else if (state.mode === 'reading') {
      setLastActiveTab('reading');
    } else if (state.mode === 'menu') {
      // Keep the last active tab when returning to menu
      // (don't change it)
    } else {
      // Verb arena modes
      setLastActiveTab('verbs');
    }
  }, [state.mode]);

  const handlePlayAgain = () => {
    if (state.mode === 'vocabulary-recall' || state.mode === 'vocabulary-active-recall' || state.mode === 'vocabulary-memorise') {
      // Regular vocabulary (Tavoite or SM2)
      if (state.vocabularySession?.source === 'suomen-mestari-2' && state.mode === 'vocabulary-memorise') {
        startSM2MemoriseSession(state.vocabularySession.selectedCycles || []);
      } else if (state.vocabularySession?.source === 'suomen-mestari-2') {
        startSM2Session(state.mode, state.vocabularySession.selectedCycles || []);
      } else {
        startVocabularySession(state.mode, selectedTavoites);
      }
    } else if (state.mode === 'cases-fill-blank') {
      startCasesSession(selectedCaseCategories);
    } else if (state.mode === 'reading') {
      // For reading, return to menu to select another article
      returnToMenu();
    } else {
      startSession(state.mode, selectedLevels);
    }
  };

  return (
    <div className="app">
      {state.mode === 'menu' ? (
        <Menu
          player={state.player}
          selectedLevels={selectedLevels}
          onSelectLevels={setSelectedLevels}
          onStartSession={startSession}
          onExportTimes={exportTimes}
          onResetProgress={resetProgress}
          formatTime={formatTime}
          getVerbCountForLevels={getVerbCountForLevels}
          isActiveRecallUnlocked={isActiveRecallUnlocked}
          isConjugationUnlocked={isConjugationUnlocked}
          isImperfectUnlocked={isImperfectUnlocked}
          selectedTavoites={selectedTavoites}
          onSelectTavoites={setSelectedTavoites}
          onStartVocabularySession={startVocabularySession}
          getTavoiteWordCount={getTavoiteWordCount}
          allTavoites={allTavoites}
          selectedSM2Chapters={selectedSM2Chapters}
          onSelectSM2Chapters={setSelectedSM2Chapters}
          onStartSM2Session={startSM2Session}
          onStartSM2MemoriseSession={startSM2MemoriseSession}
          getSM2WordCount={getSM2WordCount}
          getSM2CycleWordCount={getSM2CycleWordCount}
          allSM2Chapters={allSM2Chapters}
          allSM2Cycles={allSM2Cycles}
          getSM2CyclesForChapter={getSM2CyclesForChapter}
          selectedCaseCategories={selectedCaseCategories}
          onSelectCaseCategories={setSelectedCaseCategories}
          onStartCasesSession={startCasesSession}
          getCasesSentenceCount={getCasesSentenceCount}
          caseGroups={caseGroups}
          onStartReading={startReadingSession}
          initialTab={lastActiveTab}
          onTabChange={setLastActiveTab}
        />
      ) : isComplete ? (
        <ResultsScreen
          session={state.session!}
          player={state.player}
          mode={state.mode}
          levels={selectedLevels}
          onReturnToMenu={returnToMenu}
          onPlayAgain={handlePlayAgain}
          formatTime={formatTime}
          gradationSession={state.gradationSession}
          vocabularySession={state.vocabularySession}
          casesSession={state.casesSession}
          readingSession={state.readingSession}
        />
      ) : (
        <GameScreen
          state={state}
          onSubmit={submitAnswer}
          onNextVerb={nextVerb}
          onClearFeedback={clearFeedback}
          onQuit={returnToMenu}
          formatTime={formatTime}
          onSubmitReadingAnswer={submitReadingAnswer}
          onToggleReadingVocabulary={toggleReadingVocabulary}
          onFinishReading={finishReading}
        />
      )}
    </div>
  );
}

export default App;
