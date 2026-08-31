import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { UtilityStrip } from "@/components/UtilityStrip";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Папа Ламаджо — армянская и кавказская кухня в Крючково",
  description:
    "Семейное кафе «Папа Ламаджо» в деревне Крючково: ламаджо, шашлык, люля-кебаб, шаурма и блюда на углях. Родниковая улица, 32. Пн 12:00–20:00, вт–сб 9:00–22:00, вс 11:00–20:00.",
  icons: {
    icon: [{ url: "/favicon.jpeg", type: "image/jpeg" }],
    apple: [{ url: "/favicon.jpeg", type: "image/jpeg" }],
  },
  openGraph: {
    title: "Папа Ламаджо — армянская и кавказская кухня в Крючково",
    description:
      "Семейное кафе «Папа Ламаджо» в деревне Крючково: ламаджо, шашлык, люля-кебаб, шаурма и блюда на углях. Родниковая улица, 32. Пн 12:00–20:00, вт–сб 9:00–22:00, вс 11:00–20:00.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${lora.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <UtilityStrip />
        <Masthead />
        {children}
        <Footer />
      </body>
    </html>
  );
}
