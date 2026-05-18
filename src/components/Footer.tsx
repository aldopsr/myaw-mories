import { Instagram, Mail, Share2, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary-container/30 pt-20 pb-10 border-t border-secondary-container/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-display font-extrabold text-2xl text-primary mb-4">Myaw Mories</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              Spreading whiskers and sparkles since 2024. Your one-stop shop for everything cute and tactile.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Instagram size={18} />
              </button>
              <button className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Mail size={18} />
              </button>
              <button className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Share2 size={18} />
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-on-surface mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><button className="hover:text-primary transition-colors font-medium">Catalog</button></li>
              <li><button className="hover:text-primary transition-colors font-medium">New Arrivals</button></li>
              <li><button className="hover:text-primary transition-colors font-medium">Best Sellers</button></li>
              <li><button className="hover:text-primary transition-colors font-medium">Bundle & Save</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-on-surface mb-6">Info</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><button className="hover:text-primary transition-colors font-medium">About Us</button></li>
              <li><button className="hover:text-primary transition-colors font-medium">Shipping Policy</button></li>
              <li><button className="hover:text-primary transition-colors font-medium">Refund Policy</button></li>
              <li><button className="hover:text-primary transition-colors font-medium">FAQs</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-on-surface mb-6">Connect</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              Want to get kitty magic in your inbox?
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 bg-white border border-surface-container-highest rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-container pr-12"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-full">
                <Heart size={14} fill="white" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-surface-container-highest flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant/70 italic">
          <p>© 2024 Myaw Mories. Sprinkled with love and kitty magic.</p>
          <div className="flex items-center gap-1">
            <Heart size={10} className="text-primary fill-primary" /> Made with love by Design Pixie
          </div>
        </div>
      </div>
      
      {/* Decorative footer icon */}
      <div className="mt-12 flex justify-center opacity-20">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
          <div className="w-6 h-4 bg-primary/40 rounded-t-full"></div>
        </div>
      </div>
    </footer>
  );
}
