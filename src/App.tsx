import { useState, useEffect } from 'react';
import './App.css';
import { useGameState, formatTime } from './hooks/useGameState';
import { Menu } from './components/Menu';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { StudyScreen } from './components/StudyScreen';
import { getSM2CycleById } from './data/suomenMestari2';

function App() {
  const [lastActiveTab, setLastActiveTab] = useState<'verbs' | 'vocabulary' | 'cases' | 'reading'>('verbs');
  const [studyMode, setStudyMode] = useState<{ active: boolean; cycleIds: string[] }>({ active: false, cycleIds: [] });
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
    if (state.mode === 'vocabulary-memorise') {
      // Memorise mode (only SM2)
      if (state.vocabularySession?.source === 'suomen-mestari-2') {
        startSM2MemoriseSession(state.vocabularySession.selectedCycles || []);
      }
    } else if (state.mode === 'vocabulary-recall' || state.mode === 'vocabulary-active-recall') {
      // Regular vocabulary (Tavoite or SM2)
      if (state.vocabularySession?.source === 'suomen-mestari-2') {
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

  const handleStartStudy = (cycleIds: string[]) => {
    setStudyMode({ active: true, cycleIds });
  };

  const handleCloseStudy = () => {
    setStudyMode({ active: false, cycleIds: [] });
  };

  const handleStartMemorizeFromStudy = () => {
    const cycleIds = studyMode.cycleIds;
    setStudyMode({ active: false, cycleIds: [] });
    startSM2MemoriseSession(cycleIds);
  };

  // Get cycles for study mode
  const studyCycles = studyMode.cycleIds
    .map(id => getSM2CycleById(id))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  // Show study screen if active
  if (studyMode.active && studyCycles.length > 0) {
    return (
      <div className="app">
        <StudyScreen
          cycles={studyCycles}
          onClose={handleCloseStudy}
          onStartMemorize={handleStartMemorizeFromStudy}
        />
      </div>
    );
  }

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
          onStartSM2Study={handleStartStudy}
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
