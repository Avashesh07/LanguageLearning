import { useState, useEffect } from 'react';
import './App.css';
import { useGameState, formatTime } from './hooks/useGameState';
import { Menu } from './components/Menu';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';

function App() {
  const [lastActiveTab, setLastActiveTab] = useState<'verbs' | 'vocabulary'>('verbs');
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
    // Vocabulary
    selectedTavoites,
    setSelectedTavoites,
    startVocabularySession,
    getTavoiteWordCount,
    allTavoites,
  } = useGameState();

  const isSessionComplete = state.session?.isComplete;
  const isGradationComplete = state.gradationSession?.isComplete;
  const isVocabularyComplete = state.vocabularySession?.isComplete;
  const isComplete = isSessionComplete || isGradationComplete || isVocabularyComplete;

  // Track which tab should be active based on current mode
  useEffect(() => {
    if (state.mode === 'vocabulary-recall' || state.mode === 'vocabulary-active-recall') {
      setLastActiveTab('vocabulary');
    } else if (state.mode === 'menu') {
      // Keep the last active tab when returning to menu
      // (don't change it)
    } else {
      // Verb arena modes
      setLastActiveTab('verbs');
    }
  }, [state.mode]);

  const handlePlayAgain = () => {
    if (state.mode === 'vocabulary-recall' || state.mode === 'vocabulary-active-recall') {
      startVocabularySession(state.mode, selectedTavoites);
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
        />
      ) : (
        <GameScreen
          state={state}
          onSubmit={submitAnswer}
          onNextVerb={nextVerb}
          onClearFeedback={clearFeedback}
          onQuit={returnToMenu}
          formatTime={formatTime}
        />
      )}
    </div>
  );
}

export default App;
