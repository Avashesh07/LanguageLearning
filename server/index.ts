// Simple backend server for Finnish Verb Arena CSV database
// This allows persistent storage in the project folder

import express, { type Request, type Response } from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// CSV file path - stored in the data folder
const CSV_FILE_PATH = path.join(__dirname, '..', 'data', 'finnish-verb-arena-data.csv');
const DATA_DIR = path.join(__dirname, '..', 'data');

app.use(cors());
app.use(express.json());
app.use(express.text({ type: 'text/csv' }));

// Ensure data directory exists
async function ensureDataDir(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// GET /api/data - Read CSV file
app.get('/api/data', async (_req: Request, res: Response) => {
  try {
    await ensureDataDir();
    
    try {
      const data = await fs.readFile(CSV_FILE_PATH, 'utf-8');
      res.type('text/csv').send(data);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        // File doesn't exist yet - return empty response
        res.status(404).json({ message: 'No data file found' });
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error reading CSV:', error);
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST /api/data - Write CSV file
app.post('/api/data', async (req: Request, res: Response) => {
  try {
    await ensureDataDir();
    
    const csvData = req.body;
    
    if (typeof csvData !== 'string' || !csvData.trim()) {
      res.status(400).json({ error: 'Invalid CSV data' });
      return;
    }
    
    await fs.writeFile(CSV_FILE_PATH, csvData, 'utf-8');
    console.log(`✅ Saved progress to ${CSV_FILE_PATH}`);
    res.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error writing CSV:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', csvPath: CSV_FILE_PATH });
});

app.listen(PORT, () => {
  console.log(`\n🗄️  Finnish Verb Arena Database Server`);
  console.log(`   Running on http://localhost:${PORT}`);
  console.log(`   CSV file: ${CSV_FILE_PATH}\n`);
});

