import { motion } from "motion/react";
import PolaroidCard from "../components/PolaroidCard";
import { ArrowRight, Sparkles, Star, Heart, Instagram } from "lucide-react";

const IMAGES = {
  hero: "/images/scrapbook_hero_1779100728856.png",
  scrapbook: "/images/product_scrapbook_1779100744975.png",
  keychain: "/images/product_keychain_1779100759746.png",
  pins: "/images/product_pins_1779100775167.png",
};

export default function Home({ onNavigate }: { onNavigate: (page: string) => void }) {
  const handleInstagram = () => window.open("https://www.instagram.com/myawmories/", "_blank");

  return (
    <div className="overflow-x-hidden pb-4">
      {/* ── Hero Section with EXTRA DECORATIONS ── */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-28 bg-surface overflow-hidden">
        
        {/* Floating Decor Backgrounds */}
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-10 left-[5%] text-primary/30 z-0">
          <Sparkles size={45} />
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute top-32 right-[10%] text-primary/20 z-0">
          <Heart size={30} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute bottom-20 right-[5%] text-primary/20 rotate-12 z-0 hidden sm:block">
          <Star size={70} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }} className="absolute bottom-10 left-[15%] text-primary/30 z-0">
          <Heart size={20} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Text */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-block mb-4 relative">
                <span className="washi-tape text-xs uppercase tracking-widest font-bold px-4 py-1.5 bg-primary/20 text-primary rounded-sm rotate-2 inline-block">
                  New Arrivals ✨
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold mb-4 text-on-surface leading-tight relative">
                Scrapbooks &{" "}
                <span className="text-primary italic relative inline-block">
                  cute gifts
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-2 left-0 h-2 bg-primary-container/80 -z-10 rounded-full"
                  />
                </span>{" "}
                <br /> for your favorite people
              </h1>
              <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-lg leading-relaxed">
                Turn your precious memories into tangible magic with our handcrafted scrapbooks and kawaii-inspired stationery.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate("catalog")}
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-primary text-white font-bold rounded-full flex items-center gap-2 shadow-lg shadow-primary/30 text-sm sm:text-base"
                >
                  Shop Catalog <ArrowRight size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate("about")}
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-secondary-container text-on-secondary-container font-bold rounded-full text-sm sm:text-base hover:bg-secondary-container/80 transition-colors"
                >
                  About Us
                </motion.button>
              </div>

              {/* Instagram CTA — mobile only (Kembali ke style awal) */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleInstagram}
                className="sm:hidden mt-6 w-full py-3.5 bg-primary/10 text-primary font-bold rounded-full flex items-center justify-center gap-2 text-sm border border-primary/20"
              >
                <Instagram size={18} /> Order via Instagram
              </motion.button>
            </motion.div>

            {/* Hero image with cute rotation and floating background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              {/* Cute Abstract Blob Behind Image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary-container/40 rounded-full blur-3xl -z-10"></div>
              
              <motion.div 
                whileHover={{ rotate: 2, scale: 1.02 }}
                className="polaroid -rotate-3 transition-transform duration-500 max-w-[280px] sm:max-w-sm mx-auto shadow-xl bg-white p-3 pb-6 rounded-md"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-3">
                  <img src={IMAGES.hero} alt="Scrapbook set" className="w-full h-full object-cover" />
                </div>
                <p className="text-center font-display font-bold text-on-surface-variant text-sm flex justify-center items-center gap-1">
                  Where the magic happens <Sparkles size={14} className="text-primary" />
                </p>
              </motion.div>

              {/* Floating Mini Sticker Image */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }} 
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-8 -left-2 w-24 h-24 bg-surface rounded-full p-2 shadow-lg rotate-12 hidden sm:block border-2 border-primary/10"
              >
                <img src={IMAGES.keychain} alt="Keychain" className="w-full h-full object-cover rounded-full" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-16 md:py-24 bg-white border-y border-surface-container-highest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-on-surface mb-1">
                Featured Kitties
              </h2>
              <p className="text-on-surface-variant italic font-serif text-xs sm:text-sm">
                Handpicked favorites from the workshop
              </p>
            </div>
            <button onClick={() => onNavigate("catalog")} className="text-primary font-bold text-xs sm:text-sm hover:underline flex items-center gap-1 whitespace-nowrap">
              View All <ArrowRight size={14} />
            </button>
          </div>

          {/* 2 cols mobile, 4 cols desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { image: IMAGES.scrapbook, title: "Magic Scrapbook", price: "Rp 85.000", rotation: -2 },
              { image: IMAGES.keychain, title: "Kitty Keychain", price: "Rp 35.000", rotation: 3 },
              { image: IMAGES.pins, title: "Enamel Pin", price: "Rp 25.000", rotation: -1 },
              { image: IMAGES.hero, title: "Sticker Sheet", price: "Rp 20.000", rotation: 2 },
            ].map((item, i) => (
              <PolaroidCard
                key={i}
                image={item.image}
                title={item.title}
                price={item.price}
                rotation={item.rotation}
                onClick={() => onNavigate("catalog")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bundle Banner ── */}
      <section className="py-10 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-secondary-container/50 border-2 border-dashed border-secondary-container p-8 md:p-12 rounded-[1.5rem] md:rounded-[2rem] text-center relative overflow-hidden"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary mb-3 italic">
              Bundle & Save 5%
            </h2>
            <p className="text-on-secondary-container text-sm md:text-base mb-6 max-w-md mx-auto leading-relaxed">
              Pick a scrapbook, 2 keychains, and 5 stickers to create the ultimate gift package and unlock a 5% discount!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 text-sm sm:text-base"
            >
              Build My Bundle
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Personalized Note ── */}
      <section className="py-12 md:py-24 bg-surface-container-low/50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-16 border border-surface-container-highest grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-on-surface mb-4">
                Customized Just for You
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-6 text-sm sm:text-base">
                Every order comes with a personalized hand-drawn thank you note and a sprinkle of kitty magic. From the way we wrap your goodies to the handwritten names on every envelope, your package is a labor of love.
              </p>
              <div className="flex gap-3">
                <div className="p-3 bg-primary-container/30 text-primary rounded-xl">
                  <Sparkles size={22} />
                </div>
                <div className="p-3 bg-secondary-container/30 text-secondary rounded-xl">
                  <Heart size={22} />
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="polaroid rotate-3 max-w-[200px] sm:max-w-[240px] mx-auto">
                <div className="aspect-[3/4] bg-surface-container-highest flex items-center justify-center mb-4">
                  <p className="text-on-surface-variant/40 italic text-xs text-center px-4">Your personalized note</p>
                </div>
                <p className="text-center font-display font-medium text-xs text-on-surface-variant">
                  A little magic for you...
                </p>
              </div>
              <div className="absolute top-2 right-[20%] -rotate-12 hidden sm:block">
                <div className="w-3 h-10 border-2 border-primary-container rounded-full opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}