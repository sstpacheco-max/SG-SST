// ============================================
// CONFIG-GLOBAL.JS
// Sistema de Configuración Global SG-SST
// ============================================

const ConfigGlobal = {
    // Clave de almacenamiento
    STORAGE_KEY: 'sgsst_config',

    // Schema de configuración
    defaultConfig: {
        empresa: {
            nit: '',
            razonSocial: '',
            direccion: '',
            ciudad: '',
            departamento: '',
            telefono: '',
            email: '',
            web: '',
            logoBase64: ''
        },
        representanteLegal: {
            nombre: '',
            documento: '',
            cargo: 'Representante Legal',
            telefono: '',
            email: ''
        },
        responsableSST: {
            nombre: '',
            documento: '',
            licencia: '',
            vigenciaLicencia: '',
            telefono: '',
            email: '',
            horasDedicacion: ''
        },
        clasificacion: {
            actividadEconomica: '',
            codigoCIIU: '',
            claseRiesgo: '',
            totalTrabajadores: 0,
            distribucion: {
                indefinido: 0,
                fijo: 0,
                prestacion: 0,
                aprendiz: 0
            }
        },
        centrosTrabajo: [
            { nombre: 'Sede Principal', direccion: '', trabajadores: 0 }
        ],
        trabajadores: [],
        configurado: false,
        fechaActualizacion: null
    },

    // ===== MÉTODOS DE ALMACENAMIENTO =====

    guardarConfig(config) {
        config.fechaActualizacion = new Date().toISOString();
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
        console.log('✅ Configuración guardada correctamente');
    },

    cargarConfig() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Error al parsear configuración:', e);
                return this.defaultConfig;
            }
        }
        return this.defaultConfig;
    },

    existeConfig() {
        const config = this.cargarConfig();
        return config.configurado === true;
    },

    limpiarConfig() {
        if (confirm('⚠️ ¿Está seguro de eliminar toda la configuración? Esta acción no se puede deshacer.')) {
            localStorage.removeItem(this.STORAGE_KEY);
            localStorage.removeItem(this.STORAGE_KEY + '_trabajadores');
            console.log('🗑️ Configuración eliminada');
            location.reload();
        }
    },

    // ===== GESTIÓN DE TRABAJADORES =====

    agregarTrabajador(trabajador) {
        const config = this.cargarConfig();

        // Verificar duplicado por documento
        const existe = config.trabajadores.find(t => t.documento === trabajador.documento);
        if (existe) {
            alert('⚠️ Ya existe un trabajador con este documento');
            return false;
        }

        trabajador.id = 'T' + Date.now();
        config.trabajadores.push(trabajador);
        this.guardarConfig(config);
        return true;
    },

    editarTrabajador(id, datosActualizados) {
        const config = this.cargarConfig();
        const index = config.trabajadores.findIndex(t => t.id === id);

        if (index !== -1) {
            config.trabajadores[index] = { ...config.trabajadores[index], ...datosActualizados };
            this.guardarConfig(config);
            return true;
        }
        return false;
    },

    eliminarTrabajador(id) {
        if (confirm('¿Está seguro de eliminar este trabajador?')) {
            const config = this.cargarConfig();
            config.trabajadores = config.trabajadores.filter(t => t.id !== id);
            this.guardarConfig(config);
            return true;
        }
        return false;
    },

    obtenerTrabajadores() {
        const config = this.cargarConfig();
        return config.trabajadores || [];
    },

    // ===== VALIDACIONES =====

    validarNIT(nit) {
        // Formato: 900123456-7 (9-10 dígitos + guión + 1 dígito)
        const regex = /^\d{9,10}-\d{1}$/;
        return regex.test(nit);
    },

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    validarTelefono(telefono) {
        // Acepta formatos: 3001234567, 601-2345678, (601) 2345678
        const regex = /^[\d\s\(\)\-]+$/;
        return telefono.length >= 7 && regex.test(telefono);
    },

    // ===== UTILIDADES =====

    obtenerValor(path) {
        const config = this.cargarConfig();
        return this.getNestedValue(config, path);
    },

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, prop) => current?.[prop], obj);
    },

    formatearFecha(isoDate) {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        return date.toLocaleDateString('es-CO');
    },

    // ===== EXPORTAR/IMPORTAR =====

    exportarConfigJSON() {
        const config = this.cargarConfig();
        const dataStr = JSON.stringify(config, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `config-sgsst-${config.empresa.nit || 'empresa'}.json`;
        link.click();
        URL.revokeObjectURL(url);
    },

    importarConfigJSON(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const config = JSON.parse(e.target.result);
                if (confirm('¿Desea importar esta configuración? Se reemplazará la actual.')) {
                    this.guardarConfig(config);
                    location.reload();
                }
            } catch (error) {
                alert('❌ Error al importar: archivo inválido');
            }
        };
        reader.readAsText(file);
    },

    // ===== MANEJO DE LOGO =====

    cargarLogo(file, callback) {
        if (!file.type.startsWith('image/')) {
            alert('❌ Por favor seleccione un archivo de imagen');
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB máximo
            alert('❌ La imagen no debe superar 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    },

    eliminarLogo() {
        const config = this.cargarConfig();
        config.empresa.logoBase64 = '';
        this.guardarConfig(config);
    }
};

// Hacer disponible globalmente
window.ConfigGlobal = ConfigGlobal;
