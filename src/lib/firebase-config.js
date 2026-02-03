import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";

// TU CONFIGURACIÓN DE FIREBASE
// REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO DE FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyBro5WtgTvp17Uu7HZdNoorbisI4Z1mjII",
    authDomain: "micampus-79e56.firebaseapp.com",
    projectId: "micampus-79e56",
    storageBucket: "micampus-79e56.firebasestorage.app",
    messagingSenderId: "244609397566",
    appId: "1:244609397566:web:1f04271fe6b0a2dcf7326f",
    measurementId: "G-1F3T2XNS5V"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Adaptador para mantener compatibilidad con el código existente de Supabase
export const supabase = {
    auth: {
        getSession: async () => {
            return new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    unsubscribe();
                    resolve({ data: { session: user ? { user } : null }, error: null });
                });
            });
        },
        getUser: async () => {
            const user = auth.currentUser;
            return { data: { user }, error: null };
        },
        signInWithOAuth: async () => {
            // Mock para compatibilidad, aunque usaremos authService directamente
            return { data: null, error: null };
        },
        signOut: async () => {
            await firebaseSignOut(auth);
            return { error: null };
        }
    }
};

export const authService = {
    async signInWithGoogle() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return { user: result.user, session: result };
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
            throw error;
        }
    },

    async signUpWithGoogle() {
        return this.signInWithGoogle();
    },

    async signOut() {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            throw error;
        }
    },

    async getCurrentUser() {
        return auth.currentUser;
    },

    onAuthStateChange(callback) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // Mapear evento a formato Supabase
            const event = user ? 'SIGNED_IN' : 'SIGNED_OUT';
            const session = user ? { user } : null;
            callback(event, session);
        });

        // Devolver objeto con unsubscribe como espera el código original
        return { data: { subscription: { unsubscribe } } };
    },

    async createOrUpdateProfile(user) {
        if (!user) return;

        const profileData = {
            id: user.uid,
            email: user.email,
            name: user.displayName || user.email?.split('@')[0],
            avatar_url: user.photoURL,
            provider: 'google',
            last_login: new Date().toISOString()
        };

        try {
            const userRef = doc(db, 'profiles', user.uid);
            await setDoc(userRef, profileData, { merge: true });
            return profileData;
        } catch (error) {
            console.error("Error al crear/actualizar perfil en Firestore:", error);
            throw error;
        }
    }
};

export const materiasService = {
    async getMaterias(userId) {
        try {
            const q = query(collection(db, "materias"), where("user_id", "==", userId));
            const querySnapshot = await getDocs(q);
            const materias = [];
            querySnapshot.forEach((doc) => {
                materias.push({ id: doc.id, ...doc.data() });
            });
            return materias;
        } catch (error) {
            console.error("Error al obtener materias:", error);
            throw error;
        }
    }
};

export const userService = {
    async getProfile(userId) {
        try {
            const docRef = doc(db, "profiles", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return null; // O throw error si prefieres
            }
        } catch (error) {
            console.error("Error al obtener perfil:", error);
            throw error;
        }
    },

    async upsertProfile(userId, profileData) {
        try {
            const userRef = doc(db, 'profiles', userId);
            await setDoc(userRef, {
                ...profileData,
                updated_at: new Date().toISOString()
            }, { merge: true });
            return profileData;
        } catch (error) {
            console.error("Error al upsert perfil:", error);
            throw error;
        }
    }
};
