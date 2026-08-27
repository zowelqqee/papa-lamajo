import Link from "next/link";
import { Kicker, PressFigure, SectionHead } from "./Editorial";
import { cta, featuredDishes } from "@/lib/content";
import { dishLead, dishMeta, dishTitle } from "@/lib/dish";

export function Featured() {
  return (
    <section
      aria-labelledby="featured-heading"
      className="newsprint-texture border-b-4 border-ink"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-14 lg:py-16">
        <SectionHead
          label="ГЛАВНЫЕ МАТЕРИАЛЫ"
          title={<span id="featured-heading">СЕГОДНЯ В НОМЕРЕ</span>}
          aside="ТРИ ПОЗИЦИИ · МАНГАЛ И ЛАМАДЖО"
        />

        <div className="grid grid-cols-1 md:grid-cols-3">
          {featuredDishes.map((dish, index) => (
            <article
              key={dish.item.slug}
              className={`group flex flex-col border-b border-ink transition-colors duration-200 hover:bg-warm md:border-b-0 ${
                index < featuredDishes.length - 1
                  ? "md:border-r md:border-ink"
                  : ""
              }`}
            >
              <Link
                href={dish.href}
                className="flex flex-1 flex-col p-6 lg:p-8"
                aria-label={`Читать о блюде: ${dishTitle(dish)}`}
              >
                <div className="flex items-baseline justify-between border-b border-ink pb-3">
                  <span className="font-mono text-xs tracking-[0.2em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Kicker className="text-neutral-500">
                    {dishMeta(dish)}
                  </Kicker>
                </div>

                <h3 className="pt-5 font-serif text-2xl leading-[1.05] font-bold uppercase decoration-accent decoration-2 underline-offset-[6px] group-hover:underline md:min-h-[calc(5rem+1.25rem)] lg:text-3xl">
                  {dishTitle(dish)}
                </h3>

                <p className="mt-3 font-body text-[15px] leading-relaxed text-justify text-neutral-700 hyphens-auto">
                  {dishLead(dish)}
                </p>

                <p className="mt-4 flex-1 font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
                  <span className="text-ink transition-colors duration-200 group-hover:text-accent">
                    {cta.dish} →
                  </span>
                </p>

                <PressFigure
                  caption={`ФИГ. 1.${index + 1} — ${dishTitle(dish).toUpperCase()}`}
                  alt={dishTitle(dish)}
                  src={dish.item.src}
                  className="mt-6"
                  frameClassName="aspect-[5/4]"
                  grow
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
