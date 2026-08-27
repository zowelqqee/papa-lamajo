"use client";

import { useEffect, useState } from "react";
import { restaurant } from "@/lib/content";

/** Дата формируется в браузере — на сервере рендерим прочерк, чтобы не ломать гидратацию. */
export function UtilityStrip() {
  const [today, setToday] = useState("—");

  useEffect(() => {
    const formatted = new Intl.DateTimeFormat("ru-RU", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
    setToday(formatted.replace(" г.", ""));
  }, []);

  return (
    <div className="bg-ink text-paper">
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 items-center gap-2 px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase sm:grid-cols-3">
        <span className="truncate">{restaurant.region}</span>
        <time className="hidden text-center text-neutral-400 sm:block">
          {today}
        </time>
        <span className="text-right">{restaurant.hoursLine}</span>
      </div>
    </div>
  );
}
