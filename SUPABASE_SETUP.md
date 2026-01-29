# 🔐 Configuración de Supabase con Google OAuth

## 📋 Pasos para Configurar

### 1. **Crear Proyecto en Supabase**
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta y un nuevo proyecto
3. Anota tu `Project URL` y `anon key`

### 2. **Configurar Google OAuth**

#### En Google Cloud Console:
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google+ API**
4. Ve a **Credenciales** → **Crear credenciales** → **ID de cliente OAuth 2.0**
5. Configura:
   - **Tipo de aplicación**: Aplicación web
   - **Orígenes autorizados**: 
     - `http://localhost:5173` (desarrollo)
     - `https://tu-dominio.com` (producción)
   - **URIs de redirección autorizados**:
     - `https://tu-proyecto.supabase.co/auth/v1/callback`

#### En Supabase Dashboard:
1. Ve a **Authentication** → **Providers**
2. Habilita **Google**
3. Ingresa:
   - **Client ID** (de Google Cloud Console)
   - **Client Secret** (de Google Cloud Console)
4. Guarda los cambios

### 3. **Actualizar Variables en el Código**

En `src/lib/supabase.js`, reemplaza:
```javascript
const supabaseUrl = 'https://tu-proyecto.supabase.co'
const supabaseKey = 'tu-anon-key'
```

### 4. **Crear Tablas en Supabase**

Ejecuta este SQL en el **SQL Editor** de Supabase:

```sql
-- Tabla de perfiles de usuario
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  provider TEXT DEFAULT 'email',
  carrera TEXT,
  sede TEXT,
  anio_ingreso INTEGER,
  gender TEXT,
  dni TEXT,
  telefono TEXT,
  fecha_nacimiento DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de materias por usuario
CREATE TABLE materias (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  materia_id TEXT,
  status TEXT DEFAULT 'pendiente',
  nota DECIMAL(3,1),
  modalidad TEXT,
  fecha_aprobacion TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE materias ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas de seguridad para materias
CREATE POLICY "Users can view own materias" ON materias
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own materias" ON materias
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own materias" ON materias
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own materias" ON materias
  FOR DELETE USING (auth.uid() = user_id);
```

### 5. **Configurar Redirects**

En Supabase Dashboard → **Authentication** → **URL Configuration**:
- **Site URL**: `http://localhost:5173` (desarrollo) / `https://tu-dominio.com` (producción)
- **Redirect URLs**: Agregar las mismas URLs

## 🚀 **Funcionalidades Implementadas**

### ✅ **Login con Google**
- Botón "Continuar con Google" en LoginPage
- Redirección automática después del login
- Creación automática de perfil

### ✅ **Registro con Google**
- Botón "Registrarse con Google" en RegistroPage
- Mismo flujo que login (Google maneja ambos)
- Datos automáticos desde Google (nombre, email, avatar)

### ✅ **Gestión de Sesión**
- Detección automática de sesión activa
- Logout seguro
- Persistencia de datos de usuario

### ✅ **Seguridad**
- Row Level Security habilitado
- Políticas de acceso por usuario
- Tokens JWT automáticos

## 🔧 **Desarrollo vs Producción**

### Desarrollo (localhost:5173):
- URLs de redirect apuntan a localhost
- Variables de entorno en `.env.local`

### Producción:
- Actualizar URLs en Google Cloud Console
- Actualizar Site URL en Supabase
- Variables de entorno en el hosting

## 📱 **Experiencia de Usuario**

1. **Usuario hace click en "Continuar con Google"**
2. **Se abre popup de Google OAuth**
3. **Usuario autoriza la aplicación**
4. **Redirección automática a la app**
5. **Sesión iniciada con datos de Google**
6. **Perfil creado automáticamente en Supabase**

## 🛡️ **Beneficios de Seguridad**

- ✅ **No almacenamos contraseñas**
- ✅ **Google maneja la autenticación**
- ✅ **Tokens JWT seguros**
- ✅ **Row Level Security**
- ✅ **HTTPS obligatorio en producción**
- ✅ **Logout seguro**

---

**¡La autenticación con Google está lista para usar!** 🎉