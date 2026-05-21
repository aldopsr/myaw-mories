import { motion } from "motion/react";
import { Heart, Instagram, Home as HomeIcon, LayoutGrid } from "lucide-react";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  wishlistCount?: number;
}

export default function Navbar({ activePage, setActivePage, wishlistCount = 0 }: NavbarProps) {
  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Catalog", id: "catalog" },
    // { name: "About", id: "about" },
  ];

  const handleInstagram = () => {
    window.open("https://www.instagram.com/myawmories/", "_blank");
  };

  return (
    <>
      {/* ── Top Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-container-highest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-24">
            
            {/* Logo - Dibuat Jauh Lebih Besar */}
            <div className="flex items-center cursor-pointer" onClick={() => setActivePage("home")}>
              <motion.img
                whileHover={{ scale: 1.05, rotate: -2 }}
                src="/images/myaw_mories_logo_1779100715275.png"
                alt="Myaw Mories"
                className="h-25 md:h-20 w-auto object-contain"
              />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                    activePage === link.id ? "text-primary" : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.name}
                  {activePage === link.id && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-container" />
                  )}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setActivePage("wishlist")}
                className={`relative p-2 transition-colors ${
                  activePage === "wishlist" ? "text-primary" : "text-on-surface-variant hover:text-primary"
                }`}
                aria-label="Wishlist"
              >
                <Heart size={20} className={activePage === "wishlist" ? "fill-primary" : ""} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Tombol Instagram dikembalikan ke style aslinya */}
              <button
                onClick={handleInstagram}
                className="ml-2 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-full hover:opacity-90 transition-all shadow-sm items-center gap-1.5 flex"
              >
                <Instagram size={14} /> Order via Instagram
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Bottom Navigation (Satu-satunya nav untuk mobile) ── */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        {/* Floating dock design biar lebih Gen Z */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-full flex justify-around items-center h-16 px-2">
          {[
            { id: "home", label: "Home", icon: HomeIcon },
            { id: "catalog", label: "Catalog", icon: LayoutGrid },
            // { id: "about", label: "About", icon: Info },
            { id: "wishlist", label: "Wishlist", icon: Heart, count: wishlistCount },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className="relative flex flex-col items-center gap-0.5 px-4 py-1.5 transition-all group"
              >
                <motion.div 
                  whileTap={{ scale: 0.8 }}
                  className={`p-1.5 rounded-full transition-all ${isActive ? "bg-primary/15" : ""}`}
                >
                  <Icon
                    size={22}
                    className={isActive ? "text-primary" : "text-on-surface-variant"}
                    fill={isActive && item.id === "wishlist" ? "currentColor" : "none"}
                  />
                </motion.div>
                
                {isActive && (
                   <motion.div 
                     layoutId="mobile-dot"
                     className="w-1 h-1 bg-primary rounded-full absolute -bottom-1"
                   />
                )}

                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute top-1 right-2 h-4 w-4 bg-primary text-white text-[9px] flex items-center justify-center rounded-full font-bold shadow-sm">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Spacer bawah biar konten nggak ketutup nav melayang */}
      <div className="md:hidden h-20" />
    </>
  );
}