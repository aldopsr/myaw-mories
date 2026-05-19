import { motion } from "motion/react";
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
      { src: "/images/product_scrapbook_1779100744975.png", previewPdf: null },
      { src: "/images/product_scrapbook_1779100744975.png", previewPdf: null },
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

  // ✅ activeImage state — ini yang kurang sebelumnya!
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
          // ✅ reset activeImage ke foto pertama saat data load
          const firstImg = found.images?.[0] ?? { src: found.image, previewPdf: found.previewPdf };
          setActiveImage(firstImg);
        }
      })
      .catch(() => {
        const fb = FALLBACK[productId] ?? FALLBACK[1];
        setSelectedSize(fb.sizes?.[0] ?? "");
        setSelectedLevel(fb.levels?.[0] ?? "");
      });
  }, [productId]);

  const handleInstagram = () => {
    window.open("https://www.instagram.com/myawmories/", "_blank");
  };

  const features = product.features ?? [];
  const thumbnails = product.images ?? [{ src: product.image, previewPdf: product.previewPdf }];

  return (
    <div className="bg-surface min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-sm mb-12"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Kiri — gambar */}
          <div className="space-y-6">
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="polaroid p-6 pb-12 rotate-[-1deg] relative group cursor-pointer"
              onClick={() => activeImage.previewPdf && setShowPreview(true)}
            >
              <div className="aspect-square bg-surface-container rounded overflow-hidden mb-6 relative">
                <img
                  src={activeImage.src}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay — hanya muncul kalau ada PDF */}
                {activeImage.previewPdf && (
                  <div className="absolute inset-0 bg-primary/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
                    <BookOpen size={32} className="text-white mb-2" />
                    <p className="text-white font-bold text-sm">Preview Scrapbook</p>
                    <p className="text-white/80 text-xs mt-1">Klik untuk lihat isi</p>
                  </div>
                )}
              </div>
              <p className="text-center font-display italic font-bold text-on-surface-variant text-lg">
                A Story to Keep Forever
              </p>
            </motion.div>

            {/* Thumbnail row */}
            <div className="flex gap-4">
              {thumbnails.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-24 polaroid p-2 pb-6 cursor-pointer transition-all group/thumb ${
                    i === 0 ? "rotate-3" : i === 1 ? "-rotate-6" : "rotate-2"
                  } ${
                    activeImage.src === img.src && activeImage.previewPdf === img.previewPdf
                      ? "ring-2 ring-primary scale-105 opacity-100"
                      : "opacity-70 hover:opacity-100 hover:scale-110"
                  }`}
                >
                  <div className="w-full h-full bg-surface-container rounded-sm overflow-hidden relative">
                    <img
                      src={img.src}
                      alt={`thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Mini overlay kalau ada PDF */}
                    {img.previewPdf && (
                      <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity rounded-sm">
                        <BookOpen size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                  {i === 0 && (
                    <div className="absolute -top-2 -left-2 washi-tape px-2 py-0.5 text-[8px] font-bold">
                      BESTSELLER
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Kanan — info & order */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="label-sm text-primary tracking-widest font-extrabold flex items-center gap-2 mb-4">
              <Sparkles size={14} /> HANDMADE WITH LOVE
            </span>
            <h1 className="headline-xl text-primary mb-2">{product.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-xs font-bold text-on-surface-variant">(128 reviews)</p>
            </div>
            <p className="body-lg text-on-surface-variant mb-8 leading-relaxed">{product.description}</p>

            <div className="p-8 bg-white/50 border-2 border-dashed border-primary-container rounded-[2rem] mb-10">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="label-sm text-primary-container font-black mb-1">STARTING FROM</p>
                  <p className="text-4xl font-display font-extrabold text-primary">{product.price}</p>
                </div>
                <button
                  onClick={() => navigator.clipboard?.writeText(window.location.href)}
                  className="flex items-center gap-2 text-primary hover:underline font-bold text-sm"
                >
                  <Share2 size={16} /> Share
                </button>
              </div>

              {product.sizes?.length > 0 && (
                <div className="mb-8">
                  <p className="font-display font-bold text-on-surface text-sm mb-3">Choose Size</p>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                          selectedSize === size
                            ? "bg-primary text-white"
                            : "bg-white text-on-surface-variant border border-surface-container-highest"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.levels?.length > 0 && (
                <div className="mb-8">
                  <p className="font-display font-bold text-on-surface text-sm mb-3">Customization Level</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {product.levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-3 py-4 rounded-2xl text-[10px] font-bold text-center leading-tight transition-all border-2 ${
                          selectedLevel === level
                            ? "border-primary bg-primary-container/20 text-primary"
                            : "border-surface-container-highest bg-white text-on-surface-variant"
                        }`}
                      >
                        {level.split("(")[0].trim()}
                        <span className="block mt-1 font-normal opacity-70 text-[8px]">
                          {level.includes("(") ? level.split("(")[1].replace(")", "") : ""}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {features.length > 0 && (
                <div className="space-y-3 mb-8">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-medium text-on-surface-variant">
                      <CheckCircle2 size={16} className="text-primary-container" /> {f}
                    </div>
                  ))}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleInstagram}
                className="w-full py-5 bg-primary text-white font-display font-extrabold text-xl rounded-full shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                <Instagram size={22} /> Order via Instagram
              </motion.button>
              <p className="text-center mt-4 text-[10px] text-on-surface-variant italic font-serif">
                Processing time: 5-7 kitty-nap business days
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => wishlist.toggleItem(product)}
                className={`flex items-center gap-2 transition-colors ${
                  wishlisted ? "text-primary" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <Heart size={20} className={wishlisted ? "fill-primary" : ""} />
                <span className="text-xs font-bold">
                  {wishlisted ? "Saved to Wishlist ✓" : "Add to Wishlist"}
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
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

        {/* ✅ Modal pakai activeImage.previewPdf bukan product.previewPdf */}
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