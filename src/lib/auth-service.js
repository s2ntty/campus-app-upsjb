// ============================================
// SERVICIO HÍBRIDO: Firebase Auth + Supabase Database
// ============================================
// Firebase: Autenticación (Google OAuth)
// Supabase: Base de datos (perfiles, información académica)

import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from "firebase/auth";
import { createClient } from '@supabase/supabase-js';

// ============================================
// CONFIGURACIÓN FIREBASE (Solo Auth)
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyBro5WtgTvp17Uu7HZdNoorbisI4Z1mjII",
    authDomain: "micampus-79e56.firebaseapp.com",
    projectId: "micampus-79e56",
    storageBucket: "micampus-79e56.firebasestorage.app",
    messagingSenderId: "244609397566",
    appId: "1:244609397566:web:1f04271fe6b0a2dcf7326f",
    measurementId: "G-1F3T2XNS5V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// ============================================
// CONFIGURACIÓN SUPABASE (Solo Database)
// ============================================
const SUPABASE_URL = 'https://eqftnjclezbicvmgbkys.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxZnRuamNsZXpiaWN2bWdia3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTkwNTQsImV4cCI6MjA4NTIzNTA1NH0.fu_7OuhsPCfr54s9OmoHjzEiHkUwxxdNvDEBUwJ2UMk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: false, // No usamos auth de Supabase
        autoRefreshToken: false
    }
});

console.log('🔧 Servicio Híbrido Inicializado:', {
    firebase: '✅ Auth',
    supabase: '✅ Database',
    url: SUPABASE_URL
});

// ============================================
// SERVICIO DE AUTENTICACIÓN (Firebase)
// ============================================
export const authService = {
    async signInWithGoogle() {
        try {
            console.log('🚀 Iniciando Google OAuth con Firebase...');
            const result = await signInWithPopup(auth, googleProvider);
            console.log('✅ Usuario autenticado:', result.user.email);
            return { user: result.user, session: result };
        } catch (error) {
            console.error("❌ Error al iniciar sesión con Google:", error);
            throw error;
        }
    },

    async signUpWithGoogle() {
        return this.signInWithGoogle();
    },

    async signOut() {
        try {
            await firebaseSignOut(auth);
            console.log('👋 Sesión cerrada');
        } catch (error) {
            console.error("❌ Error al cerrar sesión:", error);
            throw error;
        }
    },

    async getCurrentUser() {
        const user = auth.currentUser;
        if (user) {
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            };
        }
        return null;
    },

    onAuthStateChange(callback) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const event = user ? 'SIGNED_IN' : 'SIGNED_OUT';
            const session = user ? { user } : null;
            callback(event, session);
        });

        return { data: { subscription: { unsubscribe } } };
    }
};

// ============================================
// SERVICIO DE USUARIOS (Supabase Database)
// ============================================
export const userService = {
    async getProfile(userId) {
        try {
            console.log('🔍 Buscando perfil en Supabase:', userId);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('❌ Error al obtener perfil:', error);
                throw error;
            }

            console.log('✅ Perfil encontrado:', data ? 'Sí' : 'No');
            return data;
        } catch (error) {
            console.error("❌ Error en getProfile:", error);
            throw error;
        }
    },

    async upsertProfile(userId, profileData) {
        try {
            console.log('💾 Guardando perfil en Supabase:', userId);
            const { data, error } = await supabase
                .from('profiles')
                .upsert({
                    id: userId,
                    ...profileData,
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'id'
                })
                .select()
                .single();

            if (error) {
                console.error('❌ Error al guardar perfil:', error);
                throw error;
            }

            console.log('✅ Perfil guardado exitosamente');
            return data;
        } catch (error) {
            console.error("❌ Error en upsertProfile:", error);
            throw error;
        }
    },

    async createOrUpdateProfile(firebaseUser, additionalData = {}) {
        try {
            const profileData = {
                id: firebaseUser.uid,
                email: firebaseUser.email,
                name: additionalData.name || firebaseUser.displayName || firebaseUser.email?.split('@')[0],
                avatar_url: additionalData.photo || firebaseUser.photoURL,
                provider: 'google',

                // Datos adicionales del registro
                dni: additionalData.dni,
                telefono: additionalData.telefono,
                fecha_nacimiento: additionalData.fechaNacimiento,
                genero: additionalData.genero,

                // Datos académicos
                carrera_id: additionalData.carreraId,
                carrera: additionalData.carrera,
                sede: additionalData.sede,
                anio_ingreso: additionalData.anioIngreso,

                // Notas personales
                notes: additionalData.notes || '',

                // Timestamps
                last_login: new Date().toISOString()
            };

            return await this.upsertProfile(firebaseUser.uid, profileData);
        } catch (error) {
            console.error("❌ Error en createOrUpdateProfile:", error);
            throw error;
        }
    }
};

// ============================================
// SERVICIO DE MATERIAS (Supabase Database)
// ============================================
export const materiasService = {
    async getMaterias(userId) {
        try {
            const { data, error } = await supabase
                .from('materias')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error("❌ Error al obtener materias:", error);
            throw error;
        }
    },

    async upsertMateriaStatus(userId, materiaId, status, nota = null, modalidad = null) {
        console.log('💾 Guardando materia:', { userId, materiaId, status, nota, modalidad });

        const updateData = {
            status,
            updated_at: new Date().toISOString()
        };

        if (status === 'aprobada') {
            updateData.nota = nota;
            updateData.modalidad = modalidad;
            updateData.fecha_aprobacion = new Date().toISOString();
        }

        try {
            const { data, error } = await supabase
                .from('materias')
                .upsert({
                    user_id: userId,
                    materia_id: materiaId,
                    ...updateData
                }, {
                    onConflict: 'user_id,materia_id'
                })
                .select()
                .single();

            if (error) {
                console.error('❌ Error al hacer upsert:', error);
                throw error;
            }

            console.log('✅ Materia guardada exitosamente:', data);
            return data;
        } catch (error) {
            console.error("❌ Error al actualizar estado de materia:", error);
            throw error;
        }
    },

    async getEstadisticas(userId) {
        try {
            console.log('📊 Calculando estadísticas para userId:', userId);

            // Obtener todas las materias del usuario
            const { data, error } = await supabase
                .from('materias')
                .select('status, nota')
                .eq('user_id', userId);

            if (error) {
                console.error('❌ Error en query de materias:', error);
                throw error;
            }

            console.log('📦 Materias encontradas en Supabase:', data);

            const aprobadas = data.filter(m => m.status === 'aprobada');
            const cursadas = data.filter(m => m.status === 'cursada');

            console.log('✅ Materias aprobadas:', aprobadas.length);
            console.log('📚 Materias cursadas:', cursadas.length);

            // Calcular promedio
            const notas = aprobadas
                .map(m => m.nota)
                .filter(n => n !== null && !isNaN(n));

            const promedio = notas.length > 0
                ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2)
                : 0;

            const stats = {
                aprobadas: aprobadas.length,
                cursadas: cursadas.length,
                promedio: parseFloat(promedio),
                total_registradas: data.length
            };

            console.log('📊 Estadísticas calculadas:', stats);
            return stats;
        } catch (error) {
            console.error("❌ Error al calcular estadísticas:", error);
            return { aprobadas: 0, cursadas: 0, promedio: 0, total_registradas: 0 };
        }
    },

    async createMateria(userId, materiaData) {
        try {
            const { data, error } = await supabase
                .from('materias')
                .insert({
                    user_id: userId,
                    ...materiaData,
                    created_at: new Date().toISOString()
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("❌ Error al crear materia:", error);
            throw error;
        }
    },

    async updateMateria(materiaId, updates) {
        try {
            const { data, error } = await supabase
                .from('materias')
                .update({
                    ...updates,
                    updated_at: new Date().toISOString()
                })
                .eq('id', materiaId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("❌ Error al actualizar materia:", error);
            throw error;
        }
    },

    async deleteMateria(materiaId) {
        try {
            const { error } = await supabase
                .from('materias')
                .delete()
                .eq('id', materiaId);

            if (error) throw error;
        } catch (error) {
            console.error("❌ Error al eliminar materia:", error);
            throw error;
        }
    }
};

// ============================================
// SERVICIO DE CARRERAS (Supabase Database)
// ============================================
export const carrerasService = {
    async getCarreras() {
        try {
            const { data, error } = await supabase
                .from('carreras')
                .select('*')
                .order('nombre', { ascending: true });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error("❌ Error al obtener carreras:", error);
            // Fallback a datos locales si falla
            return [
                { id: 'medicina', nombre: 'Medicina', facultad: 'F.C.N y C.S', sedes: ['Comodoro Rivadavia', 'Trelew'] },
                { id: 'informatica', nombre: 'Analista Programador', facultad: 'F.I.', sedes: ['Comodoro Rivadavia', 'Puerto Madryn'] },
                { id: 'enfermeria', nombre: 'Enfermería', facultad: 'F.C.N y C.S', sedes: ['Comodoro Rivadavia', 'Trelew', 'Esquel'] },
                { id: 'geologia', nombre: 'Geología', facultad: 'F.C.N y C.S', sedes: ['Comodoro Rivadavia'] },
                { id: 'ingenieria_petroleo', nombre: 'Ingeniería en Petróleo', facultad: 'F.I.', sedes: ['Comodoro Rivadavia'] },
                { id: 'psicologia', nombre: 'Psicología', facultad: 'F.H y C.S', sedes: ['Comodoro Rivadavia', 'Trelew'] },
                { id: 'trabajo_social', nombre: 'Trabajo Social', facultad: 'F.H y C.S', sedes: ['Comodoro Rivadavia'] },
                { id: 'turismo', nombre: 'Turismo', facultad: 'F.H y C.S', sedes: ['Puerto Madryn', 'Ushuaia'] }
            ];
        }
    },

    async getCarrera(carreraId) {
        try {
            const { data, error } = await supabase
                .from('carreras')
                .select('*')
                .eq('id', carreraId)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("❌ Error al obtener carrera:", error);
            throw error;
        }
    }
};

// ============================================
// SERVICIO DE PLAN DE ESTUDIOS (Supabase Database)
// ============================================
export const planEstudiosService = {
    async getPlanEstudios(carreraId) {
        try {
            const { data, error } = await supabase
                .from('plan_estudios')
                .select('*')
                .eq('carrera_id', carreraId)
                .order('anio', { ascending: true })
                .order('cuatrimestre', { ascending: true });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error("❌ Error al obtener plan de estudios:", error);
            throw error;
        }
    }
};
