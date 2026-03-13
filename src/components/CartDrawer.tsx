"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isOpen, setIsOpen } = useCart();
  const { t } = useLanguage();
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [tipPercent, setTipPercent] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState("");
  const [orderError, setOrderError] = useState("");

  const canOrder = deliveryDate !== "" && (deliveryMethod === "pickup" || deliveryAddress.trim() !== "");

  const tipAmount = tipPercent !== null
    ? +(totalPrice * tipPercent / 100).toFixed(2)
    : customTip ? +(totalPrice * parseFloat(customTip) / 100).toFixed(2) || 0 : 0;
  const grandTotal = +(totalPrice + tipAmount).toFixed(2);

  const minDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const buildWhatsAppMessage = () => {
    let msg = `${t("cart.wa.greeting")}\n\n`;
    items.forEach((item) => {
      const isBitesOrMini = item.id === "bites" || item.id === "mini-box";
      if (isBitesOrMini) {
        const innerQty = item.name.match(/×(\d+)/)?.[1] ?? "";
        const displayName = item.name.replace(/\s*\(×\d+\)/, "");
        msg += `• ${displayName} x${innerQty} — $${(item.price * item.quantity).toFixed(2)}\n`;
      } else {
        msg += `• ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}\n`;
      }
    });
    msg += `\n${t("cart.total")}: $${grandTotal.toFixed(2)}`;
    if (tipAmount > 0) msg += ` (${t("cart.tip")}: $${tipAmount.toFixed(2)})`;
    msg += `\n${deliveryMethod === "pickup" ? t("cart.delivery.pickup") : t("cart.delivery.delivery")}`;
    if (deliveryDate) msg += `\n${t("cart.date")}: ${deliveryDate}`;
    if (deliveryMethod === "delivery" && deliveryAddress.trim()) msg += `\n${t("cart.delivery.address")}: ${deliveryAddress.trim()}`;
    return encodeURIComponent(msg);
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
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-2 bg-rose-50/50 rounded-lg p-2 border border-rose-100"
                  >
                    <div className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-semibold text-gray-900 truncate">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-0.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center rounded-full border border-rose-200 text-rose-500 hover:bg-rose-100 transition-colors text-[10px] cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-[11px] font-semibold text-gray-900 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center rounded-full border border-rose-200 text-rose-500 hover:bg-rose-100 transition-colors text-[10px] cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-[11px] text-rose-500 font-bold">{item.priceLabel}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-rose-100 px-4 py-3 space-y-2">
              {/* Pickup / Delivery */}
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {t("cart.delivery")}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDeliveryMethod("pickup")}
                    className={`flex-1 py-1.5 rounded-lg text-center text-xs font-bold transition-all duration-300 cursor-pointer border-2 ${
                      deliveryMethod === "pickup"
                        ? "border-rose-500 bg-rose-50 text-rose-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-rose-200"
                    }`}
                  >
                    {t("cart.delivery.pickup")}
                  </button>
                  <button
                    onClick={() => setDeliveryMethod("delivery")}
                    className={`flex-1 py-1.5 rounded-lg text-center text-xs font-bold transition-all duration-300 cursor-pointer border-2 ${
                      deliveryMethod === "delivery"
                        ? "border-rose-500 bg-rose-50 text-rose-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-rose-200"
                    }`}
                  >
                    {t("cart.delivery.delivery")}
                  </button>
                </div>
              </div>

              {/* Address (delivery only) */}
              {deliveryMethod === "delivery" && (
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {t("cart.delivery.address")} *
                  </p>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => { setDeliveryAddress(e.target.value); setOrderError(""); }}
                    placeholder={t("cart.delivery.address.placeholder")}
                    className={`w-full px-3 py-1.5 rounded-lg border-2 text-xs text-gray-700 focus:border-rose-500 focus:outline-none transition-colors ${
                      deliveryAddress.trim() === "" ? "border-rose-300" : "border-gray-200"
                    }`}
                  />
                </div>
              )}

              {/* Date */}
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {t("cart.date")} *
                </p>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => { setDeliveryDate(e.target.value); setOrderError(""); }}
                  onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                  min={minDate()}
                  className={`w-full px-3 py-1.5 rounded-lg border-2 text-xs text-gray-700 focus:border-rose-500 focus:outline-none transition-colors cursor-pointer ${
                    deliveryDate === "" ? "border-rose-300" : "border-gray-200"
                  }`}
                />
              </div>

              {/* Tip */}
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {t("cart.tip")}
                </p>
                <div className="flex gap-1.5">
                  {[5, 10, 20].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => { setTipPercent(tipPercent === pct ? null : pct); setCustomTip(""); }}
                      className={`flex-1 py-1.5 rounded-lg text-center text-xs font-bold transition-all duration-300 cursor-pointer border-2 ${
                        tipPercent === pct
                          ? "border-rose-500 bg-rose-50 text-rose-600"
                          : "border-gray-200 bg-white text-gray-700 hover:border-rose-200"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder={t("cart.tip.other")}
                      value={customTip}
                      onChange={(e) => { const v = e.target.value.replace(/[^0-9.]/g, ""); setCustomTip(v); setTipPercent(null); }}
                      className="w-full py-1.5 px-2 rounded-lg border-2 border-gray-200 text-xs text-gray-700 text-center focus:border-rose-500 focus:outline-none transition-colors"
                    />
                    {customTip && <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>}
                  </div>
                </div>
                {tipAmount > 0 && (
                  <p className="text-xs text-rose-500 font-semibold text-right mt-1">+${tipAmount.toFixed(2)}</p>
                )}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900">{t("cart.total")}</span>
                <span className="text-sm font-bold text-rose-500">${grandTotal.toFixed(2)}</span>
              </div>

              {/* WhatsApp */}
              {orderError && (
                <p className="text-[11px] text-red-500 font-semibold text-center bg-red-50 rounded-lg py-1.5 px-2">
                  {orderError}
                </p>
              )}
              <a
                href={canOrder ? `https://wa.me/16294689733?text=${buildWhatsAppMessage()}` : undefined}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!canOrder) {
                    e.preventDefault();
                    if (!deliveryDate) setOrderError(t("cart.error.date"));
                    else if (deliveryMethod === "delivery" && !deliveryAddress.trim()) setOrderError(t("cart.error.address"));
                  } else {
                    setOrderError("");
                  }
                }}
                className="flex items-center justify-center gap-2 w-full font-semibold py-2 rounded-full transition-all duration-300 text-xs tracking-wide bg-green-500 hover:bg-green-600 text-white cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("cart.whatsapp")}
              </a>

              {/* Zelle */}
              <p className="text-[9px] text-gray-400 text-center leading-tight">
                {t("cart.zelle.label")} <span className="font-semibold text-gray-600 font-mono">6294689733</span> · <span className="text-gray-500">eatfragaa@gmail.com</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
