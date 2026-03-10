"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Payment() {
  const { t } = useLanguage();

  const methods = [
    {
      icon: (
        <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: t("payment.cash"),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Zelle",
      detail: "6294689733",
    },
  ];

  return (
    <section id="payment" className="py-20 sm:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t("payment.title")}
          </h2>
          <div className="w-20 h-1 bg-rose-400 mx-auto rounded-full" />
        </div>

        {/* Methods grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {methods.map((method) => (
            <div
              key={method.title}
              className="bg-rose-50/50 rounded-2xl p-6 sm:p-8 text-center hover:bg-rose-50 transition-all duration-300 border border-rose-100 hover:border-rose-200 hover:shadow-md"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
                {method.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{method.title}</h3>
              {method.detail && (
                <p className="text-sm text-rose-500 font-mono">{method.detail}</p>
              )}
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="bg-black rounded-2xl p-8 sm:p-10 text-center text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-6">{t("footer.contact")}</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <a
              href="tel:+16294689733"
              className="flex items-center gap-3 text-rose-300 hover:text-rose-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-medium">(629) 468-9733</span>
            </a>
            <a
              href="mailto:eatfragaa@gmail.com"
              className="flex items-center gap-3 text-rose-300 hover:text-rose-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">eatfragaa@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
