/* ---------------------------------------------------------------------------
   CORVEN — Pendientes marcados como [DEFINIR] (sección 16 del documento).

   Regla del documento: la información pendiente no se publica ni se inventa.
   Si sigue pendiente al programar, se OCULTA la sección completa en lugar de
   dejar un placeholder visible.

   Cada bandera de abajo controla una sección real del sitio. Al recibir el
   dato de Corven se cambia el valor aquí y la sección aparece sola.
   --------------------------------------------------------------------------- */

/** Precios "desde" de los planes. Pendiente #1 — CRÍTICO para publicar /planes/. */
export const PRECIOS: Record<'casa' | 'negocio', { desde: number } | null> = {
  casa: null,
  negocio: null,
};

/* Pendiente #2 (correo de contacto) quedó resuelto: `contacto@corven.mx` está
   publicado en el sitio actual. Ver `src/data/site.ts`. */

/** Moneda de los planes, para el schema Offer. */
export const MONEDA = 'MXN';

/** Pendiente #11 — capacidades específicas de la plataforma Kodex a destacar. */
export const KODEX_CAPACIDADES: string[] = [];

/** Pendiente #7 — lista definitiva de marcas de equipo que maneja Corven. */
export const MARCAS: string[] = [];

/** Pendiente #13 — historia y fundación de la empresa. */
export const HISTORIA: string[] = [];

/** Pendiente #8 y #9 — política de mantenimiento y costo de instalación. */
export const POLITICA_MANTENIMIENTO: string | null = null;
export const POLITICA_INSTALACION: string | null = null;

/** Pendiente #5 — aviso de privacidad. Cuando Corven lo entregue, poner el
 *  texto en `src/pages/aviso-de-privacidad.astro` y cambiar esto a true. */
export const AVISO_PRIVACIDAD_PUBLICADO = false;
export const TERMINOS_PUBLICADOS = false;

/** Fotografía real de la central y de operadores. Pendiente #6 — CRÍTICO.
 *  El documento prohíbe imágenes de banco en este sitio, así que mientras no
 *  existan las fotos los bloques que dependen de ellas usan un tratamiento
 *  gráfico propio en vez de una foto genérica. */
export const FOTOGRAFIA_CENTRAL = false;
