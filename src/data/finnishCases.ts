// Finnish Cases Practice - Location, Surface, and Pronoun Cases
// Designed for learning with real sentences in simple Finnish (Selkouutiset style)

export type CaseType = 
  // Location Cases (WHERE?)
  | 'inessive'   // -ssa/-ssä (inside)
  | 'elative'    // -sta/-stä (out of)
  | 'illative'   // -Vn/-seen/-iin (into)
  // Surface Cases (ON/OFF)
  | 'adessive'   // -lla/-llä (on, at)
  | 'ablative'   // -lta/-ltä (off, from)
  | 'allative';  // -lle (onto, to)

export type CaseCategory = 'location' | 'surface';

export interface CaseInfo {
  name: CaseType;
  finnishName: string;
  ending: string;
  meaning: string;
  question: string; // Finnish question word
  examples: string[];
  category: CaseCategory;
  movementType: 'static' | 'from' | 'to'; // Where you are / where from / where to
}

export const CASES: Record<CaseType, CaseInfo> = {
  // LOCATION CASES (Inside)
  inessive: {
    name: 'inessive',
    finnishName: 'inessiivi',
    ending: '-ssa / -ssä',
    meaning: 'inside, in',
    question: 'Missä?',
    examples: ['talossa (in the house)', 'kaupassa (in the shop)', 'Suomessa (in Finland)'],
    category: 'location',
    movementType: 'static',
  },
  elative: {
    name: 'elative',
    finnishName: 'elatiivi',
    ending: '-sta / -stä',
    meaning: 'out of, from (inside)',
    question: 'Mistä?',
    examples: ['talosta (from the house)', 'kaupasta (from the shop)', 'Suomesta (from Finland)'],
    category: 'location',
    movementType: 'from',
  },
  illative: {
    name: 'illative',
    finnishName: 'illatiivi',
    ending: '-Vn / -seen / -iin',
    meaning: 'into',
    question: 'Mihin?',
    examples: ['taloon (into the house)', 'kauppaan (into the shop)', 'Suomeen (to Finland)'],
    category: 'location',
    movementType: 'to',
  },
  // SURFACE CASES (On top)
  adessive: {
    name: 'adessive',
    finnishName: 'adessiivi',
    ending: '-lla / -llä',
    meaning: 'on, at (surface)',
    question: 'Millä?',
    examples: ['pöydällä (on the table)', 'kadulla (on the street)', 'torilla (at the market)'],
    category: 'surface',
    movementType: 'static',
  },
  ablative: {
    name: 'ablative',
    finnishName: 'ablatiivi',
    ending: '-lta / -ltä',
    meaning: 'off, from (surface)',
    question: 'Miltä?',
    examples: ['pöydältä (from the table)', 'kadulta (from the street)', 'torilta (from the market)'],
    category: 'surface',
    movementType: 'from',
  },
  allative: {
    name: 'allative',
    finnishName: 'allatiivi',
    ending: '-lle',
    meaning: 'onto, to (surface)',
    question: 'Mille?',
    examples: ['pöydälle (onto the table)', 'kadulle (to the street)', 'torille (to the market)'],
    category: 'surface',
    movementType: 'to',
  },
};

// Nouns with all their case forms (singular and plural)
export interface NounForms {
  nominative: string;
  inessive: string;
  elative: string;
  illative: string;
  adessive: string;
  ablative: string;
  allative: string;
}

export interface NounFormsPlural {
  nominative: string;      // talot
  inessive: string;        // taloissa
  elative: string;         // taloista
  illative: string;        // taloihin
  adessive: string;        // taloilla
  ablative: string;        // taloilta
  allative: string;        // taloille
}

export interface Noun {
  base: string;
  translation: string;
  forms: NounForms;
  pluralForms?: NounFormsPlural;  // Plural case forms
  usesLocationCases: boolean; // true = sisällä (inside), false = päällä (on surface)
  category: string;
}

// Common nouns with their case forms (singular and plural)
export const NOUNS: Noun[] = [
  // Places that use LOCATION cases (inside)
  {
    base: 'talo',
    translation: 'house',
    forms: {
      nominative: 'talo',
      inessive: 'talossa',
      elative: 'talosta',
      illative: 'taloon',
      adessive: 'talolla',
      ablative: 'talolta',
      allative: 'talolle',
    },
    pluralForms: {
      nominative: 'talot',
      inessive: 'taloissa',
      elative: 'taloista',
      illative: 'taloihin',
      adessive: 'taloilla',
      ablative: 'taloilta',
      allative: 'taloille',
    },
    usesLocationCases: true,
    category: 'building',
  },
  {
    base: 'kauppa',
    translation: 'shop',
    forms: {
      nominative: 'kauppa',
      inessive: 'kaupassa',
      elative: 'kaupasta',
      illative: 'kauppaan',
      adessive: 'kaupalla',
      ablative: 'kaupalta',
      allative: 'kaupalle',
    },
    pluralForms: {
      nominative: 'kaupat',
      inessive: 'kaupoissa',
      elative: 'kaupoista',
      illative: 'kauppoihin',
      adessive: 'kaupoilla',
      ablative: 'kaupoilta',
      allative: 'kaupoille',
    },
    usesLocationCases: true,
    category: 'building',
  },
  {
    base: 'koulu',
    translation: 'school',
    forms: {
      nominative: 'koulu',
      inessive: 'koulussa',
      elative: 'koulusta',
      illative: 'kouluun',
      adessive: 'koululla',
      ablative: 'koululta',
      allative: 'koululle',
    },
    pluralForms: {
      nominative: 'koulut',
      inessive: 'kouluissa',
      elative: 'kouluista',
      illative: 'kouluihin',
      adessive: 'kouluilla',
      ablative: 'kouluiltä',
      allative: 'kouluille',
    },
    usesLocationCases: true,
    category: 'building',
  },
  {
    base: 'kirjasto',
    translation: 'library',
    forms: {
      nominative: 'kirjasto',
      inessive: 'kirjastossa',
      elative: 'kirjastosta',
      illative: 'kirjastoon',
      adessive: 'kirjastolla',
      ablative: 'kirjastolta',
      allative: 'kirjastolle',
    },
    pluralForms: {
      nominative: 'kirjastot',
      inessive: 'kirjastoissa',
      elative: 'kirjastoista',
      illative: 'kirjastoihin',
      adessive: 'kirjastoilla',
      ablative: 'kirjastoilta',
      allative: 'kirjastoille',
    },
    usesLocationCases: true,
    category: 'building',
  },
  {
    base: 'ravintola',
    translation: 'restaurant',
    forms: {
      nominative: 'ravintola',
      inessive: 'ravintolassa',
      elative: 'ravintolasta',
      illative: 'ravintolaan',
      adessive: 'ravintolalla',
      ablative: 'ravintolalta',
      allative: 'ravintolalle',
    },
    pluralForms: {
      nominative: 'ravintolat',
      inessive: 'ravintoloissa',
      elative: 'ravintoloista',
      illative: 'ravintoloihin',
      adessive: 'ravintoloilla',
      ablative: 'ravintoloilta',
      allative: 'ravintoloille',
    },
    usesLocationCases: true,
    category: 'building',
  },
  {
    base: 'Suomi',
    translation: 'Finland',
    forms: {
      nominative: 'Suomi',
      inessive: 'Suomessa',
      elative: 'Suomesta',
      illative: 'Suomeen',
      adessive: 'Suomella',
      ablative: 'Suomelta',
      allative: 'Suomelle',
    },
    // No plural for country names
    usesLocationCases: true,
    category: 'country',
  },
  {
    base: 'Helsinki',
    translation: 'Helsinki',
    forms: {
      nominative: 'Helsinki',
      inessive: 'Helsingissä',
      elative: 'Helsingistä',
      illative: 'Helsinkiin',
      adessive: 'Helsingillä',
      ablative: 'Helsingiltä',
      allative: 'Helsingille',
    },
    // No plural for city names
    usesLocationCases: true,
    category: 'city',
  },
  {
    base: 'sairaala',
    translation: 'hospital',
    forms: {
      nominative: 'sairaala',
      inessive: 'sairaalassa',
      elative: 'sairaalasta',
      illative: 'sairaalaan',
      adessive: 'sairaalalla',
      ablative: 'sairaalalta',
      allative: 'sairaalalle',
    },
    pluralForms: {
      nominative: 'sairaalat',
      inessive: 'sairaaloissa',
      elative: 'sairaaloista',
      illative: 'sairaaloihin',
      adessive: 'sairaaloilla',
      ablative: 'sairaaloilta',
      allative: 'sairaaloille',
    },
    usesLocationCases: true,
    category: 'building',
  },
  {
    base: 'toimisto',
    translation: 'office',
    forms: {
      nominative: 'toimisto',
      inessive: 'toimistossa',
      elative: 'toimistosta',
      illative: 'toimistoon',
      adessive: 'toimistolla',
      ablative: 'toimistolta',
      allative: 'toimistolle',
    },
    pluralForms: {
      nominative: 'toimistot',
      inessive: 'toimistoissa',
      elative: 'toimistoista',
      illative: 'toimistoihin',
      adessive: 'toimistoilla',
      ablative: 'toimistoilta',
      allative: 'toimistoille',
    },
    usesLocationCases: true,
    category: 'building',
  },
  {
    base: 'keittiö',
    translation: 'kitchen',
    forms: {
      nominative: 'keittiö',
      inessive: 'keittiössä',
      elative: 'keittiöstä',
      illative: 'keittiöön',
      adessive: 'keittiöllä',
      ablative: 'keittiöltä',
      allative: 'keittiölle',
    },
    pluralForms: {
      nominative: 'keittiöt',
      inessive: 'keittiöissä',
      elative: 'keittiöistä',
      illative: 'keittiöihin',
      adessive: 'keittiöillä',
      ablative: 'keittiöiltä',
      allative: 'keittiöille',
    },
    usesLocationCases: true,
    category: 'room',
  },
  // Places that commonly use SURFACE cases (at/on)
  {
    base: 'tori',
    translation: 'market square',
    forms: {
      nominative: 'tori',
      inessive: 'torissa',
      elative: 'torista',
      illative: 'toriin',
      adessive: 'torilla',
      ablative: 'torilta',
      allative: 'torille',
    },
    pluralForms: {
      nominative: 'torit',
      inessive: 'toreissa',
      elative: 'toreista',
      illative: 'toreihin',
      adessive: 'toreilla',
      ablative: 'toreilta',
      allative: 'toreille',
    },
    usesLocationCases: false, // Uses surface cases: torilla, torilta, torille
    category: 'place',
  },
  {
    base: 'pöytä',
    translation: 'table',
    forms: {
      nominative: 'pöytä',
      inessive: 'pöydässä',
      elative: 'pöydästä',
      illative: 'pöytään',
      adessive: 'pöydällä',
      ablative: 'pöydältä',
      allative: 'pöydälle',
    },
    pluralForms: {
      nominative: 'pöydät',
      inessive: 'pöydissä',
      elative: 'pöydistä',
      illative: 'pöytiin',
      adessive: 'pöydillä',
      ablative: 'pöydiltä',
      allative: 'pöydille',
    },
    usesLocationCases: false,
    category: 'furniture',
  },
  {
    base: 'tuoli',
    translation: 'chair',
    forms: {
      nominative: 'tuoli',
      inessive: 'tuolissa',
      elative: 'tuolista',
      illative: 'tuoliin',
      adessive: 'tuolilla',
      ablative: 'tuolilta',
      allative: 'tuolille',
    },
    pluralForms: {
      nominative: 'tuolit',
      inessive: 'tuoleissa',
      elative: 'tuoleista',
      illative: 'tuoleihin',
      adessive: 'tuoleilla',
      ablative: 'tuoleilta',
      allative: 'tuoleille',
    },
    usesLocationCases: false,
    category: 'furniture',
  },
  {
    base: 'lattia',
    translation: 'floor',
    forms: {
      nominative: 'lattia',
      inessive: 'lattiassa',
      elative: 'lattiasta',
      illative: 'lattiaan',
      adessive: 'lattialla',
      ablative: 'lattialta',
      allative: 'lattialle',
    },
    pluralForms: {
      nominative: 'lattiat',
      inessive: 'lattioissa',
      elative: 'lattioista',
      illative: 'lattioihin',
      adessive: 'lattioilla',
      ablative: 'lattioilta',
      allative: 'lattioille',
    },
    usesLocationCases: false,
    category: 'surface',
  },
  {
    base: 'katu',
    translation: 'street',
    forms: {
      nominative: 'katu',
      inessive: 'kadussa',
      elative: 'kadusta',
      illative: 'kadulle', // Note: street uses allative for "to"
      adessive: 'kadulla',
      ablative: 'kadulta',
      allative: 'kadulle',
    },
    pluralForms: {
      nominative: 'kadut',
      inessive: 'kaduissa',
      elative: 'kaduista',
      illative: 'katuihin',
      adessive: 'kaduilla',
      ablative: 'kaduilta',
      allative: 'kaduille',
    },
    usesLocationCases: false,
    category: 'place',
  },
  {
    base: 'asema',
    translation: 'station',
    forms: {
      nominative: 'asema',
      inessive: 'asemassa',
      elative: 'asemasta',
      illative: 'asemaan',
      adessive: 'asemalla',
      ablative: 'asemalta',
      allative: 'asemalle',
    },
    pluralForms: {
      nominative: 'asemat',
      inessive: 'asemissa',
      elative: 'asemista',
      illative: 'asemiin',
      adessive: 'asemilla',
      ablative: 'asemilta',
      allative: 'asemille',
    },
    usesLocationCases: false, // Uses surface: asemalla (at the station)
    category: 'place',
  },
  {
    base: 'posti',
    translation: 'post office',
    forms: {
      nominative: 'posti',
      inessive: 'postissa',
      elative: 'postista',
      illative: 'postiin',
      adessive: 'postilla',
      ablative: 'postilta',
      allative: 'postille',
    },
    pluralForms: {
      nominative: 'postit',
      inessive: 'posteissa',
      elative: 'posteista',
      illative: 'posteihin',
      adessive: 'posteilla',
      ablative: 'posteilta',
      allative: 'posteille',
    },
    usesLocationCases: false, // postilla = at the post office
    category: 'place',
  },
  {
    base: 'työ',
    translation: 'work',
    forms: {
      nominative: 'työ',
      inessive: 'työssä',
      elative: 'työstä',
      illative: 'työhön',
      adessive: 'työllä',
      ablative: 'työltä',
      allative: 'työlle',
    },
    pluralForms: {
      nominative: 'työt',
      inessive: 'töissä',
      elative: 'töistä',
      illative: 'töihin',
      adessive: 'töillä',
      ablative: 'töiltä',
      allative: 'töille',
    },
    usesLocationCases: true, // työssä = at work
    category: 'abstract',
  },
  {
    base: 'sänky',
    translation: 'bed',
    forms: {
      nominative: 'sänky',
      inessive: 'sängyssä',
      elative: 'sängystä',
      illative: 'sänkyyn',
      adessive: 'sängyllä',
      ablative: 'sängyltä',
      allative: 'sängylle',
    },
    pluralForms: {
      nominative: 'sängyt',
      inessive: 'sängyissä',
      elative: 'sängyistä',
      illative: 'sänkyihin',
      adessive: 'sängyillä',
      ablative: 'sängyiltä',
      allative: 'sängyille',
    },
    usesLocationCases: false, // sängyllä = on the bed
    category: 'furniture',
  },
  {
    base: 'maa',
    translation: 'country/ground',
    forms: {
      nominative: 'maa',
      inessive: 'maassa',
      elative: 'maasta',
      illative: 'maahan',
      adessive: 'maalla',
      ablative: 'maalta',
      allative: 'maalle',
    },
    pluralForms: {
      nominative: 'maat',
      inessive: 'maissa',
      elative: 'maista',
      illative: 'maihin',
      adessive: 'mailla',
      ablative: 'mailta',
      allative: 'maille',
    },
    usesLocationCases: true, // maassa = in the country/ground
    category: 'place',
  },
];

// Pronouns with case endings
export interface PronounForms {
  nominative: string;
  inessive: string;
  elative: string;
  illative: string;
  adessive: string;
  ablative: string;
  allative: string;
}

export interface Pronoun {
  person: string;
  translation: string;
  forms: PronounForms;
}

export const PRONOUNS: Pronoun[] = [
  {
    person: 'minä',
    translation: 'I/me',
    forms: {
      nominative: 'minä',
      inessive: 'minussa',
      elative: 'minusta',
      illative: 'minuun',
      adessive: 'minulla',
      ablative: 'minulta',
      allative: 'minulle',
    },
  },
  {
    person: 'sinä',
    translation: 'you (singular)',
    forms: {
      nominative: 'sinä',
      inessive: 'sinussa',
      elative: 'sinusta',
      illative: 'sinuun',
      adessive: 'sinulla',
      ablative: 'sinulta',
      allative: 'sinulle',
    },
  },
  {
    person: 'hän',
    translation: 'he/she',
    forms: {
      nominative: 'hän',
      inessive: 'hänessä',
      elative: 'hänestä',
      illative: 'häneen',
      adessive: 'hänellä',
      ablative: 'häneltä',
      allative: 'hänelle',
    },
  },
  {
    person: 'me',
    translation: 'we',
    forms: {
      nominative: 'me',
      inessive: 'meissä',
      elative: 'meistä',
      illative: 'meihin',
      adessive: 'meillä',
      ablative: 'meiltä',
      allative: 'meille',
    },
  },
  {
    person: 'te',
    translation: 'you (plural)',
    forms: {
      nominative: 'te',
      inessive: 'teissä',
      elative: 'teistä',
      illative: 'teihin',
      adessive: 'teillä',
      ablative: 'teiltä',
      allative: 'teille',
    },
  },
  {
    person: 'he',
    translation: 'they',
    forms: {
      nominative: 'he',
      inessive: 'heissä',
      elative: 'heistä',
      illative: 'heihin',
      adessive: 'heillä',
      ablative: 'heiltä',
      allative: 'heille',
    },
  },
];

// Simple sentences for practice (Selkouutiset style)
export interface CaseSentence {
  id: string;
  finnish: string;
  english: string;
  caseUsed: CaseType;
  wordInCase: string; // The word that demonstrates the case
  baseWord: string; // The base form of the word
  category: 'location' | 'surface' | 'pronoun';
  difficulty: 'easy' | 'medium' | 'hard';
  // For fill-in-the-blank exercises
  sentenceWithBlank: string;
  hint?: string;
  isPlural?: boolean; // True for plural sentences
}

// Location Case Sentences (Inside: -ssa, -sta, -Vn)
export const LOCATION_SENTENCES: CaseSentence[] = [
  // INESSIVE (-ssa/-ssä) - Where? Inside
  {
    id: 'loc-1',
    finnish: 'Olen talossa.',
    english: 'I am in the house.',
    caseUsed: 'inessive',
    wordInCase: 'talossa',
    baseWord: 'talo',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Olen ___.',
    hint: 'talo + -ssa',
  },
  {
    id: 'loc-2',
    finnish: 'Hän on koulussa.',
    english: 'He/She is at school.',
    caseUsed: 'inessive',
    wordInCase: 'koulussa',
    baseWord: 'koulu',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Hän on ___.',
    hint: 'koulu + -ssa',
  },
  {
    id: 'loc-3',
    finnish: 'Asun Suomessa.',
    english: 'I live in Finland.',
    caseUsed: 'inessive',
    wordInCase: 'Suomessa',
    baseWord: 'Suomi',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Asun ___.',
    hint: 'Suomi + -ssa',
  },
  {
    id: 'loc-4',
    finnish: 'Lapset ovat keittiössä.',
    english: 'The children are in the kitchen.',
    caseUsed: 'inessive',
    wordInCase: 'keittiössä',
    baseWord: 'keittiö',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Lapset ovat ___.',
    hint: 'keittiö + -ssä',
  },
  {
    id: 'loc-5',
    finnish: 'Kirja on kaupassa.',
    english: 'The book is in the shop.',
    caseUsed: 'inessive',
    wordInCase: 'kaupassa',
    baseWord: 'kauppa',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Kirja on ___.',
    hint: 'kauppa + -ssa',
  },
  {
    id: 'loc-6',
    finnish: 'Olen työssä.',
    english: 'I am at work.',
    caseUsed: 'inessive',
    wordInCase: 'työssä',
    baseWord: 'työ',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Olen ___.',
    hint: 'työ + -ssä',
  },
  {
    id: 'loc-7',
    finnish: 'Auto on autotallissa.',
    english: 'The car is in the garage.',
    caseUsed: 'inessive',
    wordInCase: 'autotallissa',
    baseWord: 'autotalli',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Auto on ___.',
    hint: 'autotalli + -ssa',
  },
  // ELATIVE (-sta/-stä) - Where from? Out of
  {
    id: 'loc-8',
    finnish: 'Tulen talosta.',
    english: 'I come from the house.',
    caseUsed: 'elative',
    wordInCase: 'talosta',
    baseWord: 'talo',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Tulen ___.',
    hint: 'talo + -sta',
  },
  {
    id: 'loc-9',
    finnish: 'Hän tulee koulusta.',
    english: 'He/She comes from school.',
    caseUsed: 'elative',
    wordInCase: 'koulusta',
    baseWord: 'koulu',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Hän tulee ___.',
    hint: 'koulu + -sta',
  },
  {
    id: 'loc-10',
    finnish: 'Olen kotoisin Suomesta.',
    english: 'I am from Finland.',
    caseUsed: 'elative',
    wordInCase: 'Suomesta',
    baseWord: 'Suomi',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Olen kotoisin ___.',
    hint: 'Suomi + -sta',
  },
  {
    id: 'loc-11',
    finnish: 'Otan kirjan hyllystä.',
    english: 'I take the book from the shelf.',
    caseUsed: 'elative',
    wordInCase: 'hyllystä',
    baseWord: 'hylly',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Otan kirjan ___.',
    hint: 'hylly + -stä',
  },
  {
    id: 'loc-12',
    finnish: 'Tulen työstä.',
    english: 'I come from work.',
    caseUsed: 'elative',
    wordInCase: 'työstä',
    baseWord: 'työ',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Tulen ___.',
    hint: 'työ + -stä',
  },
  {
    id: 'loc-13',
    finnish: 'Menen ulos huoneesta.',
    english: 'I go out of the room.',
    caseUsed: 'elative',
    wordInCase: 'huoneesta',
    baseWord: 'huone',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Menen ulos ___.',
    hint: 'huone + -sta',
  },
  // ILLATIVE (-Vn/-seen/-iin) - Where to? Into
  {
    id: 'loc-14',
    finnish: 'Menen taloon.',
    english: 'I go into the house.',
    caseUsed: 'illative',
    wordInCase: 'taloon',
    baseWord: 'talo',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Menen ___.',
    hint: 'talo + -on',
  },
  {
    id: 'loc-15',
    finnish: 'Hän menee kouluun.',
    english: 'He/She goes to school.',
    caseUsed: 'illative',
    wordInCase: 'kouluun',
    baseWord: 'koulu',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Hän menee ___.',
    hint: 'koulu + -un',
  },
  {
    id: 'loc-16',
    finnish: 'Muutan Suomeen.',
    english: 'I am moving to Finland.',
    caseUsed: 'illative',
    wordInCase: 'Suomeen',
    baseWord: 'Suomi',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Muutan ___.',
    hint: 'Suomi + -en',
  },
  {
    id: 'loc-17',
    finnish: 'Menen kauppaan.',
    english: 'I go to the shop.',
    caseUsed: 'illative',
    wordInCase: 'kauppaan',
    baseWord: 'kauppa',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Menen ___.',
    hint: 'kauppa + -an',
  },
  {
    id: 'loc-18',
    finnish: 'Tulen Helsinkiin huomenna.',
    english: 'I come to Helsinki tomorrow.',
    caseUsed: 'illative',
    wordInCase: 'Helsinkiin',
    baseWord: 'Helsinki',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Tulen ___ huomenna.',
    hint: 'Helsinki + -in',
  },
  {
    id: 'loc-19',
    finnish: 'Menen työhön.',
    english: 'I go to work.',
    caseUsed: 'illative',
    wordInCase: 'työhön',
    baseWord: 'työ',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Menen ___.',
    hint: 'työ + -hön',
  },
];

// Surface Case Sentences (On top: -lla, -lta, -lle)
export const SURFACE_SENTENCES: CaseSentence[] = [
  // ADESSIVE (-lla/-llä) - Where? On, at
  {
    id: 'sur-1',
    finnish: 'Kirja on pöydällä.',
    english: 'The book is on the table.',
    caseUsed: 'adessive',
    wordInCase: 'pöydällä',
    baseWord: 'pöytä',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Kirja on ___.',
    hint: 'pöytä + -llä',
  },
  {
    id: 'sur-2',
    finnish: 'Olen torilla.',
    english: 'I am at the market.',
    caseUsed: 'adessive',
    wordInCase: 'torilla',
    baseWord: 'tori',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Olen ___.',
    hint: 'tori + -lla',
  },
  {
    id: 'sur-3',
    finnish: 'Istun tuolilla.',
    english: 'I sit on the chair.',
    caseUsed: 'adessive',
    wordInCase: 'tuolilla',
    baseWord: 'tuoli',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Istun ___.',
    hint: 'tuoli + -lla',
  },
  {
    id: 'sur-4',
    finnish: 'Kävelen kadulla.',
    english: 'I walk on the street.',
    caseUsed: 'adessive',
    wordInCase: 'kadulla',
    baseWord: 'katu',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Kävelen ___.',
    hint: 'katu + -lla',
  },
  {
    id: 'sur-5',
    finnish: 'Olen asemalla.',
    english: 'I am at the station.',
    caseUsed: 'adessive',
    wordInCase: 'asemalla',
    baseWord: 'asema',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Olen ___.',
    hint: 'asema + -lla',
  },
  {
    id: 'sur-6',
    finnish: 'Koira on lattialla.',
    english: 'The dog is on the floor.',
    caseUsed: 'adessive',
    wordInCase: 'lattialla',
    baseWord: 'lattia',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Koira on ___.',
    hint: 'lattia + -lla',
  },
  {
    id: 'sur-7',
    finnish: 'Makaan sängyllä.',
    english: 'I lie on the bed.',
    caseUsed: 'adessive',
    wordInCase: 'sängyllä',
    baseWord: 'sänky',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Makaan ___.',
    hint: 'sänky + -llä',
  },
  // ABLATIVE (-lta/-ltä) - Where from? Off, from
  {
    id: 'sur-8',
    finnish: 'Otan kirjan pöydältä.',
    english: 'I take the book from the table.',
    caseUsed: 'ablative',
    wordInCase: 'pöydältä',
    baseWord: 'pöytä',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Otan kirjan ___.',
    hint: 'pöytä + -ltä',
  },
  {
    id: 'sur-9',
    finnish: 'Tulen torilta.',
    english: 'I come from the market.',
    caseUsed: 'ablative',
    wordInCase: 'torilta',
    baseWord: 'tori',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Tulen ___.',
    hint: 'tori + -lta',
  },
  {
    id: 'sur-10',
    finnish: 'Nousen tuolilta.',
    english: 'I get up from the chair.',
    caseUsed: 'ablative',
    wordInCase: 'tuolilta',
    baseWord: 'tuoli',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Nousen ___.',
    hint: 'tuoli + -lta',
  },
  {
    id: 'sur-11',
    finnish: 'Tulen kadulta.',
    english: 'I come from the street.',
    caseUsed: 'ablative',
    wordInCase: 'kadulta',
    baseWord: 'katu',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Tulen ___.',
    hint: 'katu + -lta',
  },
  {
    id: 'sur-12',
    finnish: 'Juna lähtee asemalta.',
    english: 'The train leaves from the station.',
    caseUsed: 'ablative',
    wordInCase: 'asemalta',
    baseWord: 'asema',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Juna lähtee ___.',
    hint: 'asema + -lta',
  },
  {
    id: 'sur-13',
    finnish: 'Nostan koiran lattialta.',
    english: 'I lift the dog from the floor.',
    caseUsed: 'ablative',
    wordInCase: 'lattialta',
    baseWord: 'lattia',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Nostan koiran ___.',
    hint: 'lattia + -lta',
  },
  // ALLATIVE (-lle) - Where to? Onto, to
  {
    id: 'sur-14',
    finnish: 'Laitan kirjan pöydälle.',
    english: 'I put the book on the table.',
    caseUsed: 'allative',
    wordInCase: 'pöydälle',
    baseWord: 'pöytä',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Laitan kirjan ___.',
    hint: 'pöytä + -lle',
  },
  {
    id: 'sur-15',
    finnish: 'Menen torille.',
    english: 'I go to the market.',
    caseUsed: 'allative',
    wordInCase: 'torille',
    baseWord: 'tori',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Menen ___.',
    hint: 'tori + -lle',
  },
  {
    id: 'sur-16',
    finnish: 'Istun tuolille.',
    english: 'I sit down on the chair.',
    caseUsed: 'allative',
    wordInCase: 'tuolille',
    baseWord: 'tuoli',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Istun ___.',
    hint: 'tuoli + -lle',
  },
  {
    id: 'sur-17',
    finnish: 'Menen kadulle.',
    english: 'I go to the street.',
    caseUsed: 'allative',
    wordInCase: 'kadulle',
    baseWord: 'katu',
    category: 'surface',
    difficulty: 'easy',
    sentenceWithBlank: 'Menen ___.',
    hint: 'katu + -lle',
  },
  {
    id: 'sur-18',
    finnish: 'Juna saapuu asemalle.',
    english: 'The train arrives at the station.',
    caseUsed: 'allative',
    wordInCase: 'asemalle',
    baseWord: 'asema',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Juna saapuu ___.',
    hint: 'asema + -lle',
  },
  {
    id: 'sur-19',
    finnish: 'Laitan maton lattialle.',
    english: 'I put the rug on the floor.',
    caseUsed: 'allative',
    wordInCase: 'lattialle',
    baseWord: 'lattia',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Laitan maton ___.',
    hint: 'lattia + -lle',
  },
];

// Pronoun sentences - demonstrating pronoun case forms
export const PRONOUN_SENTENCES: CaseSentence[] = [
  // ADESSIVE - "I have" structure (minulla on...)
  {
    id: 'pro-1',
    finnish: 'Minulla on koira.',
    english: 'I have a dog.',
    caseUsed: 'adessive',
    wordInCase: 'Minulla',
    baseWord: 'minä',
    category: 'pronoun',
    difficulty: 'easy',
    sentenceWithBlank: '___ on koira.',
    hint: 'minä + -lla = possession',
  },
  {
    id: 'pro-2',
    finnish: 'Sinulla on kaunis talo.',
    english: 'You have a beautiful house.',
    caseUsed: 'adessive',
    wordInCase: 'Sinulla',
    baseWord: 'sinä',
    category: 'pronoun',
    difficulty: 'easy',
    sentenceWithBlank: '___ on kaunis talo.',
    hint: 'sinä + -lla = possession',
  },
  {
    id: 'pro-3',
    finnish: 'Hänellä on auto.',
    english: 'He/She has a car.',
    caseUsed: 'adessive',
    wordInCase: 'Hänellä',
    baseWord: 'hän',
    category: 'pronoun',
    difficulty: 'easy',
    sentenceWithBlank: '___ on auto.',
    hint: 'hän + -llä = possession',
  },
  {
    id: 'pro-4',
    finnish: 'Meillä on iso perhe.',
    english: 'We have a big family.',
    caseUsed: 'adessive',
    wordInCase: 'Meillä',
    baseWord: 'me',
    category: 'pronoun',
    difficulty: 'easy',
    sentenceWithBlank: '___ on iso perhe.',
    hint: 'me + -illä = possession',
  },
  {
    id: 'pro-5',
    finnish: 'Teillä on hyvä idea.',
    english: 'You have a good idea.',
    caseUsed: 'adessive',
    wordInCase: 'Teillä',
    baseWord: 'te',
    category: 'pronoun',
    difficulty: 'easy',
    sentenceWithBlank: '___ on hyvä idea.',
    hint: 'te + -illä = possession',
  },
  {
    id: 'pro-6',
    finnish: 'Heillä on paljon rahaa.',
    english: 'They have a lot of money.',
    caseUsed: 'adessive',
    wordInCase: 'Heillä',
    baseWord: 'he',
    category: 'pronoun',
    difficulty: 'easy',
    sentenceWithBlank: '___ on paljon rahaa.',
    hint: 'he + -illä = possession',
  },
  // ALLATIVE - "give to me" structure
  {
    id: 'pro-7',
    finnish: 'Anna minulle kirja.',
    english: 'Give me the book.',
    caseUsed: 'allative',
    wordInCase: 'minulle',
    baseWord: 'minä',
    category: 'pronoun',
    difficulty: 'easy',
    sentenceWithBlank: 'Anna ___ kirja.',
    hint: 'minä + -lle = to me',
  },
  {
    id: 'pro-8',
    finnish: 'Annan sinulle lahjan.',
    english: 'I give you a gift.',
    caseUsed: 'allative',
    wordInCase: 'sinulle',
    baseWord: 'sinä',
    category: 'pronoun',
    difficulty: 'easy',
    sentenceWithBlank: 'Annan ___ lahjan.',
    hint: 'sinä + -lle = to you',
  },
  {
    id: 'pro-9',
    finnish: 'Kerro hänelle uutinen.',
    english: 'Tell him/her the news.',
    caseUsed: 'allative',
    wordInCase: 'hänelle',
    baseWord: 'hän',
    category: 'pronoun',
    difficulty: 'medium',
    sentenceWithBlank: 'Kerro ___ uutinen.',
    hint: 'hän + -lle = to him/her',
  },
  {
    id: 'pro-10',
    finnish: 'Tämä on tärkeää meille.',
    english: 'This is important to us.',
    caseUsed: 'allative',
    wordInCase: 'meille',
    baseWord: 'me',
    category: 'pronoun',
    difficulty: 'medium',
    sentenceWithBlank: 'Tämä on tärkeää ___.',
    hint: 'me + -ille = to us',
  },
  // ABLATIVE - "from me" structure
  {
    id: 'pro-11',
    finnish: 'Ota minulta avaimet.',
    english: 'Take the keys from me.',
    caseUsed: 'ablative',
    wordInCase: 'minulta',
    baseWord: 'minä',
    category: 'pronoun',
    difficulty: 'medium',
    sentenceWithBlank: 'Ota ___ avaimet.',
    hint: 'minä + -lta = from me',
  },
  {
    id: 'pro-12',
    finnish: 'Kysyn sinulta neuvoa.',
    english: 'I ask you for advice.',
    caseUsed: 'ablative',
    wordInCase: 'sinulta',
    baseWord: 'sinä',
    category: 'pronoun',
    difficulty: 'medium',
    sentenceWithBlank: 'Kysyn ___ neuvoa.',
    hint: 'sinä + -lta = from you',
  },
  {
    id: 'pro-13',
    finnish: 'Sain häneltä viestin.',
    english: 'I got a message from him/her.',
    caseUsed: 'ablative',
    wordInCase: 'häneltä',
    baseWord: 'hän',
    category: 'pronoun',
    difficulty: 'medium',
    sentenceWithBlank: 'Sain ___ viestin.',
    hint: 'hän + -ltä = from him/her',
  },
  // ELATIVE - "about/concerning" structure
  {
    id: 'pro-14',
    finnish: 'Pidän sinusta.',
    english: 'I like you.',
    caseUsed: 'elative',
    wordInCase: 'sinusta',
    baseWord: 'sinä',
    category: 'pronoun',
    difficulty: 'medium',
    sentenceWithBlank: 'Pidän ___.',
    hint: 'sinä + -sta = pitää + elative',
  },
  {
    id: 'pro-15',
    finnish: 'Mitä ajattelet minusta?',
    english: 'What do you think about me?',
    caseUsed: 'elative',
    wordInCase: 'minusta',
    baseWord: 'minä',
    category: 'pronoun',
    difficulty: 'medium',
    sentenceWithBlank: 'Mitä ajattelet ___?',
    hint: 'minä + -sta = about me',
  },
  {
    id: 'pro-16',
    finnish: 'Puhutaan heistä.',
    english: 'Let\'s talk about them.',
    caseUsed: 'elative',
    wordInCase: 'heistä',
    baseWord: 'he',
    category: 'pronoun',
    difficulty: 'medium',
    sentenceWithBlank: 'Puhutaan ___.',
    hint: 'he + -istä = about them',
  },
  // ILLATIVE - "into/believe in" structure
  {
    id: 'pro-17',
    finnish: 'Uskon sinuun.',
    english: 'I believe in you.',
    caseUsed: 'illative',
    wordInCase: 'sinuun',
    baseWord: 'sinä',
    category: 'pronoun',
    difficulty: 'medium',
    sentenceWithBlank: 'Uskon ___.',
    hint: 'sinä + -un = uskoa + illative',
  },
  {
    id: 'pro-18',
    finnish: 'Luotan häneen.',
    english: 'I trust him/her.',
    caseUsed: 'illative',
    wordInCase: 'häneen',
    baseWord: 'hän',
    category: 'pronoun',
    difficulty: 'medium',
    sentenceWithBlank: 'Luotan ___.',
    hint: 'hän + -een = luottaa + illative',
  },
];

// News-style sentences (Selkouutiset inspired)
export const NEWS_SENTENCES: CaseSentence[] = [
  {
    id: 'news-1',
    finnish: 'Presidentti matkustaa Suomeen huomenna.',
    english: 'The president travels to Finland tomorrow.',
    caseUsed: 'illative',
    wordInCase: 'Suomeen',
    baseWord: 'Suomi',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Presidentti matkustaa ___ huomenna.',
    hint: 'Suomi + -en = to Finland',
  },
  {
    id: 'news-2',
    finnish: 'Kokousta pidetään Helsingissä.',
    english: 'The meeting is held in Helsinki.',
    caseUsed: 'inessive',
    wordInCase: 'Helsingissä',
    baseWord: 'Helsinki',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Kokousta pidetään ___.',
    hint: 'Helsinki + -ssä = in Helsinki',
  },
  {
    id: 'news-3',
    finnish: 'Uutinen tulee Suomesta.',
    english: 'The news comes from Finland.',
    caseUsed: 'elative',
    wordInCase: 'Suomesta',
    baseWord: 'Suomi',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Uutinen tulee ___.',
    hint: 'Suomi + -sta = from Finland',
  },
  {
    id: 'news-4',
    finnish: 'Ihmiset odottavat asemalla.',
    english: 'People are waiting at the station.',
    caseUsed: 'adessive',
    wordInCase: 'asemalla',
    baseWord: 'asema',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Ihmiset odottavat ___.',
    hint: 'asema + -lla = at the station',
  },
  {
    id: 'news-5',
    finnish: 'Lapset leikkivät puistossa.',
    english: 'The children play in the park.',
    caseUsed: 'inessive',
    wordInCase: 'puistossa',
    baseWord: 'puisto',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Lapset leikkivät ___.',
    hint: 'puisto + -ssa = in the park',
  },
  {
    id: 'news-6',
    finnish: 'Juna lähtee Tampereelle kello 10.',
    english: 'The train leaves for Tampere at 10 o\'clock.',
    caseUsed: 'allative',
    wordInCase: 'Tampereelle',
    baseWord: 'Tampere',
    category: 'surface',
    difficulty: 'hard',
    sentenceWithBlank: 'Juna lähtee ___ kello 10.',
    hint: 'Tampere + -lle = to Tampere',
  },
  {
    id: 'news-7',
    finnish: 'Sää on kylmä koko maassa.',
    english: 'The weather is cold in the whole country.',
    caseUsed: 'inessive',
    wordInCase: 'maassa',
    baseWord: 'maa',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Sää on kylmä koko ___.',
    hint: 'maa + -ssa = in the country',
  },
  {
    id: 'news-8',
    finnish: 'Moni ihminen käy kirjastossa.',
    english: 'Many people visit the library.',
    caseUsed: 'inessive',
    wordInCase: 'kirjastossa',
    baseWord: 'kirjasto',
    category: 'location',
    difficulty: 'easy',
    sentenceWithBlank: 'Moni ihminen käy ___.',
    hint: 'kirjasto + -ssa = in the library',
  },
];

// Plural Location Case Sentences (Monikko)
export const PLURAL_LOCATION_SENTENCES: CaseSentence[] = [
  // INESSIVE PLURAL (-issa/-issä)
  {
    id: 'pl-loc-1',
    finnish: 'Koirat ovat taloissa.',
    english: 'The dogs are in the houses.',
    caseUsed: 'inessive',
    wordInCase: 'taloissa',
    baseWord: 'talot',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Koirat ovat ___.',
    hint: 'talot → talo + i + ssa',
    isPlural: true,
  },
  {
    id: 'pl-loc-2',
    finnish: 'Lapset ovat kouluissa.',
    english: 'The children are in the schools.',
    caseUsed: 'inessive',
    wordInCase: 'kouluissa',
    baseWord: 'koulut',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Lapset ovat ___.',
    hint: 'koulut → koulu + i + ssa',
    isPlural: true,
  },
  {
    id: 'pl-loc-3',
    finnish: 'Kirjat ovat kirjastoissa.',
    english: 'The books are in the libraries.',
    caseUsed: 'inessive',
    wordInCase: 'kirjastoissa',
    baseWord: 'kirjastot',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Kirjat ovat ___.',
    hint: 'kirjastot → kirjasto + i + ssa',
    isPlural: true,
  },
  {
    id: 'pl-loc-4',
    finnish: 'Ihmiset syövät ravintoloissa.',
    english: 'People eat in the restaurants.',
    caseUsed: 'inessive',
    wordInCase: 'ravintoloissa',
    baseWord: 'ravintolat',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Ihmiset syövät ___.',
    hint: 'ravintolat → ravintolo + i + ssa',
    isPlural: true,
  },
  {
    id: 'pl-loc-5',
    finnish: 'Potilaat ovat sairaaloissa.',
    english: 'The patients are in the hospitals.',
    caseUsed: 'inessive',
    wordInCase: 'sairaaloissa',
    baseWord: 'sairaalat',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Potilaat ovat ___.',
    hint: 'sairaalat → sairaalo + i + ssa',
    isPlural: true,
  },
  // ELATIVE PLURAL (-ista/-istä)
  {
    id: 'pl-loc-6',
    finnish: 'Lapset tulevat kouluista.',
    english: 'The children come from the schools.',
    caseUsed: 'elative',
    wordInCase: 'kouluista',
    baseWord: 'koulut',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Lapset tulevat ___.',
    hint: 'koulut → koulu + i + sta',
    isPlural: true,
  },
  {
    id: 'pl-loc-7',
    finnish: 'Ihmiset tulevat taloista.',
    english: 'People come from the houses.',
    caseUsed: 'elative',
    wordInCase: 'taloista',
    baseWord: 'talot',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Ihmiset tulevat ___.',
    hint: 'talot → talo + i + sta',
    isPlural: true,
  },
  {
    id: 'pl-loc-8',
    finnish: 'Otan kirjoja kirjastoista.',
    english: 'I take books from the libraries.',
    caseUsed: 'elative',
    wordInCase: 'kirjastoista',
    baseWord: 'kirjastot',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Otan kirjoja ___.',
    hint: 'kirjastot → kirjasto + i + sta',
    isPlural: true,
  },
  {
    id: 'pl-loc-9',
    finnish: 'Työntekijät tulevat toimistoista.',
    english: 'The workers come from the offices.',
    caseUsed: 'elative',
    wordInCase: 'toimistoista',
    baseWord: 'toimistot',
    category: 'location',
    difficulty: 'medium',
    sentenceWithBlank: 'Työntekijät tulevat ___.',
    hint: 'toimistot → toimisto + i + sta',
    isPlural: true,
  },
  // ILLATIVE PLURAL (-ihin/-iin)
  {
    id: 'pl-loc-10',
    finnish: 'Lapset menevät kouluihin.',
    english: 'The children go to the schools.',
    caseUsed: 'illative',
    wordInCase: 'kouluihin',
    baseWord: 'koulut',
    category: 'location',
    difficulty: 'hard',
    sentenceWithBlank: 'Lapset menevät ___.',
    hint: 'koulut → koulu + i + hin',
    isPlural: true,
  },
  {
    id: 'pl-loc-11',
    finnish: 'Ihmiset menevät taloihin.',
    english: 'People go into the houses.',
    caseUsed: 'illative',
    wordInCase: 'taloihin',
    baseWord: 'talot',
    category: 'location',
    difficulty: 'hard',
    sentenceWithBlank: 'Ihmiset menevät ___.',
    hint: 'talot → talo + i + hin',
    isPlural: true,
  },
  {
    id: 'pl-loc-12',
    finnish: 'Vien kirjat kirjastoihin.',
    english: 'I take the books to the libraries.',
    caseUsed: 'illative',
    wordInCase: 'kirjastoihin',
    baseWord: 'kirjastot',
    category: 'location',
    difficulty: 'hard',
    sentenceWithBlank: 'Vien kirjat ___.',
    hint: 'kirjastot → kirjasto + i + hin',
    isPlural: true,
  },
  {
    id: 'pl-loc-13',
    finnish: 'Menemme ravintoloihin illalla.',
    english: 'We go to the restaurants in the evening.',
    caseUsed: 'illative',
    wordInCase: 'ravintoloihin',
    baseWord: 'ravintolat',
    category: 'location',
    difficulty: 'hard',
    sentenceWithBlank: 'Menemme ___ illalla.',
    hint: 'ravintolat → ravintolo + i + hin',
    isPlural: true,
  },
];

// Plural Surface Case Sentences (Monikko)
export const PLURAL_SURFACE_SENTENCES: CaseSentence[] = [
  // ADESSIVE PLURAL (-illa/-illä)
  {
    id: 'pl-sur-1',
    finnish: 'Kirjat ovat pöydillä.',
    english: 'The books are on the tables.',
    caseUsed: 'adessive',
    wordInCase: 'pöydillä',
    baseWord: 'pöydät',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Kirjat ovat ___.',
    hint: 'pöydät → pöydi + llä',
    isPlural: true,
  },
  {
    id: 'pl-sur-2',
    finnish: 'Ihmiset ovat toreilla.',
    english: 'People are at the markets.',
    caseUsed: 'adessive',
    wordInCase: 'toreilla',
    baseWord: 'torit',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Ihmiset ovat ___.',
    hint: 'torit → tore + i + lla',
    isPlural: true,
  },
  {
    id: 'pl-sur-3',
    finnish: 'Lapset istuvat tuoleilla.',
    english: 'The children sit on the chairs.',
    caseUsed: 'adessive',
    wordInCase: 'tuoleilla',
    baseWord: 'tuolit',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Lapset istuvat ___.',
    hint: 'tuolit → tuole + i + lla',
    isPlural: true,
  },
  {
    id: 'pl-sur-4',
    finnish: 'Autot ovat kaduilla.',
    english: 'The cars are on the streets.',
    caseUsed: 'adessive',
    wordInCase: 'kaduilla',
    baseWord: 'kadut',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Autot ovat ___.',
    hint: 'kadut → kadu + i + lla',
    isPlural: true,
  },
  {
    id: 'pl-sur-5',
    finnish: 'Matkustajat odottavat asemilla.',
    english: 'The passengers wait at the stations.',
    caseUsed: 'adessive',
    wordInCase: 'asemilla',
    baseWord: 'asemat',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Matkustajat odottavat ___.',
    hint: 'asemat → asem + i + lla',
    isPlural: true,
  },
  // ABLATIVE PLURAL (-ilta/-iltä)
  {
    id: 'pl-sur-6',
    finnish: 'Otan kirjat pöydiltä.',
    english: 'I take the books from the tables.',
    caseUsed: 'ablative',
    wordInCase: 'pöydiltä',
    baseWord: 'pöydät',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Otan kirjat ___.',
    hint: 'pöydät → pöydi + ltä',
    isPlural: true,
  },
  {
    id: 'pl-sur-7',
    finnish: 'Ihmiset tulevat toreilta.',
    english: 'People come from the markets.',
    caseUsed: 'ablative',
    wordInCase: 'toreilta',
    baseWord: 'torit',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Ihmiset tulevat ___.',
    hint: 'torit → tore + i + lta',
    isPlural: true,
  },
  {
    id: 'pl-sur-8',
    finnish: 'Lapset nousevat tuoleilta.',
    english: 'The children get up from the chairs.',
    caseUsed: 'ablative',
    wordInCase: 'tuoleilta',
    baseWord: 'tuolit',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Lapset nousevat ___.',
    hint: 'tuolit → tuole + i + lta',
    isPlural: true,
  },
  {
    id: 'pl-sur-9',
    finnish: 'Junat lähtevät asemilta.',
    english: 'The trains leave from the stations.',
    caseUsed: 'ablative',
    wordInCase: 'asemilta',
    baseWord: 'asemat',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Junat lähtevät ___.',
    hint: 'asemat → asem + i + lta',
    isPlural: true,
  },
  // ALLATIVE PLURAL (-ille)
  {
    id: 'pl-sur-10',
    finnish: 'Laitan kirjat pöydille.',
    english: 'I put the books on the tables.',
    caseUsed: 'allative',
    wordInCase: 'pöydille',
    baseWord: 'pöydät',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Laitan kirjat ___.',
    hint: 'pöydät → pöydi + lle',
    isPlural: true,
  },
  {
    id: 'pl-sur-11',
    finnish: 'Ihmiset menevät toreille.',
    english: 'People go to the markets.',
    caseUsed: 'allative',
    wordInCase: 'toreille',
    baseWord: 'torit',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Ihmiset menevät ___.',
    hint: 'torit → tore + i + lle',
    isPlural: true,
  },
  {
    id: 'pl-sur-12',
    finnish: 'Lapset istuvat tuoleille.',
    english: 'The children sit down on the chairs.',
    caseUsed: 'allative',
    wordInCase: 'tuoleille',
    baseWord: 'tuolit',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Lapset istuvat ___.',
    hint: 'tuolit → tuole + i + lle',
    isPlural: true,
  },
  {
    id: 'pl-sur-13',
    finnish: 'Menemme kaduille kävelylle.',
    english: 'We go to the streets for a walk.',
    caseUsed: 'allative',
    wordInCase: 'kaduille',
    baseWord: 'kadut',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Menemme ___ kävelylle.',
    hint: 'kadut → kadu + i + lle',
    isPlural: true,
  },
  {
    id: 'pl-sur-14',
    finnish: 'Junat saapuvat asemille.',
    english: 'The trains arrive at the stations.',
    caseUsed: 'allative',
    wordInCase: 'asemille',
    baseWord: 'asemat',
    category: 'surface',
    difficulty: 'medium',
    sentenceWithBlank: 'Junat saapuvat ___.',
    hint: 'asemat → asem + i + lle',
    isPlural: true,
  },
];

// Combine all sentences
export function getAllSentences(): CaseSentence[] {
  return [...LOCATION_SENTENCES, ...SURFACE_SENTENCES, ...PRONOUN_SENTENCES, ...NEWS_SENTENCES];
}

// Get only singular sentences (exclude plural)
export function getSingularSentences(): CaseSentence[] {
  return getAllSentences().filter(s => !s.isPlural);
}

// Get only plural sentences
export function getPluralSentences(): CaseSentence[] {
  return [...PLURAL_LOCATION_SENTENCES, ...PLURAL_SURFACE_SENTENCES];
}

// Get all sentences including plural
export function getAllSentencesWithPlural(): CaseSentence[] {
  return [...getAllSentences(), ...getPluralSentences()];
}

export function getSentencesByCase(caseType: CaseType): CaseSentence[] {
  return getAllSentences().filter(s => s.caseUsed === caseType);
}

export function getSentencesByCategory(category: string): CaseSentence[] {
  const allSentences = getAllSentences();
  
  // Handle broad categories
  if (category === 'location' || category === 'surface' || category === 'pronoun') {
    return allSentences.filter(s => s.category === category);
  }
  
  // Handle movement-based categories
  if (category === 'static') {
    return allSentences.filter(s => s.caseUsed === 'inessive' || s.caseUsed === 'adessive');
  }
  if (category === 'from') {
    return allSentences.filter(s => s.caseUsed === 'elative' || s.caseUsed === 'ablative');
  }
  if (category === 'to') {
    return allSentences.filter(s => s.caseUsed === 'illative' || s.caseUsed === 'allative');
  }
  
  // Handle individual case categories
  const caseTypes = ['inessive', 'elative', 'illative', 'adessive', 'ablative', 'allative'];
  if (caseTypes.includes(category)) {
    return allSentences.filter(s => s.caseUsed === category);
  }
  
  return allSentences;
}

export function getSentencesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): CaseSentence[] {
  return getAllSentences().filter(s => s.difficulty === difficulty);
}

// Case groups for the game menu
export interface CaseGroup {
  id: string;
  name: string;
  finnishName: string;
  description: string;
  cases: CaseType[];
  color: string;
  groupType: 'broad' | 'movement' | 'individual';
}

export const CASE_GROUPS: CaseGroup[] = [
  // === BROAD GROUPS ===
  {
    id: 'location',
    name: 'All Location Cases',
    finnishName: 'Sisäpaikallissijat',
    description: 'Inside: -ssa, -sta, -Vn',
    cases: ['inessive', 'elative', 'illative'],
    color: '#4a9eff',
    groupType: 'broad',
  },
  {
    id: 'surface',
    name: 'All Surface Cases',
    finnishName: 'Ulkopaikallissijat',
    description: 'On surface: -lla, -lta, -lle',
    cases: ['adessive', 'ablative', 'allative'],
    color: '#ff7b4a',
    groupType: 'broad',
  },
  // === MOVEMENT-BASED GROUPS ===
  {
    id: 'static',
    name: 'Where? (Static)',
    finnishName: 'Missä? Millä?',
    description: 'In/On: -ssa/-ssä, -lla/-llä',
    cases: ['inessive', 'adessive'],
    color: '#27ae60',
    groupType: 'movement',
  },
  {
    id: 'from',
    name: 'From Where?',
    finnishName: 'Mistä? Miltä?',
    description: 'Out of/Off: -sta/-stä, -lta/-ltä',
    cases: ['elative', 'ablative'],
    color: '#e74c3c',
    groupType: 'movement',
  },
  {
    id: 'to',
    name: 'To Where?',
    finnishName: 'Mihin? Mille?',
    description: 'Into/Onto: -Vn/-seen, -lle',
    cases: ['illative', 'allative'],
    color: '#3498db',
    groupType: 'movement',
  },
  // === INDIVIDUAL CASES ===
  {
    id: 'inessive',
    name: 'Inessive',
    finnishName: 'Inessiivi',
    description: 'In/Inside: -ssa/-ssä (talossa)',
    cases: ['inessive'],
    color: '#2ecc71',
    groupType: 'individual',
  },
  {
    id: 'elative',
    name: 'Elative',
    finnishName: 'Elatiivi',
    description: 'From (inside): -sta/-stä (talosta)',
    cases: ['elative'],
    color: '#e67e22',
    groupType: 'individual',
  },
  {
    id: 'illative',
    name: 'Illative',
    finnishName: 'Illatiivi',
    description: 'Into: -Vn/-seen (taloon)',
    cases: ['illative'],
    color: '#9b59b6',
    groupType: 'individual',
  },
  {
    id: 'adessive',
    name: 'Adessive',
    finnishName: 'Adessiivi',
    description: 'On/At: -lla/-llä (pöydällä)',
    cases: ['adessive'],
    color: '#1abc9c',
    groupType: 'individual',
  },
  {
    id: 'ablative',
    name: 'Ablative',
    finnishName: 'Ablatiivi',
    description: 'From (surface): -lta/-ltä (pöydältä)',
    cases: ['ablative'],
    color: '#f39c12',
    groupType: 'individual',
  },
  {
    id: 'allative',
    name: 'Allative',
    finnishName: 'Allatiivi',
    description: 'To/Onto: -lle (pöydälle)',
    cases: ['allative'],
    color: '#e91e63',
    groupType: 'individual',
  },
];

// Helper to get case ending explanation
export function getCaseEndingExplanation(caseType: CaseType): string {
  const explanations: Record<CaseType, string> = {
    inessive: 'Add -ssa/-ssä to the stem. Use -ssä after front vowels (ä, ö, y, i, e).',
    elative: 'Add -sta/-stä to the stem. Use -stä after front vowels.',
    illative: 'Double the final vowel + n, OR add -seen after long vowel/diphthong, OR add -iin for some plurals.',
    adessive: 'Add -lla/-llä to the stem. Use -llä after front vowels.',
    ablative: 'Add -lta/-ltä to the stem. Use -ltä after front vowels.',
    allative: 'Add -lle to the stem. Always -lle (no vowel harmony).',
  };
  return explanations[caseType];
}

// Helper to determine if a word uses front or back vowel harmony
export function usesBackVowelHarmony(word: string): boolean {
  const backVowels = ['a', 'o', 'u'];
  const frontVowels = ['ä', 'ö', 'y'];
  
  // Check from the end of the word
  for (let i = word.length - 1; i >= 0; i--) {
    const char = word[i].toLowerCase();
    if (backVowels.includes(char)) return true;
    if (frontVowels.includes(char)) return false;
  }
  
  // Default to back vowel if no vowels found
  return true;
}

// Get the correct case ending based on vowel harmony
export function getCaseEnding(caseType: CaseType, useBack: boolean): string {
  const endings: Record<CaseType, [string, string]> = {
    inessive: ['-ssa', '-ssä'],
    elative: ['-sta', '-stä'],
    illative: ['-Vn', '-Vn'], // Special case, depends on word
    adessive: ['-lla', '-llä'],
    ablative: ['-lta', '-ltä'],
    allative: ['-lle', '-lle'], // Always same
  };
  
  return useBack ? endings[caseType][0] : endings[caseType][1];
}

