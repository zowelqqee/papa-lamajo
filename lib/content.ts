/**
 * Единый источник контента «Папа Ламаджо».
 * Цены, вес, часы, телефон и адрес правятся здесь — разметку трогать не нужно.
 */

export const restaurant = {
  name: "ПАПА ЛАМАДЖО",
  nameCased: "Папа Ламаджо",
  kind: "СЕМЕЙНОЕ КАФЕ",
  cuisine: "Армянская и кавказская кухня",
  edition: "ИСТРИНСКИЙ ВЫПУСК",
  issue: "ВЫПУСК № 32",
  region: "МОСКОВСКАЯ ОБЛАСТЬ · М.О. ИСТРА",
  hours: "ПН 12:00—20:00 · ВТ—СБ 9:00—22:00 · ВС 11:00—20:00",
  hoursLine: "ПН 12:00—20:00 · ВТ—СБ 9:00—22:00 · ВС 11:00—20:00",
  phone: "+7 977 529-97-97",
  phoneHref: "tel:+79775299797",
  rating: "5.0",
  address: {
    region: "МОСКОВСКАЯ ОБЛАСТЬ",
    district: "М.О. ИСТРА, Д. КРЮЧКОВО",
    street: "РОДНИКОВАЯ УЛИЦА, 32, ЭТАЖ 1",
    short: "д. Крючково, Родниковая, 32",
    footer: "РОДНИКОВАЯ, 32 · КРЮЧКОВО · ИСТРА",
  },
  /**
   * Печатная марка кафе. Положите файл логотипа в /public
   * (например "/logo.png") и укажите путь — рамка и размеры уже готовы.
   * Пока пути нет, в рамке стоит наборная монограмма «ПЛ».
   */
  logo: {
    src: "/logo.png",
    alt: "Логотип кафе «Папа Ламаджо»",
  },
  maps: "https://yandex.ru/maps/org/papa_lamadzho/45411707039/",
  /** Реальная ссылка на доставку не подтверждена — ведём на карточку организации. */
  delivery: "https://yandex.ru/maps/org/papa_lamadzho/45411707039/",
  deliveryNote: "ЧЕРЕЗ КАРТОЧКУ НА ЯНДЕКС КАРТАХ",
  deliveryMinimum: "МИНИМАЛЬНЫЙ ЗАКАЗ 500 ₽",
} as const;

export const hero = {
  label: "АРМЯНСКАЯ И КАВКАЗСКАЯ КУХНЯ · КРЮЧКОВО",
  headline: "ПАПА ЛАМАДЖО",
  sub: "Ламаджо, шашлык и люля-кебаб. Готовим горячее по будням и выходным — по расписанию.",
  byline: "КУХНЯ · КРЮЧКОВО",
  figure: "КАФЕ «ПАПА ЛАМАДЖО»",
  alt: "Кафе «Папа Ламаджо»",
  /** Главный снимок первого экрана. Путь к файлу в /public. */
  src: "/images/интерьер 2.jpeg",
};

export const cta = {
  menu: "СМОТРЕТЬ МЕНЮ",
  route: "ПОСТРОИТЬ МАРШРУТ",
  phone: "ПОЗВОНИТЬ",
  delivery: "ЗАКАЗАТЬ ДОСТАВКУ",
  reviews: "ЧИТАТЬ ОТЗЫВЫ",
  dish: "ЧИТАТЬ О БЛЮДЕ",
} as const;

export const nav = [
  { label: "ГЛАВНАЯ", href: "#top" },
  { label: "МЕНЮ", href: "#menu" },
  { label: "О КАФЕ", href: "#about" },
  { label: "ГАЛЕРЕЯ", href: "#gallery" },
  { label: "ОТЗЫВЫ", href: "#reviews" },
  { label: "КОНТАКТЫ", href: "#contacts" },
] as const;

export const heroFacts = [
  { term: "РЕЖИМ РАБОТЫ", value: "ПН 12:00—20:00 · ВТ—СБ 9:00—22:00 · ВС 11:00—20:00" },
  { term: "АДРЕС", value: "д. Крючково, Родниковая, 32" },
  { term: "ТЕЛЕФОН", value: "+7 977 529-97-97" },
  { term: "РЕЙТИНГ НА ЯНДЕКС КАРТАХ", value: "5.0" },
] as const;

export const tickerItems = [
  { text: "ЛАМАДЖО — 200 ₽", tag: "ГОРЯЧЕЕ" },
  { text: "ЛАМАДЖО С СЫРОМ — 250 ₽", tag: null },
  { text: "ЛЮЛЯ-КЕБАБ ОТ 450 ₽", tag: "ГОРЯЧЕЕ" },
  { text: "ШАШЛЫК ОТ 500 ₽", tag: null },
  { text: "ПН 12:00—20:00 · ВТ—СБ 9:00—22:00 · ВС 11:00—20:00", tag: "РЕЖИМ" },
  { text: "КРЮЧКОВО · РОДНИКОВАЯ, 32", tag: null },
] as const;

/* ─────────────────────────────────────────────────────────────
   МЕНЮ — единственный источник блюд.
   Из него собираются: прайс-лист, «Сегодня в номере»,
   бегущая строка и отдельная статья на каждое блюдо.
   ───────────────────────────────────────────────────────────── */

export type MenuItem = {
  /** Адрес статьи: /menu/<slug>. Менять только вместе со ссылками. */
  slug: string;
  name: string;
  /** Короткое имя для заголовка статьи, если в меню длинная строка с вариантами. */
  short?: string;
  /** Варианты вкуса из той же строки меню. */
  variants?: string[];
  weight?: string;
  price: string;
  /**
   * Утверждённая редакционная строка — лид статьи и подпись в «Сегодня в номере».
   * Пусто — статья соберётся из проверенных данных без выдуманных подробностей.
   */
  lead?: string;
  /**
   * Описание позиции для карточки блюда: аппетитный текст для меню.
   * Конкретный состав и особенности приготовления добавляются по данным кафе.
   */
  description?: string;
  /** Путь к снимку блюда в /public, например "/photo/lamadzho.jpg". */
  src?: string;
  /** Точка кадрирования фотографии внутри рамки. */
  imageClassName?: string;
};

export type MenuGroup = {
  slug: string;
  title: string;
  /** Подзаголовок раздела в статье. Только проверенные факты. */
  summary: string;
  /** Готовится ли раздел на кухне после заказа (для напитков — нет). */
  cooked: boolean;
  items: MenuItem[];
};

export const menu: MenuGroup[] = [
  {
    slug: "lamadzho-shaurma",
    title: "ЛАМАДЖО И ШАУРМА",
    summary:
      "Ламаджо — блюдо, которое дало кафе имя. В этом же разделе шаурма с курицей, свининой и говядиной.",
    cooked: true,
    items: [
      {
        slug: "lamadzho",
        name: "Ламаджо",
        weight: "150 г",
        price: "150 ₽",
        lead: "Тонкая основа с мясной начинкой — горячая визитная карточка «Папы Ламаджо».",
        description:
          "Тот самый вкус, с которого хочется начать знакомство с кафе: тонкая основа, щедрая мясная начинка и выразительный, по-настоящему домашний характер. Ламаджо хорош и как быстрый сытный перекус, и как главное блюдо, когда хочется горячего без долгих ожиданий.",
        src: "/images/ламанджо.JPG",
      },
      {
        slug: "lamadzho-s-syrom",
        name: "Ламаджо с сыром",
        weight: "200 г",
        price: "200 ₽",
        description:
          "Любимое ламаджо в более нежном и насыщенном звучании. Тонкая основа, мясная начинка и сыр создают особенно аппетитное сочетание: горячее, тянущееся, с ярким вкусом и той самой корочкой, ради которой хочется взять ещё кусочек.",
        src: "/images/ламанджо с сыром.JPG",
      },
      {
        slug: "shaurma-kurinaya",
        name: "Фирменная с курицей",
        weight: "400 г",
        price: "350 ₽",
        src: "/images/шаурма фирменная (все виды).jpeg",
        description:
          "Большая, горячая и основательная шаурма с курицей — когда хочется съесть что-то по-настоящему сытное. Удобный формат для обеда, дороги или вечера дома: берите в руки и наслаждайтесь насыщенным вкусом без лишних церемоний.",
      },
      {
        slug: "shaurma-svinaya",
        name: "Фирменная со свининой",
        weight: "400 г",
        price: "350 ₽",
        src: "/images/шаурма фирменная (все виды).jpeg",
        description:
          "Свиная шаурма для тех, кто выбирает выразительный мясной вкус и щедрую порцию. Горячая, сочная по впечатлению и очень сытная — тот самый вариант, который легко превращает обычный перекус в полноценный обед.",
      },
      {
        slug: "shaurma-govyazhya",
        name: "Фирменная с говядиной",
        weight: "400 г",
        price: "450 ₽",
        src: "/images/шаурма фирменная (все виды).jpeg",
        description:
          "Шаурма с говядиной — выбор для серьёзного аппетита. В большой порции собран яркий мясной характер и удобство любимого формата: вкусно съесть на месте, взять с собой или заказать к домашнему столу.",
      },
      {
        slug: "shaurma-klassicheskaya-kurinaya",
        name: "Классическая с курицей",
        price: "300 ₽",
        src: "/images/шаурма классическая (все виды).jpeg",
        imageClassName: "object-[center_35%]",
      },
      {
        slug: "shaurma-klassicheskaya-svinaya",
        name: "Классическая со свининой",
        price: "300 ₽",
        src: "/images/шаурма классическая (все виды).jpeg",
        imageClassName: "object-[center_35%]",
      },
      {
        slug: "shaurma-klassicheskaya-govyazhya",
        name: "Классическая с говядиной",
        price: "400 ₽",
        src: "/images/шаурма классическая (все виды).jpeg",
        imageClassName: "object-[center_35%]",
      },
      {
        slug: "shaurma-syrnaya-kurinaya",
        name: "Сырная с курицей",
        price: "300 ₽",
        src: "/images/шаурма сырная (все виды).jpeg",
        imageClassName: "object-[center_44%]",
      },
      {
        slug: "shaurma-syrnaya-svinaya",
        name: "Сырная со свининой",
        price: "300 ₽",
        src: "/images/шаурма сырная (все виды).jpeg",
        imageClassName: "object-[center_44%]",
      },
      {
        slug: "shaurma-syrnaya-govyazhya",
        name: "Сырная с говядиной",
        price: "400 ₽",
        src: "/images/шаурма сырная (все виды).jpeg",
        imageClassName: "object-[center_44%]",
      },
    ],
  },
  {
    slug: "mangal",
    title: "ГОРЯЧЕЕ НА УГЛЯХ",
    summary:
      "Шашлык и люля-кебаб на открытом огне: курица, свинина, говядина и баранина.",
    cooked: true,
    items: [
      {
        slug: "shashlyk-kurinyy",
        name: "Куриное филе",
        price: "500 ₽",
        description:
          "Куриный шашлык с мангала — аромат открытого огня, румяная поверхность и сочное настроение каждого кусочка. Лёгкий по характеру, но щедрый по вкусу вариант для тех, кто хочет настоящего шашлыка без лишней тяжести.",
      },
      {
        slug: "shashlyk-svinoy",
        name: "Из свиной шейки",
        price: "650 ₽",
        description:
          "Свиной шашлык — классика мангала, ради которой собираются за столом. Горячие кусочки с аппетитной поджаренной корочкой, ароматом углей и насыщенным мясным вкусом: сытно, ярко и особенно хорошо в компании близких.",
        src: "/images/шашлык из свиной шейки.JPG",
      },
      {
        slug: "shashlyk-baraniy",
        name: "Мякоть баранины",
        price: "1100 ₽",
        lead: "Баранина с мангала — выразительное горячее для тех, кто выбирает глубокий мясной вкус.",
        description:
          "Шашлык из баранины — главный герой мангала с богатым, узнаваемым характером. Аромат углей, румяная корочка и насыщенный вкус делают эту порцию особенно выразительной: заказывайте, когда хочется устроить себе полноценный праздник мяса.",
        src: "/images/мякоть баранины.JPG",
      },
      {
        slug: "koreyka-baraniny",
        name: "Корейка баранины",
        price: "1200 ₽",
        src: "/images/корейка баранины.JPG",
      },
      {
        slug: "kurinye-krylya",
        name: "Куриные крылья",
        price: "450 ₽",
        src: "/images/куриные крылья.JPG",
      },
      {
        slug: "kurinaya-golen",
        name: "Куриная голень",
        price: "450 ₽",
      },
      {
        slug: "lyulya-kebab-kurinyy",
        name: "Люля-кебаб куриный",
        weight: "200 г",
        price: "450 ₽",
        description:
          "Куриный люля-кебаб — горячая порция с нежным характером и ароматом мангала. Удобный, сытный и очень аппетитный выбор: подойдёт для быстрого обеда, семейного ужина или как часть большого заказа на компанию.",
        src: "/images/люля-кебаб из курицы.JPG",
      },
      {
        slug: "lyulya-kebab-govyazhiy",
        name: "Люля-кебаб говяжий",
        weight: "200 г",
        price: "550 ₽",
        lead: "Говядина и открытый огонь — насыщенный люля-кебаб с выразительным мясным характером.",
        description:
          "Люля-кебаб из говядины создан для настоящего аппетита. Мясной вкус, жар открытого огня и аппетитная поджаренная поверхность складываются в блюдо, которое хочется есть не спеша — и обязательно дополнить чем-то ещё из мангального меню.",
        src: "/images/люля-кебаб из говядины.JPG",
      },
      {
        slug: "lyulya-kebab-baraniy",
        name: "Люля-кебаб из баранины",
        price: "450 ₽",
      },
    ],
  },
  {
    slug: "na-uglyah",
    title: "ОВОЩИ",
    summary: "Картофель, грибы, овощи и ассорти зелени с сыром.",
    cooked: true,
    items: [
      {
        slug: "kartofel-na-uglyah",
        name: "Картофель на мангале",
        weight: "250 г",
        price: "300 ₽",
        description:
          "Картофель на углях — простой продукт в своей самой аппетитной роли. Дымный аромат, золотистая поверхность и горячая, уютная подача делают его отличным самостоятельным перекусом и идеальным спутником к блюдам с мангала.",
        src: "/images/картофель на мангале.JPG",
      },
      {
        slug: "griby-na-uglyah",
        name: "Грибы на мангале",
        weight: "200 г",
        price: "300 ₽",
        description:
          "Грибы на углях — ароматное дополнение с ярким вкусом огня. Горячие, румяные и очень аппетитные, они добавят заказу сочности и разнообразия: хороши как лёгкое горячее или как гарнир к шашлыку и люля-кебабу.",
        src: "/images/грибы на мангале.JPG",
      },
      {
        slug: "ovoshchi-na-uglyah",
        name: "Овощи на мангале",
        weight: "350 г",
        price: "350 ₽",
        description:
          "Овощи на углях — красочная горячая порция с ароматом мангала. Естественная яркость овощей раскрывается в жаре углей, поэтому блюдо получается одновременно лёгким, выразительным и отлично дополняет любой мясной заказ.",
        src: "/images/овощи на мангале.JPG",
      },
      {
        slug: "assorti-zelen-i-syr",
        name: "Ассорти зелень и сыр",
        price: "350 ₽",
        src: "/images/ассорти зелень и сыр.JPG",
      },
    ],
  },
  {
    slug: "napitki",
    title: "НАПИТКИ",
    summary:
      "Лимонады Dvin, соки Yan, компоты, чай и кофе.",
    cooked: false,
    items: [
      {
        slug: "limonad-dvin",
        name: "Лимонад Dvin: виноград / груша / тархун / барбарис / фейхоа",
        short: "Лимонад Dvin",
        variants: ["виноград", "груша", "тархун", "барбарис", "фейхоа"],
        weight: "500 мл",
        price: "150 ₽",
        src: "/images/лимонады.JPG",
        imageClassName: "object-[center_35%]",
        description:
          "Освежающий лимонад Dvin для яркого завершения трапезы или прохладной паузы в течение дня. Выберите настроение по вкусу: виноград, груша, тархун, барбарис или фейхоа — каждый вариант по-своему выразительный.",
      },
      {
        slug: "sok-lyubimyy",
        name: "Соки Yan",
        price: "400 ₽",
        src: "/images/соки.JPG",
        description:
          "Соки Yan — яркое фруктовое дополнение к горячим блюдам и выпечке. Берите на компанию или к обеду, когда хочется добавить трапезе сочный, освежающий акцент.",
      },
      {
        slug: "sok-maaza",
        name: "Компоты",
        price: "400 ₽",
        src: "/images/соки.JPG",
        description:
          "Компоты — домашний, освежающий штрих к сытному заказу. Они особенно хорошо дополняют блюда с мангала, горячую выпечку и семейный обед.",
      },
      {
        slug: "chay-zelenyy",
        name: "Чай: зелёный / чебрец / молочный улун / мята",
        short: "Чай",
        variants: ["зелёный", "чебрец", "молочный улун", "мята"],
        price: "350 ₽",
        src: "/images/green-tea.jpg",
      },
      {
        slug: "chay-chernyy",
        name: "Чай: чёрный / чёрный с бергамотом / фруктовый",
        short: "Чай",
        variants: ["чёрный", "чёрный с бергамотом", "фруктовый"],
        price: "350 ₽",
        src: "/images/black-tea.jpg",
      },
      {
        slug: "kofe",
        name: "Кофе: в турке / эспрессо / двойной эспрессо / капучино / американо / латте",
        short: "Кофе",
        variants: ["в турке", "эспрессо", "двойной эспрессо", "капучино", "американо", "латте"],
        price: "200 ₽",
        src: "/images/кофе.JPG",
        imageClassName: "object-[center_35%]",
      },
    ],
  },
  {
    slug: "vypechka",
    title: "ВЫПЕЧКА",
    summary: "Горячая выпечка, хачапури, самса и пицца.",
    cooked: true,
    items: [
      { slug: "hachapuri-megrelski", name: "Хачапури по-мегрельски", price: "800 ₽", src: "/images/хачапури по-мегрельски.JPG" },
      { slug: "hachapuri-sloenoe", name: "Хачапури из слоёного теста", price: "200 ₽", src: "/images/хачапури из слоёного теста.JPG" },
      { slug: "samsa-myaso", name: "Самса с мясом", price: "150 ₽", src: "/images/самса с мясом.JPG" },
      { slug: "samsa-kartofel-syr", name: "Самса с картошкой и сыром", price: "150 ₽", src: "/images/самса с картошкой и сыром.JPG" },
      { slug: "sosiska-v-teste", name: "Сосиска в тесте", price: "150 ₽", src: "/images/сосиска в тесте.JPG" },
      { slug: "hachapuri-adzharski", name: "Хачапури по-аджарски", price: "500 ₽", src: "/images/хачапури по-аджарски.JPG" },
      { slug: "pizza-vetchina-griby", name: "Пицца с ветчиной и грибами", price: "150 ₽", src: "/images/пицца с ветчиной и грибами.JPG" },
      { slug: "pizza-margarita", name: "Пицца «Маргарита»", price: "150 ₽", src: "/images/пицца маргарита.JPG" },
      { slug: "pizza-pepperoni", name: "Пицца «Пепперони»", price: "150 ₽", src: "/images/пицца пепперони.JPG" },
      { slug: "pizza-papy", name: "Пицца по рецепту папы", price: "150 ₽", src: "/images/пицца по рецепту папы.JPG" },
    ],
  },
  {
    slug: "deserty",
    title: "ДЕСЕРТЫ",
    summary: "Сладкая выпечка и десерты к чаю или кофе.",
    cooked: true,
    items: [
      { slug: "pahlava", name: "Пахлава", price: "250 ₽", src: "/images/пахлава.JPG" },
      { slug: "mikado", name: "Микадо", price: "250 ₽", src: "/images/микадо.JPG" },
      { slug: "pirog-tvorog", name: "Песочный пирог с творогом", price: "250 ₽", src: "/images/песочный пиорг с творогом.JPG" },
      { slug: "sinabon", name: "Синабон", price: "200 ₽", src: "/images/синабон.JPG" },
      { slug: "napoleon", name: "Наполеон", price: "250 ₽", src: "/images/наполеон.JPG" },
      {
        slug: "varenya",
        name: "Варенья",
        price: "400 ₽",
        src: "/images/варенья.JPG",
        imageClassName: "object-[center_35%]",
      },
    ],
  },
  {
    slug: "salaty",
    title: "САЛАТЫ",
    summary: "Свежие салаты к горячему или как самостоятельная лёгкая позиция.",
    cooked: true,
    items: [
      { slug: "cezar-kurica", name: "Цезарь с курицей", price: "400 ₽", src: "/images/цезарь с курицей.JPG" },
      { slug: "krabovyy-salat", name: "Крабовый салат", price: "350 ₽", src: "/images/крабовый салат.JPG" },
      { slug: "letniy-salat", name: "Летний салат", price: "350 ₽", src: "/images/летний салат.JPG" },
      { slug: "grecheskiy-salat", name: "Греческий салат", price: "400 ₽", src: "/images/греческий салат.JPG" },
    ],
  },
  {
    slug: "goryachie-blyuda",
    title: "ГОРЯЧИЕ БЛЮДА",
    summary: "Сытные горячие блюда для полноценного обеда.",
    cooked: true,
    items: [
      { slug: "tolma", name: "Толма", price: "500 ₽", src: "/images/толма.JPG" },
      { slug: "plov", name: "Плов", price: "400 ₽", src: "/images/плов.JPG" },
      { slug: "pyure-kotleta", name: "Картофельное пюре с котлетой", price: "400 ₽", src: "/images/пюре с котлетой.JPG" },
      { slug: "steyk-semgi", name: "Стейк из сёмги на углях", price: "300 ₽", src: "/images/стейк семги на углях.JPG" },
    ],
  },
  {
    slug: "supy",
    title: "СУПЫ",
    summary: "Горячие супы для уютного и сытного обеда.",
    cooked: true,
    items: [
      { slug: "borsch", name: "Борщ", price: "400 ₽", src: "/images/борщ.JPG" },
      { slug: "harcho", name: "Харчо", price: "400 ₽", src: "/images/харчо.JPG" },
      { slug: "lagman", name: "Лагман", price: "400 ₽", src: "/images/лагман.JPG" },
      { slug: "solyanka", name: "Солянка", price: "400 ₽", src: "/images/солянка.JPG" },
    ],
  },
  {
    slug: "hleb",
    title: "ХЛЕБ",
    summary: "Хлебные позиции к супам, мангалу и горячим блюдам.",
    cooked: true,
    items: [
      { slug: "matnakash", name: "Матнакаш", price: "100 ₽", src: "/images/матнакаш.JPG" },
      { slug: "armyanskiy-lavash", name: "Армянский лаваш", price: "100 ₽", src: "/images/армянский лаваш.JPG" },
    ],
  },
];

export const menuNote =
  "ЦЕНЫ УКАЗАНЫ ПО ОТКРЫТОМУ МЕНЮ ДОСТАВКИ И МОГУТ МЕНЯТЬСЯ. УТОЧНЯЙТЕ ПРИ ЗАКАЗЕ.";

/** Блюда «Сегодня в номере» — ссылками на позиции меню, без дублирования цен. */
export const featuredSlugs = [
  "lamadzho",
  "shashlyk-baraniy",
  "lyulya-kebab-govyazhiy",
] as const;

/* ─────────────────────────────────────────────────────────────
   Выборки по меню
   ───────────────────────────────────────────────────────────── */

export type ResolvedDish = {
  item: MenuItem;
  group: MenuGroup;
  href: string;
};

/** Плоский список всех блюд в порядке вёрстки меню. */
export const allDishes: ResolvedDish[] = menu.flatMap((group) =>
  group.items.map((item) => ({
    item,
    group,
    href: `/menu/${item.slug}`,
  })),
);

export function findDish(slug: string): ResolvedDish | undefined {
  return allDishes.find((dish) => dish.item.slug === slug);
}

/** Соседние материалы для навигации «предыдущее / следующее». */
export function dishNeighbours(slug: string) {
  const index = allDishes.findIndex((dish) => dish.item.slug === slug);
  return {
    previous: index > 0 ? allDishes[index - 1] : undefined,
    next: index >= 0 && index < allDishes.length - 1 ? allDishes[index + 1] : undefined,
  };
}

export const featuredDishes: ResolvedDish[] = featuredSlugs
  .map((slug) => findDish(slug))
  .filter((dish): dish is ResolvedDish => Boolean(dish));

/* ─────────────────────────────────────────────────────────────
   Остальные разделы страницы
   ───────────────────────────────────────────────────────────── */

export const process = [
  {
    step: "01",
    title: "ВЫБИРАЕТЕ",
    body: "Ламаджо, шашлык, люля-кебаб, шаурму или овощи на углях.",
  },
  {
    step: "02",
    title: "ГОТОВИМ",
    body: "Горячие блюда собираются после заказа.",
  },
  {
    step: "03",
    title: "ЗАБИРАЕТЕ ИЛИ ЗАКАЗЫВАЕТЕ",
    body: "Позвоните в кафе или перейдите к доставке.",
  },
] as const;

export const about = {
  label: "МЕСТНАЯ ХРОНИКА",
  headline: "КАФЕ В КРЮЧКОВО",
  body: "«Папа Ламаджо» — семейное кафе на Родниковой улице в деревне Крючково. В центре меню — ламаджо, шашлык, люля-кебаб, шаурма и овощи на углях. Кафе работает по графику: понедельник — с 12:00 до 20:00, вторник–суббота — с 9:00 до 22:00, воскресенье — с 11:00 до 20:00; можно приехать на место или оформить доставку.",
  figure: "КАФЕ НА РОДНИКОВОЙ",
  alt: "Кафе «Папа Ламаджо» на Родниковой улице",
  src: "/images/интерьер 3.jpeg",
};

export type GalleryItem = {
  caption: string;
  alt: string;
  span: string;
  ratio: string;
  src?: string;
};

export const gallery: GalleryItem[] = [
  {
    caption: "ЛАМАДЖО",
    alt: "Ламаджо на подаче",
    span: "lg:col-span-7",
    ratio: "aspect-[16/9]",
    src: "/images/ламанджо.JPG",
  },
  {
    caption: "ЗАЛ КАФЕ",
    alt: "Зал кафе «Папа Ламаджо»",
    span: "lg:col-span-4",
    ratio: "aspect-[4/5]",
    src: "/images/интерьер 1.jpeg",
  },
  {
    caption: "ПОДАЧА",
    alt: "Подача блюд",
    span: "lg:col-span-4",
    ratio: "aspect-[1/1]",
    src: "/images/ассорти зелень и сыр.JPG",
  },
  {
    caption: "ОВОЩИ НА УГЛЯХ",
    alt: "Овощи на углях",
    span: "lg:col-span-4",
    ratio: "aspect-[4/5]",
    src: "/images/овощи на мангале.JPG",
  },
  {
    caption: "ГОРЯЧЕЕ ИЗ МЕНЮ",
    alt: "Ламаджо с сыром",
    span: "lg:col-span-12",
    ratio: "aspect-[21/9]",
    src: "/images/ламанджо с сыром.JPG",
  },
];
