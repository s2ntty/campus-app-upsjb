import { supabase } from './auth-service';

export const documentosService = {
    // Convertir archivo a base64
    async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    },

    // Validar archivo PDF
    validatePDF(file) {
        const maxSize = 5 * 1024 * 1024; // 5MB en bytes
        
        if (!file) {
            throw new Error('No se seleccionó ningún archivo');
        }

        if (file.type !== 'application/pdf') {
            throw new Error('Solo se permiten archivos PDF');
        }

        if (file.size > maxSize) {
            throw new Error('El archivo no debe superar los 5MB');
        }

        return true;
    },

    // Obtener documentos del usuario
    async getDocumentos(userId) {
        try {
            console.log('📄 Obteniendo documentos para userId:', userId);
            
            const { data, error } = await supabase
                .from('documentos')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('❌ Error al obtener documentos:', error);
                throw error;
            }

            console.log('✅ Documentos encontrados:', data?.length || 0);
            return data || [];
        } catch (error) {
            console.error('❌ Error en getDocumentos:', error);
            throw error;
        }
    },

    // Guardar documento
    async saveDocumento(userId, file, tipo = 'certificado') {
        try {
            console.log('💾 Guardando documento...', { userId, fileName: file.name, tipo });

            // Validar archivo
            this.validatePDF(file);

            // Convertir a base64
            const base64Data = await this.fileToBase64(file);

            // Guardar en Supabase
            const { data, error } = await supabase
                .from('documentos')
                .insert({
                    user_id: userId,
                    nombre: file.name,
                    tipo: tipo,
                    archivo_base64: base64Data,
                    tamano: file.size,
                    created_at: new Date().toISOString()
                })
                .select()
                .single();

            if (error) {
                console.error('❌ Error al guardar documento:', error);
                throw error;
            }

            console.log('✅ Documento guardado exitosamente');
            return data;
        } catch (error) {
            console.error('❌ Error en saveDocumento:', error);
            throw error;
        }
    },

    // Eliminar documento
    async deleteDocumento(documentoId) {
        try {
            console.log('🗑️ Eliminando documento:', documentoId);

            const { error } = await supabase
                .from('documentos')
                .delete()
                .eq('id', documentoId);

            if (error) {
                console.error('❌ Error al eliminar documento:', error);
                throw error;
            }

            console.log('✅ Documento eliminado exitosamente');
        } catch (error) {
            console.error('❌ Error en deleteDocumento:', error);
            throw error;
        }
    },

    // Obtener URL del documento para visualización
    getDocumentoUrl(base64Data) {
        return base64Data;
    },

    // Formatear tamaño de archivo
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
};
