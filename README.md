# 🎓 Campus App UNPSJB - Beta

Aplicación web progresiva (PWA) para estudiantes de la Universidad Nacional de la Patagonia San Juan Bosco.

## 🚀 Características Principales

### ✅ Gestión Académica
- **Plan de Estudios Interactivo**: Visualiza y gestiona el avance de tu carrera
- **Sistema de Correlativas**: Bloqueo automático de materias según correlativas y subcorrelativas
- **Seguimiento de Notas**: Registra notas de exámenes (regulares, libres, equivalencias)
- **Cálculo de Promedio**: Promedio automático basado en materias aprobadas
- **Progreso Visual**: Barra de progreso y estadísticas de créditos

### 📋 Gestión de Objetivos
- Crea y gestiona objetivos académicos personalizados
- Marca objetivos como completados
- Visualización en tarjetas con fechas límite

### 📄 Documentos Digitales
- Almacena hasta 2 documentos PDF (certificados, códigos de barras)
- Visor de PDF integrado con diseño moderno
- Validación de tamaño (máx. 5MB por archivo)

### 👤 Perfil Personalizado
- Edición de año de cursado
- Visualización de materias en curso
- Estadísticas académicas en tiempo real

### 🔐 Autenticación
- Login con Google OAuth (Firebase)
- Registro con datos académicos completos
- Gestión de sesión persistente

### 🎨 Interfaz Moderna
- Diseño responsive optimizado para móvil
- Tema oscuro/claro
- Alertas y modales personalizados
- Animaciones suaves

## 🛠️ Tecnologías

- **Frontend**: React 19 + Vite
- **Routing**: React Router DOM v7
- **Autenticación**: Firebase Auth (Google OAuth)
- **Base de Datos**: Supabase (PostgreSQL)
- **Iconos**: Lucide React
- **Estilos**: CSS Variables + CSS Modules
- **PWA**: Vite PWA Plugin

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/s2ntty/campus-app-upsjb.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🗄️ Configuración de Base de Datos

### Supabase Setup

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta los siguientes scripts SQL en orden:

```sql
-- 1. Crear tabla de perfiles
-- Ver: supabase-schema.sql

-- 2. Crear tabla de materias
-- Ver: supabase-schema.sql

-- 3. Crear tabla de objetivos
-- Ver: create-objetivos-table.sql

-- 4. Crear tabla de documentos
-- Ver: create-documentos-table.sql

-- 5. Agregar columna de año cursado
-- Ver: add-anio-cursado-column.sql
```

### Firebase Setup

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilita Google Authentication
3. Copia las credenciales a `src/lib/firebase-config.js`

Ver guía completa: `GOOGLE_OAUTH_SETUP.md`

## 📚 Carreras Soportadas

- ✅ **Analista Programador Universitario** (con sistema de correlativas completo)
- Medicina
- Enfermería
- Geología
- Ingeniería en Petróleo
- Psicología
- Trabajo Social
- Turismo

## 🔒 Sistema de Correlativas

El sistema valida automáticamente:

- **Correlativas**: Materias que deben estar APROBADAS (final rendido)
- **Subcorrelativas**: Materias que deben estar CURSADAS

Ejemplo:
- Para cursar `IF006 - Algorítmica y Programación II`:
  - Debes tener APROBADA: `IF003 - Algorítmica y Programación I`
  - Debes tener CURSADA: `MA008 - Elementos de Lógica y Matemática Discreta`

## 📱 PWA Features

- Instalable en dispositivos móviles
- Funciona offline (próximamente)
- Iconos y splash screens personalizados
- Optimizado para rendimiento móvil

## 🎯 Roadmap

- [ ] Modo offline completo
- [ ] Notificaciones push
- [ ] Calendario de exámenes integrado
- [ ] Chat entre estudiantes
- [ ] Integración con SIU Guaraní
- [ ] Más carreras y planes de estudio

## 👨‍💻 Autor

**Santiago** - [@s2ntty](https://github.com/s2ntty)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Agradecimientos

- Universidad Nacional de la Patagonia San Juan Bosco
- Comunidad de estudiantes de la UNPSJB
- Todos los que contribuyeron con feedback durante el desarrollo

---

**Versión Beta** - Desarrollado con ❤️ para la comunidad estudiantil de la UNPSJB
