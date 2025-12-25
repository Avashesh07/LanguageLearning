import { useState, useEffect } from 'react';
import type { GameMode, PlayerState, VerbLevel, CaseCategory } from '../types';
import { verbsByLevel } from '../data/verbs';
import type { Tavoite } from '../data/tavoiteVocabulary';
import type { CaseGroup } from '../data/finnishCases';
import { getArticlesByLevel, getYleNewsArticles, type YleArticle } from '../data/yleArticles';
import { TargetIcon, BookIcon, OpenBookIcon, PencilIcon, CheckIcon, MapPinIcon, GlobeIcon, NewspaperIcon } from './Icons';

interface MenuProps {
  player: PlayerState;
  selectedLevels: VerbLevel[];
  onSelectLevels: (levels: VerbLevel[]) => void;
  onStartSession: (mode: GameMode, levels: VerbLevel[]) => void;
  onExportTimes: () => void;
  onResetProgress: () => void;
  formatTime: (ms: number) => string;
  getVerbCountForLevels: (levels: VerbLevel[]) => number;
  isActiveRecallUnlocked: (levels: VerbLevel[]) => boolean;
  isConjugationUnlocked: (levels: VerbLevel[]) => boolean;
  isImperfectUnlocked: (levels: VerbLevel[]) => boolean;
  // Vocabulary props
  selectedTavoites: number[];
  onSelectTavoites: (tavoites: number[]) => void;
  onStartVocabularySession: (mode: 'vocabulary-recall' | 'vocabulary-active-recall', tavoites: number[]) => void;
  getTavoiteWordCount: (tavoites: number[]) => number;
  allTavoites: Tavoite[];
  // Cases props
  selectedCaseCategories: CaseCategory[];
  onSelectCaseCategories: (categories: CaseCategory[]) => void;
  onStartCasesSession: (categories: CaseCategory[]) => void;
  getCasesSentenceCount: (categories: CaseCategory[]) => number;
  caseGroups: CaseGroup[];
  // Reading props
  onStartReading: (article: YleArticle) => void;
  // Tab management
  initialTab?: 'verbs' | 'vocabulary' | 'cases' | 'reading';
  onTabChange?: (tab: 'verbs' | 'vocabulary' | 'cases' | 'reading') => void;
}

const LEVELS: VerbLevel[] = ['A1', 'A2'];

export function Menu({
  player,
  selectedLevels,
  onSelectLevels,
  onStartSession,
  onExportTimes,
  onResetProgress,
  formatTime,
  getVerbCountForLevels,
  isActiveRecallUnlocked,
  isConjugationUnlocked,
  isImperfectUnlocked,
  selectedTavoites,
  onSelectTavoites,
  onStartVocabularySession,
  getTavoiteWordCount,
  allTavoites,
  selectedCaseCategories,
  onSelectCaseCategories,
  onStartCasesSession,
  getCasesSentenceCount,
  caseGroups,
  onStartReading,
  initialTab = 'verbs',
  onTabChange,
}: MenuProps) {
  const [activeTab, setActiveTab] = useState<'verbs' | 'vocabulary' | 'cases' | 'reading'>(initialTab);
  
  // Update local state when initialTab changes (e.g., when returning from quiz)
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);
  
  const handleTabChange = (tab: 'verbs' | 'vocabulary' | 'cases' | 'reading') => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  // Get articles for the reading tab
  const a1Articles = getArticlesByLevel('A1');
  const yleNewsArticles = getYleNewsArticles();

  const toggleCaseCategory = (category: CaseCategory) => {
    if (selectedCaseCategories.includes(category)) {
      if (selectedCaseCategories.length > 1) {
        onSelectCaseCategories(selectedCaseCategories.filter((c) => c !== category));
      }
    } else {
      onSelectCaseCategories([...selectedCaseCategories, category]);
    }
  };

  const casesSentenceCount = getCasesSentenceCount(selectedCaseCategories);
  
  const bestTimes = player.bestTimes || [];
  const verbCount = getVerbCountForLevels(selectedLevels);
  const activeRecallUnlocked = isActiveRecallUnlocked(selectedLevels);
  const conjugationUnlocked = isConjugationUnlocked(selectedLevels);
  const imperfectUnlocked = isImperfectUnlocked(selectedLevels);

  const toggleLevel = (level: VerbLevel) => {
    if (selectedLevels.includes(level)) {
      if (selectedLevels.length > 1) {
        onSelectLevels(selectedLevels.filter((l) => l !== level));
      }
    } else {
      onSelectLevels([...selectedLevels, level]);
    }
  };

  const toggleTavoite = (tavoiteId: number) => {
    if (selectedTavoites.includes(tavoiteId)) {
      if (selectedTavoites.length > 1) {
        onSelectTavoites(selectedTavoites.filter((t) => t !== tavoiteId));
      }
    } else {
      onSelectTavoites([...selectedTavoites, tavoiteId]);
    }
  };

  const selectAllTavoites = () => {
    onSelectTavoites(allTavoites.map(t => t.id));
  };

  const clearTavoiteSelection = () => {
    onSelectTavoites([allTavoites[0].id]);
  };

  const levelKey = [...selectedLevels].sort().join('+');
  const recallBestTime = bestTimes.find(
    (t) => t.mode === 'recall' && [...t.levels].sort().join('+') === levelKey
  );
  const activeRecallBestTime = bestTimes.find(
    (t) => t.mode === 'active-recall' && [...t.levels].sort().join('+') === levelKey
  );
  const conjugationBestTime = bestTimes.find(
    (t) => t.mode === 'conjugation' && [...t.levels].sort().join('+') === levelKey
  );
  const imperfectBestTime = bestTimes.find(
    (t) => t.mode === 'imperfect' && [...t.levels].sort().join('+') === levelKey
  );
  const gradationBestTime = bestTimes.find(
    (t) => t.mode === 'consonant-gradation'
  );

  const vocabularyWordCount = getTavoiteWordCount(selectedTavoites);

  return (
    <div className="menu">
      <h1 className="menu-title">Finnish Learning Arena</h1>
      
      {/* Tab Switcher */}
      <div className="tab-switcher">
        <button 
          className={`tab-btn ${activeTab === 'verbs' ? 'active' : ''}`}
          onClick={() => handleTabChange('verbs')}
        >
          <TargetIcon size={18} /> Verb Arena
        </button>
        <button 
          className={`tab-btn ${activeTab === 'vocabulary' ? 'active' : ''}`}
          onClick={() => handleTabChange('vocabulary')}
        >
          <BookIcon size={18} /> Kurssin Arvostelu
        </button>
        <button 
          className={`tab-btn ${activeTab === 'cases' ? 'active' : ''}`}
          onClick={() => handleTabChange('cases')}
        >
          <MapPinIcon size={18} /> Sijat (Cases)
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reading' ? 'active' : ''}`}
          onClick={() => handleTabChange('reading')}
        >
          <NewspaperIcon size={18} /> Lukeminen (Reading)
        </button>
      </div>

      {activeTab === 'cases' ? (
        <>
          <p className="menu-subtitle">Master Finnish cases - practice one at a time or combine</p>

          {/* Case Category Selection - Organized by Type */}
          <div className="case-selector">
            {/* Individual Cases - Practice One at a Time */}
            <div className="case-group-section">
              <h3 className="case-section-title">Practice One Case</h3>
              <p className="case-section-desc">Master each case ending individually</p>
              <div className="case-category-grid individual">
                {caseGroups.filter(g => g.groupType === 'individual').map((group) => {
                  const isSelected = selectedCaseCategories.includes(group.id as CaseCategory);
                  const progress = player.casesProgress?.find(cp => cp.category === group.id);
                  const isCompleted = progress?.fillBlankCompleted;
                  
                  return (
                    <button
                      key={group.id}
                      className={`case-category-btn compact ${isSelected ? 'selected' : ''} ${isCompleted ? 'completed' : ''}`}
                      onClick={() => toggleCaseCategory(group.id as CaseCategory)}
                      style={{ '--case-color': group.color } as React.CSSProperties}
                    >
                      <span className="case-category-name">{group.name}</span>
                      <span className="case-category-desc">{group.description}</span>
                      {isCompleted && <CheckIcon size={12} color="#4caf50" className="case-check" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Movement-Based Groups */}
            <div className="case-group-section">
              <h3 className="case-section-title">Practice by Movement</h3>
              <p className="case-section-desc">Group cases by what they express</p>
              <div className="case-category-grid movement">
                {caseGroups.filter(g => g.groupType === 'movement').map((group) => {
                  const isSelected = selectedCaseCategories.includes(group.id as CaseCategory);
                  const progress = player.casesProgress?.find(cp => cp.category === group.id);
                  const isCompleted = progress?.fillBlankCompleted;
                  
                  return (
                    <button
                      key={group.id}
                      className={`case-category-btn movement ${isSelected ? 'selected' : ''} ${isCompleted ? 'completed' : ''}`}
                      onClick={() => toggleCaseCategory(group.id as CaseCategory)}
                      style={{ '--case-color': group.color } as React.CSSProperties}
                    >
                      <div className="case-category-header">
                        <span className="case-category-name">{group.name}</span>
                        {isCompleted && <CheckIcon size={12} color="#4caf50" />}
                      </div>
                      <span className="case-category-finnish">{group.finnishName}</span>
                      <span className="case-category-desc">{group.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Broad Groups */}
            <div className="case-group-section">
              <h3 className="case-section-title">Practice All Together</h3>
              <p className="case-section-desc">Challenge yourself with mixed cases</p>
              <div className="case-category-grid broad">
                {caseGroups.filter(g => g.groupType === 'broad').map((group) => {
                  const isSelected = selectedCaseCategories.includes(group.id as CaseCategory);
                  const progress = player.casesProgress?.find(cp => cp.category === group.id);
                  const isCompleted = progress?.fillBlankCompleted;
                  
                  return (
                    <button
                      key={group.id}
                      className={`case-category-btn broad ${isSelected ? 'selected' : ''} ${isCompleted ? 'completed' : ''}`}
                      onClick={() => toggleCaseCategory(group.id as CaseCategory)}
                      style={{ '--case-color': group.color } as React.CSSProperties}
                    >
                      <div className="case-category-header">
                        <span className="case-category-icon">
                          {group.id === 'location' ? <GlobeIcon size={18} /> : <MapPinIcon size={18} />}
                        </span>
                        {isCompleted && <CheckIcon size={12} color="#4caf50" />}
                      </div>
                      <span className="case-category-name">{group.name}</span>
                      <span className="case-category-desc">{group.description}</span>
                      <div className="case-category-cases">
                        {group.cases.map(c => (
                          <span key={c} className="case-tag">{c}</span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="selected-info">
              Selected: {selectedCaseCategories.length} categor{selectedCaseCategories.length !== 1 ? 'ies' : 'y'} ({casesSentenceCount} sentences)
            </p>
          </div>

          {/* Case Reference Card */}
          <div className="case-reference-card">
            <h4>Quick Reference</h4>
            <div className="case-reference-grid">
              <div className="case-reference-group location">
                <div className="reference-group-title">📍 Location (Inside)</div>
                <div className="reference-item">
                  <span className="case-name">Inessive</span>
                  <span className="case-ending">-ssa/-ssä</span>
                  <span className="case-meaning">Missä? (where)</span>
                </div>
                <div className="reference-item">
                  <span className="case-name">Elative</span>
                  <span className="case-ending">-sta/-stä</span>
                  <span className="case-meaning">Mistä? (from)</span>
                </div>
                <div className="reference-item">
                  <span className="case-name">Illative</span>
                  <span className="case-ending">-Vn/-seen</span>
                  <span className="case-meaning">Mihin? (into)</span>
                </div>
              </div>
              <div className="case-reference-group surface">
                <div className="reference-group-title">🔲 Surface (On)</div>
                <div className="reference-item">
                  <span className="case-name">Adessive</span>
                  <span className="case-ending">-lla/-llä</span>
                  <span className="case-meaning">Millä? (on)</span>
                </div>
                <div className="reference-item">
                  <span className="case-name">Ablative</span>
                  <span className="case-ending">-lta/-ltä</span>
                  <span className="case-meaning">Miltä? (from)</span>
                </div>
                <div className="reference-item">
                  <span className="case-name">Allative</span>
                  <span className="case-ending">-lle</span>
                  <span className="case-meaning">Mille? (to)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cases Game Modes */}
          <div className="menu-modes cases-modes">
            <button
              className="mode-button cases"
              onClick={() => onStartCasesSession(selectedCaseCategories)}
            >
              <div className="mode-info">
                <span className="mode-name"><PencilIcon size={18} /> Fill in the Blank</span>
                <span className="mode-desc">Complete sentences with correct case form</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{casesSentenceCount} sentences</span>
              </div>
            </button>
          </div>
        </>
      ) : activeTab === 'verbs' ? (
        <>
          <p className="menu-subtitle">Master Finnish verbs level by level</p>

          {/* Level Selection */}
          <div className="level-selector">
            <h3>Select Levels</h3>
            <div className="level-buttons">
              {LEVELS.map((level) => {
                const isSelected = selectedLevels.includes(level);
                const levelVerbs = verbsByLevel[level];
                const progress = player.levelProgress.find((lp) => lp.level === level);
                const completedCount = [
                  progress?.recallCompleted,
                  progress?.activeRecallCompleted,
                  progress?.conjugationCompleted,
                  progress?.imperfectCompleted,
                ].filter(Boolean).length;

                return (
                  <button
                    key={level}
                    className={`level-btn ${isSelected ? 'selected' : ''} ${completedCount > 0 ? 'completed' : ''}`}
                    onClick={() => toggleLevel(level)}
                  >
                    <span className="level-name">{level}</span>
                    <span className="level-count">{levelVerbs.length} verbs</span>
                    <div className="level-status">
                      {completedCount > 0 && (
                        <span className="check">
                          {Array.from({ length: completedCount }).map((_, i) => (
                            <CheckIcon key={i} size={12} color="#4caf50" />
                          ))}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="selected-info">
              Selected: {selectedLevels.join(' + ')} ({verbCount} verbs)
            </p>
          </div>

          {/* Game Modes */}
          <div className="menu-modes">
            {/* Recall Mode */}
            <button
              className="mode-button"
              onClick={() => onStartSession('recall', selectedLevels)}
            >
              <div className="mode-info">
                <span className="mode-name">1. Recall</span>
                <span className="mode-desc">Finnish → English</span>
              </div>
              <div className="mode-best">
                {recallBestTime ? (
                  <>
                    <span className="best-label">Best</span>
                    <span className="best-time">{formatTime(recallBestTime.timeMs)}</span>
                  </>
                ) : (
                  <span className="best-label">Not completed</span>
                )}
              </div>
            </button>

            {/* Active Recall Mode */}
            <button
              className={`mode-button ${activeRecallUnlocked ? '' : 'locked'}`}
              onClick={() => activeRecallUnlocked && onStartSession('active-recall', selectedLevels)}
              disabled={!activeRecallUnlocked}
            >
              <div className="mode-info">
                <span className="mode-name">2. Active Recall</span>
                <span className="mode-desc">English → Finnish</span>
              </div>
              <div className="mode-best">
                {!activeRecallUnlocked ? (
                  <span className="locked-text">Complete Recall with 0 mistakes</span>
                ) : activeRecallBestTime ? (
                  <>
                    <span className="best-label">Best</span>
                    <span className="best-time">{formatTime(activeRecallBestTime.timeMs)}</span>
                  </>
                ) : (
                  <span className="best-label">Not completed</span>
                )}
              </div>
            </button>

            {/* Conjugation Mode */}
            <button
              className={`mode-button ${conjugationUnlocked ? '' : 'locked'}`}
              onClick={() => conjugationUnlocked && onStartSession('conjugation', selectedLevels)}
              disabled={!conjugationUnlocked}
            >
              <div className="mode-info">
                <span className="mode-name">3. Conjugation</span>
                <span className="mode-desc">Conjugate verbs (all persons)</span>
              </div>
              <div className="mode-best">
                {!conjugationUnlocked ? (
                  <span className="locked-text">Complete Active Recall with 0 mistakes</span>
                ) : conjugationBestTime ? (
                  <>
                    <span className="best-label">Best</span>
                    <span className="best-time">{formatTime(conjugationBestTime.timeMs)}</span>
                  </>
                ) : (
                  <span className="best-label">Not completed</span>
                )}
              </div>
            </button>

            {/* Imperfect Mode */}
            <button
              className={`mode-button ${imperfectUnlocked ? '' : 'locked'}`}
              onClick={() => imperfectUnlocked && onStartSession('imperfect', selectedLevels)}
              disabled={!imperfectUnlocked}
            >
              <div className="mode-info">
                <span className="mode-name">4. Imperfect Tense</span>
                <span className="mode-desc">Past tense conjugation practice</span>
              </div>
              <div className="mode-best">
                {!imperfectUnlocked ? (
                  <span className="locked-text">Complete Conjugation with 0 mistakes</span>
                ) : imperfectBestTime ? (
                  <>
                    <span className="best-label">Best</span>
                    <span className="best-time">{formatTime(imperfectBestTime.timeMs)}</span>
                  </>
                ) : (
                  <span className="best-label">Not completed</span>
                )}
              </div>
            </button>

            {/* Consonant Gradation Mode */}
            <button
              className="mode-button"
              onClick={() => onStartSession('consonant-gradation', [])}
            >
              <div className="mode-info">
                <span className="mode-name">5. Consonant Gradation</span>
                <span className="mode-desc">KPT-vaihtelu practice (True/False + Fill blanks)</span>
              </div>
              <div className="mode-best">
                {gradationBestTime ? (
                  <>
                    <span className="best-label">Best</span>
                    <span className="best-time">{formatTime(gradationBestTime.timeMs)}</span>
                  </>
                ) : (
                  <span className="best-label">Not completed</span>
                )}
              </div>
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="menu-subtitle">Practice course vocabulary by Tavoite</p>

          {/* Tavoite Selection */}
          <div className="tavoite-selector">
            <div className="tavoite-header">
              <h3>Select Tavoites</h3>
              <div className="tavoite-actions">
                <button className="small-btn" onClick={selectAllTavoites}>Select All</button>
                <button className="small-btn" onClick={clearTavoiteSelection}>Clear</button>
              </div>
            </div>
            <div className="tavoite-grid">
              {allTavoites.map((tavoite) => {
                const isSelected = selectedTavoites.includes(tavoite.id);
                const progress = player.tavoiteProgress?.find(tp => tp.tavoiteId === tavoite.id);
                const isCompleted = progress?.activeRecallCompleted || false;
                return (
                  <button
                    key={tavoite.id}
                    className={`tavoite-btn ${isSelected ? 'selected' : ''} ${isCompleted ? 'completed' : ''}`}
                    onClick={() => toggleTavoite(tavoite.id)}
                    title={`${tavoite.name}${progress?.bestTimeMs ? ` - Best: ${formatTime(progress.bestTimeMs)}` : ''}`}
                  >
                    <div className="tavoite-header">
                      <span className="tavoite-id">{tavoite.id}</span>
                      {isCompleted && <CheckIcon size={12} color="#4caf50" />}
                    </div>
                    <span className="tavoite-name">{tavoite.name}</span>
                    <span className="tavoite-count">{tavoite.words.length} words</span>
                    {progress?.bestTimeMs && (
                      <span className="tavoite-time">{formatTime(progress.bestTimeMs)}</span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="selected-info">
              Selected: {selectedTavoites.length} tavoite{selectedTavoites.length !== 1 ? 's' : ''} ({vocabularyWordCount} words)
            </p>
            <p className="completion-info">
              Completed: {player.tavoiteProgress?.filter(tp => tp.activeRecallCompleted).length || 0} / {allTavoites.length} tavoites
            </p>
          </div>

          {/* Vocabulary Game Modes */}
          <div className="menu-modes vocabulary-modes">
            <button
              className="mode-button vocabulary"
              onClick={() => onStartVocabularySession('vocabulary-recall', selectedTavoites)}
            >
              <div className="mode-info">
                <span className="mode-name"><OpenBookIcon size={18} /> Recall</span>
                <span className="mode-desc">Finnish → English</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{vocabularyWordCount} words</span>
              </div>
            </button>

            <button
              className="mode-button vocabulary"
              onClick={() => onStartVocabularySession('vocabulary-active-recall', selectedTavoites)}
            >
              <div className="mode-info">
                <span className="mode-name"><PencilIcon size={18} /> Active Recall</span>
                <span className="mode-desc">English → Finnish</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{vocabularyWordCount} words</span>
              </div>
            </button>
          </div>
        </>
      )}

      {activeTab === 'reading' && (
        <>
          <p className="menu-subtitle">Lue ja ymmärrä · Read Finnish articles</p>

          <div className="reading-sections-container">
            {/* A1 Simplified Articles */}
            <div className="reading-menu-section">
              <div className="reading-menu-header">
                <span className="reading-menu-level">A1</span>
                <span className="reading-menu-label">Aloittelija</span>
              </div>

              <div className="reading-article-grid">
                {a1Articles.map((article) => (
                  <button
                    key={article.id}
                    className="reading-article-btn"
                    onClick={() => onStartReading(article)}
                  >
                    <span className="rab-topic">{article.topic}</span>
                    <span className="rab-title">{article.title}</span>
                    <span className="rab-meta">{article.vocabulary.length} sanaa · {article.questions.length} kysymystä</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Yle News - Real Articles */}
            <div className="reading-menu-section yle-news-section">
              <div className="reading-menu-header yle-news-header">
                <span className="reading-menu-level yle-news-badge">YLE</span>
                <span className="reading-menu-label">Uutiset</span>
              </div>
              <p className="yle-news-desc">Aitoja uutisia Yleltä · Real news from Yle</p>

              <div className="reading-article-grid">
                {yleNewsArticles.map((article) => (
                  <button
                    key={article.id}
                    className="reading-article-btn yle-news-btn"
                    onClick={() => onStartReading(article)}
                  >
                    <span className="rab-topic">{article.topic}</span>
                    <span className="rab-title">{article.title}</span>
                    <span className="rab-meta">{article.vocabulary.length} sanaa · {article.questions.length} kysymystä</span>
                    <span className="rab-level-indicator">{article.level}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="menu-footer">
        {bestTimes.length > 0 && (
          <button onClick={onExportTimes}>Export Times (CSV)</button>
        )}
        <button onClick={onResetProgress} className="danger">
          Reset Progress
        </button>
      </div>
    </div>
  );
}
