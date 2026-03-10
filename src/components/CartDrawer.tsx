"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

type DeliveryMethod = "" | "pickup" | "delivery";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isOpen, setIsOpen } = useCart();
  const { t } = useLanguage();

  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  // Minimum date: 24h from now
  const minDate = useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() + 24);
    return d.toISOString().split("T")[0];
  }, []);

  const isDateValid = deliveryDate >= minDate;
  const isFormValid =
    deliveryDate !== "" &&
    isDateValid &&
    deliveryMethod !== "" &&
    (deliveryMethod === "pickup" || deliveryAddress.trim() !== "");

  const buildWhatsAppMessage = () => {
    let msg = `${t("cart.wa.greeting")}\n\n`;
    items.forEach((item) => {
      msg += `• ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    msg += `\n${t("cart.total")}: $${totalPrice.toFixed(2)}`;
    msg += `\n\n📅 ${t("cart.wa.date")}: ${deliveryDate}`;
    msg += `\n📍 ${t("cart.wa.location")}: ${deliveryMethod === "pickup" ? "Pickup" : "Delivery"}`;
    if (deliveryMethod === "delivery" && deliveryAddress) {
      msg += `\n🏠 ${t("cart.wa.address")}: ${deliveryAddress}`;
    }
    return encodeURIComponent(msg);
  };

  const handleOrder = (e: React.MouseEvent) => {
    if (!isFormValid) {
      e.preventDefault();
      setShowErrors(true);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-rose-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {t("cart.title")} ({totalItems})
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-rose-50 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <p className="text-sm">{t("cart.empty")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 bg-rose-50/50 rounded-xl p-3 border border-rose-100"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-sm text-rose-500 font-bold">{item.priceLabel}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-rose-200 text-rose-500 hover:bg-rose-100 transition-colors text-sm cursor-pointer"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold text-gray-900 w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-rose-200 text-rose-500 hover:bg-rose-100 transition-colors text-sm cursor-pointer"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-rose-100 p-5 space-y-3 max-h-[55vh] overflow-y-auto">
              {/* Date picker */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  📅 {t("cart.date")}
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  min={minDate}
                  onChange={(e) => { setDeliveryDate(e.target.value); setShowErrors(false); }}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors ${
                    showErrors && (!deliveryDate || !isDateValid)
                      ? "border-red-300 bg-red-50"
                      : "border-rose-200 focus:border-rose-400 bg-white"
                  }`}
                />
                {showErrors && deliveryDate && !isDateValid && (
                  <p className="text-xs text-red-500 mt-1">{t("cart.date.error")}</p>
                )}
              </div>

              {/* Delivery method */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  📍 {t("cart.delivery")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setDeliveryMethod("pickup"); setShowErrors(false); }}
                    className={`py-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      deliveryMethod === "pickup"
                        ? "bg-black text-white border-black"
                        : showErrors && !deliveryMethod
                        ? "border-red-300 bg-red-50 text-gray-700"
                        : "border-rose-200 text-gray-700 hover:border-rose-400"
                    }`}
                  >
                    {t("cart.delivery.pickup")}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setDeliveryMethod("delivery"); setShowErrors(false); }}
                    className={`py-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      deliveryMethod === "delivery"
                        ? "bg-black text-white border-black"
                        : showErrors && !deliveryMethod
                        ? "border-red-300 bg-red-50 text-gray-700"
                        : "border-rose-200 text-gray-700 hover:border-rose-400"
                    }`}
                  >
                    {t("cart.delivery.delivery")}
                  </button>
                </div>
              </div>

              {/* Address input (only for delivery) */}
              {deliveryMethod === "delivery" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    🏠 {t("cart.delivery.address")}
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => { setDeliveryAddress(e.target.value); setShowErrors(false); }}
                    placeholder={t("cart.delivery.address.placeholder")}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors ${
                      showErrors && !deliveryAddress.trim()
                        ? "border-red-300 bg-red-50"
                        : "border-rose-200 focus:border-rose-400 bg-white"
                    }`}
                  />
                </div>
              )}

              {/* Error message */}
              {showErrors && !isFormValid && (
                <p className="text-xs text-red-500 text-center">{t("cart.fields.required")}</p>
              )}

              {/* Total */}
              <div className="flex items-center justify-between pt-2 border-t border-rose-50">
                <span className="text-lg font-bold text-gray-900">{t("cart.total")}</span>
                <span className="text-xl font-bold text-rose-500">${totalPrice.toFixed(2)}</span>
              </div>

              {/* WhatsApp */}
              <a
                href={isFormValid ? `https://wa.me/16294689733?text=${buildWhatsAppMessage()}` : "#"}
                target={isFormValid ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={handleOrder}
                className={`flex items-center justify-center gap-2 w-full font-semibold py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide ${
                  isFormValid
                    ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("cart.whatsapp")}
              </a>

              {/* Zelle */}
              <div className="bg-rose-50 rounded-xl p-4 text-center border border-rose-100">
                <p className="text-xs text-gray-500 mb-1">{t("cart.zelle.label")}</p>
                <p className="text-lg font-bold text-gray-900 font-mono">6294689733</p>
                <p className="text-xs text-gray-400 mt-1">eatfragaa@gmail.com</p>
              </div>

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-gray-400 hover:text-red-400 transition-colors py-2 cursor-pointer"
              >
                {t("cart.clear")}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
