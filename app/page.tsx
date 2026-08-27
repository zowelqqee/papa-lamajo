import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Featured } from "@/components/Featured";
import { PriceList } from "@/components/PriceList";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Visit } from "@/components/Visit";
import { Ornament } from "@/components/Editorial";

export default function Page() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Featured />
      <div className="border-b-4 border-ink">
        <Ornament />
      </div>
      <PriceList />
      <Process />
      <About />
      <Gallery />
      <Reviews />
      <Visit />
    </main>
  );
}
