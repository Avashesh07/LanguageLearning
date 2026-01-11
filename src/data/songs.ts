// Finnish Song Lyrics Learning Data

export interface SongWord {
  finnish: string;
  english: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'numeral' | 'particle';
  grammarNote?: string; // e.g., "partitive form", "imperfect tense"
  baseForm?: string; // infinitive for verbs, nominative for nouns
}

export interface SongLine {
  finnish: string;
  english: string;
  words: SongWord[];
}

export interface SongVerse {
  type: 'verse' | 'chorus' | 'bridge' | 'outro';
  lines: SongLine[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  verses: SongVerse[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Helper function to get all unique words from a song
export function getSongWords(song: Song): SongWord[] {
  const wordMap = new Map<string, SongWord>();
  song.verses.forEach(verse => {
    verse.lines.forEach(line => {
      line.words.forEach(word => {
        if (!wordMap.has(word.finnish.toLowerCase())) {
          wordMap.set(word.finnish.toLowerCase(), word);
        }
      });
    });
  });
  return Array.from(wordMap.values());
}

// Helper function to get all lines from a song
export function getSongLines(song: Song): SongLine[] {
  return song.verses.flatMap(verse => verse.lines);
}

// Helper to get unique lines (for songs with repeated chorus)
export function getUniqueSongLines(song: Song): SongLine[] {
  const seen = new Set<string>();
  const uniqueLines: SongLine[] = [];
  song.verses.forEach(verse => {
    verse.lines.forEach(line => {
      if (!seen.has(line.finnish)) {
        seen.add(line.finnish);
        uniqueLines.push(line);
      }
    });
  });
  return uniqueLines;
}

export const SONGS: Song[] = [
  {
    id: 'sisko-tahtoo-humalaan',
    title: 'Sisko tahtoo humalaan',
    artist: 'Happoradio',
    difficulty: 'intermediate',
    verses: [
      // Verse 1
      {
        type: 'verse',
        lines: [
          {
            finnish: 'Tässä talossa seinät ovat paperia',
            english: 'In this house the walls are (made of) paper',
            words: [
              { finnish: 'tässä', english: 'in this', partOfSpeech: 'pronoun', grammarNote: 'inessive of tämä' },
              { finnish: 'talossa', english: 'in the house', partOfSpeech: 'noun', grammarNote: 'inessive case', baseForm: 'talo' },
              { finnish: 'seinät', english: 'walls', partOfSpeech: 'noun', grammarNote: 'plural nominative', baseForm: 'seinä' },
              { finnish: 'ovat', english: 'are', partOfSpeech: 'verb', grammarNote: 'he form of olla', baseForm: 'olla' },
              { finnish: 'paperia', english: 'paper', partOfSpeech: 'noun', grammarNote: 'partitive singular', baseForm: 'paperi' },
            ]
          },
          {
            finnish: 'Mä katson seitsemättä kertaa kelloa',
            english: 'I look at the clock for the seventh time',
            words: [
              { finnish: 'mä', english: 'I', partOfSpeech: 'pronoun', grammarNote: 'colloquial minä' },
              { finnish: 'katson', english: 'I look at', partOfSpeech: 'verb', grammarNote: 'present tense', baseForm: 'katsoa' },
              { finnish: 'seitsemättä', english: 'seventh', partOfSpeech: 'numeral', grammarNote: 'partitive ordinal', baseForm: 'seitsemäs' },
              { finnish: 'kertaa', english: 'time', partOfSpeech: 'noun', grammarNote: 'partitive singular', baseForm: 'kerta' },
              { finnish: 'kelloa', english: 'clock', partOfSpeech: 'noun', grammarNote: 'partitive singular', baseForm: 'kello' },
            ]
          },
          {
            finnish: 'Ja yritän silmäni ummistaa',
            english: 'And I try to close my eyes',
            words: [
              { finnish: 'ja', english: 'and', partOfSpeech: 'conjunction' },
              { finnish: 'yritän', english: 'I try', partOfSpeech: 'verb', grammarNote: 'present tense', baseForm: 'yrittää' },
              { finnish: 'silmäni', english: 'my eyes', partOfSpeech: 'noun', grammarNote: 'possessive suffix', baseForm: 'silmä' },
              { finnish: 'ummistaa', english: 'to close', partOfSpeech: 'verb', grammarNote: 'infinitive' },
            ]
          },
          {
            finnish: 'Mutten mielestä saa sitä elokuvaa',
            english: 'But I can\'t get that movie out of my mind',
            words: [
              { finnish: 'mutten', english: 'but I don\'t', partOfSpeech: 'conjunction', grammarNote: 'mutta + en' },
              { finnish: 'mielestä', english: 'from (my) mind', partOfSpeech: 'noun', grammarNote: 'elative case', baseForm: 'mieli' },
              { finnish: 'saa', english: 'get/can', partOfSpeech: 'verb', grammarNote: 'present tense', baseForm: 'saada' },
              { finnish: 'sitä', english: 'that', partOfSpeech: 'pronoun', grammarNote: 'partitive of se' },
              { finnish: 'elokuvaa', english: 'movie', partOfSpeech: 'noun', grammarNote: 'partitive singular', baseForm: 'elokuva' },
            ]
          },
          {
            finnish: 'Joka lopulta päättyikin sitten niin',
            english: 'Which in the end did end up like',
            words: [
              { finnish: 'joka', english: 'which', partOfSpeech: 'pronoun' },
              { finnish: 'lopulta', english: 'in the end', partOfSpeech: 'adverb', grammarNote: 'ablative of loppu' },
              { finnish: 'päättyikin', english: 'did end', partOfSpeech: 'verb', grammarNote: 'imperfect + -kin', baseForm: 'päättyä' },
              { finnish: 'sitten', english: 'then', partOfSpeech: 'adverb' },
              { finnish: 'niin', english: 'so/like', partOfSpeech: 'adverb' },
            ]
          },
          {
            finnish: 'Traagisiin marttyyrikuolemiin',
            english: 'In tragic martyr deaths',
            words: [
              { finnish: 'traagisiin', english: 'tragic', partOfSpeech: 'adjective', grammarNote: 'illative plural', baseForm: 'traaginen' },
              { finnish: 'marttyyrikuolemiin', english: 'martyr deaths', partOfSpeech: 'noun', grammarNote: 'illative plural', baseForm: 'marttyyrikuolema' },
            ]
          },
        ]
      },
      // Chorus
      {
        type: 'chorus',
        lines: [
          {
            finnish: 'Kuinka siinä kävikin niin',
            english: 'How did it turn out like that',
            words: [
              { finnish: 'kuinka', english: 'how', partOfSpeech: 'adverb' },
              { finnish: 'siinä', english: 'in that', partOfSpeech: 'pronoun', grammarNote: 'inessive of se' },
              { finnish: 'kävikin', english: 'did turn out', partOfSpeech: 'verb', grammarNote: 'imperfect + -kin', baseForm: 'käydä' },
              { finnish: 'niin', english: 'so/like that', partOfSpeech: 'adverb' },
            ]
          },
          {
            finnish: 'Mustaa ja valkoista laitetaan',
            english: 'Black and white are being put',
            words: [
              { finnish: 'mustaa', english: 'black', partOfSpeech: 'adjective', grammarNote: 'partitive singular', baseForm: 'musta' },
              { finnish: 'ja', english: 'and', partOfSpeech: 'conjunction' },
              { finnish: 'valkoista', english: 'white', partOfSpeech: 'adjective', grammarNote: 'partitive singular', baseForm: 'valkoinen' },
              { finnish: 'laitetaan', english: 'is put/are put', partOfSpeech: 'verb', grammarNote: 'passive present', baseForm: 'laittaa' },
            ]
          },
          {
            finnish: 'Minun käteni maalaa maisemaa',
            english: 'My hand paints a landscape',
            words: [
              { finnish: 'minun', english: 'my', partOfSpeech: 'pronoun', grammarNote: 'genitive of minä' },
              { finnish: 'käteni', english: 'my hand', partOfSpeech: 'noun', grammarNote: 'possessive suffix', baseForm: 'käsi' },
              { finnish: 'maalaa', english: 'paints', partOfSpeech: 'verb', grammarNote: 'present tense', baseForm: 'maalata' },
              { finnish: 'maisemaa', english: 'landscape', partOfSpeech: 'noun', grammarNote: 'partitive singular', baseForm: 'maisema' },
            ]
          },
          {
            finnish: 'Meidät elävältä haudataan',
            english: 'We are buried alive',
            words: [
              { finnish: 'meidät', english: 'us', partOfSpeech: 'pronoun', grammarNote: 'accusative of me' },
              { finnish: 'elävältä', english: 'alive', partOfSpeech: 'adjective', grammarNote: 'ablative singular', baseForm: 'elävä' },
              { finnish: 'haudataan', english: 'are buried', partOfSpeech: 'verb', grammarNote: 'passive present', baseForm: 'haudata' },
            ]
          },
          {
            finnish: 'Kuinka siinä kävikin niin',
            english: 'How did it turn out like that',
            words: [
              { finnish: 'kuinka', english: 'how', partOfSpeech: 'adverb' },
              { finnish: 'siinä', english: 'in that', partOfSpeech: 'pronoun', grammarNote: 'inessive of se' },
              { finnish: 'kävikin', english: 'did turn out', partOfSpeech: 'verb', grammarNote: 'imperfect + -kin', baseForm: 'käydä' },
              { finnish: 'niin', english: 'so/like that', partOfSpeech: 'adverb' },
            ]
          },
          {
            finnish: 'Siskon päätä huimaa taas',
            english: 'Sister\'s head is spinning again',
            words: [
              { finnish: 'siskon', english: 'sister\'s', partOfSpeech: 'noun', grammarNote: 'genitive singular', baseForm: 'sisko' },
              { finnish: 'päätä', english: 'head', partOfSpeech: 'noun', grammarNote: 'partitive singular', baseForm: 'pää' },
              { finnish: 'huimaa', english: 'makes dizzy', partOfSpeech: 'verb', grammarNote: 'present tense', baseForm: 'huimata' },
              { finnish: 'taas', english: 'again', partOfSpeech: 'adverb' },
            ]
          },
          {
            finnish: 'Sisko tahtoo humalaan',
            english: 'Sister wants to get drunk',
            words: [
              { finnish: 'sisko', english: 'sister', partOfSpeech: 'noun' },
              { finnish: 'tahtoo', english: 'wants', partOfSpeech: 'verb', grammarNote: 'present tense', baseForm: 'tahtoa' },
              { finnish: 'humalaan', english: 'to (get) drunk', partOfSpeech: 'noun', grammarNote: 'illative singular', baseForm: 'humala' },
            ]
          },
          {
            finnish: 'Sä lupasit, että me ei kuolla koskaan',
            english: 'You promised that we would never die',
            words: [
              { finnish: 'sä', english: 'you', partOfSpeech: 'pronoun', grammarNote: 'colloquial sinä' },
              { finnish: 'lupasit', english: 'you promised', partOfSpeech: 'verb', grammarNote: 'imperfect tense', baseForm: 'luvata' },
              { finnish: 'että', english: 'that', partOfSpeech: 'conjunction' },
              { finnish: 'me', english: 'we', partOfSpeech: 'pronoun' },
              { finnish: 'ei', english: 'not', partOfSpeech: 'particle', grammarNote: 'negative verb' },
              { finnish: 'kuolla', english: 'die', partOfSpeech: 'verb', grammarNote: 'infinitive' },
              { finnish: 'koskaan', english: 'ever/never', partOfSpeech: 'adverb' },
            ]
          },
        ]
      },
      // Verse 2
      {
        type: 'verse',
        lines: [
          {
            finnish: 'Mä heräsin taas siihen kohtaan',
            english: 'I woke up again at that part',
            words: [
              { finnish: 'mä', english: 'I', partOfSpeech: 'pronoun', grammarNote: 'colloquial minä' },
              { finnish: 'heräsin', english: 'I woke up', partOfSpeech: 'verb', grammarNote: 'imperfect tense', baseForm: 'herätä' },
              { finnish: 'taas', english: 'again', partOfSpeech: 'adverb' },
              { finnish: 'siihen', english: 'to that', partOfSpeech: 'pronoun', grammarNote: 'illative of se' },
              { finnish: 'kohtaan', english: 'part/point', partOfSpeech: 'noun', grammarNote: 'illative singular', baseForm: 'kohta' },
            ]
          },
          {
            finnish: 'Jossa minua ammutaan otsaan',
            english: 'Where I am shot in the forehead',
            words: [
              { finnish: 'jossa', english: 'where/in which', partOfSpeech: 'pronoun', grammarNote: 'inessive of joka' },
              { finnish: 'minua', english: 'me', partOfSpeech: 'pronoun', grammarNote: 'partitive of minä' },
              { finnish: 'ammutaan', english: 'is shot', partOfSpeech: 'verb', grammarNote: 'passive present', baseForm: 'ampua' },
              { finnish: 'otsaan', english: 'in the forehead', partOfSpeech: 'noun', grammarNote: 'illative singular', baseForm: 'otsa' },
            ]
          },
          {
            finnish: 'Mä olen se narri, joka naurattaa',
            english: 'I am that jester who makes (people) laugh',
            words: [
              { finnish: 'mä', english: 'I', partOfSpeech: 'pronoun', grammarNote: 'colloquial minä' },
              { finnish: 'olen', english: 'am', partOfSpeech: 'verb', grammarNote: 'present tense', baseForm: 'olla' },
              { finnish: 'se', english: 'that', partOfSpeech: 'pronoun' },
              { finnish: 'narri', english: 'jester/fool', partOfSpeech: 'noun' },
              { finnish: 'joka', english: 'who/which', partOfSpeech: 'pronoun' },
              { finnish: 'naurattaa', english: 'makes laugh', partOfSpeech: 'verb', grammarNote: 'causative', baseForm: 'naurattaa' },
            ]
          },
          {
            finnish: 'Aina kun se sattuu sopimaan',
            english: 'Whenever it happens to fit',
            words: [
              { finnish: 'aina', english: 'always', partOfSpeech: 'adverb' },
              { finnish: 'kun', english: 'when', partOfSpeech: 'conjunction' },
              { finnish: 'se', english: 'it', partOfSpeech: 'pronoun' },
              { finnish: 'sattuu', english: 'happens to', partOfSpeech: 'verb', grammarNote: 'present tense', baseForm: 'sattua' },
              { finnish: 'sopimaan', english: 'to fit', partOfSpeech: 'verb', grammarNote: 'illative infinitive', baseForm: 'sopia' },
            ]
          },
          {
            finnish: 'Ja sehän on luonnollista niin',
            english: 'And that is only natural',
            words: [
              { finnish: 'ja', english: 'and', partOfSpeech: 'conjunction' },
              { finnish: 'sehän', english: 'that (emphatic)', partOfSpeech: 'pronoun', grammarNote: 'se + -hän particle' },
              { finnish: 'on', english: 'is', partOfSpeech: 'verb', grammarNote: 'present tense', baseForm: 'olla' },
              { finnish: 'luonnollista', english: 'natural', partOfSpeech: 'adjective', grammarNote: 'partitive singular', baseForm: 'luonnollinen' },
              { finnish: 'niin', english: 'so', partOfSpeech: 'adverb' },
            ]
          },
          {
            finnish: 'Huulet kun vaihtuu hampaisiin',
            english: 'When lips change into teeth',
            words: [
              { finnish: 'huulet', english: 'lips', partOfSpeech: 'noun', grammarNote: 'nominative plural', baseForm: 'huuli' },
              { finnish: 'kun', english: 'when', partOfSpeech: 'conjunction' },
              { finnish: 'vaihtuu', english: 'change', partOfSpeech: 'verb', grammarNote: 'colloquial passive', baseForm: 'vaihtua' },
              { finnish: 'hampaisiin', english: 'into teeth', partOfSpeech: 'noun', grammarNote: 'illative plural', baseForm: 'hammas' },
            ]
          },
        ]
      },
      // Outro
      {
        type: 'outro',
        lines: [
          {
            finnish: 'Me ei kuolla koskaan',
            english: 'We will never die',
            words: [
              { finnish: 'me', english: 'we', partOfSpeech: 'pronoun' },
              { finnish: 'ei', english: 'not', partOfSpeech: 'particle', grammarNote: 'negative verb' },
              { finnish: 'kuolla', english: 'die', partOfSpeech: 'verb', grammarNote: 'infinitive' },
              { finnish: 'koskaan', english: 'ever/never', partOfSpeech: 'adverb' },
            ]
          },
        ]
      },
    ]
  }
];

// Game mode types for lyrics learning
export type LyricsGameMode = 
  | 'word-match'        // Match Finnish word to English meaning
  | 'word-recall'       // Type the Finnish word from English
  | 'line-translate'    // Match Finnish line to English translation
  | 'fill-blank'        // Fill in missing word in a line
  | 'word-order';       // Arrange words in correct order

export interface LyricsWordProgress {
  finnish: string;
  correctCount: number;
  wrongCount: number;
  mastered: boolean; // 3 correct in a row = mastered
}

export interface LyricsLineProgress {
  lineId: number;
  correctCount: number;
  wrongCount: number;
  mastered: boolean;
}

export interface SongProgress {
  songId: string;
  wordProgress: LyricsWordProgress[];
  lineProgress: LyricsLineProgress[];
  lastPlayedMode: LyricsGameMode;
  lastPlayed: string; // ISO date
}

// Helper to get word count for a song
export function getSongWordCount(song: Song): number {
  return getSongWords(song).length;
}

// Helper to get line count for a song (unique lines)
export function getSongLineCount(song: Song): number {
  return getUniqueSongLines(song).length;
}

// Get song by ID
export function getSongById(id: string): Song | undefined {
  return SONGS.find(song => song.id === id);
}




