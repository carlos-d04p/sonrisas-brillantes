import { equipo } from "@/data/clinica";
import s from "./Equipo.module.css";

function iniciales(nombre: string) {
  return nombre
    .replace(/^(Dra?\.)\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

export default function Equipo() {
  return (
    <section id="equipo" className="section">
      <div className="container">
        <div className="section-head">
          <span className="tag">Nuestro equipo</span>
          <h2>Especialistas que te acompañan en cada paso.</h2>
          <p>Odontólogos colegiados, en constante capacitación y con vocación de servicio.</p>
        </div>

        <div className="grid-3">
          {equipo.map((p) => (
            <article key={p.nombre} className={`card ${s.card}`}>
              <div className={s.avatar} aria-hidden>
                {iniciales(p.nombre)}
              </div>
              <h3>{p.nombre}</h3>
              <p className={s.cargo}>{p.cargo}</p>
              <p>{p.descripcion}</p>
              <span className={s.cop}>{p.cop}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
