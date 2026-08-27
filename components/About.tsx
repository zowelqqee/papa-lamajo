import { about, restaurant } from "@/lib/content";
import { Kicker, PressFigure, SectionHeading } from "./Editorial";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="newsprint-texture border-b-4 border-ink"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="border-ink py-2 lg:col-span-7 lg:border-r lg:pr-10">
            <div className="border-b border-ink pb-3">
              <Kicker>{about.label}</Kicker>
            </div>
            <SectionHeading className="pt-5" >
              <span id="about-heading">{about.headline}</span>
            </SectionHeading>

            <p className="dropcap mt-7 font-body text-[17px] leading-relaxed text-justify hyphens-auto">
              {about.body}
            </p>

            <dl className="mt-8 grid grid-cols-2 border-t border-ink sm:grid-cols-3">
              {[
                { t: "РЕЖИМ", v: restaurant.hours },
                { t: "АДРЕС", v: "Родниковая, 32" },
                { t: "РЕЙТИНГ", v: restaurant.rating },
              ].map((row, i) => (
                <div
                  key={row.t}
                  className={`border-b border-ink py-4 ${
                    i < 2 ? "sm:border-r sm:border-ink sm:pr-4" : ""
                  } ${i > 0 ? "sm:pl-4" : ""}`}
                >
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
                    {row.t}
                  </dt>
                  <dd className="mt-1 font-mono text-lg">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 lg:col-span-5 lg:mt-0 lg:pl-10">
            <PressFigure
              caption={about.figure}
              alt={about.alt}
              src={about.src}
              frameClassName="aspect-[4/5]"
            />
            {about.src ? null : (
              <p className="mt-4 font-body text-sm leading-relaxed text-neutral-600 italic">
                Место для фотографии кафе. Подпись заменяется вместе со снимком.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
