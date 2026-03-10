"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import OrderInfo from "@/components/OrderInfo";
import Payment from "@/components/Payment";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <LanguageProvider>
      <CartProvider>
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
