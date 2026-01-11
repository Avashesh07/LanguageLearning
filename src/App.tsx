import { useState, useEffect } from 'react';
import './App.css';
import { useGameState, formatTime } from './hooks/useGameState';
import { Menu } from './components/Menu';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { StudyScreen } from './components/StudyScreen';
import { getSM2CycleById } from './data/suomenMestari2';

function App() {
  const [lastActiveTab, setLastActiveTab] = useState<'verbs' | 'vocabulary' | 'cases' | 'partitive' | 'plural' | 'genitive' | 'pikkusanat' | 'lyrics' | 'questions'>('verbs');
  const [studyMode, setStudyMode] = useState<{ active: boolean; cycleIds: string[] }>({ active: false, cycleIds: [] });
  const {
    state,
    submitAnswer,
    nextVerb,
    clearFeedback,
    returnToMenu,
    exportTimes,
    resetProgress,
    // Verb Type Arena
    selectedVerbTypes,
    setSelectedVerbTypes,
    startVerbTypeSession,
    getVerbCountByTypes,
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
    // Partitive
    selectedPartitiveRules,
    setSelectedPartitiveRules,
    startPartitiveSession,
    getPartitiveWordCount,
    partitiveRules,
    // Plural
    selectedPluralRules,
    setSelectedPluralRules,
    startPluralSession,
    getPluralWordCount,
    pluralRules,
    // Genitive
    selectedGenitiveRules,
    setSelectedGenitiveRules,
    startGenitiveSession,
    getGenitiveWordCount,
    genitiveRules,
    // Pikkusanat
    selectedPikkusanaCategories,
    setSelectedPikkusanaCategories,
    startPikkusanatSession,
    getPikkusanaWordCount,
    pikkusanaCategories,
    // Lyrics
    selectedSongId,
    setSelectedSongId,
    selectedLyricsMode,
    setSelectedLyricsMode,
    startLyricsSession,
    getSongInfo,
    allSongs,
    // Question Words
    selectedQuestionCategories,
    setSelectedQuestionCategories,
    selectedQuestionSubMode,
    setSelectedQuestionSubMode,
    startQuestionWordSession,
    getQuestionWordCount,
    questionCategories,
  } = useGameState();

  const isVocabularyComplete = state.vocabularySession?.isComplete;
  const isCasesComplete = state.casesSession?.isComplete;
  const isVerbTypeComplete = state.verbTypeSession?.isComplete;
  const isPartitiveComplete = state.partitiveSession?.isComplete;
  const isPluralComplete = state.pluralSession?.isComplete;
  const isGenitiveComplete = state.genitiveSession?.isComplete;
  const isPikkusanatComplete = state.pikkusanatSession?.isComplete;
  const isLyricsComplete = state.lyricsSession?.isComplete;
  const isQuestionWordsComplete = state.questionWordSession?.isComplete;
  const isComplete = isVocabularyComplete || isCasesComplete || isVerbTypeComplete || isPartitiveComplete || isPluralComplete || isGenitiveComplete || isPikkusanatComplete || isLyricsComplete || isQuestionWordsComplete;

  // Track which tab should be active based on current mode
  useEffect(() => {
    if (state.mode === 'vocabulary-recall' || state.mode === 'vocabulary-active-recall' || state.mode === 'vocabulary-memorise') {
      setLastActiveTab('vocabulary');
    } else if (state.mode === 'cases-fill-blank' || state.mode === 'cases-fill-blank-plural') {
      setLastActiveTab('cases');
    } else if (state.mode === 'partitive' || state.mode === 'partitive-plural') {
      setLastActiveTab('partitive');
    } else if (state.mode === 'plural') {
      setLastActiveTab('plural');
    } else if (state.mode === 'genitive' || state.mode === 'genitive-plural') {
      setLastActiveTab('genitive');
    } else if (state.mode === 'pikkusanat') {
      setLastActiveTab('pikkusanat');
    } else if (state.mode === 'lyrics') {
      setLastActiveTab('lyrics');
    } else if (state.mode === 'question-words') {
      setLastActiveTab('questions');
    } else if (state.mode === 'verb-type-present' || state.mode === 'verb-type-negative' || 
               state.mode === 'verb-type-imperfect' || state.mode === 'verb-type-imperfect-negative' ||
               state.mode === 'verb-type-imperative' || state.mode === 'verb-type-imperative-negative' ||
               state.mode === 'verb-type-conditional' || state.mode === 'verb-type-conditional-negative' ||
               state.mode === 'verb-type-conditional-perfect' || state.mode === 'verb-type-conditional-perfect-negative') {
      setLastActiveTab('verbs');
    } else if (state.mode === 'menu') {
      // Keep the last active tab when returning to menu
      // (don't change it)
    } else {
      // Other modes
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
    } else if (state.mode === 'cases-fill-blank' || state.mode === 'cases-fill-blank-plural') {
      const isPlural = state.mode === 'cases-fill-blank-plural';
      startCasesSession(selectedCaseCategories, isPlural);
    } else if (state.mode === 'verb-type-present' || state.mode === 'verb-type-negative' ||
               state.mode === 'verb-type-imperfect' || state.mode === 'verb-type-imperfect-negative' ||
               state.mode === 'verb-type-imperative' || state.mode === 'verb-type-imperative-negative' ||
               state.mode === 'verb-type-conditional' || state.mode === 'verb-type-conditional-negative' ||
               state.mode === 'verb-type-conditional-perfect' || state.mode === 'verb-type-conditional-perfect-negative') {
      // Verb type arena - replay with same settings
      const tenseMap: Record<string, 'present' | 'negative' | 'imperfect' | 'imperfectNegative' | 'imperative' | 'imperativeNegative' | 'conditional' | 'conditionalNegative' | 'conditionalPerfect' | 'conditionalPerfectNegative'> = {
        'verb-type-present': 'present',
        'verb-type-negative': 'negative',
        'verb-type-imperfect': 'imperfect',
        'verb-type-imperfect-negative': 'imperfectNegative',
        'verb-type-imperative': 'imperative',
        'verb-type-imperative-negative': 'imperativeNegative',
        'verb-type-conditional': 'conditional',
        'verb-type-conditional-negative': 'conditionalNegative',
        'verb-type-conditional-perfect': 'conditionalPerfect',
        'verb-type-conditional-perfect-negative': 'conditionalPerfectNegative',
      };
      const tense = tenseMap[state.mode] || 'present';
      startVerbTypeSession(tense, selectedVerbTypes);
    } else if (state.mode === 'partitive' || state.mode === 'partitive-plural') {
      // Partitive - replay with same rules
      const isPlural = state.mode === 'partitive-plural';
      startPartitiveSession(selectedPartitiveRules, isPlural);
    } else if (state.mode === 'plural') {
      // Plural - replay with same rules
      startPluralSession(selectedPluralRules);
    } else if (state.mode === 'genitive' || state.mode === 'genitive-plural') {
      // Genitive - replay with same rules
      const isPlural = state.mode === 'genitive-plural';
      startGenitiveSession(selectedGenitiveRules, isPlural);
    } else if (state.mode === 'pikkusanat') {
      // Pikkusanat - replay with same categories
      startPikkusanatSession(selectedPikkusanaCategories);
    } else if (state.mode === 'lyrics') {
      // Lyrics - replay with same song and mode
      startLyricsSession(selectedSongId, selectedLyricsMode);
    } else if (state.mode === 'question-words') {
      // Question words - replay with same categories and mode
      startQuestionWordSession(selectedQuestionCategories, selectedQuestionSubMode);
    } else {
      returnToMenu();
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
          onExportTimes={exportTimes}
          onResetProgress={resetProgress}
          formatTime={formatTime}
          selectedVerbTypes={selectedVerbTypes}
          onSelectVerbTypes={setSelectedVerbTypes}
          onStartVerbTypeSession={startVerbTypeSession}
          getVerbCountByTypes={getVerbCountByTypes}
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
          selectedPartitiveRules={selectedPartitiveRules}
          onSelectPartitiveRules={setSelectedPartitiveRules}
          onStartPartitiveSession={startPartitiveSession}
          getPartitiveWordCount={getPartitiveWordCount}
          partitiveRules={partitiveRules}
          selectedPluralRules={selectedPluralRules}
          onSelectPluralRules={setSelectedPluralRules}
          onStartPluralSession={startPluralSession}
          getPluralWordCount={getPluralWordCount}
          pluralRules={pluralRules}
          selectedGenitiveRules={selectedGenitiveRules}
          onSelectGenitiveRules={setSelectedGenitiveRules}
          onStartGenitiveSession={startGenitiveSession}
          getGenitiveWordCount={getGenitiveWordCount}
          genitiveRules={genitiveRules}
          selectedPikkusanaCategories={selectedPikkusanaCategories}
          onSelectPikkusanaCategories={setSelectedPikkusanaCategories}
          onStartPikkusanatSession={startPikkusanatSession}
          getPikkusanaWordCount={getPikkusanaWordCount}
          pikkusanaCategories={pikkusanaCategories}
          selectedSongId={selectedSongId}
          onSelectSongId={setSelectedSongId}
          selectedLyricsMode={selectedLyricsMode}
          onSelectLyricsMode={setSelectedLyricsMode}
          onStartLyricsSession={startLyricsSession}
          getSongInfo={getSongInfo}
          allSongs={allSongs}
          selectedQuestionCategories={selectedQuestionCategories}
          onSelectQuestionCategories={setSelectedQuestionCategories}
          selectedQuestionSubMode={selectedQuestionSubMode}
          onSelectQuestionSubMode={setSelectedQuestionSubMode}
          onStartQuestionWordSession={startQuestionWordSession}
          getQuestionWordCount={getQuestionWordCount}
          questionCategories={questionCategories}
          initialTab={lastActiveTab}
          onTabChange={setLastActiveTab}
        />
      ) : isComplete ? (
        <ResultsScreen
          player={state.player}
          mode={state.mode}
          onReturnToMenu={returnToMenu}
          onPlayAgain={handlePlayAgain}
          formatTime={formatTime}
          vocabularySession={state.vocabularySession}
          casesSession={state.casesSession}
          verbTypeSession={state.verbTypeSession}
          partitiveSession={state.partitiveSession}
          pluralSession={state.pluralSession}
          genitiveSession={state.genitiveSession}
          pikkusanatSession={state.pikkusanatSession}
          lyricsSession={state.lyricsSession}
          questionWordSession={state.questionWordSession}
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
