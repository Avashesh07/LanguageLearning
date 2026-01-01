import { useState, useEffect } from 'react';
import type { PlayerState, CaseCategory, PartitiveRule } from '../types';
import { verbs, verbTypeInfo } from '../data/verbs';
import type { Tavoite } from '../data/tavoiteVocabulary';
import type { SM2Chapter, SM2Cycle } from '../data/suomenMestari2';
import type { CaseGroup } from '../data/finnishCases';
import type { PartitiveRuleInfo } from '../data/partitiveData';
import { TargetIcon, BookIcon, OpenBookIcon, PencilIcon, CheckIcon, MapPinIcon } from './Icons';

interface MenuProps {
  player: PlayerState;
  onExportTimes: () => void;
  onResetProgress: () => void;
  formatTime: (ms: number) => string;
  // Verb Type Arena props
  selectedVerbTypes: number[];
  onSelectVerbTypes: (types: number[]) => void;
  onStartVerbTypeSession: (tense: 'present' | 'imperfect', types: number[]) => void;
  getVerbCountByTypes: (types: number[]) => number;
  // Vocabulary props (Kurssin Arvostelu)
  selectedTavoites: number[];
  onSelectTavoites: (tavoites: number[]) => void;
  onStartVocabularySession: (mode: 'vocabulary-recall' | 'vocabulary-active-recall', tavoites: number[]) => void;
  getTavoiteWordCount: (tavoites: number[]) => number;
  allTavoites: Tavoite[];
  // Suomen Mestari 2 props
  selectedSM2Chapters: number[];
  onSelectSM2Chapters: (chapters: number[]) => void;
  onStartSM2Session: (mode: 'vocabulary-recall' | 'vocabulary-active-recall', cycleIds: string[]) => void;
  onStartSM2MemoriseSession: (cycleIds: string[]) => void;
  onStartSM2Study: (cycleIds: string[]) => void;
  getSM2WordCount: (chapters: number[]) => number;
  getSM2CycleWordCount: (cycleIds: string[]) => number;
  allSM2Chapters: SM2Chapter[];
  allSM2Cycles: SM2Cycle[];
  getSM2CyclesForChapter: (chapterId: number) => SM2Cycle[];
  // Cases props
  selectedCaseCategories: CaseCategory[];
  onSelectCaseCategories: (categories: CaseCategory[]) => void;
  onStartCasesSession: (categories: CaseCategory[]) => void;
  getCasesSentenceCount: (categories: CaseCategory[]) => number;
  caseGroups: CaseGroup[];
  // Partitive props
  selectedPartitiveRules: PartitiveRule[];
  onSelectPartitiveRules: (rules: PartitiveRule[]) => void;
  onStartPartitiveSession: (rules: PartitiveRule[]) => void;
  getPartitiveWordCount: (rules: PartitiveRule[]) => number;
  partitiveRules: PartitiveRuleInfo[];
  // Tab management
  initialTab?: 'verbs' | 'vocabulary' | 'cases' | 'partitive';
  onTabChange?: (tab: 'verbs' | 'vocabulary' | 'cases' | 'partitive') => void;
}

const VERB_TYPES = [1, 2, 3, 4, 5, 6] as const;

export function Menu({
  player,
  onExportTimes,
  onResetProgress,
  formatTime,
  selectedVerbTypes,
  onSelectVerbTypes,
  onStartVerbTypeSession,
  getVerbCountByTypes,
  selectedTavoites,
  onSelectTavoites,
  onStartVocabularySession,
  getTavoiteWordCount,
  allTavoites,
  selectedSM2Chapters,
  onSelectSM2Chapters,
  onStartSM2Session,
  onStartSM2MemoriseSession,
  onStartSM2Study,
  getSM2WordCount,
  getSM2CycleWordCount,
  allSM2Chapters,
  allSM2Cycles,
  getSM2CyclesForChapter,
  selectedCaseCategories,
  onSelectCaseCategories,
  onStartCasesSession,
  getCasesSentenceCount,
  caseGroups,
  selectedPartitiveRules,
  onSelectPartitiveRules,
  onStartPartitiveSession,
  getPartitiveWordCount,
  partitiveRules,
  initialTab = 'verbs',
  onTabChange,
}: MenuProps) {
  const [activeTab, setActiveTab] = useState<'verbs' | 'vocabulary' | 'cases' | 'partitive'>(initialTab);
  
  // Update local state when initialTab changes (e.g., when returning from quiz)
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);
  
  const handleTabChange = (tab: 'verbs' | 'vocabulary' | 'cases' | 'partitive') => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

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
  const verbsByTypeCount = getVerbCountByTypes(selectedVerbTypes);

  const toggleVerbType = (type: number) => {
    if (selectedVerbTypes.includes(type)) {
      if (selectedVerbTypes.length > 1) {
        onSelectVerbTypes(selectedVerbTypes.filter((t) => t !== type));
      }
    } else {
      onSelectVerbTypes([...selectedVerbTypes, type]);
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

  // Vocabulary sub-tab state (Kurssin Arvostelu vs Suomen Mestari 2)
  const [vocabSubTab, setVocabSubTab] = useState<'kurssin' | 'sm2'>('sm2');

  // Suomen Mestari 2 functions
  const toggleSM2Chapter = (chapterId: number) => {
    if (selectedSM2Chapters.includes(chapterId)) {
      if (selectedSM2Chapters.length > 1) {
        onSelectSM2Chapters(selectedSM2Chapters.filter((c) => c !== chapterId));
      }
    } else {
      onSelectSM2Chapters([...selectedSM2Chapters, chapterId]);
    }
  };

  const selectAllSM2Chapters = () => {
    onSelectSM2Chapters(allSM2Chapters.map(c => c.id));
  };

  const clearSM2Selection = () => {
    onSelectSM2Chapters([allSM2Chapters[0].id]);
  };

  // Cycle selection for memorise mode
  const [selectedSM2Cycles, setSelectedSM2Cycles] = useState<string[]>([]);

  const toggleSM2Cycle = (cycleId: string) => {
    if (selectedSM2Cycles.includes(cycleId)) {
      setSelectedSM2Cycles(selectedSM2Cycles.filter((c) => c !== cycleId));
    } else {
      setSelectedSM2Cycles([...selectedSM2Cycles, cycleId]);
    }
  };

  const selectAllSM2Cycles = () => {
    setSelectedSM2Cycles(allSM2Cycles.map(c => c.cycleId));
  };

  const clearSM2CycleSelection = () => {
    setSelectedSM2Cycles([]);
  };

  const sm2WordCount = getSM2WordCount(selectedSM2Chapters);
  const sm2CycleWordCount = getSM2CycleWordCount(selectedSM2Cycles);

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
          <MapPinIcon size={18} /> Positional Cases
        </button>
        <button 
          className={`tab-btn ${activeTab === 'partitive' ? 'active' : ''}`}
          onClick={() => handleTabChange('partitive')}
        >
          <TargetIcon size={18} /> Partitive
        </button>
      </div>

      {activeTab === 'cases' && (
        <>
          <p className="menu-subtitle">Master Finnish cases by movement direction</p>

          {/* Case Category Selection - Movement-Based Only */}
          <div className="case-selector">
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
      )}

      {activeTab === 'partitive' && (
        <>
          <p className="menu-subtitle">Master the Partitive case - one of Finnish's most used cases</p>

          {/* Partitive Information */}
          <div className="partitive-info-section">
            <div className="partitive-reference-card">
              <h4>Partitiivi (Partitive Case)</h4>
              <div className="partitive-ending-info">
                <div className="ending-group">
                  <span className="ending-label">Endings:</span>
                  <span className="ending-value">-a/-ä, -ta/-tä, -tta/-ttä</span>
                </div>
                <div className="ending-group">
                  <span className="ending-label">Question:</span>
                  <span className="ending-value">Mitä? (What? / Some of what?)</span>
                </div>
              </div>
              
              <div className="partitive-uses">
                <h5>When to use Partitive:</h5>
                <ul className="partitive-rules">
                  <li><strong>After numbers:</strong> kolme autoa, viisi kirjaa</li>
                  <li><strong>Uncountable amounts:</strong> paljon vettä, vähän maitoa</li>
                  <li><strong>Negative sentences:</strong> Ei ole aikaa, En näe koiraa</li>
                  <li><strong>Ongoing actions:</strong> Luen kirjaa (I am reading a book)</li>
                  <li><strong>After certain verbs:</strong> pitää, rakastaa, odottaa</li>
                  <li><strong>Materials/substances:</strong> Juon kahvia, Syön leipää</li>
                </ul>
              </div>

              <div className="partitive-examples">
                <h5>Examples:</h5>
                <div className="example-grid">
                  <div className="example-item">
                    <span className="base">talo</span> → <span className="partitive">taloa</span>
                  </div>
                  <div className="example-item">
                    <span className="base">koira</span> → <span className="partitive">koiraa</span>
                  </div>
                  <div className="example-item">
                    <span className="base">vesi</span> → <span className="partitive">vettä</span>
                  </div>
                  <div className="example-item">
                    <span className="base">kahvi</span> → <span className="partitive">kahvia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rule Selection */}
          <div className="partitive-rule-selector">
            <h3>Select Word Types to Practice</h3>
            <div className="partitive-rule-grid">
              {partitiveRules.map((rule) => {
                const isSelected = selectedPartitiveRules.includes(rule.id);
                
                return (
                  <button
                    key={rule.id}
                    className={`partitive-rule-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (isSelected) {
                        if (selectedPartitiveRules.length > 1) {
                          onSelectPartitiveRules(selectedPartitiveRules.filter(r => r !== rule.id));
                        }
                      } else {
                        onSelectPartitiveRules([...selectedPartitiveRules, rule.id]);
                      }
                    }}
                    style={{ '--rule-color': rule.color } as React.CSSProperties}
                  >
                    <div className="rule-header">
                      <span className="rule-name">{rule.name}</span>
                    </div>
                    <span className="rule-description">{rule.description}</span>
                    <span className="rule-formation">{rule.formation}</span>
                    <span className="rule-example">{rule.examples[0]}</span>
                  </button>
                );
              })}
            </div>
            <p className="selected-info">
              Selected: {selectedPartitiveRules.length} rule{selectedPartitiveRules.length !== 1 ? 's' : ''} ({getPartitiveWordCount(selectedPartitiveRules)} words)
            </p>
          </div>

          {/* Game Mode */}
          <div className="menu-modes partitive-modes">
            <button
              className="mode-button partitive"
              onClick={() => onStartPartitiveSession(selectedPartitiveRules)}
              disabled={selectedPartitiveRules.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name"><PencilIcon size={18} /> Practice Partitive Forms</span>
                <span className="mode-desc">See a word, write its partitive form</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{getPartitiveWordCount(selectedPartitiveRules)} words</span>
              </div>
            </button>
          </div>
        </>
      )}

      {activeTab === 'verbs' && (
        <>
          <p className="menu-subtitle">Master Finnish verbs by type - conjugate all forms</p>

          {/* Verb Type Selection */}
          <div className="verb-type-selector">
            <h3>Select Verb Types</h3>
            <div className="verb-type-grid">
              {VERB_TYPES.map((type) => {
                const typeVerbInfo = verbTypeInfo[type];
                const typeVerbs = verbs.filter(v => v.type === type);
                const isSelected = selectedVerbTypes.includes(type);

                return (
                  <button
                    key={type}
                    className={`verb-type-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleVerbType(type)}
                  >
                    <div className="verb-type-header">
                      <span className="verb-type-number">Type {type}</span>
                    </div>
                    <span className="verb-type-name">{typeVerbInfo?.name.split(' ')[0]}</span>
                    <span className="verb-type-example">e.g. {typeVerbInfo?.examples[0]}</span>
                    <span className="verb-type-count">{typeVerbs.length} verbs</span>
                  </button>
                );
              })}
            </div>
            <p className="selected-info">
              Selected: Type {selectedVerbTypes.join(', ')} ({verbsByTypeCount} verbs)
            </p>
          </div>

          {/* Game Modes */}
          <div className="menu-modes verb-type-modes">
            {/* Present Tense Mode */}
            <button
              className="mode-button verb-type"
              onClick={() => onStartVerbTypeSession('present', selectedVerbTypes)}
              disabled={selectedVerbTypes.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name">🎯 Preesens (Present Tense)</span>
                <span className="mode-desc">Write all 6 present tense forms for each verb</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{verbsByTypeCount} verbs × 6 forms</span>
              </div>
            </button>

            {/* Past Simple Mode */}
            <button
              className="mode-button verb-type"
              onClick={() => onStartVerbTypeSession('imperfect', selectedVerbTypes)}
              disabled={selectedVerbTypes.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name">📜 Imperfekti (Past Simple)</span>
                <span className="mode-desc">Write all 6 past tense forms for each verb</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{verbsByTypeCount} verbs × 6 forms</span>
              </div>
            </button>
          </div>
        </>
      )}

      {activeTab === 'vocabulary' && (
        <>
          {/* Vocabulary Sub-tabs */}
          <div className="vocab-sub-tabs">
            <button
              className={`vocab-sub-tab ${vocabSubTab === 'sm2' ? 'active' : ''}`}
              onClick={() => setVocabSubTab('sm2')}
            >
              📘 Suomen Mestari 2
            </button>
            <button
              className={`vocab-sub-tab ${vocabSubTab === 'kurssin' ? 'active' : ''}`}
              onClick={() => setVocabSubTab('kurssin')}
            >
              📚 Kurssin Arvostelu
            </button>
          </div>

          {vocabSubTab === 'sm2' ? (
            <>
              <p className="menu-subtitle">Suomen Mestari 2 - Kappale sanasto</p>

              {/* SM2 Cycle Selection for All Modes */}
              <div className="sm2-cycle-selector" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <div className="sm2-header">
                  <h3>Valitse sykli</h3>
                  <div className="sm2-actions">
                    <button className="small-btn" onClick={selectAllSM2Cycles}>Kaikki</button>
                    <button className="small-btn" onClick={clearSM2CycleSelection}>Tyhjennä</button>
                  </div>
                </div>
                <div className="sm2-cycle-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.5rem', marginTop: '0.75rem' }}>
                  {allSM2Chapters.map((chapter) => {
                    const cycles = getSM2CyclesForChapter(chapter.id);
                    return (
                      <div key={chapter.id} style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                          Kappale {chapter.id}:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {cycles.map((cycle) => {
                            const isSelected = selectedSM2Cycles.includes(cycle.cycleId);
                            const cycleProgress = player.sm2CycleProgress?.find(p => p.cycleId === cycle.cycleId);
                            const isMemoriseCompleted = cycleProgress?.memoriseCompleted || false;
                            const isRecallCompleted = cycleProgress?.recallCompleted || false;
                            const isActiveRecallCompleted = cycleProgress?.activeRecallCompleted || false;
                            const isAnyCompleted = isMemoriseCompleted || isRecallCompleted || isActiveRecallCompleted;
                            return (
                              <button
                                key={cycle.cycleId}
                                className={`sm2-cycle-btn ${isSelected ? 'selected' : ''} ${isAnyCompleted ? 'completed' : ''}`}
                                onClick={() => toggleSM2Cycle(cycle.cycleId)}
                                style={{
                                  padding: '0.5rem 0.75rem',
                                  border: `2px solid ${isSelected ? '#4caf50' : isAnyCompleted ? 'rgba(76, 175, 80, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                                  borderRadius: '8px',
                                  background: isSelected ? 'rgba(76, 175, 80, 0.2)' : isAnyCompleted ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                                  color: 'var(--text-primary)',
                                  cursor: 'pointer',
                                  fontSize: '0.9rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  flexDirection: 'column',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span>{cycle.name}</span>
                                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>({cycle.words.length})</span>
                                  {isAnyCompleted && <CheckIcon size={12} color="#4caf50" />}
                                </div>
                                {(isMemoriseCompleted || isRecallCompleted || isActiveRecallCompleted) && (
                                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.25rem' }}>
                                    {isMemoriseCompleted && <span>🧠</span>}
                                    {isRecallCompleted && <span>📖</span>}
                                    {isActiveRecallCompleted && <span>✏️</span>}
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {selectedSM2Cycles.length > 0 && (
                  <p className="selected-info" style={{ marginTop: '0.75rem' }}>
                    Valittu: {selectedSM2Cycles.length} sykli{selectedSM2Cycles.length !== 1 ? 'ä' : ''} ({sm2CycleWordCount} sanaa)
                  </p>
                )}
              </div>

              {/* SM2 Game Modes */}
              <div className="menu-modes vocabulary-modes sm2-modes">
                <button
                  className="mode-button sm2 study"
                  onClick={() => {
                    if (selectedSM2Cycles.length > 0) {
                      onStartSM2Study(selectedSM2Cycles);
                    }
                  }}
                  disabled={selectedSM2Cycles.length === 0}
                >
                  <div className="mode-info">
                    <span className="mode-name">📖 Katsele</span>
                    <span className="mode-desc">Katso kaikki sanat ennen opettelua</span>
                  </div>
                  <div className="mode-best">
                    <span className="word-count">{selectedSM2Cycles.length > 0 ? sm2CycleWordCount : 0} sanaa</span>
                  </div>
                </button>

                <button
                  className="mode-button sm2 memorise"
                  onClick={() => {
                    if (selectedSM2Cycles.length > 0) {
                      onStartSM2MemoriseSession(selectedSM2Cycles);
                    }
                  }}
                  disabled={selectedSM2Cycles.length === 0}
                >
                  <div className="mode-info">
                    <span className="mode-name">🧠 Opettele</span>
                    <span className="mode-desc">Virhe = 3x oikein ennen etenemistä</span>
                  </div>
                  <div className="mode-best">
                    <span className="word-count">{selectedSM2Cycles.length > 0 ? sm2CycleWordCount : 0} sanaa</span>
                  </div>
                </button>

                <button
                  className="mode-button sm2"
                  onClick={() => {
                    if (selectedSM2Cycles.length > 0) {
                      onStartSM2Session('vocabulary-recall', selectedSM2Cycles);
                    }
                  }}
                  disabled={selectedSM2Cycles.length === 0}
                >
                  <div className="mode-info">
                    <span className="mode-name"><OpenBookIcon size={18} /> Muistaminen</span>
                    <span className="mode-desc">Suomi → Englanti</span>
                  </div>
                  <div className="mode-best">
                    <span className="word-count">{selectedSM2Cycles.length > 0 ? sm2CycleWordCount : 0} sanaa</span>
                  </div>
                </button>

                <button
                  className="mode-button sm2"
                  onClick={() => {
                    if (selectedSM2Cycles.length > 0) {
                      onStartSM2Session('vocabulary-active-recall', selectedSM2Cycles);
                    }
                  }}
                  disabled={selectedSM2Cycles.length === 0}
                >
                  <div className="mode-info">
                    <span className="mode-name"><PencilIcon size={18} /> Aktiivinen muistaminen</span>
                    <span className="mode-desc">Englanti → Suomi</span>
                  </div>
                  <div className="mode-best">
                    <span className="word-count">{selectedSM2Cycles.length > 0 ? sm2CycleWordCount : 0} sanaa</span>
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
