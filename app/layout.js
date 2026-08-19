import { Martel, Mukta } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import { SITE } from '@/lib/site';

// Dono fonts Hindi (Devanagari) aur English dono support karte hain
const display = Martel({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap'
});

const body = Mukta({
  subsets: ['latin', 'devanagari'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap'
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Vishwakarma Furniture — विश्वकर्मा फर्नीचर | Custom Wooden Furniture',
    template: '%s | Vishwakarma Furniture'
  },
  description:
    'Handmade wooden furniture for bedroom, living room, kitchen, office and mandir. Beds, wardrobes, sofas, modular kitchens and doors made to your size. बेड, कपाट, सोफा, मॉड्यूलर किचन और दरवाजे — आपके नाप के अनुसार।',
  keywords: [
    'furniture',
    'wooden furniture',
    'custom furniture',
    'modular kitchen',
    'wardrobe',
    'bed',
    'विश्वकर्मा फर्नीचर',
    'लकड़ी का फर्नीचर',
    'कपाट',
    'मॉड्यूलर किचन'
  ],
  openGraph: {
    title: 'Vishwakarma Furniture — विश्वकर्मा फर्नीचर',
    description: 'Custom wooden furniture made to your size. आपके नाप का लकड़ी का फर्नीचर।',
    type: 'website',
    locale: 'hi_IN'
  },
  robots: { index: true, follow: true }
};

export const viewport = {
  themeColor: '#8b5a2b',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
