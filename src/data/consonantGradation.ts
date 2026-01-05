// Consonant Gradation Learning Structure
// Based on: https://uusikielemme.fi/finnish-grammar/consonant-gradation/consonant-gradation-astevaihtelu-kpt-vaihtelu

// Local type for consonant gradation questions
export interface ConsonantGradationQuestion {
  id: string;
  type: 'fill-blank';
  strongForm: string;
  weakForm: string;
  context: string;
  rule: string;
  category: 'noun' | 'verb';
  blankForm: string;
  expectedAnswer: string;
  caseInfo?: string;
  person?: string;
}

export interface GradationRule {
  id: string;
  rule: string; // e.g., "kk → k"
  description: string; // e.g., "Double k becomes single k"
  verbGuide?: string; // Explanation of how rule applies to verbs
  examples: {
    noun: {
      strongForm: string;
      weakForm: string;
      context: string; // e.g., "pankki → pankissa"
      sentence: string; // e.g., "Minä olen ___________" (I am in the bank)
      caseInfo: string; // e.g., "inessive case (-ssa/-ssä)"
    }[];
    verb: {
      strongForm: string;
      weakForm: string;
      context: string; // e.g., "nukkua → minä nukun"
      sentence: string; // e.g., "Minä ___________ illalla" (I sleep in the evening)
      person: string; // e.g., "minä"
    }[];
  };
}

// Strong → Weak Rules (most common)
export const strongToWeakRules: GradationRule[] = [
  {
    id: 'kk-k',
    rule: 'kk → k',
    description: 'Double k becomes single k',
    verbGuide: 'In verbs, the double k in the infinitive becomes single k in the conjugated form. Example: nukkua (to sleep) → minä nukun (I sleep). The kk changes to k when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'pankki', 
          weakForm: 'pankissa', 
          context: 'pankki → pankissa',
          sentence: 'Minä olen ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
        { 
          strongForm: 'lakki', 
          weakForm: 'lakissa', 
          context: 'lakki → lakissa',
          sentence: 'Hänellä on ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
      ],
      verb: [
        { 
          strongForm: 'nukkua', 
          weakForm: 'minä nukun', 
          context: 'nukkua → minä nukun',
          sentence: 'Minä ___________ illalla',
          person: 'minä',
        },
        { 
          strongForm: 'sukkua', 
          weakForm: 'minä sukun', 
          context: 'sukkua → minä sukun',
          sentence: 'Minä ___________ hyvin',
          person: 'minä',
        },
      ],
    },
  },
  {
    id: 'pp-p',
    rule: 'pp → p',
    description: 'Double p becomes single p',
    verbGuide: 'In verbs, the double p in the infinitive becomes single p in the conjugated form. Example: tappaa (to kill/hit) → minä tapaan (I hit). The pp changes to p when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'kauppa', 
          weakForm: 'kaupassa', 
          context: 'kauppa → kaupassa',
          sentence: 'Minä käyn ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
        { 
          strongForm: 'lappi', 
          weakForm: 'lapissa', 
          context: 'lappi → lapissa',
          sentence: 'Hän asuu ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
      ],
      verb: [
        { 
          strongForm: 'tappaa', 
          weakForm: 'minä tapaan', 
          context: 'tappaa → minä tapaan',
          sentence: 'Minä ___________ aamulla',
          person: 'minä',
        },
        { 
          strongForm: 'oppia', 
          weakForm: 'minä opin', 
          context: 'oppia → minä opin',
          sentence: 'Minä ___________ suomea',
          person: 'minä',
        },
      ],
    },
  },
  {
    id: 'tt-t',
    rule: 'tt → t',
    description: 'Double t becomes single t',
    verbGuide: 'In verbs, the double t in the infinitive becomes single t in the conjugated form. Example: ottaa (to take) → minä otan (I take). The tt changes to t when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'konsertti', 
          weakForm: 'konsertissa', 
          context: 'konsertti → konsertissa',
          sentence: 'Minä olen ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
        { 
          strongForm: 'teatteri', 
          weakForm: 'teatterissa', 
          context: 'teatteri → teatterissa',
          sentence: 'Me käymme ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
      ],
      verb: [
        { 
          strongForm: 'ottaa', 
          weakForm: 'minä otan', 
          context: 'ottaa → minä otan',
          sentence: 'Minä ___________ kahvia',
          person: 'minä',
        },
        { 
          strongForm: 'kattaa', 
          weakForm: 'minä katan', 
          context: 'kattaa → minä katan',
          sentence: 'Minä ___________ pöydän',
          person: 'minä',
        },
      ],
    },
  },
  {
    id: 'nt-nn',
    rule: 'nt → nn',
    description: 'nt becomes nn',
    verbGuide: 'In verbs, nt in the infinitive becomes nn in the conjugated form. Example: antaa (to give) → minä annan (I give). The nt changes to nn when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'Skotlanti', 
          weakForm: 'Skotlannissa', 
          context: 'Skotlanti → Skotlannissa',
          sentence: 'Hän asuu ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
        { 
          strongForm: 'ranti', 
          weakForm: 'rannilla', 
          context: 'ranti → rannilla',
          sentence: 'Me olemme ___________',
          caseInfo: 'adessive case (-lla/-llä)',
        },
      ],
      verb: [
        { 
          strongForm: 'antaa', 
          weakForm: 'minä annan', 
          context: 'antaa → minä annan',
          sentence: 'Minä ___________ lahjan',
          person: 'minä',
        },
        { 
          strongForm: 'lentää', 
          weakForm: 'minä lennän', 
          context: 'lentää → minä lennän',
          sentence: 'Minä ___________ Helsinkiin',
          person: 'minä',
        },
      ],
    },
  },
  {
    id: 'nk-ng',
    rule: 'nk → ng',
    description: 'nk becomes ng',
    verbGuide: 'In verbs, nk in the infinitive becomes ng in the conjugated form. Example: tinkiä (to bargain) → minä tingin (I bargained). The nk changes to ng when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'kaupunki', 
          weakForm: 'kaupungissa', 
          context: 'kaupunki → kaupungissa',
          sentence: 'Hän asuu ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
        { 
          strongForm: 'kenkä', 
          weakForm: 'kengässä', 
          context: 'kenkä → kengässä',
          sentence: 'Minulla on ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
      ],
      verb: [
        { 
          strongForm: 'tinkiä', 
          weakForm: 'minä tingin', 
          context: 'tinkiä → minä tingin',
          sentence: 'Minä ___________ hinnasta',
          person: 'minä',
        },
      ],
    },
  },
  {
    id: 'mp-mm',
    rule: 'mp → mm',
    description: 'mp becomes mm',
    verbGuide: 'In verbs, mp in the infinitive becomes mm in the conjugated form. Example: ampua (to shoot) → minä ammun (I shoot). The mp changes to mm when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'kampa', 
          weakForm: 'kammassa', 
          context: 'kampa → kammassa',
          sentence: 'Hän käyttää ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
        { 
          strongForm: 'lampi', 
          weakForm: 'lammessa', 
          context: 'lampi → lammessa',
          sentence: 'Me uimme ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
      ],
      verb: [
        { 
          strongForm: 'ampua', 
          weakForm: 'minä ammun', 
          context: 'ampua → minä ammun',
          sentence: 'Minä ___________ metsässä',
          person: 'minä',
        },
      ],
    },
  },
  {
    id: 'lt-ll',
    rule: 'lt → ll',
    description: 'lt becomes ll',
    verbGuide: 'In verbs, lt in the infinitive becomes ll in the conjugated form. Example: viheltää (to whistle) → minä vihellän (I whistle). The lt changes to ll when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'silta', 
          weakForm: 'sillalla', 
          context: 'silta → sillalla',
          sentence: 'Me kävelemme ___________',
          caseInfo: 'adessive case (-lla/-llä)',
        },
        { 
          strongForm: 'valta', 
          weakForm: 'vallalla', 
          context: 'valta → vallalla',
          sentence: 'Hän on ___________',
          caseInfo: 'adessive case (-lla/-llä)',
        },
      ],
      verb: [
        { 
          strongForm: 'viheltää', 
          weakForm: 'minä vihellän', 
          context: 'viheltää → minä vihellän',
          sentence: 'Minä ___________ työpaikalla',
          person: 'minä',
        },
      ],
    },
  },
  {
    id: 'rt-rr',
    rule: 'rt → rr',
    description: 'rt becomes rr',
    verbGuide: 'In verbs, rt in the infinitive becomes rr in the conjugated form. Example: kertoa (to tell) → minä kerron (I tell). The rt changes to rr when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'virta', 
          weakForm: 'virralla', 
          context: 'virta → virralla',
          sentence: 'Me istumme ___________',
          caseInfo: 'adessive case (-lla/-llä)',
        },
        { 
          strongForm: 'kerta', 
          weakForm: 'kerralla', 
          context: 'kerta → kerralla',
          sentence: 'Hän tekee sen ___________',
          caseInfo: 'adessive case (-lla/-llä)',
        },
      ],
      verb: [
        { 
          strongForm: 'kertoa', 
          weakForm: 'minä kerron', 
          context: 'kertoa → minä kerron',
          sentence: 'Minä ___________ tarinan',
          person: 'minä',
        },
      ],
    },
  },
  {
    id: 't-d',
    rule: 't → d',
    description: 't becomes d',
    verbGuide: 'In verbs, t in the infinitive becomes d in the conjugated form. Example: pyytää (to ask/request) → minä pyydän (I ask). The t changes to d when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'pöytä', 
          weakForm: 'pöydällä', 
          context: 'pöytä → pöydällä',
          sentence: 'Kirja on ___________',
          caseInfo: 'adessive case (-lla/-llä)',
        },
        { 
          strongForm: 'katu', 
          weakForm: 'kadulla', 
          context: 'katu → kadulla',
          sentence: 'Me kävelemme ___________',
          caseInfo: 'adessive case (-lla/-llä)',
        },
      ],
      verb: [
        { 
          strongForm: 'pyytää', 
          weakForm: 'minä pyydän', 
          context: 'pyytää → minä pyydän',
          sentence: 'Minä ___________ anteeksi',
          person: 'minä',
        },
      ],
    },
  },
  {
    id: 'k-v',
    rule: 'k → v',
    description: 'k becomes v',
    verbGuide: 'Note: The k → v rule is primarily for nouns. For verbs, k usually disappears (k → Ø) rather than becoming v. This rule mainly applies to noun cases like luku → luvussa.',
    examples: {
      noun: [
        { 
          strongForm: 'luku', 
          weakForm: 'luvussa', 
          context: 'luku → luvussa',
          sentence: 'Hän on ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
        { 
          strongForm: 'puku', 
          weakForm: 'puvussa', 
          context: 'puku → puvussa',
          sentence: 'Hän on kauniissa ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
      ],
      verb: [
        // k → v is rare for verbs, skipping verb practice for this rule
      ],
    },
  },
  {
    id: 'p-v',
    rule: 'p → v',
    description: 'p becomes v',
    verbGuide: 'In verbs, p in the infinitive becomes v in the conjugated form. Example: leipoa (to bake) → minä leivon (I bake). The p changes to v when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'apu', 
          weakForm: 'avulla', 
          context: 'apu → avulla',
          sentence: 'Minä teen sen ___________',
          caseInfo: 'adessive case (-lla/-llä)',
        },
        { 
          strongForm: 'tapa', 
          weakForm: 'tavalla', 
          context: 'tapa → tavalla',
          sentence: 'Hän tekee sen ___________',
          caseInfo: 'adessive case (-lla/-llä)',
        },
      ],
      verb: [
        { 
          strongForm: 'leipoa', 
          weakForm: 'minä leivon', 
          context: 'leipoa → minä leivon',
          sentence: 'Minä ___________ leipää',
          person: 'minä',
        },
      ],
    },
  },
  {
    id: 'k-disappears',
    rule: 'k → Ø',
    description: 'k disappears completely',
    verbGuide: 'In verbs, k in the infinitive disappears completely in the conjugated form. Example: jakaa (to divide/share) → minä jaan (I share). The k is removed entirely when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'polku', 
          weakForm: 'polulla', 
          context: 'polku → polulla',
          sentence: 'Me kävelemme ___________',
          caseInfo: 'adessive case (-lla/-llä)',
        },
        { 
          strongForm: 'jalka', 
          weakForm: 'jalalla', 
          context: 'jalka → jalalla',
          sentence: 'Hän seisoo ___________',
          caseInfo: 'adessive case (-lla/-llä)',
        },
      ],
      verb: [
        { 
          strongForm: 'jakaa', 
          weakForm: 'minä jaan', 
          context: 'jakaa → minä jaan',
          sentence: 'Minä ___________ lehden',
          person: 'minä',
        },
      ],
    },
  },
];

// Weak → Strong Rules (less common)
export const weakToStrongRules: GradationRule[] = [
  {
    id: 'k-kk',
    rule: 'k → kk',
    description: 'Single k becomes double kk',
    verbGuide: 'In verbs, single k in the infinitive becomes double kk in certain conjugated forms. Example: pakata (to pack) → minä pakkaan (I pack). The k becomes kk when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'liike', 
          weakForm: 'liikkeessä', 
          context: 'liike → liikkeessä',
          sentence: 'Hän työskentelee ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
      ],
      verb: [
        { 
          strongForm: 'pakata', 
          weakForm: 'minä pakkaan', 
          context: 'pakata → minä pakkaan',
          sentence: 'Minä ___________ matkalaukkuni',
          person: 'minä',
        },
      ],
    },
  },
  {
    id: 'p-pp',
    rule: 'p → pp',
    description: 'Single p becomes double pp',
    verbGuide: 'In verbs, single p in the infinitive becomes double pp in certain conjugated forms. Example: hypätä (to jump) → minä hyppään (I jump). The p becomes pp when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'opas', 
          weakForm: 'oppaassa', 
          context: 'opas → oppaassa',
          sentence: 'Minä luen ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
      ],
      verb: [
        { 
          strongForm: 'hypätä', 
          weakForm: 'minä hyppään', 
          context: 'hypätä → minä hyppään',
          sentence: 'Minä ___________ korkealle',
          person: 'minä',
        },
      ],
    },
  },
  {
    id: 't-tt',
    rule: 't → tt',
    description: 'Single t becomes double tt',
    verbGuide: 'In verbs, single t in the infinitive becomes double tt in certain conjugated forms. Example: mitata (to measure) → minä mittaan (I measure). The t becomes tt when you add personal endings.',
    examples: {
      noun: [
        { 
          strongForm: 'osoite', 
          weakForm: 'osoitteessa', 
          context: 'osoite → osoitteessa',
          sentence: 'Hän asuu ___________',
          caseInfo: 'inessive case (-ssa/-ssä)',
        },
      ],
      verb: [
        { 
          strongForm: 'mitata', 
          weakForm: 'minä mittaan', 
          context: 'mitata → minä mittaan',
          sentence: 'Minä ___________ huoneen',
          person: 'minä',
        },
      ],
    },
  },
];

// Helper to get all rules
export function getAllRules(): GradationRule[] {
  return [...strongToWeakRules, ...weakToStrongRules];
}

// Helper to create practice questions from a rule
export function createPracticeQuestions(rule: GradationRule): ConsonantGradationQuestion[] {
  const questions: ConsonantGradationQuestion[] = [];
  
  // Add noun examples
  rule.examples.noun.forEach((example, index) => {
    // Use the sentence with blank, answer is the weak form
    const blankForm = example.sentence || `${example.strongForm} → ___________`;
    const expectedAnswer = example.weakForm;
    
    questions.push({
      id: `${rule.id}-noun-${index}`,
      type: 'fill-blank',
      strongForm: example.strongForm,
      weakForm: example.weakForm,
      context: example.context,
      rule: rule.rule,
      category: 'noun',
      blankForm,
      expectedAnswer: expectedAnswer.trim(),
      caseInfo: example.caseInfo,
    });
  });
  
  // Add verb examples
  rule.examples.verb.forEach((example, index) => {
    // Use the sentence with blank
    const blankForm = example.sentence || `${example.strongForm} → ${example.person} ___________`;
    
    // Extract just the verb form (without person)
    const verbParts = example.weakForm.split(' ');
    const verbForm = verbParts.length > 1 ? verbParts[1] : verbParts[0];
    
    questions.push({
      id: `${rule.id}-verb-${index}`,
      type: 'fill-blank',
      strongForm: example.strongForm,
      weakForm: example.weakForm,
      context: example.context,
      rule: rule.rule,
      category: 'verb',
      blankForm,
      expectedAnswer: verbForm.trim(),
      person: example.person,
    });
  });
  
  return questions;
}
