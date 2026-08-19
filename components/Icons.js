/**
 * Sabhi icons — simple SVG, currentColor use karte hain.
 * <Icon name="bed" className="w-6 h-6" />
 */

const s = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

const PATHS = {
  /* ---- category icons ---- */
  bed: (
    <>
      <path {...s} d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
      <path {...s} d="M3 14h18M3 18v2M21 18v2" />
      <path {...s} d="M7 9V7a1 1 0 0 1 1-1h3v3M13 9V6h3a1 1 0 0 1 1 1v2" />
    </>
  ),
  sofa: (
    <>
      <path {...s} d="M4 12V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
      <path {...s} d="M2 13a2 2 0 0 1 4 0v4h12v-4a2 2 0 0 1 4 0v6H2z" />
      <path {...s} d="M6 12h12" />
    </>
  ),
  kitchen: (
    <>
      <rect {...s} x="3" y="3" width="18" height="18" rx="2" />
      <path {...s} d="M3 10h18M12 3v18" />
      <path {...s} d="M7 6.5h1.5M15.5 6.5H17M7 14h1.5M15.5 14H17" />
    </>
  ),
  desk: (
    <>
      <path {...s} d="M3 8h18M4 8v11M20 8v11" />
      <path {...s} d="M10 8v5h10V8" />
      <path {...s} d="M13 11h2" />
    </>
  ),
  temple: (
    <>
      <path {...s} d="M12 2l4 4H8l4-4z" />
      <path {...s} d="M6 10l6-4 6 4v11H6z" />
      <path {...s} d="M10 21v-5a2 2 0 1 1 4 0v5" />
    </>
  ),
  door: (
    <>
      <path {...s} d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17" />
      <path {...s} d="M3 21h18" />
      <circle cx="15.5" cy="12.5" r="1" fill="currentColor" />
    </>
  ),
  tools: (
    <>
      <path {...s} d="M14.7 6.3a4 4 0 0 0 5.3 5.2l-8 8a2.1 2.1 0 0 1-3-3l8-8z" />
      <path {...s} d="M6 10 3.5 7.5a2 2 0 0 1 0-3l3 3 1.5-1.5-3-3a2 2 0 0 1 3 0L11 6" />
    </>
  ),

  /* ---- ui icons ---- */
  menu: <path {...s} d="M4 7h16M4 12h16M4 17h16" />,
  close: <path {...s} d="M6 6l12 12M18 6L6 18" />,
  cart: (
    <>
      <path {...s} d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
      <circle {...s} cx="10" cy="20" r="1.2" />
      <circle {...s} cx="18" cy="20" r="1.2" />
    </>
  ),
  phone: (
    <path
      {...s}
      d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a1.5 1.5 0 0 1-1.7 1.5A16 16 0 0 1 5 5.7 1.5 1.5 0 0 1 6.5 3z"
    />
  ),
  whatsapp: (
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 0 16 8 8 0 0 1-4.1-1.1l-.3-.2-2.5.7.7-2.4-.2-.3A8 8 0 0 1 12 4zm-3.2 4c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.5.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3l-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.5.1-.3-.1-1.2-.5-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5c-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.1z"
    />
  ),
  mail: (
    <>
      <rect {...s} x="3" y="5" width="18" height="14" rx="2" />
      <path {...s} d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  map: (
    <>
      <path {...s} d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle {...s} cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle {...s} cx="12" cy="12" r="9" />
      <path {...s} d="M12 7v5l3 2" />
    </>
  ),
  chevronRight: <path {...s} d="m9 6 6 6-6 6" />,
  chevronLeft: <path {...s} d="m15 6-6 6 6 6" />,
  chevronDown: <path {...s} d="m6 9 6 6 6-6" />,
  arrowRight: <path {...s} d="M4 12h15m-6-6 6 6-6 6" />,
  star: <path fill="currentColor" d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3z" />,
  check: <path {...s} d="m5 13 4 4L19 7" />,
  checkCircle: (
    <>
      <circle {...s} cx="12" cy="12" r="9" />
      <path {...s} d="m8 12 3 3 5-6" />
    </>
  ),
  trash: (
    <>
      <path {...s} d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
      <path {...s} d="M10 11v6M14 11v6" />
    </>
  ),
  plus: <path {...s} d="M12 5v14M5 12h14" />,
  minus: <path {...s} d="M5 12h14" />,
  search: (
    <>
      <circle {...s} cx="11" cy="11" r="7" />
      <path {...s} d="m20 20-3.5-3.5" />
    </>
  ),
  globe: (
    <>
      <circle {...s} cx="12" cy="12" r="9" />
      <path {...s} d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
    </>
  ),
  image: (
    <>
      <rect {...s} x="3" y="4" width="18" height="16" rx="2" />
      <circle {...s} cx="8.5" cy="9.5" r="1.5" />
      <path {...s} d="m4 17 5-5 4 4 3-2 4 4" />
    </>
  ),
  upload: (
    <>
      <path {...s} d="M12 16V4m-4 4 4-4 4 4" />
      <path {...s} d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </>
  ),
  ruler: (
    <>
      <path {...s} d="M3 14 14 3l7 7L10 21z" />
      <path {...s} d="m7 10 2 2M10 7l2 2M13 12l2 2M16 9l2 2" />
    </>
  ),
  shield: (
    <>
      <path {...s} d="M12 3 5 6v6c0 4.4 3 7.9 7 9 4-1.1 7-4.6 7-9V6l-7-3z" />
      <path {...s} d="m9 12 2 2 4-4" />
    </>
  ),
  truck: (
    <>
      <path {...s} d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
      <circle {...s} cx="7" cy="18" r="1.6" />
      <circle {...s} cx="17.5" cy="18" r="1.6" />
    </>
  ),
  hammer: (
    <>
      <path {...s} d="m14 5 5 5-2 2-5-5z" />
      <path {...s} d="m12 7-8 8a2 2 0 1 0 3 3l8-8" />
    </>
  ),
  box: (
    <>
      <path {...s} d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path {...s} d="M4 7.5 12 12l8-4.5M12 12v9" />
    </>
  ),
  chat: (
    <path {...s} d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z" />
  ),
  user: (
    <>
      <circle {...s} cx="12" cy="8" r="3.5" />
      <path {...s} d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  instagram: (
    <>
      <rect {...s} x="3" y="3" width="18" height="18" rx="5" />
      <circle {...s} cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.5-1.5h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H7.5v3h2.8v8h3.2z"
    />
  ),
  logout: (
    <>
      <path {...s} d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path {...s} d="M16 17l5-5-5-5M21 12H9" />
    </>
  ),
  grid: (
    <>
      <rect {...s} x="3" y="3" width="7" height="7" rx="1.5" />
      <rect {...s} x="14" y="3" width="7" height="7" rx="1.5" />
      <rect {...s} x="3" y="14" width="7" height="7" rx="1.5" />
      <rect {...s} x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  )
};

export default function Icon({ name, className = 'w-5 h-5', ...rest }) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...rest}>
      {path}
    </svg>
  );
}

export function Logo({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="var(--color-wood-700)" />
      <path d="M10 14h6l4 12 4-12h6l-7 20h-6z" fill="var(--color-gold-400)" />
      <path d="M30 14h8v3.5h-8zM30 21h8v3.5h-8zM30 28h8v3.5h-8z" fill="rgba(255,255,255,.75)" />
    </svg>
  );
}
