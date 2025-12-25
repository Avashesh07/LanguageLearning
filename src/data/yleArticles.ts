// Yle Selkouutiset-style Reading Articles
// Simplified Finnish news for reading comprehension practice

export type ArticleLevel = 'A1' | 'A2' | 'B1';
export type ArticleSource = 'selkouutiset' | 'yle-news';

export interface VocabularyItem {
  finnish: string;
  english: string;
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface YleArticle {
  id: string;
  title: string;
  level: ArticleLevel;
  topic: string;
  content: string;
  vocabulary: VocabularyItem[];
  questions: ComprehensionQuestion[];
  articleSource: ArticleSource;
  originalUrl?: string;
}

// ============================================
// A1 LEVEL ARTICLES - Very simple Finnish
// ============================================

export const YLE_ARTICLES: YleArticle[] = [
  // === WEATHER & SEASONS ===
  {
    id: 'a1-weather-1',
    title: 'Tänään on kylmä',
    level: 'A1',
    topic: 'weather',
    content: `Tänään on kylmä päivä Suomessa. Ulkona on -10 astetta. Lunta sataa paljon.

Ihmiset pukevat lämpimät vaatteet. He laittavat takin, hanskat ja pipot. Lapset leikkivät lumessa.

Huomenna on lämmin. Aurinko paistaa. Se on hyvä päivä.`,
    vocabulary: [
      { finnish: 'kylmä', english: 'cold' },
      { finnish: 'ulkona', english: 'outside' },
      { finnish: 'astetta', english: 'degrees' },
      { finnish: 'lunta sataa', english: 'it snows' },
      { finnish: 'vaatteet', english: 'clothes' },
      { finnish: 'takki', english: 'coat' },
      { finnish: 'hanskat', english: 'gloves' },
      { finnish: 'pipo', english: 'hat/beanie' },
      { finnish: 'lämmin', english: 'warm' },
      { finnish: 'aurinko paistaa', english: 'the sun shines' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Millainen päivä on tänään?',
        options: ['Lämmin', 'Kylmä', 'Kuuma'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Mitä lapset tekevät?',
        options: ['He nukkuvat', 'He leikkivät lumessa', 'He syövät'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'Millainen sää on huomenna?',
        options: ['Kylmä', 'Lämmin', 'Sateinen'],
        correctAnswer: 1,
      },
    ],
    articleSource: 'selkouutiset',
  },
  {
    id: 'a1-weather-2',
    title: 'Kesä Suomessa',
    level: 'A1',
    topic: 'weather',
    content: `Kesä on Suomessa kaunis. Päivät ovat pitkät. Aurinko paistaa paljon.

Ihmiset menevät ulos. He kävelevät puistossa. He uivat järvessä. Kesällä on lämmin.

Suomessa on paljon järviä. Järvissä voi uida ja kalastaa. Monet ihmiset pitävät kesästä.`,
    vocabulary: [
      { finnish: 'kesä', english: 'summer' },
      { finnish: 'kaunis', english: 'beautiful' },
      { finnish: 'pitkät', english: 'long (plural)' },
      { finnish: 'puistossa', english: 'in the park' },
      { finnish: 'uivat', english: 'they swim' },
      { finnish: 'järvessä', english: 'in the lake' },
      { finnish: 'järviä', english: 'lakes' },
      { finnish: 'kalastaa', english: 'to fish' },
      { finnish: 'pitävät', english: 'they like' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Millaiset päivät ovat kesällä?',
        options: ['Lyhyet', 'Pitkät', 'Kylmät'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Missä ihmiset uivat?',
        options: ['Puistossa', 'Kotona', 'Järvessä'],
        correctAnswer: 2,
      },
      {
        id: 'q3',
        question: 'Mitä järvissä voi tehdä?',
        options: ['Uida ja kalastaa', 'Kävellä', 'Nukkua'],
        correctAnswer: 0,
      },
    ],
    articleSource: 'selkouutiset',
  },

  // === DAILY LIFE ===
  {
    id: 'a1-daily-1',
    title: 'Minun päiväni',
    level: 'A1',
    topic: 'daily-life',
    content: `Minä herään aamulla kello 7. Syön aamupalaa. Juon kahvia ja syön leipää.

Menen töihin bussilla. Työ alkaa kello 9. Työskentelen toimistossa. Syön lounasta kello 12.

Työ loppuu kello 17. Menen kotiin. Syön illallista ja katson televisiota. Menen nukkumaan kello 22.`,
    vocabulary: [
      { finnish: 'herään', english: 'I wake up' },
      { finnish: 'aamupala', english: 'breakfast' },
      { finnish: 'juon', english: 'I drink' },
      { finnish: 'leipää', english: 'bread' },
      { finnish: 'menen töihin', english: 'I go to work' },
      { finnish: 'bussilla', english: 'by bus' },
      { finnish: 'työ alkaa', english: 'work starts' },
      { finnish: 'toimistossa', english: 'in the office' },
      { finnish: 'lounas', english: 'lunch' },
      { finnish: 'työ loppuu', english: 'work ends' },
      { finnish: 'illallista', english: 'dinner' },
      { finnish: 'nukkumaan', english: 'to sleep' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Milloin minä herään?',
        options: ['Kello 6', 'Kello 7', 'Kello 8'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Miten minä menen töihin?',
        options: ['Autolla', 'Bussilla', 'Kävellen'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'Milloin työ loppuu?',
        options: ['Kello 15', 'Kello 16', 'Kello 17'],
        correctAnswer: 2,
      },
    ],
    articleSource: 'selkouutiset',
  },
  {
    id: 'a1-daily-2',
    title: 'Kaupassa',
    level: 'A1',
    topic: 'daily-life',
    content: `Tänään menen kauppaan. Ostan ruokaa. Tarvitsen maitoa, leipää ja juustoa.

Kaupassa on paljon ihmisiä. Otan ostoskorin. Kävelen kaupassa ja etsin tuotteita.

Maksan kassalla. Ruoka maksaa 15 euroa. Laitan ruoan kassiin ja menen kotiin.`,
    vocabulary: [
      { finnish: 'kauppaan', english: 'to the store' },
      { finnish: 'ostan', english: 'I buy' },
      { finnish: 'ruokaa', english: 'food' },
      { finnish: 'tarvitsen', english: 'I need' },
      { finnish: 'maitoa', english: 'milk' },
      { finnish: 'juustoa', english: 'cheese' },
      { finnish: 'ostoskori', english: 'shopping basket' },
      { finnish: 'etsin', english: 'I look for' },
      { finnish: 'tuotteita', english: 'products' },
      { finnish: 'maksan', english: 'I pay' },
      { finnish: 'kassalla', english: 'at the checkout' },
      { finnish: 'maksaa', english: 'costs' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Mitä minä ostan?',
        options: ['Vaatteita', 'Ruokaa', 'Kirjoja'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Paljonko ruoka maksaa?',
        options: ['10 euroa', '15 euroa', '20 euroa'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'Mitä minä tarvitsen?',
        options: ['Maitoa, leipää ja juustoa', 'Kahvia ja teetä', 'Lihaa ja kalaa'],
        correctAnswer: 0,
      },
    ],
    articleSource: 'selkouutiset',
  },

  // === FINLAND ===
  {
    id: 'a1-finland-1',
    title: 'Suomi',
    level: 'A1',
    topic: 'finland',
    content: `Suomi on maa Euroopassa. Suomessa asuu noin 5,5 miljoonaa ihmistä. Pääkaupunki on Helsinki.

Suomessa puhutaan suomea ja ruotsia. Suomi on kaunis maa. Täällä on paljon metsiä ja järviä.

Suomessa on neljä vuodenaikaa: kevät, kesä, syksy ja talvi. Talvella on kylmä ja kesällä on lämmin.`,
    vocabulary: [
      { finnish: 'maa', english: 'country' },
      { finnish: 'asuu', english: 'lives' },
      { finnish: 'miljoonaa', english: 'million' },
      { finnish: 'pääkaupunki', english: 'capital' },
      { finnish: 'puhutaan', english: 'they speak' },
      { finnish: 'metsiä', english: 'forests' },
      { finnish: 'vuodenaikaa', english: 'seasons' },
      { finnish: 'kevät', english: 'spring' },
      { finnish: 'syksy', english: 'autumn' },
      { finnish: 'talvi', english: 'winter' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Mikä on Suomen pääkaupunki?',
        options: ['Turku', 'Helsinki', 'Tampere'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Montako vuodenaikaa Suomessa on?',
        options: ['Kaksi', 'Kolme', 'Neljä'],
        correctAnswer: 2,
      },
      {
        id: 'q3',
        question: 'Mitä kieliä Suomessa puhutaan?',
        options: ['Suomea ja englantia', 'Suomea ja ruotsia', 'Suomea ja saksaa'],
        correctAnswer: 1,
      },
    ],
    articleSource: 'selkouutiset',
  },
  {
    id: 'a1-finland-2',
    title: 'Helsinki',
    level: 'A1',
    topic: 'finland',
    content: `Helsinki on Suomen pääkaupunki. Se on meren rannalla. Helsingissä asuu noin 650 000 ihmistä.

Helsingissä on paljon nähtävää. Tuomiokirkko on kuuluisa. Suomenlinna on vanha linnoitus merellä.

Helsinkiin voi tulla lentokoneella, junalla tai laivalla. Kaupungissa on hyvä julkinen liikenne.`,
    vocabulary: [
      { finnish: 'meren rannalla', english: 'on the seashore' },
      { finnish: 'nähtävää', english: 'to see' },
      { finnish: 'Tuomiokirkko', english: 'Cathedral' },
      { finnish: 'kuuluisa', english: 'famous' },
      { finnish: 'linnoitus', english: 'fortress' },
      { finnish: 'merellä', english: 'at sea' },
      { finnish: 'lentokoneella', english: 'by plane' },
      { finnish: 'junalla', english: 'by train' },
      { finnish: 'laivalla', english: 'by ship' },
      { finnish: 'julkinen liikenne', english: 'public transport' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Missä Helsinki on?',
        options: ['Vuorilla', 'Meren rannalla', 'Metsässä'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Mikä on Suomenlinna?',
        options: ['Kirkko', 'Linnoitus', 'Museo'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'Miten Helsinkiin voi tulla?',
        options: ['Vain autolla', 'Lentokoneella, junalla tai laivalla', 'Vain bussilla'],
        correctAnswer: 1,
      },
    ],
    articleSource: 'selkouutiset',
  },

  // === NEWS STYLE ===
  {
    id: 'a1-news-1',
    title: 'Uusi kahvila avataan',
    level: 'A1',
    topic: 'news',
    content: `Helsingin keskustassa avataan uusi kahvila. Kahvilan nimi on "Hyvä Kahvi". Se avataan ensi maanantaina.

Kahvilassa voi juoda kahvia ja teetä. Siellä on myös leivonnaisia ja kakkuja. Hinnat ovat edulliset.

Kahvila on auki joka päivä kello 8-20. Tervetuloa!`,
    vocabulary: [
      { finnish: 'keskustassa', english: 'in the center' },
      { finnish: 'avataan', english: 'opens / is opened' },
      { finnish: 'kahvilan nimi', english: 'the café\'s name' },
      { finnish: 'ensi maanantaina', english: 'next Monday' },
      { finnish: 'leivonnaisia', english: 'pastries' },
      { finnish: 'kakkuja', english: 'cakes' },
      { finnish: 'hinnat', english: 'prices' },
      { finnish: 'edulliset', english: 'affordable' },
      { finnish: 'auki', english: 'open' },
      { finnish: 'joka päivä', english: 'every day' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Missä kahvila on?',
        options: ['Espoon keskustassa', 'Helsingin keskustassa', 'Turun keskustassa'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Milloin kahvila avataan?',
        options: ['Tänään', 'Ensi maanantaina', 'Ensi sunnuntaina'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'Mihin aikaan kahvila on auki?',
        options: ['Kello 7-19', 'Kello 8-20', 'Kello 9-21'],
        correctAnswer: 1,
      },
    ],
    articleSource: 'selkouutiset',
  },
  {
    id: 'a1-news-2',
    title: 'Kirjasto on ilmainen',
    level: 'A1',
    topic: 'news',
    content: `Suomessa kirjastot ovat ilmaisia. Kaikki voivat lainata kirjoja. Tarvitset vain kirjastokortin.

Kirjastosta voi lainata kirjoja, lehtiä ja elokuvia. Siellä voi myös lukea ja opiskella. Kirjastoissa on tietokoneita.

Aukioloajat vaihtelevat. Monet kirjastot ovat auki iltaisin ja viikonloppuisin. Tervetuloa kirjastoon!`,
    vocabulary: [
      { finnish: 'kirjastot', english: 'libraries' },
      { finnish: 'ilmaisia', english: 'free (plural)' },
      { finnish: 'lainata', english: 'to borrow' },
      { finnish: 'kirjastokortin', english: 'library card' },
      { finnish: 'lehtiä', english: 'magazines' },
      { finnish: 'elokuvia', english: 'movies' },
      { finnish: 'opiskella', english: 'to study' },
      { finnish: 'tietokoneita', english: 'computers' },
      { finnish: 'aukioloajat', english: 'opening hours' },
      { finnish: 'vaihtelevat', english: 'vary' },
      { finnish: 'viikonloppuisin', english: 'on weekends' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Ovatko kirjastot ilmaisia Suomessa?',
        options: ['Eivät', 'Kyllä', 'Vain lapsille'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Mitä tarvitset lainataksesi kirjoja?',
        options: ['Rahaa', 'Kirjastokortin', 'Passin'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'Mitä kirjastosta voi lainata?',
        options: ['Vain kirjoja', 'Kirjoja, lehtiä ja elokuvia', 'Vain lehtiä'],
        correctAnswer: 1,
      },
    ],
    articleSource: 'selkouutiset',
  },

  // === FOOD & CULTURE ===
  {
    id: 'a1-food-1',
    title: 'Suomalainen ruoka',
    level: 'A1',
    topic: 'food',
    content: `Suomalainen ruoka on yksinkertaista ja hyvää. Suomalaiset syövät paljon leipää ja perunaa.

Kalakeitto on suosittu ruoka. Se on keittoa kalasta ja perunasta. Karjalanpiirakka on kuuluisa leivonnainen.

Suomalaiset juovat paljon kahvia. Suomi on yksi maailman suurimmista kahvinkuluttajista.`,
    vocabulary: [
      { finnish: 'yksinkertaista', english: 'simple' },
      { finnish: 'perunaa', english: 'potato' },
      { finnish: 'kalakeitto', english: 'fish soup' },
      { finnish: 'suosittu', english: 'popular' },
      { finnish: 'keittoa', english: 'soup' },
      { finnish: 'kalasta', english: 'from fish' },
      { finnish: 'Karjalanpiirakka', english: 'Karelian pie' },
      { finnish: 'leivonnainen', english: 'pastry' },
      { finnish: 'maailman', english: 'world\'s' },
      { finnish: 'kahvinkuluttajista', english: 'coffee consumers' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Millaista suomalainen ruoka on?',
        options: ['Monimutkaista', 'Yksinkertaista ja hyvää', 'Kallista'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Mikä on kalakeitto?',
        options: ['Keittoa kalasta ja perunasta', 'Salaatti', 'Jälkiruoka'],
        correctAnswer: 0,
      },
      {
        id: 'q3',
        question: 'Mitä suomalaiset juovat paljon?',
        options: ['Teetä', 'Maitoa', 'Kahvia'],
        correctAnswer: 2,
      },
    ],
    articleSource: 'selkouutiset',
  },
  {
    id: 'a1-hobby-1',
    title: 'Harrastukset Suomessa',
    level: 'A1',
    topic: 'hobbies',
    content: `Suomalaiset harrastavat paljon. Suositut harrastukset ovat liikunta ja ulkoilu.

Kesällä ihmiset pyöräilevät ja uivat. Talvella he hiihtävät ja luistelevat. Sauna on myös suosittu.

Monet lukevat kirjoja ja katsovat elokuvia. Suomessa pelataan myös paljon jääkiekkoa.`,
    vocabulary: [
      { finnish: 'harrastavat', english: 'have hobbies / do hobbies' },
      { finnish: 'harrastukset', english: 'hobbies' },
      { finnish: 'liikunta', english: 'exercise' },
      { finnish: 'ulkoilu', english: 'outdoor activities' },
      { finnish: 'pyöräilevät', english: 'they cycle' },
      { finnish: 'hiihtävät', english: 'they ski' },
      { finnish: 'luistelevat', english: 'they skate' },
      { finnish: 'sauna', english: 'sauna' },
      { finnish: 'pelataan', english: 'is played' },
      { finnish: 'jääkiekkoa', english: 'ice hockey' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Mitä ihmiset tekevät kesällä?',
        options: ['Hiihtävät ja luistelevat', 'Pyöräilevät ja uivat', 'Pelaavat jääkiekkoa'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Mitä ihmiset tekevät talvella?',
        options: ['Uivat', 'Hiihtävät ja luistelevat', 'Pyöräilevät'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'Mikä urheilulaji on suosittu Suomessa?',
        options: ['Jalkapallo', 'Tennis', 'Jääkiekko'],
        correctAnswer: 2,
      },
    ],
    articleSource: 'selkouutiset',
  },
];

// ============================================
// YLE NEWS ARTICLES - Real news from Yle
// Broken into smaller readable parts
// ============================================

export const YLE_NEWS_ARTICLES: YleArticle[] = [
  // Part 1: The Yard Description
  {
    id: 'yle-jouluvalot-1',
    title: 'Joulupiha Kokkolassa (osa 1/5)',
    level: 'B1',
    topic: 'joulu',
    content: `Kokkolan Hakalahdessa on talo, jonka joulupiha loistaa kauas.

Puissa ja pensaissa välkkyvät kymmenet eriväriset valoketjut. Viisimetrinen ilmatäytteinen kuusi hohtaa vihreänä. Pihan perällä seisovat parimetriset pukki ja poro. Katolla on valaistuja kuusia.`,
    vocabulary: [
      { finnish: 'joulupiha', english: 'Christmas yard' },
      { finnish: 'loistaa', english: 'shines/glows' },
      { finnish: 'kauas', english: 'far away' },
      { finnish: 'puissa', english: 'in the trees' },
      { finnish: 'pensaissa', english: 'in the bushes' },
      { finnish: 'välkkyvät', english: 'twinkle/flash' },
      { finnish: 'kymmenet', english: 'dozens' },
      { finnish: 'eriväriset', english: 'multicolored' },
      { finnish: 'valoketjut', english: 'string lights' },
      { finnish: 'viisimetrinen', english: 'five-meter' },
      { finnish: 'ilmatäytteinen', english: 'inflatable' },
      { finnish: 'hohtaa', english: 'glows' },
      { finnish: 'pihan perällä', english: 'at the back of the yard' },
      { finnish: 'parimetriset', english: 'two-meter tall' },
      { finnish: 'pukki', english: 'Santa Claus' },
      { finnish: 'poro', english: 'reindeer' },
      { finnish: 'valaistuja', english: 'illuminated' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Missä tämä talo on?',
        options: ['Helsingissä', 'Kokkolan Hakalahdessa', 'Tampereella'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Kuinka korkea ilmatäytteinen kuusi on?',
        options: ['Kolme metriä', 'Viisi metriä', 'Kymmenen metriä'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'Mitä pihan perällä on?',
        options: ['Autoja', 'Pukki ja poro', 'Lumiukkoja'],
        correctAnswer: 1,
      },
    ],
    articleSource: 'yle-news',
    originalUrl: 'https://yle.fi/a/74-20129847',
  },
  
  // Part 2: Who lives there and how it started
  {
    id: 'yle-jouluvalot-2',
    title: 'Joulupiha Kokkolassa (osa 2/5)',
    level: 'B1',
    topic: 'joulu',
    content: `Piha on kokkolalaisen Kristiina Klemolan käsialaa. Hän asuu talossa isänsä kanssa.

– Seitsemän vuotta sitten kysyin isältä, saanko laittaa muutaman jouluvalon pihalle. Lupa tuli ja sen jälkeen innostus on lähtenyt vähän käsistä, Klemola kertoo.`,
    vocabulary: [
      { finnish: 'käsialaa', english: 'handiwork (lit. handwriting)' },
      { finnish: 'asuu', english: 'lives' },
      { finnish: 'isänsä kanssa', english: 'with her father' },
      { finnish: 'seitsemän vuotta sitten', english: 'seven years ago' },
      { finnish: 'kysyin', english: 'I asked' },
      { finnish: 'saanko', english: 'may I / can I' },
      { finnish: 'muutaman', english: 'a few' },
      { finnish: 'lupa', english: 'permission' },
      { finnish: 'sen jälkeen', english: 'after that' },
      { finnish: 'innostus', english: 'enthusiasm' },
      { finnish: 'lähtenyt käsistä', english: 'gotten out of hand' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Kenen kanssa Kristiina asuu?',
        options: ['Äitinsä kanssa', 'Isänsä kanssa', 'Yksin'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Koska Kristiina aloitti jouluvalot?',
        options: ['Viisi vuotta sitten', 'Seitsemän vuotta sitten', 'Kymmenen vuotta sitten'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'Keneltä Kristiina kysyi lupaa?',
        options: ['Äidiltään', 'Naapurilta', 'Isältään'],
        correctAnswer: 2,
      },
    ],
    articleSource: 'yle-news',
    originalUrl: 'https://yle.fi/a/74-20129847',
  },
  
  // Part 3: Childhood memories
  {
    id: 'yle-jouluvalot-3',
    title: 'Joulupiha Kokkolassa (osa 3/5)',
    level: 'B1',
    topic: 'joulu',
    content: `Klemola innostui jouluvaloista jo pienenä. Lapsuuden perheessä panostettiin jouluun ja laitettiin paljon valoja. Perheellä oli myös tapana ajella katsomassa jouluvaloja.

– Yhdessä pihassa oli pomppivia pupuja ja poroja ja katolla oli aurinko. Se piha oli kohokohta, joka piti aina nähdä, Klemola muistelee.`,
    vocabulary: [
      { finnish: 'innostui', english: 'got excited about' },
      { finnish: 'pienenä', english: 'as a child (lit. small)' },
      { finnish: 'lapsuuden', english: 'childhood\'s' },
      { finnish: 'panostettiin', english: 'was invested in' },
      { finnish: 'laitettiin', english: 'was put up' },
      { finnish: 'tapana', english: 'habit/custom' },
      { finnish: 'ajella', english: 'to drive around' },
      { finnish: 'katsomassa', english: 'to look at/watch' },
      { finnish: 'pomppivia', english: 'bouncing' },
      { finnish: 'pupuja', english: 'bunnies' },
      { finnish: 'kohokohta', english: 'highlight' },
      { finnish: 'piti aina nähdä', english: 'had to always see' },
      { finnish: 'muistelee', english: 'remembers/recalls' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Milloin Kristiina innostui jouluvaloista?',
        options: ['Aikuisena', 'Pienenä/lapsena', 'Teini-ikäisenä'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Mitä Kristiinan perhe teki jouluisin?',
        options: ['He matkustivat ulkomaille', 'He ajelivat katsomassa jouluvaloja', 'He nukkuivat paljon'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'Mikä oli kohokohta, jonka piti aina nähdä?',
        options: ['Kauppa jouluvaloineen', 'Piha, jossa oli pomppivia pupuja ja poroja', 'Kirkko'],
        correctAnswer: 1,
      },
    ],
    articleSource: 'yle-news',
    originalUrl: 'https://yle.fi/a/74-20129847',
  },
  
  // Part 4: Budget and shopping
  {
    id: 'yle-jouluvalot-4',
    title: 'Joulupiha Kokkolassa (osa 4/5)',
    level: 'B1',
    topic: 'joulu',
    content: `Omaan pihaan Klemola hakee ideoita netistä. Koristeet hän ostaa alennusmyynnistä tai kirpputoreilta. Joka vuosi tulee jotain uutta.

– Yli satasen normihinta on todella kallis varsinkin meidän budjetille. Yhdeksänkymmentä prosenttia noista valoista on hommattu alennuksella.

Seuraava haave on saada pihalle teksti, jossa lukee hyvää joulua.`,
    vocabulary: [
      { finnish: 'omaan pihaan', english: 'for her own yard' },
      { finnish: 'hakee ideoita', english: 'looks for ideas' },
      { finnish: 'netistä', english: 'from the internet' },
      { finnish: 'koristeet', english: 'decorations' },
      { finnish: 'alennusmyynti', english: 'discount sale' },
      { finnish: 'kirpputori', english: 'flea market' },
      { finnish: 'joka vuosi', english: 'every year' },
      { finnish: 'yli satasen', english: 'over a hundred (euros)' },
      { finnish: 'normihinta', english: 'normal price' },
      { finnish: 'varsinkin', english: 'especially' },
      { finnish: 'budjetti', english: 'budget' },
      { finnish: 'hommattu', english: 'obtained/gotten' },
      { finnish: 'alennuksella', english: 'at a discount' },
      { finnish: 'haave', english: 'dream/wish' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Mistä Kristiina hakee ideoita?',
        options: ['Lehdistä', 'Netistä', 'Naapureilta'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Mistä hän ostaa koristeet?',
        options: ['Uutena kaupasta', 'Alennusmyynnistä ja kirpputoreilta', 'Ulkomailta'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'Mikä on Kristiinan seuraava haave?',
        options: ['Lisää poroja', 'Teksti "hyvää joulua"', 'Isompi kuusi'],
        correctAnswer: 1,
      },
    ],
    articleSource: 'yle-news',
    originalUrl: 'https://yle.fi/a/74-20129847',
  },
  
  // Part 5: Setup and safety
  {
    id: 'yle-jouluvalot-5',
    title: 'Joulupiha Kokkolassa (osa 5/5)',
    level: 'B1',
    topic: 'joulu',
    content: `Klemolan joulupihan valot syttyvät lokakuussa. Niiden laittaminen kestää pari viikkoa, vaikka suurin osa on paikoillaan ympäri vuoden.

– Johtojen määrä on aika valtava. Kun tuulee ja puskat kasvavat, niitä joutuu vähän korjailemaan.

Valot sammutetaan fiiliksen mukaan tammikuussa.

Kristiina toivoo, että ihmiset saisivat valoista iloa, mutta ei halua heitä itsekseen pihalle seikkailemaan.

– Pihalla menee johtoja ja naruja, joita ei näe pimeässä. Ei ole kenellekään kivaa, jos niihin kompastuu.

Klemolan mukaan jouluvalojen kuvaaminen kadulta on ok ja pihallekin voi tulla, jos isäntäväki on paikalla opastamassa.`,
    vocabulary: [
      { finnish: 'syttyvät', english: 'turn on/light up' },
      { finnish: 'lokakuussa', english: 'in October' },
      { finnish: 'laittaminen', english: 'setting up' },
      { finnish: 'kestää', english: 'takes (time)' },
      { finnish: 'pari viikkoa', english: 'a couple of weeks' },
      { finnish: 'paikoillaan', english: 'in place' },
      { finnish: 'ympäri vuoden', english: 'all year round' },
      { finnish: 'johtojen määrä', english: 'the amount of cables' },
      { finnish: 'valtava', english: 'huge/enormous' },
      { finnish: 'puskat', english: 'bushes' },
      { finnish: 'korjailemaan', english: 'to fix/repair' },
      { finnish: 'sammutetaan', english: 'are turned off' },
      { finnish: 'fiiliksen mukaan', english: 'depending on the mood' },
      { finnish: 'tammikuussa', english: 'in January' },
      { finnish: 'toivoo', english: 'hopes' },
      { finnish: 'iloa', english: 'joy' },
      { finnish: 'seikkailemaan', english: 'to wander/explore' },
      { finnish: 'naruja', english: 'ropes/cords' },
      { finnish: 'pimeässä', english: 'in the dark' },
      { finnish: 'kompastuu', english: 'trips/stumbles' },
      { finnish: 'kuvaaminen', english: 'photographing' },
      { finnish: 'isäntäväki', english: 'hosts/household' },
      { finnish: 'opastamassa', english: 'guiding' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Milloin jouluvalot syttyvät?',
        options: ['Marraskuussa', 'Lokakuussa', 'Joulukuussa'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Miksi Kristiina ei halua ihmisiä pihalle yksin?',
        options: ['Koska valot ovat kalliita', 'Koska johtoja ei näe pimeässä', 'Koska naapurit valittavat'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'Milloin valot sammutetaan?',
        options: ['Jouluna', 'Tammikuussa', 'Helmikuussa'],
        correctAnswer: 1,
      },
    ],
    articleSource: 'yle-news',
    originalUrl: 'https://yle.fi/a/74-20129847',
  },
];

// Get all simplified articles (Selkouutiset-style)
export function getAllArticles(): YleArticle[] {
  return YLE_ARTICLES;
}

// Get articles by level (simplified)
export function getArticlesByLevel(level: ArticleLevel): YleArticle[] {
  return YLE_ARTICLES.filter(a => a.level === level);
}

// Get Yle News articles (real news)
export function getYleNewsArticles(): YleArticle[] {
  return YLE_NEWS_ARTICLES;
}

// Get articles by topic
export function getArticlesByTopic(topic: string): YleArticle[] {
  return [...YLE_ARTICLES, ...YLE_NEWS_ARTICLES].filter(a => a.topic === topic);
}

// Get article by ID (searches both collections)
export function getArticleById(id: string): YleArticle | undefined {
  return YLE_ARTICLES.find(a => a.id === id) || YLE_NEWS_ARTICLES.find(a => a.id === id);
}

// Get article count by level
export function getArticleCountByLevel(level: ArticleLevel): number {
  return YLE_ARTICLES.filter(a => a.level === level).length;
}

// Get Yle News article count
export function getYleNewsArticleCount(): number {
  return YLE_NEWS_ARTICLES.length;
}

// Get all unique topics
export function getAllTopics(): string[] {
  return [...new Set([...YLE_ARTICLES, ...YLE_NEWS_ARTICLES].map(a => a.topic))];
}
