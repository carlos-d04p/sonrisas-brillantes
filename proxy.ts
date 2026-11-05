import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ADMIN, tokenValido } from "@/lib/sesion";

// Revisión rápida: sin sesión válida, /admin redirige al login.
// La página y las acciones del admin vuelven a verificar la sesión.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const ok = await tokenValido(request.cookies.get(COOKIE_ADMIN)?.value);
  if (!ok) return NextResponse.redirect(new URL("/admin/login", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
