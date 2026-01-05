// CSV Database for Finnish Verb Arena
// Uses localStorage as the primary storage mechanism
// The backend CSV integration has been deprecated

import type { PlayerState, TimeRecord, GameMode, TavoiteProgress } from '../types';

const API_BASE = '/api';

// Convert PlayerState to CSV format (simplified - only tavoite progress and best times)
function playerStateToCSV(state: PlayerState): string {
  const headers = ['Type', 'Mode', 'TimeMs', 'Date', 'Accuracy', 'VerbCount', 'TavoiteId', 'VerbTypes'];
  const rows: string[][] = [];

  // Add best times rows
  state.bestTimes.forEach((bt) => {
    rows.push([
      'best-time',
      bt.mode,
      bt.timeMs.toString(),
      bt.date,
      bt.accuracy.toString(),
      bt.verbCount.toString(),
      '',
      bt.verbTypes?.join('+') || '',
    ]);
  });

  // Add tavoite progress rows
  if (state.tavoiteProgress) {
    state.tavoiteProgress.forEach((tp) => {
      rows.push([
        'tavoite-progress',
        '',
        tp.bestTimeMs?.toString() || '',
        tp.bestDate || '',
        '',
        tp.activeRecallCompleted ? 'true' : 'false',
        tp.tavoiteId.toString(),
        '',
      ]);
    });
  }

  const csv = [headers, ...rows].map((row) => row.map(cell => `"${cell || ''}"`).join(',')).join('\n');
  return csv;
}

// Convert CSV to PlayerState
function csvToPlayerState(csv: string): PlayerState | null {
  try {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return null;

    const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, ''));
    const bestTimes: TimeRecord[] = [];
    const tavoiteProgressMap = new Map<number, TavoiteProgress>();

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

      if (row.Type === 'best-time' && row.Mode) {
        const verbTypes = row.VerbTypes ? row.VerbTypes.split('+').map(Number).filter(n => !isNaN(n)) : undefined;
        bestTimes.push({
          mode: row.Mode as GameMode,
          timeMs: parseInt(row.TimeMs) || 0,
          date: row.Date || '',
          accuracy: parseInt(row.Accuracy) || 0,
          verbCount: parseInt(row.VerbCount) || 0,
          verbTypes: verbTypes && verbTypes.length > 0 ? verbTypes : undefined,
        });
      } else if (row.Type === 'tavoite-progress' && row.TavoiteId) {
        const tavoiteId = parseInt(row.TavoiteId);
        if (!isNaN(tavoiteId)) {
          tavoiteProgressMap.set(tavoiteId, {
            tavoiteId,
            activeRecallCompleted: row.VerbCount === 'true',
            bestTimeMs: row.TimeMs ? parseInt(row.TimeMs) : undefined,
            bestDate: row.Date || undefined,
          });
        }
      }
    }

    const tavoiteProgress: TavoiteProgress[] = Array.from(tavoiteProgressMap.values());

    return { 
      bestTimes, 
      tavoiteProgress: tavoiteProgress.length > 0 ? tavoiteProgress : undefined 
    };
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
      if (Array.isArray(parsed.bestTimes)) {
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
