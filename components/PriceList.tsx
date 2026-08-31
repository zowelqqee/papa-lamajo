import Link from "next/link";
import { menu, menuNote, restaurant } from "@/lib/content";
import { SectionHead } from "./Editorial";

/**
 * Газетный прайс-лист. Каждая строка — ссылка на отдельную статью о блюде,
 * а не кнопка заказа: онлайн-оформления на сайте нет.
 */
export function PriceList() {
  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="border-b-4 border-ink"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-14 lg:py-16">
        <SectionHead
          label="ПРАЙС-ЛИСТ · АКТУАЛЬНАЯ ПОДБОРКА"
          title={<span id="menu-heading">МЕНЮ</span>}
          aside="КАЖДОЕ БЛЮДО — ОТДЕЛЬНЫЙ МАТЕРИАЛ"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {menu.map((group, index) => (
            <section
              key={group.slug}
              id={`razdel-${group.slug}`}
              aria-labelledby={`group-${group.slug}`}
              className={`scroll-mt-32 border-b border-ink py-7 lg:py-8 ${
                index % 2 === 0
                  ? "lg:border-r lg:border-ink lg:pr-10"
                  : "lg:pl-10"
              }`}
            >
              <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
                <h3
                  id={`group-${group.slug}`}
                  className="font-sans text-sm font-bold tracking-[0.2em] uppercase"
                >
                  {group.title}
                </h3>
                <span className="font-mono text-[10px] tracking-[0.18em] text-neutral-500 uppercase">
                  {group.items.length} ПОЗ.
                </span>
              </div>

              <ul className="divide-y divide-divider">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/menu/${item.slug}`}
                      className="group/row flex items-baseline gap-3 py-3 transition-colors duration-200 hover:bg-warm"
                    >
                      <span className="font-body text-[15px] leading-snug decoration-accent decoration-2 underline-offset-4 group-hover/row:underline">
                        {item.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden min-w-6 flex-1 translate-y-[-4px] border-b border-dotted border-neutral-400 sm:block"
                      />
                      {item.weight ? (
                        <span className="ml-auto shrink-0 font-mono text-[11px] tracking-[0.1em] text-neutral-500 uppercase sm:ml-0">
                          {item.weight}
                        </span>
                      ) : null}
                      <span className="w-[68px] shrink-0 text-right font-mono text-sm font-medium">
                        {item.price}
                      </span>
                      <span
                        aria-hidden="true"
                        className="w-4 shrink-0 text-right font-mono text-xs text-neutral-400 transition-colors duration-200 group-hover/row:text-accent"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-ink pt-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-mono text-[10px] leading-relaxed tracking-[0.18em] text-neutral-500 uppercase">
            {menuNote}
          </p>
          <p className="font-mono text-[10px] tracking-[0.18em] text-neutral-500 uppercase">
            ЗАКАЗ ПО ТЕЛЕФОНУ{" "}
            <a
              href={restaurant.phoneHref}
              className="text-ink underline decoration-accent decoration-2 underline-offset-4"
            >
              {restaurant.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
