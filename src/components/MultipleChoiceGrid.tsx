import { useState, useEffect, useCallback } from 'react';
import { useGamepad } from '../hooks/useGamepad';
import { useSteamDeck } from '../contexts/SteamDeckContext';

interface MultipleChoiceOption {
  value: string;
  label: string;
}

interface MultipleChoiceGridProps {
  options: MultipleChoiceOption[];
  onSelect: (value: string) => void;
  disabled?: boolean;
  columns?: 2 | 4; // 2x2 or 4x1 layout
  correctAnswer?: string; // For showing feedback
  showFeedback?: boolean;
  selectedAnswer?: string; // Currently selected (after submission)
}

export function MultipleChoiceGrid({
  options,
  onSelect,
  disabled = false,
  columns = 2,
  correctAnswer,
  showFeedback = false,
  selectedAnswer,
}: MultipleChoiceGridProps) {
  const { isSteamDeckMode } = useSteamDeck();
  const [focusIndex, setFocusIndex] = useState(0);

  // Reset focus when options change
  useEffect(() => {
    setFocusIndex(0);
  }, [options]);

  const handleNavigate = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (disabled) return;
    
    const cols = columns;
    const rows = Math.ceil(options.length / cols);
    const currentRow = Math.floor(focusIndex / cols);
    const currentCol = focusIndex % cols;
    
    let newIndex = focusIndex;
    
    switch (direction) {
      case 'up':
        if (currentRow > 0) {
          newIndex = focusIndex - cols;
        }
        break;
      case 'down':
        if (currentRow < rows - 1) {
          const nextIndex = focusIndex + cols;
          if (nextIndex < options.length) {
            newIndex = nextIndex;
          }
        }
        break;
      case 'left':
        if (currentCol > 0) {
          newIndex = focusIndex - 1;
        }
        break;
      case 'right':
        if (currentCol < cols - 1 && focusIndex + 1 < options.length) {
          newIndex = focusIndex + 1;
        }
        break;
    }
    
    if (newIndex !== focusIndex && newIndex >= 0 && newIndex < options.length) {
      setFocusIndex(newIndex);
    }
  }, [focusIndex, options.length, columns, disabled]);

  const handleConfirm = useCallback(() => {
    if (disabled) return;
    const option = options[focusIndex];
    if (option) {
      onSelect(option.value);
    }
  }, [focusIndex, options, onSelect, disabled]);

  // Use gamepad hook
  useGamepad({
    onNavigate: handleNavigate,
    onConfirm: handleConfirm,
    enabled: isSteamDeckMode && !disabled,
  });

  const getOptionClass = (option: MultipleChoiceOption, index: number) => {
    const classes = ['mc-option'];
    
    if (isSteamDeckMode && index === focusIndex && !disabled) {
      classes.push('focused');
    }
    
    if (showFeedback && selectedAnswer) {
      if (option.value === correctAnswer) {
        classes.push('correct');
      } else if (option.value === selectedAnswer && option.value !== correctAnswer) {
        classes.push('incorrect');
      }
    }
    
    return classes.join(' ');
  };

  return (
    <div className={`mc-grid mc-grid-${columns} ${isSteamDeckMode ? 'steam-deck' : ''}`}>
      {options.map((option, index) => (
        <button
          key={option.value + index}
          className={getOptionClass(option, index)}
          onClick={() => !disabled && onSelect(option.value)}
          disabled={disabled}
          tabIndex={isSteamDeckMode ? -1 : 0}
        >
          <span className="mc-option-label">{option.label}</span>
          {isSteamDeckMode && index === focusIndex && !disabled && (
            <span className="mc-focus-indicator">●</span>
          )}
        </button>
      ))}
      
      {isSteamDeckMode && !disabled && (
        <div className="mc-controls-hint">
          <span>🎮 D-Pad to move</span>
          <span>Ⓐ to select</span>
        </div>
      )}
    </div>
  );
}

// Helper function to generate wrong options for multiple choice
export function generateOptions(
  correctAnswer: string,
  allPossibleAnswers: string[],
  count: number = 4
): MultipleChoiceOption[] {
  // Filter out the correct answer and get unique wrong answers
  const wrongAnswers = allPossibleAnswers
    .filter(a => a.toLowerCase() !== correctAnswer.toLowerCase())
    .filter((a, i, arr) => arr.findIndex(x => x.toLowerCase() === a.toLowerCase()) === i);
  
  // Shuffle and take (count - 1) wrong answers
  const shuffledWrong = [...wrongAnswers].sort(() => Math.random() - 0.5);
  const selectedWrong = shuffledWrong.slice(0, count - 1);
  
  // Combine with correct answer
  const allOptions = [
    { value: correctAnswer, label: correctAnswer },
    ...selectedWrong.map(a => ({ value: a, label: a })),
  ];
  
  // Shuffle final options
  return allOptions.sort(() => Math.random() - 0.5);
}

// Helper to generate options from a word list with translations
export function generateTranslationOptions(
  correctFinnish: string,
  correctEnglish: string,
  allWords: Array<{ finnish: string; english: string }>,
  direction: 'finnish-to-english' | 'english-to-finnish',
  count: number = 4
): MultipleChoiceOption[] {
  const isF2E = direction === 'finnish-to-english';
  const correctAnswer = isF2E ? correctEnglish : correctFinnish;
  
  // Get wrong options
  const wrongAnswers = allWords
    .filter(w => (isF2E ? w.english : w.finnish).toLowerCase() !== correctAnswer.toLowerCase())
    .map(w => isF2E ? w.english : w.finnish)
    .filter((a, i, arr) => arr.findIndex(x => x.toLowerCase() === a.toLowerCase()) === i);
  
  const shuffledWrong = [...wrongAnswers].sort(() => Math.random() - 0.5);
  const selectedWrong = shuffledWrong.slice(0, count - 1);
  
  const allOptions = [
    { value: correctAnswer, label: correctAnswer },
    ...selectedWrong.map(a => ({ value: a, label: a })),
  ];
  
  return allOptions.sort(() => Math.random() - 0.5);
}





