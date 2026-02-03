-- ============================================
-- FIX PARA SINCRONIZACIÓN DE MATERIAS
-- Ejecuta este SQL en Supabase SQL Editor
-- ============================================

-- 1. Eliminar la tabla materias existente si tiene estructura incorrecta
DROP TABLE IF EXISTS materias CASCADE;

-- 2. Crear tabla materias con la estructura correcta
CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    materia_id TEXT NOT NULL,  -- ID de la materia (ej: 'intro_programacion')
    status TEXT DEFAULT 'pendiente',  -- 'pendiente', 'cursada', 'aprobada'
    nota DECIMAL(4,2),
    modalidad TEXT,  -- 'regular', 'libre', 'equivalencia'
    fecha_aprobacion TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraint único para evitar duplicados
    UNIQUE(user_id, materia_id)
);

-- 3. Crear índices para mejor performance
CREATE INDEX idx_materias_user_id ON materias(user_id);
CREATE INDEX idx_materias_status ON materias(user_id, status);

-- 4. Habilitar Row Level Security
ALTER TABLE materias ENABLE ROW LEVEL SECURITY;

-- 5. Eliminar políticas antiguas si existen
DROP POLICY IF EXISTS "Public read materias" ON materias;
DROP POLICY IF EXISTS "Public insert materias" ON materias;
DROP POLICY IF EXISTS "Public update materias" ON materias;
DROP POLICY IF EXISTS "Public delete materias" ON materias;

-- 6. Crear políticas públicas (para desarrollo)
-- NOTA: En producción, cambiar estas políticas para usar auth.uid()
CREATE POLICY "Public read materias" ON materias 
    FOR SELECT USING (true);

CREATE POLICY "Public insert materias" ON materias 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update materias" ON materias 
    FOR UPDATE USING (true);

CREATE POLICY "Public delete materias" ON materias 
    FOR DELETE USING (true);

-- 7. Crear trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_materias_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_materias_updated_at ON materias;

CREATE TRIGGER trigger_update_materias_updated_at
    BEFORE UPDATE ON materias
    FOR EACH ROW
    EXECUTE FUNCTION update_materias_updated_at();

-- ============================================
-- ✅ LISTO! Ahora la sincronización debería funcionar
-- ============================================
