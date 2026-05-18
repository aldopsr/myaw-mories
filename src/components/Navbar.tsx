import { Heart, Menu, X, Instagram } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  wishlistCount?: number;
}

export default function Navbar({ activePage, setActivePage, wishlistCount = 0 }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Catalog", id: "catalog" },
    { name: "About", id: "about" },
  ];

  const handleInstagram = () => {
    window.open("https://www.instagram.com/myawmories/", "_blank");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-container-highest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setActivePage("home")}>
            <img
              src="/images/myaw_mories_logo_1779100715275.png"
              alt="Myaw Mories"
              className="h-30 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  activePage === link.id
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.name}
                {activePage === link.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-container"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActivePage("wishlist")}
              className={`relative p-2 transition-colors ${
                activePage === "wishlist"
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-primary"
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

            <button
              onClick={handleInstagram}
              className="hidden sm:flex ml-2 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-full hover:opacity-90 transition-all shadow-sm items-center gap-1.5"
            >
              <Instagram size={14} /> Order via Instagram
            </button>

            <button
              className="md:hidden p-2 text-on-surface-variant"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-surface-container-highest overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { setActivePage(link.id); setIsOpen(false); }}
                  className={`block w-full text-left px-3 py-4 text-base font-medium ${
                    activePage === link.id
                      ? "text-primary bg-surface-container-low"
                      : "text-on-surface-variant hover:bg-surface-container-lowest"
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => { setActivePage("wishlist"); setIsOpen(false); }}
                className={`flex items-center gap-2 w-full text-left px-3 py-4 text-base font-medium ${
                  activePage === "wishlist"
                    ? "text-primary bg-surface-container-low"
                    : "text-on-surface-variant hover:bg-surface-container-lowest"
                }`}
              >
                <Heart size={18} /> Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-auto text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleInstagram}
                className="w-full mt-4 px-4 py-3 bg-primary text-white text-sm font-semibold rounded-full flex items-center justify-center gap-2"
              >
                <Instagram size={18} /> Order via Instagram
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}