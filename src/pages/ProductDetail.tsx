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

// FALLBACK hanya dipakai kalau fetch /products.json gagal total
const FALLBACK: Record<number, Product> = {
  1: {
    id: 1,
    title: "To My Favorite Person",
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
        src: "/images/foto_isi_halaman.png",
        previewPdf: null,
        label: "Isi Halaman",
        description: "Setiap halaman didekorasi manual dengan washi tape dan stiker imported.",
        sizes: ["15x15 cm", "20x20 cm"],
        levels: ["Basic (Stickers only)", "Semi (Tape + Florals)", "Full (All out magic)"],
        features: ["Washi tape imported", "Dried flower decoration", "Hand-lettering option"],
      },
      {
        src: "/images/foto_packaging.png",
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
  2: {
    id: 2,
    title: "Sparkle Paw Charm",
    price: "Rp 35.000",
    category: "Acrylic Keychains",
    image: "/images/product_keychain_1779100759746.png",
    description: "Acrylic keychain holographic glitter rose gold clasp.",
    sizes: ["Standard"],
    levels: [],
    stock: true,
    previewPdf: null,
  },
};

interface ProductDetailProps {
  productId: number;
  onBack: () => void;
  onSelectProduct: (id: number) => void;
  wishlist: ReturnType<typeof useWishlist>;
}

export default function ProductDetail({ productId, onBack, onSelectProduct, wishlist }: ProductDetailProps) {
  const [product, setProduct] = useState<Product>(FALLBACK[productId] ?? FALLBACK[1]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Copied! 🐾💕");
  const [activeImage, setActiveImage] = useState<ProductImage>({
    src: FALLBACK[productId]?.image ?? FALLBACK[1].image,
    previewPdf: FALLBACK[productId]?.previewPdf ?? null,
  });

  const wishlisted = wishlist.isWishlisted(product.id);

  const activeDescription = activeImage.description ?? product.description;
  const activePrice = activeImage.price ?? product.price;
  const activeSizes = activeImage.sizes ?? product.sizes ?? [];
  const activeLevels = activeImage.levels ?? product.levels ?? [];
  const activeFeatures = activeImage.features ?? product.features ?? [];

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setAllProducts(data);
        const found = data.find((p) => p.id === productId);
        if (found) {
          setProduct(found);
          const firstImg = found.images?.[0] ?? { src: found.image, previewPdf: found.previewPdf };
          setActiveImage(firstImg);
          setSelectedSize((firstImg.sizes ?? found.sizes ?? [])[0] ?? "");
          setSelectedLevel((firstImg.levels ?? found.levels ?? [])[0] ?? "");
        }
      })
      .catch(() => {
        const fb = FALLBACK[productId] ?? FALLBACK[1];
        setProduct(fb);
        const firstImg = fb.images?.[0] ?? { src: fb.image, previewPdf: fb.previewPdf };
        setActiveImage(firstImg);
        setSelectedSize((firstImg.sizes ?? fb.sizes ?? [])[0] ?? "");
        setSelectedLevel((firstImg.levels ?? fb.levels ?? [])[0] ?? "");
      });
  }, [productId]);

  useEffect(() => {
    setSelectedSize(activeSizes?.[0] ?? "");
    setSelectedLevel(activeLevels?.[0] ?? "");
  }, [activeImage.src]);

  const handleInstagram = () => window.open("https://www.instagram.com/myawmories/", "_blank");

  const showToastMsg = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: `${product.title} - ${product.price} | Myaw Mories`,
      url: window.location.href,
    };
    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToastMsg("Link copied! 🐾💕");
      }
    } catch {
      // User cancelled share or clipboard failed
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToastMsg("Link copied! 🐾💕");
      } catch {
        showToastMsg("Copy the URL manually 🙏");
      }
    }
  };

  const thumbnails = product.images ?? [{ src: product.image, previewPdf: product.previewPdf }];

  return (
    // pb-28 untuk mobile agar konten tidak tertutup bottom nav
    <div className="bg-surface min-h-screen pb-28 md:pb-32 relative">

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white border-2 border-primary rounded-full shadow-xl whitespace-nowrap"
          >
            <span className="text-sm font-bold text-primary">{toastMessage}</span>
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
                {activeImage.label ?? "A Story to Keep Forever"}
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
                      opacity: isSelected ? 1 : 0.65,
                      transition: "all 0.2s",
                    }}
                  >
                    <div
                      style={{
                        background: "white",
                        padding: "6px 6px 22px 6px",
                        boxShadow: isSelected
                          ? "0 6px 24px rgba(0,0,0,0.18)"
                          : "0 2px 8px rgba(0,0,0,0.10)",
                        border: isSelected ? "2px solid var(--color-primary)" : "2px solid transparent",
                        borderRadius: 4,
                        width: 72,
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.label ?? `View ${i + 1}`}
                        style={{ width: 60, height: 60, objectFit: "cover", display: "block", borderRadius: 2 }}
                      />
                    </div>
                    {img.label && (
                      <p style={{ textAlign: "center", fontSize: 9, fontWeight: 700, marginTop: 4, color: "var(--color-on-surface-variant)" }}>
                        {img.label}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* KANAN: Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-1">

            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary-container/40 text-primary text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              {product.stock ? (
                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-extrabold rounded-full">✓ In Stock</span>
              ) : (
                <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-extrabold rounded-full">Out of Stock</span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-on-surface leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-1 py-1">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
              <span className="text-xs text-on-surface-variant ml-1 font-medium">(18 reviews)</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={activePrice}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-3xl font-display font-extrabold text-primary py-2"
              >
                {activePrice}
              </motion.p>
            </AnimatePresence>



            <AnimatePresence mode="wait">
              <motion.p
                key={activeDescription}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-line border-t border-dashed border-primary/20 pt-4 mb-4"
              >
                {activeDescription}
              </motion.p>
            </AnimatePresence>

            {/* Sizes */}
            {activeSizes.length > 0 && (
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

            {/* Levels */}
            {activeLevels.length > 0 && (
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

            {/* Features */}
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

            {/* ── Action Bar: Share + Wishlist + Order ── */}
            <div className="flex items-center gap-2 mt-2">
              {/* Share */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                aria-label="Share produk"
                className="w-12 h-12 flex-shrink-0 rounded-full bg-primary-container/40 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary-container/70 transition-colors"
              >
                <Share2 size={18} />
              </motion.button>

              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => wishlist.toggleItem(product)}
                aria-label={wishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"}
                className={`w-12 h-12 flex-shrink-0 rounded-full border flex items-center justify-center transition-all ${
                  wishlisted
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/30"
                    : "bg-primary-container/40 border-primary/20 text-primary hover:bg-primary-container/70"
                }`}
              >
                <Heart size={18} className={wishlisted ? "fill-white" : ""} />
              </motion.button>

              {/* Order — takes remaining space */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleInstagram}
                className="flex-1 py-3.5 bg-primary text-white font-display font-extrabold text-base rounded-full shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Instagram size={18} /> Order via Instagram
              </motion.button>
            </div>

            <p className="text-center mt-2.5 text-[10px] text-on-surface-variant/60 italic font-serif">
              Processing time: 5–7 kitty-nap business days 🐾
            </p>

          </motion.div>
        </div>

        {/* Related products — dari products.json, exclude produk yang sedang dibuka */}
        {allProducts.filter((p) => p.id !== productId).length > 0 && (
          <div className="mt-20 md:mt-36 border-t border-surface-container-highest pt-12">
            <h2 className="text-lg sm:text-2xl font-display font-extrabold text-on-surface mb-6">
              Other Kitties Liked... 🐾
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {allProducts
                .filter((p) => p.id !== productId)
                .slice(0, 4)
                .map((p, idx) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -4 }}
                    onClick={() => onSelectProduct(p.id)}
                    className="group cursor-pointer"
                  >
                    <div className={`polaroid p-2 pb-7 shadow-sm group-hover:shadow-md transition-all ${
                      idx % 2 === 0 ? "-rotate-2" : "rotate-1"
                    } group-hover:rotate-0`}>
                      <div className="aspect-square bg-surface-container rounded-sm overflow-hidden mb-2">
                        {p.image ? (
                          <img
                            src={p.image}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            alt={p.title}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary-container/30 text-3xl">
                            🐱
                          </div>
                        )}
                      </div>
                      <p className="text-center text-xs font-black text-on-surface truncate px-1">{p.title}</p>
                      <p className="text-center text-[10px] font-bold text-primary mt-0.5">{p.price}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

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