import Image from "next/image";
import type { ReactNode } from "react";
import { restaurant } from "@/lib/content";

/** Служебная надрубрика: моно, капслок, широкий трекинг. */
export function Kicker({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.28em] sm:text-xs ${className}`}
    >
      {children}
    </p>
  );
}

/** Заголовок раздела: массивный Playfair с плотным интерлиньяжем. */
export function SectionHeading({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={`font-serif text-4xl leading-[0.92] font-black tracking-tight uppercase lg:text-5xl ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Шапка раздела: рубрика слева, заголовок под жирной линейкой. */
export function SectionHead({
  label,
  title,
  aside,
}: {
  label: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="border-b-4 border-ink pb-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink pb-3">
        <Kicker>{label}</Kicker>
        {aside ? (
          <Kicker className="text-neutral-500">{aside}</Kicker>
        ) : null}
      </div>
      <SectionHeading className="pt-5">{title}</SectionHeading>
    </header>
  );
}

/**
 * Наборный орнамент между крупными разделами: армянская плетёнка,
 * набранная как типографская линейка, а не как декоративная картинка.
 */
export function Ornament() {
  return (
    <div aria-hidden="true" className="flex items-center gap-4 py-8">
      <span className="h-px flex-1 bg-ink/20" />
      <span className="ornament-band ornament-band--accent w-40 shrink-0 sm:w-64" />
      <span className="h-px flex-1 bg-ink/20" />
    </div>
  );
}

/** Сплошная орнаментальная линейка во всю ширину. */
export function OrnamentRule({
  variant = "ink",
  className = "",
}: {
  variant?: "ink" | "accent" | "light";
  className?: string;
}) {
  const skin =
    variant === "accent"
      ? "ornament-band--accent"
      : variant === "light"
        ? "ornament-band--light"
        : "";

  return (
    <div
      aria-hidden="true"
      className={`ornament-band ${skin} ${className}`}
    />
  );
}

/**
 * Печатная марка кафе. Круглый логотип ставится в квадратную рамку —
 * так газеты набирали круглые печати, не ломая сетку полосы.
 */
export function Seal({
  size = "md",
  className = "",
  invert = false,
}: {
  size?: "sm" | "md";
  className?: string;
  invert?: boolean;
}) {
  const box = size === "sm" ? "h-11 w-11" : "h-14 w-14 sm:h-16 sm:w-16";
  const tone = invert
    ? "border-paper text-paper"
    : "border-ink text-ink";

  if (restaurant.logo.src) {
    return (
      <span
        className={`relative block shrink-0 border-2 ${box} ${tone} ${className}`}
      >
        <Image
          src={restaurant.logo.src}
          alt={restaurant.logo.alt}
          fill
          sizes="64px"
          className="object-contain p-[3px]"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center border-2 font-serif font-black ${box} ${tone} ${className}`}
      style={{ fontSize: size === "sm" ? "1rem" : "1.35rem", letterSpacing: "0.02em" }}
    >
      ПЛ
    </span>
  );
}

type FigureProps = {
  caption: string;
  alt: string;
  className?: string;
  frameClassName?: string;
  /** Точка кадрирования для фотографии внутри рамки. */
  imageClassName?: string;
  captionClassName?: string;
  /** Растянуть кадр по высоте контейнера (для колонок равной высоты). */
  grow?: boolean;
  /** Путь к реальному снимку в /public. Без него рисуется плейсхолдер. */
  src?: string;
  /** Приоритетная загрузка — только для кадра на первом экране. */
  priority?: boolean;
};

/**
 * Плейсхолдер под реальную фотографию: растровая сетка + подпись.
 * Заменяется на <Image /> без изменения окружающей вёрстки.
 */
export function PressFigure({
  caption,
  alt,
  className = "",
  frameClassName = "aspect-[4/3]",
  imageClassName = "",
  captionClassName = "",
  grow = false,
  src,
  priority = false,
}: FigureProps) {
  return (
    <figure
      className={`group flex flex-col ${grow ? "h-full" : ""} ${className}`}
    >
      <div
        {...(src
          ? {}
          : { role: "img", "aria-label": `Место для фотографии: ${alt}` })}
        className={`press-photo relative overflow-hidden border border-ink bg-neutral-200 ${
          grow ? "flex-1" : ""
        } ${frameClassName}`}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className={`object-cover ${imageClassName}`}
          />
        ) : (
          <>
            <div aria-hidden="true" className="halftone absolute inset-0" />
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="border border-ink/40 bg-paper/70 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase">
                фото
              </span>
            </div>
          </>
        )}
      </div>
      <figcaption
        className={`mt-2 border-t border-ink pt-2 font-mono text-[10px] tracking-[0.18em] text-neutral-600 uppercase ${captionClassName}`}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

type ActionProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  external?: boolean;
  invert?: boolean;
  note?: string;
};

/** Кнопка-ссылка. Инверсия цвета на hover, острые углы, тач-цель 44px. */
export function Action({
  href,
  children,
  variant = "solid",
  className = "",
  external = false,
  invert = false,
  note,
}: ActionProps) {
  const base =
    "inline-flex min-h-[48px] items-center justify-center gap-2 border px-6 py-3 font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 ease-out";

  const styles =
    variant === "solid"
      ? invert
        ? "border-paper bg-paper text-ink hover:bg-transparent hover:text-paper"
        : "border-ink bg-ink text-paper hover:bg-paper hover:text-ink"
      : invert
        ? "border-paper bg-transparent text-paper hover:bg-paper hover:text-ink"
        : "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper";

  const link = (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );

  if (!note) return link;

  return (
    <span className="inline-flex flex-col gap-1">
      {link}
      <span className="font-mono text-[9px] tracking-[0.18em] text-neutral-500 uppercase">
        {note}
      </span>
    </span>
  );
}
