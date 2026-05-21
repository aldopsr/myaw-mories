import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Star, Share2, Instagram, Heart, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useWishlist } from "../hooks/useWishlist";
import ScrapbookPreview from "../components/ScrapbookPreview";

interface ProductImage {
  src: string;
  previewPdf: string | null;
}

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
  images?: ProductImage[];
  description: string;
  features?: string[];
  sizes: string[];
  levels: string[];
  stock: boolean;
  previewPdf: string | null;
}

const FALLBACK: Record<number, Product> = {
  1: {
    id: 1,
    title: "Custom Memory Scrapbook",
    price: "Rp 85.000",
    category: "Scrapbooks",
    image: "/images/product_scrapbook_1779100744975.png",
    images: [
      { src: "/images/product_scrapbook_1779100744975.png", previewPdf: "/previews/to_my_favorite_person.pdf" },
      { src: "/images/product_keychain_1779100759746.png", previewPdf: null },
      { src: "/images/product_pins_1779100775167.png", previewPdf: null },
    ],
    description: "Each page is a canvas for your dearest memories. Hand-decorated with washi tape, sparkles, and floral motifs.",
    features: [
      "14 pages of premium art paper",
      "Softcover with matte finish",
      "Flexible gold ring binding",
      "Space for 32 custom photos",
    ],
    sizes: ["15x15 cm", "20x20 cm"],
    levels: ["Basic (Stickers only)", "Semi (Tape + Florals)", "Full (All out magic)"],
    stock: true,
    previewPdf: "/previews/to_my_favorite_person.pdf",
  },
};

interface ProductDetailProps {
  productId: number;
  onBack: () => void;
  wishlist: ReturnType<typeof useWishlist>;
}

export default function ProductDetail({ productId, onBack, wishlist }: ProductDetailProps) {
  const [product, setProduct] = useState<Product>(FALLBACK[productId] ?? FALLBACK[1]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showToast, setShowToast] = useState(false); // State untuk cute toast copy link

  const [activeImage, setActiveImage] = useState<ProductImage>({
    src: FALLBACK[productId]?.image ?? FALLBACK[1].image,
    previewPdf: FALLBACK[productId]?.previewPdf ?? null,
  });

  const wishlisted = wishlist.isWishlisted(product.id);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const found = data.find((p) => p.id === productId);
        if (found) {
          setProduct(found);
          setSelectedSize(found.sizes?.[0] ?? "");
          setSelectedLevel(found.levels?.[0] ?? "");
          const firstImg = found.images?.[0] ?? { src: found.image, previewPdf: found.previewPdf };
          setActiveImage(firstImg);
        }
      })
      .catch(() => {
        // Fix Bug: Fallback sekarang juga mengupdate activeImage dengan benar
        const fb = FALLBACK[productId] ?? FALLBACK[1];
        setProduct(fb);
        setSelectedSize(fb.sizes?.[0] ?? "");
        setSelectedLevel(fb.levels?.[0] ?? "");
        const firstImg = fb.images?.[0] ?? { src: fb.image, previewPdf: fb.previewPdf };
        setActiveImage(firstImg);
      });
  }, [productId]);

  const handleInstagram = () => {
    window.open("https://www.instagram.com/myawmories/", "_blank");
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = `${product.title} - ${product.price}`;
    if (navigator.share) {
      navigator.share({ title: product.title, text, url });
    } else {
      navigator.clipboard?.writeText(url).then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500); // Hilang dalam 2.5 detik
      });
    }
  };

  const features = product.features ?? [];
  const thumbnails = product.images ?? [{ src: product.image, previewPdf: product.previewPdf }];

  return (
    <div className="bg-surface min-h-screen pb-32 relative">
      
      {/* ── CUTE FLOATING TOAST NOTIFICATION ── */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white border-2 border-primary rounded-full shadow-xl flex items-center gap-2"
          >
            <span className="text-sm font-bold text-primary flex items-center gap-1.5">
              Copied to clipboard! 🐾💕
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        
        {/* Back Button with Squishy Hover */}
        <motion.button
          whileHover={{ x: -4 }}
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-xs sm:text-sm mb-8 md:mb-12"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* ── KIRI: AREA GAMBAR & THUMBNAILS ── */}
          <div className="space-y-6">
            
            {/* Main Polaroid Frame */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="polaroid p-4 sm:p-6 pb-10 sm:pb-14 rotate-[-1deg] relative group cursor-pointer shadow-md hover:shadow-xl transition-shadow"
              onClick={() => activeImage.previewPdf && setShowPreview(true)}
            >
              <div className="aspect-square bg-surface-container rounded overflow-hidden mb-4 sm:mb-6 relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage.src}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    src={activeImage.src}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Hover overlay — Smart Book Preview Prompt */}
                {activeImage.previewPdf && (
                  <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
                    <motion.div whileHover={{ scale: 1.1 }} className="bg-white p-3 rounded-full shadow-lg text-primary mb-2">
                      <BookOpen size={24} fill="currentColor" className="opacity-20 absolute" />
                      <BookOpen size={24} />
                    </motion.div>
                    <p className="text-white font-extrabold text-sm tracking-wide">Preview Scrapbook ✨</p>
                    <p className="text-white/90 text-xs mt-0.5 font-medium">Click to flip inside</p>
                  </div>
                )}
              </div>
              <p className="text-center font-display italic font-extrabold text-on-surface-variant text-base sm:text-lg flex justify-center items-center gap-1.5">
                🌸 A Story to Keep Forever 🌸
              </p>
            </motion.div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none justify-start px-1">
              {thumbnails.map((img, i) => {
                const isSelected = activeImage.src === img.src && activeImage.previewPdf === img.previewPdf;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 polaroid p-1.5 pb-5 sm:pb-6 cursor-pointer transition-all flex-shrink-0 ${
                      i === 0 ? "rotate-2" : i === 1 ? "-rotate-3" : "rotate-3"
                    } ${
                      isSelected
                        ? "ring-2 ring-primary scale-105 opacity-100 shadow-md"
                        : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div className="w-full h-full bg-surface-container rounded-sm overflow-hidden relative">
                      <img src={img.src} alt={`thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                      {img.previewPdf && (
                        <div className="absolute bottom-1 right-1 bg-primary text-white p-0.5 rounded-sm">
                          <BookOpen size={10} />
                        </div>
                      )}
                    </div>
                    {i === 0 && (
                      <div className="absolute -top-2.5 -left-2 washi-tape px-2 py-0.5 text-[7px] sm:text-[8px] font-black uppercase tracking-wider">
                        ⭐ Popular
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── KANAN: SPESIFIKASI & TOMBOL ORDER ── */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col"
          >
            <span className="text-[10px] tracking-widest font-black text-primary flex items-center gap-1.5 mb-2 sm:mb-3">
              <Sparkles size={12} className="animate-spin-slow" /> HANDMADE WITH LOVE
            </span>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-on-surface mb-2">{product.title}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs font-bold text-on-surface-variant/80">(128 sweet reviews)</p>
            </div>
            
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed font-medium">{product.description}</p>

            {/* Order Configuration Box */}
            <div className="p-5 sm:p-6 bg-white/70 backdrop-blur-md border-2 border-dashed border-primary/30 rounded-[2rem] shadow-sm mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[9px] font-black tracking-wider text-primary/70 mb-0.5">SWEET PRICE</p>
                  <p className="text-3xl sm:text-4xl font-display font-extrabold text-primary">{product.price}</p>
                </div>
                
                {/* Cute Share Station */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 hover:bg-primary/10 rounded-full text-primary font-bold text-xs transition-colors"
                >
                  <Share2 size={14} /> Share
                </motion.button>
              </div>

              {/* Size Selector */}
              {product.sizes?.length > 0 && (
                <div className="mb-6">
                  <p className="font-display font-extrabold text-on-surface text-xs sm:text-sm mb-2.5">🍓 Select Dimensions</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const isSel = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                            isSel
                              ? "bg-primary text-white shadow-md shadow-primary/20"
                              : "bg-white text-on-surface-variant border border-surface-container-highest hover:border-primary/40"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Custom Level Selector */}
              {product.levels?.length > 0 && (
                <div className="mb-6">
                  <p className="font-display font-extrabold text-on-surface text-xs sm:text-sm mb-2.5">✨ Magic Level</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {product.levels.map((level) => {
                      const isSel = selectedLevel === level;
                      return (
                        <button
                          key={level}
                          onClick={() => setSelectedLevel(level)}
                          className={`px-3 py-3 rounded-xl text-[10px] font-bold text-center flex flex-col justify-center items-center gap-0.5 transition-all border-2 ${
                            isSel
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-surface-container-highest bg-white text-on-surface-variant hover:border-primary/20"
                          }`}
                        >
                          <span className="font-extrabold">{level.split("(")[0].trim()}</span>
                          {level.includes("(") && (
                            <span className="text-[8px] font-normal opacity-70">
                              {level.split("(")[1].replace(")", "")}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Product Features List */}
              {features.length > 0 && (
                <div className="mb-8 border-t border-dashed border-primary/20 pt-5">
                  <p className="font-display font-extrabold text-on-surface text-xs mb-3">📦 What's Inside:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                        <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Call To Action */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleInstagram}
                className="w-full py-4 bg-primary text-white font-display font-extrabold text-lg sm:text-xl rounded-full shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Instagram size={20} /> Order via Instagram
              </motion.button>
              
              <p className="text-center mt-3 text-[10px] text-on-surface-variant/70 italic font-serif">
                Processing time: 5-7 kitty-nap business days 🐾
              </p>
            </div>

            {/* Bottom Secondary Wishlist Anchor */}
            <div className="flex justify-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => wishlist.toggleItem(product)}
                className={`flex items-center gap-1.5 transition-colors group px-4 py-2 rounded-full ${
                  wishlisted ? "text-primary bg-primary/5" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <Heart size={16} className={wishlisted ? "fill-primary text-primary" : "group-hover:scale-110 transition-transform"} />
                <span className="text-xs font-bold">
                  {wishlisted ? "Saved to Wishlist ✓" : "Add to Wishlist"}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── RECOMMENDED RELATED PRODUCTS SECTION (FIXED COLUMNS) ── */}
        <div className="mt-28 md:mt-40 border-t border-surface-container-highest pt-16">
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-on-surface mb-8 flex items-center gap-2">
            💝 Other Kitties Liked...
          </h2>
          {/* Responsive Grid Fix: 2 kolom di mobile, 4 kolom di tablet/desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className={`polaroid p-2.5 pb-6 transition-all shadow-sm group-hover:shadow-md ${
                  idx % 2 === 0 ? "-rotate-2" : "rotate-1"
                } group-hover:rotate-0`}>
                  <div className="aspect-square bg-surface-container rounded-sm overflow-hidden mb-3">
                    <img 
                      src="/images/product_keychain_1779100759746.png" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      alt="Related cute asset" 
                    />
                  </div>
                  <p className="text-center text-xs font-black text-on-surface truncate px-1">Kitty Treasure #{idx}</p>
                  <p className="text-center text-[10px] font-bold text-primary mt-0.5">Rp 25.000</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── MODAL COMPONENT WINDOW ── */}
        {showPreview && activeImage.previewPdf && (
          <ScrapbookPreview
            pdfUrl={activeImage.previewPdf}
            title={product.title}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </div>
  );
}