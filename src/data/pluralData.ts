// Nominative Plural Data - Formation Rules for Finnish Plurals
// The plural marker in Finnish is -t (nominative) or -i- (in other cases)

export type PluralRule = 
  | 'single-vowel'      // Words ending in single vowel: add -t
  | 'two-vowels'        // Words ending in two vowels: add -t
  | 'new-i'             // New words ending in -i: add -t
  | 'old-i'             // Old words ending in -i: -i becomes -e + t
  | 'e-ending'          // Words ending in -e: -e + t (consonant gradation may apply)
  | 'consonant'         // Words ending in consonant: add stem vowel + t
  | 'nen-ending';       // Words ending in -nen: -nen becomes -set

export interface PluralWord {
  nominative: string;      // Singular nominative
  nominativePlural: string; // Plural nominative
  translation: string;
  rule: PluralRule;
  hint?: string;
}

export interface PluralRuleInfo {
  id: PluralRule;
  name: string;
  finnishName: string;
  description: string;
  formation: string;
  examples: string[];
  color: string;
}

export const PLURAL_RULES: PluralRuleInfo[] = [
  {
    id: 'single-vowel',
    name: 'Single Vowel Ending',
    finnishName: 'Yksittäinen vokaali',
    description: 'Words ending in -a, -ä, -o, -ö, -u, -y (single vowel)',
    formation: 'Add -t (watch for consonant gradation!)',
    examples: ['talo → talot', 'koira → koirat', 'pöytä → pöydät'],
    color: '#4a9eff',
  },
  {
    id: 'two-vowels',
    name: 'Two Vowel Ending',
    finnishName: 'Kaksi vokaalia',
    description: 'Words ending in long vowel or diphthong',
    formation: 'Add -t',
    examples: ['maa → maat', 'työ → työt', 'vapaa → vapaat'],
    color: '#ff7b4a',
  },
  {
    id: 'new-i',
    name: 'New -i Words',
    finnishName: 'Uudet i-sanat',
    description: 'Modern/borrowed words ending in -i',
    formation: 'Add -t (the i stays)',
    examples: ['bussi → bussit', 'taksi → taksit', 'kahvi → kahvit'],
    color: '#27ae60',
  },
  {
    id: 'old-i',
    name: 'Old -i Words',
    finnishName: 'Vanhat i-sanat',
    description: 'Traditional Finnish words ending in -i',
    formation: 'Change -i to -e, then add -t',
    examples: ['ovi → ovet', 'järvi → järvet', 'kivi → kivet'],
    color: '#9b59b6',
  },
  {
    id: 'e-ending',
    name: '-e Ending Words',
    finnishName: 'E-loppuiset',
    description: 'Words ending in -e',
    formation: 'Add -t (or -et after consonant gradation)',
    examples: ['huone → huoneet', 'perhe → perheet', 'kone → koneet'],
    color: '#e74c3c',
  },
  {
    id: 'consonant',
    name: 'Consonant Ending',
    finnishName: 'Konsonanttiloppuiset',
    description: 'Words ending in consonants',
    formation: 'Add stem vowel + -t',
    examples: ['vastaus → vastaukset', 'puhelin → puhelimet', 'avain → avaimet'],
    color: '#f39c12',
  },
  {
    id: 'nen-ending',
    name: '-nen Ending Words',
    finnishName: 'Nen-loppuiset',
    description: 'Words ending in -nen',
    formation: 'Change -nen to -set',
    examples: ['nainen → naiset', 'punainen → punaiset', 'ihminen → ihmiset'],
    color: '#1abc9c',
  },
];

// Words organized by plural formation rule
export const PLURAL_WORDS: PluralWord[] = [
  // === SINGLE VOWEL ENDING → add -t (consonant gradation!) ===
  { nominative: 'talo', nominativePlural: 'talot', translation: 'house', rule: 'single-vowel', hint: 'talo → talo + t' },
  { nominative: 'koira', nominativePlural: 'koirat', translation: 'dog', rule: 'single-vowel', hint: 'koira → koira + t' },
  { nominative: 'kissa', nominativePlural: 'kissat', translation: 'cat', rule: 'single-vowel', hint: 'kissa → kissa + t' },
  { nominative: 'auto', nominativePlural: 'autot', translation: 'car', rule: 'single-vowel', hint: 'auto → auto + t' },
  { nominative: 'kirja', nominativePlural: 'kirjat', translation: 'book', rule: 'single-vowel', hint: 'kirja → kirja + t' },
  { nominative: 'pöytä', nominativePlural: 'pöydät', translation: 'table', rule: 'single-vowel', hint: 'pöytä → pöydä + t (t→d)' },
  { nominative: 'leipä', nominativePlural: 'leivät', translation: 'bread', rule: 'single-vowel', hint: 'leipä → leivä + t (p→v)' },
  { nominative: 'sana', nominativePlural: 'sanat', translation: 'word', rule: 'single-vowel', hint: 'sana → sana + t' },
  { nominative: 'ruoka', nominativePlural: 'ruoat', translation: 'food', rule: 'single-vowel', hint: 'ruoka → ruoa + t (k→∅)' },
  { nominative: 'maito', nominativePlural: 'maidot', translation: 'milk', rule: 'single-vowel', hint: 'maito → maido + t (t→d)' },
  { nominative: 'hedelmä', nominativePlural: 'hedelmät', translation: 'fruit', rule: 'single-vowel', hint: 'hedelmä → hedelmä + t' },
  { nominative: 'opettaja', nominativePlural: 'opettajat', translation: 'teacher', rule: 'single-vowel', hint: 'opettaja → opettaja + t' },
  { nominative: 'kahvila', nominativePlural: 'kahvilat', translation: 'café', rule: 'single-vowel', hint: 'kahvila → kahvila + t' },
  { nominative: 'ikkuna', nominativePlural: 'ikkunat', translation: 'window', rule: 'single-vowel', hint: 'ikkuna → ikkuna + t' },
  { nominative: 'kauppa', nominativePlural: 'kaupat', translation: 'shop', rule: 'single-vowel', hint: 'kauppa → kaupa + t (pp→p)' },
  { nominative: 'kukka', nominativePlural: 'kukat', translation: 'flower', rule: 'single-vowel', hint: 'kukka → kuka + t (kk→k)' },
  { nominative: 'silmä', nominativePlural: 'silmät', translation: 'eye', rule: 'single-vowel', hint: 'silmä → silmä + t' },
  { nominative: 'poika', nominativePlural: 'pojat', translation: 'boy', rule: 'single-vowel', hint: 'poika → poja + t (k→∅)' },
  { nominative: 'aika', nominativePlural: 'ajat', translation: 'time', rule: 'single-vowel', hint: 'aika → aja + t (k→∅)' },
  { nominative: 'paikka', nominativePlural: 'paikat', translation: 'place', rule: 'single-vowel', hint: 'paikka → paika + t (kk→k)' },

  // === TWO VOWEL ENDING → add -t ===
  { nominative: 'maa', nominativePlural: 'maat', translation: 'country/ground', rule: 'two-vowels', hint: 'maa → maa + t' },
  { nominative: 'puu', nominativePlural: 'puut', translation: 'tree/wood', rule: 'two-vowels', hint: 'puu → puu + t' },
  { nominative: 'suu', nominativePlural: 'suut', translation: 'mouth', rule: 'two-vowels', hint: 'suu → suu + t' },
  { nominative: 'työ', nominativePlural: 'työt', translation: 'work', rule: 'two-vowels', hint: 'työ → työ + t' },
  { nominative: 'yö', nominativePlural: 'yöt', translation: 'night', rule: 'two-vowels', hint: 'yö → yö + t' },
  { nominative: 'vapaa', nominativePlural: 'vapaat', translation: 'free', rule: 'two-vowels', hint: 'vapaa → vapaa + t' },
  { nominative: 'tie', nominativePlural: 'tiet', translation: 'road', rule: 'two-vowels', hint: 'tie → tie + t' },
  { nominative: 'suo', nominativePlural: 'suot', translation: 'swamp', rule: 'two-vowels', hint: 'suo → suo + t' },
  { nominative: 'korkea', nominativePlural: 'korkeat', translation: 'high/tall', rule: 'two-vowels', hint: 'korkea → korkea + t' },
  { nominative: 'vaikea', nominativePlural: 'vaikeat', translation: 'difficult', rule: 'two-vowels', hint: 'vaikea → vaikea + t' },
  { nominative: 'tärkeä', nominativePlural: 'tärkeät', translation: 'important', rule: 'two-vowels', hint: 'tärkeä → tärkeä + t' },
  { nominative: 'idea', nominativePlural: 'ideat', translation: 'idea', rule: 'two-vowels', hint: 'idea → idea + t' },

  // === NEW -i WORDS → add -t ===
  { nominative: 'bussi', nominativePlural: 'bussit', translation: 'bus', rule: 'new-i', hint: 'bussi → bussi + t' },
  { nominative: 'taksi', nominativePlural: 'taksit', translation: 'taxi', rule: 'new-i', hint: 'taksi → taksi + t' },
  { nominative: 'pankki', nominativePlural: 'pankit', translation: 'bank', rule: 'new-i', hint: 'pankki → panki + t (kk→k)' },
  { nominative: 'hotelli', nominativePlural: 'hotellit', translation: 'hotel', rule: 'new-i', hint: 'hotelli → hotelli + t' },
  { nominative: 'posti', nominativePlural: 'postit', translation: 'post/mail', rule: 'new-i', hint: 'posti → posti + t' },
  { nominative: 'paperi', nominativePlural: 'paperit', translation: 'paper', rule: 'new-i', hint: 'paperi → paperi + t' },
  { nominative: 'musiikki', nominativePlural: 'musiikit', translation: 'music', rule: 'new-i', hint: 'musiikki → musiiki + t (kk→k)' },
  { nominative: 'kahvi', nominativePlural: 'kahvit', translation: 'coffee', rule: 'new-i', hint: 'kahvi → kahvi + t' },
  { nominative: 'banaani', nominativePlural: 'banaanit', translation: 'banana', rule: 'new-i', hint: 'banaani → banaani + t' },
  { nominative: 'tomaatti', nominativePlural: 'tomaatit', translation: 'tomato', rule: 'new-i', hint: 'tomaatti → tomaati + t (tt→t)' },
  { nominative: 'appelsiini', nominativePlural: 'appelsiinit', translation: 'orange (fruit)', rule: 'new-i', hint: 'appelsiini → appelsiini + t' },

  // === OLD -i WORDS → -i becomes -e + t ===
  { nominative: 'ovi', nominativePlural: 'ovet', translation: 'door', rule: 'old-i', hint: 'ovi → ove + t (i→e)' },
  { nominative: 'järvi', nominativePlural: 'järvet', translation: 'lake', rule: 'old-i', hint: 'järvi → järve + t (i→e)' },
  { nominative: 'joki', nominativePlural: 'joet', translation: 'river', rule: 'old-i', hint: 'joki → joe + t (ki→e)' },
  { nominative: 'kivi', nominativePlural: 'kivet', translation: 'stone', rule: 'old-i', hint: 'kivi → kive + t (i→e)' },
  { nominative: 'lehti', nominativePlural: 'lehdet', translation: 'leaf/newspaper', rule: 'old-i', hint: 'lehti → lehde + t (t→d, i→e)' },
  { nominative: 'pilvi', nominativePlural: 'pilvet', translation: 'cloud', rule: 'old-i', hint: 'pilvi → pilve + t (i→e)' },
  { nominative: 'talvi', nominativePlural: 'talvet', translation: 'winter', rule: 'old-i', hint: 'talvi → talve + t (i→e)' },
  { nominative: 'vesi', nominativePlural: 'vedet', translation: 'water', rule: 'old-i', hint: 'vesi → vede + t (s→d, i→e)' },
  { nominative: 'meri', nominativePlural: 'meret', translation: 'sea', rule: 'old-i', hint: 'meri → mere + t (i→e)' },
  { nominative: 'vuosi', nominativePlural: 'vuodet', translation: 'year', rule: 'old-i', hint: 'vuosi → vuode + t (s→d, i→e)' },
  { nominative: 'käsi', nominativePlural: 'kädet', translation: 'hand', rule: 'old-i', hint: 'käsi → käde + t (s→d, i→e)' },
  { nominative: 'niemi', nominativePlural: 'niemet', translation: 'cape/peninsula', rule: 'old-i', hint: 'niemi → nieme + t (i→e)' },
  { nominative: 'nimi', nominativePlural: 'nimet', translation: 'name', rule: 'old-i', hint: 'nimi → nime + t (i→e)' },

  // === -e ENDING WORDS → add -t (stem doubles e) ===
  { nominative: 'huone', nominativePlural: 'huoneet', translation: 'room', rule: 'e-ending', hint: 'huone → huonee + t' },
  { nominative: 'perhe', nominativePlural: 'perheet', translation: 'family', rule: 'e-ending', hint: 'perhe → perhee + t' },
  { nominative: 'osoite', nominativePlural: 'osoitteet', translation: 'address', rule: 'e-ending', hint: 'osoite → osoittee + t (t→tt)' },
  { nominative: 'kone', nominativePlural: 'koneet', translation: 'machine', rule: 'e-ending', hint: 'kone → konee + t' },
  { nominative: 'vuode', nominativePlural: 'vuoteet', translation: 'bed', rule: 'e-ending', hint: 'vuode → vuotee + t (d→t)' },
  { nominative: 'lause', nominativePlural: 'lauseet', translation: 'sentence', rule: 'e-ending', hint: 'lause → lausee + t' },
  { nominative: 'vaate', nominativePlural: 'vaatteet', translation: 'clothing', rule: 'e-ending', hint: 'vaate → vaattee + t (t→tt)' },
  { nominative: 'tuote', nominativePlural: 'tuotteet', translation: 'product', rule: 'e-ending', hint: 'tuote → tuottee + t (t→tt)' },
  { nominative: 'kirje', nominativePlural: 'kirjeet', translation: 'letter', rule: 'e-ending', hint: 'kirje → kirjee + t' },

  // === CONSONANT ENDING → add stem vowel + -t ===
  { nominative: 'kysymys', nominativePlural: 'kysymykset', translation: 'question', rule: 'consonant', hint: 'kysymys → kysymykse + t' },
  { nominative: 'vastaus', nominativePlural: 'vastaukset', translation: 'answer', rule: 'consonant', hint: 'vastaus → vastaukse + t' },
  { nominative: 'ajatus', nominativePlural: 'ajatukset', translation: 'thought', rule: 'consonant', hint: 'ajatus → ajatukse + t' },
  { nominative: 'rakkaus', nominativePlural: 'rakkaudet', translation: 'love', rule: 'consonant', hint: 'rakkaus → rakkaude + t' },
  { nominative: 'puhelin', nominativePlural: 'puhelimet', translation: 'phone', rule: 'consonant', hint: 'puhelin → puhelime + t' },
  { nominative: 'sydän', nominativePlural: 'sydämet', translation: 'heart', rule: 'consonant', hint: 'sydän → sydäme + t' },
  { nominative: 'avain', nominativePlural: 'avaimet', translation: 'key', rule: 'consonant', hint: 'avain → avaime + t' },
  { nominative: 'askel', nominativePlural: 'askeleet', translation: 'step', rule: 'consonant', hint: 'askel → askelee + t' },
  { nominative: 'kaunis', nominativePlural: 'kauniit', translation: 'beautiful', rule: 'consonant', hint: 'kaunis → kaunii + t' },
  { nominative: 'rikas', nominativePlural: 'rikkaat', translation: 'rich', rule: 'consonant', hint: 'rikas → rikkaa + t' },
  { nominative: 'opas', nominativePlural: 'oppaat', translation: 'guide', rule: 'consonant', hint: 'opas → oppaa + t' },

  // === -nen ENDING WORDS → -nen becomes -set ===
  { nominative: 'nainen', nominativePlural: 'naiset', translation: 'woman', rule: 'nen-ending', hint: 'nainen → nais + et' },
  { nominative: 'ihminen', nominativePlural: 'ihmiset', translation: 'human/person', rule: 'nen-ending', hint: 'ihminen → ihmis + et' },
  { nominative: 'suomalainen', nominativePlural: 'suomalaiset', translation: 'Finnish (person)', rule: 'nen-ending', hint: 'suomalainen → suomalais + et' },
  { nominative: 'punainen', nominativePlural: 'punaiset', translation: 'red', rule: 'nen-ending', hint: 'punainen → punais + et' },
  { nominative: 'sininen', nominativePlural: 'siniset', translation: 'blue', rule: 'nen-ending', hint: 'sininen → sinis + et' },
  { nominative: 'valkoinen', nominativePlural: 'valkoiset', translation: 'white', rule: 'nen-ending', hint: 'valkoinen → valkois + et' },
  { nominative: 'keltainen', nominativePlural: 'keltaiset', translation: 'yellow', rule: 'nen-ending', hint: 'keltainen → keltais + et' },
  { nominative: 'ensimmäinen', nominativePlural: 'ensimmäiset', translation: 'first', rule: 'nen-ending', hint: 'ensimmäinen → ensimmäis + et' },
  { nominative: 'viimeinen', nominativePlural: 'viimeiset', translation: 'last', rule: 'nen-ending', hint: 'viimeinen → viimeis + et' },
  { nominative: 'tavallinen', nominativePlural: 'tavalliset', translation: 'ordinary/usual', rule: 'nen-ending', hint: 'tavallinen → tavallis + et' },
  { nominative: 'onnellinen', nominativePlural: 'onnelliset', translation: 'happy', rule: 'nen-ending', hint: 'onnellinen → onnellis + et' },
];

// Helper functions
export function getWordsByPluralRule(rule: PluralRule): PluralWord[] {
  return PLURAL_WORDS.filter(w => w.rule === rule);
}

export function getPluralRuleInfo(rule: PluralRule): PluralRuleInfo | undefined {
  return PLURAL_RULES.find(r => r.id === rule);
}

export function getAllPluralWords(): PluralWord[] {
  return PLURAL_WORDS;
}

export function getWordsForPluralRules(rules: PluralRule[]): PluralWord[] {
  return PLURAL_WORDS.filter(w => rules.includes(w.rule));
}

export function getPluralWordCount(rules: PluralRule[]): number {
  return getWordsForPluralRules(rules).length;
}


