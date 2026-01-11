import { useState, useEffect } from 'react';
import type { PlayerState, CaseCategory, PartitiveRule, PluralRule, GenitiveRule, PikkusanaCategory, LyricsSubMode, QuestionCategory, QuestionSubMode } from '../types';
import { verbs, verbTypeInfo } from '../data/verbs';
import type { Tavoite } from '../data/tavoiteVocabulary';
import type { SM2Chapter, SM2Cycle } from '../data/suomenMestari2';
import type { CaseGroup } from '../data/finnishCases';
import type { PartitiveRuleInfo } from '../data/partitiveData';
import type { PluralRuleInfo } from '../data/pluralData';
import type { GenitiveRuleInfo } from '../data/genitiveData';
import type { PikkusanaCategoryInfo } from '../data/pikkusanat';
import type { Song } from '../data/songs';
import type { QuestionCategoryInfo } from '../data/questionWords';
import { QUESTION_WORDS } from '../data/questionWords';
import { TargetIcon, BookIcon, OpenBookIcon, PencilIcon, CheckIcon, MapPinIcon } from './Icons';

interface MenuProps {
  player: PlayerState;
  onExportTimes: () => void;
  onResetProgress: () => void;
  formatTime: (ms: number) => string;
  // Verb Type Arena props
  selectedVerbTypes: number[];
  onSelectVerbTypes: (types: number[]) => void;
  onStartVerbTypeSession: (tense: 'present' | 'negative' | 'imperfect' | 'imperfectNegative', types: number[]) => void;
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
  onStartCasesSession: (categories: CaseCategory[], isPlural?: boolean) => void;
  getCasesSentenceCount: (categories: CaseCategory[], isPlural?: boolean) => number;
  caseGroups: CaseGroup[];
  // Partitive props
  selectedPartitiveRules: PartitiveRule[];
  onSelectPartitiveRules: (rules: PartitiveRule[]) => void;
  onStartPartitiveSession: (rules: PartitiveRule[], isPlural?: boolean) => void;
  getPartitiveWordCount: (rules: PartitiveRule[]) => number;
  partitiveRules: PartitiveRuleInfo[];
  // Plural props
  selectedPluralRules: PluralRule[];
  onSelectPluralRules: (rules: PluralRule[]) => void;
  onStartPluralSession: (rules: PluralRule[]) => void;
  getPluralWordCount: (rules: PluralRule[]) => number;
  pluralRules: PluralRuleInfo[];
  // Genitive props
  selectedGenitiveRules: GenitiveRule[];
  onSelectGenitiveRules: (rules: GenitiveRule[]) => void;
  onStartGenitiveSession: (rules: GenitiveRule[], isPlural?: boolean) => void;
  getGenitiveWordCount: (rules: GenitiveRule[]) => number;
  genitiveRules: GenitiveRuleInfo[];
  // Pikkusanat props
  selectedPikkusanaCategories: PikkusanaCategory[];
  onSelectPikkusanaCategories: (categories: PikkusanaCategory[]) => void;
  onStartPikkusanatSession: (categories: PikkusanaCategory[]) => void;
  getPikkusanaWordCount: (categories: PikkusanaCategory[]) => number;
  pikkusanaCategories: PikkusanaCategoryInfo[];
  // Lyrics props
  selectedSongId: string;
  onSelectSongId: (songId: string) => void;
  selectedLyricsMode: LyricsSubMode;
  onSelectLyricsMode: (mode: LyricsSubMode) => void;
  onStartLyricsSession: (songId: string, mode: LyricsSubMode) => void;
  getSongInfo: (songId: string) => { title: string; artist: string; wordCount: number; lineCount: number; difficulty: string } | null;
  allSongs: Song[];
  // Question Words props
  selectedQuestionCategories: QuestionCategory[];
  onSelectQuestionCategories: (categories: QuestionCategory[]) => void;
  selectedQuestionSubMode: QuestionSubMode;
  onSelectQuestionSubMode: (mode: QuestionSubMode) => void;
  onStartQuestionWordSession: (categories: QuestionCategory[], subMode: QuestionSubMode) => void;
  getQuestionWordCount: (categories: QuestionCategory[]) => number;
  questionCategories: QuestionCategoryInfo[];
  // Tab management
  initialTab?: 'verbs' | 'vocabulary' | 'cases' | 'partitive' | 'plural' | 'genitive' | 'pikkusanat' | 'lyrics' | 'questions';
  onTabChange?: (tab: 'verbs' | 'vocabulary' | 'cases' | 'partitive' | 'plural' | 'genitive' | 'pikkusanat' | 'lyrics' | 'questions') => void;
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
  onStartSM2Session,
  onStartSM2MemoriseSession,
  onStartSM2Study,
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
  selectedPluralRules,
  onSelectPluralRules,
  onStartPluralSession,
  getPluralWordCount,
  pluralRules,
  selectedGenitiveRules,
  onSelectGenitiveRules,
  onStartGenitiveSession,
  getGenitiveWordCount,
  genitiveRules,
  selectedPikkusanaCategories,
  onSelectPikkusanaCategories,
  onStartPikkusanatSession,
  getPikkusanaWordCount,
  pikkusanaCategories,
  selectedSongId,
  onSelectSongId,
  selectedLyricsMode,
  onSelectLyricsMode,
  onStartLyricsSession,
  getSongInfo,
  allSongs,
  selectedQuestionCategories,
  onSelectQuestionCategories,
  selectedQuestionSubMode,
  onSelectQuestionSubMode,
  onStartQuestionWordSession,
  getQuestionWordCount,
  questionCategories,
  initialTab = 'verbs',
  onTabChange,
}: MenuProps) {
  const [activeTab, setActiveTab] = useState<'verbs' | 'vocabulary' | 'cases' | 'partitive' | 'plural' | 'genitive' | 'pikkusanat' | 'lyrics' | 'questions'>(initialTab);
  
  // Update local state when initialTab changes (e.g., when returning from quiz)
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);
  
  const handleTabChange = (tab: 'verbs' | 'vocabulary' | 'cases' | 'partitive' | 'plural' | 'genitive' | 'pikkusanat' | 'lyrics' | 'questions') => {
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
          <TargetIcon size={18} /> Verb Harjoitus
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
        <button 
          className={`tab-btn ${activeTab === 'plural' ? 'active' : ''}`}
          onClick={() => handleTabChange('plural')}
        >
          <TargetIcon size={18} /> Monikko
        </button>
        <button 
          className={`tab-btn ${activeTab === 'genitive' ? 'active' : ''}`}
          onClick={() => handleTabChange('genitive')}
        >
          <TargetIcon size={18} /> Genetiivi
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pikkusanat' ? 'active' : ''}`}
          onClick={() => handleTabChange('pikkusanat')}
        >
          <TargetIcon size={18} /> Pikkusanat
        </button>
        <button 
          className={`tab-btn ${activeTab === 'lyrics' ? 'active' : ''}`}
          onClick={() => handleTabChange('lyrics')}
        >
          🎵 Song Lyrics
        </button>
        <button 
          className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => handleTabChange('questions')}
        >
          ❓ Kysymyssanat
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
                <span className="mode-name"><PencilIcon size={18} /> Singular Cases</span>
                <span className="mode-desc">Complete sentences with singular case forms</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{casesSentenceCount} sentences</span>
              </div>
            </button>
            <button
              className="mode-button cases plural"
              onClick={() => onStartCasesSession(selectedCaseCategories, true)}
            >
              <div className="mode-info">
                <span className="mode-name"><PencilIcon size={18} /> Plural Cases (Monikko)</span>
                <span className="mode-desc">Complete sentences with plural case forms</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{getCasesSentenceCount(selectedCaseCategories, true)} sentences</span>
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
              onClick={() => onStartPartitiveSession(selectedPartitiveRules, false)}
              disabled={selectedPartitiveRules.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name"><PencilIcon size={18} /> Partitiivi (Singular)</span>
                <span className="mode-desc">See a word, write its singular partitive form</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{getPartitiveWordCount(selectedPartitiveRules)} words</span>
              </div>
            </button>

            <button
              className="mode-button partitive plural"
              onClick={() => onStartPartitiveSession(selectedPartitiveRules, true)}
              disabled={selectedPartitiveRules.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name"><PencilIcon size={18} /> Partitiivi Monikko (Plural)</span>
                <span className="mode-desc">See a word, write its plural partitive form</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{getPartitiveWordCount(selectedPartitiveRules)} words</span>
              </div>
            </button>
          </div>
        </>
      )}

      {activeTab === 'plural' && (
        <>
          <p className="menu-subtitle">Master Finnish Nominative Plural - essential for speaking about multiple things</p>

          {/* Plural Information */}
          <div className="partitive-info-section">
            <div className="partitive-reference-card">
              <h4>Monikko (Nominative Plural)</h4>
              <div className="partitive-ending-info">
                <div className="ending-group">
                  <span className="ending-label">Endings:</span>
                  <span className="ending-value">-t, -et, -set</span>
                </div>
                <div className="ending-group">
                  <span className="ending-label">Question:</span>
                  <span className="ending-value">Ketkä? Mitkä? (Who? Which ones?)</span>
                </div>
              </div>
              
              <div className="partitive-uses">
                <h5>When to use Nominative Plural:</h5>
                <ul className="partitive-rules">
                  <li><strong>Multiple subjects:</strong> Koirat juoksevat (The dogs run)</li>
                  <li><strong>Predicate plural:</strong> Nämä ovat kirjat (These are the books)</li>
                  <li><strong>After demonstratives:</strong> Nuo talot (Those houses)</li>
                  <li><strong>After possessives:</strong> Minun ystäväni (My friends)</li>
                </ul>
              </div>

              <div className="partitive-examples">
                <h5>Examples:</h5>
                <div className="example-grid">
                  <div className="example-item">
                    <span className="base">talo</span> → <span className="partitive">talot</span>
                  </div>
                  <div className="example-item">
                    <span className="base">koira</span> → <span className="partitive">koirat</span>
                  </div>
                  <div className="example-item">
                    <span className="base">ovi</span> → <span className="partitive">ovet</span>
                  </div>
                  <div className="example-item">
                    <span className="base">nainen</span> → <span className="partitive">naiset</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rule Selection */}
          <div className="partitive-rule-selector">
            <h3>Select Word Types to Practice</h3>
            <div className="partitive-rule-grid">
              {pluralRules.map((rule) => {
                const isSelected = selectedPluralRules.includes(rule.id);
                
                return (
                  <button
                    key={rule.id}
                    className={`partitive-rule-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (isSelected) {
                        if (selectedPluralRules.length > 1) {
                          onSelectPluralRules(selectedPluralRules.filter(r => r !== rule.id));
                        }
                      } else {
                        onSelectPluralRules([...selectedPluralRules, rule.id]);
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
              Selected: {selectedPluralRules.length} rule{selectedPluralRules.length !== 1 ? 's' : ''} ({getPluralWordCount(selectedPluralRules)} words)
            </p>
          </div>

          {/* Game Mode */}
          <div className="menu-modes partitive-modes">
            <button
              className="mode-button plural-mode"
              onClick={() => onStartPluralSession(selectedPluralRules)}
              disabled={selectedPluralRules.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name"><PencilIcon size={18} /> Practice Nominative Plural</span>
                <span className="mode-desc">See a singular word, write its plural form</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{getPluralWordCount(selectedPluralRules)} words</span>
              </div>
            </button>
          </div>
        </>
      )}

      {activeTab === 'genitive' && (
        <>
          <p className="menu-subtitle">Master the Genitive case - showing possession and used with many postpositions</p>

          {/* Genitive Information */}
          <div className="partitive-info-section">
            <div className="partitive-reference-card">
              <h4>Genetiivi (Genitive Case)</h4>
              <div className="partitive-ending-info">
                <div className="ending-group">
                  <span className="ending-label">Singular endings:</span>
                  <span className="ending-value">-n</span>
                </div>
                <div className="ending-group">
                  <span className="ending-label">Plural endings:</span>
                  <span className="ending-value">-en, -den, -tten, -ien, etc.</span>
                </div>
                <div className="ending-group">
                  <span className="ending-label">Question:</span>
                  <span className="ending-value">Kenen? Minkä? (Whose? Of what?)</span>
                </div>
              </div>
              
              <div className="partitive-uses">
                <h5>When to use Genitive:</h5>
                <ul className="partitive-rules">
                  <li><strong>Possession:</strong> koiran häntä (the dog's tail)</li>
                  <li><strong>With postpositions:</strong> talon takana (behind the house)</li>
                  <li><strong>As object (total):</strong> Ostan auton (I buy the car)</li>
                  <li><strong>Compound words:</strong> kirjakauppa (bookstore)</li>
                </ul>
              </div>

              <div className="partitive-examples">
                <h5>Examples:</h5>
                <div className="example-grid">
                  <div className="example-item">
                    <span className="base">talo</span> → <span className="partitive">talon</span>
                  </div>
                  <div className="example-item">
                    <span className="base">koira</span> → <span className="partitive">koiran</span>
                  </div>
                  <div className="example-item">
                    <span className="base">vesi</span> → <span className="partitive">veden</span>
                  </div>
                  <div className="example-item">
                    <span className="base">nainen</span> → <span className="partitive">naisen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rule Selection */}
          <div className="partitive-rule-selector">
            <h3>Select Word Types to Practice</h3>
            <div className="partitive-rule-grid">
              {genitiveRules.map((rule) => {
                const isSelected = selectedGenitiveRules.includes(rule.id);
                
                return (
                  <button
                    key={rule.id}
                    className={`partitive-rule-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (isSelected) {
                        if (selectedGenitiveRules.length > 1) {
                          onSelectGenitiveRules(selectedGenitiveRules.filter(r => r !== rule.id));
                        }
                      } else {
                        onSelectGenitiveRules([...selectedGenitiveRules, rule.id]);
                      }
                    }}
                    style={{ '--rule-color': rule.color } as React.CSSProperties}
                  >
                    <div className="rule-header">
                      <span className="rule-name">{rule.name}</span>
                    </div>
                    <span className="rule-description">{rule.description}</span>
                    <span className="rule-formation">{rule.formationSingular}</span>
                    <span className="rule-example">{rule.examples[0]}</span>
                  </button>
                );
              })}
            </div>
            <p className="selected-info">
              Selected: {selectedGenitiveRules.length} rule{selectedGenitiveRules.length !== 1 ? 's' : ''} ({getGenitiveWordCount(selectedGenitiveRules)} words)
            </p>
          </div>

          {/* Game Modes */}
          <div className="menu-modes partitive-modes">
            <button
              className="mode-button genitive-mode"
              onClick={() => onStartGenitiveSession(selectedGenitiveRules, false)}
              disabled={selectedGenitiveRules.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name"><PencilIcon size={18} /> Genetiivi (Singular)</span>
                <span className="mode-desc">See a word, write its singular genitive form</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{getGenitiveWordCount(selectedGenitiveRules)} words</span>
              </div>
            </button>

            <button
              className="mode-button genitive-mode plural"
              onClick={() => onStartGenitiveSession(selectedGenitiveRules, true)}
              disabled={selectedGenitiveRules.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name"><PencilIcon size={18} /> Genetiivi Monikko (Plural)</span>
                <span className="mode-desc">See a word, write its plural genitive form</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{getGenitiveWordCount(selectedGenitiveRules)} words</span>
              </div>
            </button>
          </div>
        </>
      )}

      {activeTab === 'pikkusanat' && (
        <>
          <p className="menu-subtitle">Learn the small words that make Finnish sentences flow naturally</p>

          {/* Pikkusanat Information Card */}
          <div className="partitive-info-section">
            <div className="partitive-reference-card">
              <h4>Pikkusanat (Small Words)</h4>
              <div className="partitive-ending-info">
                <div className="ending-group">
                  <span className="ending-label">What are they:</span>
                  <span className="ending-value">Filler words, connectors, and particles</span>
                </div>
                <div className="ending-group">
                  <span className="ending-label">Purpose:</span>
                  <span className="ending-value">Make sentences sound natural and fluent</span>
                </div>
              </div>
              
              <div className="partitive-uses">
                <h5>Why they matter:</h5>
                <ul className="partitive-rules">
                  <li><strong>Connect ideas:</strong> ja (and), mutta (but), koska (because)</li>
                  <li><strong>Add nuance:</strong> ehkä (maybe), varmasti (certainly), melkein (almost)</li>
                  <li><strong>Sound natural:</strong> no niin (well then), siis (so), niinku (like)</li>
                  <li><strong>Express time:</strong> nyt (now), sitten (then), jo (already)</li>
                </ul>
              </div>

              <div className="partitive-examples">
                <h5>Example Usage:</h5>
                <div className="example-grid">
                  <div className="example-item">
                    <span className="base">ehkä</span> → <span className="partitive">maybe</span>
                    <span className="example-note">Ehkä huomenna.</span>
                  </div>
                  <div className="example-item">
                    <span className="base">siis</span> → <span className="partitive">so, therefore</span>
                    <span className="example-note">Sinä siis tulet?</span>
                  </div>
                  <div className="example-item">
                    <span className="base">kuitenkin</span> → <span className="partitive">however</span>
                    <span className="example-note">Olen kuitenkin onnellinen.</span>
                  </div>
                  <div className="example-item">
                    <span className="base">melkein</span> → <span className="partitive">almost</span>
                    <span className="example-note">Melkein unohdin!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Selection */}
          <div className="partitive-rule-selector">
            <h3>Select Categories to Practice</h3>
            <div className="partitive-rule-grid">
              {pikkusanaCategories.map((category) => {
                const isSelected = selectedPikkusanaCategories.includes(category.id);
                
                return (
                  <button
                    key={category.id}
                    className={`partitive-rule-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (isSelected) {
                        if (selectedPikkusanaCategories.length > 1) {
                          onSelectPikkusanaCategories(selectedPikkusanaCategories.filter(c => c !== category.id));
                        }
                      } else {
                        onSelectPikkusanaCategories([...selectedPikkusanaCategories, category.id]);
                      }
                    }}
                    style={{ '--rule-color': category.color } as React.CSSProperties}
                  >
                    <div className="rule-header">
                      <span className="rule-name">{category.name}</span>
                      {isSelected && <CheckIcon size={14} color="#4caf50" />}
                    </div>
                    <span className="rule-finnish-label">{category.finnishName}</span>
                    <span className="rule-description">{category.description}</span>
                  </button>
                );
              })}
            </div>
            <p className="selected-info">
              Selected: {selectedPikkusanaCategories.length} categor{selectedPikkusanaCategories.length !== 1 ? 'ies' : 'y'} ({getPikkusanaWordCount(selectedPikkusanaCategories)} words)
            </p>
          </div>

          {/* Game Mode */}
          <div className="menu-modes partitive-modes">
            <button
              className="mode-button pikkusanat-mode"
              onClick={() => onStartPikkusanatSession(selectedPikkusanaCategories)}
              disabled={selectedPikkusanaCategories.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name"><PencilIcon size={18} /> Harjoittele Pikkusanoja</span>
                <span className="mode-desc">See English meaning, write the Finnish small word</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{getPikkusanaWordCount(selectedPikkusanaCategories)} words</span>
              </div>
            </button>
          </div>
        </>
      )}

      {activeTab === 'lyrics' && (
        <>
          <p className="menu-subtitle">Learn Finnish through your favorite songs 🎶</p>

          {/* Song Selection */}
          <div className="lyrics-song-selector">
            <h3>Select a Song</h3>
            <div className="song-grid">
              {allSongs.map((song) => {
                const info = getSongInfo(song.id);
                const isSelected = selectedSongId === song.id;
                
                return (
                  <button
                    key={song.id}
                    className={`song-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => onSelectSongId(song.id)}
                  >
                    <div className="song-header">
                      <span className="song-title">{song.title}</span>
                      <span className={`song-difficulty ${song.difficulty}`}>{song.difficulty}</span>
                    </div>
                    <span className="song-artist">by {song.artist}</span>
                    <div className="song-stats">
                      <span className="song-stat">📝 {info?.wordCount || 0} words</span>
                      <span className="song-stat">📄 {info?.lineCount || 0} lines</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Game Mode Selection */}
          {selectedSongId && (
            <div className="lyrics-mode-selector">
              <h3>Choose Practice Mode</h3>
              <div className="lyrics-mode-grid">
                <button
                  className={`lyrics-mode-btn ${selectedLyricsMode === 'word-match' ? 'selected' : ''}`}
                  onClick={() => onSelectLyricsMode('word-match')}
                >
                  <span className="mode-icon">🎯</span>
                  <span className="mode-title">Word Match</span>
                  <span className="mode-desc">Match Finnish words to English meanings</span>
                </button>
                <button
                  className={`lyrics-mode-btn ${selectedLyricsMode === 'word-recall' ? 'selected' : ''}`}
                  onClick={() => onSelectLyricsMode('word-recall')}
                >
                  <span className="mode-icon">✍️</span>
                  <span className="mode-title">Word Recall</span>
                  <span className="mode-desc">Type the Finnish word from English</span>
                </button>
                <button
                  className={`lyrics-mode-btn ${selectedLyricsMode === 'line-translate' ? 'selected' : ''}`}
                  onClick={() => onSelectLyricsMode('line-translate')}
                >
                  <span className="mode-icon">📖</span>
                  <span className="mode-title">Line Translation</span>
                  <span className="mode-desc">Match Finnish lines to English translations</span>
                </button>
                <button
                  className={`lyrics-mode-btn ${selectedLyricsMode === 'fill-blank' ? 'selected' : ''}`}
                  onClick={() => onSelectLyricsMode('fill-blank')}
                >
                  <span className="mode-icon">🔤</span>
                  <span className="mode-title">Fill in the Blank</span>
                  <span className="mode-desc">Complete the missing word in a line</span>
                </button>
                <button
                  className={`lyrics-mode-btn ${selectedLyricsMode === 'word-order' ? 'selected' : ''}`}
                  onClick={() => onSelectLyricsMode('word-order')}
                >
                  <span className="mode-icon">🔀</span>
                  <span className="mode-title">Word Order</span>
                  <span className="mode-desc">Arrange shuffled words in correct order</span>
                </button>
              </div>
            </div>
          )}

          {/* Start Button */}
          {selectedSongId && (
            <div className="menu-modes lyrics-modes">
              <button
                className="mode-button lyrics"
                onClick={() => onStartLyricsSession(selectedSongId, selectedLyricsMode)}
              >
                <div className="mode-info">
                  <span className="mode-name">🎵 Start Learning</span>
                  <span className="mode-desc">
                    {selectedLyricsMode === 'word-match' && 'Match words to their meanings'}
                    {selectedLyricsMode === 'word-recall' && 'Practice typing Finnish words'}
                    {selectedLyricsMode === 'line-translate' && 'Learn full sentences'}
                    {selectedLyricsMode === 'fill-blank' && 'Complete the lyrics'}
                    {selectedLyricsMode === 'word-order' && 'Rearrange the words'}
                  </span>
                </div>
                <div className="mode-best">
                  <span className="word-count">
                    {(selectedLyricsMode === 'word-match' || selectedLyricsMode === 'word-recall') 
                      ? `${getSongInfo(selectedSongId)?.wordCount || 0} words`
                      : `${getSongInfo(selectedSongId)?.lineCount || 0} lines`
                    }
                  </span>
                </div>
              </button>
            </div>
          )}

          {/* Song Preview */}
          {selectedSongId && (
            <div className="lyrics-preview">
              <h3>Preview: {getSongInfo(selectedSongId)?.title}</h3>
              <div className="preview-note">
                <p>This song contains vocabulary about emotions, relationships, and everyday life. 
                Learn words through the context of music - it's the most natural way!</p>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'questions' && (
        <>
          <p className="menu-subtitle">Master Finnish question words - know instantly what's being asked</p>

          {/* Quick Reference Card */}
          <div className="qw-quick-ref">
            <div className="qw-quick-ref-header">
              <h3>Quick Reference</h3>
              <span className="qw-quick-ref-hint">Core question words at a glance</span>
            </div>
            <div className="qw-quick-ref-grid">
              <div className="qref-cell"><span className="qref-fi">mikä/mitä</span><span className="qref-en">what</span></div>
              <div className="qref-cell"><span className="qref-fi">kuka/ketä</span><span className="qref-en">who</span></div>
              <div className="qref-cell"><span className="qref-fi">missä/mistä/mihin</span><span className="qref-en">where</span></div>
              <div className="qref-cell"><span className="qref-fi">milloin/koska</span><span className="qref-en">when</span></div>
              <div className="qref-cell"><span className="qref-fi">miten/kuinka</span><span className="qref-en">how</span></div>
              <div className="qref-cell"><span className="qref-fi">miksi</span><span className="qref-en">why</span></div>
              <div className="qref-cell"><span className="qref-fi">kumpi</span><span className="qref-en">which (of 2)</span></div>
              <div className="qref-cell"><span className="qref-fi">kenen</span><span className="qref-en">whose</span></div>
              <div className="qref-cell"><span className="qref-fi">paljonko</span><span className="qref-en">how much</span></div>
            </div>
          </div>

          {/* Full Study Reference */}
          <div className="qw-study-section">
            <div className="qw-study-header">
              <h3>Study Reference</h3>
              <span className="qw-study-hint">Click a category to explore all words</span>
            </div>
            
            <div className="qw-study-categories">
              {questionCategories.map((cat) => {
                const wordsInCategory = QUESTION_WORDS.filter(w => w.category === cat.id);
                
                return (
                  <details key={cat.id} className="qw-study-cat">
                    <summary className="qw-cat-summary" style={{ '--cat-color': cat.color } as React.CSSProperties}>
                      <div className="qw-cat-info">
                        <span className="qw-cat-name">{cat.name}</span>
                        <span className="qw-cat-finnish">{cat.finnishName}</span>
                      </div>
                      <span className="qw-cat-count">{wordsInCategory.length}</span>
                    </summary>
                    <div className="qw-cat-words">
                      {wordsInCategory.map((word, idx) => (
                        <div key={idx} className="qw-word-entry">
                          <div className="qw-word-row">
                            <span className="qw-word-fi">{word.finnish}</span>
                            <span className="qw-word-divider"></span>
                            <span className="qw-word-en">{word.english}</span>
                          </div>
                          <div className="qw-word-usage">{word.usage}</div>
                          <div className="qw-word-example">
                            <span className="qw-ex-fi">{word.example}</span>
                            <span className="qw-ex-en">{word.exampleTranslation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                );
              })}
            </div>
          </div>

          {/* Category Selection for Quiz */}
          <div className="question-category-selector">
            <h3>Select Categories to Practice</h3>
            <div className="question-category-grid">
              {questionCategories.map((cat) => {
                const isSelected = selectedQuestionCategories.includes(cat.id);
                const wordCount = getQuestionWordCount([cat.id]);
                
                return (
                  <button
                    key={cat.id}
                    className={`question-category-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (isSelected) {
                        if (selectedQuestionCategories.length > 1) {
                          onSelectQuestionCategories(selectedQuestionCategories.filter(c => c !== cat.id));
                        }
                      } else {
                        onSelectQuestionCategories([...selectedQuestionCategories, cat.id]);
                      }
                    }}
                    style={{ '--cat-color': cat.color } as React.CSSProperties}
                  >
                    <div className="question-cat-header">
                      <span className="question-cat-name">{cat.name}</span>
                    </div>
                    <span className="question-cat-finnish">{cat.finnishName}</span>
                    <span className="question-cat-desc">{cat.description}</span>
                    <span className="question-cat-count">{wordCount} words</span>
                  </button>
                );
              })}
            </div>
            <div className="selection-actions">
              <button 
                className="select-all-btn"
                onClick={() => onSelectQuestionCategories(questionCategories.map(c => c.id))}
              >
                Select All
              </button>
              <button 
                className="clear-selection-btn"
                onClick={() => onSelectQuestionCategories([questionCategories[0].id])}
              >
                Clear
              </button>
            </div>
            <p className="selected-info">
              Selected: {selectedQuestionCategories.length} categor{selectedQuestionCategories.length !== 1 ? 'ies' : 'y'} ({getQuestionWordCount(selectedQuestionCategories)} words)
            </p>
          </div>

          {/* Mode Selection */}
          <div className="question-mode-selector">
            <h3>Choose Practice Mode</h3>
            
            <div className="qw-mode-cards">
              {/* Intuitive Modes */}
              <button
                className={`qw-mode-card intuitive ${selectedQuestionSubMode === 'scenario' ? 'selected' : ''}`}
                onClick={() => onSelectQuestionSubMode('scenario')}
              >
                <div className="qw-mode-badge">Recommended</div>
                <div className="qw-mode-icon scenario-icon"></div>
                <div className="qw-mode-content">
                  <span className="qw-mode-title">Situation Match</span>
                  <span className="qw-mode-subtitle">See a situation, pick the question</span>
                </div>
              </button>
              
              <button
                className={`qw-mode-card intuitive ${selectedQuestionSubMode === 'answer-match' ? 'selected' : ''}`}
                onClick={() => onSelectQuestionSubMode('answer-match')}
              >
                <div className="qw-mode-badge">Pattern Learning</div>
                <div className="qw-mode-icon answer-icon"></div>
                <div className="qw-mode-content">
                  <span className="qw-mode-title">Answer Detective</span>
                  <span className="qw-mode-subtitle">Deduce the question from the answer</span>
                </div>
              </button>
              
              <button
                className={`qw-mode-card ${selectedQuestionSubMode === 'recognize' ? 'selected' : ''}`}
                onClick={() => onSelectQuestionSubMode('recognize')}
              >
                <div className="qw-mode-icon recognize-icon"></div>
                <div className="qw-mode-content">
                  <span className="qw-mode-title">Recognition</span>
                  <span className="qw-mode-subtitle">Finnish → English (multiple choice)</span>
                </div>
              </button>
              
              <button
                className={`qw-mode-card ${selectedQuestionSubMode === 'recall' ? 'selected' : ''}`}
                onClick={() => onSelectQuestionSubMode('recall')}
              >
                <div className="qw-mode-icon recall-icon"></div>
                <div className="qw-mode-content">
                  <span className="qw-mode-title">Active Recall</span>
                  <span className="qw-mode-subtitle">English → Finnish (typing)</span>
                </div>
              </button>
            </div>
          </div>

          {/* Start Button */}
          <div className="menu-modes question-modes">
            <button
              className="mode-button questions"
              onClick={() => onStartQuestionWordSession(selectedQuestionCategories, selectedQuestionSubMode)}
              disabled={selectedQuestionCategories.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name">
                  {selectedQuestionSubMode === 'scenario' && 'Start Situation Match'}
                  {selectedQuestionSubMode === 'answer-match' && 'Start Answer Detective'}
                  {selectedQuestionSubMode === 'recognize' && 'Start Recognition'}
                  {selectedQuestionSubMode === 'recall' && 'Start Active Recall'}
                </span>
                <span className="mode-desc">
                  {selectedQuestionSubMode === 'scenario' && 'Learn which question fits each situation'}
                  {selectedQuestionSubMode === 'answer-match' && 'Deduce the question from the answer'}
                  {selectedQuestionSubMode === 'recognize' && 'Pick the correct meaning'}
                  {selectedQuestionSubMode === 'recall' && 'Type the Finnish question word'}
                </span>
              </div>
              <div className="mode-best">
                <span className="word-count">
                  {(selectedQuestionSubMode === 'scenario' || selectedQuestionSubMode === 'answer-match') 
                    ? 'Intuitive learning' 
                    : `${getQuestionWordCount(selectedQuestionCategories)} words`}
                </span>
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

            {/* Present Negative Mode */}
            <button
              className="mode-button verb-type negative"
              onClick={() => onStartVerbTypeSession('negative', selectedVerbTypes)}
              disabled={selectedVerbTypes.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name">🚫 Kieltomuoto (Present Negative)</span>
                <span className="mode-desc">Write all 6 negative present forms (en puhu, et puhu...)</span>
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

            {/* Past Negative Mode */}
            <button
              className="mode-button verb-type negative"
              onClick={() => onStartVerbTypeSession('imperfectNegative', selectedVerbTypes)}
              disabled={selectedVerbTypes.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name">🚫📜 Imperfektin Kielto (Past Negative)</span>
                <span className="mode-desc">Write all 6 negative past forms (en puhunut, et puhunut...)</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{verbsByTypeCount} verbs × 6 forms</span>
              </div>
            </button>

            {/* Imperative Mode */}
            <button
              className="mode-button verb-type imperative"
              onClick={() => onStartVerbTypeSession('imperative', selectedVerbTypes)}
              disabled={selectedVerbTypes.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name">👆 Imperatiivi (Commands)</span>
                <span className="mode-desc">Write command forms: puhu!, puhukaamme!, puhukaa!</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{verbsByTypeCount} verbs × 3 forms</span>
              </div>
            </button>

            {/* Imperative Negative Mode */}
            <button
              className="mode-button verb-type negative imperative"
              onClick={() => onStartVerbTypeSession('imperativeNegative', selectedVerbTypes)}
              disabled={selectedVerbTypes.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name">🚫👆 Imperatiivin Kielto (Neg. Commands)</span>
                <span className="mode-desc">Write negative commands: älä puhu!, älkää puhuko!</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{verbsByTypeCount} verbs × 3 forms</span>
              </div>
            </button>

            {/* Conditional Mode */}
            <button
              className="mode-button verb-type conditional"
              onClick={() => onStartVerbTypeSession('conditional', selectedVerbTypes)}
              disabled={selectedVerbTypes.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name">💭 Konditionaali (Would)</span>
                <span className="mode-desc">Write conditional forms: puhuisin, puhuisit, puhuisi...</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{verbsByTypeCount} verbs × 6 forms</span>
              </div>
            </button>

            {/* Conditional Negative Mode */}
            <button
              className="mode-button verb-type negative conditional"
              onClick={() => onStartVerbTypeSession('conditionalNegative', selectedVerbTypes)}
              disabled={selectedVerbTypes.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name">🚫💭 Konditionaalin Kielto</span>
                <span className="mode-desc">Write negative conditional: en puhuisi, et puhuisi...</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{verbsByTypeCount} verbs × 6 forms</span>
              </div>
            </button>

            {/* Conditional Perfect Mode */}
            <button
              className="mode-button verb-type conditional-perfect"
              onClick={() => onStartVerbTypeSession('conditionalPerfect', selectedVerbTypes)}
              disabled={selectedVerbTypes.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name">💭✨ Konditionaalin Perfekti (Would Have)</span>
                <span className="mode-desc">Write: olisin puhunut, olisit puhunut...</span>
              </div>
              <div className="mode-best">
                <span className="word-count">{verbsByTypeCount} verbs × 6 forms</span>
              </div>
            </button>

            {/* Conditional Perfect Negative Mode */}
            <button
              className="mode-button verb-type negative conditional-perfect"
              onClick={() => onStartVerbTypeSession('conditionalPerfectNegative', selectedVerbTypes)}
              disabled={selectedVerbTypes.length === 0}
            >
              <div className="mode-info">
                <span className="mode-name">🚫💭✨ Kond. Perfektin Kielto</span>
                <span className="mode-desc">Write: en olisi puhunut, et olisi puhunut...</span>
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
              📚 Berlitz Suomi 1
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
