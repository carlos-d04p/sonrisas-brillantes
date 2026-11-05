// Datos de la clínica. Edita este archivo para cambiar textos, contacto, equipo, etc.
// TODO: reemplazar los datos de ejemplo por los reales.

export const clinica = {
  nombre: "Sonrisas Brillantes",
  // Código de país + número, sin "+", espacios ni guiones.
  whatsapp: "51988758950",
  telefonoVisible: "988 758 950",
  email: "contacto@sonrisasbrillantes.pe",
  direccion: "Av. Principal 123, Chiclayo",
  // Búsqueda que se muestra en el mapa de Google.
  mapaQuery: "Av. Principal 123, Chiclayo, Perú",
  horario: [
    { dias: "Lunes a viernes", horas: "9:00 – 19:00" },
    { dias: "Sábados", horas: "9:00 – 19:00" },
    { dias: "Domingos", horas: "Cerrado" },
  ],
  redes: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
  },
};

export const servicios = [
  "Evaluación general",
  "Limpieza dental",
  "Blanqueamiento",
  "Ortodoncia",
  "Implantes",
  "Endodoncia",
  "Odontopediatría",
  "Dolor o urgencia",
] as const;

export type Servicio = (typeof servicios)[number];

export const serviciosDestacados: {
  titulo: Servicio;
  descripcion: string;
  icono: "limpieza" | "blanqueamiento" | "ortodoncia" | "implantes" | "endodoncia" | "ninos";
}[] = [
  {
    titulo: "Limpieza dental",
    descripcion: "Profilaxis y destartraje para eliminar sarro y prevenir caries y problemas de encías.",
    icono: "limpieza",
  },
  {
    titulo: "Blanqueamiento",
    descripcion: "Aclara varios tonos tu sonrisa con un tratamiento seguro y supervisado.",
    icono: "blanqueamiento",
  },
  {
    titulo: "Ortodoncia",
    descripcion: "Brackets metálicos, estéticos o alineadores invisibles para corregir tu mordida.",
    icono: "ortodoncia",
  },
  {
    titulo: "Implantes",
    descripcion: "Reemplaza piezas perdidas con implantes de titanio que se ven y funcionan como naturales.",
    icono: "implantes",
  },
  {
    titulo: "Endodoncia",
    descripcion: "Tratamiento de conducto para salvar dientes dañados y aliviar el dolor.",
    icono: "endodoncia",
  },
  {
    titulo: "Odontopediatría",
    descripcion: "Atención especial para niños, con paciencia y en un ambiente amigable.",
    icono: "ninos",
  },
];

export const equipo = [
  {
    nombre: "Dra. Lucía Fernández",
    cargo: "Directora · Rehabilitación oral",
    cop: "COP 12345",
    descripcion: "Más de 12 años devolviendo la confianza a sus pacientes con tratamientos integrales.",
  },
  {
    nombre: "Dr. Andrés Salazar",
    cargo: "Ortodoncista",
    cop: "COP 23456",
    descripcion: "Especialista en brackets y alineadores invisibles para jóvenes y adultos.",
  },
  {
    nombre: "Dra. Camila Rojas",
    cargo: "Odontopediatra",
    cop: "COP 34567",
    descripcion: "Hace que la visita al dentista sea una experiencia tranquila para los más pequeños.",
  },
];

export const preguntas = [
  {
    pregunta: "¿La primera evaluación tiene costo?",
    respuesta:
      "No. La primera evaluación es gratuita: revisamos tu boca, resolvemos tus dudas y te damos un presupuesto detallado.",
  },
  {
    pregunta: "¿Cómo se confirma mi cita?",
    respuesta:
      "Al enviar el formulario tu cita queda registrada y se abre WhatsApp con tus datos. Te escribiremos en menos de 24 horas para confirmarla.",
  },
  {
    pregunta: "¿Qué métodos de pago aceptan?",
    respuesta: "Aceptamos efectivo, tarjetas de débito y crédito, Yape y Plin. Algunos tratamientos pueden pagarse en cuotas.",
  },
  {
    pregunta: "¿Atienden urgencias?",
    respuesta:
      "Sí. Si tienes dolor intenso, elige “Dolor o urgencia” en el formulario o escríbenos directamente por WhatsApp.",
  },
  {
    pregunta: "¿Puedo reprogramar o cancelar?",
    respuesta: "Claro. Avísanos por WhatsApp con al menos 24 horas de anticipación y buscamos otro horario.",
  },
  {
    pregunta: "¿Atienden a niños?",
    respuesta: "Sí, contamos con odontopediatra y un ambiente pensado para que los niños se sientan cómodos.",
  },
];
