import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PolaroidCard from "../components/PolaroidCard";
import { Search, Filter, Sparkles } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    title: "Kitty Dreams Journal",
    category: "Scrapbooks",
    price: "$32.00",
    image: "/src/assets/images/product_scrapbook_1779100744975.png",
    description: "A 40-page handmade sanctuary for your most precious cat memories."
  },
  {
    id: 2,
    title: "Sparkle Paw Charm",
    category: "Acrylic Keychains",
    price: "$12.50",
    image: "/src/assets/images/product_keychain_1779100759746.png",
    description: "Crystal clear acrylic with holographic glitter and a rose gold clasp."
  },
  {
    id: 3,
    title: "Berry Sweet Pins",
    category: "Pin Buttons",
    price: "$8.00",
    image: "/src/assets/images/product_pins_1779100775167.png",
    description: "Set of 3 matte-finish badges featuring our original strawberry cat art."
  },
  {
    id: 4,
    title: "Lazy Sunday Pack",
    category: "Stickers",
    price: "$15.00",
    image: "/src/assets/images/scrapbook_hero_1779100728856.png",
    description: "12 waterproof vinyl stickers of cats doing absolutely nothing."
  },
  {
    id: 5,
    title: "DIY Memory Box",
    category: "Scrapbooks",
    price: "$45.00",
    image: "/src/assets/images/product_scrapbook_1779100744975.png",
    description: "Full kit including tape, stamps, and a mini lavender photo album."
  },
  {
    id: 6,
    title: "Teacup Cat Standee",
    category: "Acrylic",
    price: "$18.00",
    image: "/src/assets/images/product_keychain_1779100759746.png",
    description: "A desktop companion made of premium 5mm thick polished acrylic."
  }
];

const CATEGORIES = ["All", "Scrapbooks", "Acrylic Keychains", "Pin Buttons", "Stickers"];

export default function Catalog({ onSelectProduct }: { onSelectProduct: (id: number) => void }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-surface min-h-screen pb-32">
      {/* Header */}
      <section className="pt-20 pb-16 text-center px-4">
        <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-block mb-6"
        >
          <span className="washi-tape px-12 py-3 text-2xl font-bold">Our Magical Treasures</span>
        </motion.div>
        <p className="body-md text-on-surface-variant max-w-2xl mx-auto italic font-serif">
          Handcrafted with love, sprinkles, and a little bit of kitty magic. Explore our collection of scrapbooks and kawaii accessories.
        </p>
      </section>

      {/* Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-4 rounded-3xl border border-surface-container-highest shadow-sm">
           <div className="flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
           
           <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search treasures..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-surface-container-highest rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
              <Search className="absolute left-3 top-3 text-on-surface-variant" size={18} />
           </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                 {/* Decorative star for some items */}
                 {idx % 3 === 0 && (
                   <div className="absolute -top-4 -left-4 text-primary animate-bounce delay-100">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
                         <Sparkles size={24} />
                      </motion.div>
                   </div>
                 )}
                 
                 <PolaroidCard 
                    image={product.image} 
                    title={product.title} 
                    price={product.price}
                    className="relative z-10"
                    rotation={idx % 2 === 0 ? -1.5 : 1.5}
                    onClick={() => onSelectProduct(product.id)}
                 />
                 
                 <div className="mt-4 px-4 flex justify-between items-center">
                    <p className="text-xs text-on-surface-variant italic font-serif truncate max-w-[70%]">{product.description}</p>
                    <button 
                      onClick={() => onSelectProduct(product.id)}
                      className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-bold rounded-full hover:bg-primary hover:text-white transition-all"
                    >
                      View Detail
                    </button>
                 </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
             <div className="w-16 h-16 bg-surface-container border-2 border-dashed border-surface-container-highest rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                <Search size={24} className="text-on-surface-variant" />
             </div>
             <p className="text-on-surface-variant italic font-serif">No treasures found matching your search...</p>
          </div>
        )}
      </section>
    </div>
  );
}
