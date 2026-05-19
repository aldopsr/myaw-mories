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

  // Fetch dari JSON
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
    <div className="bg-surface min-h-screen pb-32">
      <section className="pt-20 pb-16 text-center px-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6">
          <span className="washi-tape px-12 py-3 text-2xl font-bold">Our Magical Treasures</span>
        </motion.div>
        <p className="body-md text-on-surface-variant max-w-2xl mx-auto italic font-serif">
          Handcrafted with love, sprinkles, and a little bit of kitty magic.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-4 rounded-3xl border border-surface-container-highest shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? "bg-primary text-white shadow-md shadow-primary/20" : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <input type="text" placeholder="Search treasures..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface border border-surface-container-highest rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-container" />
            <Search className="absolute left-3 top-3 text-on-surface-variant" size={18} />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-on-surface-variant italic font-serif">Loading treasures...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, idx) => (
                <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="group relative">
                  {idx % 3 === 0 && <div className="absolute -top-4 -left-4 text-primary animate-bounce z-10"><Sparkles size={24} /></div>}

                  {/* Badge PDF preview tersedia */}
                  {product.previewPdf && (
                    <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-primary text-white text-[10px] font-bold rounded-full">
                      📖 Preview
                    </div>
                  )}

                  {/* Wishlist button */}
                  <button onClick={() => wishlist.toggleItem(product)}
                    className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${wishlist.isWishlisted(product.id) ? "bg-primary text-white" : "bg-white/90 text-on-surface-variant hover:text-primary"}`}>
                    <Heart size={16} className={wishlist.isWishlisted(product.id) ? "fill-white" : ""} />
                  </button>

                  <PolaroidCard image={product.image} title={product.title} price={product.price}
                    className="relative z-10" rotation={idx % 2 === 0 ? -1.5 : 1.5}
                    onClick={() => onSelectProduct(product.id)} />

                  <div className="mt-4 px-4 flex justify-between items-center">
                    <p className="text-xs text-on-surface-variant italic font-serif truncate max-w-[70%]">{product.description}</p>
                    <button onClick={() => onSelectProduct(product.id)}
                      className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-bold rounded-full hover:bg-primary hover:text-white transition-all">
                      View Detail
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}