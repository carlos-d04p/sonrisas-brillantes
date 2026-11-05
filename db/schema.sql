-- Tabla de citas de Sonrisas Brillantes.
-- Se ejecuta con: npm run db:init

CREATE TABLE IF NOT EXISTS citas (
  id         SERIAL PRIMARY KEY,
  nombre     TEXT        NOT NULL,
  telefono   TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  servicio   TEXT        NOT NULL,
  fecha      DATE        NOT NULL,
  hora       TEXT        NOT NULL,
  estado     TEXT        NOT NULL DEFAULT 'pendiente'
             CHECK (estado IN ('pendiente', 'confirmada', 'cancelada')),
  creada_en  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Un turno no puede tener dos citas activas.
CREATE UNIQUE INDEX IF NOT EXISTS citas_turno_unico
  ON citas (fecha, hora)
  WHERE estado <> 'cancelada';

CREATE INDEX IF NOT EXISTS citas_fecha_idx ON citas (fecha);
