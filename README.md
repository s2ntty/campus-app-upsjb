# 🎓 Campus App UPSJB

Una aplicación web progresiva (PWA) moderna para estudiantes de la Universidad Provincial de San Juan Bosco (UPSJB), diseñada para facilitar la gestión académica y el seguimiento del plan de estudios.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange.svg)
![Supabase](https://img.shields.io/badge/Supabase-Database-green.svg)

## ✨ Características

### 🔐 Autenticación Híbrida
- **Firebase Authentication** para inicio de sesión con Google
- **Supabase** para gestión de base de datos y perfiles
- Registro personalizado con información académica

### 📚 Gestión Académica
- **Plan de Estudios Interactivo**: Visualiza todas las materias de tu carrera organizadas por año
- **Calendario Académico**: Fechas importantes, exámenes y eventos por facultad
- **Horarios Personalizados**: Agenda semanal con tus clases, profesores y aulas
- **Seguimiento de Progreso**: Marca materias como aprobadas, cursando o pendientes

### 🎨 Diseño Moderno
- **Interfaz Optimizada para Móvil**: Diseño responsive y fluido
- **Modo Oscuro/Claro**: Cambia entre temas según tu preferencia
- **Colores por Carrera**: Cada carrera tiene su paleta de colores única
- **Animaciones Suaves**: Transiciones y efectos visuales profesionales

### 🏫 Carreras Soportadas
- 💻 **Analista Programador Universitario** (Facultad de Ingeniería)
- 🏥 **Medicina** (Facultad de Ciencias Naturales y C.S.)
- 👩‍⚕️ **Enfermería** (Facultad de Ciencias Naturales y C.S.)
- 🪨 **Geología** (Facultad de Ciencias Naturales y C.S.)
- 🛢️ **Ingeniería en Petróleo** (Facultad de Ingeniería)
- 🧠 **Psicología** (Facultad de Ciencias Naturales y C.S.)
- 🤝 **Trabajo Social** (Facultad de Ciencias Naturales y C.S.)
- ✈️ **Turismo** (Facultad de Ciencias Naturales y C.S.)

## 🚀 Tecnologías

### Frontend
- **React 18.3.1** - Biblioteca de UI
- **React Router DOM 7.1.1** - Navegación
- **Lucide React** - Iconos modernos

### Backend & Servicios
- **Firebase** - Autenticación con Google
- **Supabase** - Base de datos PostgreSQL y gestión de perfiles

### Desarrollo
- **Vite 6.0.5** - Build tool y dev server
- **ESLint** - Linting de código

## 📦 Instalación

### Prerrequisitos
- Node.js 16+ y npm
- Cuenta de Firebase
- Cuenta de Supabase

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/campus-app-upsjb.git
cd campus-app-upsjb
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilita Google Authentication
   - Copia tus credenciales a `src/lib/firebase-config.js`

4. **Configurar Supabase**
   - Crea un proyecto en [Supabase](https://supabase.com/)
   - Ejecuta los scripts SQL en `supabase-fix-id-column.sql`
   - Copia tus credenciales a `src/lib/auth-service.js`

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

6. **Build para producción**
```bash
npm run build
```

## 🗄️ Estructura de la Base de Datos

### Tabla `profiles`
```sql
- id (TEXT, PK) - UID de Firebase
- name (TEXT) - Nombre completo
- email (TEXT) - Email del usuario
- carrera (TEXT) - Nombre de la carrera
- carrera_id (TEXT) - ID de la carrera
- sede (TEXT) - Sede universitaria
- anio_ingreso (INTEGER) - Año de ingreso
- dni (TEXT) - DNI del estudiante
- telefono (TEXT) - Teléfono
- fecha_nacimiento (DATE) - Fecha de nacimiento
- genero (TEXT) - Género
- avatar_url (TEXT) - URL de foto de perfil
- notes (TEXT) - Notas personales
```

## 🎨 Personalización

### Colores por Carrera
Los colores se definen en `src/index.css`:
```css
--medicina: #dc2626;
--informatica: #059669;
--enfermeria: #d97706;
--geologia: #92400e;
--ingenieria-petroleo: #374151;
--psicologia: #7c3aed;
--trabajo-social: #0284c7;
--turismo: #be185d;
```

### Agregar Nueva Carrera
1. Añade los datos en `src/data/carreras.js`
2. Define el color en `src/index.css`
3. Actualiza el componente de registro si es necesario

## 📱 PWA Features

- ✅ Instalable en dispositivos móviles
- ✅ Funciona offline (service worker)
- ✅ Optimizado para rendimiento
- ✅ Diseño responsive

## 🔒 Seguridad

⚠️ **IMPORTANTE**: 
- **NO** subas tus credenciales de Firebase/Supabase al repositorio
- Usa variables de entorno para producción
- Las políticas RLS de Supabase están configuradas como públicas para desarrollo
- **Debes** configurar políticas RLS apropiadas antes de producción

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Desarrollador

**Santino Soto (S2ntty)**
- Instagram: [@s2nttyy](https://www.instagram.com/s2nttyy/)
- LinkedIn: [Santino Soto](https://www.linkedin.com/in/santino-soto/)
- GitHub: [@s2ntty](https://github.com/s2ntty)

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Si quieres mejorar el proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en GitHub.

---

Hecho con ❤️ para la comunidad estudiantil de UPSJB