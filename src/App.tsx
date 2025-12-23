import './App.css';
import { useGameState } from './hooks/useGameState';
import { Menu } from './components/Menu';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';

function App() {
  const {
    state,
    startSession,
    submitAnswer,
    nextVerb,
    clearFeedback,
    returnToMenu,
    exportTimes,
    resetProgress,
    formatTime,
    verbCount,
  } = useGameState();

  const isSessionComplete = state.session?.isComplete;

  return (
    <div className="app">
      {state.mode === 'menu' ? (
        <Menu
          player={state.player}
          onStartSession={startSession}
          onExportTimes={exportTimes}
          onResetProgress={resetProgress}
          formatTime={formatTime}
          verbCount={verbCount}
        />
      ) : isSessionComplete ? (
        <ResultsScreen
          session={state.session!}
          player={state.player}
          mode={state.mode}
          onReturnToMenu={returnToMenu}
          onPlayAgain={() => startSession(state.mode)}
          formatTime={formatTime}
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
