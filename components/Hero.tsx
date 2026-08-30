import { Action, Kicker, PressFigure } from "./Editorial";
import { cta, hero, heroFacts, restaurant } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-headline"
      className="newsprint-texture border-b-4 border-ink"
    >
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* ——— Передовица ——— */}
          <div className="border-ink py-8 lg:col-span-8 lg:border-r lg:py-12 lg:pr-10">
            <div className="flex flex-wrap items-center gap-3 border-b border-ink pb-4">
              <span className="bg-accent px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-paper uppercase">
                ГОРЯЧЕЕ
              </span>
              <Kicker>{hero.label}</Kicker>
            </div>

            <h1
              id="hero-headline"
              className="pt-6 font-serif font-black uppercase"
              style={{
                fontSize: "clamp(2.75rem, 11vw, 8rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
              }}
            >
              {hero.headline}
            </h1>

            <div className="mt-6 grid gap-6 border-t border-ink pt-6 sm:grid-cols-12">
              <p className="font-body text-lg leading-relaxed text-neutral-700 sm:col-span-8 sm:text-xl">
                {hero.sub}
              </p>
              <p className="font-mono text-[10px] leading-relaxed tracking-[0.2em] text-neutral-500 uppercase sm:col-span-4 sm:border-l sm:border-ink sm:pl-4">
                {hero.byline}
                <br />
                {restaurant.issue}
              </p>
            </div>

            <PressFigure
              caption={hero.figure}
              alt={hero.alt}
              src={hero.src}
              priority
              className="mt-8"
              frameClassName="aspect-[16/9]"
              imageClassName="object-[center_68%]"
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Action href="#menu" className="w-full sm:w-auto">
                {cta.menu}
              </Action>
              <Action
                href={restaurant.maps}
                variant="outline"
                external
                className="w-full sm:w-auto"
              >
                {cta.route}
              </Action>
            </div>
          </div>

          {/* ——— Служебная колонка ——— */}
          <aside className="border-t border-ink py-8 lg:col-span-4 lg:border-t-0 lg:py-12 lg:pl-10">
            <h2 className="border-b-4 border-ink pb-3 font-mono text-[10px] tracking-[0.28em] uppercase">
              СПРАВКА
            </h2>

            <dl className="divide-y divide-ink border-b border-ink">
              {heroFacts.map((fact) => (
                <div key={fact.term} className="py-4">
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
                    {fact.term}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl leading-tight font-bold">
                    {fact.term === "ТЕЛЕФОН" ? (
                      <a
                        href={restaurant.phoneHref}
                        className="underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
                      >
                        {fact.value}
                      </a>
                    ) : fact.term === "РЕЙТИНГ НА ЯНДЕКС КАРТАХ" ? (
                      <span className="font-mono text-5xl font-medium">
                        {fact.value}
                      </span>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 font-body text-sm leading-relaxed text-neutral-600 italic">
              Кафе на Родниковой улице: ламаджо, мангал и овощи на углях.
              Работаем на месте и на вынос.
            </p>

            <Action
              href={restaurant.delivery}
              variant="outline"
              external
              className="mt-6 w-full"
              note={restaurant.deliveryNote}
            >
              {cta.delivery}
            </Action>
          </aside>
        </div>
      </div>
    </section>
  );
}
