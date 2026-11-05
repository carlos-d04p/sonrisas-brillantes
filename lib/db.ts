import "server-only";
import { neon } from "@neondatabase/serverless";
import type { CitaInput } from "@/lib/validacion";

export type Estado = "pendiente" | "confirmada" | "cancelada";
export const ESTADOS: Estado[] = ["pendiente", "confirmada", "cancelada"];

export type Cita = CitaInput & {
  id: number;
  estado: Estado;
  creada_en: string;
};

export class TurnoOcupadoError extends Error {
  constructor() {
    super("Turno ocupado");
  }
}

export class SinBaseDeDatosError extends Error {
  constructor() {
    super("DATABASE_URL no está configurada");
  }
}

const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
const sql = url ? neon(url) : null;

// Sin base de datos configurada, en desarrollo se usa una lista en memoria
// para poder probar la página. En producción es obligatorio DATABASE_URL.
const usarMemoria = !sql && process.env.NODE_ENV !== "production";
const g = globalThis as unknown as { __citasMemoria?: Cita[] };
const memoria = (g.__citasMemoria ??= []);

function db() {
  if (!sql) throw new SinBaseDeDatosError();
  return sql;
}

type Fila = Omit<Cita, "fecha" | "creada_en"> & { fecha: string | Date; creada_en: string | Date };

function normalizar(f: Fila): Cita {
  const fecha = f.fecha instanceof Date ? f.fecha.toISOString().slice(0, 10) : String(f.fecha).slice(0, 10);
  const creada = f.creada_en instanceof Date ? f.creada_en.toISOString() : String(f.creada_en);
  return { ...f, fecha, creada_en: creada };
}

export async function turnosOcupados(fecha: string): Promise<string[]> {
  if (usarMemoria) return memoria.filter((c) => c.fecha === fecha && c.estado !== "cancelada").map((c) => c.hora);
  const filas = (await db()`SELECT hora FROM citas WHERE fecha = ${fecha} AND estado <> 'cancelada'`) as { hora: string }[];
  return filas.map((f) => f.hora);
}

export async function crearCita(cita: CitaInput): Promise<Cita> {
  if (usarMemoria) {
    if (memoria.some((c) => c.fecha === cita.fecha && c.hora === cita.hora && c.estado !== "cancelada")) {
      throw new TurnoOcupadoError();
    }
    const nueva: Cita = { ...cita, id: memoria.length + 1, estado: "pendiente", creada_en: new Date().toISOString() };
    memoria.push(nueva);
    return nueva;
  }
  try {
    const filas = (await db()`
      INSERT INTO citas (nombre, telefono, email, servicio, fecha, hora)
      VALUES (${cita.nombre}, ${cita.telefono}, ${cita.email}, ${cita.servicio}, ${cita.fecha}, ${cita.hora})
      RETURNING *`) as Fila[];
    return normalizar(filas[0]);
  } catch (e) {
    if ((e as { code?: string }).code === "23505") throw new TurnoOcupadoError();
    throw e;
  }
}

export async function listarCitas(filtro: { estado?: Estado; desde?: string }): Promise<Cita[]> {
  if (usarMemoria) {
    return memoria
      .filter((c) => (!filtro.estado || c.estado === filtro.estado) && (!filtro.desde || c.fecha >= filtro.desde))
      .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
  }
  const filas = (await db()`
    SELECT * FROM citas
    WHERE (${filtro.estado ?? null}::text IS NULL OR estado = ${filtro.estado ?? null})
      AND (${filtro.desde ?? null}::date IS NULL OR fecha >= ${filtro.desde ?? null}::date)
    ORDER BY fecha, hora
    LIMIT 500`) as Fila[];
  return filas.map(normalizar);
}

export async function cambiarEstado(id: number, estado: Estado) {
  if (usarMemoria) {
    const c = memoria.find((x) => x.id === id);
    if (!c) return;
    if (estado !== "cancelada" && memoria.some((x) => x !== c && x.fecha === c.fecha && x.hora === c.hora && x.estado !== "cancelada")) {
      throw new TurnoOcupadoError();
    }
    c.estado = estado;
    return;
  }
  try {
    await db()`UPDATE citas SET estado = ${estado} WHERE id = ${id}`;
  } catch (e) {
    if ((e as { code?: string }).code === "23505") throw new TurnoOcupadoError();
    throw e;
  }
}

export const usandoMemoria = usarMemoria;
