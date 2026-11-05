// Reglas de fechas y turnos. Se usan en el navegador y en el servidor.
// Todas las fechas se manejan como texto "AAAA-MM-DD" en hora de Lima (UTC-5, sin horario de verano).

export const DIAS_MAXIMOS = 60;
const OFFSET_LIMA_MS = -5 * 60 * 60 * 1000;

/** Turnos de atención: de 9:00 a 18:30 cada 30 minutos, de lunes a sábado. */
export const TURNOS: string[] = (() => {
  const lista: string[] = [];
  for (let h = 9; h < 19; h++) {
    for (const m of ["00", "30"]) lista.push(`${String(h).padStart(2, "0")}:${m}`);
  }
  return lista;
})();

/** Fecha de hoy en Lima, desplazada `dias` días. */
export function fechaLima(dias = 0): string {
  const d = new Date(Date.now() + OFFSET_LIMA_MS + dias * 86_400_000);
  return d.toISOString().slice(0, 10);
}

export function rangoFechas() {
  return { min: fechaLima(1), max: fechaLima(DIAS_MAXIMOS) };
}

function aFecha(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function esFechaValida(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const d = aFecha(iso);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === iso;
}

export function esDomingo(iso: string) {
  return aFecha(iso).getUTCDay() === 0;
}

export function fechaLarga(iso: string) {
  return aFecha(iso).toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}
