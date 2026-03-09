// ============================================
// AUTO-POPULATE.JS
// Sistema de Auto-Población de Formatos
// ============================================

(function () {
    'use strict';

    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }

    function inicializar() {
        const config = cargarConfiguracion();

        if (config && config.configurado) {
            poblarCampos(config);
            poblarLogo(config);
            autoFecha();
        } else {
            console.warn('⚠️ No hay configuración guardada. Complete la configuración inicial.');
        }
    }

    function cargarConfiguracion() {
        try {
            const stored = localStorage.getItem('sgsst_config');
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            console.error('Error al cargar configuración:', e);
            return null;
        }
    }

    function poblarCampos(config) {
        // Buscar todos los elementos con data-config
        const elementos = document.querySelectorAll('[data-config]');

        elementos.forEach(elemento => {
            const path = elemento.getAttribute('data-config');
            const valor = obtenerValorAnidado(config, path);

            if (valor !== null && valor !== undefined) {
                asignarValor(elemento, valor);
            }
        });

        console.log(`✅ ${elementos.length} campos auto-poblados`);
    }

    function poblarLogo(config) {
        if (config.empresa && config.empresa.logoBase64) {
            // Buscar todos los contenedores de logo
            const logosPlaceholder = document.querySelectorAll('.logo-placeholder, [data-logo="empresa"]');

            logosPlaceholder.forEach(logoDiv => {
                // Crear imagen
                const img = document.createElement('img');
                img.src = config.empresa.logoBase64;
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.objectFit = 'contain';

                // Reemplazar contenido
                logoDiv.innerHTML = '';
                logoDiv.appendChild(img);
            });
        }
    }

    function obtenerValorAnidado(obj, path) {
        return path.split('.').reduce((current, prop) => {
            return current?.[prop];
        }, obj);
    }

    function asignarValor(elemento, valor) {
        const tagName = elemento.tagName.toLowerCase();

        switch (tagName) {
            case 'input':
            case 'textarea':
                if (elemento.type === 'checkbox') {
                    elemento.checked = Boolean(valor);
                } else if (elemento.type === 'radio') {
                    if (elemento.value === String(valor)) {
                        elemento.checked = true;
                    }
                } else {
                    elemento.value = valor;
                }
                break;

            case 'select':
                // Buscar opción que coincida
                for (let i = 0; i < elemento.options.length; i++) {
                    if (elemento.options[i].value === String(valor)) {
                        elemento.selectedIndex = i;
                        break;
                    }
                }
                break;

            case 'img':
                elemento.src = valor;
                break;

            default:
                // Para span, div, p, etc.
                elemento.textContent = valor;
        }
    }

    function autoFecha() {
        const hoy = new Date().toISOString().split('T')[0];

        document.querySelectorAll('.auto-fecha').forEach(input => {
            if (!input.value || input.value === '') {
                input.value = hoy;
            }
        });
    }

    // Exponer función para re-poblar después de actualizar config
    window.repoblarFormato = function () {
        inicializar();
    };

})();
