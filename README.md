# Finnish Verb Arena

A minimalist 8-bit verb training game for serious Finnish learners.

## Features

- **Recall Mode** - Raw memory training (Anki replacement)
- **Conjugation Duel** - Verb form automation with positive/negative conjugations
- **Sentence Forge** - Controlled sentence production
- **Reading Sprint** - Recognition under pressure

## Design Principles

- Keyboard-first navigation
- Fast feedback (<500ms)
- No mascots, no streak guilt
- Visual clarity over animation
- Difficulty escalates quietly

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Controls

| Key | Action |
|-----|--------|
| `Enter` | Submit answer |
| `Esc` | Pause game |
| `Arrow keys` | Navigate menus |

## Progression System

- XP-based leveling (100 XP per level)
- Verb mastery tiers: Gray → Yellow → Green → Gold
- Weak verbs appear more frequently
- Modes unlock progressively based on total XP

## Data Persistence

- Progress saved to LocalStorage
- Export/Import JSON save files available in menu

## Tech Stack

- React + TypeScript
- Vite
- No backend required

---

*If the player stops translating mentally, answers under pressure, makes fewer negation errors, and feels verbs "snap" into place — the game has succeeded.*
