import { motion, AnimatePresence } from "motion/react";
import { Heart, Trash2, Sparkles, Instagram } from "lucide-react";
import { WishlistItem } from "../hooks/useWishlist";

interface WishlistProps {
  items: WishlistItem[];
  onRemove: (id: number) => void;
  onNavigate: (page: string) => void;
  onSelectProduct: (id: number) => void;
}

export default function Wishlist({ items, onRemove, onNavigate, onSelectProduct }: WishlistProps) {
  const handleInstagram = () => {
    window.open("https://www.instagram.com/myawmories/", "_blank");
  };

  return (
    // pb-28 untuk mobile agar konten tidak tertutup bottom nav
    <div className="bg-surface min-h-screen pb-28 md:pb-12">
      <section className="pt-20 pb-12 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-6"
        >
          <span className="washi-tape px-12 py-3 text-2xl font-bold">My Wishlist</span>
        </motion.div>
        <p className="body-md text-on-surface-variant max-w-md mx-auto italic font-serif">
          Things that made your heart go ✨
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 bg-primary-container/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-primary/40" />
            </div>
            <h2 className="headline-lg text-on-surface mb-3">Your wishlist is empty</h2>
            <p className="text-on-surface-variant italic font-serif mb-8">
              No kitty treasures saved yet... go explore!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate("catalog")}
              className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20"
            >
              Browse Catalog
            </motion.button>
          </motion.div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-on-surface-variant text-sm font-medium">
                {items.length} item{items.length > 1 ? "s" : ""} saved
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleInstagram}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-full shadow-md shadow-primary/20"
              >
                <Instagram size={15} /> Order via Instagram
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="bg-white border border-surface-container-highest rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div
                      className="aspect-video overflow-hidden bg-surface-container cursor-pointer"
                      onClick={() => onSelectProduct(item.id)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-1">
                        <h3
                          className="font-display font-bold text-on-surface text-lg leading-tight cursor-pointer hover:text-primary transition-colors"
                          onClick={() => onSelectProduct(item.id)}
                        >
                          {item.title}
                        </h3>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="p-1.5 text-on-surface-variant hover:text-red-400 transition-colors ml-2 flex-shrink-0"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-primary font-bold text-sm mb-1">{item.price}</p>
                      <p className="text-on-surface-variant text-xs font-serif italic mb-4">
                        {item.category}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onSelectProduct(item.id)}
                          className="flex-1 py-2.5 bg-primary/10 text-primary text-xs font-bold rounded-full hover:bg-primary hover:text-white transition-all"
                        >
                          View Detail
                        </button>
                        <button
                          onClick={handleInstagram}
                          className="flex-1 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-1"
                        >
                          <Instagram size={12} /> Order
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16 text-center p-10 bg-secondary-container/30 rounded-[2rem] border-2 border-dashed border-secondary-container"
            >
              <Sparkles size={32} className="text-primary mx-auto mb-4 opacity-60" />
              <h3 className="font-display font-bold text-xl text-on-surface mb-2">
                Ready to order?
              </h3>
              <p className="text-on-surface-variant text-sm mb-6 font-serif italic">
                DM us on Instagram and we'll make your kitty dreams come true!
              </p>
              <button
                onClick={handleInstagram}
                className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 flex items-center gap-2 mx-auto"
              >
                <Instagram size={18} /> Open Instagram
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}