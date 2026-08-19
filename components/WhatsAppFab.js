'use client';

import { usePathname } from 'next/navigation';
import Icon from './Icons';
import { useLang } from './LanguageProvider';
import { waLink } from '@/lib/site';

/** Har page par niche floating WhatsApp button */
export default function WhatsAppFab() {
  const { t, lang } = useLang();
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) return null;

  const msg =
    lang === 'hi'
      ? 'नमस्ते! मुझे फर्नीचर बनवाना है, जानकारी चाहिए।'
      : 'Hello! I want to get furniture made. Please share details.';

  return (
    <a
      href={waLink(msg)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp')}
      className="no-print fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-[#1eb355] active:translate-y-px"
    >
      <Icon name="whatsapp" className="h-6 w-6" />
      <span className="hidden text-sm sm:inline">{t('whatsapp')}</span>
    </a>
  );
}
