import { Heart, ShoppingBag, Menu, X, Instagram } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Catalog", id: "catalog" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-container-highest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setActivePage("home")}
          >
            <span className="font-display font-extrabold text-2xl text-primary tracking-tight">Myaw Mories</span>
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
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-container"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
              <Heart size={20} />
            </button>
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">2</span>
            </button>
            <button className="hidden sm:block ml-2 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-full hover:bg-opacity-90 transition-all shadow-sm">
              Order via Instagram
            </button>
            
            {/* Mobile menu button */}
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
                  onClick={() => {
                    setActivePage(link.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-4 text-base font-medium ${
                    activePage === link.id ? "text-primary bg-surface-container-low" : "text-on-surface-variant hover:bg-surface-container-lowest"
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button className="w-full mt-4 px-4 py-3 bg-primary text-white text-sm font-semibold rounded-full flex items-center justify-center gap-2">
                <Instagram size={18} /> Order via Instagram
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
