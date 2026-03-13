"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "es" | "en";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.products": { es: "Productos", en: "Products" },
  "nav.orders": { es: "Pedidos", en: "Orders" },
  "nav.payment": { es: "Pago", en: "Payment" },
  "nav.contact": { es: "Contacto", en: "Contact" },

  // Hero
  "hero.title": { es: "Fraga Pavlovas", en: "Fraga Pavlovas" },
  "hero.subtitle": {
    es: "Crujiente merengue, dulce de leche, crema suave y fresas frescas.",
    en: "Crispy meringue, dulce de leche, smooth cream and fresh strawberries.",
  },
  "hero.cta": { es: "Ordenar ahora", en: "Order now" },

  // Products
  "products.title": { es: "Nuestros Productos", en: "Our Products" },
  "products.pavlovas": { es: "Pavlovas", en: "Pavlovas" },
  "products.hearts": { es: "Corazones", en: "Hearts" },
  "products.letters": { es: "Letras", en: "Letters" },
  "products.numbers": { es: "Números", en: "Numbers" },
  "products.rounds": { es: "Rounds", en: "Rounds" },
  "products.bites": { es: "Bites", en: "Bites" },
  "products.mini": { es: "Mini Pavlova", en: "Mini Pavlova" },
  "products.serves": { es: "Rinde aprox.", en: "Serves approx." },
  "products.portions": { es: "porciones", en: "servings" },
  "products.each": { es: "cada uno", en: "each" },
  "products.minimum": { es: "Mínimo", en: "Minimum" },
  "products.pieces": { es: "piezas", en: "pieces" },
  "products.bitesBox": { es: "Caja de 12 piezas", en: "Box of 12 pieces" },
  "products.bitesMin": { es: "Mínimo 12 piezas", en: "Minimum 12 pieces" },
  "products.quantity": { es: "Cantidad", en: "Quantity" },
  "products.box": { es: "Caja de 2 mini pavlovas", en: "Box of 2 mini pavlovas" },
  "products.desc.heart": {
    es: "Pavlova en forma de corazón, perfecta para ocasiones especiales. Merengue crujiente, dulce de leche, crema suave y fresas frescas.",
    en: "Heart-shaped Pavlova, perfect for special occasions. Crispy meringue, dulce de leche, smooth cream and fresh strawberries.",
  },
  "products.desc.letter": {
    es: "Pavlova en forma de letra, ideal para personalizar tu celebración. Merengue crujiente, dulce de leche, crema suave y fresas frescas.",
    en: "Letter-shaped Pavlova, ideal for personalizing your celebration. Crispy meringue, dulce de leche, smooth cream and fresh strawberries.",
  },
  "products.desc.number": {
    es: "Pavlova en forma de número, perfecta para cumpleaños y aniversarios. Merengue crujiente, dulce de leche, crema suave y fresas frescas.",
    en: "Number-shaped Pavlova, perfect for birthdays and anniversaries. Crispy meringue, dulce de leche, smooth cream and fresh strawberries.",
  },
  "products.desc.round": {
    es: "Una obra maestra de merengue crujiente, dulce de leche, crema suave y fresas frescas.",
    en: "A masterpiece of crispy meringue, dulce de leche, smooth cream and fresh strawberries.",
  },
  "products.desc.bites": {
    es: "Un delicado equilibrio de merengue crujiente y nueces, acompañado de dulce de leche, crema suave y fresas frescas. Perfecto para fiestas y mesas de postres.",
    en: "A delicate balance of crispy meringue and nuts, accompanied by dulce de leche, smooth cream and fresh strawberries. Perfect for parties and dessert tables.",
  },
  "products.desc.mini": {
    es: "Una mini obra maestra de merengue crujiente, dulce de leche, crema suave y fresas frescas.",
    en: "A mini masterpiece of crispy meringue, dulce de leche, smooth cream and fresh strawberries.",
  },
  "products.order": { es: "Ordenar", en: "Order" },
  "products.chooseSize": { es: "Elegir tamaño", en: "Choose size" },

  // Orders
  "orders.title": { es: "Información de Pedidos", en: "Order Information" },
  "orders.advance": {
    es: "Los pedidos deben realizarse con 24 horas de anticipación.",
    en: "Orders must be placed 24 hours in advance.",
  },
  "orders.pickup": { es: "Pickup", en: "Pickup" },
  "orders.pickup.desc": {
    es: "Dirección disponible bajo solicitud.",
    en: "Address available upon request.",
  },
  "orders.delivery": { es: "Delivery", en: "Delivery" },
  "orders.delivery.desc": {
    es: "El costo de envío varía entre $20 y $25 dependiendo de la zona.",
    en: "Shipping cost varies between $20 and $25 depending on the area.",
  },

  // Payment
  "payment.title": { es: "Métodos de Pago", en: "Payment Methods" },
  "payment.credit": { es: "Tarjetas de crédito", en: "Credit cards" },
  "payment.cash": { es: "Efectivo", en: "Cash" },
  "payment.phone": { es: "Teléfono", en: "Phone" },

  // Cart
  "cart.title": { es: "Carrito", en: "Cart" },
  "cart.empty": { es: "Tu carrito está vacío", en: "Your cart is empty" },
  "cart.total": { es: "Total", en: "Total" },
  "cart.whatsapp": { es: "Pedir por WhatsApp", en: "Order via WhatsApp" },
  "cart.zelle.label": { es: "Pagar con Zelle a:", en: "Pay with Zelle to:" },
  "cart.clear": { es: "Vaciar carrito", en: "Clear cart" },
  "cart.added": { es: "Añadir al carrito", en: "Add to cart" },
  "cart.addedToast": { es: "añadido al carrito", en: "added to cart" },
  "cart.wa.greeting": { es: "¡Hola! Me gustaría hacer el siguiente pedido:", en: "Hi! I would like to place the following order:" },
  "cart.date": { es: "Fecha de entrega", en: "Delivery date" },
  "cart.date.placeholder": { es: "Selecciona una fecha", en: "Select a date" },
  "cart.date.error": { es: "Debe ser al menos 24h de anticipación", en: "Must be at least 24h in advance" },
  "cart.delivery": { es: "Lugar de entrega", en: "Delivery location" },
  "cart.delivery.pickup": { es: "Pickup (recoger en tienda)", en: "Pickup (collect in store)" },
  "cart.delivery.delivery": { es: "Delivery ($20 - $25)", en: "Delivery ($20 - $25)" },
  "cart.delivery.address": { es: "Dirección de entrega", en: "Delivery address" },
  "cart.delivery.address.placeholder": { es: "Escribe tu dirección...", en: "Enter your address..." },
  "cart.fields.required": { es: "Completa fecha y lugar de entrega", en: "Complete date and delivery location" },
  "cart.wa.date": { es: "Fecha", en: "Date" },
  "cart.wa.location": { es: "Entrega", en: "Delivery" },
  "cart.wa.address": { es: "Dirección", en: "Address" },

  // Footer
  "footer.rights": { es: "Todos los derechos reservados", en: "All rights reserved" },
  "footer.contact": { es: "Contacto", en: "Contact" },
  "footer.follow": { es: "Síguenos", en: "Follow us" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
