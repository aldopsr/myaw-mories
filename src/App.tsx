import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import { useWishlist } from "./hooks/useWishlist";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const wishlist = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage, selectedProductId]);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    setSelectedProductId(null);
  };

  const handleSelectProduct = (id: number) => {
    setSelectedProductId(id);
    setActivePage("detail");
  };

  const renderPage = () => {
    if (selectedProductId !== null && activePage === "detail") {
      return (
        <ProductDetail
          productId={selectedProductId}
          onBack={() => handleNavigate("catalog")}
          wishlist={wishlist}
        />
      );
    }

    switch (activePage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "about":
        return <About />;
      case "catalog":
        return <Catalog onSelectProduct={handleSelectProduct} wishlist={wishlist} />;
      case "wishlist":
        return (
          <Wishlist
            items={wishlist.items}
            onRemove={wishlist.removeItem}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        );
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar
        activePage={activePage}
        setActivePage={handleNavigate}
        wishlistCount={wishlist.count}
      />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage + (selectedProductId || "")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <div className="fixed bottom-8 right-8 z-40 pointer-events-none opacity-20">
        <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center -rotate-12">
          <div className="w-8 h-8 bg-primary/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}