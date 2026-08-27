import Link from "next/link";
import { restaurant } from "@/lib/content";

export default function NotFound() {
  return (
    <main className="newsprint-texture border-b-4 border-ink">
      <div className="mx-auto max-w-screen-xl px-4 py-20 lg:py-28">
        <p className="font-mono text-[10px] tracking-[0.28em] text-neutral-500 uppercase">
          ПОЛОСА НЕ НАЙДЕНА
        </p>

        <h1
          className="pt-5 font-serif font-black uppercase"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 7rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          ТАКОГО МАТЕРИАЛА НЕТ
        </h1>

        <p className="mt-8 max-w-2xl border-t border-ink pt-6 font-body text-[17px] leading-relaxed text-neutral-700">
          Страница не найдена. Вернитесь на первую полосу или откройте меню
          кафе «{restaurant.nameCased}» — ламаджо, мангал, блюда на углях и
          напитки.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center border border-ink bg-ink px-6 py-3 font-sans text-xs font-semibold tracking-[0.2em] text-paper uppercase transition-all duration-200 hover:bg-paper hover:text-ink"
          >
            НА ПЕРВУЮ ПОЛОСУ
          </Link>
          <Link
            href="/#menu"
            className="inline-flex min-h-[48px] items-center justify-center border border-ink px-6 py-3 font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:bg-ink hover:text-paper"
          >
            СМОТРЕТЬ МЕНЮ
          </Link>
        </div>
      </div>
    </main>
  );
}
