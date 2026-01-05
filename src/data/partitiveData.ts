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
  partitive: string;           // Singular partitive
  nominativePlural: string;    // Nominative plural (for reference)
  partitivePlural: string;     // Plural partitive
  translation: string;
  rule: PartitiveRule;
  hint?: string;
  hintPlural?: string;
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
// Now includes plural partitive forms
export const PARTITIVE_WORDS: PartitiveWord[] = [
  // === SINGLE VOWEL ENDING (-a, -ä, -o, -ö, -u, -y) → add -a/-ä ===
  { nominative: 'talo', partitive: 'taloa', nominativePlural: 'talot', partitivePlural: 'taloja', translation: 'house', rule: 'single-vowel', hint: 'talo → talo + a', hintPlural: 'talot → talo + ja' },
  { nominative: 'koira', partitive: 'koiraa', nominativePlural: 'koirat', partitivePlural: 'koiria', translation: 'dog', rule: 'single-vowel', hint: 'koira → koira + a', hintPlural: 'koirat → koir + ia' },
  { nominative: 'kissa', partitive: 'kissaa', nominativePlural: 'kissat', partitivePlural: 'kissoja', translation: 'cat', rule: 'single-vowel', hint: 'kissa → kissa + a', hintPlural: 'kissat → kisso + ja' },
  { nominative: 'auto', partitive: 'autoa', nominativePlural: 'autot', partitivePlural: 'autoja', translation: 'car', rule: 'single-vowel', hint: 'auto → auto + a', hintPlural: 'autot → auto + ja' },
  { nominative: 'kirja', partitive: 'kirjaa', nominativePlural: 'kirjat', partitivePlural: 'kirjoja', translation: 'book', rule: 'single-vowel', hint: 'kirja → kirja + a', hintPlural: 'kirjat → kirjo + ja' },
  { nominative: 'pöytä', partitive: 'pöytää', nominativePlural: 'pöydät', partitivePlural: 'pöytiä', translation: 'table', rule: 'single-vowel', hint: 'pöytä → pöytä + ä', hintPlural: 'pöydät → pöyti + ä' },
  { nominative: 'leipä', partitive: 'leipää', nominativePlural: 'leivät', partitivePlural: 'leipiä', translation: 'bread', rule: 'single-vowel', hint: 'leipä → leipä + ä', hintPlural: 'leivät → leip + iä' },
  { nominative: 'sana', partitive: 'sanaa', nominativePlural: 'sanat', partitivePlural: 'sanoja', translation: 'word', rule: 'single-vowel', hint: 'sana → sana + a', hintPlural: 'sanat → sano + ja' },
  { nominative: 'ruoka', partitive: 'ruokaa', nominativePlural: 'ruoat', partitivePlural: 'ruokia', translation: 'food', rule: 'single-vowel', hint: 'ruoka → ruoka + a', hintPlural: 'ruoat → ruok + ia' },
  { nominative: 'maito', partitive: 'maitoa', nominativePlural: 'maidot', partitivePlural: 'maitoja', translation: 'milk', rule: 'single-vowel', hint: 'maito → maito + a', hintPlural: 'maidot → maito + ja' },
  { nominative: 'hedelmä', partitive: 'hedelmää', nominativePlural: 'hedelmät', partitivePlural: 'hedelmiä', translation: 'fruit', rule: 'single-vowel', hint: 'hedelmä → hedelmä + ä', hintPlural: 'hedelmät → hedelm + iä' },
  { nominative: 'opettaja', partitive: 'opettajaa', nominativePlural: 'opettajat', partitivePlural: 'opettajia', translation: 'teacher', rule: 'single-vowel', hint: 'opettaja → opettaja + a', hintPlural: 'opettajat → opettaj + ia' },
  { nominative: 'musta', partitive: 'mustaa', nominativePlural: 'mustat', partitivePlural: 'mustia', translation: 'black', rule: 'single-vowel', hint: 'musta → musta + a', hintPlural: 'mustat → must + ia' },
  { nominative: 'kahvila', partitive: 'kahvilaa', nominativePlural: 'kahvilat', partitivePlural: 'kahviloita', translation: 'café', rule: 'single-vowel', hint: 'kahvila → kahvila + a', hintPlural: 'kahvilat → kahvilo + ita' },
  { nominative: 'pizza', partitive: 'pizzaa', nominativePlural: 'pizzat', partitivePlural: 'pizzoja', translation: 'pizza', rule: 'single-vowel', hint: 'pizza → pizza + a', hintPlural: 'pizzat → pizzo + ja' },
  { nominative: 'helppo', partitive: 'helppoa', nominativePlural: 'helpot', partitivePlural: 'helppoja', translation: 'easy', rule: 'single-vowel', hint: 'helppo → helppo + a', hintPlural: 'helpot → helppo + ja' },
  { nominative: 'vanha', partitive: 'vanhaa', nominativePlural: 'vanhat', partitivePlural: 'vanhoja', translation: 'old', rule: 'single-vowel', hint: 'vanha → vanha + a', hintPlural: 'vanhat → vanho + ja' },
  { nominative: 'hyvä', partitive: 'hyvää', nominativePlural: 'hyvät', partitivePlural: 'hyviä', translation: 'good', rule: 'single-vowel', hint: 'hyvä → hyvä + ä', hintPlural: 'hyvät → hyv + iä' },
  { nominative: 'paha', partitive: 'pahaa', nominativePlural: 'pahat', partitivePlural: 'pahoja', translation: 'bad', rule: 'single-vowel', hint: 'paha → paha + a', hintPlural: 'pahat → paho + ja' },
  { nominative: 'ikkuna', partitive: 'ikkunaa', nominativePlural: 'ikkunat', partitivePlural: 'ikkunoita', translation: 'window', rule: 'single-vowel', hint: 'ikkuna → ikkuna + a', hintPlural: 'ikkunat → ikkuno + ita' },
  { nominative: 'seuraava', partitive: 'seuraavaa', nominativePlural: 'seuraavat', partitivePlural: 'seuraavia', translation: 'next', rule: 'single-vowel', hint: 'seuraava → seuraava + a', hintPlural: 'seuraavat → seuraav + ia' },
  
  // === TWO VOWEL ENDING (long vowels -aa, -uu, etc. & diphthongs -ie, -uo, -ea, etc.) ===
  // Long vowels → add -ta/-tä
  { nominative: 'maa', partitive: 'maata', nominativePlural: 'maat', partitivePlural: 'maita', translation: 'country/ground', rule: 'two-vowels', hint: 'maa → maa + ta', hintPlural: 'maat → ma + ita' },
  { nominative: 'puu', partitive: 'puuta', nominativePlural: 'puut', partitivePlural: 'puita', translation: 'tree/wood', rule: 'two-vowels', hint: 'puu → puu + ta', hintPlural: 'puut → pu + ita' },
  { nominative: 'suu', partitive: 'suuta', nominativePlural: 'suut', partitivePlural: 'suita', translation: 'mouth', rule: 'two-vowels', hint: 'suu → suu + ta', hintPlural: 'suut → su + ita' },
  { nominative: 'muu', partitive: 'muuta', nominativePlural: 'muut', partitivePlural: 'muita', translation: 'other', rule: 'two-vowels', hint: 'muu → muu + ta', hintPlural: 'muut → mu + ita' },
  { nominative: 'työ', partitive: 'työtä', nominativePlural: 'työt', partitivePlural: 'töitä', translation: 'work', rule: 'two-vowels', hint: 'työ → työ + tä', hintPlural: 'työt → tö + itä' },
  { nominative: 'yö', partitive: 'yötä', nominativePlural: 'yöt', partitivePlural: 'öitä', translation: 'night', rule: 'two-vowels', hint: 'yö → yö + tä', hintPlural: 'yöt → ö + itä' },
  { nominative: 'vapaa', partitive: 'vapaata', nominativePlural: 'vapaat', partitivePlural: 'vapaita', translation: 'free', rule: 'two-vowels', hint: 'vapaa → vapaa + ta', hintPlural: 'vapaat → vapa + ita' },
  { nominative: 'tie', partitive: 'tietä', nominativePlural: 'tiet', partitivePlural: 'teitä', translation: 'road', rule: 'two-vowels', hint: 'tie → tie + tä', hintPlural: 'tiet → te + itä' },
  { nominative: 'suo', partitive: 'suota', nominativePlural: 'suot', partitivePlural: 'soita', translation: 'swamp', rule: 'two-vowels', hint: 'suo → suo + ta', hintPlural: 'suot → so + ita' },
  // Different vowels (-ea, -eä, -ia, etc.) → add -a/-ä
  { nominative: 'korkea', partitive: 'korkeaa', nominativePlural: 'korkeat', partitivePlural: 'korkeita', translation: 'high/tall', rule: 'two-vowels', hint: 'korkea → korkea + a', hintPlural: 'korkeat → korke + ita' },
  { nominative: 'vaikea', partitive: 'vaikeaa', nominativePlural: 'vaikeat', partitivePlural: 'vaikeita', translation: 'difficult', rule: 'two-vowels', hint: 'vaikea → vaikea + a', hintPlural: 'vaikeat → vaike + ita' },
  { nominative: 'tärkeä', partitive: 'tärkeää', nominativePlural: 'tärkeät', partitivePlural: 'tärkeitä', translation: 'important', rule: 'two-vowels', hint: 'tärkeä → tärkeä + ä', hintPlural: 'tärkeät → tärke + itä' },
  { nominative: 'oikea', partitive: 'oikeaa', nominativePlural: 'oikeat', partitivePlural: 'oikeita', translation: 'right/correct', rule: 'two-vowels', hint: 'oikea → oikea + a', hintPlural: 'oikeat → oike + ita' },
  { nominative: 'vihreä', partitive: 'vihreää', nominativePlural: 'vihreät', partitivePlural: 'vihreitä', translation: 'green', rule: 'two-vowels', hint: 'vihreä → vihreä + ä', hintPlural: 'vihreät → vihre + itä' },
  { nominative: 'idea', partitive: 'ideaa', nominativePlural: 'ideat', partitivePlural: 'ideoita', translation: 'idea', rule: 'two-vowels', hint: 'idea → idea + a', hintPlural: 'ideat → ideo + ita' },
  { nominative: 'ruskea', partitive: 'ruskeaa', nominativePlural: 'ruskeat', partitivePlural: 'ruskeita', translation: 'brown', rule: 'two-vowels', hint: 'ruskea → ruskea + a', hintPlural: 'ruskeat → ruske + ita' },
  
  // === NEW -i WORDS (loanwords/modern words) → add -a/-ä ===
  { nominative: 'bussi', partitive: 'bussia', nominativePlural: 'bussit', partitivePlural: 'busseja', translation: 'bus', rule: 'new-i', hint: 'bussi → bussi + a', hintPlural: 'bussit → busse + ja' },
  { nominative: 'taksi', partitive: 'taksia', nominativePlural: 'taksit', partitivePlural: 'takseja', translation: 'taxi', rule: 'new-i', hint: 'taksi → taksi + a', hintPlural: 'taksit → takse + ja' },
  { nominative: 'pankki', partitive: 'pankkia', nominativePlural: 'pankit', partitivePlural: 'pankkeja', translation: 'bank', rule: 'new-i', hint: 'pankki → pankki + a', hintPlural: 'pankit → pankke + ja' },
  { nominative: 'hotelli', partitive: 'hotellia', nominativePlural: 'hotellit', partitivePlural: 'hotelleja', translation: 'hotel', rule: 'new-i', hint: 'hotelli → hotelli + a', hintPlural: 'hotellit → hotelle + ja' },
  { nominative: 'posti', partitive: 'postia', nominativePlural: 'postit', partitivePlural: 'posteja', translation: 'post/mail', rule: 'new-i', hint: 'posti → posti + a', hintPlural: 'postit → poste + ja' },
  { nominative: 'paperi', partitive: 'paperia', nominativePlural: 'paperit', partitivePlural: 'papereita', translation: 'paper', rule: 'new-i', hint: 'paperi → paperi + a', hintPlural: 'paperit → papere + ita' },
  { nominative: 'professori', partitive: 'professoria', nominativePlural: 'professorit', partitivePlural: 'professoreita', translation: 'professor', rule: 'new-i', hint: 'professori → professori + a', hintPlural: 'professorit → professore + ita' },
  { nominative: 'musiikki', partitive: 'musiikkia', nominativePlural: 'musiikit', partitivePlural: 'musiikkeja', translation: 'music', rule: 'new-i', hint: 'musiikki → musiikki + a', hintPlural: 'musiikit → musiikke + ja' },
  { nominative: 'kahvi', partitive: 'kahvia', nominativePlural: 'kahvit', partitivePlural: 'kahveja', translation: 'coffee', rule: 'new-i', hint: 'kahvi → kahvi + a', hintPlural: 'kahvit → kahve + ja' },
  { nominative: 'banaani', partitive: 'banaania', nominativePlural: 'banaanit', partitivePlural: 'banaaneja', translation: 'banana', rule: 'new-i', hint: 'banaani → banaani + a', hintPlural: 'banaanit → banaane + ja' },
  { nominative: 'tomaatti', partitive: 'tomaattia', nominativePlural: 'tomaatit', partitivePlural: 'tomaatteja', translation: 'tomato', rule: 'new-i', hint: 'tomaatti → tomaatti + a', hintPlural: 'tomaatit → tomaatte + ja' },
  { nominative: 'appelsiini', partitive: 'appelsiinia', nominativePlural: 'appelsiinit', partitivePlural: 'appelsiineja', translation: 'orange (fruit)', rule: 'new-i', hint: 'appelsiini → appelsiini + a', hintPlural: 'appelsiinit → appelsine + ja' },
  { nominative: 'oranssi', partitive: 'oranssia', nominativePlural: 'oranssit', partitivePlural: 'oransseja', translation: 'orange (color)', rule: 'new-i', hint: 'oranssi → oranssi + a', hintPlural: 'oranssit → oransse + ja' },
  { nominative: 'normaali', partitive: 'normaalia', nominativePlural: 'normaalit', partitivePlural: 'normaaleja', translation: 'normal', rule: 'new-i', hint: 'normaali → normaali + a', hintPlural: 'normaalit → normaale + ja' },
  
  // === OLD -i WORDS → stem changes, -i becomes -e- or drops ===
  { nominative: 'vesi', partitive: 'vettä', nominativePlural: 'vedet', partitivePlural: 'vesiä', translation: 'water', rule: 'old-i', hint: 'vet- + tä (si→t doubles)', hintPlural: 'vedet → ves + iä' },
  { nominative: 'meri', partitive: 'merta', nominativePlural: 'meret', partitivePlural: 'meriä', translation: 'sea', rule: 'old-i', hint: 'mer- + ta', hintPlural: 'meret → mer + iä' },
  { nominative: 'veri', partitive: 'verta', nominativePlural: 'veret', partitivePlural: 'veriä', translation: 'blood', rule: 'old-i', hint: 'ver- + ta', hintPlural: 'veret → ver + iä' },
  { nominative: 'ovi', partitive: 'ovea', nominativePlural: 'ovet', partitivePlural: 'ovia', translation: 'door', rule: 'old-i', hint: 'ove- + a (i→e)', hintPlural: 'ovet → ov + ia' },
  { nominative: 'järvi', partitive: 'järveä', nominativePlural: 'järvet', partitivePlural: 'järviä', translation: 'lake', rule: 'old-i', hint: 'järve- + ä (i→e)', hintPlural: 'järvet → järv + iä' },
  { nominative: 'joki', partitive: 'jokea', nominativePlural: 'joet', partitivePlural: 'jokia', translation: 'river', rule: 'old-i', hint: 'joke- + a (i→e)', hintPlural: 'joet → jok + ia' },
  { nominative: 'kivi', partitive: 'kiveä', nominativePlural: 'kivet', partitivePlural: 'kiviä', translation: 'stone', rule: 'old-i', hint: 'kive- + ä (i→e)', hintPlural: 'kivet → kiv + iä' },
  { nominative: 'lehti', partitive: 'lehteä', nominativePlural: 'lehdet', partitivePlural: 'lehtiä', translation: 'leaf/newspaper', rule: 'old-i', hint: 'lehte- + ä (i→e)', hintPlural: 'lehdet → leht + iä' },
  { nominative: 'pilvi', partitive: 'pilveä', nominativePlural: 'pilvet', partitivePlural: 'pilviä', translation: 'cloud', rule: 'old-i', hint: 'pilve- + ä (i→e)', hintPlural: 'pilvet → pilv + iä' },
  { nominative: 'talvi', partitive: 'talvea', nominativePlural: 'talvet', partitivePlural: 'talvia', translation: 'winter', rule: 'old-i', hint: 'talve- + a (i→e)', hintPlural: 'talvet → talv + ia' },
  { nominative: 'pieni', partitive: 'pientä', nominativePlural: 'pienet', partitivePlural: 'pieniä', translation: 'small', rule: 'old-i', hint: 'pien- + tä', hintPlural: 'pienet → pien + iä' },
  { nominative: 'uusi', partitive: 'uutta', nominativePlural: 'uudet', partitivePlural: 'uusia', translation: 'new', rule: 'old-i', hint: 'uut- + ta (stem change)', hintPlural: 'uudet → uus + ia' },
  { nominative: 'vuosi', partitive: 'vuotta', nominativePlural: 'vuodet', partitivePlural: 'vuosia', translation: 'year', rule: 'old-i', hint: 'vuot- + ta (stem change)', hintPlural: 'vuodet → vuos + ia' },
  { nominative: 'käsi', partitive: 'kättä', nominativePlural: 'kädet', partitivePlural: 'käsiä', translation: 'hand', rule: 'old-i', hint: 'kät- + tä (stem change)', hintPlural: 'kädet → käs + iä' },
  { nominative: 'susi', partitive: 'sutta', nominativePlural: 'sudet', partitivePlural: 'susia', translation: 'wolf', rule: 'old-i', hint: 'sut- + ta (stem change)', hintPlural: 'sudet → sus + ia' },
  { nominative: 'nuori', partitive: 'nuorta', nominativePlural: 'nuoret', partitivePlural: 'nuoria', translation: 'young', rule: 'old-i', hint: 'nuor- + ta', hintPlural: 'nuoret → nuor + ia' },
  
  // === -e ENDING WORDS → add -tta/-ttä ===
  { nominative: 'huone', partitive: 'huonetta', nominativePlural: 'huoneet', partitivePlural: 'huoneita', translation: 'room', rule: 'e-ending', hint: 'huone → huone + tta', hintPlural: 'huoneet → huone + ita' },
  { nominative: 'perhe', partitive: 'perhettä', nominativePlural: 'perheet', partitivePlural: 'perheitä', translation: 'family', rule: 'e-ending', hint: 'perhe → perhe + ttä', hintPlural: 'perheet → perhe + itä' },
  { nominative: 'osoite', partitive: 'osoitetta', nominativePlural: 'osoitteet', partitivePlural: 'osoitteita', translation: 'address', rule: 'e-ending', hint: 'osoite → osoite + tta', hintPlural: 'osoitteet → osoitte + ita' },
  { nominative: 'kone', partitive: 'konetta', nominativePlural: 'koneet', partitivePlural: 'koneita', translation: 'machine', rule: 'e-ending', hint: 'kone → kone + tta', hintPlural: 'koneet → kone + ita' },
  { nominative: 'vuode', partitive: 'vuodetta', nominativePlural: 'vuoteet', partitivePlural: 'vuoteita', translation: 'bed', rule: 'e-ending', hint: 'vuode → vuode + tta', hintPlural: 'vuoteet → vuote + ita' },
  { nominative: 'lause', partitive: 'lausetta', nominativePlural: 'lauseet', partitivePlural: 'lauseita', translation: 'sentence', rule: 'e-ending', hint: 'lause → lause + tta', hintPlural: 'lauseet → lause + ita' },
  { nominative: 'vaate', partitive: 'vaatetta', nominativePlural: 'vaatteet', partitivePlural: 'vaatteita', translation: 'clothing', rule: 'e-ending', hint: 'vaate → vaate + tta', hintPlural: 'vaatteet → vaatte + ita' },
  { nominative: 'kappale', partitive: 'kappaletta', nominativePlural: 'kappaleet', partitivePlural: 'kappaleita', translation: 'piece/chapter', rule: 'e-ending', hint: 'kappale → kappale + tta', hintPlural: 'kappaleet → kappale + ita' },
  { nominative: 'tuote', partitive: 'tuotetta', nominativePlural: 'tuotteet', partitivePlural: 'tuotteita', translation: 'product', rule: 'e-ending', hint: 'tuote → tuote + tta', hintPlural: 'tuotteet → tuotte + ita' },
  { nominative: 'koe', partitive: 'koetta', nominativePlural: 'kokeet', partitivePlural: 'kokeita', translation: 'test/exam', rule: 'e-ending', hint: 'koe → koe + tta', hintPlural: 'kokeet → koke + ita' },
  { nominative: 'kirje', partitive: 'kirjettä', nominativePlural: 'kirjeet', partitivePlural: 'kirjeitä', translation: 'letter', rule: 'e-ending', hint: 'kirje → kirje + ttä', hintPlural: 'kirjeet → kirje + itä' },
  { nominative: 'käsite', partitive: 'käsitettä', nominativePlural: 'käsitteet', partitivePlural: 'käsitteitä', translation: 'concept', rule: 'e-ending', hint: 'käsite → käsite + ttä', hintPlural: 'käsitteet → käsitte + itä' },
  
  // === CONSONANT ENDING (-s, -n, -l, -r, -t) → add -ta/-tä ===
  { nominative: 'kysymys', partitive: 'kysymystä', nominativePlural: 'kysymykset', partitivePlural: 'kysymyksiä', translation: 'question', rule: 'consonant', hint: 'kysymys → kysymys + tä', hintPlural: 'kysymykset → kysymyks + iä' },
  { nominative: 'vastaus', partitive: 'vastausta', nominativePlural: 'vastaukset', partitivePlural: 'vastauksia', translation: 'answer', rule: 'consonant', hint: 'vastaus → vastaus + ta', hintPlural: 'vastaukset → vastauks + ia' },
  { nominative: 'ajatus', partitive: 'ajatusta', nominativePlural: 'ajatukset', partitivePlural: 'ajatuksia', translation: 'thought', rule: 'consonant', hint: 'ajatus → ajatus + ta', hintPlural: 'ajatukset → ajatuks + ia' },
  { nominative: 'rakkaus', partitive: 'rakkautta', nominativePlural: 'rakkaudet', partitivePlural: 'rakkauksia', translation: 'love', rule: 'consonant', hint: 'rakkaut- + ta (stem change)', hintPlural: 'rakkaudet → rakkauks + ia' },
  { nominative: 'ystävyys', partitive: 'ystävyyttä', nominativePlural: 'ystävyydet', partitivePlural: 'ystävyyksiä', translation: 'friendship', rule: 'consonant', hint: 'ystävyyt- + tä (stem change)', hintPlural: 'ystävyydet → ystävyyks + iä' },
  { nominative: 'totuus', partitive: 'totuutta', nominativePlural: 'totuudet', partitivePlural: 'totuuksia', translation: 'truth', rule: 'consonant', hint: 'totuut- + ta (stem change)', hintPlural: 'totuudet → totuuks + ia' },
  { nominative: 'olut', partitive: 'olutta', nominativePlural: 'oluet', partitivePlural: 'oluita', translation: 'beer', rule: 'consonant', hint: 'olut- + ta', hintPlural: 'oluet → olu + ita' },
  { nominative: 'kaunis', partitive: 'kaunista', nominativePlural: 'kauniit', partitivePlural: 'kauniita', translation: 'beautiful', rule: 'consonant', hint: 'kauniis- + ta', hintPlural: 'kauniit → kaunii + ta' },
  { nominative: 'puhelin', partitive: 'puhelinta', nominativePlural: 'puhelimet', partitivePlural: 'puhelimia', translation: 'phone', rule: 'consonant', hint: 'puhelin- + ta', hintPlural: 'puhelimet → puhelim + ia' },
  { nominative: 'sydän', partitive: 'sydäntä', nominativePlural: 'sydämet', partitivePlural: 'sydämiä', translation: 'heart', rule: 'consonant', hint: 'sydän- + tä', hintPlural: 'sydämet → sydäm + iä' },
  { nominative: 'avain', partitive: 'avainta', nominativePlural: 'avaimet', partitivePlural: 'avaimia', translation: 'key', rule: 'consonant', hint: 'avain- + ta', hintPlural: 'avaimet → avaim + ia' },
  { nominative: 'askel', partitive: 'askelta', nominativePlural: 'askeleet', partitivePlural: 'askelia', translation: 'step', rule: 'consonant', hint: 'askel- + ta', hintPlural: 'askeleet → askel + ia' },
  { nominative: 'sairas', partitive: 'sairasta', nominativePlural: 'sairaat', partitivePlural: 'sairaita', translation: 'sick', rule: 'consonant', hint: 'sairas- + ta', hintPlural: 'sairaat → saira + ita' },
  { nominative: 'rikas', partitive: 'rikasta', nominativePlural: 'rikkaat', partitivePlural: 'rikkaita', translation: 'rich', rule: 'consonant', hint: 'rikas- + ta', hintPlural: 'rikkaat → rikka + ita' },
  
  // === -nen ENDING WORDS → -nen becomes -s + -ta/-tä ===
  // ONLY words that actually end in -nen go here!
  { nominative: 'nainen', partitive: 'naista', nominativePlural: 'naiset', partitivePlural: 'naisia', translation: 'woman', rule: 'nen-ending', hint: 'nais- + ta (nen→s)', hintPlural: 'naiset → nais + ia' },
  { nominative: 'ihminen', partitive: 'ihmistä', nominativePlural: 'ihmiset', partitivePlural: 'ihmisiä', translation: 'human/person', rule: 'nen-ending', hint: 'ihmis- + tä (nen→s)', hintPlural: 'ihmiset → ihmis + iä' },
  { nominative: 'suomalainen', partitive: 'suomalaista', nominativePlural: 'suomalaiset', partitivePlural: 'suomalaisia', translation: 'Finnish (person)', rule: 'nen-ending', hint: 'suomalais- + ta (nen→s)', hintPlural: 'suomalaiset → suomalais + ia' },
  { nominative: 'punainen', partitive: 'punaista', nominativePlural: 'punaiset', partitivePlural: 'punaisia', translation: 'red', rule: 'nen-ending', hint: 'punais- + ta (nen→s)', hintPlural: 'punaiset → punais + ia' },
  { nominative: 'sininen', partitive: 'sinistä', nominativePlural: 'siniset', partitivePlural: 'sinisiä', translation: 'blue', rule: 'nen-ending', hint: 'sinis- + tä (nen→s)', hintPlural: 'siniset → sinis + iä' },
  { nominative: 'valkoinen', partitive: 'valkoista', nominativePlural: 'valkoiset', partitivePlural: 'valkoisia', translation: 'white', rule: 'nen-ending', hint: 'valkois- + ta (nen→s)', hintPlural: 'valkoiset → valkois + ia' },
  { nominative: 'keltainen', partitive: 'keltaista', nominativePlural: 'keltaiset', partitivePlural: 'keltaisia', translation: 'yellow', rule: 'nen-ending', hint: 'keltais- + ta (nen→s)', hintPlural: 'keltaiset → keltais + ia' },
  { nominative: 'ensimmäinen', partitive: 'ensimmäistä', nominativePlural: 'ensimmäiset', partitivePlural: 'ensimmäisiä', translation: 'first', rule: 'nen-ending', hint: 'ensimmäis- + tä (nen→s)', hintPlural: 'ensimmäiset → ensimmäis + iä' },
  { nominative: 'viimeinen', partitive: 'viimeistä', nominativePlural: 'viimeiset', partitivePlural: 'viimeisiä', translation: 'last', rule: 'nen-ending', hint: 'viimeis- + tä (nen→s)', hintPlural: 'viimeiset → viimeis + iä' },
  { nominative: 'edellinen', partitive: 'edellistä', nominativePlural: 'edelliset', partitivePlural: 'edellisiä', translation: 'previous', rule: 'nen-ending', hint: 'edellis- + tä (nen→s)', hintPlural: 'edelliset → edellis + iä' },
  { nominative: 'tavallinen', partitive: 'tavallista', nominativePlural: 'tavalliset', partitivePlural: 'tavallisia', translation: 'ordinary/usual', rule: 'nen-ending', hint: 'tavallis- + ta (nen→s)', hintPlural: 'tavalliset → tavallis + ia' },
  { nominative: 'onnellinen', partitive: 'onnellista', nominativePlural: 'onnelliset', partitivePlural: 'onnellisia', translation: 'happy', rule: 'nen-ending', hint: 'onnellis- + ta (nen→s)', hintPlural: 'onnelliset → onnellis + ia' },
  { nominative: 'surullinen', partitive: 'surullista', nominativePlural: 'surulliset', partitivePlural: 'surullisia', translation: 'sad', rule: 'nen-ending', hint: 'surullis- + ta (nen→s)', hintPlural: 'surulliset → surullis + ia' },
  { nominative: 'kaukainen', partitive: 'kaukaista', nominativePlural: 'kaukaiset', partitivePlural: 'kaukaisia', translation: 'distant', rule: 'nen-ending', hint: 'kaukais- + ta (nen→s)', hintPlural: 'kaukaiset → kaukais + ia' },
  { nominative: 'läheinen', partitive: 'läheistä', nominativePlural: 'läheiset', partitivePlural: 'läheisiä', translation: 'close/near', rule: 'nen-ending', hint: 'läheis- + tä (nen→s)', hintPlural: 'läheiset → läheis + iä' },
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
