import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allDishes,
  cta,
  dishNeighbours,
  findDish,
  menu,
  menuNote,
  restaurant,
} from "@/lib/content";
import {
  dishFacts,
  dishDescription,
  dishFigure,
  dishLead,
  dishMeasureLabel,
  dishMeta,
  dishMetaDescription,
  dishMetaTitle,
  dishTitle,
} from "@/lib/dish";
import { Action, Kicker, PressFigure } from "@/components/Editorial";

type Params = { params: Promise<{ slug: string }> };

/** Существуют только адреса из меню — произвольный slug отдаёт 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return allDishes.map((dish) => ({ slug: dish.item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const dish = findDish(slug);
  if (!dish) return {};

  const title = dishMetaTitle(dish);
  const description = dishMetaDescription(dish);

  return {
    title,
    description,
    alternates: { canonical: `/menu/${dish.item.slug}` },
    openGraph: { title, description, locale: "ru_RU", type: "article" },
  };
}

export default async function DishPage({ params }: Params) {
  const { slug } = await params;
  const dish = findDish(slug);
  if (!dish) notFound();

  const { item, group } = dish;
  const { previous, next } = dishNeighbours(slug);
  const siblings = group.items.filter((sibling) => sibling.slug !== item.slug);

  /* Плашка и рубрика не должны повторять одно и то же слово. */
  const badge = group.cooked ? "ГОРЯЧЕЕ" : "НАПИТКИ";
  const kicker = [group.title === badge ? null : group.title, "МЕНЮ", restaurant.edition]
    .filter(Boolean)
    .join(" · ");
  const otherGroups = menu.filter((other) => other.slug !== group.slug);

  return (
    <main>
      {/* ——— Хлебные крошки ——— */}
      <nav
        aria-label="Вы здесь"
        className="border-b border-ink bg-paper"
      >
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
          <Link href="/" className="hover:text-accent">
            ГЛАВНАЯ
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#menu" className="hover:text-accent">
            МЕНЮ
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/#razdel-${group.slug}`} className="hover:text-accent">
            {group.title}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">{dishTitle(dish).toUpperCase()}</span>
        </div>
      </nav>

      <article className="newsprint-texture border-b-4 border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-10 lg:py-14">
          {/* ——— Шапка материала ——— */}
          <header className="border-b-4 border-ink pb-6">
            <div className="flex flex-wrap items-center gap-3 border-b border-ink pb-4">
              <span className="bg-accent px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-paper uppercase">
                {badge}
              </span>
              <Kicker>{kicker}</Kicker>
            </div>

            <h1
              className="pt-6 font-serif font-black uppercase"
              style={{
                fontSize: "clamp(2.25rem, 8vw, 5.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.025em",
              }}
            >
              {dishTitle(dish)}
            </h1>

            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-ink pt-4">
              <Kicker className="text-neutral-500">
                КУХНЯ · КРЮЧКОВО &nbsp;|&nbsp; {restaurant.issue}
              </Kicker>
              <p className="font-mono text-lg font-medium">{dishMeta(dish)}</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* ——— Тело материала ——— */}
            <div className="border-ink py-8 lg:col-span-8 lg:border-r lg:pr-10">
              <PressFigure
                caption={dishFigure(dish)}
                alt={dishTitle(dish)}
                src={item.src}
                priority
                frameClassName="aspect-[16/9]"
              />

              <p className="dropcap mt-8 font-body text-[17px] leading-relaxed text-justify hyphens-auto">
                {dishLead(dish)}
              </p>

              <p className="mt-5 font-body text-[17px] leading-relaxed text-justify hyphens-auto text-neutral-700">
                {dishFacts(dish)}
              </p>

              {item.variants ? (
                <section
                  aria-labelledby="variants-heading"
                  className="mt-8 border-t border-ink pt-5"
                >
                  <h2
                    id="variants-heading"
                    className="font-mono text-[10px] tracking-[0.28em] uppercase"
                  >
                    ВАРИАНТЫ
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {item.variants.map((variant) => (
                      <li
                        key={variant}
                        className="border border-ink px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase"
                      >
                        {variant}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {/* ——— О разделе ——— */}
              <section
                aria-labelledby="group-heading"
                className="mt-8 border-t border-ink pt-5"
              >
                <h2
                  id="group-heading"
                  className="font-mono text-[10px] tracking-[0.28em] uppercase"
                >
                  О РАЗДЕЛЕ «{group.title}»
                </h2>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-neutral-700">
                  {group.summary}
                </p>
              </section>

              {/* ——— Описание от кафе ——— */}
              <section
                aria-labelledby="description-heading"
                className="mt-8 border-2 border-ink p-5"
              >
                <h2
                  id="description-heading"
                  className="font-mono text-[10px] tracking-[0.28em] uppercase"
                >
                  ОПИСАНИЕ ОТ КАФЕ
                </h2>
                <p className="mt-3 font-body text-[15px] leading-relaxed">
                  {dishDescription(dish)}
                </p>
              </section>
            </div>

            {/* ——— Карточка блюда ——— */}
            <aside className="border-t border-ink py-8 lg:col-span-4 lg:border-t-0 lg:pl-10">
              <h2 className="border-b-4 border-ink pb-3 font-mono text-[10px] tracking-[0.28em] uppercase">
                КАРТОЧКА БЛЮДА
              </h2>

              <dl className="divide-y divide-ink border-b border-ink">
                {[
                  { term: "РАЗДЕЛ", value: group.title },
                  ...(item.weight
                    ? [{ term: dishMeasureLabel(dish), value: item.weight }]
                    : []),
                  { term: "ЦЕНА", value: item.price },
                  { term: "КУХНЯ", value: restaurant.cuisine },
                  { term: "РЕЖИМ", value: restaurant.hours },
                ].map((row) => (
                  <div key={row.term} className="py-4">
                    <dt className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
                      {row.term}
                    </dt>
                    <dd className="mt-1 font-mono text-lg">{row.value}</dd>
                  </div>
                ))}
                <div className="py-4">
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
                    ТЕЛЕФОН
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={restaurant.phoneHref}
                      className="font-serif text-2xl font-bold underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
                    >
                      {restaurant.phone}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-4">
                <Action href={restaurant.phoneHref} className="w-full">
                  {cta.phone}
                </Action>
                <Action
                  href={restaurant.delivery}
                  variant="outline"
                  external
                  className="w-full"
                  note={restaurant.deliveryNote}
                >
                  {cta.delivery}
                </Action>
              </div>

              <p className="mt-6 border-t border-ink pt-4 font-mono text-[10px] leading-relaxed tracking-[0.18em] text-neutral-500 uppercase">
                {menuNote}
              </p>
            </aside>
          </div>
        </div>
      </article>

      {/* ——— В том же разделе ——— */}
      {siblings.length > 0 ? (
        <section
          aria-labelledby="siblings-heading"
          className="border-b-4 border-ink"
        >
          <div className="mx-auto max-w-screen-xl px-4 py-12">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
              <h2
                id="siblings-heading"
                className="font-sans text-sm font-bold tracking-[0.2em] uppercase"
              >
                В ТОМ ЖЕ РАЗДЕЛЕ · {group.title}
              </h2>
              <Link
                href={`/#razdel-${group.slug}`}
                className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase hover:text-accent"
              >
                ВЕСЬ РАЗДЕЛ →
              </Link>
            </div>

            <ul className="grid grid-cols-1 divide-y divide-divider sm:grid-cols-2 sm:gap-x-10 sm:divide-y-0">
              {siblings.map((sibling) => (
                <li key={sibling.slug} className="sm:border-b sm:border-divider">
                  <Link
                    href={`/menu/${sibling.slug}`}
                    className="group/row flex items-baseline gap-3 py-3 transition-colors duration-200 hover:bg-warm"
                  >
                    <span className="font-body text-[15px] leading-snug decoration-accent decoration-2 underline-offset-4 group-hover/row:underline">
                      {sibling.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden min-w-6 flex-1 translate-y-[-4px] border-b border-dotted border-neutral-400 sm:block"
                    />
                    <span className="ml-auto shrink-0 font-mono text-[11px] tracking-[0.1em] text-neutral-500 uppercase sm:ml-0">
                      {sibling.weight}
                    </span>
                    <span className="w-[68px] shrink-0 text-right font-mono text-sm font-medium">
                      {sibling.price}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ——— Другие разделы и переход по материалам ——— */}
      <section aria-labelledby="more-heading" className="border-b-4 border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <h2
            id="more-heading"
            className="border-b-2 border-ink pb-3 font-sans text-sm font-bold tracking-[0.2em] uppercase"
          >
            ДРУГИЕ РАЗДЕЛЫ МЕНЮ
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-3">
            {otherGroups.map((other, index) => (
              <li
                key={other.slug}
                className={`border-b border-ink py-5 sm:border-b-0 ${
                  index === 0 ? "sm:pr-6" : "sm:px-6"
                } ${
                  index < otherGroups.length - 1
                    ? "sm:border-r sm:border-ink"
                    : ""
                }`}
              >
                <Link href={`/#razdel-${other.slug}`} className="group/card block">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
                    {other.items.length} ПОЗ.
                  </p>
                  <p className="mt-2 font-serif text-2xl font-bold uppercase decoration-accent decoration-2 underline-offset-4 group-hover/card:underline">
                    {other.title}
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-neutral-600">
                    {other.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <nav
            aria-label="Соседние материалы"
            className="mt-10 grid grid-cols-1 border-t-4 border-ink sm:grid-cols-2"
          >
            <div className="border-b border-ink py-5 sm:border-b-0 sm:border-r sm:border-ink sm:pr-6">
              {previous ? (
                <Link href={previous.href} className="group/nav block">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
                    ← ПРЕДЫДУЩИЙ МАТЕРИАЛ
                  </p>
                  <p className="mt-2 font-serif text-xl font-bold uppercase decoration-accent decoration-2 underline-offset-4 group-hover/nav:underline">
                    {previous.item.short ?? previous.item.name}
                  </p>
                </Link>
              ) : (
                <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                  НАЧАЛО МЕНЮ
                </p>
              )}
            </div>

            <div className="py-5 sm:pl-6 sm:text-right">
              {next ? (
                <Link href={next.href} className="group/nav block">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
                    СЛЕДУЮЩИЙ МАТЕРИАЛ →
                  </p>
                  <p className="mt-2 font-serif text-xl font-bold uppercase decoration-accent decoration-2 underline-offset-4 group-hover/nav:underline">
                    {next.item.short ?? next.item.name}
                  </p>
                </Link>
              ) : (
                <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                  КОНЕЦ МЕНЮ
                </p>
              )}
            </div>
          </nav>
        </div>
      </section>
    </main>
  );
}
