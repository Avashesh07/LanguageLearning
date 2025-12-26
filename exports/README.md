# CSV Database for Finnish Verb Arena

Your game scores and progress are automatically saved to CSV files that persist even after shutting down your computer.

## How It Works

1. **Automatic Saving**: Every time you complete a session or update your progress, the game automatically saves to:
   - Browser localStorage (for quick access)
   - CSV file: `finnish-verb-arena-data.csv` (persistent database)

2. **CSV File Location**: 
   - The CSV file is saved to your Downloads folder (or wherever your browser saves downloads)
   - You can manually move it to the `exports` folder in this project for organization

## CSV File Format

The CSV file contains:
- **Level Progress**: Completion status for each level (A1, A2, B1) and each game mode
- **Best Times**: Your best completion times for each mode/level combination

## Importing Data

1. Click **"Import from CSV"** button in the menu
2. Select your `finnish-verb-arena-data.csv` file
3. Your progress will be loaded from the CSV file

## Exporting Data

- Click **"Export Times (CSV)"** to download your best times
- The game automatically saves full progress to CSV after each session

## File Structure

```
Finnish_Language/
├── exports/
│   └── README.md (this file)
└── finnish-verb-arena-data.csv (auto-saved here)
```

## Notes

- CSV files persist across browser sessions and computer restarts
- You can backup your CSV file to keep your progress safe
- The CSV file is human-readable and can be opened in Excel or any text editor





