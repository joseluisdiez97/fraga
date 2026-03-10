"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: string;
  priceNum: number;
  description: string;
  servings?: string;
  badge?: string;
}

function ProductCard({ id, image, name, price, priceNum, description, servings, badge }: ProductCardProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-rose-50 hover:border-rose-200 hover:-translate-y-2">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-rose-50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {badge && (
          <span className="absolute top-3 right-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
            {badge}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-rose-500 transition-colors duration-300">
            {name}
          </h3>
          <span className="text-lg sm:text-xl font-bold text-rose-500 whitespace-nowrap ml-3">
            {price}
          </span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed mb-3">{description}</p>
        {servings && (
          <p className="text-xs text-rose-400 font-medium">{servings}</p>
        )}
        <button
          onClick={() => addItem({ id, name, price: priceNum, priceLabel: price, image })}
          className="mt-4 w-full text-center bg-black hover:bg-rose-500 text-white text-sm font-semibold py-3 rounded-full transition-all duration-300 tracking-wide cursor-pointer"
        >
          {t("cart.added")}
        </button>
      </div>
    </div>
  );
}

export default function Products() {
  const { t } = useLanguage();

  const rounds = [
    {
      id: "round-7",
      name: 'Pavlova 7"',
      price: "$50",
      priceNum: 50,
      servings: `${t("products.serves")} 5 - 7 ${t("products.portions")}`,
      image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "round-10",
      name: 'Pavlova 10"',
      price: "$70",
      priceNum: 70,
      servings: `${t("products.serves")} 8 - 10 ${t("products.portions")}`,
      image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "round-12",
      name: 'Pavlova 12"',
      price: "$90",
      priceNum: 90,
      servings: `${t("products.serves")} 13 - 16 ${t("products.portions")}`,
      image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "round-14",
      name: 'Pavlova 14"',
      price: "$130",
      priceNum: 130,
      servings: `${t("products.serves")} 18 - 24 ${t("products.portions")}`,
      image: "https://images.unsplash.com/photo-1558312657-b2dead03d494?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section id="products" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t("products.title")}
          </h2>
          <div className="w-20 h-1 bg-rose-400 mx-auto rounded-full" />
        </div>

        {/* Rounds */}
        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10 tracking-wide">
            {t("products.rounds")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {rounds.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                priceNum={product.priceNum}
                description={t("products.desc.round")}
                servings={product.servings}
              />
            ))}
          </div>
        </div>

        {/* Bites */}
        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10 tracking-wide">
            {t("products.bites")}
          </h3>
          <div className="max-w-md mx-auto">
            <ProductCard
              id="bites"
              image="https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop"
              name="Pavlova Bites"
              price={`$3 ${t("products.each")}`}
              priceNum={3}
              description={t("products.desc.bites")}
              servings={`${t("products.minimum")}: 12 ${t("products.pieces")}`}
              badge="Popular"
            />
          </div>
        </div>

        {/* Mini Pavlova */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10 tracking-wide">
            {t("products.mini")}
          </h3>
          <div className="max-w-md mx-auto">
            <ProductCard
              id="mini-box"
              image="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop"
              name={t("products.box")}
              price="$27.99"
              priceNum={27.99}
              description={t("products.desc.mini")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
