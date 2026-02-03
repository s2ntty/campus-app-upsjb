import { createClient } from '@supabase/supabase-js'

// CONFIGURACIÓN DEFINITIVA - ARCHIVO NUEVO PARA EVITAR CACHE
const SUPABASE_URL = 'https://eqftnjclezbicvmgbkys.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxZnRuamNsZXpiaWN2bWdia3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTkwNTQsImV4cCI6MjA4NTIzNTA1NH0.fu_7OuhsPCfr54s9OmoHjzEiHkUwxxdNvDEBUwJ2UMk'

// Debug logs para verificar
console.log('🚀 NUEVO ARCHIVO SUPABASE CONFIG:', {
  url: SUPABASE_URL,
  keyLength: SUPABASE_ANON_KEY?.length,
  timestamp: new Date().toISOString(),
  archivo: 'supabase-config.js'
})

// Crear cliente
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    flowType: 'pkce',
    detectSessionInUrl: true,
    persistSession: true,
    autoRefreshToken: true
  }
})

// Verificar cliente
console.log('✅ CLIENTE NUEVO CREADO:', {
  clientUrl: supabase.supabaseUrl,
  clientKey: supabase.supabaseKey?.substring(0, 30) + '...',
  isValid: supabase.supabaseUrl === SUPABASE_URL
})

// Funciones de autenticación
export const authService = {
  async signInWithGoogle() {
    console.log('🚀 GOOGLE OAUTH - ARCHIVO NUEVO')
    console.log('🔍 URL CLIENTE:', supabase.supabaseUrl)
    console.log('🔍 URL ESPERADA:', SUPABASE_URL)
    console.log('🔍 ¿COINCIDEN?', supabase.supabaseUrl === SUPABASE_URL)

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

    if (error) {
      console.error('❌ ERROR OAUTH:', error)
      throw error
    }

    console.log('✅ OAUTH EXITOSO:', data)
    return data
  },

  async signUpWithGoogle() {
    return this.signInWithGoogle()
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },

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

// Exportar todo lo demás que necesitemos
export const materiasService = {
  async getMaterias(userId) {
    const { data, error } = await supabase
      .from('materias')
      .select('*')
      .eq('user_id', userId)

    if (error) throw error
    return data
  }
}

export const userService = {
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  },

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
  }
}