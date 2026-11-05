import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { actualizarEstado, cerrarSesion, sesionActiva } from "./acciones";
import { listarCitas, ESTADOS, usandoMemoria, type Estado } from "@/lib/db";
import { fechaLarga, fechaLima } from "@/lib/horarios";
import { enlacePacienteWhatsApp } from "@/lib/whatsapp";
import { clinica } from "@/data/clinica";
import { IconoDiente, IconoWhatsApp } from "@/components/Iconos";
import s from "./admin.module.css";

export const metadata: Metadata = { title: `Citas | ${clinica.nombre}`, robots: { index: false } };
export const dynamic = "force-dynamic";

const ETIQUETA: Record<Estado, string> = { pendiente: "Pendiente", confirmada: "Confirmada", cancelada: "Cancelada" };

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  if (!(await sesionActiva())) redirect("/admin/login");

  const sp = await searchParams;
  const estado = ESTADOS.includes(sp.estado as Estado) ? (sp.estado as Estado) : undefined;
  const todas = sp.ver === "todas";
  const desde = todas ? undefined : fechaLima(0);

  let citas: Awaited<ReturnType<typeof listarCitas>> = [];
  let error = "";
  try {
    citas = await listarCitas({ estado, desde });
  } catch (e) {
    console.error(e);
    error = "No se pudo conectar con la base de datos. Revisa DATABASE_URL.";
  }

  const conteo = (e: Estado) => citas.filter((c) => c.estado === e).length;
  const filtro = (params: Record<string, string | undefined>) => {
    const q = new URLSearchParams();
    const base = { estado, ver: todas ? "todas" : undefined, ...params };
    for (const [k, v] of Object.entries(base)) if (v) q.set(k, v);
    const str = q.toString();
    return str ? `/admin?${str}` : "/admin";
  };

  return (
    <div className={s.page}>
      <header className={s.top}>
        <div className={`container ${s.topInner}`}>
          <div className={s.brand}>
            <IconoDiente className={s.brandIcon} />
            {clinica.nombre} <span className={s.badge}>Admin</span>
          </div>
          <form action={cerrarSesion}>
            <button type="submit" className="btn btn--ghost btn--sm">Cerrar sesión</button>
          </form>
        </div>
      </header>

      <main className="container">
        <div className={s.head}>
          <h1>Citas {todas ? "(todas)" : "próximas"}</h1>
          <a className={s.toggleLink} href={filtro({ ver: todas ? undefined : "todas" })}>
            {todas ? "Ver solo próximas" : "Ver también pasadas"}
          </a>
        </div>

        {usandoMemoria && (
          <div className="alert alert--info">
            Modo de prueba: no hay DATABASE_URL, las citas se guardan en memoria y se pierden al reiniciar el servidor.
          </div>
        )}
        {error && <div className="alert alert--error">{error}</div>}

        <nav className={s.filters} aria-label="Filtrar por estado">
          <a href={filtro({ estado: undefined })} className={!estado ? s.filterOn : s.filter}>Todas</a>
          {ESTADOS.map((e) => (
            <a key={e} href={filtro({ estado: e })} className={estado === e ? s.filterOn : s.filter}>
              {ETIQUETA[e]}{!estado && ` · ${conteo(e)}`}
            </a>
          ))}
        </nav>

        {citas.length === 0 && !error ? (
          <p className={s.empty}>No hay citas para mostrar.</p>
        ) : (
          <div className={s.list}>
            {citas.map((c) => {
              const msg =
                c.estado === "cancelada"
                  ? `Hola ${c.nombre.split(" ")[0]}, te escribimos de ${clinica.nombre} sobre tu cita del ${fechaLarga(c.fecha)} a las ${c.hora}.`
                  : `Hola ${c.nombre.split(" ")[0]} 👋 Te escribimos de ${clinica.nombre} para confirmar tu cita del ${fechaLarga(c.fecha)} a las ${c.hora} (${c.servicio}). ¡Te esperamos!`;
              return (
                <article key={c.id} className={s.row} data-estado={c.estado}>
                  <div className={s.when}>
                    <span className={s.date}>{fechaLarga(c.fecha)}</span>
                    <span className={s.time}>{c.hora}</span>
                  </div>
                  <div className={s.who}>
                    <strong>{c.nombre}</strong>
                    <span>{c.servicio}</span>
                    <span className={s.contact}>
                      <a href={`tel:+51${c.telefono}`}>{c.telefono}</a> · <a href={`mailto:${c.email}`}>{c.email}</a>
                    </span>
                  </div>
                  <span className={`${s.status} ${s[c.estado]}`}>{ETIQUETA[c.estado]}</span>
                  <div className={s.actions}>
                    <a href={enlacePacienteWhatsApp(c.telefono, msg)} target="_blank" rel="noopener noreferrer"
                      className={`btn btn--sm ${s.wa}`} title="Escribir por WhatsApp">
                      <IconoWhatsApp className={s.waIcon} /> WhatsApp
                    </a>
                    {c.estado !== "confirmada" && (
                      <form action={actualizarEstado}>
                        <input type="hidden" name="id" value={c.id} />
                        <input type="hidden" name="estado" value="confirmada" />
                        <button className="btn btn--primary btn--sm">Confirmar</button>
                      </form>
                    )}
                    {c.estado !== "cancelada" && (
                      <form action={actualizarEstado}>
                        <input type="hidden" name="id" value={c.id} />
                        <input type="hidden" name="estado" value="cancelada" />
                        <button className="btn btn--ghost btn--sm">Cancelar</button>
                      </form>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
