# 🤖 PROMPT PARA IA - CAMPUS UNPSJB

## CONTEXTO RÁPIDO
Aplicación universitaria React con diseño premium estilo Travel UI Kit. Mobile-first (430px), colores violeta/púrpura, glassmorphism, animaciones suaves.

## ESTRUCTURA ACTUAL
```
HomePage (dashboard) → ConfiguracionPage (settings personal) → PerfilPage (info académica)
NavBar flotante → 4 secciones principales
LoadingScreen premium sin barra de progreso
```

## SISTEMA DE CALIFICACIONES ⭐
- **Flujo**: Pendiente → Cursada → Modal (nota + modalidad) → Aprobada
- **10 créditos por materia** aprobada
- **Promedio real** calculado con notas ingresadas
- **StatusBadge** muestra "8.5 - Oral" para aprobadas
- **NotaModal** captura nota (1-10) y modalidad (Oral/Escrito)

## GÉNERO INCLUSIVO 🌈
- **Saludo dinámico**: Masculino="Bienvenido", Femenino="Bienvenida", Otro="Bienvenid@"
- **Configuración** en ConfiguracionPage
- **userData.gender** determina el saludo

## NAVEGACIÓN CLAVE
- **Avatar + Settings icon** → ambos van a `/configuracion`
- **Perfil en navbar** → `/perfil` (solo info académica)
- **HomePage** → dashboard con saludo, acciones rápidas, progreso

## BASE DE DATOS
- **Supabase** preparado pero comentado en `src/lib/supabase.js`
- **localStorage** como fallback actual
- **Tablas**: materias (user_id, materia_id, status, nota, modalidad), profiles

## ARCHIVOS IMPORTANTES
```
src/pages/HomePage.jsx - Dashboard principal
src/pages/CarreraPage.jsx - Plan estudios + calificaciones
src/components/NotaModal.jsx - Modal para notas
src/components/StatusBadge.jsx - Badges de materias
src/lib/supabase.js - DB config (comentado)
```

## ESTILO CSS
```css
/* Colores principales */
--primary: #6366f1
--primary-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)
--success: #10b981, --warning: #f59e0b, --error: #ef4444

/* Espaciado */
--spacing-sm: 0.5rem, --spacing-md: 1rem, --spacing-lg: 1.5rem

/* Bordes */
--radius-lg: 16px, --radius-xl: 20px, --radius-full: 9999px
```

## COMANDOS
```bash
npm install --legacy-peer-deps  # Instalar deps
npm run dev                     # Desarrollo
```

## ESTADO ACTUAL ✅
- [x] Diseño premium completo
- [x] Sistema calificaciones funcional  
- [x] Género inclusivo implementado
- [x] Navegación y routing completo
- [x] Responsive design
- [x] Persistencia localStorage

## PENDIENTE 🔄
- [ ] Configurar Supabase real
- [ ] Descomentar funciones DB
- [ ] Autenticación

## DESARROLLADOR
S2ntty - Tarjeta en HomePage con redes sociales

---

**INSTRUCCIÓN PARA IA**: Este proyecto tiene un diseño premium muy específico y un sistema de calificaciones detallado. Mantén la consistencia visual y funcional. El sistema de género inclusivo y el flujo de calificaciones son características clave que deben preservarse.