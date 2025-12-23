import './App.css';
import { useGameState, formatTime } from './hooks/useGameState';
import { Menu } from './components/Menu';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';

function App() {
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
  } = useGameState();

  const isSessionComplete = state.session?.isComplete;
  const isGradationComplete = state.gradationSession?.isComplete;
  const isComplete = isSessionComplete || isGradationComplete;

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
        />
      ) : isComplete ? (
        <ResultsScreen
          session={state.session!}
          player={state.player}
          mode={state.mode}
          levels={selectedLevels}
          onReturnToMenu={returnToMenu}
          onPlayAgain={() => startSession(state.mode, selectedLevels)}
          formatTime={formatTime}
          gradationSession={state.gradationSession}
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
