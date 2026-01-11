// Finnish Question Words (Kysymyssanat) Data
// Helps learners quickly recognize what each question word asks for

export type QuestionCategory = 
  | 'what'        // mitä, mikä
  | 'who'         // kuka, kenellä, etc.
  | 'where'       // missä, mistä, mihin, minne
  | 'when'        // milloin, koska, mihin aikaan
  | 'how'         // miten, kuinka, millainen
  | 'why'         // miksi, minkä takia
  | 'which'       // mikä, kumpi
  | 'whose'       // kenen
  | 'how-much';   // paljonko, montako

export interface QuestionWord {
  finnish: string;
  english: string;
  category: QuestionCategory;
  usage: string;           // Brief explanation of when to use
  example: string;         // Example sentence in Finnish
  exampleTranslation: string; // Example translation
  caseRequired?: string;   // What case the answer typically uses
  alternatives?: string[]; // Other accepted translations
}

export interface QuestionCategoryInfo {
  id: QuestionCategory;
  name: string;
  finnishName: string;
  description: string;
  color: string;
}

export const QUESTION_CATEGORIES: QuestionCategoryInfo[] = [
  {
    id: 'what',
    name: 'What',
    finnishName: 'Mitä/Mikä',
    description: 'Questions about things, objects, and concepts',
    color: '#4a9eff',
  },
  {
    id: 'who',
    name: 'Who',
    finnishName: 'Kuka',
    description: 'Questions about people and identity',
    color: '#e74c3c',
  },
  {
    id: 'where',
    name: 'Where',
    finnishName: 'Missä/Minne',
    description: 'Questions about location and direction',
    color: '#27ae60',
  },
  {
    id: 'when',
    name: 'When',
    finnishName: 'Milloin',
    description: 'Questions about time',
    color: '#9b59b6',
  },
  {
    id: 'how',
    name: 'How',
    finnishName: 'Miten',
    description: 'Questions about manner, method, and description',
    color: '#f39c12',
  },
  {
    id: 'why',
    name: 'Why',
    finnishName: 'Miksi',
    description: 'Questions about reasons and causes',
    color: '#1abc9c',
  },
  {
    id: 'which',
    name: 'Which',
    finnishName: 'Mikä/Kumpi',
    description: 'Questions about choice and selection',
    color: '#ff7b4a',
  },
  {
    id: 'whose',
    name: 'Whose',
    finnishName: 'Kenen',
    description: 'Questions about possession',
    color: '#e056fd',
  },
  {
    id: 'how-much',
    name: 'How much/many',
    finnishName: 'Paljonko',
    description: 'Questions about quantity and amount',
    color: '#00b894',
  },
];

export const QUESTION_WORDS: QuestionWord[] = [
  // === WHAT (Mitä/Mikä) ===
  {
    finnish: 'mikä',
    english: 'what / which (one)',
    category: 'what',
    usage: 'Asks about identity or selection (subject/nominative)',
    example: 'Mikä tämä on?',
    exampleTranslation: 'What is this?',
    caseRequired: 'nominative',
    alternatives: ['what', 'which'],
  },
  {
    finnish: 'mitä',
    english: 'what (object)',
    category: 'what',
    usage: 'Asks about the object of an action (partitive)',
    example: 'Mitä sinä teet?',
    exampleTranslation: 'What are you doing?',
    caseRequired: 'partitive',
    alternatives: ['what'],
  },
  {
    finnish: 'minkä',
    english: 'what / which (accusative)',
    category: 'what',
    usage: 'Asks about a specific object (genitive/accusative)',
    example: 'Minkä kirjan ostat?',
    exampleTranslation: 'Which book are you buying?',
    caseRequired: 'genitive',
    alternatives: ['which', 'what'],
  },
  {
    finnish: 'mistä',
    english: 'about what / from what',
    category: 'what',
    usage: 'Asks what something is about or from (elative)',
    example: 'Mistä te puhutte?',
    exampleTranslation: 'What are you talking about?',
    caseRequired: 'elative',
    alternatives: ['what about', 'from what'],
  },
  {
    finnish: 'mihin',
    english: 'into what / to what',
    category: 'what',
    usage: 'Asks about destination inside something (illative)',
    example: 'Mihin laitat avaimet?',
    exampleTranslation: 'Where are you putting the keys?',
    caseRequired: 'illative',
    alternatives: ['to what', 'where into'],
  },
  {
    finnish: 'missä',
    english: 'in what',
    category: 'what',
    usage: 'Asks about location inside something (inessive)',
    example: 'Missä laatikossa se on?',
    exampleTranslation: 'In which box is it?',
    caseRequired: 'inessive',
    alternatives: ['in what', 'where'],
  },
  {
    finnish: 'millä',
    english: 'with what / on what',
    category: 'what',
    usage: 'Asks about means or surface location (adessive)',
    example: 'Millä tulet töihin?',
    exampleTranslation: 'How do you get to work? (by what)',
    caseRequired: 'adessive',
    alternatives: ['by what', 'with what', 'on what'],
  },
  {
    finnish: 'mille',
    english: 'onto what / to what (surface)',
    category: 'what',
    usage: 'Asks about destination on a surface (allative)',
    example: 'Mille pöydälle laitan tämän?',
    exampleTranslation: 'On which table should I put this?',
    caseRequired: 'allative',
    alternatives: ['to what', 'onto what'],
  },
  {
    finnish: 'miltä',
    english: 'from what (surface)',
    category: 'what',
    usage: 'Asks about origin from a surface (ablative)',
    example: 'Miltä se näyttää?',
    exampleTranslation: 'What does it look like?',
    caseRequired: 'ablative',
    alternatives: ['from what', 'how does it seem'],
  },

  // === WHO (Kuka) ===
  {
    finnish: 'kuka',
    english: 'who (subject)',
    category: 'who',
    usage: 'Asks about a person (nominative)',
    example: 'Kuka tulee?',
    exampleTranslation: 'Who is coming?',
    caseRequired: 'nominative',
    alternatives: ['who'],
  },
  {
    finnish: 'ketä',
    english: 'who / whom (object)',
    category: 'who',
    usage: 'Asks about the object person (partitive)',
    example: 'Ketä sinä rakastat?',
    exampleTranslation: 'Who do you love?',
    caseRequired: 'partitive',
    alternatives: ['whom', 'who'],
  },
  {
    finnish: 'kenet',
    english: 'who / whom (specific)',
    category: 'who',
    usage: 'Asks about a specific person (accusative)',
    example: 'Kenet kutsut juhliin?',
    exampleTranslation: 'Who will you invite to the party?',
    caseRequired: 'accusative',
    alternatives: ['whom', 'who'],
  },
  {
    finnish: 'kenellä',
    english: 'who has / at whose place',
    category: 'who',
    usage: 'Asks about possession or location with person (adessive)',
    example: 'Kenellä on avaimet?',
    exampleTranslation: 'Who has the keys?',
    caseRequired: 'adessive',
    alternatives: ['who has', 'at whose place'],
  },
  {
    finnish: 'kenelle',
    english: 'to whom / for whom',
    category: 'who',
    usage: 'Asks about recipient (allative)',
    example: 'Kenelle annat lahjan?',
    exampleTranslation: 'To whom are you giving the gift?',
    caseRequired: 'allative',
    alternatives: ['for whom', 'to whom'],
  },
  {
    finnish: 'keneltä',
    english: 'from whom',
    category: 'who',
    usage: 'Asks about source person (ablative)',
    example: 'Keneltä sait tämän?',
    exampleTranslation: 'From whom did you get this?',
    caseRequired: 'ablative',
    alternatives: ['from whom'],
  },
  {
    finnish: 'kenen kanssa',
    english: 'with whom',
    category: 'who',
    usage: 'Asks about companionship',
    example: 'Kenen kanssa menet?',
    exampleTranslation: 'With whom are you going?',
    alternatives: ['who with', 'with whom'],
  },
  {
    finnish: 'ketkä',
    english: 'who (plural)',
    category: 'who',
    usage: 'Asks about multiple people',
    example: 'Ketkä tulevat?',
    exampleTranslation: 'Who (all) are coming?',
    caseRequired: 'nominative plural',
    alternatives: ['who'],
  },

  // === WHERE (Missä/Minne/Mistä) ===
  {
    finnish: 'missä',
    english: 'where (static location)',
    category: 'where',
    usage: 'Asks about current location (inside)',
    example: 'Missä asut?',
    exampleTranslation: 'Where do you live?',
    caseRequired: 'inessive',
    alternatives: ['where', 'in which place'],
  },
  {
    finnish: 'mistä',
    english: 'where from / from where',
    category: 'where',
    usage: 'Asks about origin/starting point (from inside)',
    example: 'Mistä olet kotoisin?',
    exampleTranslation: 'Where are you from?',
    caseRequired: 'elative',
    alternatives: ['from where', 'where from'],
  },
  {
    finnish: 'mihin',
    english: 'where to (inside)',
    category: 'where',
    usage: 'Asks about destination (going inside)',
    example: 'Mihin menet?',
    exampleTranslation: 'Where are you going?',
    caseRequired: 'illative',
    alternatives: ['to where', 'where to'],
  },
  {
    finnish: 'minne',
    english: 'where to (direction)',
    category: 'where',
    usage: 'Asks about direction/destination (general)',
    example: 'Minne olet menossa?',
    exampleTranslation: 'Where are you headed?',
    alternatives: ['to where', 'where to', 'which direction'],
  },
  {
    finnish: 'millä',
    english: 'where (on surface)',
    category: 'where',
    usage: 'Asks about location on a surface',
    example: 'Millä kadulla asut?',
    exampleTranslation: 'On which street do you live?',
    caseRequired: 'adessive',
    alternatives: ['on which', 'where on'],
  },
  {
    finnish: 'mille',
    english: 'where to (onto surface)',
    category: 'where',
    usage: 'Asks about destination onto a surface',
    example: 'Mille pöydälle laitan tämän?',
    exampleTranslation: 'On which table should I put this?',
    caseRequired: 'allative',
    alternatives: ['onto where', 'to which'],
  },
  {
    finnish: 'miltä',
    english: 'where from (surface)',
    category: 'where',
    usage: 'Asks about origin from a surface',
    example: 'Miltä pysäkiltä nouset?',
    exampleTranslation: 'At which stop do you get on?',
    caseRequired: 'ablative',
    alternatives: ['from which', 'from where'],
  },
  {
    finnish: 'missä päin',
    english: 'whereabouts / in which area',
    category: 'where',
    usage: 'Asks about general area or region',
    example: 'Missä päin Suomea asut?',
    exampleTranslation: 'In which part of Finland do you live?',
    alternatives: ['in which part', 'whereabouts'],
  },

  // === WHEN (Milloin) ===
  {
    finnish: 'milloin',
    english: 'when',
    category: 'when',
    usage: 'Asks about time (general)',
    example: 'Milloin tulet?',
    exampleTranslation: 'When are you coming?',
    alternatives: ['when', 'at what time'],
  },
  {
    finnish: 'koska',
    english: 'when / at what time',
    category: 'when',
    usage: 'Asks about specific time',
    example: 'Koska kokous alkaa?',
    exampleTranslation: 'When does the meeting start?',
    alternatives: ['when', 'at what time'],
  },
  {
    finnish: 'mihin aikaan',
    english: 'at what time',
    category: 'when',
    usage: 'Asks about specific clock time',
    example: 'Mihin aikaan heräät?',
    exampleTranslation: 'At what time do you wake up?',
    alternatives: ['what time', 'at what time'],
  },
  {
    finnish: 'minä päivänä',
    english: 'on which day',
    category: 'when',
    usage: 'Asks about specific day',
    example: 'Minä päivänä lähdet?',
    exampleTranslation: 'On which day are you leaving?',
    alternatives: ['which day', 'on what day'],
  },
  {
    finnish: 'moneltako',
    english: 'at what time (exact)',
    category: 'when',
    usage: 'Asks for precise time (hour)',
    example: 'Moneltako tapaaminen on?',
    exampleTranslation: 'At what time is the meeting?',
    alternatives: ['what time', 'at what hour'],
  },
  {
    finnish: 'kuinka kauan',
    english: 'how long',
    category: 'when',
    usage: 'Asks about duration',
    example: 'Kuinka kauan matka kestää?',
    exampleTranslation: 'How long does the trip take?',
    alternatives: ['for how long', 'how long'],
  },
  {
    finnish: 'kuinka usein',
    english: 'how often',
    category: 'when',
    usage: 'Asks about frequency',
    example: 'Kuinka usein käyt salilla?',
    exampleTranslation: 'How often do you go to the gym?',
    alternatives: ['how frequently', 'how often'],
  },
  {
    finnish: 'mistä lähtien',
    english: 'since when',
    category: 'when',
    usage: 'Asks about starting point in time',
    example: 'Mistä lähtien olet opiskellut suomea?',
    exampleTranslation: 'Since when have you been studying Finnish?',
    alternatives: ['since when', 'from when'],
  },
  {
    finnish: 'mihin asti',
    english: 'until when',
    category: 'when',
    usage: 'Asks about end point in time',
    example: 'Mihin asti olet töissä?',
    exampleTranslation: 'Until when are you at work?',
    alternatives: ['until when', 'till when'],
  },

  // === HOW (Miten) ===
  {
    finnish: 'miten',
    english: 'how (manner)',
    category: 'how',
    usage: 'Asks about manner or method',
    example: 'Miten tämä toimii?',
    exampleTranslation: 'How does this work?',
    alternatives: ['how', 'in what way'],
  },
  {
    finnish: 'kuinka',
    english: 'how',
    category: 'how',
    usage: 'Asks about manner (more formal)',
    example: 'Kuinka voit?',
    exampleTranslation: 'How are you?',
    alternatives: ['how'],
  },
  {
    finnish: 'millainen',
    english: 'what kind of / what is it like',
    category: 'how',
    usage: 'Asks about characteristics/type',
    example: 'Millainen päivä sinulla oli?',
    exampleTranslation: 'What kind of day did you have?',
    alternatives: ['what kind', 'what type', 'what like'],
  },
  {
    finnish: 'minkälainen',
    english: 'what kind of / what type',
    category: 'how',
    usage: 'Asks about type or characteristics',
    example: 'Minkälaisen auton haluat?',
    exampleTranslation: 'What kind of car do you want?',
    alternatives: ['what kind of', 'what sort of'],
  },
  {
    finnish: 'minkä värinen',
    english: 'what color',
    category: 'how',
    usage: 'Asks about color',
    example: 'Minkä värinen takkisi on?',
    exampleTranslation: 'What color is your jacket?',
    alternatives: ['which color', 'what color'],
  },
  {
    finnish: 'minkä kokoinen',
    english: 'what size',
    category: 'how',
    usage: 'Asks about size',
    example: 'Minkä kokoinen paita sopii sinulle?',
    exampleTranslation: 'What size shirt fits you?',
    alternatives: ['which size', 'what size'],
  },
  {
    finnish: 'miten niin',
    english: 'how so / what do you mean',
    category: 'how',
    usage: 'Asks for clarification',
    example: 'Miten niin et tule?',
    exampleTranslation: 'What do you mean you\'re not coming?',
    alternatives: ['how so', 'what do you mean'],
  },

  // === WHY (Miksi) ===
  {
    finnish: 'miksi',
    english: 'why',
    category: 'why',
    usage: 'Asks about reason (general)',
    example: 'Miksi olet myöhässä?',
    exampleTranslation: 'Why are you late?',
    alternatives: ['why', 'for what reason'],
  },
  {
    finnish: 'minkä takia',
    english: 'because of what / why',
    category: 'why',
    usage: 'Asks about cause (more emphatic)',
    example: 'Minkä takia et soittanut?',
    exampleTranslation: 'Why didn\'t you call?',
    alternatives: ['why', 'for what reason', 'because of what'],
  },
  {
    finnish: 'minkä vuoksi',
    english: 'for what reason / why',
    category: 'why',
    usage: 'Asks about reason (formal)',
    example: 'Minkä vuoksi hän lähti?',
    exampleTranslation: 'For what reason did he leave?',
    alternatives: ['why', 'for what reason'],
  },
  {
    finnish: 'mitä varten',
    english: 'for what purpose',
    category: 'why',
    usage: 'Asks about purpose',
    example: 'Mitä varten tarvitset tätä?',
    exampleTranslation: 'For what purpose do you need this?',
    alternatives: ['what for', 'for what purpose'],
  },
  {
    finnish: 'mihin tarkoitukseen',
    english: 'for what purpose',
    category: 'why',
    usage: 'Asks about intended purpose (formal)',
    example: 'Mihin tarkoitukseen käytät tätä?',
    exampleTranslation: 'For what purpose do you use this?',
    alternatives: ['for what purpose', 'to what end'],
  },

  // === WHICH (Mikä/Kumpi) ===
  {
    finnish: 'kumpi',
    english: 'which (of two)',
    category: 'which',
    usage: 'Asks to choose between two options',
    example: 'Kumpi on parempi?',
    exampleTranslation: 'Which (of the two) is better?',
    alternatives: ['which one', 'which of two'],
  },
  {
    finnish: 'kumpaa',
    english: 'which (of two) - object',
    category: 'which',
    usage: 'Asks to choose between two (partitive)',
    example: 'Kumpaa haluat?',
    exampleTranslation: 'Which (of the two) do you want?',
    caseRequired: 'partitive',
    alternatives: ['which one'],
  },
  {
    finnish: 'mikä',
    english: 'which (of many)',
    category: 'which',
    usage: 'Asks to choose from multiple options',
    example: 'Mikä näistä on sinun?',
    exampleTranslation: 'Which of these is yours?',
    alternatives: ['which one', 'which'],
  },
  {
    finnish: 'mitkä',
    english: 'which (plural)',
    category: 'which',
    usage: 'Asks to choose multiple from options',
    example: 'Mitkä ovat suosikkisi?',
    exampleTranslation: 'Which are your favorites?',
    alternatives: ['which ones', 'which'],
  },

  // === WHOSE (Kenen) ===
  {
    finnish: 'kenen',
    english: 'whose',
    category: 'whose',
    usage: 'Asks about ownership/possession',
    example: 'Kenen tämä on?',
    exampleTranslation: 'Whose is this?',
    caseRequired: 'genitive',
    alternatives: ['whose'],
  },
  {
    finnish: 'keiden',
    english: 'whose (plural)',
    category: 'whose',
    usage: 'Asks about ownership by multiple people',
    example: 'Keiden laukut nämä ovat?',
    exampleTranslation: 'Whose bags are these?',
    caseRequired: 'genitive plural',
    alternatives: ['whose'],
  },
  {
    finnish: 'minkä',
    english: 'whose / of which (thing)',
    category: 'whose',
    usage: 'Asks about possession for things',
    example: 'Minkä talon pihalla olet?',
    exampleTranslation: 'In whose yard are you?',
    alternatives: ['of which', 'whose'],
  },

  // === HOW MUCH/MANY (Paljonko) ===
  {
    finnish: 'paljonko',
    english: 'how much',
    category: 'how-much',
    usage: 'Asks about amount/price',
    example: 'Paljonko tämä maksaa?',
    exampleTranslation: 'How much does this cost?',
    alternatives: ['how much'],
  },
  {
    finnish: 'kuinka paljon',
    english: 'how much',
    category: 'how-much',
    usage: 'Asks about quantity (formal)',
    example: 'Kuinka paljon rahaa tarvitset?',
    exampleTranslation: 'How much money do you need?',
    alternatives: ['how much'],
  },
  {
    finnish: 'montako',
    english: 'how many',
    category: 'how-much',
    usage: 'Asks about countable number',
    example: 'Montako lasta sinulla on?',
    exampleTranslation: 'How many children do you have?',
    alternatives: ['how many'],
  },
  {
    finnish: 'kuinka monta',
    english: 'how many',
    category: 'how-much',
    usage: 'Asks about countable number (formal)',
    example: 'Kuinka monta henkilöä tulee?',
    exampleTranslation: 'How many people are coming?',
    alternatives: ['how many'],
  },
  {
    finnish: 'monesko',
    english: 'which number / what place',
    category: 'how-much',
    usage: 'Asks about ordinal number/ranking',
    example: 'Monesko päivä tänään on?',
    exampleTranslation: 'What date is it today?',
    alternatives: ['which number', 'what place'],
  },
  {
    finnish: 'minkä ikäinen',
    english: 'how old / what age',
    category: 'how-much',
    usage: 'Asks about age',
    example: 'Minkä ikäinen olet?',
    exampleTranslation: 'How old are you?',
    alternatives: ['how old', 'what age'],
  },
  {
    finnish: 'minkä hintainen',
    english: 'what price / how expensive',
    category: 'how-much',
    usage: 'Asks about price level',
    example: 'Minkä hintainen talo on?',
    exampleTranslation: 'What price is the house?',
    alternatives: ['what price', 'how expensive'],
  },
];

// Helper functions
export function getWordsByCategory(categories: QuestionCategory[]): QuestionWord[] {
  if (categories.length === 0) return [...QUESTION_WORDS];
  return QUESTION_WORDS.filter(word => categories.includes(word.category));
}

export function getCategoryInfo(category: QuestionCategory): QuestionCategoryInfo | undefined {
  return QUESTION_CATEGORIES.find(c => c.id === category);
}

export function getWordCount(categories: QuestionCategory[]): number {
  return getWordsByCategory(categories).length;
}

export function getAllCategories(): QuestionCategory[] {
  return QUESTION_CATEGORIES.map(c => c.id);
}

// Shuffle function for randomizing
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get multiple choice options for a word
export function getOptionsForWord(correctWord: QuestionWord, allWords: QuestionWord[], count: number = 4): string[] {
  // Get wrong options from other words (try to get from different categories for variety)
  const wrongOptions = allWords
    .filter(w => w.finnish !== correctWord.finnish)
    .map(w => w.english.split('/')[0].trim()); // Get first translation option
  
  const shuffledWrong = shuffleArray(wrongOptions).slice(0, count - 1);
  const correctAnswer = correctWord.english.split('/')[0].trim();
  
  // Shuffle correct with wrong options
  return shuffleArray([correctAnswer, ...shuffledWrong]);
}

// ============ SCENARIO-BASED LEARNING ============
// Learn question words through situations, not translations

export interface Scenario {
  id: string;
  emoji: string;           // Visual representation
  situation: string;       // What you want to know (in simple terms)
  context: string;         // The scene/situation
  correctWord: string;     // The Finnish question word
  category: QuestionCategory;
  hint?: string;           // Optional hint for wrong answers
}

export interface AnswerScenario {
  id: string;
  emoji: string;
  answer: string;          // A Finnish answer
  answerMeaning: string;   // What it means (for feedback)
  correctQuestion: string; // What question was asked
  category: QuestionCategory;
  alternatives?: string[]; // Other acceptable question words
}

// Scenarios - "What would you ask?"
export const SCENARIOS: Scenario[] = [
  // WHERE scenarios
  {
    id: 'where-1',
    emoji: '🏠',
    situation: "You want to know someone's home location",
    context: "You meet a new friend and want to know where they live",
    correctWord: 'missä',
    category: 'where',
    hint: 'Static location - where something IS'
  },
  {
    id: 'where-2',
    emoji: '🚶',
    situation: "You want to know where someone is going",
    context: "Your friend is putting on their coat to leave",
    correctWord: 'mihin',
    category: 'where',
    hint: 'Movement INTO somewhere'
  },
  {
    id: 'where-3',
    emoji: '✈️',
    situation: "You want to know where someone came from",
    context: "Someone just arrived at your house",
    correctWord: 'mistä',
    category: 'where',
    hint: 'Movement FROM somewhere'
  },
  {
    id: 'where-4',
    emoji: '🧭',
    situation: "You want to know the direction someone is heading",
    context: "Someone is walking away and you're curious about their destination",
    correctWord: 'minne',
    category: 'where',
    hint: 'General direction/destination'
  },
  {
    id: 'where-5',
    emoji: '🛣️',
    situation: "You want to know which street someone lives on",
    context: "You need an address for a delivery",
    correctWord: 'millä',
    category: 'where',
    hint: 'Location ON something (surface/street)'
  },

  // WHEN scenarios
  {
    id: 'when-1',
    emoji: '📅',
    situation: "You want to know when an event happens",
    context: "A friend mentions a party but not when",
    correctWord: 'milloin',
    category: 'when',
    hint: 'General "when" question'
  },
  {
    id: 'when-2',
    emoji: '⏰',
    situation: "You need the exact clock time",
    context: "You need to catch a train",
    correctWord: 'mihin aikaan',
    category: 'when',
    hint: 'Specific clock time'
  },
  {
    id: 'when-3',
    emoji: '📆',
    situation: "You want to know which day something happens",
    context: "Someone mentions a meeting but not the day",
    correctWord: 'minä päivänä',
    category: 'when',
    hint: 'Asking about a specific day'
  },
  {
    id: 'when-4',
    emoji: '⏱️',
    situation: "You want to know how long something takes",
    context: "You're planning a road trip",
    correctWord: 'kuinka kauan',
    category: 'when',
    hint: 'Duration of time'
  },
  {
    id: 'when-5',
    emoji: '🔄',
    situation: "You want to know how often something happens",
    context: "Someone mentions they go to the gym",
    correctWord: 'kuinka usein',
    category: 'when',
    hint: 'Frequency'
  },

  // WHO scenarios
  {
    id: 'who-1',
    emoji: '🚪',
    situation: "Someone knocked and you want to know who",
    context: "You hear a knock at the door",
    correctWord: 'kuka',
    category: 'who',
    hint: 'Who is the subject/doer'
  },
  {
    id: 'who-2',
    emoji: '🎁',
    situation: "You want to know who should receive something",
    context: "You have a gift but don't know the recipient",
    correctWord: 'kenelle',
    category: 'who',
    hint: 'TO whom / FOR whom'
  },
  {
    id: 'who-3',
    emoji: '🔑',
    situation: "You want to know who has something",
    context: "The keys are missing and you need to find them",
    correctWord: 'kenellä',
    category: 'who',
    hint: 'Who HAS something'
  },
  {
    id: 'who-4',
    emoji: '👥',
    situation: "You want to know who someone is with",
    context: "Your friend is going out tonight",
    correctWord: 'kenen kanssa',
    category: 'who',
    hint: 'WITH whom'
  },
  {
    id: 'who-5',
    emoji: '📦',
    situation: "You want to know who sent something",
    context: "A package arrived without a name",
    correctWord: 'keneltä',
    category: 'who',
    hint: 'FROM whom'
  },

  // WHAT scenarios
  {
    id: 'what-1',
    emoji: '❓',
    situation: "You want to identify something",
    context: "You see an unfamiliar object on the table",
    correctWord: 'mikä',
    category: 'what',
    hint: 'What IS this thing'
  },
  {
    id: 'what-2',
    emoji: '🍽️',
    situation: "You want to know what someone is eating/drinking",
    context: "Your friend has an interesting-looking meal",
    correctWord: 'mitä',
    category: 'what',
    hint: 'What (object of action)'
  },
  {
    id: 'what-3',
    emoji: '💬',
    situation: "You want to know the topic of discussion",
    context: "Two people are having an animated conversation",
    correctWord: 'mistä',
    category: 'what',
    hint: 'About WHAT'
  },
  {
    id: 'what-4',
    emoji: '🚌',
    situation: "You want to know by what means of transport",
    context: "Someone tells you they're going to the city",
    correctWord: 'millä',
    category: 'what',
    hint: 'By WHAT means'
  },

  // WHY scenarios
  {
    id: 'why-1',
    emoji: '😢',
    situation: "You want to know the reason someone is sad",
    context: "Your friend looks upset",
    correctWord: 'miksi',
    category: 'why',
    hint: 'Why / for what reason'
  },
  {
    id: 'why-2',
    emoji: '🎯',
    situation: "You want to know the purpose of something",
    context: "Someone brought a strange tool",
    correctWord: 'mitä varten',
    category: 'why',
    hint: 'For what PURPOSE'
  },
  {
    id: 'why-3',
    emoji: '💥',
    situation: "You want to know what caused something",
    context: "The lights suddenly went out",
    correctWord: 'minkä takia',
    category: 'why',
    hint: 'Because of WHAT'
  },

  // HOW scenarios
  {
    id: 'how-1',
    emoji: '🔧',
    situation: "You want to know how to do something",
    context: "You need to use a new coffee machine",
    correctWord: 'miten',
    category: 'how',
    hint: 'How / in what way'
  },
  {
    id: 'how-2',
    emoji: '🎨',
    situation: "You want to know what something is like",
    context: "Someone mentions a new restaurant",
    correctWord: 'millainen',
    category: 'how',
    hint: 'What kind / what is it like'
  },
  {
    id: 'how-3',
    emoji: '🌈',
    situation: "You want to know the color of something",
    context: "Someone bought a new car",
    correctWord: 'minkä värinen',
    category: 'how',
    hint: 'What COLOR'
  },
  {
    id: 'how-4',
    emoji: '📏',
    situation: "You want to know the size of something",
    context: "Shopping for clothes online",
    correctWord: 'minkä kokoinen',
    category: 'how',
    hint: 'What SIZE'
  },

  // HOW MUCH scenarios
  {
    id: 'howmuch-1',
    emoji: '💰',
    situation: "You want to know the price",
    context: "You see something nice in a store",
    correctWord: 'paljonko',
    category: 'how-much',
    hint: 'How much (price/amount)'
  },
  {
    id: 'howmuch-2',
    emoji: '👨‍👩‍👧‍👦',
    situation: "You want to know the number of people",
    context: "Planning seats for a dinner party",
    correctWord: 'montako',
    category: 'how-much',
    hint: 'How many (countable)'
  },
  {
    id: 'howmuch-3',
    emoji: '🎂',
    situation: "You want to know someone's age",
    context: "Meeting a new colleague",
    correctWord: 'minkä ikäinen',
    category: 'how-much',
    hint: 'What AGE / how old'
  },

  // WHOSE scenarios
  {
    id: 'whose-1',
    emoji: '👜',
    situation: "You want to know who owns something",
    context: "There's an unclaimed bag in the room",
    correctWord: 'kenen',
    category: 'whose',
    hint: 'Whose / belonging to whom'
  },
  {
    id: 'whose-2',
    emoji: '🏡',
    situation: "You want to know who lives somewhere",
    context: "You see a beautiful house",
    correctWord: 'kenen',
    category: 'whose',
    hint: 'Whose house is this'
  },

  // WHICH scenarios
  {
    id: 'which-1',
    emoji: '🍦',
    situation: "You're choosing between two options",
    context: "Ice cream shop with chocolate and vanilla",
    correctWord: 'kumpi',
    category: 'which',
    hint: 'Which of TWO'
  },
  {
    id: 'which-2',
    emoji: '📚',
    situation: "You're choosing from many options",
    context: "Bookstore with many interesting books",
    correctWord: 'mikä',
    category: 'which',
    hint: 'Which of MANY'
  },
];

// Answer scenarios - "What question was asked?"
export const ANSWER_SCENARIOS: AnswerScenario[] = [
  // Location answers
  {
    id: 'ans-1',
    emoji: '🏙️',
    answer: 'Helsingissä',
    answerMeaning: 'In Helsinki',
    correctQuestion: 'missä',
    category: 'where',
    alternatives: ['missä päin'],
  },
  {
    id: 'ans-2',
    emoji: '🏫',
    answer: 'Kouluun',
    answerMeaning: 'To school',
    correctQuestion: 'mihin',
    category: 'where',
    alternatives: ['minne'],
  },
  {
    id: 'ans-3',
    emoji: '🏪',
    answer: 'Kaupasta',
    answerMeaning: 'From the store',
    correctQuestion: 'mistä',
    category: 'where',
  },
  
  // Time answers
  {
    id: 'ans-4',
    emoji: '☀️',
    answer: 'Huomenna',
    answerMeaning: 'Tomorrow',
    correctQuestion: 'milloin',
    category: 'when',
    alternatives: ['koska'],
  },
  {
    id: 'ans-5',
    emoji: '🕐',
    answer: 'Kello kahdeksan',
    answerMeaning: 'At eight o\'clock',
    correctQuestion: 'mihin aikaan',
    category: 'when',
    alternatives: ['milloin', 'moneltako'],
  },
  {
    id: 'ans-6',
    emoji: '⏳',
    answer: 'Kaksi tuntia',
    answerMeaning: 'Two hours',
    correctQuestion: 'kuinka kauan',
    category: 'when',
  },
  
  // Person answers
  {
    id: 'ans-7',
    emoji: '👩',
    answer: 'Maria',
    answerMeaning: 'Maria (a name)',
    correctQuestion: 'kuka',
    category: 'who',
  },
  {
    id: 'ans-8',
    emoji: '👨‍👩‍👧',
    answer: 'Isällä',
    answerMeaning: 'Father has it',
    correctQuestion: 'kenellä',
    category: 'who',
  },
  {
    id: 'ans-9',
    emoji: '💑',
    answer: 'Ystävän kanssa',
    answerMeaning: 'With a friend',
    correctQuestion: 'kenen kanssa',
    category: 'who',
  },
  
  // Reason answers
  {
    id: 'ans-10',
    emoji: '😴',
    answer: 'Koska olen väsynyt',
    answerMeaning: 'Because I\'m tired',
    correctQuestion: 'miksi',
    category: 'why',
    alternatives: ['minkä takia'],
  },
  
  // Quantity answers
  {
    id: 'ans-11',
    emoji: '💶',
    answer: 'Viisi euroa',
    answerMeaning: 'Five euros',
    correctQuestion: 'paljonko',
    category: 'how-much',
    alternatives: ['kuinka paljon'],
  },
  {
    id: 'ans-12',
    emoji: '✌️',
    answer: 'Kaksi',
    answerMeaning: 'Two',
    correctQuestion: 'montako',
    category: 'how-much',
    alternatives: ['kuinka monta'],
  },
  
  // Description answers
  {
    id: 'ans-13',
    emoji: '😊',
    answer: 'Tosi kiva!',
    answerMeaning: 'Really nice!',
    correctQuestion: 'millainen',
    category: 'how',
    alternatives: ['minkälainen'],
  },
  {
    id: 'ans-14',
    emoji: '🚗',
    answer: 'Autolla',
    answerMeaning: 'By car',
    correctQuestion: 'millä',
    category: 'how',
    alternatives: ['miten'],
  },
  
  // Ownership answers
  {
    id: 'ans-15',
    emoji: '👤',
    answer: 'Minun',
    answerMeaning: 'Mine',
    correctQuestion: 'kenen',
    category: 'whose',
  },
  
  // Choice answers
  {
    id: 'ans-16',
    emoji: '☕',
    answer: 'Tämä',
    answerMeaning: 'This one',
    correctQuestion: 'kumpi',
    category: 'which',
    alternatives: ['mikä'],
  },
];

// Helper functions for scenario mode
export function getScenariosByCategory(categories: QuestionCategory[]): Scenario[] {
  if (categories.length === 0) return [...SCENARIOS];
  return SCENARIOS.filter(s => categories.includes(s.category));
}

export function getAnswerScenariosByCategory(categories: QuestionCategory[]): AnswerScenario[] {
  if (categories.length === 0) return [...ANSWER_SCENARIOS];
  return ANSWER_SCENARIOS.filter(s => categories.includes(s.category));
}

// Get question word options for scenario mode (Finnish question words only)
export function getQuestionWordOptions(correctWord: string, category: QuestionCategory, count: number = 4): string[] {
  // Get other question words from different categories for variety
  const allQuestionWords = [
    'mikä', 'mitä', 'mistä', 'mihin', 'missä', 'millä',
    'kuka', 'ketä', 'kenellä', 'kenelle', 'kenen kanssa',
    'milloin', 'koska', 'mihin aikaan', 'kuinka kauan',
    'miten', 'millainen', 'miksi', 'minkä takia',
    'kumpi', 'kenen', 'paljonko', 'montako'
  ];
  
  const wrongOptions = allQuestionWords
    .filter(w => w !== correctWord)
    .sort(() => Math.random() - 0.5)
    .slice(0, count - 1);
  
  return shuffleArray([correctWord, ...wrongOptions]);
}

