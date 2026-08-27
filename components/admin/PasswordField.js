'use client';

import { useId, useState } from 'react';
import Icon from '../Icons';
import { useLang } from '../LanguageProvider';

/**
 * Password input jisme aankh (eye) ka button hota hai —
 * dabane par password dikh jata hai, dobara dabane par chhup jata hai.
 *
 * Baaki saare props seedha <input> par chale jaate hain,
 * to ise normal input ki tarah hi use kar sakte hain.
 */
export default function PasswordField({ id, label, hint, className = '', ...props }) {
  const { t } = useLang();
  const autoId = useId();
  const inputId = id || autoId;
  const [show, setShow] = useState(false);

  return (
    <div className={className}>
      {label && (
        <label className="label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...props}
          id={inputId}
          type={show ? 'text' : 'password'}
          className="field pr-11"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          // tab dabate waqt password se seedha submit par jaana chahiye
          tabIndex={-1}
          aria-label={show ? t('hidePassword') : t('showPassword')}
          aria-pressed={show}
          title={show ? t('hidePassword') : t('showPassword')}
          className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-xl text-muted transition hover:text-wood-700"
        >
          <Icon name={show ? 'eyeOff' : 'eye'} className="h-5 w-5" />
        </button>
      </div>

      {hint && <p className="mt-1 text-[11px] text-muted">{hint}</p>}
    </div>
  );
}
