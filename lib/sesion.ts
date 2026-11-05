// Token de sesión del admin: "<expira>.<firma HMAC>". Usa Web Crypto,
// así funciona tanto en proxy.ts como en el servidor.

export const COOKIE_ADMIN = "sb_admin";
export const DURACION_SESION_S = 8 * 60 * 60; // 8 horas

const encoder = new TextEncoder();

function secreto() {
  const s = process.env.ADMIN_SECRET;
  if (!s || s.length < 16) return null;
  return s;
}

async function firmar(texto: string, clave: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(clave), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const firma = await crypto.subtle.sign("HMAC", key, encoder.encode(texto));
  return Array.from(new Uint8Array(firma), (b) => b.toString(16).padStart(2, "0")).join("");
}

function igualesSeguro(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function crearToken() {
  const clave = secreto();
  if (!clave) throw new Error("ADMIN_SECRET no está configurado (mínimo 16 caracteres).");
  const expira = String(Math.floor(Date.now() / 1000) + DURACION_SESION_S);
  return `${expira}.${await firmar(expira, clave)}`;
}

export async function tokenValido(token: string | undefined) {
  const clave = secreto();
  if (!token || !clave) return false;
  const [expira, firma] = token.split(".");
  if (!expira || !firma || Number(expira) < Date.now() / 1000) return false;
  return igualesSeguro(firma, await firmar(expira, clave));
}

export async function passwordCorrecta(intento: string) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  // Comparamos firmas para no filtrar la longitud ni el contenido por tiempo.
  const clave = secreto() ?? "sin-secreto";
  return igualesSeguro(await firmar(intento, clave), await firmar(real, clave));
}
