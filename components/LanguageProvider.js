'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { DEFAULT_LANG, LANGS, t as translate, pick as pickLang } from '@/lib/i18n';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'vf_lang';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);
  const [ready, setReady] = useState(false);

  // Pehli baar: pehle se chuni hui bhasha, warna browser ki bhasha
  useEffect(() => {
    let next = DEFAULT_LANG;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && LANGS.includes(saved)) {
        next = saved;
      } else if (typeof navigator !== 'undefined') {
        next = navigator.language?.toLowerCase().startsWith('hi') ? 'hi' : 'en';
      }
    } catch {
      /* private mode me localStorage band ho sakta hai */
    }
    setLangState(next);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'hi' ? 'en' : 'hi');
  }, [lang, setLang]);

  const t = useCallback((key) => translate(key, lang), [lang]);
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
