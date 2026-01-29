# Campus UNPSJB - Aplicación Universitaria

## 📱 Descripción del Proyecto

Campus UNPSJB es una aplicación web móvil moderna diseñada para estudiantes de la Universidad Nacional de la Patagonia San Juan Bosco. La aplicación permite gestionar el progreso académico, visualizar horarios, y llevar un seguimiento detallado de materias y calificaciones con **contenido específico filtrado por carrera**.

### 🆕 Nuevas Características
- **Sistema de registro completo** con selección de carrera y sede
- **Filtrado de contenido por carrera** - Solo ves información relevante a tu carrera
- **8 carreras disponibles** con datos específicos (horarios, eventos, materias)
- **Horarios personalizados** según tu carrera y sede
- **Calendario académico filtrado** con eventos específicos de tu carrera

## 🎨 Diseño y Estilo

### Sistema de Diseño Premium
- **Inspiración**: Travel UI Kit premium con estilo minimalista y elegante
- **Paleta de colores**: Gradientes violeta (#6366f1) y púrpura (#8b5cf6)
- **Tipografía**: San Francisco (system fonts) para iOS-like experience
- **Componentes**: Tarjetas redondeadas, sombras suaves, microinteracciones
- **Mobile-first**: Diseño optimizado para dispositivos móviles (max-width: 430px)

### Características Visuales
- **Glassmorphism**: Efectos de transparencia y blur
- **Animaciones suaves**: Entrada escalonada, hover effects, transiciones fluidas
- **Sombras realistas**: Sistema de sombras con múltiples niveles
- **Bordes redondeados**: Radius consistente (8px, 12px, 16px, 20px, 24px)

## 🏗️ Arquitectura de la Aplicación

### Estructura de Páginas
```
src/
├── pages/
│   ├── LoginPage.jsx          # Autenticación con enlace a registro
│   ├── RegistroPage.jsx       # Registro paso a paso con selección de carrera
│   ├── HomePage.jsx           # Dashboard con contenido filtrado por carrera
│   ├── CarreraPage.jsx        # Plan de estudios específico por carrera
│   ├── PerfilPage.jsx         # Información académica del estudiante
│   ├── ConfiguracionPage.jsx  # Configuración personal y preferencias
│   ├── AgendaPage.jsx         # Horarios específicos de tu carrera
│   └── CalendarioAcademicoPage.jsx # Calendario con eventos de tu carrera
├── components/
│   ├── LoadingScreen.jsx      # Pantalla de carga premium sin barra
│   ├── NavBar.jsx            # Navegación flotante con glassmorphism
│   ├── StatusBadge.jsx       # Badges de estado de materias
│   └── NotaModal.jsx         # Modal para ingresar calificaciones
├── data/
│   ├── planes.js             # Planes de estudio legacy (Medicina, APU)
│   └── carreras.js           # Datos específicos de 8 carreras
└── lib/
    └── supabase.js           # Configuración y servicios de base de datos
```

### Navegación y Flujo
- **HomePage**: Dashboard con saludo inclusivo, acciones rápidas, progreso académico
- **Avatar + Settings**: Ambos llevan a ConfiguracionPage
- **Perfil**: Muestra información académica (separado de configuración)
- **NavBar**: Navegación flotante con 4 secciones principales

## 🎓 Carreras Disponibles

### Sistema de Filtrado por Carrera
La aplicación ahora filtra todo el contenido según la carrera del usuario. **Los estudiantes de Medicina no ven información de Ingeniería** y viceversa.

| Carrera | Facultad | Sedes | Duración |
|---------|----------|-------|----------|
| **Medicina** | F.C.N y C.S | Comodoro Rivadavia, Trelew | 6 años |
| **Analista Programador** | F.I. | Comodoro Rivadavia, Puerto Madryn | 3 años |
| **Enfermería** | F.C.N y C.S | Comodoro Rivadavia, Trelew, Esquel | 4 años |
| **Geología** | F.C.N y C.S | Comodoro Rivadavia | 5 años |
| **Ing. en Petróleo** | F.I. | Comodoro Rivadavia | 5 años |
| **Psicología** | F.H y C.S | Comodoro Rivadavia, Trelew | 5 años |
| **Trabajo Social** | F.H y C.S | Comodoro Rivadavia | 4 años |
| **Turismo** | F.H y C.S | Puerto Madryn, Ushuaia | 4 años |

### Contenido Específico por Carrera
- **Materias**: Plan de estudios específico con correlativas
- **Horarios**: Clases según tu carrera y sede
- **Eventos**: Congresos, prácticas, exámenes específicos
- **Calendario**: Solo eventos relevantes a tu carrera

## 🔐 Sistema de Autenticación y Registro

### Flujo de Registro Paso a Paso
1. **Datos Personales**: Nombre, apellido, DNI, email, teléfono, fecha nacimiento, género
2. **Información Académica**: Carrera, sede, año de ingreso
3. **Seguridad**: Contraseña con validaciones

### Validaciones Implementadas
- **Contraseña**: Mínimo 8 caracteres, mayúscula, número
- **Confirmación**: Verificación de contraseñas coincidentes
- **Carrera y Sede**: Validación de combinaciones válidas
- **Campos requeridos**: Validación por paso

### Filtrado de Contenido
Una vez registrado, el usuario solo ve:
- Su carrera específica en el dashboard
- Horarios de su carrera y sede
- Eventos académicos relevantes
- Plan de estudios correspondiente

### Funcionalidades Implementadas
- **10 créditos por materia** aprobada
- **Estados de materia**: Pendiente → Cursada → Aprobada
- **Modal de calificación**: Captura nota (1-10) y modalidad (Oral/Escrito)
- **Promedio real**: Calculado con notas ingresadas
- **Badges informativos**: Muestran "8.5 - Oral" para materias aprobadas

### Flujo de Calificación
1. Click en materia pendiente → Cambia a "Cursada"
2. Click en materia cursada → Abre modal de calificación
3. Ingresa nota y modalidad → Guarda como "Aprobada"
4. Click en aprobada → Vuelve a "Pendiente"

## 🗄️ Base de Datos (Supabase)

### Configuración Pendiente
```javascript
// src/lib/supabase.js - Reemplazar con credenciales reales
const supabaseUrl = 'https://your-project-url.supabase.co'
const supabaseKey = 'your-anon-key'
```

### Estructura de Tablas
```sql
-- Materias por usuario
CREATE TABLE materias (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  materia_id INTEGER,
  status VARCHAR(20) DEFAULT 'pendiente',
  nota DECIMAL(3,1),
  modalidad VARCHAR(20),
  fecha_aprobacion TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Perfiles de usuario
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT,
  carrera TEXT,
  gender TEXT,
  photo TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🌈 Sistema de Género Inclusivo

### Saludo Dinámico
- **Masculino**: "Bienvenido, [nombre]"
- **Femenino**: "Bienvenida, [nombre]"
- **No Binario/Otro/Sin especificar**: "Bienvenid@, [nombre]"

### Configuración
- Selector en ConfiguracionPage con opciones inclusivas
- Guardado en localStorage y userData
- Actualización automática del saludo

## 🎭 Pantalla de Carga

### Características
- **Sin barra de progreso** (como solicitado)
- **Estilo premium** con gradientes y efectos
- **Logo central** con anillos giratorios
- **Partículas flotantes** y patrón de puntos
- **Mensajes motivadores** académicos
- **Indicador de puntos pulsantes**

## 📱 Páginas Principales

### HomePage
- **Header sticky** con avatar y configuración
- **Saludo inclusivo** basado en género
- **Próxima clase** destacada
- **Acciones rápidas** (Horarios, Materias, Plan, Avisos)
- **Progreso de carreras** con barras animadas
- **Tarjeta del desarrollador** (S2ntty)

### CarreraPage
- **Selector de plan** (Plan 2025 vs Plan Viejo)
- **Estadísticas**: Porcentaje, materias, promedio, créditos
- **Lista de materias** por año con estados
- **Sistema de calificaciones** integrado
- **Navegación por años** con scroll horizontal

### PerfilPage
- **Información académica** (no configuración)
- **Progreso real** calculado desde localStorage
- **Estadísticas visuales** con gráficos
- **Estado actual** de materias cursando
- **Próximos objetivos** académicos

### ConfiguracionPage
- **Edición de perfil** completa
- **Foto, nombre, carrera, género**
- **Notas personales** con textarea
- **Configuración de tema** (claro/oscuro)
- **Cerrar sesión**

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 19.2.0** con Hooks
- **React Router DOM 7.12.0** para navegación
- **Lucide React 0.562.0** para iconografía
- **Vite 7.2.4** como bundler
- **CSS-in-JS** con styled-jsx

### Backend (Preparado)
- **Supabase** para base de datos y autenticación
- **PostgreSQL** como base de datos
- **Row Level Security** para seguridad

### Herramientas
- **ESLint** para linting
- **Vite PWA Plugin** para Progressive Web App
- **NPM** como package manager

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview

# Linting
npm run lint
```

## 📋 Estado Actual del Proyecto

### ✅ Completado
- [x] Sistema de diseño premium implementado
- [x] **Sistema de registro completo con selección de carrera**
- [x] **Filtrado de contenido por carrera (8 carreras disponibles)**
- [x] **Horarios y calendario personalizados por carrera**
- [x] Todas las páginas principales creadas
- [x] Sistema de calificaciones funcional
- [x] Navegación y routing completo
- [x] Pantalla de carga premium
- [x] Sistema de género inclusivo
- [x] Responsive design
- [x] Tema claro/oscuro
- [x] Persistencia en localStorage

### 🔄 En Proceso
- [ ] Integración con Supabase
- [ ] Autenticación real
- [ ] Sincronización de datos
- [ ] Notificaciones push (PWA)

### 📝 Próximas Funcionalidades
- [ ] Calendario académico interactivo
- [ ] Sistema de horarios detallado
- [ ] Notificaciones de clases
- [ ] Chat o foro estudiantil
- [ ] Descarga de certificados
- [ ] Integración con sistema universitario

## 🎨 Guía de Estilo para Desarrolladores

### Colores Principales
```css
--primary: #6366f1
--primary-dark: #4f46e5
--primary-light: #8b5cf6
--success: #10b981
--warning: #f59e0b
--error: #ef4444
```

### Espaciado
```css
--spacing-xs: 0.25rem
--spacing-sm: 0.5rem
--spacing-md: 1rem
--spacing-lg: 1.5rem
--spacing-xl: 2rem
--spacing-2xl: 3rem
```

### Bordes
```css
--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 20px
--radius-2xl: 24px
--radius-full: 9999px
```

## 👨‍💻 Información del Desarrollador

**Desarrollado por**: S2ntty (Santino Soto)
- **Instagram**: [@s2nttyy](https://www.instagram.com/s2nttyy/)
- **LinkedIn**: [santino-soto](https://www.linkedin.com/in/santino-soto/)
- **GitHub**: [s2ntty](https://github.com/s2ntty)

## 📄 Licencia

Este proyecto es privado y está desarrollado específicamente para la UNPSJB.

---

## 🤖 Prompt para IA (Contexto Perdido)

**Cuando retomes este proyecto, recuerda:**

1. **Estilo**: Diseño premium inspirado en Travel UI Kit, colores violeta/púrpura, mobile-first
2. **Estructura**: HomePage (dashboard) → ConfiguracionPage (settings) → PerfilPage (academic info)
3. **Registro**: Sistema completo paso a paso con 8 carreras disponibles
4. **Filtrado**: Contenido específico por carrera - estudiantes solo ven su carrera
5. **Calificaciones**: Modal para nota + modalidad, 10 créditos/materia, promedio real
6. **Género**: Saludo inclusivo (Bienvenido/a/@) basado en userData.gender
7. **Navegación**: Avatar + Settings → Configuración, NavBar flotante con glassmorphism
8. **Base de datos**: Supabase preparado pero comentado, localStorage como fallback
9. **Pantalla de carga**: Sin barra, estilo premium con logo y efectos
10. **Responsive**: Max-width 430px, sistema de tokens CSS, animaciones suaves

**Archivos clave**: 
- **Nuevos**: RegistroPage.jsx, carreras.js (datos por carrera)
- **Actualizados**: App.jsx (routing), HomePage.jsx (filtrado), AgendaPage.jsx, CalendarioAcademicoPage.jsx
- **Existentes**: CarreraPage.jsx, NotaModal.jsx, StatusBadge.jsx, supabase.js

**Flujo de autenticación**: Login ↔ Registro → Dashboard filtrado por carrera