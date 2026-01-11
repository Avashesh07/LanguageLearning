// Genitive Case Data - Formation Rules for Finnish Genitive
// The genitive case shows possession and is used with many postpositions
// Singular: -n ending (with possible stem changes)
// Plural: stem + -en, -den, -tten, -ien, etc.

export type GenitiveRule = 
  | 'single-vowel'      // Words ending in single vowel: add -n
  | 'two-vowels'        // Words ending in two vowels: add -n
  | 'new-i'             // New words ending in -i: add -n
  | 'old-i'             // Old words ending in -i: stem changes
  | 'e-ending'          // Words ending in -e: e→ee + n
  | 'consonant'         // Words ending in consonant: stem + vowel + n
  | 'nen-ending';       // Words ending in -nen: -nen → -sen

export interface GenitiveWord {
  nominative: string;           // Singular nominative
  genitiveSingular: string;     // Singular genitive
  nominativePlural: string;     // Plural nominative (for reference)
  genitivePlural: string;       // Plural genitive
  translation: string;
  rule: GenitiveRule;
  hint?: string;
}

export interface GenitiveRuleInfo {
  id: GenitiveRule;
  name: string;
  finnishName: string;
  description: string;
  formationSingular: string;
  formationPlural: string;
  examples: string[];
  color: string;
}

export const GENITIVE_RULES: GenitiveRuleInfo[] = [
  {
    id: 'single-vowel',
    name: 'Single Vowel Ending',
    finnishName: 'Yksittäinen vokaali',
    description: 'Words ending in -a, -ä, -o, -ö, -u, -y',
    formationSingular: 'Add -n (watch for consonant gradation!)',
    formationPlural: 'Plural stem + -jen/-en',
    examples: ['talo → talon → talojen', 'koira → koiran → koirien'],
    color: '#4a9eff',
  },
  {
    id: 'two-vowels',
    name: 'Two Vowel Ending',
    finnishName: 'Kaksi vokaalia',
    description: 'Words ending in long vowel or diphthong',
    formationSingular: 'Add -n',
    formationPlural: 'Plural stem + -den/-iden',
    examples: ['maa → maan → maiden', 'työ → työn → töiden'],
    color: '#ff7b4a',
  },
  {
    id: 'new-i',
    name: 'New -i Words',
    finnishName: 'Uudet i-sanat',
    description: 'Modern/borrowed words ending in -i',
    formationSingular: 'Add -n',
    formationPlural: 'Plural stem + -en',
    examples: ['bussi → bussin → bussien', 'taksi → taksin → taksien'],
    color: '#27ae60',
  },
  {
    id: 'old-i',
    name: 'Old -i Words',
    finnishName: 'Vanhat i-sanat',
    description: 'Traditional Finnish words ending in -i',
    formationSingular: 'Stem changes: -i → -e + n',
    formationPlural: 'Plural stem + -en/-ien',
    examples: ['ovi → oven → ovien', 'järvi → järven → järvien'],
    color: '#9b59b6',
  },
  {
    id: 'e-ending',
    name: '-e Ending Words',
    finnishName: 'E-loppuiset',
    description: 'Words ending in -e',
    formationSingular: 'Double the -e, add -n',
    formationPlural: 'Plural stem + -iden/-tten',
    examples: ['huone → huoneen → huoneiden', 'perhe → perheen → perheiden'],
    color: '#e74c3c',
  },
  {
    id: 'consonant',
    name: 'Consonant Ending',
    finnishName: 'Konsonanttiloppuiset',
    description: 'Words ending in consonants',
    formationSingular: 'Add stem vowel + -n',
    formationPlural: 'Plural stem + -ten/-en',
    examples: ['vastaus → vastauksen → vastausten', 'puhelin → puhelimen → puhelimien'],
    color: '#f39c12',
  },
  {
    id: 'nen-ending',
    name: '-nen Ending Words',
    finnishName: 'Nen-loppuiset',
    description: 'Words ending in -nen',
    formationSingular: 'Change -nen to -sen',
    formationPlural: 'Change -nen to -sten',
    examples: ['nainen → naisen → naisten', 'punainen → punaisen → punaisten'],
    color: '#1abc9c',
  },
];

// Words with all forms
export const GENITIVE_WORDS: GenitiveWord[] = [
  // === SINGLE VOWEL ENDING ===
  { nominative: 'talo', genitiveSingular: 'talon', nominativePlural: 'talot', genitivePlural: 'talojen', translation: 'house', rule: 'single-vowel', hint: 'talo → talo + n' },
  { nominative: 'koira', genitiveSingular: 'koiran', nominativePlural: 'koirat', genitivePlural: 'koirien', translation: 'dog', rule: 'single-vowel', hint: 'koira → koira + n' },
  { nominative: 'kissa', genitiveSingular: 'kissan', nominativePlural: 'kissat', genitivePlural: 'kissojen', translation: 'cat', rule: 'single-vowel', hint: 'kissa → kissa + n' },
  { nominative: 'auto', genitiveSingular: 'auton', nominativePlural: 'autot', genitivePlural: 'autojen', translation: 'car', rule: 'single-vowel', hint: 'auto → auto + n' },
  { nominative: 'kirja', genitiveSingular: 'kirjan', nominativePlural: 'kirjat', genitivePlural: 'kirjojen', translation: 'book', rule: 'single-vowel', hint: 'kirja → kirja + n' },
  { nominative: 'pöytä', genitiveSingular: 'pöydän', nominativePlural: 'pöydät', genitivePlural: 'pöytien', translation: 'table', rule: 'single-vowel', hint: 'pöytä → pöydä + n (t→d)' },
  { nominative: 'leipä', genitiveSingular: 'leivän', nominativePlural: 'leivät', genitivePlural: 'leipien', translation: 'bread', rule: 'single-vowel', hint: 'leipä → leivä + n (p→v)' },
  { nominative: 'sana', genitiveSingular: 'sanan', nominativePlural: 'sanat', genitivePlural: 'sanojen', translation: 'word', rule: 'single-vowel', hint: 'sana → sana + n' },
  { nominative: 'ruoka', genitiveSingular: 'ruoan', nominativePlural: 'ruoat', genitivePlural: 'ruokien', translation: 'food', rule: 'single-vowel', hint: 'ruoka → ruoa + n (k→∅)' },
  { nominative: 'hedelmä', genitiveSingular: 'hedelmän', nominativePlural: 'hedelmät', genitivePlural: 'hedelmien', translation: 'fruit', rule: 'single-vowel', hint: 'hedelmä → hedelmä + n' },
  { nominative: 'opettaja', genitiveSingular: 'opettajan', nominativePlural: 'opettajat', genitivePlural: 'opettajien', translation: 'teacher', rule: 'single-vowel', hint: 'opettaja → opettaja + n' },
  { nominative: 'ikkuna', genitiveSingular: 'ikkunan', nominativePlural: 'ikkunat', genitivePlural: 'ikkunoiden', translation: 'window', rule: 'single-vowel', hint: 'ikkuna → ikkuna + n' },
  { nominative: 'kauppa', genitiveSingular: 'kaupan', nominativePlural: 'kaupat', genitivePlural: 'kauppojen', translation: 'shop', rule: 'single-vowel', hint: 'kauppa → kaupa + n (pp→p)' },
  { nominative: 'kukka', genitiveSingular: 'kukan', nominativePlural: 'kukat', genitivePlural: 'kukkien', translation: 'flower', rule: 'single-vowel', hint: 'kukka → kuka + n (kk→k)' },
  { nominative: 'silmä', genitiveSingular: 'silmän', nominativePlural: 'silmät', genitivePlural: 'silmien', translation: 'eye', rule: 'single-vowel', hint: 'silmä → silmä + n' },
  { nominative: 'poika', genitiveSingular: 'pojan', nominativePlural: 'pojat', genitivePlural: 'poikien', translation: 'boy', rule: 'single-vowel', hint: 'poika → poja + n (k→∅)' },
  { nominative: 'aika', genitiveSingular: 'ajan', nominativePlural: 'ajat', genitivePlural: 'aikojen', translation: 'time', rule: 'single-vowel', hint: 'aika → aja + n (k→∅)' },
  { nominative: 'paikka', genitiveSingular: 'paikan', nominativePlural: 'paikat', genitivePlural: 'paikkojen', translation: 'place', rule: 'single-vowel', hint: 'paikka → paika + n (kk→k)' },

  // === TWO VOWEL ENDING ===
  { nominative: 'maa', genitiveSingular: 'maan', nominativePlural: 'maat', genitivePlural: 'maiden', translation: 'country/ground', rule: 'two-vowels', hint: 'maa → maa + n' },
  { nominative: 'puu', genitiveSingular: 'puun', nominativePlural: 'puut', genitivePlural: 'puiden', translation: 'tree/wood', rule: 'two-vowels', hint: 'puu → puu + n' },
  { nominative: 'suu', genitiveSingular: 'suun', nominativePlural: 'suut', genitivePlural: 'suiden', translation: 'mouth', rule: 'two-vowels', hint: 'suu → suu + n' },
  { nominative: 'työ', genitiveSingular: 'työn', nominativePlural: 'työt', genitivePlural: 'töiden', translation: 'work', rule: 'two-vowels', hint: 'työ → työ + n' },
  { nominative: 'yö', genitiveSingular: 'yön', nominativePlural: 'yöt', genitivePlural: 'öiden', translation: 'night', rule: 'two-vowels', hint: 'yö → yö + n' },
  { nominative: 'vapaa', genitiveSingular: 'vapaan', nominativePlural: 'vapaat', genitivePlural: 'vapaiden', translation: 'free', rule: 'two-vowels', hint: 'vapaa → vapaa + n' },
  { nominative: 'tie', genitiveSingular: 'tien', nominativePlural: 'tiet', genitivePlural: 'teiden', translation: 'road', rule: 'two-vowels', hint: 'tie → tie + n' },
  { nominative: 'korkea', genitiveSingular: 'korkean', nominativePlural: 'korkeat', genitivePlural: 'korkeiden', translation: 'high/tall', rule: 'two-vowels', hint: 'korkea → korkea + n' },
  { nominative: 'vaikea', genitiveSingular: 'vaikean', nominativePlural: 'vaikeat', genitivePlural: 'vaikeiden', translation: 'difficult', rule: 'two-vowels', hint: 'vaikea → vaikea + n' },
  { nominative: 'tärkeä', genitiveSingular: 'tärkeän', nominativePlural: 'tärkeät', genitivePlural: 'tärkeiden', translation: 'important', rule: 'two-vowels', hint: 'tärkeä → tärkeä + n' },

  // === NEW -i WORDS ===
  { nominative: 'bussi', genitiveSingular: 'bussin', nominativePlural: 'bussit', genitivePlural: 'bussien', translation: 'bus', rule: 'new-i', hint: 'bussi → bussi + n' },
  { nominative: 'taksi', genitiveSingular: 'taksin', nominativePlural: 'taksit', genitivePlural: 'taksien', translation: 'taxi', rule: 'new-i', hint: 'taksi → taksi + n' },
  { nominative: 'pankki', genitiveSingular: 'pankin', nominativePlural: 'pankit', genitivePlural: 'pankkien', translation: 'bank', rule: 'new-i', hint: 'pankki → panki + n (kk→k)' },
  { nominative: 'hotelli', genitiveSingular: 'hotellin', nominativePlural: 'hotellit', genitivePlural: 'hotellien', translation: 'hotel', rule: 'new-i', hint: 'hotelli → hotelli + n' },
  { nominative: 'posti', genitiveSingular: 'postin', nominativePlural: 'postit', genitivePlural: 'postien', translation: 'post/mail', rule: 'new-i', hint: 'posti → posti + n' },
  { nominative: 'paperi', genitiveSingular: 'paperin', nominativePlural: 'paperit', genitivePlural: 'paperien', translation: 'paper', rule: 'new-i', hint: 'paperi → paperi + n' },
  { nominative: 'kahvi', genitiveSingular: 'kahvin', nominativePlural: 'kahvit', genitivePlural: 'kahvien', translation: 'coffee', rule: 'new-i', hint: 'kahvi → kahvi + n' },
  { nominative: 'banaani', genitiveSingular: 'banaanin', nominativePlural: 'banaanit', genitivePlural: 'banaanien', translation: 'banana', rule: 'new-i', hint: 'banaani → banaani + n' },
  { nominative: 'tomaatti', genitiveSingular: 'tomaatin', nominativePlural: 'tomaatit', genitivePlural: 'tomaattien', translation: 'tomato', rule: 'new-i', hint: 'tomaatti → tomaati + n (tt→t)' },

  // === OLD -i WORDS ===
  { nominative: 'ovi', genitiveSingular: 'oven', nominativePlural: 'ovet', genitivePlural: 'ovien', translation: 'door', rule: 'old-i', hint: 'ovi → ove + n (i→e)' },
  { nominative: 'järvi', genitiveSingular: 'järven', nominativePlural: 'järvet', genitivePlural: 'järvien', translation: 'lake', rule: 'old-i', hint: 'järvi → järve + n (i→e)' },
  { nominative: 'joki', genitiveSingular: 'joen', nominativePlural: 'joet', genitivePlural: 'jokien', translation: 'river', rule: 'old-i', hint: 'joki → joe + n (ki→e)' },
  { nominative: 'kivi', genitiveSingular: 'kiven', nominativePlural: 'kivet', genitivePlural: 'kivien', translation: 'stone', rule: 'old-i', hint: 'kivi → kive + n (i→e)' },
  { nominative: 'lehti', genitiveSingular: 'lehden', nominativePlural: 'lehdet', genitivePlural: 'lehtien', translation: 'leaf/newspaper', rule: 'old-i', hint: 'lehti → lehde + n (t→d)' },
  { nominative: 'pilvi', genitiveSingular: 'pilven', nominativePlural: 'pilvet', genitivePlural: 'pilvien', translation: 'cloud', rule: 'old-i', hint: 'pilvi → pilve + n (i→e)' },
  { nominative: 'talvi', genitiveSingular: 'talven', nominativePlural: 'talvet', genitivePlural: 'talvien', translation: 'winter', rule: 'old-i', hint: 'talvi → talve + n (i→e)' },
  { nominative: 'vesi', genitiveSingular: 'veden', nominativePlural: 'vedet', genitivePlural: 'vesien', translation: 'water', rule: 'old-i', hint: 'vesi → vede + n (s→d)' },
  { nominative: 'meri', genitiveSingular: 'meren', nominativePlural: 'meret', genitivePlural: 'merien', translation: 'sea', rule: 'old-i', hint: 'meri → mere + n (i→e)' },
  { nominative: 'vuosi', genitiveSingular: 'vuoden', nominativePlural: 'vuodet', genitivePlural: 'vuosien', translation: 'year', rule: 'old-i', hint: 'vuosi → vuode + n (s→d)' },
  { nominative: 'käsi', genitiveSingular: 'käden', nominativePlural: 'kädet', genitivePlural: 'käsien', translation: 'hand', rule: 'old-i', hint: 'käsi → käde + n (s→d)' },
  { nominative: 'nimi', genitiveSingular: 'nimen', nominativePlural: 'nimet', genitivePlural: 'nimien', translation: 'name', rule: 'old-i', hint: 'nimi → nime + n (i→e)' },

  // === -e ENDING WORDS ===
  { nominative: 'huone', genitiveSingular: 'huoneen', nominativePlural: 'huoneet', genitivePlural: 'huoneiden', translation: 'room', rule: 'e-ending', hint: 'huone → huonee + n' },
  { nominative: 'perhe', genitiveSingular: 'perheen', nominativePlural: 'perheet', genitivePlural: 'perheiden', translation: 'family', rule: 'e-ending', hint: 'perhe → perhee + n' },
  { nominative: 'osoite', genitiveSingular: 'osoitteen', nominativePlural: 'osoitteet', genitivePlural: 'osoitteiden', translation: 'address', rule: 'e-ending', hint: 'osoite → osoittee + n (t→tt)' },
  { nominative: 'kone', genitiveSingular: 'koneen', nominativePlural: 'koneet', genitivePlural: 'koneiden', translation: 'machine', rule: 'e-ending', hint: 'kone → konee + n' },
  { nominative: 'vuode', genitiveSingular: 'vuoteen', nominativePlural: 'vuoteet', genitivePlural: 'vuoteiden', translation: 'bed', rule: 'e-ending', hint: 'vuode → vuotee + n (d→t)' },
  { nominative: 'lause', genitiveSingular: 'lauseen', nominativePlural: 'lauseet', genitivePlural: 'lauseiden', translation: 'sentence', rule: 'e-ending', hint: 'lause → lausee + n' },
  { nominative: 'vaate', genitiveSingular: 'vaatteen', nominativePlural: 'vaatteet', genitivePlural: 'vaatteiden', translation: 'clothing', rule: 'e-ending', hint: 'vaate → vaattee + n (t→tt)' },
  { nominative: 'kirje', genitiveSingular: 'kirjeen', nominativePlural: 'kirjeet', genitivePlural: 'kirjeiden', translation: 'letter', rule: 'e-ending', hint: 'kirje → kirjee + n' },

  // === CONSONANT ENDING ===
  { nominative: 'kysymys', genitiveSingular: 'kysymyksen', nominativePlural: 'kysymykset', genitivePlural: 'kysymysten', translation: 'question', rule: 'consonant', hint: 'kysymys → kysymykse + n' },
  { nominative: 'vastaus', genitiveSingular: 'vastauksen', nominativePlural: 'vastaukset', genitivePlural: 'vastausten', translation: 'answer', rule: 'consonant', hint: 'vastaus → vastaukse + n' },
  { nominative: 'ajatus', genitiveSingular: 'ajatuksen', nominativePlural: 'ajatukset', genitivePlural: 'ajatusten', translation: 'thought', rule: 'consonant', hint: 'ajatus → ajatukse + n' },
  { nominative: 'rakkaus', genitiveSingular: 'rakkauden', nominativePlural: 'rakkaudet', genitivePlural: 'rakkauksien', translation: 'love', rule: 'consonant', hint: 'rakkaus → rakkaude + n' },
  { nominative: 'puhelin', genitiveSingular: 'puhelimen', nominativePlural: 'puhelimet', genitivePlural: 'puhelimien', translation: 'phone', rule: 'consonant', hint: 'puhelin → puhelime + n' },
  { nominative: 'sydän', genitiveSingular: 'sydämen', nominativePlural: 'sydämet', genitivePlural: 'sydämien', translation: 'heart', rule: 'consonant', hint: 'sydän → sydäme + n' },
  { nominative: 'avain', genitiveSingular: 'avaimen', nominativePlural: 'avaimet', genitivePlural: 'avaimien', translation: 'key', rule: 'consonant', hint: 'avain → avaime + n' },
  { nominative: 'kaunis', genitiveSingular: 'kauniin', nominativePlural: 'kauniit', genitivePlural: 'kauniiden', translation: 'beautiful', rule: 'consonant', hint: 'kaunis → kaunii + n' },
  { nominative: 'rikas', genitiveSingular: 'rikkaan', nominativePlural: 'rikkaat', genitivePlural: 'rikkaiden', translation: 'rich', rule: 'consonant', hint: 'rikas → rikkaa + n' },

  // === -nen ENDING WORDS ===
  { nominative: 'nainen', genitiveSingular: 'naisen', nominativePlural: 'naiset', genitivePlural: 'naisten', translation: 'woman', rule: 'nen-ending', hint: 'nainen → naise + n' },
  { nominative: 'ihminen', genitiveSingular: 'ihmisen', nominativePlural: 'ihmiset', genitivePlural: 'ihmisten', translation: 'human/person', rule: 'nen-ending', hint: 'ihminen → ihmise + n' },
  { nominative: 'suomalainen', genitiveSingular: 'suomalaisen', nominativePlural: 'suomalaiset', genitivePlural: 'suomalaisten', translation: 'Finnish (person)', rule: 'nen-ending', hint: 'suomalainen → suomalaise + n' },
  { nominative: 'punainen', genitiveSingular: 'punaisen', nominativePlural: 'punaiset', genitivePlural: 'punaisten', translation: 'red', rule: 'nen-ending', hint: 'punainen → punaise + n' },
  { nominative: 'sininen', genitiveSingular: 'sinisen', nominativePlural: 'siniset', genitivePlural: 'sinisten', translation: 'blue', rule: 'nen-ending', hint: 'sininen → sinise + n' },
  { nominative: 'valkoinen', genitiveSingular: 'valkoisen', nominativePlural: 'valkoiset', genitivePlural: 'valkoisten', translation: 'white', rule: 'nen-ending', hint: 'valkoinen → valkoise + n' },
  { nominative: 'keltainen', genitiveSingular: 'keltaisen', nominativePlural: 'keltaiset', genitivePlural: 'keltaisten', translation: 'yellow', rule: 'nen-ending', hint: 'keltainen → keltaise + n' },
  { nominative: 'ensimmäinen', genitiveSingular: 'ensimmäisen', nominativePlural: 'ensimmäiset', genitivePlural: 'ensimmäisten', translation: 'first', rule: 'nen-ending', hint: 'ensimmäinen → ensimmäise + n' },
  { nominative: 'viimeinen', genitiveSingular: 'viimeisen', nominativePlural: 'viimeiset', genitivePlural: 'viimeisten', translation: 'last', rule: 'nen-ending', hint: 'viimeinen → viimeise + n' },
  { nominative: 'tavallinen', genitiveSingular: 'tavallisen', nominativePlural: 'tavalliset', genitivePlural: 'tavallisten', translation: 'ordinary/usual', rule: 'nen-ending', hint: 'tavallinen → tavallise + n' },
  { nominative: 'onnellinen', genitiveSingular: 'onnellisen', nominativePlural: 'onnelliset', genitivePlural: 'onnellisten', translation: 'happy', rule: 'nen-ending', hint: 'onnellinen → onnellise + n' },
];

// Helper functions
export function getWordsByGenitiveRule(rule: GenitiveRule): GenitiveWord[] {
  return GENITIVE_WORDS.filter(w => w.rule === rule);
}

export function getGenitiveRuleInfo(rule: GenitiveRule): GenitiveRuleInfo | undefined {
  return GENITIVE_RULES.find(r => r.id === rule);
}

export function getAllGenitiveWords(): GenitiveWord[] {
  return GENITIVE_WORDS;
}

export function getWordsForGenitiveRules(rules: GenitiveRule[]): GenitiveWord[] {
  return GENITIVE_WORDS.filter(w => rules.includes(w.rule));
}

export function getGenitiveWordCount(rules: GenitiveRule[]): number {
  return getWordsForGenitiveRules(rules).length;
}




