// Íconos SVG simples (trazo), heredan el color del texto.
type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function IconoDiente({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M16 6c-2.4-2-6.5-2.6-8.6 0-2.2 2.7-1.4 6.6-.3 9.6.9 2.5 1.2 5.2 1.7 7.8.4 2 1.1 3.6 2.4 3.6 1.6 0 1.9-2.4 2.3-4.6.3-1.8.9-3.4 2.5-3.4s2.2 1.6 2.5 3.4c.4 2.2.7 4.6 2.3 4.6 1.3 0 2-1.6 2.4-3.6.5-2.6.8-5.3 1.7-7.8 1.1-3 1.9-6.9-.3-9.6C22.5 3.4 18.4 4 16 6z"
      />
    </svg>
  );
}

export function IconoWhatsApp({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"
      />
    </svg>
  );
}

export const iconos = {
  corazon: (p: P) => (
    <svg {...base} className={p.className}><path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.3 6c-2.3 4.6-9.3 9-9.3 9z" /></svg>
  ),
  escudo: (p: P) => (
    <svg {...base} className={p.className}><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
  ),
  lista: (p: P) => (
    <svg {...base} className={p.className}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
  ),
  limpieza: (p: P) => (
    <svg {...base} className={p.className}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" /></svg>
  ),
  blanqueamiento: (p: P) => (
    <svg {...base} className={p.className}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 17l.7 1.8 1.8.7-1.8.7L19 22l-.7-1.8-1.8-.7 1.8-.7z" /></svg>
  ),
  ortodoncia: (p: P) => (
    <svg {...base} className={p.className}><rect x="3" y="8" width="5" height="8" rx="1.5" /><rect x="9.5" y="8" width="5" height="8" rx="1.5" /><rect x="16" y="8" width="5" height="8" rx="1.5" /><path d="M2 12h20" /></svg>
  ),
  implantes: (p: P) => (
    <svg {...base} className={p.className}><path d="M7 4h10c0 3-2 4-5 4S7 7 7 4z" /><path d="M9 11h6M9.5 14h5M10 17h4M11 20h2" /></svg>
  ),
  endodoncia: (p: P) => (
    <svg {...base} className={p.className}><path d="M12 5.5c-1.8-1.5-4.8-1.9-6.4 0-1.6 2-1 4.9-.2 7.1.7 1.9.9 3.9 1.3 5.8.3 1.5.8 2.6 1.8 2.6 1.2 0 1.4-1.8 1.7-3.4.3-1.3.7-2.5 1.8-2.5s1.5 1.2 1.8 2.5c.3 1.6.5 3.4 1.7 3.4 1 0 1.5-1.1 1.8-2.6.4-1.9.6-3.9 1.3-5.8.8-2.2 1.4-5.1-.2-7.1-1.6-1.9-4.6-1.5-6.4 0z" /><path d="M12 9v5" /></svg>
  ),
  ninos: (p: P) => (
    <svg {...base} className={p.className}><circle cx="12" cy="12" r="9" /><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0" /><path d="M9 9.5h.01M15 9.5h.01" /></svg>
  ),
  ubicacion: (p: P) => (
    <svg {...base} className={p.className}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
  ),
  reloj: (p: P) => (
    <svg {...base} className={p.className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  telefono: (p: P) => (
    <svg {...base} className={p.className}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
  ),
  correo: (p: P) => (
    <svg {...base} className={p.className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
  ),
  check: (p: P) => (
    <svg {...base} className={p.className} strokeWidth={2.4}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
  ),
  menu: (p: P) => (
    <svg {...base} className={p.className}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  ),
  cerrar: (p: P) => (
    <svg {...base} className={p.className}><path d="M6 6l12 12M18 6L6 18" /></svg>
  ),
};

export type NombreIcono = keyof typeof iconos;

export function Icono({ nombre, className }: { nombre: NombreIcono; className?: string }) {
  const C = iconos[nombre];
  return <C className={className} />;
}
