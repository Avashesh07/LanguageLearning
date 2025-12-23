// CSV Database for Finnish Verb Arena
// Uses a backend server to persist data to a CSV file in the project folder
// This ensures data persists even when browser data is wiped

import type { PlayerState, TimeRecord, LevelProgress, VerbLevel, GameMode } from '../types';

const API_BASE = '/api';

// Convert PlayerState to CSV format
function playerStateToCSV(state: PlayerState): string {
  const headers = ['Type', 'Level', 'CompletionType', 'Mode', 'Levels', 'TimeMs', 'Date', 'Accuracy', 'VerbCount'];
  const rows: string[][] = [];

  // Add level progress rows - one row per completion type
  state.levelProgress.forEach((lp) => {
    rows.push(['level-progress', lp.level, 'recallCompleted', '', '', '', '', '', lp.recallCompleted ? 'true' : 'false']);
    rows.push(['level-progress', lp.level, 'activeRecallCompleted', '', '', '', '', '', lp.activeRecallCompleted ? 'true' : 'false']);
    rows.push(['level-progress', lp.level, 'conjugationCompleted', '', '', '', '', '', lp.conjugationCompleted ? 'true' : 'false']);
    rows.push(['level-progress', lp.level, 'imperfectCompleted', '', '', '', '', '', lp.imperfectCompleted ? 'true' : 'false']);
  });

  // Add best times rows
  state.bestTimes.forEach((bt) => {
    rows.push([
      'best-time',
      '',
      '',
      bt.mode,
      bt.levels.join('+'),
      bt.timeMs.toString(),
      bt.date,
      bt.accuracy.toString(),
      bt.verbCount.toString(),
    ]);
  });

  const csv = [headers, ...rows].map((row) => row.map(cell => `"${cell || ''}"`).join(',')).join('\n');
  return csv;
}

// Convert CSV to PlayerState
function csvToPlayerState(csv: string): PlayerState | null {
  try {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return null;

    const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, ''));
    const levelProgressMap = new Map<VerbLevel, Partial<LevelProgress>>();
    const bestTimes: TimeRecord[] = [];

    for (let i = 1; i < lines.length; i++) {
      // Handle CSV parsing with quoted values
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim()); // Add last value
      
      const row: Record<string, string> = {};
      headers.forEach((header, idx) => {
        row[header] = (values[idx] || '').replace(/^"|"$/g, '');
      });

      if (row.Type === 'level-progress' && row.Level && row.CompletionType) {
        const level = row.Level as VerbLevel;
        if (!levelProgressMap.has(level)) {
          levelProgressMap.set(level, { level });
        }
        const progress = levelProgressMap.get(level)!;
        const isCompleted = row.VerbCount === 'true';
        
        // Set the specific completion type
        if (row.CompletionType === 'recallCompleted') {
          progress.recallCompleted = isCompleted;
        } else if (row.CompletionType === 'activeRecallCompleted') {
          progress.activeRecallCompleted = isCompleted;
        } else if (row.CompletionType === 'conjugationCompleted') {
          progress.conjugationCompleted = isCompleted;
        } else if (row.CompletionType === 'imperfectCompleted') {
          progress.imperfectCompleted = isCompleted;
        }
      } else if (row.Type === 'best-time' && row.Mode) {
        bestTimes.push({
          mode: row.Mode as GameMode,
          levels: row.Levels ? row.Levels.split('+') as VerbLevel[] : [],
          timeMs: parseInt(row.TimeMs) || 0,
          date: row.Date || '',
          accuracy: parseInt(row.Accuracy) || 0,
          verbCount: parseInt(row.VerbCount) || 0,
        });
      }
    }

    const levelProgress: LevelProgress[] = Array.from(levelProgressMap.values()).map(lp => ({
      level: lp.level!,
      recallCompleted: lp.recallCompleted || false,
      activeRecallCompleted: lp.activeRecallCompleted || false,
      conjugationCompleted: lp.conjugationCompleted || false,
      imperfectCompleted: lp.imperfectCompleted || false,
    }));

    return { levelProgress, bestTimes };
  } catch (error) {
    console.error('Failed to parse CSV:', error);
    return null;
  }
}

// Save state to CSV database via backend server
export async function saveToCSV(state: PlayerState): Promise<void> {
  try {
    // Always save to localStorage as backup
    localStorage.setItem('finnish-verb-arena-v4', JSON.stringify(state));
    
    // Save to CSV file via server
    const csv = playerStateToCSV(state);
    const response = await fetch(`${API_BASE}/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/csv',
      },
      body: csv,
    });
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    
    console.log('✅ Progress saved to CSV file');
  } catch (error) {
    console.warn('Failed to save to CSV server, using localStorage backup:', error);
    // localStorage backup is already saved above
  }
}

// Load state from CSV database
export async function loadFromCSV(): Promise<PlayerState | null> {
  // First try to load from server (CSV file in project folder)
  try {
    const response = await fetch(`${API_BASE}/data`);
    
    if (response.ok) {
      const csv = await response.text();
      const parsed = csvToPlayerState(csv);
      if (parsed) {
        console.log('✅ Loaded progress from CSV file');
        // Also update localStorage backup
        localStorage.setItem('finnish-verb-arena-v4', JSON.stringify(parsed));
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Server not available, falling back to localStorage:', error);
  }
  
  // Fallback to localStorage
  try {
    const saved = localStorage.getItem('finnish-verb-arena-v4');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.levelProgress) && Array.isArray(parsed.bestTimes)) {
        console.log('📦 Loaded progress from localStorage backup');
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
  }
  
  return null;
}

// Check if server is available
export async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
