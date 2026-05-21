import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Star, Share2, Instagram, Heart, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useWishlist } from "../hooks/useWishlist";
import ScrapbookPreview from "../components/ScrapbookPreview";

interface ProductImage {
  src: string;
  price?: string;
  previewPdf: string | null;
  label?: string;
  description?: string;
  sizes?: string[];
  levels?: string[];
  features?: string[];
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
      {
        src: "/images/product_scrapbook_1779100744975.png",
        previewPdf: "/previews/to_my_favorite_person.pdf",
        label: "Cover",
        description: "Cover scrapbook dengan desain floral pink handmade.",
        sizes: ["15x15 cm", "20x20 cm"],
        levels: ["Basic (Stickers only)", "Semi (Tape + Florals)", "Full (All out magic)"],
        features: ["14 pages of premium art paper", "Softcover with matte finish", "Flexible gold ring binding", "Space for 32 custom photos"],
      },
      {
        src: "/images/product_keychain_1779100759746.png",
        previewPdf: null,
        label: "Isi Halaman",
        description: "Setiap halaman didekorasi manual dengan washi tape dan stiker imported.",
        sizes: ["15x15 cm", "20x20 cm"],
        levels: ["Basic (Stickers only)", "Semi (Tape + Florals)", "Full (All out magic)"],
        features: ["Washi tape imported", "Dried flower decoration", "Hand-lettering option"],
      },
      {
        src: "/images/product_pins_1779100775167.png",
        previewPdf: null,
        label: "Packaging",
        description: "Dikemas dengan kotak gift premium dan ribbon satin.",
        sizes: ["Standard box"],
        levels: [],
        features: ["Premium gift box", "Satin ribbon", "Handwritten thank you card"],
      },
    ],
    description: "Each page is a canvas for your dearest memories. Hand-decorated with washi tape, sparkles, and floral motifs.",
    features: ["14 pages of premium art paper", "Softcover with matte finish", "Flexible gold ring binding", "Space for 32 custom photos"],
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
  const [showToast, setShowToast] = useState(false);
  const [activeImage, setActiveImage] = useState<ProductImage>({
    src: FALLBACK[productId]?.image ?? FALLBACK[1].image,
    previewPdf: FALLBACK[productId]?.previewPdf ?? null,
  });

  const wishlisted = wishlist.isWishlisted(product.id);

  // Ambil semua data dari activeImage, fallback ke product
  const activeDescription = activeImage.description ?? product.description;
  const activePrice = activeImage.price ?? product.price;
  const activeSizes = activeImage.sizes ?? product.sizes;
  const activeLevels = activeImage.levels ?? product.levels;
  const activeFeatures = activeImage.features ?? product.features ?? [];

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const found = data.find((p) => p.id === productId);
        if (found) {
          setProduct(found);
          const firstImg = found.images?.[0] ?? { src: found.image, previewPdf: found.previewPdf };
          setActiveImage(firstImg);
          setSelectedSize((firstImg.sizes ?? found.sizes)?.[0] ?? "");
          setSelectedLevel((firstImg.levels ?? found.levels)?.[0] ?? "");
        }
      })
      .catch(() => {
        const fb = FALLBACK[productId] ?? FALLBACK[1];
        setProduct(fb);
        const firstImg = fb.images?.[0] ?? { src: fb.image, previewPdf: fb.previewPdf };
        setActiveImage(firstImg);
        setSelectedSize((firstImg.sizes ?? fb.sizes)?.[0] ?? "");
        setSelectedLevel((firstImg.levels ?? fb.levels)?.[0] ?? "");
      });
  }, [productId]);

  // Reset size & level saat activeImage ganti
  useEffect(() => {
    setSelectedSize(activeSizes?.[0] ?? "");
    setSelectedLevel(activeLevels?.[0] ?? "");
  }, [activeImage.src]);

  const handleInstagram = () => window.open("https://www.instagram.com/myawmories/", "_blank");

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: product.title, text: product.title + " - " + product.price, url });
    } else {
      navigator.clipboard?.writeText(url).then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      });
    }
  };

  const thumbnails = product.images ?? [{ src: product.image, previewPdf: product.previewPdf }];

  return (
    <div className="bg-surface min-h-screen pb-24 md:pb-32 relative">

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white border-2 border-primary rounded-full shadow-xl whitespace-nowrap"
          >
            <span className="text-sm font-bold text-primary">Copied! 🐾💕</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 md:pt-12">

        <motion.button
          whileHover={{ x: -4 }}
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-xs sm:text-sm mb-8 md:mb-12"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* KIRI: Gambar */}
          <div className="space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => activeImage.previewPdf && setShowPreview(true)}
              className={`polaroid p-3 sm:p-5 pb-10 sm:pb-14 relative group shadow-md hover:shadow-xl transition-shadow ${activeImage.previewPdf ? "cursor-pointer" : "cursor-default"}`}
              style={{ transform: "rotate(-1deg)" }}
            >
              <div className="aspect-square bg-surface-container rounded-sm overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage.src}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    src={activeImage.src}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {activeImage.previewPdf && (
                  <div className="absolute inset-0 bg-primary/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white p-3 rounded-full shadow-lg text-primary mb-2">
                      <BookOpen size={24} />
                    </div>
                    <p className="text-white font-bold text-sm">Preview Scrapbook</p>
                    <p className="text-white/90 text-xs mt-0.5">Click to flip inside</p>
                  </div>
                )}
              </div>
              <p className="text-center font-display italic font-bold text-on-surface-variant text-sm sm:text-base mt-3">
                {activeImage.label ? activeImage.label : "A Story to Keep Forever"}
              </p>
            </motion.div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8, paddingTop: 20, paddingLeft: 4, alignItems: "flex-end" }}>
              {thumbnails.map((img, i) => {
                const isSelected = activeImage.src === img.src && activeImage.previewPdf === img.previewPdf;
                const rotations = ["rotate(2deg)", "rotate(-3deg)", "rotate(2deg)"];
                return (
                  <div
                    key={i}
                    onClick={() => setActiveImage(img)}
                    style={{
                      position: "relative",
                      flexShrink: 0,
                      cursor: "pointer",
                      transform: rotations[i] ?? "rotate(0deg)",
                      opacity: isSelected ? 1 : 0.55,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {i === 0 && (
                      <div style={{ position: "absolute", top: -18, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10 }}>
                        <span className="washi-tape" style={{ fontSize: 7, fontWeight: 900, padding: "1px 6px", whiteSpace: "nowrap", textTransform: "uppercase" }}>
                          Popular
                        </span>
                      </div>
                    )}
                    <div style={{
                      width: 76,
                      boxSizing: "border-box",
                      backgroundColor: "white",
                      padding: "5px 5px 18px 5px",
                      boxShadow: isSelected
                        ? "0 0 0 2px #993556, 0 2px 8px rgba(0,0,0,0.15)"
                        : "0 1px 4px rgba(0,0,0,0.12)",
                    }}>
                      <div style={{ width: 66, height: 66, overflow: "hidden", backgroundColor: "#f0eaea", position: "relative" }}>
                        <img
                          src={img.src}
                          alt={"thumb " + (i + 1)}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                        {img.previewPdf && (
                          <div style={{ position: "absolute", bottom: 2, right: 2, background: "#993856", color: "white", padding: 2, borderRadius: 2, display: "flex" }}>
                            <BookOpen size={8} />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Label di bawah thumbnail */}
                    <p style={{
                      textAlign: "center",
                      fontSize: 9,
                      fontWeight: 700,
                      color: isSelected ? "#993556" : "#aaa",
                      marginTop: 4,
                      whiteSpace: "nowrap",
                    }}>
                      {img.label ?? "Photo " + (i + 1)}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* KANAN: Info & Order */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col"
          >
            <span className="text-[10px] tracking-widest font-black text-primary flex items-center gap-1.5 mb-2 sm:mb-3">
              <Sparkles size={12} /> HANDMADE WITH LOVE
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-on-surface mb-2">{product.title}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs font-bold text-on-surface-variant/80">(128 sweet reviews)</p>
            </div>

            {/* Description — berubah sesuai activeImage */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeDescription}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-on-surface-variant mb-6 leading-relaxed"
              >
                {activeDescription}
              </motion.p>
            </AnimatePresence>

            <div className="p-5 sm:p-6 bg-white/70 border-2 border-dashed border-primary/30 rounded-[2rem] shadow-sm mb-5">

              <div className="flex justify-between items-start mb-5">
                <div>
                  <p className="text-[9px] font-black tracking-wider text-primary/70 mb-0.5">SWEET PRICE</p>
                  <p className="text-3xl sm:text-4xl font-display font-extrabold text-primary">{activePrice}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 hover:bg-primary/10 rounded-full text-primary font-bold text-xs transition-colors"
                >
                  <Share2 size={14} /> Share
                </motion.button>
              </div>

              {/* Sizes — berubah sesuai activeImage */}
              {activeSizes?.length > 0 && (
                <div className="mb-5">
                  <p className="font-display font-extrabold text-on-surface text-xs sm:text-sm mb-2.5">Select Dimensions</p>
                  <div className="flex flex-wrap gap-2">
                    {activeSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                          selectedSize === size
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "bg-white text-on-surface-variant border border-surface-container-highest hover:border-primary/40"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Levels — berubah sesuai activeImage */}
              {activeLevels?.length > 0 && (
                <div className="mb-5">
                  <p className="font-display font-extrabold text-on-surface text-xs sm:text-sm mb-2.5">Magic Level</p>
                  <div className="grid grid-cols-3 gap-2">
                    {activeLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-2 py-3 rounded-xl text-[10px] font-bold text-center flex flex-col justify-center items-center gap-0.5 transition-all border-2 ${
                          selectedLevel === level
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-surface-container-highest bg-white text-on-surface-variant hover:border-primary/20"
                        }`}
                      >
                        <span className="font-extrabold leading-tight">{level.split("(")[0].trim()}</span>
                        {level.includes("(") && (
                          <span className="text-[8px] font-normal opacity-70 leading-tight">
                            {level.split("(")[1].replace(")", "")}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features — berubah sesuai activeImage */}
              {activeFeatures.length > 0 && (
                <div className="mb-5 border-t border-dashed border-primary/20 pt-4">
                  <p className="font-display font-extrabold text-on-surface text-xs mb-3">✨ Detail Produk</p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage.src + "features"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                    >
                      {activeFeatures.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                          <CheckCircle2 size={13} className="text-primary flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleInstagram}
                className="w-full py-4 bg-primary text-white font-display font-extrabold text-lg rounded-full shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Instagram size={20} /> Order via Instagram
              </motion.button>

              <p className="text-center mt-3 text-[10px] text-on-surface-variant/70 italic font-serif">
                Processing time: 5-7 kitty-nap business days
              </p>
            </div>

            <div className="flex justify-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => wishlist.toggleItem(product)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors ${
                  wishlisted ? "text-primary bg-primary/5" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <Heart size={16} className={wishlisted ? "fill-primary text-primary" : ""} />
                <span className="text-xs font-bold">
                  {wishlisted ? "Saved to Wishlist ✓" : "Add to Wishlist"}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        <div className="mt-20 md:mt-36 border-t border-surface-container-highest pt-12">
          <h2 className="text-lg sm:text-2xl font-display font-extrabold text-on-surface mb-6">
            Other Kitties Liked...
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((idx) => (
              <motion.div key={idx} whileHover={{ y: -4 }} className="group cursor-pointer">
                <div className={`polaroid p-2 pb-7 shadow-sm group-hover:shadow-md transition-all ${
                  idx % 2 === 0 ? "-rotate-2" : "rotate-1"
                } group-hover:rotate-0`}>
                  <div className="aspect-square bg-surface-container rounded-sm overflow-hidden mb-2">
                    <img
                      src="/images/product_keychain_1779100759746.png"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt="Related product"
                    />
                  </div>
                  <p className="text-center text-xs font-black text-on-surface truncate px-1">Kitty Treasure #{idx}</p>
                  <p className="text-center text-[10px] font-bold text-primary mt-0.5">Rp 25.000</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

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