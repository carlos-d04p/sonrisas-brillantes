import { serviciosDestacados } from "@/data/clinica";
import { Icono } from "@/components/Iconos";
import s from "./Servicios.module.css";

export default function Servicios() {
  return (
    <section id="servicios" className="section section--tint">
      <div className="container">
        <div className="section-head">
          <span className="tag">Servicios</span>
          <h2>Todo lo que tu sonrisa necesita, en un solo lugar.</h2>
          <p>Desde una limpieza de rutina hasta tratamientos completos de rehabilitación.</p>
        </div>

        <div className="grid-3">
          {serviciosDestacados.map((sv) => (
            <article key={sv.titulo} className={`card ${s.card}`}>
              <span className="icon-box">
                <Icono nombre={sv.icono} />
              </span>
              <h3>{sv.titulo}</h3>
              <p>{sv.descripcion}</p>
            </article>
          ))}
        </div>

        <p className={s.cta}>
          ¿No sabes qué tratamiento necesitas? <a href="#agendar">Agenda una evaluación gratuita →</a>
        </p>
      </div>
    </section>
  );
}
