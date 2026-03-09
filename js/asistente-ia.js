// ============================================
// SG-SST - ASISTENTE DE INTELIGENCIA ARTIFICIAL
// Sistema modular de IA para formatos SST
// ============================================

/**
 * Base de conocimiento de SST para asistencia inteligente
 */
const conocimientoSST = {
    // Peligros comunes por actividad
    peligrosPorActividad: {
        'soldadura': [
            { peligro: 'Radiaciones no ionizantes', tipo: 'Físico', nivel: 'Alto' },
            { peligro: 'Humos metálicos', tipo: 'Químico', nivel: 'Alto' },
            { peligro: 'Quemaduras', tipo: 'Mecánico', nivel: 'Alto' },
            { peligro: 'Explosión o incendio', tipo: 'Físico', nivel: 'Alto' }
        ],
        'trabajo en alturas': [
            { peligro: 'Caída de personas desde altura', tipo: 'Mecánico', nivel: 'Crítico' },
            { peligro: 'Caída de objetos', tipo: 'Mecánico', nivel: 'Alto' },
            { peligro: 'Golpes y contusiones', tipo: 'Mecánico', nivel: 'Medio' }
        ],
        'manipulación de cargas': [
            { peligro: 'Sobreesfuerzo físico', tipo: 'Biomecánico', nivel: 'Alto' },
            { peligro: 'Golpes por objetos', tipo: 'Mecánico', nivel: 'Medio' },
            { peligro: 'Atrapamiento', tipo: 'Mecánico', nivel: 'Alto' }
        ],
        'oficina': [
            { peligro: 'Riesgo psicosocial - estrés', tipo: 'Psicosocial', nivel: 'Medio' },
            { peligro: 'Posturas prolongadas', tipo: 'Biomecánico', nivel: 'Medio' },
            { peligro: 'Fatiga visual', tipo: 'Biomecánico', nivel: 'Bajo' }
        ],
        'conducción': [
            { peligro: 'Accidentes de tránsito', tipo: 'Mecánico', nivel: 'Crítico' },
            { peligro: 'Posturas forzadas', tipo: 'Biomecánico', nivel: 'Medio' },
            { peligro: 'Estrés laboral', tipo: 'Psicosocial', nivel: 'Medio' }
        ]
    },

    // Controles sugeridos por tipo de peligro
    controlesPorPeligro: {
        'Caída de personas desde altura': [
            'Arnés de seguridad con doble línea de vida',
            'Líneas de vida horizontal o vertical',
            'Capacitación en trabajo seguro en alturas',
            'Permiso de trabajo en alturas',
            'Inspección preoperacional de equipos'
        ],
        'Radiaciones no ionizantes': [
            'Careta para soldar con filtro oscuro',
            'Guantes de cuero tipo carnicero',
            'Delantal de cuero',
            'Capacitación en soldadura segura',
            'Extracción localizada de humos'
        ],
        'Sobreesfuerzo físico': [
            'Capacitación en higiene postural',
            'Ayudas mecánicas para levantamiento',
            'Pausas activas cada 2 horas',
            'Evaluación ergonómica del puesto',
            'Programa de vigilancia epidemiológica osteomuscular'
        ],
        'Riesgo psicosocial - estrés': [
            'Batería de riesgo psicosocial',
            'Programa de estilos de vida saludable',
            'Comité de convivencia laboral',
            'Equilibrio vida-trabajo',
            'Apoyo psicológico organizacional'
        ]
    },

    // EPP por tipo de actividad
    eppPorActividad: {
        'soldadura': ['Careta de soldar', 'Guantes de cuero', 'Delantal de cuero', 'Botas de seguridad', 'Protección respiratoria'],
        'trabajo en alturas': ['Arnés de cuerpo completo', 'Casco con barbuquejo', 'Línea de vida', 'Guantes antideslizantes', 'Botas de seguridad'],
        'oficina': ['No aplica EPP', 'Apoyo lumbar (opcional)', 'Reposapiés (opcional)'],
        'químicos': ['Guantes nitrilo', 'Gafas de seguridad', 'Protección respiratoria', 'Delantal impermeable']
    }
};

/**
 * Motor de IA: Detección de actividad y sugerencias
 */
class AsistenteSST {
    constructor() {
        this.historial = [];
    }

    /**
     * Detecta la actividad a partir de texto descriptivo
     */
    detectarActividad(texto) {
        texto = texto.toLowerCase();
        const actividades = Object.keys(conocimientoSST.peligrosPorActividad);

        for (let actividad of actividades) {
            if (texto.includes(actividad)) {
                return actividad;
            }
        }

        // Detección por palabras clave
        if (texto.includes('soldar') || texto.includes('soldar')) return 'soldadura';
        if (texto.includes('altura') || texto.includes('techo') || texto.includes('escalera')) return 'trabajo en alturas';
        if (texto.includes('carga') || texto.includes('levantar') || texto.includes('peso')) return 'manipulación de cargas';
        if (texto.includes('escritorio') || texto.includes('computador') || texto.includes('pc')) return 'oficina';
        if (texto.includes('vehiculo') || texto.includes('conducir') || texto.includes('manejar')) return 'conducción';

        return null;
    }

    /**
     * Sugiere peligros basados en la actividad
     */
    sugerirPeligros(actividad) {
        actividad = this.detectarActividad(actividad) || actividad.toLowerCase();
        return conocimientoSST.peligrosPorActividad[actividad] || [];
    }

    /**
     * Sugiere controles para un peligro específico
     */
    sugerirControles(peligro) {
        // Búsqueda exacta
        if (conocimientoSST.controlesPorPeligro[peligro]) {
            return conocimientoSST.controlesPorPeligro[peligro];
        }

        // Búsqueda parcial
        for (let key in conocimientoSST.controlesPorPeligro) {
            if (peligro.toLowerCase().includes(key.toLowerCase()) ||
                key.toLowerCase().includes(peligro.toLowerCase())) {
                return conocimientoSST.controlesPorPeligro[key];
            }
        }

        return [];
    }

    /**
     * Sugiere EPP según actividad
     */
    sugerirEPP(actividad) {
        actividad = this.detectarActividad(actividad) || actividad.toLowerCase();
        return conocimientoSST.eppPorActividad[actividad] || [];
    }

    /**
     * Evalúa nivel de riesgo automáticamente
     * Probabilidad: Baja (1), Media (2), Alta (3)
     * Consecuencia: Leve (1), Moderado (2), Grave (3), Muy Grave (4)
     */
    evaluarRiesgo(probabilidad, consecuencia) {
        const valor = probabilidad * consecuencia;

        if (valor <= 2) return { nivel: 'BAJO', color: '#10b981', accion: 'Mantener controles' };
        if (valor <= 4) return { nivel: 'MEDIO', color: '#f59e0b', accion: 'Mejorar controles' };
        if (valor <= 8) return { nivel: 'ALTO', color: '#f97316', accion: 'Implementar controles urgente' };
        return { nivel: 'CRÍTICO', color: '#dc2626', accion: 'Suspender actividad hasta control' };
    }

    /**
     * Genera recomendaciones para investigación de accidentes
     */
    generarRecomendaciones(tipoAccidente) {
        const recomendaciones = {
            'caída': [
                'Reforzar programa de trabajo en alturas',
                'Inspección de equipos de protección contra caídas',
                'Capacitación en uso de arnés y líneas de vida',
                'Señalización de zonas de riesgo de caída'
            ],
            'atrapamiento': [
                'Implementar procedimiento de bloqueo y etiquetado',
                'Resguardos en máquinas',
                'Capacitación en operación segura de maquinaria',
                'Señalización de zonas de atrapamiento'
            ],
            'golpe': [
                'Demarcación y señalización de áreas',
                'Orden y aseo en puestos de trabajo',
                'Uso obligatorio de casco',
                'Inspección de herramientas'
            ],
            'quemadura': [
                'Manejo seguro de sustancias calientes',
                'EPP resistente al calor',
                'Permiso de trabajo en caliente',
                'Extintores en puntos estratégicos'
            ]
        };

        for (let tipo in recomendaciones) {
            if (tipoAccidente.toLowerCase().includes(tipo)) {
                return recomendaciones[tipo];
            }
        }

        return ['Realizar investigación profunda de causas', 'Implementar controles según jerarquía'];
    }
}

/**
 * Utilidades para autocompletado y validación
 */
const utilidades = {
    /**
     * Formatea fechas automáticamente
     */
    obtenerFechaHoy() {
        const hoy = new Date();
        return hoy.toISOString().split('T')[0]; // YYYY-MM-DD
    },

    /**
     * Valida NIT colombiano
     */
    validarNIT(nit) {
        // Limpia el NIT
        nit = nit.replace(/[^0-9]/g, '');
        if (nit.length < 9) return false;

        // Algoritmo de validación de dígito de verificación
        const pesos = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
        let suma = 0;

        for (let i = 0; i < nit.length - 1; i++) {
            suma += parseInt(nit[nit.length - 2 - i]) * pesos[i];
        }

        const residuo = suma % 11;
        const digitoVerificacion = residuo > 1 ? 11 - residuo : residuo;

        return digitoVerificacion == parseInt(nit[nit.length - 1]);
    },

    /**
     * Guarda datos en localStorage
     */
    guardarDatos(clave, datos) {
        try {
            localStorage.setItem(`sgsst_${clave}`, JSON.stringify(datos));
            return true;
        } catch (e) {
            console.error('Error guardando datos:', e);
            return false;
        }
    },

    /**
     * Carga datos de localStorage
     */
    cargarDatos(clave) {
        try {
            const datos = localStorage.getItem(`sgsst_${clave}`);
            return datos ? JSON.parse(datos) : null;
        } catch (e) {
            console.error('Error cargando datos:', e);
            return null;
        }
    },

    /**
     * Exporta tabla a CSV
     */
    exportarCSV(nombreArchivo, tabla) {
        let csv = [];
        const filas = tabla.querySelectorAll('tr');

        filas.forEach(fila => {
            const celdas = fila.querySelectorAll('th, td');
            const valores = Array.from(celdas).map(celda => {
                const input = celda.querySelector('input, select, textarea');
                return input ? `"${input.value}"` : `"${celda.textContent.trim()}"`;
            });
            csv.push(valores.join(','));
        });

        const blob = new Blob([csv.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${nombreArchivo}.csv`;
        link.click();
    },

    /**
     *Imprime el formato
     */
    imprimir() {
        window.print();
    }
};

/**
 * Inicialización global del asistente
 */
const asistente = new AsistenteSST();

// Autocompletar fechas en inputs tipo date
document.addEventListener('DOMContentLoaded', function () {
    // Auto-rellenar fecha de hoy en campos de fecha vacíos
    const camposFecha = document.querySelectorAll('input[type="date"]');
    camposFecha.forEach(campo => {
        if (!campo.value && campo.classList.contains('auto-fecha')) {
            campo.value = utilidades.obtenerFechaHoy();
        }
    });

    // Guardar automáticamente datos del formulario
    const formularios = document.querySelectorAll('form, .contenedor-formato');
    formularios.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                const formId = form.id || 'formato_general';
                const datosForm = {};

                inputs.forEach(inp => {
                    if (inp.name || inp.id) {
                        datosForm[inp.name || inp.id] = inp.value;
                    }
                });

                utilidades.guardarDatos(formId, datosForm);
            });
        });
    });
});

// Exportar para uso global
window.AsistenteSST = asistente;
window.UtilidadesSST = utilidades;
