import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import PolaroidCard from "../components/PolaroidCard";
import { Search, Sparkles, Heart, Star } from "lucide-react";
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

// Tambah emoji di kategori biar makin gemoy! 🍓
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

export default function Catalog({ onSelectProduct, wishlist }: CatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-surface min-h-screen pb-12 relative overflow-hidden">
      
      {/* ── Background Floating Elements (Aesthetic Scrapbook Vibe) ── */}
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-10 left-[8%] text-primary/20 pointer-events-none hidden sm:block">
        <Sparkles size={32} />
      </motion.div>
      <motion.div animate={{ y: [0, 12, 0], rotate: 15 }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute top-24 right-[8%] text-primary/15 pointer-events-none">
        <Star size={40} fill="currentColor" />
      </motion.div>

      {/* ── Header Section ── */}
      <section className="pt-12 pb-8 md:pt-20 md:pb-14 text-center px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="inline-block mb-3"
        >
          <span className="washi-tape px-6 md:px-10 py-2 md:py-3 text-lg md:text-3xl font-display font-extrabold tracking-wide inline-flex items-center gap-2">
            Our Magical Treasures 🌟
          </span>
        </motion.div>
        <p className="text-on-surface-variant max-w-xl mx-auto italic font-serif text-xs sm:text-sm px-4">
          Handcrafted with love, sprinkles, and a little bit of kitty magic.
        </p>
      </section>

      {/* ── Search & Filter Control Station ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-16 relative z-10">
        <div className="flex flex-col gap-4 bg-white/80 backdrop-blur-md p-3 md:p-5 rounded-3xl border border-surface-container-highest shadow-[0_8px_30px_rgb(255,182,193,0.15)]">
          
          {/* Search Box with Squishy Animation */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Search precious goodies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 md:py-3.5 bg-surface/50 border border-surface-container-highest rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 group-hover:border-primary/40"
            />
            <Search className="absolute left-3.5 top-3.5 md:top-4 text-on-surface-variant group-focus-within:text-primary transition-colors" size={16} />
          </div>

          {/* Smooth Sliding Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x snap-mandatory">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-300 snap-center ${
                    isSelected ? "text-white" : "text-on-surface-variant hover:bg-primary/5"
                  }`}
                >
                  <span className="relative z-10">{cat.label}</span>
                  
                  {/* Framer Motion LayoutId Magic Slider */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeCatBadge"
                      className="absolute inset-0 bg-primary rounded-full shadow-md shadow-primary/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Products Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {loading ? (
          <div className="text-center py-24">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" 
            />
            <p className="text-on-surface-variant italic font-serif text-sm animate-pulse">Summoning treasures...</p>
          </div>
        ) : (
          /* Grid yang super responsif (2 kolom di mobile agar muat banyak dan estetik) */
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
                    className="group relative flex flex-col justify-between"
                  >
                    {/* Corner Sparkle for Extra Magic Vibe */}
                    {idx % 2 === 0 && (
                      <div className="absolute -top-2 -left-2 text-primary/40 z-20 animate-pulse">
                        <Sparkles size={18} />
                      </div>
                    )}

                    {/* Preview Badge */}
                    {product.previewPdf && (
                      <div className="absolute top-2.5 left-2.5 z-20 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-primary text-[9px] sm:text-[10px] font-extrabold rounded-md shadow-sm border border-primary/10 flex items-center gap-1">
                        📖 Preview
                      </div>
                    )}

                    {/* Wishlist Button with Micro-Haptic Feedbacks */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => wishlist.toggleItem(product)}
                      className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                        isWish
                          ? "bg-primary text-white scale-105"
                          : "bg-white/95 text-on-surface-variant hover:text-primary hover:bg-white"
                      }`}
                    >
                      <Heart size={15} className={isWish ? "fill-white text-white" : "transition-colors"} />
                    </motion.button>

                    {/* The Polaroid Card */}
                    <div className="transform transition-transform duration-300 group-hover:scale-[1.02]">
                      <PolaroidCard
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        className="shadow-md group-hover:shadow-xl transition-shadow duration-300"
                        rotation={idx % 2 === 0 ? -1.8 : 1.8}
                        onClick={() => onSelectProduct(product.id)}
                      />
                    </div>

                    {/* Bottom Area (Description & Squishy View Button) */}
                    <div className="mt-3 px-1 sm:px-2 flex flex-col gap-2">
                      <p className="hidden sm:block text-xs text-on-surface-variant italic font-serif truncate">
                        {product.description}
                      </p>
                      
                      <motion.button
                        whileHover={{ scale: 1.03, backgroundColor: "var(--md-sys-color-primary, #FFB6C1)" }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => onSelectProduct(product.id)}
                        className="w-full py-2 bg-primary/10 text-primary text-[10px] sm:text-xs uppercase tracking-wider font-extrabold rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300 text-center shadow-sm border border-primary/5"
                      >
                        View Detail ✨
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* ── Empty State (Gemas Version) ── */}
        {!loading && filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="py-20 text-center"
          >
            <div className="w-16 h-16 bg-primary/5 border-2 border-dashed border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Search size={24} className="text-primary/60" />
            </div>
            <p className="text-on-surface-variant font-display font-bold text-sm">Oh no, bestie! No treasures here...</p>
            <p className="text-on-surface-variant/60 text-xs italic mt-1">Try looking for another magical keyword ✨</p>
          </motion.div>
        )}
      </section>
    </div>
  );
}