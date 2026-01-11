// Pikkusanat (Small Words) - Filler words for natural Finnish sentences
// These are the little words that make sentences flow naturally

import type { PikkusanaCategory, Pikkusana } from '../types';

export interface PikkusanaCategoryInfo {
  id: PikkusanaCategory;
  name: string;
  finnishName: string;
  description: string;
  color: string;
}

export const PIKKUSANA_CATEGORIES: PikkusanaCategoryInfo[] = [
  {
    id: 'conjunctions',
    name: 'Conjunctions',
    finnishName: 'Konjunktiot',
    description: 'Words that connect clauses and sentences',
    color: '#4a9eff',
  },
  {
    id: 'adverbs',
    name: 'Adverbs',
    finnishName: 'Adverbit',
    description: 'Words that modify verbs, adjectives, or other adverbs',
    color: '#e74c3c',
  },
  {
    id: 'particles',
    name: 'Particles',
    finnishName: 'Partikkelit',
    description: 'Small words that add nuance and emotion',
    color: '#9b59b6',
  },
  {
    id: 'prepositions',
    name: 'Pre/Postpositions',
    finnishName: 'Pre/Postpositiot',
    description: 'Words that show relationships between nouns',
    color: '#27ae60',
  },
  {
    id: 'pronouns',
    name: 'Pronouns',
    finnishName: 'Pronominit',
    description: 'Words that replace or refer to nouns',
    color: '#1abc9c',
  },
  {
    id: 'question-particles',
    name: 'Question Words',
    finnishName: 'Kysymyspartikkelit',
    description: 'Words used in forming questions',
    color: '#f39c12',
  },
  {
    id: 'intensifiers',
    name: 'Intensifiers',
    finnishName: 'Vahvistussanat',
    description: 'Words that strengthen or weaken meaning',
    color: '#ff7b4a',
  },
  {
    id: 'negation',
    name: 'Negation',
    finnishName: 'Kieltosanat',
    description: 'Words used for negation and denial',
    color: '#3498db',
  },
  {
    id: 'time-expressions',
    name: 'Time Expressions',
    finnishName: 'Ajanilmaukset',
    description: 'Words related to time',
    color: '#8e44ad',
  },
  {
    id: 'fillers',
    name: 'Fillers & Discourse',
    finnishName: 'Täytesanat',
    description: 'Conversational fillers and discourse markers',
    color: '#e91e63',
  },
];

export const PIKKUSANAT: Pikkusana[] = [
  // === CONJUNCTIONS (Konjunktiot) ===
  { finnish: 'ja', english: 'and', category: 'conjunctions', example: 'Minä ja sinä.', exampleTranslation: 'Me and you.' },
  { finnish: 'sekä', english: 'as well as, both...and', category: 'conjunctions', example: 'Sekä hän että minä.', exampleTranslation: 'Both he and I.' },
  { finnish: 'mutta', english: 'but', category: 'conjunctions', example: 'Haluan, mutta en voi.', exampleTranslation: 'I want to, but I can\'t.' },
  { finnish: 'tai', english: 'or', category: 'conjunctions', example: 'Kahvi tai tee?', exampleTranslation: 'Coffee or tea?' },
  { finnish: 'vai', english: 'or (in questions)', category: 'conjunctions', example: 'Tuletko vai et?', exampleTranslation: 'Are you coming or not?' },
  { finnish: 'koska', english: 'because', category: 'conjunctions', example: 'Olen väsynyt, koska nukuin huonosti.', exampleTranslation: 'I\'m tired because I slept badly.' },
  { finnish: 'kun', english: 'when, as', category: 'conjunctions', example: 'Kun tulin kotiin...', exampleTranslation: 'When I came home...' },
  { finnish: 'jos', english: 'if', category: 'conjunctions', example: 'Jos haluat, voit tulla.', exampleTranslation: 'If you want, you can come.' },
  { finnish: 'että', english: 'that', category: 'conjunctions', example: 'Luulen, että hän tulee.', exampleTranslation: 'I think that he\'s coming.' },
  { finnish: 'jotta', english: 'so that, in order to', category: 'conjunctions', example: 'Opiskelen, jotta opin.', exampleTranslation: 'I study so that I learn.' },
  { finnish: 'vaikka', english: 'although, even though', category: 'conjunctions', example: 'Menen, vaikka sataa.', exampleTranslation: 'I\'m going even though it\'s raining.' },
  { finnish: 'kunnes', english: 'until', category: 'conjunctions', example: 'Odota, kunnes tulen.', exampleTranslation: 'Wait until I come.' },
  { finnish: 'ennen kuin', english: 'before', category: 'conjunctions', example: 'Ennen kuin lähdet...', exampleTranslation: 'Before you leave...' },
  { finnish: 'sen jälkeen kun', english: 'after', category: 'conjunctions', example: 'Sen jälkeen kun söin...', exampleTranslation: 'After I ate...' },
  { finnish: 'sillä', english: 'because, for', category: 'conjunctions', example: 'Lähdin, sillä olin väsynyt.', exampleTranslation: 'I left, for I was tired.' },
  { finnish: 'eli', english: 'or, that is', category: 'conjunctions', example: 'Helsinki eli pääkaupunki.', exampleTranslation: 'Helsinki, that is the capital.' },
  { finnish: 'siksi', english: 'therefore, that\'s why', category: 'conjunctions', example: 'Siksi olen täällä.', exampleTranslation: 'That\'s why I\'m here.' },
  { finnish: 'niin', english: 'so, thus', category: 'conjunctions', example: 'Satoi, niin jäin kotiin.', exampleTranslation: 'It rained, so I stayed home.' },
  { finnish: 'joko...tai', english: 'either...or', category: 'conjunctions', example: 'Joko nyt tai ei koskaan.', exampleTranslation: 'Either now or never.' },
  { finnish: 'sekä...että', english: 'both...and', category: 'conjunctions', example: 'Sekä kaunis että älykäs.', exampleTranslation: 'Both beautiful and smart.' },

  // === ADVERBS (Adverbit) ===
  { finnish: 'nyt', english: 'now', category: 'adverbs', example: 'Tule nyt!', exampleTranslation: 'Come now!' },
  { finnish: 'sitten', english: 'then, later', category: 'adverbs', example: 'Nähdään sitten!', exampleTranslation: 'See you later!' },
  { finnish: 'jo', english: 'already', category: 'adverbs', example: 'Olen jo syönyt.', exampleTranslation: 'I\'ve already eaten.' },
  { finnish: 'vielä', english: 'still, yet', category: 'adverbs', example: 'Hän on vielä täällä.', exampleTranslation: 'He\'s still here.' },
  { finnish: 'usein', english: 'often', category: 'adverbs', example: 'Käyn usein uimassa.', exampleTranslation: 'I often go swimming.' },
  { finnish: 'aina', english: 'always', category: 'adverbs', example: 'Hän on aina myöhässä.', exampleTranslation: 'He\'s always late.' },
  { finnish: 'harvoin', english: 'rarely, seldom', category: 'adverbs', example: 'Harvoin näen häntä.', exampleTranslation: 'I rarely see him.' },
  { finnish: 'joskus', english: 'sometimes', category: 'adverbs', example: 'Joskus unohdan.', exampleTranslation: 'Sometimes I forget.' },
  { finnish: 'koskaan', english: 'ever, never (with neg.)', category: 'adverbs', example: 'En ole koskaan käynyt.', exampleTranslation: 'I\'ve never been there.' },
  { finnish: 'taas', english: 'again', category: 'adverbs', example: 'Taas sataa!', exampleTranslation: 'It\'s raining again!' },
  { finnish: 'myös', english: 'also, too', category: 'adverbs', example: 'Minäkin tulen myös.', exampleTranslation: 'I\'m also coming too.' },
  { finnish: 'vain', english: 'only, just', category: 'adverbs', example: 'Vain yksi jäljellä.', exampleTranslation: 'Only one left.' },
  { finnish: 'juuri', english: 'just (now), exactly', category: 'adverbs', example: 'Tulin juuri kotiin.', exampleTranslation: 'I just came home.' },
  { finnish: 'melkein', english: 'almost, nearly', category: 'adverbs', example: 'Melkein unohdin!', exampleTranslation: 'I almost forgot!' },
  { finnish: 'lähes', english: 'almost, nearly', category: 'adverbs', example: 'Lähes valmis.', exampleTranslation: 'Almost ready.' },
  { finnish: 'ehkä', english: 'maybe, perhaps', category: 'adverbs', example: 'Ehkä huomenna.', exampleTranslation: 'Maybe tomorrow.' },
  { finnish: 'varmasti', english: 'certainly, surely', category: 'adverbs', example: 'Varmasti tulen!', exampleTranslation: 'I\'ll certainly come!' },
  { finnish: 'todennäköisesti', english: 'probably', category: 'adverbs', example: 'Todennäköisesti sataa.', exampleTranslation: 'It\'ll probably rain.' },
  { finnish: 'tietysti', english: 'of course', category: 'adverbs', example: 'Tietysti autan!', exampleTranslation: 'Of course I\'ll help!' },
  { finnish: 'oikeastaan', english: 'actually, really', category: 'adverbs', example: 'Oikeastaan en tiedä.', exampleTranslation: 'Actually, I don\'t know.' },
  { finnish: 'itse asiassa', english: 'in fact, actually', category: 'adverbs', example: 'Itse asiassa olen kiireinen.', exampleTranslation: 'In fact, I\'m busy.' },
  { finnish: 'erityisesti', english: 'especially', category: 'adverbs', example: 'Pidän erityisesti kahvista.', exampleTranslation: 'I especially like coffee.' },
  { finnish: 'yleensä', english: 'usually, generally', category: 'adverbs', example: 'Yleensä herään aikaisin.', exampleTranslation: 'I usually wake up early.' },
  { finnish: 'nopeasti', english: 'quickly, fast', category: 'adverbs', example: 'Tule nopeasti!', exampleTranslation: 'Come quickly!' },
  { finnish: 'hitaasti', english: 'slowly', category: 'adverbs', example: 'Puhu hitaasti.', exampleTranslation: 'Speak slowly.' },
  { finnish: 'hyvin', english: 'well, very', category: 'adverbs', example: 'Menee hyvin!', exampleTranslation: 'It\'s going well!' },
  { finnish: 'huonosti', english: 'badly, poorly', category: 'adverbs', example: 'Nukuin huonosti.', exampleTranslation: 'I slept badly.' },
  { finnish: 'oikein', english: 'correctly, really', category: 'adverbs', example: 'Oikein hyvin!', exampleTranslation: 'Really well!' },
  { finnish: 'väärin', english: 'wrongly, incorrectly', category: 'adverbs', example: 'Tein väärin.', exampleTranslation: 'I did wrong.' },
  { finnish: 'täysin', english: 'completely, fully', category: 'adverbs', example: 'Olen täysin samaa mieltä.', exampleTranslation: 'I completely agree.' },
  { finnish: 'osittain', english: 'partly, partially', category: 'adverbs', example: 'Osittain totta.', exampleTranslation: 'Partly true.' },

  // === PARTICLES (Partikkelit) ===
  { finnish: 'no', english: 'well, so', category: 'particles', example: 'No niin!', exampleTranslation: 'Well then!', notes: 'Very common conversation starter' },
  { finnish: 'niin', english: 'yes, so, indeed', category: 'particles', example: 'Niin minäkin.', exampleTranslation: 'Me too.' },
  { finnish: 'kai', english: 'I suppose, probably', category: 'particles', example: 'Hän on kai sairas.', exampleTranslation: 'I suppose he\'s sick.' },
  { finnish: 'kyllä', english: 'yes, indeed', category: 'particles', example: 'Kyllä minä tulen!', exampleTranslation: 'Yes, I\'m coming!' },
  { finnish: 'joo', english: 'yeah, yes (informal)', category: 'particles', example: 'Joo, selvä.', exampleTranslation: 'Yeah, okay.' },
  { finnish: 'juu', english: 'yeah (very informal)', category: 'particles', example: 'Juu juu.', exampleTranslation: 'Yeah, yeah.' },
  { finnish: 'ei', english: 'no', category: 'particles', example: 'Ei kiitos.', exampleTranslation: 'No thanks.' },
  { finnish: '-han/-hän', english: 'emphasis (you know)', category: 'particles', example: 'Minähän sanoin!', exampleTranslation: 'I told you so!', notes: 'Suffix attached to words' },
  { finnish: '-pa/-pä', english: 'emphasis', category: 'particles', example: 'Katsopaas!', exampleTranslation: 'Just look!', notes: 'Adds mild emphasis' },
  { finnish: '-kin', english: 'also, too, even', category: 'particles', example: 'Minäkin!', exampleTranslation: 'Me too!', notes: 'Suffix meaning "also"' },
  { finnish: '-kaan/-kään', english: 'either, neither (neg.)', category: 'particles', example: 'Minäkään en tiedä.', exampleTranslation: 'I don\'t know either.', notes: 'Used with negation' },
  { finnish: 'edes', english: 'even, at least', category: 'particles', example: 'En edes tiedä.', exampleTranslation: 'I don\'t even know.' },
  { finnish: 'vaan', english: 'but (after negative)', category: 'particles', example: 'Ei punainen, vaan sininen.', exampleTranslation: 'Not red, but blue.' },
  { finnish: 'siis', english: 'so, therefore, then', category: 'particles', example: 'Sinä siis tulet?', exampleTranslation: 'So you\'re coming then?' },
  { finnish: 'kuitenkin', english: 'however, still', category: 'particles', example: 'Olen kuitenkin onnellinen.', exampleTranslation: 'I\'m happy, however.' },
  { finnish: 'sentään', english: 'at least, still', category: 'particles', example: 'Yritä sentään!', exampleTranslation: 'At least try!' },
  { finnish: 'tosin', english: 'though, admittedly', category: 'particles', example: 'Olen tosin väsynyt.', exampleTranslation: 'I\'m tired, though.' },
  { finnish: 'muuten', english: 'otherwise, by the way', category: 'particles', example: 'Muuten, tiedätkö...', exampleTranslation: 'By the way, do you know...' },
  { finnish: 'nimenomaan', english: 'precisely, exactly', category: 'particles', example: 'Nimenomaan näin!', exampleTranslation: 'Exactly like this!' },

  // === PREPOSITIONS/POSTPOSITIONS (Pre/Postpositiot) ===
  { finnish: 'kanssa', english: 'with', category: 'prepositions', example: 'Ystävän kanssa.', exampleTranslation: 'With a friend.', notes: 'Postposition (after genitive)' },
  { finnish: 'ilman', english: 'without', category: 'prepositions', example: 'Ilman sinua.', exampleTranslation: 'Without you.', notes: 'Preposition (before partitive)' },
  { finnish: 'ennen', english: 'before', category: 'prepositions', example: 'Ennen ruokaa.', exampleTranslation: 'Before food.', notes: 'Preposition (before partitive)' },
  { finnish: 'jälkeen', english: 'after', category: 'prepositions', example: 'Ruoan jälkeen.', exampleTranslation: 'After food.', notes: 'Postposition (after genitive)' },
  { finnish: 'aikana', english: 'during', category: 'prepositions', example: 'Päivän aikana.', exampleTranslation: 'During the day.', notes: 'Postposition (after genitive)' },
  { finnish: 'sijaan', english: 'instead of', category: 'prepositions', example: 'Kahvin sijaan.', exampleTranslation: 'Instead of coffee.', notes: 'Postposition (after genitive)' },
  { finnish: 'lisäksi', english: 'in addition to', category: 'prepositions', example: 'Tämän lisäksi.', exampleTranslation: 'In addition to this.', notes: 'Postposition (after genitive)' },
  { finnish: 'takia', english: 'because of', category: 'prepositions', example: 'Sateen takia.', exampleTranslation: 'Because of rain.', notes: 'Postposition (after genitive)' },
  { finnish: 'vuoksi', english: 'because of, for the sake of', category: 'prepositions', example: 'Sinun vuoksesi.', exampleTranslation: 'For your sake.', notes: 'Postposition (after genitive)' },
  { finnish: 'mukaan', english: 'according to, along', category: 'prepositions', example: 'Hänen mukaansa.', exampleTranslation: 'According to him.', notes: 'Postposition (after genitive)' },
  { finnish: 'puolesta', english: 'on behalf of', category: 'prepositions', example: 'Minun puolestani.', exampleTranslation: 'On my behalf.', notes: 'Postposition (after genitive)' },
  { finnish: 'vastaan', english: 'against', category: 'prepositions', example: 'Sitä vastaan.', exampleTranslation: 'Against it.', notes: 'Postposition (after partitive)' },
  { finnish: 'kohti', english: 'towards', category: 'prepositions', example: 'Kotia kohti.', exampleTranslation: 'Towards home.', notes: 'Postposition (after partitive)' },
  { finnish: 'yli', english: 'over, above', category: 'prepositions', example: 'Sillan yli.', exampleTranslation: 'Over the bridge.', notes: 'Postposition (after genitive)' },
  { finnish: 'ali', english: 'under', category: 'prepositions', example: 'Sillan ali.', exampleTranslation: 'Under the bridge.', notes: 'Postposition (after genitive)' },
  { finnish: 'läpi', english: 'through', category: 'prepositions', example: 'Metsän läpi.', exampleTranslation: 'Through the forest.', notes: 'Postposition (after genitive)' },
  { finnish: 'lähellä', english: 'near', category: 'prepositions', example: 'Kodin lähellä.', exampleTranslation: 'Near home.', notes: 'Postposition (after genitive/partitive)' },
  { finnish: 'kaukana', english: 'far from', category: 'prepositions', example: 'Kaukana kotoa.', exampleTranslation: 'Far from home.', notes: 'Postposition (after elative)' },
  { finnish: 'keskellä', english: 'in the middle of', category: 'prepositions', example: 'Huoneen keskellä.', exampleTranslation: 'In the middle of the room.', notes: 'Postposition (after genitive)' },
  { finnish: 'ympärillä', english: 'around', category: 'prepositions', example: 'Talon ympärillä.', exampleTranslation: 'Around the house.', notes: 'Postposition (after genitive)' },

  // === PRONOUNS (Pronominit) ===
  { finnish: 'se', english: 'it, that', category: 'pronouns', example: 'Se on hyvä.', exampleTranslation: 'That\'s good.' },
  { finnish: 'tämä', english: 'this', category: 'pronouns', example: 'Tämä on minun.', exampleTranslation: 'This is mine.' },
  { finnish: 'tuo', english: 'that (over there)', category: 'pronouns', example: 'Tuo on kaunis.', exampleTranslation: 'That one is beautiful.' },
  { finnish: 'nämä', english: 'these', category: 'pronouns', example: 'Nämä ovat hyviä.', exampleTranslation: 'These are good.' },
  { finnish: 'nuo', english: 'those', category: 'pronouns', example: 'Nuo ovat vanhoja.', exampleTranslation: 'Those are old.' },
  { finnish: 'ne', english: 'they/those (things)', category: 'pronouns', example: 'Ne ovat täällä.', exampleTranslation: 'They are here.' },
  { finnish: 'joku', english: 'someone, somebody', category: 'pronouns', example: 'Joku soitti.', exampleTranslation: 'Someone called.' },
  { finnish: 'jokin', english: 'something', category: 'pronouns', example: 'Jokin on vialla.', exampleTranslation: 'Something is wrong.' },
  { finnish: 'jotain', english: 'something (partitive)', category: 'pronouns', example: 'Haluatko jotain?', exampleTranslation: 'Do you want something?' },
  { finnish: 'kukaan', english: 'anyone, nobody (neg.)', category: 'pronouns', example: 'Kukaan ei tiedä.', exampleTranslation: 'Nobody knows.' },
  { finnish: 'mikään', english: 'anything, nothing (neg.)', category: 'pronouns', example: 'Mikään ei auta.', exampleTranslation: 'Nothing helps.' },
  { finnish: 'kaikki', english: 'everyone, everything, all', category: 'pronouns', example: 'Kaikki ovat täällä.', exampleTranslation: 'Everyone is here.' },
  { finnish: 'jokainen', english: 'each, every', category: 'pronouns', example: 'Jokainen tietää.', exampleTranslation: 'Everyone knows.' },
  { finnish: 'molemmat', english: 'both', category: 'pronouns', example: 'Molemmat ovat oikeassa.', exampleTranslation: 'Both are right.' },
  { finnish: 'moni', english: 'many', category: 'pronouns', example: 'Moni sanoo niin.', exampleTranslation: 'Many say so.' },
  { finnish: 'muutama', english: 'a few, some', category: 'pronouns', example: 'Muutama ihminen.', exampleTranslation: 'A few people.' },
  { finnish: 'toinen', english: 'another, the other', category: 'pronouns', example: 'Toinen sanoi...', exampleTranslation: 'The other one said...' },
  { finnish: 'sama', english: 'same', category: 'pronouns', example: 'Sama juttu.', exampleTranslation: 'Same thing.' },
  { finnish: 'sellainen', english: 'such, that kind of', category: 'pronouns', example: 'Sellainen asia.', exampleTranslation: 'Such a thing.' },
  { finnish: 'tällainen', english: 'this kind of, such', category: 'pronouns', example: 'Tällainen tilanne.', exampleTranslation: 'This kind of situation.' },

  // === QUESTION PARTICLES (Kysymyspartikkelit) ===
  { finnish: '-ko/-kö', english: '(yes/no question marker)', category: 'question-particles', example: 'Tuletko?', exampleTranslation: 'Are you coming?', notes: 'Attached to the verb' },
  { finnish: 'vai', english: 'or (in questions)', category: 'question-particles', example: 'Kahvi vai tee?', exampleTranslation: 'Coffee or tea?', notes: 'Used in either/or questions' },
  { finnish: 'entä', english: 'what about, and', category: 'question-particles', example: 'Entä sinä?', exampleTranslation: 'What about you?' },
  { finnish: 'eikö', english: 'isn\'t it, right', category: 'question-particles', example: 'Kaunis, eikö?', exampleTranslation: 'Beautiful, isn\'t it?' },
  { finnish: 'eikös', english: 'isn\'t it (informal)', category: 'question-particles', example: 'Hyvä, eikös?', exampleTranslation: 'Good, right?' },
  { finnish: 'vai mitä', english: 'or what, right', category: 'question-particles', example: 'Hyvä idea, vai mitä?', exampleTranslation: 'Good idea, right?' },
  { finnish: 'mitäs', english: 'what (casual)', category: 'question-particles', example: 'Mitäs kuuluu?', exampleTranslation: 'What\'s up?' },
  { finnish: 'kukas', english: 'who (casual)', category: 'question-particles', example: 'Kukas se oli?', exampleTranslation: 'Who was that?' },

  // === INTENSIFIERS (Vahvistussanat) ===
  { finnish: 'hyvin', english: 'very', category: 'intensifiers', example: 'Hyvin hyvä!', exampleTranslation: 'Very good!' },
  { finnish: 'todella', english: 'really, truly', category: 'intensifiers', example: 'Todella kaunis!', exampleTranslation: 'Really beautiful!' },
  { finnish: 'tosi', english: 'really, very (informal)', category: 'intensifiers', example: 'Tosi hyvä!', exampleTranslation: 'Really good!' },
  { finnish: 'erittäin', english: 'extremely, very', category: 'intensifiers', example: 'Erittäin tärkeä.', exampleTranslation: 'Extremely important.' },
  { finnish: 'melko', english: 'quite, fairly', category: 'intensifiers', example: 'Melko hyvä.', exampleTranslation: 'Quite good.' },
  { finnish: 'aika', english: 'quite, rather', category: 'intensifiers', example: 'Aika kylmä.', exampleTranslation: 'Quite cold.' },
  { finnish: 'varsin', english: 'rather, quite', category: 'intensifiers', example: 'Varsin mielenkiintoinen.', exampleTranslation: 'Rather interesting.' },
  { finnish: 'suhteellisen', english: 'relatively', category: 'intensifiers', example: 'Suhteellisen helppo.', exampleTranslation: 'Relatively easy.' },
  { finnish: 'vähän', english: 'a little, a bit', category: 'intensifiers', example: 'Vähän väsynyt.', exampleTranslation: 'A bit tired.' },
  { finnish: 'hieman', english: 'slightly, a little', category: 'intensifiers', example: 'Hieman parempi.', exampleTranslation: 'Slightly better.' },
  { finnish: 'liian', english: 'too (much)', category: 'intensifiers', example: 'Liian vaikea.', exampleTranslation: 'Too difficult.' },
  { finnish: 'paljon', english: 'a lot, much', category: 'intensifiers', example: 'Paljon parempi!', exampleTranslation: 'Much better!' },
  { finnish: 'tarpeeksi', english: 'enough', category: 'intensifiers', example: 'Tarpeeksi hyvä.', exampleTranslation: 'Good enough.' },
  { finnish: 'riittävästi', english: 'sufficiently, enough', category: 'intensifiers', example: 'Riittävästi aikaa.', exampleTranslation: 'Enough time.' },
  { finnish: 'vähintään', english: 'at least', category: 'intensifiers', example: 'Vähintään kaksi.', exampleTranslation: 'At least two.' },
  { finnish: 'enintään', english: 'at most', category: 'intensifiers', example: 'Enintään viisi.', exampleTranslation: 'At most five.' },
  { finnish: 'noin', english: 'about, approximately', category: 'intensifiers', example: 'Noin kymmenen.', exampleTranslation: 'About ten.' },
  { finnish: 'suunnilleen', english: 'approximately', category: 'intensifiers', example: 'Suunnilleen oikein.', exampleTranslation: 'Approximately right.' },
  { finnish: 'täsmälleen', english: 'exactly, precisely', category: 'intensifiers', example: 'Täsmälleen näin!', exampleTranslation: 'Exactly like this!' },
  { finnish: 'juuri', english: 'exactly, just', category: 'intensifiers', example: 'Juuri niin!', exampleTranslation: 'Exactly!' },
  { finnish: 'aivan', english: 'quite, completely', category: 'intensifiers', example: 'Aivan oikein!', exampleTranslation: 'Completely right!' },
  { finnish: 'ihan', english: 'quite, really (informal)', category: 'intensifiers', example: 'Ihan hyvä.', exampleTranslation: 'Quite good.' },

  // === NEGATION (Kieltosanat) ===
  { finnish: 'ei', english: 'no, not', category: 'negation', example: 'Ei saa!', exampleTranslation: 'Not allowed!' },
  { finnish: 'en', english: 'I don\'t/am not', category: 'negation', example: 'En tiedä.', exampleTranslation: 'I don\'t know.' },
  { finnish: 'et', english: 'you don\'t (singular)', category: 'negation', example: 'Et ymmärrä.', exampleTranslation: 'You don\'t understand.' },
  { finnish: 'emme', english: 'we don\'t', category: 'negation', example: 'Emme tule.', exampleTranslation: 'We won\'t come.' },
  { finnish: 'ette', english: 'you don\'t (plural)', category: 'negation', example: 'Ette saa!', exampleTranslation: 'You may not!' },
  { finnish: 'eivät', english: 'they don\'t', category: 'negation', example: 'Eivät tiedä.', exampleTranslation: 'They don\'t know.' },
  { finnish: 'älä', english: 'don\'t (singular command)', category: 'negation', example: 'Älä mene!', exampleTranslation: 'Don\'t go!' },
  { finnish: 'älkää', english: 'don\'t (plural command)', category: 'negation', example: 'Älkää unohtako!', exampleTranslation: 'Don\'t forget!' },
  { finnish: 'mitään', english: 'nothing, anything (neg.)', category: 'negation', example: 'En näe mitään.', exampleTranslation: 'I don\'t see anything.' },
  { finnish: 'ketään', english: 'nobody, anybody (neg.)', category: 'negation', example: 'En tunne ketään.', exampleTranslation: 'I don\'t know anybody.' },
  { finnish: 'missään', english: 'nowhere, anywhere (neg.)', category: 'negation', example: 'En ole missään.', exampleTranslation: 'I\'m not anywhere.' },
  { finnish: 'millään', english: 'in any way (neg.)', category: 'negation', example: 'En millään tavalla.', exampleTranslation: 'In no way.' },
  { finnish: 'enää', english: 'anymore, any longer', category: 'negation', example: 'Ei enää.', exampleTranslation: 'Not anymore.' },

  // === TIME EXPRESSIONS (Ajanilmaukset) ===
  { finnish: 'eilen', english: 'yesterday', category: 'time-expressions', example: 'Eilen satoi.', exampleTranslation: 'It rained yesterday.' },
  { finnish: 'tänään', english: 'today', category: 'time-expressions', example: 'Tänään on maanantai.', exampleTranslation: 'Today is Monday.' },
  { finnish: 'huomenna', english: 'tomorrow', category: 'time-expressions', example: 'Nähdään huomenna!', exampleTranslation: 'See you tomorrow!' },
  { finnish: 'ylihuomenna', english: 'day after tomorrow', category: 'time-expressions', example: 'Tulen ylihuomenna.', exampleTranslation: 'I\'ll come the day after tomorrow.' },
  { finnish: 'toissapäivänä', english: 'day before yesterday', category: 'time-expressions', example: 'Näin hänet toissapäivänä.', exampleTranslation: 'I saw him the day before yesterday.' },
  { finnish: 'pian', english: 'soon', category: 'time-expressions', example: 'Tulen pian!', exampleTranslation: 'I\'ll come soon!' },
  { finnish: 'kohta', english: 'soon, in a moment', category: 'time-expressions', example: 'Kohta valmista.', exampleTranslation: 'Ready soon.' },
  { finnish: 'heti', english: 'immediately, right away', category: 'time-expressions', example: 'Tulen heti!', exampleTranslation: 'I\'ll come right away!' },
  { finnish: 'äskettäin', english: 'recently, just now', category: 'time-expressions', example: 'Luin äskettäin.', exampleTranslation: 'I read recently.' },
  { finnish: 'aiemmin', english: 'earlier', category: 'time-expressions', example: 'Tulin aiemmin.', exampleTranslation: 'I came earlier.' },
  { finnish: 'myöhemmin', english: 'later', category: 'time-expressions', example: 'Nähdään myöhemmin!', exampleTranslation: 'See you later!' },
  { finnish: 'samaan aikaan', english: 'at the same time', category: 'time-expressions', example: 'Samaan aikaan...', exampleTranslation: 'At the same time...' },
  { finnish: 'sillä välin', english: 'meanwhile', category: 'time-expressions', example: 'Sillä välin minä odotan.', exampleTranslation: 'Meanwhile I\'ll wait.' },
  { finnish: 'lopulta', english: 'finally, eventually', category: 'time-expressions', example: 'Lopulta onnistuin.', exampleTranslation: 'I finally succeeded.' },
  { finnish: 'aluksi', english: 'at first, initially', category: 'time-expressions', example: 'Aluksi oli vaikeaa.', exampleTranslation: 'At first it was difficult.' },
  { finnish: 'viimein', english: 'finally, at last', category: 'time-expressions', example: 'Viimein täällä!', exampleTranslation: 'Finally here!' },
  { finnish: 'ensin', english: 'first', category: 'time-expressions', example: 'Ensin syön.', exampleTranslation: 'First I\'ll eat.' },
  { finnish: 'sitten', english: 'then, after that', category: 'time-expressions', example: 'Sitten menen.', exampleTranslation: 'Then I\'ll go.' },
  { finnish: 'lopuksi', english: 'finally, in the end', category: 'time-expressions', example: 'Lopuksi kiitos!', exampleTranslation: 'Finally, thanks!' },
  { finnish: 'aamulla', english: 'in the morning', category: 'time-expressions', example: 'Herään aamulla.', exampleTranslation: 'I wake up in the morning.' },
  { finnish: 'illalla', english: 'in the evening', category: 'time-expressions', example: 'Tulen illalla.', exampleTranslation: 'I\'ll come in the evening.' },
  { finnish: 'yöllä', english: 'at night', category: 'time-expressions', example: 'Nukun yöllä.', exampleTranslation: 'I sleep at night.' },
  { finnish: 'päivällä', english: 'during the day', category: 'time-expressions', example: 'Työskentelen päivällä.', exampleTranslation: 'I work during the day.' },

  // === FILLERS & DISCOURSE MARKERS (Täytesanat) ===
  { finnish: 'siis', english: 'so, therefore, I mean', category: 'fillers', example: 'Siis... mitä sanoit?', exampleTranslation: 'So... what did you say?', notes: 'Very common filler' },
  { finnish: 'tuota', english: 'um, well', category: 'fillers', example: 'Tuota... en tiedä.', exampleTranslation: 'Um... I don\'t know.', notes: 'Hesitation filler' },
  { finnish: 'niinku', english: 'like, you know', category: 'fillers', example: 'Se on niinku... vaikea.', exampleTranslation: 'It\'s like... difficult.', notes: 'Very common in spoken Finnish' },
  { finnish: 'tavallaan', english: 'in a way, sort of', category: 'fillers', example: 'Tavallaan ymmärrän.', exampleTranslation: 'I sort of understand.' },
  { finnish: 'tiedätkö', english: 'you know', category: 'fillers', example: 'Se on, tiedätkö, vaikeaa.', exampleTranslation: 'It\'s, you know, difficult.' },
  { finnish: 'kuule', english: 'listen, hey', category: 'fillers', example: 'Kuule, mitä sinä...', exampleTranslation: 'Listen, what are you...' },
  { finnish: 'hei', english: 'hey, listen', category: 'fillers', example: 'Hei, odota!', exampleTranslation: 'Hey, wait!' },
  { finnish: 'anteeksi', english: 'sorry, excuse me', category: 'fillers', example: 'Anteeksi, voitko...', exampleTranslation: 'Excuse me, can you...' },
  { finnish: 'no niin', english: 'well then, okay', category: 'fillers', example: 'No niin, aloitetaan!', exampleTranslation: 'Okay, let\'s start!', notes: 'Very Finnish expression' },
  { finnish: 'no joo', english: 'well yeah', category: 'fillers', example: 'No joo, ehkä.', exampleTranslation: 'Well yeah, maybe.' },
  { finnish: 'jep', english: 'yep', category: 'fillers', example: 'Jep, selvä.', exampleTranslation: 'Yep, okay.' },
  { finnish: 'okei', english: 'okay', category: 'fillers', example: 'Okei, ymmärrän.', exampleTranslation: 'Okay, I understand.' },
  { finnish: 'selvä', english: 'clear, okay, got it', category: 'fillers', example: 'Selvä homma.', exampleTranslation: 'Okay, got it.' },
  { finnish: 'totta kai', english: 'of course', category: 'fillers', example: 'Totta kai tulen!', exampleTranslation: 'Of course I\'ll come!' },
  { finnish: 'ehdottomasti', english: 'absolutely, definitely', category: 'fillers', example: 'Ehdottomasti!', exampleTranslation: 'Absolutely!' },
  { finnish: 'valitettavasti', english: 'unfortunately', category: 'fillers', example: 'Valitettavasti en voi.', exampleTranslation: 'Unfortunately I can\'t.' },
  { finnish: 'onneksi', english: 'fortunately, luckily', category: 'fillers', example: 'Onneksi selvisin.', exampleTranslation: 'Luckily I survived.' },
  { finnish: 'ilmeisesti', english: 'apparently', category: 'fillers', example: 'Ilmeisesti hän lähti.', exampleTranslation: 'Apparently he left.' },
  { finnish: 'luultavasti', english: 'probably', category: 'fillers', example: 'Luultavasti sataa.', exampleTranslation: 'It\'ll probably rain.' },
  { finnish: 'minusta', english: 'in my opinion', category: 'fillers', example: 'Minusta se on hyvä.', exampleTranslation: 'In my opinion it\'s good.' },
  { finnish: 'mielestäni', english: 'I think, in my view', category: 'fillers', example: 'Mielestäni olet oikeassa.', exampleTranslation: 'I think you\'re right.' },
  { finnish: 'luulen', english: 'I think, I suppose', category: 'fillers', example: 'Luulen, että...', exampleTranslation: 'I think that...' },
  { finnish: 'uskon', english: 'I believe', category: 'fillers', example: 'Uskon niin.', exampleTranslation: 'I believe so.' },
  { finnish: 'no mut', english: 'but like, well but', category: 'fillers', example: 'No mut silti...', exampleTranslation: 'But still...', notes: 'Informal spoken Finnish' },
  { finnish: 'niin no', english: 'well yeah', category: 'fillers', example: 'Niin no, ehkä.', exampleTranslation: 'Well yeah, maybe.' },
  { finnish: 'mitä nyt', english: 'well, let\'s see', category: 'fillers', example: 'Mitä nyt... ajattelen.', exampleTranslation: 'Well... I\'m thinking.' },
];

// Helper functions
export function getPikkusanatByCategory(category: PikkusanaCategory): Pikkusana[] {
  return PIKKUSANAT.filter(w => w.category === category);
}

export function getCategoryInfo(category: PikkusanaCategory): PikkusanaCategoryInfo | undefined {
  return PIKKUSANA_CATEGORIES.find(c => c.id === category);
}

export function getAllPikkusanat(): Pikkusana[] {
  return PIKKUSANAT;
}

export function getPikkusanatForCategories(categories: PikkusanaCategory[]): Pikkusana[] {
  return PIKKUSANAT.filter(w => categories.includes(w.category));
}

export function getPikkusanaCount(categories: PikkusanaCategory[]): number {
  return getPikkusanatForCategories(categories).length;
}

