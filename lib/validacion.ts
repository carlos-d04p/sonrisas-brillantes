// Validación compartida por el formulario (navegador) y la API (servidor).
import { servicios } from "@/data/clinica";
import { DIAS_MAXIMOS, TURNOS, esDomingo, esFechaValida, rangoFechas } from "@/lib/horarios";

export type CitaInput = {
  nombre: string;
  telefono: string;
  email: string;
  servicio: string;
  fecha: string;
  hora: string;
};

export type Campo = keyof CitaInput;
export type Errores = Partial<Record<Campo, string>>;

export const CARACTERES_NOMBRE = /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]/g;
const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]+$/;

/** Limpia lo que el usuario escribe, mientras escribe. */
export function filtrarEntrada(campo: Campo, valor: string) {
  if (campo === "telefono") return valor.replace(/\D/g, "").slice(0, 9);
  if (campo === "nombre") return valor.replace(CARACTERES_NOMBRE, "").replace(/\s{2,}/g, " ").slice(0, 60);
  if (campo === "email") return valor.slice(0, 80);
  return valor;
}

export function validarCampo(campo: Campo, valor: string): string {
  const v = (valor ?? "").trim();
  switch (campo) {
    case "nombre":
      if (!v) return "Ingresa tu nombre.";
      if (!SOLO_LETRAS.test(v)) return "Usa solo letras, sin números ni símbolos.";
      if (v.split(/\s+/).length < 2) return "Escribe tu nombre y apellido.";
      if (v.length < 5) return "El nombre es demasiado corto.";
      if (v.length > 60) return "El nombre es demasiado largo.";
      return "";
    case "telefono":
      if (!v) return "Ingresa tu celular.";
      if (!/^\d+$/.test(v)) return "Usa solo números.";
      if (v[0] !== "9") return "El celular debe empezar con 9.";
      if (v.length < 9) {
        const faltan = 9 - v.length;
        return `Debe tener 9 dígitos (falta${faltan > 1 ? "n" : ""} ${faltan}).`;
      }
      if (v.length > 9) return "Debe tener exactamente 9 dígitos.";
      return "";
    case "email":
      if (!v) return "Ingresa tu correo.";
      if (v.length > 80) return "El correo es demasiado largo.";
      return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(v) ? "" : "Ingresa un correo válido (ej. nombre@correo.com).";
    case "servicio":
      if (!v) return "Selecciona un motivo.";
      return (servicios as readonly string[]).includes(v) ? "" : "Selecciona un motivo de la lista.";
    case "fecha": {
      if (!v) return "Elige una fecha.";
      if (!esFechaValida(v)) return "La fecha no es válida.";
      const { min, max } = rangoFechas();
      if (v < min) return "Elige una fecha a partir de mañana.";
      if (v > max) return `Solo agendamos hasta ${DIAS_MAXIMOS} días adelante.`;
      if (esDomingo(v)) return "Los domingos no atendemos. Elige otro día.";
      return "";
    }
    case "hora":
      if (!v) return "Elige una hora.";
      return TURNOS.includes(v) ? "" : "Elige una hora de la lista.";
  }
}

export const CAMPOS: Campo[] = ["nombre", "telefono", "email", "servicio", "fecha", "hora"];

export function validarCita(data: Partial<Record<Campo, unknown>>): { ok: true; cita: CitaInput } | { ok: false; errores: Errores } {
  const errores: Errores = {};
  const cita = {} as CitaInput;
  for (const campo of CAMPOS) {
    const valor = typeof data[campo] === "string" ? (data[campo] as string).trim() : "";
    const msg = validarCampo(campo, valor);
    if (msg) errores[campo] = msg;
    cita[campo] = campo === "nombre" ? valor.replace(/\s+/g, " ") : valor;
  }
  return Object.keys(errores).length ? { ok: false, errores } : { ok: true, cita };
}
