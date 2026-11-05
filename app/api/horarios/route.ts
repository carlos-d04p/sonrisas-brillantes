import { NextResponse, type NextRequest } from "next/server";
import { TURNOS } from "@/lib/horarios";
import { validarCampo } from "@/lib/validacion";
import { turnosOcupados } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/horarios?fecha=AAAA-MM-DD → turnos libres de ese día.
export async function GET(request: NextRequest) {
  const fecha = request.nextUrl.searchParams.get("fecha") ?? "";
  const error = validarCampo("fecha", fecha);
  if (error) return NextResponse.json({ error }, { status: 400 });

  try {
    const ocupados = new Set(await turnosOcupados(fecha));
    return NextResponse.json({ fecha, libres: TURNOS.filter((t) => !ocupados.has(t)) });
  } catch (e) {
    console.error("Error al leer horarios", e);
    return NextResponse.json({ error: "No pudimos cargar los horarios. Intenta de nuevo." }, { status: 503 });
  }
}
