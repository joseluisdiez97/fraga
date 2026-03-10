"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function OrderInfo() {
  const { t } = useLanguage();

  return (
    <section id="orders" className="py-20 sm:py-28 bg-rose-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t("orders.title")}
          </h2>
          <div className="w-20 h-1 bg-rose-400 mx-auto rounded-full" />
        </div>

        {/* Notice */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-rose-100 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 mb-4">
            <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-lg sm:text-xl font-semibold text-gray-900">
            {t("orders.advance")}
          </p>
        </div>

        {/* Pickup & Delivery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Pickup */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-rose-100 hover:border-rose-200 transition-all duration-300 hover:shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 mb-5">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t("orders.pickup")}</h3>
            <p className="text-gray-500">{t("orders.pickup.desc")}</p>
          </div>

          {/* Delivery */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-rose-100 hover:border-rose-200 transition-all duration-300 hover:shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 mb-5">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t("orders.delivery")}</h3>
            <p className="text-gray-500">{t("orders.delivery.desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
