'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Icon from '../Icons';

/**
 * Photo upload — browser se seedha Cloudinary par jaati hai.
 * Server sirf signature deta hai, isse badi photos bhi aaram se chadhti hain.
 */
export default function ImageUploader({ images = [], onChange, max = 6, label = 'फोटो / Photos' }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');

  const uploadOne = async (file) => {
    const sigRes = await fetch('/api/upload', { method: 'POST' });
    if (!sigRes.ok) {
      const d = await sigRes.json().catch(() => ({}));
      throw new Error(
        d.error === 'CLOUDINARY_NOT_CONFIGURED'
          ? 'Cloudinary set nahi hai — .env.local me CLOUDINARY_* values daalein'
          : 'Upload signature nahi mila'
      );
    }

    const { signature, timestamp, apiKey, cloudName, folder } = await sigRes.json();

    const form = new FormData();
    form.append('file', file);
    form.append('api_key', apiKey);
    form.append('timestamp', timestamp);
    form.append('signature', signature);
    form.append('folder', folder);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: form
    });

    if (!res.ok) throw new Error('Cloudinary upload fail hua');

    const data = await res.json();
    return { url: data.secure_url, publicId: data.public_id, alt: '' };
  };

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setError('');
    setBusy(true);

    const room = max - images.length;
    const picked = files.slice(0, Math.max(0, room));
    const uploaded = [];

    try {
      for (const [i, file] of picked.entries()) {
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`${file.name} — 10MB se badi photo nahi chalegi`);
        }
        setProgress(`${i + 1} / ${picked.length}`);
        uploaded.push(await uploadOne(file));
      }
      onChange([...images, ...uploaded]);
    } catch (err) {
      setError(err.message);
      if (uploaded.length) onChange([...images, ...uploaded]);
    } finally {
      setBusy(false);
      setProgress('');
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const remove = async (idx) => {
    const img = images[idx];
    onChange(images.filter((_, i) => i !== idx));

    if (img?.publicId) {
      fetch(`/api/upload?publicId=${encodeURIComponent(img.publicId)}`, { method: 'DELETE' }).catch(
        () => {}
      );
    }
  };

  return (
    <div>
      <span className="label">
        {label} <span className="font-normal text-muted">({images.length}/{max})</span>
      </span>

      <div className="mt-2 flex flex-wrap gap-3">
        {images.map((img, i) => (
          <div key={img.publicId || img.url || i} className="group relative h-24 w-28 overflow-hidden rounded-xl border border-wood-200">
            <Image src={img.url} alt="" fill sizes="120px" className="object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Remove"
              className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
            {i === 0 && (
              <span className="absolute bottom-0 left-0 right-0 bg-black/60 py-0.5 text-center text-[10px] text-white">
                मुख्य फोटो
              </span>
            )}
          </div>
        ))}

        {images.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="grid h-24 w-28 place-items-center rounded-xl border-2 border-dashed border-wood-300 text-wood-500 transition hover:border-wood-500 hover:bg-wood-50 disabled:opacity-50"
          >
            <span className="text-center">
              <Icon name="upload" className="mx-auto h-6 w-6" />
              <span className="mt-1 block text-[11px] font-semibold">
                {busy ? progress || '...' : 'फोटो जोड़ें'}
              </span>
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={max > 1}
        onChange={handleFiles}
        className="hidden"
      />

      {error && <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}
