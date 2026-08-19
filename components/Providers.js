'use client';

import { usePathname } from 'next/navigation';
import { LanguageProvider } from './LanguageProvider';
import { CartProvider } from './CartProvider';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFab from './WhatsAppFab';

/** Admin panel apna alag layout use karta hai — wahan public header/footer nahi */
function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return children;

  return (
    <>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <SiteChrome>{children}</SiteChrome>
      </CartProvider>
    </LanguageProvider>
  );
}
