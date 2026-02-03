-- ============================================
-- TABLA DE OBJETIVOS ACADÉMICOS
-- Ejecuta este SQL en Supabase SQL Editor
-- ============================================

-- 1. Crear tabla de objetivos
CREATE TABLE IF NOT EXISTS objetivos (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    tipo TEXT DEFAULT 'personalizado', -- 'materia', 'año', 'personalizado'
    materia_id TEXT, -- Si es tipo materia
    fecha_objetivo DATE,
    completado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear índices
CREATE INDEX IF NOT EXISTS idx_objetivos_user_id ON objetivos(user_id);
CREATE INDEX IF NOT EXISTS idx_objetivos_completado ON objetivos(user_id, completado);

-- 3. Habilitar Row Level Security
ALTER TABLE objetivos ENABLE ROW LEVEL SECURITY;

-- 4. Eliminar políticas antiguas si existen
DROP POLICY IF EXISTS "Public read objetivos" ON objetivos;
DROP POLICY IF EXISTS "Public insert objetivos" ON objetivos;
DROP POLICY IF EXISTS "Public update objetivos" ON objetivos;
DROP POLICY IF EXISTS "Public delete objetivos" ON objetivos;

-- 5. Crear políticas públicas (para desarrollo)
CREATE POLICY "Public read objetivos" ON objetivos 
    FOR SELECT USING (true);

CREATE POLICY "Public insert objetivos" ON objetivos 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update objetivos" ON objetivos 
    FOR UPDATE USING (true);

CREATE POLICY "Public delete objetivos" ON objetivos 
    FOR DELETE USING (true);

-- 6. Crear trigger para updated_at
DROP TRIGGER IF EXISTS trigger_update_objetivos_updated_at ON objetivos;

CREATE TRIGGER trigger_update_objetivos_updated_at
    BEFORE UPDATE ON objetivos
    FOR EACH ROW
    EXECUTE FUNCTION update_materias_updated_at();

-- ============================================
-- ✅ LISTO! Tabla de objetivos creada
-- ============================================
