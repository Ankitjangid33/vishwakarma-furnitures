'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

/**
 * "Order list" (cart) — browser me localStorage me rehti hai,
 * page refresh ya band karne par bhi bachi rehti hai.
 */

const CartContext = createContext(null);
const STORAGE_KEY = 'vf_cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.slug === product.slug);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [
        ...prev,
        {
          productId: product._id || '',
          slug: product.slug,
          name: { en: product.name?.en || '', hi: product.name?.hi || '' },
          price: product.price || 0,
          priceType: product.priceType || 'fixed',
          unit: product.unit || 'piece',
          image: product.images?.[0]?.url || '',
          category: product.category || '',
          qty
        }
      ];
    });
  }, []);

  const removeItem = useCallback((slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const setQty = useCallback((slug, qty) => {
    const n = Math.max(1, Math.min(99, Number(qty) || 1));
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: n } : i)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const has = useCallback((slug) => items.some((i) => i.slug === slug), [items]);

  const { count, estimatedTotal, hasQuoteItems } = useMemo(() => {
    let count = 0;
    let total = 0;
    let quote = false;
    for (const i of items) {
      count += i.qty;
      if (i.priceType === 'quote' || !i.price) quote = true;
      else total += i.price * i.qty;
    }
    return { count, estimatedTotal: total, hasQuoteItems: quote };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        ready,
        count,
        estimatedTotal,
        hasQuoteItems,
        addItem,
        removeItem,
        setQty,
        clear,
        has,
        drawerOpen,
        setDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
