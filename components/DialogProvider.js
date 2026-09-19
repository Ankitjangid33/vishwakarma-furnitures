'use client';

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import Icon from './Icons';
import { useLang } from './LanguageProvider';

/**
 * Browser ke confirm()/alert() ki jagah apna sundar popup.
 *
 *   const dialog = useDialog();
 *
 *   // haan/na — true ya false milta hai
 *   const ok = await dialog.confirm({ title, message, detail, tone: 'danger' });
 *
 *   // server ka kaam popup ke andar hi — button "Deleting…" dikhata hai,
 *   // gadbad ho to wahin error dikhta hai aur popup khula rehta hai
 *   await dialog.confirm({ title, tone: 'danger', onConfirm: async () => { ...; throw new Error('msg') } });
 *
 *   // sirf jaankari
 *   await dialog.alert({ title, message, tone: 'success' | 'error' | 'info' });
 */

const DialogContext = createContext(null);

const TONES = {
  danger: { icon: 'trash', ring: 'bg-red-50 text-red-600', button: 'bg-red-600 text-white hover:bg-red-700' },
  error: { icon: 'close', ring: 'bg-red-50 text-red-600', button: 'btn-primary' },
  success: { icon: 'checkCircle', ring: 'bg-green-50 text-green-600', button: 'btn-primary' },
  info: { icon: 'chat', ring: 'bg-wood-100 text-wood-700', button: 'btn-primary' }
};

export function DialogProvider({ children }) {
  // ek waqt me ek hi popup; baaki line me intezaar karte hain
  const [queue, setQueue] = useState([]);
  const current = queue[0] || null;

  const open = useCallback(
    (kind, options) =>
      new Promise((resolve) => {
        setQueue((q) => [...q, { ...options, kind, resolve, key: Math.random().toString(36).slice(2) }]);
      }),
    []
  );

  const close = useCallback((value) => {
    setQueue(([first, ...rest]) => {
      first?.resolve(value);
      return rest;
    });
  }, []);

  const [api] = useState(() => ({
    confirm: (options = {}) => open('confirm', options),
    alert: (options = {}) => open('alert', options)
  }));

  return (
    <DialogContext.Provider value={api}>
      {children}
      {current && <Dialog key={current.key} dialog={current} onClose={close} />}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used inside <DialogProvider>');
  return ctx;
}

function Dialog({ dialog, onClose }) {
  const { t } = useLang();
  const panelRef = useRef(null);
  const safeRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const titleId = useId();
  const bodyId = useId();

  const isConfirm = dialog.kind === 'confirm';
  const tone = TONES[dialog.tone] || TONES.info;

  const cancel = useCallback(() => {
    if (busy) return;
    onClose(isConfirm ? false : undefined);
  }, [busy, isConfirm, onClose]);

  const accept = async () => {
    if (!isConfirm) return onClose(undefined);
    if (!dialog.onConfirm) return onClose(true);

    setBusy(true);
    setError('');
    try {
      await dialog.onConfirm();
      onClose(true);
    } catch (err) {
      setError(err?.message || t('dialogFailed'));
      setBusy(false);
    }
  };

  // khulte hi: focus andar, peeche ka page na hile; band hote hi focus wapas
  useEffect(() => {
    const before = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    safeRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      if (before instanceof HTMLElement) before.focus();
    };
  }, []);

  // Esc se band, Tab popup ke andar hi ghoomta rahe
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        cancel();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = [...panelRef.current.querySelectorAll('button:not([disabled])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [cancel]);

  const confirmLabel =
    dialog.confirmLabel || (dialog.tone === 'danger' ? t('dialogDelete') : isConfirm ? t('dialogConfirm') : t('dialogOk'));

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4">
      <div className="dialog-backdrop absolute inset-0 bg-wood-900/50 backdrop-blur-[2px]" onClick={cancel} />

      <div
        ref={panelRef}
        role={isConfirm || dialog.tone === 'error' ? 'alertdialog' : 'dialog'}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={dialog.message || dialog.detail ? bodyId : undefined}
        className="dialog-panel relative w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-[var(--shadow-lift)]"
      >
        <span className={`mx-auto grid h-14 w-14 place-items-center rounded-full ${tone.ring}`}>
          <Icon name={dialog.icon || tone.icon} className="h-7 w-7" />
        </span>

        <h2 id={titleId} className="mt-4 text-xl text-wood-900">
          {dialog.title}
        </h2>

        {(dialog.detail || dialog.message) && (
          <div id={bodyId} className="mt-2 space-y-2">
            {dialog.detail && (
              <p className="break-words rounded-xl bg-wood-50 px-3 py-2 text-sm font-semibold text-wood-800">
                {dialog.detail}
              </p>
            )}
            {dialog.message && <p className="text-sm leading-relaxed text-muted">{dialog.message}</p>}
          </div>
        )}

        {error && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className={`mt-6 grid gap-2 ${isConfirm ? 'grid-cols-2' : ''}`}>
          {isConfirm && (
            <button
              ref={dialog.tone === 'danger' ? safeRef : undefined}
              type="button"
              onClick={cancel}
              disabled={busy}
              className="btn btn-outline w-full disabled:opacity-60"
            >
              {dialog.cancelLabel || t('dialogCancel')}
            </button>
          )}
          <button
            ref={dialog.tone === 'danger' && isConfirm ? undefined : safeRef}
            type="button"
            onClick={accept}
            disabled={busy}
            className={`btn w-full disabled:opacity-70 ${tone.button}`}
          >
            {busy ? t('dialogWorking') : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
