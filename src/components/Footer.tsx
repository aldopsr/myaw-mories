import { Instagram, Heart } from "lucide-react";

export default function Footer() {
  const handleInstagram = () => window.open("https://www.instagram.com/myawmories/", "_blank");

  return (
    <footer className="bg-secondary-container/30 pt-10 pb-4 border-t border-secondary-container/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
          {/* Logo + tagline */}
          <div className="text-center sm:text-left">
            <img
              src="/images/myaw_mories_logo_1779100715275.png"
              alt="Myaw Mories"
              className="h-20 w-auto object-contain mb-2 mx-auto sm:mx-0"
            />
            <p className="text-on-surface-variant text-xs leading-relaxed max-w-xs">
              More Stories, More MYAWMORIES
            </p>
          </div>

          {/* Instagram CTA */}
          <button
            onClick={handleInstagram}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-full hover:opacity-90 transition-all shadow-md shadow-primary/20"
          >
            <Instagram size={16} /> Order via Instagram
          </button>
        </div>

        {/* Bottom bar */}
        <div className="pt-5 border-t border-surface-container-highest flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-on-surface-variant/60 italic">
          <p>© 2026 Myaw Mories. Sprinkled with love and kitty magic.</p>
          <div className="flex items-center gap-1">
            <Heart size={9} className="text-primary fill-primary" /> zadebeg
          </div>
        </div>
      </div>
    </footer>
  );
}