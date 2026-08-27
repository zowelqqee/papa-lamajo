import { Flame, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { process } from "@/lib/content";

const icons = [UtensilsCrossed, Flame, ShoppingBag];

/** Обязательный инвертированный разворот: чёрный фон, красные номера. */
export function Process() {
  return (
    <section
      aria-labelledby="process-heading"
      className="invert-zone border-b-4 border-ink bg-ink text-paper"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-14 lg:py-20">
        <header className="border-b border-paper/30 pb-6">
          <p className="font-mono text-[10px] tracking-[0.28em] text-neutral-400 uppercase sm:text-xs">
            РЕПОРТАЖ С МАНГАЛА
          </p>
          <h2
            id="process-heading"
            className="pt-4 font-serif text-4xl leading-[0.92] font-black tracking-tight uppercase lg:text-6xl"
          >
            КУХНЯ В ДЕЛЕ
          </h2>
        </header>

        <ol className="grid grid-cols-1 md:grid-cols-3">
          {process.map((step, index) => {
            const Icon = icons[index];
            return (
              <li
                key={step.step}
                className={`border-b border-paper/25 py-8 md:border-b-0 md:py-10 ${
                  index === 0 ? "md:pr-8" : "md:px-8"
                } ${
                  index < process.length - 1 ? "md:border-r md:border-paper/25" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-5xl leading-none font-medium text-accent lg:text-6xl">
                    {step.step}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center border border-paper/50 transition-colors duration-200 hover:bg-paper hover:text-ink">
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>

                <h3 className="mt-8 font-serif text-2xl leading-tight font-bold uppercase lg:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-neutral-400">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
