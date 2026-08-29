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
    src: undefined as string | undefined,
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
  figure: "ФИГ. 01 — ЛАМАДЖО И БЛЮДА С МАНГАЛА",
  alt: "Ламаджо и блюда с мангала",
  /** Главный снимок первого экрана. Путь к файлу в /public. */
  src: undefined as string | undefined,
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
  { text: "ЛЮЛЯ-КЕБАБ ОТ 450 ₽", tag: "МАНГАЛ" },
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
  weight: string;
  price: string;
  /**
   * Утверждённая редакционная строка — лид статьи и подпись в «Сегодня в номере».
   * Пусто — статья соберётся из проверенных данных без выдуманных подробностей.
   */
  lead?: string;
  /**
   * Описание от кафе: состав, подача, особенности.
   * Заполняется только со слов кафе. Пусто — на странице стоит честная пометка.
   */
  description?: string;
  /** Путь к снимку блюда в /public, например "/photo/lamadzho.jpg". */
  src?: string;
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
        price: "200 ₽",
        lead: "Тонкая основа и мясная начинка. Главное блюдо, которое дало кафе имя.",
        src: "/images/ламанджо.JPG",
      },
      {
        slug: "lamadzho-s-syrom",
        name: "Ламаджо с сыром",
        weight: "200 г",
        price: "250 ₽",
        src: "/images/ламанджо с сыром.JPG",
      },
      {
        slug: "shaurma-kurinaya",
        name: "Шаурма куриная",
        weight: "400 г",
        price: "350 ₽",
      },
      {
        slug: "shaurma-svinaya",
        name: "Шаурма свиная",
        weight: "400 г",
        price: "350 ₽",
      },
      {
        slug: "shaurma-govyazhya",
        name: "Шаурма говяжья",
        weight: "400 г",
        price: "400 ₽",
      },
    ],
  },
  {
    slug: "mangal",
    title: "МАНГАЛ",
    summary:
      "Шашлык и люля-кебаб на открытом огне: курица, свинина, говядина и баранина.",
    cooked: true,
    items: [
      {
        slug: "shashlyk-kurinyy",
        name: "Шашлык куриный",
        weight: "250 г",
        price: "500 ₽",
      },
      {
        slug: "shashlyk-svinoy",
        name: "Шашлык свиной",
        weight: "250 г",
        price: "750 ₽",
        src: "/images/шашлык из свиной шейки.JPG",
      },
      {
        slug: "shashlyk-govyazhiy",
        name: "Шашлык говяжий",
        weight: "250 г",
        price: "800 ₽",
      },
      {
        slug: "shashlyk-baraniy",
        name: "Шашлык бараний",
        weight: "250 г",
        price: "950 ₽",
        lead: "Баранина с мангала — самый основательный материал сегодняшнего выпуска.",
        src: "/images/мякоть баранины.JPG",
      },
      {
        slug: "lyulya-kebab-kurinyy",
        name: "Люля-кебаб куриный",
        weight: "200 г",
        price: "450 ₽",
        src: "/images/люля-кебаб из курицы.JPG",
      },
      {
        slug: "lyulya-kebab-govyazhiy",
        name: "Люля-кебаб говяжий",
        weight: "200 г",
        price: "600 ₽",
        lead: "Говядина, открытый огонь и подача без лишних деталей.",
        src: "/images/люля-кебаб из говядины.JPG",
      },
    ],
  },
  {
    slug: "na-uglyah",
    title: "НА УГЛЯХ",
    summary: "Картофель, грибы и овощи, приготовленные на углях.",
    cooked: true,
    items: [
      {
        slug: "kartofel-na-uglyah",
        name: "Картофель на углях",
        weight: "250 г",
        price: "300 ₽",
        src: "/images/картофель на мангале.JPG",
      },
      {
        slug: "griby-na-uglyah",
        name: "Грибы на углях",
        weight: "200 г",
        price: "400 ₽",
        src: "/images/грибы на мангале.JPG",
      },
      {
        slug: "ovoshchi-na-uglyah",
        name: "Овощи на углях",
        weight: "350 г",
        price: "500 ₽",
        src: "/images/овощи на мангале.JPG",
      },
    ],
  },
  {
    slug: "napitki",
    title: "НАПИТКИ",
    summary:
      "Лимонады Dvin, минеральная вода JERMUK и BJNI, соки «Любимый» и Maaza.",
    cooked: false,
    items: [
      {
        slug: "limonad-dvin",
        name: "Лимонад Dvin: виноград / груша / тархун / барбарис / фейхоа",
        short: "Лимонад Dvin",
        variants: ["виноград", "груша", "тархун", "барбарис", "фейхоа"],
        weight: "500 мл",
        price: "150 ₽",
      },
      {
        slug: "voda-jermuk",
        name: "Минеральная вода JERMUK",
        weight: "500 мл",
        price: "150 ₽",
      },
      {
        slug: "voda-bjni",
        name: "Минеральная вода BJNI",
        weight: "500 мл",
        price: "150 ₽",
      },
      {
        slug: "sok-lyubimyy",
        name: "Сок «Любимый»: томат / апельсин / яблоко / яблоко, вишня и арония",
        short: "Сок «Любимый»",
        variants: ["томат", "апельсин", "яблоко", "яблоко, вишня и арония"],
        weight: "1 л",
        price: "200 ₽",
      },
      {
        slug: "sok-maaza",
        name: "Сок Maaza манго",
        weight: "1 л",
        price: "200 ₽",
      },
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
  figure: "ФИГ. 08 — КАФЕ НА РОДНИКОВОЙ",
  alt: "Кафе «Папа Ламаджо» на Родниковой улице",
  src: undefined as string | undefined,
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
    caption: "ФИГ. 02 — ЛАМАДЖО",
    alt: "Ламаджо на подаче",
    span: "lg:col-span-7",
    ratio: "aspect-[16/9]",
  },
  {
    caption: "ФИГ. 03 — МАНГАЛ",
    alt: "Мангал с шашлыком",
    span: "lg:col-span-5",
    ratio: "aspect-[4/5]",
  },
  {
    caption: "ФИГ. 04 — ЗАЛ КАФЕ",
    alt: "Зал кафе «Папа Ламаджо»",
    span: "lg:col-span-4",
    ratio: "aspect-[4/5]",
  },
  {
    caption: "ФИГ. 05 — ПОДАЧА",
    alt: "Подача блюд",
    span: "lg:col-span-4",
    ratio: "aspect-[1/1]",
  },
  {
    caption: "ФИГ. 06 — ОВОЩИ НА УГЛЯХ",
    alt: "Овощи на углях",
    span: "lg:col-span-4",
    ratio: "aspect-[4/5]",
  },
  {
    caption: "ФИГ. 07 — ШАУРМА",
    alt: "Шаурма",
    span: "lg:col-span-12",
    ratio: "aspect-[21/9]",
  },
];
