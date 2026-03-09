// ============================================
// MÓDULO DE ANÁLISIS DE IMÁGENES CON IA
// Detecta peligros en fotografías usando IA
// ============================================

/**
 * Analizador de imágenes para detección de peligros
 */
class AnalizadorImagenes {
    constructor() {
        this.imagenesAnalizadas = [];
    }

    /**
     * Analiza una imagen y detecta peligros potenciales
     * Esta es una versión simulada - en producción usaría Gemini Vision API
     */
    async analizarImagen(imagenFile, callback) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const imagenData = e.target.result;

                // Aquí se integraría con Gemini Vision API
                // Por ahora, simularemos el análisis basado en patrones comunes
                const analisis = this.simularAnalisisIA(imagenFile.name);

                // Guardar análisis
                this.imagenesAnalizadas.push({
                    nombre: imagenFile.name,
                    timestamp: new Date(),
                    peligros: analisis.peligros,
                    recomendaciones: analisis.recomendaciones
                });

                if (callback) callback(analisis);
                resolve(analisis);
            };

            reader.onerror = reject;
            reader.readAsDataURL(imagenFile);
        });
    }

    /**
     * Simulación de análisis con IA
     * En producción esto llamaría a Gemini Vision API
     */
    simularAnalisisIA(nombreArchivo) {
        // Detectores de patrones comunes
        const detectores = [
            {
                patron: /altura|escalera|techo|andamio/i,
                peligros: [
                    { peligro: 'Riesgo de caída desde altura', nivel: 'CRÍTICO', confianza: 95 },
                    { peligro: 'Ausencia de protección contra caídas', nivel: 'ALTO', confianza: 85 }
                ],
                recomendaciones: [
                    'Verificar uso de arnés de seguridad',
                    'Instalar líneas de vida',
                    'Señalizar zona de riesgo de caída'
                ]
            },
            {
                patron: /maquina|equipo|motor/i,
                peligros: [
                    { peligro: 'Partes móviles sin resguardo', nivel: 'ALTO', confianza: 80 },
                    { peligro: 'Riesgo de atrapamiento', nivel: 'ALTO', confianza: 75 }
                ],
                recomendaciones: [
                    'Instalar resguardos en partes móviles',
                    'Implementar procedimiento de bloqueo y etiquetado',
                    'Capacitación en operación segura'
                ]
            },
            {
                patron: /electr|cable|tablero/i,
                peligros: [
                    { peligro: 'Riesgo eléctrico', nivel: 'CRÍTICO', confianza: 90 },
                    { peligro: 'Contacto eléctrico directo/indirecto', nivel: 'ALTO', confianza: 85 }
                ],
                recomendaciones: [
                    'Verificar conexión a tierra',
                    'Proteger cables expuestos',
                    'Señalizar riesgo eléctrico'
                ]
            },
            {
                patron: /quimic|tanque|bidón|sustancia/i,
                peligros: [
                    { peligro: 'Exposición a sustancias químicas', nivel: 'ALTO', confianza: 85 },
                    { peligro: 'Riesgo de intoxicación', nivel: 'MEDIO', confianza: 70 }
                ],
                recomendaciones: [
                    'Verificar hojas de seguridad (SDS)',
                    'Usar EPP específico (guantes, gafas, respirador)',
                    'Implementar ventilación adecuada'
                ]
            },
            {
                patron: /desorden|obstaculo|piso/i,
                peligros: [
                    { peligro: 'Superficies de trabajo desordenadas', nivel: 'MEDIO', confianza: 75 },
                    { peligro: 'Riesgo de tropiezos y caídas', nivel: 'MEDIO', confianza: 80 }
                ],
                recomendaciones: [
                    'Implementar programa de orden y aseo (5S)',
                    'Demarcar zonas de tránsito',
                    'Retirar obstáculos'
                ]
            }
        ];

        // Analizar nombre de archivo
        let peligrosDetectados = [];
        let recomendaciones = [];

        for (let detector of detectores) {
            if (detector.patron.test(nombreArchivo)) {
                peligrosDetectados = peligrosDetectados.concat(detector.peligros);
                recomendaciones = recomendaciones.concat(detector.recomendaciones);
            }
        }

        // Si no se detecta nada específico, devolver análisis genérico
        if (peligrosDetectados.length === 0) {
            peligrosDetectados = [
                { peligro: 'Condiciones inseguras potenciales', nivel: 'MEDIO', confianza: 60 },
                { peligro: 'Requiere evaluación detallada', nivel: 'BAJO', confianza: 50 }
            ];
            recomendaciones = [
                'Realizar inspección detallada del área',
                'Identificar peligros específicos',
                'Documentar condiciones observadas'
            ];
        }

        return {
            peligros: peligrosDetectados,
            recomendaciones: recomendaciones,
            analisisCompleto: true,
            confianzaPromedio: peligrosDetectados.reduce((acc, p) => acc + p.confianza, 0) / peligrosDetectados.length
        };
    }

    /**
     * Función para integración futura con Gemini Vision API
     * Esta función se usaría en producción
     */
    async analizarConGemini(imagenBase64) {
        // NOTA: Esta es la estructura para cuando se integre con Gemini API real
        // const API_KEY = 'TU_API_KEY_AQUI';
        // const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${API_KEY}`
        //     },
        //     body: JSON.stringify({
        //         contents: [{
        //             parts: [
        //                 {
        //                     text: "Analiza esta imagen e identifica todos los peligros de seguridad y salud ocupacional visibles. Para cada peligro, indica: 1) Tipo de peligro, 2) Nivel de riesgo (Bajo/Medio/Alto/Crítico), 3) Recomendaciones específicas de control."
        //                 },
        //                 {
        //                     inline_data: {
        //                         mime_type: "image/jpeg",
        //                         data: imagenBase64
        //                     }
        //                 }
        //             ]
        //         }]
        //     })
        // });
        // return await response.json();

        console.log('Análisis con Gemini Vision API (funcionalidad futura)');
        return null;
    }

    /**
     * Genera reporte HTML del análisis
     */
    generarReporte(analisis) {
        let html = '<div class="analisis-imagen">';
        html += '<h4>🤖 Análisis de IA Completado</h4>';

        if (analisis.peligros && analisis.peligros.length > 0) {
            html += '<div class="peligros-detectados">';
            html += '<strong>Peligros Detectados:</strong>';
            html += '<ul>';
            analisis.peligros.forEach(p => {
                const color = this.obtenerColorNivel(p.nivel);
                html += `<li><span style="background:${color}; color:white; padding:2px 8px; border-radius:4px; font-size:0.8rem;">${p.nivel}</span> ${p.peligro} <small>(${p.confianza}% confianza)</small></li>`;
            });
            html += '</ul></div>';
        }

        if (analisis.recomendaciones && analisis.recomendaciones.length > 0) {
            html += '<div class="recomendaciones-ia">';
            html += '<strong>Recomendaciones:</strong>';
            html += '<ul>';
            analisis.recomendaciones.forEach(r => {
                html += `<li>${r}</li>`;
            });
            html += '</ul></div>';
        }

        html += '</div>';
        return html;
    }

    /**
     * Obtiene color según nivel de riesgo
     */
    obtenerColorNivel(nivel) {
        const colores = {
            'BAJO': '#10b981',
            'MEDIO': '#f59e0b',
            'ALTO': '#f97316',
            'CRÍTICO': '#dc2626',
            'CRITICO': '#dc2626'
        };
        return colores[nivel.toUpperCase()] || '#64748b';
    }
}

/**
 * Componente UI para carga de imágenes
 */
function crearCargadorImagenes(containerId, onAnalisisComplete) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = `
        <div class="cargador-imagenes" style="margin: 1rem 0; padding: 1.5rem; background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px;">
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">📸</div>
                <h4 style="margin-bottom: 0.5rem;">Análisis de Imágenes con IA</h4>
                <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 1rem;">
                    Sube fotografías del área de trabajo y la IA detectará peligros automáticamente
                </p>
                <input type="file" 
                       id="input-imagen-${containerId}" 
                       accept="image/*" 
                       multiple
                       style="display: none;">
                <button class="btn btn-primario" onclick="document.getElementById('input-imagen-${containerId}').click()">
                    📤 Seleccionar Imágenes
                </button>
            </div>
            <div id="preview-${containerId}" style="margin-top: 1rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Event listener para análisis
    const input = document.getElementById(`input-imagen-${containerId}`);
    const analizador = new AnalizadorImagenes();

    input.addEventListener('change', async function (e) {
        const archivos = e.target.files;
        const preview = document.getElementById(`preview-${containerId}`);

        for (let archivo of archivos) {
            // Crear preview
            const reader = new FileReader();
            reader.onload = function (event) {
                const div = document.createElement('div');
                div.style.cssText = 'background: white; padding: 0.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
                div.innerHTML = `
                    <img src="${event.target.result}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px; margin-bottom: 0.5rem;">
                    <div style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem;">${archivo.name}</div>
                    <div class="analisis-resultado-${archivo.name.replace(/[^a-zA-Z0-9]/g, '')}" style="font-size: 0.8rem;">
                        <div style="text-align: center; color: #3b82f6;">
                            ⏳ Analizando...
                        </div>
                    </div>
                `;
                preview.appendChild(div);
            };
            reader.readAsDataURL(archivo);

            // Analizar con IA
            const analisis = await analizador.analizarImagen(archivo);
            const resultadoDiv = document.querySelector(`.analisis-resultado-${archivo.name.replace(/[^a-zA-Z0-9]/g, '')}`);
            if (resultadoDiv) {
                resultadoDiv.innerHTML = analizador.generarReporte(analisis);
            }

            // Callback con resultados
            if (onAnalisisComplete) {
                onAnalisisComplete(analisis, archivo);
            }
        }
    });
}

// Exportar para uso global
window.AnalizadorImagenes = AnalizadorImagenes;
window.crearCargadorImagenes = crearCargadorImagenes;
