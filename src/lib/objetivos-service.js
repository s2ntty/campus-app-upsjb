import { supabase } from './supabase-config';

// Servicio de Objetivos Académicos
export const objetivosService = {
    async getObjetivos(userId) {
        try {
            const { data, error } = await supabase
                .from('objetivos')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error("❌ Error al obtener objetivos:", error);
            return [];
        }
    },

    async createObjetivo(userId, objetivoData) {
        try {
            const { data, error } = await supabase
                .from('objetivos')
                .insert({
                    user_id: userId,
                    ...objetivoData
                })
                .select()
                .single();

            if (error) throw error;
            console.log('✅ Objetivo creado:', data);
            return data;
        } catch (error) {
            console.error("❌ Error al crear objetivo:", error);
            throw error;
        }
    },

    async updateObjetivo(objetivoId, updates) {
        try {
            const { data, error } = await supabase
                .from('objetivos')
                .update({
                    ...updates,
                    updated_at: new Date().toISOString()
                })
                .eq('id', objetivoId)
                .select()
                .single();

            if (error) throw error;
            console.log('✅ Objetivo actualizado:', data);
            return data;
        } catch (error) {
            console.error("❌ Error al actualizar objetivo:", error);
            throw error;
        }
    },

    async deleteObjetivo(objetivoId) {
        try {
            const { error } = await supabase
                .from('objetivos')
                .delete()
                .eq('id', objetivoId);

            if (error) throw error;
            console.log('✅ Objetivo eliminado');
        } catch (error) {
            console.error("❌ Error al eliminar objetivo:", error);
            throw error;
        }
    },

    async toggleCompletado(objetivoId, completado) {
        try {
            const { data, error } = await supabase
                .from('objetivos')
                .update({ completado })
                .eq('id', objetivoId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("❌ Error al actualizar estado:", error);
            throw error;
        }
    }
};
