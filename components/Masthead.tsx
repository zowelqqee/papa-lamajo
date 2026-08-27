"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon, X, Phone } from "lucide-react";
import { nav, restaurant } from "@/lib/content";

export function Masthead() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  /* На внутренних полосах якоря ведут на главную: /#menu вместо #menu. */
  const pathname = usePathname();
  const onFrontPage = pathname === "/";
  const linkTo = (hash: string) => (onFrontPage ? hash : `/${hash}`);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* Липкая шапка сжимается после прокрутки, чтобы логотип не съедал экран. */
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  /**
   * Переход по якорю из мобильной панели.
   * Панель блокирует прокрутку body, поэтому штатный переход по ссылке
   * гасится — сначала закрываем панель, затем прокручиваем вручную.
   */
  const navigate = useCallback(
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      /* С внутренней полосы это обычный переход на главную — не мешаем. */
      if (!href.startsWith("#")) {
        setOpen(false);
        return;
      }

      event.preventDefault();
      setOpen(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const target = document.querySelector<HTMLElement>(href);
          if (!target) return;
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          window.history.replaceState(null, "", href);
        });
      });
    },
    [],
  );

  /* Блокировка прокрутки + Esc + удержание фокуса внутри панели. */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-40 border-b-4 border-ink bg-paper">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* ——— Титул ——— */}
        <div
          className={`overflow-hidden text-center transition-all duration-300 ease-out ${
            condensed ? "py-2" : "py-6 sm:py-8"
          }`}
        >
          <p
            className={`font-mono tracking-[0.3em] text-neutral-600 uppercase transition-all duration-300 ${
              condensed
                ? "h-0 -translate-y-1 text-[10px] opacity-0"
                : "h-4 text-[10px] opacity-100 sm:text-xs"
            }`}
          >
            {restaurant.kind} · {restaurant.edition}
          </p>

          <a
            href={linkTo("#top")}
            className="mt-2 block font-serif font-black tracking-tight uppercase transition-all duration-300 ease-out"
            style={{
              fontSize: condensed
                ? "clamp(1.5rem, 5vw, 2.25rem)"
                : "clamp(2.25rem, 9vw, 5.5rem)",
              lineHeight: 0.9,
              letterSpacing: condensed ? "0.02em" : "-0.01em",
            }}
          >
            {restaurant.name}
          </a>

          <p
            className={`mx-auto mt-3 max-w-3xl font-mono tracking-[0.2em] text-neutral-600 uppercase transition-all duration-300 ${
              condensed
                ? "h-0 -translate-y-1 opacity-0"
                : "h-auto text-[10px] opacity-100 sm:text-xs"
            }`}
          >
            {restaurant.issue}
            <span className="hidden sm:inline">
              &nbsp;|&nbsp; РОДНИКОВАЯ УЛИЦА
            </span>
            &nbsp;|&nbsp;{" "}
            <a
              href={restaurant.phoneHref}
              className="whitespace-nowrap underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
            >
              {restaurant.phone}
            </a>
          </p>
        </div>

        {/* ——— Навигация ——— */}
        <nav
          aria-label="Основная навигация"
          className="flex items-stretch justify-between border-t border-ink"
        >
          <ul className="hidden flex-1 md:flex">
            {nav.map((item) => (
              <li key={item.href} className="flex-1 border-r border-ink last:border-r-0">
                <a
                  href={linkTo(item.href)}
                  className="flex min-h-[44px] items-center justify-center px-2 py-3 font-sans text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-200 hover:bg-ink hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={restaurant.phoneHref}
            className="hidden min-h-[44px] items-center gap-2 border-l border-ink bg-accent px-5 font-mono text-[11px] tracking-[0.16em] text-paper uppercase transition-colors duration-200 hover:bg-ink md:flex"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {restaurant.phone}
          </a>

          {/* Мобильная строка */}
          <div className="flex w-full items-center justify-between md:hidden">
            <a
              href={restaurant.phoneHref}
              className="flex min-h-[44px] flex-1 items-center gap-2 border-r border-ink px-4 font-mono text-[11px] tracking-[0.14em] uppercase"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {restaurant.phone}
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center px-4 transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              {open ? (
                <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <MenuIcon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* ——— Мобильная панель ——— */}
      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Навигация по разделам"
          className="invert-zone fixed inset-x-0 top-0 bottom-0 z-50 flex flex-col bg-ink text-paper md:hidden"
        >
          <div className="flex items-center justify-between border-b border-paper/30 px-4 py-4">
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase">
              {restaurant.issue}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть меню"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center border border-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
            >
              <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <ul className="flex-1 overflow-y-auto">
            {nav.map((item, index) => (
              <li key={item.href} className="border-b border-paper/25">
                <a
                  href={linkTo(item.href)}
                  onClick={navigate(linkTo(item.href))}
                  className="flex items-baseline gap-4 px-4 py-5 font-serif text-3xl font-black uppercase transition-colors duration-200 hover:bg-paper hover:text-ink"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="space-y-1 border-t border-paper/30 px-4 py-5 font-mono text-[10px] tracking-[0.2em] uppercase">
            <p>{restaurant.address.footer}</p>
            <p className="text-neutral-400">{restaurant.hoursLine}</p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
