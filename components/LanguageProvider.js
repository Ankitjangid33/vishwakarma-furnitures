'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { DEFAULT_LANG, LANGS, t as translate, pick as pickLang } from '@/lib/i18n';

const LanguageContext = createContext(null);

/**
 * Website ke liye default Hindi hai, admin panel ke liye English —
 * isliye `defaultLang`, `storageKey` aur `dict` props se badla ja sakta hai.
 * Dono ki chuni hui bhasha alag-alag yaad rehti hai.
 */
export function LanguageProvider({
  children,
  defaultLang = DEFAULT_LANG,
  storageKey = 'vf_lang',
  dict = null,
  followBrowser = true
}) {
  const [lang, setLangState] = useState(defaultLang);
  const [ready, setReady] = useState(false);

  // Pehli baar: pehle se chuni hui bhasha, warna browser ki bhasha
  useEffect(() => {
    let next = defaultLang;
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved && LANGS.includes(saved)) {
        next = saved;
      } else if (followBrowser && typeof navigator !== 'undefined') {
        next = navigator.language?.toLowerCase().startsWith('hi') ? 'hi' : 'en';
      }
    } catch {
      /* private mode me localStorage band ho sakta hai */
    }
    setLangState(next);
    setReady(true);
  }, [defaultLang, storageKey, followBrowser]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback(
    (next) => {
      if (!LANGS.includes(next)) return;
      setLangState(next);
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        /* ignore */
      }
    },
    [storageKey]
  );

  const toggleLang = useCallback(() => {
    setLang(lang === 'hi' ? 'en' : 'hi');
  }, [lang, setLang]);

  const t = useCallback((key) => translate(key, lang, dict), [lang, dict]);
  const pick = useCallback((obj) => pickLang(obj, lang), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, pick, ready, isHi: lang === 'hi' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
