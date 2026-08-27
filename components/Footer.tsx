import { restaurant } from "@/lib/content";
import { OrnamentRule, Seal } from "./Editorial";

export function Footer() {
  return (
    <footer className="invert-zone bg-ink text-paper">
      <div className="mx-auto max-w-screen-xl px-4 py-12 lg:py-16">
        <div className="flex flex-wrap items-center gap-5">
          <Seal invert />
          <p
            className="font-serif leading-[0.85] font-black uppercase"
            style={{
              fontSize: "clamp(2.5rem, 11vw, 7rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {restaurant.name}
          </p>
        </div>

        <OrnamentRule variant="light" className="mt-8" />

        <div className="mt-8 grid grid-cols-1 gap-6 border-t border-paper/30 pt-8 font-mono text-[11px] tracking-[0.2em] uppercase sm:grid-cols-2 lg:grid-cols-4">
          <p>{restaurant.address.footer}</p>
          <p className="text-neutral-400">{restaurant.hoursLine}</p>
          <p>
            ТЕЛ.{" "}
            <a
              href={restaurant.phoneHref}
              className="underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
            >
              {restaurant.phone}
            </a>
          </p>
          <p className="text-neutral-400 lg:text-right">
            {restaurant.edition} · {restaurant.issue}
          </p>
        </div>
      </div>
    </footer>
  );
}
