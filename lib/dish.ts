import { restaurant, type ResolvedDish } from "./content";

/**
 * Тексты статьи о блюде собираются из проверенных данных меню.
 * Здесь нет и не должно быть выдуманных подробностей: состава,
 * происхождения продуктов, времени приготовления и рецептов.
 * Всё это попадает на страницу только через поле `description`,
 * заполненное со слов кафе.
 */

/** Заголовок статьи: короткое имя, если строка меню длинная. */
export function dishTitle(dish: ResolvedDish): string {
  return dish.item.short ?? dish.item.name;
}

/** Строка метаданных под заголовком: вес (если указан) и цена. */
export function dishMeta(dish: ResolvedDish): string {
  return dish.item.weight ? `${dish.item.weight} · ${dish.item.price}` : dish.item.price;
}

/**
 * Лид статьи. Если у блюда есть утверждённая редакционная строка —
 * берём её, иначе собираем нейтральное предложение из данных меню.
 */
export function dishLead(dish: ResolvedDish): string {
  if (dish.item.lead) return dish.item.lead;

  const title = dishTitle(dish);
  return `«${title}» — позиция раздела «${dish.group.title.toLowerCase()}» в меню кафе «${restaurant.nameCased}».`;
}

/** Продающее описание для позиций, для которых кафе не передало отдельный текст. */
export function dishDescription(dish: ResolvedDish): string {
  if (dish.item.description) return dish.item.description;

  const title = `«${dishTitle(dish)}»`;
  const copy: Record<string, string> = {
    "ВЫПЕЧКА": `${title} — горячая выпечка с уютным, домашним настроением. Отличный выбор к чаю, для быстрого перекуса или чтобы дополнить большой заказ чем-то особенно аппетитным.`,
    "ДЕСЕРТЫ": `${title} — сладкое завершение обеда или маленький повод порадовать себя. Нежный десерт особенно хорош с чашкой чая или кофе.`,
    "НАПИТКИ": `${title} освежает и удачно дополняет горячие блюда. Закажите напиток к основному блюду или возьмите на компанию.`,
    "ШАУРМА": `${title} — сытный, удобный и по-настоящему аппетитный формат для обеда, дороги или вечера дома. Горячая порция с выразительным мясным характером, когда хочется основательно подкрепиться.`,
    "ШАШЛЫК": `${title} готовится на мангале и раскрывает аромат открытого огня. Румяная горячая порция станет отличным выбором для настоящего мясного застолья.`,
    "САЛАТЫ": `${title} добавит заказу свежести, цвета и приятного вкусового контраста. Хорош как самостоятельная лёгкая позиция и как дополнение к горячему.`,
    "ГОРЯЧИЕ БЛЮДА": `${title} — горячее блюдо для спокойного, сытного обеда. Закажите его, когда хочется домашнего вкуса и полноценной порции.`,
    "СУПЫ": `${title} — согревающее первое блюдо с насыщенным характером. Идеально для обеда, прохладного дня или начала большого заказа.`,
    "ЛЮЛЯ-КЕБАБ": `${title} — горячий люля-кебаб с ароматом мангала и ярким мясным вкусом. Сытный выбор для обеда, ужина или заказа на компанию.`,
    "ОВОЩИ": `${title} — аппетитное дополнение к мясу, выпечке или самостоятельная лёгкая позиция. Яркий вкус и удобная порция для вашего стола.`,
    "ЛАМАДЖО": `${title} — горячая позиция с характером, ради которой хочется вернуться. Подойдёт и для быстрого перекуса, и для полноценного знакомства с меню.`,
    "ХЛЕБ": `${title} — свежая хлебная позиция, которая отлично дополнит горячие блюда, супы и мангал.`,
  };

  return copy[dish.group.title] ?? `${title} — аппетитная позиция из меню кафе «${restaurant.nameCased}».`;
}

/** Абзац проверенных фактов: порция, цена, режим работы. */
export function dishFacts(dish: ResolvedDish): string {
  const measure = dish.group.cooked ? "Порция" : "Объём";
  const base = dish.item.weight
    ? `${measure} — ${dish.item.weight}, цена — ${dish.item.price}.`
    : `Цена — ${dish.item.price}.`;

  return dish.group.cooked
    ? `${base} Горячие блюда собираются после заказа. Кафе работает по графику: понедельник — с 12:00 до 20:00, вторник–суббота — с 9:00 до 22:00, воскресенье — с 11:00 до 20:00 — можно приехать на Родниковую улицу или оформить доставку.`
    : `${base} Кафе работает по графику: понедельник — с 12:00 до 20:00, вторник–суббота — с 9:00 до 22:00, воскресенье — с 11:00 до 20:00 — можно приехать на Родниковую улицу или оформить доставку.`;
}

/** Подпись к снимку блюда. */
export function dishFigure(dish: ResolvedDish): string {
  return `ФИГ. — ${dishTitle(dish).toUpperCase()}`;
}

/** Подпись поля веса: у напитков это объём. */
export function dishMeasureLabel(dish: ResolvedDish): string {
  return dish.group.cooked ? "ВЕС ПОРЦИИ" : "ОБЪЁМ";
}

export function dishMetaTitle(dish: ResolvedDish): string {
  const details = dish.item.weight
    ? `${dish.item.weight}, ${dish.item.price}`
    : dish.item.price;
  return `${dishTitle(dish)} — ${details} · ${restaurant.nameCased}`;
}

export function dishMetaDescription(dish: ResolvedDish): string {
  const details = dish.item.weight
    ? `${dish.item.weight}, ${dish.item.price}`
    : dish.item.price;
  return `${dishTitle(dish)} в меню кафе «${restaurant.nameCased}» в деревне Крючково: ${details}. Раздел «${dish.group.title.toLowerCase()}». Родниковая улица, 32. Пн с 12:00 до 20:00, вт–сб с 9:00 до 22:00, вс с 11:00 до 20:00.`;
}
