import { motion } from "motion/react";
import { Heart, Sparkles, Users, Palette, Scissors } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Palette className="text-primary" size={22} />,
      title: "Kawaii Aesthetic",
      description: "Soft colors and playful motifs designed to make your heart smile every time you open your book.",
      bg: "bg-primary-container/20",
    },
    {
      icon: <Scissors className="text-secondary" size={22} />,
      title: "Artisan Quality",
      description: "We use premium papers and finishes that feel as good as they look, ensuring your memories last a lifetime.",
      bg: "bg-secondary-container/20",
    },
    {
      icon: <Users className="text-tertiary" size={22} />,
      title: "Gifting Community",
      description: "Join thousands of creators sharing their stories and finding joy in the art of scrapbooking.",
      bg: "bg-tertiary-container/30",
    },
  ];

  return (
    <div className="bg-surface pb-16 md:pb-32">
      {/* Hero */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-28 text-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-block mb-4">
          <span className="washi-tape px-8 py-2.5 text-lg md:text-xl font-bold">Our Story</span>
        </motion.div>
        <p className="text-on-surface-variant italic font-serif mt-4 text-sm">Est. 2024</p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="polaroid -rotate-2 hover:rotate-0 transition-all duration-500 max-w-xs sm:max-w-sm mx-auto">
              <div className="aspect-square bg-surface-container overflow-hidden rounded-sm mb-4">
                <img
                  src="/images/scrapbook_hero_1779100728856.png"
                  alt="Workspace"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center font-display font-bold italic text-on-surface-variant text-xs sm:text-sm flex items-center justify-center gap-1">
                Where the magic happens <Sparkles size={14} />
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm border border-surface-container-highest flex items-center justify-center flex-shrink-0">
                <Heart size={18} className="text-primary fill-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-on-surface">Dear Kind Soul,</h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
              <p>
                At Myaw Mories, we believe that life's most precious moments aren't meant to stay trapped behind a glass screen. They deserve to be held, felt, and cherished in a way that is as unique as the memory itself.
              </p>
              <p>
                Born from a love for kitty magic and the nostalgic charm of physical diaries, our mission is to provide you with the tools to preserve your journey.
              </p>
            </div>

            <div className="mt-8 p-6 md:p-8 bg-white border border-surface-container-highest rounded-2xl md:rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-5">
                <Sparkles size={48} />
              </div>
              <h3 className="font-display font-bold text-lg text-on-surface mb-2">Our Promise</h3>
              <p className="italic text-on-surface-variant leading-relaxed text-sm">
                "Every page turned is a memory earned. We promise to keep your most whimsical moments safe in our scrapbooks, crafted with the softest palettes and the warmest hearts."
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1.5 bg-tertiary-container/40 text-tertiary font-bold text-xs rounded-full flex items-center gap-1.5">
                  <Sparkles size={12} /> Hand-Drawn Designs
                </span>
                <span className="px-3 py-1.5 bg-primary-container/40 text-primary font-bold text-xs rounded-full flex items-center gap-1.5">
                  <Heart size={12} /> Made with Love
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values — 1 col mobile, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${val.bg} p-7 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] text-center flex flex-col items-center border border-white/50`}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm mb-4 md:mb-6">
                {val.icon}
              </div>
              <h3 className="font-display font-bold text-lg md:text-xl text-on-surface mb-3 leading-tight">{val.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{val.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-40 text-center px-4">
          <div className="washi-tape px-8 py-3 text-lg md:text-2xl font-bold mb-8 inline-block">
            Ready to start your diary?
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform text-sm sm:text-base">
              Browse Catalog
            </button>
            <button className="px-8 py-4 bg-white border-2 border-primary text-primary font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm sm:text-base">
              View Gallery <Heart size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}