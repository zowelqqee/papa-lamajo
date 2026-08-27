import { tickerItems } from "@/lib/content";

function Run({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      {...(ariaHidden ? { "aria-hidden": "true" } : {})}
    >
      {tickerItems.map((item, index) => (
        <li
          key={`${item.text}-${index}`}
          className="flex items-center gap-4 px-6 py-3 font-mono text-xs tracking-[0.2em] whitespace-nowrap uppercase"
        >
          {item.tag ? (
            <span className="bg-accent px-2 py-[3px] text-[10px] tracking-[0.18em] text-paper">
              {item.tag}
            </span>
          ) : (
            <span aria-hidden="true" className="text-neutral-500">
              ✦
            </span>
          )}
          {item.text}
        </li>
      ))}
    </ul>
  );
}

/** Бегущая строка: два одинаковых прогона, второй скрыт от скринридеров. */
export function Ticker() {
  return (
    <div
      className="marquee-root overflow-hidden border-b-4 border-ink bg-ink text-paper"
      role="marquee"
      aria-label="Актуальные цены и часы работы"
    >
      <div className="marquee-track">
        <Run />
        <Run ariaHidden />
      </div>
    </div>
  );
}
