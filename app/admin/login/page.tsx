"use client";

import { useActionState } from "react";
import { iniciarSesion } from "../acciones";
import { IconoDiente } from "@/components/Iconos";
import { clinica } from "@/data/clinica";
import s from "../admin.module.css";

export default function LoginPage() {
  const [estado, accion, pendiente] = useActionState(iniciarSesion, undefined);

  return (
    <main className={s.loginWrap}>
      <form action={accion} className={s.loginCard}>
        <div className={s.brand}>
          <IconoDiente className={s.brandIcon} />
          {clinica.nombre}
        </div>
        <h1 className={s.loginTitle}>Panel de citas</h1>
        {estado?.error && <div className="alert alert--error" role="alert">{estado.error}</div>}
        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
        </div>
        <button type="submit" className="btn btn--primary btn--block" disabled={pendiente}>
          {pendiente ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
