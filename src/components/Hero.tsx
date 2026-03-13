"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/pavlova/pavlova.jpeg"
          alt="Fraga Pavlovas"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-6 animate-fade-in">
          {t("hero.title")}
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-rose-100 font-light mb-10 leading-relaxed max-w-2xl mx-auto">
          {t("hero.subtitle")}
        </p>
        <a
          href="#products"
          className="inline-block bg-rose-400 hover:bg-rose-500 text-white text-sm sm:text-base font-semibold px-10 py-4 rounded-full tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:shadow-rose-400/30 hover:-translate-y-0.5"
        >
          {t("hero.cta")}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
