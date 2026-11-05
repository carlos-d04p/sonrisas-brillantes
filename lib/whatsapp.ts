import { clinica } from "@/data/clinica";
import { fechaLarga } from "@/lib/horarios";
import type { CitaInput } from "@/lib/validacion";

/** Enlace para que el paciente avise a la clínica por WhatsApp. */
export function enlaceCitaWhatsApp(cita: CitaInput) {
  const mensaje = [
    `Hola, ${clinica.nombre} 👋 Quiero agendar una cita:`,
    "",
    `• Nombre: ${cita.nombre}`,
    `• Celular: ${cita.telefono}`,
    `• Correo: ${cita.email}`,
    `• Motivo: ${cita.servicio}`,
    `• Fecha: ${fechaLarga(cita.fecha)}`,
    `• Hora: ${cita.hora}`,
  ].join("\n");
  return `https://wa.me/${clinica.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/** Enlace para que la clínica escriba al paciente (celular peruano de 9 dígitos). */
export function enlacePacienteWhatsApp(telefono: string, mensaje: string) {
  return `https://wa.me/51${telefono}?text=${encodeURIComponent(mensaje)}`;
}

export function enlaceContactoWhatsApp() {
  return `https://wa.me/${clinica.whatsapp}?text=${encodeURIComponent(`Hola, ${clinica.nombre} 👋 Tengo una consulta.`)}`;
}
