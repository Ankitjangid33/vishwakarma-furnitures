'use client';

import { usePathname } from 'next/navigation';
import { LanguageProvider } from './LanguageProvider';
import { CartProvider } from './CartProvider';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFab from './WhatsAppFab';

/**
 * Admin panel apna alag layout aur apni bhasha use karta hai
 * (app/admin/layout.js -> AdminLangProvider), aur wahan cart ki
 * zarurat bhi nahi. Isliye admin routes par ye providers lagte hi nahi —
 * warna do LanguageProvider aapas me <html lang> ke liye ladte hain.
 */
export default function Providers({ children }) {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) return children;

  return (
    <LanguageProvider>
      <CartProvider>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <WhatsAppFab />
      </CartProvider>
    </LanguageProvider>
  );
}
