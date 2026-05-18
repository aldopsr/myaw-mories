import { useState, useEffect } from "react";

export interface WishlistItem {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
}

const STORAGE_KEY = "myawmories_wishlist";

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (item: WishlistItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const isWishlisted = (id: number) => items.some((i) => i.id === id);

  const toggleItem = (item: WishlistItem) => {
    if (isWishlisted(item.id)) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  return { items, addItem, removeItem, isWishlisted, toggleItem, count: items.length };
}