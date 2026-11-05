# Sonrisas Brillantes

Landing page de una clínica dental con agenda de citas. Hecha con **Next.js 16**, guarda las citas en **Postgres (Neon)** y avisa a la clínica por **WhatsApp**. Incluye un panel `/admin` para confirmar o cancelar citas.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completa los valores
npm run dev                   # http://localhost:3000
```

Sin `DATABASE_URL`, las citas se guardan en memoria. Sirve para probar, pero se pierden al reiniciar.

## Variables de entorno

| Variable | Para qué |
|---|---|
| `DATABASE_URL` | Conexión a Postgres. Vercel la crea al agregar Neon en *Storage*. |
| `ADMIN_PASSWORD` | Contraseña de `/admin`. |
| `ADMIN_SECRET` | Texto aleatorio de 32+ caracteres para firmar la sesión. |

Para crear la tabla, ejecuta una sola vez (necesita `DATABASE_URL` en `.env.local`):

```bash
npm run db:init
```

## Dónde editar

- **Datos de la clínica** (WhatsApp, dirección, horario, equipo, servicios, preguntas): `data/clinica.ts`
- **Reglas del formulario:** `lib/validacion.ts`
- **Turnos de atención:** `lib/horarios.ts`
- **Secciones de la página:** `components/`

## Despliegue

Está conectado a Vercel: cada `git push` a `main` publica el sitio automáticamente.
