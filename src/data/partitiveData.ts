// Partitive Case Data - Organized by Formation Rules
// Based on: https://uusikielemme.fi/finnish-grammar/finnish-cases/grammatical-cases/the-partitive-case-partitiivi

export type PartitiveRule = 
  | 'single-vowel'      // Words ending in single vowel: add -a/-ä
  | 'two-vowels'        // Words ending in two vowels: add -ta/-tä  
  | 'new-i'             // New words ending in -i: add -a/-ä
  | 'old-i'             // Old words ending in -i: stem changes
  | 'e-ending'          // Words ending in -e: add -tta/-ttä
  | 'consonant'         // Words ending in consonant: add -ta/-tä
  | 'nen-ending';       // Words ending in -nen: change -nen to -sta/-stä

export interface PartitiveWord {
  nominative: string;
  partitive: string;
  translation: string;
  rule: PartitiveRule;
  hint?: string;
}

export interface PartitiveRuleInfo {
  id: PartitiveRule;
  name: string;
  finnishName: string;
  description: string;
  formation: string;
  examples: string[];
  color: string;
}

export const PARTITIVE_RULES: PartitiveRuleInfo[] = [
  {
    id: 'single-vowel',
    name: 'Single Vowel Ending',
    finnishName: 'Yksittäinen vokaali',
    description: 'Words ending in -a, -ä, -o, -ö, -u, -y (single vowel)',
    formation: 'Add -a or -ä (double the final vowel)',
    examples: ['talo → taloa', 'koira → koiraa', 'pöytä → pöytää'],
    color: '#4a9eff',
  },
  {
    id: 'two-vowels',
    name: 'Two Vowel Ending',
    finnishName: 'Kaksi vokaalia',
    description: 'Words ending in long vowel or diphthong (-aa, -uu, -ie, -uo, -ea, etc.)',
    formation: 'Add -ta/-tä for same vowels, -a/-ä for different vowels',
    examples: ['maa → maata', 'työ → työtä', 'korkea → korkeaa'],
    color: '#ff7b4a',
  },
  {
    id: 'new-i',
    name: 'New -i Words',
    finnishName: 'Uudet i-sanat',
    description: 'Modern/borrowed words ending in -i',
    formation: 'Add -a or -ä (the i stays)',
    examples: ['bussi → bussia', 'taksi → taksia', 'kahvi → kahvia'],
    color: '#27ae60',
  },
  {
    id: 'old-i',
    name: 'Old -i Words',
    finnishName: 'Vanhat i-sanat',
    description: 'Traditional Finnish words ending in -i',
    formation: 'Stem changes: -i becomes -e- or drops, then add ending',
    examples: ['vesi → vettä', 'ovi → ovea', 'pieni → pientä'],
    color: '#9b59b6',
  },
  {
    id: 'e-ending',
    name: '-e Ending Words',
    finnishName: 'E-loppuiset',
    description: 'Words ending in -e',
    formation: 'Add -tta or -ttä',
    examples: ['huone → huonetta', 'perhe → perhettä', 'koe → koetta'],
    color: '#e74c3c',
  },
  {
    id: 'consonant',
    name: 'Consonant Ending',
    finnishName: 'Konsonanttiloppuiset',
    description: 'Words ending in consonants (-s, -n, -l, -r, -t)',
    formation: 'Add -ta or -tä (may have stem changes)',
    examples: ['vastaus → vastausta', 'sydän → sydäntä', 'kaunis → kaunista'],
    color: '#f39c12',
  },
  {
    id: 'nen-ending',
    name: '-nen Ending Words',
    finnishName: 'Nen-loppuiset',
    description: 'Words ending in -nen (adjectives & nouns)',
    formation: 'Change -nen to -s, then add -ta/-tä',
    examples: ['nainen → naista', 'punainen → punaista', 'ihminen → ihmistä'],
    color: '#1abc9c',
  },
];

// Words organized by partitive formation rule
export const PARTITIVE_WORDS: PartitiveWord[] = [
  // === SINGLE VOWEL ENDING (-a, -ä, -o, -ö, -u, -y) → add -a/-ä ===
  { nominative: 'talo', partitive: 'taloa', translation: 'house', rule: 'single-vowel', hint: 'talo → talo + a' },
  { nominative: 'koira', partitive: 'koiraa', translation: 'dog', rule: 'single-vowel', hint: 'koira → koira + a' },
  { nominative: 'kissa', partitive: 'kissaa', translation: 'cat', rule: 'single-vowel', hint: 'kissa → kissa + a' },
  { nominative: 'auto', partitive: 'autoa', translation: 'car', rule: 'single-vowel', hint: 'auto → auto + a' },
  { nominative: 'kirja', partitive: 'kirjaa', translation: 'book', rule: 'single-vowel', hint: 'kirja → kirja + a' },
  { nominative: 'pöytä', partitive: 'pöytää', translation: 'table', rule: 'single-vowel', hint: 'pöytä → pöytä + ä' },
  { nominative: 'leipä', partitive: 'leipää', translation: 'bread', rule: 'single-vowel', hint: 'leipä → leipä + ä' },
  { nominative: 'sana', partitive: 'sanaa', translation: 'word', rule: 'single-vowel', hint: 'sana → sana + a' },
  { nominative: 'ruoka', partitive: 'ruokaa', translation: 'food', rule: 'single-vowel', hint: 'ruoka → ruoka + a' },
  { nominative: 'maito', partitive: 'maitoa', translation: 'milk', rule: 'single-vowel', hint: 'maito → maito + a' },
  { nominative: 'hedelmä', partitive: 'hedelmää', translation: 'fruit', rule: 'single-vowel', hint: 'hedelmä → hedelmä + ä' },
  { nominative: 'opettaja', partitive: 'opettajaa', translation: 'teacher', rule: 'single-vowel', hint: 'opettaja → opettaja + a' },
  { nominative: 'musta', partitive: 'mustaa', translation: 'black', rule: 'single-vowel', hint: 'musta → musta + a' },
  { nominative: 'kahvila', partitive: 'kahvilaa', translation: 'café', rule: 'single-vowel', hint: 'kahvila → kahvila + a' },
  { nominative: 'pizza', partitive: 'pizzaa', translation: 'pizza', rule: 'single-vowel', hint: 'pizza → pizza + a' },
  { nominative: 'helppo', partitive: 'helppoa', translation: 'easy', rule: 'single-vowel', hint: 'helppo → helppo + a' },
  { nominative: 'vanha', partitive: 'vanhaa', translation: 'old', rule: 'single-vowel', hint: 'vanha → vanha + a' },
  { nominative: 'hyvä', partitive: 'hyvää', translation: 'good', rule: 'single-vowel', hint: 'hyvä → hyvä + ä' },
  { nominative: 'paha', partitive: 'pahaa', translation: 'bad', rule: 'single-vowel', hint: 'paha → paha + a' },
  { nominative: 'ikkuna', partitive: 'ikkunaa', translation: 'window', rule: 'single-vowel', hint: 'ikkuna → ikkuna + a' },
  { nominative: 'seuraava', partitive: 'seuraavaa', translation: 'next', rule: 'single-vowel', hint: 'seuraava → seuraava + a' },
  
  // === TWO VOWEL ENDING (long vowels -aa, -uu, etc. & diphthongs -ie, -uo, -ea, etc.) ===
  // Long vowels → add -ta/-tä
  { nominative: 'maa', partitive: 'maata', translation: 'country/ground', rule: 'two-vowels', hint: 'maa → maa + ta' },
  { nominative: 'puu', partitive: 'puuta', translation: 'tree/wood', rule: 'two-vowels', hint: 'puu → puu + ta' },
  { nominative: 'suu', partitive: 'suuta', translation: 'mouth', rule: 'two-vowels', hint: 'suu → suu + ta' },
  { nominative: 'muu', partitive: 'muuta', translation: 'other', rule: 'two-vowels', hint: 'muu → muu + ta' },
  { nominative: 'työ', partitive: 'työtä', translation: 'work', rule: 'two-vowels', hint: 'työ → työ + tä' },
  { nominative: 'yö', partitive: 'yötä', translation: 'night', rule: 'two-vowels', hint: 'yö → yö + tä' },
  { nominative: 'vapaa', partitive: 'vapaata', translation: 'free', rule: 'two-vowels', hint: 'vapaa → vapaa + ta' },
  { nominative: 'tie', partitive: 'tietä', translation: 'road', rule: 'two-vowels', hint: 'tie → tie + tä' },
  { nominative: 'suo', partitive: 'suota', translation: 'swamp', rule: 'two-vowels', hint: 'suo → suo + ta' },
  // Different vowels (-ea, -eä, -ia, etc.) → add -a/-ä
  { nominative: 'korkea', partitive: 'korkeaa', translation: 'high/tall', rule: 'two-vowels', hint: 'korkea → korkea + a' },
  { nominative: 'vaikea', partitive: 'vaikeaa', translation: 'difficult', rule: 'two-vowels', hint: 'vaikea → vaikea + a' },
  { nominative: 'tärkeä', partitive: 'tärkeää', translation: 'important', rule: 'two-vowels', hint: 'tärkeä → tärkeä + ä' },
  { nominative: 'oikea', partitive: 'oikeaa', translation: 'right/correct', rule: 'two-vowels', hint: 'oikea → oikea + a' },
  { nominative: 'vihreä', partitive: 'vihreää', translation: 'green', rule: 'two-vowels', hint: 'vihreä → vihreä + ä' },
  { nominative: 'idea', partitive: 'ideaa', translation: 'idea', rule: 'two-vowels', hint: 'idea → idea + a' },
  { nominative: 'ruskea', partitive: 'ruskeaa', translation: 'brown', rule: 'two-vowels', hint: 'ruskea → ruskea + a' },
  
  // === NEW -i WORDS (loanwords/modern words) → add -a/-ä ===
  { nominative: 'bussi', partitive: 'bussia', translation: 'bus', rule: 'new-i', hint: 'bussi → bussi + a' },
  { nominative: 'taksi', partitive: 'taksia', translation: 'taxi', rule: 'new-i', hint: 'taksi → taksi + a' },
  { nominative: 'pankki', partitive: 'pankkia', translation: 'bank', rule: 'new-i', hint: 'pankki → pankki + a' },
  { nominative: 'hotelli', partitive: 'hotellia', translation: 'hotel', rule: 'new-i', hint: 'hotelli → hotelli + a' },
  { nominative: 'posti', partitive: 'postia', translation: 'post/mail', rule: 'new-i', hint: 'posti → posti + a' },
  { nominative: 'paperi', partitive: 'paperia', translation: 'paper', rule: 'new-i', hint: 'paperi → paperi + a' },
  { nominative: 'professori', partitive: 'professoria', translation: 'professor', rule: 'new-i', hint: 'professori → professori + a' },
  { nominative: 'musiikki', partitive: 'musiikkia', translation: 'music', rule: 'new-i', hint: 'musiikki → musiikki + a' },
  { nominative: 'kahvi', partitive: 'kahvia', translation: 'coffee', rule: 'new-i', hint: 'kahvi → kahvi + a' },
  { nominative: 'banaani', partitive: 'banaania', translation: 'banana', rule: 'new-i', hint: 'banaani → banaani + a' },
  { nominative: 'tomaatti', partitive: 'tomaattia', translation: 'tomato', rule: 'new-i', hint: 'tomaatti → tomaatti + a' },
  { nominative: 'appelsiini', partitive: 'appelsiinia', translation: 'orange (fruit)', rule: 'new-i', hint: 'appelsiini → appelsiini + a' },
  { nominative: 'oranssi', partitive: 'oranssia', translation: 'orange (color)', rule: 'new-i', hint: 'oranssi → oranssi + a' },
  { nominative: 'normaali', partitive: 'normaalia', translation: 'normal', rule: 'new-i', hint: 'normaali → normaali + a' },
  
  // === OLD -i WORDS → stem changes, -i becomes -e- or drops ===
  { nominative: 'vesi', partitive: 'vettä', translation: 'water', rule: 'old-i', hint: 'vet- + tä (si→t doubles)' },
  { nominative: 'meri', partitive: 'merta', translation: 'sea', rule: 'old-i', hint: 'mer- + ta' },
  { nominative: 'veri', partitive: 'verta', translation: 'blood', rule: 'old-i', hint: 'ver- + ta' },
  { nominative: 'ovi', partitive: 'ovea', translation: 'door', rule: 'old-i', hint: 'ove- + a (i→e)' },
  { nominative: 'järvi', partitive: 'järveä', translation: 'lake', rule: 'old-i', hint: 'järve- + ä (i→e)' },
  { nominative: 'joki', partitive: 'jokea', translation: 'river', rule: 'old-i', hint: 'joke- + a (i→e)' },
  { nominative: 'kivi', partitive: 'kiveä', translation: 'stone', rule: 'old-i', hint: 'kive- + ä (i→e)' },
  { nominative: 'lehti', partitive: 'lehteä', translation: 'leaf/newspaper', rule: 'old-i', hint: 'lehte- + ä (i→e)' },
  { nominative: 'pilvi', partitive: 'pilveä', translation: 'cloud', rule: 'old-i', hint: 'pilve- + ä (i→e)' },
  { nominative: 'talvi', partitive: 'talvea', translation: 'winter', rule: 'old-i', hint: 'talve- + a (i→e)' },
  { nominative: 'pieni', partitive: 'pientä', translation: 'small', rule: 'old-i', hint: 'pien- + tä' },
  { nominative: 'uusi', partitive: 'uutta', translation: 'new', rule: 'old-i', hint: 'uut- + ta (stem change)' },
  { nominative: 'vuosi', partitive: 'vuotta', translation: 'year', rule: 'old-i', hint: 'vuot- + ta (stem change)' },
  { nominative: 'käsi', partitive: 'kättä', translation: 'hand', rule: 'old-i', hint: 'kät- + tä (stem change)' },
  { nominative: 'susi', partitive: 'sutta', translation: 'wolf', rule: 'old-i', hint: 'sut- + ta (stem change)' },
  { nominative: 'nuori', partitive: 'nuorta', translation: 'young', rule: 'old-i', hint: 'nuor- + ta' },
  
  // === -e ENDING WORDS → add -tta/-ttä ===
  { nominative: 'huone', partitive: 'huonetta', translation: 'room', rule: 'e-ending', hint: 'huone → huone + tta' },
  { nominative: 'perhe', partitive: 'perhettä', translation: 'family', rule: 'e-ending', hint: 'perhe → perhe + ttä' },
  { nominative: 'osoite', partitive: 'osoitetta', translation: 'address', rule: 'e-ending', hint: 'osoite → osoite + tta' },
  { nominative: 'kone', partitive: 'konetta', translation: 'machine', rule: 'e-ending', hint: 'kone → kone + tta' },
  { nominative: 'vuode', partitive: 'vuodetta', translation: 'bed', rule: 'e-ending', hint: 'vuode → vuode + tta' },
  { nominative: 'lause', partitive: 'lausetta', translation: 'sentence', rule: 'e-ending', hint: 'lause → lause + tta' },
  { nominative: 'vaate', partitive: 'vaatetta', translation: 'clothing', rule: 'e-ending', hint: 'vaate → vaate + tta' },
  { nominative: 'kappale', partitive: 'kappaletta', translation: 'piece/chapter', rule: 'e-ending', hint: 'kappale → kappale + tta' },
  { nominative: 'tuote', partitive: 'tuotetta', translation: 'product', rule: 'e-ending', hint: 'tuote → tuote + tta' },
  { nominative: 'koe', partitive: 'koetta', translation: 'test/exam', rule: 'e-ending', hint: 'koe → koe + tta' },
  { nominative: 'kirje', partitive: 'kirjettä', translation: 'letter', rule: 'e-ending', hint: 'kirje → kirje + ttä' },
  { nominative: 'käsite', partitive: 'käsitettä', translation: 'concept', rule: 'e-ending', hint: 'käsite → käsite + ttä' },
  
  // === CONSONANT ENDING (-s, -n, -l, -r, -t) → add -ta/-tä ===
  { nominative: 'kysymys', partitive: 'kysymystä', translation: 'question', rule: 'consonant', hint: 'kysymys → kysymys + tä' },
  { nominative: 'vastaus', partitive: 'vastausta', translation: 'answer', rule: 'consonant', hint: 'vastaus → vastaus + ta' },
  { nominative: 'ajatus', partitive: 'ajatusta', translation: 'thought', rule: 'consonant', hint: 'ajatus → ajatus + ta' },
  { nominative: 'rakkaus', partitive: 'rakkautta', translation: 'love', rule: 'consonant', hint: 'rakkaut- + ta (stem change)' },
  { nominative: 'ystävyys', partitive: 'ystävyyttä', translation: 'friendship', rule: 'consonant', hint: 'ystävyyt- + tä (stem change)' },
  { nominative: 'totuus', partitive: 'totuutta', translation: 'truth', rule: 'consonant', hint: 'totuut- + ta (stem change)' },
  { nominative: 'olut', partitive: 'olutta', translation: 'beer', rule: 'consonant', hint: 'olut- + ta' },
  { nominative: 'kaunis', partitive: 'kaunista', translation: 'beautiful', rule: 'consonant', hint: 'kauniis- + ta' },
  { nominative: 'puhelin', partitive: 'puhelinta', translation: 'phone', rule: 'consonant', hint: 'puhelin- + ta' },
  { nominative: 'sydän', partitive: 'sydäntä', translation: 'heart', rule: 'consonant', hint: 'sydän- + tä' },
  { nominative: 'avain', partitive: 'avainta', translation: 'key', rule: 'consonant', hint: 'avain- + ta' },
  { nominative: 'askel', partitive: 'askelta', translation: 'step', rule: 'consonant', hint: 'askel- + ta' },
  { nominative: 'sairas', partitive: 'sairasta', translation: 'sick', rule: 'consonant', hint: 'sairas- + ta' },
  { nominative: 'rikas', partitive: 'rikasta', translation: 'rich', rule: 'consonant', hint: 'rikas- + ta' },
  
  // === -nen ENDING WORDS → -nen becomes -s + -ta/-tä ===
  // ONLY words that actually end in -nen go here!
  { nominative: 'nainen', partitive: 'naista', translation: 'woman', rule: 'nen-ending', hint: 'nais- + ta (nen→s)' },
  { nominative: 'ihminen', partitive: 'ihmistä', translation: 'human/person', rule: 'nen-ending', hint: 'ihmis- + tä (nen→s)' },
  { nominative: 'suomalainen', partitive: 'suomalaista', translation: 'Finnish (person)', rule: 'nen-ending', hint: 'suomalais- + ta (nen→s)' },
  { nominative: 'punainen', partitive: 'punaista', translation: 'red', rule: 'nen-ending', hint: 'punais- + ta (nen→s)' },
  { nominative: 'sininen', partitive: 'sinistä', translation: 'blue', rule: 'nen-ending', hint: 'sinis- + tä (nen→s)' },
  { nominative: 'valkoinen', partitive: 'valkoista', translation: 'white', rule: 'nen-ending', hint: 'valkois- + ta (nen→s)' },
  { nominative: 'keltainen', partitive: 'keltaista', translation: 'yellow', rule: 'nen-ending', hint: 'keltais- + ta (nen→s)' },
  { nominative: 'ensimmäinen', partitive: 'ensimmäistä', translation: 'first', rule: 'nen-ending', hint: 'ensimmäis- + tä (nen→s)' },
  { nominative: 'viimeinen', partitive: 'viimeistä', translation: 'last', rule: 'nen-ending', hint: 'viimeis- + tä (nen→s)' },
  { nominative: 'edellinen', partitive: 'edellistä', translation: 'previous', rule: 'nen-ending', hint: 'edellis- + tä (nen→s)' },
  { nominative: 'tavallinen', partitive: 'tavallista', translation: 'ordinary/usual', rule: 'nen-ending', hint: 'tavallis- + ta (nen→s)' },
  { nominative: 'onnellinen', partitive: 'onnellista', translation: 'happy', rule: 'nen-ending', hint: 'onnellis- + ta (nen→s)' },
  { nominative: 'surullinen', partitive: 'surullista', translation: 'sad', rule: 'nen-ending', hint: 'surullis- + ta (nen→s)' },
  { nominative: 'kaukainen', partitive: 'kaukaista', translation: 'distant', rule: 'nen-ending', hint: 'kaukais- + ta (nen→s)' },
  { nominative: 'läheinen', partitive: 'läheistä', translation: 'close/near', rule: 'nen-ending', hint: 'läheis- + tä (nen→s)' },
];

// Helper functions
export function getWordsByRule(rule: PartitiveRule): PartitiveWord[] {
  return PARTITIVE_WORDS.filter(w => w.rule === rule);
}

export function getWordCountByRule(rule: PartitiveRule): number {
  return getWordsByRule(rule).length;
}

export function getRuleInfo(rule: PartitiveRule): PartitiveRuleInfo | undefined {
  return PARTITIVE_RULES.find(r => r.id === rule);
}

export function getAllPartitiveWords(): PartitiveWord[] {
  return PARTITIVE_WORDS;
}

export function getWordsForRules(rules: PartitiveRule[]): PartitiveWord[] {
  return PARTITIVE_WORDS.filter(w => rules.includes(w.rule));
}

export function getTotalWordCount(rules: PartitiveRule[]): number {
  return getWordsForRules(rules).length;
}
