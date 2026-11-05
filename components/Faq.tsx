import { preguntas } from "@/data/clinica";
import s from "./Faq.module.css";

export default function Faq() {
  return (
    <section id="preguntas" className="section section--sand">
      <div className={`container ${s.wrap}`}>
        <div className="section-head">
          <span className="tag">Preguntas frecuentes</span>
          <h2>Resolvemos tus dudas.</h2>
        </div>

        <div className={s.list}>
          {preguntas.map((p, i) => (
            <details key={p.pregunta} className={s.item} open={i === 0}>
              <summary className={s.q}>
                {p.pregunta}
                <span className={s.plus} aria-hidden />
              </summary>
              <p className={s.a}>{p.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
