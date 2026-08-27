import { gallery } from "@/lib/content";
import { Kicker, PressFigure, SectionHeading } from "./Editorial";

export function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="border-b-4 border-ink"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-14 lg:py-16">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b-4 border-ink pb-5">
          <div>
            <Kicker className="text-neutral-500">ИЛЛЮСТРИРОВАННАЯ ПОЛОСА</Kicker>
            <SectionHeading className="pt-3">
              <span id="gallery-heading">ФОТОХРОНИКА</span>
            </SectionHeading>
          </div>
          <Kicker className="text-neutral-500">
            {gallery.every((item) => item.src)
              ? `${gallery.length} СНИМКОВ · КРЮЧКОВО`
              : "МЕСТА ПОД РЕАЛЬНЫЕ СНИМКИ КАФЕ"}
          </Kicker>
        </header>

        <div className="mt-8 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {gallery.map((item) => (
            <PressFigure
              key={item.caption}
              caption={item.caption}
              alt={item.alt}
              src={item.src}
              className={item.span}
              frameClassName={item.ratio}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
