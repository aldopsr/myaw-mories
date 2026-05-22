import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import PolaroidCard from "../components/PolaroidCard";
import { Search, Sparkles, Heart, Star, PackageSearch } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
  description: string;
  sizes: string[];
  levels: string[];
  stock: boolean;
  previewPdf: string | null;
}

const CATEGORIES = [
  { id: "All", label: "✨ All Treasures" },
  { id: "Scrapbooks", label: "📖 Scrapbooks" },
  { id: "Acrylic Keychains", label: "🔑 Keychains" },
  { id: "Pin Buttons", label: "💮 Pin Buttons" },
  { id: "Stickers", label: "🦄 Stickers" },
];

interface CatalogProps {
  onSelectProduct: (id: number) => void;
  wishlist: ReturnType<typeof useWishlist>;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-white p-3 pb-10 border border-surface-container-highest shadow-sm">
        <div className="aspect-square bg-surface-container-high rounded-sm mb-4" />
        <div className="h-4 bg-surface-container-high rounded-full w-3/4 mx-auto mb-2" />
        <div className="h-3 bg-surface-container rounded-full w-1/2 mx-auto" />
      </div>
    </div>
  );
}

export default function Catalog({ onSelectProduct, wishlist }: CatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("[Catalog] products loaded:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[Catalog] failed to load products.json:", err);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = (p.title ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-surface min-h-screen pb-28 md:pb-12 relative overflow-hidden">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-10 left-[8%] text-primary/20 pointer-events-none hidden sm:block">
        <Sparkles size={32} />
      </motion.div>
      <motion.div animate={{ y: [0, 12, 0], rotate: 15 }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute top-24 right-[8%] text-primary/15 pointer-events-none">
        <Star size={40} fill="currentColor" />
      </motion.div>

      {/* Header */}
      <section className="pt-8 pb-8 md:pt-20 md:pb-14 text-center px-4 relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-block mb-3">
          <span className="washi-tape px-6 md:px-10 py-2 md:py-3 text-lg md:text-3xl font-display font-extrabold tracking-wide inline-flex items-center gap-2">
            Our Magical Treasures 🌟
          </span>
        </motion.div>
        <p className="text-on-surface-variant max-w-xl mx-auto italic font-serif text-xs sm:text-sm px-4">
          Handcrafted with love, sprinkles, and a little bit of kitty magic.
        </p>
      </section>

      {/* Search + Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative mb-6 max-w-lg mx-auto">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
          <input
            type="text"
            placeholder="Search treasures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-surface-container-highest rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-on-surface-variant border border-surface-container-highest hover:border-primary/30"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-6 lg:gap-12">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-primary-container/30 rounded-full flex items-center justify-center mb-4">
              <PackageSearch size={36} className="text-primary/50" />
            </div>
            <h3 className="font-display font-bold text-on-surface text-lg mb-2">Hmm, no treasures found 🐱</h3>
            <p className="text-on-surface-variant text-sm italic font-serif mb-6">Try a different keyword or category!</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="px-6 py-2.5 bg-primary/10 text-primary font-bold text-sm rounded-full hover:bg-primary hover:text-white transition-all"
            >
              Reset filters
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-6 lg:gap-12">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, idx) => {
                const isWish = wishlist.isWishlisted(product.id);
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="group relative flex flex-col"
                  >
                    {idx % 2 === 0 && (
                      <div className="absolute -top-2 -left-2 text-primary/40 z-20 animate-pulse pointer-events-none">
                        <Sparkles size={18} />
                      </div>
                    )}

                    {product.previewPdf && (
                      <div className="absolute top-2.5 left-2.5 z-20 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-primary text-[9px] sm:text-[10px] font-extrabold rounded-md shadow-sm border border-primary/10 flex items-center gap-1">
                        📖 Preview
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.85 }}
                      onClick={(e) => { e.stopPropagation(); wishlist.toggleItem(product); }}
                      className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                        isWish ? "bg-primary text-white" : "bg-white/95 text-on-surface-variant hover:text-primary"
                      }`}
                    >
                      <Heart size={15} className={isWish ? "fill-white" : ""} />
                    </motion.button>

                    <div
                      className="cursor-pointer"
                      onClick={() => onSelectProduct(product.id)}
                    >
                      <PolaroidCard
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        className="shadow-md group-hover:shadow-xl transition-shadow duration-300"
                        rotation={idx % 2 === 0 ? -1.8 : 1.8}
                      />
                    </div>

                    <p className="sm:hidden text-center text-[10px] text-on-surface-variant/50 mt-1.5 italic font-serif">
                      ketuk untuk detail
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}