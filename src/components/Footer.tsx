import { Instagram, Mail, Heart } from "lucide-react";

export default function Footer() {
  const handleInstagram = () => window.open("https://www.instagram.com/myawmories/", "_blank");

  return (
    <footer className="bg-secondary-container/30 pt-12 md:pt-20 pb-4 border-t border-secondary-container/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid: 2 col mobile, 4 col desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src="/images/myaw_mories_logo_1779100715275.png"
              alt="Myaw Mories"
              className="h-12 w-auto object-contain mb-3"
            />
            <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed mb-4">
              Spreading whiskers and sparkles since 2024. Your one-stop shop for everything cute and tactile.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleInstagram}
                className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </button>
              <button
                className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                aria-label="Email"
              >
                <Mail size={16} />
              </button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-bold text-on-surface mb-4 text-sm md:text-base">Shop</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-on-surface-variant">
              {["Catalog", "New Arrivals", "Best Sellers", "Bundle & Save"].map((item) => (
                <li key={item}>
                  <button className="hover:text-primary transition-colors font-medium">{item}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display font-bold text-on-surface mb-4 text-sm md:text-base">Info</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-on-surface-variant">
              {["About Us", "Shipping Policy", "Refund Policy", "FAQs"].map((item) => (
                <li key={item}>
                  <button className="hover:text-primary transition-colors font-medium">{item}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display font-bold text-on-surface mb-4 text-sm md:text-base">Connect</h4>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-3 leading-relaxed">
              Want to get kitty magic in your inbox?
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2.5 bg-white border border-surface-container-highest rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-container pr-11"
              />
              <button className="absolute right-2 top-1.5 p-1.5 bg-primary text-white rounded-full">
                <Heart size={13} fill="white" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-surface-container-highest flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-on-surface-variant/70 italic">
          <p>© 2024 Myaw Mories. Sprinkled with love and kitty magic.</p>
          <div className="flex items-center gap-1">
            <Heart size={10} className="text-primary fill-primary" /> Made with love
          </div>
        </div>
      </div>
    </footer>
  );
}