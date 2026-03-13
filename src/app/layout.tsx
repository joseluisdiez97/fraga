import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Fraga Pavlovas | Artisan Pavlovas",
  description:
    "Crujiente merengue, dulce de leche, crema suave y fresas frescas. Pavlovas artesanales hechas con amor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${libreBaskerville.variable} antialiased font-[family-name:var(--font-libre-baskerville)]`}
      >
        {children}
      </body>
    </html>
  );
}
