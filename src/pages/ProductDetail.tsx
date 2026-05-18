import { motion } from "motion/react";
import { ArrowLeft, Star, Share2, Instagram, Heart, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "../hooks/useWishlist";

const PRODUCTS: Record<number, any> = {
  1: {
    id: 1, title: "Custom Memory Scrapbook", price: "$45.00", category: "Scrapbooks",
    image: "/images/product_scrapbook_1779100744975.png",
    description: "Each page is a canvas for your dearest memories. Hand-decorated with washi tape, sparkles, and floral motifs.",
    features: ["14 pages of premium art paper", "Softcover with matte finish", "Flexible gold ring binding", "Space for 32 custom photos"],
    sizes: ["15x15 cm", "20x20 cm"],
    levels: ["Basic (Stickers only)", "Semi (Tape + Florals)", "Full (All out magic)"],
  },
};

interface ProductDetailProps {
  productId: number;
  onBack: () => void;
  wishlist: ReturnType<typeof useWishlist>;
}

export default function ProductDetail({ productId, onBack, wishlist }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState("15x15 cm");
  const [selectedLevel, setSelectedLevel] = useState("Semi (Tape + Florals)");
  const product = PRODUCTS[productId] ?? PRODUCTS[1];
  const wishlisted = wishlist.isWishlisted(product.id);

  const handleInstagram = () => {
    window.open("https://www.instagram.com/myawmories/", "_blank");
  };

  return (
    <div className="bg-surface min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <button onClick={onBack} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-sm mb-12">
          <ArrowLeft size={16} /> Back to Catalog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="polaroid p-6 pb-12 rotate-[-1deg]">
              <div className="aspect-square bg-surface-container rounded overflow-hidden mb-6">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-center font-display italic font-bold text-on-surface-variant text-lg">A Story to Keep Forever</p>
            </motion.div>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-24 h-24 polaroid p-2 pb-6 cursor-pointer hover:scale-110 transition-transform ${i === 1 ? "rotate-3" : i === 2 ? "-rotate-6" : "rotate-2"}`}>
                  <div className="w-full h-full bg-surface-container rounded-sm overflow-hidden">
                    <img src={product.image} alt="thumbnail" className="w-full h-full object-cover opacity-60" />
                  </div>
                  {i === 1 && <div className="absolute -top-2 -left-2 washi-tape px-2 py-0.5 text-[8px] font-bold">BESTSELLER</div>}
                </div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <span className="label-sm text-primary tracking-widest font-extrabold flex items-center gap-2 mb-4">
              <Sparkles size={14} /> HANDMADE WITH LOVE
            </span>
            <h1 className="headline-xl text-primary mb-2">{product.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-amber-400">{[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
              <p className="text-xs font-bold text-on-surface-variant">(128 reviews)</p>
            </div>
            <p className="body-lg text-on-surface-variant mb-8 leading-relaxed">{product.description}</p>

            <div className="p-8 bg-white/50 border-2 border-dashed border-primary-container rounded-[2rem] mb-10">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="label-sm text-primary-container font-black mb-1">STARTING FROM</p>
                  <p className="text-4xl font-display font-extrabold text-primary">{product.price}</p>
                </div>
                <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="flex items-center gap-2 text-primary hover:underline font-bold text-sm">
                  <Share2 size={16} /> Share
                </button>
              </div>

              <div className="mb-8">
                <p className="font-display font-bold text-on-surface text-sm mb-3">Choose Size</p>
                <div className="flex gap-3">
                  {product.sizes.map((size: string) => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${selectedSize === size ? "bg-primary text-white" : "bg-white text-on-surface-variant border border-surface-container-highest"}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p className="font-display font-bold text-on-surface text-sm mb-3">Customization Level</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {product.levels.map((level: string) => (
                    <button key={level} onClick={() => setSelectedLevel(level)}
                      className={`px-3 py-4 rounded-2xl text-[10px] font-bold text-center leading-tight transition-all border-2 ${selectedLevel === level ? "border-primary bg-primary-container/20 text-primary" : "border-surface-container-highest bg-white text-on-surface-variant"}`}>
                      {level.split("(")[0].trim()}
                      <span className="block mt-1 font-normal opacity-70 text-[8px]">{level.includes("(") ? level.split("(")[1].replace(")", "") : ""}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {product.features.map((f: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-medium text-on-surface-variant">
                    <CheckCircle2 size={16} className="text-primary-container" /> {f}
                  </div>
                ))}
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleInstagram}
                className="w-full py-5 bg-primary text-white font-display font-extrabold text-xl rounded-full shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                <Instagram size={22} /> Order via Instagram
              </motion.button>
              <p className="text-center mt-4 text-[10px] text-on-surface-variant italic font-serif">Processing time: 5-7 kitty-nap business days</p>
            </div>

            <div className="flex justify-center">
              <button onClick={() => wishlist.toggleItem(product)}
                className={`flex items-center gap-2 transition-colors ${wishlisted ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}>
                <Heart size={20} className={wishlisted ? "fill-primary" : ""} />
                <span className="text-xs font-bold">{wishlisted ? "Saved to Wishlist ✓" : "Add to Wishlist"}</span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="mt-40 border-t border-surface-container-highest pt-20">
          <h2 className="headline-lg text-on-surface mb-12">Other Kitties Liked...</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className={`polaroid p-2 pb-6 transition-all ${idx % 2 === 0 ? "-rotate-2" : "rotate-1"} group-hover:rotate-0`}>
                  <div className="aspect-square bg-surface-container rounded-sm overflow-hidden mb-4">
                    <img src="/images/product_keychain_1779100759746.png" className="w-full h-full object-cover" alt="Related product" />
                  </div>
                  <p className="text-center text-xs font-bold text-on-surface mb-1">Kitty Treasure #{idx}</p>
                  <p className="text-center text-[10px] text-on-surface-variant">$10.00</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}