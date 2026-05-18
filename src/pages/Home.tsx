import { motion } from "motion/react";
import PolaroidCard from "../components/PolaroidCard";
import { ArrowRight, Sparkles, Star, Heart } from "lucide-react";

const IMAGES = {
  logo: "/images/myaw_mories_logo_1779100715275.png",
  hero: "/images/scrapbook_hero_1779100728856.png",
  scrapbook: "/images/product_scrapbook_1779100744975.png",
  keychain: "/images/product_keychain_1779100759746.png",
  pins: "/images/product_pins_1779100775167.png"
};

export default function Home({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 bg-surface overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-[5%] text-primary/20 animate-pulse">
          <Sparkles size={48} />
        </div>
        <div className="absolute bottom-40 right-[10%] text-primary/10 rotate-12">
          <Star size={120} fill="currentColor" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-6">
                <span className="washi-tape text-xs uppercase tracking-widest font-bold">New Arrivals</span>
              </div>
              <h1 className="headline-xl mb-6 text-on-surface">
                Scrapbooks & <span className="text-primary italic relative inline-block">
                  cute gifts
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-1 left-0 h-1.5 bg-primary-container/60 -z-10"
                  />
                </span> for your favorite people
              </h1>
              <p className="body-lg text-on-surface-variant mb-10 max-w-lg">
                Turn your precious memories into tangible magic with our handcrafted scrapbooks and kawaii-inspired stationery.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate("catalog")}
                  className="px-8 py-4 bg-primary text-white font-bold rounded-full flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:bg-opacity-90"
                >
                  Shop Catalog <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate("about")}
                  className="px-8 py-4 bg-secondary-container text-on-secondary-container font-bold rounded-full transition-all hover:bg-opacity-80"
                >
                  About Us
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="polaroid -rotate-3 hover:rotate-0 transition-transform duration-500 max-w-md mx-auto aspect-[4/3]">
                <img 
                  src={IMAGES.hero} 
                  alt="Scrapbook set" 
                  className="w-full h-full object-cover rounded-sm mb-2"
                  referrerPolicy="no-referrer"
                />
                <p className="text-center font-display font-bold italic text-on-surface-variant">Where the magic happens ✨</p>
              </div>
              
              {/* Floating paw print */}
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-surface-container rounded-full flex items-center justify-center -rotate-12 opacity-50">
                 <div className="w-12 h-12 bg-primary/20 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white border-y border-surface-container-highest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="headline-lg text-on-surface mb-2">Featured Kitties</h2>
              <p className="text-on-surface-variant italic font-serif">Handpicked favorites from the workshop</p>
            </div>
            <button 
              onClick={() => onNavigate("catalog")}
              className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <PolaroidCard 
               image={IMAGES.scrapbook} 
               title="Magic Scrapbook" 
               price="$32.00" 
               rotation={-2}
               onClick={() => onNavigate("catalog")}
            />
            <PolaroidCard 
               image={IMAGES.keychain} 
               title="Kitty Keychain" 
               price="$12.00" 
               rotation={3}
               onClick={() => onNavigate("catalog")}
            />
            <PolaroidCard 
               image={IMAGES.pins} 
               title="Enamel Pin" 
               price="$8.00" 
               rotation={-1}
               onClick={() => onNavigate("catalog")}
            />
             <PolaroidCard 
               image={IMAGES.hero} 
               title="Sticker Sheet" 
               price="$5.00" 
               rotation={2}
               onClick={() => onNavigate("catalog")}
            />
          </div>
        </div>
      </section>

      {/* Bundle & Save Banner */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-secondary-container/50 border-2 border-dashed border-secondary-container p-12 rounded-[2rem] text-center relative overflow-hidden"
          >
            <div className="absolute top-4 left-4 opacity-10">
               <ArrowRight size={80} className="rotate-45" />
            </div>
            <div className="absolute bottom-4 right-4 opacity-10">
               <ArrowRight size={80} className="-rotate-[135deg]" />
            </div>
            
            <h2 className="headline-lg text-primary mb-4 italic">Bundle & Save 5%</h2>
            <p className="body-md text-on-secondary-container mb-8 max-w-xl mx-auto">
              Pick a scrapbook, 2 keychains, and 5 stickers to create the ultimate gift package and automatically unlock a 5% discount at checkout!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20"
            >
              Build My Bundle
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Personalized Note Section */}
      <section className="py-24 bg-surface-container-low/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-sm border border-surface-container-highest grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="headline-lg text-on-surface mb-6">Customized Just for You</h2>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  Every order comes with a personalized hand-drawn thank you note and a sprinkle of kitty magic. We care about the small details because we know they matter to you. From the way we wrap your goodies to the handwritten names on every envelope, your package is a labor of love.
                </p>
                <div className="flex gap-4">
                  <div className="p-3 bg-primary-container/30 text-primary rounded-xl">
                    <Sparkles size={24} />
                  </div>
                  <div className="p-3 bg-secondary-container/30 text-secondary rounded-xl">
                    <Heart size={24} />
                  </div>
                </div>
             </div>
             <div className="relative">
                <div className="polaroid rotate-6 max-w-xs mx-auto">
                  <div className="aspect-[3/4] bg-surface-container-highest flex items-center justify-center mb-4">
                     <p className="text-on-surface-variant/40 italic text-sm">Your personalized note</p>
                  </div>
                  <p className="text-center font-display font-medium text-xs text-on-surface-variant">A little magic for you...</p>
                </div>
                {/* Paper clip decor */}
                <div className="absolute top-2 right-[25%] -rotate-12">
                   <div className="w-4 h-12 border-2 border-primary-container rounded-full opacity-50"></div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
