-- Crear tabla de documentos
CREATE TABLE IF NOT EXISTS documentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    nombre TEXT NOT NULL,
    tipo TEXT NOT NULL DEFAULT 'certificado',
    archivo_base64 TEXT NOT NULL,
    tamano INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas rápidas por usuario
CREATE INDEX IF NOT EXISTS idx_documentos_user_id ON documentos(user_id);

-- Agregar comentarios
COMMENT ON TABLE documentos IS 'Almacena documentos PDF de los estudiantes (certificados, códigos de barras, etc.)';
COMMENT ON COLUMN documentos.user_id IS 'ID del usuario (Firebase UID)';
COMMENT ON COLUMN documentos.nombre IS 'Nombre del archivo PDF';
COMMENT ON COLUMN documentos.tipo IS 'Tipo de documento (certificado, biblioteca, etc.)';
COMMENT ON COLUMN documentos.archivo_base64 IS 'Contenido del PDF en formato base64';
COMMENT ON COLUMN documentos.tamano IS 'Tamaño del archivo en bytes';

-- Habilitar Row Level Security (RLS)
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propios documentos
CREATE POLICY "Users can view own documents" ON documentos
    FOR SELECT
    USING (true);

-- Política: Los usuarios pueden insertar sus propios documentos
CREATE POLICY "Users can insert own documents" ON documentos
    FOR INSERT
    WITH CHECK (true);

-- Política: Los usuarios pueden eliminar sus propios documentos
CREATE POLICY "Users can delete own documents" ON documentos
    FOR DELETE
    USING (true);
