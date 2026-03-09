// ============================================
// MODAL-CONFIG.JS
// Interfaz de Configuración Inicial
// ============================================

const ModalConfig = {
    pasoActual: 1,
    totalPasos: 5,

    // ===== INICIALIZACIÓN =====

    iniciar() {
        // Verificar si ya hay configuración
        if (!ConfigGlobal.existeConfig()) {
            this.mostrarModal();
        }

        // Agregar listener al botón de configuración
        const btnConfig = document.getElementById('btnConfiguracion');
        if (btnConfig) {
            btnConfig.addEventListener('click', () => this.mostrarModal());
        }
    },

    mostrarModal() {
        const modal = document.getElementById('modalConfiguracion');
        if (modal) {
            modal.style.display = 'flex';
            this.cargarConfiguracionExistente();
            this.mostrarPaso(1);
        }
    },

    cerrarModal() {
        const config = ConfigGlobal.cargarConfig();
        if (!config.configurado) {
            if (!confirm('⚠️ No ha completado la configuración. ¿Desea salir de todos modos?')) {
                return;
            }
        }

        const modal = document.getElementById('modalConfiguracion');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    // ===== NAVEGACIÓN ENTRE PASOS =====

    mostrarPaso(numeroPaso) {
        // Ocultar todos los pasos
        for (let i = 1; i <= this.totalPasos; i++) {
            const paso = document.getElementById(`paso${i}`);
            if (paso) {
                paso.style.display = 'none';
            }
        }

        // Mostrar el paso actual
        const pasoActual = document.getElementById(`paso${numeroPaso}`);
        if (pasoActual) {
            pasoActual.style.display = 'block';
        }

        this.pasoActual = numeroPaso;
        this.actualizarProgreso();
        this.actualizarBotones();
    },

    siguientePaso() {
        if (this.validarPasoActual()) {
            if (this.pasoActual < this.totalPasos) {
                this.mostrarPaso(this.pasoActual + 1);
            }
        }
    },

    pasoAnterior() {
        if (this.pasoActual > 1) {
            this.mostrarPaso(this.pasoActual - 1);
        }
    },

    actualizarProgreso() {
        const porcentaje = (this.pasoActual / this.totalPasos) * 100;
        const barra = document.getElementById('barraProgreso');
        const texto = document.getElementById('textoProgreso');

        if (barra) {
            barra.style.width = `${porcentaje}%`;
        }
        if (texto) {
            texto.textContent = `Paso ${this.pasoActual} de ${this.totalPasos}`;
        }
    },

    actualizarBotones() {
        const btnAnterior = document.getElementById('btnAnterior');
        const btnSiguiente = document.getElementById('btnSiguiente');
        const btnGuardar = document.getElementById('btnGuardar');

        if (btnAnterior) {
            btnAnterior.disabled = this.pasoActual === 1;
        }

        if (btnSiguiente && btnGuardar) {
            if (this.pasoActual === this.totalPasos) {
                btnSiguiente.style.display = 'none';
                btnGuardar.style.display = 'inline-block';
            } else {
                btnSiguiente.style.display = 'inline-block';
                btnGuardar.style.display = 'none';
            }
        }
    },

    // ===== VALIDACIÓN =====

    validarPasoActual() {
        switch (this.pasoActual) {
            case 1:
                return this.validarPaso1();
            case 2:
                return this.validarPaso2();
            case 3:
                return this.validarPaso3();
            case 4:
                return this.validarPaso4();
            case 5:
                return true; // Trabajadores es opcional
            default:
                return true;
        }
    },

    validarPaso1() {
        const nit = document.getElementById('nit')?.value;
        const razonSocial = document.getElementById('razonSocial')?.value;
        const ciudad = document.getElementById('ciudad')?.value;
        const telefono = document.getElementById('telefono')?.value;
        const email = document.getElementById('email')?.value;

        if (!nit || !razonSocial || !ciudad) {
            alert('❌ Por favor complete los campos obligatorios');
            return false;
        }

        if (!ConfigGlobal.validarNIT(nit)) {
            alert('❌ Formato de NIT inválido. Use: 900123456-7');
            return false;
        }

        if (email && !ConfigGlobal.validarEmail(email)) {
            alert('❌ Email inválido');
            return false;
        }

        return true;
    },

    validarPaso2() {
        const nombre = document.getElementById('repLegalNombre')?.value;
        const documento = document.getElementById('repLegalDocumento')?.value;

        if (!nombre || !documento) {
            alert('❌ Complete los datos del representante legal');
            return false;
        }

        return true;
    },

    validarPaso3() {
        const nombre = document.getElementById('sstNombre')?.value;
        const licencia = document.getElementById('sstLicencia')?.value;

        if (!nombre || !licencia) {
            alert('❌ Complete los datos del responsable SST');
            return false;
        }

        return true;
    },

    validarPaso4() {
        const actividadEconomica = document.getElementById('actividadEconomica')?.value;
        const claseRiesgo = document.getElementById('claseRiesgo')?.value;
        const totalTrabajadores = document.getElementById('totalTrabajadores')?.value;

        if (!actividadEconomica || !claseRiesgo || !totalTrabajadores) {
            alert('❌ Complete la  clasificación de riesgo');
            return false;
        }

        return true;
    },

    // ===== MANEJO DE LOGO =====

    cargarLogo() {
        const input = document.getElementById('inputLogo');
        const file = input?.files[0];

        if (file) {
            ConfigGlobal.cargarLogo(file, (base64) => {
                // Mostrar preview
                const preview = document.getElementById('logoPreview');
                if (preview) {
                    preview.src = base64;
                    preview.style.display = 'block';
                }

                // Guardar temporalmente
                this.logoTemporal = base64;
            });
        }
    },

    eliminarLogo() {
        const preview = document.getElementById('logoPreview');
        const input = document.getElementById('inputLogo');

        if (preview) {
            preview.src = '';
            preview.style.display = 'none';
        }
        if (input) {
            input.value = '';
        }

        this.logoTemporal = '';
    },

    // ===== CIIU Y RIESGO =====

    seleccionarCIIU() {
        const select = document.getElementById('actividadEconomica');
        const selectedOption = select?.options[select.selectedIndex];

        if (selectedOption) {
            const riesgo = selectedOption.getAttribute('data-riesgo');
            const inputRiesgo = document.getElementById('claseRiesgo');

            if (inputRiesgo && riesgo) {
                inputRiesgo.value = riesgo;
                this.mostrarInfoRiesgo(riesgo);
            }
        }
    },

    mostrarInfoRiesgo(clase) {
        const infoDiv = document.getElementById('infoRiesgo');
        if (infoDiv) {
            const descripcion = ClasificacionCIIU.descripcionRiesgo(clase);
            const tarifa = ClasificacionCIIU.tarifaARL(clase);

            infoDiv.innerHTML = `
                <div style="background: #f1f5f9; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                    <strong>Clase ${clase}:</strong> ${descripcion}<br>
                    <strong>Tarifa ARL aproximada:</strong> ${tarifa} del IBC
                </div>
   `;
        }
    },

    // ===== GUARDAR CONFIGURACIÓN =====

    async guardarConfiguracion() {
        if (!this.validarPasoActual()) {
            return;
        }

        const config = {
            empresa: {
                nit: document.getElementById('nit')?.value || '',
                razonSocial: document.getElementById('razonSocial')?.value || '',
                direccion: document.getElementById('direccion')?.value || '',
                ciudad: document.getElementById('ciudad')?.value || '',
                departamento: document.getElementById('departamento')?.value || '',
                telefono: document.getElementById('telefono')?.value || '',
                email: document.getElementById('email')?.value || '',
                web: document.getElementById('web')?.value || '',
                logoBase64: this.logoTemporal || ''
            },
            representanteLegal: {
                nombre: document.getElementById('repLegalNombre')?.value || '',
                documento: document.getElementById('repLegalDocumento')?.value || '',
                cargo: 'Representante Legal',
                telefono: document.getElementById('repLegalTelefono')?.value || '',
                email: document.getElementById('repLegalEmail')?.value || ''
            },
            responsableSST: {
                nombre: document.getElementById('sstNombre')?.value || '',
                documento: document.getElementById('sstDocumento')?.value || '',
                licencia: document.getElementById('sstLicencia')?.value || '',
                vigenciaLicencia: document.getElementById('sstVigencia')?.value || '',
                telefono: document.getElementById('sstTelefono')?.value || '',
                email: document.getElementById('sstEmail')?.value || '',
                horasDedicacion: document.getElementById('sstHoras')?.value || ''
            },
            clasificacion: {
                actividadEconomica: document.getElementById('actividadEconomica')?.options[document.getElementById('actividadEconomica')?.selectedIndex]?.text || '',
                codigoCIIU: document.getElementById('actividadEconomica')?.value || '',
                claseRiesgo: document.getElementById('claseRiesgo')?.value || '',
                totalTrabajadores: parseInt(document.getElementById('totalTrabajadores')?.value) || 0,
                distribucion: {
                    indefinido: parseInt(document.getElementById('distIndefinido')?.value) || 0,
                    fijo: parseInt(document.getElementById('distFijo')?.value) || 0,
                    prestacion: parseInt(document.getElementById('distPrestacion')?.value) || 0,
                    aprendiz: parseInt(document.getElementById('distAprendiz')?.value) || 0
                }
            },
            centrosTrabajo: this.obtenerCentrosTrabajo(),
            trabajadores: ConfigGlobal.obtenerTrabajadores(),
            configurado: true,
            fechaActualizacion: new Date().toISOString()
        };

        ConfigGlobal.guardarConfig(config);

        alert('✅ Configuración guardada correctamente');
        this.cerrarModal();
        location.reload();
    },

    obtenerCentrosTrabajo() {
        // Por ahora solo sede principal
        return [{
            nombre: 'Sede Principal',
            direccion: document.getElementById('direccion')?.value || '',
            trabajadores: parseInt(document.getElementById('totalTrabajadores')?.value) || 0
        }];
    },

    cargarConfiguracionExistente() {
        const config = ConfigGlobal.cargarConfig();

        if (config && config.configurado) {
            // Paso 1 - Empresa
            this.setValor('nit', config.empresa.nit);
            this.setValor('razonSocial', config.empresa.razonSocial);
            this.setValor('direccion', config.empresa.direccion);
            this.setValor('ciudad', config.empresa.ciudad);
            this.setValor('departamento', config.empresa.departamento);
            this.setValor('telefono', config.empresa.telefono);
            this.setValor('email', config.empresa.email);
            this.setValor('web', config.empresa.web);

            if (config.empresa.logoBase64) {
                const preview = document.getElementById('logoPreview');
                if (preview) {
                    preview.src = config.empresa.logoBase64;
                    preview.style.display = 'block';
                }
                this.logoTemporal = config.empresa.logoBase64;
            }

            // Paso 2 - Representante Legal
            this.setValor('repLegalNombre', config.representanteLegal.nombre);
            this.setValor('repLegalDocumento', config.representanteLegal.documento);
            this.setValor('repLegalTelefono', config.representanteLegal.telefono);
            this.setValor('repLegalEmail', config.representanteLegal.email);

            // Paso 3 - Responsable SST
            this.setValor('sstNombre', config.responsableSST.nombre);
            this.setValor('sstDocumento', config.responsableSST.documento);
            this.setValor('sstLicencia', config.responsableSST.licencia);
            this.setValor('sstVigencia', config.responsableSST.vigenciaLicencia);
            this.setValor('sstTelefono', config.responsableSST.telefono);
            this.setValor('sstEmail', config.responsableSST.email);
            this.setValor('sstHoras', config.responsableSST.horasDedicacion);

            // Paso 4 - Clasificación
            this.setValor('actividadEconomica', config.clasificacion.codigoCIIU);
            this.setValor('claseRiesgo', config.clasificacion.claseRiesgo);
            this.setValor('totalTrabajadores', config.clasificacion.totalTrabajadores);
            this.setValor('distIndefinido', config.clasificacion.distribucion.indefinido);
            this.setValor('distFijo', config.clasificacion.distribucion.fijo);
            this.setValor('distPrestacion', config.clasificacion.distribucion.prestacion);
            this.setValor('distAprendiz', config.clasificacion.distribucion.aprendiz);
        }
    },

    setValor(id, valor) {
        const elemento = document.getElementById(id);
        if (elemento && valor) {
            elemento.value = valor;
        }
    }
};

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ModalConfig.iniciar());
} else {
    ModalConfig.iniciar();
}

window.ModalConfig = ModalConfig;
