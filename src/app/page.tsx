"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider, useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import OrderInfo from "@/components/OrderInfo";
import Payment from "@/components/Payment";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

function GlobalToast() {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
      <div className="bg-emerald-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-xl whitespace-nowrap">
        ✓ {toastMessage}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <CartProvider>
        <GlobalToast />
        <Navbar />
        <CartDrawer />
        <main>
          <Hero />
          <Products />
          <OrderInfo />
          <Payment />
        </main>
        <Footer />
      </CartProvider>
    </LanguageProvider>
  );
}
