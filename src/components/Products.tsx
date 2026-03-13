"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

interface SizeOption {
  id: string;
  size: string;
  price: string;
  priceNum: number;
  servings: string;
  image: string;
}

interface PavlovaCategory {
  key: string;
  label: string;
  description: string;
  image: string;
  images: string[];
  sizes: SizeOption[];
}

function SizeModal({
  category,
  onClose,
}: {
  category: PavlovaCategory;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const { addItem, showToast } = useCart();
  const [selectedSize, setSelectedSize] = useState<SizeOption>(
    category.sizes[category.sizes.length - 1]
  );
  const [carouselIndex, setCarouselIndex] = useState(0);

  const images = category.images;

  const handleAdd = () => {
    addItem({
      id: selectedSize.id,
      name: `${category.label} ${selectedSize.size}`,
      price: selectedSize.priceNum,
      priceLabel: selectedSize.price,
      image: selectedSize.image,
    });
    showToast(`${category.label} ${selectedSize.size} ${t("cart.addedToast")}`);
  };

  const prevSlide = () =>
    setCarouselIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextSlide = () =>
    setCarouselIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xs w-full z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-rose-50 transition-colors cursor-pointer z-20"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image carousel */}
        <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-rose-50">
          {images.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === carouselIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={img}
                alt={`${category.label} ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 500px"
              />
            </div>
          ))}

          {/* Carousel arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors cursor-pointer z-10"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors cursor-pointer z-10"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === carouselIndex
                        ? "bg-white scale-110"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-0.5">{category.label}</h3>
          <p className="text-xs text-gray-500 mb-3">{category.description}</p>

          {/* Size buttons */}
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {t("products.chooseSize")}
          </p>
          <div className="flex gap-2 mb-3">
            {category.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 py-2 rounded-lg text-center text-sm font-bold transition-all duration-300 cursor-pointer border-2 ${
                  selectedSize?.id === size.id
                    ? "border-rose-500 bg-rose-50 text-rose-600"
                    : "border-gray-200 bg-white text-gray-700 hover:border-rose-200"
                }`}
              >
                {size.size}
              </button>
            ))}
          </div>

          {/* Selected size details + add to cart */}
          <div className="bg-rose-50 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-rose-500">{selectedSize.price}</p>
            <p className="text-[10px] text-gray-500 mb-2">{selectedSize.servings}</p>
            <button
              onClick={handleAdd}
              className="w-full px-4 py-2.5 bg-black hover:bg-rose-500 text-white text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer"
            >
              {t("cart.added")}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Products() {
  const { t } = useLanguage();
  const [modalCategory, setModalCategory] = useState<PavlovaCategory | null>(null);
  const [showBitesModal, setShowBitesModal] = useState(false);
  const [showMiniModal, setShowMiniModal] = useState(false);

  const categories: PavlovaCategory[] = [
    {
      key: "pavlova",
      label: "Pavlova",
      description: t("products.desc.round"),
      image: "/pavlova/pavlova.jpeg",
      images: ["/pavlova/pavlova.jpeg", "/pavlova/pavlova1.jpeg", "/pavlova/pavlova2.jpeg", "/pavlova/pavlova3.jpeg", "/pavlova/pavlova4.jpeg"],
      sizes: [
        {
          id: "pavlova-7",
          size: '7"',
          price: "$50",
          priceNum: 50,
          servings: `${t("products.serves")} 5 - 7 ${t("products.portions")}`,
          image: "/pavlova/pavlova1.jpeg",
        },
        {
          id: "pavlova-10",
          size: '10"',
          price: "$70",
          priceNum: 70,
          servings: `${t("products.serves")} 8 - 10 ${t("products.portions")}`,
          image: "/pavlova/pavlova2.jpeg",
        },
        {
          id: "pavlova-12",
          size: '12"',
          price: "$90",
          priceNum: 90,
          servings: `${t("products.serves")} 13 - 16 ${t("products.portions")}`,
          image: "/pavlova/pavlova3.jpeg",
        },
        {
          id: "pavlova-14",
          size: '14"',
          price: "$130",
          priceNum: 130,
          servings: `${t("products.serves")} 18 - 22 ${t("products.portions")}`,
          image: "/pavlova/pavlova4.jpeg",
        },
      ],
    },
    {
      key: "corazones",
      label: t("products.hearts"),
      description: t("products.desc.heart"),
      image: "/corazones/corazon1.jpeg",
      images: ["/corazones/corazon.jpeg", "/corazones/corazon1.jpeg"],
      sizes: [
        {
          id: "heart-10",
          size: '10"',
          price: "$85",
          priceNum: 85,
          servings: `${t("products.serves")} 8 - 10 ${t("products.portions")}`,
          image: "/corazones/corazon.jpeg",
        },
        {
          id: "heart-12",
          size: '12"',
          price: "$105",
          priceNum: 105,
          servings: `${t("products.serves")} 13 - 16 ${t("products.portions")}`,
          image: "/corazones/corazon1.jpeg",
        },
      ],
    },
    {
      key: "letras",
      label: t("products.letters"),
      description: t("products.desc.letter"),
      image: "/letras/letra.jpeg",
      images: ["/letras/letra.jpeg", "/letras/letraA.jpeg"],
      sizes: [
        {
          id: "letter-10",
          size: '10"',
          price: "$100",
          priceNum: 100,
          servings: `${t("products.serves")} 8 - 10 ${t("products.portions")}`,
          image: "/letras/letra.jpeg",
        },
        {
          id: "letter-12",
          size: '12"',
          price: "$115",
          priceNum: 115,
          servings: `${t("products.serves")} 13 - 16 ${t("products.portions")}`,
          image: "/letras/letraA.jpeg",
        },
      ],
    },
    {
      key: "numeros",
      label: t("products.numbers"),
      description: t("products.desc.number"),
      image: "/numeros/numero30.jpeg",
      images: ["/numeros/numero30.jpeg"],
      sizes: [
        {
          id: "number-10",
          size: '10"',
          price: "$95",
          priceNum: 95,
          servings: `${t("products.serves")} 8 - 10 ${t("products.portions")}`,
          image: "/numeros/numero30.jpeg",
        },
        {
          id: "number-12",
          size: '12"',
          price: "$110",
          priceNum: 110,
          servings: `${t("products.serves")} 13 - 16 ${t("products.portions")}`,
          image: "/numeros/numero30.jpeg",
        },
      ],
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

        {/* Pavlovas grid */}
        <div className="mb-20">
          <h3 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-10 tracking-wide">
            Pavlovas
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => {
              const priceRange =
                cat.sizes.length > 1
                  ? `${cat.sizes[0].price} - ${cat.sizes[cat.sizes.length - 1].price}`
                  : cat.sizes[0].price;
              return (
                <button
                  key={cat.key}
                  onClick={() => setModalCategory(cat)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-rose-50 hover:border-rose-200 hover:-translate-y-2 text-left cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden bg-rose-50">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    {cat.key === "corazones" && (
                      <span className="absolute top-3 right-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                        Popular
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white font-bold text-base sm:text-lg drop-shadow-lg">
                        {cat.label}
                      </h4>
                      <p className="text-white/90 text-xs sm:text-sm font-semibold drop-shadow-lg">
                        {priceRange}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Size selection modal */}
        {modalCategory && (
          <SizeModal
            category={modalCategory}
            onClose={() => setModalCategory(null)}
          />
        )}

        {/* Bites & Mini Pavlova */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
          <div className="flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10 tracking-wide">
              {t("products.bites")}
            </h3>
            <button
              onClick={() => setShowBitesModal(true)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-rose-50 hover:border-rose-200 hover:-translate-y-2 text-left cursor-pointer flex flex-col flex-1"
            >
              <div className="relative aspect-square overflow-hidden bg-rose-50">
                <Image
                  src="/bite/bite.jpeg"
                  alt="Pavlova Bites"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-white font-bold text-base sm:text-lg drop-shadow-lg">Pavlova Bites</h4>
                  <p className="text-white/90 text-xs sm:text-sm font-semibold drop-shadow-lg">$3 {t("products.each")}</p>
                </div>
              </div>
            </button>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10 tracking-wide">
              {t("products.mini")}
            </h3>
            <button
              onClick={() => setShowMiniModal(true)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-rose-50 hover:border-rose-200 hover:-translate-y-2 text-left cursor-pointer flex flex-col flex-1"
            >
              <div className="relative aspect-square overflow-hidden bg-rose-50">
                <Image
                  src="/mini/mini.jpeg"
                  alt="Mini Pavlova"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-white font-bold text-base sm:text-lg drop-shadow-lg">{t("products.mini")}</h4>
                  <p className="text-white/90 text-xs sm:text-sm font-semibold drop-shadow-lg">$27.99</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Bites modal */}
        {showBitesModal && (
          <BitesModal onClose={() => setShowBitesModal(false)} />
        )}

        {/* Mini modal */}
        {showMiniModal && (
          <MiniModal onClose={() => setShowMiniModal(false)} />
        )}
      </div>
    </section>
  );
}

function BitesModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const { addItem, showToast } = useCart();
  const [quantity, setQuantity] = useState(12);
  const pricePerPiece = 3;

  const total = quantity * pricePerPiece;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xs w-full z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-rose-50 transition-colors cursor-pointer z-20"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-rose-50">
          <Image
            src="/bite/bite.jpeg"
            alt="Pavlova Bites"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 500px"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-0.5">Pavlova Bites</h3>
          <p className="text-xs text-gray-500 mb-3">{t("products.desc.bites")}</p>

          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {t("products.quantity")}
          </p>

          {/* Quantity selector */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <button
              onClick={() => setQuantity((q) => Math.max(12, q - 1))}
              className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-rose-300 text-gray-600 hover:text-rose-500 transition-all cursor-pointer text-lg font-bold"
            >
              −
            </button>
            <span className="text-2xl font-bold text-gray-900 w-10 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-rose-300 text-gray-600 hover:text-rose-500 transition-all cursor-pointer text-lg font-bold"
            >
              +
            </button>
          </div>

          <p className="text-[10px] text-center text-rose-400 font-medium mb-3">
            {t("products.bitesMin")}
          </p>

          <div className="bg-rose-50 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-rose-500">${total}</p>
            <button
              onClick={() => {
                addItem({
                  id: "bites",
                  name: `Pavlova Bites (×${quantity})`,
                  price: total,
                  priceLabel: `$${total}`,
                  image: "/bite/bite.jpeg",
                });
                showToast(`Pavlova Bites (×${quantity}) ${t("cart.addedToast")}`);
              }}
              className="mt-2 w-full px-4 py-2.5 bg-black hover:bg-rose-500 text-white text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer"
            >
              {t("cart.added")}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function MiniModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const { addItem, showToast } = useCart();
  const [quantity, setQuantity] = useState(1);
  const pricePerBox = 27.99;

  const total = +(quantity * pricePerBox).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xs w-full z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-rose-50 transition-colors cursor-pointer z-20"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-rose-50">
          <Image
            src="/mini/mini.jpeg"
            alt="Mini Pavlova"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 500px"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-0.5">{t("products.box")}</h3>
          <p className="text-xs text-gray-500 mb-3">{t("products.desc.mini")}</p>

          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {t("products.quantity")}
          </p>

          {/* Quantity selector */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-rose-300 text-gray-600 hover:text-rose-500 transition-all cursor-pointer text-lg font-bold"
            >
              −
            </button>
            <span className="text-2xl font-bold text-gray-900 w-10 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-rose-300 text-gray-600 hover:text-rose-500 transition-all cursor-pointer text-lg font-bold"
            >
              +
            </button>
          </div>

          <div className="bg-rose-50 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-rose-500">${total}</p>
            <button
              onClick={() => {
                addItem({
                  id: "mini-box",
                  name: `${t("products.box")} (×${quantity})`,
                  price: total,
                  priceLabel: `$${total}`,
                  image: "/mini/mini.jpeg",
                });
                showToast(`${t("products.box")} (×${quantity}) ${t("cart.addedToast")}`);
              }}
              className="mt-2 w-full px-4 py-2.5 bg-black hover:bg-rose-500 text-white text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer"
            >
              {t("cart.added")}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
