"use client";

import { useEffect, useState } from "react";
import { clinica } from "@/data/clinica";
import { IconoDiente, iconos } from "@/components/Iconos";
import s from "./Header.module.css";

const enlaces = [
  { href: "#nosotros", texto: "Nosotros" },
  { href: "#servicios", texto: "Servicios" },
  { href: "#equipo", texto: "Equipo" },
  { href: "#preguntas", texto: "Preguntas" },
  { href: "#contacto", texto: "Contacto" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const [primera, ...resto] = clinica.nombre.split(" ");

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
      <div className={`container ${s.inner}`}>
        <a href="#inicio" className={s.logo} aria-label={`${clinica.nombre}, inicio`}>
          <IconoDiente className={s.logoIcon} />
          <span>
            {primera} <strong>{resto.join(" ")}</strong>
          </span>
        </a>

        <nav id="menu" className={`${s.nav} ${abierto ? s.navOpen : ""}`} aria-label="Principal">
          {enlaces.map((e) => (
            <a key={e.href} href={e.href} className={s.link} onClick={() => setAbierto(false)}>
              {e.texto}
            </a>
          ))}
        </nav>

        <div className={s.actions}>
          <a href="#agendar" className="btn btn--primary btn--sm">
            Agendar cita
          </a>
          <button
            type="button"
            className={s.toggle}
            aria-expanded={abierto}
            aria-controls="menu"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setAbierto((v) => !v)}
          >
            {abierto ? <iconos.cerrar /> : <iconos.menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
