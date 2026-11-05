import { clinica } from "@/data/clinica";
import { IconoDiente } from "@/components/Iconos";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.grid}`}>
        <div>
          <div className={s.logo}>
            <IconoDiente className={s.icon} />
            {clinica.nombre}
          </div>
          <p className={s.text}>Clínica dental. Cuidamos tu sonrisa con calma, ciencia y cariño.</p>
        </div>

        <nav className={s.col} aria-label="Secciones">
          <h3>Secciones</h3>
          <a href="#nosotros">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#equipo">Equipo</a>
          <a href="#preguntas">Preguntas</a>
        </nav>

        <div className={s.col}>
          <h3>Contacto</h3>
          <span>{clinica.direccion}</span>
          <a href={`tel:+51${clinica.telefonoVisible.replace(/\s/g, "")}`}>{clinica.telefonoVisible}</a>
          <a href={`mailto:${clinica.email}`}>{clinica.email}</a>
        </div>

        <div className={s.col}>
          <h3>Síguenos</h3>
          <a href={clinica.redes.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={clinica.redes.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

      <div className={`container ${s.bottom}`}>
        <span>© {new Date().getFullYear()} {clinica.nombre}. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}
