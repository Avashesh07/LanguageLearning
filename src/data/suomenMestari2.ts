// Suomen Mestari 2 - Vocabulary by Chapter (Kappale)

export interface SM2Word {
  finnish: string;
  english: string;
  synonyms?: string[]; // Alternative accepted English answers
  finnishSynonyms?: string[]; // Alternative Finnish forms (colloquial = formal)
  verbType?: number; // Verb type (1-6) if applicable
  caseRequired?: string; // Case required after the word (e.g., "sta/stä", "MIHIN")
  note?: string; // Additional grammar note
}

export interface SM2Chapter {
  id: number;
  name: string; // Finnish chapter name
  nameEnglish: string; // English translation
  words: SM2Word[];
}

export interface SM2Cycle {
  chapterId: number;
  cycleId: string; // e.g., "1a", "1b", "1c"
  name: string; // e.g., "Kappale 1a"
  words: SM2Word[];
}

export const suomenMestari2Vocabulary: SM2Chapter[] = [
  {
    id: 1,
    name: "Kappale 1",
    nameEnglish: "Chapter 1 - Travel & Accommodation",
    words: [
      // From Sanasto - Kappale 1
      { finnish: "eka", english: "first", finnishSynonyms: ["ensimmäinen"], note: "colloquial" },
      { finnish: "majoitus", english: "accommodation", synonyms: ["lodging", "housing"] },
      { finnish: "varata", english: "to book", synonyms: ["to reserve"], verbType: 4 },
      { finnish: "varataanks me", english: "shall we book", finnishSynonyms: ["varaammeko"], note: "colloquial question" },
      { finnish: "jostain", english: "from somewhere", synonyms: ["from some place"] },
      { finnish: "kelvata", english: "to be acceptable", synonyms: ["to be good enough", "to suit"], verbType: 4 },
      { finnish: "vuokrata", english: "to rent", synonyms: ["to lease"], verbType: 4 },
      { finnish: "alue", english: "area", synonyms: ["region", "district", "zone"] },
      { finnish: "päästä", english: "to get to", synonyms: ["to reach", "to arrive at"], verbType: 3, caseRequired: "MIHIN" },
      { finnish: "ratikka", english: "tram", synonyms: ["streetcar", "trolley"], finnishSynonyms: ["raitiovaunu"], note: "colloquial" },
      { finnish: "helposti", english: "easily", synonyms: ["without difficulty"] },
      { finnish: "joka paikkaan", english: "everywhere", synonyms: ["to every place", "all over"] },
      { finnish: "hoitaa", english: "to take care of", synonyms: ["to handle", "to manage", "to arrange"], verbType: 1 },
      { finnish: "tarkistaa", english: "to check", synonyms: ["to verify", "to confirm"], verbType: 1 },
      { finnish: "äsken", english: "just now", synonyms: ["a moment ago", "recently"] },
      { finnish: "aikataulu", english: "schedule", synonyms: ["timetable"] },
      { finnish: "netti", english: "internet", synonyms: ["net", "web"], finnishSynonyms: ["internet"], note: "colloquial" },
      { finnish: "ehtiä", english: "to have time for", synonyms: ["to make it", "to manage in time"], verbType: 1, caseRequired: "MIHIN" },
      { finnish: "tulla kiire", english: "to be in a hurry", synonyms: ["to become rushed"] },
      { finnish: "heittää", english: "to drop off", synonyms: ["to take", "to give a ride"], verbType: 1, caseRequired: "MIHIN", finnishSynonyms: ["viedä"], note: "colloquial = viedä" },
      { finnish: "mut", english: "me", finnishSynonyms: ["minut"], note: "colloquial accusative" },
      { finnish: "kestää", english: "to last", synonyms: ["to take (time)", "to endure"], verbType: 1 },
      { finnish: "me ollaan", english: "we are", finnishSynonyms: ["olemme"], note: "colloquial" },
      { finnish: "olla perillä", english: "to have arrived", synonyms: ["to be there", "to be at destination"] },
      { finnish: "kaveri", english: "friend", synonyms: ["buddy", "pal", "mate"] },
      { finnish: "hakea", english: "to pick up", synonyms: ["to fetch", "to get"], verbType: 1, caseRequired: "MISTÄ" },
      { finnish: "meiät", english: "us", finnishSynonyms: ["meidät"], note: "colloquial accusative" },
      { finnish: "ei me tarvita", english: "we don't need", finnishSynonyms: ["emme tarvitse"], note: "colloquial" },
      { finnish: "kyyti", english: "ride", synonyms: ["lift", "transport"] },
      { finnish: "vaan", english: "only", synonyms: ["just"], finnishSynonyms: ["vain"], note: "colloquial" },
      { finnish: "tietysti", english: "of course", synonyms: ["naturally", "certainly"] },
      { finnish: "silti", english: "still", synonyms: ["nevertheless", "yet", "however"] },
      { finnish: "tulla vastaan", english: "to come to meet", synonyms: ["to pick up", "to greet"] },
      { finnish: "joka tapauksessa", english: "in any case", synonyms: ["anyway", "regardless"] },
      
      // From sivu 12 vocabulary
      { finnish: "reissu", english: "trip", synonyms: ["journey", "travel"] },
      { finnish: "olla tehtävänä", english: "to have as a task", synonyms: ["to be assigned to do"] },
      { finnish: "kirjoittaa", english: "to write", verbType: 1, caseRequired: "sta/stä", note: "kirjoittaa + sta/stä = write about" },
      { finnish: "viime", english: "last", synonyms: ["previous"] },
      { finnish: "viikonlopuksi", english: "for the weekend", synonyms: ["over the weekend"] },
      { finnish: "mukavasti", english: "nicely", synonyms: ["pleasantly", "comfortably"] },
      { finnish: "maisema", english: "scenery", synonyms: ["landscape", "view"] },
      { finnish: "tehtävä", english: "task", synonyms: ["assignment", "exercise"] },
      { finnish: "saapua", english: "to arrive", synonyms: ["to reach"], verbType: 1 },
      { finnish: "hostelli", english: "hostel" },
      { finnish: "illallinen", english: "dinner", synonyms: ["supper", "evening meal"] },
      { finnish: "upea", english: "magnificent", synonyms: ["gorgeous", "stunning", "wonderful", "splendid"] },
      { finnish: "ympäri", english: "around", caseRequired: "P", note: "ympäri + partitive" },
      { finnish: "vielä", english: "still", synonyms: ["yet", "more"] },
      { finnish: "tuliainen", english: "souvenir", synonyms: ["gift (from trip)"] },
      { finnish: "takaisin", english: "back", synonyms: ["return"] },
      { finnish: "kuulla", english: "to hear", verbType: 3, caseRequired: "sta/stä", note: "kuulla + sta/stä = hear about" },
      { finnish: "innostua", english: "to get excited", synonyms: ["to become enthusiastic"], verbType: 1 },
      { finnish: "heti", english: "immediately", synonyms: ["right away", "at once"] },
      { finnish: "keksiä", english: "to come up with", synonyms: ["to invent", "to think of", "to figure out"], verbType: 1 },
      { finnish: "mielellään", english: "gladly", synonyms: ["willingly", "with pleasure", "happily"] },
      { finnish: "suunnitella", english: "to plan", verbType: 3 },
      { finnish: "sopia", english: "to suit", synonyms: ["to fit", "to agree", "to be suitable"], verbType: 1 },
      
      // Additional vocabulary from Chapter 1
      { finnish: "syy", english: "reason", synonyms: ["cause", "motive"] },
      { finnish: "viimeksi", english: "last time", synonyms: ["the last time", "most recently"] },
      { finnish: "kannattaa", english: "to be worth it", synonyms: ["to pay off", "to be worthwhile"], verbType: 1 },
      { finnish: "ympäristöystävällinen", english: "environmentally friendly", synonyms: ["eco-friendly", "green"] },
      { finnish: "pienentää", english: "to reduce", synonyms: ["to make smaller", "to decrease"], verbType: 1 },
      { finnish: "hiilijalanjälki", english: "carbon footprint" },
      { finnish: "tapa", english: "way", synonyms: ["manner", "custom", "method"] },
      { finnish: "kokea", english: "to experience", synonyms: ["to try", "to go through"], verbType: 1 },
      { finnish: "enemmän", english: "more", synonyms: ["to a greater extent"] },
      { finnish: "luonto", english: "nature", synonyms: ["natural environment"] },
      { finnish: "paikallinen", english: "local", synonyms: ["regional"] },
      { finnish: "kätevästi", english: "conveniently", synonyms: ["handily", "easily"] },
      { finnish: "erinomainen", english: "excellent", synonyms: ["outstanding", "superb", "first-rate"] },
      { finnish: "palvelu", english: "service", synonyms: ["assistance"] },
      { finnish: "jaloitella", english: "to walk", synonyms: ["to stroll", "to take a walk"], verbType: 3 },
      { finnish: "nauttia", english: "to enjoy", synonyms: ["to take pleasure in"], verbType: 1, caseRequired: "sta/stä", note: "nauttia + sta/stä = enjoy something" },
      { finnish: "ravintolavaunu", english: "restaurant car", synonyms: ["dining car"] },
      { finnish: "vaikka", english: "even though", synonyms: ["although", "even if"] },
      { finnish: "makuuhytti", english: "sleeping compartment", synonyms: ["sleeper", "sleeping car"] },
      { finnish: "raide", english: "track", synonyms: ["rail", "railway track"] },
      { finnish: "kiireetön", english: "unhurried", synonyms: ["leisurely", "relaxed", "without hurry"] },
      { finnish: "rentoutua", english: "to relax", synonyms: ["to unwind", "to rest"], verbType: 1 },
      { finnish: "lisäksi", english: "in addition", synonyms: ["additionally", "furthermore", "besides"] },
      { finnish: "kauas", english: "far away", synonyms: ["far", "to a great distance"] },
      { finnish: "maailma", english: "world", synonyms: ["globe", "earth"] },
    ],
  },
  {
    id: 2,
    name: "Kappale 2",
    nameEnglish: "Chapter 2 - Health & Body",
    words: [
      // General vocabulary
      { finnish: "huono olo", english: "bad feeling", synonyms: ["feeling unwell", "feeling sick"] },
      { finnish: "laahustaa", english: "to shuffle", synonyms: ["to drag one's feet"], verbType: 1 },
      { finnish: "jossa", english: "where", synonyms: ["in which"], note: "relative pronoun" },
      { finnish: "kokeilla", english: "to try", synonyms: ["to test", "to attempt"], verbType: 3 },
      { finnish: "otsa", english: "forehead" },
      { finnish: "tulikuuma", english: "burning hot", synonyms: ["scorching", "very hot"] },
      { finnish: "kuume", english: "fever" },
      { finnish: "keittää", english: "to boil", verbType: 1 },
      { finnish: "kuumemittari", english: "thermometer" },
      { finnish: "lopulta", english: "finally", synonyms: ["eventually", "in the end"] },
      { finnish: "löytää", english: "to find", verbType: 1, caseRequired: "MISTÄ", note: "löytää + MISTÄ = find from" },
      { finnish: "etsiä", english: "to search", synonyms: ["to look for"], verbType: 1, caseRequired: "MISTÄ", note: "etsiä + MISTÄ = search from" },
      { finnish: "terveyskeskus", english: "health center", synonyms: ["health station"], finnishSynonyms: ["terveysasema"] },
      { finnish: "verkkosivut", english: "website", synonyms: ["web pages"] },
      { finnish: "ajanvaraus", english: "appointment booking", synonyms: ["appointment reservation"] },
      { finnish: "aika", english: "time", synonyms: ["appointment"] },
      { finnish: "lääkäri", english: "doctor", synonyms: ["physician"] },
      
      // At the Doctor's
      { finnish: "Käy istumaan", english: "Sit down", note: "imperative" },
      { finnish: "miten", english: "how", finnishSynonyms: ["kuinka"], note: "miten = kuinka" },
      { finnish: "hirvee", english: "awful", finnishSynonyms: ["hirveä"], note: "colloquial" },
      { finnish: "hirveen kipee", english: "really sick", finnishSynonyms: ["todella kipeä"], note: "colloquial" },
      { finnish: "kamala", english: "terrible", synonyms: ["awful", "horrible"] },
      { finnish: "päänsärky", english: "headache" },
      { finnish: "oire", english: "symptom" },
      { finnish: "kurkkukipu", english: "sore throat" },
      { finnish: "keuhkot", english: "lungs" },
      { finnish: "nostaa", english: "to lift", synonyms: ["to raise"], verbType: 1 },
      { finnish: "hengittää", english: "to breathe", verbType: 1 },
      { finnish: "olla kunnossa", english: "to be in good condition", synonyms: ["to be well", "to be okay"] },
      { finnish: "kurkku", english: "throat" },
      { finnish: "tosiaan", english: "indeed", synonyms: ["really", "truly"] },
      { finnish: "turvonnut", english: "swollen" },
      { finnish: "sattua", english: "to hurt", verbType: 1, caseRequired: "S-MIHIN", note: "sattua + S-MIHIN = hurt to something" },
      { finnish: "vasen puoli", english: "left side" },
      { finnish: "virustauti", english: "viral disease" },
      
      // Medical treatment
      { finnish: "parantua", english: "to heal", synonyms: ["to recover", "to get better"], verbType: 1, note: "parantua itsestään = heal by itself" },
      { finnish: "särkylääke", english: "painkiller", synonyms: ["pain medication"] },
      { finnish: "alentaa", english: "to lower", synonyms: ["to reduce"], verbType: 1, caseRequired: "P", note: "alentaa + P = lower something" },
      { finnish: "lähete", english: "referral" },
      { finnish: "labra", english: "lab", finnishSynonyms: ["laboratorio"], note: "colloquial" },
      { finnish: "bakteeritulehdus", english: "bacterial infection" },
      { finnish: "antibioottikuuri", english: "course of antibiotics" },
      { finnish: "meen", english: "I go", finnishSynonyms: ["menen"], note: "colloquial" },
      { finnish: "saman tien", english: "immediately", finnishSynonyms: ["heti"], note: "saman tien = heti" },
      { finnish: "Mee vaan!", english: "Just go!", finnishSynonyms: ["Mene vain!"], note: "colloquial imperative" },
      { finnish: "tulos", english: "result" },
      { finnish: "positiivinen", english: "positive" },
      { finnish: "tarviit", english: "you need", finnishSynonyms: ["tarvitset"], note: "colloquial" },
      { finnish: "lääkärintodistus", english: "doctor's certificate", synonyms: ["medical certificate"] },
      { finnish: "sairausloma", english: "sick leave" },
      { finnish: "varten", english: "for", note: "P + varten = for something (partitive case)" },
      
      // Call to Supervisor
      { finnish: "puhelu", english: "call", synonyms: ["phone call"] },
      { finnish: "Tota", english: "Well", finnishSynonyms: ["Tuota"], note: "colloquial filler word" },
      { finnish: "olla kuumeessa", english: "to have a fever", synonyms: ["to be feverish"] },
      { finnish: "jäädä", english: "to stay", synonyms: ["to remain"], verbType: 2, caseRequired: "MIHIN", note: "jäädä + MIHIN = stay somewhere" },
      { finnish: "varmaan", english: "probably", finnishSynonyms: ["varmasti"], note: "colloquial" },
      { finnish: "oma", english: "own" },
      { finnish: "ilmoitus", english: "notification", synonyms: ["announcement"] },
      { finnish: "poissa", english: "absent", synonyms: ["away"] },
      { finnish: "sairaus", english: "illness", synonyms: ["sickness", "disease"], finnishSynonyms: ["tauti"] },
      { finnish: "vuoksi", english: "because of", note: "G + vuoksi = because of (genitive case)" },
      { finnish: "Eiku", english: "No, but", finnishSynonyms: ["Ei, vaan..."], note: "colloquial" },
      { finnish: "sit", english: "then", finnishSynonyms: ["sitten"], note: "colloquial" },
      { finnish: "Ei mitään kiirettä", english: "No hurry", synonyms: ["No rush"] },
      { finnish: "levätä", english: "to rest", verbType: 4 },
      { finnish: "rauha", english: "peace" },
      { finnish: "yrittää", english: "to try", synonyms: ["to attempt"], verbType: 1 },
      { finnish: "järjestää", english: "to arrange", synonyms: ["to organize"], verbType: 1 },
      { finnish: "sijainen", english: "substitute", synonyms: ["replacement"] },
      { finnish: "vuoro", english: "turn", synonyms: ["shift"] },
      { finnish: "Pikaista paranemista!", english: "Get well soon!", note: "greeting" },
      { finnish: "Parane pian!", english: "Get well soon!", synonyms: ["Recover quickly!"], note: "greeting" },
      
      // Body parts - Face
      { finnish: "hiukset", english: "hair", finnishSynonyms: ["tukka"] },
      { finnish: "tukka", english: "hair", finnishSynonyms: ["hiukset"] },
      { finnish: "korva", english: "ear" },
      { finnish: "silmä", english: "eye" },
      { finnish: "poski", english: "cheek" },
      { finnish: "nenä", english: "nose" },
      { finnish: "suu", english: "mouth" },
      { finnish: "hammas", english: "tooth", finnishSynonyms: ["hampaat"], note: "singular" },
      { finnish: "hampaat", english: "teeth", finnishSynonyms: ["hammas"], note: "plural" },
      { finnish: "huuli", english: "lip", finnishSynonyms: ["huulet"], note: "singular" },
      { finnish: "huulet", english: "lips", finnishSynonyms: ["huuli"], note: "plural" },
      { finnish: "leuka", english: "chin", synonyms: ["jaw"] },
      { finnish: "kieli", english: "tongue" },
      { finnish: "kaula", english: "neck", finnishSynonyms: ["kurkku"], note: "kaula = neck, kurkku = throat" },
      
      // Body parts - Body
      { finnish: "pää", english: "head" },
      { finnish: "hartiat", english: "shoulders" },
      { finnish: "ranne", english: "wrist" },
      { finnish: "niska", english: "nape of the neck", synonyms: ["back of neck"] },
      { finnish: "käsivarsi", english: "arm", finnishSynonyms: ["käsi"], note: "käsivarsi = arm, käsi = hand" },
      { finnish: "käsi", english: "hand", finnishSynonyms: ["käsivarsi"], note: "käsi = hand, käsivarsi = arm" },
      { finnish: "sormi", english: "finger", finnishSynonyms: ["sormet"], note: "singular" },
      { finnish: "sormet", english: "fingers", finnishSynonyms: ["sormi"], note: "plural" },
      { finnish: "kyynärpää", english: "elbow" },
      { finnish: "rinta", english: "chest", synonyms: ["breast"] },
      { finnish: "rinnat", english: "breasts" },
      { finnish: "selkä", english: "back" },
      { finnish: "vatsa", english: "stomach", finnishSynonyms: ["maha"] },
      { finnish: "maha", english: "belly", finnishSynonyms: ["vatsa"] },
      { finnish: "takapuoli", english: "buttocks", synonyms: ["bottom", "rear"] },
      { finnish: "polvi", english: "knee" },
      { finnish: "sukuelimet", english: "genitals", finnishSynonyms: ["alapää"], note: "sukuelimet = alapää" },
      { finnish: "nilkka", english: "ankle" },
      { finnish: "varvas", english: "toe", finnishSynonyms: ["varpaat"], note: "singular" },
      { finnish: "varpaat", english: "toes", finnishSynonyms: ["varvas"], note: "plural" },
      { finnish: "jalka", english: "leg", synonyms: ["foot"], finnishSynonyms: ["jalat"], note: "singular" },
      { finnish: "jalat", english: "legs", synonyms: ["feet"], finnishSynonyms: ["jalka"], note: "plural" },
      
      // Internal organs
      { finnish: "iho", english: "skin" },
      { finnish: "luu", english: "bone" },
      { finnish: "lihas", english: "muscle" },
      { finnish: "sydän", english: "heart" },
      { finnish: "maksa", english: "liver" },
      { finnish: "munuaiset", english: "kidneys" },
      { finnish: "aivot", english: "brain" },
      
      // Health and illness vocabulary
      { finnish: "Apua!", english: "Help!", note: "exclamation" },
      { finnish: "ensiapu", english: "first aid" },
      { finnish: "hätänumero 112", english: "emergency number 112" },
      { finnish: "ambulanssi", english: "ambulance" },
      { finnish: "terveysasema", english: "health station", finnishSynonyms: ["terveyskeskus"] },
      { finnish: "sairaala", english: "hospital" },
      { finnish: "neuvola", english: "maternity and child health clinic" },
      { finnish: "päivystys", english: "emergency service", synonyms: ["on-call duty"] },
      { finnish: "potilas", english: "patient" },
      { finnish: "sairaanhoitaja", english: "nurse" },
      { finnish: "terveydenhoitaja", english: "public health nurse" },
      { finnish: "kätilö", english: "midwife" },
      { finnish: "psykologi", english: "psychologist" },
      { finnish: "vastaanotto", english: "reception", synonyms: ["appointment"] },
      { finnish: "varata aika", english: "to book an appointment", verbType: 4 },
      { finnish: "soittoaika", english: "calling time" },
      { finnish: "laboratorio", english: "laboratory", finnishSynonyms: ["labra"] },
      { finnish: "verikoe", english: "blood test" },
      { finnish: "näyte", english: "sample" },
      { finnish: "rokotus", english: "vaccination" },
      { finnish: "bakteeri", english: "bacterium", synonyms: ["bacteria"] },
      { finnish: "virus", english: "virus" },
      { finnish: "tauti", english: "disease", finnishSynonyms: ["sairaus"] },
      { finnish: "tulehdus", english: "inflammation", note: "korvatulehdus = ear infection, silmätulehdus = eye infection" },
      { finnish: "vatsatauti", english: "stomach flu" },
      { finnish: "oksennus", english: "vomiting" },
      { finnish: "ripuli", english: "diarrhea" },
      { finnish: "allergia", english: "allergy" },
      { finnish: "ihottuma", english: "rash" },
      { finnish: "verenpaine", english: "blood pressure" },
      { finnish: "sydäninfarkti", english: "heart attack", finnishSynonyms: ["sydänkohtaus"] },
      { finnish: "sydänkohtaus", english: "heart attack", finnishSynonyms: ["sydäninfarkti"] },
      { finnish: "syöpä", english: "cancer" },
      { finnish: "mielenterveys", english: "mental health" },
      { finnish: "masennus", english: "depression" },
      { finnish: "ahdistus", english: "anxiety" },
      { finnish: "työuupumus", english: "work burnout", synonyms: ["burnout", "fatigue"] },
      { finnish: "uupumus", english: "burnout", synonyms: ["fatigue", "exhaustion"] },
      { finnish: "stressi", english: "stress" },
      { finnish: "hoito", english: "treatment" },
      { finnish: "resepti", english: "prescription" },
      { finnish: "lääke", english: "medicine", synonyms: ["medication"] },
      { finnish: "lääkekuuri", english: "course of medicine" },
      { finnish: "ottaa lääkettä", english: "to take medicine", verbType: 1 },
      { finnish: "syödä lääkettä", english: "to take medicine", verbType: 2, note: "literally: to eat medicine" },
      { finnish: "lepo", english: "rest", synonyms: ["repose"] },
      { finnish: "parantua", english: "to recover", synonyms: ["to heal", "to get better"], verbType: 1, caseRequired: "sta/stä", note: "parantua + sta/stä = recover from" },
      
      // Health and well-being
      { finnish: "pitää huolta", english: "to take care of", verbType: 1, caseRequired: "sta/stä", note: "pitää huolta + sta/stä = take care of something" },
      { finnish: "opinnot", english: "studies", synonyms: ["education"] },
      { finnish: "stressata", english: "to stress", verbType: 4 },
      { finnish: "kiireinen", english: "busy" },
      { finnish: "yksinäisyys", english: "loneliness" },
      { finnish: "aiheuttaa", english: "to cause", verbType: 1, caseRequired: "P", note: "aiheuttaa + P = cause something" },
      { finnish: "liikkua", english: "to move", verbType: 1 },
      { finnish: "säännöllisesti", english: "regularly" },
      { finnish: "liikunta", english: "exercise", synonyms: ["physical activity"] },
      { finnish: "hyvinvointi", english: "well-being", synonyms: ["welfare"] },
      { finnish: "aikuinen", english: "adult" },
      { finnish: "vähintään", english: "at least", synonyms: ["minimum"] },
      { finnish: "reipas", english: "energetic", synonyms: ["brisk", "lively"] },
      { finnish: "arki", english: "weekday", synonyms: ["Monday-Friday"], note: "arki = ma-pe" },
      { finnish: "helposti", english: "easily", synonyms: ["without difficulty"] },
      { finnish: "hyötyliikunta", english: "beneficial exercise" },
      { finnish: "taukojumppa", english: "break exercise", synonyms: ["office exercise"] },
      { finnish: "monipuolisesti", english: "diversely", synonyms: ["variously"] },
      { finnish: "ravinto", english: "nutrition", synonyms: ["food", "diet"] },
      { finnish: "vaikuttaa", english: "to affect", synonyms: ["to influence"], verbType: 1, caseRequired: "S-MIHIN", note: "vaikuttaa + S-MIHIN = affect something" },
      { finnish: "fyysinen", english: "physical" },
      { finnish: "psyykkinen", english: "mental", synonyms: ["psychological"] },
      { finnish: "jaksaminen", english: "endurance", synonyms: ["stamina", "ability to cope"] },
      { finnish: "kuulua", english: "to belong", verbType: 1, caseRequired: "S-MIHIN", note: "kuulua + S-MIHIN = belong to something" },
      { finnish: "terveellinen", english: "healthy" },
      { finnish: "ruokavalio", english: "diet", synonyms: ["eating plan"] },
      { finnish: "täysjyväviljat", english: "whole grains" },
      { finnish: "tofu", english: "tofu" },
      { finnish: "pähkinä", english: "nut" },
      { finnish: "rasvainen", english: "fatty", synonyms: ["greasy"] },
      { finnish: "olla hyväksi", english: "to be good for", note: "olla hyväksi + P = be good for something" },
      { finnish: "runsaasti", english: "plenty", synonyms: ["abundantly", "generously"] },
      { finnish: "riittävästi", english: "sufficiently", synonyms: ["adequately"] },
      { finnish: "uni", english: "sleep" },
      { finnish: "enemmän", english: "more", synonyms: ["to a greater extent"] },
      { finnish: "käyttö", english: "use", synonyms: ["usage"] },
      { finnish: "rauhoittua", english: "to calm down", verbType: 1 },
      { finnish: "rentoutua", english: "to relax", synonyms: ["to unwind"], verbType: 1 },
      { finnish: "pääasia", english: "main thing", synonyms: ["main point", "most important"] },
    ],
  },
];

// Helper functions
export function getAllSM2Chapters(): SM2Chapter[] {
  return suomenMestari2Vocabulary;
}

export function getSM2ChapterById(id: number): SM2Chapter | undefined {
  return suomenMestari2Vocabulary.find(c => c.id === id);
}

export function getWordsForSM2Chapters(chapterIds: number[]): SM2Word[] {
  return suomenMestari2Vocabulary
    .filter(c => chapterIds.includes(c.id))
    .flatMap(c => c.words);
}

export function getSM2TotalWordCount(): number {
  return suomenMestari2Vocabulary.reduce((sum, c) => sum + c.words.length, 0);
}

export function getSM2WordCountForChapters(chapterIds: number[]): number {
  return suomenMestari2Vocabulary
    .filter(c => chapterIds.includes(c.id))
    .reduce((sum, c) => sum + c.words.length, 0);
}

// Cycle helpers - split chapters into cycles of 20 words each
const CYCLE_SIZE = 20;

export function getSM2CyclesForChapter(chapterId: number): SM2Cycle[] {
  const chapter = getSM2ChapterById(chapterId);
  if (!chapter) return [];
  
  const cycles: SM2Cycle[] = [];
  const totalWords = chapter.words.length;
  const totalCycles = Math.ceil(totalWords / CYCLE_SIZE);
  
  for (let i = 0; i < totalCycles; i++) {
    const startIdx = i * CYCLE_SIZE;
    const endIdx = Math.min(startIdx + CYCLE_SIZE, totalWords);
    const cycleWords = chapter.words.slice(startIdx, endIdx);
    
    // Cycle ID: "1a", "1b", "1c", etc.
    const cycleLetter = String.fromCharCode(97 + i); // 'a', 'b', 'c', ...
    const cycleId = `${chapterId}${cycleLetter}`;
    
    cycles.push({
      chapterId: chapter.id,
      cycleId,
      name: `Kappale ${chapterId}${cycleLetter}`,
      words: cycleWords,
    });
  }
  
  return cycles;
}

export function getAllSM2Cycles(): SM2Cycle[] {
  return suomenMestari2Vocabulary.flatMap(chapter => 
    getSM2CyclesForChapter(chapter.id)
  );
}

export function getSM2CycleById(cycleId: string): SM2Cycle | undefined {
  // Extract chapter ID from cycle ID (e.g., "1a" -> chapter 1)
  const chapterId = parseInt(cycleId.match(/^\d+/)?.[0] || '0');
  if (!chapterId) return undefined;
  
  const cycles = getSM2CyclesForChapter(chapterId);
  return cycles.find(c => c.cycleId === cycleId);
}

export function getWordsForSM2Cycles(cycleIds: string[]): SM2Word[] {
  return cycleIds
    .map(id => getSM2CycleById(id))
    .filter((cycle): cycle is SM2Cycle => cycle !== undefined)
    .flatMap(c => c.words);
}

export function getSM2WordCountForCycles(cycleIds: string[]): number {
  return getWordsForSM2Cycles(cycleIds).length;
}

