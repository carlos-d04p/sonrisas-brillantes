"use client";

import { useRef, useState, type FormEvent } from "react";
import { servicios } from "@/data/clinica";
import { IconoWhatsApp, iconos } from "@/components/Iconos";
import { fechaLarga, rangoFechas } from "@/lib/horarios";
import { CAMPOS, filtrarEntrada, validarCampo, type Campo, type CitaInput, type Errores } from "@/lib/validacion";
import { enlaceCitaWhatsApp } from "@/lib/whatsapp";
import s from "./AgendarCita.module.css";

const VACIO: CitaInput = { nombre: "", telefono: "", email: "", servicio: "", fecha: "", hora: "" };

type EstadoHorarios = { cargando: boolean; libres: string[]; error: string };

function MsgError({ c, texto }: { c: Campo; texto?: string }) {
  return (
    <small id={`${c}-error`} className="field__error" role={texto ? "alert" : undefined}>
      {texto}
    </small>
  );
}

const HORARIOS_VACIO: EstadoHorarios = { cargando: false, libres: [], error: "" };

export default function AgendarCita() {
  const [datos, setDatos] = useState<CitaInput>(VACIO);
  const [errores, setErrores] = useState<Errores>({});
  const [tocados, setTocados] = useState<Partial<Record<Campo, boolean>>>({});
  const [rango] = useState(rangoFechas);
  const [horarios, setHorarios] = useState<EstadoHorarios>(HORARIOS_VACIO);
  const [enviando, setEnviando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState("");
  const [listo, setListo] = useState<{ cita: CitaInput; url: string } | null>(null);
  const peticion = useRef<AbortController | null>(null);

  // Carga los turnos libres de una fecha y limpia la hora si ya no está disponible.
  async function cargarHorarios(fecha: string) {
    peticion.current?.abort();
    if (!fecha || validarCampo("fecha", fecha)) {
      setHorarios(HORARIOS_VACIO);
      setDatos((d) => ({ ...d, hora: "" }));
      return;
    }
    const ctrl = new AbortController();
    peticion.current = ctrl;
    setHorarios({ cargando: true, libres: [], error: "" });
    try {
      const r = await fetch(`/api/horarios?fecha=${fecha}`, { signal: ctrl.signal });
      const json = await r.json();
      if (!r.ok) throw new Error(json.error ?? "No pudimos cargar los horarios.");
      const libres: string[] = json.libres;
      setHorarios({ cargando: false, libres, error: libres.length ? "" : "No quedan horarios libres ese día. Elige otra fecha." });
      setDatos((d) => (libres.includes(d.hora) ? d : { ...d, hora: "" }));
    } catch (e) {
      if ((e as Error).name !== "AbortError") setHorarios({ cargando: false, libres: [], error: (e as Error).message });
    }
  }

  function cambiar(campo: Campo, valor: string) {
    const limpio = filtrarEntrada(campo, valor);
    setDatos((d) => ({ ...d, [campo]: limpio }));
    if (tocados[campo]) setErrores((e) => ({ ...e, [campo]: validarCampo(campo, limpio) }));
    if (campo === "fecha" || campo === "servicio" || campo === "hora") {
      setTocados((t) => ({ ...t, [campo]: true }));
      setErrores((e) => ({ ...e, [campo]: validarCampo(campo, limpio) }));
    }
    if (campo === "fecha") cargarHorarios(limpio);
  }

  function salir(campo: Campo) {
    setTocados((t) => ({ ...t, [campo]: true }));
    setErrores((e) => ({ ...e, [campo]: validarCampo(campo, datos[campo]) }));
  }

  async function enviar(ev: FormEvent) {
    ev.preventDefault();
    setErrorGeneral("");

    const nuevos: Errores = {};
    for (const c of CAMPOS) {
      const m = validarCampo(c, datos[c]);
      if (m) nuevos[c] = m;
    }
    setErrores(nuevos);
    setTocados(Object.fromEntries(CAMPOS.map((c) => [c, true])));
    const primero = CAMPOS.find((c) => nuevos[c]);
    if (primero) {
      document.getElementById(primero)?.focus();
      return;
    }

    setEnviando(true);
    try {
      const r = await fetch("/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const json = await r.json().catch(() => ({}));
      if (!r.ok) {
        if (json.errores) setErrores((e) => ({ ...e, ...json.errores }));
        setErrorGeneral(json.error ?? "No pudimos registrar tu cita. Intenta de nuevo.");
        // Si alguien tomó el turno, recargar los horarios libres.
        if (r.status === 409) cargarHorarios(datos.fecha);
        return;
      }
      const cita = { ...datos, nombre: datos.nombre.trim().replace(/\s+/g, " "), email: datos.email.trim() };
      const url = enlaceCitaWhatsApp(cita);
      setListo({ cita, url });
      window.open(url, "_blank", "noopener");
    } catch {
      setErrorGeneral("Sin conexión con el servidor. Revisa tu internet e intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  function reiniciar() {
    setDatos(VACIO);
    setErrores({});
    setTocados({});
    setErrorGeneral("");
    setHorarios(HORARIOS_VACIO);
    setListo(null);
  }

  const err = (c: Campo) => (tocados[c] ? errores[c] : "");
  const props = (c: Campo) => ({
    id: c,
    name: c,
    value: datos[c],
    "aria-invalid": err(c) ? true : undefined,
    "aria-describedby": `${c}-error`,
    onBlur: () => salir(c),
  });

  return (
    <section id="agendar" className={`section ${s.section}`}>
      <div className={`container ${s.grid}`}>
        <div className={s.intro}>
          <span className={`tag ${s.tagLight}`}>Agenda tu cita</span>
          <h2>Reserva en menos de un minuto.</h2>
          <p>
            Elige el día y la hora que mejor te acomode. Tu cita queda registrada al instante y te confirmamos por
            WhatsApp.
          </p>
          <ol className={s.steps}>
            <li><span>1</span>Completa tus datos</li>
            <li><span>2</span>Elige fecha y hora disponibles</li>
            <li><span>3</span>Envía el mensaje de WhatsApp y listo</li>
          </ol>
        </div>

        <div className={s.card}>
          {listo ? (
            <div className={s.success}>
              <div className={s.successIcon}><iconos.check /></div>
              <h3>¡Cita registrada!</h3>
              <p>
                Gracias, {listo.cita.nombre.split(" ")[0]}. Reservamos el <strong>{fechaLarga(listo.cita.fecha)}</strong> a las{" "}
                <strong>{listo.cita.hora}</strong>. Abrimos WhatsApp con tus datos: presiona <em>Enviar</em> y te
                confirmaremos la cita.
              </p>
              <div className={s.successActions}>
                <a href={listo.url} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  <IconoWhatsApp className={s.waIcon} /> Abrir WhatsApp
                </a>
                <button type="button" className="btn btn--ghost" onClick={reiniciar}>
                  Agendar otra cita
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={enviar} noValidate>
              <h3 className={s.formTitle}>Tus datos</h3>

              {errorGeneral && <div className="alert alert--error" role="alert">{errorGeneral}</div>}

              <div className="field">
                <label htmlFor="nombre">Nombre completo</label>
                <input {...props("nombre")} type="text" autoComplete="name" maxLength={60} placeholder="Ej. María López"
                  onChange={(e) => cambiar("nombre", e.target.value)} />
                <MsgError c="nombre" texto={err("nombre")} />
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="telefono">Celular</label>
                  <input {...props("telefono")} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={9}
                    placeholder="987654321" onChange={(e) => cambiar("telefono", e.target.value)} />
                  <MsgError c="telefono" texto={err("telefono")} />
                </div>
                <div className="field">
                  <label htmlFor="email">Correo</label>
                  <input {...props("email")} type="email" autoComplete="email" maxLength={80} placeholder="tu@correo.com"
                    onChange={(e) => cambiar("email", e.target.value)} />
                  <MsgError c="email" texto={err("email")} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="servicio">Motivo de la consulta</label>
                <select {...props("servicio")} onChange={(e) => cambiar("servicio", e.target.value)}>
                  <option value="" disabled>Selecciona una opción</option>
                  {servicios.map((sv) => <option key={sv} value={sv}>{sv}</option>)}
                </select>
                <MsgError c="servicio" texto={err("servicio")} />
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="fecha">Fecha</label>
                  <input {...props("fecha")} type="date" min={rango.min} max={rango.max} suppressHydrationWarning
                    onChange={(e) => cambiar("fecha", e.target.value)} />
                  <MsgError c="fecha" texto={err("fecha")} />
                </div>
                <div className="field">
                  <label htmlFor="hora">Hora</label>
                  <select {...props("hora")} disabled={!horarios.libres.length}
                    onChange={(e) => cambiar("hora", e.target.value)}>
                    <option value="" disabled>
                      {horarios.cargando ? "Cargando…" : !datos.fecha || validarCampo("fecha", datos.fecha) ? "Elige una fecha" : "--:--"}
                    </option>
                    {horarios.libres.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                  {!err("hora") && horarios.error ? (
                    <small id="hora-error" className="field__error">{horarios.error}</small>
                  ) : <MsgError c="hora" texto={err("hora")} />}
                </div>
              </div>

              <button type="submit" className="btn btn--primary btn--block" disabled={enviando}>
                <IconoWhatsApp className={s.waIcon} />
                {enviando ? "Registrando tu cita…" : "Agendar por WhatsApp"}
              </button>
              <p className={s.legal}>Tus datos solo se usan para gestionar tu cita.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
