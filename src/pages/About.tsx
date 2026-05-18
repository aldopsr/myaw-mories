import { motion } from "motion/react";
import { Heart, Sparkles, Users, Palette, Scissors } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Palette className="text-primary" />,
      title: "Kawaii Aesthetic",
      description: "Soft colors and playful motifs designed to make your heart smile every time you open your book.",
      bg: "bg-primary-container/20"
    },
    {
      icon: <Scissors className="text-secondary" />,
      title: "Artisan Quality",
      description: "We use premium papers and finishes that feel as good as they look, ensuring your memories last a lifetime.",
      bg: "bg-secondary-container/20"
    },
    {
      icon: <Users className="text-tertiary" />,
      title: "Gifting Community",
      description: "Join thousands of creators sharing their stories and finding joy in the art of scrapbooking.",
      bg: "bg-tertiary-container/30"
    }
  ];

  return (
    <div className="bg-surface pb-32">
       {/* Hero Section */}
       <section className="pt-20 pb-32 relative text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block mb-4"
          >
            <span className="washi-tape px-10 py-3 text-xl font-bold">Our Story</span>
          </motion.div>
          <div className="max-w-2xl mx-auto px-4 mt-6">
             <p className="text-on-surface-variant italic font-serif">Est. 2024</p>
          </div>
       </section>

       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
             >
                <div className="polaroid -rotate-3 hover:rotate-0 transition-all duration-500">
                   <div className="aspect-square bg-surface-container overflow-hidden rounded-sm mb-4">
                      <img 
                        src="/images/scrapbook_hero_1779100728856.png" 
                        alt="Workspace" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                   </div>
                   <p className="text-center font-display font-bold italic text-on-surface-variant flex items-center justify-center gap-2">
                     Where the magic happens <Sparkles size={16} />
                   </p>
                </div>
                {/* Decoration */}
                <div className="absolute -bottom-10 -left-10 text-primary/10 -z-10 bg-surface-container-highest rounded-full w-40 h-40 flex items-center justify-center">
                   <div className="w-10 h-10 bg-primary/20 rounded-full"></div>
                </div>
             </motion.div>

             <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
             >
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-surface-container-highest flex items-center justify-center">
                      <Heart size={20} className="text-primary fill-primary" />
                   </div>
                   <h2 className="headline-lg text-on-surface">Dear Kind Soul,</h2>
                </div>
                <div className="space-y-6 body-lg text-on-surface-variant">
                   <p>
                    At Myaw Mories, we believe that life's most precious moments aren't meant to stay trapped behind a glass screen. They deserve to be held, felt, and cherished in a way that is as unique as the memory itself.
                   </p>
                   <p>
                    Born from a love for kitty magic and the nostalgic charm of physical diaries, our mission is to provide you with the tools to preserve your journey. Whether it's a first pet, a beautiful sunset, or just a quiet afternoon tea, we sprinkle every product with love to help you tell your story.
                   </p>
                </div>

                <div className="mt-12 p-8 bg-white border border-surface-container-highest rounded-3xl shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Sparkles size={64} />
                   </div>
                   <h3 className="font-display font-bold text-xl text-on-surface mb-3">Our Promise</h3>
                   <p className="italic text-on-surface-variant leading-relaxed">
                    "Every page turned is a memory earned. We promise to keep your most whimsical moments safe in our scrapbooks, crafted with the softest palettes and the warmest hearts."
                   </p>
                   
                   <div className="flex flex-wrap gap-3 mt-8">
                      <span className="px-4 py-2 bg-tertiary-container/40 text-tertiary font-bold text-xs rounded-full flex items-center gap-2">
                        <Sparkles size={14} /> Hand-Drawn Designs
                      </span>
                      <span className="px-4 py-2 bg-primary-container/40 text-primary font-bold text-xs rounded-full flex items-center gap-2">
                        <Heart size={14} /> Made with Love
                      </span>
                   </div>
                </div>
             </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {values.map((val, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className={`${val.bg} p-10 rounded-[2.5rem] text-center flex flex-col items-center border border-white/50 backdrop-blur-sm shadow-sm`}
               >
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                    {val.icon}
                 </div>
                 <h3 className="headline-lg text-on-surface text-2xl mb-4 leading-tight">{val.title}</h3>
                 <p className="body-md text-on-surface-variant">
                   {val.description}
                 </p>
               </motion.div>
             ))}
          </div>

          <div className="mt-40 text-center">
             <div className="washi-tape px-12 py-4 text-2xl font-bold mb-12">Ready to start your diary?</div>
             <div className="flex flex-wrap justify-center gap-6">
                <button className="px-10 py-5 bg-primary text-white font-bold rounded-full text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                  Browse Catalog
                </button>
                <button className="px-10 py-5 bg-white border-2 border-primary text-primary font-bold rounded-full text-lg hover:scale-105 transition-transform flex items-center gap-2">
                   View Gallery <Heart size={20} />
                </button>
             </div>
          </div>
       </section>
    </div>
  );
}
