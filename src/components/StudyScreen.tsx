import { useState } from 'react';
import type { SM2Cycle } from '../data/suomenMestari2';

interface StudyScreenProps {
  cycles: SM2Cycle[];
  onClose: () => void;
  onStartMemorize: () => void;
}

export function StudyScreen({ cycles, onClose, onStartMemorize }: StudyScreenProps) {
  const [expandedCycles, setExpandedCycles] = useState<Set<string>>(new Set(cycles.map(c => c.cycleId)));
  const [searchTerm, setSearchTerm] = useState('');
  const [showFinnish, setShowFinnish] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [viewMode, setViewMode] = useState<'cards' | 'flashcard'>('cards');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  const toggleCycle = (cycleId: string) => {
    const newExpanded = new Set(expandedCycles);
    if (newExpanded.has(cycleId)) {
      newExpanded.delete(cycleId);
    } else {
      newExpanded.add(cycleId);
    }
    setExpandedCycles(newExpanded);
  };

  const expandAll = () => {
    setExpandedCycles(new Set(cycles.map(c => c.cycleId)));
  };

  const collapseAll = () => {
    setExpandedCycles(new Set());
  };

  // Get all words with their cycle info
  const allWords = cycles.flatMap(cycle => 
    cycle.words.map(word => ({
      ...word,
      cycleId: cycle.cycleId,
      cycleName: cycle.name
    }))
  );

  // Filter words by search term
  const filteredWords = searchTerm.trim() 
    ? allWords.filter(w => 
        w.finnish.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.english.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  const totalWordCount = allWords.length;

  // Flashcard navigation
  const nextFlashcard = () => {
    setFlashcardFlipped(false);
    setCurrentFlashcardIndex((prev) => (prev + 1) % allWords.length);
  };

  const prevFlashcard = () => {
    setFlashcardFlipped(false);
    setCurrentFlashcardIndex((prev) => (prev - 1 + allWords.length) % allWords.length);
  };

  const currentWord = allWords[currentFlashcardIndex];

  return (
    <div className="study-screen">
      <div className="study-header">
        <div className="study-header-top">
          <button className="study-back-btn" onClick={onClose}>
            ← Takaisin
          </button>
          <h1 className="study-title">📖 Katsele sanoja</h1>
          <button className="study-start-btn" onClick={onStartMemorize}>
            Aloita →
          </button>
        </div>
        
        {/* View Mode Toggle */}
        <div className="study-view-toggle">
          <button 
            className={`view-toggle-btn ${viewMode === 'flashcard' ? 'active' : ''}`}
            onClick={() => setViewMode('flashcard')}
          >
            🎴 Kortit
          </button>
          <button 
            className={`view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
          >
            📋 Lista
          </button>
        </div>

        {viewMode === 'cards' && (
          <div className="study-controls">
            <div className="study-search">
              <input
                type="text"
                placeholder="Hae sanoja..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="study-search-input"
              />
              {searchTerm && (
                <button className="study-clear-search" onClick={() => setSearchTerm('')}>✕</button>
              )}
            </div>
            
            <div className="study-toggles">
              <label className="study-toggle">
                <input 
                  type="checkbox" 
                  checked={showFinnish} 
                  onChange={(e) => setShowFinnish(e.target.checked)}
                />
                <span>Suomi</span>
              </label>
              <label className="study-toggle">
                <input 
                  type="checkbox" 
                  checked={showEnglish} 
                  onChange={(e) => setShowEnglish(e.target.checked)}
                />
                <span>English</span>
              </label>
            </div>
            
            <div className="study-expand-controls">
              <button className="small-btn" onClick={expandAll}>Avaa kaikki</button>
              <button className="small-btn" onClick={collapseAll}>Sulje kaikki</button>
            </div>
          </div>
        )}
        
        <div className="study-stats">
          <span className="study-stat">{cycles.length} sykliä</span>
          <span className="study-stat-divider">·</span>
          <span className="study-stat">{totalWordCount} sanaa</span>
          {filteredWords && viewMode === 'cards' && (
            <>
              <span className="study-stat-divider">·</span>
              <span className="study-stat search-result">{filteredWords.length} hakutulosta</span>
            </>
          )}
          {viewMode === 'flashcard' && (
            <>
              <span className="study-stat-divider">·</span>
              <span className="study-stat">{currentFlashcardIndex + 1} / {totalWordCount}</span>
            </>
          )}
        </div>
      </div>

      <div className="study-content">
        {viewMode === 'flashcard' ? (
          // Flashcard view - swipeable cards
          <div className="flashcard-container">
            <div 
              className={`flashcard ${flashcardFlipped ? 'flipped' : ''}`}
              onClick={() => setFlashcardFlipped(!flashcardFlipped)}
            >
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  <div className="flashcard-cycle-badge">{currentWord?.cycleName}</div>
                  <div className="flashcard-word">{currentWord?.finnish}</div>
                  <div className="flashcard-hint">Napauta kääntääksesi</div>
                  {currentWord?.verbType && (
                    <div className="flashcard-verb-type">Tyyppi {currentWord.verbType}</div>
                  )}
                  {currentWord?.caseRequired && (
                    <div className="flashcard-case">+ {currentWord.caseRequired}</div>
                  )}
                </div>
                <div className="flashcard-back">
                  <div className="flashcard-cycle-badge">{currentWord?.cycleName}</div>
                  <div className="flashcard-translation">{currentWord?.english}</div>
                  {currentWord?.synonyms && currentWord.synonyms.length > 0 && (
                    <div className="flashcard-synonyms">
                      {currentWord.synonyms.join(', ')}
                    </div>
                  )}
                  {currentWord?.finnishSynonyms && currentWord.finnishSynonyms.length > 0 && (
                    <div className="flashcard-finnish-alt">
                      = {currentWord.finnishSynonyms.join(', ')}
                    </div>
                  )}
                  {currentWord?.note && (
                    <div className="flashcard-note">💡 {currentWord.note}</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flashcard-nav">
              <button className="flashcard-nav-btn prev" onClick={prevFlashcard}>
                ← Edellinen
              </button>
              <div className="flashcard-progress">
                <div 
                  className="flashcard-progress-bar" 
                  style={{ width: `${((currentFlashcardIndex + 1) / totalWordCount) * 100}%` }}
                />
              </div>
              <button className="flashcard-nav-btn next" onClick={nextFlashcard}>
                Seuraava →
              </button>
            </div>
          </div>
        ) : filteredWords ? (
          // Show search results
          <div className="study-search-results">
            <h3 className="search-results-title">Hakutulokset: "{searchTerm}"</h3>
            <div className="study-word-grid">
              {filteredWords.map((word, idx) => (
                <div key={`${word.cycleId}-${idx}`} className="study-word-card search-result">
                  <div className="study-word-cycle-badge">{word.cycleName}</div>
                  {showFinnish && (
                    <div className="study-word-finnish">{word.finnish}</div>
                  )}
                  {showEnglish && (
                    <div className="study-word-english">{word.english}</div>
                  )}
                  {word.synonyms && word.synonyms.length > 0 && showEnglish && (
                    <div className="study-word-synonyms">
                      {word.synonyms.join(', ')}
                    </div>
                  )}
                  {word.finnishSynonyms && word.finnishSynonyms.length > 0 && showFinnish && (
                    <div className="study-word-finnish-synonyms">
                      = {word.finnishSynonyms.join(', ')}
                    </div>
                  )}
                  {word.note && (
                    <div className="study-word-note">💡 {word.note}</div>
                  )}
                  {word.verbType && (
                    <div className="study-word-verb-type">Tyyppi {word.verbType}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Show by cycles
          cycles.map(cycle => (
            <div key={cycle.cycleId} className="study-cycle">
              <button 
                className={`study-cycle-header ${expandedCycles.has(cycle.cycleId) ? 'expanded' : ''}`}
                onClick={() => toggleCycle(cycle.cycleId)}
              >
                <span className="study-cycle-expand-icon">
                  {expandedCycles.has(cycle.cycleId) ? '▼' : '▶'}
                </span>
                <span className="study-cycle-name">{cycle.name}</span>
                <span className="study-cycle-count">{cycle.words.length} sanaa</span>
              </button>
              
              {expandedCycles.has(cycle.cycleId) && (
                <div className="study-word-grid">
                  {cycle.words.map((word, idx) => (
                    <div key={idx} className="study-word-card">
                      {showFinnish && (
                        <div className="study-word-finnish">{word.finnish}</div>
                      )}
                      {showEnglish && (
                        <div className="study-word-english">{word.english}</div>
                      )}
                      {word.synonyms && word.synonyms.length > 0 && showEnglish && (
                        <div className="study-word-synonyms">
                          {word.synonyms.join(', ')}
                        </div>
                      )}
                      {word.finnishSynonyms && word.finnishSynonyms.length > 0 && showFinnish && (
                        <div className="study-word-finnish-synonyms">
                          = {word.finnishSynonyms.join(', ')}
                        </div>
                      )}
                      {word.note && (
                        <div className="study-word-note">💡 {word.note}</div>
                      )}
                      {word.verbType && (
                        <div className="study-word-verb-type">Tyyppi {word.verbType}</div>
                      )}
                      {word.caseRequired && (
                        <div className="study-word-case">+ {word.caseRequired}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="study-footer">
        <button className="study-start-btn large" onClick={onStartMemorize}>
          🧠 Aloita opettelu ({totalWordCount} sanaa)
        </button>
      </div>
    </div>
  );
}

