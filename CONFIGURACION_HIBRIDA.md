# 🔧 Configuración de Arquitectura Híbrida: Firebase + Supabase

## 📋 Resumen de la Arquitectura

Esta aplicación utiliza una **arquitectura híbrida** que combina lo mejor de dos servicios:

- **🔐 Firebase**: Autenticación (Google OAuth)
- **💾 Supabase**: Base de datos (perfiles, información académica, materias, etc.)

## 🚀 Pasos de Configuración

### 1️⃣ Configurar Firebase (Ya está configurado)

Firebase ya está configurado para autenticación. Las credenciales están en:
- `src/lib/auth-service.js`

**No necesitas hacer nada adicional con Firebase.**

### 2️⃣ Configurar Supabase Database

#### A. Crear las tablas en Supabase

1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard/project/eqftnjclezbicvmgbkys
2. Navega a **SQL Editor** en el menú lateral
3. Crea una nueva query
4. Copia y pega el contenido completo del archivo `supabase-schema.sql`
5. Haz click en **"Run"** para ejecutar el script

Esto creará todas las tablas necesarias:
- ✅ `profiles` - Perfiles de usuario
- ✅ `carreras` - Catálogo de carreras
- ✅ `plan_estudios` - Plan de estudios por carrera
- ✅ `materias` - Materias del usuario
- ✅ `calendario_academico` - Eventos académicos
- ✅ `agenda` - Agenda personal del usuario

#### B. Verificar las tablas

Después de ejecutar el script, ve a **Table Editor** y verifica que todas las tablas se hayan creado correctamente.

### 3️⃣ Probar la Aplicación

1. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

2. **Prueba el flujo de registro:**
   - Haz click en "Registrarse con Google"
   - Selecciona tu cuenta de Gmail
   - Completa el formulario con:
     - DNI
     - Género
     - Carrera
     - Sede
     - Año de ingreso
   - Haz click en **"Finalizar Registro"**

3. **Verifica en Supabase:**
   - Ve a **Table Editor** → **profiles**
   - Deberías ver tu perfil guardado con todos los datos

## 🔍 Cómo Funciona

### Flujo de Autenticación

```
Usuario → Click "Google" → Firebase Auth → Popup Google → Usuario autenticado
                                                                    ↓
                                                         Guardar perfil en Supabase
```

### Flujo de Registro Completo

```
1. Usuario se autentica con Google (Firebase)
2. App detecta que no tiene perfil completo
3. Muestra formulario de registro
4. Usuario completa datos académicos
5. Click en "Finalizar Registro"
6. Datos se guardan en:
   - localStorage (backup local)
   - Supabase Database (persistencia en la nube)
7. Usuario accede a la aplicación
```

## 📁 Estructura de Archivos

```
src/
├── lib/
│   ├── auth-service.js       ← NUEVO: Servicio híbrido Firebase + Supabase
│   ├── firebase-config.js    ← ANTIGUO: Solo Firebase (ya no se usa)
│   └── supabase-config.js    ← ANTIGUO: Solo Supabase Auth (ya no se usa)
├── pages/
│   ├── RegistroPage.jsx      ← ACTUALIZADO: Usa auth-service.js
│   └── ...
└── App.jsx                    ← ACTUALIZADO: Usa auth-service.js
```

## 🐛 Solución de Problemas

### Problema: El botón "Finalizar Registro" no funciona

**Solución:** Ya está arreglado. El problema era que:
1. No se estaba guardando correctamente en Supabase
2. Faltaba el servicio híbrido
3. Ahora usa `userService.createOrUpdateProfile()` correctamente

### Problema: Error "relation 'profiles' does not exist"

**Solución:** Ejecuta el script SQL `supabase-schema.sql` en Supabase SQL Editor.

### Problema: Los datos no se guardan en Supabase

**Solución:** 
1. Verifica que las tablas existan en Supabase
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que veas los logs:
   - `🚀 Iniciando completeRegistration...`
   - `📝 Datos a guardar:`
   - `✅ Perfil guardado en Supabase`

### Problema: Error de CORS o autenticación

**Solución:** 
- Las políticas RLS están configuradas como públicas por ahora
- Si necesitas más seguridad, actualiza las políticas en Supabase

## 📊 Tablas de Supabase

### `profiles`
Almacena toda la información del usuario:
- Datos personales (nombre, DNI, teléfono, etc.)
- Datos académicos (carrera, sede, año de ingreso)
- Foto de perfil
- Notas personales

### `carreras`
Catálogo de todas las carreras disponibles con sus sedes.

### `plan_estudios`
Plan de estudios de cada carrera (materias por año y cuatrimestre).

### `materias`
Materias que el usuario está cursando o ha cursado, con notas y estado.

### `calendario_academico`
Eventos académicos generales (inscripciones, exámenes, feriados).

### `agenda`
Agenda personal del usuario (tareas, recordatorios, eventos).

## 🔐 Seguridad

- **Firebase Auth** maneja toda la autenticación de forma segura
- **Supabase RLS** (Row Level Security) protege los datos
- Las políticas actuales son públicas para desarrollo
- **Recomendación:** Actualizar las políticas RLS para producción

## 📝 Próximos Pasos

1. ✅ Ejecutar el script SQL en Supabase
2. ✅ Probar el registro completo
3. ✅ Verificar que los datos se guarden correctamente
4. 🔄 Agregar más datos al plan de estudios
5. 🔄 Implementar funcionalidades de materias
6. 🔄 Implementar calendario y agenda

## 💡 Consejos

- **Logs útiles:** Abre la consola del navegador para ver el flujo completo
- **Supabase Dashboard:** Usa Table Editor para ver los datos en tiempo real
- **Firebase Console:** Usa Authentication para ver usuarios autenticados

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs en la consola del navegador
2. Verifica que las tablas existan en Supabase
3. Asegúrate de que Firebase Auth esté funcionando
4. Revisa este documento para soluciones comunes
