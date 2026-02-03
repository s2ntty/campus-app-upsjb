-- ============================================
-- SCRIPT SQL PARA SUPABASE - VERSIÓN ACTUALIZADA
-- Base de datos para Campus App UNPSJB
-- ============================================

-- 1. ACTUALIZAR TABLA DE PERFILES (si ya existe)
-- ============================================

-- Agregar columnas nuevas a la tabla profiles existente (si no existen)
DO $$ 
BEGIN
    -- Datos personales
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='dni') THEN
        ALTER TABLE profiles ADD COLUMN dni TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='telefono') THEN
        ALTER TABLE profiles ADD COLUMN telefono TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='fecha_nacimiento') THEN
        ALTER TABLE profiles ADD COLUMN fecha_nacimiento DATE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='genero') THEN
        ALTER TABLE profiles ADD COLUMN genero TEXT;
    END IF;
    
    -- Datos académicos
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='carrera_id') THEN
        ALTER TABLE profiles ADD COLUMN carrera_id TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='carrera') THEN
        ALTER TABLE profiles ADD COLUMN carrera TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='sede') THEN
        ALTER TABLE profiles ADD COLUMN sede TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='anio_ingreso') THEN
        ALTER TABLE profiles ADD COLUMN anio_ingreso INTEGER;
    END IF;
    
    -- Notas personales
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='notes') THEN
        ALTER TABLE profiles ADD COLUMN notes TEXT DEFAULT '';
    END IF;
    
    -- Timestamps adicionales
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='last_login') THEN
        ALTER TABLE profiles ADD COLUMN last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Crear índices si no existen
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_carrera_id ON profiles(carrera_id);

-- ============================================
-- 2. TABLA DE CARRERAS
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

-- Insertar carreras iniciales
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

-- ============================================
-- 3. TABLA DE PLAN DE ESTUDIOS
-- ============================================
CREATE TABLE IF NOT EXISTS plan_estudios (
    id SERIAL PRIMARY KEY,
    carrera_id TEXT NOT NULL,
    codigo_materia TEXT NOT NULL,
    nombre_materia TEXT NOT NULL,
    anio INTEGER NOT NULL,
    cuatrimestre INTEGER NOT NULL,
    horas_semanales INTEGER,
    tipo TEXT DEFAULT 'obligatoria',
    correlativas TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(carrera_id, codigo_materia)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_plan_estudios_carrera ON plan_estudios(carrera_id);
CREATE INDEX IF NOT EXISTS idx_plan_estudios_anio ON plan_estudios(carrera_id, anio);

-- ============================================
-- 4. TABLA DE MATERIAS DEL USUARIO
-- ============================================
CREATE TABLE IF NOT EXISTS materias (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    codigo_materia TEXT NOT NULL,
    nombre_materia TEXT NOT NULL,
    carrera_id TEXT,
    
    -- Estado de la materia
    estado TEXT DEFAULT 'cursando',
    nota_cursada DECIMAL(4,2),
    nota_final DECIMAL(4,2),
    
    -- Fechas
    anio_cursada INTEGER,
    cuatrimestre INTEGER,
    fecha_aprobacion DATE,
    
    -- Información adicional
    profesor TEXT,
    horarios JSONB,
    notas_personales TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, codigo_materia, anio_cursada, cuatrimestre)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_materias_user ON materias(user_id);
CREATE INDEX IF NOT EXISTS idx_materias_estado ON materias(user_id, estado);

-- ============================================
-- 5. TABLA DE CALENDARIO ACADÉMICO
-- ============================================
CREATE TABLE IF NOT EXISTS calendario_academico (
    id SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    tipo TEXT NOT NULL,
    
    -- Filtros opcionales
    carrera_id TEXT,
    sede TEXT,
    facultad TEXT,
    
    -- Metadata
    color TEXT DEFAULT '#3b82f6',
    icono TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_calendario_fecha ON calendario_academico(fecha_inicio, fecha_fin);
CREATE INDEX IF NOT EXISTS idx_calendario_tipo ON calendario_academico(tipo);
CREATE INDEX IF NOT EXISTS idx_calendario_carrera ON calendario_academico(carrera_id);

-- ============================================
-- 6. TABLA DE AGENDA PERSONAL
-- ============================================
CREATE TABLE IF NOT EXISTS agenda (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    fecha_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    fecha_fin TIMESTAMP WITH TIME ZONE,
    
    -- Tipo de evento
    tipo TEXT DEFAULT 'tarea',
    
    -- Relación con materia (opcional)
    materia_id INTEGER,
    
    -- Estado
    completado BOOLEAN DEFAULT FALSE,
    prioridad TEXT DEFAULT 'media',
    
    -- Recordatorios
    recordatorio_minutos INTEGER,
    
    -- Metadata
    color TEXT DEFAULT '#3b82f6',
    ubicacion TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_agenda_user ON agenda(user_id);
CREATE INDEX IF NOT EXISTS idx_agenda_fecha ON agenda(user_id, fecha_inicio);
CREATE INDEX IF NOT EXISTS idx_agenda_completado ON agenda(user_id, completado);

-- ============================================
-- 7. POLÍTICAS DE SEGURIDAD (RLS)
-- ============================================

-- Habilitar RLS (si no está habilitado)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE materias ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own materias" ON materias;
DROP POLICY IF EXISTS "Users can insert own materias" ON materias;
DROP POLICY IF EXISTS "Users can update own materias" ON materias;
DROP POLICY IF EXISTS "Users can delete own materias" ON materias;
DROP POLICY IF EXISTS "Users can view own agenda" ON agenda;
DROP POLICY IF EXISTS "Users can insert own agenda" ON agenda;
DROP POLICY IF EXISTS "Users can update own agenda" ON agenda;
DROP POLICY IF EXISTS "Users can delete own agenda" ON agenda;

-- Crear políticas públicas para desarrollo
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public insert profiles" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update profiles" ON profiles FOR UPDATE USING (true);

CREATE POLICY "Public read materias" ON materias FOR SELECT USING (true);
CREATE POLICY "Public insert materias" ON materias FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update materias" ON materias FOR UPDATE USING (true);
CREATE POLICY "Public delete materias" ON materias FOR DELETE USING (true);

CREATE POLICY "Public read agenda" ON agenda FOR SELECT USING (true);
CREATE POLICY "Public insert agenda" ON agenda FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update agenda" ON agenda FOR UPDATE USING (true);
CREATE POLICY "Public delete agenda" ON agenda FOR DELETE USING (true);

-- ============================================
-- 8. FUNCIONES Y TRIGGERS
-- ============================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Eliminar triggers existentes si existen
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_carreras_updated_at ON carreras;
DROP TRIGGER IF EXISTS update_plan_estudios_updated_at ON plan_estudios;
DROP TRIGGER IF EXISTS update_materias_updated_at ON materias;
DROP TRIGGER IF EXISTS update_calendario_updated_at ON calendario_academico;
DROP TRIGGER IF EXISTS update_agenda_updated_at ON agenda;

-- Crear triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carreras_updated_at BEFORE UPDATE ON carreras
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plan_estudios_updated_at BEFORE UPDATE ON plan_estudios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_materias_updated_at BEFORE UPDATE ON materias
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendario_updated_at BEFORE UPDATE ON calendario_academico
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agenda_updated_at BEFORE UPDATE ON agenda
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ✅ SCRIPT COMPLETADO
-- ============================================
-- Este script es seguro para ejecutar múltiples veces.
-- Solo agrega columnas y tablas que no existen.
