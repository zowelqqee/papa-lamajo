import { cta, restaurant } from "@/lib/content";
import { Action, Kicker, SectionHeading } from "./Editorial";

const rows = [
  { term: "РЕГИОН", value: restaurant.address.region },
  { term: "МУНИЦИПАЛИТЕТ", value: restaurant.address.district },
  { term: "УЛИЦА", value: restaurant.address.street },
  { term: "РЕЖИМ РАБОТЫ", value: restaurant.hoursLine },
];

export function Visit() {
  return (
    <section
      id="contacts"
      aria-labelledby="visit-heading"
      className="border-b-4 border-ink"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-14 lg:py-16">
        <div className="border-b border-ink pb-3">
          <Kicker>АДРЕСНАЯ СТРОКА</Kicker>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="border-ink py-8 lg:col-span-7 lg:border-r lg:pr-10">
            <SectionHeading>
              <span id="visit-heading">ЖДЁМ В КРЮЧКОВО</span>
            </SectionHeading>

            <dl className="mt-8 border-t border-ink">
              {rows.map((row) => (
                <div
                  key={row.term}
                  className="grid grid-cols-1 gap-1 border-b border-ink py-4 sm:grid-cols-12 sm:gap-4"
                >
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase sm:col-span-4">
                    {row.term}
                  </dt>
                  <dd className="font-sans text-sm font-semibold tracking-[0.08em] uppercase sm:col-span-8">
                    {row.value}
                  </dd>
                </div>
              ))}

              <div className="grid grid-cols-1 gap-1 border-b border-ink py-4 sm:grid-cols-12 sm:gap-4">
                <dt className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase sm:col-span-4">
                  ТЕЛЕФОН
                </dt>
                <dd className="sm:col-span-8">
                  <a
                    href={restaurant.phoneHref}
                    className="font-serif text-2xl font-bold underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
                  >
                    {restaurant.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col justify-between border-t border-ink py-8 lg:col-span-5 lg:border-t-0 lg:pl-10">
            <div>
              <Kicker className="text-neutral-500">ДЕЙСТВИЯ</Kicker>
              <div className="mt-5 flex flex-col gap-4">
                <Action href={restaurant.maps} external className="w-full">
                  {cta.route}
                </Action>
                <Action href={restaurant.phoneHref} variant="outline" className="w-full">
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
            </div>

            <p className="mt-8 border-t border-ink pt-4 font-mono text-[10px] leading-relaxed tracking-[0.18em] text-neutral-500 uppercase">
              {restaurant.deliveryMinimum} · МАРШРУТ И ОТЗЫВЫ ОТКРЫВАЮТСЯ В
              КАРТОЧКЕ НА ЯНДЕКС КАРТАХ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
