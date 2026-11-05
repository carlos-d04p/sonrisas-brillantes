"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { COOKIE_ADMIN, DURACION_SESION_S, crearToken, passwordCorrecta, tokenValido } from "@/lib/sesion";
import { cambiarEstado, ESTADOS, TurnoOcupadoError, type Estado } from "@/lib/db";

export async function sesionActiva() {
  return tokenValido((await cookies()).get(COOKIE_ADMIN)?.value);
}

export async function iniciarSesion(_prev: { error: string } | undefined, form: FormData) {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SECRET) {
    return { error: "Falta configurar ADMIN_PASSWORD y ADMIN_SECRET en las variables de entorno." };
  }
  // Pequeña pausa para frenar intentos por fuerza bruta.
  await new Promise((r) => setTimeout(r, 400));
  if (!(await passwordCorrecta(String(form.get("password") ?? "")))) {
    return { error: "Contraseña incorrecta." };
  }
  (await cookies()).set(COOKIE_ADMIN, await crearToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DURACION_SESION_S,
  });
  redirect("/admin");
}

export async function cerrarSesion() {
  (await cookies()).delete(COOKIE_ADMIN);
  redirect("/admin/login");
}

export async function actualizarEstado(form: FormData) {
  if (!(await sesionActiva())) redirect("/admin/login");
  const id = Number(form.get("id"));
  const estado = String(form.get("estado")) as Estado;
  if (!Number.isInteger(id) || !ESTADOS.includes(estado)) return;
  try {
    await cambiarEstado(id, estado);
  } catch (e) {
    if (!(e instanceof TurnoOcupadoError)) throw e;
  }
  revalidatePath("/admin");
}
