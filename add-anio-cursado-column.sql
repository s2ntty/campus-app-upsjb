-- Agregar columna anio_cursado a la tabla profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS anio_cursado INTEGER DEFAULT 1;

-- Agregar comentario a la columna
COMMENT ON COLUMN profiles.anio_cursado IS 'Año de cursado actual del estudiante (1-6)';

-- Opcional: Agregar constraint para validar que el año esté entre 1 y 6
ALTER TABLE profiles 
ADD CONSTRAINT check_anio_cursado_range 
CHECK (anio_cursado >= 1 AND anio_cursado <= 6);
