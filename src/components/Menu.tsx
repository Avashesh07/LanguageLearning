import type { GameMode, PlayerState, VerbLevel } from '../types';
import { verbsByLevel } from '../data/verbs';

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
}: MenuProps) {
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

  return (
    <div className="menu">
      <h1 className="menu-title">Finnish Verb Arena</h1>
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
                  {completedCount > 0 && <span className="check">{'✓'.repeat(completedCount)}</span>}
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
