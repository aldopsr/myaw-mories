import { useState, useEffect } from "react";
import { motion } from "motion/react";
import PolaroidCard from "../components/PolaroidCard";
import { ArrowRight, Sparkles, Star, Heart, Instagram, Package, MessageCircle, Gift } from "lucide-react";

const IMAGES = {
  hero: "/images/scrapbook_hero_1779100728856.png",
  keychain: "/images/product_keychain_1779100759746.png",
};

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
}

const REVIEWS = [
  {
    name: "Sarah K.",
    text: "Scrapbook-nya cantik banget, packaging-nya juga super rapi dan ada note tulisan tangan! Worth every penny 🥺",
    rating: 5,
    tag: "Scrapbook Anniversary",
  },
  {
    name: "Dinda R.",
    text: "Udah order 3x dan selalu puas! Kualitasnya konsisten, detail-nya luar biasa. Highly recommend!",
    rating: 5,
    tag: "Acrylic Keychain",
  },
  {
    name: "Feli A.",
    text: "Beli buat kado ultah sahabat dan dia nangis kaget 😭 Thank you Myaw Mories, kalian the best!",
    rating: 5,
    tag: "Custom Scrapbook",
  },
];

const HOW_TO_ORDER = [
  {
    icon: <Package size={24} />,
    step: "01",
    title: "Browse Catalog",
    desc: "Pilih produk favoritmu dari catalog kami dan catat judul serta customisasi yang kamu mau.",
  },
  {
    icon: <MessageCircle size={24} />,
    step: "02",
    title: "DM Instagram",
    desc: "Kirim DM ke @myawmories dengan detail pesananmu. Kami akan konfirmasi ketersediaan & harga.",
  },
  {
    icon: <Gift size={24} />,
    step: "03",
    title: "Terima Paket",
    desc: "Setelah pembayaran, pesananmu dikerjakan dengan penuh cinta dan dikirim dalam packaging cantik!",
  },
];

const MARQUEE_ITEMS = [
  "✨ Handmade with love",
  "🐱 Custom orders open",
  "🎁 Free gift wrapping",
  "💌 Personalized note",
  "⭐ 100% handcrafted",
  "🌸 Est. 2026",
];

export default function Home({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data: Product[]) => setFeatured(data.slice(0, 4)))
      .catch(() => {});
  }, []);

  const handleInstagram = () => window.open("https://www.instagram.com/myawmories/", "_blank");

  return (
    <div className="overflow-x-hidden pb-4">

      {/* ── Hero ── */}
      <section className="relative pt-1 pb-16 md:pt-16 md:pb-28 bg-surface overflow-hidden">
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-10 left-[5%] text-primary/30 z-0 pointer-events-none">
          <Sparkles size={45} />
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute top-32 right-[10%] text-primary/20 z-0 pointer-events-none">
          <Heart size={30} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute bottom-20 right-[5%] text-primary/20 rotate-12 z-0 hidden sm:block pointer-events-none">
          <Star size={70} fill="currentColor" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-block mb-4">
                <span className="washi-tape text-xs uppercase tracking-widest font-bold px-4 py-1.5 bg-primary/20 text-primary rounded-sm rotate-2 inline-block">
                  New Arrivals ✨
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold mb-4 text-on-surface leading-tight">
                Scrapbooks &{" "}
                <span className="text-primary italic relative inline-block">
                  cute gifts
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-2 left-0 h-2 bg-primary-container/80 -z-10 rounded-full"
                  />
                </span>{" "}
                <br /> for your favorite people
              </h1>
              <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-lg leading-relaxed">
                Turn your precious memories into tangible magic with our handcrafted scrapbooks and kawaii-inspired stationery.
              </p>

              {/* Desktop buttons */}
              <div className="hidden sm:flex flex-wrap gap-3">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onNavigate("catalog")}
                  className="px-8 py-4 bg-primary text-white font-bold rounded-full flex items-center gap-2 shadow-lg shadow-primary/30">
                  Shop Catalog <ArrowRight size={16} />
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleInstagram}
                  className="px-8 py-4 bg-white border-2 border-primary text-primary font-bold rounded-full flex items-center gap-2">
                  <Instagram size={16} /> Order via Instagram
                </motion.button>
              </div>

              {/* Mobile buttons */}
              <div className="flex sm:hidden flex-col gap-3 w-full">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => onNavigate("catalog")}
                  className="w-full py-4 bg-primary text-white font-bold rounded-full flex items-center justify-center gap-2 text-sm shadow-lg shadow-primary/30">
                  Shop Catalog <ArrowRight size={16} />
                </motion.button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleInstagram}
                  className="w-full py-3.5 bg-transparent border-2 border-primary/40 text-primary font-bold rounded-full flex items-center justify-center gap-2 text-sm">
                  <Instagram size={16} /> Order via Instagram
                </motion.button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative mt-8 lg:mt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary-container/40 rounded-full blur-3xl -z-10" />
              <motion.div whileHover={{ rotate: 2, scale: 1.02 }} className="polaroid -rotate-3 transition-transform duration-500 max-w-[280px] sm:max-w-sm mx-auto shadow-xl bg-white p-3 pb-6 rounded-md">
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-3">
                  <img src={IMAGES.hero} alt="Scrapbook set" className="w-full h-full object-cover" />
                </div>
                <p className="text-center font-display font-bold text-on-surface-variant text-sm flex justify-center items-center gap-1">
                  Where the magic happens <Sparkles size={14} className="text-primary" />
                </p>
              </motion.div>
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-8 -left-2 w-24 h-24 bg-surface rounded-full p-2 shadow-lg rotate-12 hidden sm:block border-2 border-primary/10">
                <img src={IMAGES.keychain} alt="Keychain" className="w-full h-full object-cover rounded-full" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Marquee Banner ── */}
      <div className="bg-primary py-3 overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="flex gap-0 whitespace-nowrap"
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-white text-xs font-bold px-6 opacity-90">
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Featured Products ── */}
      <section className="py-16 md:py-24 bg-white border-y border-surface-container-highest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-on-surface mb-1">Featured Kitties</h2>
              <p className="text-on-surface-variant italic font-serif text-xs sm:text-sm">Handpicked favorites from the workshop</p>
            </div>
            <button onClick={() => onNavigate("catalog")} className="text-primary font-bold text-xs sm:text-sm hover:underline flex items-center gap-1 whitespace-nowrap">
              View All <ArrowRight size={14} />
            </button>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {featured.map((item, i) => (
                <PolaroidCard key={item.id} image={item.image} title={item.title} price={item.price}
                  rotation={i % 2 === 0 ? -1.8 : 1.8} onClick={() => onNavigate("catalog")} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="polaroid p-3 pb-8 animate-pulse">
                  <div className="aspect-square bg-surface-container rounded-sm mb-4" />
                  <div className="h-3 bg-surface-container rounded mx-auto w-3/4" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── How to Order ── */}
      <section className="py-14 md:py-24 px-4 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-block mb-3">
              <span className="washi-tape px-6 py-2 text-base md:text-xl font-bold">Cara Order 🛍️</span>
            </div>
            <p className="text-on-surface-variant italic font-serif text-xs sm:text-sm mt-2">
              Gampang banget, cuma 3 langkah!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 relative">
            {/* Connector line — desktop only */}
            <div className="hidden sm:block absolute top-12 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-primary/20 z-0" />

            {HOW_TO_ORDER.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-primary-container/30 rounded-full flex items-center justify-center mb-4 border-2 border-primary/10 relative">
                  <span className="text-primary">{item.icon}</span>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-on-surface text-base mb-2">{item.title}</h3>
                <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleInstagram}
              className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 flex items-center gap-2 mx-auto text-sm sm:text-base"
            >
              <Instagram size={18} /> Order Sekarang
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── Testimonials — Sticky Notes ── */}
<section className="py-14 md:py-24 bg-secondary-container/20 px-4 overflow-hidden">
  <div className="max-w-5xl mx-auto">
    <div className="text-center mb-12">
      <div className="inline-block mb-3">
        <span className="washi-tape px-6 py-2 text-base md:text-xl font-bold">Kata Mereka 💬</span>
      </div>
      <p className="text-on-surface-variant italic font-serif text-xs sm:text-sm mt-2">
        Real reviews dari customer setia kami
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-6">
      {REVIEWS.map((review, i) => {
        const rotations = ["-rotate-2", "rotate-1", "-rotate-1"];
        const colors = [
          "bg-[#FFF9B0]",  // kuning sticky note
          "bg-[#FFD6E0]",  // pink
          "bg-[#B5EAD7]",  // mint
        ];
        const shadows = [
          "shadow-[4px_6px_0px_rgba(0,0,0,0.08)]",
          "shadow-[4px_6px_0px_rgba(0,0,0,0.08)]",
          "shadow-[4px_6px_0px_rgba(0,0,0,0.08)]",
        ];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, rotate: 0, scale: 1.03 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
            className={`${colors[i]} ${rotations[i]} ${shadows[i]} rounded-sm p-5 md:p-6 relative cursor-default`}
            style={{ minHeight: 200 }}
          >
            {/* Pin di atas sticky note */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-primary/80 rounded-full shadow-md border-2 border-white z-10" />

            {/* Stars */}
            <div className="flex text-amber-500 mb-3 mt-2">
              {[...Array(review.rating)].map((_, s) => (
                <Star key={s} size={13} fill="currentColor" />
              ))}
            </div>

            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed font-medium mb-5"
               style={{ fontFamily: "'Patrick Hand', 'Caveat', cursive, sans-serif" }}>
              "{review.text}"
            </p>

            <div className="flex items-center gap-2 mt-auto">
              <div className="w-7 h-7 bg-white/60 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs flex-shrink-0 border border-white/80">
                {review.name[0]}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-700">{review.name}</p>
                <p className="text-[9px] text-gray-500 font-medium">{review.tag}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

      {/* ── Bundle Banner ── */}
      <section className="py-10 md:py-16 px-4 bg-surface">
        <div className="max-w-5xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-secondary-container/50 border-2 border-dashed border-secondary-container p-8 md:p-12 rounded-[1.5rem] md:rounded-[2rem] text-center relative overflow-hidden"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary mb-3 italic">
              Bundle & Save 5%
            </h2>
            <p className="text-on-secondary-container text-sm md:text-base mb-6 max-w-md mx-auto leading-relaxed">
              Pick a scrapbook, 2 keychains, and 5 stickers to create the ultimate gift package and unlock a 5% discount!
            </p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onNavigate("catalog")}
              className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 text-sm sm:text-base">
              Build My Bundle
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Personalized Note ── */}
      <section className="py-12 md:py-24 bg-surface-container-low/50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-16 border border-surface-container-highest grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-on-surface mb-4">
                Customized Just for You
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-6 text-sm sm:text-base">
                Every order comes with a personalized hand-drawn thank you note and a sprinkle of kitty magic. From the way we wrap your goodies to the handwritten names on every envelope, your package is a labor of love.
              </p>
              <div className="flex gap-3">
                <div className="p-3 bg-primary-container/30 text-primary rounded-xl"><Sparkles size={22} /></div>
                <div className="p-3 bg-secondary-container/30 text-secondary rounded-xl"><Heart size={22} /></div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="polaroid rotate-3 max-w-[200px] sm:max-w-[240px] mx-auto">
                <div className="aspect-[3/4] bg-surface-container-highest flex items-center justify-center mb-4">
                  <p className="text-on-surface-variant/40 italic text-xs text-center px-4">Your personalized note</p>
                </div>
                <p className="text-center font-display font-medium text-xs text-on-surface-variant">A little magic for you...</p>
              </div>
              <div className="absolute top-2 right-[20%] -rotate-12 hidden sm:block">
                <div className="w-3 h-10 border-2 border-primary-container rounded-full opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}