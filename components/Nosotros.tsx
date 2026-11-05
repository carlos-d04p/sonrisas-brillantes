import { clinica } from "@/data/clinica";
import { Icono, type NombreIcono } from "@/components/Iconos";

const valores: { icono: NombreIcono; titulo: string; texto: string }[] = [
  { icono: "corazon", titulo: "Trato cercano", texto: "Te escuchamos y resolvemos tus dudas antes de cualquier tratamiento." },
  { icono: "escudo", titulo: "Bioseguridad", texto: "Instrumental esterilizado y protocolos estrictos en cada atención." },
  { icono: "lista", titulo: "Precios claros", texto: "Presupuesto detallado desde la primera cita, sin cobros sorpresa." },
];

export default function Nosotros() {
  return (
    <section id="nosotros" className="section">
      <div className="container">
        <div className="section-head">
          <span className="tag">Quiénes somos</span>
          <h2>Cuidamos sonrisas con calma, ciencia y cariño.</h2>
          <p>
            En {clinica.nombre} somos un equipo de odontólogos que cree que ir al dentista no tiene por qué dar miedo. Te
            explicamos cada paso, te damos un presupuesto claro desde el inicio y usamos tecnología actual para que tus
            tratamientos sean cómodos y duraderos.
          </p>
        </div>

        <div className="grid-3">
          {valores.map((v) => (
            <article key={v.titulo} className="card" style={{ background: "var(--sand)" }}>
              <span className="icon-box">
                <Icono nombre={v.icono} />
              </span>
              <h3>{v.titulo}</h3>
              <p>{v.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
