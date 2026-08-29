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

/** Строка метаданных под заголовком: вес и цена. */
export function dishMeta(dish: ResolvedDish): string {
  return `${dish.item.weight} · ${dish.item.price}`;
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

/** Абзац проверенных фактов: порция, цена, режим работы. */
export function dishFacts(dish: ResolvedDish): string {
  const measure = dish.group.cooked ? "Порция" : "Объём";
  const base = `${measure} — ${dish.item.weight}, цена — ${dish.item.price}.`;

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
  return `${dishTitle(dish)} — ${dish.item.weight}, ${dish.item.price} · ${restaurant.nameCased}`;
}

export function dishMetaDescription(dish: ResolvedDish): string {
  return `${dishTitle(dish)} в меню кафе «${restaurant.nameCased}» в деревне Крючково: ${dish.item.weight}, ${dish.item.price}. Раздел «${dish.group.title.toLowerCase()}». Родниковая улица, 32. Пн с 12:00 до 20:00, вт–сб с 9:00 до 22:00, вс с 11:00 до 20:00.`;
}
