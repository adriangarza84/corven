/* ---------------------------------------------------------------------------
   CORVEN — Datos del sitio.

   Teléfonos, correo, dirección y horarios se escriben UNA sola vez aquí y se
   importan donde se usen (header, footer, contacto, schema). No duplicar.

   Los valores en `null` corresponden a pendientes marcados como [DEFINIR] en
   el documento de contenido. La regla es: no se inventa el dato y la sección
   que depende de él se oculta. Ver `src/data/pendientes.ts`.
   --------------------------------------------------------------------------- */

export const SITE = {
  nombre: 'Corven',
  nombreLegal: 'Corven',
  url: 'https://corven.mx',
  idioma: 'es-MX',
  descripcion:
    'Sistemas de seguridad electrónica con central de monitoreo propia en el área metropolitana de Monterrey.',
  gtm: 'GTM-WK2GKZC3',
} as const;

export const CONTACTO = {
  ventas: {
    etiqueta: 'Ventas y cotizaciones',
    display: '81 1202 5603',
    tel: '+528112025603',
    horario: 'Lunes a viernes de 9:00 a 18:00',
  },
  monitoreo: {
    etiqueta: 'Central de monitoreo y soporte',
    display: '81 2575 9229',
    tel: '+528125759229',
    horario: '24 horas, todos los días',
  },
  /* Pendiente #2 resuelto desde el sitio actual: corven.mx publica hoy esta
     dirección, ofuscada con el email-protection de Cloudflare. No es un dato
     inventado, es el que Corven ya tiene publicado.
     Falta que Corven confirme que es el buzón correcto para los leads del sitio;
     si no lo fuera, se cambia aquí y se actualiza en footer, contacto y schema.
     Poner null lo oculta de todo el sitio. */
  correo: 'contacto@corven.mx' as string | null,
  whatsapp: {
    numero: '528112025603',
    base: 'https://wa.me/528112025603',
  },
  direccion: {
    edificio: 'Plaza Tanarah, piso 21',
    calle: 'Av. José Vasconcelos 345 Ote.',
    colonia: 'Santa Engracia',
    cp: '66267',
    municipio: 'San Pedro Garza García',
    estado: 'Nuevo León',
    estadoCorto: 'N.L.',
    pais: 'MX',
    /* Coordenadas aproximadas de Plaza Tanarah, Av. Vasconcelos 345 Ote. */
    geo: { lat: 25.6543, lng: -100.3585 },
  },
} as const;

/** Enlace de WhatsApp con texto precargado por página. */
export function whatsapp(texto = 'Hola Corven, quiero cotizar un sistema de seguridad'): string {
  return `${CONTACTO.whatsapp.base}?text=${encodeURIComponent(texto)}`;
}

export const PILARES = [
  '25 años en seguridad electrónica',
  'Más de 2,000 puntos instalados',
  'Central de monitoreo propia',
] as const;

/* --------------------------------- Navegación --------------------------------- */

export type EntradaNav = { nombre: string; href: string; descripcion?: string };

export const SERVICIOS_NAV: EntradaNav[] = [
  {
    nombre: 'Alarmas y monitoreo',
    href: '/servicios/alarmas-monitoreo/',
    descripcion: 'Detección verificada por nuestra central',
  },
  {
    nombre: 'CCTV y cámaras',
    href: '/servicios/cctv-camaras-seguridad/',
    descripcion: 'Videovigilancia con acceso desde tu celular',
  },
  {
    nombre: 'Control de acceso',
    href: '/servicios/control-de-acceso/',
    descripcion: 'Quién entra, a dónde y a qué hora',
  },
  {
    nombre: 'Detección de incendio',
    href: '/servicios/deteccion-de-incendio/',
    descripcion: 'Humo y temperatura conectados a central',
  },
];

export const SOLUCIONES_NAV: EntradaNav[] = [
  { nombre: 'Casa y residencial', href: '/soluciones/casa-y-residencial/' },
  { nombre: 'Comercio y retail', href: '/soluciones/comercio-y-retail/' },
  { nombre: 'Industria y naves', href: '/soluciones/industria-y-naves/' },
  { nombre: 'Oficinas y corporativos', href: '/soluciones/oficinas-y-corporativos/' },
  { nombre: 'Escuelas', href: '/soluciones/escuelas/' },
];

export const NAV_PRINCIPAL = [
  { nombre: 'Servicios', href: '/servicios/', hijos: SERVICIOS_NAV },
  { nombre: 'Soluciones', href: '/soluciones/', hijos: SOLUCIONES_NAV },
  { nombre: 'Planes', href: '/planes/' },
  { nombre: 'Cobertura', href: '/cobertura/' },
  { nombre: 'Nosotros', href: '/nosotros/' },
] as const;

/* --------------------------------- Cobertura --------------------------------- */

/** Los diez municipios del área metropolitana. El orden se respeta en footer y chips. */
export const MUNICIPIOS = [
  { nombre: 'Monterrey', slug: 'monterrey' },
  { nombre: 'San Pedro Garza García', slug: 'san-pedro-garza-garcia' },
  { nombre: 'San Nicolás de los Garza', slug: 'san-nicolas-de-los-garza' },
  { nombre: 'Guadalupe', slug: 'guadalupe' },
  { nombre: 'Santa Catarina', slug: 'santa-catarina' },
  { nombre: 'Apodaca', slug: 'apodaca' },
  { nombre: 'General Escobedo', slug: 'general-escobedo' },
  { nombre: 'García', slug: 'garcia' },
  { nombre: 'Juárez', slug: 'juarez' },
  { nombre: 'Santiago', slug: 'santiago' },
] as const;

/* --------------------------------- Formulario --------------------------------- */

export const QUE_PROTEGER = [
  'Casa',
  'Comercio o tienda',
  'Oficina',
  'Nave industrial o bodega',
  'Escuela',
  'Varias ubicaciones',
  'Otro',
] as const;

export const SERVICIOS_INTERES = [
  'Alarma con monitoreo',
  'Cámaras CCTV',
  'Control de acceso',
  'Detección de incendio',
  'No estoy seguro',
] as const;

/* Destino del envío del formulario (sección 15.6).
   Vacío = el formulario valida y muestra la confirmación sin transmitir.
   Poner aquí la URL de la función serverless o del servicio externo. */
export const FORM_ENDPOINT = '' as string;
