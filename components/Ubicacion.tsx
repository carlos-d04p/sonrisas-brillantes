import { clinica } from "@/data/clinica";
import { iconos, IconoWhatsApp } from "@/components/Iconos";
import { enlaceContactoWhatsApp } from "@/lib/whatsapp";
import s from "./Ubicacion.module.css";

export default function Ubicacion() {
  const mapa = `https://www.google.com/maps?q=${encodeURIComponent(clinica.mapaQuery)}&output=embed`;

  return (
    <section id="contacto" className="section">
      <div className="container">
        <div className="section-head">
          <span className="tag">Ubicación y contacto</span>
          <h2>Te esperamos en nuestra clínica.</h2>
        </div>

        <div className={s.grid}>
          <div className={s.info}>
            <div className={s.row}>
              <span className="icon-box"><iconos.ubicacion /></span>
              <div>
                <h3>Dirección</h3>
                <p>{clinica.direccion}</p>
              </div>
            </div>

            <div className={s.row}>
              <span className="icon-box"><iconos.reloj /></span>
              <div>
                <h3>Horario</h3>
                <ul className={s.horario}>
                  {clinica.horario.map((h) => (
                    <li key={h.dias}>
                      <span>{h.dias}</span>
                      <span>{h.horas}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={s.row}>
              <span className="icon-box"><iconos.telefono /></span>
              <div>
                <h3>Teléfono y correo</h3>
                <p>
                  <a href={`tel:+51${clinica.telefonoVisible.replace(/\s/g, "")}`}>{clinica.telefonoVisible}</a>
                  <br />
                  <a href={`mailto:${clinica.email}`}>{clinica.email}</a>
                </p>
              </div>
            </div>

            <a href={enlaceContactoWhatsApp()} target="_blank" rel="noopener noreferrer" className={`btn ${s.wa}`}>
              <IconoWhatsApp className={s.waIcon} />
              Escríbenos por WhatsApp
            </a>
          </div>

          <div className={s.map}>
            <iframe
              title={`Mapa de ${clinica.nombre}`}
              src={mapa}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
