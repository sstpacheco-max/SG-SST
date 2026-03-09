// ============================================
// CIIU-CLASIFICACION.JS
// Tabla de Clasificación de Riesgo por CIIU
// ============================================

const ClasificacionCIIU = {
    // Tabla de códigos CIIU con su respectiva clase de riesgo
    tabla: {
        // CLASE I - RIESGO MÍNIMO
        '4711': { actividad: 'Comercio al por menor en establecimientos no especializados', riesgo: 'I' },
        '6201': { actividad: 'Actividades de desarrollo de sistemas informáticos', riesgo: 'I' },
        '6202': { actividad: 'Actividades de consultoría informática', riesgo: 'I' },
        '6209': { actividad: 'Otras actividades de tecnologías de información', riesgo: 'I' },
        '6910': { actividad: 'Actividades jurídicas', riesgo: 'I' },
        '6920': { actividad: 'Actividades de contabilidad, teneduría de libros', riesgo: 'I' },
        '7010': { actividad: 'Actividades de administración empresarial', riesgo: 'I' },
        '7020': { actividad: 'Actividades de consultoría de gestión', riesgo: 'I' },
        '8211': { actividad: 'Actividades combinadas de servicios administrativos de oficina', riesgo: 'I' },
        '8559': { actividad: 'Otros tipos de educación n.c.p.', riesgo: 'I' },

        // CLASE II - RIESGO BAJO
        '4520': { actividad: 'Mantenimiento y reparación de vehículos automotores', riesgo: 'II' },
        '4541': { actividad: 'Comercio de motocicletas y sus partes', riesgo: 'II' },
        '4663': { actividad: 'Comercio al por mayor de materiales de construcción', riesgo: 'II' },
        '4724': { actividad: 'Comercio al por menor de bebidas y productos del tabaco', riesgo: 'II' },
        '5611': { actividad: 'Expendio a la mesa de comidas preparadas', riesgo: 'II' },
        '5629': { actividad: 'Otros tipos de expendio de comidas preparadas n.c.p.', riesgo: 'II' },
        '8010': { actividad: 'Actividades de seguridad privada', riesgo: 'II' },
        '8121': { actividad: 'Limpieza general interior de edificios', riesgo: 'II' },
        '9602': { actividad: 'Peluquería y otros tratamientos de belleza', riesgo: 'II' },

        // CLASE III - RIESGO MEDIO
        '1010': { actividad: 'Procesamiento y conservación de carne y productos cárnicos', riesgo: 'III' },
        '1040': { actividad: 'Elaboración de aceites y grasas de origen vegetal y animal', riesgo: 'III' },
        '1061': { actividad: 'Trilla de café', riesgo: 'III' },
        '1104': { actividad: 'Elaboración de bebidas no alcohólicas', riesgo: 'III' },
        '1311': { actividad: 'Preparación e hilatura de fibras textiles', riesgo: 'III' },
        '2511': { actividad: 'Fabricación de productos metálicos para uso estructural', riesgo: 'III' },
        '2599': { actividad: 'Fabricación de otros productos elaborados de metal n.c.p.', riesgo: 'III' },
        '2710': { actividad: 'Fabricación de motores, generadores y transformadores eléctricos', riesgo: 'III' },
        '3312': { actividad: 'Mantenimiento y reparación especializado de maquinaria', riesgo: 'III' },
        '8610': { actividad: 'Actividades de hospitales y clínicas con internación', riesgo: 'III' },

        // CLASE IV - RIESGO ALTO
        '0111': { actividad: 'Cultivo de cereales (excepto arroz), legumbres y semillas oleaginosas', riesgo: 'IV' },
        '0220': { actividad: 'Extracción de madera', riesgo: 'IV' },
        '0810': { actividad: 'Extracción de piedra, arena y arcillas', riesgo: 'IV' },
        '1701': { actividad: 'Fabricación de pulpas (pastas) celulósicas; papel y cartón', riesgo: 'IV' },
        '2011': { actividad: 'Fabricación de sustancias y productos químicos básicos', riesgo: 'IV' },
        '2394': { actividad: 'Fabricación de cemento, cal y yeso', riesgo: 'IV' },
        '2395': { actividad: 'Fabricación de artículos de hormigón, cemento y yeso', riesgo: 'IV' },
        '4923': { actividad: 'Transporte de carga por carretera', riesgo: 'IV' },
        '5221': { actividad: 'Actividades de estaciones, vías y servicios complementarios para el transporte terrestre', riesgo: 'IV' },

        // CLASE V - RIESGO MÁXIMO
        '0510': { actividad: 'Extracción de hulla (carbón de piedra)', riesgo: 'V' },
        '0610': { actividad: 'Extracción de petróleo crudo', riesgo: 'V' },
        '0620': { actividad: 'Extracción de gas natural', riesgo: 'V' },
        '0710': { actividad: 'Extracción de minerales de hierro', riesgo: 'V' },
        '0729': { actividad: 'Extracción de otros minerales metalíferos no ferrosos', riesgo: 'V' },
        '1920': { actividad: 'Fabricación de productos de la refinación del petróleo', riesgo: 'V' },
        '2029': { actividad: 'Fabricación de otros productos químicos n.c.p.', riesgo: 'V' },
        '2420': { actividad: 'Industrias básicas de metales preciosos y de metales no ferrosos', riesgo: 'V' },
        '4100': { actividad: 'Construcción de edificios', riesgo: 'V' },
        '4210': { actividad: 'Construcción de carreteras y vías de ferrocarril', riesgo: 'V' },
        '4290': { actividad: 'Construcción de otras obras de ingeniería civil', riesgo: 'V' },
        '4311': { actividad: 'Demolición', riesgo: 'V' },
        '4312': { actividad: 'Preparación del terreno', riesgo: 'V' }
    },

    // Buscar actividad por código CIIU
    buscarPorCodigo(codigo) {
        return this.tabla[codigo] || null;
    },

    // Buscar actividades por texto
    buscarPorTexto(texto) {
        const textoLower = texto.toLowerCase();
        const resultados = [];

        for (const [codigo, datos] of Object.entries(this.tabla)) {
            if (datos.actividad.toLowerCase().includes(textoLower) ||
                codigo.includes(texto)) {
                resultados.push({ codigo, ...datos });
            }
        }

        return resultados;
    },

    // Obtener todas las actividades de una clase de riesgo
    porClaseRiesgo(clase) {
        const resultados = [];

        for (const [codigo, datos] of Object.entries(this.tabla)) {
            if (datos.riesgo === clase) {
                resultados.push({ codigo, ...datos });
            }
        }

        return resultados;
    },

    // Obtener descripción de clase de riesgo
    descripcionRiesgo(clase) {
        const descripciones = {
            'I': 'Riesgo Mínimo - Oficinas, comercio al por menor, financieras, servicios profesionales',
            'II': 'Riesgo Bajo - Restaurantes, bares, talleres mecánicos, supermercados',
            'III': 'Riesgo Medio - Manufactura, procesamiento de alimentos, hospitales, transporte',
            'IV': 'Riesgo Alto - Agroindustria, química, transporte de carga, extracción',
            'V': 'Riesgo Máximo - Minería, construcción, petróleo, explosivos'
        };

        return descripciones[clase] || 'Clase de riesgo no especificada';
    },

    // Obtener tarifa aproximada ARL por clase
    tarifaARL(clase) {
        const tarifas = {
            'I': '0.522%',
            'II': '1.044%',
            'III': '2.436%',
            'IV': '4.350%',
            'V': '6.960%'
        };

        return tarifas[clase] || 'N/A';
    },

    // Generar opciones HTML para select
    generarOpcionesSelect() {
        let html = '<option value="">Seleccione una actividad económica...</option>';

        const clasesOrdenadas = ['I', 'II', 'III', 'IV', 'V'];

        clasesOrdenadas.forEach(clase => {
            html += `<optgroup label="CLASE ${clase} - ${this.descripcionRiesgo(clase)}">`;

            for (const [codigo, datos] of Object.entries(this.tabla)) {
                if (datos.riesgo === clase) {
                    html += `<option value="${codigo}" data-riesgo="${datos.riesgo}">${codigo} - ${datos.actividad}</option>`;
                }
            }

            html += '</optgroup>';
        });

        return html;
    }
};

// Hacer disponible globalmente
window.ClasificacionCIIU = ClasificacionCIIU;
