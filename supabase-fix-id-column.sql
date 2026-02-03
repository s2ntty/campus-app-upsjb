-- ============================================
-- SCRIPT COMPLETO: ARREGLAR TIPO DE ID
-- Elimina políticas, restricciones y cambia tipos
-- ============================================

DO $$ 
BEGIN
    RAISE NOTICE '🚀 Iniciando conversión de UUID a TEXT...';
    
    -- PASO 1: Eliminar TODAS las políticas RLS
    RAISE NOTICE '1️⃣ Eliminando políticas RLS...';
    
    -- Políticas de profiles
    DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
    DROP POLICY IF EXISTS "Public read profiles" ON profiles;
    DROP POLICY IF EXISTS "Public insert profiles" ON profiles;
    DROP POLICY IF EXISTS "Public update profiles" ON profiles;
    DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;
    
    -- Políticas de materias (solo si la tabla existe)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'materias') THEN
        DROP POLICY IF EXISTS "Users can view own materias" ON materias;
        DROP POLICY IF EXISTS "Users can insert own materias" ON materias;
        DROP POLICY IF EXISTS "Users can update own materias" ON materias;
        DROP POLICY IF EXISTS "Users can delete own materias" ON materias;
        DROP POLICY IF EXISTS "Public read materias" ON materias;
        DROP POLICY IF EXISTS "Public insert materias" ON materias;
        DROP POLICY IF EXISTS "Public update materias" ON materias;
        DROP POLICY IF EXISTS "Public delete materias" ON materias;
    END IF;
    
    -- Políticas de agenda (solo si la tabla existe)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'agenda') THEN
        DROP POLICY IF EXISTS "Users can view own agenda" ON agenda;
        DROP POLICY IF EXISTS "Users can insert own agenda" ON agenda;
        DROP POLICY IF EXISTS "Users can update own agenda" ON agenda;
        DROP POLICY IF EXISTS "Users can delete own agenda" ON agenda;
        DROP POLICY IF EXISTS "Public read agenda" ON agenda;
        DROP POLICY IF EXISTS "Public insert agenda" ON agenda;
        DROP POLICY IF EXISTS "Public update agenda" ON agenda;
        DROP POLICY IF EXISTS "Public delete agenda" ON agenda;
    END IF;
    
    RAISE NOTICE '✅ Políticas eliminadas';
    
    -- PASO 2: Eliminar restricciones de clave foránea
    RAISE NOTICE '2️⃣ Eliminando restricciones de clave foránea...';
    
    ALTER TABLE IF EXISTS materias DROP CONSTRAINT IF EXISTS materias_user_id_fkey;
    ALTER TABLE IF EXISTS materias DROP CONSTRAINT IF EXISTS profiles_id_fkey;
    ALTER TABLE IF EXISTS agenda DROP CONSTRAINT IF EXISTS agenda_user_id_fkey;
    ALTER TABLE IF EXISTS profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
    
    RAISE NOTICE '✅ Restricciones eliminadas';
    
    -- PASO 3: Eliminar claves primarias
    RAISE NOTICE '3️⃣ Eliminando claves primarias...';
    
    ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_pkey;
    
    RAISE NOTICE '✅ Claves primarias eliminadas';
    
    -- PASO 4: Cambiar tipos de columnas
    RAISE NOTICE '4️⃣ Cambiando tipos de columnas...';
    
    -- Cambiar id en profiles
    ALTER TABLE profiles ALTER COLUMN id TYPE TEXT;
    RAISE NOTICE '   ✓ profiles.id → TEXT';
    
    -- Cambiar user_id en materias si existe
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'materias') THEN
        ALTER TABLE materias ALTER COLUMN user_id TYPE TEXT;
        RAISE NOTICE '   ✓ materias.user_id → TEXT';
    END IF;
    
    -- Cambiar user_id en agenda si existe
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'agenda') THEN
        ALTER TABLE agenda ALTER COLUMN user_id TYPE TEXT;
        RAISE NOTICE '   ✓ agenda.user_id → TEXT';
    END IF;
    
    RAISE NOTICE '✅ Tipos cambiados';
    
    -- PASO 5: Recrear claves primarias
    RAISE NOTICE '5️⃣ Recreando claves primarias...';
    
    ALTER TABLE profiles ADD PRIMARY KEY (id);
    
    RAISE NOTICE '✅ Claves primarias recreadas';
    
    -- PASO 6: Recrear políticas RLS (públicas para desarrollo)
    RAISE NOTICE '6️⃣ Recreando políticas RLS...';
    
    -- Asegurar que RLS esté habilitado
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'materias') THEN
        ALTER TABLE materias ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'agenda') THEN
        ALTER TABLE agenda ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Políticas públicas para profiles
    CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
    CREATE POLICY "Public insert profiles" ON profiles FOR INSERT WITH CHECK (true);
    CREATE POLICY "Public update profiles" ON profiles FOR UPDATE USING (true);
    
    -- Políticas públicas para materias (solo si existe)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'materias') THEN
        CREATE POLICY "Public read materias" ON materias FOR SELECT USING (true);
        CREATE POLICY "Public insert materias" ON materias FOR INSERT WITH CHECK (true);
        CREATE POLICY "Public update materias" ON materias FOR UPDATE USING (true);
        CREATE POLICY "Public delete materias" ON materias FOR DELETE USING (true);
    END IF;
    
    -- Políticas públicas para agenda (solo si existe)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'agenda') THEN
        CREATE POLICY "Public read agenda" ON agenda FOR SELECT USING (true);
        CREATE POLICY "Public insert agenda" ON agenda FOR INSERT WITH CHECK (true);
        CREATE POLICY "Public update agenda" ON agenda FOR UPDATE USING (true);
        CREATE POLICY "Public delete agenda" ON agenda FOR DELETE USING (true);
    END IF;
    
    RAISE NOTICE '✅ Políticas recreadas';
    
    RAISE NOTICE '🎉 ¡CONVERSIÓN COMPLETADA EXITOSAMENTE!';
    RAISE NOTICE '';
    RAISE NOTICE '📋 Resumen:';
    RAISE NOTICE '   • profiles.id: UUID → TEXT';
    RAISE NOTICE '   • materias.user_id: UUID → TEXT';
    RAISE NOTICE '   • agenda.user_id: UUID → TEXT';
    RAISE NOTICE '   • Políticas RLS: Recreadas (públicas)';
    RAISE NOTICE '';
    RAISE NOTICE '✅ Ahora puedes usar Firebase UIDs sin problemas';
    
END $$;

-- ============================================
-- ✅ SCRIPT COMPLETADO
-- ============================================
