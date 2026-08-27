import { Star } from "lucide-react";
import { cta, restaurant } from "@/lib/content";
import { Action, Kicker } from "./Editorial";

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="newsprint-texture border-b-4 border-ink"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-14 lg:py-16">
        <div className="border-b border-ink pb-3">
          <Kicker>ЧИТАТЕЛИ СООБЩАЮТ</Kicker>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="border-ink py-8 lg:col-span-5 lg:border-r lg:pr-10">
            <p
              className="font-mono leading-[0.85] font-medium"
              style={{ fontSize: "clamp(5rem, 18vw, 11rem)" }}
              aria-hidden="true"
            >
              {restaurant.rating}
            </p>
            <div className="mt-4 flex gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5 fill-ink text-ink"
                  strokeWidth={1.5}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center border-t border-ink py-8 lg:col-span-7 lg:border-t-0 lg:pl-10">
            <h2
              id="reviews-heading"
              className="font-serif text-4xl leading-[0.95] font-black tracking-tight uppercase lg:text-5xl"
            >
              {restaurant.rating} НА ЯНДЕКС КАРТАХ
            </h2>

            <p className="mt-5 font-body text-[17px] leading-relaxed text-neutral-700">
              Оценка кафе «Папа Ламаджо» в карточке организации на Яндекс
              Картах. Тексты отзывов публикуются там же — читайте первоисточник.
            </p>

            <p className="mt-6 border-t border-ink pt-4 font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
              ИСТОЧНИК · ЯНДЕКС КАРТЫ · КАРТОЧКА ОРГАНИЗАЦИИ
            </p>

            <div className="mt-6">
              <Action href={restaurant.maps} external className="w-full sm:w-auto">
                {cta.reviews}
              </Action>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
