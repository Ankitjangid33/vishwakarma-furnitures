'use client';

import { LanguageProvider } from '../LanguageProvider';
import { DialogProvider } from '../DialogProvider';
import { ADMIN_DICT, ADMIN_DEFAULT_LANG, ADMIN_LANG_KEY } from '@/lib/i18n-admin';

/**
 * Admin panel ki apni bhasha — default English, aur uski pasand
 * website wali pasand se alag yaad rehti hai (alag localStorage key).
 *
 * followBrowser band hai taaki Hindi browser wale ko bhi English hi mile.
 *
 * Dictionary yahin (client par) import hoti hai — agar ise server se
 * prop me bhejte to har request me poori dictionary HTML me chipak jaati.
 */
export default function AdminLangProvider({ children }) {
  return (
    <LanguageProvider
      defaultLang={ADMIN_DEFAULT_LANG}
      storageKey={ADMIN_LANG_KEY}
      dict={ADMIN_DICT}
      followBrowser={false}
    >
      <DialogProvider>{children}</DialogProvider>
    </LanguageProvider>
  );
}
