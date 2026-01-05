// Finnish Word Stems (Vartalo) Data
// The stem is the base form used for declining words in different cases
// Found by removing the ending from genitive singular
// Example: talo → talon → stem is "talo", pöytä → pöydän → stem is "pöydä"

export type StemRule = 
  | 'no-change'           // Stem = nominative (talo → talo)
  | 'consonant-gradation' // Stem has consonant gradation (pöytä → pöydä, kauppa → kaupa)
  | 'old-i-to-e'          // Old -i words: i → e (ovi → ove, vesi → vede)
  | 'e-doubling'          // -e words: e doubles (huone → huonee)
  | 'nen-to-se'           // -nen words: nen → se (nainen → naise)
  | 'consonant-stem'      // Words ending in consonant have vowel stem (vastaus → vastaukse)
  | 's-to-kse'            // -us/-ys words: s → kse (vastaus → vastaukse)
  | 's-to-de'             // -s words: s → de (vesi → vede, uusi → uude)
  | 'n-to-me'             // -in/-an words: add -me (avain → avaime)
  | 'special';            // Irregular or special patterns

export interface StemWord {
  nominative: string;       // Base form (dictionary form)
  stem: string;             // The vowel stem
  translation: string;
  rule: StemRule;
  hint?: string;            // Formation hint
  genitive?: string;        // Optional: full genitive for reference
}

export interface StemRuleInfo {
  id: StemRule;
  name: string;
  finnishName: string;
  description: string;
  formation: string;
  examples: string[];
  color: string;
}

export const STEM_RULES: StemRuleInfo[] = [
  {
    id: 'no-change',
    name: 'No Change',
    finnishName: 'Ei muutosta',
    description: 'Stem is the same as nominative',
    formation: 'Stem = nominative form',
    examples: ['talo → talo', 'koira → koira', 'auto → auto'],
    color: '#4a9eff',
  },
  {
    id: 'consonant-gradation',
    name: 'Consonant Gradation',
    finnishName: 'Astevaihtelu',
    description: 'Strong-weak gradation: pp→p, tt→t, kk→k, p→v, t→d, k→∅',
    formation: 'Apply consonant gradation to find stem',
    examples: ['pöytä → pöydä (t→d)', 'kauppa → kaupa (pp→p)', 'aika → aja (k→∅)'],
    color: '#e74c3c',
  },
  {
    id: 'old-i-to-e',
    name: 'Old -i to -e',
    finnishName: 'Vanha i → e',
    description: 'Traditional Finnish -i words change to -e stem',
    formation: 'Change final -i to -e (may include gradation)',
    examples: ['ovi → ove', 'järvi → järve', 'vesi → vede'],
    color: '#9b59b6',
  },
  {
    id: 'e-doubling',
    name: '-e Doubling',
    finnishName: 'E-loppu',
    description: 'Words ending in -e double the e in stem',
    formation: 'Double the final -e',
    examples: ['huone → huonee', 'perhe → perhee', 'kone → konee'],
    color: '#27ae60',
  },
  {
    id: 'nen-to-se',
    name: '-nen to -se',
    finnishName: 'Nen → se',
    description: 'Words ending in -nen change to -se stem',
    formation: 'Change -nen to -se',
    examples: ['nainen → naise', 'punainen → punaise', 'ihminen → ihmise'],
    color: '#1abc9c',
  },
  {
    id: 's-to-kse',
    name: '-us/-ys to -kse',
    finnishName: 'Us/ys → kse',
    description: 'Abstract nouns ending in -us/-ys',
    formation: 'Change -s to -kse',
    examples: ['vastaus → vastaukse', 'kysymys → kysymykse', 'ajatus → ajatukse'],
    color: '#f39c12',
  },
  {
    id: 's-to-de',
    name: '-si to -de',
    finnishName: 'Si → de',
    description: 'Old words with -si ending',
    formation: 'Change -si to -de',
    examples: ['vesi → vede', 'uusi → uude', 'käsi → käde'],
    color: '#ff7b4a',
  },
  {
    id: 'n-to-me',
    name: '-in/-än to -ime/-äme',
    finnishName: 'In/än → ime/äme',
    description: 'Words ending in -in/-an/-än',
    formation: 'Change ending to -ime/-ame/-äme',
    examples: ['avain → avaime', 'puhelin → puhelime', 'sydän → sydäme'],
    color: '#3498db',
  },
  {
    id: 'consonant-stem',
    name: 'Consonant Ending',
    finnishName: 'Konsonanttiloppuinen',
    description: 'Various consonant-ending words with vowel stems',
    formation: 'Add appropriate vowel to form stem',
    examples: ['kaunis → kaunii', 'rikas → rikkaa', 'opas → oppaa'],
    color: '#8e44ad',
  },
  {
    id: 'special',
    name: 'Special/Irregular',
    finnishName: 'Erikoiset',
    description: 'Words with irregular or unique stem patterns',
    formation: 'Learn individually',
    examples: ['lapsi → lapse', 'mies → miehe', 'kevät → kevää'],
    color: '#e91e63',
  },
];

// Comprehensive word list organized by stem formation rule
export const STEM_WORDS: StemWord[] = [
  // === NO CHANGE (stem = nominative) ===
  { nominative: 'talo', stem: 'talo', translation: 'house', rule: 'no-change', hint: 'No change needed', genitive: 'talon' },
  { nominative: 'koira', stem: 'koira', translation: 'dog', rule: 'no-change', hint: 'No change needed', genitive: 'koiran' },
  { nominative: 'auto', stem: 'auto', translation: 'car', rule: 'no-change', hint: 'No change needed', genitive: 'auton' },
  { nominative: 'kissa', stem: 'kissa', translation: 'cat', rule: 'no-change', hint: 'No change needed', genitive: 'kissan' },
  { nominative: 'kirja', stem: 'kirja', translation: 'book', rule: 'no-change', hint: 'No change needed', genitive: 'kirjan' },
  { nominative: 'sana', stem: 'sana', translation: 'word', rule: 'no-change', hint: 'No change needed', genitive: 'sanan' },
  { nominative: 'hedelmä', stem: 'hedelmä', translation: 'fruit', rule: 'no-change', hint: 'No change needed', genitive: 'hedelmän' },
  { nominative: 'opettaja', stem: 'opettaja', translation: 'teacher', rule: 'no-change', hint: 'No change needed', genitive: 'opettajan' },
  { nominative: 'ikkuna', stem: 'ikkuna', translation: 'window', rule: 'no-change', hint: 'No change needed', genitive: 'ikkunan' },
  { nominative: 'silmä', stem: 'silmä', translation: 'eye', rule: 'no-change', hint: 'No change needed', genitive: 'silmän' },
  { nominative: 'bussi', stem: 'bussi', translation: 'bus', rule: 'no-change', hint: 'No change (new -i word)', genitive: 'bussin' },
  { nominative: 'taksi', stem: 'taksi', translation: 'taxi', rule: 'no-change', hint: 'No change (new -i word)', genitive: 'taksin' },
  { nominative: 'kahvi', stem: 'kahvi', translation: 'coffee', rule: 'no-change', hint: 'No change (new -i word)', genitive: 'kahvin' },
  { nominative: 'paperi', stem: 'paperi', translation: 'paper', rule: 'no-change', hint: 'No change (new -i word)', genitive: 'paperin' },
  { nominative: 'hotelli', stem: 'hotelli', translation: 'hotel', rule: 'no-change', hint: 'No change (new -i word)', genitive: 'hotellin' },
  { nominative: 'maa', stem: 'maa', translation: 'country/land', rule: 'no-change', hint: 'No change (long vowel)', genitive: 'maan' },
  { nominative: 'puu', stem: 'puu', translation: 'tree/wood', rule: 'no-change', hint: 'No change (long vowel)', genitive: 'puun' },
  { nominative: 'työ', stem: 'työ', translation: 'work', rule: 'no-change', hint: 'No change (diphthong)', genitive: 'työn' },
  { nominative: 'yö', stem: 'yö', translation: 'night', rule: 'no-change', hint: 'No change (long vowel)', genitive: 'yön' },
  { nominative: 'tie', stem: 'tie', translation: 'road', rule: 'no-change', hint: 'No change (diphthong)', genitive: 'tien' },
  { nominative: 'suo', stem: 'suo', translation: 'swamp', rule: 'no-change', hint: 'No change (diphthong)', genitive: 'suon' },
  { nominative: 'vapaa', stem: 'vapaa', translation: 'free', rule: 'no-change', hint: 'No change (long vowel)', genitive: 'vapaan' },
  { nominative: 'korkea', stem: 'korkea', translation: 'high/tall', rule: 'no-change', hint: 'No change (ends in -ea)', genitive: 'korkean' },
  { nominative: 'vaikea', stem: 'vaikea', translation: 'difficult', rule: 'no-change', hint: 'No change (ends in -ea)', genitive: 'vaikean' },
  { nominative: 'tärkeä', stem: 'tärkeä', translation: 'important', rule: 'no-change', hint: 'No change (ends in -eä)', genitive: 'tärkeän' },
  { nominative: 'idea', stem: 'idea', translation: 'idea', rule: 'no-change', hint: 'No change (ends in -ea)', genitive: 'idean' },
  { nominative: 'asia', stem: 'asia', translation: 'matter/thing', rule: 'no-change', hint: 'No change needed', genitive: 'asian' },
  { nominative: 'peruna', stem: 'peruna', translation: 'potato', rule: 'no-change', hint: 'No change needed', genitive: 'perunan' },
  { nominative: 'tomaatti', stem: 'tomaatti', translation: 'tomato', rule: 'no-change', hint: 'No change needed', genitive: 'tomaatin' },
  { nominative: 'appelsiini', stem: 'appelsiini', translation: 'orange', rule: 'no-change', hint: 'No change needed', genitive: 'appelsiinin' },

  // === CONSONANT GRADATION ===
  // tt → t
  { nominative: 'pöytä', stem: 'pöydä', translation: 'table', rule: 'consonant-gradation', hint: 't → d', genitive: 'pöydän' },
  { nominative: 'katto', stem: 'kato', translation: 'roof/ceiling', rule: 'consonant-gradation', hint: 'tt → t', genitive: 'katon' },
  { nominative: 'matto', stem: 'mato', translation: 'carpet', rule: 'consonant-gradation', hint: 'tt → t', genitive: 'maton' },
  { nominative: 'hattu', stem: 'hatu', translation: 'hat', rule: 'consonant-gradation', hint: 'tt → t', genitive: 'hatun' },
  { nominative: 'lautanen', stem: 'lautase', translation: 'plate', rule: 'consonant-gradation', hint: 'nen → se', genitive: 'lautasen' },
  // pp → p
  { nominative: 'kauppa', stem: 'kaupa', translation: 'shop', rule: 'consonant-gradation', hint: 'pp → p', genitive: 'kaupan' },
  { nominative: 'kuppi', stem: 'kupi', translation: 'cup', rule: 'consonant-gradation', hint: 'pp → p', genitive: 'kupin' },
  { nominative: 'nappi', stem: 'napi', translation: 'button', rule: 'consonant-gradation', hint: 'pp → p', genitive: 'napin' },
  { nominative: 'lippu', stem: 'lipu', translation: 'ticket/flag', rule: 'consonant-gradation', hint: 'pp → p', genitive: 'lipun' },
  { nominative: 'sappi', stem: 'sapi', translation: 'bile/gall', rule: 'consonant-gradation', hint: 'pp → p', genitive: 'sapin' },
  // kk → k
  { nominative: 'kukka', stem: 'kuka', translation: 'flower', rule: 'consonant-gradation', hint: 'kk → k', genitive: 'kukan' },
  { nominative: 'pankki', stem: 'panki', translation: 'bank', rule: 'consonant-gradation', hint: 'kk → k', genitive: 'pankin' },
  { nominative: 'lakki', stem: 'laki', translation: 'cap', rule: 'consonant-gradation', hint: 'kk → k', genitive: 'lakin' },
  { nominative: 'paikka', stem: 'paika', translation: 'place', rule: 'consonant-gradation', hint: 'kk → k', genitive: 'paikan' },
  { nominative: 'kirkko', stem: 'kirko', translation: 'church', rule: 'consonant-gradation', hint: 'kk → k', genitive: 'kirkon' },
  { nominative: 'musiikki', stem: 'musiiki', translation: 'music', rule: 'consonant-gradation', hint: 'kk → k', genitive: 'musiikin' },
  { nominative: 'takki', stem: 'taki', translation: 'jacket', rule: 'consonant-gradation', hint: 'kk → k', genitive: 'takin' },
  { nominative: 'sukka', stem: 'suka', translation: 'sock', rule: 'consonant-gradation', hint: 'kk → k', genitive: 'sukan' },
  // p → v
  { nominative: 'leipä', stem: 'leivä', translation: 'bread', rule: 'consonant-gradation', hint: 'p → v', genitive: 'leivän' },
  { nominative: 'tapa', stem: 'tava', translation: 'habit/way', rule: 'consonant-gradation', hint: 'p → v', genitive: 'tavan' },
  { nominative: 'halpa', stem: 'halva', translation: 'cheap', rule: 'consonant-gradation', hint: 'p → v', genitive: 'halvan' },
  { nominative: 'apu', stem: 'avu', translation: 'help', rule: 'consonant-gradation', hint: 'p → v', genitive: 'avun' },
  { nominative: 'siipi', stem: 'siive', translation: 'wing', rule: 'consonant-gradation', hint: 'p → v, i → e', genitive: 'siiven' },
  // t → d
  { nominative: 'katu', stem: 'kadu', translation: 'street', rule: 'consonant-gradation', hint: 't → d', genitive: 'kadun' },
  { nominative: 'maito', stem: 'maido', translation: 'milk', rule: 'consonant-gradation', hint: 't → d', genitive: 'maidon' },
  { nominative: 'satu', stem: 'sadu', translation: 'fairytale', rule: 'consonant-gradation', hint: 't → d', genitive: 'sadun' },
  { nominative: 'pato', stem: 'pado', translation: 'dam', rule: 'consonant-gradation', hint: 't → d', genitive: 'padon' },
  { nominative: 'laatu', stem: 'laadu', translation: 'quality', rule: 'consonant-gradation', hint: 't → d', genitive: 'laadun' },
  { nominative: 'sato', stem: 'sado', translation: 'harvest', rule: 'consonant-gradation', hint: 't → d', genitive: 'sadon' },
  // k → ∅
  { nominative: 'aika', stem: 'aja', translation: 'time', rule: 'consonant-gradation', hint: 'k → ∅ (disappears)', genitive: 'ajan' },
  { nominative: 'poika', stem: 'poja', translation: 'boy', rule: 'consonant-gradation', hint: 'k → ∅ (disappears)', genitive: 'pojan' },
  { nominative: 'ruoka', stem: 'ruoa', translation: 'food', rule: 'consonant-gradation', hint: 'k → ∅ (disappears)', genitive: 'ruoan' },
  { nominative: 'lika', stem: 'lia', translation: 'dirt', rule: 'consonant-gradation', hint: 'k → ∅ (disappears)', genitive: 'lian' },
  { nominative: 'suku', stem: 'suvu', translation: 'family/clan', rule: 'consonant-gradation', hint: 'k → v', genitive: 'suvun' },
  { nominative: 'luku', stem: 'luvu', translation: 'number/chapter', rule: 'consonant-gradation', hint: 'k → v', genitive: 'luvun' },
  // nt → nn
  { nominative: 'ranta', stem: 'ranna', translation: 'beach/shore', rule: 'consonant-gradation', hint: 'nt → nn', genitive: 'rannan' },
  { nominative: 'kunta', stem: 'kunna', translation: 'municipality', rule: 'consonant-gradation', hint: 'nt → nn', genitive: 'kunnan' },
  { nominative: 'seinäntä', stem: 'seinännä', translation: 'wall section', rule: 'consonant-gradation', hint: 'nt → nn', genitive: 'seinännän' },
  // lt → ll
  { nominative: 'ilta', stem: 'illa', translation: 'evening', rule: 'consonant-gradation', hint: 'lt → ll', genitive: 'illan' },
  { nominative: 'kulta', stem: 'kulla', translation: 'gold', rule: 'consonant-gradation', hint: 'lt → ll', genitive: 'kullan' },
  { nominative: 'silta', stem: 'silla', translation: 'bridge', rule: 'consonant-gradation', hint: 'lt → ll', genitive: 'sillan' },
  // rt → rr
  { nominative: 'parta', stem: 'parra', translation: 'beard', rule: 'consonant-gradation', hint: 'rt → rr', genitive: 'parran' },
  // mp → mm
  { nominative: 'kampa', stem: 'kamma', translation: 'comb', rule: 'consonant-gradation', hint: 'mp → mm', genitive: 'kamman' },
  { nominative: 'kumpi', stem: 'kumma', translation: 'which (of two)', rule: 'consonant-gradation', hint: 'mp → mm', genitive: 'kumman' },

  // === OLD -I → -E WORDS ===
  { nominative: 'ovi', stem: 'ove', translation: 'door', rule: 'old-i-to-e', hint: 'i → e', genitive: 'oven' },
  { nominative: 'järvi', stem: 'järve', translation: 'lake', rule: 'old-i-to-e', hint: 'i → e', genitive: 'järven' },
  { nominative: 'kivi', stem: 'kive', translation: 'stone', rule: 'old-i-to-e', hint: 'i → e', genitive: 'kiven' },
  { nominative: 'pilvi', stem: 'pilve', translation: 'cloud', rule: 'old-i-to-e', hint: 'i → e', genitive: 'pilven' },
  { nominative: 'talvi', stem: 'talve', translation: 'winter', rule: 'old-i-to-e', hint: 'i → e', genitive: 'talven' },
  { nominative: 'meri', stem: 'mere', translation: 'sea', rule: 'old-i-to-e', hint: 'i → e', genitive: 'meren' },
  { nominative: 'niemi', stem: 'nieme', translation: 'cape/peninsula', rule: 'old-i-to-e', hint: 'i → e', genitive: 'niemen' },
  { nominative: 'nimi', stem: 'nime', translation: 'name', rule: 'old-i-to-e', hint: 'i → e', genitive: 'nimen' },
  { nominative: 'suuri', stem: 'suure', translation: 'big/large', rule: 'old-i-to-e', hint: 'i → e', genitive: 'suuren' },
  { nominative: 'pieni', stem: 'piene', translation: 'small', rule: 'old-i-to-e', hint: 'i → e', genitive: 'pienen' },
  { nominative: 'nuori', stem: 'nuore', translation: 'young', rule: 'old-i-to-e', hint: 'i → e', genitive: 'nuoren' },
  { nominative: 'tori', stem: 'tore', translation: 'market square', rule: 'old-i-to-e', hint: 'i → e', genitive: 'torin' },
  { nominative: 'tuuli', stem: 'tuule', translation: 'wind', rule: 'old-i-to-e', hint: 'i → e', genitive: 'tuulen' },
  { nominative: 'suoli', stem: 'suole', translation: 'intestine', rule: 'old-i-to-e', hint: 'i → e', genitive: 'suolen' },
  { nominative: 'huuli', stem: 'huule', translation: 'lip', rule: 'old-i-to-e', hint: 'i → e', genitive: 'huulen' },
  { nominative: 'sormi', stem: 'sorme', translation: 'finger', rule: 'old-i-to-e', hint: 'i → e', genitive: 'sormen' },
  { nominative: 'varsi', stem: 'varre', translation: 'stalk/handle', rule: 'old-i-to-e', hint: 'si → re', genitive: 'varren' },

  // === -E DOUBLING ===
  { nominative: 'huone', stem: 'huonee', translation: 'room', rule: 'e-doubling', hint: 'e → ee', genitive: 'huoneen' },
  { nominative: 'perhe', stem: 'perhee', translation: 'family', rule: 'e-doubling', hint: 'e → ee', genitive: 'perheen' },
  { nominative: 'kone', stem: 'konee', translation: 'machine', rule: 'e-doubling', hint: 'e → ee', genitive: 'koneen' },
  { nominative: 'lause', stem: 'lausee', translation: 'sentence', rule: 'e-doubling', hint: 'e → ee', genitive: 'lauseen' },
  { nominative: 'kirje', stem: 'kirjee', translation: 'letter', rule: 'e-doubling', hint: 'e → ee', genitive: 'kirjeen' },
  { nominative: 'piste', stem: 'pistee', translation: 'point/dot', rule: 'e-doubling', hint: 'e → ee', genitive: 'pisteen' },
  { nominative: 'liike', stem: 'liikkee', translation: 'business/movement', rule: 'e-doubling', hint: 'e → ee (k → kk)', genitive: 'liikkeen' },
  { nominative: 'osoite', stem: 'osoittee', translation: 'address', rule: 'e-doubling', hint: 'e → ee (t → tt)', genitive: 'osoitteen' },
  { nominative: 'vaate', stem: 'vaattee', translation: 'clothing', rule: 'e-doubling', hint: 'e → ee (t → tt)', genitive: 'vaatteen' },
  { nominative: 'tuote', stem: 'tuottee', translation: 'product', rule: 'e-doubling', hint: 'e → ee (t → tt)', genitive: 'tuotteen' },
  { nominative: 'vuode', stem: 'vuotee', translation: 'bed', rule: 'e-doubling', hint: 'e → ee (d → t)', genitive: 'vuoteen' },
  { nominative: 'side', stem: 'sitee', translation: 'bandage/bond', rule: 'e-doubling', hint: 'e → ee (d → t)', genitive: 'siteen' },
  { nominative: 'koe', stem: 'kokee', translation: 'test/exam', rule: 'e-doubling', hint: 'e → ee (∅ → k)', genitive: 'kokeen' },

  // === -NEN → -SE ===
  { nominative: 'nainen', stem: 'naise', translation: 'woman', rule: 'nen-to-se', hint: 'nen → se', genitive: 'naisen' },
  { nominative: 'ihminen', stem: 'ihmise', translation: 'human/person', rule: 'nen-to-se', hint: 'nen → se', genitive: 'ihmisen' },
  { nominative: 'suomalainen', stem: 'suomalaise', translation: 'Finnish (person)', rule: 'nen-to-se', hint: 'nen → se', genitive: 'suomalaisen' },
  { nominative: 'punainen', stem: 'punaise', translation: 'red', rule: 'nen-to-se', hint: 'nen → se', genitive: 'punaisen' },
  { nominative: 'sininen', stem: 'sinise', translation: 'blue', rule: 'nen-to-se', hint: 'nen → se', genitive: 'sinisen' },
  { nominative: 'valkoinen', stem: 'valkoise', translation: 'white', rule: 'nen-to-se', hint: 'nen → se', genitive: 'valkoisen' },
  { nominative: 'keltainen', stem: 'keltaise', translation: 'yellow', rule: 'nen-to-se', hint: 'nen → se', genitive: 'keltaisen' },
  { nominative: 'musta', stem: 'musta', translation: 'black', rule: 'no-change', hint: 'No change', genitive: 'mustan' },
  { nominative: 'vihreä', stem: 'vihreä', translation: 'green', rule: 'no-change', hint: 'No change', genitive: 'vihreän' },
  { nominative: 'harmaa', stem: 'harmaa', translation: 'gray', rule: 'no-change', hint: 'No change', genitive: 'harmaan' },
  { nominative: 'ensimmäinen', stem: 'ensimmäise', translation: 'first', rule: 'nen-to-se', hint: 'nen → se', genitive: 'ensimmäisen' },
  { nominative: 'viimeinen', stem: 'viimeise', translation: 'last', rule: 'nen-to-se', hint: 'nen → se', genitive: 'viimeisen' },
  { nominative: 'tavallinen', stem: 'tavallise', translation: 'ordinary/usual', rule: 'nen-to-se', hint: 'nen → se', genitive: 'tavallisen' },
  { nominative: 'onnellinen', stem: 'onnellise', translation: 'happy', rule: 'nen-to-se', hint: 'nen → se', genitive: 'onnellisen' },
  { nominative: 'erilainen', stem: 'erilaise', translation: 'different', rule: 'nen-to-se', hint: 'nen → se', genitive: 'erilaisen' },
  { nominative: 'samanlainen', stem: 'samanlaise', translation: 'similar', rule: 'nen-to-se', hint: 'nen → se', genitive: 'samanlaisen' },
  { nominative: 'utelias', stem: 'uteliaa', translation: 'curious', rule: 'consonant-stem', hint: 's → a + a', genitive: 'uteliaan' },
  { nominative: 'nukkuvainen', stem: 'nukkuvaise', translation: 'sleepy', rule: 'nen-to-se', hint: 'nen → se', genitive: 'nukkuvaisen' },
  { nominative: 'kiireinen', stem: 'kiireise', translation: 'busy', rule: 'nen-to-se', hint: 'nen → se', genitive: 'kiireisen' },
  { nominative: 'hiljainen', stem: 'hiljaise', translation: 'quiet', rule: 'nen-to-se', hint: 'nen → se', genitive: 'hiljaisen' },
  { nominative: 'nälkäinen', stem: 'nälkäise', translation: 'hungry', rule: 'nen-to-se', hint: 'nen → se', genitive: 'nälkäisen' },
  { nominative: 'janoinen', stem: 'janoise', translation: 'thirsty', rule: 'nen-to-se', hint: 'nen → se', genitive: 'janoisen' },
  { nominative: 'väsynyt', stem: 'väsynee', translation: 'tired', rule: 'special', hint: 'yt → ee', genitive: 'väsyneen' },

  // === -US/-YS → -KSE ===
  { nominative: 'vastaus', stem: 'vastaukse', translation: 'answer', rule: 's-to-kse', hint: 's → kse', genitive: 'vastauksen' },
  { nominative: 'kysymys', stem: 'kysymykse', translation: 'question', rule: 's-to-kse', hint: 's → kse', genitive: 'kysymyksen' },
  { nominative: 'ajatus', stem: 'ajatukse', translation: 'thought', rule: 's-to-kse', hint: 's → kse', genitive: 'ajatuksen' },
  { nominative: 'rakennus', stem: 'rakennukse', translation: 'building', rule: 's-to-kse', hint: 's → kse', genitive: 'rakennuksen' },
  { nominative: 'kokous', stem: 'kokoukse', translation: 'meeting', rule: 's-to-kse', hint: 's → kse', genitive: 'kokouksen' },
  { nominative: 'opetus', stem: 'opetukse', translation: 'teaching', rule: 's-to-kse', hint: 's → kse', genitive: 'opetuksen' },
  { nominative: 'asetus', stem: 'asetukse', translation: 'decree/setting', rule: 's-to-kse', hint: 's → kse', genitive: 'asetuksen' },
  { nominative: 'harjoitus', stem: 'harjoitukse', translation: 'exercise', rule: 's-to-kse', hint: 's → kse', genitive: 'harjoituksen' },
  { nominative: 'kertomus', stem: 'kertomukse', translation: 'story/narrative', rule: 's-to-kse', hint: 's → kse', genitive: 'kertomuksen' },
  { nominative: 'mahdollisuus', stem: 'mahdollisuukse', translation: 'possibility', rule: 's-to-kse', hint: 's → kse', genitive: 'mahdollisuuden' },
  { nominative: 'yritys', stem: 'yritykse', translation: 'company/attempt', rule: 's-to-kse', hint: 's → kse', genitive: 'yrityksen' },
  { nominative: 'palvelus', stem: 'palvelukse', translation: 'service/favor', rule: 's-to-kse', hint: 's → kse', genitive: 'palveluksen' },
  { nominative: 'sairaus', stem: 'sairaukse', translation: 'illness', rule: 's-to-kse', hint: 's → kse', genitive: 'sairauden' },
  { nominative: 'terveys', stem: 'terveykse', translation: 'health', rule: 's-to-kse', hint: 's → kse', genitive: 'terveyden' },

  // === -SI → -DE (OLD WORDS) ===
  { nominative: 'vesi', stem: 'vede', translation: 'water', rule: 's-to-de', hint: 'si → de', genitive: 'veden' },
  { nominative: 'käsi', stem: 'käde', translation: 'hand', rule: 's-to-de', hint: 'si → de', genitive: 'käden' },
  { nominative: 'vuosi', stem: 'vuode', translation: 'year', rule: 's-to-de', hint: 'si → de', genitive: 'vuoden' },
  { nominative: 'uusi', stem: 'uude', translation: 'new', rule: 's-to-de', hint: 'si → de', genitive: 'uuden' },
  { nominative: 'kuusi', stem: 'kuude', translation: 'six/spruce', rule: 's-to-de', hint: 'si → de', genitive: 'kuuden' },
  { nominative: 'täysi', stem: 'täyde', translation: 'full', rule: 's-to-de', hint: 'si → de', genitive: 'täyden' },
  { nominative: 'hirsi', stem: 'hirre', translation: 'log', rule: 's-to-de', hint: 'si → re', genitive: 'hirren' },
  { nominative: 'reisi', stem: 'reide', translation: 'thigh', rule: 's-to-de', hint: 'si → de', genitive: 'reiden' },

  // === -IN/-ÄN → -IME/-ÄME ===
  { nominative: 'avain', stem: 'avaime', translation: 'key', rule: 'n-to-me', hint: 'in → ime', genitive: 'avaimen' },
  { nominative: 'puhelin', stem: 'puhelime', translation: 'phone', rule: 'n-to-me', hint: 'in → ime', genitive: 'puhelimen' },
  { nominative: 'sydän', stem: 'sydäme', translation: 'heart', rule: 'n-to-me', hint: 'än → äme', genitive: 'sydämen' },
  { nominative: 'elin', stem: 'elime', translation: 'organ', rule: 'n-to-me', hint: 'in → ime', genitive: 'elimen' },
  { nominative: 'termin', stem: 'termine', translation: 'term', rule: 'n-to-me', hint: 'in → ine', genitive: 'terminin' },
  { nominative: 'kerroin', stem: 'kerroime', translation: 'multiplier', rule: 'n-to-me', hint: 'in → ime', genitive: 'kertoimen' },
  { nominative: 'onneton', stem: 'onnettoma', translation: 'unhappy', rule: 'consonant-stem', hint: 'on → oma', genitive: 'onnettoman' },
  { nominative: 'työtön', stem: 'työttömä', translation: 'unemployed', rule: 'consonant-stem', hint: 'ön → ömä', genitive: 'työttömän' },

  // === CONSONANT STEM (VARIOUS) ===
  { nominative: 'kaunis', stem: 'kaunii', translation: 'beautiful', rule: 'consonant-stem', hint: 's → i + i', genitive: 'kauniin' },
  { nominative: 'rikas', stem: 'rikkaa', translation: 'rich', rule: 'consonant-stem', hint: 's → a + a (k → kk)', genitive: 'rikkaan' },
  { nominative: 'opas', stem: 'oppaa', translation: 'guide', rule: 'consonant-stem', hint: 's → a + a (p → pp)', genitive: 'oppaan' },
  { nominative: 'sairas', stem: 'sairaa', translation: 'sick', rule: 'consonant-stem', hint: 's → a + a', genitive: 'sairaan' },
  { nominative: 'vieras', stem: 'vieraa', translation: 'guest/foreign', rule: 'consonant-stem', hint: 's → a + a', genitive: 'vieraan' },
  { nominative: 'askel', stem: 'askelee', translation: 'step', rule: 'consonant-stem', hint: 'l → lee', genitive: 'askeleen' },
  { nominative: 'sävel', stem: 'sävelee', translation: 'melody', rule: 'consonant-stem', hint: 'l → lee', genitive: 'sävelen' },
  { nominative: 'taival', stem: 'taipalee', translation: 'journey', rule: 'consonant-stem', hint: 'l → lee (v → p)', genitive: 'taipaleen' },
  { nominative: 'kevät', stem: 'kevää', translation: 'spring', rule: 'special', hint: 't → ä + ä', genitive: 'kevään' },
  { nominative: 'kesä', stem: 'kesä', translation: 'summer', rule: 'no-change', hint: 'No change', genitive: 'kesän' },
  { nominative: 'syksy', stem: 'syksy', translation: 'autumn', rule: 'no-change', hint: 'No change', genitive: 'syksyn' },
  { nominative: 'talvi', stem: 'talve', translation: 'winter', rule: 'old-i-to-e', hint: 'i → e', genitive: 'talven' },

  // === SPECIAL/IRREGULAR ===
  { nominative: 'lapsi', stem: 'lapse', translation: 'child', rule: 'special', hint: 'si → se', genitive: 'lapsen' },
  { nominative: 'mies', stem: 'miehe', translation: 'man', rule: 'special', hint: 's → he', genitive: 'miehen' },
  { nominative: 'vanhempi', stem: 'vanhemma', translation: 'parent/older', rule: 'special', hint: 'pi → mma', genitive: 'vanhemman' },
  { nominative: 'sisar', stem: 'sisare', translation: 'sister', rule: 'special', hint: 'r → re', genitive: 'sisaren' },
  { nominative: 'tytär', stem: 'tyttäre', translation: 'daughter', rule: 'special', hint: 'r → re', genitive: 'tyttären' },
  { nominative: 'ääni', stem: 'ääne', translation: 'sound/voice', rule: 'old-i-to-e', hint: 'i → e', genitive: 'äänen' },
  { nominative: 'lohi', stem: 'lohe', translation: 'salmon', rule: 'old-i-to-e', hint: 'i → e', genitive: 'lohen' },
  { nominative: 'joki', stem: 'joe', translation: 'river', rule: 'special', hint: 'ki → e', genitive: 'joen' },
  { nominative: 'lehti', stem: 'lehde', translation: 'leaf/newspaper', rule: 'special', hint: 'ti → de', genitive: 'lehden' },
  { nominative: 'lähti', stem: 'lähde', translation: 'spring/source', rule: 'special', hint: 'ti → de', genitive: 'lähteen' },

  // === MORE COMMON WORDS ===
  { nominative: 'opiskelija', stem: 'opiskelija', translation: 'student', rule: 'no-change', hint: 'No change', genitive: 'opiskelijan' },
  { nominative: 'työntekijä', stem: 'työntekijä', translation: 'employee', rule: 'no-change', hint: 'No change', genitive: 'työntekijän' },
  { nominative: 'lääkäri', stem: 'lääkäri', translation: 'doctor', rule: 'no-change', hint: 'No change (new -i)', genitive: 'lääkärin' },
  { nominative: 'sairaanhoitaja', stem: 'sairaanhoitaja', translation: 'nurse', rule: 'no-change', hint: 'No change', genitive: 'sairaanhoitajan' },
  { nominative: 'insinööri', stem: 'insinööri', translation: 'engineer', rule: 'no-change', hint: 'No change', genitive: 'insinöörin' },
  { nominative: 'ravintola', stem: 'ravintola', translation: 'restaurant', rule: 'no-change', hint: 'No change', genitive: 'ravintolan' },
  { nominative: 'sairaala', stem: 'sairaala', translation: 'hospital', rule: 'no-change', hint: 'No change', genitive: 'sairaalan' },
  { nominative: 'koulu', stem: 'koulu', translation: 'school', rule: 'no-change', hint: 'No change', genitive: 'koulun' },
  { nominative: 'yliopisto', stem: 'yliopisto', translation: 'university', rule: 'no-change', hint: 'No change', genitive: 'yliopiston' },
  { nominative: 'kirjasto', stem: 'kirjasto', translation: 'library', rule: 'no-change', hint: 'No change', genitive: 'kirjaston' },
  { nominative: 'kaupunki', stem: 'kaupungi', translation: 'city', rule: 'consonant-gradation', hint: 'nk → ng', genitive: 'kaupungin' },
  { nominative: 'kylä', stem: 'kylä', translation: 'village', rule: 'no-change', hint: 'No change', genitive: 'kylän' },
  { nominative: 'lentokone', stem: 'lentokonee', translation: 'airplane', rule: 'e-doubling', hint: 'e → ee', genitive: 'lentokoneen' },
  { nominative: 'laiva', stem: 'laiva', translation: 'ship', rule: 'no-change', hint: 'No change', genitive: 'laivan' },
  { nominative: 'juna', stem: 'juna', translation: 'train', rule: 'no-change', hint: 'No change', genitive: 'junan' },
  { nominative: 'pyörä', stem: 'pyörä', translation: 'wheel/bicycle', rule: 'no-change', hint: 'No change', genitive: 'pyörän' },
  { nominative: 'asunto', stem: 'asunno', translation: 'apartment', rule: 'consonant-gradation', hint: 'nt → nn', genitive: 'asunnon' },
  { nominative: 'huoneisto', stem: 'huoneisto', translation: 'apartment unit', rule: 'no-change', hint: 'No change', genitive: 'huoneiston' },
  { nominative: 'viikko', stem: 'viiko', translation: 'week', rule: 'consonant-gradation', hint: 'kk → k', genitive: 'viikon' },
  { nominative: 'kuukausi', stem: 'kuukaude', translation: 'month', rule: 's-to-de', hint: 'si → de', genitive: 'kuukauden' },
  { nominative: 'päivä', stem: 'päivä', translation: 'day', rule: 'no-change', hint: 'No change', genitive: 'päivän' },
  { nominative: 'tunti', stem: 'tunni', translation: 'hour', rule: 'consonant-gradation', hint: 'nt → nn', genitive: 'tunnin' },
  { nominative: 'minuutti', stem: 'minuuti', translation: 'minute', rule: 'consonant-gradation', hint: 'tt → t', genitive: 'minuutin' },
  { nominative: 'sekunti', stem: 'sekunni', translation: 'second', rule: 'consonant-gradation', hint: 'nt → nn', genitive: 'sekunnin' },
];

// Helper functions
export function getWordsByStemRule(rule: StemRule): StemWord[] {
  return STEM_WORDS.filter(w => w.rule === rule);
}

export function getStemRuleInfo(rule: StemRule): StemRuleInfo | undefined {
  return STEM_RULES.find(r => r.id === rule);
}

export function getAllStemWords(): StemWord[] {
  return STEM_WORDS;
}

export function getWordsForStemRules(rules: StemRule[]): StemWord[] {
  return STEM_WORDS.filter(w => rules.includes(w.rule));
}

export function getStemWordCount(rules: StemRule[]): number {
  return getWordsForStemRules(rules).length;
}


