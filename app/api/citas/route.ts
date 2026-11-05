import { NextResponse, type NextRequest } from "next/server";
import { validarCita } from "@/lib/validacion";
import { crearCita, TurnoOcupadoError } from "@/lib/db";

// POST /api/citas → registra una cita nueva.
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const resultado = validarCita((body ?? {}) as Record<string, unknown>);
  if (!resultado.ok) {
    return NextResponse.json({ error: "Revisa los datos del formulario.", errores: resultado.errores }, { status: 400 });
  }

  try {
    const cita = await crearCita(resultado.cita);
    return NextResponse.json({ id: cita.id }, { status: 201 });
  } catch (e) {
    if (e instanceof TurnoOcupadoError) {
      return NextResponse.json(
        { error: "Ese horario acaba de ocuparse.", errores: { hora: "Ese horario acaba de ocuparse. Elige otro." } },
        { status: 409 },
      );
    }
    console.error("Error al crear cita", e);
    return NextResponse.json({ error: "No pudimos registrar tu cita. Intenta de nuevo en unos minutos." }, { status: 503 });
  }
}
