'use client';

import { useLang } from './LanguageProvider';

/** Har andar wale page ka upar ka hissa */
export default function PageHeader({ titleKey, subKey, title, sub, children }) {
  const { t } = useLang();

  return (
    <section className="border-b border-wood-100 bg-gradient-to-b from-wood-50 to-cream">
      <div className="container-page py-10 md:py-14">
        <h1 className="section-title">{title || t(titleKey)}</h1>
        {(sub || subKey) && (
          <p className="mt-3 max-w-2xl text-muted">{sub || t(subKey)}</p>
        )}
        {children}
      </div>
    </section>
  );
}
