'use client';

import { useLang } from './LanguageProvider';

/** हिंदी | English toggle */
export default function LanguageSwitch({ size = 'md' }) {
  const { lang, setLang } = useLang();

  const pad = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <div
      className="inline-flex items-center rounded-full border border-wood-200 bg-white p-0.5"
      role="group"
      aria-label="Language / भाषा"
    >
      <button
        type="button"
        onClick={() => setLang('hi')}
        aria-pressed={lang === 'hi'}
        className={`${pad} rounded-full font-semibold transition ${
          lang === 'hi' ? 'bg-wood-600 text-white' : 'text-wood-700 hover:bg-wood-50'
        }`}
      >
        हिंदी
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`${pad} rounded-full font-semibold transition ${
          lang === 'en' ? 'bg-wood-600 text-white' : 'text-wood-700 hover:bg-wood-50'
        }`}
      >
        English
      </button>
    </div>
  );
}
