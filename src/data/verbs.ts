import type { Verb } from '../types';

// Finnish verb type rules and explanations
export const verbTypeInfo: Record<number, {
  name: string;
  rule: string;
  stemRule: string;
  examples: string[];
}> = {
  1: {
    name: 'Type 1 (puhua)',
    rule: 'Remove -a/-ä from infinitive to get stem. Add personal endings: -n, -t, -∅/-V, -mme, -tte, -vat/-vät',
    stemRule: 'puhua → puhu- → puhun, puhut, puhuu, puhumme, puhutte, puhuvat',
    examples: ['puhua', 'sanoa', 'ottaa', 'lukea', 'antaa'],
  },
  2: {
    name: 'Type 2 (syödä)',
    rule: 'Remove -da/-dä from infinitive. Stem ends in vowel. Add: -n, -t, -∅, -mme, -tte, -vät',
    stemRule: 'syödä → syö- → syön, syöt, syö, syömme, syötte, syövät',
    examples: ['syödä', 'juoda', 'tehdä', 'nähdä', 'voida'],
  },
  3: {
    name: 'Type 3 (tulla)',
    rule: 'Remove -la/-lä, -na/-nä, -ra/-rä, or -sta/-stä. Add -e- before endings: -n, -t, -ee, -mme, -tte, -evat',
    stemRule: 'tulla → tul- → tulen | mennä → men- → menen | purra → pur- → puren | nousta → nous- → nousen',
    examples: ['tulla', 'mennä', 'panna', 'purra', 'nousta', 'pestä', 'juosta'],
  },
  4: {
    name: 'Type 4 (haluta)',
    rule: 'Remove -ta/-tä. Add -a-/-ä- before endings. Note: -t- becomes -a-/-ä- in stem',
    stemRule: 'haluta → halua- → haluan, haluat, haluaa, haluamme, haluatte, haluavat',
    examples: ['haluta', 'tavata', 'pelata', 'herätä', 'huomata'],
  },
  5: {
    name: 'Type 5 (tarvita)',
    rule: 'Remove -ta/-tä. Add -tse- before endings. Ending: -ita/-itä → -itse-',
    stemRule: 'tarvita → tarvitse- → tarvitsen, tarvitset, tarvitsee, tarvitsemme, tarvitsette, tarvitsevat',
    examples: ['tarvita', 'valita', 'merkitä', 'häiritä', 'havaita'],
  },
  6: {
    name: 'Type 6 (vanheta)',
    rule: 'Remove -ta/-tä. Add -ne- before endings. Ending: -eta/-etä → -ene-',
    stemRule: 'vanheta → vanhene- → vanhenen, vanhenet, vanhenee, vanhenemme, vanhenette, vanhenevat',
    examples: ['vanheta', 'lämmetä', 'kylmetä', 'paeta', 'rohjeta'],
  },
};

// Imperative (käskymuoto) formation rules
export const imperativeInfo = {
  rule: 'Commands use the verb stem. Sinä uses bare stem, te adds -kaa/-kää, me adds -kaamme/-käämme',
  formation: {
    sinä: 'Use minä-form without -n: puhun → puhu!',
    me: 'Stem + -kaamme/-käämme: puhu + kaamme → puhukaamme! (let\'s speak)',
    te: 'Stem + -kaa/-kää: puhu + kaa → puhukaa! (speak! - formal/plural)',
  },
  negativeRule: 'Negative imperative uses älä/älkäämme/älkää + verb stem (with -ko/-kö for me/te)',
  negativeFormation: {
    sinä: 'älä + stem: älä puhu! (don\'t speak)',
    me: 'älkäämme + stem + -ko/-kö: älkäämme puhuko! (let\'s not speak)',
    te: 'älkää + stem + -ko/-kö: älkää puhuko! (don\'t speak - formal/plural)',
  },
  examples: ['puhu!', 'puhukaa!', 'älä puhu!', 'älkää puhuko!'],
};

// Conditional (konditionaali) formation rules - "would"
export const conditionalInfo = {
  rule: 'Add -isi- to verb stem before personal endings. Expresses wishes, politeness, hypotheticals.',
  formation: 'Stem + -isi- + personal endings: puhu + isi + n → puhuisin (I would speak)',
  personalEndings: '-n, -t, -∅, -mme, -tte, -vat/-vät',
  example: 'puhua → puhuisin, puhuisit, puhuisi, puhuisimme, puhuisitte, puhuisivat',
  negativeRule: 'Negative conditional: en/et/ei/emme/ette/eivät + conditional stem (without -n)',
  negativeExample: 'en puhuisi, et puhuisi, ei puhuisi, emme puhuisi, ette puhuisi, eivät puhuisi',
  usage: [
    'Polite requests: Voisitko auttaa? (Could you help?)',
    'Wishes: Haluaisin kahvia. (I would like coffee.)',
    'Hypotheticals: Jos olisin rikas... (If I were rich...)',
  ],
};

// Conditional Perfect (konditionaalin perfekti) - "would have"
export const conditionalPerfectInfo = {
  rule: 'olla in conditional + past participle (-nut/-nyt for singular, -neet for plural)',
  formation: 'olisin/olisit/olisi/olisimme/olisitte/olisivat + past participle',
  example: 'olisin puhunut, olisit puhunut, olisi puhunut, olisimme puhuneet, olisitte puhuneet, olisivat puhuneet',
  negativeRule: 'en/et/ei/emme/ette/eivät + olisi + past participle',
  negativeExample: 'en olisi puhunut, et olisi puhunut, ei olisi puhunut, emme olisi puhuneet, ette olisi puhuneet, eivät olisi puhuneet',
  usage: [
    'Past hypotheticals: Olisin mennyt, jos... (I would have gone, if...)',
    'Regrets: Olisin voinut auttaa. (I could have helped.)',
    'Unrealized possibilities: Hän olisi tullut. (He/she would have come.)',
  ],
};

// Negative conjugation helper
export const negativeInfo = {
  rule: 'Negative uses: en/et/ei/emme/ette/eivät + verb stem (no personal ending)',
  stemRule: 'The verb stem is the same as minä-form without -n',
  example: 'puhun → en puhu, et puhu, ei puhu, emme puhu, ette puhu, eivät puhu',
};

// Person pronouns in Finnish
export const persons = ['minä', 'sinä', 'hän', 'me', 'te', 'he'] as const;

// Sentence templates for each person - {verb} will be replaced with ___
// These provide context for conjugation practice
export const sentenceTemplates = {
  minä: [
    'Minä {verb} joka päivä.',
    'Minä {verb} aamulla.',
    'Minä {verb} kotona.',
    'Minä {verb} paljon.',
    'Aina minä {verb}.',
  ],
  sinä: [
    'Sinä {verb} hyvin!',
    'Sinä {verb} tänään.',
    'Miksi sinä {verb}?',
    'Sinä {verb} aina.',
    'Milloin sinä {verb}?',
  ],
  hän: [
    'Hän {verb} töissä.',
    'Hän {verb} usein.',
    'Hän {verb} illalla.',
    'Miksi hän {verb}?',
    'Hän {verb} paljon.',
  ],
  me: [
    'Me {verb} yhdessä.',
    'Me {verb} viikonloppuna.',
    'Me {verb} aina.',
    'Milloin me {verb}?',
    'Me {verb} kotona.',
  ],
  te: [
    'Te {verb} hyvin!',
    'Te {verb} tänään.',
    'Miksi te {verb}?',
    'Te {verb} usein.',
    'Milloin te {verb}?',
  ],
  he: [
    'He {verb} paljon.',
    'He {verb} yhdessä.',
    'He {verb} aina.',
    'Miksi he {verb}?',
    'He {verb} illalla.',
  ],
};

// Negative sentence templates
export const negativeSentenceTemplates = {
  minä: [
    'Minä {verb} koskaan.',
    'Minä {verb} tänään.',
    'Miksi minä {verb}?',
    'Minä {verb} sitä.',
    'Valitettavasti minä {verb}.',
  ],
  sinä: [
    'Sinä {verb} tarpeeksi.',
    'Miksi sinä {verb}?',
    'Sinä {verb} sitä.',
    'Sinä {verb} koskaan.',
    'Sinä {verb} tänään.',
  ],
  hän: [
    'Hän {verb} koskaan.',
    'Hän {verb} tänään.',
    'Miksi hän {verb}?',
    'Hän {verb} sitä.',
    'Hän {verb} enää.',
  ],
  me: [
    'Me {verb} sitä.',
    'Me {verb} koskaan.',
    'Miksi me {verb}?',
    'Me {verb} tänään.',
    'Me {verb} enää.',
  ],
  te: [
    'Te {verb} sitä.',
    'Te {verb} koskaan.',
    'Miksi te {verb}?',
    'Te {verb} tarpeeksi.',
    'Te {verb} tänään.',
  ],
  he: [
    'He {verb} koskaan.',
    'He {verb} sitä.',
    'Miksi he {verb}?',
    'He {verb} enää.',
    'He {verb} tänään.',
  ],
};

// Past tense sentence templates (for imperfect practice)
export const imperfectSentenceTemplates = {
  minä: [
    'Minä {verb} eilen.',
    'Minä {verb} viime viikolla.',
    'Minä {verb} aiemmin.',
    'Minä {verb} eilen illalla.',
    'Minä {verb} vuosi sitten.',
  ],
  sinä: [
    'Sinä {verb} eilen.',
    'Sinä {verb} viime viikolla.',
    'Sinä {verb} aiemmin.',
    'Miksi sinä {verb}?',
    'Sinä {verb} eilen illalla.',
  ],
  hän: [
    'Hän {verb} eilen.',
    'Hän {verb} viime viikolla.',
    'Hän {verb} aiemmin.',
    'Hän {verb} eilen illalla.',
    'Hän {verb} vuosi sitten.',
  ],
  me: [
    'Me {verb} eilen.',
    'Me {verb} viime viikolla.',
    'Me {verb} yhdessä.',
    'Me {verb} aiemmin.',
    'Me {verb} eilen illalla.',
  ],
  te: [
    'Te {verb} eilen.',
    'Te {verb} viime viikolla.',
    'Te {verb} aiemmin.',
    'Miksi te {verb}?',
    'Te {verb} eilen illalla.',
  ],
  he: [
    'He {verb} eilen.',
    'He {verb} viime viikolla.',
    'He {verb} aiemmin.',
    'He {verb} yhdessä.',
    'He {verb} vuosi sitten.',
  ],
};

export const imperfectNegativeSentenceTemplates = {
  minä: [
    'Minä {verb} eilen.',
    'Minä {verb} koskaan.',
    'Minä {verb} viime viikolla.',
    'Minä {verb} aiemmin.',
    'Minä {verb} eilen illalla.',
  ],
  sinä: [
    'Sinä {verb} eilen.',
    'Sinä {verb} koskaan.',
    'Sinä {verb} viime viikolla.',
    'Miksi sinä {verb}?',
    'Sinä {verb} aiemmin.',
  ],
  hän: [
    'Hän {verb} eilen.',
    'Hän {verb} koskaan.',
    'Hän {verb} viime viikolla.',
    'Hän {verb} aiemmin.',
    'Hän {verb} eilen illalla.',
  ],
  me: [
    'Me {verb} eilen.',
    'Me {verb} koskaan.',
    'Me {verb} viime viikolla.',
    'Me {verb} aiemmin.',
    'Me {verb} yhdessä.',
  ],
  te: [
    'Te {verb} eilen.',
    'Te {verb} koskaan.',
    'Te {verb} viime viikolla.',
    'Miksi te {verb}?',
    'Te {verb} aiemmin.',
  ],
  he: [
    'He {verb} eilen.',
    'He {verb} koskaan.',
    'He {verb} viime viikolla.',
    'He {verb} aiemmin.',
    'He {verb} yhdessä.',
  ],
};

// Imperative sentence templates (commands)
export const imperativeSentenceTemplates = {
  sinä: [
    '{verb} nyt!',
    '{verb} heti!',
    'Ole kiltti ja {verb}!',
    '{verb} nopeasti!',
    '{verb} minulle!',
  ],
  me: [
    '{verb} yhdessä!',
    '{verb} nyt!',
    '{verb} huomenna!',
    '{verb} tänään!',
    '{verb} ystävät!',
  ],
  te: [
    '{verb} olkaa hyvä!',
    '{verb} nyt!',
    '{verb} heti!',
    '{verb} yhdessä!',
    'Olkaa hyvä ja {verb}!',
  ],
};

export const imperativeNegativeSentenceTemplates = {
  sinä: [
    '{verb} sitä!',
    '{verb} nyt!',
    '{verb} noin!',
    '{verb} minulle!',
    'Ole kiltti, {verb}!',
  ],
  me: [
    '{verb} sitä!',
    '{verb} nyt!',
    '{verb} yhdessä!',
    '{verb} vielä!',
    '{verb} enää!',
  ],
  te: [
    '{verb} sitä!',
    '{verb} nyt!',
    '{verb} noin!',
    '{verb} vielä!',
    'Olkaa kilttejä, {verb}!',
  ],
};

// Conditional sentence templates (would)
export const conditionalSentenceTemplates = {
  minä: [
    'Minä {verb} mielelläni.',
    'Minä {verb}, jos voisin.',
    'Minä {verb} huomenna.',
    'Minä {verb} sen.',
    'Haluaisin, että minä {verb}.',
  ],
  sinä: [
    '{verb} sinä mielelläsi?',
    'Sinä {verb} varmasti.',
    'Mitä sinä {verb}?',
    '{verb} sinä sen?',
    'Toivon, että sinä {verb}.',
  ],
  hän: [
    'Hän {verb} mielelläan.',
    'Hän {verb}, jos voisi.',
    'Hän {verb} varmasti.',
    'Luulen, että hän {verb}.',
    'Hän {verb} sen.',
  ],
  me: [
    'Me {verb} yhdessä.',
    'Me {verb}, jos voisimme.',
    'Me {verb} mielelläme.',
    '{verb} me sen yhdessä?',
    'Toivon, että me {verb}.',
  ],
  te: [
    '{verb} te mielelläne?',
    'Te {verb} varmasti.',
    'Mitä te {verb}?',
    '{verb} te sen?',
    'Te {verb}, jos voisitte.',
  ],
  he: [
    'He {verb} mielelläan.',
    'He {verb}, jos voisivat.',
    'He {verb} varmasti.',
    'Luulen, että he {verb}.',
    'He {verb} sen.',
  ],
};

export const conditionalNegativeSentenceTemplates = {
  minä: [
    'Minä {verb} sitä.',
    'Minä {verb} koskaan.',
    'Minä {verb} nyt.',
    'En usko, että minä {verb}.',
    'Minä {verb} noin.',
  ],
  sinä: [
    'Sinä {verb} sitä.',
    '{verb} sinä sitä?',
    'Sinä {verb} koskaan.',
    'En usko, että sinä {verb}.',
    'Miksi sinä {verb}?',
  ],
  hän: [
    'Hän {verb} sitä.',
    'Hän {verb} koskaan.',
    'Hän {verb} noin.',
    'En usko, että hän {verb}.',
    'Hän {verb} varmaan.',
  ],
  me: [
    'Me {verb} sitä.',
    'Me {verb} koskaan.',
    'Me {verb} noin.',
    '{verb} me sitä?',
    'En usko, että me {verb}.',
  ],
  te: [
    'Te {verb} sitä.',
    'Te {verb} koskaan.',
    '{verb} te sitä?',
    'En usko, että te {verb}.',
    'Te {verb} varmaan.',
  ],
  he: [
    'He {verb} sitä.',
    'He {verb} koskaan.',
    'He {verb} noin.',
    'En usko, että he {verb}.',
    'He {verb} varmaan.',
  ],
};

// Conditional perfect sentence templates (would have)
export const conditionalPerfectSentenceTemplates = {
  minä: [
    'Minä {verb} eilen.',
    'Minä {verb}, jos olisin voinut.',
    'Minä {verb} mielelläni.',
    'Minä {verb} sen.',
    'Jos olisin tiennyt, minä {verb}.',
  ],
  sinä: [
    'Sinä {verb} varmasti.',
    '{verb} sinä sen?',
    'Sinä {verb}, jos olisit voinut.',
    'Luulen, että sinä {verb}.',
    'Jos olisit tiennyt, sinä {verb}.',
  ],
  hän: [
    'Hän {verb} varmasti.',
    'Hän {verb}, jos olisi voinut.',
    'Luulen, että hän {verb}.',
    'Hän {verb} sen.',
    'Jos hän olisi tiennyt, hän {verb}.',
  ],
  me: [
    'Me {verb} yhdessä.',
    'Me {verb}, jos olisimme voineet.',
    'Me {verb} varmasti.',
    '{verb} me sen?',
    'Jos olisimme tienneet, me {verb}.',
  ],
  te: [
    'Te {verb} varmasti.',
    '{verb} te sen?',
    'Te {verb}, jos olisitte voineet.',
    'Luulen, että te {verb}.',
    'Jos olisitte tienneet, te {verb}.',
  ],
  he: [
    'He {verb} varmasti.',
    'He {verb}, jos olisivat voineet.',
    'Luulen, että he {verb}.',
    'He {verb} sen.',
    'Jos he olisivat tienneet, he {verb}.',
  ],
};

export const conditionalPerfectNegativeSentenceTemplates = {
  minä: [
    'Minä {verb} sitä.',
    'Minä {verb} koskaan.',
    'Minä {verb} ilman apua.',
    'En usko, että minä {verb}.',
    'Minä {verb} noin.',
  ],
  sinä: [
    'Sinä {verb} sitä.',
    '{verb} sinä sitä?',
    'Sinä {verb} koskaan.',
    'En usko, että sinä {verb}.',
    'Sinä {verb} ilman apua.',
  ],
  hän: [
    'Hän {verb} sitä.',
    'Hän {verb} koskaan.',
    'Hän {verb} ilman apua.',
    'En usko, että hän {verb}.',
    'Hän {verb} varmaan.',
  ],
  me: [
    'Me {verb} sitä.',
    'Me {verb} koskaan.',
    '{verb} me sitä ilman apua?',
    'En usko, että me {verb}.',
    'Me {verb} yksin.',
  ],
  te: [
    'Te {verb} sitä.',
    'Te {verb} koskaan.',
    '{verb} te sitä ilman apua?',
    'En usko, että te {verb}.',
    'Te {verb} yksin.',
  ],
  he: [
    'He {verb} sitä.',
    'He {verb} koskaan.',
    'He {verb} ilman apua.',
    'En usko, että he {verb}.',
    'He {verb} yksin.',
  ],
};

// Helper to get a random sentence template
export function getRandomSentence(person: string, polarity: 'positive' | 'negative'): string {
  const templates = polarity === 'positive' 
    ? sentenceTemplates[person as keyof typeof sentenceTemplates]
    : negativeSentenceTemplates[person as keyof typeof negativeSentenceTemplates];
  return templates[Math.floor(Math.random() * templates.length)];
}

// Helper to get a random imperfect sentence template
export function getRandomImperfectSentence(person: string, polarity: 'positive' | 'negative'): string {
  const templates = polarity === 'positive' 
    ? imperfectSentenceTemplates[person as keyof typeof imperfectSentenceTemplates]
    : imperfectNegativeSentenceTemplates[person as keyof typeof imperfectNegativeSentenceTemplates];
  return templates[Math.floor(Math.random() * templates.length)];
}

// Helper to get a random imperative sentence template
export function getRandomImperativeSentence(person: 'sinä' | 'me' | 'te', polarity: 'positive' | 'negative'): string {
  const templates = polarity === 'positive' 
    ? imperativeSentenceTemplates[person]
    : imperativeNegativeSentenceTemplates[person];
  return templates[Math.floor(Math.random() * templates.length)];
}

// Helper to get a random conditional sentence template
export function getRandomConditionalSentence(person: string, polarity: 'positive' | 'negative'): string {
  const templates = polarity === 'positive' 
    ? conditionalSentenceTemplates[person as keyof typeof conditionalSentenceTemplates]
    : conditionalNegativeSentenceTemplates[person as keyof typeof conditionalNegativeSentenceTemplates];
  return templates[Math.floor(Math.random() * templates.length)];
}

// Helper to get a random conditional perfect sentence template
export function getRandomConditionalPerfectSentence(person: string, polarity: 'positive' | 'negative'): string {
  const templates = polarity === 'positive' 
    ? conditionalPerfectSentenceTemplates[person as keyof typeof conditionalPerfectSentenceTemplates]
    : conditionalPerfectNegativeSentenceTemplates[person as keyof typeof conditionalPerfectNegativeSentenceTemplates];
  return templates[Math.floor(Math.random() * templates.length)];
}

// ============ Type 1-6 Verbs ============
// All verbs organized by their conjugation type (1-6)
const allVerbs: Verb[] = [
  // === TYPE 3 VERBS ===
  { 
    infinitive: 'olla', type: 3, translation: 'to be', synonyms: ['be'],
    forms: {
      present: { minä: 'olen', sinä: 'olet', hän: 'on', me: 'olemme', te: 'olette', he: 'ovat' },
      negative: { minä: 'en ole', sinä: 'et ole', hän: 'ei ole', me: 'emme ole', te: 'ette ole', he: 'eivät ole' },
      imperfect: { minä: 'olin', sinä: 'olit', hän: 'oli', me: 'olimme', te: 'olitte', he: 'olivat' },
      imperfectNegative: { minä: 'en ollut', sinä: 'et ollut', hän: 'ei ollut', me: 'emme olleet', te: 'ette olleet', he: 'eivät olleet' },
      imperative: { sinä: 'ole', me: 'olkaamme', te: 'olkaa' },
      imperativeNegative: { sinä: 'älä ole', me: 'älkäämme olko', te: 'älkää olko' },
      conditional: { minä: 'olisin', sinä: 'olisit', hän: 'olisi', me: 'olisimme', te: 'olisitte', he: 'olisivat' },
      conditionalNegative: { minä: 'en olisi', sinä: 'et olisi', hän: 'ei olisi', me: 'emme olisi', te: 'ette olisi', he: 'eivät olisi' },
      conditionalPerfect: { minä: 'olisin ollut', sinä: 'olisit ollut', hän: 'olisi ollut', me: 'olisimme olleet', te: 'olisitte olleet', he: 'olisivat olleet' },
      conditionalPerfectNegative: { minä: 'en olisi ollut', sinä: 'et olisi ollut', hän: 'ei olisi ollut', me: 'emme olisi olleet', te: 'ette olisi olleet', he: 'eivät olisi olleet' },
    }
  },
  // === TYPE 1 VERBS ===
  { 
    infinitive: 'puhua', type: 1, translation: 'to speak', synonyms: ['speak', 'talk'],
    forms: {
      present: { minä: 'puhun', sinä: 'puhut', hän: 'puhuu', me: 'puhumme', te: 'puhutte', he: 'puhuvat' },
      negative: { minä: 'en puhu', sinä: 'et puhu', hän: 'ei puhu', me: 'emme puhu', te: 'ette puhu', he: 'eivät puhu' },
      imperfect: { minä: 'puhuin', sinä: 'puhuit', hän: 'puhui', me: 'puhuimme', te: 'puhuitte', he: 'puhuivat' },
      imperfectNegative: { minä: 'en puhunut', sinä: 'et puhunut', hän: 'ei puhunut', me: 'emme puhuneet', te: 'ette puhuneet', he: 'eivät puhuneet' },
      imperative: { sinä: 'puhu', me: 'puhukaamme', te: 'puhukaa' },
      imperativeNegative: { sinä: 'älä puhu', me: 'älkäämme puhuko', te: 'älkää puhuko' },
      conditional: { minä: 'puhuisin', sinä: 'puhuisit', hän: 'puhuisi', me: 'puhuisimme', te: 'puhuisitte', he: 'puhuisivat' },
      conditionalNegative: { minä: 'en puhuisi', sinä: 'et puhuisi', hän: 'ei puhuisi', me: 'emme puhuisi', te: 'ette puhuisi', he: 'eivät puhuisi' },
      conditionalPerfect: { minä: 'olisin puhunut', sinä: 'olisit puhunut', hän: 'olisi puhunut', me: 'olisimme puhuneet', te: 'olisitte puhuneet', he: 'olisivat puhuneet' },
      conditionalPerfectNegative: { minä: 'en olisi puhunut', sinä: 'et olisi puhunut', hän: 'ei olisi puhunut', me: 'emme olisi puhuneet', te: 'ette olisi puhuneet', he: 'eivät olisi puhuneet' },
    }
  },
  { 
    infinitive: 'syödä', type: 2, translation: 'to eat', synonyms: ['eat'],
    forms: {
      present: { minä: 'syön', sinä: 'syöt', hän: 'syö', me: 'syömme', te: 'syötte', he: 'syövät' },
      negative: { minä: 'en syö', sinä: 'et syö', hän: 'ei syö', me: 'emme syö', te: 'ette syö', he: 'eivät syö' },
      imperfect: { minä: 'söin', sinä: 'söit', hän: 'söi', me: 'söimme', te: 'söitte', he: 'söivät' },
      imperfectNegative: { minä: 'en syönyt', sinä: 'et syönyt', hän: 'ei syönyt', me: 'emme syöneet', te: 'ette syöneet', he: 'eivät syöneet' },
      imperative: { sinä: 'syö', me: 'syökäämme', te: 'syökää' },
      imperativeNegative: { sinä: 'älä syö', me: 'älkäämme syökö', te: 'älkää syökö' },
      conditional: { minä: 'söisin', sinä: 'söisit', hän: 'söisi', me: 'söisimme', te: 'söisitte', he: 'söisivät' },
      conditionalNegative: { minä: 'en söisi', sinä: 'et söisi', hän: 'ei söisi', me: 'emme söisi', te: 'ette söisi', he: 'eivät söisi' },
      conditionalPerfect: { minä: 'olisin syönyt', sinä: 'olisit syönyt', hän: 'olisi syönyt', me: 'olisimme syöneet', te: 'olisitte syöneet', he: 'olisivat syöneet' },
      conditionalPerfectNegative: { minä: 'en olisi syönyt', sinä: 'et olisi syönyt', hän: 'ei olisi syönyt', me: 'emme olisi syöneet', te: 'ette olisi syöneet', he: 'eivät olisi syöneet' },
    }
  },
  { 
    infinitive: 'juoda', type: 2, translation: 'to drink', synonyms: ['drink'],
    forms: {
      present: { minä: 'juon', sinä: 'juot', hän: 'juo', me: 'juomme', te: 'juotte', he: 'juovat' },
      negative: { minä: 'en juo', sinä: 'et juo', hän: 'ei juo', me: 'emme juo', te: 'ette juo', he: 'eivät juo' },
      imperfect: { minä: 'join', sinä: 'joit', hän: 'joi', me: 'joimme', te: 'joitte', he: 'joivat' },
      imperfectNegative: { minä: 'en juonut', sinä: 'et juonut', hän: 'ei juonut', me: 'emme juoneet', te: 'ette juoneet', he: 'eivät juoneet' },
      imperative: { sinä: 'juo', me: 'juokaamme', te: 'juokaa' },
      imperativeNegative: { sinä: 'älä juo', me: 'älkäämme juoko', te: 'älkää juoko' },
      conditional: { minä: 'joisin', sinä: 'joisit', hän: 'joisi', me: 'joisimme', te: 'joisitte', he: 'joisivat' },
      conditionalNegative: { minä: 'en joisi', sinä: 'et joisi', hän: 'ei joisi', me: 'emme joisi', te: 'ette joisi', he: 'eivät joisi' },
      conditionalPerfect: { minä: 'olisin juonut', sinä: 'olisit juonut', hän: 'olisi juonut', me: 'olisimme juoneet', te: 'olisitte juoneet', he: 'olisivat juoneet' },
      conditionalPerfectNegative: { minä: 'en olisi juonut', sinä: 'et olisi juonut', hän: 'ei olisi juonut', me: 'emme olisi juoneet', te: 'ette olisi juoneet', he: 'eivät olisi juoneet' },
    }
  },
  { 
    infinitive: 'mennä', type: 3, translation: 'to go', synonyms: ['go'],
    forms: {
      present: { minä: 'menen', sinä: 'menet', hän: 'menee', me: 'menemme', te: 'menette', he: 'menevät' },
      negative: { minä: 'en mene', sinä: 'et mene', hän: 'ei mene', me: 'emme mene', te: 'ette mene', he: 'eivät mene' },
      imperfect: { minä: 'menin', sinä: 'menit', hän: 'meni', me: 'menimme', te: 'menitte', he: 'menivät' },
      imperfectNegative: { minä: 'en mennyt', sinä: 'et mennyt', hän: 'ei mennyt', me: 'emme menneet', te: 'ette menneet', he: 'eivät menneet' },
      imperative: { sinä: 'mene', me: 'menkäämme', te: 'menkää' },
      imperativeNegative: { sinä: 'älä mene', me: 'älkäämme menkö', te: 'älkää menkö' },
      conditional: { minä: 'menisin', sinä: 'menisit', hän: 'menisi', me: 'menisimme', te: 'menisitte', he: 'menisivät' },
      conditionalNegative: { minä: 'en menisi', sinä: 'et menisi', hän: 'ei menisi', me: 'emme menisi', te: 'ette menisi', he: 'eivät menisi' },
      conditionalPerfect: { minä: 'olisin mennyt', sinä: 'olisit mennyt', hän: 'olisi mennyt', me: 'olisimme menneet', te: 'olisitte menneet', he: 'olisivat menneet' },
      conditionalPerfectNegative: { minä: 'en olisi mennyt', sinä: 'et olisi mennyt', hän: 'ei olisi mennyt', me: 'emme olisi menneet', te: 'ette olisi menneet', he: 'eivät olisi menneet' },
    }
  },
  { 
    infinitive: 'tulla', type: 3, translation: 'to come', synonyms: ['come'],
    forms: {
      present: { minä: 'tulen', sinä: 'tulet', hän: 'tulee', me: 'tulemme', te: 'tulette', he: 'tulevat' },
      negative: { minä: 'en tule', sinä: 'et tule', hän: 'ei tule', me: 'emme tule', te: 'ette tule', he: 'eivät tule' },
      imperfect: { minä: 'tulin', sinä: 'tulit', hän: 'tuli', me: 'tulimme', te: 'tulitte', he: 'tulivat' },
      imperfectNegative: { minä: 'en tullut', sinä: 'et tullut', hän: 'ei tullut', me: 'emme tulleet', te: 'ette tulleet', he: 'eivät tulleet' },
      imperative: { sinä: 'tule', me: 'tulkaamme', te: 'tulkaa' },
      imperativeNegative: { sinä: 'älä tule', me: 'älkäämme tulko', te: 'älkää tulko' },
      conditional: { minä: 'tulisin', sinä: 'tulisit', hän: 'tulisi', me: 'tulisimme', te: 'tulisitte', he: 'tulisivat' },
      conditionalNegative: { minä: 'en tulisi', sinä: 'et tulisi', hän: 'ei tulisi', me: 'emme tulisi', te: 'ette tulisi', he: 'eivät tulisi' },
      conditionalPerfect: { minä: 'olisin tullut', sinä: 'olisit tullut', hän: 'olisi tullut', me: 'olisimme tulleet', te: 'olisitte tulleet', he: 'olisivat tulleet' },
      conditionalPerfectNegative: { minä: 'en olisi tullut', sinä: 'et olisi tullut', hän: 'ei olisi tullut', me: 'emme olisi tulleet', te: 'ette olisi tulleet', he: 'eivät olisi tulleet' },
    }
  },
  { 
    infinitive: 'tehdä', type: 2, translation: 'to do', synonyms: ['do', 'make'],
    forms: {
      present: { minä: 'teen', sinä: 'teet', hän: 'tekee', me: 'teemme', te: 'teette', he: 'tekevät' },
      negative: { minä: 'en tee', sinä: 'et tee', hän: 'ei tee', me: 'emme tee', te: 'ette tee', he: 'eivät tee' },
      imperfect: { minä: 'tein', sinä: 'teit', hän: 'teki', me: 'teimme', te: 'teitte', he: 'tekivät' },
      imperfectNegative: { minä: 'en tehnyt', sinä: 'et tehnyt', hän: 'ei tehnyt', me: 'emme tehneet', te: 'ette tehneet', he: 'eivät tehneet' },
      imperative: { sinä: 'tee', me: 'tehkäämme', te: 'tehkää' },
      imperativeNegative: { sinä: 'älä tee', me: 'älkäämme tehkö', te: 'älkää tehkö' },
      conditional: { minä: 'tekisin', sinä: 'tekisit', hän: 'tekisi', me: 'tekisimme', te: 'tekisitte', he: 'tekisivät' },
      conditionalNegative: { minä: 'en tekisi', sinä: 'et tekisi', hän: 'ei tekisi', me: 'emme tekisi', te: 'ette tekisi', he: 'eivät tekisi' },
      conditionalPerfect: { minä: 'olisin tehnyt', sinä: 'olisit tehnyt', hän: 'olisi tehnyt', me: 'olisimme tehneet', te: 'olisitte tehneet', he: 'olisivat tehneet' },
      conditionalPerfectNegative: { minä: 'en olisi tehnyt', sinä: 'et olisi tehnyt', hän: 'ei olisi tehnyt', me: 'emme olisi tehneet', te: 'ette olisi tehneet', he: 'eivät olisi tehneet' },
    }
  },
  { 
    infinitive: 'sanoa', type: 1, translation: 'to say', synonyms: ['say', 'tell'],
    forms: {
      present: { minä: 'sanon', sinä: 'sanot', hän: 'sanoo', me: 'sanomme', te: 'sanotte', he: 'sanovat' },
      negative: { minä: 'en sano', sinä: 'et sano', hän: 'ei sano', me: 'emme sano', te: 'ette sano', he: 'eivät sano' },
      imperfect: { minä: 'sanoin', sinä: 'sanoit', hän: 'sanoi', me: 'sanoimme', te: 'sanoitte', he: 'sanoivat' },
      imperfectNegative: { minä: 'en sanonut', sinä: 'et sanonut', hän: 'ei sanonut', me: 'emme sanoneet', te: 'ette sanoneet', he: 'eivät sanoneet' },
      imperative: { sinä: 'sano', me: 'sanokaamme', te: 'sanokaa' },
      imperativeNegative: { sinä: 'älä sano', me: 'älkäämme sanoko', te: 'älkää sanoko' },
      conditional: { minä: 'sanoisin', sinä: 'sanoisit', hän: 'sanoisi', me: 'sanoisimme', te: 'sanoisitte', he: 'sanoisivat' },
      conditionalNegative: { minä: 'en sanoisi', sinä: 'et sanoisi', hän: 'ei sanoisi', me: 'emme sanoisi', te: 'ette sanoisi', he: 'eivät sanoisi' },
      conditionalPerfect: { minä: 'olisin sanonut', sinä: 'olisit sanonut', hän: 'olisi sanonut', me: 'olisimme sanoneet', te: 'olisitte sanoneet', he: 'olisivat sanoneet' },
      conditionalPerfectNegative: { minä: 'en olisi sanonut', sinä: 'et olisi sanonut', hän: 'ei olisi sanonut', me: 'emme olisi sanoneet', te: 'ette olisi sanoneet', he: 'eivät olisi sanoneet' },
    }
  },
  { 
    infinitive: 'haluta', type: 4, translation: 'to want', synonyms: ['want'],
    forms: {
      present: { minä: 'haluan', sinä: 'haluat', hän: 'haluaa', me: 'haluamme', te: 'haluatte', he: 'haluavat' },
      negative: { minä: 'en halua', sinä: 'et halua', hän: 'ei halua', me: 'emme halua', te: 'ette halua', he: 'eivät halua' },
      imperfect: { minä: 'halusin', sinä: 'halusit', hän: 'halusi', me: 'halusimme', te: 'halusitte', he: 'halusivat' },
      imperfectNegative: { minä: 'en halunnut', sinä: 'et halunnut', hän: 'ei halunnut', me: 'emme halunneet', te: 'ette halunneet', he: 'eivät halunneet' },
      imperative: { sinä: 'halua', me: 'halutkaamme', te: 'halutkaa' },
      imperativeNegative: { sinä: 'älä halua', me: 'älkäämme halutko', te: 'älkää halutko' },
      conditional: { minä: 'haluaisin', sinä: 'haluaisit', hän: 'haluaisi', me: 'haluaisimme', te: 'haluaisitte', he: 'haluaisivat' },
      conditionalNegative: { minä: 'en haluaisi', sinä: 'et haluaisi', hän: 'ei haluaisi', me: 'emme haluaisi', te: 'ette haluaisi', he: 'eivät haluaisi' },
      conditionalPerfect: { minä: 'olisin halunnut', sinä: 'olisit halunnut', hän: 'olisi halunnut', me: 'olisimme halunneet', te: 'olisitte halunneet', he: 'olisivat halunneet' },
      conditionalPerfectNegative: { minä: 'en olisi halunnut', sinä: 'et olisi halunnut', hän: 'ei olisi halunnut', me: 'emme olisi halunneet', te: 'ette olisi halunneet', he: 'eivät olisi halunneet' },
    }
  },
  { 
    infinitive: 'voida', type: 2, translation: 'to be able to', synonyms: ['can', 'be able'],
    forms: {
      present: { minä: 'voin', sinä: 'voit', hän: 'voi', me: 'voimme', te: 'voitte', he: 'voivat' },
      negative: { minä: 'en voi', sinä: 'et voi', hän: 'ei voi', me: 'emme voi', te: 'ette voi', he: 'eivät voi' },
      imperfect: { minä: 'voin', sinä: 'voit', hän: 'voi', me: 'voimme', te: 'voitte', he: 'voivat' },
      imperfectNegative: { minä: 'en voinut', sinä: 'et voinut', hän: 'ei voinut', me: 'emme voineet', te: 'ette voineet', he: 'eivät voineet' },
      imperative: { sinä: 'voi', me: 'voikaamme', te: 'voikaa' },
      imperativeNegative: { sinä: 'älä voi', me: 'älkäämme voiko', te: 'älkää voiko' },
      conditional: { minä: 'voisin', sinä: 'voisit', hän: 'voisi', me: 'voisimme', te: 'voisitte', he: 'voisivat' },
      conditionalNegative: { minä: 'en voisi', sinä: 'et voisi', hän: 'ei voisi', me: 'emme voisi', te: 'ette voisi', he: 'eivät voisi' },
      conditionalPerfect: { minä: 'olisin voinut', sinä: 'olisit voinut', hän: 'olisi voinut', me: 'olisimme voineet', te: 'olisitte voineet', he: 'olisivat voineet' },
      conditionalPerfectNegative: { minä: 'en olisi voinut', sinä: 'et olisi voinut', hän: 'ei olisi voinut', me: 'emme olisi voineet', te: 'ette olisi voineet', he: 'eivät olisi voineet' },
    }
  },
  { 
    infinitive: 'saada', type: 2, translation: 'to get', synonyms: ['get', 'receive'],
    forms: {
      present: { minä: 'saan', sinä: 'saat', hän: 'saa', me: 'saamme', te: 'saatte', he: 'saavat' },
      negative: { minä: 'en saa', sinä: 'et saa', hän: 'ei saa', me: 'emme saa', te: 'ette saa', he: 'eivät saa' },
      imperfect: { minä: 'sain', sinä: 'sait', hän: 'sai', me: 'saimme', te: 'saitte', he: 'saivat' },
      imperfectNegative: { minä: 'en saanut', sinä: 'et saanut', hän: 'ei saanut', me: 'emme saaneet', te: 'ette saaneet', he: 'eivät saaneet' },
      imperative: { sinä: 'saa', me: 'saakaamme', te: 'saakaa' },
      imperativeNegative: { sinä: 'älä saa', me: 'älkäämme saako', te: 'älkää saako' },
      conditional: { minä: 'saisin', sinä: 'saisit', hän: 'saisi', me: 'saisimme', te: 'saisitte', he: 'saisivat' },
      conditionalNegative: { minä: 'en saisi', sinä: 'et saisi', hän: 'ei saisi', me: 'emme saisi', te: 'ette saisi', he: 'eivät saisi' },
      conditionalPerfect: { minä: 'olisin saanut', sinä: 'olisit saanut', hän: 'olisi saanut', me: 'olisimme saaneet', te: 'olisitte saaneet', he: 'olisivat saaneet' },
      conditionalPerfectNegative: { minä: 'en olisi saanut', sinä: 'et olisi saanut', hän: 'ei olisi saanut', me: 'emme olisi saaneet', te: 'ette olisi saaneet', he: 'eivät olisi saaneet' },
    }
  },
  { 
    infinitive: 'nähdä', type: 2, translation: 'to see', synonyms: ['see'],
    forms: {
      present: { minä: 'näen', sinä: 'näet', hän: 'näkee', me: 'näemme', te: 'näette', he: 'näkevät' },
      negative: { minä: 'en näe', sinä: 'et näe', hän: 'ei näe', me: 'emme näe', te: 'ette näe', he: 'eivät näe' },
      imperfect: { minä: 'näin', sinä: 'näit', hän: 'näki', me: 'näimme', te: 'näitte', he: 'näkivät' },
      imperfectNegative: { minä: 'en nähnyt', sinä: 'et nähnyt', hän: 'ei nähnyt', me: 'emme nähneet', te: 'ette nähneet', he: 'eivät nähneet' },
      imperative: { sinä: 'näe', me: 'nähkäämme', te: 'nähkää' },
      imperativeNegative: { sinä: 'älä näe', me: 'älkäämme nähkö', te: 'älkää nähkö' },
      conditional: { minä: 'näkisin', sinä: 'näkisit', hän: 'näkisi', me: 'näkisimme', te: 'näkisitte', he: 'näkisivät' },
      conditionalNegative: { minä: 'en näkisi', sinä: 'et näkisi', hän: 'ei näkisi', me: 'emme näkisi', te: 'ette näkisi', he: 'eivät näkisi' },
      conditionalPerfect: { minä: 'olisin nähnyt', sinä: 'olisit nähnyt', hän: 'olisi nähnyt', me: 'olisimme nähneet', te: 'olisitte nähneet', he: 'olisivat nähneet' },
      conditionalPerfectNegative: { minä: 'en olisi nähnyt', sinä: 'et olisi nähnyt', hän: 'ei olisi nähnyt', me: 'emme olisi nähneet', te: 'ette olisi nähneet', he: 'eivät olisi nähneet' },
    }
  },
  { 
    infinitive: 'tietää', type: 1, translation: 'to know', synonyms: ['know'],
    forms: {
      present: { minä: 'tiedän', sinä: 'tiedät', hän: 'tietää', me: 'tiedämme', te: 'tiedätte', he: 'tietävät' },
      negative: { minä: 'en tiedä', sinä: 'et tiedä', hän: 'ei tiedä', me: 'emme tiedä', te: 'ette tiedä', he: 'eivät tiedä' },
      imperfect: { minä: 'tiesin', sinä: 'tiesit', hän: 'tiesi', me: 'tiesimme', te: 'tiesitte', he: 'tiesivät' },
      imperfectNegative: { minä: 'en tiennyt', sinä: 'et tiennyt', hän: 'ei tiennyt', me: 'emme tienneet', te: 'ette tienneet', he: 'eivät tienneet' },
      imperative: { sinä: 'tiedä', me: 'tietäkäämme', te: 'tietäkää' },
      imperativeNegative: { sinä: 'älä tiedä', me: 'älkäämme tietäkö', te: 'älkää tietäkö' },
      conditional: { minä: 'tietäisin', sinä: 'tietäisit', hän: 'tietäisi', me: 'tietäisimme', te: 'tietäisitte', he: 'tietäisivät' },
      conditionalNegative: { minä: 'en tietäisi', sinä: 'et tietäisi', hän: 'ei tietäisi', me: 'emme tietäisi', te: 'ette tietäisi', he: 'eivät tietäisi' },
      conditionalPerfect: { minä: 'olisin tiennyt', sinä: 'olisit tiennyt', hän: 'olisi tiennyt', me: 'olisimme tienneet', te: 'olisitte tienneet', he: 'olisivat tienneet' },
      conditionalPerfectNegative: { minä: 'en olisi tiennyt', sinä: 'et olisi tiennyt', hän: 'ei olisi tiennyt', me: 'emme olisi tienneet', te: 'ette olisi tienneet', he: 'eivät olisi tienneet' },
    }
  },
  { 
    infinitive: 'ottaa', type: 1, translation: 'to take', synonyms: ['take'],
    forms: {
      present: { minä: 'otan', sinä: 'otat', hän: 'ottaa', me: 'otamme', te: 'otatte', he: 'ottavat' },
      negative: { minä: 'en ota', sinä: 'et ota', hän: 'ei ota', me: 'emme ota', te: 'ette ota', he: 'eivät ota' },
      imperfect: { minä: 'otin', sinä: 'otit', hän: 'otti', me: 'otimme', te: 'otitte', he: 'ottivat' },
      imperfectNegative: { minä: 'en ottanut', sinä: 'et ottanut', hän: 'ei ottanut', me: 'emme ottaneet', te: 'ette ottaneet', he: 'eivät ottaneet' },
      imperative: { sinä: 'ota', me: 'ottakaamme', te: 'ottakaa' },
      imperativeNegative: { sinä: 'älä ota', me: 'älkäämme ottako', te: 'älkää ottako' },
      conditional: { minä: 'ottaisin', sinä: 'ottaisit', hän: 'ottaisi', me: 'ottaisimme', te: 'ottaisitte', he: 'ottaisivat' },
      conditionalNegative: { minä: 'en ottaisi', sinä: 'et ottaisi', hän: 'ei ottaisi', me: 'emme ottaisi', te: 'ette ottaisi', he: 'eivät ottaisi' },
      conditionalPerfect: { minä: 'olisin ottanut', sinä: 'olisit ottanut', hän: 'olisi ottanut', me: 'olisimme ottaneet', te: 'olisitte ottaneet', he: 'olisivat ottaneet' },
      conditionalPerfectNegative: { minä: 'en olisi ottanut', sinä: 'et olisi ottanut', hän: 'ei olisi ottanut', me: 'emme olisi ottaneet', te: 'ette olisi ottaneet', he: 'eivät olisi ottaneet' },
    }
  },
  { 
    infinitive: 'antaa', type: 1, translation: 'to give', synonyms: ['give'],
    forms: {
      present: { minä: 'annan', sinä: 'annat', hän: 'antaa', me: 'annamme', te: 'annatte', he: 'antavat' },
      negative: { minä: 'en anna', sinä: 'et anna', hän: 'ei anna', me: 'emme anna', te: 'ette anna', he: 'eivät anna' },
      imperfect: { minä: 'annoin', sinä: 'annoit', hän: 'antoi', me: 'annoimme', te: 'annoitte', he: 'antoivat' },
      imperfectNegative: { minä: 'en antanut', sinä: 'et antanut', hän: 'ei antanut', me: 'emme antaneet', te: 'ette antaneet', he: 'eivät antaneet' },
      imperative: { sinä: 'anna', me: 'antakaamme', te: 'antakaa' },
      imperativeNegative: { sinä: 'älä anna', me: 'älkäämme antako', te: 'älkää antako' },
      conditional: { minä: 'antaisin', sinä: 'antaisit', hän: 'antaisi', me: 'antaisimme', te: 'antaisitte', he: 'antaisivat' },
      conditionalNegative: { minä: 'en antaisi', sinä: 'et antaisi', hän: 'ei antaisi', me: 'emme antaisi', te: 'ette antaisi', he: 'eivät antaisi' },
      conditionalPerfect: { minä: 'olisin antanut', sinä: 'olisit antanut', hän: 'olisi antanut', me: 'olisimme antaneet', te: 'olisitte antaneet', he: 'olisivat antaneet' },
      conditionalPerfectNegative: { minä: 'en olisi antanut', sinä: 'et olisi antanut', hän: 'ei olisi antanut', me: 'emme olisi antaneet', te: 'ette olisi antaneet', he: 'eivät olisi antaneet' },
    }
  },
  { 
    infinitive: 'asua', type: 1, translation: 'to live', synonyms: ['live', 'reside'],
    forms: {
      present: { minä: 'asun', sinä: 'asut', hän: 'asuu', me: 'asumme', te: 'asutte', he: 'asuvat' },
      negative: { minä: 'en asu', sinä: 'et asu', hän: 'ei asu', me: 'emme asu', te: 'ette asu', he: 'eivät asu' },
      imperfect: { minä: 'asuin', sinä: 'asuit', hän: 'asui', me: 'asuimme', te: 'asuitte', he: 'asuivat' },
      imperfectNegative: { minä: 'en asunut', sinä: 'et asunut', hän: 'ei asunut', me: 'emme asuneet', te: 'ette asuneet', he: 'eivät asuneet' },
      imperative: { sinä: 'asu', me: 'asukaamme', te: 'asukaa' },
      imperativeNegative: { sinä: 'älä asu', me: 'älkäämme asuko', te: 'älkää asuko' },
      conditional: { minä: 'asuisin', sinä: 'asuisit', hän: 'asuisi', me: 'asuisimme', te: 'asuisitte', he: 'asuisivat' },
      conditionalNegative: { minä: 'en asuisi', sinä: 'et asuisi', hän: 'ei asuisi', me: 'emme asuisi', te: 'ette asuisi', he: 'eivät asuisi' },
      conditionalPerfect: { minä: 'olisin asunut', sinä: 'olisit asunut', hän: 'olisi asunut', me: 'olisimme asuneet', te: 'olisitte asuneet', he: 'olisivat asuneet' },
      conditionalPerfectNegative: { minä: 'en olisi asunut', sinä: 'et olisi asunut', hän: 'ei olisi asunut', me: 'emme olisi asuneet', te: 'ette olisi asuneet', he: 'eivät olisi asuneet' },
    }
  },
  { 
    infinitive: 'pitää', type: 1, translation: 'to like', synonyms: ['like', 'must'],
    forms: {
      present: { minä: 'pidän', sinä: 'pidät', hän: 'pitää', me: 'pidämme', te: 'pidätte', he: 'pitävät' },
      negative: { minä: 'en pidä', sinä: 'et pidä', hän: 'ei pidä', me: 'emme pidä', te: 'ette pidä', he: 'eivät pidä' },
      imperfect: { minä: 'pidin', sinä: 'pidit', hän: 'piti', me: 'pidimme', te: 'piditte', he: 'pitivät' },
      imperfectNegative: { minä: 'en pitänyt', sinä: 'et pitänyt', hän: 'ei pitänyt', me: 'emme pitäneet', te: 'ette pitäneet', he: 'eivät pitäneet' },
      imperative: { sinä: 'pidä', me: 'pitäkäämme', te: 'pitäkää' },
      imperativeNegative: { sinä: 'älä pidä', me: 'älkäämme pitäkö', te: 'älkää pitäkö' },
      conditional: { minä: 'pitäisin', sinä: 'pitäisit', hän: 'pitäisi', me: 'pitäisimme', te: 'pitäisitte', he: 'pitäisivät' },
      conditionalNegative: { minä: 'en pitäisi', sinä: 'et pitäisi', hän: 'ei pitäisi', me: 'emme pitäisi', te: 'ette pitäisi', he: 'eivät pitäisi' },
      conditionalPerfect: { minä: 'olisin pitänyt', sinä: 'olisit pitänyt', hän: 'olisi pitänyt', me: 'olisimme pitäneet', te: 'olisitte pitäneet', he: 'olisivat pitäneet' },
      conditionalPerfectNegative: { minä: 'en olisi pitänyt', sinä: 'et olisi pitänyt', hän: 'ei olisi pitänyt', me: 'emme olisi pitäneet', te: 'ette olisi pitäneet', he: 'eivät olisi pitäneet' },
    }
  },
  { 
    infinitive: 'lukea', type: 1, translation: 'to read', synonyms: ['read'],
    forms: {
      present: { minä: 'luen', sinä: 'luet', hän: 'lukee', me: 'luemme', te: 'luette', he: 'lukevat' },
      negative: { minä: 'en lue', sinä: 'et lue', hän: 'ei lue', me: 'emme lue', te: 'ette lue', he: 'eivät lue' },
      imperfect: { minä: 'luin', sinä: 'luit', hän: 'luki', me: 'luimme', te: 'luitte', he: 'lukivat' },
      imperfectNegative: { minä: 'en lukenut', sinä: 'et lukenut', hän: 'ei lukenut', me: 'emme lukeneet', te: 'ette lukeneet', he: 'eivät lukeneet' },
      imperative: { sinä: 'lue', me: 'lukekaamme', te: 'lukekaa' },
      imperativeNegative: { sinä: 'älä lue', me: 'älkäämme lukeko', te: 'älkää lukeko' },
      conditional: { minä: 'lukisin', sinä: 'lukisit', hän: 'lukisi', me: 'lukisimme', te: 'lukisitte', he: 'lukisivat' },
      conditionalNegative: { minä: 'en lukisi', sinä: 'et lukisi', hän: 'ei lukisi', me: 'emme lukisi', te: 'ette lukisi', he: 'eivät lukisi' },
      conditionalPerfect: { minä: 'olisin lukenut', sinä: 'olisit lukenut', hän: 'olisi lukenut', me: 'olisimme lukeneet', te: 'olisitte lukeneet', he: 'olisivat lukeneet' },
      conditionalPerfectNegative: { minä: 'en olisi lukenut', sinä: 'et olisi lukenut', hän: 'ei olisi lukenut', me: 'emme olisi lukeneet', te: 'ette olisi lukeneet', he: 'eivät olisi lukeneet' },
    }
  },
  { 
    infinitive: 'kirjoittaa', type: 1, translation: 'to write', synonyms: ['write'],
    forms: {
      present: { minä: 'kirjoitan', sinä: 'kirjoitat', hän: 'kirjoittaa', me: 'kirjoitamme', te: 'kirjoitatte', he: 'kirjoittavat' },
      negative: { minä: 'en kirjoita', sinä: 'et kirjoita', hän: 'ei kirjoita', me: 'emme kirjoita', te: 'ette kirjoita', he: 'eivät kirjoita' },
      imperfect: { minä: 'kirjoitin', sinä: 'kirjoitit', hän: 'kirjoitti', me: 'kirjoitimme', te: 'kirjoititte', he: 'kirjoittivat' },
      imperfectNegative: { minä: 'en kirjoittanut', sinä: 'et kirjoittanut', hän: 'ei kirjoittanut', me: 'emme kirjoittaneet', te: 'ette kirjoittaneet', he: 'eivät kirjoittaneet' },
      imperative: { sinä: 'kirjoita', me: 'kirjoittakaamme', te: 'kirjoittakaa' },
      imperativeNegative: { sinä: 'älä kirjoita', me: 'älkäämme kirjoittako', te: 'älkää kirjoittako' },
      conditional: { minä: 'kirjoittaisin', sinä: 'kirjoittaisit', hän: 'kirjoittaisi', me: 'kirjoittaisimme', te: 'kirjoittaisitte', he: 'kirjoittaisivat' },
      conditionalNegative: { minä: 'en kirjoittaisi', sinä: 'et kirjoittaisi', hän: 'ei kirjoittaisi', me: 'emme kirjoittaisi', te: 'ette kirjoittaisi', he: 'eivät kirjoittaisi' },
      conditionalPerfect: { minä: 'olisin kirjoittanut', sinä: 'olisit kirjoittanut', hän: 'olisi kirjoittanut', me: 'olisimme kirjoittaneet', te: 'olisitte kirjoittaneet', he: 'olisivat kirjoittaneet' },
      conditionalPerfectNegative: { minä: 'en olisi kirjoittanut', sinä: 'et olisi kirjoittanut', hän: 'ei olisi kirjoittanut', me: 'emme olisi kirjoittaneet', te: 'ette olisi kirjoittaneet', he: 'eivät olisi kirjoittaneet' },
    }
  },
  { 
    infinitive: 'oppia', type: 1, translation: 'to learn', synonyms: ['learn'],
    forms: {
      present: { minä: 'opin', sinä: 'opit', hän: 'oppii', me: 'opimme', te: 'opitte', he: 'oppivat' },
      negative: { minä: 'en opi', sinä: 'et opi', hän: 'ei opi', me: 'emme opi', te: 'ette opi', he: 'eivät opi' },
      imperfect: { minä: 'opin', sinä: 'opit', hän: 'oppi', me: 'opimme', te: 'opitte', he: 'oppivat' },
      imperfectNegative: { minä: 'en oppinut', sinä: 'et oppinut', hän: 'ei oppinut', me: 'emme oppineet', te: 'ette oppineet', he: 'eivät oppineet' },
      imperative: { sinä: 'opi', me: 'oppikaamme', te: 'oppikaa' },
      imperativeNegative: { sinä: 'älä opi', me: 'älkäämme oppiko', te: 'älkää oppiko' },
      conditional: { minä: 'oppisin', sinä: 'oppisit', hän: 'oppisi', me: 'oppisimme', te: 'oppisitte', he: 'oppisivat' },
      conditionalNegative: { minä: 'en oppisi', sinä: 'et oppisi', hän: 'ei oppisi', me: 'emme oppisi', te: 'ette oppisi', he: 'eivät oppisi' },
      conditionalPerfect: { minä: 'olisin oppinut', sinä: 'olisit oppinut', hän: 'olisi oppinut', me: 'olisimme oppineet', te: 'olisitte oppineet', he: 'olisivat oppineet' },
      conditionalPerfectNegative: { minä: 'en olisi oppinut', sinä: 'et olisi oppinut', hän: 'ei olisi oppinut', me: 'emme olisi oppineet', te: 'ette olisi oppineet', he: 'eivät olisi oppineet' },
    }
  },
  // === MORE TYPE 1 VERBS ===
  { 
    infinitive: 'kysyä', type: 1, translation: 'to ask', synonyms: ['ask'],
    forms: {
      present: { minä: 'kysyn', sinä: 'kysyt', hän: 'kysyy', me: 'kysymme', te: 'kysytte', he: 'kysyvät' },
      negative: { minä: 'en kysy', sinä: 'et kysy', hän: 'ei kysy', me: 'emme kysy', te: 'ette kysy', he: 'eivät kysy' },
      imperfect: { minä: 'kysyin', sinä: 'kysyit', hän: 'kysyi', me: 'kysyimme', te: 'kysyitte', he: 'kysyivät' },
      imperfectNegative: { minä: 'en kysynyt', sinä: 'et kysynyt', hän: 'ei kysynyt', me: 'emme kysyneet', te: 'ette kysyneet', he: 'eivät kysyneet' },
      imperative: { sinä: 'kysy', me: 'kysykäämme', te: 'kysykää' },
      imperativeNegative: { sinä: 'älä kysy', me: 'älkäämme kysykö', te: 'älkää kysykö' },
      conditional: { minä: 'kysyisin', sinä: 'kysyisit', hän: 'kysyisi', me: 'kysyisimme', te: 'kysyisitte', he: 'kysyisivät' },
      conditionalNegative: { minä: 'en kysyisi', sinä: 'et kysyisi', hän: 'ei kysyisi', me: 'emme kysyisi', te: 'ette kysyisi', he: 'eivät kysyisi' },
      conditionalPerfect: { minä: 'olisin kysynyt', sinä: 'olisit kysynyt', hän: 'olisi kysynyt', me: 'olisimme kysyneet', te: 'olisitte kysyneet', he: 'olisivat kysyneet' },
      conditionalPerfectNegative: { minä: 'en olisi kysynyt', sinä: 'et olisi kysynyt', hän: 'ei olisi kysynyt', me: 'emme olisi kysyneet', te: 'ette olisi kysyneet', he: 'eivät olisi kysyneet' },
    }
  },
  { 
    infinitive: 'odottaa', type: 1, translation: 'to wait', synonyms: ['wait', 'expect'],
    forms: {
      present: { minä: 'odotan', sinä: 'odotat', hän: 'odottaa', me: 'odotamme', te: 'odotatte', he: 'odottavat' },
      negative: { minä: 'en odota', sinä: 'et odota', hän: 'ei odota', me: 'emme odota', te: 'ette odota', he: 'eivät odota' },
      imperfect: { minä: 'odotin', sinä: 'odotit', hän: 'odotti', me: 'odotimme', te: 'odotitte', he: 'odottivat' },
      imperfectNegative: { minä: 'en odottanut', sinä: 'et odottanut', hän: 'ei odottanut', me: 'emme odottaneet', te: 'ette odottaneet', he: 'eivät odottaneet' },
      imperative: { sinä: 'odota', me: 'odottakaamme', te: 'odottakaa' },
      imperativeNegative: { sinä: 'älä odota', me: 'älkäämme odottako', te: 'älkää odottako' },
      conditional: { minä: 'odottaisin', sinä: 'odottaisit', hän: 'odottaisi', me: 'odottaisimme', te: 'odottaisitte', he: 'odottaisivat' },
      conditionalNegative: { minä: 'en odottaisi', sinä: 'et odottaisi', hän: 'ei odottaisi', me: 'emme odottaisi', te: 'ette odottaisi', he: 'eivät odottaisi' },
      conditionalPerfect: { minä: 'olisin odottanut', sinä: 'olisit odottanut', hän: 'olisi odottanut', me: 'olisimme odottaneet', te: 'olisitte odottaneet', he: 'olisivat odottaneet' },
      conditionalPerfectNegative: { minä: 'en olisi odottanut', sinä: 'et olisi odottanut', hän: 'ei olisi odottanut', me: 'emme olisi odottaneet', te: 'ette olisi odottaneet', he: 'eivät olisi odottaneet' },
    }
  },
  { 
    infinitive: 'auttaa', type: 1, translation: 'to help', synonyms: ['help'],
    forms: {
      present: { minä: 'autan', sinä: 'autat', hän: 'auttaa', me: 'autamme', te: 'autatte', he: 'auttavat' },
      negative: { minä: 'en auta', sinä: 'et auta', hän: 'ei auta', me: 'emme auta', te: 'ette auta', he: 'eivät auta' },
      imperfect: { minä: 'autoin', sinä: 'autoit', hän: 'auttoi', me: 'autoimme', te: 'autoitte', he: 'auttoivat' },
      imperfectNegative: { minä: 'en auttanut', sinä: 'et auttanut', hän: 'ei auttanut', me: 'emme auttaneet', te: 'ette auttaneet', he: 'eivät auttaneet' },
      imperative: { sinä: 'auta', me: 'auttakaamme', te: 'auttakaa' },
      imperativeNegative: { sinä: 'älä auta', me: 'älkäämme auttako', te: 'älkää auttako' },
      conditional: { minä: 'auttaisin', sinä: 'auttaisit', hän: 'auttaisi', me: 'auttaisimme', te: 'auttaisitte', he: 'auttaisivat' },
      conditionalNegative: { minä: 'en auttaisi', sinä: 'et auttaisi', hän: 'ei auttaisi', me: 'emme auttaisi', te: 'ette auttaisi', he: 'eivät auttaisi' },
      conditionalPerfect: { minä: 'olisin auttanut', sinä: 'olisit auttanut', hän: 'olisi auttanut', me: 'olisimme auttaneet', te: 'olisitte auttaneet', he: 'olisivat auttaneet' },
      conditionalPerfectNegative: { minä: 'en olisi auttanut', sinä: 'et olisi auttanut', hän: 'ei olisi auttanut', me: 'emme olisi auttaneet', te: 'ette olisi auttaneet', he: 'eivät olisi auttaneet' },
    }
  },
  { 
    infinitive: 'rakastaa', type: 1, translation: 'to love', synonyms: ['love'],
    forms: {
      present: { minä: 'rakastan', sinä: 'rakastat', hän: 'rakastaa', me: 'rakastamme', te: 'rakastatte', he: 'rakastavat' },
      negative: { minä: 'en rakasta', sinä: 'et rakasta', hän: 'ei rakasta', me: 'emme rakasta', te: 'ette rakasta', he: 'eivät rakasta' },
      imperfect: { minä: 'rakastin', sinä: 'rakastit', hän: 'rakasti', me: 'rakastimme', te: 'rakastitte', he: 'rakastivat' },
      imperfectNegative: { minä: 'en rakastanut', sinä: 'et rakastanut', hän: 'ei rakastanut', me: 'emme rakastaneet', te: 'ette rakastaneet', he: 'eivät rakastaneet' },
      imperative: { sinä: 'rakasta', me: 'rakastakaamme', te: 'rakastakaa' },
      imperativeNegative: { sinä: 'älä rakasta', me: 'älkäämme rakastako', te: 'älkää rakastako' },
      conditional: { minä: 'rakastaisin', sinä: 'rakastaisit', hän: 'rakastaisi', me: 'rakastaisimme', te: 'rakastaisitte', he: 'rakastaisivat' },
      conditionalNegative: { minä: 'en rakastaisi', sinä: 'et rakastaisi', hän: 'ei rakastaisi', me: 'emme rakastaisi', te: 'ette rakastaisi', he: 'eivät rakastaisi' },
      conditionalPerfect: { minä: 'olisin rakastanut', sinä: 'olisit rakastanut', hän: 'olisi rakastanut', me: 'olisimme rakastaneet', te: 'olisitte rakastaneet', he: 'olisivat rakastaneet' },
      conditionalPerfectNegative: { minä: 'en olisi rakastanut', sinä: 'et olisi rakastanut', hän: 'ei olisi rakastanut', me: 'emme olisi rakastaneet', te: 'ette olisi rakastaneet', he: 'eivät olisi rakastaneet' },
    }
  },
  { 
    infinitive: 'käydä', type: 2, translation: 'to visit', synonyms: ['visit'],
    forms: {
      present: { minä: 'käyn', sinä: 'käyt', hän: 'käy', me: 'käymme', te: 'käytte', he: 'käyvät' },
      negative: { minä: 'en käy', sinä: 'et käy', hän: 'ei käy', me: 'emme käy', te: 'ette käy', he: 'eivät käy' },
      imperfect: { minä: 'kävin', sinä: 'kävit', hän: 'kävi', me: 'kävimme', te: 'kävitte', he: 'kävivät' },
      imperfectNegative: { minä: 'en käynyt', sinä: 'et käynyt', hän: 'ei käynyt', me: 'emme käyneet', te: 'ette käyneet', he: 'eivät käyneet' },
      imperative: { sinä: 'käy', me: 'käykäämme', te: 'käykää' },
      imperativeNegative: { sinä: 'älä käy', me: 'älkäämme käykö', te: 'älkää käykö' },
      conditional: { minä: 'kävisin', sinä: 'kävisit', hän: 'kävisi', me: 'kävisimme', te: 'kävisitte', he: 'kävisivät' },
      conditionalNegative: { minä: 'en kävisi', sinä: 'et kävisi', hän: 'ei kävisi', me: 'emme kävisi', te: 'ette kävisi', he: 'eivät kävisi' },
      conditionalPerfect: { minä: 'olisin käynyt', sinä: 'olisit käynyt', hän: 'olisi käynyt', me: 'olisimme käyneet', te: 'olisitte käyneet', he: 'olisivat käyneet' },
      conditionalPerfectNegative: { minä: 'en olisi käynyt', sinä: 'et olisi käynyt', hän: 'ei olisi käynyt', me: 'emme olisi käyneet', te: 'ette olisi käyneet', he: 'eivät olisi käyneet' },
    }
  },
  { 
    infinitive: 'opiskella', type: 3, translation: 'to study', synonyms: ['study'],
    forms: {
      present: { minä: 'opiskelen', sinä: 'opiskelet', hän: 'opiskelee', me: 'opiskelemme', te: 'opiskelette', he: 'opiskelevat' },
      negative: { minä: 'en opiskele', sinä: 'et opiskele', hän: 'ei opiskele', me: 'emme opiskele', te: 'ette opiskele', he: 'eivät opiskele' },
      imperfect: { minä: 'opiskelin', sinä: 'opiskelit', hän: 'opiskeli', me: 'opiskelimme', te: 'opiskelitte', he: 'opiskelivat' },
      imperfectNegative: { minä: 'en opiskellut', sinä: 'et opiskellut', hän: 'ei opiskellut', me: 'emme opiskelleet', te: 'ette opiskelleet', he: 'eivät opiskelleet' },
      imperative: { sinä: 'opiskele', me: 'opiskelkaamme', te: 'opiskelkaa' },
      imperativeNegative: { sinä: 'älä opiskele', me: 'älkäämme opiskelko', te: 'älkää opiskelko' },
      conditional: { minä: 'opiskelisin', sinä: 'opiskelisit', hän: 'opiskelisi', me: 'opiskelisimme', te: 'opiskelisitte', he: 'opiskelisivät' },
      conditionalNegative: { minä: 'en opiskelisi', sinä: 'et opiskelisi', hän: 'ei opiskelisi', me: 'emme opiskelisi', te: 'ette opiskelisi', he: 'eivät opiskelisi' },
      conditionalPerfect: { minä: 'olisin opiskellut', sinä: 'olisit opiskellut', hän: 'olisi opiskellut', me: 'olisimme opiskelleet', te: 'olisitte opiskelleet', he: 'olisivat opiskelleet' },
      conditionalPerfectNegative: { minä: 'en olisi opiskellut', sinä: 'et olisi opiskellut', hän: 'ei olisi opiskellut', me: 'emme olisi opiskelleet', te: 'ette olisi opiskelleet', he: 'eivät olisi opiskelleet' },
    }
  },
  { 
    infinitive: 'ajatella', type: 3, translation: 'to think', synonyms: ['think'],
    forms: {
      present: { minä: 'ajattelen', sinä: 'ajattelet', hän: 'ajattelee', me: 'ajattelemme', te: 'ajattelette', he: 'ajattelevat' },
      negative: { minä: 'en ajattele', sinä: 'et ajattele', hän: 'ei ajattele', me: 'emme ajattele', te: 'ette ajattele', he: 'eivät ajattele' },
      imperfect: { minä: 'ajattelin', sinä: 'ajattelit', hän: 'ajatteli', me: 'ajattelimme', te: 'ajattelitte', he: 'ajattelivat' },
      imperfectNegative: { minä: 'en ajatellut', sinä: 'et ajatellut', hän: 'ei ajatellut', me: 'emme ajatelleet', te: 'ette ajatelleet', he: 'eivät ajatelleet' },
      imperative: { sinä: 'ajattele', me: 'ajatelkaamme', te: 'ajatelkaa' },
      imperativeNegative: { sinä: 'älä ajattele', me: 'älkäämme ajatelko', te: 'älkää ajatelko' },
      conditional: { minä: 'ajattelisin', sinä: 'ajattelisit', hän: 'ajattelisi', me: 'ajattelisimme', te: 'ajattelisitte', he: 'ajattelisivat' },
      conditionalNegative: { minä: 'en ajattelisi', sinä: 'et ajattelisi', hän: 'ei ajattelisi', me: 'emme ajattelisi', te: 'ette ajattelisi', he: 'eivät ajattelisi' },
      conditionalPerfect: { minä: 'olisin ajatellut', sinä: 'olisit ajatellut', hän: 'olisi ajatellut', me: 'olisimme ajatelleet', te: 'olisitte ajatelleet', he: 'olisivat ajatelleet' },
      conditionalPerfectNegative: { minä: 'en olisi ajatellut', sinä: 'et olisi ajatellut', hän: 'ei olisi ajatellut', me: 'emme olisi ajatelleet', te: 'ette olisi ajatelleet', he: 'eivät olisi ajatelleet' },
    }
  },
  { 
    infinitive: 'tavata', type: 4, translation: 'to meet', synonyms: ['meet'],
    forms: {
      present: { minä: 'tapaan', sinä: 'tapaat', hän: 'tapaa', me: 'tapaamme', te: 'tapaatte', he: 'tapaavat' },
      negative: { minä: 'en tapaa', sinä: 'et tapaa', hän: 'ei tapaa', me: 'emme tapaa', te: 'ette tapaa', he: 'eivät tapaa' },
      imperfect: { minä: 'tapasin', sinä: 'tapasit', hän: 'tapasi', me: 'tapasimme', te: 'tapasitte', he: 'tapasivat' },
      imperfectNegative: { minä: 'en tavannut', sinä: 'et tavannut', hän: 'ei tavannut', me: 'emme tavanneet', te: 'ette tavanneet', he: 'eivät tavanneet' },
      imperative: { sinä: 'tapaa', me: 'tavatkaamme', te: 'tavatkaa' },
      imperativeNegative: { sinä: 'älä tapaa', me: 'älkäämme tavatko', te: 'älkää tavatko' },
      conditional: { minä: 'tapaisin', sinä: 'tapaisit', hän: 'tapaisi', me: 'tapaisimme', te: 'tapaisitte', he: 'tapaisivat' },
      conditionalNegative: { minä: 'en tapaisi', sinä: 'et tapaisi', hän: 'ei tapaisi', me: 'emme tapaisi', te: 'ette tapaisi', he: 'eivät tapaisi' },
      conditionalPerfect: { minä: 'olisin tavannut', sinä: 'olisit tavannut', hän: 'olisi tavannut', me: 'olisimme tavanneet', te: 'olisitte tavanneet', he: 'olisivat tavanneet' },
      conditionalPerfectNegative: { minä: 'en olisi tavannut', sinä: 'et olisi tavannut', hän: 'ei olisi tavannut', me: 'emme olisi tavanneet', te: 'ette olisi tavanneet', he: 'eivät olisi tavanneet' },
    }
  },
  { 
    infinitive: 'pelata', type: 4, translation: 'to play', synonyms: ['play'],
    forms: {
      present: { minä: 'pelaan', sinä: 'pelaat', hän: 'pelaa', me: 'pelaamme', te: 'pelaatte', he: 'pelaavat' },
      negative: { minä: 'en pelaa', sinä: 'et pelaa', hän: 'ei pelaa', me: 'emme pelaa', te: 'ette pelaa', he: 'eivät pelaa' },
      imperfect: { minä: 'pelasin', sinä: 'pelasit', hän: 'pelasi', me: 'pelasimme', te: 'pelasitte', he: 'pelasivat' },
      imperfectNegative: { minä: 'en pelannut', sinä: 'et pelannut', hän: 'ei pelannut', me: 'emme pelanneet', te: 'ette pelanneet', he: 'eivät pelanneet' },
      imperative: { sinä: 'pelaa', me: 'pelatkaamme', te: 'pelatkaa' },
      imperativeNegative: { sinä: 'älä pelaa', me: 'älkäämme pelatko', te: 'älkää pelatko' },
      conditional: { minä: 'pelaisin', sinä: 'pelaisit', hän: 'pelaisi', me: 'pelaisimme', te: 'pelaisitte', he: 'pelaisivat' },
      conditionalNegative: { minä: 'en pelaisi', sinä: 'et pelaisi', hän: 'ei pelaisi', me: 'emme pelaisi', te: 'ette pelaisi', he: 'eivät pelaisi' },
      conditionalPerfect: { minä: 'olisin pelannut', sinä: 'olisit pelannut', hän: 'olisi pelannut', me: 'olisimme pelanneet', te: 'olisitte pelanneet', he: 'olisivat pelanneet' },
      conditionalPerfectNegative: { minä: 'en olisi pelannut', sinä: 'et olisi pelannut', hän: 'ei olisi pelannut', me: 'emme olisi pelanneet', te: 'ette olisi pelanneet', he: 'eivät olisi pelanneet' },
    }
  },
  { 
    infinitive: 'herätä', type: 4, translation: 'to wake up', synonyms: ['wake up', 'wake'],
    forms: {
      present: { minä: 'herään', sinä: 'heräät', hän: 'herää', me: 'heräämme', te: 'heräätte', he: 'heräävät' },
      negative: { minä: 'en herää', sinä: 'et herää', hän: 'ei herää', me: 'emme herää', te: 'ette herää', he: 'eivät herää' },
      imperfect: { minä: 'heräsin', sinä: 'heräsit', hän: 'heräsi', me: 'heräsimme', te: 'heräsitte', he: 'heräsivät' },
      imperfectNegative: { minä: 'en herännyt', sinä: 'et herännyt', hän: 'ei herännyt', me: 'emme heränneet', te: 'ette heränneet', he: 'eivät heränneet' },
      imperative: { sinä: 'herää', me: 'herätkäämme', te: 'herätkää' },
      imperativeNegative: { sinä: 'älä herää', me: 'älkäämme herätkö', te: 'älkää herätkö' },
      conditional: { minä: 'heräisin', sinä: 'heräisit', hän: 'heräisi', me: 'heräisimme', te: 'heräisitte', he: 'heräisivät' },
      conditionalNegative: { minä: 'en heräisi', sinä: 'et heräisi', hän: 'ei heräisi', me: 'emme heräisi', te: 'ette heräisi', he: 'eivät heräisi' },
      conditionalPerfect: { minä: 'olisin herännyt', sinä: 'olisit herännyt', hän: 'olisi herännyt', me: 'olisimme heränneet', te: 'olisitte heränneet', he: 'olisivat heränneet' },
      conditionalPerfectNegative: { minä: 'en olisi herännyt', sinä: 'et olisi herännyt', hän: 'ei olisi herännyt', me: 'emme olisi heränneet', te: 'ette olisi heränneet', he: 'eivät olisi heränneet' },
    }
  },
  { 
    infinitive: 'huomata', type: 4, translation: 'to notice', synonyms: ['notice', 'realize'],
    forms: {
      present: { minä: 'huomaan', sinä: 'huomaat', hän: 'huomaa', me: 'huomaamme', te: 'huomaatte', he: 'huomaavat' },
      negative: { minä: 'en huomaa', sinä: 'et huomaa', hän: 'ei huomaa', me: 'emme huomaa', te: 'ette huomaa', he: 'eivät huomaa' },
      imperfect: { minä: 'huomasin', sinä: 'huomasit', hän: 'huomasi', me: 'huomasimme', te: 'huomasitte', he: 'huomasivat' },
      imperfectNegative: { minä: 'en huomannut', sinä: 'et huomannut', hän: 'ei huomannut', me: 'emme huomanneet', te: 'ette huomanneet', he: 'eivät huomanneet' },
      imperative: { sinä: 'huomaa', me: 'huomatkaamme', te: 'huomatkaa' },
      imperativeNegative: { sinä: 'älä huomaa', me: 'älkäämme huomatko', te: 'älkää huomatko' },
      conditional: { minä: 'huomaisin', sinä: 'huomaisit', hän: 'huomaisi', me: 'huomaisimme', te: 'huomaisitte', he: 'huomaisivat' },
      conditionalNegative: { minä: 'en huomaisi', sinä: 'et huomaisi', hän: 'ei huomaisi', me: 'emme huomaisi', te: 'ette huomaisi', he: 'eivät huomaisi' },
      conditionalPerfect: { minä: 'olisin huomannut', sinä: 'olisit huomannut', hän: 'olisi huomannut', me: 'olisimme huomanneet', te: 'olisitte huomanneet', he: 'olisivat huomanneet' },
      conditionalPerfectNegative: { minä: 'en olisi huomannut', sinä: 'et olisi huomannut', hän: 'ei olisi huomannut', me: 'emme olisi huomanneet', te: 'ette olisi huomanneet', he: 'eivät olisi huomanneet' },
    }
  },
  { 
    infinitive: 'hypätä', type: 4, translation: 'to jump', synonyms: ['jump', 'leap'],
    forms: {
      present: { minä: 'hyppään', sinä: 'hyppäät', hän: 'hyppää', me: 'hyppäämme', te: 'hyppäätte', he: 'hyppäävät' },
      negative: { minä: 'en hyppää', sinä: 'et hyppää', hän: 'ei hyppää', me: 'emme hyppää', te: 'ette hyppää', he: 'eivät hyppää' },
      imperfect: { minä: 'hyppäsin', sinä: 'hyppäsit', hän: 'hyppäsi', me: 'hyppäsimme', te: 'hyppäsitte', he: 'hyppäsivät' },
      imperfectNegative: { minä: 'en hypännyt', sinä: 'et hypännyt', hän: 'ei hypännyt', me: 'emme hypänneet', te: 'ette hypänneet', he: 'eivät hypänneet' },
      imperative: { sinä: 'hyppää', me: 'hypätkäämme', te: 'hypätkää' },
      imperativeNegative: { sinä: 'älä hyppää', me: 'älkäämme hypätkö', te: 'älkää hypätkö' },
      conditional: { minä: 'hyppäisin', sinä: 'hyppäisit', hän: 'hyppäisi', me: 'hyppäisimme', te: 'hyppäisitte', he: 'hyppäisivät' },
      conditionalNegative: { minä: 'en hyppäisi', sinä: 'et hyppäisi', hän: 'ei hyppäisi', me: 'emme hyppäisi', te: 'ette hyppäisi', he: 'eivät hyppäisi' },
      conditionalPerfect: { minä: 'olisin hypännyt', sinä: 'olisit hypännyt', hän: 'olisi hypännyt', me: 'olisimme hypänneet', te: 'olisitte hypänneet', he: 'olisivat hypänneet' },
      conditionalPerfectNegative: { minä: 'en olisi hypännyt', sinä: 'et olisi hypännyt', hän: 'ei olisi hypännyt', me: 'emme olisi hypänneet', te: 'ette olisi hypänneet', he: 'eivät olisi hypänneet' },
    }
  },
  { 
    infinitive: 'pudota', type: 4, translation: 'to fall, to drop', synonyms: ['fall', 'drop'],
    forms: {
      present: { minä: 'putoan', sinä: 'putoat', hän: 'putoaa', me: 'putoamme', te: 'putoatte', he: 'putoavat' },
      negative: { minä: 'en putoa', sinä: 'et putoa', hän: 'ei putoa', me: 'emme putoa', te: 'ette putoa', he: 'eivät putoa' },
      imperfect: { minä: 'putosin', sinä: 'putosit', hän: 'putosi', me: 'putosimme', te: 'putositte', he: 'putosivat' },
      imperfectNegative: { minä: 'en pudonnut', sinä: 'et pudonnut', hän: 'ei pudonnut', me: 'emme pudonneet', te: 'ette pudonneet', he: 'eivät pudonneet' },
      imperative: { sinä: 'putoa', me: 'pudotkaamme', te: 'pudotkaa' },
      imperativeNegative: { sinä: 'älä putoa', me: 'älkäämme pudotko', te: 'älkää pudotko' },
      conditional: { minä: 'putoaisin', sinä: 'putoaisit', hän: 'putoaisi', me: 'putoaisimme', te: 'putoaisitte', he: 'putoaisivat' },
      conditionalNegative: { minä: 'en putoaisi', sinä: 'et putoaisi', hän: 'ei putoaisi', me: 'emme putoaisi', te: 'ette putoaisi', he: 'eivät putoaisi' },
      conditionalPerfect: { minä: 'olisin pudonnut', sinä: 'olisit pudonnut', hän: 'olisi pudonnut', me: 'olisimme pudonneet', te: 'olisitte pudonneet', he: 'olisivat pudonneet' },
      conditionalPerfectNegative: { minä: 'en olisi pudonnut', sinä: 'et olisi pudonnut', hän: 'ei olisi pudonnut', me: 'emme olisi pudonneet', te: 'ette olisi pudonneet', he: 'eivät olisi pudonneet' },
    }
  },
  { 
    infinitive: 'levätä', type: 4, translation: 'to rest', synonyms: ['rest', 'relax'],
    forms: {
      present: { minä: 'lepään', sinä: 'lepäät', hän: 'lepää', me: 'lepäämme', te: 'lepäätte', he: 'lepäävät' },
      negative: { minä: 'en lepää', sinä: 'et lepää', hän: 'ei lepää', me: 'emme lepää', te: 'ette lepää', he: 'eivät lepää' },
      imperfect: { minä: 'lepäsin', sinä: 'lepäsit', hän: 'lepäsi', me: 'lepäsimme', te: 'lepäsitte', he: 'lepäsivät' },
      imperfectNegative: { minä: 'en levännyt', sinä: 'et levännyt', hän: 'ei levännyt', me: 'emme levänneet', te: 'ette levänneet', he: 'eivät levänneet' },
      imperative: { sinä: 'lepää', me: 'levätkäämme', te: 'levätkää' },
      imperativeNegative: { sinä: 'älä lepää', me: 'älkäämme levätkö', te: 'älkää levätkö' },
      conditional: { minä: 'lepäisin', sinä: 'lepäisit', hän: 'lepäisi', me: 'lepäisimme', te: 'lepäisitte', he: 'lepäisivät' },
      conditionalNegative: { minä: 'en lepäisi', sinä: 'et lepäisi', hän: 'ei lepäisi', me: 'emme lepäisi', te: 'ette lepäisi', he: 'eivät lepäisi' },
      conditionalPerfect: { minä: 'olisin levännyt', sinä: 'olisit levännyt', hän: 'olisi levännyt', me: 'olisimme levänneet', te: 'olisitte levänneet', he: 'olisivat levänneet' },
      conditionalPerfectNegative: { minä: 'en olisi levännyt', sinä: 'et olisi levännyt', hän: 'ei olisi levännyt', me: 'emme olisi levänneet', te: 'ette olisi levänneet', he: 'eivät olisi levänneet' },
    }
  },
  { 
    infinitive: 'tarvita', type: 5, translation: 'to need', synonyms: ['need'],
    forms: {
      present: { minä: 'tarvitsen', sinä: 'tarvitset', hän: 'tarvitsee', me: 'tarvitsemme', te: 'tarvitsette', he: 'tarvitsevat' },
      negative: { minä: 'en tarvitse', sinä: 'et tarvitse', hän: 'ei tarvitse', me: 'emme tarvitse', te: 'ette tarvitse', he: 'eivät tarvitse' },
      imperfect: { minä: 'tarvitsin', sinä: 'tarvitsit', hän: 'tarvitsi', me: 'tarvitsimme', te: 'tarvitsitte', he: 'tarvitsivat' },
      imperfectNegative: { minä: 'en tarvinnut', sinä: 'et tarvinnut', hän: 'ei tarvinnut', me: 'emme tarvinneet', te: 'ette tarvinneet', he: 'eivät tarvinneet' },
      imperative: { sinä: 'tarvitse', me: 'tarvitkaamme', te: 'tarvitkaa' },
      imperativeNegative: { sinä: 'älä tarvitse', me: 'älkäämme tarvitko', te: 'älkää tarvitko' },
      conditional: { minä: 'tarvitsisin', sinä: 'tarvitsisit', hän: 'tarvitsisi', me: 'tarvitsisimme', te: 'tarvitsisitte', he: 'tarvitsisivat' },
      conditionalNegative: { minä: 'en tarvitsisi', sinä: 'et tarvitsisi', hän: 'ei tarvitsisi', me: 'emme tarvitsisi', te: 'ette tarvitsisi', he: 'eivät tarvitsisi' },
      conditionalPerfect: { minä: 'olisin tarvinnut', sinä: 'olisit tarvinnut', hän: 'olisi tarvinnut', me: 'olisimme tarvinneet', te: 'olisitte tarvinneet', he: 'olisivat tarvinneet' },
      conditionalPerfectNegative: { minä: 'en olisi tarvinnut', sinä: 'et olisi tarvinnut', hän: 'ei olisi tarvinnut', me: 'emme olisi tarvinneet', te: 'ette olisi tarvinneet', he: 'eivät olisi tarvinneet' },
    }
  },
  { 
    infinitive: 'valita', type: 5, translation: 'to choose', synonyms: ['choose', 'select'],
    forms: {
      present: { minä: 'valitsen', sinä: 'valitset', hän: 'valitsee', me: 'valitsemme', te: 'valitsette', he: 'valitsevat' },
      negative: { minä: 'en valitse', sinä: 'et valitse', hän: 'ei valitse', me: 'emme valitse', te: 'ette valitse', he: 'eivät valitse' },
      imperfect: { minä: 'valitsin', sinä: 'valitsit', hän: 'valitsi', me: 'valitsimme', te: 'valitsitte', he: 'valitsivat' },
      imperfectNegative: { minä: 'en valinnut', sinä: 'et valinnut', hän: 'ei valinnut', me: 'emme valinneet', te: 'ette valinneet', he: 'eivät valinneet' },
      imperative: { sinä: 'valitse', me: 'valitkaamme', te: 'valitkaa' },
      imperativeNegative: { sinä: 'älä valitse', me: 'älkäämme valitko', te: 'älkää valitko' },
      conditional: { minä: 'valitsisin', sinä: 'valitsisit', hän: 'valitsisi', me: 'valitsisimme', te: 'valitsisitte', he: 'valitsisivat' },
      conditionalNegative: { minä: 'en valitsisi', sinä: 'et valitsisi', hän: 'ei valitsisi', me: 'emme valitsisi', te: 'ette valitsisi', he: 'eivät valitsisi' },
      conditionalPerfect: { minä: 'olisin valinnut', sinä: 'olisit valinnut', hän: 'olisi valinnut', me: 'olisimme valinneet', te: 'olisitte valinneet', he: 'olisivat valinneet' },
      conditionalPerfectNegative: { minä: 'en olisi valinnut', sinä: 'et olisi valinnut', hän: 'ei olisi valinnut', me: 'emme olisi valinneet', te: 'ette olisi valinneet', he: 'eivät olisi valinneet' },
    }
  },
  // More Type 5 verbs (-ita/-itä → -itse-)
  { 
    infinitive: 'merkitä', type: 5, translation: 'to mean, to mark', synonyms: ['mean', 'mark', 'signify'],
    forms: {
      present: { minä: 'merkitsen', sinä: 'merkitset', hän: 'merkitsee', me: 'merkitsemme', te: 'merkitsette', he: 'merkitsevät' },
      negative: { minä: 'en merkitse', sinä: 'et merkitse', hän: 'ei merkitse', me: 'emme merkitse', te: 'ette merkitse', he: 'eivät merkitse' },
      imperfect: { minä: 'merkitsin', sinä: 'merkitsit', hän: 'merkitsi', me: 'merkitsimme', te: 'merkitsitte', he: 'merkitsivät' },
      imperfectNegative: { minä: 'en merkinnyt', sinä: 'et merkinnyt', hän: 'ei merkinnyt', me: 'emme merkinneet', te: 'ette merkinneet', he: 'eivät merkinneet' },
      imperative: { sinä: 'merkitse', me: 'merkitkäämme', te: 'merkitkää' },
      imperativeNegative: { sinä: 'älä merkitse', me: 'älkäämme merkitkö', te: 'älkää merkitkö' },
      conditional: { minä: 'merkitsisin', sinä: 'merkitsisit', hän: 'merkitsisi', me: 'merkitsisimme', te: 'merkitsisitte', he: 'merkitsisivät' },
      conditionalNegative: { minä: 'en merkitsisi', sinä: 'et merkitsisi', hän: 'ei merkitsisi', me: 'emme merkitsisi', te: 'ette merkitsisi', he: 'eivät merkitsisi' },
      conditionalPerfect: { minä: 'olisin merkinnyt', sinä: 'olisit merkinnyt', hän: 'olisi merkinnyt', me: 'olisimme merkinneet', te: 'olisitte merkinneet', he: 'olisivat merkinneet' },
      conditionalPerfectNegative: { minä: 'en olisi merkinnyt', sinä: 'et olisi merkinnyt', hän: 'ei olisi merkinnyt', me: 'emme olisi merkinneet', te: 'ette olisi merkinneet', he: 'eivät olisi merkinneet' },
    }
  },
  { 
    infinitive: 'häiritä', type: 5, translation: 'to disturb', synonyms: ['disturb', 'bother', 'interrupt'],
    forms: {
      present: { minä: 'häiritsen', sinä: 'häiritset', hän: 'häiritsee', me: 'häiritsemme', te: 'häiritsette', he: 'häiritsevät' },
      negative: { minä: 'en häiritse', sinä: 'et häiritse', hän: 'ei häiritse', me: 'emme häiritse', te: 'ette häiritse', he: 'eivät häiritse' },
      imperfect: { minä: 'häiritsin', sinä: 'häiritsit', hän: 'häiritsi', me: 'häiritsimme', te: 'häiritsitte', he: 'häiritsivät' },
      imperfectNegative: { minä: 'en häirinnyt', sinä: 'et häirinnyt', hän: 'ei häirinnyt', me: 'emme häirinneet', te: 'ette häirinneet', he: 'eivät häirinneet' },
      imperative: { sinä: 'häiritse', me: 'häiritkäämme', te: 'häiritkää' },
      imperativeNegative: { sinä: 'älä häiritse', me: 'älkäämme häiritkö', te: 'älkää häiritkö' },
      conditional: { minä: 'häiritsisin', sinä: 'häiritsisit', hän: 'häiritsisi', me: 'häiritsisimme', te: 'häiritsisitte', he: 'häiritsisivät' },
      conditionalNegative: { minä: 'en häiritsisi', sinä: 'et häiritsisi', hän: 'ei häiritsisi', me: 'emme häiritsisi', te: 'ette häiritsisi', he: 'eivät häiritsisi' },
      conditionalPerfect: { minä: 'olisin häirinnyt', sinä: 'olisit häirinnyt', hän: 'olisi häirinnyt', me: 'olisimme häirinneet', te: 'olisitte häirinneet', he: 'olisivat häirinneet' },
      conditionalPerfectNegative: { minä: 'en olisi häirinnyt', sinä: 'et olisi häirinnyt', hän: 'ei olisi häirinnyt', me: 'emme olisi häirinneet', te: 'ette olisi häirinneet', he: 'eivät olisi häirinneet' },
    }
  },
  { 
    infinitive: 'havaita', type: 5, translation: 'to notice, to observe', synonyms: ['notice', 'observe', 'detect'],
    forms: {
      present: { minä: 'havaitsen', sinä: 'havaitset', hän: 'havaitsee', me: 'havaitsemme', te: 'havaitsette', he: 'havaitsevat' },
      negative: { minä: 'en havaitse', sinä: 'et havaitse', hän: 'ei havaitse', me: 'emme havaitse', te: 'ette havaitse', he: 'eivät havaitse' },
      imperfect: { minä: 'havaitsin', sinä: 'havaitsit', hän: 'havaitsi', me: 'havaitsimme', te: 'havaitsitte', he: 'havaitsivat' },
      imperfectNegative: { minä: 'en havainnut', sinä: 'et havainnut', hän: 'ei havainnut', me: 'emme havainneet', te: 'ette havainneet', he: 'eivät havainneet' },
      imperative: { sinä: 'havaitse', me: 'havaitkaamme', te: 'havaitkaa' },
      imperativeNegative: { sinä: 'älä havaitse', me: 'älkäämme havaitko', te: 'älkää havaitko' },
      conditional: { minä: 'havaitsisin', sinä: 'havaitsisit', hän: 'havaitsisi', me: 'havaitsisimme', te: 'havaitsisitte', he: 'havaitsisivat' },
      conditionalNegative: { minä: 'en havaitsisi', sinä: 'et havaitsisi', hän: 'ei havaitsisi', me: 'emme havaitsisi', te: 'ette havaitsisi', he: 'eivät havaitsisi' },
      conditionalPerfect: { minä: 'olisin havainnut', sinä: 'olisit havainnut', hän: 'olisi havainnut', me: 'olisimme havainneet', te: 'olisitte havainneet', he: 'olisivat havainneet' },
      conditionalPerfectNegative: { minä: 'en olisi havainnut', sinä: 'et olisi havainnut', hän: 'ei olisi havainnut', me: 'emme olisi havainneet', te: 'ette olisi havainneet', he: 'eivät olisi havainneet' },
    }
  },
  { 
    infinitive: 'mainita', type: 5, translation: 'to mention', synonyms: ['mention', 'refer to'],
    forms: {
      present: { minä: 'mainitsen', sinä: 'mainitset', hän: 'mainitsee', me: 'mainitsemme', te: 'mainitsette', he: 'mainitsevat' },
      negative: { minä: 'en mainitse', sinä: 'et mainitse', hän: 'ei mainitse', me: 'emme mainitse', te: 'ette mainitse', he: 'eivät mainitse' },
      imperfect: { minä: 'mainitsin', sinä: 'mainitsit', hän: 'mainitsi', me: 'mainitsimme', te: 'mainitsitte', he: 'mainitsivat' },
      imperfectNegative: { minä: 'en maininnut', sinä: 'et maininnut', hän: 'ei maininnut', me: 'emme maininneet', te: 'ette maininneet', he: 'eivät maininneet' },
      imperative: { sinä: 'mainitse', me: 'mainitkaamme', te: 'mainitkaa' },
      imperativeNegative: { sinä: 'älä mainitse', me: 'älkäämme mainitko', te: 'älkää mainitko' },
      conditional: { minä: 'mainitsisin', sinä: 'mainitsisit', hän: 'mainitsisi', me: 'mainitsisimme', te: 'mainitsisitte', he: 'mainitsisivat' },
      conditionalNegative: { minä: 'en mainitsisi', sinä: 'et mainitsisi', hän: 'ei mainitsisi', me: 'emme mainitsisi', te: 'ette mainitsisi', he: 'eivät mainitsisi' },
      conditionalPerfect: { minä: 'olisin maininnut', sinä: 'olisit maininnut', hän: 'olisi maininnut', me: 'olisimme maininneet', te: 'olisitte maininneet', he: 'olisivat maininneet' },
      conditionalPerfectNegative: { minä: 'en olisi maininnut', sinä: 'et olisi maininnut', hän: 'ei olisi maininnut', me: 'emme olisi maininneet', te: 'ette olisi maininneet', he: 'eivät olisi maininneet' },
    }
  },
  { 
    infinitive: 'hallita', type: 5, translation: 'to control, to master', synonyms: ['control', 'master', 'govern'],
    forms: {
      present: { minä: 'hallitsen', sinä: 'hallitset', hän: 'hallitsee', me: 'hallitsemme', te: 'hallitsette', he: 'hallitsevat' },
      negative: { minä: 'en hallitse', sinä: 'et hallitse', hän: 'ei hallitse', me: 'emme hallitse', te: 'ette hallitse', he: 'eivät hallitse' },
      imperfect: { minä: 'hallitsin', sinä: 'hallitsit', hän: 'hallitsi', me: 'hallitsimme', te: 'hallitsitte', he: 'hallitsivat' },
      imperfectNegative: { minä: 'en hallinnut', sinä: 'et hallinnut', hän: 'ei hallinnut', me: 'emme hallinneet', te: 'ette hallinneet', he: 'eivät hallinneet' },
      imperative: { sinä: 'hallitse', me: 'hallitkaamme', te: 'hallitkaa' },
      imperativeNegative: { sinä: 'älä hallitse', me: 'älkäämme hallitko', te: 'älkää hallitko' },
      conditional: { minä: 'hallitsisin', sinä: 'hallitsisit', hän: 'hallitsisi', me: 'hallitsisimme', te: 'hallitsisitte', he: 'hallitsisivat' },
      conditionalNegative: { minä: 'en hallitsisi', sinä: 'et hallitsisi', hän: 'ei hallitsisi', me: 'emme hallitsisi', te: 'ette hallitsisi', he: 'eivät hallitsisi' },
      conditionalPerfect: { minä: 'olisin hallinnut', sinä: 'olisit hallinnut', hän: 'olisi hallinnut', me: 'olisimme hallinneet', te: 'olisitte hallinneet', he: 'olisivat hallinneet' },
      conditionalPerfectNegative: { minä: 'en olisi hallinnut', sinä: 'et olisi hallinnut', hän: 'ei olisi hallinnut', me: 'emme olisi hallinneet', te: 'ette olisi hallinneet', he: 'eivät olisi hallinneet' },
    }
  },
  // Type 6 verbs (-eta/-etä → -ene-)
  { 
    infinitive: 'vanheta', type: 6, translation: 'to age, to grow old', synonyms: ['age', 'grow old', 'get older'],
    forms: {
      present: { minä: 'vanhenen', sinä: 'vanhenet', hän: 'vanhenee', me: 'vanhenemme', te: 'vanhenette', he: 'vanhenevat' },
      negative: { minä: 'en vanhene', sinä: 'et vanhene', hän: 'ei vanhene', me: 'emme vanhene', te: 'ette vanhene', he: 'eivät vanhene' },
      imperfect: { minä: 'vanhenin', sinä: 'vanhenit', hän: 'vanheni', me: 'vanhenimme', te: 'vanhenitte', he: 'vanhenivat' },
      imperfectNegative: { minä: 'en vanhennut', sinä: 'et vanhennut', hän: 'ei vanhennut', me: 'emme vanhenneet', te: 'ette vanhenneet', he: 'eivät vanhenneet' },
      imperative: { sinä: 'vanhene', me: 'vanhetkaamme', te: 'vanhetkaa' },
      imperativeNegative: { sinä: 'älä vanhene', me: 'älkäämme vanhetko', te: 'älkää vanhetko' },
      conditional: { minä: 'vanhenisin', sinä: 'vanhenisit', hän: 'vanhenisi', me: 'vanhenisimme', te: 'vanhenisitte', he: 'vanhenisivat' },
      conditionalNegative: { minä: 'en vanhenisi', sinä: 'et vanhenisi', hän: 'ei vanhenisi', me: 'emme vanhenisi', te: 'ette vanhenisi', he: 'eivät vanhenisi' },
      conditionalPerfect: { minä: 'olisin vanhennut', sinä: 'olisit vanhennut', hän: 'olisi vanhennut', me: 'olisimme vanhenneet', te: 'olisitte vanhenneet', he: 'olisivat vanhenneet' },
      conditionalPerfectNegative: { minä: 'en olisi vanhennut', sinä: 'et olisi vanhennut', hän: 'ei olisi vanhennut', me: 'emme olisi vanhenneet', te: 'ette olisi vanhenneet', he: 'eivät olisi vanhenneet' },
    }
  },
  { 
    infinitive: 'lämmetä', type: 6, translation: 'to warm up', synonyms: ['warm up', 'get warm', 'heat up'],
    forms: {
      present: { minä: 'lämpenen', sinä: 'lämpenet', hän: 'lämpenee', me: 'lämpenemme', te: 'lämpenette', he: 'lämpenevät' },
      negative: { minä: 'en lämpene', sinä: 'et lämpene', hän: 'ei lämpene', me: 'emme lämpene', te: 'ette lämpene', he: 'eivät lämpene' },
      imperfect: { minä: 'lämpenin', sinä: 'lämpenit', hän: 'lämpeni', me: 'lämpenimme', te: 'lämpenitte', he: 'lämpenivät' },
      imperfectNegative: { minä: 'en lämmennyt', sinä: 'et lämmennyt', hän: 'ei lämmennyt', me: 'emme lämmenneet', te: 'ette lämmenneet', he: 'eivät lämmenneet' },
      imperative: { sinä: 'lämpene', me: 'lämmetkäämme', te: 'lämmetkää' },
      imperativeNegative: { sinä: 'älä lämpene', me: 'älkäämme lämmetkö', te: 'älkää lämmetkö' },
      conditional: { minä: 'lämpenisin', sinä: 'lämpenisit', hän: 'lämpenisi', me: 'lämpenisimme', te: 'lämpenisitte', he: 'lämpenisivät' },
      conditionalNegative: { minä: 'en lämpenisi', sinä: 'et lämpenisi', hän: 'ei lämpenisi', me: 'emme lämpenisi', te: 'ette lämpenisi', he: 'eivät lämpenisi' },
      conditionalPerfect: { minä: 'olisin lämmennyt', sinä: 'olisit lämmennyt', hän: 'olisi lämmennyt', me: 'olisimme lämmenneet', te: 'olisitte lämmenneet', he: 'olisivat lämmenneet' },
      conditionalPerfectNegative: { minä: 'en olisi lämmennyt', sinä: 'et olisi lämmennyt', hän: 'ei olisi lämmennyt', me: 'emme olisi lämmenneet', te: 'ette olisi lämmenneet', he: 'eivät olisi lämmenneet' },
    }
  },
  { 
    infinitive: 'kylmetä', type: 6, translation: 'to cool down, to get cold', synonyms: ['cool down', 'get cold', 'chill'],
    forms: {
      present: { minä: 'kylmenen', sinä: 'kylmenet', hän: 'kylmenee', me: 'kylmenemme', te: 'kylmenette', he: 'kylmenevät' },
      negative: { minä: 'en kylmene', sinä: 'et kylmene', hän: 'ei kylmene', me: 'emme kylmene', te: 'ette kylmene', he: 'eivät kylmene' },
      imperfect: { minä: 'kylmenin', sinä: 'kylmenit', hän: 'kylmeni', me: 'kylmenimme', te: 'kylmenitte', he: 'kylmenivät' },
      imperfectNegative: { minä: 'en kylmennyt', sinä: 'et kylmennyt', hän: 'ei kylmennyt', me: 'emme kylmenneet', te: 'ette kylmenneet', he: 'eivät kylmenneet' },
      imperative: { sinä: 'kylmene', me: 'kylmetkäämme', te: 'kylmetkää' },
      imperativeNegative: { sinä: 'älä kylmene', me: 'älkäämme kylmetkö', te: 'älkää kylmetkö' },
      conditional: { minä: 'kylmenisin', sinä: 'kylmenisit', hän: 'kylmenisi', me: 'kylmenisimme', te: 'kylmenisitte', he: 'kylmenisivät' },
      conditionalNegative: { minä: 'en kylmenisi', sinä: 'et kylmenisi', hän: 'ei kylmenisi', me: 'emme kylmenisi', te: 'ette kylmenisi', he: 'eivät kylmenisi' },
      conditionalPerfect: { minä: 'olisin kylmennyt', sinä: 'olisit kylmennyt', hän: 'olisi kylmennyt', me: 'olisimme kylmenneet', te: 'olisitte kylmenneet', he: 'olisivat kylmenneet' },
      conditionalPerfectNegative: { minä: 'en olisi kylmennyt', sinä: 'et olisi kylmennyt', hän: 'ei olisi kylmennyt', me: 'emme olisi kylmenneet', te: 'ette olisi kylmenneet', he: 'eivät olisi kylmenneet' },
    }
  },
  { 
    infinitive: 'paeta', type: 6, translation: 'to escape, to flee', synonyms: ['escape', 'flee', 'run away'],
    forms: {
      present: { minä: 'pakenen', sinä: 'pakenet', hän: 'pakenee', me: 'pakenemme', te: 'pakenette', he: 'pakenevat' },
      negative: { minä: 'en pakene', sinä: 'et pakene', hän: 'ei pakene', me: 'emme pakene', te: 'ette pakene', he: 'eivät pakene' },
      imperfect: { minä: 'pakenin', sinä: 'pakenit', hän: 'pakeni', me: 'pakenimme', te: 'pakenitte', he: 'pakenivat' },
      imperfectNegative: { minä: 'en paennut', sinä: 'et paennut', hän: 'ei paennut', me: 'emme paenneet', te: 'ette paenneet', he: 'eivät paenneet' },
      imperative: { sinä: 'pakene', me: 'paetkaamme', te: 'paetkaa' },
      imperativeNegative: { sinä: 'älä pakene', me: 'älkäämme paetko', te: 'älkää paetko' },
      conditional: { minä: 'pakenisin', sinä: 'pakenisit', hän: 'pakenisi', me: 'pakenisimme', te: 'pakenisitte', he: 'pakenisivat' },
      conditionalNegative: { minä: 'en pakenisi', sinä: 'et pakenisi', hän: 'ei pakenisi', me: 'emme pakenisi', te: 'ette pakenisi', he: 'eivät pakenisi' },
      conditionalPerfect: { minä: 'olisin paennut', sinä: 'olisit paennut', hän: 'olisi paennut', me: 'olisimme paenneet', te: 'olisitte paenneet', he: 'olisivat paenneet' },
      conditionalPerfectNegative: { minä: 'en olisi paennut', sinä: 'et olisi paennut', hän: 'ei olisi paennut', me: 'emme olisi paenneet', te: 'ette olisi paenneet', he: 'eivät olisi paenneet' },
    }
  },
  { 
    infinitive: 'rohjeta', type: 6, translation: 'to dare', synonyms: ['dare', 'have courage'],
    forms: {
      present: { minä: 'rohkenen', sinä: 'rohkenet', hän: 'rohkenee', me: 'rohkenemme', te: 'rohkenette', he: 'rohkenevat' },
      negative: { minä: 'en rohkene', sinä: 'et rohkene', hän: 'ei rohkene', me: 'emme rohkene', te: 'ette rohkene', he: 'eivät rohkene' },
      imperfect: { minä: 'rohkenin', sinä: 'rohkenit', hän: 'rohkeni', me: 'rohkenimme', te: 'rohkenitte', he: 'rohkenivat' },
      imperfectNegative: { minä: 'en rohjennut', sinä: 'et rohjennut', hän: 'ei rohjennut', me: 'emme rohjenneet', te: 'ette rohjenneet', he: 'eivät rohjenneet' },
      imperative: { sinä: 'rohkene', me: 'rohjetkaamme', te: 'rohjetkaa' },
      imperativeNegative: { sinä: 'älä rohkene', me: 'älkäämme rohjetko', te: 'älkää rohjetko' },
      conditional: { minä: 'rohkenisin', sinä: 'rohkenisit', hän: 'rohkenisi', me: 'rohkenisimme', te: 'rohkenisitte', he: 'rohkenisivät' },
      conditionalNegative: { minä: 'en rohkenisi', sinä: 'et rohkenisi', hän: 'ei rohkenisi', me: 'emme rohkenisi', te: 'ette rohkenisi', he: 'eivät rohkenisi' },
      conditionalPerfect: { minä: 'olisin rohjennut', sinä: 'olisit rohjennut', hän: 'olisi rohjennut', me: 'olisimme rohjenneet', te: 'olisitte rohjenneet', he: 'olisivat rohjenneet' },
      conditionalPerfectNegative: { minä: 'en olisi rohjennut', sinä: 'et olisi rohjennut', hän: 'ei olisi rohjennut', me: 'emme olisi rohjenneet', te: 'ette olisi rohjenneet', he: 'eivät olisi rohjenneet' },
    }
  },
  { 
    infinitive: 'pidetä', type: 6, translation: 'to lengthen, to extend', synonyms: ['lengthen', 'extend', 'prolong'],
    forms: {
      present: { minä: 'pitenen', sinä: 'pitenet', hän: 'pitenee', me: 'pitenemme', te: 'pitenette', he: 'pitenevät' },
      negative: { minä: 'en pitene', sinä: 'et pitene', hän: 'ei pitene', me: 'emme pitene', te: 'ette pitene', he: 'eivät pitene' },
      imperfect: { minä: 'pitenin', sinä: 'pitenit', hän: 'piteni', me: 'pitenimme', te: 'pitenitte', he: 'pitenivät' },
      imperfectNegative: { minä: 'en pidennyt', sinä: 'et pidennyt', hän: 'ei pidennyt', me: 'emme pidenneet', te: 'ette pidenneet', he: 'eivät pidenneet' },
      imperative: { sinä: 'pitene', me: 'pidetkäämme', te: 'pidetkää' },
      imperativeNegative: { sinä: 'älä pitene', me: 'älkäämme pidetkö', te: 'älkää pidetkö' },
      conditional: { minä: 'pitenisin', sinä: 'pitenisit', hän: 'pitenisi', me: 'pitenisimme', te: 'pitenisitte', he: 'pitenisivät' },
      conditionalNegative: { minä: 'en pitenisi', sinä: 'et pitenisi', hän: 'ei pitenisi', me: 'emme pitenisi', te: 'ette pitenisi', he: 'eivät pitenisi' },
      conditionalPerfect: { minä: 'olisin pidennyt', sinä: 'olisit pidennyt', hän: 'olisi pidennyt', me: 'olisimme pidenneet', te: 'olisitte pidenneet', he: 'olisivat pidenneet' },
      conditionalPerfectNegative: { minä: 'en olisi pidennyt', sinä: 'et olisi pidennyt', hän: 'ei olisi pidennyt', me: 'emme olisi pidenneet', te: 'ette olisi pidenneet', he: 'eivät olisi pidenneet' },
    }
  },
  { 
    infinitive: 'lyhetä', type: 6, translation: 'to shorten, to get shorter', synonyms: ['shorten', 'get shorter'],
    forms: {
      present: { minä: 'lyhenen', sinä: 'lyhenet', hän: 'lyhenee', me: 'lyhenemme', te: 'lyhenette', he: 'lyhenevät' },
      negative: { minä: 'en lyhene', sinä: 'et lyhene', hän: 'ei lyhene', me: 'emme lyhene', te: 'ette lyhene', he: 'eivät lyhene' },
      imperfect: { minä: 'lyhenin', sinä: 'lyhenit', hän: 'lyheni', me: 'lyhenimme', te: 'lyhenitte', he: 'lyhenivät' },
      imperfectNegative: { minä: 'en lyhennyt', sinä: 'et lyhennyt', hän: 'ei lyhennyt', me: 'emme lyhenneet', te: 'ette lyhenneet', he: 'eivät lyhenneet' },
      imperative: { sinä: 'lyhene', me: 'lyhetkäämme', te: 'lyhetkää' },
      imperativeNegative: { sinä: 'älä lyhene', me: 'älkäämme lyhetkö', te: 'älkää lyhetkö' },
      conditional: { minä: 'lyhenisin', sinä: 'lyhenisit', hän: 'lyhenisi', me: 'lyhenisimme', te: 'lyhenisitte', he: 'lyhenisivät' },
      conditionalNegative: { minä: 'en lyhenisi', sinä: 'et lyhenisi', hän: 'ei lyhenisi', me: 'emme lyhenisi', te: 'ette lyhenisi', he: 'eivät lyhenisi' },
      conditionalPerfect: { minä: 'olisin lyhennyt', sinä: 'olisit lyhennyt', hän: 'olisi lyhennyt', me: 'olisimme lyhenneet', te: 'olisitte lyhenneet', he: 'olisivat lyhenneet' },
      conditionalPerfectNegative: { minä: 'en olisi lyhennyt', sinä: 'et olisi lyhennyt', hän: 'ei olisi lyhennyt', me: 'emme olisi lyhenneet', te: 'ette olisi lyhenneet', he: 'eivät olisi lyhenneet' },
    }
  },
  { 
    infinitive: 'levetä', type: 6, translation: 'to widen, to get wider', synonyms: ['widen', 'get wider', 'broaden'],
    forms: {
      present: { minä: 'levenen', sinä: 'levenet', hän: 'levenee', me: 'levenemme', te: 'levenette', he: 'levenevät' },
      negative: { minä: 'en levene', sinä: 'et levene', hän: 'ei levene', me: 'emme levene', te: 'ette levene', he: 'eivät levene' },
      imperfect: { minä: 'levenin', sinä: 'levenit', hän: 'leveni', me: 'levenimme', te: 'levenitte', he: 'levenivät' },
      imperfectNegative: { minä: 'en levennyt', sinä: 'et levennyt', hän: 'ei levennyt', me: 'emme levenneet', te: 'ette levenneet', he: 'eivät levenneet' },
      imperative: { sinä: 'levene', me: 'levetkäämme', te: 'levetkää' },
      imperativeNegative: { sinä: 'älä levene', me: 'älkäämme levetkö', te: 'älkää levetkö' },
      conditional: { minä: 'levenisin', sinä: 'levenisit', hän: 'levenisi', me: 'levenisimme', te: 'levenisitte', he: 'levenisivät' },
      conditionalNegative: { minä: 'en levenisi', sinä: 'et levenisi', hän: 'ei levenisi', me: 'emme levenisi', te: 'ette levenisi', he: 'eivät levenisi' },
      conditionalPerfect: { minä: 'olisin levennyt', sinä: 'olisit levennyt', hän: 'olisi levennyt', me: 'olisimme levenneet', te: 'olisitte levenneet', he: 'olisivat levenneet' },
      conditionalPerfectNegative: { minä: 'en olisi levennyt', sinä: 'et olisi levennyt', hän: 'ei olisi levennyt', me: 'emme olisi levenneet', te: 'ette olisi levenneet', he: 'eivät olisi levenneet' },
    }
  },
  { 
    infinitive: 'kaveta', type: 6, translation: 'to narrow, to get narrower', synonyms: ['narrow', 'get narrower'],
    forms: {
      present: { minä: 'kapenen', sinä: 'kapenet', hän: 'kapenee', me: 'kapenemme', te: 'kapenette', he: 'kapenevat' },
      negative: { minä: 'en kapene', sinä: 'et kapene', hän: 'ei kapene', me: 'emme kapene', te: 'ette kapene', he: 'eivät kapene' },
      imperfect: { minä: 'kapenin', sinä: 'kapenit', hän: 'kapeni', me: 'kapenimme', te: 'kapenitte', he: 'kapenivat' },
      imperfectNegative: { minä: 'en kavennut', sinä: 'et kavennut', hän: 'ei kavennut', me: 'emme kavenneet', te: 'ette kavenneet', he: 'eivät kavenneet' },
      imperative: { sinä: 'kapene', me: 'kavetkaamme', te: 'kavetkaa' },
      imperativeNegative: { sinä: 'älä kapene', me: 'älkäämme kavetko', te: 'älkää kavetko' },
      conditional: { minä: 'kapenisin', sinä: 'kapenisit', hän: 'kapenisi', me: 'kapenisimme', te: 'kapenisitte', he: 'kapenisivat' },
      conditionalNegative: { minä: 'en kapenisi', sinä: 'et kapenisi', hän: 'ei kapenisi', me: 'emme kapenisi', te: 'ette kapenisi', he: 'eivät kapenisi' },
      conditionalPerfect: { minä: 'olisin kavennut', sinä: 'olisit kavennut', hän: 'olisi kavennut', me: 'olisimme kavenneet', te: 'olisitte kavenneet', he: 'olisivat kavenneet' },
      conditionalPerfectNegative: { minä: 'en olisi kavennut', sinä: 'et olisi kavennut', hän: 'ei olisi kavennut', me: 'emme olisi kavenneet', te: 'ette olisi kavenneet', he: 'eivät olisi kavenneet' },
    }
  },
  { 
    infinitive: 'ymmärtää', type: 1, translation: 'to understand', synonyms: ['understand'],
    forms: {
      present: { minä: 'ymmärrän', sinä: 'ymmärrät', hän: 'ymmärtää', me: 'ymmärrämme', te: 'ymmärrätte', he: 'ymmärtävät' },
      negative: { minä: 'en ymmärrä', sinä: 'et ymmärrä', hän: 'ei ymmärrä', me: 'emme ymmärrä', te: 'ette ymmärrä', he: 'eivät ymmärrä' },
      imperfect: { minä: 'ymmärsin', sinä: 'ymmärsit', hän: 'ymmärsi', me: 'ymmärsimme', te: 'ymmärsitte', he: 'ymmärsivät' },
      imperfectNegative: { minä: 'en ymmärtänyt', sinä: 'et ymmärtänyt', hän: 'ei ymmärtänyt', me: 'emme ymmärtäneet', te: 'ette ymmärtäneet', he: 'eivät ymmärtäneet' },
      imperative: { sinä: 'ymmärrä', me: 'ymmärtäkäämme', te: 'ymmärtäkää' },
      imperativeNegative: { sinä: 'älä ymmärrä', me: 'älkäämme ymmärtäkö', te: 'älkää ymmärtäkö' },
      conditional: { minä: 'ymmärtäisin', sinä: 'ymmärtäisit', hän: 'ymmärtäisi', me: 'ymmärtäisimme', te: 'ymmärtäisitte', he: 'ymmärtäisivät' },
      conditionalNegative: { minä: 'en ymmärtäisi', sinä: 'et ymmärtäisi', hän: 'ei ymmärtäisi', me: 'emme ymmärtäisi', te: 'ette ymmärtäisi', he: 'eivät ymmärtäisi' },
      conditionalPerfect: { minä: 'olisin ymmärtänyt', sinä: 'olisit ymmärtänyt', hän: 'olisi ymmärtänyt', me: 'olisimme ymmärtäneet', te: 'olisitte ymmärtäneet', he: 'olisivat ymmärtäneet' },
      conditionalPerfectNegative: { minä: 'en olisi ymmärtänyt', sinä: 'et olisi ymmärtänyt', hän: 'ei olisi ymmärtänyt', me: 'emme olisi ymmärtäneet', te: 'ette olisi ymmärtäneet', he: 'eivät olisi ymmärtäneet' },
    }
  },
  { 
    infinitive: 'yrittää', type: 1, translation: 'to try', synonyms: ['try', 'attempt'],
    forms: {
      present: { minä: 'yritän', sinä: 'yrität', hän: 'yrittää', me: 'yritämme', te: 'yritätte', he: 'yrittävät' },
      negative: { minä: 'en yritä', sinä: 'et yritä', hän: 'ei yritä', me: 'emme yritä', te: 'ette yritä', he: 'eivät yritä' },
      imperfect: { minä: 'yritin', sinä: 'yritit', hän: 'yritti', me: 'yritimme', te: 'yrititte', he: 'yrittivät' },
      imperfectNegative: { minä: 'en yrittänyt', sinä: 'et yrittänyt', hän: 'ei yrittänyt', me: 'emme yrittäneet', te: 'ette yrittäneet', he: 'eivät yrittäneet' },
      imperative: { sinä: 'yritä', me: 'yrittäkäämme', te: 'yrittäkää' },
      imperativeNegative: { sinä: 'älä yritä', me: 'älkäämme yrittäkö', te: 'älkää yrittäkö' },
      conditional: { minä: 'yrittäisin', sinä: 'yrittäisit', hän: 'yrittäisi', me: 'yrittäisimme', te: 'yrittäisitte', he: 'yrittäisivät' },
      conditionalNegative: { minä: 'en yrittäisi', sinä: 'et yrittäisi', hän: 'ei yrittäisi', me: 'emme yrittäisi', te: 'ette yrittäisi', he: 'eivät yrittäisi' },
      conditionalPerfect: { minä: 'olisin yrittänyt', sinä: 'olisit yrittänyt', hän: 'olisi yrittänyt', me: 'olisimme yrittäneet', te: 'olisitte yrittäneet', he: 'olisivat yrittäneet' },
      conditionalPerfectNegative: { minä: 'en olisi yrittänyt', sinä: 'et olisi yrittänyt', hän: 'ei olisi yrittänyt', me: 'emme olisi yrittäneet', te: 'ette olisi yrittäneet', he: 'eivät olisi yrittäneet' },
    }
  },
  { 
    infinitive: 'nukkua', type: 1, translation: 'to sleep', synonyms: ['sleep'],
    forms: {
      present: { minä: 'nukun', sinä: 'nukut', hän: 'nukkuu', me: 'nukumme', te: 'nukutte', he: 'nukkuvat' },
      negative: { minä: 'en nuku', sinä: 'et nuku', hän: 'ei nuku', me: 'emme nuku', te: 'ette nuku', he: 'eivät nuku' },
      imperfect: { minä: 'nukuin', sinä: 'nukuit', hän: 'nukkui', me: 'nukuimme', te: 'nukuitte', he: 'nukkuivat' },
      imperfectNegative: { minä: 'en nukkunut', sinä: 'et nukkunut', hän: 'ei nukkunut', me: 'emme nukkuneet', te: 'ette nukkuneet', he: 'eivät nukkuneet' },
      imperative: { sinä: 'nuku', me: 'nukkukaamme', te: 'nukkukaa' },
      imperativeNegative: { sinä: 'älä nuku', me: 'älkäämme nukkuko', te: 'älkää nukkuko' },
      conditional: { minä: 'nukkuisin', sinä: 'nukkuisit', hän: 'nukkuisi', me: 'nukkuisimme', te: 'nukkuisitte', he: 'nukkuisivat' },
      conditionalNegative: { minä: 'en nukkuisi', sinä: 'et nukkuisi', hän: 'ei nukkuisi', me: 'emme nukkuisi', te: 'ette nukkuisi', he: 'eivät nukkuisi' },
      conditionalPerfect: { minä: 'olisin nukkunut', sinä: 'olisit nukkunut', hän: 'olisi nukkunut', me: 'olisimme nukkuneet', te: 'olisitte nukkuneet', he: 'olisivat nukkuneet' },
      conditionalPerfectNegative: { minä: 'en olisi nukkunut', sinä: 'et olisi nukkunut', hän: 'ei olisi nukkunut', me: 'emme olisi nukkuneet', te: 'ette olisi nukkuneet', he: 'eivät olisi nukkuneet' },
    }
  },
  { 
    infinitive: 'kuulla', type: 3, translation: 'to hear', synonyms: ['hear'],
    forms: {
      present: { minä: 'kuulen', sinä: 'kuulet', hän: 'kuulee', me: 'kuulemme', te: 'kuulette', he: 'kuulevat' },
      negative: { minä: 'en kuule', sinä: 'et kuule', hän: 'ei kuule', me: 'emme kuule', te: 'ette kuule', he: 'eivät kuule' },
      imperfect: { minä: 'kuulin', sinä: 'kuulit', hän: 'kuuli', me: 'kuulimme', te: 'kuulitte', he: 'kuulivat' },
      imperfectNegative: { minä: 'en kuullut', sinä: 'et kuullut', hän: 'ei kuullut', me: 'emme kuulleet', te: 'ette kuulleet', he: 'eivät kuulleet' },
      imperative: { sinä: 'kuule', me: 'kuulkaamme', te: 'kuulkaa' },
      imperativeNegative: { sinä: 'älä kuule', me: 'älkäämme kuulko', te: 'älkää kuulko' },
      conditional: { minä: 'kuulisin', sinä: 'kuulisit', hän: 'kuulisi', me: 'kuulisimme', te: 'kuulisitte', he: 'kuulisivat' },
      conditionalNegative: { minä: 'en kuulisi', sinä: 'et kuulisi', hän: 'ei kuulisi', me: 'emme kuulisi', te: 'ette kuulisi', he: 'eivät kuulisi' },
      conditionalPerfect: { minä: 'olisin kuullut', sinä: 'olisit kuullut', hän: 'olisi kuullut', me: 'olisimme kuulleet', te: 'olisitte kuulleet', he: 'olisivat kuulleet' },
      conditionalPerfectNegative: { minä: 'en olisi kuullut', sinä: 'et olisi kuullut', hän: 'ei olisi kuullut', me: 'emme olisi kuulleet', te: 'ette olisi kuulleet', he: 'eivät olisi kuulleet' },
    }
  },
  { 
    infinitive: 'ostaa', type: 1, translation: 'to buy', synonyms: ['buy', 'purchase'],
    forms: {
      present: { minä: 'ostan', sinä: 'ostat', hän: 'ostaa', me: 'ostamme', te: 'ostatte', he: 'ostavat' },
      negative: { minä: 'en osta', sinä: 'et osta', hän: 'ei osta', me: 'emme osta', te: 'ette osta', he: 'eivät osta' },
      imperfect: { minä: 'ostin', sinä: 'ostit', hän: 'osti', me: 'ostimme', te: 'ostitte', he: 'ostivat' },
      imperfectNegative: { minä: 'en ostanut', sinä: 'et ostanut', hän: 'ei ostanut', me: 'emme ostaneet', te: 'ette ostaneet', he: 'eivät ostaneet' },
      imperative: { sinä: 'osta', me: 'ostakaamme', te: 'ostakaa' },
      imperativeNegative: { sinä: 'älä osta', me: 'älkäämme ostako', te: 'älkää ostako' },
      conditional: { minä: 'ostaisin', sinä: 'ostaisit', hän: 'ostaisi', me: 'ostaisimme', te: 'ostaisitte', he: 'ostaisivat' },
      conditionalNegative: { minä: 'en ostaisi', sinä: 'et ostaisi', hän: 'ei ostaisi', me: 'emme ostaisi', te: 'ette ostaisi', he: 'eivät ostaisi' },
      conditionalPerfect: { minä: 'olisin ostanut', sinä: 'olisit ostanut', hän: 'olisi ostanut', me: 'olisimme ostaneet', te: 'olisitte ostaneet', he: 'olisivat ostaneet' },
      conditionalPerfectNegative: { minä: 'en olisi ostanut', sinä: 'et olisi ostanut', hän: 'ei olisi ostanut', me: 'emme olisi ostaneet', te: 'ette olisi ostaneet', he: 'eivät olisi ostaneet' },
    }
  },
  { 
    infinitive: 'maksaa', type: 1, translation: 'to pay', synonyms: ['pay'],
    forms: {
      present: { minä: 'maksan', sinä: 'maksat', hän: 'maksaa', me: 'maksamme', te: 'maksatte', he: 'maksavat' },
      negative: { minä: 'en maksa', sinä: 'et maksa', hän: 'ei maksa', me: 'emme maksa', te: 'ette maksa', he: 'eivät maksa' },
      imperfect: { minä: 'maksoin', sinä: 'maksoit', hän: 'maksoi', me: 'maksoimme', te: 'maksoitte', he: 'maksoivat' },
      imperfectNegative: { minä: 'en maksanut', sinä: 'et maksanut', hän: 'ei maksanut', me: 'emme maksaneet', te: 'ette maksaneet', he: 'eivät maksaneet' },
      imperative: { sinä: 'maksa', me: 'maksakaamme', te: 'maksakaa' },
      imperativeNegative: { sinä: 'älä maksa', me: 'älkäämme maksako', te: 'älkää maksako' },
      conditional: { minä: 'maksaisin', sinä: 'maksaisit', hän: 'maksaisi', me: 'maksaisimme', te: 'maksaisitte', he: 'maksaisivat' },
      conditionalNegative: { minä: 'en maksaisi', sinä: 'et maksaisi', hän: 'ei maksaisi', me: 'emme maksaisi', te: 'ette maksaisi', he: 'eivät maksaisi' },
      conditionalPerfect: { minä: 'olisin maksanut', sinä: 'olisit maksanut', hän: 'olisi maksanut', me: 'olisimme maksaneet', te: 'olisitte maksaneet', he: 'olisivat maksaneet' },
      conditionalPerfectNegative: { minä: 'en olisi maksanut', sinä: 'et olisi maksanut', hän: 'ei olisi maksanut', me: 'emme olisi maksaneet', te: 'ette olisi maksaneet', he: 'eivät olisi maksaneet' },
    }
  },
  { 
    infinitive: 'katsoa', type: 1, translation: 'to watch', synonyms: ['watch', 'look'],
    forms: {
      present: { minä: 'katson', sinä: 'katsot', hän: 'katsoo', me: 'katsomme', te: 'katsotte', he: 'katsovat' },
      negative: { minä: 'en katso', sinä: 'et katso', hän: 'ei katso', me: 'emme katso', te: 'ette katso', he: 'eivät katso' },
      imperfect: { minä: 'katsoin', sinä: 'katsoit', hän: 'katsoi', me: 'katsoimme', te: 'katsoitte', he: 'katsoivat' },
      imperfectNegative: { minä: 'en katsonut', sinä: 'et katsonut', hän: 'ei katsonut', me: 'emme katsoneet', te: 'ette katsoneet', he: 'eivät katsoneet' },
      imperative: { sinä: 'katso', me: 'katsokaamme', te: 'katsokaa' },
      imperativeNegative: { sinä: 'älä katso', me: 'älkäämme katsoko', te: 'älkää katsoko' },
      conditional: { minä: 'katsoisin', sinä: 'katsoisit', hän: 'katsoisi', me: 'katsoisimme', te: 'katsoisitte', he: 'katsoisivat' },
      conditionalNegative: { minä: 'en katsoisi', sinä: 'et katsoisi', hän: 'ei katsoisi', me: 'emme katsoisi', te: 'ette katsoisi', he: 'eivät katsoisi' },
      conditionalPerfect: { minä: 'olisin katsonut', sinä: 'olisit katsonut', hän: 'olisi katsonut', me: 'olisimme katsoneet', te: 'olisitte katsoneet', he: 'olisivat katsoneet' },
      conditionalPerfectNegative: { minä: 'en olisi katsonut', sinä: 'et olisi katsonut', hän: 'ei olisi katsonut', me: 'emme olisi katsoneet', te: 'ette olisi katsoneet', he: 'eivät olisi katsoneet' },
    }
  },
  { 
    infinitive: 'kuunnella', type: 3, translation: 'to listen', synonyms: ['listen'],
    forms: {
      present: { minä: 'kuuntelen', sinä: 'kuuntelet', hän: 'kuuntelee', me: 'kuuntelemme', te: 'kuuntelette', he: 'kuuntelevat' },
      negative: { minä: 'en kuuntele', sinä: 'et kuuntele', hän: 'ei kuuntele', me: 'emme kuuntele', te: 'ette kuuntele', he: 'eivät kuuntele' },
      imperfect: { minä: 'kuuntelin', sinä: 'kuuntelit', hän: 'kuunteli', me: 'kuuntelimme', te: 'kuuntelitte', he: 'kuuntelivat' },
      imperfectNegative: { minä: 'en kuunnellut', sinä: 'et kuunnellut', hän: 'ei kuunnellut', me: 'emme kuunnelleet', te: 'ette kuunnelleet', he: 'eivät kuunnelleet' },
      imperative: { sinä: 'kuuntele', me: 'kuunnelkaamme', te: 'kuunnelkaa' },
      imperativeNegative: { sinä: 'älä kuuntele', me: 'älkäämme kuunnelko', te: 'älkää kuunnelko' },
      conditional: { minä: 'kuuntelisin', sinä: 'kuuntelisit', hän: 'kuuntelisi', me: 'kuuntelisimme', te: 'kuuntelisitte', he: 'kuuntelisivat' },
      conditionalNegative: { minä: 'en kuuntelisi', sinä: 'et kuuntelisi', hän: 'ei kuuntelisi', me: 'emme kuuntelisi', te: 'ette kuuntelisi', he: 'eivät kuuntelisi' },
      conditionalPerfect: { minä: 'olisin kuunnellut', sinä: 'olisit kuunnellut', hän: 'olisi kuunnellut', me: 'olisimme kuunnelleet', te: 'olisitte kuunnelleet', he: 'olisivat kuunnelleet' },
      conditionalPerfectNegative: { minä: 'en olisi kuunnellut', sinä: 'et olisi kuunnellut', hän: 'ei olisi kuunnellut', me: 'emme olisi kuunnelleet', te: 'ette olisi kuunnelleet', he: 'eivät olisi kuunnelleet' },
    }
  },
  { 
    infinitive: 'työskennellä', type: 3, translation: 'to work', synonyms: ['work'],
    forms: {
      present: { minä: 'työskentelen', sinä: 'työskentelet', hän: 'työskentelee', me: 'työskentelemme', te: 'työskentelette', he: 'työskentelevät' },
      negative: { minä: 'en työskentele', sinä: 'et työskentele', hän: 'ei työskentele', me: 'emme työskentele', te: 'ette työskentele', he: 'eivät työskentele' },
      imperfect: { minä: 'työskentelin', sinä: 'työskentelit', hän: 'työskenteli', me: 'työskentelimme', te: 'työskentelitte', he: 'työskentelivät' },
      imperfectNegative: { minä: 'en työskennellyt', sinä: 'et työskennellyt', hän: 'ei työskennellyt', me: 'emme työskennelleet', te: 'ette työskennelleet', he: 'eivät työskennelleet' },
      imperative: { sinä: 'työskentele', me: 'työskennelkäämme', te: 'työskennelkää' },
      imperativeNegative: { sinä: 'älä työskentele', me: 'älkäämme työskennelkö', te: 'älkää työskennelkö' },
      conditional: { minä: 'työskentelisin', sinä: 'työskentelisit', hän: 'työskentelisi', me: 'työskentelisimme', te: 'työskentelisitte', he: 'työskentelisivät' },
      conditionalNegative: { minä: 'en työskentelisi', sinä: 'et työskentelisi', hän: 'ei työskentelisi', me: 'emme työskentelisi', te: 'ette työskentelisi', he: 'eivät työskentelisi' },
      conditionalPerfect: { minä: 'olisin työskennellyt', sinä: 'olisit työskennellyt', hän: 'olisi työskennellyt', me: 'olisimme työskennelleet', te: 'olisitte työskennelleet', he: 'olisivat työskennelleet' },
      conditionalPerfectNegative: { minä: 'en olisi työskennellyt', sinä: 'et olisi työskennellyt', hän: 'ei olisi työskennellyt', me: 'emme olisi työskennelleet', te: 'ette olisi työskennelleet', he: 'eivät olisi työskennelleet' },
    }
  },
  // Type 3 -sta/-stä verbs
  { 
    infinitive: 'nousta', type: 3, translation: 'to rise/get up', synonyms: ['rise', 'get up', 'stand up'],
    forms: {
      present: { minä: 'nousen', sinä: 'nouset', hän: 'nousee', me: 'nousemme', te: 'nousette', he: 'nousevat' },
      negative: { minä: 'en nouse', sinä: 'et nouse', hän: 'ei nouse', me: 'emme nouse', te: 'ette nouse', he: 'eivät nouse' },
      imperfect: { minä: 'nousin', sinä: 'nousit', hän: 'nousi', me: 'nousimme', te: 'nousitte', he: 'nousivat' },
      imperfectNegative: { minä: 'en noussut', sinä: 'et noussut', hän: 'ei noussut', me: 'emme nousseet', te: 'ette nousseet', he: 'eivät nousseet' },
      imperative: { sinä: 'nouse', me: 'nouskaamme', te: 'nouskaa' },
      imperativeNegative: { sinä: 'älä nouse', me: 'älkäämme nousko', te: 'älkää nousko' },
      conditional: { minä: 'nousisin', sinä: 'nousisit', hän: 'nousisi', me: 'nousisimme', te: 'nousisitte', he: 'nousisivat' },
      conditionalNegative: { minä: 'en nousisi', sinä: 'et nousisi', hän: 'ei nousisi', me: 'emme nousisi', te: 'ette nousisi', he: 'eivät nousisi' },
      conditionalPerfect: { minä: 'olisin noussut', sinä: 'olisit noussut', hän: 'olisi noussut', me: 'olisimme nousseet', te: 'olisitte nousseet', he: 'olisivat nousseet' },
      conditionalPerfectNegative: { minä: 'en olisi noussut', sinä: 'et olisi noussut', hän: 'ei olisi noussut', me: 'emme olisi nousseet', te: 'ette olisi nousseet', he: 'eivät olisi nousseet' },
    }
  },
  { 
    infinitive: 'pestä', type: 3, translation: 'to wash', synonyms: ['wash', 'clean'],
    forms: {
      present: { minä: 'pesen', sinä: 'peset', hän: 'pesee', me: 'pesemme', te: 'pesette', he: 'pesevät' },
      negative: { minä: 'en pese', sinä: 'et pese', hän: 'ei pese', me: 'emme pese', te: 'ette pese', he: 'eivät pese' },
      imperfect: { minä: 'pesin', sinä: 'pesit', hän: 'pesi', me: 'pesimme', te: 'pesitte', he: 'pesivät' },
      imperfectNegative: { minä: 'en pessyt', sinä: 'et pessyt', hän: 'ei pessyt', me: 'emme pesseet', te: 'ette pesseet', he: 'eivät pesseet' },
      imperative: { sinä: 'pese', me: 'peskäämme', te: 'peskää' },
      imperativeNegative: { sinä: 'älä pese', me: 'älkäämme peskö', te: 'älkää peskö' },
      conditional: { minä: 'pesisin', sinä: 'pesisit', hän: 'pesisi', me: 'pesisimme', te: 'pesisitte', he: 'pesisivät' },
      conditionalNegative: { minä: 'en pesisi', sinä: 'et pesisi', hän: 'ei pesisi', me: 'emme pesisi', te: 'ette pesisi', he: 'eivät pesisi' },
      conditionalPerfect: { minä: 'olisin pessyt', sinä: 'olisit pessyt', hän: 'olisi pessyt', me: 'olisimme pesseet', te: 'olisitte pesseet', he: 'olisivat pesseet' },
      conditionalPerfectNegative: { minä: 'en olisi pessyt', sinä: 'et olisi pessyt', hän: 'ei olisi pessyt', me: 'emme olisi pesseet', te: 'ette olisi pesseet', he: 'eivät olisi pesseet' },
    }
  },
  { 
    infinitive: 'juosta', type: 3, translation: 'to run', synonyms: ['run'],
    forms: {
      present: { minä: 'juoksen', sinä: 'juokset', hän: 'juoksee', me: 'juoksemme', te: 'juoksette', he: 'juoksevat' },
      negative: { minä: 'en juokse', sinä: 'et juokse', hän: 'ei juokse', me: 'emme juokse', te: 'ette juokse', he: 'eivät juokse' },
      imperfect: { minä: 'juoksin', sinä: 'juoksit', hän: 'juoksi', me: 'juoksimme', te: 'juoksitte', he: 'juoksivat' },
      imperfectNegative: { minä: 'en juossut', sinä: 'et juossut', hän: 'ei juossut', me: 'emme juosseet', te: 'ette juosseet', he: 'eivät juosseet' },
      imperative: { sinä: 'juokse', me: 'juoskaamme', te: 'juoskaa' },
      imperativeNegative: { sinä: 'älä juokse', me: 'älkäämme juosko', te: 'älkää juosko' },
      conditional: { minä: 'juoksisin', sinä: 'juoksisit', hän: 'juoksisi', me: 'juoksisimme', te: 'juoksisitte', he: 'juoksisivat' },
      conditionalNegative: { minä: 'en juoksisi', sinä: 'et juoksisi', hän: 'ei juoksisi', me: 'emme juoksisi', te: 'ette juoksisi', he: 'eivät juoksisi' },
      conditionalPerfect: { minä: 'olisin juossut', sinä: 'olisit juossut', hän: 'olisi juossut', me: 'olisimme juosseet', te: 'olisitte juosseet', he: 'olisivat juosseet' },
      conditionalPerfectNegative: { minä: 'en olisi juossut', sinä: 'et olisi juossut', hän: 'ei olisi juossut', me: 'emme olisi juosseet', te: 'ette olisi juosseet', he: 'eivät olisi juosseet' },
    }
  },
  // Type 3 -rra/-rrä verbs
  { 
    infinitive: 'purra', type: 3, translation: 'to bite', synonyms: ['bite'],
    forms: {
      present: { minä: 'puren', sinä: 'puret', hän: 'puree', me: 'puremme', te: 'purette', he: 'purevat' },
      negative: { minä: 'en pure', sinä: 'et pure', hän: 'ei pure', me: 'emme pure', te: 'ette pure', he: 'eivät pure' },
      imperfect: { minä: 'purin', sinä: 'purit', hän: 'puri', me: 'purimme', te: 'puritte', he: 'purivat' },
      imperfectNegative: { minä: 'en purrut', sinä: 'et purrut', hän: 'ei purrut', me: 'emme purreet', te: 'ette purreet', he: 'eivät purreet' },
      imperative: { sinä: 'pure', me: 'purkaamme', te: 'purkaa' },
      imperativeNegative: { sinä: 'älä pure', me: 'älkäämme purko', te: 'älkää purko' },
      conditional: { minä: 'purisin', sinä: 'purisit', hän: 'purisi', me: 'purisimme', te: 'purisitte', he: 'purisivat' },
      conditionalNegative: { minä: 'en purisi', sinä: 'et purisi', hän: 'ei purisi', me: 'emme purisi', te: 'ette purisi', he: 'eivät purisi' },
      conditionalPerfect: { minä: 'olisin purrut', sinä: 'olisit purrut', hän: 'olisi purrut', me: 'olisimme purreet', te: 'olisitte purreet', he: 'olisivat purreet' },
      conditionalPerfectNegative: { minä: 'en olisi purrut', sinä: 'et olisi purrut', hän: 'ei olisi purrut', me: 'emme olisi purreet', te: 'ette olisi purreet', he: 'eivät olisi purreet' },
    }
  },
  { 
    infinitive: 'surra', type: 3, translation: 'to grieve/mourn', synonyms: ['grieve', 'mourn'],
    forms: {
      present: { minä: 'suren', sinä: 'suret', hän: 'suree', me: 'suremme', te: 'surette', he: 'surevat' },
      negative: { minä: 'en sure', sinä: 'et sure', hän: 'ei sure', me: 'emme sure', te: 'ette sure', he: 'eivät sure' },
      imperfect: { minä: 'surin', sinä: 'surit', hän: 'suri', me: 'surimme', te: 'suritte', he: 'surivat' },
      imperfectNegative: { minä: 'en surrut', sinä: 'et surrut', hän: 'ei surrut', me: 'emme surreet', te: 'ette surreet', he: 'eivät surreet' },
      imperative: { sinä: 'sure', me: 'surkaamme', te: 'surkaa' },
      imperativeNegative: { sinä: 'älä sure', me: 'älkäämme surko', te: 'älkää surko' },
      conditional: { minä: 'surisin', sinä: 'surisit', hän: 'surisi', me: 'surisimme', te: 'surisitte', he: 'surisivat' },
      conditionalNegative: { minä: 'en surisi', sinä: 'et surisi', hän: 'ei surisi', me: 'emme surisi', te: 'ette surisi', he: 'eivät surisi' },
      conditionalPerfect: { minä: 'olisin surrut', sinä: 'olisit surrut', hän: 'olisi surrut', me: 'olisimme surreet', te: 'olisitte surreet', he: 'olisivat surreet' },
      conditionalPerfectNegative: { minä: 'en olisi surrut', sinä: 'et olisi surrut', hän: 'ei olisi surrut', me: 'emme olisi surreet', te: 'ette olisi surreet', he: 'eivät olisi surreet' },
    }
  },
  // Type 3 -nna/-nnä verbs
  { 
    infinitive: 'panna', type: 3, translation: 'to put', synonyms: ['put', 'place'],
    forms: {
      present: { minä: 'panen', sinä: 'panet', hän: 'panee', me: 'panemme', te: 'panette', he: 'panevat' },
      negative: { minä: 'en pane', sinä: 'et pane', hän: 'ei pane', me: 'emme pane', te: 'ette pane', he: 'eivät pane' },
      imperfect: { minä: 'panin', sinä: 'panit', hän: 'pani', me: 'panimme', te: 'panitte', he: 'panivat' },
      imperfectNegative: { minä: 'en pannut', sinä: 'et pannut', hän: 'ei pannut', me: 'emme panneet', te: 'ette panneet', he: 'eivät panneet' },
      imperative: { sinä: 'pane', me: 'pankaamme', te: 'pankaa' },
      imperativeNegative: { sinä: 'älä pane', me: 'älkäämme panko', te: 'älkää panko' },
      conditional: { minä: 'panisin', sinä: 'panisit', hän: 'panisi', me: 'panisimme', te: 'panisitte', he: 'panisivat' },
      conditionalNegative: { minä: 'en panisi', sinä: 'et panisi', hän: 'ei panisi', me: 'emme panisi', te: 'ette panisi', he: 'eivät panisi' },
      conditionalPerfect: { minä: 'olisin pannut', sinä: 'olisit pannut', hän: 'olisi pannut', me: 'olisimme panneet', te: 'olisitte panneet', he: 'olisivat panneet' },
      conditionalPerfectNegative: { minä: 'en olisi pannut', sinä: 'et olisi pannut', hän: 'ei olisi pannut', me: 'emme olisi panneet', te: 'ette olisi panneet', he: 'eivät olisi panneet' },
    }
  },
  { 
    infinitive: 'soittaa', type: 1, translation: 'to call', synonyms: ['call', 'play instrument'],
    forms: {
      present: { minä: 'soitan', sinä: 'soitat', hän: 'soittaa', me: 'soitamme', te: 'soitatte', he: 'soittavat' },
      negative: { minä: 'en soita', sinä: 'et soita', hän: 'ei soita', me: 'emme soita', te: 'ette soita', he: 'eivät soita' },
      imperfect: { minä: 'soitin', sinä: 'soitit', hän: 'soitti', me: 'soitimme', te: 'soititte', he: 'soittivat' },
      imperfectNegative: { minä: 'en soittanut', sinä: 'et soittanut', hän: 'ei soittanut', me: 'emme soittaneet', te: 'ette soittaneet', he: 'eivät soittaneet' },
      imperative: { sinä: 'soita', me: 'soittakaamme', te: 'soittakaa' },
      imperativeNegative: { sinä: 'älä soita', me: 'älkäämme soittako', te: 'älkää soittako' },
      conditional: { minä: 'soittaisin', sinä: 'soittaisit', hän: 'soittaisi', me: 'soittaisimme', te: 'soittaisitte', he: 'soittaisivat' },
      conditionalNegative: { minä: 'en soittaisi', sinä: 'et soittaisi', hän: 'ei soittaisi', me: 'emme soittaisi', te: 'ette soittaisi', he: 'eivät soittaisi' },
      conditionalPerfect: { minä: 'olisin soittanut', sinä: 'olisit soittanut', hän: 'olisi soittanut', me: 'olisimme soittaneet', te: 'olisitte soittaneet', he: 'olisivat soittaneet' },
      conditionalPerfectNegative: { minä: 'en olisi soittanut', sinä: 'et olisi soittanut', hän: 'ei olisi soittanut', me: 'emme olisi soittaneet', te: 'ette olisi soittaneet', he: 'eivät olisi soittaneet' },
    }
  },
  { 
    infinitive: 'lähteä', type: 2, translation: 'to leave', synonyms: ['leave', 'depart'],
    forms: {
      present: { minä: 'lähden', sinä: 'lähdet', hän: 'lähtee', me: 'lähdemme', te: 'lähdette', he: 'lähtevät' },
      negative: { minä: 'en lähde', sinä: 'et lähde', hän: 'ei lähde', me: 'emme lähde', te: 'ette lähde', he: 'eivät lähde' },
      imperfect: { minä: 'lähdin', sinä: 'lähdit', hän: 'lähti', me: 'lähdimme', te: 'lähditte', he: 'lähtivät' },
      imperfectNegative: { minä: 'en lähtenyt', sinä: 'et lähtenyt', hän: 'ei lähtenyt', me: 'emme lähteneet', te: 'ette lähteneet', he: 'eivät lähteneet' },
      imperative: { sinä: 'lähde', me: 'lähtekäämme', te: 'lähtekää' },
      imperativeNegative: { sinä: 'älä lähde', me: 'älkäämme lähtekö', te: 'älkää lähtekö' },
      conditional: { minä: 'lähtisin', sinä: 'lähtisit', hän: 'lähtisi', me: 'lähtisimme', te: 'lähtisitte', he: 'lähtisivät' },
      conditionalNegative: { minä: 'en lähtisi', sinä: 'et lähtisi', hän: 'ei lähtisi', me: 'emme lähtisi', te: 'ette lähtisi', he: 'eivät lähtisi' },
      conditionalPerfect: { minä: 'olisin lähtenyt', sinä: 'olisit lähtenyt', hän: 'olisi lähtenyt', me: 'olisimme lähteneet', te: 'olisitte lähteneet', he: 'olisivat lähteneet' },
      conditionalPerfectNegative: { minä: 'en olisi lähtenyt', sinä: 'et olisi lähtenyt', hän: 'ei olisi lähtenyt', me: 'emme olisi lähteneet', te: 'ette olisi lähteneet', he: 'eivät olisi lähteneet' },
    }
  },
  { 
    infinitive: 'jäädä', type: 2, translation: 'to stay', synonyms: ['stay', 'remain'],
    forms: {
      present: { minä: 'jään', sinä: 'jäät', hän: 'jää', me: 'jäämme', te: 'jäätte', he: 'jäävät' },
      negative: { minä: 'en jää', sinä: 'et jää', hän: 'ei jää', me: 'emme jää', te: 'ette jää', he: 'eivät jää' },
      imperfect: { minä: 'jäin', sinä: 'jäit', hän: 'jäi', me: 'jäimme', te: 'jäitte', he: 'jäivät' },
      imperfectNegative: { minä: 'en jäänyt', sinä: 'et jäänyt', hän: 'ei jäänyt', me: 'emme jääneet', te: 'ette jääneet', he: 'eivät jääneet' },
      imperative: { sinä: 'jää', me: 'jääkäämme', te: 'jääkää' },
      imperativeNegative: { sinä: 'älä jää', me: 'älkäämme jääkö', te: 'älkää jääkö' },
      conditional: { minä: 'jäisin', sinä: 'jäisit', hän: 'jäisi', me: 'jäisimme', te: 'jäisitte', he: 'jäisivät' },
      conditionalNegative: { minä: 'en jäisi', sinä: 'et jäisi', hän: 'ei jäisi', me: 'emme jäisi', te: 'ette jäisi', he: 'eivät jäisi' },
      conditionalPerfect: { minä: 'olisin jäänyt', sinä: 'olisit jäänyt', hän: 'olisi jäänyt', me: 'olisimme jääneet', te: 'olisitte jääneet', he: 'olisivat jääneet' },
      conditionalPerfectNegative: { minä: 'en olisi jäänyt', sinä: 'et olisi jäänyt', hän: 'ei olisi jäänyt', me: 'emme olisi jääneet', te: 'ette olisi jääneet', he: 'eivät olisi jääneet' },
    }
  },
  { 
    infinitive: 'löytää', type: 1, translation: 'to find', synonyms: ['find'],
    forms: {
      present: { minä: 'löydän', sinä: 'löydät', hän: 'löytää', me: 'löydämme', te: 'löydätte', he: 'löytävät' },
      negative: { minä: 'en löydä', sinä: 'et löydä', hän: 'ei löydä', me: 'emme löydä', te: 'ette löydä', he: 'eivät löydä' },
      imperfect: { minä: 'löysin', sinä: 'löysit', hän: 'löysi', me: 'löysimme', te: 'löysitte', he: 'löysivät' },
      imperfectNegative: { minä: 'en löytänyt', sinä: 'et löytänyt', hän: 'ei löytänyt', me: 'emme löytäneet', te: 'ette löytäneet', he: 'eivät löytäneet' },
      imperative: { sinä: 'löydä', me: 'löytäkäämme', te: 'löytäkää' },
      imperativeNegative: { sinä: 'älä löydä', me: 'älkäämme löytäkö', te: 'älkää löytäkö' },
      conditional: { minä: 'löytäisin', sinä: 'löytäisit', hän: 'löytäisi', me: 'löytäisimme', te: 'löytäisitte', he: 'löytäisivät' },
      conditionalNegative: { minä: 'en löytäisi', sinä: 'et löytäisi', hän: 'ei löytäisi', me: 'emme löytäisi', te: 'ette löytäisi', he: 'eivät löytäisi' },
      conditionalPerfect: { minä: 'olisin löytänyt', sinä: 'olisit löytänyt', hän: 'olisi löytänyt', me: 'olisimme löytäneet', te: 'olisitte löytäneet', he: 'olisivat löytäneet' },
      conditionalPerfectNegative: { minä: 'en olisi löytänyt', sinä: 'et olisi löytänyt', hän: 'ei olisi löytänyt', me: 'emme olisi löytäneet', te: 'ette olisi löytäneet', he: 'eivät olisi löytäneet' },
    }
  },
  { 
    infinitive: 'unohtaa', type: 1, translation: 'to forget', synonyms: ['forget'],
    forms: {
      present: { minä: 'unohdan', sinä: 'unohdat', hän: 'unohtaa', me: 'unohdamme', te: 'unohdatte', he: 'unohtavat' },
      negative: { minä: 'en unohda', sinä: 'et unohda', hän: 'ei unohda', me: 'emme unohda', te: 'ette unohda', he: 'eivät unohda' },
      imperfect: { minä: 'unohdin', sinä: 'unohdit', hän: 'unohti', me: 'unohdimme', te: 'unohditte', he: 'unohtivat' },
      imperfectNegative: { minä: 'en unohtanut', sinä: 'et unohtanut', hän: 'ei unohtanut', me: 'emme unohtaneet', te: 'ette unohtaneet', he: 'eivät unohtaneet' },
      imperative: { sinä: 'unohda', me: 'unohtakaamme', te: 'unohtakaa' },
      imperativeNegative: { sinä: 'älä unohda', me: 'älkäämme unohtako', te: 'älkää unohtako' },
      conditional: { minä: 'unohtaisin', sinä: 'unohtaisit', hän: 'unohtaisi', me: 'unohtaisimme', te: 'unohtaisitte', he: 'unohtaisivat' },
      conditionalNegative: { minä: 'en unohtaisi', sinä: 'et unohtaisi', hän: 'ei unohtaisi', me: 'emme unohtaisi', te: 'ette unohtaisi', he: 'eivät unohtaisi' },
      conditionalPerfect: { minä: 'olisin unohtanut', sinä: 'olisit unohtanut', hän: 'olisi unohtanut', me: 'olisimme unohtaneet', te: 'olisitte unohtaneet', he: 'olisivat unohtaneet' },
      conditionalPerfectNegative: { minä: 'en olisi unohtanut', sinä: 'et olisi unohtanut', hän: 'ei olisi unohtanut', me: 'emme olisi unohtaneet', te: 'ette olisi unohtaneet', he: 'eivät olisi unohtaneet' },
    }
  },
  { 
    infinitive: 'muistaa', type: 1, translation: 'to remember', synonyms: ['remember'],
    forms: {
      present: { minä: 'muistan', sinä: 'muistat', hän: 'muistaa', me: 'muistamme', te: 'muistatte', he: 'muistavat' },
      negative: { minä: 'en muista', sinä: 'et muista', hän: 'ei muista', me: 'emme muista', te: 'ette muista', he: 'eivät muista' },
      imperfect: { minä: 'muistin', sinä: 'muistit', hän: 'muisti', me: 'muistimme', te: 'muistitte', he: 'muistivat' },
      imperfectNegative: { minä: 'en muistanut', sinä: 'et muistanut', hän: 'ei muistanut', me: 'emme muistaneet', te: 'ette muistaneet', he: 'eivät muistaneet' },
      imperative: { sinä: 'muista', me: 'muistakaamme', te: 'muistakaa' },
      imperativeNegative: { sinä: 'älä muista', me: 'älkäämme muistako', te: 'älkää muistako' },
      conditional: { minä: 'muistaisin', sinä: 'muistaisit', hän: 'muistaisi', me: 'muistaisimme', te: 'muistaisitte', he: 'muistaisivat' },
      conditionalNegative: { minä: 'en muistaisi', sinä: 'et muistaisi', hän: 'ei muistaisi', me: 'emme muistaisi', te: 'ette muistaisi', he: 'eivät muistaisi' },
      conditionalPerfect: { minä: 'olisin muistanut', sinä: 'olisit muistanut', hän: 'olisi muistanut', me: 'olisimme muistaneet', te: 'olisitte muistaneet', he: 'olisivat muistaneet' },
      conditionalPerfectNegative: { minä: 'en olisi muistanut', sinä: 'et olisi muistanut', hän: 'ei olisi muistanut', me: 'emme olisi muistaneet', te: 'ette olisi muistaneet', he: 'eivät olisi muistaneet' },
    }
  },
  { 
    infinitive: 'uskoa', type: 1, translation: 'to believe', synonyms: ['believe'],
    forms: {
      present: { minä: 'uskon', sinä: 'uskot', hän: 'uskoo', me: 'uskomme', te: 'uskotte', he: 'uskovat' },
      negative: { minä: 'en usko', sinä: 'et usko', hän: 'ei usko', me: 'emme usko', te: 'ette usko', he: 'eivät usko' },
      imperfect: { minä: 'uskoin', sinä: 'uskoit', hän: 'uskoi', me: 'uskoimme', te: 'uskoitte', he: 'uskoivat' },
      imperfectNegative: { minä: 'en uskonut', sinä: 'et uskonut', hän: 'ei uskonut', me: 'emme uskoneet', te: 'ette uskoneet', he: 'eivät uskoneet' },
      imperative: { sinä: 'usko', me: 'uskokaamme', te: 'uskokaa' },
      imperativeNegative: { sinä: 'älä usko', me: 'älkäämme uskoko', te: 'älkää uskoko' },
      conditional: { minä: 'uskoisin', sinä: 'uskoisit', hän: 'uskoisi', me: 'uskoisimme', te: 'uskoisitte', he: 'uskoisivat' },
      conditionalNegative: { minä: 'en uskoisi', sinä: 'et uskoisi', hän: 'ei uskoisi', me: 'emme uskoisi', te: 'ette uskoisi', he: 'eivät uskoisi' },
      conditionalPerfect: { minä: 'olisin uskonut', sinä: 'olisit uskonut', hän: 'olisi uskonut', me: 'olisimme uskoneet', te: 'olisitte uskoneet', he: 'olisivat uskoneet' },
      conditionalPerfectNegative: { minä: 'en olisi uskonut', sinä: 'et olisi uskonut', hän: 'ei olisi uskonut', me: 'emme olisi uskoneet', te: 'ette olisi uskoneet', he: 'eivät olisi uskoneet' },
    }
  },
  { 
    infinitive: 'tuntea', type: 1, translation: 'to feel', synonyms: ['feel', 'know someone'],
    forms: {
      present: { minä: 'tunnen', sinä: 'tunnet', hän: 'tuntee', me: 'tunnemme', te: 'tunnette', he: 'tuntevat' },
      negative: { minä: 'en tunne', sinä: 'et tunne', hän: 'ei tunne', me: 'emme tunne', te: 'ette tunne', he: 'eivät tunne' },
      imperfect: { minä: 'tunsin', sinä: 'tunsit', hän: 'tunsi', me: 'tunsimme', te: 'tunsitte', he: 'tunsivat' },
      imperfectNegative: { minä: 'en tuntenut', sinä: 'et tuntenut', hän: 'ei tuntenut', me: 'emme tunteneet', te: 'ette tunteneet', he: 'eivät tunteneet' },
      imperative: { sinä: 'tunne', me: 'tuntekaamme', te: 'tuntekaa' },
      imperativeNegative: { sinä: 'älä tunne', me: 'älkäämme tunteko', te: 'älkää tunteko' },
      conditional: { minä: 'tuntisin', sinä: 'tuntisit', hän: 'tuntisi', me: 'tuntisimme', te: 'tuntisitte', he: 'tuntisivat' },
      conditionalNegative: { minä: 'en tuntisi', sinä: 'et tuntisi', hän: 'ei tuntisi', me: 'emme tuntisi', te: 'ette tuntisi', he: 'eivät tuntisi' },
      conditionalPerfect: { minä: 'olisin tuntenut', sinä: 'olisit tuntenut', hän: 'olisi tuntenut', me: 'olisimme tunteneet', te: 'olisitte tunteneet', he: 'olisivat tunteneet' },
      conditionalPerfectNegative: { minä: 'en olisi tuntenut', sinä: 'et olisi tuntenut', hän: 'ei olisi tuntenut', me: 'emme olisi tunteneet', te: 'ette olisi tunteneet', he: 'eivät olisi tunteneet' },
    }
  },
  { 
    infinitive: 'käyttää', type: 1, translation: 'to use', synonyms: ['use'],
    forms: {
      present: { minä: 'käytän', sinä: 'käytät', hän: 'käyttää', me: 'käytämme', te: 'käytätte', he: 'käyttävät' },
      negative: { minä: 'en käytä', sinä: 'et käytä', hän: 'ei käytä', me: 'emme käytä', te: 'ette käytä', he: 'eivät käytä' },
      imperfect: { minä: 'käytin', sinä: 'käytit', hän: 'käytti', me: 'käytimme', te: 'käytitte', he: 'käyttivät' },
      imperfectNegative: { minä: 'en käyttänyt', sinä: 'et käyttänyt', hän: 'ei käyttänyt', me: 'emme käyttäneet', te: 'ette käyttäneet', he: 'eivät käyttäneet' },
      imperative: { sinä: 'käytä', me: 'käyttäkäämme', te: 'käyttäkää' },
      imperativeNegative: { sinä: 'älä käytä', me: 'älkäämme käyttäkö', te: 'älkää käyttäkö' },
      conditional: { minä: 'käyttäisin', sinä: 'käyttäisit', hän: 'käyttäisi', me: 'käyttäisimme', te: 'käyttäisitte', he: 'käyttäisivät' },
      conditionalNegative: { minä: 'en käyttäisi', sinä: 'et käyttäisi', hän: 'ei käyttäisi', me: 'emme käyttäisi', te: 'ette käyttäisi', he: 'eivät käyttäisi' },
      conditionalPerfect: { minä: 'olisin käyttänyt', sinä: 'olisit käyttänyt', hän: 'olisi käyttänyt', me: 'olisimme käyttäneet', te: 'olisitte käyttäneet', he: 'olisivat käyttäneet' },
      conditionalPerfectNegative: { minä: 'en olisi käyttänyt', sinä: 'et olisi käyttänyt', hän: 'ei olisi käyttänyt', me: 'emme olisi käyttäneet', te: 'ette olisi käyttäneet', he: 'eivät olisi käyttäneet' },
    }
  },
];

// Export all verbs
export const verbs: Verb[] = allVerbs;
