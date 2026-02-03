# 🔐 Configuración de Google OAuth - Paso a Paso

## ✅ **Ya Configurado:**
- ✅ Variables de entorno en `.env.local`
- ✅ Supabase client configurado
- ✅ Código de autenticación implementado
- ✅ Servidor reiniciado en puerto 5174

## 🆕 **Credenciales OAuth Proporcionadas:**
- **Client ID**: `[CONFIGURADO EN SUPABASE]`
- **Client Secret**: `[CONFIGURADO EN SUPABASE]`

## 🚀 **Pasos para Habilitar Google OAuth:**

### 1. **Configurar en Supabase Dashboard** (PASO CRÍTICO)

1. Ve a tu proyecto: https://supabase.com/dashboard/project/eqftnjclezbicvmgbkys
2. Ve a **Authentication** → **Providers**
3. Busca **Google** y habilítalo
4. Ingresa las credenciales proporcionadas:
   - **Client ID**: `[PROPORCIONADO POR EL USUARIO]`
   - **Client Secret**: `[PROPORCIONADO POR EL USUARIO]`
5. **Save** los cambios

### 2. **Configurar URLs en Supabase**

En **Authentication** → **URL Configuration**:
- **Site URL**: `http://localhost:5174`
- **Redirect URLs**: Agregar `http://localhost:5174`

### 3. **Configurar Google Cloud Console** (Si es necesario)

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Busca el proyecto asociado a las credenciales
3. Ve a **APIs y servicios** → **Credenciales**
4. Encuentra el OAuth 2.0 Client ID: `946280949395-449o57f7npuclvhts58bt9vr7s2m1lsb`
5. Configura:

**Orígenes autorizados de JavaScript:**
```
http://localhost:5174
http://localhost:5173
https://tu-dominio-vercel.vercel.app
```

**URIs de redirección autorizados:**
```
https://eqftnjclezbicvmgbkys.supabase.co/auth/v1/callback
```

## 🧪 **Probar la Configuración:**

1. Ve a http://localhost:5174
2. Click en **"Continuar con Google"**
3. Debería abrir popup de Google
4. Después de autorizar, debería redirigir de vuelta

## 🔍 **Debug y Logs:**

El código ahora incluye logs en la consola:
- `🔧 Supabase Config` - Muestra si está configurado
- `🚀 Intentando login con Google...` - Al hacer click
- `✅ Google OAuth iniciado` - Si funciona
- `❌ Error en Google OAuth` - Si hay errores

## ❌ **Errores Comunes:**

### "Provider not enabled"
- Google no está habilitado en Supabase Dashboard

### "Invalid redirect URI"
- La URL de callback no coincide en Google Cloud Console

### "Access blocked"
- El dominio no está autorizado en Google Cloud Console

## 🎯 **URLs Importantes:**

- **Tu Supabase**: https://supabase.com/dashboard/project/eqftnjclezbicvmgbkys
- **Google Cloud Console**: https://console.cloud.google.com
- **App Local**: http://localhost:5174
- **Callback URL**: https://eqftnjclezbicvmgbkys.supabase.co/auth/v1/callback

## 📱 **Una vez configurado:**

- ✅ Login con Google funcionará
- ✅ Registro con Google funcionará  
- ✅ Datos automáticos (nombre, email, avatar)
- ✅ Sesión persistente
- ✅ Logout seguro

---

**¡Sigue estos pasos y Google OAuth funcionará perfectamente!** 🎉