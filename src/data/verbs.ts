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
    }
  },
  { 
    infinitive: 'syödä', type: 2, translation: 'to eat', synonyms: ['eat'],
    forms: {
      present: { minä: 'syön', sinä: 'syöt', hän: 'syö', me: 'syömme', te: 'syötte', he: 'syövät' },
      negative: { minä: 'en syö', sinä: 'et syö', hän: 'ei syö', me: 'emme syö', te: 'ette syö', he: 'eivät syö' },
      imperfect: { minä: 'söin', sinä: 'söit', hän: 'söi', me: 'söimme', te: 'söitte', he: 'söivät' },
      imperfectNegative: { minä: 'en syönyt', sinä: 'et syönyt', hän: 'ei syönyt', me: 'emme syöneet', te: 'ette syöneet', he: 'eivät syöneet' },
    }
  },
  { 
    infinitive: 'juoda', type: 2, translation: 'to drink', synonyms: ['drink'],
    forms: {
      present: { minä: 'juon', sinä: 'juot', hän: 'juo', me: 'juomme', te: 'juotte', he: 'juovat' },
      negative: { minä: 'en juo', sinä: 'et juo', hän: 'ei juo', me: 'emme juo', te: 'ette juo', he: 'eivät juo' },
      imperfect: { minä: 'join', sinä: 'joit', hän: 'joi', me: 'joimme', te: 'joitte', he: 'joivat' },
      imperfectNegative: { minä: 'en juonut', sinä: 'et juonut', hän: 'ei juonut', me: 'emme juoneet', te: 'ette juoneet', he: 'eivät juoneet' },
    }
  },
  { 
    infinitive: 'mennä', type: 3, translation: 'to go', synonyms: ['go'],
    forms: {
      present: { minä: 'menen', sinä: 'menet', hän: 'menee', me: 'menemme', te: 'menette', he: 'menevät' },
      negative: { minä: 'en mene', sinä: 'et mene', hän: 'ei mene', me: 'emme mene', te: 'ette mene', he: 'eivät mene' },
      imperfect: { minä: 'menin', sinä: 'menit', hän: 'meni', me: 'menimme', te: 'menitte', he: 'menivät' },
      imperfectNegative: { minä: 'en mennyt', sinä: 'et mennyt', hän: 'ei mennyt', me: 'emme menneet', te: 'ette menneet', he: 'eivät menneet' },
    }
  },
  { 
    infinitive: 'tulla', type: 3, translation: 'to come', synonyms: ['come'],
    forms: {
      present: { minä: 'tulen', sinä: 'tulet', hän: 'tulee', me: 'tulemme', te: 'tulette', he: 'tulevat' },
      negative: { minä: 'en tule', sinä: 'et tule', hän: 'ei tule', me: 'emme tule', te: 'ette tule', he: 'eivät tule' },
      imperfect: { minä: 'tulin', sinä: 'tulit', hän: 'tuli', me: 'tulimme', te: 'tulitte', he: 'tulivat' },
      imperfectNegative: { minä: 'en tullut', sinä: 'et tullut', hän: 'ei tullut', me: 'emme tulleet', te: 'ette tulleet', he: 'eivät tulleet' },
    }
  },
  { 
    infinitive: 'tehdä', type: 2, translation: 'to do', synonyms: ['do', 'make'],
    forms: {
      present: { minä: 'teen', sinä: 'teet', hän: 'tekee', me: 'teemme', te: 'teette', he: 'tekevät' },
      negative: { minä: 'en tee', sinä: 'et tee', hän: 'ei tee', me: 'emme tee', te: 'ette tee', he: 'eivät tee' },
      imperfect: { minä: 'tein', sinä: 'teit', hän: 'teki', me: 'teimme', te: 'teitte', he: 'tekivät' },
      imperfectNegative: { minä: 'en tehnyt', sinä: 'et tehnyt', hän: 'ei tehnyt', me: 'emme tehneet', te: 'ette tehneet', he: 'eivät tehneet' },
    }
  },
  { 
    infinitive: 'sanoa', type: 1, translation: 'to say', synonyms: ['say', 'tell'],
    forms: {
      present: { minä: 'sanon', sinä: 'sanot', hän: 'sanoo', me: 'sanomme', te: 'sanotte', he: 'sanovat' },
      negative: { minä: 'en sano', sinä: 'et sano', hän: 'ei sano', me: 'emme sano', te: 'ette sano', he: 'eivät sano' },
      imperfect: { minä: 'sanoin', sinä: 'sanoit', hän: 'sanoi', me: 'sanoimme', te: 'sanoitte', he: 'sanoivat' },
      imperfectNegative: { minä: 'en sanonut', sinä: 'et sanonut', hän: 'ei sanonut', me: 'emme sanoneet', te: 'ette sanoneet', he: 'eivät sanoneet' },
    }
  },
  { 
    infinitive: 'haluta', type: 4, translation: 'to want', synonyms: ['want'],
    forms: {
      present: { minä: 'haluan', sinä: 'haluat', hän: 'haluaa', me: 'haluamme', te: 'haluatte', he: 'haluavat' },
      negative: { minä: 'en halua', sinä: 'et halua', hän: 'ei halua', me: 'emme halua', te: 'ette halua', he: 'eivät halua' },
      imperfect: { minä: 'halusin', sinä: 'halusit', hän: 'halusi', me: 'halusimme', te: 'halusitte', he: 'halusivat' },
      imperfectNegative: { minä: 'en halunnut', sinä: 'et halunnut', hän: 'ei halunnut', me: 'emme halunneet', te: 'ette halunneet', he: 'eivät halunneet' },
    }
  },
  { 
    infinitive: 'voida', type: 2, translation: 'to be able to', synonyms: ['can', 'be able'],
    forms: {
      present: { minä: 'voin', sinä: 'voit', hän: 'voi', me: 'voimme', te: 'voitte', he: 'voivat' },
      negative: { minä: 'en voi', sinä: 'et voi', hän: 'ei voi', me: 'emme voi', te: 'ette voi', he: 'eivät voi' },
      imperfect: { minä: 'voin', sinä: 'voit', hän: 'voi', me: 'voimme', te: 'voitte', he: 'voivat' },
      imperfectNegative: { minä: 'en voinut', sinä: 'et voinut', hän: 'ei voinut', me: 'emme voineet', te: 'ette voineet', he: 'eivät voineet' },
    }
  },
  { 
    infinitive: 'saada', type: 2, translation: 'to get', synonyms: ['get', 'receive'],
    forms: {
      present: { minä: 'saan', sinä: 'saat', hän: 'saa', me: 'saamme', te: 'saatte', he: 'saavat' },
      negative: { minä: 'en saa', sinä: 'et saa', hän: 'ei saa', me: 'emme saa', te: 'ette saa', he: 'eivät saa' },
      imperfect: { minä: 'sain', sinä: 'sait', hän: 'sai', me: 'saimme', te: 'saitte', he: 'saivat' },
      imperfectNegative: { minä: 'en saanut', sinä: 'et saanut', hän: 'ei saanut', me: 'emme saaneet', te: 'ette saaneet', he: 'eivät saaneet' },
    }
  },
  { 
    infinitive: 'nähdä', type: 2, translation: 'to see', synonyms: ['see'],
    forms: {
      present: { minä: 'näen', sinä: 'näet', hän: 'näkee', me: 'näemme', te: 'näette', he: 'näkevät' },
      negative: { minä: 'en näe', sinä: 'et näe', hän: 'ei näe', me: 'emme näe', te: 'ette näe', he: 'eivät näe' },
      imperfect: { minä: 'näin', sinä: 'näit', hän: 'näki', me: 'näimme', te: 'näitte', he: 'näkivät' },
      imperfectNegative: { minä: 'en nähnyt', sinä: 'et nähnyt', hän: 'ei nähnyt', me: 'emme nähneet', te: 'ette nähneet', he: 'eivät nähneet' },
    }
  },
  { 
    infinitive: 'tietää', type: 1, translation: 'to know', synonyms: ['know'],
    forms: {
      present: { minä: 'tiedän', sinä: 'tiedät', hän: 'tietää', me: 'tiedämme', te: 'tiedätte', he: 'tietävät' },
      negative: { minä: 'en tiedä', sinä: 'et tiedä', hän: 'ei tiedä', me: 'emme tiedä', te: 'ette tiedä', he: 'eivät tiedä' },
      imperfect: { minä: 'tiesin', sinä: 'tiesit', hän: 'tiesi', me: 'tiesimme', te: 'tiesitte', he: 'tiesivät' },
      imperfectNegative: { minä: 'en tiennyt', sinä: 'et tiennyt', hän: 'ei tiennyt', me: 'emme tienneet', te: 'ette tienneet', he: 'eivät tienneet' },
    }
  },
  { 
    infinitive: 'ottaa', type: 1, translation: 'to take', synonyms: ['take'],
    forms: {
      present: { minä: 'otan', sinä: 'otat', hän: 'ottaa', me: 'otamme', te: 'otatte', he: 'ottavat' },
      negative: { minä: 'en ota', sinä: 'et ota', hän: 'ei ota', me: 'emme ota', te: 'ette ota', he: 'eivät ota' },
      imperfect: { minä: 'otin', sinä: 'otit', hän: 'otti', me: 'otimme', te: 'otitte', he: 'ottivat' },
      imperfectNegative: { minä: 'en ottanut', sinä: 'et ottanut', hän: 'ei ottanut', me: 'emme ottaneet', te: 'ette ottaneet', he: 'eivät ottaneet' },
    }
  },
  { 
    infinitive: 'antaa', type: 1, translation: 'to give', synonyms: ['give'],
    forms: {
      present: { minä: 'annan', sinä: 'annat', hän: 'antaa', me: 'annamme', te: 'annatte', he: 'antavat' },
      negative: { minä: 'en anna', sinä: 'et anna', hän: 'ei anna', me: 'emme anna', te: 'ette anna', he: 'eivät anna' },
      imperfect: { minä: 'annoin', sinä: 'annoit', hän: 'antoi', me: 'annoimme', te: 'annoitte', he: 'antoivat' },
      imperfectNegative: { minä: 'en antanut', sinä: 'et antanut', hän: 'ei antanut', me: 'emme antaneet', te: 'ette antaneet', he: 'eivät antaneet' },
    }
  },
  { 
    infinitive: 'asua', type: 1, translation: 'to live', synonyms: ['live', 'reside'],
    forms: {
      present: { minä: 'asun', sinä: 'asut', hän: 'asuu', me: 'asumme', te: 'asutte', he: 'asuvat' },
      negative: { minä: 'en asu', sinä: 'et asu', hän: 'ei asu', me: 'emme asu', te: 'ette asu', he: 'eivät asu' },
      imperfect: { minä: 'asuin', sinä: 'asuit', hän: 'asui', me: 'asuimme', te: 'asuitte', he: 'asuivat' },
      imperfectNegative: { minä: 'en asunut', sinä: 'et asunut', hän: 'ei asunut', me: 'emme asuneet', te: 'ette asuneet', he: 'eivät asuneet' },
    }
  },
  { 
    infinitive: 'pitää', type: 1, translation: 'to like', synonyms: ['like', 'must'],
    forms: {
      present: { minä: 'pidän', sinä: 'pidät', hän: 'pitää', me: 'pidämme', te: 'pidätte', he: 'pitävät' },
      negative: { minä: 'en pidä', sinä: 'et pidä', hän: 'ei pidä', me: 'emme pidä', te: 'ette pidä', he: 'eivät pidä' },
      imperfect: { minä: 'pidin', sinä: 'pidit', hän: 'piti', me: 'pidimme', te: 'piditte', he: 'pitivät' },
      imperfectNegative: { minä: 'en pitänyt', sinä: 'et pitänyt', hän: 'ei pitänyt', me: 'emme pitäneet', te: 'ette pitäneet', he: 'eivät pitäneet' },
    }
  },
  { 
    infinitive: 'lukea', type: 1, translation: 'to read', synonyms: ['read'],
    forms: {
      present: { minä: 'luen', sinä: 'luet', hän: 'lukee', me: 'luemme', te: 'luette', he: 'lukevat' },
      negative: { minä: 'en lue', sinä: 'et lue', hän: 'ei lue', me: 'emme lue', te: 'ette lue', he: 'eivät lue' },
      imperfect: { minä: 'luin', sinä: 'luit', hän: 'luki', me: 'luimme', te: 'luitte', he: 'lukivat' },
      imperfectNegative: { minä: 'en lukenut', sinä: 'et lukenut', hän: 'ei lukenut', me: 'emme lukeneet', te: 'ette lukeneet', he: 'eivät lukeneet' },
    }
  },
  { 
    infinitive: 'kirjoittaa', type: 1, translation: 'to write', synonyms: ['write'],
    forms: {
      present: { minä: 'kirjoitan', sinä: 'kirjoitat', hän: 'kirjoittaa', me: 'kirjoitamme', te: 'kirjoitatte', he: 'kirjoittavat' },
      negative: { minä: 'en kirjoita', sinä: 'et kirjoita', hän: 'ei kirjoita', me: 'emme kirjoita', te: 'ette kirjoita', he: 'eivät kirjoita' },
      imperfect: { minä: 'kirjoitin', sinä: 'kirjoitit', hän: 'kirjoitti', me: 'kirjoitimme', te: 'kirjoititte', he: 'kirjoittivat' },
      imperfectNegative: { minä: 'en kirjoittanut', sinä: 'et kirjoittanut', hän: 'ei kirjoittanut', me: 'emme kirjoittaneet', te: 'ette kirjoittaneet', he: 'eivät kirjoittaneet' },
    }
  },
  { 
    infinitive: 'oppia', type: 1, translation: 'to learn', synonyms: ['learn'],
    forms: {
      present: { minä: 'opin', sinä: 'opit', hän: 'oppii', me: 'opimme', te: 'opitte', he: 'oppivat' },
      negative: { minä: 'en opi', sinä: 'et opi', hän: 'ei opi', me: 'emme opi', te: 'ette opi', he: 'eivät opi' },
      imperfect: { minä: 'opin', sinä: 'opit', hän: 'oppi', me: 'opimme', te: 'opitte', he: 'oppivat' },
      imperfectNegative: { minä: 'en oppinut', sinä: 'et oppinut', hän: 'ei oppinut', me: 'emme oppineet', te: 'ette oppineet', he: 'eivät oppineet' },
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
    }
  },
  { 
    infinitive: 'odottaa', type: 1, translation: 'to wait', synonyms: ['wait', 'expect'],
    forms: {
      present: { minä: 'odotan', sinä: 'odotat', hän: 'odottaa', me: 'odotamme', te: 'odotatte', he: 'odottavat' },
      negative: { minä: 'en odota', sinä: 'et odota', hän: 'ei odota', me: 'emme odota', te: 'ette odota', he: 'eivät odota' },
      imperfect: { minä: 'odotin', sinä: 'odotit', hän: 'odotti', me: 'odotimme', te: 'odotitte', he: 'odottivat' },
      imperfectNegative: { minä: 'en odottanut', sinä: 'et odottanut', hän: 'ei odottanut', me: 'emme odottaneet', te: 'ette odottaneet', he: 'eivät odottaneet' },
    }
  },
  { 
    infinitive: 'auttaa', type: 1, translation: 'to help', synonyms: ['help'],
    forms: {
      present: { minä: 'autan', sinä: 'autat', hän: 'auttaa', me: 'autamme', te: 'autatte', he: 'auttavat' },
      negative: { minä: 'en auta', sinä: 'et auta', hän: 'ei auta', me: 'emme auta', te: 'ette auta', he: 'eivät auta' },
      imperfect: { minä: 'autoin', sinä: 'autoit', hän: 'auttoi', me: 'autoimme', te: 'autoitte', he: 'auttoivat' },
      imperfectNegative: { minä: 'en auttanut', sinä: 'et auttanut', hän: 'ei auttanut', me: 'emme auttaneet', te: 'ette auttaneet', he: 'eivät auttaneet' },
    }
  },
  { 
    infinitive: 'rakastaa', type: 1, translation: 'to love', synonyms: ['love'],
    forms: {
      present: { minä: 'rakastan', sinä: 'rakastat', hän: 'rakastaa', me: 'rakastamme', te: 'rakastatte', he: 'rakastavat' },
      negative: { minä: 'en rakasta', sinä: 'et rakasta', hän: 'ei rakasta', me: 'emme rakasta', te: 'ette rakasta', he: 'eivät rakasta' },
      imperfect: { minä: 'rakastin', sinä: 'rakastit', hän: 'rakasti', me: 'rakastimme', te: 'rakastitte', he: 'rakastivat' },
      imperfectNegative: { minä: 'en rakastanut', sinä: 'et rakastanut', hän: 'ei rakastanut', me: 'emme rakastaneet', te: 'ette rakastaneet', he: 'eivät rakastaneet' },
    }
  },
  { 
    infinitive: 'käydä', type: 2, translation: 'to visit', synonyms: ['visit'],
    forms: {
      present: { minä: 'käyn', sinä: 'käyt', hän: 'käy', me: 'käymme', te: 'käytte', he: 'käyvät' },
      negative: { minä: 'en käy', sinä: 'et käy', hän: 'ei käy', me: 'emme käy', te: 'ette käy', he: 'eivät käy' },
      imperfect: { minä: 'kävin', sinä: 'kävit', hän: 'kävi', me: 'kävimme', te: 'kävitte', he: 'kävivät' },
      imperfectNegative: { minä: 'en käynyt', sinä: 'et käynyt', hän: 'ei käynyt', me: 'emme käyneet', te: 'ette käyneet', he: 'eivät käyneet' },
    }
  },
  { 
    infinitive: 'opiskella', type: 3, translation: 'to study', synonyms: ['study'],
    forms: {
      present: { minä: 'opiskelen', sinä: 'opiskelet', hän: 'opiskelee', me: 'opiskelemme', te: 'opiskelette', he: 'opiskelevat' },
      negative: { minä: 'en opiskele', sinä: 'et opiskele', hän: 'ei opiskele', me: 'emme opiskele', te: 'ette opiskele', he: 'eivät opiskele' },
      imperfect: { minä: 'opiskelin', sinä: 'opiskelit', hän: 'opiskeli', me: 'opiskelimme', te: 'opiskelitte', he: 'opiskelivat' },
      imperfectNegative: { minä: 'en opiskellut', sinä: 'et opiskellut', hän: 'ei opiskellut', me: 'emme opiskelleet', te: 'ette opiskelleet', he: 'eivät opiskelleet' },
    }
  },
  { 
    infinitive: 'ajatella', type: 3, translation: 'to think', synonyms: ['think'],
    forms: {
      present: { minä: 'ajattelen', sinä: 'ajattelet', hän: 'ajattelee', me: 'ajattelemme', te: 'ajattelette', he: 'ajattelevat' },
      negative: { minä: 'en ajattele', sinä: 'et ajattele', hän: 'ei ajattele', me: 'emme ajattele', te: 'ette ajattele', he: 'eivät ajattele' },
      imperfect: { minä: 'ajattelin', sinä: 'ajattelit', hän: 'ajatteli', me: 'ajattelimme', te: 'ajattelitte', he: 'ajattelivat' },
      imperfectNegative: { minä: 'en ajatellut', sinä: 'et ajatellut', hän: 'ei ajatellut', me: 'emme ajatelleet', te: 'ette ajatelleet', he: 'eivät ajatelleet' },
    }
  },
  { 
    infinitive: 'tavata', type: 4, translation: 'to meet', synonyms: ['meet'],
    forms: {
      present: { minä: 'tapaan', sinä: 'tapaat', hän: 'tapaa', me: 'tapaamme', te: 'tapaatte', he: 'tapaavat' },
      negative: { minä: 'en tapaa', sinä: 'et tapaa', hän: 'ei tapaa', me: 'emme tapaa', te: 'ette tapaa', he: 'eivät tapaa' },
      imperfect: { minä: 'tapasin', sinä: 'tapasit', hän: 'tapasi', me: 'tapasimme', te: 'tapasitte', he: 'tapasivat' },
      imperfectNegative: { minä: 'en tavannut', sinä: 'et tavannut', hän: 'ei tavannut', me: 'emme tavanneet', te: 'ette tavanneet', he: 'eivät tavanneet' },
    }
  },
  { 
    infinitive: 'pelata', type: 4, translation: 'to play', synonyms: ['play'],
    forms: {
      present: { minä: 'pelaan', sinä: 'pelaat', hän: 'pelaa', me: 'pelaamme', te: 'pelaatte', he: 'pelaavat' },
      negative: { minä: 'en pelaa', sinä: 'et pelaa', hän: 'ei pelaa', me: 'emme pelaa', te: 'ette pelaa', he: 'eivät pelaa' },
      imperfect: { minä: 'pelasin', sinä: 'pelasit', hän: 'pelasi', me: 'pelasimme', te: 'pelasitte', he: 'pelasivat' },
      imperfectNegative: { minä: 'en pelannut', sinä: 'et pelannut', hän: 'ei pelannut', me: 'emme pelanneet', te: 'ette pelanneet', he: 'eivät pelanneet' },
    }
  },
  { 
    infinitive: 'herätä', type: 4, translation: 'to wake up', synonyms: ['wake up', 'wake'],
    forms: {
      present: { minä: 'herään', sinä: 'heräät', hän: 'herää', me: 'heräämme', te: 'heräätte', he: 'heräävät' },
      negative: { minä: 'en herää', sinä: 'et herää', hän: 'ei herää', me: 'emme herää', te: 'ette herää', he: 'eivät herää' },
      imperfect: { minä: 'heräsin', sinä: 'heräsit', hän: 'heräsi', me: 'heräsimme', te: 'heräsitte', he: 'heräsivät' },
      imperfectNegative: { minä: 'en herännyt', sinä: 'et herännyt', hän: 'ei herännyt', me: 'emme heränneet', te: 'ette heränneet', he: 'eivät heränneet' },
    }
  },
  { 
    infinitive: 'huomata', type: 4, translation: 'to notice', synonyms: ['notice', 'realize'],
    forms: {
      present: { minä: 'huomaan', sinä: 'huomaat', hän: 'huomaa', me: 'huomaamme', te: 'huomaatte', he: 'huomaavat' },
      negative: { minä: 'en huomaa', sinä: 'et huomaa', hän: 'ei huomaa', me: 'emme huomaa', te: 'ette huomaa', he: 'eivät huomaa' },
      imperfect: { minä: 'huomasin', sinä: 'huomasit', hän: 'huomasi', me: 'huomasimme', te: 'huomasitte', he: 'huomasivat' },
      imperfectNegative: { minä: 'en huomannut', sinä: 'et huomannut', hän: 'ei huomannut', me: 'emme huomanneet', te: 'ette huomanneet', he: 'eivät huomanneet' },
    }
  },
  { 
    infinitive: 'hypätä', type: 4, translation: 'to jump', synonyms: ['jump', 'leap'],
    forms: {
      present: { minä: 'hyppään', sinä: 'hyppäät', hän: 'hyppää', me: 'hyppäämme', te: 'hyppäätte', he: 'hyppäävät' },
      negative: { minä: 'en hyppää', sinä: 'et hyppää', hän: 'ei hyppää', me: 'emme hyppää', te: 'ette hyppää', he: 'eivät hyppää' },
      imperfect: { minä: 'hyppäsin', sinä: 'hyppäsit', hän: 'hyppäsi', me: 'hyppäsimme', te: 'hyppäsitte', he: 'hyppäsivät' },
      imperfectNegative: { minä: 'en hypännyt', sinä: 'et hypännyt', hän: 'ei hypännyt', me: 'emme hypänneet', te: 'ette hypänneet', he: 'eivät hypänneet' },
    }
  },
  { 
    infinitive: 'pudota', type: 4, translation: 'to fall, to drop', synonyms: ['fall', 'drop'],
    forms: {
      present: { minä: 'putoan', sinä: 'putoat', hän: 'putoaa', me: 'putoamme', te: 'putoatte', he: 'putoavat' },
      negative: { minä: 'en putoa', sinä: 'et putoa', hän: 'ei putoa', me: 'emme putoa', te: 'ette putoa', he: 'eivät putoa' },
      imperfect: { minä: 'putosin', sinä: 'putosit', hän: 'putosi', me: 'putosimme', te: 'putositte', he: 'putosivat' },
      imperfectNegative: { minä: 'en pudonnut', sinä: 'et pudonnut', hän: 'ei pudonnut', me: 'emme pudonneet', te: 'ette pudonneet', he: 'eivät pudonneet' },
    }
  },
  { 
    infinitive: 'levätä', type: 4, translation: 'to rest', synonyms: ['rest', 'relax'],
    forms: {
      present: { minä: 'lepään', sinä: 'lepäät', hän: 'lepää', me: 'lepäämme', te: 'lepäätte', he: 'lepäävät' },
      negative: { minä: 'en lepää', sinä: 'et lepää', hän: 'ei lepää', me: 'emme lepää', te: 'ette lepää', he: 'eivät lepää' },
      imperfect: { minä: 'lepäsin', sinä: 'lepäsit', hän: 'lepäsi', me: 'lepäsimme', te: 'lepäsitte', he: 'lepäsivät' },
      imperfectNegative: { minä: 'en levännyt', sinä: 'et levännyt', hän: 'ei levännyt', me: 'emme levänneet', te: 'ette levänneet', he: 'eivät levänneet' },
    }
  },
  { 
    infinitive: 'tarvita', type: 5, translation: 'to need', synonyms: ['need'],
    forms: {
      present: { minä: 'tarvitsen', sinä: 'tarvitset', hän: 'tarvitsee', me: 'tarvitsemme', te: 'tarvitsette', he: 'tarvitsevat' },
      negative: { minä: 'en tarvitse', sinä: 'et tarvitse', hän: 'ei tarvitse', me: 'emme tarvitse', te: 'ette tarvitse', he: 'eivät tarvitse' },
      imperfect: { minä: 'tarvitsin', sinä: 'tarvitsit', hän: 'tarvitsi', me: 'tarvitsimme', te: 'tarvitsitte', he: 'tarvitsivat' },
      imperfectNegative: { minä: 'en tarvinnut', sinä: 'et tarvinnut', hän: 'ei tarvinnut', me: 'emme tarvinneet', te: 'ette tarvinneet', he: 'eivät tarvinneet' },
    }
  },
  { 
    infinitive: 'valita', type: 5, translation: 'to choose', synonyms: ['choose', 'select'],
    forms: {
      present: { minä: 'valitsen', sinä: 'valitset', hän: 'valitsee', me: 'valitsemme', te: 'valitsette', he: 'valitsevat' },
      negative: { minä: 'en valitse', sinä: 'et valitse', hän: 'ei valitse', me: 'emme valitse', te: 'ette valitse', he: 'eivät valitse' },
      imperfect: { minä: 'valitsin', sinä: 'valitsit', hän: 'valitsi', me: 'valitsimme', te: 'valitsitte', he: 'valitsivat' },
      imperfectNegative: { minä: 'en valinnut', sinä: 'et valinnut', hän: 'ei valinnut', me: 'emme valinneet', te: 'ette valinneet', he: 'eivät valinneet' },
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
    }
  },
  { 
    infinitive: 'häiritä', type: 5, translation: 'to disturb', synonyms: ['disturb', 'bother', 'interrupt'],
    forms: {
      present: { minä: 'häiritsen', sinä: 'häiritset', hän: 'häiritsee', me: 'häiritsemme', te: 'häiritsette', he: 'häiritsevät' },
      negative: { minä: 'en häiritse', sinä: 'et häiritse', hän: 'ei häiritse', me: 'emme häiritse', te: 'ette häiritse', he: 'eivät häiritse' },
      imperfect: { minä: 'häiritsin', sinä: 'häiritsit', hän: 'häiritsi', me: 'häiritsimme', te: 'häiritsitte', he: 'häiritsivät' },
      imperfectNegative: { minä: 'en häirinnyt', sinä: 'et häirinnyt', hän: 'ei häirinnyt', me: 'emme häirinneet', te: 'ette häirinneet', he: 'eivät häirinneet' },
    }
  },
  { 
    infinitive: 'havaita', type: 5, translation: 'to notice, to observe', synonyms: ['notice', 'observe', 'detect'],
    forms: {
      present: { minä: 'havaitsen', sinä: 'havaitset', hän: 'havaitsee', me: 'havaitsemme', te: 'havaitsette', he: 'havaitsevat' },
      negative: { minä: 'en havaitse', sinä: 'et havaitse', hän: 'ei havaitse', me: 'emme havaitse', te: 'ette havaitse', he: 'eivät havaitse' },
      imperfect: { minä: 'havaitsin', sinä: 'havaitsit', hän: 'havaitsi', me: 'havaitsimme', te: 'havaitsitte', he: 'havaitsivat' },
      imperfectNegative: { minä: 'en havainnut', sinä: 'et havainnut', hän: 'ei havainnut', me: 'emme havainneet', te: 'ette havainneet', he: 'eivät havainneet' },
    }
  },
  { 
    infinitive: 'mainita', type: 5, translation: 'to mention', synonyms: ['mention', 'refer to'],
    forms: {
      present: { minä: 'mainitsen', sinä: 'mainitset', hän: 'mainitsee', me: 'mainitsemme', te: 'mainitsette', he: 'mainitsevat' },
      negative: { minä: 'en mainitse', sinä: 'et mainitse', hän: 'ei mainitse', me: 'emme mainitse', te: 'ette mainitse', he: 'eivät mainitse' },
      imperfect: { minä: 'mainitsin', sinä: 'mainitsit', hän: 'mainitsi', me: 'mainitsimme', te: 'mainitsitte', he: 'mainitsivat' },
      imperfectNegative: { minä: 'en maininnut', sinä: 'et maininnut', hän: 'ei maininnut', me: 'emme maininneet', te: 'ette maininneet', he: 'eivät maininneet' },
    }
  },
  { 
    infinitive: 'hallita', type: 5, translation: 'to control, to master', synonyms: ['control', 'master', 'govern'],
    forms: {
      present: { minä: 'hallitsen', sinä: 'hallitset', hän: 'hallitsee', me: 'hallitsemme', te: 'hallitsette', he: 'hallitsevat' },
      negative: { minä: 'en hallitse', sinä: 'et hallitse', hän: 'ei hallitse', me: 'emme hallitse', te: 'ette hallitse', he: 'eivät hallitse' },
      imperfect: { minä: 'hallitsin', sinä: 'hallitsit', hän: 'hallitsi', me: 'hallitsimme', te: 'hallitsitte', he: 'hallitsivat' },
      imperfectNegative: { minä: 'en hallinnut', sinä: 'et hallinnut', hän: 'ei hallinnut', me: 'emme hallinneet', te: 'ette hallinneet', he: 'eivät hallinneet' },
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
    }
  },
  { 
    infinitive: 'lämmetä', type: 6, translation: 'to warm up', synonyms: ['warm up', 'get warm', 'heat up'],
    forms: {
      present: { minä: 'lämpenen', sinä: 'lämpenet', hän: 'lämpenee', me: 'lämpenemme', te: 'lämpenette', he: 'lämpenevät' },
      negative: { minä: 'en lämpene', sinä: 'et lämpene', hän: 'ei lämpene', me: 'emme lämpene', te: 'ette lämpene', he: 'eivät lämpene' },
      imperfect: { minä: 'lämpenin', sinä: 'lämpenit', hän: 'lämpeni', me: 'lämpenimme', te: 'lämpenitte', he: 'lämpenivät' },
      imperfectNegative: { minä: 'en lämmennyt', sinä: 'et lämmennyt', hän: 'ei lämmennyt', me: 'emme lämmenneet', te: 'ette lämmenneet', he: 'eivät lämmenneet' },
    }
  },
  { 
    infinitive: 'kylmetä', type: 6, translation: 'to cool down, to get cold', synonyms: ['cool down', 'get cold', 'chill'],
    forms: {
      present: { minä: 'kylmenen', sinä: 'kylmenet', hän: 'kylmenee', me: 'kylmenemme', te: 'kylmenette', he: 'kylmenevät' },
      negative: { minä: 'en kylmene', sinä: 'et kylmene', hän: 'ei kylmene', me: 'emme kylmene', te: 'ette kylmene', he: 'eivät kylmene' },
      imperfect: { minä: 'kylmenin', sinä: 'kylmenit', hän: 'kylmeni', me: 'kylmenimme', te: 'kylmenitte', he: 'kylmenivät' },
      imperfectNegative: { minä: 'en kylmennyt', sinä: 'et kylmennyt', hän: 'ei kylmennyt', me: 'emme kylmenneet', te: 'ette kylmenneet', he: 'eivät kylmenneet' },
    }
  },
  { 
    infinitive: 'paeta', type: 6, translation: 'to escape, to flee', synonyms: ['escape', 'flee', 'run away'],
    forms: {
      present: { minä: 'pakenen', sinä: 'pakenet', hän: 'pakenee', me: 'pakenemme', te: 'pakenette', he: 'pakenevat' },
      negative: { minä: 'en pakene', sinä: 'et pakene', hän: 'ei pakene', me: 'emme pakene', te: 'ette pakene', he: 'eivät pakene' },
      imperfect: { minä: 'pakenin', sinä: 'pakenit', hän: 'pakeni', me: 'pakenimme', te: 'pakenitte', he: 'pakenivat' },
      imperfectNegative: { minä: 'en paennut', sinä: 'et paennut', hän: 'ei paennut', me: 'emme paenneet', te: 'ette paenneet', he: 'eivät paenneet' },
    }
  },
  { 
    infinitive: 'rohjeta', type: 6, translation: 'to dare', synonyms: ['dare', 'have courage'],
    forms: {
      present: { minä: 'rohkenen', sinä: 'rohkenet', hän: 'rohkenee', me: 'rohkenemme', te: 'rohkenette', he: 'rohkenevat' },
      negative: { minä: 'en rohkene', sinä: 'et rohkene', hän: 'ei rohkene', me: 'emme rohkene', te: 'ette rohkene', he: 'eivät rohkene' },
      imperfect: { minä: 'rohkenin', sinä: 'rohkenit', hän: 'rohkeni', me: 'rohkenimme', te: 'rohkenitte', he: 'rohkenivat' },
      imperfectNegative: { minä: 'en rohjennut', sinä: 'et rohjennut', hän: 'ei rohjennut', me: 'emme rohjenneet', te: 'ette rohjenneet', he: 'eivät rohjenneet' },
    }
  },
  { 
    infinitive: 'pidetä', type: 6, translation: 'to lengthen, to extend', synonyms: ['lengthen', 'extend', 'prolong'],
    forms: {
      present: { minä: 'pitenen', sinä: 'pitenet', hän: 'pitenee', me: 'pitenemme', te: 'pitenette', he: 'pitenevät' },
      negative: { minä: 'en pitene', sinä: 'et pitene', hän: 'ei pitene', me: 'emme pitene', te: 'ette pitene', he: 'eivät pitene' },
      imperfect: { minä: 'pitenin', sinä: 'pitenit', hän: 'piteni', me: 'pitenimme', te: 'pitenitte', he: 'pitenivät' },
      imperfectNegative: { minä: 'en pidennyt', sinä: 'et pidennyt', hän: 'ei pidennyt', me: 'emme pidenneet', te: 'ette pidenneet', he: 'eivät pidenneet' },
    }
  },
  { 
    infinitive: 'lyhetä', type: 6, translation: 'to shorten, to get shorter', synonyms: ['shorten', 'get shorter'],
    forms: {
      present: { minä: 'lyhenen', sinä: 'lyhenet', hän: 'lyhenee', me: 'lyhenemme', te: 'lyhenette', he: 'lyhenevät' },
      negative: { minä: 'en lyhene', sinä: 'et lyhene', hän: 'ei lyhene', me: 'emme lyhene', te: 'ette lyhene', he: 'eivät lyhene' },
      imperfect: { minä: 'lyhenin', sinä: 'lyhenit', hän: 'lyheni', me: 'lyhenimme', te: 'lyhenitte', he: 'lyhenivät' },
      imperfectNegative: { minä: 'en lyhennyt', sinä: 'et lyhennyt', hän: 'ei lyhennyt', me: 'emme lyhenneet', te: 'ette lyhenneet', he: 'eivät lyhenneet' },
    }
  },
  { 
    infinitive: 'levetä', type: 6, translation: 'to widen, to get wider', synonyms: ['widen', 'get wider', 'broaden'],
    forms: {
      present: { minä: 'levenen', sinä: 'levenet', hän: 'levenee', me: 'levenemme', te: 'levenette', he: 'levenevät' },
      negative: { minä: 'en levene', sinä: 'et levene', hän: 'ei levene', me: 'emme levene', te: 'ette levene', he: 'eivät levene' },
      imperfect: { minä: 'levenin', sinä: 'levenit', hän: 'leveni', me: 'levenimme', te: 'levenitte', he: 'levenivät' },
      imperfectNegative: { minä: 'en levennyt', sinä: 'et levennyt', hän: 'ei levennyt', me: 'emme levenneet', te: 'ette levenneet', he: 'eivät levenneet' },
    }
  },
  { 
    infinitive: 'kaveta', type: 6, translation: 'to narrow, to get narrower', synonyms: ['narrow', 'get narrower'],
    forms: {
      present: { minä: 'kapenen', sinä: 'kapenet', hän: 'kapenee', me: 'kapenemme', te: 'kapenette', he: 'kapenevat' },
      negative: { minä: 'en kapene', sinä: 'et kapene', hän: 'ei kapene', me: 'emme kapene', te: 'ette kapene', he: 'eivät kapene' },
      imperfect: { minä: 'kapenin', sinä: 'kapenit', hän: 'kapeni', me: 'kapenimme', te: 'kapenitte', he: 'kapenivat' },
      imperfectNegative: { minä: 'en kavennut', sinä: 'et kavennut', hän: 'ei kavennut', me: 'emme kavenneet', te: 'ette kavenneet', he: 'eivät kavenneet' },
    }
  },
  { 
    infinitive: 'ymmärtää', type: 1, translation: 'to understand', synonyms: ['understand'],
    forms: {
      present: { minä: 'ymmärrän', sinä: 'ymmärrät', hän: 'ymmärtää', me: 'ymmärrämme', te: 'ymmärrätte', he: 'ymmärtävät' },
      negative: { minä: 'en ymmärrä', sinä: 'et ymmärrä', hän: 'ei ymmärrä', me: 'emme ymmärrä', te: 'ette ymmärrä', he: 'eivät ymmärrä' },
      imperfect: { minä: 'ymmärsin', sinä: 'ymmärsit', hän: 'ymmärsi', me: 'ymmärsimme', te: 'ymmärsitte', he: 'ymmärsivät' },
      imperfectNegative: { minä: 'en ymmärtänyt', sinä: 'et ymmärtänyt', hän: 'ei ymmärtänyt', me: 'emme ymmärtäneet', te: 'ette ymmärtäneet', he: 'eivät ymmärtäneet' },
    }
  },
  { 
    infinitive: 'yrittää', type: 1, translation: 'to try', synonyms: ['try', 'attempt'],
    forms: {
      present: { minä: 'yritän', sinä: 'yrität', hän: 'yrittää', me: 'yritämme', te: 'yritätte', he: 'yrittävät' },
      negative: { minä: 'en yritä', sinä: 'et yritä', hän: 'ei yritä', me: 'emme yritä', te: 'ette yritä', he: 'eivät yritä' },
      imperfect: { minä: 'yritin', sinä: 'yritit', hän: 'yritti', me: 'yritimme', te: 'yrititte', he: 'yrittivät' },
      imperfectNegative: { minä: 'en yrittänyt', sinä: 'et yrittänyt', hän: 'ei yrittänyt', me: 'emme yrittäneet', te: 'ette yrittäneet', he: 'eivät yrittäneet' },
    }
  },
  { 
    infinitive: 'nukkua', type: 1, translation: 'to sleep', synonyms: ['sleep'],
    forms: {
      present: { minä: 'nukun', sinä: 'nukut', hän: 'nukkuu', me: 'nukumme', te: 'nukutte', he: 'nukkuvat' },
      negative: { minä: 'en nuku', sinä: 'et nuku', hän: 'ei nuku', me: 'emme nuku', te: 'ette nuku', he: 'eivät nuku' },
      imperfect: { minä: 'nukuin', sinä: 'nukuit', hän: 'nukkui', me: 'nukuimme', te: 'nukuitte', he: 'nukkuivat' },
      imperfectNegative: { minä: 'en nukkunut', sinä: 'et nukkunut', hän: 'ei nukkunut', me: 'emme nukkuneet', te: 'ette nukkuneet', he: 'eivät nukkuneet' },
    }
  },
  { 
    infinitive: 'kuulla', type: 3, translation: 'to hear', synonyms: ['hear'],
    forms: {
      present: { minä: 'kuulen', sinä: 'kuulet', hän: 'kuulee', me: 'kuulemme', te: 'kuulette', he: 'kuulevat' },
      negative: { minä: 'en kuule', sinä: 'et kuule', hän: 'ei kuule', me: 'emme kuule', te: 'ette kuule', he: 'eivät kuule' },
      imperfect: { minä: 'kuulin', sinä: 'kuulit', hän: 'kuuli', me: 'kuulimme', te: 'kuulitte', he: 'kuulivat' },
      imperfectNegative: { minä: 'en kuullut', sinä: 'et kuullut', hän: 'ei kuullut', me: 'emme kuulleet', te: 'ette kuulleet', he: 'eivät kuulleet' },
    }
  },
  { 
    infinitive: 'ostaa', type: 1, translation: 'to buy', synonyms: ['buy', 'purchase'],
    forms: {
      present: { minä: 'ostan', sinä: 'ostat', hän: 'ostaa', me: 'ostamme', te: 'ostatte', he: 'ostavat' },
      negative: { minä: 'en osta', sinä: 'et osta', hän: 'ei osta', me: 'emme osta', te: 'ette osta', he: 'eivät osta' },
      imperfect: { minä: 'ostin', sinä: 'ostit', hän: 'osti', me: 'ostimme', te: 'ostitte', he: 'ostivat' },
      imperfectNegative: { minä: 'en ostanut', sinä: 'et ostanut', hän: 'ei ostanut', me: 'emme ostaneet', te: 'ette ostaneet', he: 'eivät ostaneet' },
    }
  },
  { 
    infinitive: 'maksaa', type: 1, translation: 'to pay', synonyms: ['pay'],
    forms: {
      present: { minä: 'maksan', sinä: 'maksat', hän: 'maksaa', me: 'maksamme', te: 'maksatte', he: 'maksavat' },
      negative: { minä: 'en maksa', sinä: 'et maksa', hän: 'ei maksa', me: 'emme maksa', te: 'ette maksa', he: 'eivät maksa' },
      imperfect: { minä: 'maksoin', sinä: 'maksoit', hän: 'maksoi', me: 'maksoimme', te: 'maksoitte', he: 'maksoivat' },
      imperfectNegative: { minä: 'en maksanut', sinä: 'et maksanut', hän: 'ei maksanut', me: 'emme maksaneet', te: 'ette maksaneet', he: 'eivät maksaneet' },
    }
  },
  { 
    infinitive: 'katsoa', type: 1, translation: 'to watch', synonyms: ['watch', 'look'],
    forms: {
      present: { minä: 'katson', sinä: 'katsot', hän: 'katsoo', me: 'katsomme', te: 'katsotte', he: 'katsovat' },
      negative: { minä: 'en katso', sinä: 'et katso', hän: 'ei katso', me: 'emme katso', te: 'ette katso', he: 'eivät katso' },
      imperfect: { minä: 'katsoin', sinä: 'katsoit', hän: 'katsoi', me: 'katsoimme', te: 'katsoitte', he: 'katsoivat' },
      imperfectNegative: { minä: 'en katsonut', sinä: 'et katsonut', hän: 'ei katsonut', me: 'emme katsoneet', te: 'ette katsoneet', he: 'eivät katsoneet' },
    }
  },
  { 
    infinitive: 'kuunnella', type: 3, translation: 'to listen', synonyms: ['listen'],
    forms: {
      present: { minä: 'kuuntelen', sinä: 'kuuntelet', hän: 'kuuntelee', me: 'kuuntelemme', te: 'kuuntelette', he: 'kuuntelevat' },
      negative: { minä: 'en kuuntele', sinä: 'et kuuntele', hän: 'ei kuuntele', me: 'emme kuuntele', te: 'ette kuuntele', he: 'eivät kuuntele' },
      imperfect: { minä: 'kuuntelin', sinä: 'kuuntelit', hän: 'kuunteli', me: 'kuuntelimme', te: 'kuuntelitte', he: 'kuuntelivat' },
      imperfectNegative: { minä: 'en kuunnellut', sinä: 'et kuunnellut', hän: 'ei kuunnellut', me: 'emme kuunnelleet', te: 'ette kuunnelleet', he: 'eivät kuunnelleet' },
    }
  },
  { 
    infinitive: 'työskennellä', type: 3, translation: 'to work', synonyms: ['work'],
    forms: {
      present: { minä: 'työskentelen', sinä: 'työskentelet', hän: 'työskentelee', me: 'työskentelemme', te: 'työskentelette', he: 'työskentelevät' },
      negative: { minä: 'en työskentele', sinä: 'et työskentele', hän: 'ei työskentele', me: 'emme työskentele', te: 'ette työskentele', he: 'eivät työskentele' },
      imperfect: { minä: 'työskentelin', sinä: 'työskentelit', hän: 'työskenteli', me: 'työskentelimme', te: 'työskentelitte', he: 'työskentelivät' },
      imperfectNegative: { minä: 'en työskennellyt', sinä: 'et työskennellyt', hän: 'ei työskennellyt', me: 'emme työskennelleet', te: 'ette työskennelleet', he: 'eivät työskennelleet' },
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
    }
  },
  { 
    infinitive: 'pestä', type: 3, translation: 'to wash', synonyms: ['wash', 'clean'],
    forms: {
      present: { minä: 'pesen', sinä: 'peset', hän: 'pesee', me: 'pesemme', te: 'pesette', he: 'pesevät' },
      negative: { minä: 'en pese', sinä: 'et pese', hän: 'ei pese', me: 'emme pese', te: 'ette pese', he: 'eivät pese' },
      imperfect: { minä: 'pesin', sinä: 'pesit', hän: 'pesi', me: 'pesimme', te: 'pesitte', he: 'pesivät' },
      imperfectNegative: { minä: 'en pessyt', sinä: 'et pessyt', hän: 'ei pessyt', me: 'emme pesseet', te: 'ette pesseet', he: 'eivät pesseet' },
    }
  },
  { 
    infinitive: 'juosta', type: 3, translation: 'to run', synonyms: ['run'],
    forms: {
      present: { minä: 'juoksen', sinä: 'juokset', hän: 'juoksee', me: 'juoksemme', te: 'juoksette', he: 'juoksevat' },
      negative: { minä: 'en juokse', sinä: 'et juokse', hän: 'ei juokse', me: 'emme juokse', te: 'ette juokse', he: 'eivät juokse' },
      imperfect: { minä: 'juoksin', sinä: 'juoksit', hän: 'juoksi', me: 'juoksimme', te: 'juoksitte', he: 'juoksivat' },
      imperfectNegative: { minä: 'en juossut', sinä: 'et juossut', hän: 'ei juossut', me: 'emme juosseet', te: 'ette juosseet', he: 'eivät juosseet' },
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
    }
  },
  { 
    infinitive: 'surra', type: 3, translation: 'to grieve/mourn', synonyms: ['grieve', 'mourn'],
    forms: {
      present: { minä: 'suren', sinä: 'suret', hän: 'suree', me: 'suremme', te: 'surette', he: 'surevat' },
      negative: { minä: 'en sure', sinä: 'et sure', hän: 'ei sure', me: 'emme sure', te: 'ette sure', he: 'eivät sure' },
      imperfect: { minä: 'surin', sinä: 'surit', hän: 'suri', me: 'surimme', te: 'suritte', he: 'surivat' },
      imperfectNegative: { minä: 'en surrut', sinä: 'et surrut', hän: 'ei surrut', me: 'emme surreet', te: 'ette surreet', he: 'eivät surreet' },
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
    }
  },
  { 
    infinitive: 'soittaa', type: 1, translation: 'to call', synonyms: ['call', 'play instrument'],
    forms: {
      present: { minä: 'soitan', sinä: 'soitat', hän: 'soittaa', me: 'soitamme', te: 'soitatte', he: 'soittavat' },
      negative: { minä: 'en soita', sinä: 'et soita', hän: 'ei soita', me: 'emme soita', te: 'ette soita', he: 'eivät soita' },
      imperfect: { minä: 'soitin', sinä: 'soitit', hän: 'soitti', me: 'soitimme', te: 'soititte', he: 'soittivat' },
      imperfectNegative: { minä: 'en soittanut', sinä: 'et soittanut', hän: 'ei soittanut', me: 'emme soittaneet', te: 'ette soittaneet', he: 'eivät soittaneet' },
    }
  },
  { 
    infinitive: 'lähteä', type: 2, translation: 'to leave', synonyms: ['leave', 'depart'],
    forms: {
      present: { minä: 'lähden', sinä: 'lähdet', hän: 'lähtee', me: 'lähdemme', te: 'lähdette', he: 'lähtevät' },
      negative: { minä: 'en lähde', sinä: 'et lähde', hän: 'ei lähde', me: 'emme lähde', te: 'ette lähde', he: 'eivät lähde' },
      imperfect: { minä: 'lähdin', sinä: 'lähdit', hän: 'lähti', me: 'lähdimme', te: 'lähditte', he: 'lähtivät' },
      imperfectNegative: { minä: 'en lähtenyt', sinä: 'et lähtenyt', hän: 'ei lähtenyt', me: 'emme lähteneet', te: 'ette lähteneet', he: 'eivät lähteneet' },
    }
  },
  { 
    infinitive: 'jäädä', type: 2, translation: 'to stay', synonyms: ['stay', 'remain'],
    forms: {
      present: { minä: 'jään', sinä: 'jäät', hän: 'jää', me: 'jäämme', te: 'jäätte', he: 'jäävät' },
      negative: { minä: 'en jää', sinä: 'et jää', hän: 'ei jää', me: 'emme jää', te: 'ette jää', he: 'eivät jää' },
      imperfect: { minä: 'jäin', sinä: 'jäit', hän: 'jäi', me: 'jäimme', te: 'jäitte', he: 'jäivät' },
      imperfectNegative: { minä: 'en jäänyt', sinä: 'et jäänyt', hän: 'ei jäänyt', me: 'emme jääneet', te: 'ette jääneet', he: 'eivät jääneet' },
    }
  },
  { 
    infinitive: 'löytää', type: 1, translation: 'to find', synonyms: ['find'],
    forms: {
      present: { minä: 'löydän', sinä: 'löydät', hän: 'löytää', me: 'löydämme', te: 'löydätte', he: 'löytävät' },
      negative: { minä: 'en löydä', sinä: 'et löydä', hän: 'ei löydä', me: 'emme löydä', te: 'ette löydä', he: 'eivät löydä' },
      imperfect: { minä: 'löysin', sinä: 'löysit', hän: 'löysi', me: 'löysimme', te: 'löysitte', he: 'löysivät' },
      imperfectNegative: { minä: 'en löytänyt', sinä: 'et löytänyt', hän: 'ei löytänyt', me: 'emme löytäneet', te: 'ette löytäneet', he: 'eivät löytäneet' },
    }
  },
  { 
    infinitive: 'unohtaa', type: 1, translation: 'to forget', synonyms: ['forget'],
    forms: {
      present: { minä: 'unohdan', sinä: 'unohdat', hän: 'unohtaa', me: 'unohdamme', te: 'unohdatte', he: 'unohtavat' },
      negative: { minä: 'en unohda', sinä: 'et unohda', hän: 'ei unohda', me: 'emme unohda', te: 'ette unohda', he: 'eivät unohda' },
      imperfect: { minä: 'unohdin', sinä: 'unohdit', hän: 'unohti', me: 'unohdimme', te: 'unohditte', he: 'unohtivat' },
      imperfectNegative: { minä: 'en unohtanut', sinä: 'et unohtanut', hän: 'ei unohtanut', me: 'emme unohtaneet', te: 'ette unohtaneet', he: 'eivät unohtaneet' },
    }
  },
  { 
    infinitive: 'muistaa', type: 1, translation: 'to remember', synonyms: ['remember'],
    forms: {
      present: { minä: 'muistan', sinä: 'muistat', hän: 'muistaa', me: 'muistamme', te: 'muistatte', he: 'muistavat' },
      negative: { minä: 'en muista', sinä: 'et muista', hän: 'ei muista', me: 'emme muista', te: 'ette muista', he: 'eivät muista' },
      imperfect: { minä: 'muistin', sinä: 'muistit', hän: 'muisti', me: 'muistimme', te: 'muistitte', he: 'muistivat' },
      imperfectNegative: { minä: 'en muistanut', sinä: 'et muistanut', hän: 'ei muistanut', me: 'emme muistaneet', te: 'ette muistaneet', he: 'eivät muistaneet' },
    }
  },
  { 
    infinitive: 'uskoa', type: 1, translation: 'to believe', synonyms: ['believe'],
    forms: {
      present: { minä: 'uskon', sinä: 'uskot', hän: 'uskoo', me: 'uskomme', te: 'uskotte', he: 'uskovat' },
      negative: { minä: 'en usko', sinä: 'et usko', hän: 'ei usko', me: 'emme usko', te: 'ette usko', he: 'eivät usko' },
      imperfect: { minä: 'uskoin', sinä: 'uskoit', hän: 'uskoi', me: 'uskoimme', te: 'uskoitte', he: 'uskoivat' },
      imperfectNegative: { minä: 'en uskonut', sinä: 'et uskonut', hän: 'ei uskonut', me: 'emme uskoneet', te: 'ette uskoneet', he: 'eivät uskoneet' },
    }
  },
  { 
    infinitive: 'tuntea', type: 1, translation: 'to feel', synonyms: ['feel', 'know someone'],
    forms: {
      present: { minä: 'tunnen', sinä: 'tunnet', hän: 'tuntee', me: 'tunnemme', te: 'tunnette', he: 'tuntevat' },
      negative: { minä: 'en tunne', sinä: 'et tunne', hän: 'ei tunne', me: 'emme tunne', te: 'ette tunne', he: 'eivät tunne' },
      imperfect: { minä: 'tunsin', sinä: 'tunsit', hän: 'tunsi', me: 'tunsimme', te: 'tunsitte', he: 'tunsivat' },
      imperfectNegative: { minä: 'en tuntenut', sinä: 'et tuntenut', hän: 'ei tuntenut', me: 'emme tunteneet', te: 'ette tunteneet', he: 'eivät tunteneet' },
    }
  },
  { 
    infinitive: 'käyttää', type: 1, translation: 'to use', synonyms: ['use'],
    forms: {
      present: { minä: 'käytän', sinä: 'käytät', hän: 'käyttää', me: 'käytämme', te: 'käytätte', he: 'käyttävät' },
      negative: { minä: 'en käytä', sinä: 'et käytä', hän: 'ei käytä', me: 'emme käytä', te: 'ette käytä', he: 'eivät käytä' },
      imperfect: { minä: 'käytin', sinä: 'käytit', hän: 'käytti', me: 'käytimme', te: 'käytitte', he: 'käyttivät' },
      imperfectNegative: { minä: 'en käyttänyt', sinä: 'et käyttänyt', hän: 'ei käyttänyt', me: 'emme käyttäneet', te: 'ette käyttäneet', he: 'eivät käyttäneet' },
    }
  },
];

// Export all verbs
export const verbs: Verb[] = allVerbs;
