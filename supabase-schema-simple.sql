-- ============================================
-- SCRIPT SQL SIMPLIFICADO PARA SUPABASE
-- Solo agrega columnas faltantes a profiles
-- ============================================

-- PASO 1: Agregar columnas a profiles (una por una para evitar errores)
-- ============================================

-- DNI
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='dni') THEN
        ALTER TABLE profiles ADD COLUMN dni TEXT;
        RAISE NOTICE 'Columna dni agregada';
    ELSE
        RAISE NOTICE 'Columna dni ya existe';
    END IF;
END $$;

-- Teléfono
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='telefono') THEN
        ALTER TABLE profiles ADD COLUMN telefono TEXT;
        RAISE NOTICE 'Columna telefono agregada';
    ELSE
        RAISE NOTICE 'Columna telefono ya existe';
    END IF;
END $$;

-- Fecha de nacimiento
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='fecha_nacimiento') THEN
        ALTER TABLE profiles ADD COLUMN fecha_nacimiento DATE;
        RAISE NOTICE 'Columna fecha_nacimiento agregada';
    ELSE
        RAISE NOTICE 'Columna fecha_nacimiento ya existe';
    END IF;
END $$;

-- Género
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='genero') THEN
        ALTER TABLE profiles ADD COLUMN genero TEXT;
        RAISE NOTICE 'Columna genero agregada';
    ELSE
        RAISE NOTICE 'Columna genero ya existe';
    END IF;
END $$;

-- Carrera ID
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='carrera_id') THEN
        ALTER TABLE profiles ADD COLUMN carrera_id TEXT;
        RAISE NOTICE 'Columna carrera_id agregada';
    ELSE
        RAISE NOTICE 'Columna carrera_id ya existe';
    END IF;
END $$;

-- Carrera (nombre completo)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='carrera') THEN
        ALTER TABLE profiles ADD COLUMN carrera TEXT;
        RAISE NOTICE 'Columna carrera agregada';
    ELSE
        RAISE NOTICE 'Columna carrera ya existe';
    END IF;
END $$;

-- Sede
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='sede') THEN
        ALTER TABLE profiles ADD COLUMN sede TEXT;
        RAISE NOTICE 'Columna sede agregada';
    ELSE
        RAISE NOTICE 'Columna sede ya existe';
    END IF;
END $$;

-- Año de ingreso
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='anio_ingreso') THEN
        ALTER TABLE profiles ADD COLUMN anio_ingreso INTEGER;
        RAISE NOTICE 'Columna anio_ingreso agregada';
    ELSE
        RAISE NOTICE 'Columna anio_ingreso ya existe';
    END IF;
END $$;

-- Notas
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='notes') THEN
        ALTER TABLE profiles ADD COLUMN notes TEXT DEFAULT '';
        RAISE NOTICE 'Columna notes agregada';
    ELSE
        RAISE NOTICE 'Columna notes ya existe';
    END IF;
END $$;

-- Last login
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='last_login') THEN
        ALTER TABLE profiles ADD COLUMN last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Columna last_login agregada';
    ELSE
        RAISE NOTICE 'Columna last_login ya existe';
    END IF;
END $$;

-- PASO 2: Crear índices
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_carrera_id ON profiles(carrera_id);

-- PASO 3: Crear tabla de carreras (si no existe)
-- ============================================
CREATE TABLE IF NOT EXISTS carreras (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    facultad TEXT NOT NULL,
    sedes TEXT[] NOT NULL,
    descripcion TEXT,
    duracion_anios INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar carreras
INSERT INTO carreras (id, nombre, facultad, sedes, duracion_anios) VALUES
    ('medicina', 'Medicina', 'F.C.N y C.S', ARRAY['Comodoro Rivadavia', 'Trelew'], 6),
    ('informatica', 'Analista Programador', 'F.I.', ARRAY['Comodoro Rivadavia', 'Puerto Madryn'], 3),
    ('enfermeria', 'Enfermería', 'F.C.N y C.S', ARRAY['Comodoro Rivadavia', 'Trelew', 'Esquel'], 4),
    ('geologia', 'Geología', 'F.C.N y C.S', ARRAY['Comodoro Rivadavia'], 5),
    ('ingenieria_petroleo', 'Ingeniería en Petróleo', 'F.I.', ARRAY['Comodoro Rivadavia'], 5),
    ('psicologia', 'Psicología', 'F.H y C.S', ARRAY['Comodoro Rivadavia', 'Trelew'], 5),
    ('trabajo_social', 'Trabajo Social', 'F.H y C.S', ARRAY['Comodoro Rivadavia'], 4),
    ('turismo', 'Turismo', 'F.H y C.S', ARRAY['Puerto Madryn', 'Ushuaia'], 4)
ON CONFLICT (id) DO NOTHING;

-- PASO 4: Habilitar políticas públicas para desarrollo
-- ============================================

-- Asegurarse de que RLS esté habilitado
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas antiguas si existen
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Public read profiles" ON profiles;
DROP POLICY IF EXISTS "Public insert profiles" ON profiles;
DROP POLICY IF EXISTS "Public update profiles" ON profiles;

-- Crear políticas públicas para desarrollo
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public insert profiles" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update profiles" ON profiles FOR UPDATE USING (true);

-- ============================================
-- ✅ LISTO!
-- ============================================
-- Ahora tu tabla profiles tiene todas las columnas necesarias
-- y puedes guardar la información académica.
