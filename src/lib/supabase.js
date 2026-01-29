import { createClient } from '@supabase/supabase-js'

// Estas son variables de ejemplo - deberás reemplazarlas con tus credenciales reales de Supabase
const supabaseUrl = 'https://your-project-url.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Funciones de autenticación con Google
export const authService = {
  // Iniciar sesión con Google
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    })
    
    if (error) throw error
    return data
  },

  // Cerrar sesión
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Obtener usuario actual
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // Escuchar cambios de autenticación
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },

  // Crear o actualizar perfil después del login con Google
  async createOrUpdateProfile(user) {
    const profileData = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.email?.split('@')[0],
      avatar_url: user.user_metadata?.avatar_url,
      provider: 'google',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('profiles')
      .upsert(profileData)
      .select()

    if (error) throw error
    return data
  }
}

// Funciones para manejar las materias y calificaciones
export const materiasService = {
  // Obtener todas las materias de un usuario
  async getMaterias(userId) {
    const { data, error } = await supabase
      .from('materias')
      .select('*')
      .eq('user_id', userId)
    
    if (error) throw error
    return data
  },

  // Actualizar el estado de una materia
  async updateMateriaStatus(userId, materiaId, status, nota = null, modalidad = null) {
    const updateData = {
      status,
      updated_at: new Date().toISOString()
    }

    // Si se aprueba, agregar nota y modalidad
    if (status === 'aprobada' && nota && modalidad) {
      updateData.nota = nota
      updateData.modalidad = modalidad
      updateData.fecha_aprobacion = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('materias')
      .upsert({
        user_id: userId,
        materia_id: materiaId,
        ...updateData
      })
      .select()

    if (error) throw error
    return data
  },

  // Calcular promedio de materias aprobadas
  async calcularPromedio(userId) {
    const { data, error } = await supabase
      .from('materias')
      .select('nota')
      .eq('user_id', userId)
      .eq('status', 'aprobada')
      .not('nota', 'is', null)

    if (error) throw error
    
    if (data.length === 0) return 0

    const suma = data.reduce((acc, materia) => acc + materia.nota, 0)
    return (suma / data.length).toFixed(2)
  },

  // Obtener estadísticas del usuario
  async getEstadisticas(userId) {
    const { data, error } = await supabase
      .from('materias')
      .select('status, nota')
      .eq('user_id', userId)

    if (error) throw error

    const aprobadas = data.filter(m => m.status === 'aprobada').length
    const cursadas = data.filter(m => m.status === 'cursada').length
    const pendientes = data.filter(m => m.status === 'pendiente').length
    const promedio = await this.calcularPromedio(userId)

    return {
      aprobadas,
      cursadas,
      pendientes,
      total: data.length,
      promedio: parseFloat(promedio),
      creditos: aprobadas * 10 // 10 créditos por materia
    }
  }
}

// Funciones para manejar usuarios
export const userService = {
  // Crear o actualizar perfil de usuario
  async upsertProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .select()

    if (error) throw error
    return data
  },

  // Obtener perfil de usuario
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }
}