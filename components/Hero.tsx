import { iconos } from "@/components/Iconos";
import s from "./Hero.module.css";

const cifras = [
  { valor: "12+", texto: "años de experiencia" },
  { valor: "3 500+", texto: "pacientes atendidos" },
  { valor: "4.9", texto: "valoración en Google" },
];

const ventajas = ["Primera evaluación sin costo", "Confirmación en menos de 24 horas", "Lunes a sábado, 9:00 a 19:00"];

export default function Hero() {
  return (
    <section id="inicio" className={s.hero}>
      <div className={`container ${s.grid}`}>
        <div>
          <span className="tag">Clínica dental</span>
          <h1 className={s.title}>
            Tu sonrisa merece <em>tiempo</em> y cuidado.
          </h1>
          <p className={s.lead}>
            Atención dental cercana, sin prisas y con profesionales que te escuchan. Agenda tu cita en minutos y nosotros
            nos encargamos del resto.
          </p>

          <div className={s.ctas}>
            <a href="#agendar" className="btn btn--primary">
              Agendar mi cita
            </a>
            <a href="#servicios" className="btn btn--ghost">
              Ver servicios
            </a>
          </div>

          <ul className={s.perks}>
            {ventajas.map((v) => (
              <li key={v}>
                <span className={s.check}>
                  <iconos.check />
                </span>
                {v}
              </li>
            ))}
          </ul>
        </div>

        <div className={s.visual} aria-hidden>
          <div className={s.blob} />
          <div className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.dot} />
              Primera visita
            </div>
            <p className={s.panelDay}>Evaluación gratis</p>
            <p className={s.panelText}>Revisión completa y presupuesto claro, sin compromiso.</p>
          </div>
          <dl className={s.stats}>
            {cifras.map((c) => (
              <div key={c.texto} className={s.stat}>
                <dt>{c.texto}</dt>
                <dd>{c.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
