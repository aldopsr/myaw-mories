import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import PolaroidCard from "../components/PolaroidCard";
import { Search, Sparkles, Heart } from "lucide-react";
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

const CATEGORIES = ["All", "Scrapbooks", "Acrylic Keychains", "Pin Buttons", "Stickers"];

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
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-surface min-h-screen pb-8">
      {/* Header */}
      <section className="pt-10 pb-10 md:pt-20 md:pb-16 text-center px-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-4">
          <span className="washi-tape px-8 md:px-12 py-2 md:py-3 text-lg md:text-2xl font-bold">Our Magical Treasures</span>
        </motion.div>
        <p className="text-on-surface-variant max-w-2xl mx-auto italic font-serif text-xs sm:text-sm mt-2">
          Handcrafted with love, sprinkles, and a little bit of kitty magic.
        </p>
      </section>

      {/* Filter bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-16">
        <div className="flex flex-col gap-3 bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border border-surface-container-highest shadow-sm">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search treasures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 md:py-3 bg-surface border border-surface-container-highest rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
            <Search className="absolute left-3 top-2.5 md:top-3 text-on-surface-variant" size={16} />
          </div>

          {/* Category pills — horizontally scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-on-surface-variant bg-surface hover:bg-surface-container"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-on-surface-variant italic font-serif text-sm">Loading treasures...</p>
          </div>
        ) : (
          /* 2 cols mobile, 2 cols tablet, 3 cols desktop */
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative"
                >
                  {idx % 3 === 0 && (
                    <div className="absolute -top-3 -left-3 text-primary z-10 hidden sm:block">
                      <Sparkles size={20} />
                    </div>
                  )}

                  {/* Preview badge */}
                  {product.previewPdf && (
                    <div className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-primary text-white text-[9px] sm:text-[10px] font-bold rounded-full">
                      📖 Preview
                    </div>
                  )}

                  {/* Wishlist button */}
                  <button
                    onClick={() => wishlist.toggleItem(product)}
                    className={`absolute top-2 right-2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                      wishlist.isWishlisted(product.id)
                        ? "bg-primary text-white"
                        : "bg-white/90 text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    <Heart size={14} className={wishlist.isWishlisted(product.id) ? "fill-white" : ""} />
                  </button>

                  <PolaroidCard
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    className="relative z-10"
                    rotation={idx % 2 === 0 ? -1.5 : 1.5}
                    onClick={() => onSelectProduct(product.id)}
                  />

                  {/* Description + button — hide desc on mobile */}
                  <div className="mt-2 sm:mt-4 px-1 sm:px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <p className="hidden sm:block text-xs text-on-surface-variant italic font-serif truncate max-w-[70%]">
                      {product.description}
                    </p>
                    <button
                      onClick={() => onSelectProduct(product.id)}
                      className="w-full sm:w-auto px-3 py-1.5 bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-bold rounded-full hover:bg-primary hover:text-white transition-all text-center"
                    >
                      View Detail
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-14 h-14 bg-surface-container border-2 border-dashed border-surface-container-highest rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
              <Search size={20} className="text-on-surface-variant" />
            </div>
            <p className="text-on-surface-variant italic font-serif text-sm">No treasures found...</p>
          </div>
        )}
      </section>
    </div>
  );
}